<template>
  <div class="tsy-water-drop-main" :style="waterStyle()">
    
  </div>
</template>
  
<script>


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
  methods: {
    waterStyle() {
      const {
        zoom
      } = this;
      return {
        zoom
      }
    }
  }
}
</script>

<style>
.tsy-water-drop-main {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 37% 63% 38% 62% / 55% 28% 72% 45%;
  box-shadow: inset 8px 12px 20px rgba(0, 0, 0, .5), 
                    10px 10px 30px rgba(0, 0, 0, .3),
                    15px 15px 30px rgba(0, 0, 0, .05),
              inset -5px -5px 8px rgba(255, 255, 255, .8);
  animation: action 5s linear infinite alternate;
}

.tsy-water-drop-main::after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  top: 30px;
  left: 40px;
  background: rgba(255, 255, 255, .8);
  border-radius: 50% 49% 69% 30% / 29% 21% 77% 71%;;
}

.tsy-water-drop-main::before {
  content: '';
  width: 7px;
  height: 7px;
  position: absolute;
  top: 20px;
  left: 25px;
  background: rgba(255, 255, 255, .8);
  border-radius: 51% 48% 69% 51% / 33% 29% 59% 21%;;
}

@keyframes action{
  25% {
    border-radius: 38% 62% 47% 53% / 57% 45% 55% 43%;
  }
  50% {
    border-radius: 57% 43% 47% 53% / 47% 54% 46% 53%;
  }
  80% {
    border-radius: 43% 57% 38% 62% / 55% 63% 37% 45%;
  }
  100% {
    border-radius: 48% 52% 38% 62% / 55% 47% 53% 45%;
  }
}
</style>