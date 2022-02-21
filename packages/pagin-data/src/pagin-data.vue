<template lang="pug">
  .tsy-pagin-data-main pagin data
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
    }
  },
  data() {
    return {
      data: [],
      pageNo: 1,
      pageSize: 10
    }
  },
  watch: {
    query: {
      deep: true,
      handler() {
        
      }
    }
  }
}
</script>