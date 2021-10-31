"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create();
instance.interceptors.request.use(function (config) {
    config.headers = Object.assign(Object.assign({}, config.headers), { "rqStartTime": new Date().getTime().toString() });
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {
    var _a, _b, _c, _d, _e;
    let status = (res === null || res === void 0 ? void 0 : res.status) || "NO_STATUS_CODE";
    let method = ((_b = (_a = res === null || res === void 0 ? void 0 : res.request) === null || _a === void 0 ? void 0 : _a.method) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || "NO_METHOD";
    let url = ((_c = res === null || res === void 0 ? void 0 : res.config) === null || _c === void 0 ? void 0 : _c.url) || "NO_URL";
    let startTime = parseInt(((_e = (_d = res.config) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e.rqStartTime) || "0");
    let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
    index_1.log.info(`[AXIOS] ${status} ${method} ${url} ${time}ms`);
    return res;
}, (res) => {
    var _a, _b, _c, _d, _e, _f;
    let response = res.response || {};
    let status = response.status || "NO_STATUS_CODE";
    let method = ((_b = (_a = res === null || res === void 0 ? void 0 : res.request) === null || _a === void 0 ? void 0 : _a.method) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || "NO_METHOD";
    let url = ((_c = res === null || res === void 0 ? void 0 : res.config) === null || _c === void 0 ? void 0 : _c.url) || "NO_URL";
    let body = ((_d = res.request) === null || _d === void 0 ? void 0 : _d.body) || {};
    let startTime = parseInt(((_f = (_e = res.config) === null || _e === void 0 ? void 0 : _e.headers) === null || _f === void 0 ? void 0 : _f.rqStartTime) || "0");
    let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
    index_1.log.error(`[AXIOS] ${status} ${method} ${url} ${time}ms\nRequest Body`, body);
    return res;
});
exports.default = instance;
