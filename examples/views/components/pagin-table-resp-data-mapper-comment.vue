<template>
<div class="response-data-mapper-comment-main">
  <p>paginTable期待服务器返回这样的数据格式如下</p>
  <div class="code-block">
    <div class="intend">{
      <div class="intend">data:Array // 数组的每个元素代表一行数据, </div>
      <div class="intend">total:Number // 匹配检索条件的记录总数</div>
    </div>
    <div class="intend">}</div>
  </div>
  <p>如果接口返回的不是这样的格式，可以利用这个钩子函数对返回的数据做变形，并返回 这个格式。</p>
</div>
</template>