<template>
  <div class="example-paginator-main">
    <div class="block">
      <sy-paginator :total="999" :curr.sync="curr" @pagin="pagin"/>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      curr: 3,
    }
  },
  methods: {
    pagin(paginInfo) {
      const {
        pageNo,
        pageSize
      } = paginInfo;
      this.curr = pageNo;
      console.log(pageSize)
    }
  }
}
</script>