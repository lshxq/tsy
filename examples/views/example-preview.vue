<template lang="pug">
  .tsy-preview-example
    .h1 图片预览 sy-preview

    .mt30 用于预览图片，通过images传入需要预览的图片，在需要显示预览的时候，调用组件的show(idx)来显示对应的图片。
    p
      sy-preview(ref='previewRef' :images='images')
      img.image(v-for='(url, idx) of images' :src='url' @click='$refs.previewRef.show(idx)')

    

      sy-preview(ref='preview2Ref' :images='[images[0]]')
      el-button(type='primary' @click='$refs.preview2Ref.show()') 显示预览
    .code-block.mt100.pad10
      .intend sy-preview(ref='previewRef' :images='images')
      .intend // 
      .intend img.image(
        .intend v-for='(url, idx) of images' 
        .intend :src='url'
        .intend @click='$refs.previewRef.show(idx)'
      .intend )
    p.mt100 为组件定一个ref，之后在需要通过ref调用show(index)来显示图片预览

    p.mt100
      .h2 Props
      sy-table(:columns='propTableColumns' :data='propTableData')
        template(v-slot:comment='scope') {{scope.row.comment}}
</template>

<script>
import commentMixins from "../mixins/comment-mixins.js";

export default {
  mixins: [commentMixins],
  created() {
    this.propTableData = [
      {
        name: "images",
        type: "Array<URL>",
        comment: "需要预览的图片的url数组.",
      },
    ];
  },
  data() {
    return {
      images: [
        "./images/1.jpg",
        "./images/2.jpg",
        "./images/3.jpg",
        "./images/4.jpg",
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.image
  max-height: 100px
  max-width: 100px
  border: 1px solid gray
  margin: 10px
  cursor: pointer
</style>
