<template lang="pug">
.tsy-split-screen-vertical-example-main
  .h1 纵向分屏 sy-split-screen-vertical
  .example-panel
    sy-split-screen-vertical(:left='200')
      template(slot='left') left
      template(slot='right') right
  p 我们需要一个可以把屏幕左右两块的区域，并且可以调整两侧的宽度占比，这个组件默认高度是100%

  p.mt100
    .h2 Props
    sy-table(:columns='propTableColumns' :data='propTableData')
      template(v-slot:comment='slot') {{slot.row.comment}}
  
  p.mt100
    .h2 slot
    p 有两个命名slot，分别是left 和 right。
</template>

<script>
import commentMixin from '../mixins/comment-mixins.js'

export default {
  mixins: [commentMixin],
  created() {
    this.propTableData = [
      {
        name: 'left',
        type: 'Number',
        comment: '左侧的初始宽度，默认值320px'
      }
    ]
  }
}
</script>

<style lang="sass" scoped>
.tsy-split-screen-vertical-example-main
  height: 100%
  .example-panel
    display: block
    height: 400px
    width: 800px
    border: 1px solid gray
</style>