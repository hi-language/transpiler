import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';

const testDir = 'test';
const srcDir = join(testDir, 'src');
const expectedDir = join(testDir, 'expected_output');
const resultsFile = 'test-results.md';

function generateCrashReport(error, step) {
    let report = `# Hi Language Test Results\n\n`;
    report += `**Run at:** ${new Date().toISOString()}\n\n`;
    report += `| Test Case | Status |\n`;
    report += `|-----------|--------|\n`;
    report += `| ${step} | ❌ FAIL |\n`;
    report += `\n---\n\n## Failures\n\n`;
    report += `### \`${step}\`\n\n`;
    report += `**Reason:** Master, the test runner encountered a fatal error.\n\n`;
    report += `**Error:**\n\`\`\`\n${error.stack || error.message || String(error)}\n\`\`\`\n\n`;
    report += `---\n\n`;
    return report;
}

// Centralized fatal error handler to ensure a report is always generated.
function handleFatalError(error, step = 'Unknown Step') {
  console.error(`Master, a fatal error occurred during the ${step}.`);
  console.error(error);
  const report = generateCrashReport(error, step);
  try {
    writeFileSync(resultsFile, report);
    console.log(`Failure report written to ${resultsFile}`);
  } catch (writeError) {
    console.error('CRITICAL: Failed to write the test results file.', writeError);
  }
  process.exit(1);
}

// Global handlers to catch errors outside the main execution async flow.
process.on('uncaughtException', (err) => handleFatalError(err, 'Uncaught Exception'));
process.on('unhandledRejection', (reason) => handleFatalError(reason, 'Unhandled Promise Rejection'));


function generateMarkdownReport(results) {
  let report = `# Hi Language Test Results\n\n`;
  report += `**Run at:** ${new Date().toISOString()}\n\n`;

  const summary = results.map(r => ({
    "Test Case": `\`${r.name}.hi\``,
    "Status": r.status
  }));

  report += `| Test Case | Status |\n`;
  report += `|-----------|--------|\n`;
  summary.forEach(s => {
    report += `| ${s['Test Case']} | ${s['Status']} |\n`;
  });

  const failures = results.filter(r => r.status.includes('FAIL'));
  if (failures.length > 0) {
    report += `\n---\n\n## Failures\n\n`;
    for (const failure of failures) {
      report += `### \`${failure.name}.hi\`\n\n`;
      report += `**Reason:** ${failure.reason}\n\n`;

      if (failure.reason === 'Output mismatch') {
        report += `**Expected Output:**\n\`\`\`text\n${failure.expected}\n\`\`\`\n\n`;
        report += `**Actual Output:**\n\`\`\`text\n${failure.actual}\n\`\`\`\n\n`;
      } else {
        report += `**Error:**\n\`\`\`\n${failure.error}\n\`\`\`\n\n`;
      }
      if (failure.jsCode) {
        report += `**Generated JavaScript:**\n\`\`\`js\n${failure.jsCode}\n\`\`\`\n\n`;
      }
      report += `---\n\n`;
    }
  }
  return report;
}


async function run() {
  // Dynamic import allows us to catch module-level errors.
  const { hi2js } = await import('./src/index.js');

  const testFiles = readdirSync(srcDir).filter(file => file.endsWith('.hi'));
  const results = [];

  console.log("Running Hi language tests, Master...");

  for (const file of testFiles) {
    const testCaseName = basename(file, '.hi');
    const hiFilePath = join(srcDir, file);
    const expectedOutputPath = join(expectedDir, `${testCaseName}.txt`);

    const hiCode = readFileSync(hiFilePath, 'utf-8');
    const expectedOutput = readFileSync(expectedOutputPath, 'utf-8').trim();

    let jsCode = '';
    try {
      jsCode = hi2js(hiCode);
      const actualOutput = execSync('node', {
        input: jsCode,
        encoding: 'utf-8'
      }).trim();

      if (actualOutput === expectedOutput) {
        results.push({ name: testCaseName, status: '✅ PASS' });
      } else {
        results.push({
          name: testCaseName,
          status: '❌ FAIL',
          reason: 'Output mismatch',
          expected: expectedOutput,
          actual: actualOutput,
          jsCode: jsCode
        });
      }
    } catch (error) {
      results.push({
        name: testCaseName,
        status: '❌ FAIL',
        reason: 'Transpilation or execution error',
        error: error.message,
        jsCode: jsCode
      });
    }
  }

  const markdownReport = generateMarkdownReport(results);
  writeFileSync(resultsFile, markdownReport);

  console.log(`Test run complete. Results written to ${resultsFile}`);

  if (results.some(r => r.status.includes('FAIL'))) {
    console.log("Some tests failed, Master.");
    process.exit(1);
  } else {
    console.log("All tests passed, Master.");
  }
}

// The main `run` function is now wrapped to use the fatal error handler.
run().catch(err => handleFatalError(err, 'Initialization Step'));
