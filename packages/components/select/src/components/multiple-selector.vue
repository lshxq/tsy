<template>
  <div class="tsy-select-main" @blur="expend = false">
    <div class='input' @click="expend = !expend">
      <input  :value="valueDisplayComputed" readonly />
    </div>

    <sy-arrow :class="arrowClassComputed" color="#BBBBBB"/>
    
    <div :class="optionPanelClassComputed">
      <div :class="optionItemClass(opt)" v-for="(opt, idx) of options" :key="idx" @click="optionClicked(opt)">{{opt.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SySelect',
  props: {
    multiple: {
      type: Boolean,
      default() {
        return false;
      }
    },
    value: null,
    placeholder: String,
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      expend: false
    }
  },
  mounted() {
    const {
      multiple,
      value
    } = this
    if (multiple) {
      if (!value || !(value instanceof Array)) {
        this.$emit('input', []); // 确保传入的值为数组类型
      }
    }
  },
  computed: {
    optionPanelClassComputed() {
      const {
        expend
      } = this
      return {
        'option-panel': true,
        expend
      }
    },
    arrowClassComputed() {
      const {
        expend
      } = this
      return {
        'select-arrow': true,
        expend
      }
    },
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
  },
  methods: {
    optionClicked(opt) {
      const {
        multiple,
      } = this;
      if (multiple) { // 多选
        const {
          value
        } = this;
        let found = false;
        const newValue = []
        for (const vv of value) {
          if (vv === opt.value) {
            found = true
          } else {
            newValue.push(vv)
          }
        }
        if (!found) {
          newValue.push(opt.value)
        }
        this.$emit('input', newValue);

      } else { // 单选
        this.expend = false;
        this.$emit('input', opt.value);
      }
    },

    optionItemClass(opt) {
      const {
        value,
        multiple
      } = this
      let selected = false;
      if (multiple) {
        for (const vv of value) {
          if (vv === opt.value) {
            selected = true;
          }
        }
      } else {
        selected = value === opt.value
      }
      return {
        'option-item': true,
        selected,
      }
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

.select-arrow {
  position: absolute;
  right: 10px;
  top: 7px;
  transform: rotate(90deg);
  cursor: pointer;
  transition: .5s all;
}
.select-arrow.expend {
  transform: rotate(270deg);
}

.tsy-select-main>.input {
  cursor: pointer;
}

.tsy-select-main>.input>input {
  margin: 1px;
  padding: 0 30px 0 15px;
  border-radius: 5px;
  height: 25px;
  width: 100%;
  border: 0;
  outline: 1px solid lightgray;
  box-sizing: border-box;
  cursor: pointer;
}
.tsy-select-main>.input>input:focus {
  outline: 1px solid #409EFF;
  border: 0;
}

.option-panel.expend {
  transform: scaleY(1);
}
.option-panel {
  position: absolute;
  top: 30px;
  background: white;
  width: 100%;
  box-shadow: 0 0 10px lightgray;
  border-radius: 5px;
  padding: 4px 0;
  transform: scaleY(0);
  transition: .5s;
  transform-origin: 0 0;
  z-index: 9999;
}
.option-panel>.option-item {
  padding: 5px 7px;
}
.option-panel>.option-item:hover {
  background: #EEE;
}
.option-panel>.option-item.selected {
  color: #409EFF;
  font-weight: bold;
}
</style>