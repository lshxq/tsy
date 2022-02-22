<template lang="pug">
  .pagin-data-example-main
    sy-pagin-data(
      url='/test/pagin',
      :query='query'
    )
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
  }
}
</script>