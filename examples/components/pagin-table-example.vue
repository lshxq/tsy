<template lang="pug">
  .pagin-table-example-main
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
</template>

<script>
export default {
  data() {
    return {
      query: {
        keyword: '关键字'
      }
    }
  },
  created() {
    this.columns = [
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '性别',
        getContent(data) {
          return data.row.gender
        }
      },
      {
        label: '年龄',
        slot: 'age'
      }
    ]
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
      console.log(data) // 结构不变变可以不提供这个mapper
      return data
    }
  }
}
</script>

<style lang="sass" scoped>
.w200
  width: 200px
</style>