<template lang="pug">
  .tsy-scrollbar-example-main
    sy-panel.inline-block(@mount='panelMounted' @resize='panelResized')
      el-button(type='primary' @click='addRow') 添加内容
      .item(v-for='row of rows' :key='row') {{row}}

    .mt100
      p 面板增加的一下内容
      p mount事件，标示面板已经载入dom
      p resize事件，当面板大小改变时，事件接受两个参数，分别是当前size和变化前的size。
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
