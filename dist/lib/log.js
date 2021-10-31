"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const loglevel_1 = __importDefault(require("loglevel"));
const loglevel_plugin_prefix_1 = __importDefault(require("loglevel-plugin-prefix"));
const browser_or_node_1 = require("browser-or-node");
const envLogLevelBackend = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.LOG_LEVEL) || 'error';
const envLogLevelFrontend = ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.NEXT_PUBLIC_LOG_LEVEL) || 'error';
loglevel_plugin_prefix_1.default.reg(loglevel_1.default);
loglevel_1.default.setLevel(browser_or_node_1.isBrowser ? envLogLevelFrontend.toLowerCase() : envLogLevelBackend.toLowerCase());
const colors = {
    "TRACE": chalk_1.default.magenta,
    "DEBUG": chalk_1.default.cyan,
    "INFO": chalk_1.default.blue,
    "WARN": chalk_1.default.yellow,
    "ERROR": chalk_1.default.red,
};
loglevel_plugin_prefix_1.default.apply(loglevel_1.default, {
    timestampFormatter(date) {
        return date.toISOString();
    },
    format(level, name, timestamp) {
        return `${chalk_1.default.gray(`[${timestamp}]`)} [${colors[level.toUpperCase()](level)}] [${chalk_1.default.magentaBright(`${name}`)}]`;
    },
});
exports.default = loglevel_1.default;
