# fancy-wp-view


# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:8602](http://localhost:8602)

## 发布

```bash

# 构建生产环境
npm run build
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

# 项目结构
 .gitignore -- git忽略文件的配置
 | fancy-wp-view
     | build
     | dist -- 前端打包的文件夹
     | node_modules -- 依赖模块
     | pubilc -- 公共文件夹
     | src -- 开发文件夹
         | api 提供了请求后台的Ajax，封装了http请求
         | assets 存放静态文件的，图片
         | components 全局组件，放一些整个项目都会用得到的
         | directive 全局指令
         | icons icon的图标管理
         | layout 基础布局
         | router 全局路由
         | store 全局状态管理vuex
         | style 全局样式
         | utils 工具方法
         | view 视图-需要开发的页面
 			| login 登录页面
 			| business 业务页面
 				| test-1 案例页面1
 					| index.vue 案例页面1-首页
 					| components 案例页面1-私有组件文件夹
 						| test-table.vue 案例页面1-表格组件
 			| system-mg 后台管理页面
         | App.vue vue的入口文件
         | main.js 启动函数
         | permission.js 路由权限，封装了的路由拦截器
         | setting.js 配置文件
     | package.json npm的包管理配置文件
     | vue.config.js 针对于vue项目的配置文件


- `Vuex`：
  - `modules`：模块拆分
    - `state`：状态数据
      - `user`：用户信息
        - `token`：令牌
        - `ceshi`：测试属性
        - `id`：用户 `id`
        - `avatar`：使用者
        - `alias`：花名
        - `roleId`：职位 `ID`
        - `isNativeUser`：是否为本机用户，默认为 `false`
        - `permissionInfo`：权限信息对象
    - `mutations`：同步消息
      - `SET_PERMISSION_INFO`：修改权限信息
      - `GET_PERMISSION_INFO`：获取权限信息
      - `SET_TOKEN`：修改 `token`
      - `SET_NAME`：修改昵称
      - `SET_IS_NATIVE_USER`：修改 `isNativeUser` （是否为本机用户）
      - `SET_ALIAS`：修改花名
      - `SET_ID`：修改 `ID`
      - `SET_AVATAR`：修改使用者
    - `actions`：异步消息：
      - `otherLogin`：第三方登录
        - 成功：
          - 设置 `token`
          - 修改 `state`
            - `token`
        - 失败：
          - `reject` 异常
      - `login`：登录
        - 成功：
          - 设置 `token`
          - 修改 `state`
            -  `token`
          - 修改设置
        - 失败：
          - `reject` 异常
      - `getInfo`：获取用户信息
        - 成功：
          - 修改 `state`
            - `id`
            - 昵称
            - `avatar`
            - 花名
            - `isNativeUser`
            - `permissionInfo`
          - 修改设置
        - 失败：
          - `reject` 异常
      - `logout`：注销登录
        - 成功：
          - 修改 `state`
            - 置空 `token`
          - 清除 `token`
          - 重置路由
          - `resolve` 空
      - `resetToken`：重置 `token`
        - 成功
          - 修改 `state`
            - 置空 `token`
          - 清除 `token`
          - `resolve` 空
      - `getPermissions`：获取用户职位
        - 暂无
      - `isPerByPosiConfig`：根据权限配置对象判断是否拥有权限
        - 暂无
- `getters`：计算状态数据
  - `token`：用户令牌
  - `avatar`：使用者
  - `nickName`：昵称
  - `userId`：用户 `ID`
  - `isNativeUser`：是否为本机用户
  - `permissionInfo`：权限信息对象
  - `user`：用户信息