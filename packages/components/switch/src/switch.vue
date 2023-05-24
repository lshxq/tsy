<template>
  <div :class="switchClassComp" ref="switchRef">
    <div class="label off">{{labelOff}}</div>
    <div class="tsy-switch" @click="toggle">
      <div class="ball" ></div>
    </div>
    <div class="label on">{{labelOn}}</div>
  </div>
  
</template>

<script>
export default {
  name: 'sySwitch',
  props: {
    value: Boolean,
    labelOn: String,
    labelOff: String,
    bgColorOn: {
      type: String,
      default() {
        return '#409eff'
      }
    },
    bgColorOff: {
      type: String,
      default() {
        return 'lightgray'
      }
    },
    width: {
      type: String,
      default() {
        return '50'
      }
    },
    height: {
      type: String,
      default() {
        return '26'
      }
    },
    labelFontSize: {
      type: String,
      default() {
        return '16'
      }
    }
  },
  computed: {
    switchClassComp() {
      return {
        'tsy-switch-main': true,
        on: this.value
      }
    }
  },
  mounted() {
    const {
      switchRef: switchObj
    } = this.$refs;


    switchObj.style.setProperty('--bg-color-on', this.bgColorOn)
    switchObj.style.setProperty('--bg-color-off', this.bgColorOff)

    switchObj.style.setProperty('--width', `${this.width}px`)
    switchObj.style.setProperty('--height', `${this.height}px`)

    switchObj.style.setProperty('--label-font-size', `${this.labelFontSize}px`)


  },
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style scoped>
.tsy-switch-main {
  --bg-color-on: #409eff;
  --bg-color-off: lightgray;
  --height: 26px;
  --width: 50px;
  --ball-pad: 3px;
  --label-font-size: 26px; 

  display: flex;
  align-items: center;
  user-select: none;
}

.tsy-switch-main>.label {
  padding: 5px;
  font-size: var(--label-font-size);
}

.tsy-switch-main>.tsy-switch {
  --ball-size: calc(var(--height) - 2 * var(--ball-pad));
  
  display: inline-block;
  border-radius: calc(var(--height) / 2) calc(var(--height) / 2) calc(var(--height) / 2) calc(var(--height) / 2) / 50% 50% 50% 50%;
  background: var(--bg-color-off);
  position: relative;
  height: var(--height);
  width: var(--width);
  transition: all .5s;
  cursor: pointer;
}

.tsy-switch-main.on>.tsy-switch{
  background: var(--bg-color-on);
}

.tsy-switch-main>.tsy-switch>.ball {
  transition: all .5s;
  top: var(--ball-pad);
  left: var(--ball-pad);
  position: absolute;
  display: inline-block;
  width: var(--ball-size);
  height: var(--ball-size);
  background: white;
  border-radius: 50%;
}

.tsy-switch-main.on>.tsy-switch>.ball {
  left: calc(var(--width) - var(--ball-size) - var(--ball-pad));
}
</style>