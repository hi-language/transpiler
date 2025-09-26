import { parser } from './parser.js';

const BaseHiVisitor = parser.getBaseCstVisitorConstructor();

class AstBuilder extends BaseHiVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }
    
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
            ctx.right.forEach((rhs) => {
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
