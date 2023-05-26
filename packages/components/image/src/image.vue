<template>
<div class="tsy-image-main">
  <sy-preview ref="previewRef" :images="imagesComp"></sy-preview>
  <div :class="imageDivClassComp" v-for="(img, idx) of imagesComp" :key="idx" @click="imageClicke(idx)">
    <img :src="img" draggable="false" :width="widthComp" :height="heightComp"/>
    <div class="mask" v-if="preview">
      <div class="text">点击预览</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SyImg",
  props: {
    preview: {
      type: Boolean,
      default() {
        return true
      }
    },
    src: String,
    width: String,
    height: String,
    
  },
  data() {
    return {
    }
  },
  computed: {
    imageDivClassComp() {
      return {
        'tsy-image-item': true,
        '.preview-enabled': this.preview
      }
    },
    imagesComp() {
      const {
        src
      } = this
      const imgs = []
      if (src) {
        if (src instanceof Array) {
          for (const ss of src) {
            imgs.push(ss)
          }
        } else {
          imgs.push(src)
        }
      }
      return imgs
    },
    widthComp() {
      let {
        width
      } = this
      if (!width) {
        width = '220px'
      }
      return width
    },
    heightComp() {
      let {
        height,
      } = this
      return height
    }
  },
  methods: {
    imageClicked(idx) {
      if (this.preview) {
        this.$refs.previewRef.show(idx)
      }
    }
  },
};
</script>

<style lang="css" scoped>
.tsy-form-main .input-bar {
  height: 40px;
  display: flex;
  align-items: center;
}
.tsy-image-main {
  display: flex;
  flex-flow: row wrap;
}

.tsy-image-main .tsy-image-item.preview-enabled:hover {
  box-shadow: 5px 5px 5px gray;
}

.tsy-image-main .tsy-image-item.preview-enabled:hover .mask {
  background: rgba(255, 255, 255, 0.6);
}

.tsy-image-main .tsy-image-item.preview-enabled:hover .mask .text {
  display: block;
}

.tsy-image-main .tsy-image-item {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
}

.tsy-image-main .tsy-image-item img {
  width: 100%;
  height: 100%;
}

.tsy-image-main .tsy-image-item.preview-enabled {
  cursor: pointer;
}

.tsy-image-main .tsy-image-item .mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tsy-image-main .tsy-image-item .mask .text {
  display: none;
  color: white;
  font-size: small;
}

</style>