# Hi Language Test Results

**Run at:** 2025-09-26T15:41:18.143Z

| Test Case | Status |
|-----------|--------|
| Initialization Step | ❌ FAIL |

---

## Failures

### `Initialization Step`

**Reason:** Master, the test runner encountered a fatal error.

**Error:**
```
Error: <CONSUME> argument is invalid expecting a TokenType reference but got: <{"description":"This Object indicates the Parser is during Recording Phase"}>
 inside top level rule: <multiplicativeExpression>
    at HiParser.consumeInternalRecord (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:216:27)
    at <computed> (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:51:33)
    at HiParser.<anonymous> (file:///home/runner/work/transpiler/transpiler/src/parser.js:142:23)
    at HiParser.recordProd (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:244:19)
    at HiParser.manyInternalRecord (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:182:20)
    at <computed> (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:63:26)
    at HiParser.<anonymous> (file:///home/runner/work/transpiler/transpiler/src/parser.js:141:19)
    at HiParser.topLevelRuleRecord (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:151:17)
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:85:53
    at HiParser.TRACE_INIT (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js:44:20)
```

---

