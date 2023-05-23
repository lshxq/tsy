<template>
  <div class="controller-button-main">
    <div :class="keyLabelClassComp" @mousedown="mousedownHandler" @mouseup="mouseupHandler" @keydown="keydownHandler" @keyup="keyupHandler" :style="keyStyleComp">{{keyName | upper}}</div>
    <div class="label">{{label}}</div>
  </div>
</template>

<script>
export default {
  props: {
    keyName: {
      type: String,
      default() {
        return '田'
      }
    },
    label: {
      type: String,
      default() {
        return '田'
      }
    },
  },
  filters: {
    upper(val) {
      if (val) {
        return val.toUpperCase();
      }
    }
  },
  data() {
    return {
      keydown: false
    } 
    
  },
  mounted() {
    document.addEventListener('keydown', this.keydownHandler)
    document.addEventListener('keyup', this.keyupHandler)
  },
  destroyed() {
    document.removeEventListener('keydown', this.keydownHandler)
    document.removeEventListener('keyup', this.keyupHandler)
  },
  computed: {
    keyLabelClassComp() {
      const {
        keydown
      } = this
      return {
        'key-label': true,
        'key-down': keydown
      }
    },
    keyStyleComp() {
     return {} 
    }
  },
  methods: {
    mousedownHandler() {
      const {
        keyName,
        keydownHandler,
      } = this
      keydownHandler({
        key: keyName
      });
    },
    mouseupHandler() {
      const {
        keyName,
        keyupHandler,
      } = this
      keyupHandler({
        key: keyName
      });
    },
    keydownHandler(evt) {
      const {
        keyName
      } = this
     
      if (evt.key === keyName) {
        this.keydown = true
        this.$emit('key-down', keyName)
      }
      
    },
    keyupHandler(evt) {
      const {
        keyName
      } = this
     
      if (evt.key === keyName) {
        this.keydown = false
        this.$emit('key-pressed', keyName)
        this.$emit('key-up', keyName)
      }
    }
  }
}
</script>

<style scoped lang="css">


.controller-button-main {
  --key-width:40px;
  --key-shadow-color: lightgray;
  --key-shadow-width: 5px;
  --key-shadow-width-hover: 7px;
  position: absolute;
  display: flex;
  flex-flow: column;
  align-items: center;

}

.key-label {
  width: var(--key-width);
  height: var(--key-width);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: var(--key-shadow-width) var(--key-shadow-width) var(--key-shadow-width) var(--key-shadow-color), 
              var(--key-shadow-width) calc(0px - var(--key-shadow-width)) var(--key-shadow-width) var(--key-shadow-color), 
              calc(0px - var(--key-shadow-width)) calc(0px - var(--key-shadow-width)) var(--key-shadow-width) var(--key-shadow-color), 
              calc(0px - var(--key-shadow-width)) var(--key-shadow-width) var(--key-shadow-width) var(--key-shadow-color);
}

.key-label:hover {
  box-shadow: var(--key-shadow-width-hover) var(--key-shadow-width-hover) var(--key-shadow-width-hover) var(--key-shadow-color), 
              var(--key-shadow-width-hover) calc(0px - var(--key-shadow-width-hover)) var(--key-shadow-width-hover) var(--key-shadow-color), 
              calc(0px - var(--key-shadow-width-hover)) calc(0px - var(--key-shadow-width-hover)) var(--key-shadow-width-hover) var(--key-shadow-color), 
              calc(0px - var(--key-shadow-width-hover)) var(--key-shadow-width-hover) var(--key-shadow-width-hover) var(--key-shadow-color);
}

.key-label.key-down {
  box-shadow: none;
}

.label {
  margin: calc(var(--key-shadow-width) * 2);
}
</style>