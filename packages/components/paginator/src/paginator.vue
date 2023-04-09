<template>
  <div class="tsy-paginator-main">
    <template v-for="(layoutType, idx) of layoutComputed">
      <div class="pagin-item" v-if="layoutType === 'total' && total >= 0" :key="idx">
        共{{total}}条
      </div>
      <div class="pagin-item bolder pointer" v-if="layoutType === 'prev'" :key="idx" @click="$event => {pagin({pageNo: curr - 1})}">
        &lt;
      </div>
      <div class="pagin-item bolder pointer" v-if="layoutType === 'next'" :key="idx" @click="$event => {pagin({pageNo: curr + 1})}">
        &gt;
      </div>
      <div class="pagin-item" v-if="layoutType === 'sizes'" :key="idx">
        页面大小
        <sy-select :options="pageSizesComputed" v-model="activePageSize" class="page-sizes-select"/>
      </div>
      <div class="pagin-item pager-block" v-if="layoutType === 'pager'" :key="idx">
        <template v-for="(pager, idx) of pagerComputed">
          <div class="pager label" v-if="pager.label && pager.label.length > 0" :key="`${idx}-${pager.label}`">{{pager.label}}</div>
          <div v-else :class="pagerClass(pager)"  :key="`${idx}=${pager.pageNo}` " @click="pagin(pager)">{{pager.pageNo}}</div>
        </template>
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
  watch: {
    activePageSize(vNew, vOld) {
      if (vNew != vOld) {
        this.$emit('pagin', {pageNo: 1, pageSize: vNew})
      }
    }
  },
  computed: {
    pageCountComputed() {
      const {
        total,
        activePageSize
      } = this;
      return Math.ceil(total / activePageSize)
    },
    pagerComputed() {
      const arr = [];
      const {
        curr,
        pageCountComputed
      } = this;


      /*
      * 处理左面的补齐
      */
      let buqil = 5;
      if (curr > buqil + 1) {
        buqil--;
        arr.push({
          pageNo: 1
        })
        arr.push({
          label: '...'
        })
      }
      for (let idx=curr, cnt=0; idx>1&&cnt<buqil; cnt++,idx--) {
        if(curr > buqil) {
          arr.push({
            pageNo: curr - buqil + cnt
          })
        } else {
          arr.push({
            pageNo: cnt + 1
          })
        }
      }


      arr.push({ // 当前页
        pageNo: curr
      })
      

      /*
      * 处理右面的补齐
      */
      let buqir = 5;
      let lastPageNeeded = false;
      if(pageCountComputed > buqir + curr) {
        buqir--;
        lastPageNeeded = true;
      }
      for (let idx=curr + 1, cnt=0; idx<=pageCountComputed && cnt < buqir; idx++, cnt++) {
        arr.push({
          pageNo: idx
        })
      }
      if (lastPageNeeded) {
        arr.push({
          label: '...'
        });
        arr.push({
          pageNo: pageCountComputed
        })
      }


      return arr;
    },
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

      return ll.split(',').map(layoutStr => {
        return layoutStr.trim();
      });
    }
  },
  methods: {
    pagerClass(pager) {
      const {
        curr
      } = this;
      return {
        pager: true,
        current: curr === pager.pageNo
      }
    },
    pagin(pager) {
      const {
        activePageSize,
        curr
      } = this;
      if (pager.pageNo != curr) {
        this.$emit("pagin", {
          pageNo: pager.pageNo,
          pageSize: activePageSize
        })
      }
      
    }
  }
}
</script>


<style scoped>
.pager.label {
  cursor: default;
}
.pager.current {
  color: orange;
  cursor: default;
}
.pager {
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bolder;
}
.pager-block {
  display: flex;
  flex-flow: row nowrap;
}
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