import PaginTable from './src/pagin-table.vue'

PaginTable.install = function(Vue) {
  Vue.component(PaginTable.name, PaginTable)
}

export default PaginTable