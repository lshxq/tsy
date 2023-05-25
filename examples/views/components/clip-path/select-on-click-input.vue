<template>
  <div class="clip-path-input">
    <input type="text" ref='input' :value="`clip-path: ${value}`" readonly @click="clicked">
</div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    clicked() {
      this.$refs.input.select()
    }
  }
}
</script>

<style scoped>
.clip-path-input {
  margin-top: 20px;
  width: calc(100% - 8px);
}
.clip-path-input> input {
  width: 100%;
}
</style>