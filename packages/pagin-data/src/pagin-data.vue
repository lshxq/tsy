<template lang="pug">
  .tsy-pagin-data-main pagin data
    .paginator-bar
      el-pagination(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page='pageNo'
        :page-size='pageSize'
        :total='total'
        layout="total, prev, pager, next"
      )
</template>

<script>
export default {
  name: 'SyPaginData',
  props: {
    url: String,
    query: Object,
    requestMethod: {
      type: String,
      default() {
        return 'get'
      }
    },
    respDataMapper: Function,
    paginDataMapper: Function
  },
  data() {
    return {
      data: [],
      total: 0,
      pageNo: 1,
      pageSize: 10
    }
  },
  watch: {
    query: {
      deep: true,
      handler() {
        this.reload()
      }
    }
  },
  mounted() {
    this.reload()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.reload()
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo
      this.reload()
    },
    reload() {
      const that = this
      const {
        $axios
      } = that
      if ($axios) {
        let {
          requestMethod='get',
          query,
        } = that
        const {
          paginDataMapper,
          respDataMapper,
          url,
          pageNo,
          pageSize
        } = that
        requestMethod = requestMethod.toLowerCase()
        const reqCfg = {
          url,
          method: requestMethod
        }
        let paginInfo = {
          pageNo,
          pageSize
        }
        if (paginDataMapper) {
          paginInfo = paginDataMapper(paginInfo)
        }
        query = {
          ...query,
          ...paginInfo
        }
        if ('put post patch'.indexOf(requestMethod) >= 0) {
          reqCfg.data = query
        } else if ('get' === requestMethod){
          reqCfg.params = query
        }
        
        $axios(reqCfg).then(resp => {
          let respData = resp.data
          if (respDataMapper) {
            respData = respDataMapper(respData)
          }
          this.data = respData.data
          this.total = respData.total
        }).catch().finally()
      } else {
        console.error('请在this中绑定axios实例， $axios')
      }
    },

  }
}
</script>