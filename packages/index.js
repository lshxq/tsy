import VTabs from './vertical-tab'
import Table from './table'
import PaginData from './pagin-data'
import PaginTable from './pagin-table'
import Options from './options'


const components = [
  Table,
  PaginData,
  PaginTable,
  VTabs,
  Options
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
  PaginData,
  PaginTable,
  VTabs,
  Options
}