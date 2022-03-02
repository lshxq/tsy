<template lang="pug">
  .home-mai
    p
      .h1 TSY VUE
      p tsy vue是一套为了快速迭代项目，而整理一个基于element-ui的扩充组件库，element-ui本身是和业务无关的基础组件库，在高质量显示的同时在一定程度上提高了开发效率，不过还不够，通过引入tsyvue，能进一步使项目开发标准化。
      p 通过npm 进行安装
      .code-block
        .intend npm install tsyvue
      p 在main.js中引入关键依赖
      .code-block
        .intend import tsy from 'tsyvue'
        .intend
        .intend import ElementUI from 'element-ui';
        .intend import 'element-ui/lib/theme-chalk/index.css';
        .intend Vue.use(ElementUI)
        .intend Vue.use(tsy)
      
      p pagin 和 form 系列组件 会直接通过 axios和后端做通讯，拉取、提交数据。
      p 通过全局mixin为每个vue实例绑定 $axios，$axios是直接把请求参数透传给axios，请参看axios相关文档。
      
      p
        img(:src='AxiosInstance')

    p.mt100
      .h2 提升开发效率的一些小技巧
      p 在各种信息系统中，页面无外乎分为两类，一类是 是各种查询页面，查询结果以table 或者 card的形式展现出来， 另一类就 以 表单的形式展示（编辑）数据。
      .h3.mt100 标准查询页面
      p 查询页面分为 查询条件、数据展示、分页控制器 三个部分。每个查询页面原则上应该拥有相同的外观，布局，和交互行为，如果让每一个 程序猿 独立开发查询页面，那么,会因为 每个人的能力、理解力、思考方式 不一样的，进而导致 项目中的查询页面 一致性很差， 而且每个人重复的开发 检索条件 、 分页 还存在大量的重复工作量， 开发效率很低。
      img(:src='PaginTablePng')
      p 事实上，每个查询页面，仅仅是查询条件 以及 请求的数据源 是不一样的，其他行为应该都是高度雷同的。我们应该 提供一个组件，把 数据源的url 以及 检索条件作为props传入，其他的包括 数据拉取、分页、条件变化自动查询 等行为 都在该组件内部完成，这样可以抽象大量的相同代码，进而提升开发效率，确保各个检索页面的行为一致。
      p 该组件在使用时大概是这个样子，可以看到代码相当简洁，组件用户只需要关注每一条数据的渲染即可。检索条件变化以及分页都会自动拉取对应数据。
      img(:src='PaginDataCodePng')
      img(:src='PaginDataPng')
      p sy-pagin-data 组件会自动拼装url，拉取对应页面的数据
      p http://localhost:8080/pagin/data?keyword=keyword&status=&pageNo=1&pageSize=10

    p.mt100
      .h3 标准form解决方案  （form-mixin）  
      p 通常来讲，系统的表单 分 为 创建数据 和 修改数据 两类， 创建数据和修改数据 的内容 绝大部分应该是一致， 仅仅部分字段 创建后不允许更改，另外各个表单之间，其行为也高度雷同，就是搜集form数据，然后 post或者patch到后端接口。 如果 新建 和 编辑都要 独立开发，那么开发工作量是很大的，没必要这样不理智的投入 重复工作量。
      p 解决这里的思路是 提炼一个form-mixin，封装了 从数据拉取、数据验证 以及 数据提交的过程，这样，绝大部分表单 开发 仅仅是 构建layout即可。 数据交互均交给这个mixin完成。
      p 因为 新建 和 编辑 卷大部分行为和layout是一致的，我们应该 为其 建立 一个 标准的form组件，该组件 定义了表单的layout， 然后在这个组件的基础上定义 新建 和 编辑 表单。基础form应用了form-mixin 获得 新建和编辑的基础行为。
      p 以用户信息表单为例
        p user-form.vue
        p user-form-new.vue
        p user-form-update.vue
        p user-form.vue 的layout的代码，这里只要专注搭建表单的布局即可，这里完全是基于element-ui做的表单搭建。model的名字必须是modified。
          p
            img(src='../assets/user-form-layout.png')
        p user-form.vue 的表单验证的部分，这里element-ui提供的表单验证逻辑。 引入了form-mixins 集成 数据交互 逻辑
          p 
            img(src='../assets/user-form-rules.png')
        p user-form.vue 的data部分，和 form-mixins中提供的一些 关键节点 钩子函数
          p
            img(src='../assets/user-form-data-and-hooks.png')
          p model的名字必须是modified，这是从form-mixins的集成来的。
          p 在表单验证通过后，数据提交之前，会调用 beforePost 函数，以提供一个机会 进一步做数据 处理。 （非必须，有默认行为。）
          p dataLoaded 是在编辑数据的场合，数据根据指定ID加载后，先调用该 函数 做数据处理。（非必须，有默认行为。）
          p submitted 是在数据成功提交后 的钩子函数，用于页面跳转。
          p cancel 是在用户点击 取消按钮是 调用
        p 新建用户表单代码例
          p 新建表单仅仅是引入和user-form，并传入了数据 源的url。即开发完成了。提交表单时会以post的方式 进行提交。
          p
            img(src='../assets/user-form-new.png')

        p 编辑用户表单代码例
          p 编辑表单在新建的基础上，多穿了一个id，这个id就决定了表单行为是编辑，会首先通过get方式拉取model回来，并一个patch方式 增量更新 字段。
          p
            img(src='../assets/user-form-update.png')
    p.mt100
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
