<template>
<div class="example-tsy-border-radius-main">
  <div class="main-label">TSY Border radius</div>

  <div class="content">
    <div class="box">
      <div class="border-radius-ele" :style="eleStyleCompouted"></div>
    </div>
    <div class="handle1 handle" v-drag data-drag-range-h="0,300" data-drag-range-v="0,0" @dragged="handle1Dragged">1</div>
    <div class="handle2 handle" v-drag data-drag-range-h="3000,300" data-drag-range-v="0,300" @dragged="handle2Dragged">2</div>
    <div class="handle3 handle" v-drag data-drag-range-h="0,300" data-drag-range-v="300,300"  @dragged="handle3Dragged">3</div>
    <div class="handle4 handle" v-drag data-drag-range-h="0,0" data-drag-range-v="0,300"  @dragged="handle4Dragged">4</div>

    <div class="corner-label corner1">角1</div>
    <div class="corner-label corner2">角2</div>
    <div class="corner-label corner3">角3</div>
    <div class="corner-label corner4">角4</div>
  </div>
  <div class="value-panel">
    <div class="label">border-radius</div>
    <div class="input">
      <input type="text" readonly :value="borderRadiusComputed" maxlength="100"> 
    </div>
  </div>
</div>
  


</template>

<script>
const t = v => {
  return Math.floor(v / 3)
}

export default {
  data() {
    return {
      v1: 100,
      v2: 100, 
      v3: 100,
      v4: 100
    }
  },
  methods: {
    resized(bb) {
      console.log(bb)
    },
    handle1Dragged(data) {
      this.v1 = data.target.offsetLeft
    },
    handle2Dragged(data) {
      this.v2 = data.target.offsetTop
    },
    handle3Dragged(data) {
      this.v3 = data.target.offsetLeft
    },
    handle4Dragged(data) {
      this.v4 = data.target.offsetTop
    },
  },
  computed: {
    borderRadiusComputed() {
      const {
        v1, v2, v3, v4
      } = this
      return `${t(v1)}% ${100-t(v1)}% ${100-t(v3)}% ${t(v3)}% / ${t(v4)}% ${t(v2)}% ${100-t(v2)}% ${100-t(v4)}%`
    },
    eleStyleCompouted() {
      const {
        borderRadiusComputed
      } = this
      return {
        borderRadius: borderRadiusComputed
      }
    },
    handle1StyleComputed() {
      const {
        v1
      } = this
      return {
        left: `${v1}px`
      }
    },
    handle2StyleComputed() {
      const {
        v2
      } = this
      return {
        top: `${v2}px`
      }
    }
    ,handle3StyleComputed() {
      const {
        v3
      } = this
      return {
        left: `${v3}px`
      }
    },
    handle4StyleComputed() {
      const {
        v4
      } = this
      return {
        top: `${v4}px`
      }
    }
  },
}
</script>

<style lang="css" scoped>
.example-tsy-border-radius-main {
  --fs: 25px;
  --box-width: 300px;
}

.corner-label {
  position: absolute;
  width: calc(var(--fs) * 2);
  font-size: var(--fs);
}
.corner-label.corner1 {
  top: calc(0px - var(--fs));
  left: calc(0px - var(--fs) * 2)
  
}

.corner-label.corner2 {
  top: calc(0px - var(--fs));
  left: 320px
}
.corner-label.corner3 {
  top: 300px;
  left: 320px
}
.corner-label.corner4 {
  top: 300px;
  left: calc(0px - var(--fs) * 2)
}

.example-tsy-border-radius-main {
  user-select: none;
  height: 100%;
}
.main-label {
  margin: 40px 0 100px 10px;
  font-size: 70px;
  color: red;
  -webkit-text-stroke: 2px black;

}

.content {
  margin: auto;
  width: var(--box-width);
  height: var(--box-width);
  position: relative;
}

.content>.handle {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background: lightgray;
  
  cursor: pointer;
}

.content> .handle1 {
  top: 0;
  left: 100px;
  transform: translate(0, -50%)

}
.content> .handle2 {
  left: var(--box-width);
  top: 100px;
  transform: translate(0, 0)
}

.content> .handle3 {
  top: var(--box-width);
  left: 100px;
}

.content> .handle4 {
  left: 0;
  top: 100px;
  transform: translate(-50%, 0)
}


.content>.handle:hover {
  outline: 5px solid gray;
}



.content>.box {
  height: 100%;
  width: 100%;
  border: 5px dashed gray;
}
.content>.box>.border-radius-ele {
  background: linear-gradient(30deg, yellow, red);
  height: 100%;
  width: 100%;
}


.value-panel input {
  width: 250px;
  padding: 10px;
}
</style>