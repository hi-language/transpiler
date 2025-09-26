# Hi Language Test Results

**Run at:** 2025-09-26T15:21:31.884Z

| Test Case | Status |
|-----------|--------|
| Initialization Step | ❌ FAIL |

---

## Failures

### `Initialization Step`

**Reason:** Master, the test runner encountered a fatal error.

**Error:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/runner/work/transpiler/transpiler/transpiler.js' imported from /home/runner/work/transpiler/transpiler/test_runner.js
    at finalizeResolution (node:internal/modules/esm/resolve:283:11)
    at moduleResolve (node:internal/modules/esm/resolve:952:10)
    at defaultResolve (node:internal/modules/esm/resolve:1188:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:708:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:657:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:640:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:264:38)
    at ModuleLoader.import (node:internal/modules/esm/loader:605:34)
    at defaultImportModuleDynamicallyForModule (node:internal/modules/esm/utils:221:31)
    at importModuleDynamicallyCallback (node:internal/modules/esm/utils:260:12)
```

---

