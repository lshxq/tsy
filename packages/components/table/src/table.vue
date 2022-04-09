<template>
<div class="tsy-table-main">
  <template v-if="columnsComp.length &gt; 0">
    <table class="tsy-table" width="100%" border="0" cellpadding="0" cellspacing="0" :class="tableClassComp">
      <thead>
        <tr class="tsy-table-row">
          <th class="tsy-table-th-cell" v-if="showIndex" width="50"> 
            <div class="tsy-table-cell tsy-table-head-cell">序号</div>
          </th>
          <th class="tsy-table-th-cell" :key="idx" v-for="(col, idx) of columnsComp" :style="cellStyle(col)">
            <div class="tsy-table-cell tsy-table-head-cell">{{col.label}}
              <sorter v-if="col.sorter" :sorter-id="col.sorter" :order="sorterOrder(col.sorter)" @click="sorterClicked"></sorter>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="dataComp.length &gt; 0">
          <tr class="tsy-table-row" :key="rowIdx" v-for="(row, rowIdx) of dataComp">
            <td class="tsy-table-td-cell" v-if="showIndex">
              <div class="tsy-table-cell tsy-table-body-cell"> 
                <div class="tsy-table-cell-inner">{{indexBase + rowIdx}}</div>
              </div>
            </td>
            <td class="tsy-table-td-cell" :key="colIdx" v-for="(col, colIdx) of columnsComp" :style="cellStyle(col)">
              <div class="tsy-table-cell tsy-table-body-cell">
                <div class="tsy-table-cell-inner"> 
                  <template v-if="col.prop">{{row[col.prop]}}</template>
                  <template v-if="col.getContent">{{col.getContent({row, col, rowIdx, colIdx})}}</template>
                  <template v-if="col.slot">
                    <slot :name="col.slot" :row="row" :col="{...col, index: colIdx}" :index="rowIdx"></slot>
                  </template>
                </div>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="9999"> 
              <div class="no-data-info">无数据</div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </template>
  <template v-else>没有指定columns参数，无法展示table  </template>
</div>
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

<style lang='css' scoped>
.tsy-table-main {
  width: 100%;
  background-color: #fefefe;
}

.tsy-table-main .tsy-table-stripe tr:nth-child(even) {
  background: #fafafa;
}

.tsy-table-main .tsy-table .tsy-table-row {
  transition: all .7s;
}

.tsy-table-main .tsy-table .tsy-table-row:hover {
  background-color: #f5f7fa;
}

.tsy-table-main .tsy-table .tsy-table-th-cell {
  text-align: left;
  height: 50px;
  color: #909399;
  padding: 5px;
  border-bottom: 1px solid lightgray;
}

.tsy-table-main .tsy-table .tsy-table-td-cell {
  border-bottom: 1px solid lightgray;
  padding: 5px;
  color: #606266;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}

.tsy-table-main .tsy-table .tsy-table-cell {
  min-height: 45px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
}

.no-data-info {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  height: 50px;
  color: gray;
}

</style>