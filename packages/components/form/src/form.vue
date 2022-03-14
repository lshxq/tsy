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
              v-model.trim='modified[input.name]'
              :maxlength='input.maxlength'
              :placeholder='input.placeholder'
              show-word-limit)
            
            sy-options(v-else-if='input.type == "options"'
              v-model='modified[input.name]' 
              :url='input.url'
              :options='input.options' 
              :type='input.kind'
              :mock='input.mock'
              :multiple='input.multiple')
            
            el-date-picker(v-else-if='input.type == "datepicker"'
              v-model='modified[input.name]'
              type='date'
              value-format='yyyy-MM-dd') 

      el-form-item
        el-button(@click='apply' type='primary') 确定
        el-button(@click='cancel') 取消
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
  data() {
    const modified = {}
    const {
      inputs
    } = this
    for(const input of inputs) {
      modified[input.name] = input.value
    }
    return {
      modified,
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