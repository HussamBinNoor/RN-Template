'use strict';

const path = require('path');
const fs = require('fs');

/**
 * Resolve the target directory for the new project. Refuses to overwrite a
 * non-empty directory unless the user explicitly allows it.
 */
function resolveTarget({ name, target, cwd }) {
  const dir = target ? path.resolve(cwd, target) : path.resolve(cwd, name);

  if (!fs.existsSync(dir)) {
    return dir;
  }

  const entries = fs.readdirSync(dir);
  if (entries.length === 0) {
    return dir; // empty dir is fine
  }

  throw new Error(
    `Target directory already exists and is not empty: ${dir}\n` +
      'Pick a different name or remove the directory first.',
  );
}

module.exports = { resolveTarget };
