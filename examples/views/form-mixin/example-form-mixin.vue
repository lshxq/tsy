<template lang="pug">
  .tsy-form-mixin-example
    .h1 标准form form-mixin 
    p
      el-button(type='primary' @click='goto("user-form-new")') 新建
      el-button(type='primary' @click='goto("user-form-update", {params: {id:123}})') 编辑

    p.mt100 form-mixin 是另一个大大提高开发效率的抽象
    p 以往我们开发一个新建表单，要处理layout，表单验证，数据提交，然后再去写编辑表单，还要处理layout，数据拉取，数据验证，以及表单提交。
    p 可以看到，新建和编辑 纯在 很多共通的部分。
    p form-mixin倡导 仅开发一个核心form，这个form中处理 了数据拉取（编辑）、layout、验证，提交， 而且用户只要关心 layout和表单验证即可，剩下的交给form-mixin。
    p 然后再新建 和  编辑的 视图中只要引入 这个核心form 组件就可以了， 通过是否向组件传入ID决定是编辑还是新建的逻辑。
    p.red 这里语言描述比较晦涩，难以理解中心思想，推荐下载例子工程亲知体验一下这种开发模式，可以发现相比你现在的开发思路会大大节省代码。
    p 
      a(href='https://github.com/lshxq/examples_tsyvue' target='new') https://github.com/lshxq/examples_tsyvue

    .mt100
      sy-form(:inputs='formInputs')
</template>

<script>
export default {
  created() {
    this.formInputs = [
      {
        type: 'input',
        name: 'xingming',
        label: '姓名',
        width: 300,
        rule: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'options',
        kind: 2,
        name: 'gender',
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
    ]
  },
  methods: {

  }
}
</script>