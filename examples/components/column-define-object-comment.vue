<template lang="pug">
  .column-defined-comment-main
    p ColumnDef 列定义对象
    .code-block 
      .intend {
        .intend label: String,        // 列名称
        .intend prop: String,         // 在row中取值展示的key，字段的名字
        .intend getContent: Function, // 一些列可能是有多个字段组成，比如 起止时间，可以利用这个函数组合处理列内容，函数接收的参数是当前行数据。
        .intend slot: String          // 对于有交互行为的列，展示的可能是按钮、连接，不是text，可以利用命名slot的方式，用html模板来渲染。
      .intend }
    p 
      img(:src='namedSlotCodePng')
    p prop、getCentent、slot三者提供一种即可。
</template>

<script>
import namedSlotCodePng from '../assets/pagin-table-example-code-named-slot.png'

export default {
  created() {
    this.namedSlotCodePng = namedSlotCodePng
  }
}
</script>