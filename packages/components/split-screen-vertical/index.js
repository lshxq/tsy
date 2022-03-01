import SplitScreen from './src/split-screen-vertical.vue'

SplitScreen.install = function(Vue) {
  Vue.component(SplitScreen.name, SplitScreen)
}

export default SplitScreen