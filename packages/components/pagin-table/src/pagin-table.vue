<template lang="pug">
  .tsy-pagin-table-main
    sy-pagin-data(
      :url='url',
      :query='queryComp'
      :mock='mock'
      :request-method='requestMethod'
      :resp-data-mapper='respDataMapper'
      :pagin-data-mapper='paginDataMapperPriv'
      @data-loaded='dataLoaded'
    )
      template(slot-scope='scope') 
        sy-table(
          :data='scope.data' 
          :columns='columns' 
          :index-base='indexBaseComputed'
          :show-index='showIndex'
          :stripe='stripe'
          )
          template(:slot='slotName'  v-for='slotName of slotNameArray' slot-scope='scope')
            slot(:name='slotName' :data='scope')
            
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
      pageSize: 10
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
      return {
        ...this.query,
      }
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