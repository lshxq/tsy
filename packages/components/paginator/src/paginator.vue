<template>
  <div class="tsy-paginator-main">
    <template v-for="(layoutType, idx) of layoutComputed">
      <div class="pagin-item" v-if="layoutType === 'total' && total >= 0" :key="idx">
        共{{total}}条
      </div>
      <div class="pagin-item bolder pointer" v-if="layoutType === 'prev'" :key="idx" @click="$event => {pagin(curr - 1)}">
        &lt;
      </div>
      <div class="pagin-item bolder pointer" v-if="layoutType === 'next'" :key="idx" @click="$event => {pagin(curr + 1)}">
        &gt;
      </div>
      <div class="pagin-item" v-if="layoutType === 'sizes'" :key="idx">
        <sy-options label="页面大小" :options="pageSizesComputed" v-model="activePageSize" class="page-sizes-select"/>
      </div>
    </template>
  </div>
</template>

<script>

const defaultLayout = "sizes,prev,pager,next,total";
const defaultPaginSizes = [10, 20, 50, 100];

export default {
  name: 'SyPaginator',
  props: {
    curr: {
      type: Number,
      default() {
        return 1;
      }
    },
    layout: {
      type: String,
      default() {
        return defaultLayout;
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 10;
      }
    },
    total: {
      type: Number,
      default() { // 默认不显示total信息
        return -1;
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return defaultPaginSizes
      }
    }
  },
  data() {
    const {
      pageSize
    } = this;
    return {
      activePageSize: pageSize,    // 真正发挥作用的页面大小
    }
  },
  computed: {
    pageSizesComputed() {
      const {
        pageSizes
      } = this;
      let ps = defaultPaginSizes;
      if (pageSizes && pageSizes.length > 0) {
        ps = pageSizes
      }
      return ps.map(item => {return {
        label: item,
        value: item
      }})
    },
    layoutComputed() {
      const {
        layout
      } = this
      let ll = defaultLayout
      if (layout && layout.length > 0) {
        ll = layout
      }

      return ll.split(',');
    }
  },
  methods: {
    pagin(target) {
      console.log(target)
    }
  }
}
</script>


<style scoped>
.tsy-paginator-main {
  display: flex;
  user-select: none;
  align-items: center;
  color: gray;
}
.pagin-item {
  padding: 5px 10px;
}
.bolder {
  font-weight: bolder;
}
.pointer {
  cursor: pointer;
}
.page-sizes-select {
  width: 80px;
}
</style>