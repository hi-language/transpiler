import { CstParser } from 'chevrotain';
import {
    allTokens,
    Identifier, Number, String,
    LBrace, RBrace, LParen, RParen,
    Dot, Plus, Comma, Colon, Eq
} from './lexer.js';

class HiParser extends CstParser {
    constructor() {
        super(allTokens);

        const $ = this;

        $.RULE('program', () => $.SUBRULE($.statements));
        $.RULE('statements', () => $.MANY(() => $.SUBRULE($.statement)));

        $.RULE('statement', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.declaration) },
                { ALT: () => $.SUBRULE($.assignment) },
                { ALT: () => $.SUBRULE($.expressionStatement) },
            ]);
        });
        
        $.RULE('expressionStatement', () => $.SUBRULE($.expression));

        $.RULE('declaration', () => {
            $.CONSUME(Identifier);
            $.CONSUME(Colon);
            $.SUBRULE($.expression);
        });

        $.RULE('assignment', () => {
            $.CONSUME(Identifier);
            $.CONSUME(Eq);
            $.SUBRULE($.expression);
        });

        $.RULE('expression', () => $.SUBRULE($.additiveExpression));

        $.RULE('additiveExpression', () => {
            $.SUBRULE($.callExpression, { LABEL: 'left' });
            $.MANY(() => {
                $.CONSUME(Plus);
                $.SUBRULE2($.callExpression, { LABEL: 'right' });
            });
        });

        $.RULE('callExpression', () => {
            $.SUBRULE($.memberExpression);
            $.OPTION(() => {
                $.CONSUME(LParen);
                $.OPTION2(() => $.SUBRULE($.argumentList));
                $.CONSUME(RParen);
            });
        });

        $.RULE('argumentList', () => {
            $.SUBRULE($.expression);
            $.MANY(() => {
                $.CONSUME(Comma);
                $.SUBRULE2($.expression);
            });
        });

        $.RULE('memberExpression', () => {
            $.SUBRULE($.primary);
            $.MANY(() => {
                $.CONSUME(Dot);
                $.CONSUME(Identifier);
            });
        });

        $.RULE('primary', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.literal) },
                { ALT: () => $.CONSUME(Identifier) },
                { ALT: () => $.SUBRULE($.block) },
                { ALT: () => {
                    $.CONSUME(LParen);
                    $.SUBRULE($.expression);
                    $.CONSUME(RParen);
                }}
            ]);
        });

        $.RULE('literal', () => $.OR([{ ALT: () => $.CONSUME(Number) }, { ALT: () => $.CONSUME(String) }]));

        $.RULE('block', () => {
            $.CONSUME(LBrace);
            $.OPTION(() => $.SUBRULE($.keyValuePairs));
            $.CONSUME(RBrace);
        });
        
        $.RULE('keyValuePairs', () => $.AT_LEAST_ONE(() => $.SUBRULE($.keyValuePair)));

        $.RULE('keyValuePair', () => {
            $.CONSUME(Identifier);
            $.CONSUME(Colon);
            $.SUBRULE($.expression);
        });
        
        this.performSelfAnalysis();
    }
}

export const parser = new HiParser();
