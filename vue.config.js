'use strict';
const path = require('path');
// const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = '青果灵动';
// 如果你的端口设置为80，
// 使用管理员特权执行命令行。
// 例如，Mac: sudo npm run
const port = 5001; // dev port

// 所有配置项解释都可以在 https://cli.vuejs.org/config/ 中找到
module.exports = {
  /**
   * 如果您计划在子路径下部署站点，则需要设置publicPath，
   * 例如GitHub页面。如果您计划将站点部署到https://foo.github.io/bar/，
   * 然后将publicPath设置为“/bar/”。
   * 在大多数情况下请使用'/' !!
   * 详情: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 是否开启ESlint校验
  lintOnSave: process.env.NODE_ENV === 'development',
  // lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    //在webpack的name字段中提供应用程序的标题，以便
    //可以在index.html中访问它来注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      );

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });
          config.optimization.runtimeChunk('single');
        }
      );
  }
};
