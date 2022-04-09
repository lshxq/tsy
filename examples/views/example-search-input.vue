<template>
<div class="tsy-search-input-example-main">
  <div class="h1">检索输入框 sy-search-input</div>
  <div>
    <sy-search-input v-model="value"></sy-search-input>
    <p>同步：{{value}}</p>
  </div>
  <p>作为检索条件，我们不希望每敲一下键盘就触发检索，我们希望在按下回车 或者点击 检索按钮 时 再触发 检索。 这个组件就是在这个时候 才 同步 value值出来。 主要是配合 sy-pagin-data 系列组件使用的 检索条件输入框</p>
  <div class="mt100">
    <div class="h2">Props</div>
    <sy-table :columns="propTableColumns" :data="propTableData">
      <template v-slot:comment="scope">{{scope.row.comment}}</template>
    </sy-table>
  </div>
</div>
</template>

<script>
import commentMixin from "../mixins/comment-mixins.js";
export default {
  mixins: [commentMixin],
  created() {
    this.propTableData = [
      {
        name: "v-model",
        comment: "支持值绑定",
      },
      {
        name: "placehoder",
        type: "String",
        comment: "提示语",
      },
    ];
  },
  data() {
    return {
      value: "",
    };
  },
};
</script>
