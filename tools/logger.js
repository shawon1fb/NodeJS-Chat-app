const chalk = require('chalk');
const _log = console.log;

function error(v) {
    // _log(chalk.hex('#fa1616').bold(v.toString()));
    _log(chalk.hex('#d92027').bold(v.toString()));
}

function success(v) {
    _log(chalk.hex('#438a5e').bold(v.toString()));
}

function json(v) {

    _log(chalk.hex('#1b6ca8 ').bold(v.toString()));
}

function data(v) {
    _log(chalk.hex('#ff9234 ').bold(v.toString()));
}


function log(v) {
    _log(chalk.hex('#ff4301 ').bold(v.toString()));
  //  _log(chalk.hex('#3b6978 ').bold(v.toString()));
}

module.exports = {
    error,
    success,
    json,
    data,
    log,
}