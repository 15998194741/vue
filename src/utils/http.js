import axios from 'axios';
import { getToken } from '@/utils/cookie-utils';

const httpConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'token, host, x-real-ip, x-forwarded-ip, accept, content-type',
    'fancy-guo-login-token': getToken()
  }
};
const $http = (url, option = {}, header = {}) => {
  return axios
    .request({ url, headers: { ...httpConfig.headers, ...header }, ...option })
    .catch(function(e) {
      console.log(e);
    });
};
const httpMiddleware = {
  post: (url, param = {}) => $http(url, { method: 'POST', data: JSON.stringify({ ...param, _k: new Date().getTime() }) }),
  option: (url, param = {}, header = { 'Content-Type': 'application/json' }) => $http(url, { method: 'POST', data: param }, header)
};
export default httpMiddleware;
