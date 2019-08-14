const path = require('path');{{#dynamicLoadScript}}
const assert = require('assert');{{/dynamicLoadScript}}{{#source}}
const { existsSync } = require('fs');{{/source}}

const {
{{#dynamicLoadScript}}  NODE_ENV: env,
{{/dynamicLoadScript}}{{#source}}  NPM_CLI_JS: isNpm,
  npm_config_source: npmConfigSource,{{/source}}
} = process.env;{{#source}}
const sourcePath = isNpm ? npmConfigSource : 'npm_config_source';{{/source}}{{#dynamicLoadScript}}
const isDev = env === 'development';
const isProduct = env === 'production';{{/dynamicLoadScript}}
const appConfig = {
{{#dynamicLoadScript}}  publicPath: '/wcltest/hello/',
  projectPath: '/cropper/',
  bzConfigPath: '/common/js/config.js',
{{/dynamicLoadScript}}{{#source}}  outputPath: path.resolve(sourcePath, './cropper/'),{{/source}}
}
{{#dynamicLoadScript}}
/**
 * env: development
 */
if (isDev) {
  Object.assign(appConfig, {
    publicPath: undefined,
    projectPath: '/',
    bzConfigPath: 'https://source.office.bzdev.net/common/js/config.js',
  });
}
/**
 * env: prodcution
 */
if (isProduct) {
  assert(appConfig.publicPath, 'publicPath 填写项目发布地址的路径');
  assert(appConfig.projectPath, 'projectPath 填写项目打包输出的路径');
}
{{/dynamicLoadScript}}
{{#source}}
/**
 * env: npm run xxx
 */
if (isNpm) {
  if (typeof sourcePath === 'undefined') {
    console.log('请先配置打包输出的source根目录');
    console.log('Example: npm config set source "D:\\source"'); 
    throw new Error('没有配置模块路径');
  } else if (!existsSync(sourcePath)) {
    throw new Error('source根目录不存在，请检查配置的 source 根目录是否正确');
  }
}{{/source}}
module.exports = appConfig;
