# Hi Language Test Results

**Run at:** 2025-09-26T17:14:42.404Z

| Test Case | Status |
|-----------|--------|
| `arrays.hi` | ❌ FAIL |
| `conditionals.hi` | ❌ FAIL |
| `declarations.hi` | ✅ PASS |
| `functions.hi` | ❌ FAIL |
| `nested_object.hi` | ✅ PASS |
| `object_multi.hi` | ✅ PASS |
| `precedence.hi` | ✅ PASS |
| `simple_io.hi` | ❌ FAIL |

---

## Failures

### `arrays.hi`

**Reason:** Transpilation or execution error

**Error:**
```
Parsing error: Redundant input, expecting EOF but found: =
```

---

### `conditionals.hi`

**Reason:** Transpilation or execution error

**Error:**
```
Command failed: node
[stdin]:9
let status = ("ok"((status == "ok")) ? (() => {
                    ^

ReferenceError: Cannot access 'status' before initialization
    at [stdin]:9:21
    at runScriptInThisContext (node:internal/vm:209:10)
    at node:internal/process/execution:118:14
    at [stdin]-wrapper:6:24
    at runScript (node:internal/process/execution:101:62)
    at evalScript (node:internal/process/execution:133:3)
    at node:internal/main/eval_stdin:32:5
    at Socket.<anonymous> (node:internal/process/execution:234:5)
    at Socket.emit (node:events:536:35)
    at endReadableNT (node:internal/streams/readable:1698:12)

Node.js v20.19.5

```

**Generated JavaScript:**
```js
let a = 10;
let b = 20;
let max = ((a > b) ? (() => {
  return a;
})() : (() => {
  return b;
})());
console.log(max);
let status = ("ok"((status == "ok")) ? (() => {
  return console.log("Status is OK");
})() : null);
let grade = ((max > 15) ? (() => {
  return "A";
})() : (() => {
  return "B";
})());
console.log(grade);
```

---

### `functions.hi`

**Reason:** Transpilation or execution error

**Error:**
```
Parsing error: Expecting token of type --> RBrace <-- but found --> ',' <--
```

---

### `simple_io.hi`

**Reason:** Transpilation or execution error

**Error:**
```
Parsing error: Redundant input, expecting EOF but found: =
```

---

