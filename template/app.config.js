const { existsSync } = require('fs');
const path = require('path');
const assert = require('assert');
const { copySync } = require('fs-extra');

const env = process.env.NODE_ENV;
const npmConfigSource = process.env.npm_config_source;
const appConfig = {
  publicPath: '/cropper/',
  projectPath: '/cropper/',
  outputPath: path.resolve(npmConfigSource, './cropper/'),
  bzConfigPath: env === 'development' ? 'https://source.office.bzdev.net/common/js/config.js' : '/common/js/config.js',
};

assert(appConfig.publicPath, 'publicPath 填写项目发布地址的路径');
assert(appConfig.projectPath, 'projectPath 填写项目打包输出的路径');

if (typeof npmConfigSource === 'undefined') {
  console.log('请先配置打包输出的source根目录');
  console.log('Example: npm config set source "D:\\source"'); 
  throw new Error('没有配置模块路径');
} else if (!existsSync(npmConfigSource)) {
  throw new Error('source根目录不存在，请检查配置的 source 根目录是否正确');
}
/**
 * 将分享图复制到输出目录
 */
appConfig.CopyShareImg = class CopyShareImg {
  apply(compiler) {
    compiler.plugin('done', (compilation, callback) => {
      console.log('开始将分享图复制到输出目录');
      const shareExists =  existsSync(path.resolve(__dirname, './src/assets/img/share'));
      if (!shareExists) {
        return console.log('分享源图目录不存在', './src/assets/img/share/');
      }
      copySync(path.resolve(__dirname, './src/assets/img/share'), path.resolve(outputPath));
      return callback && callback;
    });
  }
};

module.exports = appConfig;