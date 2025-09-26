import nearley from 'nearley';
import grammar from './grammar.js';

/**
 * Generates JavaScript code from a Hi AST.
 * @param {object} ast The Abstract Syntax Tree.
 * @returns {string} The equivalent JavaScript code.
 */
function generate(ast) {
    if (!ast) return ''; // Handle potential nulls from grammar
    
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
    // 1. Create a nearley parser instance from our compiled grammar
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try {
        // 2. Feed the source code to the parser
        parser.feed(sourceCode);

        // 3. Check for ambiguity and get the AST
        if (parser.results.length > 1) {
            console.warn("Master, the grammar is ambiguous. Using the first parse tree.");
        }
        if (parser.results.length === 0) {
            // Throw an error only if the input was not empty.
            if (sourceCode.trim().length > 0) {
              throw new Error("Unexpected end of input. The code is incomplete.");
            }
            return ""; // Return empty string for empty input.
        }
        const ast = parser.results[0];

        // 4. Generate JavaScript from the AST
        return generate(ast);

    } catch (err) {
        // Provide a more helpful error message
        const message = err.message.replace(/ Instead, I found a "[^"]+" token here:/, ".");
        throw new Error(`Parsing error: ${message}`);
    }
}
