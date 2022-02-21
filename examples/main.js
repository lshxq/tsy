import Vue from 'vue'
import App from './App.vue'
import tsy from '../packages'

Vue.config.productionTip = false

Vue.use(tsy)

new Vue({
  render: h => h(App),
}).$mount('#app')
