<template lang="pug">
  .tsy-thanks
    
    .h1 特别感谢
    p 亲爱的朋友，感谢您对 tsyvue 的喜爱，tsyvue是基于本人多年开发经验凝聚出来的一个帮助您快速搭建信息系统的前端脚手架，供大家免费学习、使用，也欢迎大家提出宝贵意见。

    p 我是一名经验丰富的大龄程序员，从05年开始从事java web开发，参与的项目从最老的基于PL/SQL的动态页面，struts，spring，再到前后端彻底分开的react/vue，见证了各种前后端语言的演变和发展。 
    
    p 如果您觉得我的内容对您确实有一点帮助，从中学到了些许知识，欢迎打赏，您的慷概对我来说是莫大的鼓励。
    
    //p 我热爱开发，也爱分享，但我也是有血有肉的普通人，也家庭重担要抗，因为众所周知的原因，大龄程序员在当今社会越来越难坚持下去。你的打赏是帮助tsyvue持续更新完善的源动力，再次感谢您的慷慨。

    p 为了方便大家 学习 理解 tsyvue 的使用，提供了一个 极简 例子 工程， 欢迎大家通过 github 下载 调试。

    p 
      a(href='https://github.com/lshxq/examples_tsyvue' target='new') https://github.com/lshxq/examples_tsyvue

    p 这个例子包含一个 用户新建、编辑的两个表单，用于演示 form-mixin实现的标准form。用户列表 和 订单列表，用来演示 基于 sy-pagin-xxxx 开发的分页查询.

    .mt100.donate-bar(v-show='true')
      .donate-label(@click='visible = true') 打赏
      
    .photo-box
      img(src='../assets/beach.jpg' draggable='false')
    
    el-dialog(:visible.sync='visible' title='捐赠窗口' width='390px')
      img(src='../assets/donate.jpg' style='width: 350px' draggable='false')
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style lang="sass" scoped>
.tsy-thanks
  position: relative
  .photo-box
    position: relative
    left: 10%
    display: inline-block
    width: 400px
    transform: rotate(10deg)
    box-shadow: 10px 10px 5px gray
    img
      width: 100%
  .donate-bar
    display: flex
    justify-content: center
    align-items: center
    .donate-label:hover
      opacity: .8
    .donate-label
      cursor: pointer
      color:#FFA042	
      font-size: 50px

</style>