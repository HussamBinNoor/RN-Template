'use strict';

const isTty = !!process.stdout.isTTY;
const c = isTty
  ? {
      reset: '\x1b[0m',
      dim: '\x1b[2m',
      green: '\x1b[32m',
      cyan: '\x1b[36m',
      yellow: '\x1b[33m',
      red: '\x1b[31m',
      bold: '\x1b[1m',
    }
  : { reset: '', dim: '', green: '', cyan: '', yellow: '', red: '', bold: '' };

function log(...args) {
  console.log(...args);
}

function info(msg) {
  log(c.cyan + '• ' + c.reset + msg);
}
function success(msg) {
  log(c.green + '✔ ' + c.reset + msg);
}
function warn(msg) {
  log(c.yellow + '! ' + c.reset + msg);
}
function error(msg) {
  log(c.red + '✖ ' + c.reset + msg);
}
function dim(msg) {
  log(c.dim + msg + c.reset);
}

module.exports = { log, info, success, warn, error, dim, c };
