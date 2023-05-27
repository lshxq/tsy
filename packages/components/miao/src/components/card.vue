<template>
  <div :class="cardClassComp">
    <div class="content">
      <img :src="images[card.type]" alt=""  draggable="false">
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    images: Array,
    bar: Array
  },
  computed: {
    cardClassComp() {
      
      const {
        bar,
        card
      } = this
      const {
        dark
      } = card

      const inbar = bar.find(cib => {
        return cib.id === card.id
      })
      return {
        card: true,
        dark,
        inbar
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
.card.inbar {
  transform: scale(1.05);
}

.card:not(.dark):not(.inbar) {
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

.card:not(.dark):not(.inbar):hover {
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
  border: 1px solid gray;
}

.content>img {
  width: 100%;
  height: 100%;
}
</style>