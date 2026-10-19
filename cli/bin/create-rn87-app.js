#!/usr/bin/env node
'use strict';

const { run } = require('../src/index');

run(process.argv.slice(2)).catch(err => {
  console.error('\n  ' + (err && err.message ? err.message : err));
  if (err && err.stack) {
    console.error('\n' + err.stack);
  }
  process.exit(err && err.exitCode ? err.exitCode : 1);
});
