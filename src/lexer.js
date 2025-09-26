import { createToken, Lexer } from 'chevrotain';

// --- Category: Skipped ---
export const WhiteSpace = createToken({ name: 'WhiteSpace', pattern: /[ \t]+/, group: Lexer.SKIPPED });
export const NewLine = createToken({ name: 'NewLine', pattern: /\n|\r\n?/, group: Lexer.SKIPPED });
export const Comment = createToken({ name: 'Comment', pattern: /\/\/[^\n\r]*/, group: Lexer.SKIPPED });

// --- Category: Literals ---
export const Number = createToken({ name: 'Number', pattern: /0|[1-9][0-9]*(\.[0-9]+)?/ });
export const String = createToken({ name: 'String', pattern: /"(?:\\["\\]|[^\n"\\])*"/ });

// --- Category: Brackets ---
export const LBrace = createToken({ name: 'LBrace', pattern: /{/ });
export const RBrace = createToken({ name: 'RBrace', pattern: /}/ });
export const LParen = createToken({ name: 'LParen', pattern: /\(/ });
export const RParen = createToken({ name: 'RParen', pattern: /\)/ });

// --- Category: Operators & Punctuation ---
export const Dot = createToken({ name: 'Dot', pattern: /\./ });
export const Plus = createToken({ name: 'Plus', pattern: /\+/ });
export const Comma = createToken({ name: 'Comma', pattern: /,/ });
export const Colon = createToken({ name: 'Colon', pattern: /:/ });
export const Eq = createToken({ name: 'Eq', pattern: /=/ });

// --- Category: Identifiers ---
export const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ });

// Order matters for the lexer
export const allTokens = [
    WhiteSpace, NewLine, Comment,
    Number, String,
    LBrace, RBrace, LParen, RParen,
    Dot, Plus, Comma, Colon, Eq,
    Identifier,
];

export const HiLexer = new Lexer(allTokens);
