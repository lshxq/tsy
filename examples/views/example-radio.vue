<template lang="pug">
  .tsy-radio-example-main
    .h1 单选按钮组 sy-radio-group
    sy-radio-group(v-model='radioSelected' :options='radioOptions')

    p 当前值 {{radioSelected}}

    p pug模板
      .code-block
        .intend sy-radio-group(v-model='radioSelected' :options='radioOptions')

    p vue实例中绑定options的被选项
    .code-block
      .intend this.radioOptions = [{
        .intend label: '选项一',
        .intend value: 1}, {
        .intend label: '蓝色',
        .intend value: 'b'}, {
        .intend label: '橙子',
        .intend value: 'orange'}]
        
    p.mt10 element-ui中也有radio，但是实现的比较奇怪，他绑定label作为选定的值，和我们一般意义上理解的 options的逻辑不一样， 一般我们认为，option应该具备 label和value两个属性，其中label用来展示给用户，value是用来提交给后台的，但是element-ui提交的选定值是label，不知道是不是为了兼容老版本，一直延续了这个逻辑。
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
