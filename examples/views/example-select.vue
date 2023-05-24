<template>
  <div class="example-select-main">
    <sy-left-right class="mt30">
      <div slot="left">单选 当前值: {{singleValue}}</div>
      <div slot="right"><sy-select :options="options" v-model="singleValue" placeholder="请选择"/></div>
    </sy-left-right>

  </div>

</template>

<script>
export default {
  data() {
    this.options = [
      {
        label: '选项1',
        value: 1
      },
      {
        label: 'BBBB',
        value: 'B'
      },
      {
        label: '3333',
        value: 3
      }
    ]
    return {
      singleValue: null,
      multiValue: null,
    }
  }
}
</script>


<style scoped>
.example-select-main {
  width: 500px;
}
</style>