import { CstParser } from 'chevrotain';
import * as T from './lexer.js';

class HiParser extends CstParser {
    constructor() {
        super(T.allTokens);

        const $ = this;

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
        
        $.RULE('expressionStatement', () => $.SUBRULE($.expression));
        
        $.RULE('returnStatement', () => {
            $.CONSUME(T.Caret);
            $.OPTION(() => $.SUBRULE($.expression));
        });

        $.RULE('declaration', () => {
            $.CONSUME(T.Identifier);
            $.CONSUME(T.Colon);
            $.SUBRULE($.expression);
        });

        $.RULE('assignment', () => {
            // Note: This only allows simple identifiers for now, not member expressions.
            $.CONSUME(T.Identifier);
            $.CONSUME(T.Eq);
            $.SUBRULE($.expression);
        });

        $.RULE('expression', () => $.SUBRULE($.conditionalExpression));

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

        const buildBinaryExpressionRule = (name, higherPrecRule, operators) => {
            $.RULE(name, () => {
                $.SUBRULE(higherPrecRule, { LABEL: 'left' });
                $.MANY(() => {
                    $.CONSUME($.OR(operators));
                    $.SUBRULE2(higherPrecRule, { LABEL: 'right' });
                });
            });
        };

        buildBinaryExpressionRule('equalityExpression', $.additiveExpression, [
            { ALT: () => T.EqEq }
        ]);
        
        buildBinaryExpressionRule('additiveExpression', $.multiplicativeExpression, [
            { ALT: () => T.Plus }, { ALT: () => T.Minus }
        ]);

        buildBinaryExpressionRule('multiplicativeExpression', $.callExpression, [
            { ALT: () => T.Star }, { ALT: () => T.Slash }
        ]);
        
        $.RULE('callExpression', () => {
            $.SUBRULE($.memberExpression, { LABEL: 'callee' });
            $.MANY(() => {
                $.CONSUME(T.LParen);
                $.OPTION(() => $.SUBRULE($.argumentList));
                $.CONSUME(T.RParen);
            });
        });

        $.RULE('argumentList', () => $.SEPERATED_LIST($.expression, T.Comma));

        $.RULE('memberExpression', () => {
            $.SUBRULE($.primary, { LABEL: 'object' });
            $.MANY(() => {
                $.OR([
                    { ALT: () => { $.CONSUME(T.Dot); $.CONSUME(T.Identifier); }},
                    { ALT: () => { $.CONSUME(T.LBracket); $.SUBRULE($.expression); $.CONSUME(T.RBracket); }}
                ]);
            });
        });

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

        $.RULE('literal', () => $.OR([
            { ALT: () => $.CONSUME(T.Number) },
            { ALT: () => $.CONSUME(T.String) },
            { ALT: () => $.CONSUME(T.Null) }
        ]));
        
        $.RULE('arrowExpression', () => {
            $.SUBRULE($.parameterList);
            $.CONSUME(T.Arrow);
            $.OR([
                { ALT: () => $.SUBRULE($.block) },
                { ALT: () => $.SUBRULE($.expression) }
            ]);
        });

        $.RULE('arrayLiteral', () => {
            $.CONSUME(T.LBracket);
            $.OPTION(() => $.SEPERATED_LIST($.expression, T.Comma));
            $.CONSUME(T.RBracket);
        });

        $.RULE('block', () => {
            $.OPTION(() => $.SUBRULE($.parameterList));
            $.CONSUME(T.LBrace);
            $.SUBRULE($.statements);
            $.CONSUME(T.RBrace);
        });
        
        $.RULE('parameterList', () => {
            $.CONSUME(T.LParen);
            $.OPTION(() => $.SEPERATED_LIST(T.Identifier, T.Comma));
            $.CONSUME(T.RParen);
        });
        
        this.performSelfAnalysis();
    }
}

export const parser = new HiParser();
