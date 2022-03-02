<template lang="pug">
  .user-form-update-main
    .h1 编辑用户表单展示
    user-form(v-if="memberId" url="/member" :id="`${memberId}`" :mock='mockData')
    .no-member-id-panel(v-else) 无法获得会员ID
    .mt100 因为没有后端，所以数据拉取的/member/:id会404，我在axios上实现了一个mock数据的方式，这里在404后使用的是mock数据填充的表单。
</template>

<script>
import UserForm from "./user-form.vue";

export default {
  components: {
    UserForm,
  },
  computed: {
    memberId() {
      return this.$route.params.id;
    },
    mockData() {
      return {
        name: 'tsy',
        gender: 1,
        phone: '18XXXXX5821',
        email: 'lshxqwww@gmail.com',
        birth: '1983-08-21'
      }
    }
  },
};
</script>
