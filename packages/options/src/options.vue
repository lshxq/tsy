<template lang="pug">
  .tsy-options-main(v-loading='loading')
    template
      .block-options
        .label {{labelComp}}：
        .options
          .option(
            :class='blockOptionsOptionClass(opt)' 
            v-for='(opt, idx) of options'
            :key='idx'
            @click='value = opt.value') {{opt.label}} 1

    template
      el-select(v-model='value')
        el-option(v-for='(opt, idx) of options' :value='opt.value' :label='opt.label')
</template>

<script>
const cachedRequest = {}

export default {
  name: 'SyOptions',
  props: {
    label: String,
    url: String,
    respDataMapper: Function,
    mock: null,
    cachable: {
      type: Boolean,
      default() {
        return true
      }
    },
    type: {
      type: null,
      default() {
        return 1
      }
    }
  },
  created() {

  },
  data() {
    return {
      loading: false,
      options: [],
      value: '',
    }
  },
  computed: {
    
    labelComp() {
      const {
        label = '选项集合'
      } = this
      return label
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    blockOptionsOptionClass(opt) {
      const {
        value
      } = this
      return {
        selected: value === opt.value
      }
    },
    loadData() {
      const that = this
      const {
        url,
        respDataMapper,
        mock,
        cachable
      } = that
      if (url) {
        let prom = cachedRequest[url]
        if (!prom || !cachable) {
          that.loading = true
          prom = that.$axios({
            url,
            mock
          })
          cachedRequest[url] = prom
        } 
        prom.then(resp => {
          let respData = resp.data
          if (respDataMapper) {
            respData = respDataMapper(respData)
          }
          this.options = respData
        }).catch(ex => {
          console.log(`加载Options失败 ${url}`, ex)
        }).finally(() => {
          that.loading = false
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.block-options
  display: flex
  align-items: center
  user-select: none
  .label
    min-width: 100px
    margin-bottom: 10px
  .options
    display: flex
    flex-flow: row wrap
    align-items: center
    .option
      padding: 5px 10px
      cursor: pointer
      margin-right: 10px
      margin-bottom: 10px
    .option:hover, .option.selected
      background-color: #D9B300
      color: white	
</style>