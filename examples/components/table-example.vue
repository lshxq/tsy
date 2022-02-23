<template lang="pug">
  .tsy-table-example-main
    p
      .h1 基础Table
      p element-ui中的table非常强大，但是大部分的功能可能都用不上，而且他的开发思路是要用户 通过el-table-column 定义每 一列的具体 渲染，代码量比较大，也不利于数据化，如果想通过后端保存每个用户的table的 columns的信息，使每个人能看到不一样的table，还需要手动编写相关逻辑。
      p sy-table 是把column信息也数据化了一下。通过一个数组传递给组件
      .block
        .p sy-table(
          .p :columns='tableColumn' 
          .p :data='tableData'
          .p @sort='sorterChanged'    
          .p style='width: 1000px')
          .p template(v-slot:third='scope') { {scope.row.third } }
      p columns是这个table的列定义
      .block
        .p [
          .p {
            .p label: '第一列',  // 列名称
            .p prop: 'first',    // 通过prop的值，在对应行中直接取值 展示 ，这个最简单，也最常用
            .p sorter: 'diyilie', // 存在sorter时，会在列上提供排序按钮，该按钮会触发sort事件，并把对应的值作为参数传回 {key: 'diyilie', order: 'ascend'}
            .p width: 220 // 可以指定列宽度 ，像素，或百分比
          .p },
          .p {
            .p label: '第2列',
            .p getContent(data) {  // 将行数据传入，通过getContent方法 组装 对应列的值，比如long类型的时间需要转化，或者合并几个字段
              .p return data.row.second
            .p },
            .p width: '20%',
            .p sorter: 'dierlie'
          .p },
          .p {
            .p label: '第三列',
            .p slot: 'third' // 对于更复杂的ui，需要通过 命名 slot的方式，在sy-table下提供对应的渲染模板，比如制作button等,图片，交互等
          .p }
        .p ]
      p data，用来展示的数据，Array类型，每个元素代表一行。
    p  
      sy-table(
        :columns='tableColumn' 
        :data='tableData' 
        @sort='sorterChanged' 
        style='width: 1000px')
        template(v-slot:third='scope') {{scope.row.third}}
</template>

<script>
import Utils from '../../packages/utils'

export default {
  name: 'SyTableExample',
  created() {
  },
  computed: {
    tableData() {
      return [{
        first: Utils.randomStr(20),
        second: Utils.randomStr(30),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(30),
        second: Utils.randomStr(50),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(30),
        second: Utils.randomStr(40),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(20),
        second: Utils.randomStr(30),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(30),
        second: Utils.randomStr(20),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(50),
        second: Utils.randomStr(40),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(35),
        second: Utils.randomStr(25),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(30),
        second: Utils.randomStr(30),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(20),
        second: Utils.randomStr(40),
        third: Utils.randomStr()
      }]
    },
    tableColumn() {
      return [
        {
          label: '第一列',
          prop: 'first',
          sorter: 'diyilie',
          width: 220
        },
        {
          label: '第2列',
          getContent(data) {
            return data.row.second
          },
          width: '20%',
          sorter: 'dierlie'
        },
        {
          label: '第三列',
          slot: 'third'
        }
      ]
    }
  },
  methods: {
    sorterChanged(sorter) {
      console.log(sorter)
    }
  }
}
</script>

<style lang="sass" scoped>
.tsy-table-example-main
  .p 
    padding: 10px
</style>