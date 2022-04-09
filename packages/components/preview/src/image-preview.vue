<template>
<div class="tsy-image-preview-main">
  <template v-if="visibility">
    <transition name="fade">
      <div class="mask" v-loading="loading">
        <div class="image-container" @mouseup="move = false" @mousemove="mousemove">
          <div class="center">
            <div class="anchor" :style="anchorStyle"><img :src="imgSrc" :style="imageStyle" draggable="false" @load="imageLoaded" @mousedown="mousedown"/></div>
          </div>
        </div>
        <div class="right-button round-btn" @click="next(1)" v-if="images.length &gt; 1">
          <div class="el-icon-arrow-right"></div>
        </div>
        <div class="left-button round-btn" @click="next(-1)" v-if="images.length &gt; 1">
          <div class="el-icon-arrow-left"></div>
        </div>
        <div class="close-button round-btn" @click="visibility = false">
          <div class="el-icon-close"></div>
        </div>
        <div class="toolbar">
          <div class="el-icon-zoom-out btn" @click="zoom(-0.1)"></div>
          <div class="el-icon-zoom-in btn" @click="zoom(0.1)"></div>
          <div class="el-icon-refresh-left btn" @click="rotate -= 90"></div>
          <div class="el-icon-refresh-right btn" @click="rotate +=  90"></div>
        </div>
      </div>
    </transition>
  </template>
</div>
</template>

<script>
export default {
  name: 'SyPreview',
  props: {
    images: {
      type: Array,
      default() {
        return []
      }
    },
    idx: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      loading: false,
      visibility: false,
      showIndex: 0,
      move: false,
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0
    }
  },
  computed: {
    anchorStyle() {
      return {
        left: `${this.left}px`,
        top: `${this.top}px`,
      }
    },
    imageStyle() {
      return {
        
        zoom: this.scale,
        transform: `translate(-50%, -50%) rotate(${this.rotate}deg)`,
        
      }
    },
    imgSrc() {
      const {
        showIndex,
        images
      } = this
      if (showIndex < images.length) {
        return images[showIndex]
      }
      return images[images.length - 1]
    }
  },
  mounted() {
    window.addEventListener('mousewheel',this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('mousewheel',this.handleScroll)
  },
  methods: {
    handleScroll(event) {
      if(event.deltaY > 0) {
        this.zoom(.1)
      } else {
        this.zoom(-.1)
      }
    },
    zoom(step) {
      this.scale += step
      if (this.scale < .2) {
        this.scale = .2
      }
    },
    imageLoaded() {
      this.loading = false
    },
    mousedown(event) {
      this.move = true
      this.lastEvent = event
    },
    mousemove(event) {
      const {
        lastEvent,
        move
      } = this

      if (move) {
        this.left += event.clientX - lastEvent.clientX
        this.top += event.clientY - lastEvent.clientY
        this.lastEvent = event
      }
    },
    show(index=0) {
      this.showIndex = index
      this.visibility = true
      this.loading = true
      this.scale = 1
      this.left = 0
      this.top = 0
      this.rotate = 0
    },
    next(delta) {
      let idx = this.showIndex + delta
      if (idx >= this.images.length) {
        idx = 0
      } else if (idx < 0) {
        idx = this.images.length - 1
      }
      this.show(idx)
    }
  }
}
</script>

<style lang="css" scoped>
.tsy-image-preview-main .trigger {
  cursor: pointer;
  height: auto;
  display: inline-block;
  padding: 0;
  margin: 0;
}

.tsy-image-preview-main .trigger:hover {
  outline: 1px solid red;
}

.tsy-image-preview-main .mask {
  user-select: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.tsy-image-preview-main .mask .toolbar {
  background-color: rgba(0, 0, 0, 0.5);
  color: #e0e0e0;
  position: absolute;
  bottom: 30px;
  left: calc(50% - 60px);
  width: 200px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
}

.tsy-image-preview-main .mask .toolbar .btn:hover {
  color: white;
}

.tsy-image-preview-main .mask .toolbar .btn {
  font-size: 25px;
  cursor: pointer;
}

.tsy-image-preview-main .mask .round-btn {
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: bolder;
  font-size: 26px;
  cursor: pointer;
}

.tsy-image-preview-main .mask .right-button {
  right: 30px;
}

.tsy-image-preview-main .mask .left-button {
  left: 30px;
}

.tsy-image-preview-main .mask .close-button {
  top: 30px;
  right: 30px;
}

.tsy-image-preview-main .mask .image-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tsy-image-preview-main .mask .image-container .center {
  position: relative;
  display: inline;
}

.tsy-image-preview-main .mask .image-container .center .anchor {
  display: inline;
  overflow: visible;
  position: absolute;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>