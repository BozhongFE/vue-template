const appConfig = require('./app.config');

const config = module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      outputDir: appConfig.outputPath,
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      inject: false,
      bzConfigPath: appConfig.bzConfigPath,
      projectPath: appConfig.projectPath,
      publicPath: appConfig.publicPath,
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
  },
  chainWebpack: config => {
    // config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  devServer: {
    sockPort: 8080,
    disableHostCheck: true,
  },
};