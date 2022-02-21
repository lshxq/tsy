<template lang='pug'>
  #app
    sy-v-tabs(:tabs='tabs')
      template(slot='basic-table')
        sy-table-example
      
      template(slot='pagin-data')
        sy-pagin-data-example
</template>

<script>


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



export default {
  name: 'App',
  components: {

  },
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
