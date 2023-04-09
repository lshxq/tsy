<template>
  <div class="tsy-select-main" @blur="expend = false">
    <multiple-selector v-if="multiple" v-bind="$attrs" @input="$emit('input', $event)"/>
    <single-selector v-else v-bind="$attrs" @input="$emit('input', $event)"/>
  </div>
</template>

<script>
import SingleSelector from './components/single-selector.vue';
import MultipleSelector from './components/multiple-selector.vue';

export default {
  components: {
    SingleSelector,
    MultipleSelector
  },
  name: 'SySelect',
  props: {
    multiple: {
      type: Boolean,
      default() {
        return false;
      }
    },
  },

  mounted() {

  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style scoped>
.tsy-select-main {
  display: inline-block;
  user-select: none;
  position: relative;
  background: white;
}
</style>