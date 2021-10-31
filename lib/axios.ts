import {log} from '../index';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(function (config) {
  config.headers = {
    ...config.headers,
    "rqStartTime": new Date().getTime().toString()
  };
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use((res) => {
  let status = res?.status || "NO_STATUS_CODE";
  let method = res?.request?.method?.toUpperCase() || "NO_METHOD";
  let url = res?.config?.url || "NO_URL";
  let startTime = parseInt(res.config?.headers?.rqStartTime || "0");
  let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
  log.info(`[AXIOS] ${status} ${method} ${url} ${time}ms`);
  return res;
}, (res) => {
  let response = res.response || {};
  let status = response.status || "NO_STATUS_CODE";
  let method = res?.request?.method?.toUpperCase() || "NO_METHOD";
  let url = res?.config?.url || "NO_URL";
  let body = res.request?.body || {};
  let startTime = parseInt(res.config?.headers?.rqStartTime || "0");
  let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
  log.error(`[AXIOS] ${status} ${method} ${url} ${time}ms\nRequest Body`, body);
  return res;
});

export default instance;