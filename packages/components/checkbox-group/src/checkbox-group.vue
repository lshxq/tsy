<template lang="pug">
  .tsy-checkbox-group-main(@click='checkboxClicked')
    sy-checkbox(
      v-for='(opt, idx) of options' 
      :key='idx' 
      :label='opt.label'
      :value='opt.value'
      :checked='checkboxState(opt)'
      @click='checkboxClicked')
</template>

<script>
export default {
  name: "SyCheckboxGroup",
  props: {
    value: Array,
    options: Array,
  },
  computed: {},
  methods: {
    checkboxState(opt) {
      const { value } = this;
      if (value instanceof Array) {
        const idx = value.findIndex((ele) => ele === opt.value);
        return idx >= 0;
      } else {
        return opt.value === value;
      }
    },
    checkboxClicked(checked, radioValue) {
      const { value } = this;
      const arr = [];

      if (checked) {
        // 添加
        value.map((ele) => {
          arr.push(ele);
        });
        if (radioValue != undefined) {
          arr.push(radioValue);
        }
        
      } else {
        // 移除
        value.map((ele) => {
          if (ele != radioValue) {
            arr.push(ele);
          }
        });
      }
      this.$emit("input", arr);
    },
  },
};
</script>

<style lang="sass" scoped></style>
