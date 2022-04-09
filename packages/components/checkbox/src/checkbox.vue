<template>
<div class="tsy-checkbox-main" @click.stop="checkboxClicked">
  <div class="tsy-checkbox-inner" :class="checkboxClassComp">
    <div class="checkbox">
      <div class="mark"></div>
    </div>
    <div class="label" v-if="!!label">{{label}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "SyCheckbox",
  props: {
    checked: Boolean,
    label: String,
    value: null,
  },
  computed: {
    checkboxClassComp() {
      const { checked } = this;
      return {
        checked,
      };
    },
  },
  methods: {
    checkboxClicked() {
      this.$emit("click", !this.checked, this.value);
    },
  },
};
</script>

<style lang="css" scoped>
.tsy-checkbox-main {
  margin: 5px 10px 5px 5px;
  vertical-align: middle;
  display: inline-block;
}

.tsy-checkbox-main .tsy-checkbox-inner.checked .checkbox {
  background-color: #409eff;
  border: 1px solid #409eff;
}

.tsy-checkbox-main .tsy-checkbox-inner.checked .checkbox .mark {
  left: 2px;
  top: 2px;
  position: absolute;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  display: inline-block;
  width: 8px;
  height: 6px;
  transform: rotate(-45deg);
}

.tsy-checkbox-main .tsy-checkbox-inner.checked .label {
  color: #409eff;
  font-weight: bold;
}

.tsy-checkbox-main .tsy-checkbox-inner {
  display: flex;
  align-items: center;
}

.tsy-checkbox-main .tsy-checkbox-inner .checkbox {
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid lightgray;
  line-height: 17px;
  transition: .4s;
}

.tsy-checkbox-main .tsy-checkbox-inner .checkbox:hover {
  border: 1px solid #409eff;
}

.tsy-checkbox-main .tsy-checkbox-inner .label {
  transition: .4s;
  font-size: 17px;
  cursor: pointer;
  height: 17px;
  margin-left: 10px;
  display: inline-block;
  line-height: 17px;
}

</style>
