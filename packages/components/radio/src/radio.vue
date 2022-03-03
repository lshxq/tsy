<template lang="pug">
  .tsy-radio-main(:class='radioClassComp' @click.stop='radioClicked')
    .mark
      .round-outter
        .round-inner
    .label {{labelComp}}
</template>

<script>
export default {
  name: "SyRadio",
  props: {
    checked: Boolean,
    label: String,
    value: null,
  },
  computed: {
    radioClassComp() {
      const { checked } = this;
      return {
        checked,
      };
    },
    labelComp() {
      const { label } = this;
      return label || "未指定label";
    },
  },
  methods: {
    radioClicked() {
      this.$emit("click", !this.checked, this.value); // checked, value
    },
  },
};
</script>

<style lang="sass" scoped>
$blue: #409eff
.tsy-radio-main.checked
  .mark
    .round-outter
      background-color: $blue
      .round-inner
        background-color: white
  .label
    color: $blue
    font-weight: bold

.tsy-radio-main:hover
  .mark
    .round-outter
      outline: 1px solid $blue

.tsy-radio-main
  display: flex
  margin-right: 20px
  height: 30px
  align-items: center

  .mark
    display: flex
    align-items: center
    margin-right: 10px
    .round-outter
      display: flex
      justify-content: center
      align-items: center
      transition: .4s
      cursor: pointer
      outline: 1px solid lightgray
      width: 16px
      height: 16px
      border-radius: 10px
      .round-inner
        transition: .4s
        width: 6px
        height: 6px
        border-radius: 3px
  .label
    transition: .4s
    cursor: pointer
    white-space:nowrap
    word-break: keep-all
</style>
