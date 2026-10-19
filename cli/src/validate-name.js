'use strict';

/**
 * Validate a React Native project name. Mirrors the rules of the RN CLI:
 *  - Must be a non-empty string
 *  - Must start with a letter
 *  - Can only contain letters, numbers, underscores, and dollar signs
 *  - PascalCase is recommended (the React Native CLI rejects otherwise)
 */
const RESERVED = new Set(['React', 'ReactNative']);

function validateName(raw) {
  if (typeof raw !== 'string' || raw.length === 0) {
    throw new Error('Project name is required.');
  }
  if (!/^[A-Za-z][A-Za-z0-9_$]*$/.test(raw)) {
    throw new Error(
      `"${raw}" is not a valid React Native project name. ` +
        'Use PascalCase letters, numbers, and underscores only (start with a letter).',
    );
  }
  if (RESERVED.has(raw)) {
    throw new Error(`"${raw}" is reserved by React Native. Pick a different name.`);
  }
  if (raw[0] !== raw[0].toUpperCase()) {
    // The React Native CLI only accepts PascalCase names.
    throw new Error(
      `"${raw}" is not in PascalCase. React Native requires names like "MyApp" — try "${raw[0].toUpperCase()}${raw.slice(1)}".`,
    );
  }
  return raw;
}

module.exports = { validateName };
