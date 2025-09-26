@{%
const moo = require('moo');

const lexer = moo.compile({
  ws:      /[ \t]+/,
  nl:      { match: /\n/, lineBreaks: true },
  comment: /\/\/.*?$/,
  number:  /0|[1-9][0-9]*/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  lbrace:  '{',
  rbrace:  '}',
  identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
  colon:   ':',
  eq:      '=',
  lparen:  '(',
  rparen:  ')',
});
%}

@lexer lexer

# Main entry point: a program is a series of statements
Program -> _ Statements _ {% ([,,stmts]) => ({ type: 'Program', body: stmts }) %}

# Statements are separated by newlines
Statements -> Statement (_NL Statement):* _ {% 
  (d) => {
    const stmts = [d[0]];
    for (const rest of d[1]) {
      stmts.push(rest[1]);
    }
    return stmts.filter(s => s !== null); // Filter out empty lines
  }
%}

# A statement can be a declaration, assignment, or expression
Statement -> Declaration {% id %}
           | Assignment {% id %}
           | OutputCall {% id %}
           | Comment {% id %}

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

OutputCall -> %identifier %lparen _ Expression _ %rparen {%
  (d) => {
    // For now, only allow '_' as the function name
    if (d[0].value !== '_') {
        throw new Error("Only the '_' function is supported for output.");
    }
    return { type: 'OutputCall', arguments: [d[3]] }
  }
%}

# Expressions (very simple for now)
Expression -> Literal {% id %}

Literal -> %number {% d => ({ type: 'NumericLiteral', value: Number(d[0].value) }) %}
         | %string {% d => ({ type: 'StringLiteral', value: d[0].value }) %}

# Whitespace and Newlines
_ -> (%ws | %comment):* {% () => null %}
_NL -> (_ %nl):+ {% () => null %}

