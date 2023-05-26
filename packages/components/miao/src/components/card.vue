<template>
  <div :class="cardClassComp">
    <div class="content">
      <img :src="images[card.type]" alt="">
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    images: Array
  },
  computed: {
    cardClassComp() {
      const {
        dark
      } = this.card
      return {
        card: true,
        dark
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 90%;
  height: 90%;
  background: lightgray;
  position: absolute;
}

.card:not(.dark) {
  cursor: pointer;
}

.card:not(.dark):before {
  content: '';
  background: inherit;
  filter: blur(10px);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.card:not(.dark):hover {
  transform: scale(1.1);
}

.card.dark>.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0 ,0, .6)
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  flex: 0 0 var(--card-width);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.content>img {
  width: 100%;
  height: 100%;
}
</style>