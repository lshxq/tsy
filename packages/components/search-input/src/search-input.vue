<template>
<div class="tsy-search-input-main">
  <el-input :placeholder="placeholder" v-model="valueInner" @change="exposeValue">
    <el-button slot="append" icon="el-icon-search" @click="exposeValue"></el-button>
  </el-input>
</div>
</template>

<script>
export default {
  name: "SySearchInput",
  props: {
    placeholder: String,
  },
  data() {
    return {
      valueInner: "",
    };
  },
  methods: {
    exposeValue() {
      this.$emit("input", this.valueInner);
    },
  },
};
</script>

<style lang="css" scoped>
.tsy-search-input-main {
  width: 280px;
}

</style>
