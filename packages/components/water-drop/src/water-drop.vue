<template>
<div  class="tsy-water-drop-main">
  <div class="tsy-water-drop" :style="eleStyleCompouted">
    
  </div>
</div>
  
</template>
  
<script>
import utils from '../../../utils.js'


export default {
  name: 'SyWaterDrop',
  props: {
    zoom: {
      type: Number,
      default() {
        return 1;
      }
    } 
  },
  data() {
    return {
      v1: utils.random(35, 65),
      v2: utils.random(35, 65),
      v3: utils.random(35, 65),
      v4: utils.random(35, 65)
    }
  },
  mounted() {
    this.timerId = setInterval(() => {
      this.v1 = utils.random(35, 65);
      this.v2 = utils.random(35, 65);
      this.v3 = utils.random(35, 65);
      this.v4 = utils.random(35, 65);
    }, 3000)
  },
  destroyed() {
    clearInterval(this.timerId)
  },
  
  computed: {
    borderRadiusComputed() {
      const {
        v1, v2, v3, v4
      } = this
      return `${v1}% ${100-v1}% ${100-v3}% ${v3}% / ${v4}% ${v2}% ${100-v2}% ${100-v4}%`
    },
    eleStyleCompouted() {
      const {
        zoom
      } = this;
      const {
        borderRadiusComputed
      } = this
      return {
        borderRadius: borderRadiusComputed,
        zoom
      }
    }
  },
}
</script>

<style>
.tsy-water-drop {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 37% 63% 38% 62% / 55% 28% 72% 45%;
  box-shadow: inset 8px 12px 20px rgba(0, 0, 0, .5), 
                    10px 10px 30px rgba(0, 0, 0, .3),
                    15px 15px 30px rgba(0, 0, 0, .05),
              inset -5px -5px 8px rgba(255, 255, 255, .8);
  transition: all 3s;
}

.tsy-water-drop::after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  top: 30px;
  left: 40px;
  background: rgba(255, 255, 255, .8);
  border-radius: 50% 49% 69% 30% / 29% 21% 77% 71%;;
}

.tsy-water-drop::before {
  content: '';
  width: 7px;
  height: 7px;
  position: absolute;
  top: 20px;
  left: 25px;
  background: rgba(255, 255, 255, .8);
  border-radius: 51% 48% 69% 51% / 33% 29% 59% 21%;;
}
</style>