<template lang="pug">
  .pagin-table-example-main
    .h1 分页Table  sy-pagin-table

    axios-required

    .criteria-bar.mb10
      el-input.w200(v-model='query.keyword')
      | &nbsp;
      el-select.w200(v-model='query.status')
        el-option(label='启动' value='up')
        el-option(label='停止' value='down')

    sy-pagin-table(
      url='/pagin/table/example'
      :query='query'
      :mock='mockDataFunc'
      :columns='columns'
      style='width:1000px'
      @data-loaded='dataLoaded'
    )
      template(v-slot:age='scope') {{scope.data.row.age}}

    p.mt100 因为大部分的查询页面是以表格的形式绘制的数据，所以我们把sy-pagin-data 和 sy-table做了一下融合，形成了sy-pagin-table，支持的props 就是这两个组件的合集。
    p
      .mt100 模板部分的代码
      .code-block
        .intend sy-pagin-table(
          .intend url='/pagin/table/example'
          .intend :query='query'
          .intend :columns='columns'
          .intend style='width:1000px'
          .intend @data-loaded='dataLoaded'
        .intend )
          .intend template(v-slot:age='scope') { {scope.data.row.age} }
      .mt100
        p 上面例子table的column定义
        .code-block 
          .intend this.columns = [
            .intend {
              .intend label: "姓名",
              .intend prop: "name",
              .intend sorter: 'name'
            .intend },
            .intend {
              .intend label: "性别",
              .intend getContent(data) {
                .intend return data.row.gender;
              .intend },
              .intend sorter: 'gender'
            .intend },
            .intend {
              .intend label: "年龄",
              .intend slot: "age",
            .intend },
          .intend ];
      p 如果在列定义中指定了sorter，那么sy-pagin-table会在该列上生成排序器， 并根据排序器状态，自动向后端接口上报 排序 信息。 排序信息作为 请求参数 以如下形式上报
      p sort=(+/-)sorkKey
      p 其中减号代表降序，加号为升序，sortKey就是在列定义中指定的内容， sort=-name，表示按照名称降序排列，后端接口需要做对应处理
      p sort=-birthay   表示按照生日降序排列
      
      p.mt100
        .h2 Props
        sy-table(:columns='propTableColumns' :data='propTableData')
          template(v-slot:comment='scope') 
            template(v-if='scope.row.comment') {{scope.row.comment}}
            template(v-else)
              template(v-if='scope.row.name == "columns"')
                column-define-comment

              template(v-if='scope.row.name == "pagin-data-mapper"')
                pagin-data-mapper-comment
              template(v-if='scope.row.name == "resp-data-mapper"')
                resp-data-mapper-comment  
      p.mt100
        .h2 Events
        sy-table(:columns='eventTableColumns' :data='eventTableData')
</template>

<script>
import ColumnDefineComment from "./components/column-define-object-comment.vue";
import commentMixin from "../mixins/comment-mixins.js";
import respDataMapperComment from "./components/pagin-table-resp-data-mapper-comment.vue";
import paginDataMapperComment from "./components/pagin-data-mapper-comment.vue";
import axiosRequired from "./components/axios-required.vue";

export default {
  components: {
    ColumnDefineComment,
    respDataMapperComment,
    paginDataMapperComment,
    axiosRequired,
  },
  mixins: [commentMixin],
  data() {
    return {
      query: {
        keyword: "关键字",
      },
    };
  },
  created() {
    this.eventTableData = [
      {
        name: "data-loaded",
        comment: "分页数据加载完成后触发，并把服务器返回结果作为参数返回。",
      },
    ];

    this.propTableData = [
      {
        name: "url",
        type: "String",
        comment: "检索接口的地址",
      },
      {
        name: "request-method",
        type: "String('GET')",
        comment: "调用接口的请求方法,默认为GET",
      },
      {
        name: "query",
        type: "Plain Object",
        comment: "检索条件对象，发起ajax请求时作为参数传给后端",
      },
      {
        name: "columns",
        type: "Array<Column>",
      },
      {
        name: "pagin-data-mapper",
        type: "Function",
      },
      {
        name: "resp-data-mapper",
        type: "Function",
      },
      {
        name: "stripe",
        type: "Boolean(true)",
        comment:
          "是否 在行号 为偶数的 行 显示背景色，隔行高亮， 斑马线，默认显示斑马线",
      },
      {
        name: "show-index",
        type: "Boolean(true)",
        comment: "是否 显示 行号，默认是显示",
      },
    ];

    this.columns = [
      {
        label: "姓名",
        prop: "name",
        sorter: 'name'
      },
      {
        label: "性别",
        getContent(data) {
          return data.row.gender;
        },
        sorter: 'gender'
      },
      {
        label: "年龄",
        slot: "age",
      },
    ];
    this.mockDataFunc = (cfg) => {
      const { params } = cfg;
      const { pageNo, pageSize } = params;
      const data = [];
      for (let idx = 0; idx < pageSize; idx++) {
        data.push({
          name: `${pageNo} name`,
          gender: `${pageNo} gender`,
          age: `${pageNo} age`,
        });
      }
      return {
        data,
        total: 993,
      };
    };
    this.paginDataMapper = (data) => {
      return data;
    };
  },
  methods: {
    dataLoaded(respData) {
      console.log("当前页数据", respData);
    },
  },
};
</script>

<style lang="sass" scoped>
.w200
  width: 200px
</style>
