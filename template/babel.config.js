module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
