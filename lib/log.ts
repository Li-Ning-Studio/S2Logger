import chalk from 'chalk';
import loglevel, { LogLevelDesc } from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import { isBrowser } from "browser-or-node";

const envLogLevelBackend = process?.env?.LOG_LEVEL || 'error';
const envLogLevelFrontend = process?.env?.NEXT_PUBLIC_LOG_LEVEL || 'error';

prefix.reg(loglevel);
loglevel.setLevel(isBrowser ? envLogLevelFrontend.toLowerCase() as LogLevelDesc:envLogLevelBackend.toLowerCase() as LogLevelDesc);

const colors:{[key:string]:chalk.Chalk} = {
  "TRACE": chalk.magenta,
  "DEBUG": chalk.cyan,
  "INFO": chalk.blue,
  "WARN": chalk.yellow,
  "ERROR": chalk.red,
};

prefix.apply(loglevel, {
  timestampFormatter(date) {
    return date.toISOString();
  },
  format(level, name, timestamp) {
    return `${chalk.gray(`[${timestamp}]`)} [${colors[level.toUpperCase()](level)}] [${chalk.magentaBright(`${name}`)}]`;
  },
});

export default loglevel;
