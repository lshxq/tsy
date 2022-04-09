<template>
<div class="tsy-preview-example">
  <div class="h1">图片预览 sy-preview</div>
  <div class="mt30">用于预览图片，通过images传入需要预览的图片，在需要显示预览的时候，调用组件的show(idx)来显示对应的图片。</div>
  <p>
    <sy-preview ref="previewRef" :images="images"></sy-preview><img class="image" v-for="(url, idx) of images" :src="url" @click="$refs.previewRef.show(idx)" :key='idx'/>
    <sy-preview ref="preview2Ref" :images="[images[0]]"></sy-preview>
    <el-button type="primary" @click="$refs.preview2Ref.show()">显示预览</el-button>
  </p>
  <div class="code-block mt100 pad10">
    <div class="intend">sy-preview(ref='previewRef' :images='images')</div>
    <div class="intend">// </div>
    <div class="intend">img.image(
      <div class="intend">v-for='(url, idx) of images' </div>
      <div class="intend">:src='url'</div>
      <div class="intend">@click='$refs.previewRef.show(idx)'</div>
    </div>
    <div class="intend">)</div>
  </div>
  <p class="mt100">为组件定一个ref，之后在需要通过ref调用show(index)来显示图片预览</p>
  <div class="mt100">
    <div class="h2">Props</div>
    <sy-table :columns="propTableColumns" :data="propTableData">
      <template v-slot:comment="scope">{{scope.row.comment}}</template>
    </sy-table>
  </div>
</div>
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

<style lang="css" scoped>
.image {
  max-height: 100px;
  max-width: 100px;
  border: 1px solid gray;
  margin: 10px;
  cursor: pointer;
}

</style>
