<template>
  <div class="example-blocks-main">
    <sy-left-right>
      <div class="switch-panel" slot="left">
        <sy-switch v-model="short" label-on="极简" label-off="完整UI"/>
      </div>
      <div class="block-wrapper" slot="right">
        <sy-blocks :default-visibility="true" :short="short"/>
      </div>
    </sy-left-right>
    
    
    
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
  width: 400px;
  margin: 30px;
}

.switch-panel {
  padding: 30px;
}
</style>