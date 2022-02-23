<template lang="pug">
  .tsy-vertical-tab-main(ref='mainPanelRef' @mousemove='mousemove' @mousedown='mousedown' @mouseup='mouseup')
    .left(:style='leftStyle')
      .tabs
        .tab(:key='idx' v-for='(tab, idx) of tabs' @click='currentTabIdx = idx') {{tab.label}}
      .bar(:class='barClass')
        
    .right
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
      leftWdith: 200,
      currentTabIdx: 0,
      move: false,
    }
  },
  computed: {
    barClass() {
      return {
        show: this.move
      }
    },
    leftStyle() {
      const {
        leftWdith
      } = this
      return {
        width: `${leftWdith}px`
      }
    }
  },
  mounted() {
  },
  methods: {
    mousedown(event) {
      this.move = true
      this.lastEvent = event
    },
    mouseup() {
      this.move = false
    },
    mousemove(event) {
      const {
        lastEvent,
        move
      } = this

      if (move) {
        this.leftWdith += event.clientX - lastEvent.clientX
        this.lastEvent = event
      }
    }
  }
}
</script>

<style lang='sass' scoped>
  .tsy-vertical-tab-main
    min-height: 100%
    display: flex
    flex-flow: row nowrap
    .left
      user-select: none
      display: flex
      flew-flow: row-nowrap
      border-right: 1px solid lightgray
      .tabs
        width: 100%
        padding: 5px 10px
        .tab
          font-weight: bold
          cursor: pointer
        .tab:hover 
          opacity: .8
          background-color: #f0f0f0
      .bar
        width: 10px
        cursor: w-resize
      .bar:hover, .bar.show
        background-color: rgba(10, 10, 10, .5)
    .right
      width: 100%
      position: relative
      overflow: hidden
      .tab-panel
        display: block
        width: 100%

  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>