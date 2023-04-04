<template>
  <div class="example-calendar-main">
    <div class="calendar-container"><sy-calendar v-model="date"/></div>
    <div class="current-value">当前值： {{dateStr}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date()
    }
  },
  computed: {
    dateStr() {
      const {
        date
      } = this;
      return date.format('yyyy-MM-dd');
    }
  }
}

</script>

<style lang="css" scoped>
.calendar-container {
  width: 400px;
  
}

.current-value {
  margin: 50px;
}
</style>