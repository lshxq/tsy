<template>
  <div class="miao-main" v-resize="size => {windowSize = size}">
    <miao-ui v-if="windowSize" :width="windowSize.width" :height="windowSize.height" :images="images"/>
  </div>
</template>

<script>

import MiaoUi from './components/miao-ui.vue'

export default {
  name: 'SyMiao',
  components: {
    MiaoUi,
  },
  props: {
    images: Array
  },
  data() {
    return {
      windowSize: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.miao-main {
  height: 100%;
  width: 100%;
}
</style>