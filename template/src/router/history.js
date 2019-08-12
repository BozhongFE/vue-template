const { location: { host, pathname } } = window;
const isFE = /^fe/.test(host);
// eslint-disable-next-line
const isProjectPath = new RegExp(projectPath).test(pathname);
let localDev = pathname.match(/^\/[a-zA-Z]+[0-9]{2,5}/);
if (localDev) [localDev] = localDev;

export default {
  transformBefore(router) {
    const ip = /(\d{1,3}\.){3}\d{1,3}/;
    if (ip.test(host)) {
      delete router.base;
      return router;
    }
    if (router.mode === 'history') {
      if (isProjectPath && localDev) {
        // mode: /xxx8000/project-path
        // eslint-disable-next-line
        router.base = localDev + projectPath;
      } else if (isFE && localDev) {
        // mode: xxx8000
        router.base = localDev;
      }
    }
    return router;
  },
};
