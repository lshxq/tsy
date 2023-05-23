<template>
<div class="tsy-blocks-main" v-resize="__blocksMainResized" :style="mainPanelStyleComp">
  <block-panel v-bind="$attrs"
               :short="short"
               :panel-scale="panelScaleComp"
               :running.sync="running" 
               @request-hide="requestHide" 
               v-resize="__blocksPanelResized"/>
</div>
</template>
<script>
import BlockPanel from './components/block-panel.vue'

export default {
  name: 'SyBlocks',
  props: {
    defaultVisibility: {
      type: Boolean,
      default() {
        return true;
      }
    },
    short: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {
    BlockPanel,
  },
  data() {
    const {
      defaultVisibility
    } = this
    return {
      panel: {
        mainSize: false,
        panelSize: false,
      },
      visibility: defaultVisibility,
      running: false
    }
  },
  computed: {
    panelScaleComp() {
      const {
        mainSize,
        panelSize
      } = this.panel
      if (mainSize && panelSize) {
        return mainSize.width / panelSize.width
      }
      return 1;
    },
    mainPanelStyleComp() {
      const that = this
      const {
        visibility,
        panel,
        panelScaleComp
      } = that
      
      const style = {
        opacity: visibility ? 1 : 0
      }
      if (panel.panelSize) {
        style.height = `${panel.panelSize.height * panelScaleComp}px`;
      }
      return style;
    }
  },
  methods: {
    show() {
      this.visibility = true
    },
    hide() { //
      this.running = false;
      this.visibility = false;
    },
    requestHide() {
      const {
        visibility
      } = this;
      if (visibility) {
        this.hide();
      } else {
        this.visibility = true
      }
    },
    __blocksMainResized(size) {
      this.panel.mainSize = size;
    },
    __blocksPanelResized(size) {
      this.panel.panelSize = size;
    }
  }
}
</script>
<style scoped>
.tsy-blocks-main {
  user-select: none;
}
</style>