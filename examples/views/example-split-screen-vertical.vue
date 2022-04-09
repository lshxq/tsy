<template>
<div class="tsy-split-screen-vertical-example-main">
    <div class="h1">纵向分屏 sy-split-screen-vertical</div>
    <div class="example-panel">
        <sy-split-screen-vertical :left="200"><template slot="left">left</template><template slot="right">right</template></sy-split-screen-vertical>
    </div>
    <p>我们需要一个可以把屏幕左右两块的区域，并且可以调整两侧的宽度占比，这个组件默认高度是100%</p>
    <div class="code-block">
        <div class="intend">sy-split-screen-vertical(:left='200')<div class="intend">template(slot='left') left</div>
            <div class="intend">template(slot='right') right</div>
        </div>
    </div>
    <div class="mt100">
    <div class="h2">Props</div>
    <sy-table :columns="propTableColumns" :data="propTableData"><template v-slot:comment="slot">{{slot.row.comment}}</template></sy-table>
    </div>
    <div class="mt100">
    <div class="h2">slot</div>
    <p>有两个命名slot，分别是left 和 right。</p>
    </div>
</div>
</template>

<script>
import commentMixin from '../mixins/comment-mixins.js'

export default {
  mixins: [commentMixin],
  created() {
    this.propTableData = [
      {
        name: 'left',
        type: 'Number',
        comment: '左侧的初始宽度，默认值320px'
      }
    ]
  }
}
</script>

<style lang="css" scoped>
.tsy-split-screen-vertical-example-main {
  height: 100%;
}

.tsy-split-screen-vertical-example-main .example-panel {
  display: block;
  height: 400px;
  width: 800px;
  border: 1px solid gray;
}

</style>