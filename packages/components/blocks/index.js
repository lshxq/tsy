import Blocks from './src/blocks.vue'

Blocks.install = function(Vue) {
  Vue.component(Blocks.name, Blocks)
}

export default Blocks