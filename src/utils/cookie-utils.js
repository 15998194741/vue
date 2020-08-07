import Cookies from 'js-cookie';

const TokenKey = 'fancy-work-plan-token';
const expires = 1024;


export function getToken() {
  return Cookies.get(TokenKey);
}

export function getUnifiedLoginToken() {
  return Cookies.get('fancy-unified-login-token');
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: expires });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getCookie(key) {
  return Cookies.get(key);
}

export function setCookie(key, val) {
  return Cookies.set(key, val, { expires: expires });
}

export function removeCookie(key) {
  return Cookies.remove(key);
}
