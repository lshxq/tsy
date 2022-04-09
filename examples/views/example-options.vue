<template>
<div class="tsy-options-example-main">
  <div class="h1">备选项 sy-options</div>
  <axios-required></axios-required>
  <div>项目中很多备选项，是以数据字典的形式，配置在后端数据库中的，需要前端通过 ajax调用接口 拉回来数据集合，并展示，如果每个人单独开发，开发成本高，维护成本也高。</div>
  <div>组件定义了多种常用的外观，可以通过传入type:Number 来指定外观</div>
  <div class="section mt100"><b>单选模式  multiple=false</b>
    <div class="mt30"> 
      <div class="highlight">Type 1</div>
      <div class="mb10">下拉列表</div>
      <sy-options label="颜色" v-model="valueRadio" :first-option="{label: &quot;All&quot;, value: &quot;&quot;}" url="/example/options" :mock="mockData"></sy-options>
    </div>
    <div class="mt30"> 
      <div class="highlight">Type 2</div>
      <div class="mb10">单选按钮Radio </div>
      <sy-options label="颜色" v-model="valueRadio" url="/example/options" :mock="mockData" type="2"></sy-options>
    </div>
    <div class="mt30"> 
      <div class="highlight">Type 3</div>
      <div class="mb10">通常 card 类型的 检索条件 会 使用这这种 选择 器， 购物网站</div>
      <sy-options :first-option="{label: &quot;全部&quot;, value: &quot;&quot;}" label="颜色" v-model="valueRadio" url="/example/options" :mock="mockData" type="3"></sy-options>
    </div>
    <div>当前值： {{valueRadio}}</div>
  </div>
  <div class="section mt100"> <b>多选模式  multiple=true</b>
    <div class="mt30"> 
      <div class="highlight">Type 1</div>
      <div class="mb10">下拉列表</div>
      <sy-options label="颜色" v-model="valueCheckbox" :first-option="{label: &quot;All&quot;, value: &quot;&quot;}" url="/example/options" :mock="mockData" multiple="multiple"></sy-options>
    </div>
    <div class="mt30"> 
      <div class="highlight">Type 2</div>
      <div class="mb10">复选按钮 Checkbox</div>
      <sy-options label="颜色" v-model="valueCheckbox" url="/example/options" :mock="mockData" type="2" multiple="multiple"></sy-options>
    </div>
    <div class="mt30"> 
      <div class="highlight">Type 3</div>
      <div class="mb10">通常 card 类型的 检索结果 会 使用这这种 选择 器， 购物网站</div>
      <sy-options label="颜色" v-model="valueCheckbox" url="/example/options" :mock="mockData" type="3" multiple="multiple"></sy-options>
    </div>
    <div>当前值： {{valueCheckbox}}</div>
  </div>
  <div class="section">
    <div>通过options初始化的备选项，不拉数据</div>
    <sy-options label="颜色" v-model="value3" :options="mockData" type="3"></sy-options>
  </div>
  <div>通过URL初始化备选项
    <div class="code-block">
      <div class="intend">sy-options(
        <div class="intend"> label='颜色'</div>
        <div class="intend"> v-model='value'</div>
        <div class="intend"> url='/example/options'</div>
        <div class="intend"> type='3'</div>
        <div class="intend"> multiple</div>
      </div>
      <div class="intend">)</div>
    </div>
  </div>
  <div class="mt10">通过options初始化备选项，不会发起数据拉取请求
    <div class="code-block">
      <div class="intend">// 模板部分</div>
      <div class="intend">sy-options(
        <div class="intend"> label='颜色'</div>
        <div class="intend"> v-model='value'</div>
        <div class="intend"> options='opts'</div>
      </div>
      <div class="intend">)</div>
      <div class="intend mt30">// vue实例上绑定的备选项</div>
      <div class="intend">this.opts = [{
        <div class="intend">label: "备选项1",</div>
        <div class="intend">value: "1",</div>
      </div>
      <div class="intend">}, {
        <div class="intend">label: "2222",</div>
        <div class="intend">value: "B",</div>
      </div>
      <div class="intend">},{
        <div class="intend">label: "CCCC",</div>
        <div class="intend">value: "C",</div>
      </div>
      <div class="intend">}];</div>
    </div>
  </div>
  <div>sy-options集成了数拉取的动作，使用该组件，仅需要提供数据源的url地址即可。</div>
  <div class="mt100">
    <div class="h2">Props</div>
    <sy-table :columns="propTableColumns" :data="propTableData"> 
      <template v-slot:comment="scope">
        <template v-if="scope.row.comment">{{scope.row.comment}}</template>
        <template v-else>
          <template v-if="scope.row.name==&quot;first-option&quot;">
            <div>第一个备选项往往不是配置在数据字典的，比如 全部。传入Option对象</div>
            <option-defined></option-defined>
          </template>
          <template v-if="scope.row.name == &quot;url&quot;"> 
            <div>拉取数据字典的url地址，服务器应该返回Option对象的数组</div>
            <div class="code-block">
              <div class="intend">[
                <div class="intend">{
                  <div class="intend">label: String, // 显示的值</div>
                  <div class="intend">value: String, // 提交的值</div>
                </div>
                <div class="intend">},</div>
                <div class="intend">...</div>
              </div>
              <div class="intend">]</div>
            </div>
          </template>
        </template>
      </template>
    </sy-table>
  </div>
</div>
</template>

<script>
import axiosRequired from "./components/axios-required.vue";
import commentMixin from "../mixins/comment-mixins.js";
import optionDefined from './components/option-object-desc.vue'

export default {
  components: {
    axiosRequired,
    optionDefined
  },
  mixins: [commentMixin],
  data() {
    return {
      valueRadio: "",
      valueCheckbox: [],
      value3: ''
    };
  },
  created() {
    this.mockData = [
      {
        label: "备选项1",
        value: "1",
      },
      {
        label: "2222",
        value: "B",
      },
      {
        label: "CCCC",
        value: "C",
      },
    ];
    this.propTableData = [
      {
        name: "label",
        type: "String",
        comment: "标签内容",
      },
      {
        name: "v-model",
        comment: "绑定的值",
      },
      {
        name: "url",
        type: "String",
      },
      {
        name: "options",
        type: "Array<Option>",
        comment:
          "如果是前端定义的备选项数据，不需要ajax拉取，可以直接传入 options 代替url 地址。options的结构和接口返回的数据一致",
      },
      {
        name: 'first-option',
        type: 'Option',
      },
      {
        name: "resp-data-mapper",
        type: "Function",
        comment:
          "如果接口返回的数据不是 Array<Option> 的形式，可以利用这个钩子函数进行转换，参数是原始应答数据，返回结果是处理后的数据。",
      },
      {
        name: "cachable",
        type: "Boolean(true)",
        comment:
          "因为数据字典极少发生变化，意味着相同的url每次返回的应答应该是一样的，因此组件会对相同的url默认做缓存，在刷新页面之前不会尝试从新拉取数据。",
      },
      {
        name: 'multiple',
        type: "Boolean(false)",
        comment: '是否支持多选，默认是单选模式'
      },
      {
        name: 'type',
        type: 'Number(1)',
        comment: '默认值1. 三种表现形式， 分别是1，下拉列表；2，单选复选按钮；3，以标签形式平铺展开备选项'
      }
    ];
  },
};
</script>
