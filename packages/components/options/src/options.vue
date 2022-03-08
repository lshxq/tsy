<template lang="pug">
  .tsy-options-main(v-loading='loading')
    .tsy-options-type-1(v-if='type == 1')
      el-select(:value='reasonableValue'  :placeholder='placeholderComp' @input='valueChanged' :multiple='multiple')
        el-option(v-for='(opt, idx) of optionsComputed' :value='opt.value' :label='opt.label')

    .tsy-options-type-2(v-if='type == 2')
      template(v-if='multiple')
        sy-checkbox-group(
          :options='optionsComputed'
          :value='reasonableValue'
          @input='valueChanged')

      sy-radio-group(v-else :options='optionsComputed' :value='reasonableValue' @input='optionClicked')
    
    .tsy-options-type-3(v-if='type == 3')
      .block-options
        .label {{labelComp}}：
        .options
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
    options: Array,
  },
  created() {},
  data() {
    return {
      loading: false,
      optionsInner: [],
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
      const {
        firstOption,
        optionsInner,
      } = this
      const arr = []
      if (firstOption) {
        arr.push(firstOption)
      }
      optionsInner.map(opt => arr.push(opt))
      return arr;
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
    const {
      options
    } = this
    if (options) {
      this.optionsInner = options
    } else {
      this.loadData();
    }
    
  },
  methods: {
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
            this.optionsInner = respData;
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
