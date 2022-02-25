<template lang="pug">
  .tsy-table-example-main
    .h1 基础Table sy-table
    
    p  
      sy-table(
        :columns='tableColumn' 
        :data='tableData' 
        @sort='sorterChanged' 
        style='width: 1000px')
        template(v-slot:third='scope') {{scope.row.third}}

    p
      p.mt100 element-ui中的table非常强大，但是大部分的功能可能都用不上，而且他的开发思路是要用户 通过el-table-column 定义每 一列的具体 渲染，代码量比较大，也不利于数据化，如果想通过后端保存每个用户的table的 columns的信息，使每个人能看到不一样的table，还需要手动编写相关逻辑。
      p sy-table 默认宽度是沾满100%，可以通过 style='width:xxx'的方式限定table的宽度。
      p sy-table 是把column信息也数据化了一下。通过一个数组传递给组件
      .code-block
        .intend sy-table(
          .intend :columns='tableColumn' 
          .intend :data='tableData'
          .intend @sort='sorterChanged'    
          .intend style='width: 1000px')
          .intend template(v-slot:third='scope') { {scope.row.third } }
      p columns是这个table的列定义
        .code-block
          .intend const tableColumn = [
            .intend {
              .intend label: '第一列',  // 列名称
              .intend prop: 'first',    // 通过prop的值，在对应行中直接取值 展示 ，这个最简单，也最常用
              .intend sorter: 'diyilie', // 存在sorter时，会在列上提供排序按钮，该按钮会触发sort事件，并把对应的值作为参数传回 {key: 'diyilie', order: 'ascend'}
              .intend width: 220 // 可以指定列宽度 ，像素，或百分比
            .intend },
            .intend {
              .intend label: '第2列',
              .intend getContent(data) {  // 将行数据传入，通过getContent方法 组装 对应列的值，比如long类型的时间需要转化，或者合并几个字段
                .intend return data.row.second
              .intend },
              .intend width: '20%',
              .intend sorter: 'dierlie'
            .intend },
            .intend {
              .intend label: '第三列',
              .intend slot: 'third' // 对于更复杂的ui，需要通过 命名 slot的方式，在sy-table下提供对应的渲染模板，比如制作button等,图片，交互等
            .intend }
          .intend ]
      p data，用来展示的数据，Array类型，每个元素代表一行。
        .code-block
          .intend const tableData = [
            .intend {
              .intend first: String, // 第一列的内容, 这里first的名字应该和列定义中的prop一致
              .intend second: String, // 第二类的内容，本例中，第二类的内容是通过getContent方法中，通过返回行数据中的second展示的。
              .intend XXXX: Anything // 本例中第三列的内容是 通过命名slot 提供html模板渲染的。
            .intend }
          .intend ]
        
      p.mt100
        .h2 Props
        sy-table(:columns='propTableColumns' :data='propTableData')
          template(v-slot:comment='scope')
            template(v-if='scope.row.comment') {{scope.row.comment}}
            template(v-else)
              template(v-if='scope.row.name == "columns"')
                column-define-comment
    
</template>

<script>
import Utils from "../../packages/utils";
import ColumnDefineComment from './column-define-object-comment.vue'
import commentMixin from '../mixins/comment-mixins.js'

export default {
  name: "SyTableExample",
  mixins: [commentMixin],
  components: {
    ColumnDefineComment
  },
  created() {
    
    this.eventTableData = [
      {
        name: 'data-loaded',
        comment: '分页数据加载完成后触发，并把服务器返回结果作为参数返回。'
      }
    ];
    
    this.propTableData = [
      {
        name: 'columns',
        type: 'Array<Column>',
      },
      {
        name: 'data',
        type: 'Array[Object]',
        comment: '数组的每个元素代表一行'
      },
      {
        name: 'stripe',
        type: 'Boolean(true)',
        comment: '是否 在行号 为偶数的 行 显示背景色，隔行高亮， 斑马线，默认显示斑马线'
      },
      {
        name: 'show-index',
        type: 'Boolean(true)',
        comment: '是否 显示 行号，默认是显示'
      },
      {
        name: 'index-base',
        type: 'Number(1)',
        comment: '行号起始值，默认值1，当处理分页的时候，可以指定这个值。'
      }
    ]
  },
  computed: {
    tableData() {
      return [
        {
          first: Utils.randomStr(20),
          second: Utils.randomStr(30),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(50),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(40),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(20),
          second: Utils.randomStr(30),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(20),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(50),
          second: Utils.randomStr(40),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(35),
          second: Utils.randomStr(25),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(30),
          second: Utils.randomStr(30),
          third: Utils.randomStr(),
        },
        {
          first: Utils.randomStr(20),
          second: Utils.randomStr(40),
          third: Utils.randomStr(),
        },
      ];
    },
    tableColumn() {
      return [
        {
          label: "第一列",
          prop: "first",
          sorter: "diyilie",
          width: 220,
        },
        {
          label: "第2列",
          getContent(data) {
            return data.row.second;
          },
          width: "20%",
          sorter: "dierlie",
        },
        {
          label: "第三列",
          slot: "third",
        },
      ];
    },
  },
  methods: {
    sorterChanged(sorter) {
      console.log(sorter);
    },
  },
};
</script>

<style lang="sass" scoped>
.tsy-table-example-main
</style>
