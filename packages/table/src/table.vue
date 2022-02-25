<template lang="pug">
  .tsy-table-main
    template(v-if='columnsComp.length > 0')
      table.tsy-table(width='100%' border='0' cellpadding='0' cellspacing='0' :class='tableClassComp')
        thead
          tr.tsy-table-row
            th.tsy-table-th-cell(v-if='showIndex' width='50') 
              .tsy-table-cell.tsy-table-head-cell 序号
            th.tsy-table-th-cell(:key='idx' v-for='(col, idx) of columnsComp' :style='cellStyle(col)')
              .tsy-table-cell.tsy-table-head-cell {{col.label}}
                sorter(v-if='col.sorter' :sorter-id='col.sorter' :order='sorterOrder(col.sorter)' @click='sorterClicked')
        tbody
          template(v-if='dataComp.length > 0')
            tr.tsy-table-row(:key='rowIdx' v-for='(row, rowIdx) of dataComp')
              td.tsy-table-td-cell(v-if='showIndex')
                .tsy-table-cell.tsy-table-body-cell 
                  .tsy-table-cell-inner {{indexBase + rowIdx}}
              td.tsy-table-td-cell(:key='colIdx' v-for='(col, colIdx) of columnsComp' :style='cellStyle(col)')
                .tsy-table-cell.tsy-table-body-cell
                  .tsy-table-cell-inner 
                    template(v-if='col.prop') {{row[col.prop]}}
                    template(v-if='col.getContent') {{col.getContent({row, col, rowIdx, colIdx})}}
                    template(v-if='col.slot')
                      slot(:name='col.slot' :row='row' :col='{...col, index: colIdx}' :index='rowIdx')
          template(v-else)
            tr
              td(colspan='9999') 无数据
    template(v-else) 没有指定columns参数，无法展示table  
</template>

<script>
import Sorter from './components/table-sorter'

export default {
  name: 'SyTable',
  props: {
    stripe: { // 隔行变色
      type: Boolean,
      default() {
        return true
      }
    },
    showIndex: { // 显示序号
      type: Boolean,
      default() {
        return true
      }
    },
    indexBase: { // 序号起始值
      type: Number,
      default() {
        return 1
      }
    },
    columns: { // 列定义
      type: Array
    },
    data: { // 表格数据
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Sorter,
  },
  data() {
    return {
      sorter: false
    }
  },
  computed: {
    tableClassComp() {
      const {
        stripe
      } = this
      return {
        'tsy-table-stripe': stripe
      }
    },
    columnsComp() {
      const {
        columns
      } = this
      if (columns && columns instanceof Array) {
        return columns
      }
      return []
    },
    dataComp() {
      const {
        data
      } = this
      if (data && data instanceof Array) {
        return data
      }
      return []
    }
  },
  methods: {
    cellStyle(col) {
      const style = {}
      if (col.width) {
        if(isNaN(col.width)) {
          style.width = col.width
        } else {
          style.width = `${col.width}px`
        }
      }
      return style
    },
    sorterOrder(key) {
      const {
        sorter
      } = this
      if (sorter) {
        if (sorter.key === key) {
          return sorter.order
        }
      }

      return ''
    },
    sorterClicked(key, order) {
      const sorter =  {
        key,
        order
      }
      this.$emit('sort', sorter)
      this.sorter = sorter
    }
  }
}
</script>

<style lang='sass' scoped>
  .tsy-table-main 
    width: 100%
    .tsy-table-stripe
      tr:nth-child(even)
        background: #fafafa

    .tsy-table
      .tsy-table-row
        transition: all .7s
        
      .tsy-table-row:hover
        background-color: #f5f7fa
      .tsy-table-th-cell
        text-align: left
        height: 50px
        color: rgb(144, 147, 153)
        padding: 5px 
        border-bottom: 1px solid lightgray
      .tsy-table-td-cell
        border-bottom: 1px solid lightgray
        padding: 5px 
        color: #606266
        min-width: 0;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        text-align: left;

      .tsy-table-cell
        min-height: 45px
        display: flex
        align-items: center
        padding-left: 5px;
        width: 100%
        overflow: hidden
        text-overflow: ellipsis
        white-space: normal
        word-break: break-all
    
</style>