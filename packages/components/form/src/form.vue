<template lang="pug">
  .tsy-form-main
    el-form(ref='formRef' :model='model' :label-width='labelWidthComp')
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
    options: Object
  },
  computed: {
    labelWidthComp() {
      return ''
    }
  }
}
</script>