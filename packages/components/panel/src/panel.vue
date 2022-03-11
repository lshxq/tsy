<template lang="pug">
  .tsy-panel-main(ref='mainPanelRef')
    slot
</template>

<script>
export default {
  name: 'SyPanel',
  data() {
    return {
      height: 0
    }
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    const that = this
    that.height = that.$refs.mainPanelRef.clientHeight
    that.$emit('mounted', {
      height: that.height
    })
    that.timer = setInterval(() => {
      if (that.height != that.$refs.mainPanelRef.clientHeight) {
        that.$emit('resize', {
          height: that.$refs.mainPanelRef.clientHeight
        }, {
          height: that.height
        })
        that.height = that.$refs.mainPanelRef.clientHeight
      }
    }, 200)
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>