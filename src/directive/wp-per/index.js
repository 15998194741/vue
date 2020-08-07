/**
 * 权限指令注册
 * 隐藏：v-per="{ posi: 'xxx', posiGroup: ['xxx'], userIds: []}"
 * 禁用： v-per.disable="{ posi: 'xxx', posiGroup: ['xxx'], userIds: []}"
 * 不加载：v-per.remove="{ posi: 'xxx', posiGroup: ['xxx'], userIds: []}"
 */
import permission from './permission';

const install = function(Vue) {
  Vue.directive('per', permission);
};

if (window.Vue) {
  window['per'] = permission;
  Vue.use(install); // eslint-disable-line
}

permission.install = install;
export default permission;
