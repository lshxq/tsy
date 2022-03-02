<template lang="pug">
  .tsy-form-mixin-example-main-form
    el-form(:model="modified", label-width="80px", ref="formRef", :rules="rules")
      el-form-item(label="姓名", prop="name")
        el-input.w400(v-model.trim="modified.name" show-word-limit :maxlength='30')

      el-form-item(label="性别")
        el-radio-group(v-model="modified.gender")
          el-radio(label="1") 男
          el-radio(label="0") 女

      el-form-item(label="电话", prop="phone")
        el-input.w300(v-model.trim="modified.phone" show-word-limit :maxlength='30')

      el-form-item(label="电子邮件")
        el-input.w400(v-model.trim="modified.email" show-word-limit :maxlength='120')

      el-form-item(label="生日")
        el-date-picker(v-model="modified.birth", type="date", placeholder="选择日期")

      el-form-item
        .w200
          el-button(type='primary' @click="apply") 确定
          el-button(@click="cancel") 取消
</template>

<script>
import tsy from '/packages'
const {
  FormMixin
} = tsy
console.log('form-mixin', FormMixin)


export default {
  mixins: [FormMixin],
  created() {
    this.rules = {
      name: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" },
      ],
      phone: [
        { required: true, message: "请输入电话号码", trigger: "blur" },
        {
          min: 5,
          max: 20,
          message: "电话号码必须在在 5 到 20 个字符之间",
          trigger: "blur",
        },
      ],
    };
  },
  data() {
    return {
      modified: {
        name: "",
        gender: "1",
        phone: "",
        email: "",
        wechat: "",
      },
    };
  },
  methods: {
    beforePost(data) {
      if (data.phone) {
        data.phone = data.phone.replace(/\s/g, "");
      }
      return data;
    },
    dataLoaded(data) {
      data.gender = `${data.gender}`;
      return data;
    },
    submitted() {
      this.goto("form-mixin");
    },
    cancel() {
      this.goto("form-mixin");
    },
    
  },
}
</script>