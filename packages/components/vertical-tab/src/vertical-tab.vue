<template>
<div class="tsy-vertical-tab-main">
  <sy-split-screen-vertical>
    <template slot="left">
      <div class="tabs">
        <div class="tab" :key="idx" v-for="(tab, idx) of tabs" @click="currentTabIdx = idx">{{tab.label}}</div>
      </div>
    </template>
    <template slot="right">
      <transition name="fade" :key="idx" v-for="(tab, idx) of tabs">
        <div class="tab-panel" v-if="currentTabIdx === idx">
          <slot :name="tab.slot"></slot>
        </div>
      </transition>
    </template>
  </sy-split-screen-vertical>
</div>
</template>

<script>

export default {
  name: 'SyVTabs',
  props: {
    tabs: { // 表格数据
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentTabIdx: 0,
    }
  },
  
  mounted() {
  },
  
}
</script>

<style lang='css' scoped>
.tsy-vertical-tab-main {
  height: 100%;
  position: relative;
}

.tsy-vertical-tab-main .tab-panel {
  height: 100%;
  padding: 10px 10px 50px 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>