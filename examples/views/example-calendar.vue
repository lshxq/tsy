<template>
  <div class="example-calendar-main">
    <div class="calendar-container"><sy-calendar v-model="date" ref="cldr"/></div>
    <div class="current-value">当前值： {{dateStr}}</div>

    <div><button @click="setDisplay">返回当前月份</button></div>
    <div class="mt30">
      一个简朴的日历组件，通过v-model绑定当前选择的日期，默认值为今天。日历的宽度通过父容器确定。 &lt;sy-calendar v-model="date"/&gt;。 可以通过 setDisplay函数设置当前面板显示的年月。this.$refs.cldr.setDisplay(new Date());
    </div>
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
  },
  methods: {
    setDisplay() {
      this.$refs.cldr.setDisplay(new Date());
    }
  }
}

</script>

<style lang="css" scoped>
.calendar-container {
  width: 300px;
  
}

.current-value {
  margin: 50px;
}
</style>