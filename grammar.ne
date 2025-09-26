@{%
import moo from 'moo';

export const lexer = moo.compile({
  ws:      /[ \t]+/,
  nl:      { match: /\n/, lineBreaks: true },
  comment: /\/\/.*?$/,
  number:  /0|[1-9][0-9]*(\.[0-9]+)?/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  lbrace:  '{',
  rbrace:  '}',
  lparen:  '(',
  rparen:  ')',
  dot:     '.',
  plus:    '+',
  comma:   ',',
  colon:   ':',
  eq:      '=',
  identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
});
%}

@lexer lexer

Program -> _ Statements _ {% ([,,stmts]) => ({ type: 'Program', body: stmts }) %}

Statements -> Statement (_NL Statement):* _ {%
  (d) => {
    const stmts = [d[0]];
    for (const rest of d[1]) {
      stmts.push(rest[1]);
    }
    return stmts.filter(s => s !== null && s.type !== 'Comment');
  }
%}

Statement -> Declaration {% id %}
           | Assignment {% id %}
           | ExpressionStatement {% id %}
           | Comment {% id %}

ExpressionStatement -> Expression {% (d) => ({ type: 'ExpressionStatement', expression: d[0] }) %}

Comment -> %comment {% d => ({ type: 'Comment', value: d[0].value }) %}

Declaration -> %identifier _ %colon _ Expression {%
  (d) => ({
    type: 'VariableDeclaration',
    identifier: d[0].value,
    value: d[4]
  })
%}

Assignment -> %identifier _ %eq _ Expression {%
  (d) => ({
    type: 'Assignment',
    identifier: d[0].value,
    value: d[4]
  })
%}

# Expression parsing hierarchy to handle operator precedence
Expression -> Additive {% id %}

Additive -> Additive _ %plus _ Call {% (d) => ({ type: 'BinaryExpression', operator: '+', left: d[0], right: d[4] }) %}
          | Call {% id %}

Call -> Member ( %lparen _ (ArgumentList):? _ %rparen ):? {%
    (d) => {
        if (d[1]) { // It is a function call
            return {
                type: 'CallExpression',
                callee: d[0],
                arguments: d[1][2] || []
            }
        }
        return d[0]; // Not a call, just a Member/Primary expression
    }
%}

Member -> Primary ( %dot %identifier ):* {%
    (d) => {
        let obj = d[0];
        for (const part of d[1]) {
            obj = {
                type: 'MemberExpression',
                object: obj,
                property: { type: 'Identifier', name: part[1].value }
            }
        }
        return obj;
    }
%}

Primary -> Literal {% id %}
         | Block {% id %}
         | Identifier {% id %}
         | %lparen _ Expression _ %rparen {% (d) => d[2] %}

ArgumentList -> Expression ( _ %comma _ Expression):* {%
    (d) => [d[0], ...d[1].map(m => m[3])]
%}

Identifier -> %identifier {% d => ({ type: 'Identifier', name: d[0].value }) %}

Literal -> %number {% d => ({ type: 'NumericLiteral', value: Number(d[0].value) }) %}
         | %string {% d => ({ type: 'StringLiteral', value: d[0].value }) %}

Block -> %lbrace _ (KeyValuePairs):? _ %rbrace {%
  (d) => ({ type: 'Block', properties: d[2] || [] })
%}

KeyValuePairs -> KeyValuePair (_NL KeyValuePair):* {%
  (d) => [d[0], ...d[1].map(m => m[1])]
%}

KeyValuePair -> %identifier _ %colon _ Expression {%
  (d) => ({
    type: 'Property',
    key: d[0].value,
    value: d[4]
  })
%}

_ -> (%ws | %comment):* {% () => null %}
_NL -> (_ %nl):+ {% () => null %}
