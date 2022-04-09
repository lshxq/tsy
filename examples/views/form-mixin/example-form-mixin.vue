<template>
<div class="tsy-form-mixin-example">
  <div class="h1">form-mixin </div>
  <p class="mt100">form-mixin 是另一个大大提高开发效率的抽象</p>
  <p>以往我们开发一个新建表单，要处理layout，表单验证，数据提交，然后再去写编辑表单，还要处理layout，数据拉取，数据验证，以及表单提交。</p>
  <p>可以看到，新建和编辑 纯在 很多共通的部分。</p>
  <p>form-mixin倡导 仅开发一个核心form，这个form中处理 了数据拉取（编辑）、layout、验证，提交， 而且用户只要关心 layout和表单验证即可，剩下的交给form-mixin。</p>
  <p>然后再新建 和  编辑的 视图中只要引入 这个核心form 组件就可以了， 通过是否向组件传入ID决定是编辑还是新建的逻辑。</p>
  <p class="red">这里语言描述比较晦涩，难以理解中心思想，推荐下载例子工程亲自体验一下这种开发模式，可以发现相比你现在的开发思路会大大节省代码。</p>
  <p> <a href="https://github.com/lshxq/examples_tsyvue" target="new">https://github.com/lshxq/examples_tsyvue</a></p>
  <p class="mt100">这里是核心form的代码示例，模板部分是基于element-ui开发的form的layout。然后混入了form-mixin，从而集成了表单验证和数据提交，以及在编辑的场合加载数据的能力。</p>
  <p>form-mixin中，表单编辑的model叫modified。</p>
  <p>form-mixin以post的方式创建新数据，以patch的方式，提交增量的变更数据。</p>
  <p>vue实例created中定义了用于表单验证的rules，并且传给了el-form，这里完全符合element-ui规范的操作。</p>
  <p>按钮调用的apply函数，是form-mixin中提供的功能，用于表单提交，这个函数执行会先做表单验证，如果验证通过，会提交数据，完成后会调用钩子函数submitted，我们只需要复写这个submitted函数，来做提交成功后而处理即可。</p>
  <p>按钮调用的cancel函数是自己定义的，处理取消的场合即可。</p>
  <p>form-mixin提供了一个表单锁定状态，locking，在数据载入和数据提交过程中，locking值为true，可以利用它来锁定form</p><img src="../../assets/form-mixin-core-form.png"/>
  <div class="mt100">上面就是核心form的开发，具体步骤如下
    <ul>
      <li>通过element-ui搭建表单的layout</li>
      <li>vue中混入form-mixin </li>
      <li>通过locking的值来锁定form，禁止用户操作form</li>
      <li>在created中绑定element-ui的表单验证</li>
      <li>提交按钮直接调用form-mixin中的apply函数</li>
      <li>通过复写submitted函数来做表单提交后的处理</li>
      <li>自己编写cancel函数来处理取消按钮的操作。</li>
    </ul>
    <p>做到以上几点，核心form就开发完成了，我们来看在新建和编辑中如何使用这个核心form</p>
  </div>
  <div class="mt100">
    <div class="h2">新建场合的表单</div>
  </div>
  <p><img src="../../assets/form-mixin-new-form.png"/></p>
  <p>可以看到引入核心form后，只需要通过prop传入用来提交数据的url即完成了新建表单的开发。</p>
  <div class="mt100">
    <div class="h2">编辑场合的表单</div>
  </div>
  <p> <img src="../../assets/form-mixin-update-form.png"/></p>
  <p>编辑成场合使用核心form多了一些步骤。</p>
  <p>memberId是从url中解析出来的，要显示的会员的ID，memberId作为id传给核心form，form-mixin会把有ID参数的当作编辑的场合。并以GET方式调用url/id，获得要编辑的数据。</p>
  <p>因为例子提供的是假的接口地址，注定是拉不回来数据的，因为我提供了一个mock数据，mockData，传给了form-mixin，form-mixin会在拉取数据失败时，使用这个mock数据返回，并填充画面。</p>
  <p>和新建相比，就是多传了一个ID给form-mixin，form-mixin就是加载待编辑的数据，并做patch的增量提交。</p>
  <p class="mt100"> 通过示例代码，可以看到使用form-mixin的方式节省了大量的开发成本。调试form-mixin要注意观察network选项卡的数据交互。</p>
  <p>form-mixin的钩子函数如下</p>
  <ul>
    <li>dataLoaded，在编辑的场合，当待编辑数据加载后，会先调用这个函数用来数据处理，可能会牵扯到数据变形。默认行为是直接返回服务器的数据。</li>
    <li>beforePost，在提交数据时调用，接受的待提交的数据，期待返回处理后的数据，用于提价前数据变形，以满足接口要求。默认行为是不做任何处理。</li>
    <li>submitted, 数据提交完成后 的处理，默认不做任何操作。通常是用来页面迁移</li>
    <li>serverError，在调用接口时，接口返回失败，默认打印了错误信息。</li>
  </ul>
  <div class="mt100">基于form-mixins的例子入口
    <el-button type="primary" @click="goto(&quot;user-form-new&quot;)">新建</el-button>
    <el-button type="primary" @click="goto(&quot;user-form-update&quot;, {params: {id:123}})">编辑</el-button>
  </div>
</div>
</template>

<script>
export default {
  created() {

    
  },
  methods: {

  }
}
</script>