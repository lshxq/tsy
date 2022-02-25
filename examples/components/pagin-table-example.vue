<template lang="pug">
  .pagin-table-example-main
    .h1 分页Table  sy-pagin-table
    .criteria-bar
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
                p 列定义对象
                .code-block 
                  .intend {
                    .intend label: String,        // 列名称
                    .intend prop: String,         // 在row中取值展示的key，字段的名字
                    .intend getContent: Function, // 一些列可能是有多个字段组成，比如 起止时间，可以利用这个函数组合处理列内容，函数接收的参数是当前行数据。
                    .intend slot: String          // 对于有交互行为的列，展示的可能是按钮、连接，不是text，可以利用命名slot的方式，用html模板来渲染。
                  .intend }
                p 
                  img(:src='namedSlotCodePng')
                p prop、getCentent、slot三者提供一种即可。

              template(v-if='scope.row.name == "pagin-data-mapper"')
                p 如果后端接受的分页信息不是pageNo和pageSize，可以利用这个钩子函数，在发起ajax请求前，进行更名。
                p 参数:
                  .code-block
                    .intend {
                      .intend pageNo: Number, // 页号
                      .intend pageSize: NUmber, // 一页的记录数
                    .intend }
                p 返回:
                  .code-block
                    .intend {
                      .intend XXXX: Number, // 从命名后的 页号
                      .intend XXXX: NUmber, // 从命名后的 记录数
                    .intend } 
              template(v-if='scope.row.name == "resp-data-mapper"')
                p paginTable期待服务器返回这样的数据格式如下
                .code-block
                  .intend {
                    .intend data:Array // 数组的每个元素代表一行数据, 
                    .intend total:Number // 匹配检索条件的记录总数
                  .intend }
                p 如果接口返回的不是这样的格式，可以利用这个钩子函数对返回的数据做变形，并返回 这个格式。  
      p.mt100
        .h2 Events
        sy-table(:columns='eventTableColumns' :data='eventTableData')
</template>

<script>
import namedSlotCodePng from '../assets/pagin-table-example-code-named-slot.png'
export default {
  data() {
    return {
      query: {
        keyword: "关键字",
      },
    };
  },
  created() {

    this.namedSlotCodePng = namedSlotCodePng;
    this.eventTableColumns = [
      {
        label: '事件名',
        width: 200,
        prop: 'name'
      },
      {
        label: '描述',
        prop: 'comment'
      }
    ];
    this.eventTableData = [
      {
        name: 'data-loaded',
        comment: '分页数据加载完成后触发，并把服务器返回结果作为参数返回。'
      }
    ];
    this.propTableColumns = [
      {
        label: "名称",
        prop: "name",
        width: 200,
      },
      {
        label: "类型",
        prop: "type",
        width: 150,
      },
      {
        label: "说明",
        slot: "comment",
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
        type: "String",
        comment: "调用接口的请求方法,默认为GET",
      },
      {
        name: "query",
        type: "Plain Object",
        comment: "检索挑拣对象，发起ajax请求时作为参数传给后端",
      },
      {
        name: "columns",
        type: "Array[Object]",
      },
      {
        name: "pagin-data-mapper",
        type: "Function",
      },
      {
        name: "resp-data-mapper",
        type: "Function",
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
      console.log(cfg);
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
      console.log(data); // 结构不变变可以不提供这个mapper
      return data;
    };
  },
  methods: {
    dataLoaded(respData) {
      console.log('当前页数据', respData)
    }
  }
};
</script>

<style lang="sass" scoped>
.w200
  width: 200px
</style>
