<template lang="pug">
  #app
    sy-split-screen-vertical
      template(slot='left')
        .route-link(
          v-for='(rr, idx) of routes' 
          :key='idx' 
          @click='goto(rr.name)'
          :class='linkClass(rr)'
          v-if='rr.meta.label') {{rr.meta.label}}
      template(slot='right')
        .right-panel
          router-view
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
        current: route.meta.navi === this.$route.meta.navi
      }
    },
  },
};
</script>
<style lang="sass">
body,html
  height: 100%
</style>
<style lang="sass" scoped>
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  height: 100%
  padding: 0
  margin: 0
  background-color: rgba(200, 250, 240, .2)

  .right-panel
    padding: 10px
  
  .route-link
    padding: 5px 10px
    cursor: pointer
  .route-link:hover, .route-link.current
    background-color: rgba(20,20,20, .8)
    color: white
    font-weight: bolder
</style>
