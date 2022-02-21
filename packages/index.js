import VTabs from './vertical-tab'
import Table from './table'
import PaginData from './pagin-data'


const components = [
  Table,
  PaginData,
  VTabs
]

const install = (Vue) => {
  if (install.installed) return 
  components.map(com => com.install(Vue))

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.vue)
}

export default {
  install,
  Table,
  PaginData
}