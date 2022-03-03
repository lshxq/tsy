<template lang="pug">
  .axios-required-main.mb30
    p.highlight $axios required
    p 该组件因为会通过 this.$axios 发起ajax请求来拉取数据，使用前请确保 this上绑定了axios实例.
</template>