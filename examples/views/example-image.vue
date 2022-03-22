<template lang='pug'>
.tsy-images
  .h1 图片 sy-img
  .mt30 我们经常会遇到需要迭代展示的一些图片，每次都开发相同的逻辑很烦，我对img标签做了一些封装，形成了sy-img标签。使用代码如下

  .code-block.mt30
    .intend  // pug模板
    .intend sy-img(:src='images')

  .code-block.mt30
    .intend  // 在vue上绑定的images
    .intend data() {
      .intend return {
        .intend images: [
          .intend './images/1.jpg',
          .intend './images/2.jpg',
          .intend './images/3.jpg',
          .intend './images/4.jpg'
        .intend ]
      .intend }
    .intend }

  .mt30 sy-image 接收src，src可以是一个图片的字符串，也可以 是 图片地址的数组，确保图片地址在浏览器中可以访问到即可。多个图片自动排列，有悬停点击效果，点击图片自动预览。同时至此 width和height属性，不传入大小有默认值。 默认宽度100像素。
   
  sy-img.mt30(:src='images')
</template>

<script>
export default {
  data() {
    return {
      images: [
        './images/1.jpg',
        './images/2.jpg',
        './images/3.jpg',
        './images/4.jpg'
      ]
    }
  }
}
</script>