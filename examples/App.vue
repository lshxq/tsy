<template>
<div id="app">
  <sy-split-screen-vertical>
    <div class="left" slot="left">
      <template v-for="(rr, idx) of routes">
        <div v-if="rr.meta.label" :key='idx' :class="linkClass(rr)" @click="goto(rr.name)">{{rr.meta.label}}
        </div>
        </template>
    </div>
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
  background-image: linear-gradient(#201010, #404040, #201010);
  color: white;
}

#app .left {
  height: 100%;
  overflow: auto;
  width: 100%;
}
#app .right-panel {
  padding: 10px;
  background: #fefefe;
  height: 100%;
  overflow: auto;
  color: black;
  box-sizing: border-box;
}

#app .route-link {
  padding: 5px 10px;
  cursor: pointer;
}

#app .route-link:hover, #app .route-link.current {
  background-color: #ff9966;
  color: white;
  font-weight: bolder;
}

</style>
