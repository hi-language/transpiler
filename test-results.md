# Hi Language Test Results

**Run at:** 2025-09-26T15:30:47.497Z

| Test Case | Status |
|-----------|--------|
| Initialization Step | ❌ FAIL |

---

## Failures

### `Initialization Step`

**Reason:** Master, the test runner encountered a fatal error.

**Error:**
```
Error: <SUBRULE> argument is invalid expecting a Parser method reference but got: <undefined>
 inside top level rule: <equalityExpression>
    at HiParser.subruleInternalRecord (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:193:27)
    at <computed> (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:54:33)
    at HiParser.<anonymous> (file:///home/runner/work/transpiler/transpiler/src/parser.js:58:19)
    at HiParser.topLevelRuleRecord (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:151:17)
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:85:53
    at HiParser.TRACE_INIT (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js:44:20)
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:84:30
    at arrayEach (file:///home/runner/work/transpiler/transpiler/node_modules/lodash-es/_arrayEach.js:15:9)
    at forEach (file:///home/runner/work/transpiler/transpiler/node_modules/lodash-es/forEach.js:38:10)
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:80:21
```

---

