<template>
<div class="pagin-data-comment-main">
  <p>如果后端接受的分页信息不是pageNo和pageSize，可以利用这个钩子函数，在发起ajax请求前，进行更名。</p>
  <div>参数:
    <div class="code-block">
      <div class="intend">{
        <div class="intend">pageNo: Number, // 页号</div>
        <div class="intend">pageSize: NUmber, // 一页的记录数</div>
      </div>
      <div class="intend">}</div>
    </div>
  </div>
  <div>返回:
    <div class="code-block">
      <div class="intend">{
        <div class="intend">XXXX: Number, // 从命名后的 页号</div>
        <div class="intend">XXXX: NUmber, // 从命名后的 记录数</div>
      </div>
      <div class="intend">} </div>
    </div>
  </div>
</div>
</template>