<template lang="pug">
  .tsy-image-preview-main
    template(v-if='visibility')
      transition(name="fade")
        .mask
          .image-container
            img(:src='imgSrc')
          .right-button.round-btn(@click='next(1)' v-if='images.length > 1')
            .el-icon-arrow-right
          .left-button.round-btn(@click='next(-1)' v-if='images.length > 1')
            .el-icon-arrow-left
          .close-button.round-btn(@click='visibility = false')
            .el-icon-close

</template>

<script>
export default {
  name: 'SyPreview',
  props: {
    images: {
      type: Array,
      default() {
        return []
      }
    },
    idx: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      visibility: false,
      showIndex: 0,
    }
  },
  computed: {
    imgSrc() {
      const {
        showIndex,
        images
      } = this
      if (showIndex < images.length) {
        return images[showIndex]
      }
      return images[images.length - 1]
    }
  },
  methods: {
    show(index=0) {
      this.showIndex = index
      this.visibility = true
    },
    next(delta) {
      let idx = this.showIndex + delta
      if (idx >= this.images.length) {
        idx = 0
      } else if (idx < 0) {
        idx = this.images.length - 1
      }
      this.show(idx)
    }
  }
}
</script>

<style lang="sass" scoped>
.tsy-image-preview-main
  .trigger
    cursor: pointer
    height: auto
    display: inline-block
    padding: 0
    margin: 0
  .trigger:hover
    outline: 1px solid red
  .mask
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-color: rgba(0, 0, 0, .5)
    
    .round-btn
      position: absolute
      top: 50%
      display: flex
      justify-content: center
      align-items: center
      border-radius: 50%
      width: 45px
      height: 45px
      background-color: rgba(0, 0, 0, .3)
      color: white
      font-weight: bolder
      font-size: 26px
      cursor: pointer
    .right-button
      right: 30px
    .left-button
      left: 30px
    .close-button
      top: 30px
      right: 30px
    .image-container
      height: 100%
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      img 
        max-height: 100%
        max-width: 100%

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>