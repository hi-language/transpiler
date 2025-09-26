import { CstParser } from 'chevrotain';
import * as T from './lexer.js';

class HiParser extends CstParser {
    constructor() {
        super(T.allTokens);

        const $ = this;

        // --- Top Level Rules ---
        $.RULE('program', () => $.SUBRULE($.statements));
        $.RULE('statements', () => $.MANY(() => $.SUBRULE($.statement)));

        $.RULE('statement', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.declaration) },
                { ALT: () => $.SUBRULE($.assignment) },
                { ALT: () => $.SUBRULE($.returnStatement) },
                { ALT: () => $.SUBRULE($.expressionStatement) },
            ]);
        });

        $.RULE('declaration', () => {
            $.CONSUME(T.Identifier);
            $.CONSUME(T.Colon);
            $.SUBRULE($.expression);
        });

        // assignable supports: Identifier(.Identifier | [expression])*
        $.RULE('assignable', () => {
            $.CONSUME(T.Identifier);
            $.MANY(() => {
                $.OR([
                    { ALT: () => { $.CONSUME(T.Dot); $.CONSUME2(T.Identifier); } },
                    { ALT: () => { $.CONSUME(T.LBracket); $.SUBRULE($.expression); $.CONSUME(T.RBracket); } }
                ]);
            });
        });

        $.RULE('assignment', () => {
            $.SUBRULE($.assignable, { LABEL: 'left' });
            $.CONSUME(T.Eq);
            $.SUBRULE($.expression);
        });

        $.RULE('returnStatement', () => {
            $.CONSUME(T.Caret);
            $.OPTION(() => $.SUBRULE($.expression));
        });

        $.RULE('expressionStatement', () => $.SUBRULE($.expression));

        // --- Primary and building blocks ---

        $.RULE('literal', () => $.OR([
            { ALT: () => $.CONSUME(T.Number) },
            { ALT: () => $.CONSUME(T.String) },
            { ALT: () => $.CONSUME(T.Null) }
        ]));

        $.RULE('arrayLiteral', () => {
            $.CONSUME(T.LBracket);
            $.OPTION(() => {
                $.SUBRULE($.expression);
                $.MANY(() => {
                    $.CONSUME(T.Comma);
                    $.SUBRULE2($.expression);
                });
            });
            $.CONSUME(T.RBracket);
        });

        $.RULE('parameterList', () => {
            $.CONSUME(T.LParen);
            $.OPTION(() => {
                $.CONSUME(T.Identifier);
                $.MANY(() => {
                    $.CONSUME(T.Comma);
                    $.CONSUME2(T.Identifier);
                });
            });
            $.CONSUME(T.RParen);
        });

        // A code block with statements (used in arrow bodies or as expression blocks)
        $.RULE('codeBlock', () => {
            $.CONSUME(T.LBrace);
            $.SUBRULE($.statements);
            $.CONSUME(T.RBrace);
        });

        // Object literal: { key: expr, key2: expr, ... } (commas optional via newlines)
        $.RULE('objectLiteral', () => {
            $.CONSUME(T.LBrace);
            $.MANY(() => {
                $.CONSUME(T.Identifier);
                $.CONSUME(T.Colon);
                $.SUBRULE($.expression);
            });
            $.CONSUME(T.RBrace);
        });

        // (a, b) { ... } function sugar
        $.RULE('functionExpression', () => {
            $.SUBRULE($.parameterList);
            $.SUBRULE($.codeBlock);
        });

        // ( ... ) parenthesized expression
        $.RULE('parenthesizedExpression', () => {
            $.CONSUME(T.LParen);
            $.SUBRULE($.expression);
            $.CONSUME(T.RParen);
        });

        // MemberExpression consumes a Primary.
        $.RULE('memberExpression', () => {
            $.SUBRULE($.primary, { LABEL: 'object' });
            $.MANY(() => {
                $.OR([
                    { ALT: () => { $.CONSUME(T.Dot); $.CONSUME(T.Identifier); }},
                    { ALT: () => { $.CONSUME(T.LBracket); $.SUBRULE($.expression); $.CONSUME(T.RBracket); }}
                ]);
            });
        });

        // CallExpression consumes a MemberExpression.
        $.RULE('callExpression', () => {
            $.SUBRULE($.memberExpression, { LABEL: 'callee' });
            $.MANY(() => {
                $.CONSUME(T.LParen);
                $.OPTION(() => $.SUBRULE($.argumentList));
                $.CONSUME(T.RParen);
            });
        });

        $.RULE('argumentList', () => {
            $.SUBRULE($.expression);
            $.MANY(() => {
                $.CONSUME(T.Comma);
                $.SUBRULE2($.expression);
            });
        });

        // --- Arrow and Primary disambiguation ---

        $.RULE('arrowExpression', () => {
            $.SUBRULE($.parameterList);
            $.CONSUME(T.Arrow);
            $.OR([
                { GATE: () => this.LA(1).tokenType === T.LBrace, ALT: () => $.SUBRULE($.codeBlock) },
                { ALT: () => $.SUBRULE($.expression) }
            ]);
        });

        $.RULE('primary', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.literal) },
                { ALT: () => $.CONSUME(T.Identifier) },
                { ALT: () => $.CONSUME(T.At) },
                // Try arrow first: ( ... ) =>
                { GATE: this.BACKTRACK($.arrowExpression), ALT: () => $.SUBRULE($.arrowExpression) },
                // Then function sugar: ( ... ) { ... }
                { GATE: this.BACKTRACK($.functionExpression), ALT: () => $.SUBRULE($.functionExpression) },
                // Prefer object literal over code block when both start with { ... }
                { GATE: this.BACKTRACK($.objectLiteral), ALT: () => $.SUBRULE($.objectLiteral) },
                { ALT: () => $.SUBRULE($.codeBlock) },
                { ALT: () => $.SUBRULE($.arrayLiteral) },
                { ALT: () => $.SUBRULE($.parenthesizedExpression) }
            ]);
        });

        // --- Binary Expressions with correct precedence ---

        const buildBinaryExpressionRule = (name, higherPrecRule, operators) => {
            $.RULE(name, () => {
                $.SUBRULE(higherPrecRule, { LABEL: 'left' });
                $.MANY(() => {
                    $.OR(operators);
                    $.SUBRULE2(higherPrecRule, { LABEL: 'right' });
                });
            });
        };

        // multiplicative -> call
        buildBinaryExpressionRule('multiplicativeExpression', $.callExpression, [
            { ALT: () => $.CONSUME(T.Star) }, { ALT: () => $.CONSUME(T.Slash) }
        ]);

        // additive -> multiplicative
        buildBinaryExpressionRule('additiveExpression', $.multiplicativeExpression, [
            { ALT: () => $.CONSUME(T.Plus) }, { ALT: () => $.CONSUME(T.Minus) }
        ]);

        // relational -> additive
        buildBinaryExpressionRule('relationalExpression', $.additiveExpression, [
            { ALT: () => $.CONSUME(T.Gt) }, { ALT: () => $.CONSUME(T.Lt) }
        ]);

        // equality -> relational
        buildBinaryExpressionRule('equalityExpression', $.relationalExpression, [
            { ALT: () => $.CONSUME(T.EqEq) }
        ]);

        // ConditionalExpression consumes an EqualityExpression.
        $.RULE('conditionalExpression', () => {
            $.SUBRULE($.equalityExpression, { LABEL: 'condition' });
            $.OPTION(() => {
                $.CONSUME(T.Question);
                $.SUBRULE2($.expression, { LABEL: 'consequent' });
                $.OPTION2(() => {
                    $.CONSUME(T.Colon);
                    $.SUBRULE3($.expression, { LABEL: 'alternate' });
                });
            });
        });

        // Expression is the lowest precedence rule, forming the entry point for the chain.
        $.RULE('expression', () => $.SUBRULE($.conditionalExpression));

        this.performSelfAnalysis();
    }
}

export const parser = new HiParser();

