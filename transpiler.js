import { HiLexer, parser, astBuilder } from './parser.js';

/**
 * Generates JavaScript code from a Hi AST.
 * @param {object} ast The Abstract Syntax Tree.
 * @returns {string} The equivalent JavaScript code.
 */
function generate(ast) {
    if (!ast) return '';
    
    const generator = {
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

    if (!generator[ast.type]) {
        throw new Error(`Unknown AST node type: ${ast.type}`);
    }
    return generator[ast.type](ast);
}

/**
 * Transpiles a string of Hi source code into JavaScript using an AST.
 * @param {string} sourceCode The Hi source code.
 * @returns {string} The equivalent JavaScript code.
 */
export function hi2js(sourceCode) {
    if (!sourceCode.trim()) {
        return "";
    }
    // 1. Lexing
    const lexResult = HiLexer.tokenize(sourceCode);
    if (lexResult.errors.length > 0) {
        throw new Error(`Lexing error: ${lexResult.errors[0].message}`);
    }

    // 2. Parsing
    parser.input = lexResult.tokens;
    const cst = parser.program();
    if (parser.errors.length > 0) {
        const err = parser.errors[0];
        throw new Error(`Parsing error: ${err.message}`);
    }

    // 3. Building AST from CST
    const ast = astBuilder.visit(cst);

    // 4. Generating JavaScript from AST
    return generate(ast);
}
