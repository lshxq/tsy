<template lang="pug">
  .examples-sy-form-main
    .h1 数据表单 sy-form
    .mt100.h2 除了form-mixins,我们还可以直接通过纯数据的方式构造表单。
    p
      .code-block 
        .intend // 新建场合
        .intend sy-form(:inputs='formInputs' 
          .intend :options='formOptions'
          .intend url='/example/form/url')
      .code-block.mt20
        .intend // 编辑场合，传入ID
        .intend sy-form(:inputs='formInputs' 
          .intend :options='formOptions'
          .intend id='test'
          .intend url='/example/form/url')
      
      p formInputs 定义了表单的输入项目
      p
        img(src='../assets/form-inputs.png')
      p 目前支持的input 包括 input 和 options，options具体配置参考 sy-options
      
      .mt100
      sy-form(:inputs='formInputs' 
        :options='formOptions'
        url='/example/syform/submit-url')

      sy-form(:inputs='formInputs' 
        :options='formOptions'
        url='/example/syform/submit-url'
        id='test')
</template>

<script>
export default {
  created() {
    this.formInputs = [
      {
        type: 'input',
        name: 'xingming',
        value: 'tsy',
        label: '姓名',
        placeholder: '请输入姓名',
        width: 300,
        maxlength: 30,
        rule: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'options',
        kind: 2,
        name: 'gender',
        value: 'male',
        label: '性别',
        url: '/example/gender/options',
        mock() {
          return [
            {label: '男', value: 'male'},{label: '女', value: 'female'}
          ]
        }
      },
      {
        type: 'options',
        name: 'xueli',
        value: 'bachelor',
        label: '学历',
        options: [{
          label: '中学',
          value: 'highschool'
        }, {
          label: '大专',
          value: 'college'
        }, {
          label: '大学（本科）',
          value: 'bachelor'
        }, {
          label: '研究生',
          value: 'master'
        }]
      },
      {
        type: 'options',
        kind: 2,
        name: 'xingqu',
        label: '兴趣',
        url: '/example/xingqu/options',
        multiple: true,
        mock() {
          return [{
            label: '篮球', 
            value: 'lanqiu'
          },{
            label: '足球', 
            value: 'zuqiu'
          }, {
            label: '乒乓',
            value: 'pingpang'
          }]
        }
      },
      {
        type: 'options',
        name: 'gangwei',
        label: '岗位',
        url: '/example/gangwei/options',
        multiple: true,
        mock() {
          return [{
            label: '前端工程师', 
            value: 'FE'
          },{
            label: '后端工程师', 
            value: 'BE'
          }, {
            label: '技术经理',
            value: 'MGR'
          }]
        }
      },
      {
        type: 'datepicker',
        name: 'birthday',
        label: '生日',
        value: '1983-7-4'
      }
    ]
  }
}
</script>