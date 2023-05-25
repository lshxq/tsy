<template>
<div class="example-color">
  <div class="palette">
    
  </div>
  <div>
    
    <div><input type="color" v-model="color"></div>
    <div class="color-value">{{color}}</div>
  </div>
</div>
</template>

<script>


export default {
  data() {
    return {
      color: '#ff0000'
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.example-color {
  --palette-size: 300px;
  padding: 30px;
}

.example-color>.palette {
  display: inline-block;
  width: var(--palette-size);
  height: var(--palette-size);
  border-radius: 50%;
  background: conic-gradient(red, green, blue, red);
}

.color-value {
  margin-top: 30px;
}
</style>