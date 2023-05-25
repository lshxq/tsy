<template>
  <div class="clip-path-polygon-main" ref="mainPanelRef">
    <div class="block">
      <div class="image-div">
        <img :src="`https://picsum.photos/${imageWidth}/${imageHeight}?r=1`" :style="imageStyleComp" draggable="false"/>

        <div v-for="(p, idx) of pointsData" 
             :key="idx" class="handle" 
             :ref="`handle${idx}`" 
             v-drag 
             :data-drag-range-h="dragRangeHComp" 
             :data-drag-range-v="dragRangeVComp" 
             @dragged="event => handleDragged(event, idx)">{{idx+1}}</div>
        
      </div>
      <select-input :value="imageStyleComp['clip-path']"/>
    </div>
  </div>
</template>


<script>
import SelectInput from './select-on-click-input.vue'

const percentage = (numerator, denominator) => {
  return `${Math.floor(numerator / denominator * 100)}%`
}

export default {
  components: {
    SelectInput
  },
  props: {
    imageHeight: {
      type: Number,
      default() {
        return 100;
      }
    },
    imageWidth: {
      type: Number,
      default() {
        return 100;
      }
    },
    points: {
      type: Array,
      required: true
    }
  },

  data() {

    return {
      pointsData: this.points
    }
  }, 

  computed: {
    imageStyleComp() {
      const {
        pointsData,
        px,py
      } = this;
      const pos = pointsData.map(p => {
        return `${px(p.x)} ${py(p.y)}`
      })
      return {
        'clip-path': `polygon(${pos.join(', ')})`
      }
    },
    dragRangeHComp() {
      return `0,${this.imageWidth}`
    },
    dragRangeVComp() {
      return `0,${this.imageHeight}`
    },
  },
  mounted() {
    const that = this
    const mainPanel = that.$refs.mainPanelRef
    mainPanel.style.setProperty('--image-width', this.imageWidth)
    mainPanel.style.setProperty('--image-height', this.imageHeight)

    const {
      pointsData
    } = that

    pointsData.forEach((p, idx) => {
      const target = that.$refs[`handle${idx}`][0]
      target.style.top = `${p.y}px`
      target.style.left = `${p.x}px`
    })
  },
  methods: {
    px(numerator) {
      return percentage(numerator, this.imageWidth)
    },
    py(numerator) {
      return percentage(numerator, this.imageHeight)
    },
    handleDragged(data, idx) {
      const points = JSON.parse(JSON.stringify(this.pointsData))
      points[idx].x = data.target.offsetLeft
      points[idx].y = data.target.offsetTop
      this.pointsData = points
    },
  }
}

</script>

<style scoped>
.clip-path-polygon-main {
  --image-width: 100px;
  --image-height: 100px;
  display: inline-block;
}

.clip-path-polygon-main>.block {
  margin: 20px;
}
.clip-path-polygon-main>.block>.clip-path-polygon {
  margin-top: 10px;
}
.clip-path-polygon-main>.block>.image-div {
  display: inline-block;
  width: var(--image-width);
  height: var(--image-height);
  position: relative;
  border: 2px dashed gray;
  user-select: none;
  
  background: lightgray;
}

.clip-path-polygon-main>.block>.image-div>img {
  width: 100%;
  object-fit: cover;
}

.clip-path-polygon-main>.block>.image-div>.handle {
  --handle-size: 18px;
  display: inline-block;
  width: var(--handle-size);
  height: var(--handle-size);
  cursor: pointer;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: conic-gradient(rgb(104, 247, 38), yellow, rgb(104, 247, 38));
  border-radius: 50%;
  border: 1px solid gray;
}


</style>