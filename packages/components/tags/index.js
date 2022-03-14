import Tags from './src/tags.vue'

Tags.install = function(Vue) {
  Vue.component(Tags.name, Tags)
}

export default Tags