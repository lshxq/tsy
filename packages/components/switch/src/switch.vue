<template>
  <div :class="switchClassComp">
    <div class="label off">{{labelOff}}</div>
    <div class="tsy-switch">
      <div class="ball" @click="toggle"></div>
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
  },
  computed: {
    switchClassComp() {
      return {
        'tsy-switch-main': true,
        on: this.value
      }
    }
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
  display: flex;
  align-items: center;
  user-select: none;
}

.tsy-switch-main>.label {
  padding: 5px;
}

.tsy-switch-main>.tsy-switch {
  --height: 26px;
  --width: 50px;
  --ball-size: 20px;
  --pad: calc((var(--height) - var(--ball-size)) / 2);
  display: inline-block;
  border-radius: calc(var(--height) / 2) calc(var(--height) / 2) calc(var(--height) / 2) calc(var(--height) / 2) / 50% 50% 50% 50%;
  background: lightgray;
  position: relative;
  height: var(--height);
  width: var(--width);
  transition: all .5s;
}

.tsy-switch-main.on>.tsy-switch{
  background: #409eff;
}

.tsy-switch-main>.tsy-switch>.ball {
  transition: all .5s;
  top: var(--pad);
  left: var(--pad);
  position: absolute;
  display: inline-block;
  width: var(--ball-size);
  height: var(--ball-size);
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.tsy-switch-main.on>.tsy-switch>.ball {
  left: calc(var(--width) - var(--ball-size) - var(--pad));
}
</style>