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

        $.RULE('assignment', () => {
            $.CONSUME(T.Identifier);
            $.CONSUME(T.Eq);
            $.SUBRULE($.expression);
        });
        
        $.RULE('returnStatement', () => {
            $.CONSUME(T.Caret);
            $.OPTION(() => $.SUBRULE($.expression));
        });

        $.RULE('expressionStatement', () => $.SUBRULE($.expression));

        // --- Expressions (ordered by precedence, highest to lowest) ---

        // Primary is the highest precedence expression.
        $.RULE('primary', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.literal) },
                { ALT: () => $.CONSUME(T.Identifier) },
                { ALT: () => $.CONSUME(T.At) },
                { ALT: () => $.SUBRULE($.arrowExpression) },
                { ALT: () => $.SUBRULE($.block) },
                { ALT: () => $.SUBRULE($.arrayLiteral) },
                { ALT: () => {
                    $.CONSUME(T.LParen);
                    $.SUBRULE($.expression);
                    $.CONSUME(T.RParen);
                }}
            ]);
        });

        // Components used by Primary
        $.RULE('literal', () => $.OR([
            { ALT: () => $.CONSUME(T.Number) },
            { ALT: () => $.CONSUME(T.String) },
            { ALT: () => $.CONSUME(T.Null) }
        ]));
        
        $.RULE('arrayLiteral', () => {
            $.CONSUME(T.LBracket);
            $.OPTION(() => $.SEPERATED_LIST($.expression, T.Comma));
            $.CONSUME(T.RBracket);
        });

        $.RULE('parameterList', () => {
            $.CONSUME(T.LParen);
            $.OPTION(() => $.SEPERATED_LIST(T.Identifier, T.Comma));
            $.CONSUME(T.RParen);
        });
        
        $.RULE('block', () => {
            $.OPTION(() => $.SUBRULE($.parameterList));
            $.CONSUME(T.LBrace);
            $.SUBRULE($.statements);
            $.CONSUME(T.RBrace);
        });
        
        $.RULE('arrowExpression', () => {
            $.SUBRULE($.parameterList);
            $.CONSUME(T.Arrow);
            $.OR([
                { ALT: () => $.SUBRULE($.block) },
                { ALT: () => $.SUBRULE($.expression) }
            ]);
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
        
        $.RULE('argumentList', () => $.SEPERATED_LIST($.expression, T.Comma));

        // Binary Expressions are defined with a helper.
        const buildBinaryExpressionRule = (name, higherPrecRule, operators) => {
            $.RULE(name, () => {
                $.SUBRULE(higherPrecRule, { LABEL: 'left' });
                $.MANY(() => {
                    $.CONSUME($.OR(operators));
                    $.SUBRULE2(higherPrecRule, { LABEL: 'right' });
                });
            });
        };

        // Define binary expressions from highest to lowest precedence.
        buildBinaryExpressionRule('multiplicativeExpression', $.callExpression, [
            { ALT: () => T.Star }, { ALT: () => T.Slash }
        ]);

        buildBinaryExpressionRule('additiveExpression', $.multiplicativeExpression, [
            { ALT: () => T.Plus }, { ALT: () => T.Minus }
        ]);

        buildBinaryExpressionRule('equalityExpression', $.additiveExpression, [
            { ALT: () => T.EqEq }
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
