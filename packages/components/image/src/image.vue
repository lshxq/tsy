<template lang="pug">
  .tsy-image-main
    sy-preview(ref='previewRef' :images='imagesComp')
    .tsy-image-item(v-for='(img, idx) of imagesComp' :key='idx' @click='$refs.previewRef.show(idx)')
      img(:src='img' draggable='false' :width='widthComp' :height='heightComp')
      .mask
        .text 点击预览
</template>

<script>
export default {
  name: "SyImg",
  props: {
    src: null,
    width: String,
    height: String,
    
  },
  data() {
    return {
    }
  },
  computed: {

    imagesComp() {
      const {
        src
      } = this
      const imgs = []
      if (src) {
        if (src instanceof Array) {
          for (const ss of src) {
            imgs.push(ss)
          }
        } else {
          imgs.push(src)
        }
      }
      return imgs
    },
    widthComp() {
      let {
        width
      } = this
      if (!width) {
        width = '100px'
      }
      return width
    },
    heightComp() {
      let {
        height,
      } = this
      return height
    }
  },
  methods: {
    
  },
};
</script>

<style lang="sass" scoped>
.tsy-form-main
  .input-bar
    height: 40px
    display: flex
    align-items: center
</style>

<style lang="sass" scoped>
.tsy-image-main
  display: flex
  flex-flow: row wrap
  .tsy-image-item:hover
    box-shadow: 5px 5px 5px gray
    .mask
      background: rgba(255,255,255,.6)
      .text
        display: block
      
  .tsy-image-item
    position: relative
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    background-color: white
    padding: 5px
    margin-right: 10px
    margin-bottom: 10px
    .mask
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      display: flex
      justify-content: center
      align-items: center
      .text
        display: none
        color: white
        font-size: small
</style>