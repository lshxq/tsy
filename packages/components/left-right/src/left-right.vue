<template>
<div class='sy-left-right-main'>
  <div class='left'>
    <slot name='left'/>
  </div>
  <div class='right'>
    <slot name='right'/>
  </div>
</div>
</template>

<script>
export default {
  name: 'SyLeftRight'
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