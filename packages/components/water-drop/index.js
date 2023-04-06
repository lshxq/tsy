import WaterDrop from './src/water-drop.vue'

WaterDrop.install = function(Vue) {
  Vue.component(WaterDrop.name, WaterDrop)
}

export default WaterDrop