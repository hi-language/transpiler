import { CstParser, Lexer, createToken } from 'chevrotain';

// 1. Lexer Definition
// -------------------
const tokens = {};

const tokenList = [
    createToken({ name: 'WhiteSpace', pattern: /[ \t]+/, group: Lexer.SKIPPED }),
    createToken({ name: 'NewLine', pattern: /\n|\r\n?/, group: Lexer.SKIPPED }),
    createToken({ name: 'Comment', pattern: /\/\/[^\n\r]*/, group: Lexer.SKIPPED }),

    createToken({ name: 'Number', pattern: /0|[1-9][0-9]*(\.[0-9]+)?/ }),
    createToken({ name: 'String', pattern: /"(?:\\["\\]|[^\n"\\])*"/ }),
    createToken({ name: 'LBrace', pattern: /{/ }),
    createToken({ name: 'RBrace', pattern: /}/ }),
    createToken({ name: 'LParen', pattern: /\(/ }),
    createToken({ name: 'RParen', pattern: /\)/ }),
    createToken({ name: 'Dot', pattern: /\./ }),
    createToken({ name: 'Plus', pattern: /\+/ }),
    createToken({ name: 'Comma', pattern: /,/ }),
    createToken({ name: 'Colon', pattern: /:/ }),
    createToken({ name: 'Eq', pattern: /=/ }),
    createToken({ name: 'Identifier', pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ }),
];

tokenList.forEach(tokenType => {
    tokens[tokenType.name] = tokenType;
});

export const HiLexer = new Lexer(tokenList);

// 2. Parser Definition
// --------------------
class HiParser extends CstParser {
    constructor() {
        super(tokenList);

        const $ = this;

        $.RULE('program', () => {
            $.SUBRULE($.statements);
        });

        $.RULE('statements', () => {
            $.MANY(() => {
                $.SUBRULE($.statement);
            });
        });

        $.RULE('statement', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.declaration) },
                { ALT: () => $.SUBRULE($.assignment) },
                { ALT: () => $.SUBRULE($.expressionStatement) },
            ]);
        });
        
        $.RULE('expressionStatement', () => {
            $.SUBRULE($.expression);
        });

        $.RULE('declaration', () => {
            $.CONSUME(tokens.Identifier);
            $.CONSUME(tokens.Colon);
            $.SUBRULE($.expression);
        });

        $.RULE('assignment', () => {
            $.CONSUME(tokens.Identifier);
            $.CONSUME(tokens.Eq);
            $.SUBRULE($.expression);
        });

        $.RULE('expression', () => {
            $.SUBRULE($.additiveExpression);
        });

        $.RULE('additiveExpression', () => {
            $.SUBRULE($.callExpression, { LABEL: 'left' });
            $.MANY(() => {
                $.CONSUME(tokens.Plus);
                $.SUBRULE2($.callExpression, { LABEL: 'right' });
            });
        });

        $.RULE('callExpression', () => {
            $.SUBRULE($.memberExpression);
            $.OPTION(() => {
                $.CONSUME(tokens.LParen);
                $.OPTION2(() => $.SUBRULE($.argumentList));
                $.CONSUME(tokens.RParen);
            });
        });

        $.RULE('argumentList', () => {
            $.SUBRULE($.expression);
            $.MANY(() => {
                $.CONSUME(tokens.Comma);
                $.SUBRULE2($.expression);
            });
        });

        $.RULE('memberExpression', () => {
            $.SUBRULE($.primary);
            $.MANY(() => {
                $.CONSUME(tokens.Dot);
                $.CONSUME(tokens.Identifier);
            });
        });

        $.RULE('primary', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.literal) },
                { ALT: () => $.CONSUME(tokens.Identifier) },
                { ALT: () => $.SUBRULE($.block) },
                { ALT: () => {
                    $.CONSUME(tokens.LParen);
                    $.SUBRULE($.expression);
                    $.CONSUME(tokens.RParen);
                }}
            ]);
        });

        $.RULE('literal', () => {
            $.OR([
                { ALT: () => $.CONSUME(tokens.Number) },
                { ALT: () => $.CONSUME(tokens.String) },
            ]);
        });

        $.RULE('block', () => {
            $.CONSUME(tokens.LBrace);
            $.OPTION(() => {
                $.SUBRULE($.keyValuePairs);
            });
            $.CONSUME(tokens.RBrace);
        });
        
        $.RULE('keyValuePairs', () => {
            $.AT_LEAST_ONE(() => $.SUBRULE($.keyValuePair));
        });

        $.RULE('keyValuePair', () => {
            $.CONSUME(tokens.Identifier);
            $.CONSUME(tokens.Colon);
            $.SUBRULE($.expression);
        });
        
        this.performSelfAnalysis();
    }
}

