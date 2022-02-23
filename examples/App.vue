<template lang='pug'>
  #app
    sy-v-tabs(:tabs='tabs')
      template(slot='basic-table')
        table-example
      
      template(slot='pagin-data')
        pagin-data-example

      template(slot='pagin-table')
        pagin-table-example
</template>

<script>

import TableExample from './components/table-example.vue'
import PaginDataExample from './components/pagin-data-example.vue'
import PaginTableExample from './components/pagin-table-example.vue'

const tabsData = () => {
  return [
    {
      label: '基础Table',
      slot: 'basic-table'
    },
    {
      label: '分页数据',
      slot: 'pagin-data'
    },
    {
      label: '分页Table',
      slot: 'pagin-table'
    }
  ]
}




export default {
  name: 'App',
  components: {
    TableExample,
    PaginDataExample,
    PaginTableExample
  },
  created() {
    this.tabs = tabsData()

  },
  methods: {
    
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
