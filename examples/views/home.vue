<template>
<div class="home-main">
  <div>
    <div class="h1">TSY VUE</div>
    <div>tsy vue是一套为了快速迭代项目，而整理一个基于element-ui的扩充组件库，element-ui本身是和业务无关的基础组件库，在高质量显示的同时在一定程度上提高了开发效率，不过还不够，通过引入tsyvue，能极大的提高开发效率，进一步提升项目的标准化、以及一致性。</div>
    <div>通过npm 进行安装</div>
    <div class="code-block">
      <div class="intend">npm install tsyvue</div>
    </div>
    <div>在main.js中引入关键依赖</div>
    <div class="code-block">
      <div class="intend">import tsy from 'tsyvue'</div>
      <div class="intend"></div>
      <div class="intend">import ElementUI from 'element-ui';</div>
      <div class="intend">import 'element-ui/lib/theme-chalk/index.css';</div>
      <div class="intend">Vue.use(ElementUI)</div>
      <div class="intend">Vue.use(tsy)</div>
    </div>
    <div>分页查询（pagin） 和 表单（form） 系列组件 会直接通过 axios和后端做通讯，拉取、提交数据。</div>
    <div>通过全局mixin为每个vue实例绑定 $axios，$axios是直接把请求参数透传给axios，请参看axios相关文档。</div>
    <div><img :src="AxiosInstance"/></div>
  </div>
  <div class="mt100">
    <div class="h2">提升开发效率的一些小技巧</div>
    <div class="red">为了提升模板的开发效率，html模板我推荐使用pug语言</div>
    <div>pug 就是之前的 jade，早在jsp的时代，jade就是html模板的首选，主要 思想是 通过 css选择器 配合 缩进 格式 来书写极简的html， 通过优雅的格式，取消了繁琐的开始和闭合标签。习惯后端yml作为配置文件的开发者，会很快接受pug。</div>
    <div>在各种信息系统中，页面无外乎分为两类，一类是 是各种查询页面，查询结果以table 或者 card的形式展现出来， 另一类就 以 表单的形式展示（编辑）数据。</div>
    <div class="h3 mt100">标准查询页面</div>
    <div>查询页面分为 查询条件、数据展示、分页控制器 三个部分。每个查询页面原则上应该拥有相同的外观，布局，和交互行为，如果让每一个 程序猿 独立开发查询页面，那么,会因为 每个人的能力、理解力、思考方式 不一样的，进而导致 项目中的查询页面 一致性很差， 而且每个人重复的开发 检索条件 、 分页 还存在大量的重复工作量， 开发效率很低。</div><img :src="PaginTablePng"/>
    <div>事实上，每个查询页面，仅仅是查询条件 以及 请求的数据源 是不一样的，其他行为应该都是高度雷同的。我们应该 提供一个组件，把 数据源的url 以及 检索条件作为props传入，其他的包括 数据拉取、分页、条件变化自动查询 等行为 都在该组件内部完成，这样可以抽象大量的相同代码，进而提升开发效率，确保各个检索页面的行为一致。</div>
    <div>sy-pagin-data 就是这样一个组件，该组件在使用时大概是这个样子，可以看到代码相当简洁，组件用户只需要关注每一条数据的渲染即可。检索条件变化以及分页都会自动拉取对应数据。</div><img :src="PaginDataCodePng"/><img :src="PaginDataPng"/>
    <div>sy-pagin-data 组件会自动拼装url，拉取对应页面的数据</div>
    <div>http://localhost:8080/pagin/data?keyword=keyword&status=&pageNo=1&pageSize=10</div>
  </div>
  <div class="mt100">
    <div class="h3">标准form解决方案  （form-mixin）  </div>
    <div>通常来讲，系统的表单 分 为 创建数据 和 修改数据 两类， 创建数据和修改数据 的内容 绝大部分应该是一致， 仅仅部分字段 创建后不允许更改，另外各个表单之间，其行为也高度雷同，就是搜集form数据，然后 post或者patch到后端接口。 如果 新建 和 编辑都要 独立开发，那么开发工作量是很大的，没必要这样不理智的投入 重复工作量。</div>
    <div>解决这里的思路是 提炼一个form-mixin，封装了 从数据拉取、数据验证 以及 数据提交的过程，这样，绝大部分表单 开发 仅仅是 构建layout即可。 数据交互均交给这个mixin完成。</div>
    <div>因为 新建 和 编辑 卷大部分行为和layout是一致的，我们应该 为其 建立 一个 标准的form组件，该组件 定义了表单的layout， 然后在这个组件的基础上定义 新建 和 编辑 表单。基础form应用了form-mixin 获得 新建和编辑的基础行为。</div>
    <div>以用户信息表单为例，只需要3个vue文件即可
      <div><h4>user-form.vue</h4></div>
      <div><h4>user-form-new.vue</h4></div>
      <div><h4>user-form-update.vue</h4></div>
      <div>user-form.vue 的layout的代码，这里只要专注搭建表单的布局即可，这里完全是基于element-ui做的表单搭建。model的名字必须是modified。
        <div><img src="../assets/user-form-layout.png"/></div>
      </div>
      <div>user-form.vue 的表单验证的部分，这里element-ui提供的表单验证逻辑。 引入了form-mixins 集成 数据交互 逻辑
        <div> <img src="../assets/user-form-rules.png"/></div>
      </div>
      <div>user-form.vue 的data部分，和 form-mixins中提供的一些 关键节点 钩子函数
        <div><img src="../assets/user-form-data-and-hooks.png"/></div>
        <div>model的名字必须是modified，这是从form-mixins的集成来的。</div>
        <div>在表单验证通过后，数据提交之前，会调用 beforePost 函数，以提供一个机会 进一步做数据 处理。 （非必须，有默认行为。）</div>
        <div>dataLoaded 是在编辑数据的场合，数据根据指定ID加载后，先调用该 函数 做数据处理。（非必须，有默认行为。）</div>
        <div>submitted 是在数据成功提交后 的钩子函数，用于页面跳转。</div>
        <div>cancel 是在用户点击 取消按钮是 调用</div>
      </div>
      <div><h3>新建用户表单代码</h3>
        <div>新建表单仅仅是引入和user-form，并传入了数据 源的url。即开发完成了。提交表单时会以post的方式 进行提交。</div>
        <div><img src="../assets/user-form-new.png"/></div>
      </div>
      <div><h3>编辑用户表单代码</h3>
        <div>编辑表单在新建的基础上，多穿了一个id，这个id就决定了表单行为是编辑，会首先通过get方式拉取model回来，并以patch方式 增量更新 字段。</div>
        <div><img src="../assets/user-form-update.png"/></div>
      </div>
    </div>
  </div>
  <div class="mt100">
    <div class="h2">外部依赖</div>
    <div class="h3">package 依赖</div>
    <div class="block">
      <div>element-ui@^2.15.6</div>
      <div>axios@^0.18.0 分页系列组件通过axios进行发起请求，在引入tsy时， 请 在vue的this.$axios 上绑定axios的实例。</div>
      <div>lodash@^4.17.21 代码中大量使用lodash来操作对象</div>
    </div>
  </div>
</div>
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

<style lang="css" scoped></style>
