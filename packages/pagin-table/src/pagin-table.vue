<template lang="pug">
  .tsy-pagin-table-main
    sy-pagin-data(
      :url='url',
      :query='queryComp'
      :mock='mock'
      :request-method='requestMethod'
      :resp-data-mapper='respDataMapper'
      :pagin-data-mapper='paginDataMapper'
      @data-loaded='dataLoaded'
    )
      template(slot-scope='scope') 
        sy-table(:data='scope.data' :columns='columns')
          template(:slot='slotName'  v-for='slotName of slotNameArray' slot-scope='scope')
            slot(:name='slotName' :data='scope')
            
</template>

<script>
export default {
  name: 'SyPaginTable',
  props: {
    url: String,
    query: Object,
    columns: { // 列定义
      type: Array
    },
    requestMethod: {
      type: String,
      default() {
        return 'get'
      }
    },
    respDataMapper: Function,
    paginDataMapper: Function,
    mock: null
  },
  computed: {
    queryComp() {
      return {
        ...this.query,
      }
    },
    slotNameArray() {
      const slots = []
      const {
        columns
      } = this
      for (const col of columns) {
        if (col.slot) {
          slots.push(col.slot)
        }
      }
      return slots
    }
  },
  methods: {
    dataLoaded(respData) {
      this.$emit('data-loaded', respData)
    }
  }
}
</script>