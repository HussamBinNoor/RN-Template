const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Ensure .ts/.tsx files with platform suffixes are resolved correctly.
    sourceExts: [...defaultConfig.resolver.sourceExts, 'mjs', 'cjs'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
