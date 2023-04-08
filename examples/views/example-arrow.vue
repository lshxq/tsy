<template>
<div>
  &lt;sy-arrow :count='cnt'/&gt;
  <div v-for="cnt of counts" :key="cnt" class="mt10">
    <div>{{cnt }}</div>
    <div><sy-arrow :count='cnt'/></div>
  </div>
  
</div>
</template>

<script>
export default {
  computed: {
    counts() {
      const arr = [];
      for (let idx=1; idx<=100; idx++) {
        arr.push(idx);
      }
      return arr;
    }
  }
}
</script>