'use strict';

const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { log } = require('./log');

/**
 * Scaffold a new RN 0.87 project from this template using the React Native
 * CLI's `--template` flag. The template must be published (or available
 * locally) and contain a `template.config.js` with `placeholderName`.
 *
 * For local development you can run:
 *   node cli/bin/create-rn87-app.js MyApp /tmp/my-app \
 *     --template /Users/you/HbnRnTemplate
 */
async function runInit({ name, target, packageManager, template, skipInstall, installPods, verbose, dryRun }) {
  const tpl = template || process.env.HBN_RN_TEMPLATE || defaultTemplate();
  if (dryRun) {
    log('dry-run: would create', name, 'at', target, 'using', packageManager);
    log('  template:', tpl);
    log('  skipInstall:', !!skipInstall);
    log('  installPods:', !!installPods);
    return;
  }

  fs.mkdirSync(target, { recursive: true });

  log('• Scaffolding via the React Native CLI…');
  log('  template:', tpl);
  log('  name:    ', name);
  log('  target:  ', target);

  // The RN CLI installs deps by default; we always pass --skip-install and
  // run install ourselves so the user can see the output and we can keep
  // a single, predictable sequence (deps → optional pods).
  execFileSync(
    'npx',
    [
      '--yes',
      '@react-native-community/cli@latest',
      'init',
      name,
      '--template',
      tpl,
      '--skip-install',
      '--pm',
      packageManager,
    ],
    {
      cwd: target,
      stdio: verbose ? 'inherit' : 'pipe',
    },
  );

  if (skipInstall) {
    log('• Skipping dependency install (--skip-install).');
  } else {
    // Run package install using the user's chosen package manager.
    log('• Installing dependencies with', packageManager, '…');
    const installCmd = packageManager === 'npm' ? 'npm' : packageManager;
    const installArgs =
      packageManager === 'yarn' ? ['install'] : ['install', '--no-audit', '--no-fund'];
    execFileSync(installCmd, installArgs, {
      cwd: path.join(target, name),
      stdio: verbose ? 'inherit' : 'pipe',
    });
  }

  // iOS pods (macOS only). --install-pods turns the prompt into a yes.
  const shouldInstallPods =
    (installPods || process.platform === 'darwin') && process.platform === 'darwin';
  if (shouldInstallPods && !skipInstall) {
    try {
      log('• Installing iOS pods (this can take a few minutes)…');
      execFileSync('npx', ['pod-install', name], {
        cwd: target,
        stdio: verbose ? 'inherit' : 'pipe',
      });
    } catch (err) {
      log('  (skipped pod install — run `npx pod-install` manually if you build for iOS)');
      if (verbose) console.error(err);
    }
  }

  printNextSteps({ name, target, packageManager });
}

function defaultTemplate() {
  // Placeholder: when this template is published to npm as `hbn-rn-template`,
  // the CLI will default to that package name. Until then, callers must pass
  // `--template` or set HBN_RN_TEMPLATE.
  return 'hbn-rn-template';
}

function printNextSteps({ name, target, packageManager }) {
  const rel = path.relative(process.cwd(), path.join(target, name));
  log('');
  log('✔ Done! Your new app lives at ' + path.join(target, name));
  log('');
  log('Next steps:');
  log('  cd ' + (rel || '.'));
  log('  ' + packageManager + ' start');
  log('  ' + packageManager + ' android   # or: ' + packageManager + ' ios');
}

module.exports = { runInit };
