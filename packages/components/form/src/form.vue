<template lang="pug">
  .tsy-form-main
    el-form(ref='formRef' 
      :model='modified' 
      :label-width='labelWidthComp'
      :rules='rulesComp')
      el-form-item(v-for='(input, idx) of inputs' 
        :key='idx' 
        :label='input.label'
        :prop='input.name'
        )
          .input-bar(:style='inputBarStyle(input)')
            el-input(v-if='input.type == "input"' 
              v-model='modified[input.name]')
            
            sy-options(v-else-if='input.type == "options"'
              v-model='modified[input.name]' 
              :url='input.url'
              :options='input.options' 
              :type='input.kind'
              :mock='input.mock'
              :multiple='input.multiple')

      el-form-item
        el-button.mr20(@click='apply' type='primary') 确定
        el-buttom(@click='cancel') 取消
</template>

<script>
import FormMixin from '../../../mixins/form-mixin'
// import _ from 'lodash'

// const get = (key, ...objs) => {

// }

export default {
  name: 'SyForm',
  mixins: [FormMixin],
  props: {
    inputs: Array,
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    rulesComp() {
      const {
        inputs
      } = this
      const rulesMeta = inputs.filter(input => input.rule)
      const rules = {}
      for (const input of rulesMeta) {
        rules[input.name] = input.rule
      }
      return rules
    },
    labelWidthComp() {
      return '100px'
    }
  },
  methods: {
    inputBarStyle(input) {
      const ww = input.width
      let width = ''
      if (`${ww}`.match(/^\d+$/)) {
        width = `${ww}px`
      } else {
        width = ww
      }
      return {
        width
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.tsy-form-main
  .input-bar
    height: 40px
    display: flex
    align-items: center
</style>