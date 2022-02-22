<template lang='pug'>
  #app
    sy-v-tabs(:tabs='tabs')
      template(slot='basic-table')
        table-example
      
      template(slot='pagin-data')
        pagin-data-example
</template>

<script>
import axios from 'axios'
import TableExample from './table-example.vue'
import PaginDataExample from './pagin-data-example.vue'

const tabsData = () => {
  return [
    {
      label: '基础Table',
      slot: 'basic-table'
    },
    {
      label: '分页数据',
      slot: 'pagin-data'
    }
  ]
}


const myMixin = {
  created() {
    this.$axios = axios
  }
}

export default {
  name: 'App',
  components: {
    TableExample,
    PaginDataExample
  },
  mixins: [myMixin],
  created() {
    this.tabs = tabsData()

  },
  methods: {
    sorterChanged(sorter) {
      console.log(sorter)
    }
  }
}
</script>
<style lang="sass">
body,html
  height: 100%
</style>
<style lang='sass' scoped>
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%
</style>
