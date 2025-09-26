# Hi Language Test Results

**Run at:** 2025-09-26T08:16:03.416Z

| Test Case | Status |
|-----------|--------|
| `declarations.hi` | ❌ FAIL |
| `simple_io.hi` | ✅ PASS |

---

## Failures

### `declarations.hi`

**Reason:** Transpilation or execution error

**Error:**
```
Command failed: node
[stdin]:4
let config = {;
              ^

SyntaxError: Unexpected token ';'
    at makeContextifyScript (node:internal/vm:185:14)
    at node:internal/process/execution:107:22
    at [stdin]-wrapper:6:24
    at runScript (node:internal/process/execution:101:62)
    at evalScript (node:internal/process/execution:133:3)
    at node:internal/main/eval_stdin:32:5
    at Socket.<anonymous> (node:internal/process/execution:234:5)
    at Socket.emit (node:events:536:35)
    at endReadableNT (node:internal/streams/readable:1698:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)

Node.js v20.19.5

```

**Generated JavaScript:**
```js
// This test will fail with the current regex transpiler
// because it does not handle multi-line constructs.

let config = {;
  version: "0.1"
}
console.log(config.version);

```

---

