<template lang="pug">
  .tsy-checkbox-group-main(@click='checkboxClicked')
    sy-checkbox(
      :key='idx' v-for='(opt, idx) of options' 
      :label='opt.value'
      :checked='checkboxState(opt)'
      @click='checkboxClicked(opt)') {{opt.label}}
</template>

<script>


export default {
  name: 'SyCheckboxGroup',
  props: {
    value: Array,
    options: Array
  },
  computed: {
    
  },
  methods: {
    checkboxState(opt) {
      const {
        value
      } = this
      if (value instanceof Array) {
        const idx = value.findIndex(ele => ele === opt.value)
        return idx >= 0
      } else {
        return opt.value === value
      }
    },
    checkboxClicked(opt) {
      const {
        reasonableValue
      } = this
      const idx = reasonableValue.findIndex(ele => ele === opt.value)
      if (idx >= 0) { // 需要移除
        reasonableValue.splice(idx, 1)
      } else { // 需要添加
        reasonableValue.push(opt.value)
      }
      this.$emit('input', reasonableValue)
    },
  }
}
</script>

<style lang="sass" scoped>

    
</style>