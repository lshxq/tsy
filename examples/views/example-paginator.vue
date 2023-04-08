<template>
  <div class="example-paginator-main">
    <div class="block">
      <sy-paginator :total="999" :curr="curr" @pagin="pagin"/>
      <div class="mt30">
        分页器 &lt;sy-paginator :total="999" :curr="curr" @pagin="pagin"/&gt;
      </div>
      <div class="mt30">告诉他一共有多少条记录，当前在第一页，监听页面变化的pagin事件，事件处理函数会接收到变化后的pageNo和pageSize的值。</div>
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