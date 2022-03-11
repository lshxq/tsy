<template lang="pug">
  .tsy-scrollpanel-main(:style='mainPanelStyleComp')
    sy-panel(@mounted='updateContentSize' @resize='updateContentSize')
      slot
    .handler(:style='handleStyleComp')
</template>

<script>
export default {
  name: 'SyScroll',
  props: {
    height: {
      type: String,
      default() {
        return 'auto'
      }
    }
  },
  data() {
    return {
      contentHeight: 0
    }
  },
  computed: {
    mainPanelStyleComp() {
      const {
        height
      } = this
      return {
        height
      }
    },
    handleStyleComp() {
      return {
        top: `${10}px`,
        height: `${50}px`
      }
    }
  },
  methods: {
    updateContentSize(size) {
      this.contentHeight = size.height
    }
  }
}
</script>

<style lang='sass' scoped>
.tsy-scrollpanel-main:hover
  .handler
    display: inline-block
.tsy-scrollpanel-main
  overflow: hidden
  position: relative
  .handler
    top: 0
    display: inline-block
    width: 6px
    height: 100px
    position: absolute
    right: 6px
    border-radius: 3px
    background-color: rgba(220, 220, 220, .6)
  
</style>