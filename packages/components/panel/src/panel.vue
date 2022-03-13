<template lang="pug">
  .tsy-panel-main(ref='mainPanelRef')
    slot
</template>

<script>
export default {
  name: "SyPanel",
  data() {
    return {
      height: 0,
      width: 0,
    };
  },
  computed: {},
  methods: {},
  mounted() {
    const that = this;
    const mainPanel = that.$refs.mainPanelRef;
    that.height = mainPanel.clientHeight;
    that.width = mainPanel.clientWidth;
    that.$emit("mount", {
      height: that.height,
      width: that.width,
    });
    that.timer = setInterval(() => {
      if (
        that.height != that.$refs.mainPanelRef.clientHeight ||
        that.width != that.$refs.mainPanelRef.clientWidth
      ) {
        that.$emit(
          "resize",
          {
            height: that.$refs.mainPanelRef.clientHeight,
            width: that.$refs.mainPanelRef.clientWidth,
          },
          {
            height: that.height,
            width: that.width,
          }
        );
        that.height = that.$refs.mainPanelRef.clientHeight;
        that.width = that.$refs.mainPanelRef.clientWidth;
      }
    }, 200);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
