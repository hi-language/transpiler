/**
 * Transpiles a string of Hi source code into JavaScript.
 * @param {string} sourceCode The Hi source code.
 * @returns {string} The equivalent JavaScript code.
 */
export function hi2js(sourceCode) {
  // This will be replaced by a proper AST-based generator.
  return sourceCode
    // Comments: // ...
    .replace(/^\s*\/\/.*/gm, (match) => match)
    // Declaration: name: value -> let name = value;
    .replace(/^(?!.*\/\/.*)([\w$]+)\s*:\s*(.*)/gm, 'let $1 = $2;')
    // Assignment: name = value -> name = value;
    .replace(/^(?!.*\/\/.*)([\w$]+)\s*=\s*([^:;].*)/gm, '$1 = $2;')
    // Global output: _(...) -> console.log(...);
    .replace(/^(?!.*\/\/.*)\s*_\((.*)\)/gm, 'console.log($1);');
}

