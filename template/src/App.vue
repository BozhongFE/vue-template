<template>
  <div id="app">{{#router}}
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>{{else}}
    <home></home>{{/router}}
  </div>
</template>

<script>{{#if_eq router false}}
import home from './views/home/index.vue';{{/if_eq}}

export default {
  name: 'app',
  data() {
    return {
    };
  },{{#if_eq router false}}
  components: {
    home,
  },{{/if_eq}}
};
</script>
