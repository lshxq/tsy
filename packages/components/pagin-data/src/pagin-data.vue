<template>
<div class="tsy-pagin-data-main" v-loading="loading">
  <slot :data="data"></slot>
  <div class="paginator-bar">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </div>
</div>
</template>

<script>
let requestIdx = 0
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
    respDataMapper: Function, // 返回数据的mapper, 服务器返回的数据接口 需要映射成 {data:Array, total:Number}的形式
    paginDataMapper: Function, // 发起请求前，按照服务器要求映射分页信息, 默认提交 pageNo 和 pageSize
    mock: null
  },
  data() {
    return {
      loading: false,
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
      that.loading = true
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
          pageSize,
          mock
        } = that
        requestMethod = requestMethod.toLowerCase()
        this.requestId = `${new Date().getTime()}${requestIdx++}` 
        const reqCfg = {
          url,
          method: requestMethod,
          mock,
          headers: {
            'sy-req-id': this.requestId
          }
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
          ...paginInfo,
          
        }
        if ('put post patch'.indexOf(requestMethod) >= 0) {
          reqCfg.data = query
        } else if ('get' === requestMethod){
          reqCfg.params = query
        }
        
        $axios(reqCfg).then(resp => {
          const {
            config
          } = resp
          if (config) {
            const returnReqId = config.headers['sy-req-id']
            if (`${returnReqId}` !== `${this.requestId}`) {
              return false // 跳过这个数据
            }
          }
          let respData = resp.data
          if (respDataMapper) {
            respData = respDataMapper(respData)
          }
          this.data = respData.data
          this.total = respData.total
          this.$emit('data-loaded', respData)
        }).catch(() => {
          console.log('加载分页数据失败，请稍后再试' + url)
          console.log(reqCfg)
        }).finally(() => {
          that.loading = false
        })
      } else {
        console.error('请在this中绑定axios实例， $axios')
      }
    },

  }
}
</script>

<style lang="css" scoped>
.tsy-pagin-data-main {
  width: 100%;
}

.tsy-pagin-data-main .paginator-bar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

</style>