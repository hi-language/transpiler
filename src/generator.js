/**
 * Generates JavaScript code from a Hi AST.
 * @param {object} ast The Abstract Syntax Tree.
 * @returns {string} The equivalent JavaScript code.
 */
export function generate(ast) {
    if (!ast) return '';

    const generators = {
        Program: (node) => node.body.map(generate).join('\n'),
        ExpressionStatement: (node) => `${generate(node.expression)};`,

        VariableDeclaration: (node) => {
            const t = node.value.type;
            const keyword = (t === 'FunctionExpression' || t === 'ArrowFunctionExpression') ? 'const' : 'let';
            return `${keyword} ${node.identifier} = ${generate(node.value)};`;
        },
        AssignmentExpression: (node) => `${generate(node.left)} = ${generate(node.right)}`,

        ReturnStatement: (node) => `return ${node.argument ? generate(node.argument) : ''};`,

        ConditionalExpression: (node) => {
            const wrap = (n) => {
                if (n.type !== 'Block') return generate(n);
                // Wrap blocks in IIFEs to handle statements and return values
                return `(() => ${generate(n)})()`;
            };
            return `(${generate(node.test)} ? ${wrap(node.consequent)} : ${wrap(node.alternate)})`;
        },

        CallExpression: (node) => {
            const callee = generate(node.callee);
            const args = node.arguments.map(generate).join(', ');
            if (callee === '_') return `console.log(${args})`;
            return `${callee}(${args})`;
        },

        MemberExpression: (node) => node.computed
            ? `${generate(node.object)}[${generate(node.property)}]`
            : `${generate(node.object)}.${generate(node.property)}`,

        BinaryExpression: (node) => `(${generate(node.left)} ${node.operator} ${generate(node.right)})`,

        Block: (node) => {
            let bodyCode = node.body.map(generate).join('\n');
            // Check for implicit return
            const lastNode = node.body[node.body.length - 1];
            if (lastNode && lastNode.type === 'ExpressionStatement') {
                const bodyWithoutLast = node.body.slice(0, -1).map(generate).join('\n');
                const lastExpr = `return ${generate(lastNode.expression)};`;
                bodyCode = (bodyWithoutLast ? bodyWithoutLast + '\n' : '') + lastExpr;
            }
            return `{\n${bodyCode.split('\n').map(l => '  ' + l).join('\n')}\n}`;
        },
        BlockStatement: (node) => generators.Block(node),

        FunctionExpression: (node) => `function(${node.params.map(generate).join(', ')}) ${generate(node.body)}`,
        ArrowFunctionExpression: (node) => {
            const params = node.params.map(generate).join(', ');
            const body = generate(node.body);
            const bodyStr = node.body.type === 'Block' || node.body.type === 'BlockStatement' ? body : `(${body})`;
            return `(${params}) => ${bodyStr}`;
        },

        ArrayLiteral: (node) => `[${node.elements.map(generate).join(', ')}]`,

        ObjectLiteral: (node) => {
            const props = node.properties.map(p => `${p.key}: ${generate(p.value)}`).join(', ');
            return `{ ${props} }`;
        },

        Identifier: (node) => node.name,
        ThisExpression: () => 'this',
        NumericLiteral: (node) => node.value,
        StringLiteral: (node) => `"${node.value}"`,
        BooleanLiteral: (node) => node.value,
        NullLiteral: () => 'null',
    };

    if (!generators[ast.type]) {
        throw new Error(`Master, I cannot generate code for AST node type: ${ast.type}`);
    }
    return generators[ast.type](ast);
}

