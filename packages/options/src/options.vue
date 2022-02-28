<template lang="pug">
  .tsy-options-main(v-loading='loading')
    .tsy-options-type-1(v-if='type == 1')
      el-select(:value='value'  :placeholder='placeholderComp' @input='valueChanged' :multiple='multiple')
        el-option(v-if='firstOption' :value='firstOption.value' :label='firstOption.label')
        el-option(v-for='(opt, idx) of optionsComputed' :value='opt.value' :label='opt.label')

    .tsy-options-type-2(v-if='type == 2')
      template(v-if='multiple')
        sy-checkbox(
          :key='idx' v-for='(opt, idx) of optionsComputed' 
          :label='opt.value'
          :checked='checkboxState(opt)'
          @click='checkboxClicked(opt)') {{opt.label}}

      el-radio-group(v-else :value='value' @input='valueChanged')
        el-radio(v-if='firstOption' :label='firstOption.value') {{firstOption.label}}
        el-radio(:key='idx' v-for='(opt, idx) of optionsComputed' :label='opt.label' :value='opt.value')
    
    .tsy-options-type-3(v-if='type == 3')
      .block-options
        .label {{labelComp}}：
        .options
          .option(
            :class='blockOptionsOptionClass(firstOption)'  
            v-if='firstOption' 
            @click='optionClicked(firstOption.value)') {{firstOption.label}}
          .option(
            :class='blockOptionsOptionClass(opt)' 
            v-for='(opt, idx) of optionsComputed'
            :key='idx'
            @click='optionClicked(opt.value)') {{opt.label}}
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
    reasonableValue() {
      const {
        value,
        multiple
      } = this
      if (multiple) {
        if (value instanceof Array) {
          return value
        } else {
          if (value !== undefined) {
            return [value]
          } else {
            return []
          }
        }
      }
      return value
    },
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
    checkboxState(opt) {
      const {
        value
      } = this
      if (value instanceof Array) {
        const idx = value.findIndex(ele => ele === opt.value)
        return idx >= 0
      } else {
        return opt.value === value
      }
    },
    checkboxClicked(opt) {
      const {
        reasonableValue
      } = this
      const idx = reasonableValue.findIndex(ele => ele === opt.value)
      if (idx >= 0) { // 需要移除
        reasonableValue.splice(idx, 1)
      } else { // 需要添加
        reasonableValue.push(opt.value)
      }
      this.$emit('input', reasonableValue)
    },
    valueChanged(value) {
      this.$emit("input", value);
    },
    blockOptionsOptionClass(opt) {
      const { reasonableValue,multiple } = this;
      let selected = false
      if (multiple) {
        const found = reasonableValue.find((str) => {
          return str === opt.value
        })
        selected = found !== undefined
      } else {
        selected = reasonableValue === opt.value
      }
      return {
        selected,
      };
    },
    optionClicked(val) {
      const {
        multiple,
        reasonableValue
      } = this
      if (multiple) {
        const idx = reasonableValue.findIndex(ele => ele === val)
        if (idx >= 0) { // 需要移除
          reasonableValue.splice(idx, 1)
        } else { // 需要添加
          reasonableValue.push(val)
        }
        this.$emit('input', reasonableValue)
      } else {
        this.$emit('input', val)
      }
      
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
