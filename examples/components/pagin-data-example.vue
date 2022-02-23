<template lang="pug">
  .pagin-data-example-main
    sy-pagin-data(
      url='/test/pagin',
      :query='query'
      :mock='mockDataFunc'
      :pagin-data-mapper='paginDataMapper'
    )
      template(slot-scope='scope') 
        .data-row(v-for='(row, idx) of scope.data' :key='idx') {{row}}
</template>

<script>
export default {
  data() {
    return {
      query: {
        p1: 'p one',
        p2: 'p two'
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