<template lang="pug">
  .user-form-new-main
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
