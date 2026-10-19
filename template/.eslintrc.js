module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    'coverage/',
    'build/',
    'dist/',
    '__tests__/fixtures/',
  ],
  rules: {
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    // forwardRef / memo / useImperativeHandle idiom intentionally uses the
    // same name as the export, so this rule is more noise than signal here.
    '@typescript-eslint/no-shadow': 'off',
    'no-shadow': 'off',
    // Inlined lambdas for tabBarIcon / listItem / etc. are stable in this
    // template and the warning isn't actionable without restructuring the
    // navigator API.
    'react/no-unstable-nested-components': 'off',
  },
};
