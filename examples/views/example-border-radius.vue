<template>
<div class="example-tsy-border-radius-main">
  <div class="main-label">TSY Border radius</div>

  <div class="content">
    <div class="box">
      <div class="border-radius-ele" :style="eleStyleCompouted"></div>
    </div>
    <div class="handle1 handle" :style="handle1StyleComputed"></div>
    <div class="handle2 handle" :style="handle2StyleComputed"></div>
    <div class="handle3 handle" :style="handle3StyleComputed"></div>
    <div class="handle4 handle" :style="handle4StyleComputed"></div>
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
    }
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
  }
}
</script>

<style lang="css" scoped>
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
  width: 300px;
  height: 300px;
  position: relative;
}

.content>.handle {
  position: absolute;
  display: inline-block;
  width: 15px;
  height: 15px;
  background: lightgray;
  
  cursor: pointer;
  transition: all .2s;
}

.content> .handle1 {
  top: 0;
  transform: translate(0, -50%)

}
.content> .handle2 {
  left: 300px;
  transform: translate(0, 0)
}

.content> .handle3 {
  top: 300px;
}

.content> .handle4 {
  left: 0;
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