export const parser = new HiParser();

// 3. AST Builder (CST Visitor)
// ----------------------------
const BaseHiVisitor = parser.getBaseCstVisitorConstructor();

class AstBuilder extends BaseHiVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }
    
    // Entry rule
    program(ctx) {
        return { type: 'Program', body: this.visit(ctx.statements) };
    }
    
    statements(ctx) {
        return ctx.statement?.map(stmt => this.visit(stmt)) || [];
    }

    statement(ctx) {
        if (ctx.declaration) return this.visit(ctx.declaration);
        if (ctx.assignment) return this.visit(ctx.assignment);
        if (ctx.expressionStatement) return this.visit(ctx.expressionStatement);
    }
    
    expressionStatement(ctx) {
        return { type: 'ExpressionStatement', expression: this.visit(ctx.expression) };
    }

    declaration(ctx) {
        return {
            type: 'VariableDeclaration',
            identifier: ctx.Identifier[0].image,
            value: this.visit(ctx.expression),
        };
    }

    assignment(ctx) {
        return {
            type: 'Assignment',
            identifier: ctx.Identifier[0].image,
            value: this.visit(ctx.expression),
        };
    }
    
    expression(ctx) {
        return this.visit(ctx.additiveExpression);
    }

    additiveExpression(ctx) {
        let left = this.visit(ctx.left);
        if (ctx.right) {
            ctx.right.forEach((rhs, i) => {
                left = {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: left,
                    right: this.visit(rhs),
                };
            });
        }
        return left;
    }

    callExpression(ctx) {
        let callee = this.visit(ctx.memberExpression);
        if (ctx.LParen) {
            return {
                type: 'CallExpression',
                callee: callee,
                arguments: ctx.argumentList ? this.visit(ctx.argumentList) : [],
            };
        }
        return callee;
    }
    
    argumentList(ctx) {
        return ctx.expression.map(expr => this.visit(expr));
    }
    
    memberExpression(ctx) {
        let obj = this.visit(ctx.primary);
        if (ctx.Identifier) {
            ctx.Identifier.forEach(propIdent => {
                obj = {
                    type: 'MemberExpression',
                    object: obj,
                    property: { type: 'Identifier', name: propIdent.image },
                };
            });
        }
        return obj;
    }

    primary(ctx) {
        if (ctx.literal) return this.visit(ctx.literal);
        if (ctx.Identifier) return { type: 'Identifier', name: ctx.Identifier[0].image };
        if (ctx.block) return this.visit(ctx.block);
        if (ctx.expression) return this.visit(ctx.expression);
    }
    
    literal(ctx) {
        if (ctx.Number) return { type: 'NumericLiteral', value: Number(ctx.Number[0].image) };
        if (ctx.String) return { type: 'StringLiteral', value: ctx.String[0].image };
    }

    block(ctx) {
        return {
            type: 'Block',
            properties: ctx.keyValuePairs ? this.visit(ctx.keyValuePairs) : []
        };
    }
    
    keyValuePairs(ctx) {
        return ctx.keyValuePair.map(kv => this.visit(kv));
    }
    
    keyValuePair(ctx) {
        return {
            type: 'Property',
            key: ctx.Identifier[0].image,
            value: this.visit(ctx.expression)
        };
    }
}

export const astBuilder = new AstBuilder();
