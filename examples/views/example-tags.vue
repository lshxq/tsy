<template lang="pug">
.tsy-tags-example
    .h1 标签 sy-tags

    sy-tags(:items='tags'  @delete='tagDeleted')
    sy-tags.mt30(:items='tags' removable @delete='tagDeleted')

    .mt100
      p 虽然element中也有实现tags，但是他还是需要自己迭代，使用比较麻烦，这里提供了一个更好用的实现，能满足绝大部分场景
      p 组件接受items是个数组，数组元素可以是简单的字符串，或者是个tag对象
      .code-block
        .intend {
          .intend text: String  // tag展示内容
          .intend type: String, // success, info, warning, danger
          .intend removable: Boolean // false, 是否可以被移除
        .intend }
    .mt100
      p pug 模板
      .code-block 
        .intend sy-tags(:items='tags' @delete='tagDeleted')
      p vue中绑定的items
      .code-block
        .intend tihs.tags = [
          .intend 'default',
          .intend {text: 'success', type: 'success'}, // 指定了type
          .intend {text: 'info', type: 'info'},
          .intend {text: 'warning', type: 'warning'},
          .intend {text: 'danger', type: 'danger', removable: true}, // 标记了removable，可以单独自定谁可以删除
        .intend ]
      p vue中的点击事件处理
      .code-block
        .intend tagDeleted(tag, idx) { // tag就是数组中的item， idx是数组的下标
          .intend console.log(tag, idx)
        .intend }
</template>

<script>
const tt = (tag, idx) => {
  if (typeof tag === 'object') {
    return `${tag.text} ${idx}`
  }
  return `${tag} ${idx}`
}
export default {
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