<template lang="pug">
  .tsy-split-screen-vertical-main( @mousemove='mousemove'  @mouseup='mouseup')
    .left(:style='leftStyle')
      slot(name='left')
      .bar(:class='barClass' @mousedown='mousedown')
    .right(:style='rightStyle')
      slot(name='right')
    
</template>

<script>
export default {
  name: 'SySplitScreenVertical',
  props: {
    left: {
      type: Number,
      default() {
        return 320
      }
    }
  },
  data() {
    const {
      left:leftWdith
    } = this
    return {
      leftWdith,
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

<style lang="sass" scoped>
  .tsy-split-screen-vertical-main
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
      
</style>