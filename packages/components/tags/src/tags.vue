<template>
<div class="tsy-tags-main">
  <div class="tag" v-for="(tag, idx) of items" :key="idx" :class="getTagClass(tag)"> 
    <div class="text">{{getTagText(tag)}}</div>
    <div class="delete-btn el-icon-close" v-if="removable || tag.removable" @click="deleteTag(tag, idx)"></div>
  </div>
</div>
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

<style lang="css" scoped>
.tsy-tags-main {
  display: flex;
  flex-flow: row wrap;
  user-select: none;
}

.tsy-tags-main .tag {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  padding: 3px 6px;
  border: 1px solid #d9ecff;
  color: #409eff;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: #d9ecff;
}

.tsy-tags-main .tag .text {
  margin-right: 6px;
}

.tsy-tags-main .tag .delete-btn {
  font-size: 13px;
  font-weight: bold;
  color: #409eff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.tsy-tags-main .tag .delete-btn:hover {
  color: white;
  background-color: #409eff;
}

.tsy-tags-main .tag.success {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.tsy-tags-main .tag.success .delete-btn {
  color: #67c23a;
}

.tsy-tags-main .tag.success .delete-btn:hover {
  color: white;
  background-color: #67c23a;
}

.tsy-tags-main .tag.info {
  color: #909399;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
}

.tsy-tags-main .tag.info .delete-btn {
  color: #909399;
}

.tsy-tags-main .tag.info .delete-btn:hover {
  color: white;
  background-color: #909399;
}

.tsy-tags-main .tag.warning {
  color: #e6a23c;
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.tsy-tags-main .tag.warning .delete-btn {
  color: #e6a23c;
}

.tsy-tags-main .tag.warning .delete-btn:hover {
  color: white;
  background-color: #e6a23c;
}

.tsy-tags-main .tag.danger {
  color: #f56c6c;
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.tsy-tags-main .tag.danger .delete-btn {
  color: #f56c6c;
}

.tsy-tags-main .tag.danger .delete-btn:hover {
  color: white;
  background-color: #f56c6c;
}


</style>