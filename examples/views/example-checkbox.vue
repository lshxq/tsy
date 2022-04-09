<template>
<div class="tsy-checkbox-group-example">
  <div class="h1">复选框 sy-checkbox-group</div>
  <sy-checkbox-group v-model="selected" :options="options"></sy-checkbox-group>
  <p>当前选定的值 {{selected}}</p>
  <div>pug 模板
    <div class="code-block">
      <div class="intend">sy-checkbox-group(v-model='selected' :options='options')</div>
    </div>
  </div>
  <div>vue实例
    <div class="code-block">
      <div class="intend">this.options = [{
        <div class="intend">label: '选项一',</div>
        <div class="intend">value: 1</div>
      </div>
      <div class="intend">}, {
        <div class="intend">label: '蓝色',</div>
        <div class="intend">value: 'b'</div>
      </div>
      <div class="intend">}, {
        <div class="intend">label: '橙子',</div>
        <div class="intend">value: 'orange'</div>
      </div>
      <div class="intend">}]</div>
    </div>
  </div>
  <p>和radio的情况一样，这里复写了checkbox</p>
</div>
</template>

<script>
export default {
  created() {
    this.options = [
      {
        label: "选项一",
        value: 1,
      },
      {
        label: "蓝色",
        value: "b",
      },
      {
        label: "橙子",
        value: "orange",
      },
    ];
  },
  data() {
    return {
      selected: [],
    };
  },
};
</script>
