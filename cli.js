#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { hi2js } from './transpiler.js';

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("Master, please provide a single file path.");
    console.error("Usage: node cli.js <file.hi>");
    process.exit(1);
  }

  const hiFilePath = resolve(args[0]);

  try {
    const hiCode = readFileSync(hiFilePath, 'utf-8');
    const jsCode = hi2js(hiCode);
    console.log(jsCode);
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    process.exit(1);
  }
}

main();
