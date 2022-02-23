<template lang="pug">
  .home-mai
    p
      .h1 TSY VUE
      p tsy vue是一套为了快速迭代项目，而整理一个基于element-ui的扩充组件库，element-ui本身是和业务无关的基础组件库，在高质量显示的同时在一定程度上提高了开发效率，不过还不够，通过引入tsyvue，能进一步使项目开发标准化。
      p 通过npm 进行安装
      .block npm install tsyvue
      p 在main.js中引入关键依赖
      .block
        p import tsy from 'tsyvue'
        p import ElementUI from 'element-ui';
        p import 'element-ui/lib/theme-chalk/index.css';
        p Vue.use(ElementUI)
        p Vue.use(tsy)
      p 通过全局mixin为每个vue实例绑定 $axios，$axios是直接把请求参数透传给axios，请参看axios相关文档。
      p
        img(:src='AxiosInstance')

    p
      .h2 提升开发效率的一些小技巧
      p 在各种信息系统中，页面无外乎分为两类，一类是 是各种查询页面，查询结果以table 或者 card的形式展现出来， 另一类就 以 表单的形式展示（编辑）数据。
      p 查询页面分为 查询条件、数据展示、分页控制器 三个部分。每个查询页面原则上应该拥有相同的外观，布局，和交互行为，如果让每一个 程序猿 独立开发查询页面，那么,会因为 每个人的能力、理解力、思考方式 不一样的，进而导致 项目中的查询页面 一致性很差， 而且每个人重复的开发 检索条件 、 分页 还存在大量的重复工作量， 开发效率很低。
      img(:src='PaginTablePng')
      p 事实上，每个查询页面，仅仅是查询条件 以及 请求的数据源 是不一样的，其他行为应该都是高度雷同的。我们应该 提供一个组件，把 数据源的url 以及 检索条件作为props传入，其他的包括 数据拉取、分页、条件变化自动查询 等行为 都在该组件内部完成，这样可以抽象大量的相同代码，进而提升开发效率，确保各个检索页面的行为一致。
      p 该组件在使用时大概是这个样子，可以看到代码相当简洁，组件用户只需要关注每一条数据的渲染即可。检索条件变化以及分页都会自动拉取对应数据。
      img(:src='PaginDataCodePng')
      img(:src='PaginDataPng')
      p sy-pagin-data 组件会自动拼装url，拉取对应页面的数据
      p http://localhost:8080/pagin/data?keyword=keyword&status=&pageNo=1&pageSize=10
      
    
    p
      .h2 外部依赖

      .h3 package 依赖
      .block
        p element-ui@^2.15.6
        p pug@^3.0.2 html模板
        p pug-plain-loader@^1.1.0 pug的loader
        p axios@^0.18.0 分页系列组件通过axios进行发起请求，在引入tsy时， 请 在vue的this.$axios 上绑定axios的实例。
        p lodash@^4.17.21 代码中大量使用lodash来操作对象
        p node-sass@^4.14.1
        p sass-loader@^10.1.1
</template>

<script>
import PaginTablePng from "../assets/home-pagin-table.png";
import PaginDataCodePng from "../assets/home-pagin-data-code.png";
import PaginDataPng from "../assets/home-pagin-data.png";
import AxiosInstance from "../assets/home-axios-instance.png";
export default {
  created() {
    this.PaginTablePng = PaginTablePng;
    this.PaginDataCodePng = PaginDataCodePng;
    this.PaginDataPng = PaginDataPng;
    this.AxiosInstance = AxiosInstance;
  },
};
</script>

<style lang="sass" scoped></style>
