import { parser } from './parser.js';

const BaseHiVisitor = parser.getBaseCstVisitorConstructor();

// Helper to build a left-associative binary expression AST from a CST
function buildBinaryExpression(ctx, visitor) {
    let left = visitor.visit(ctx.left);
    if (ctx.right) {
        // Collect all possible operator tokens from the context.
        const operators = [];
        if (ctx.EqEq) operators.push(...ctx.EqEq);
        if (ctx.Plus) operators.push(...ctx.Plus);
        if (ctx.Minus) operators.push(...ctx.Minus);
        if (ctx.Star) operators.push(...ctx.Star);
        if (ctx.Slash) operators.push(...ctx.Slash);
        
        // Sort operators by their position in the source text to handle mixed operators correctly.
        operators.sort((a, b) => a.startOffset - b.startOffset);

        ctx.right.forEach((rhs, i) => {
            const operator = operators[i].image;
            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right: visitor.visit(rhs),
            };
        });
    }
    return left;
}

class AstBuilder extends BaseHiVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }
    
    program(ctx) { return { type: 'Program', body: this.visit(ctx.statements) }; }
    statements(ctx) { return ctx.statement?.map(stmt => this.visit(stmt)) || []; }
    
    statement(ctx) {
        if (ctx.declaration) return this.visit(ctx.declaration);
        if (ctx.assignment) return this.visit(ctx.assignment);
        if (ctx.returnStatement) return this.visit(ctx.returnStatement);
        if (ctx.expressionStatement) return this.visit(ctx.expressionStatement);
    }
    
    returnStatement(ctx) {
        return { type: 'ReturnStatement', argument: ctx.expression ? this.visit(ctx.expression) : null };
    }

    expressionStatement(ctx) { return { type: 'ExpressionStatement', expression: this.visit(ctx.expression) }; }

    declaration(ctx) {
        return {
            type: 'VariableDeclaration',
            identifier: ctx.Identifier[0].image,
            value: this.visit(ctx.expression),
        };
    }

    assignment(ctx) {
        return {
            type: 'AssignmentExpression',
            left: { type: 'Identifier', name: ctx.Identifier[0].image },
            right: this.visit(ctx.expression),
        };
    }
    
    expression(ctx) { return this.visit(ctx.conditionalExpression); }

    conditionalExpression(ctx) {
        if (!ctx.Question) return this.visit(ctx.condition);
        return {
            type: 'ConditionalExpression',
            test: this.visit(ctx.condition),
            consequent: this.visit(ctx.consequent),
            alternate: ctx.alternate ? this.visit(ctx.alternate) : { type: 'NullLiteral' },
        };
    }
    
    equalityExpression(ctx) { return buildBinaryExpression(ctx, this); }
    additiveExpression(ctx) { return buildBinaryExpression(ctx, this); }
    multiplicativeExpression(ctx) { return buildBinaryExpression(ctx, this); }

    callExpression(ctx) {
        let expr = this.visit(ctx.callee);
        if (ctx.LParen) {
            ctx.LParen.forEach((_, i) => {
                expr = {
                    type: 'CallExpression',
                    callee: expr,
                    arguments: ctx.argumentList?.[i] ? this.visit(ctx.argumentList[i]) : [],
                };
            });
        }
        return expr;
    }

    argumentList(ctx) { return ctx.expression.map(expr => this.visit(expr)); }
    
    memberExpression(ctx) {
        let obj = this.visit(ctx.object);
        ctx.Identifier?.forEach(prop => {
            obj = { type: 'MemberExpression', computed: false, object: obj, property: { type: 'Identifier', name: prop.image } };
        });
        ctx.expression?.forEach(prop => {
            obj = { type: 'MemberExpression', computed: true, object: obj, property: this.visit(prop) };
        });
        return obj;
    }

    primary(ctx) {
        if (ctx.literal) return this.visit(ctx.literal);
        if (ctx.Identifier) return { type: 'Identifier', name: ctx.Identifier[0].image };
        if (ctx.At) return { type: 'ThisExpression' };
        if (ctx.block) return this.visit(ctx.block);
        if (ctx.arrowExpression) return this.visit(ctx.arrowExpression);
        if (ctx.arrayLiteral) return this.visit(ctx.arrayLiteral);
        if (ctx.expression) return this.visit(ctx.expression);
    }
    
    literal(ctx) {
        if (ctx.Number) {
            const image = ctx.Number[0].image;
            if (image === '!0') return { type: 'BooleanLiteral', value: true };
            return { type: 'NumericLiteral', value: Number(image) };
        }
        if (ctx.String) return { type: 'StringLiteral', value: ctx.String[0].image.slice(1,-1) };
        if (ctx.Null) return { type: 'NullLiteral' };
    }

    block(ctx) {
        const params = ctx.parameterList ? this.visit(ctx.parameterList) : [];
        const body = this.visit(ctx.statements);
        if (ctx.parameterList) { // If there's a param list, it's a function
            return { type: 'FunctionExpression', params, body: { type: 'BlockStatement', body } };
        }
        return { type: 'Block', body };
    }

    arrowExpression(ctx) {
        const params = this.visit(ctx.parameterList);
        const body = ctx.block ? this.visit(ctx.block) : this.visit(ctx.expression);
        return { type: 'ArrowFunctionExpression', params, body };
    }
    
    parameterList(ctx) {
        return ctx.Identifier?.map(id => ({ type: 'Identifier', name: id.image })) || [];
    }
    
    arrayLiteral(ctx) {
        return { type: 'ArrayLiteral', elements: ctx.expression?.map(e => this.visit(e)) || [] };
    }
}

export const astBuilder = new AstBuilder();
