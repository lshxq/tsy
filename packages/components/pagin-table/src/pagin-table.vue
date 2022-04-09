<template >
<div class="tsy-pagin-table-main">
  <sy-pagin-data :url="url" :query="queryComp" :mock="mock" :request-method="requestMethod" :resp-data-mapper="respDataMapper" :pagin-data-mapper="paginDataMapperPriv" @data-loaded="dataLoaded">
    <template slot-scope="scope"> 
      <sy-table :data="scope.data" :columns="columns" :index-base="indexBaseComputed" :show-index="showIndex" :stripe="stripe" @sort="tableSortChanged">
        <template :slot="slotName" v-for="slotName of slotNameArray" slot-scope="scope">
          <slot :name="slotName" :data="scope"></slot>
        </template>
      </sy-table>
    </template>
  </sy-pagin-data>
</div>      
</template>

<script>
export default {
  name: 'SyPaginTable',
  props: {
    url: String,
    query: Object,
    columns: { // 列定义
      type: Array
    },
    requestMethod: {
      type: String,
      default() {
        return 'get'
      }
    },
    respDataMapper: Function,
    paginDataMapper: Function,
    mock: null,
    stripe: { // 隔行变色
      type: Boolean,
      default() {
        return true
      }
    },
    showIndex: { // 显示序号
      type: Boolean,
      default() {
        return true
      }
    },
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      sort: {}
    }
  },
  computed: {
    indexBaseComputed() {
      const {
        pageNo=1,
        pageSize=10
      } = this
      return (pageNo - 1) * pageSize + 1
    },
    queryComp() {
      const {
        sort
      } = this
      const query = {
        ...this.query,
      }
      if (sort && sort.order) {
        query.sorter = `${sort.order === 'descend' ? '-' : '+'}${sort.key}`
      }
      return query
    },
    slotNameArray() {
      const slots = []
      const {
        columns
      } = this
      for (const col of columns) {
        if (col.slot) {
          slots.push(col.slot)
        }
      }
      return slots
    }
  },
  methods: {
    dataLoaded(respData) {
      this.$emit('data-loaded', respData)
    },
    tableSortChanged(sort) {
      this.sort = sort
    },
    paginDataMapperPriv(paginInfo) {
      const {
        pageNo,
        pageSize
      } = paginInfo

      this.pageNo = pageNo
      this.pageSize = pageSize

      if (this.paginDataMapper) {
        return this.paginDataMapper(paginInfo)
      } 
      return paginInfo
    }
  }
}
</script>