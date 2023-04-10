<template>
  <div class="tsy-rolling-image-main">
    <div class="pics" ref="picsRef">
      <img v-for='(img, idx) of images' :src="img" :key="idx" draggable="false">
    </div>
  </div>
</template>

<script>
import i1 from '../../../assets/images/marvel/01.jpg';
import i2 from '../../../assets/images/marvel/02.jpg';
import i3 from '../../../assets/images/marvel/03.jpg';
import i4 from '../../../assets/images/marvel/04.jpg';
import i5 from '../../../assets/images/marvel/05.jpg';
import i6 from '../../../assets/images/marvel/06.jpg';

export default {
  name: 'SyRollingImage',
  props: {
    images: {
      type: Array,
      default() {
        return [i1, i2, i3, i4, i5, i6]
      }
    }
  },
  mounted() {
    const pics = this.$refs.picsRef;
    const images = pics.children;
    for (let idx=0; idx<images.length; idx++) {
      images[idx].style.transform = `rotateY(${360 / images.length * idx}deg) translateZ(500px) `
    }
  }
}
</script>

<style scoped>
.tsy-rolling-image-main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  perspective: 2500px;
}
.pics {
  display: flex;
  width: 300px;
  height: 225px;
  transform-style: preserve-3d;
  margin-top: 250px;
  animation: action 40s linear infinite;
}
@keyframes  action{
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
.pics>img {
  width: 300px;
  height: 225px;
  position: absolute;
  -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 10%, rgba(255,255,255, .3));
  user-select: none;
}


</style>
