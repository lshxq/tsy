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
     

</template>

<script>
export default {
  methods: {

  }
}
</script>