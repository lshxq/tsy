<template lang="pug">
  .tsy-table-sorter-main
    .table-sorter-inner
      img.icon(v-if='!ascend' src='../../../assets/images/arrow-up-gray.png' @click='sorterClicked("ascend")')
      img.icon(v-else src='../../../assets/images/arrow-up-blue.png' @click='sorterClicked("")')
      img.icon(v-if='!descend' src='../../../assets/images/arrow-down-gray.png' @click='sorterClicked("descend")')
      img.icon(v-else src='../../../assets/images/arrow-down-blue.png' @click='sorterClicked("")')
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

<style lang="sass" scoped>
.tsy-table-sorter-main
  margin-left: 6px
  display: flex
  flex-flow: row
  align-items: center
  height: 100%
  .table-sorter-inner
    overflow: hidden
    display: flex
    flex-flow: column
    justify-content: space-between
    align-items: center
    height: 17px
    .icon:hover
      opacity: .8
    .icon
      width: 11px
      cursor: pointer
</style>