<template lang="pug">
  .tsy-tags-main
    .tag(v-for='(tag, idx) of items'
         :key='idx'
         :class='getTagClass(tag)') 
      .text {{getTagText(tag)}}
      .delete-btn.el-icon-close(v-if='removable || tag.removable' @click='deleteTag(tag, idx)')
      
</template>

<script>
import utils from '../../../utils.js'
export default {
  name: 'SyTags',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    removable: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    getTagClass(tag) {
      if (typeof tag == 'object') {
        let {
          type,
        } = tag
        if (!utils.strInArray(type, ['success', 'info', 'warning', 'danger'])) {
          type = null
        }
        return {
          [type]: true
        }
      }
      return null
    },
    getTagText(tag) {
      if(typeof tag == 'object') {
        return tag.text
      }
      return tag
    },
    deleteTag(tag, idx) {
      this.$emit('delete', tag, idx)
    }
  }
}
</script>

<style lang="sass" scoped>
$blue: #409eff

.tsy-tags-main
  display: flex
  flex-flow: row wrap
  user-select: none
  .tag
    display: flex
    align-items: center
    flex-flow: row nowrap
    padding: 3px 6px
    border: 1px solid #d9ecff
    color: $blue
    margin-right: 10px
    margin-bottom: 5px
    border-radius: 5px
    background-color: #d9ecff 
    .text
      margin-right: 6px
    .delete-btn
      font-size: 13px
      font-weight: bold
      color: $blue
      width: 15px
      height: 15px
      border-radius: 50%
      justify-content: center
      align-items: center
      display: flex
    .delete-btn:hover
      color: white
      background-color: $blue
  .tag.success
    color: #67c23a
    background-color: #f0f9eb
    border-color: #e1f3d8
    .delete-btn
      color: #67c23a
    .delete-btn:hover
      color: white
      background-color: #67c23a
  .tag.info
    color: #909399
    background-color: #f4f4f5
    border-color: #e9e9eb
    .delete-btn
      color: #909399
    .delete-btn:hover
      color: white
      background-color: #909399
  .tag.warning
    color: #e6a23c
    background-color: #fdf6ec
    border-color: #faecd8
    .delete-btn
      color: #e6a23c
    .delete-btn:hover
      color: white
      background-color: #e6a23c
  
  .tag.danger
    color: #f56c6c
    background-color: #fef0f0
    border-color: #fde2e2
    .delete-btn
      color: #f56c6c
    .delete-btn:hover
      color: white
      background-color: #f56c6c

</style>