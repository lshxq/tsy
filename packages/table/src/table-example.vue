<template lang="pug">
  .tsy-table-example-main
    sy-table(:columns='tableColumn' :data='tableData' @sort='sorterChanged')
      template(v-slot:third='scope') {{scope.row.third}}
</template>

<script>
import Utils from '../../utils'

export default {
  name: 'SyTableExample',
  created() {
  },
  computed: {
    tableData() {
      return [{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      },{
        first: Utils.randomStr(),
        second: Utils.randomStr(),
        third: Utils.randomStr()
      }]
    },
    tableColumn() {
      return [
        {
          label: '第一列',
          prop: 'first',
          sorter: 'diyilie',
          width: 220
        },
        {
          label: '第2列',
          getContent(data) {
            return data.row.second
          },
          width: '20%',
          sorter: 'dierlie'
        },
        {
          label: '第三列',
          slot: 'third'
        }
      ]
    }
  }
}
</script>