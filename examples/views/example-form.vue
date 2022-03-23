<template lang="pug">
  .examples-sy-form-main
    .h1 数据表单 sy-form
    .mt100 除了form-mixins,我们还可以直接通过纯数据的方式构造表单。
    p form-mixin 需要自己构建layout，这样比较灵活，但是不利于统一的表单样式，而且开发layout也是有成本的。
    p 为了进一步减轻页面的开发成本，我提供了基于数据的sy-form。使用该组件只要通过inputs传入表单内容即可。
      .code-block 
        .intend // 新建场合
        .intend sy-form(:inputs='formInputs' 
          .intend url='/example/form/url'
          .intend @submitted='formSubmitted'
          .intend @canceled='formCanceled')

      .code-block.mt20
        .intend // 编辑场合，传入ID
        .intend sy-form(:inputs='formInputs' 
          .intend id='test'
          .intend url='/example/form/url'
          .intend :data-loaded-handler='dataLoadedHandler'
          .intend :before-post-handler='beforePostHandler'
          .intend @submitted='formSubmitted'
          .intend @canceled='formCanceled')
      
      p formInputs 定义了表单的输入项目
      p
        img(src='../assets/form-inputs.jpg')
      p 目前支持的input如下
      ul 
        li input, 标准el-input的输入框，支持el-input的常用属性透传，如placeholder，maxlength等 
        li options，options具体配置参考 sy-options，主要是能根据url初始化备选项，能指定单选多选多种外观。
        li datepicker， 日期选择器
      
      .mt100
        .h2 Props
        sy-table(:columns='propTableColumns' :data='propTableData')
          template(v-slot:comment='scope') 
            template(v-if='scope.row.comment') {{scope.row.comment}}

            template(v-else-if='scope.row.name == "url"')
              p 后端接口的基础地址, 
              p 新建：最终会以post方式提交到url指定位置
              p 编辑：首先通过get的方式 在url/id的位置拉取待编辑数据。最后会以patch的方式，在url/id的位置提交增量更新数据。

      .mt100
        .h2 Events
        sy-table(:columns='eventTableColumns' :data='eventTableData')

      .mt100 通过下面入口进入表单的用例 
        el-button(@click='goto("sy-form-create")' type='primary') 新建表单
        el-button(@click='goto("sy-form-update")' type='primary') 编辑表单

      .mt100 
        .h2 Inputs定义
        p 通过一个json对象来描述input，
        .code-block
          .intend {
            .intend type: String, // 可选值 input（输入框）, options(备选项),datepicker(日期选择器) 
            .intend name: String, // model中的名字，待编辑字段的名字
            .intend value: String, // 该字段默认值
            .intend label: String, // 该字段在表单中展示的名称
            .intend meta: Object    // 用于配置该输入框的附件信息，每种输入框的附加信息不同。
          .intend }
</template>

<script>
import CommnetMixins from '../mixins/comment-mixins.js'
export default {
  mixins: [CommnetMixins],
  created() {
    this.propTableData = [
      {
        name: 'url',
        type: 'String',
      },
      {
        name: 'inputs',
        type: 'Array[Input]',
        comment: '表单输入项目的定义数组，关于输入项目定义，本文底部的说明'
      },
      {
        name: 'id',
        type: 'String',
        comment: '待编辑数据的ID，如果指定了ID，表单改为编辑模式，默认是新建模式，两个模式的提交方式不一样，新建是以POST方式全量提交，编辑是以Patch方式增量提交。'
      },
      {
        name: 'data-loaded-handler',
        type: 'Function',
        comment: '在编辑模式下，会通过get方式在url/id的位置拉取待编辑数据，但是数可能和表单要求的数据格式不一样，这时候需要做数据变形，通过传入这个函数，可以在数据填充页面之前，进行数据变形，接收接口返回的数据，并返回处理后的数据。'
      },
      {
        name: 'before-post-handler',
        type: 'Function',
        comment: '表单数据提交之前，通过这个函数完成数据变形，以满足接口要求。表单数据的格式可能和接口要求的格式不一致，这时候可以通过这个函数做提交前的数据处理'
      }
    ]
    this.eventTableData = [
      {
        name: 'submitted',
        comment: '当表单完成验证，提交后端后，如果后端返回正常（http 2XX），则触发这个事件，并把后端返回作为参数传过来。开发者可以在这里做页面迁移等动作。'
      },
      {
        name: 'canceled',
        comment: '当用户点击取消按钮时触发这个事件。'
      }
    ]
  },
  methods: {
    
  }
};
</script>
