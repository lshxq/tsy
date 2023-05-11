<template>
  <div class="tsy-single-select-main" >
    <div class='input' @click="expend = !expend">
      <input  :value="valueDisplayComputed" readonly @blur="inputBlur" :placeholder="placeholder"/>
    </div>

    <sy-arrow :class="arrowClassComputed" color="#BBBBBB"/>
    
    <div :class="optionPanelClassComputed">
      <div :class="optionItemClass(opt)" v-for="(opt, idx) of options" :key="idx" @click="optionClicked(opt)">{{opt.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
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
  data() {
    return {
      expend: false
    }
  },
  mounted() {

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
    inputBlur() {
      const that = this;
      setTimeout(() => {
        that.expend = false
      }, 20) // 便面立即消失，导致点击不到option
    },
    optionClicked(opt) {
      this.expend = false;
      this.$emit('input', opt.value);
    },

    optionItemClass(opt) {
      const {
        value
      } = this;
      return {
        'option-item': true,
        selected: value === opt.value,
      }
    }
  }
}
</script>

<style scoped>
.tsy-single-select-main {
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

.tsy-single-select-main>.input>input {
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
.tsy-single-select-main>.input>input:focus {
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