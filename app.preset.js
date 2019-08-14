module.exports = {
  prompts: [
    {
      name: 'router',
      type: 'confirm',
      message: 'Use Router?',
      default: false,
    },
    {
      name: 'routerHistoryMode',
      type: 'confirm',
      message: 'Use Router History Mode?',
      default: false,
    },
    {
      name: 'less',
      type: 'confirm',
      message: 'Use Less?',
      default: false,
    },
    {
      name: 'vuex',
      type: 'confirm',
      message: 'Use Vuex?',
      default: false,
    },
    {
      name: 'redirected',
      type: 'confirm',
      message: 'Will be redirected?',
      default: false,
    },
    {
      name: 'source',
      type: 'confirm',
      message: 'output to source repository?',
      default: false,
    },
  ],
  presetTransform: (preset, _) => {
    _.merge(preset, {
      dynamicLoadScript: preset.redirected || preset.routerHistoryMode,
    });
    return preset;
  },
  template: {
    filters: {
      'src/vuex/**/*': 'vuex',
      'src/router/**/*': 'router',
      'src/views/404.vue': 'router',
      'src/views/sitemap.vue': 'router',
      'src/views/home/components/nav.vue': 'router',
      'app.config.js': 'source || redirected || routerHistoryMode',
    },
  },
  destination: {
    removes: {
      'src/store.js': 'vuex',
      'src/router.js': 'router',
      'src/assets/logo.png': 'true'
    },
    transforms: {
      'package.json': (content, preset, _) => {
        let pkg;
        try {
          pkg = JSON.parse(content);
        } catch (err) {
          pkg = content;
        }
        delete pkg.eslintConfig;
        _.merge(pkg, {
          devDependencies: {
            'fs-extra': '^8.1.0',
          },
        })
        return JSON.stringify(pkg, undefined, 2);
      }
    }
  }
};
