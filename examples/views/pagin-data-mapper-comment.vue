<template lang="pug">
  .pagin-data-comment-main
    p 如果后端接受的分页信息不是pageNo和pageSize，可以利用这个钩子函数，在发起ajax请求前，进行更名。
    p 参数:
      .code-block
        .intend {
          .intend pageNo: Number, // 页号
          .intend pageSize: NUmber, // 一页的记录数
        .intend }
    p 返回:
      .code-block
        .intend {
          .intend XXXX: Number, // 从命名后的 页号
          .intend XXXX: NUmber, // 从命名后的 记录数
        .intend } 
</template>