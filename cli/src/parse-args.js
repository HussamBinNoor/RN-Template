'use strict';

/**
 * Tiny flag parser. Accepts `--name Foo --pm yarn` plus positional `<name>` and `[target]`.
 * No deps.
 */
function parseArgs(argv) {
  const out = {
    name: null,
    target: null,
    packageManager: 'yarn',
    template: null,
    skipInstall: false,
    installPods: false,
    verbose: false,
    dryRun: false,
    help: false,
    version: false,
  };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      out.help = true;
    } else if (arg === '--version' || arg === '-v') {
      out.version = true;
    } else if (arg === '--verbose') {
      out.verbose = true;
    } else if (arg === '--dry-run') {
      out.dryRun = true;
    } else if (arg === '--skip-install') {
      out.skipInstall = true;
    } else if (arg === '--install-pods' || arg === '--pods') {
      out.installPods = true;
    } else if (arg === '--template' || arg === '-t') {
      const next = argv[++i];
      if (!next) throw new Error(`Missing value for ${arg}`);
      out.template = next;
    } else if (arg.startsWith('--template=')) {
      out.template = arg.slice('--template='.length);
    } else if (arg === '--pm' || arg === '--package-manager') {
      const next = argv[++i];
      if (!next) throw new Error(`Missing value for ${arg}`);
      out.packageManager = next;
    } else if (arg.startsWith('--pm=')) {
      out.packageManager = arg.slice('--pm='.length);
    } else if (arg.startsWith('--package-manager=')) {
      out.packageManager = arg.slice('--package-manager='.length);
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown flag: ${arg}`);
    } else {
      positional.push(arg);
    }
  }
  if (positional[0]) out.name = positional[0];
  if (positional[1]) out.target = positional[1];
  return out;
}

module.exports = { parseArgs };
