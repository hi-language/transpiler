# Hi Language Test Results

**Run at:** 2026-11-25T20:35:56.470Z

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
    at runScriptInThisContext (node:internal/vm:219:10)
    at node:internal/process/execution:451:12
    at [stdin]-wrapper:6:24
    at runScriptInContext (node:internal/process/execution:449:60)
    at evalFunction (node:internal/process/execution:283:30)
    at evalTypeScript (node:internal/process/execution:295:3)
    at node:internal/main/eval_stdin:51:5
    at Socket.<anonymous> (node:internal/process/execution:205:5)
    at Socket.emit (node:events:526:24)

Node.js v24.22.3

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

