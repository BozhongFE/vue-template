module.exports = {
  prompts: [
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
      default: true,
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
      'app.config.js': 'router',
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
          dependencies: {
            'fs-extra': '^8.1.0',
          },
        })
        return JSON.stringify(pkg, undefined, 2);
      }
    }
  }
};
