<template>
<div class="tsy-image-main">
  <sy-preview ref="previewRef" :images="imagesComp"></sy-preview>
  <div class="tsy-image-item" v-for="(img, idx) of imagesComp" :key="idx" @click="$refs.previewRef.show(idx)"><img :src="img" draggable="false" :width="widthComp" :height="heightComp"/>
    <div class="mask">
      <div class="text">点击预览</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SyImg",
  props: {
    src: null,
    width: String,
    height: String,
    
  },
  data() {
    return {
    }
  },
  computed: {

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
        width = '100px'
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

.tsy-image-main .tsy-image-item:hover {
  box-shadow: 5px 5px 5px gray;
}

.tsy-image-main .tsy-image-item:hover .mask {
  background: rgba(255, 255, 255, 0.6);
}

.tsy-image-main .tsy-image-item:hover .mask .text {
  display: block;
}

.tsy-image-main .tsy-image-item {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
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