'use strict';

const { log } = require('./log');

function printHelp() {
  log(`create-rn87-app — scaffold a React Native 0.87 app from the HBN-RN-Template

Usage:
  create-rn87-app <name> [target] [flags]

Arguments:
  <name>        PascalCase project name (required), e.g. MyApp
  [target]      Directory to scaffold into (defaults to ./<name>)

Flags:
  --pm, --package-manager <name>   Package manager: yarn (default), npm, pnpm
  -t, --template <path-or-package>  Template to use (default: hbn-rn-template)
  --skip-install                   Scaffold only; skip yarn/npm install + pods
  --install-pods, --pods           Force pod install (macOS only)
  --verbose                        Print subprocess output
  --dry-run                        Show what would happen without doing it
  -h, --help                       Show this help
  -v, --version                    Print the CLI version

Environment:
  HBN_RN_TEMPLATE   Override the template path/package (default: hbn-rn-template)

Examples:
  create-rn87-app MyApp
  create-rn87-app MyApp ./projects/my-app --pm yarn
  HBN_RN_TEMPLATE=../HbnRnTemplate create-rn87-app MyApp`);
}

module.exports = { printHelp };
