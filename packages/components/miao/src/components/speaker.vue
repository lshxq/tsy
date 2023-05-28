<template>
  <div class="speaker-main" @click="toggleValue">
    <img :src="value ? speakerOn : speakerOff" width="100%" height="100%" draggable="false"/>
  </div>
</template>

<script>

import speakerOn from '../assets/speaker-on.png'
import speakerOff from '../assets/speaker-off.png'

export default {
  props: {
    value: Boolean
  },
  created() {
    this.speakerOn = speakerOn
    this.speakerOff = speakerOff
  },
  methods: {
    toggleValue() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style scoped>
.speaker-main {
  cursor: pointer;
}
</style>