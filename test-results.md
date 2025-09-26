# Hi Language Test Results

**Run at:** 2025-09-26T17:09:59.761Z

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
 Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, Dot, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, Number> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, String> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, Null> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, Identifier> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, At> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, LParen> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, LBrace> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
-------------------------------
Ambiguous Alternatives Detected: <2 ,4> in <OR> inside <statement> Rule,
<Identifier, LBracket, LBracket> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:140:23
    at HiParser.TRACE_INIT (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js:44:20)
    at HiParser.performSelfAnalysis (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:66:14)
    at new HiParser (file:///home/runner/work/transpiler/transpiler/src/parser.js:221:14)
    at file:///home/runner/work/transpiler/transpiler/src/parser.js:225:23
    at ModuleJob.run (node:internal/modules/esm/module_job:325:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:606:24)
    at async run (file:///home/runner/work/transpiler/transpiler/test_runner.js:83:21)
```

---

