<template>
<div id="app">
  <sy-split-screen-vertical>
    <template slot="left">
      <template v-for="(rr, idx) of routes">
        <div v-if="rr.meta.label" :key='idx' :class="linkClass(rr)" @click="goto(rr.name)">{{rr.meta.label}}
        </div>
        </template>
    </template>
    <template slot="right">
      <div class="right-panel">
        <router-view></router-view>
      </div>
    </template>
  </sy-split-screen-vertical>
</div>
</template>

<script>
import routes from './router/routes.js'

export default {
  name: "App",
  components: {

  },
  data() {
    return {
      route: routes[0]
    }
  },
  created() {
  },
  computed: {
    routes() {
      return routes
    },
  },
  methods: {
    linkClass(route) {
      return {
        current: route.meta.navi === this.$route.meta.navi,
        'route-link': true
      }
    },
  },
};
</script>
<style lang="css">
body, html {
  height: 100%;
}

</style>
<style lang="css" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: white;
}

#app .right-panel {
  padding: 10px;
}

#app .route-link {
  padding: 5px 10px;
  cursor: pointer;
}

#app .route-link:hover, #app .route-link.current {
  background-color: rgba(20, 20, 20, 0.8);
  color: white;
  font-weight: bolder;
}

</style>
