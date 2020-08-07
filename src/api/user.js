import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/auth/user/login/native',
    method: 'post',
    data
  });
}

export function getInfo(token) {
  return request({
    url: '/auth/user/parseToken',
    method: 'get',
    params: { token }
  });
}

export function getEnvInfo() {
  return request({
    url: '/auth/user/getEnvInfo',
    method: 'get'
  });
}

export function getUserListByFuzzySearch(username) {
  return request({
    url: `/auth/user/getUserListByFuzzySearch/${username}`,
    method: 'get'
  });
}

