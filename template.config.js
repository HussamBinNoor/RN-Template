module.exports = {
  // The name the React Native CLI will look for and replace in all
  // template files (filenames + file contents).
  placeholderName: 'HbnRnTemplate',

  version: '0.1.0',

  // Title shown by `npx @react-native-community/cli init ... --template .`
  title: 'HBN-RN-Template',

  // Project description shown in the CLI's help output.
  description: 'Production-grade React Native 0.87 starter with strict TypeScript, theming, navigation, forms, and 20+ UI components.',

  // Sub-directory inside this template package that contains the actual RN
  // project files. The CLI does:
  //   path.resolve(templateSourceDir, 'node_modules', <name>, templateDir)
  // — if this is `undefined`, `path.resolve` throws
  // `"The 'paths[3]' argument must be of type string. Received undefined."`.
  // This is the bug we just hit; keeping it explicit here so the next person
  // doesn't lose 30 minutes to it.
  templateDir: 'template',

  // Run after the template files are written and `yarn install` finishes.
  // This is the right place to touch things the placeholder substitution
  // doesn't cover (e.g. README copy, custom env wiring).
  postInitScript: undefined,
};
