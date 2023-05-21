<template>
  <div class="controller-main">
    <controller-button key-name="q" label="暂停" class="key-q" @key-clicked="keyClicked"/>

    <controller-button key-name="a" label="左移" class="key-a" @key-clicked="keyClicked"/>

    <controller-button key-name="w" label="翻转" class="key-w" @key-clicked="keyClicked"/>

    <controller-button key-name="d" label="右移" class="key-d" @key-clicked="keyClicked"/>
  </div>
</template>

<script>
import ControllerButton from './controller-button.vue'

export default {
  components: {
    ControllerButton
  },

  methods: {
    keyClicked(key) {
      this.$emit('keypressed', key)
    },
  }
}
</script>

<style scoped>
.controller-main {
  position: relative;
  background: white;
  width: 200px;
  height: 200px;
}

.key-q {
  left: 20px;
  top: 30px;
}

.key-a {
  left: 30px;
  top: 120px;
}

.key-w {
  left: 80px;
  top: 30px;
}

.key-d {
  left: 130px;
  top: 120px;
}



</style>