<template lang="pug">
.tsy-vertical-tab-main
  sy-split-screen-vertical
    template(slot='left')
      .tabs
        .tab(:key='idx' v-for='(tab, idx) of tabs' @click='currentTabIdx = idx') {{tab.label}}
      
        
    template(slot='right')
      transition(name="fade" :key='idx' v-for='(tab, idx) of tabs')
        .tab-panel(v-if='currentTabIdx === idx' )
          slot(:name='tab.slot')
</template>

<script>

export default {
  name: 'SyVTabs',
  props: {
    tabs: { // 表格数据
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentTabIdx: 0,
    }
  },
  
  mounted() {
  },
  
}
</script>

<style lang='sass' scoped>
  .tsy-vertical-tab-main
    height: 100%
    position: relative
    
    .tab-panel
      height: 100%
      padding: 10px 10px 50px 10px

  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>