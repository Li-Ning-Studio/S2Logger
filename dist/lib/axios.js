"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("./log"));
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create();
instance.interceptors.request.use(function (config) {
    config.headers = Object.assign(Object.assign({}, config.headers), { "rqStartTime": new Date().getTime().toString() });
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {
    var _a, _b;
    let status = res.status || "NO_STATUS_CODE";
    let method = res.request.method.toUpperCase();
    let url = res.config.url;
    let startTime = parseInt(((_b = (_a = res.config) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.rqStartTime) || "0");
    let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
    log_1.default.info(`[AXIOS] ${status} ${method} ${url} ${time}ms`);
    return res;
}, (res) => {
    var _a, _b, _c;
    let response = res.response || {};
    let status = response.status || "NO_STATUS_CODE";
    let method = res.config.method.toUpperCase();
    let url = res.config.url;
    let body = ((_a = res.request) === null || _a === void 0 ? void 0 : _a.body) || {};
    let startTime = parseInt(((_c = (_b = res.config) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c.rqStartTime) || "0");
    let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
    log_1.default.error(`[AXIOS] ${status} ${method} ${url} ${time}ms\nRequest Body`, body);
    return res;
});
exports.default = instance;
