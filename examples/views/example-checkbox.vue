<template lang="pug">
  .tsy-checkbox-group-example
    .h1 复选框 sy-checkbox-group

    sy-checkbox-group(v-model='selected' :options='options')

    p 当前选定的值 {{selected}}

    p pug 模板
      .code-block
        .intend sy-checkbox-group(v-model='selected' :options='options')

    p vue实例
      .code-block
        .intend this.options = [
          .intend label: '选项一',
          .intend value: 1}, {
          .intend label: '蓝色',
          .intend value: 'b'}, {
          .intend label: '橙子',
          .intend value: 'orange'}]

    p 和radio的情况一样，这里复写了checkbox
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
