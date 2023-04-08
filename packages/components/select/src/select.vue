<template>
  <div class="tsy-select-main">
    <div class='input'>
      <input  :value="valueDisplayComputed" readonly/>
    </div>
    
    <div class="option-panel">
      <div class="option-item" v-for="(opt, idx) of options" :key="idx">{{opt.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SySelect',
  props: {
    value: null,
    placeholder: String,
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    valueDisplayComputed() {
      const {
        value,
        options
      } = this;
      let str = '';
      for (const opt of options) {
        if (opt.value === value) {
          str = opt.label;
        }
      }
      return str;
    }
  }
}
</script>

<style scoped>
.tsy-select-main {
  display: inline-block;
  user-select: none;
  position: relative;
  background: white;
}

.tsy-select-main>.input {
}

.tsy-select-main>.input>input {
  margin: 1px;
  padding: 2px 4px;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  border: 0;
  outline: 1px solid lightgray;
}
.tsy-select-main>.input>input:focus {
  outline: 1px solid #409EFF;
  border: 0;
}

.option-panel {
  position: absolute;
  top: 30px;
  background: white;
  width: 100%;
  box-shadow: 0 0 10px lightgray;
  border-radius: 5px;
  padding: 3px;
}
</style>