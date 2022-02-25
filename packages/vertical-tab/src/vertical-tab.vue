<template lang="pug">
  .tsy-vertical-tab-main(ref='mainPanelRef' @mousemove='mousemove'  @mouseup='mouseup')
    .left(:style='leftStyle')
      .tabs
        .tab(:key='idx' v-for='(tab, idx) of tabs' @click='currentTabIdx = idx') {{tab.label}}
      .bar(:class='barClass' @mousedown='mousedown')
        
    .right(:style='rightStyle')
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
      leftWdith: 400,
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
        width: `${leftWdith}px`,
        flex: `1 1 ${leftWdith}px`
      }
    },
    rightStyle() {
      const {
        leftWdith
      } = this
      return {
        left: `${leftWdith}px`,
        width: `calc(100% - ${leftWdith}px)`,
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
        if( this.leftWdith < 50) {
          this.leftWdith = 50
        }
        this.lastEvent = event
      }
  }
  }
}
</script>

<style lang='sass' scoped>
  .tsy-vertical-tab-main
    height: 100%
    position: relative
    .left
      user-select: none
      border-right: 1px solid lightgray
      height: 100%
      position: absolute
      .tabs
        position: absolute
        width: 100%
        top: 0
        left: 0
        right: 0
        bottom: 0
        overflow: auto
        .tab
          padding: 5px
          margin-bottom: 5px
          font-weight: bold
          cursor: pointer
        .tab:hover 
          opacity: .8
          background-color: #f0f0f0
      .bar
        position: absolute
        top: 0
        right: 0
        bottom: 0
        width: 10px
        cursor: w-resize
      .bar:hover, .bar.show
        background-color: rgba(10, 10, 10, .5)
    .right
      position: absolute
      height: 100%
      overflow: auto
      .tab-panel
        padding: 10px 10px 50px 10px


  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>