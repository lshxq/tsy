import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import tsy from '../packages'
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/main.css'

Vue.config.productionTip = false

Vue.use(tsy)
Vue.use(ElementUI)
axios.defaults.baseURL = '/api'
const myMixin = {
  created() {
    this.$axios = reqCfg => {
      return new Promise((res, rej) => {
        axios(reqCfg).then(res).catch(ex => {
          const {
            mock
          } = reqCfg
          if (mock) {
            const buildResponse = data => {
              return { // moni axios返回的数据结构
                data
              }
            }
            
            let mockData = null
            if( typeof mock === 'function') {
              mockData=buildResponse(mock(reqCfg))
            } else {
              mockData = buildResponse(mock)
            }
            console.log('调用接口失败，采用mock数据', mockData)
            res(mockData)
          } else {
            rej(ex)
          }
        })
      })
    }
  },
  methods: {
    goto(routeName, opt) {
      this.$router.push({
        name: routeName,
        ...opt
      })
    }
  }
}

Vue.mixin(myMixin)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
