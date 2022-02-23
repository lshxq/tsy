<template lang="pug">
  .pagin-data-example-main
    .criteria-bar
      el-input.w200(v-model='query.keyword')
      | &nbsp;
      el-select.w200(v-model='query.status')
        el-option(label='启动' value='up')
        el-option(label='停止' value='down')

    sy-pagin-data(
      url='/pagin/data'
      :query='query'
      :mock='mockDataFunc'
      :pagin-data-mapper='paginDataMapper'
      style='width: 800px'
    )
      template(slot-scope='scope') 
        .data-row(v-for='(row, idx) of scope.data' :key='idx') {{row}}
</template>

<script>
export default {
  data() {
    return {
      query: {
        keyword: 'keyword',
        status: ''
      }
    }
  },
  created() {
    this.mockDataFunc = cfg => {
      console.log(cfg)
      const {
        params
      } = cfg
      const {
        pageNo,
        pageSize
      } = params
      const data =  []
      for (let idx=0; idx<pageSize; idx++) {
        data.push({
          name: `${pageNo} name`,
          gender: `${pageNo} gender`,
          age: `${pageNo} age`,
        })
      }
      return {
        data,
        total: 993
      }
    },
    this.paginDataMapper = data => {
      console.log(data)
      return data
    }
  }
}
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
</style>