<template>
  <div class="example-blocks-main">
    <div class="switch-panel">
      <sy-switch v-model="short" label-on="极简" label-off="完整UI"/>
    </div>
    
    <div class="block-wrapper">
        <sy-blocks :default-visibility="true" :short="short"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      short: false
    }
  }
}
</script>

<style scoped>
.block-wrapper {
  width: 300px;
  margin: 30px;
}

.switch-panel {
  padding: 30px;
}
</style>