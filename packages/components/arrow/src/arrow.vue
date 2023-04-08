<template>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" :width="6 + 8 * count" height="14">
  <polyline v-for="(line, idx) of lines" :key="idx" :points="line" :style="`fill:none; stroke:${color}; stroke-width:2`" />
</svg>
</template>
<script>
export default {
  name: 'SyArrow',
  props: {
    count: {
      type: Number,
      default() {
        return 1;
      }
    },
    color: {
      type: String,
      default() {
        return 'gray'
      }
    }
  },
  computed: {
    lines() {
      const {
        count
      } = this
      const arr = [];
      let x = 0;
      for (let idx=0; idx<count; idx++) {
        arr.push(`${x},1 ${7 + x},7 ${x},14`);
        x+=8
      }
      return arr;
    }
  }
}
</script>
<style scoped>
svg {
  padding: 0;
  margin: 0;
}
</style>