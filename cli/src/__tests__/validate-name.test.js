'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateName } = require('../validate-name');

test('accepts a PascalCase name', () => {
  assert.equal(validateName('MyApp'), 'MyApp');
});

test('accepts a single capital letter', () => {
  assert.equal(validateName('A'), 'A');
});

test('accepts names with numbers and underscores', () => {
  assert.equal(validateName('App2_Test'), 'App2_Test');
});

test('rejects empty / non-string', () => {
  assert.throws(() => validateName(''), /required/i);
  assert.throws(() => validateName(undefined), /required/i);
  assert.throws(() => validateName(null), /required/i);
});

test('rejects names with hyphens or spaces', () => {
  assert.throws(() => validateName('bad-name'), /not a valid/);
  assert.throws(() => validateName('My App'), /not a valid/);
});

test('rejects names starting with a digit', () => {
  assert.throws(() => validateName('2App'), /not a valid/);
});

test('rejects non-PascalCase names', () => {
  assert.throws(() => validateName('myApp'), /PascalCase/);
});

test('rejects reserved names', () => {
  assert.throws(() => validateName('React'), /reserved/);
  assert.throws(() => validateName('ReactNative'), /reserved/);
});
