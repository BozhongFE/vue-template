module.exports = {
  template: {
    filters: {
      'src/vuex/**/*': 'vuex',
      'src/router/**/*': 'router',
      'src/router/history.js': 'routerHistoryMode',
      'src/views/404.vue': 'router',
      'src/views/sitemap.vue': 'router',
      'src/views/home/components/nav.vue': 'router',
      // 'bz.config.js': 'router',
    },
  },
  destination: {
    removes: {
      'src/router.js': 'routerHistoryMode',
      'src/assets/logo.png': 'true'
    },
    transforms: {
      'package.json': (content, _) => {
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
