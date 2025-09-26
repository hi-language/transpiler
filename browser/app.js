import { hi2js } from '../transpiler.js';

document.addEventListener('DOMContentLoaded', () => {
    const hiInput = document.getElementById('hi-input');
    const jsOutput = document.getElementById('js-output');

    const transpile = () => {
        const hiCode = hiInput.value;
        try {
            const jsCode = hi2js(hiCode);
            jsOutput.value = jsCode;
            jsOutput.style.color = '#333';
        } catch (e) {
            jsOutput.value = `Error: ${e.message}`;
            jsOutput.style.color = 'red';
        }
    };

    hiInput.addEventListener('input', transpile);

    hiInput.value = `// Welcome, Master.
message: "Hello from the browser!"
_(message)

// Try changing the value
count: 10
count = count + 5
_("The new count is", count)
`;
    transpile();
});
