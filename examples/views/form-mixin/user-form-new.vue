<template>
<div class="user-form-new-main">
  <div class="h1">新建用户 表单展示</div>
  <user-form url="/member"></user-form>
</div>
</template>

<script>
import UserForm from "./user-form.vue";

export default {
  components: {
    UserForm,
  },
};
</script>
