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
    
    p
      p.mt100 因为大部分的查询页面是以表格的形式绘制的数据，所以我们把sy-pagin-data 和 sy-table做了一下融合，形成了sy-pagin-table，支持的props 就是这两个组件的合集。
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
      },
      {
        label: "性别",
        getContent(data) {
          return data.row.gender;
        },
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
