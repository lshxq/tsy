import Miao from './src/miao.vue'

Miao.install = function(Vue) {
  Vue.component(Miao.name, Miao)
}

export default Miao