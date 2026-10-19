'use strict';

const { parseArgs } = require('./parse-args');
const { validateName } = require('./validate-name');
const { resolveTarget } = require('./resolve-target');
const { runInit } = require('./run-init');
const { printHelp } = require('./help');
const { printVersion } = require('./version');

async function run(argv) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (err) {
    throw Object.assign(err, { exitCode: 2 });
  }

  if (args.help) {
    printHelp();
    return;
  }
  if (args.version) {
    printVersion();
    return;
  }

  if (args.name == null || args.name === '') {
    throw Object.assign(
      new Error(
        'Project name is required. Pass it as the first argument, e.g. `create-rn87-app MyApp`.',
      ),
      { exitCode: 2 },
    );
  }

  const name = validateName(args.name);
  const target = resolveTarget({ name, target: args.target, cwd: process.cwd() });
  await runInit({
    name,
    target,
    packageManager: args.packageManager,
    template: args.template,
    skipInstall: args.skipInstall,
    installPods: args.installPods,
    verbose: args.verbose,
    dryRun: args.dryRun,
  });
}

module.exports = { run };
