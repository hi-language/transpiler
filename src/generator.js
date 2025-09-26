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
        VariableDeclaration: (node) => `let ${node.identifier} = ${generate(node.value)};`,
        Assignment: (node) => `${node.identifier} = ${generate(node.value)};`,
        
        CallExpression: (node) => {
            const callee = generate(node.callee);
            const args = node.arguments.map(generate).join(', ');
            if (callee === '_') {
                return `console.log(${args})`;
            }
            return `${callee}(${args})`;
        },
        
        MemberExpression: (node) => `${generate(node.object)}.${generate(node.property)}`,
        BinaryExpression: (node) => `(${generate(node.left)} ${node.operator} ${generate(node.right)})`,
        
        Block: (node) => {
            if (node.properties.length === 0) return '{}';
            const properties = node.properties.map(p => `  ${generate(p)}`).join(',\n');
            return `{\n${properties}\n}`;
        },
        Property: (node) => `${node.key}: ${generate(node.value)}`,
        
        Identifier: (node) => node.name,
        NumericLiteral: (node) => node.value,
        StringLiteral: (node) => node.value,
    };

    if (!generators[ast.type]) {
        throw new Error(`Unknown AST node type: ${ast.type}`);
    }
    return generators[ast.type](ast);
}
