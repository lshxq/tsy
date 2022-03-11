import Panel from './src/panel.vue'

Panel.install = function(Vue) {
  Vue.component(Panel.name, Panel)
}

export default Panel