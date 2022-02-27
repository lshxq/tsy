<template lang="pug">
  .tsy-options-main(v-loading='loading')
    .tsy-options-type-1(v-if='type == 1')
      el-select(:value='value'  :placeholder='placeholderComp' @input='valueChanged' :multiple='multiple')
        el-option(v-if='firstOption' :value='firstOption.value' :label='firstOption.label')
        el-option(v-for='(opt, idx) of optionsComputed' :value='opt.value' :label='opt.label')

    .tsy-options-type-2(v-if='type == 2')
      template(v-if='multiple')
        el-checkbox-group(:value='value' @input='valueChanged')
          el-checkbox(
            :key='idx' v-for='(opt, idx) of optionsComputed' 
            :label='opt.label'
            :value='opt.value')

      el-radio-group(v-else :value='value' @input='valueChanged')
        el-radio(v-if='firstOption' :label='firstOption.value') {{firstOption.label}}
        el-radio(:key='idx' v-for='(opt, idx) of optionsComputed' :label='opt.value') {{opt.label}}
    
    .tsy-options-type-3(v-if='type == 3')
      .block-options
        .label {{labelComp}}：
        .options
          .option(:class='blockOptionsOptionClass(firstOption)'  v-if='firstOption' @click='valueChanged(firstOption.value)') {{firstOption.label}}
          .option(
            :class='blockOptionsOptionClass(opt)' 
            v-for='(opt, idx) of optionsComputed'
            :key='idx'
            @click='valueChanged(opt.value)') {{opt.label}}
</template>

<script>
const cachedRequest = {};

export default {
  name: "SyOptions",
  props: {
    label: String,
    value: null,
    multiple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    url: String,
    respDataMapper: Function,
    mock: null,
    cachable: {
      type: Boolean,
      default() {
        return true;
      },
    },
    type: {
      type: null,
      default() {
        return 1;
      },
    },
    firstOption: Object,
  },
  created() {},
  data() {
    return {
      loading: false,
      options: [],
    };
  },
  computed: {
    optionsComputed() {
      return this.options;
    },
    placeholderComp() {
      const { label } = this;
      if (label) {
        return `请选择${label}`;
      }
      return "";
    },
    labelComp() {
      const { label = "选项集合" } = this;
      return label;
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    checkboxClicked(value) {
      console.log(value);
    },
    valueChanged(value) {
      this.$emit("input", value);
    },
    blockOptionsOptionClass(opt) {
      const { value } = this;
      return {
        selected: value === opt.value,
      };
    },
    loadData() {
      const that = this;
      const { url, respDataMapper, mock, cachable } = that;
      if (url) {
        let prom = cachedRequest[url];
        if (!prom || !cachable) {
          that.loading = true;
          prom = that.$axios({
            url,
            mock,
          });
          cachedRequest[url] = prom;
        }
        prom
          .then((resp) => {
            let respData = resp.data;
            if (respDataMapper) {
              respData = respDataMapper(respData);
            }
            this.options = respData;
          })
          .catch((ex) => {
            console.log(`加载Options失败 ${url}`, ex);
          })
          .finally(() => {
            that.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.block-options
  display: flex
  align-items: center
  user-select: none
  .label
    min-width: 80px
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

.tsy-options-type-1
  display: flex
  align-items: center
  .label
    margin-right: 10px
    min-width: 120px
</style>
