/**
 * Transpiles a string of Hi source code into JavaScript.
 * This is a foundational, regex-based implementation.
 * It will be replaced by a proper AST-based generator in the future.
 * @param {string} sourceCode The Hi source code.
 * @returns {string} The equivalent JavaScript code.
 */
export function hi2js(sourceCode) {
  return sourceCode
    // Preserve comments
    .replace(/^\s*\/\/.*/gm, match => match)

    // Function Declaration: name: (params) { body }
    .replace(/^([\w$]+)\s*:\s*\(([^)]*)\)\s*\{([\s\S]*?)\s*\}/gm, (match, name, params, body) => {
        const expressions = body.trim().split('\n').map(l => l.trim()).filter(Boolean);
        const lastExpression = expressions.pop() || 'undefined';
        const functionBody = [...expressions, `return ${lastExpression}`].join(';\n  ');
        return `let ${name} = (${params}) => {\n  ${functionBody};\n};`;
    })

    // Block (Object) Declaration: name: { members }
    .replace(/^([\w$]+)\s*:\s*\{([\s\S]*?)\s*\}/gm, (match, name, members) => {
        const jsMembers = members
            .trim()
            .split('\n')
            .map(line => line.trim().replace(/^([\w$]+)\s*:\s*(.*)$/, '$1: $2'))
            .join(',\n  ');
        return `let ${name} = {\n  ${jsMembers}\n};`;
    })

    // Simple Declaration: name: value
    .replace(/^([\w$]+)\s*:\s*(.*)/gm, 'let $1 = $2;')

    // Assignment: name = value
    .replace(/^([\w$]+)\s*=\s*([^:;].*)/gm, '$1 = $2;')

    // Global output: _(...)
    .replace(/^\s*_\((.*)\)/gm, 'console.log($1);')
    
    // Semicolon insertion for remaining expressions
    .split('\n')
    .map(line => {
        const trimmed = line.trim();
        if (trimmed.length > 0 && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') && !trimmed.startsWith('//')) {
            return line + ';';
        }
        return line;
    })
    .join('\n');
}
