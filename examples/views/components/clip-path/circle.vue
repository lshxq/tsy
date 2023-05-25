<template>
  <div class="clip-path-circle-main">
    <div class="block">
      <div class="image-div">
        <img :src="`https://picsum.photos/${imageWidth}/${imageHeight}?r=1`" :style="imageStyleComp" draggable="false"/>

        <div class="handle center-handle" ref="centerHandle" v-drag :data-drag-range-h="dragRangeHComp" :data-drag-range-v="dragRangeVComp" @dragged="centerHandleDragged">c</div>
        <div class="radius-handle-c" :style="radiusHandleContainerStyleComp">
          <div class="handle radius-handle" ref="radiusHandle"  v-drag :data-drag-range-h="dragRangeHComp" data-drag-range-v="0,0" @dragged="radiusHandleDragged">r</div>
        </div>
      </div>
      <div class="clip-path-polygon">clip-path: {{imageStyleComp['clip-path']}}</div>
    </div>
  </div>
</template>

<script>
const percentage = (numerator, denominator) => {
  return `${Math.floor(numerator / denominator * 100)}%`
}

export default {
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
      radius: 150 // percentage
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
        'clip-path': `circle(${percentage(this.radius, imageWidth)} at ${percentage(center.x, imageWidth)} ${percentage(center.y, imageHeight)})`
      }
    }
  },
  mounted() {
    const {
        center,
        radius
      } = this
    const {
      centerHandle: centerTarget,
      radiusHandle: radiusTarget
    } = this.$refs;

    centerTarget.style.left = `${center.x}px`;
    centerTarget.style.top = `${center.y}px`;

    radiusTarget.style.left = `${radius}px`
    radiusTarget.style.top = '0'
  },
  methods: {
    centerHandleDragged(obj) {
      this.center.x = obj.target.offsetLeft
      this.center.y = obj.target.offsetTop
    },
    radiusHandleDragged(obj) {
      this.radius = obj.target.offsetLeft
    }
  }
}
</script>

<style scoped>
.clip-path-circle-main {
  display: inline-block;
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