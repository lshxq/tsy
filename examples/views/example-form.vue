<template lang="pug">
  .examples-sy-form-main
    .h1 数据表单 sy-form
    .mt100 除了form-mixins,我们还可以直接通过纯数据的方式构造表单。
    p form-mixin 需要自己构建layout，这样比较灵活，但是不利于统一的表单样式，而且开发layout也是有成本的。
    p 为了进一步减轻页面的开发成本，我提供了基于数据的sy-form。使用该组件只要通过inputs传入表单内容即可。
      .code-block 
        .intend // 新建场合
        .intend sy-form(:inputs='formInputs' 
          .intend url='/example/form/url')
      .code-block.mt20
        .intend // 编辑场合，传入ID
        .intend sy-form(:inputs='formInputs' 
          .intend id='test'
          .intend url='/example/form/url')
      
      p formInputs 定义了表单的输入项目
      p
        img(src='../assets/form-inputs.jpg')
      p 目前支持的input如下
      ul 
        li input, 标准el-input的输入框，支持el-input的常用属性透传，如placeholder，maxlength等 
        li options，options具体配置参考 sy-options，主要是能根据url初始化备选项，能指定单选多选多种外观。
        li datepicker， 日期选择器
      
      .mt100
      sy-form(:inputs='formInputs' 
        url='/example/syform/submit-url')

      sy-form(:inputs='formInputs' 
        url='/example/syform/submit-url'
        id='test')
</template>

<script>
export default {
  created() {
    this.formInputs = [
      {
        type: "input",
        name: "xingming",
        value: "tsy",
        label: "姓名",
        meta: {
          placeholder: "请输入姓名",
          width: 300,
          maxlength: 30,
        },

        rule: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      {
        type: "options",
        name: "gender",
        value: "male",
        label: "性别",
        meta: {
          url: "/example/gender/options",
          type: 2,
          mock() {
            return [
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ];
          },
        },
      },
      {
        type: "options",
        name: "xueli",
        value: "bachelor",
        label: "学历",
        meta: {
          options: [
            {
              label: "中学",
              value: "highschool",
            },
            {
              label: "大专",
              value: "college",
            },
            {
              label: "大学（本科）",
              value: "bachelor",
            },
            {
              label: "研究生",
              value: "master",
            },
          ],
        },
      },
      {
        type: "options",
        kind: 2,
        name: "xingqu",
        label: "兴趣",
        meta: {
          url: "/example/xingqu/options",
          type: 2,
          multiple: true,
          mock() {
            return [
              {
                label: "篮球",
                value: "lanqiu",
              },
              {
                label: "足球",
                value: "zuqiu",
              },
              {
                label: "乒乓",
                value: "pingpang",
              },
            ];
          },
        },
      },
      {
        type: "options",
        name: "gangwei",
        label: "岗位",
        meta: {
          url: "/example/gangwei/options",
          multiple: true,
          mock() {
            return [
              {
                label: "前端工程师",
                value: "FE",
              },
              {
                label: "后端工程师",
                value: "BE",
              },
              {
                label: "技术经理",
                value: "MGR",
              },
            ];
          },
        },
      },
      {
        type: "datepicker",
        name: "birthday",
        label: "生日",
        value: "1983-7-4",
      },
    ];
  },
};
</script>
