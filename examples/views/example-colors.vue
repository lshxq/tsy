<template>
<div>
  <div class="colors-main">
    <div class="color-item" v-for="col of colorsR" :key="col" :style="styled(col)">{{col}}</div>
  </div>
  <div class="colors-main">
    <div class="color-item" v-for="col of colorsG" :key="col" :style="styled(col)">{{col}}</div>
  </div>
  <div class="colors-main">
    <div class="color-item" v-for="col of colorsB" :key="col" :style="styled(col)">{{col}}</div>
  </div>
</div>
</template>

<script>

const ff = n => {
  const hex = n.toString(16)
  return hex.padStart(2, 0)
}

export default {
  data() {
    const colorsR = [];
    const colorsG= [];
    const colorsB = [];
    
    for (let r=30; r<256; r+=10) {
      for (let g=30; g<256; g+=10) {
        for(let b=30; b<256; b+=10) {
          if(r>g && r>b) {
            colorsR.push(`#${ff(r)}${ff(g)}${ff(b)}`);
          }
          if (g>r && r>b) {
            colorsG.push(`#${ff(r)}${ff(g)}${ff(b)}`);
          }
          if (b>r && b>g) {
            colorsB.push(`#${ff(r)}${ff(g)}${ff(b)}`);
          }
        }
      }
    }
    return {
      colorsR,
      colorsG,
      colorsB
    }
  },
  methods: {
    styled(col) {
      return {
        background: col
      }
    }
  }
}
</script>

<style scoped>
.colors-main {
  display: flex;
  flex-flow: row wrap;
}
.color-item {
  margin: 10px;
}
</style>