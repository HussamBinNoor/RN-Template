'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parseArgs } = require('../parse-args');

test('parses a positional name', () => {
  const a = parseArgs(['MyApp']);
  assert.equal(a.name, 'MyApp');
  assert.equal(a.target, null);
});

test('parses a positional name and target', () => {
  const a = parseArgs(['MyApp', './projects/myapp']);
  assert.equal(a.name, 'MyApp');
  assert.equal(a.target, './projects/myapp');
});

test('parses --pm flag with separate value', () => {
  const a = parseArgs(['MyApp', '--pm', 'npm']);
  assert.equal(a.name, 'MyApp');
  assert.equal(a.packageManager, 'npm');
});

test('parses --pm= form', () => {
  const a = parseArgs(['MyApp', '--pm=npm']);
  assert.equal(a.packageManager, 'npm');
});

test('parses --template flag', () => {
  const a = parseArgs(['MyApp', '--template', 'hbn-rn-template']);
  assert.equal(a.template, 'hbn-rn-template');
});

test('toggles boolean flags', () => {
  const a = parseArgs(['MyApp', '--verbose', '--dry-run']);
  assert.equal(a.verbose, true);
  assert.equal(a.dryRun, true);
});

test('recognises -h and -v', () => {
  assert.equal(parseArgs(['-h']).help, true);
  assert.equal(parseArgs(['-v']).version, true);
});

test('rejects unknown long flags', () => {
  assert.throws(() => parseArgs(['MyApp', '--nope']), /Unknown flag/);
});
