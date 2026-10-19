'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { resolveTarget } = require('../resolve-target');

function tmp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'hbn-cli-'));
}

test('uses ./<name> when no target is given', () => {
  const cwd = tmp();
  try {
    const t = resolveTarget({ name: 'MyApp', target: null, cwd });
    assert.equal(t, path.join(cwd, 'MyApp'));
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});

test('uses the explicit target when given', () => {
  const cwd = tmp();
  const target = path.join(cwd, 'custom');
  try {
    const t = resolveTarget({ name: 'MyApp', target, cwd });
    assert.equal(t, target);
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});

test('accepts an existing empty directory', () => {
  const cwd = tmp();
  const dir = path.join(cwd, 'empty');
  fs.mkdirSync(dir);
  try {
    const t = resolveTarget({ name: 'MyApp', target: dir, cwd });
    assert.equal(t, dir);
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});

test('rejects a non-empty target directory', () => {
  const cwd = tmp();
  const dir = path.join(cwd, 'full');
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'keep.txt'), 'hi');
  try {
    assert.throws(() => resolveTarget({ name: 'MyApp', target: dir, cwd }), /not empty/);
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});
