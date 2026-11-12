module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Zod 4 ships `export * as` (ESM namespace re-exports). RN's modules-commonjs
    // transform does not handle that syntax — Metro fails with:
    //   Export namespace should be first transformed by
    //   `@babel/plugin-transform-export-namespace-from`.
    // See colinhacks/zod#4741. Keep this plugin early, before other transforms.
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.json',
        ],
        alias: {
          '@': './src',
        },
      },
    ],
    // react-native-worklets/plugin MUST be the last plugin in the list.
    'react-native-worklets/plugin',
  ],
};
