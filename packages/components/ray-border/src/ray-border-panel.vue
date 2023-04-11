<template>
<div class="tsy-ray-border-panel-main">
  <div class="tsy-ray-border-panel" :style="outStyleComputed">
    <div class="ray ray1" ref="ray1Ref"></div>
    <div class="ray ray2" ref="ray2Ref"></div>
    <div class="tsy-ray-border-content-panel" :style="innerStyleComputed">
      <slot/>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'SyRayBorder',
  props: {
    radius: {
      type: Number,
      default() {
        return 0;
      }
    },
    width: Number,
    height: Number,
    color1: {
      type: String,
      default() {
        return '#e6f03c,#faf01e,#50befa,transparent'
      },
    },
    color2: {
      type: String,
      default() {
        return '#d232fa,#aab4f0,#f0c8fa,transparent'
      }
    }
  },
  mounted() {
    this.$refs.ray1Ref.style.backgroundImage = `conic-gradient(transparent, ${this.color1})`
    this.$refs.ray2Ref.style.backgroundImage = `conic-gradient(transparent, ${this.color2})`
  },
  computed: {
    innerStyleComputed() {
      const {
        radius,
        width, 
        height
      } = this
      return {
        width: `${width - 10}px`,
        height: `${height - 10}px`,
        borderRadius: `${radius}px`
      }
    },
    outStyleComputed() {
      const {
        radius,
        width, 
        height
      } = this
      return {
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`
      }
    }
  }
}
</script>

<style scoped>

.tsy-ray-border-panel-main {
  display: inline-block;
}
.tsy-ray-border-panel {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.ray {
  width: 200%;
  height: 200%;
  
  transform: rotate(90deg);
  position: absolute;
  top: -50%;
  left: -50%;
  animation: action 3s linear infinite;
}
.ray2 {
  animation-delay: -1.5s;
}

@keyframes action {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.tsy-ray-border-content-panel {
  background: white;
  position: absolute;
  top: 5px;
  left: 5px;
  overflow: hidden;
}
</style>