<template lang="pug">
  .pagin-data-example-main
    
    .h1  分页数据组件 sy-pagin-data
    axios-required
    .criteria-bar
      el-input.w200(v-model='query.keyword')
      | &nbsp;
      el-select.w200(v-model='query.status')
        el-option(label='启动' value='up')
        el-option(label='停止' value='down')

    sy-pagin-data(
      url='/user/list'
      :query='query'
      :mock='mockDataFunc'
      :pagin-data-mapper='paginDataMapper'
      style='width: 800px'
    )
      template(slot-scope='scope') 
        .data-row(v-for='(row, idx) of scope.data' :key='idx') {{row}}

    p 
      p 分页查询在系统中占一半的开发工作量，如果每个页面都独立开发，成本很高，而且一致性比较差，每个人的实现看似一样，但又多少有些不同，这些差异会让整个系统的口碑下降，给人留下项目管理混乱的印象。
      p 撇开layout的部分不谈， 检索条件变化自动查询，翻页，调用查询接口这些行为应该都是高度一致的，sy-pagin-data就是把这部分高度一致的控制抽成了一个组件，组件用户不用处理这部分逻辑，只要把检索用的接口地址通过props传入，就天然的拥有了检索、分页等行为。通过slot传入用于数据渲染的部分，分页组件会把对应页面的数据，通过slot-scope传给数据展示组件，大家专心做好每一条记录绘制就OK了。
      img(:src='paginDataExampleCodeJpg')
    
    p 
      p url: 返回数据的接口地址。
      p 接口应为get请求，如果不是，可以通过传入requestMethod:String 指定请求方法
      p 接口应返回这样的数据格式。
      .block
        .p {
          .p data: Array, // 检索结果的集合
          .p total: Number  // 匹配检索条件的记录总数
        .p }
      p 如果服务器返回数据接口不满足上面的要求，可以通过传入respDataMapper:Function 对返回的数据做处理,并返回处理结果
      p 组件会在url的请求参数中自动添加pageNo:Number(当前页码) 和 pageSize:Number(请求数据数)，如果后端接口使用的不是这两个名称，可以通过传入paginDataMapper:Function 来替换成相应的名称。
      
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

    p.mt100
      .h2 Events
      sy-table(:columns='eventTableColumns' :data='eventTableData')
</template>

<script>
import axiosRequired from './axios-required.vue'
import paginDataExampleCodeJpg from "../assets/pagin-data-example-code.jpg";
import commentMixin from '../mixins/comment-mixins.js'
import paginDataMapperComment from './pagin-data-mapper-comment.vue'

export default {
  components: {
    paginDataMapperComment,
    axiosRequired
  },
  mixins: [commentMixin],
  data() {
    return {
      query: {
        keyword: "keyword",
        status: "",
      },
    };
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
        name: "pagin-data-mapper",
        type: "Function",
      },
      {
        name: "resp-data-mapper",
        type: "Function",
        comment: '服务器返回的应答，在传入命名slot之前，会通过这个钩子函数处理，参数是原始应答数据，返回值是处理后的结果。'
      }
    ];

    this.paginDataExampleCodeJpg = paginDataExampleCodeJpg;

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
      console.log(data);
      return data;
    };
  },
};
</script>

<style lang="sass" scoped>
.w200
  width: 200px
.criteria-bar
  margin-bottom: 20px
.data-row
  margin-bottom: 10px
  user-select: none
.data-row:hover
  background-color: #e0e0e0

.p
  padding: 10px
</style>
