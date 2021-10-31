import logger from './log';
import axios from 'axios';

const instance = axios.create();
const log = logger.getLogger('AXIOS');

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
  let status = res.status || "NO_STATUS_CODE";
  let method = res.request.method.toUpperCase();
  let url = res.config.url;
  let startTime = parseInt(res.config?.headers?.rqStartTime || "0");
  let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
  log.info(`${status} ${method} ${url} ${time}ms`);
  return res;
}, (res) => {
  let response = res.response || {};
  let status = response.status || "NO_STATUS_CODE";
  let method = res.config.method.toUpperCase();
  let url = res.config.url;
  let body = res.request?.body || {};
  let startTime = parseInt(res.config?.headers?.rqStartTime || "0");
  let time = startTime != 0 ? new Date().getTime() - startTime : "Time Error";
  log.error(`${status} ${method} ${url} ${time}ms\nRequest Body`, body);
  return res;
});

export default instance;