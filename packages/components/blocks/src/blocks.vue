<template>
<div class="tsy-blocks-main">
  <block-panel :short="short"
               :row-count="rowCount"
               :column-count="columnCount"
               :running.sync="running" 
               @request-hide="requestHide"/>
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
    },
    rowCount: {
      type: Number,
      default() {
        return 21;
      }
    },
    columnCount: {
      type: Number,
      default() {
        return 11;
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
  computed: {},
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
  }
}
</script>
<style scoped>
.tsy-blocks-main {
  user-select: none;
  width: 100%;
}
</style>