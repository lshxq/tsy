<template lang="pug">
  .tsy-scrollbar-example-main
    sy-panel.inline-block(@mount='panelMounted' @resize='panelResized')
      el-button(type='primary' @click='addRow') 添加内容
      .item(v-for='row of rows' :key='row') {{row}}

    .mt100
</template>

<script>
export default {
  data() {
    this.seed = 0;
    return {
      rows: [],
    };
  },
  methods: {
    addRow() {
      for (let idx = 0; idx < 5; idx++) {
        this.seed += 1;
        this.rows.push(this.seed);
      }
    },
    panelMounted(opt) {
      console.log("panel mounted", opt);
    },
    panelResized(sizeCurrent, sizeLast) {
      console.log("panel resized", sizeCurrent, sizeLast);
    },
  },
};
</script>
<style lang="sass" scoped>
.inline-block
  .item
    display: inline-block
    width: 100px
    height: 100px
</style>
