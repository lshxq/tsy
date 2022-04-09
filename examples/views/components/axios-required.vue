<template>
<div class="axios-required-main mb30">
  <p class="highlight">$axios required</p>
  <p>该组件因为会通过 this.$axios 发起ajax请求来拉取数据，使用前请确保 this上绑定了axios实例.</p>
  <div class="red">(请打开chrome浏览器的network选项卡，观察网络交互发起的请求) 
    <div class="link-style" @click="showNetwordImg = !showNetwordImg">(网络选项卡)</div>
  </div>
  <p class="mb100" v-show="showNetwordImg"><img src="../../assets/chrome-network-request.png"/></p>
</div>
</template>

<script>
export default {
  data() {
    return {
      showNetwordImg: false
    }
  }
}
</script>