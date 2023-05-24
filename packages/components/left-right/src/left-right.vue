<template>
<div class='sy-left-right-main' :style="styleComp">
  <div class='left' >
    <slot name='left'/>
  </div>
  <div class='right'>
    <slot name='right'/>
  </div>
</div>
</template>

<script>
export default {
  name: 'SyLeftRight',
  props: {
    width: {
      type: String,
      default() {
        return '50%'
      }
    }
  },
  computed: {
    styleComp() {
      const {
        width: ww
      } = this;
      let width = ww
      if (width.match(/^\d+$/g)) {
        width = `${width}px`
      }
      return {
        width
      }
    }
  }
}
</script>

<style scoped>
.sy-left-right-main {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}


</style>