import Table from './src/table.vue'
import TableExample from './src/table-example.vue'

Table.install = function(Vue) {
  Vue.component(Table.name, Table)
  Vue.component(TableExample.name, TableExample)
}

export default Table