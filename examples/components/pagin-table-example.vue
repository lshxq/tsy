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
    )
      template(v-slot:age='scope') {{scope.data.row.age}}
    
    p
      p 因为大部分的查询页面是以表格的形式绘制的数据，所以我们把sy-pagin-data 和 sy-table做了一下融合，形成了sy-pagin-table，支持的props 就是这两个组件的合集。
      sy-table(:columns='propTableColumns' :data='propTableData')

</template>

<script>
export default {
  data() {
    return {
      query: {
        keyword: "关键字",
      },
    };
  },
  created() {
    this.propTableColumns = [
      {
        label: "名称",
        prop: "name",
        width: 100,
      },
      {
        label: "类型",
        prop: "type",
        width: 100,
      },
      {
        label: "说明",
        prop: "comment",
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
        comment:
          "列定义对象{label: String, prop: String, getContent: Function, slot: String}, label是列的展示名称，prop是用来从行数据中取值的key，getContent是取值的方法，接手当前行作为参数，如果一个列由多个字段组成，或者字段的数据需要处理，可以利用该函数实现. slot的作用是创建一个命名插槽，如果这个列渲染比较复杂，不如是有交互行为的按钮，链接等，可以通过命名插槽实现。当前行会作为data绑定在插槽上。",
      },
      {
        name: "pagin-data-mapper",
        type: "Function",
        comment:
          "如果后端接受的分页信息不是pageNo和pageSize，可以利用这个钩子函数，在发起ajax请求前，进行更名。",
      },
      {
        name: "resp-data-mapper",
        type: "Function",
        comment:
          "paginTable期待服务器返回这样的应该格式{data:Array, total:Number},如果接口返回的不是这样的格式，可以利用这个钩子函数对返回的数据做变形，并返回 这个格式。",
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
};
</script>

<style lang="sass" scoped>
.w200
  width: 200px
</style>
