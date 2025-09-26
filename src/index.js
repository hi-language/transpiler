import { HiLexer } from './lexer.js';
import { parser } from './parser.js';
import { astBuilder } from './ast-builder.js';
import { generate } from './generator.js';

/**
 * Transpiles a string of Hi source code into JavaScript.
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
