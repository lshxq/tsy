<template>
  <div class="miao-main" v-resize="mainSize">
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
    mainSize(size) {
      const rate = 1.8

      this.windowSize = size.height / size.width > rate ? {
        width: size.width,
        height: size.width * rate
      } : size
    }
  }
}
</script>

<style scoped>
.miao-main {
  height: 100%;
  width: 100%;
}
</style>