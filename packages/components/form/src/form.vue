<template lang="pug">
  .tsy-form-main(v-loading='state.submitted || state.loading')
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
              :maxlength='getMeta(input, "maxlength")'
              :placeholder='getMeta(input, "placeholder")'
              show-word-limit)
            
            sy-options(v-else-if='input.type == "options"'
              v-model='modified[input.name]' 
              :url='getMeta(input, "url")'
              :options='getMeta(input, "options")' 
              :type='getMeta(input, "type")'
              :mock='getMeta(input, "mock")'
              :multiple='getMeta(input, "multiple")')
            
            el-date-picker(v-else-if='input.type == "datepicker"'
              v-model='modified[input.name]'
              type='date'
              value-format='yyyy-MM-dd') 

      el-form-item
        el-button(@click='apply' type='primary') 确定
        el-button(@click='cancel') 取消
</template>

<script>
import FormMixin from "../../../mixins/form-mixin";

export default {
  name: "SyForm",
  mixins: [FormMixin],
  props: {
    beforePostHandler: Function,
    dataLoadedHandler: Function,
    inputs: Array,
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    const modified = {};
    const { inputs } = this;
    for (const input of inputs) {
      modified[input.name] = input.value;
    }
    return {
      modified,
    };
  },
  computed: {
    rulesComp() {
      const { inputs } = this;
      const rulesMeta = inputs.filter((input) => input.rule);
      const rules = {};
      for (const input of rulesMeta) {
        rules[input.name] = input.rule;
      }
      return rules;
    },
    labelWidthComp() {
      return "100px";
    },
  },
  methods: {
    submitted(param) {
      this.$emit('submitted', param)
    },
    cancel() {
      this.$emit("canceled")
    },
    dataLoaded(data) {
      const {
        dataLoadedHandler
      } = this
      if(dataLoadedHandler) {
        return dataLoadedHandler(data)
      }
      return data;
    },
    beforePost(data) {
      const {
        beforePostHandler
      } = this
      if (beforePostHandler) {
        return beforePostHandler(data)
      }
      return data;
    },
    getMeta(input, key) {
      const { meta = {} } = input;
      return meta[key];
    },
    inputBarStyle(input) {
      const { meta = {} } = input;
      const ww = meta.width;
      let width = "";
      if (`${ww}`.match(/^\d+$/)) {
        width = `${ww}px`;
      } else {
        width = ww;
      }
      return {
        width,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.tsy-form-main
  .input-bar
    height: 40px
    display: flex
    align-items: center
</style>
