
const focus = {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      // 检查点击是在el和他的孩子们
      if (!(el == event.target || el.contains(event.target))) {
        // 如果是，则调用属性值中提供的方法
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};

const install = function(Vue) {
  Vue.directive('d-focus', focus);
};

if (window.Vue) {
  window['d-focus'] = focus;
  Vue.use(install); // eslint-disable-line
}

focus.install = install;
export default focus;
