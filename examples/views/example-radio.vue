<template>
<div class="tsy-radio-example-main">
  <div class="h1">单选按钮组 sy-radio-group</div>
  <sy-radio-group v-model="radioSelected" :options="radioOptions"></sy-radio-group>
  <p>当前值 {{radioSelected}}</p>
  <div>pug模板
    <div class="code-block">
      <div class="intend">sy-radio-group(v-model='radioSelected' :options='radioOptions')</div>
    </div>
  </div>
  <p>vue实例中绑定options的被选项</p>
  <div class="code-block">
    <div class="intend">this.radioOptions = [{
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
  <p class="mt10">element-ui中也有radio，但是实现的比较奇怪，他绑定label作为选定的值，和我们一般意义上理解的 options的逻辑不一样， 一般我们认为，option应该具备 label和value两个属性，其中label用来展示给用户，value是用来提交给后台的，但是element-ui提交的选定值是label，不知道是不是为了兼容老版本，一直延续了这个逻辑。</p>
</div>
</template>

<script>
export default {
  created() {
    this.radioOptions = [
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
      radioSelected: "",
    };
  },
};
</script>
