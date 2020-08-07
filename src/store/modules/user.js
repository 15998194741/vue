import { login, getInfo, loginOther } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/cookie-utils';
import { resetRouter } from '@/router';
const state = {
  token: getToken(),
  id: '',
  nickName: '',
  avatar: '',
  alias: '',
  isNativeUser: false,
  permissionInfo: {}
};

const mutations = {
  SET_PERMISSION_INFO: (state, obj) => {
    state.permissionInfo = obj;
  },
  GET_PERMISSION_INFO: (state, obj) => {
    return state.permissionInfo;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.nickName = name;
  },
  SET_IS_NATIVE_USER: (state, source) => {
    state.isNativeUser = source === 1;
  },
  SET_ALIAS: (state, alias) => {
    state.alias = alias;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // 第三方登录
  otherLogin({ commit }, token) {
    return new Promise((resolve, reject) => {
      loginOther({ token }).then(response => {
        if (response.code !== 200) {
          console.error(response.data);
          resolve(response);
        } else {
          const { data } = response;
          setToken(data.token);
          commit('SET_TOKEN', data.token);
          resolve(response);
        }
      }).catch(error => {
        reject(error);
      });
    });
  },
  // user login
  login({ commit, dispatch, rootGetters }, userInfo) {
    const { username, password } = userInfo;
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwic3RhdHVzIjoxLCJ1c2VybmFtZSI6ImR1eXUiLCJwYXNzd29yZCI6IiIsImF2YXRhciI6Imh0dHBzOi8vd3AuZmFuY3lndW8uY29tL2ltYWdlL3dwL3ZlcnNpb24vaGVhZF9wb3J0cmFpdDE4LnBuZyIsImVtYWlsIjoiYWRtaW5AZmFuY3lndW8uY24iLCJzb3VyY2UiOjIsImNyZWF0ZVVzZXJJZCI6bnVsbCwidXBkYXRlVXNlcklkIjpudWxsLCJjcmVhdGVUaW1lIjoiMjAxOS0wNi0yMVQxNjowMDowMC4wMDBaIiwidXBkYXRlVGltZSI6IjIwMTktMDYtMjFUMTY6MDA6MDAuMDAwWiIsIm5pY2tOYW1lIjoi5p2c5a6HIiwiaWF0IjoxNTY4ODk1MjM3LCJleHAiOjIxNzM2OTUyMzd9.u7Lj6YoGLAlA0Ey6XAuUICtzVLvmiYG3hJXVKtFlnKI';
    // commit('SET_TOKEN', token);
    // setToken(token);
    // return new Promise((resolve, reject) => {
    //   return resolve(token)
    // })
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response;
        // 判断当前是否是开发环境
        commit('SET_TOKEN', data.token);
        setToken(data.token);
        dispatch('settings/changeSetting', { key: 'env', value: data.serverEnv }, { root: true });
        dispatch('settings/changeSetting', { key: 'loginIp', value: data.loginIp }, { root: true });
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // get user info
  getInfo({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const { data } = res;
        if (!data) {
          reject('验证失败，请重新登录。');
        }
        const { nickName, avatar, id, alias, permissionInfo, source } = data;
        commit('SET_ID', id);
        commit('SET_NAME', nickName);
        commit('SET_AVATAR', avatar);
        commit('SET_ALIAS', alias);
        commit('SET_IS_NATIVE_USER', source);
        commit('SET_PERMISSION_INFO', permissionInfo);
        dispatch('settings/changeSetting', { key: 'env', value: data.serverEnv }, { root: true });
        dispatch('settings/changeSetting', { key: 'loginIp', value: data.loginIp }, { root: true });
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '');
      removeToken();
      resetRouter();
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  },
  // 根据当前访问的项目信息，获取用户的所有职位
  getPermissions() {
    // const permissionInfo = state.permissionInfo;
    // const team = app.state.teamObj;
    // return {
    //   posiGroup: permissionInfo[team.id].posiGroupList,
    //   posi: permissionInfo[team.id].posiList
    // };
  },
  // 传入权限配置对象，判断是否拥有权限
  isPerByPosiConfig({ commit, state }, posiConfig) {
    // if (state.source === 1) {
    //   return true;
    // }
    // const permissionInfo = state.permissionInfo;
    // const team = app.state.teamObj;
    // let storeBoolean = team && team.id && permissionInfo && permissionInfo[team.id];
    // if (!storeBoolean) {
    //   return false;
    // }
    // let perFlag = false;
    // if (posiConfig.posiGroup) {
    //   perFlag = isOverlap(posiConfig.posiGroup, permissionInfo[team.id].posiGroupList);
    // }
    // if (!perFlag && posiConfig.posi) {
    //   perFlag = isOverlap(posiConfig.posi, permissionInfo[team.id].posiList);
    // }
    // return perFlag;
  }
};
function isOverlap(arr1, arr2) {
  if (!(arr1 && arr1.length > 0) || !(arr2 && arr2.length > 0)) {
    return false;
  }
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j] === arr2[i]) {
        return true;
      }
    }
  }
  return false;
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

