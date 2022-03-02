<template lang="pug">
  .user-form-new-main
    .h1 新建用户 表单展示
    user-form(url="/member")
</template>

<script>
import UserForm from "./user-form.vue";

export default {
  components: {
    UserForm,
  },
};
</script>
