<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
  #app {
    /*
   background-size: 100% 100%;
   background-repeat: no-repeat;
   background-attachment: fixed;
   background: url("assets/system_images/system-bg-01.jpg");
   */
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-scrollbar__view {
    height: 100%;
  }
  .el-select-dropdown__list {
    padding: 6px 0 10px;
  }
  .el-scrollbar__bar{
    &.is-vertical{
      width: 8px;//滚动条宽度
    }
  }
  .el-scrollbar__thumb {
    background-color: rgba(42, 58, 68, 0.51);
  }
  .el-scrollbar__thumb:hover {
    background-color: rgba(43, 76, 142, 0.68);
  }
  .mce-branding .mce-widget .mce-label .mce-flow-layout-item .mce-last {
    display: none;
  }
</style>
