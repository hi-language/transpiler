# Hi Language Test Results

**Run at:** 2025-09-26T15:38:55.459Z

| Test Case | Status |
|-----------|--------|
| Initialization Step | ❌ FAIL |

---

## Failures

### `Initialization Step`

**Reason:** Master, the test runner encountered a fatal error.

**Error:**
```
TypeError: $.SEPERATED_LIST is not a function
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording
    at HiParser.<anonymous> (file:///home/runner/work/transpiler/transpiler/src/parser.js:70:30)
    at HiParser.recordProd (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:244:19)
    at HiParser.optionInternalRecord (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:173:27)
    at <computed> (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:57:33)
    at HiParser.<anonymous> (file:///home/runner/work/transpiler/transpiler/src/parser.js:70:15)
    at HiParser.topLevelRuleRecord (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js:151:17)
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:85:53
    at HiParser.TRACE_INIT (file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js:44:20)
    at file:///home/runner/work/transpiler/transpiler/node_modules/chevrotain/lib/src/parse/parser/parser.js:84:30
    at arrayEach (file:///home/runner/work/transpiler/transpiler/node_modules/lodash-es/_arrayEach.js:15:9)
```

---

