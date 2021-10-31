"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = exports.log = void 0;
const log_1 = __importDefault(require("./lib/log"));
exports.log = log_1.default;
const axios_1 = __importDefault(require("./lib/axios"));
exports.axios = axios_1.default;
