<template>
  <div class="controller-main">
    <controller-button key-name="q" label="隐藏" class="key-q" @key-pressed="keyPressed"/>

    <controller-button key-name="a" label="左移" class="key-a" @key-pressed="keyPressed"/>

    <controller-button key-name="w" label="翻转" class="key-w" @key-pressed="keyPressed"/>

    <controller-button key-name="r" label="暂停" class="key-r" @key-pressed="keyPressed"/>

    <controller-button key-name="s" label="快降" class="key-s" @key-pressed="keyPressed" @key-down="keydown" @key-up="keyup"/>

    <controller-button key-name="d" label="右移" class="key-d" @key-pressed="keyPressed"/>
  </div>
</template>

<script>
import ControllerButton from './controller-button.vue'

export default {
  components: {
    ControllerButton
  },

  methods: {
    keyPressed(key) {
      this.$emit('keypressed', key)
    },
    keydown(key) {
      this.$emit('keydown', key)
    },
    keyup(key) {
      this.$emit('keyup', key)
    }
  }
}
</script>

<style scoped>
.controller-main {
  position: relative;
  background: white;
  height: 220px;
  width: 250px;
}

.key-q {
  left: 0px;
  top: 30px;
}

.key-a {
  left: 10px;
  top: 120px;
}

.key-w {
  left: 60px;
  top: 30px;
}

.key-r {
  left: 180px;
  top: 30px;
}

.key-d {
  left: 130px;
  top: 120px;
}

.key-s {
  left: 70px;
  top: 120px;
}


</style>