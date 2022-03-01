<template lang="pug">
  .user-form-update-main
    user-form(v-if="memberId" url="member" :id="`${memberId}`")
    .no-member-id-panel(v-else) 无法获得会员ID
</template>

<script>
import UserForm from "./user-form.vue";

export default {
  components: {
    UserForm,
  },
  computed: {
    memberId() {
      return this.$route.params.memberId;
    },
  },
};
</script>
