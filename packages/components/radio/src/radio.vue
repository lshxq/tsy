<template>
<div class="tsy-radio-main" :class="radioClassComp" @click.stop="radioClicked">
  <div class="mark">
    <div class="round-outter">
      <div class="round-inner"></div>
    </div>
  </div>
  <div class="label">{{labelComp}}</div>
</div>
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

<style lang="css" scoped>
.tsy-radio-main.checked .mark .round-outter {
  background-color: #409eff;
}

.tsy-radio-main.checked .mark .round-outter .round-inner {
  background-color: white;
}

.tsy-radio-main.checked .label {
  color: #409eff;
  font-weight: bold;
}

.tsy-radio-main:hover .mark .round-outter {
  outline: 1px solid #409eff;
}

.tsy-radio-main {
  display: flex;
  margin-right: 20px;
  height: 30px;
  align-items: center;
}

.tsy-radio-main .mark {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.tsy-radio-main .mark .round-outter {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s;
  cursor: pointer;
  outline: 1px solid lightgray;
  width: 16px;
  height: 16px;
  border-radius: 10px;
}

.tsy-radio-main .mark .round-outter .round-inner {
  transition: .4s;
  width: 6px;
  height: 6px;
  border-radius: 3px;
}

.tsy-radio-main .label {
  transition: .4s;
  cursor: pointer;
  word-break: keep-all;
}

</style>
