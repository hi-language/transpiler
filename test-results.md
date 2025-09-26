# Hi Language Test Results

**Run at:** 2025-09-26T15:43:22.618Z

| Test Case | Status |
|-----------|--------|
| Initialization Step | ❌ FAIL |

---

## Failures

### `Initialization Step`

**Reason:** Master, the test runner encountered a fatal error.

**Error:**
```
Error: Parser Definition Errors detected:
 Ambiguous Alternatives Detected: <4 ,5> in <OR> inside <primary> Rule,
<LParen, Identifier, Comma> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <4 ,5 ,7> in <OR> inside <primary> Rule,
<LParen, Identifier, RParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LParen, Identifier, Comma> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LParen, Identifier, RParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LParen, RParen, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Colon> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Eq> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, Caret> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Caret, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Dot> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Star> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Slash> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Plus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Minus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, EqEq> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Question> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Caret> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Number, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Dot> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Star> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Slash> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Plus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Minus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, EqEq> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Question> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Caret> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, String, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Dot> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Star> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Slash> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Plus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Minus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, EqEq> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Question> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Caret> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Null, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Dot> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Star> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Slash> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Plus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Minus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, EqEq> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Question> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Caret> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, Identifier, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Dot> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Star> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Slash> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Plus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Minus> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, EqEq> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Question> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Caret> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, At, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, RParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, Caret> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LBracket, RBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <1 ,2> in <OR> inside <arrowExpression> Rule,
<LBrace, LParen, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
-------------------------------
Ambiguous alternatives: <1 ,2> due to common lookahead prefix
in <OR> inside <arrowExpression> Rule,
<LBrace, RBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:140:23
    at HiParser.TRACE_INIT (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js:44:20)
    at HiParser.performSelfAnalysis (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:66:14)
    at new HiParser (file:///home/runner/work/transpiler/transpiler/src/parser.js:177:14)
    at file:///home/runner/work/transpiler/transpiler/src/parser.js:181:23
    at ModuleJob.run (node:internal/modules/esm/module_job:325:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:606:24)
    at async run (file:///home/runner/work/transpiler/transpiler/test_runner.js:83:21)
```

---

