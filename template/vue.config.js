{{#if_or source dynamicLoadScript}}const appConfig = require('./app.config');
{{/if_or}}
module.exports = {
{{#source}}  outputDir: appConfig.outputPath,
{{/source}}{{#dynamicLoadScript}}  publicPath: appConfig.projectPath,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'index'],
      inject: false,
      bzConfigPath: appConfig.bzConfigPath,
      projectPath: appConfig.projectPath,
      publicPath: appConfig.publicPath,
    }
  },
{{else}}  publicPath: './',
{{/dynamicLoadScript}}  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
  },
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  devServer: {
    sockPort: 8080,
    disableHostCheck: true,
  },
};