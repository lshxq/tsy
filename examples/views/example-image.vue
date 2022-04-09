<template>
<div class="tsy-images">
  <div class="h1">图片 sy-img</div>
  <div class="mt30">我们经常会遇到需要迭代展示的一些图片，每次都开发相同的逻辑很烦，我对img标签做了一些封装，形成了sy-img标签。使用代码如下</div>
  <div class="code-block mt30">
    <div class="intend"> // pug模板</div>
    <div class="intend">sy-img(:src='images')</div>
  </div>
  <div class="code-block mt30">
    <div class="intend"> // 在vue上绑定的images</div>
    <div class="intend">data() {
      <div class="intend">return {
        <div class="intend">images: [
          <div class="intend">'./images/1.jpg',</div>
          <div class="intend">'./images/2.jpg',</div>
          <div class="intend">'./images/3.jpg',</div>
          <div class="intend">'./images/4.jpg'</div>
        </div>
        <div class="intend">]</div>
      </div>
      <div class="intend">}</div>
    </div>
    <div class="intend">}</div>
  </div>
  <div class="mt30">sy-image 接收src，src可以是一个图片的字符串，也可以 是 图片地址的数组，确保图片地址在浏览器中可以访问到即可。多个图片自动排列，有悬停点击效果，点击图片自动预览。同时至此 width和height属性，不传入大小有默认值。 默认宽度100像素。</div>
  <sy-img class="mt30" :src="images"></sy-img>
</div>
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