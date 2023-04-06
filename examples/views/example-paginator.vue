<template>
  <div class="example-paginator-main">
    <div class="block">
      <sy-paginator :total="999" :curr.sync="curr"/>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      curr: 3,
    }
  }
}
</script>