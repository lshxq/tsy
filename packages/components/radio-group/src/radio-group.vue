<template>
<div class="tsy-radio-group-main">
  <sy-radio v-for="(opt, idx) of options" :key="idx" :label="opt.label" :value="opt.value" :checked="isChecked(opt)" @click="radioClicked"></sy-radio>
</div>
</template>

<script>
export default {
  name: "SyRadioGroup",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: null,
  },
  methods: {
    isChecked(opt) {
      return this.value == opt.value;
    },
    radioClicked(checked, value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="css" scoped>
.tsy-radio-group-main {
  display: flex;
  flex-flow: row wrap;
}

</style>
