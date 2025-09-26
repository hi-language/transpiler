import { createToken, Lexer } from 'chevrotain';

// --- Category: Skipped ---
export const WhiteSpace = createToken({ name: 'WhiteSpace', pattern: /[ \t]+/, group: Lexer.SKIPPED });
export const NewLine = createToken({ name: 'NewLine', pattern: /\n|\r\n?/, group: Lexer.SKIPPED });
export const Comment = createToken({ name: 'Comment', pattern: /\/\/[^\n\r]*/, group: Lexer.SKIPPED });

// --- Category: Literals ---
export const Null = createToken({ name: 'Null', pattern: /\?\?\?/ });
export const Number = createToken({ name: 'Number', pattern: /!0|0|[1-9][0-9]*(\.[0-9]+)?/ });
export const String = createToken({ name: 'String', pattern: /"(?:\\.|[^"\\])*"/ });

// --- Category: Brackets ---
export const LBrace = createToken({ name: 'LBrace', pattern: /{/ });
export const RBrace = createToken({ name: 'RBrace', pattern: /}/ });
export const LParen = createToken({ name: 'LParen', pattern: /\(/ });
export const RParen = createToken({ name: 'RParen', pattern: /\)/ });
export const LBracket = createToken({ name: 'LBracket', pattern: /\[/ });
export const RBracket = createToken({ name: 'RBracket', pattern: /]/ });

// --- Category: Operators & Punctuation ---
export const Dot = createToken({ name: 'Dot', pattern: /\./ });
export const Comma = createToken({ name: 'Comma', pattern: /,/ });
export const Colon = createToken({ name: 'Colon', pattern: /:/ });
export const Eq = createToken({ name: 'Eq', pattern: /=/ });
export const Question = createToken({ name: 'Question', pattern: /\?/ });
export const Caret = createToken({ name: 'Caret', pattern: /\^/ });
export const At = createToken({ name: 'At', pattern: /@/ });
export const Arrow = createToken({ name: 'Arrow', pattern: /=>/ });

// -- Relational Operators
export const EqEq = createToken({ name: 'EqEq', pattern: /==/ });
export const Gt = createToken({ name: 'Gt', pattern: />/ });
export const Lt = createToken({ name: 'Lt', pattern: /</ });

// -- Additive Operators
export const Plus = createToken({ name: 'Plus', pattern: /\+/ });
export const Minus = createToken({ name: 'Minus', pattern: /-/ });

// -- Multiplicative Operators
export const Star = createToken({ name: 'Star', pattern: /\*/ });
export const Slash = createToken({ name: 'Slash', pattern: /\// });

// --- Category: Identifiers ---
export const Identifier = createToken({ name: 'Identifier', pattern: /_|[a-zA-Z][a-zA-Z0-9_]*/ });

// Order matters for the lexer
export const allTokens = [
    WhiteSpace, NewLine, Comment,
    Null, Number, String,
    LBrace, RBrace, LParen, RParen, LBracket, RBracket,
    Arrow, EqEq, Gt, Lt,
    Dot, Comma, Colon, Eq, Question, Caret, At,
    Plus, Minus, Star, Slash,
    Identifier,
];

export const HiLexer = new Lexer(allTokens);
