<template>
<div class="column-defined-comment-main">
  <p>ColumnDef 列定义对象</p>
  <div class="code-block"> 
    <div class="intend">{
      <div class="intend">label: String,        // 列名称</div>
      <div class="intend">prop: String,         // 在row中取值展示的key，字段的名字</div>
      <div class="intend">getContent: Function, // 一些列可能是有多个字段组成，比如 起止时间，可以利用这个函数组合处理列内容，函数接收的参数是当前行数据。</div>
      <div class="intend">slot: String          // 对于有交互行为的列，展示的可能是按钮、连接，不是text，可以利用命名slot的方式，用html模板来渲染。</div>
      <div class="intend">sorter: String        // 用来排序的列的key</div>
      <div class="intend">width: Number or %    // 定义列的宽度</div>
    </div>
    <div class="intend">}</div>
  </div>
  <p> <img :src="namedSlotCodePng"/></p>
  <p>prop、getCentent、slot三者提供一种即可。</p>
</div>
</template>

<script>
import namedSlotCodePng from "../../assets/pagin-table-example-code-named-slot.png";

export default {
  created() {
    this.namedSlotCodePng = namedSlotCodePng;
  },
};
</script>
