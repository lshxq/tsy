<template>
<div class="tsy-table-sorter-main">
  <div class="table-sorter-inner"><img class="icon" v-if="!ascend" src="../../../../assets/images/arrow-up-gray.png" @click="sorterClicked(&quot;ascend&quot;)"/><img class="icon" v-else src="../../../../assets/images/arrow-up-blue.png" @click="sorterClicked(&quot;&quot;)"/><img class="icon" v-if="!descend" src="../../../../assets/images/arrow-down-gray.png" @click="sorterClicked(&quot;descend&quot;)"/><img class="icon" v-else src="../../../../assets/images/arrow-down-blue.png" @click="sorterClicked(&quot;&quot;)"/></div>
</div>
</template>

<script>

export default {
  props: {
    order: String,
    sorterId: String,
  },
  computed: {
    ascend() {
      return this.order === 'ascend'
    },
    descend() {
      return this.order === 'descend'
    }
  },
  methods: {
    sorterClicked(order) {
      this.$emit('click', this.sorterId, order)
    }
  }
}
</script>

<style lang="css" scoped>
.tsy-table-sorter-main {
  margin-left: 6px;
  display: flex;
  flex-flow: row;
  align-items: center;
  height: 100%;
}

.tsy-table-sorter-main .table-sorter-inner {
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 17px;
}

.tsy-table-sorter-main .table-sorter-inner .icon:hover {
  opacity: .8;
}

.tsy-table-sorter-main .table-sorter-inner .icon {
  width: 11px;
  cursor: pointer;
}

</style>