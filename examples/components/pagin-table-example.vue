<template lang="pug">
  .pagin-table-example-main
    sy-pagin-table(
      url='/pagin/table/example'
      :query='query'
      :mock='mockDataFunc'
      :columns='columns'
      style='width:600px'
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