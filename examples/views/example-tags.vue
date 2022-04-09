<template>
<div class="tsy-tags-example">
  <div class="h1">标签 sy-tags</div>
  <sy-tags :items="tags" @delete="tagDeleted"></sy-tags>
  <sy-tags class="mt30" :items="tags" removable="removable" @delete="tagDeleted"></sy-tags>
  <div class="mt100">
    <p>虽然element中也有实现tags，但是他还是需要自己迭代，使用比较麻烦，这里提供了一个更好用的实现，能满足绝大部分场景</p>
    <p>组件接受items是个数组，数组元素可以是简单的字符串，或者是个tag对象</p>
    <div class="code-block">
      <div class="intend">{
        <div class="intend">text: String  // tag展示内容</div>
        <div class="intend">type: String, // success, info, warning, danger</div>
        <div class="intend">removable: Boolean // false, 是否可以被移除</div>
      </div>
      <div class="intend">}</div>
    </div>
  </div>
  <div class="mt100">
    <p>pug 模板</p>
    <div class="code-block"> 
      <div class="intend">sy-tags(:items='tags' @delete='tagDeleted')</div>
    </div>
    <p>vue中绑定的items</p>
    <div class="code-block">
      <div class="intend">tihs.tags = [
        <div class="intend">'default',</div>
        <div class="intend">{text: 'success', type: 'success'}, // 指定了type</div>
        <div class="intend">{text: 'info', type: 'info'},</div>
        <div class="intend">{text: 'warning', type: 'warning'},</div>
        <div class="intend">{text: 'danger', type: 'danger', removable: true}, // 标记了removable，可以单独自定谁可以删除</div>
      </div>
      <div class="intend">]</div>
    </div>
    <p>vue中的点击事件处理</p>
    <div class="code-block">
      <div class="intend">tagDeleted(tag, idx) { // tag就是数组中的item， idx是数组的下标
        <div class="intend">console.log(tag, idx)</div>
      </div>
      <div class="intend">}</div>
    </div>
  </div>
  <div class="mt100">
    <div class="h2">Props</div>
    <sy-table :columns="propTableColumns" :data="propTableData">
      <template v-slot:comment="scope">{{scope.row.comment}}</template>
    </sy-table>
  </div>
  <div class="mt100">
    <div class="h2">Events</div>
    <sy-table :columns="eventTableColumns" :data="eventTableData">
      <template v-slot:comment="scope">{{scope.row.comment}}   </template>
    </sy-table>
  </div>
</div> 
</template>

<script>
const tt = (tag, idx) => {
  if (typeof tag === 'object') {
    return `${tag.text} ${idx}`
  }
  return `${tag} ${idx}`
}
import commentMixin from '../mixins/comment-mixins'

export default {
  mixins: [commentMixin],
  created() {
    this.propTableData = [{
      name: 'items',
      type: 'Array[tag]',
      comment: 'tag对象数组'
    }, {
      name: 'removable',
      type: "Boolean(false)",
      comment: '是否显示删除按钮，默认是显示，除了这个全局配置，也可以在tag对象中单独指定'
    }]
    this.eventTableData = [{
      name: 'delete',
      comment: '删除tag事件，两个参数分别是 tag数组中的tag对象，和在数组中的位置'
    }]
  },
  data() {
    return {
      tags: [
        'default',
        {
          text: 'success',
          type: 'success'
        },
        {
          text: 'info',
          type: 'info'
        },
        {
          text: 'warning',
          type: 'warning'
        },
        {
          text: 'danger',
          type: 'danger',
          removable: true
        }
      ]
    }
  },
  methods: {
    tagClicked(tag, idx) {
      alert(`tag点击 ${tt(tag, idx)}`)
    },
    tagDeleted(tag, idx) {
      alert(`tag删除 ${tt(tag, idx)}`)
    }
  }
}
</script>