/**
 * 权限具体控制中心
 */
import store from '../../store';
// 判断是否拥有权限，若有权限返回true;
function isPerHandle(posiConfig) {
  // 管理员暂不设置权限
  const userId = store.getters.userId;
  if (userId === 1) {
    return true;
  }
  // 判断是否存在userIds
  if (posiConfig.userIds && posiConfig.userIds.includes(userId)) {
    return true;
  }
  const permissionInfo = store.getters.permissionInfo;
  const team = store.getters.team;
  let storeBoolean = team && team.id && permissionInfo && permissionInfo[team.id];
  if (!storeBoolean) {
    return false;
  }
  let perFlag = false;
  if (posiConfig.posiGroup) {
    perFlag = isOverlap(posiConfig.posiGroup, permissionInfo[team.id].posiGroupList);
  }
  if (!perFlag && posiConfig.posi) {
    perFlag = isOverlap(posiConfig.posi, permissionInfo[team.id].posiList);
  }
  return perFlag;
}
function setDisableStyle(el) {
  switch (el.tagName) {
    case 'INPUT':
      el.readOnly = 'readonly';
      break;
  }
  el.style.backgroundColor = '#f5f7fa';
  el.style.borderColor = '#e4e7ed';
  el.style.color = '#c0c4cc';
  el.disable = true;
  el.disabled = true;
  el.onclick = null;
  // console.log(el);
  el.style.cursor = 'not-allowed';
}
// 递归设置元素的属性
function recursiveSetDisable(childNodes) {
  if (!(childNodes && childNodes.length > 0)) {
    return;
  }
  childNodes.forEach(childDom => {
    if (!childDom.tagName) {return;}
    setDisableStyle(childDom);
    recursiveSetDisable(childDom.childNodes);
  });
}
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
const permission = {
  // 只调用一次，指令第一次绑定到元素时调用
  bind: function(el, binding, vnode, oldVnode) {
    let posiConfig = JSON.parse(JSON.stringify(binding.value));
    if (!(posiConfig && (posiConfig.posi || posiConfig.posiGroup|| posiConfig.userIds))) {
      console.error('请检查权限指令表达式是否正确', el);
      return;
    }
    if (posiConfig.posi && typeof posiConfig.posi === 'string') {
      posiConfig.posi = [posiConfig.posi];
    }
    if (posiConfig.posiGroup && typeof posiConfig.posiGroup === 'string') {
      posiConfig.posiGroup = [posiConfig.posiGroup];
    }
    let perFlag = isPerHandle(posiConfig);
    if (perFlag) { return;}
    // 设置禁用样式
    if (binding.modifiers && binding.modifiers.disable) {
      setDisableStyle(el)
      recursiveSetDisable(el.childNodes);
      return;
    }
    el.style.display = 'none';
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
  inserted: function(el, binding, vnode, oldVnode) {
    // 判断是否加载
    if (binding.modifiers && !binding.modifiers.remove) {
      return;
    }
    let posiConfig = JSON.parse(JSON.stringify(binding.value));
    if (!(posiConfig && (posiConfig.posi || posiConfig.posiGroup))) {
      console.error('请检查权限指令表达式是否正确', el);
      return;
    }
    if (posiConfig.posi && typeof posiConfig.posi === 'string') {
      posiConfig.posi = [posiConfig.posi];
    }
    if (posiConfig.posiGroup && typeof posiConfig.posiGroup === 'string') {
      posiConfig.posiGroup = [posiConfig.posiGroup];
    }
    let perFlag = isPerHandle(posiConfig);
    if (perFlag) { return;}
    el.parentNode.removeChild(el);
  },
  // 只调用一次，指令与元素解绑时调用
  unbind: function(el) {
  }
};

export default permission;
