<template>
  <div class="clip-path-circle-main">
    <div class="block">
      <div class="image-div">
        <img :src="`https://picsum.photos/${imageWidth}/${imageHeight}?r=1`" :style="imageStyleComp" draggable="false"/>

        <div class="handle center-handle" ref="centerHandle" v-drag :data-drag-range-h="dragRangeHComp" :data-drag-range-v="dragRangeVComp" @dragged="centerHandleDragged">c</div>
        <div class="radius-handle-c" :style="radiusHandleContainerStyleComp">
          <div class="handle radius-handle" ref="radiusHHandle"  v-drag :data-drag-range-h="dragRangeHComp" data-drag-range-v="0,0" @dragged="radiusHHandleDragged">r1</div>
          <div class="handle radius-handle" ref="radiusVHandle"  v-drag :data-drag-range-v="dragRangeVComp" data-drag-range-h="0,0" @dragged="radiusVHandleDragged">r2</div>
        </div>
      </div>
      
      <select-input :value="imageStyleComp['clip-path']"/>
    </div>
  </div>
</template>

<script>
const percentage = (numerator, denominator) => {
  return `${Math.floor(numerator / denominator * 100)}%`
}


import SelectInput from './select-on-click-input.vue'

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
  },
  data() {
    return {
      center: {
        x: this.imageWidth / 3,
        y: this.imageHeight / 3
      },
      radiusH: 150, // percentage
      radiusV: 100
    }
  },
  computed: {
    radiusHandleContainerStyleComp() {
      return {
        left: `${this.center.x}px`,
        top: `${this.center.y}px`,
      }
    },
    dragRangeHComp() {
      return `0,${this.imageWidth}`
    },
    dragRangeVComp() {
      return `0,${this.imageHeight}`
    },
    imageStyleComp() {
      const {
        center,
        imageWidth,
        imageHeight
      } = this

      return {
        'clip-path': `ellipse(${percentage(this.radiusH, imageWidth)} ${percentage(this.radiusV, imageWidth)} at ${percentage(center.x, imageWidth)} ${percentage(center.y, imageHeight)})`
      }
    }
  },
  mounted() {
    const {
        center,
        radiusH,
        radiusV
      } = this
    const {
      centerHandle: centerTarget,
      radiusHHandle: radiusHTarget,
      radiusVHandle: radiusVTarget,
    } = this.$refs;

    centerTarget.style.left = `${center.x}px`;
    centerTarget.style.top = `${center.y}px`;

    radiusHTarget.style.left = `${radiusH}px`
    radiusHTarget.style.top = '0'

    radiusVTarget.style.left = '0'
    radiusVTarget.style.top = `${radiusV}px`
  },
  methods: {
    centerHandleDragged(obj) {
      this.center.x = obj.target.offsetLeft
      this.center.y = obj.target.offsetTop
    },
    radiusHHandleDragged(obj) {
      this.radiusH = obj.target.offsetLeft
    },
    radiusVHandleDragged(obj) {
      this.radiusV = obj.target.offsetTop
    }
  }
}
</script>

<style scoped>
.clip-path-circle-main {
  display: inline-block;
}
.clip-path-circle-main>.block {
  margin: 20px;
}
.clip-path-circle-main>.block>.image-div {
  background: lightgray;
  user-select: none;
  position: relative;
}

.clip-path-circle-main>.block>.image-div .handle {
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

.clip-path-circle-main>.block>.image-div .radius-handle-c {
  position: absolute;
}
</style>