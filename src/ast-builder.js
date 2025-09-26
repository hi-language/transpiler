import { parser } from './parser.js';

const BaseHiVisitor = parser.getBaseCstVisitorConstructor();

// Helper to build a left-associative binary expression AST from a CST
function buildBinaryExpression(ctx, visitor) {
    let left = visitor.visit(ctx.left);
    if (ctx.right) {
        // Collect all possible operator tokens from the context.
        const operators = [];
        if (ctx.EqEq) operators.push(...ctx.EqEq);
        if (ctx.Gt) operators.push(...ctx.Gt);
        if (ctx.Lt) operators.push(...ctx.Lt);
        if (ctx.Plus) operators.push(...ctx.Plus);
        if (ctx.Minus) operators.push(...ctx.Minus);
        if (ctx.Star) operators.push(...ctx.Star);
        if (ctx.Slash) operators.push(...ctx.Slash);

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

// Build member chain using token ordering to preserve dots/brackets sequence.
function buildMemberChain(ctx, base, visitor, idStartIndex = 0) {
    let obj = base;

    const steps = [];
    if (ctx.Dot) steps.push(...ctx.Dot.map(tok => ({ kind: 'dot', tok })));
    if (ctx.LBracket) steps.push(...ctx.LBracket.map(tok => ({ kind: 'brack', tok })));
    steps.sort((a, b) => a.tok.startOffset - b.tok.startOffset);

    let idIdx = idStartIndex;
    let exprIdx = 0;

    steps.forEach(step => {
        if (step.kind === 'dot') {
            const propTok = ctx.Identifier[idIdx++];
            obj = {
                type: 'MemberExpression',
                computed: false,
                object: obj,
                property: { type: 'Identifier', name: propTok.image }
            };
        } else {
            const propExpr = visitor.visit(ctx.expression[exprIdx++]);
            obj = {
                type: 'MemberExpression',
                computed: true,
                object: obj,
                property: propExpr
            };
        }
    });

    return obj;
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

    // assignment: assignable '=' expression
    assignment(ctx) {
        return {
            type: 'AssignmentExpression',
            left: this.visit(ctx.left),
            right: this.visit(ctx.expression),
        };
    }

    // assignable: Identifier (.Identifier | [expr])*
    assignable(ctx) {
        const base = { type: 'Identifier', name: ctx.Identifier[0].image };
        // ctx.Identifier contains base + dot-props
        if (!ctx.Dot && !ctx.LBracket) return base;
        return buildMemberChain(ctx, base, this, 1);
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
    relationalExpression(ctx) { return buildBinaryExpression(ctx, this); }
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
        const base = this.visit(ctx.object);
        if (!ctx.Dot && !ctx.LBracket) return base;

        // ctx.Identifier are only the dot properties (no base here)
        return buildMemberChain(ctx, base, this, 0);
    }

    primary(ctx) {
        if (ctx.literal) return this.visit(ctx.literal);
        if (ctx.Identifier) return { type: 'Identifier', name: ctx.Identifier[0].image };
        if (ctx.At) return { type: 'ThisExpression' };
        if (ctx.arrowExpression) return this.visit(ctx.arrowExpression);
        if (ctx.functionExpression) return this.visit(ctx.functionExpression);
        if (ctx.objectLiteral) return this.visit(ctx.objectLiteral);
        if (ctx.codeBlock) return this.visit(ctx.codeBlock);
        if (ctx.arrayLiteral) return this.visit(ctx.arrayLiteral);
        if (ctx.parenthesizedExpression) return this.visit(ctx.parenthesizedExpression);
    }

    literal(ctx) {
        if (ctx.Number) {
            const image = ctx.Number[0].image;
            if (image === '!0') return { type: 'BooleanLiteral', value: true };
            return { type: 'NumericLiteral', value: Number(image) };
        }
        if (ctx.String) return { type: 'StringLiteral', value: ctx.String[0].image.slice(1, -1) };
        if (ctx.Null) return { type: 'NullLiteral' };
    }

    // codeBlock -> Block node (for implicit return/IIFE in conditionals)
    codeBlock(ctx) {
        const body = this.visit(ctx.statements);
        return { type: 'Block', body };
    }

    // functionExpression -> FunctionExpression node
    functionExpression(ctx) {
        const params = this.visit(ctx.parameterList);
        const body = this.visit(ctx.codeBlock);
        return { type: 'FunctionExpression', params, body: { type: 'BlockStatement', body: body.body } };
    }

    // arrowExpression(params => body)
    arrowExpression(ctx) {
        const params = this.visit(ctx.parameterList);
        const body = ctx.codeBlock ? this.visit(ctx.codeBlock) : this.visit(ctx.expression);
        return { type: 'ArrowFunctionExpression', params, body };
    }

    // parenthesizedExpression simply returns the inner expression
    parenthesizedExpression(ctx) { return this.visit(ctx.expression); }

    parameterList(ctx) {
        return ctx.Identifier?.map(id => ({ type: 'Identifier', name: id.image })) || [];
    }

    arrayLiteral(ctx) {
        return { type: 'ArrayLiteral', elements: ctx.expression?.map(e => this.visit(e)) || [] };
    }

    objectLiteral(ctx) {
        const props = [];
        const ids = ctx.Identifier || [];
        const exprs = ctx.expression || [];
        for (let i = 0; i < ids.length; i++) {
            props.push({
                type: 'Property',
                key: ids[i].image,
                value: this.visit(exprs[i])
            });
        }
        return { type: 'ObjectLiteral', properties: props };
    }
}

export const astBuilder = new AstBuilder();

