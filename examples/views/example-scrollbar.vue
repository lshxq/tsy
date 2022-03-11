<template lang="pug">
  .tsy-scrollbar-example-main
    sy-scroll(height='300px')
      el-button(type='primary' @click='addRow') 添加内容
      .mt20 a
      .mt20 b
      .mt20 c
      .mt20 d
      .mt20 e
      .mt30 f
      .mt20 g
      .mt20 h
      .mt20 i
      .mt20 j
      .mt20 k
      .mt20 l
      .mt20 m
      .mt20 n
      .mt20 o
      .mt20 p
      .mt20 q
      .mt20 r
      .mt20 s
      .mt20 t
      .mt20 u
      .mt20 v
      .mt20 w
      .mt20 x
      .mt20 y
      .mt20 z
      .mt20(v-for='row of rows' :key='row') {{row}}
</template>

<script>
export default {
  data() {
    this.seed = 0
    return {
      rows: []
    }
  },
  methods: {
    addRow() {
      for (let idx=0; idx<5; idx++) {
        this.seed += 1
        this.rows.push(this.seed)
      }
    }
  }
}
</script>