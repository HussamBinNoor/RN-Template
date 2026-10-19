'use strict';

const pkg = require('../package.json');

function printVersion() {
  process.stdout.write(`create-rn87-app ${pkg.version}\n`);
}

module.exports = { printVersion };
