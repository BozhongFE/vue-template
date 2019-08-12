import Vue from 'vue';
import App from './App.vue';{{#router}}
import router from './router';{{/router}}{{#vuex}}
import store from './vuex';{{/vuex}}

{{#routerHistoryMode}}// eslint-disable-next-line
__webpack_public_path__ = projectFullPath;
{{/routerHistoryMode}}Vue.config.productionTip = false;

new Vue({
{{#router}}  router,{{/router}}{{#vuex}}
  store,{{/vuex}}
  render: h => h(App),
}).$mount('#app');
