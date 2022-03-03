<template lang="pug">
  .tsy-options-example-main
    .h1 备选项 sy-options

    axios-required

    p 组件定义了多种常用的外观，可以通过传入type:Number 来指定外观

    p.mt100
      b 单选模式  multiple=false
      p.mt30 type 1, 一般表单样式
        sy-options(
          label='颜色'
          v-model='value'
          :first-option='{label: "All", value: ""}'
          url='/example/options'
          :mock='mockData'
        )

      p.mt30 type 2， radio 
        sy-options(
          label='颜色'
          v-model='value'
          url='/example/options'
          :mock='mockData'
          type='2'
        )

      p.mt30 type 3， 通常 card 类型的 检索结果 会 使用这这种 选择 器， 购物网站
        sy-options(
          :first-option='{label: "全部", value: ""}'
          label='颜色'
          v-model='value'
          url='/example/options'
          :mock='mockData'
          type='3'
        )

    p.mt100 
      b 多选模式  multiple=true
      p.mt30 type 1, 一般表单样式
        sy-options(
          label='颜色'
          v-model='value'
          :first-option='{label: "All", value: ""}'
          url='/example/options'
          :mock='mockData'
          multiple
        )

      p.mt30 type 2， checkbox
        sy-options(
          label='颜色'
          v-model='value'
          url='/example/options'
          :mock='mockData'
          type='2'
          multiple
        )

      p.mt30 type 3， 通常 card 类型的 检索结果 会 使用这这种 选择 器， 购物网站
        sy-options(
          label='颜色'
          v-model='value'
          url='/example/options'
          :mock='mockData'
          type='3'
          multiple
        )

    .mt100 项目中很多备选项，是以数据字典的形式，配置在后端数据库中的，需要前端通过 ajax调用接口 拉回来数据集合，并展示，如果每个人单独开发，开发成本高，维护成本也高。
    p sy-options集成了数拉取的动作，使用该组件，仅需要提供数据源的url地址即可。
    .mt100
      .h2 Props
      sy-table(:columns='propTableColumns' :data='propTableData') 
        template(v-slot:comment='scope')
          template(v-if='scope.row.comment') {{scope.row.comment}}
          template(v-else)
            template(v-if='scope.row.name == "url"') 
              p 拉取数据字典的url地址，服务器应该返回如下格式的应该
              .code-block
                .intend [
                  .intend {
                    .intend label: String, // 显示的值
                    .intend value: String, // 提交的值
                  .intend },
                  .intend ...
                .intend ]

</template>

<script>
import axiosRequired from "./axios-required.vue";
import commentMixin from "../mixins/comment-mixins.js";

export default {
  components: {
    axiosRequired,
  },
  mixins: [commentMixin],
  data() {
    return {
      value: "",
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
        comnent: "支持绑定值",
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
    ];
  },
};
</script>
