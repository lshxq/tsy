<template lang="pug">
  .tsy-example-form-update-main
    .h2 编辑表单用例
    sy-form(:inputs='formInputs'
      id='test'
      url='/example/syform/submit-url'
      :data-loaded-handler='dataLoadedHandler'
      :before-post-handler='beforePostHandler'
      :mock='loadDataMock'
      @submitted='updateSubmitted'
      @canceled='updateCanceled')
</template>


<script>
export default {
  created() {
    this.loadDataMock = {
      xingming: 'TSYVUE',
      gender: 'female',
      xueli: 'bachelor',
      xingqu: ['lanqiu', 'zuqiu'],
      gangwei: 'MGR',
      birthday: '2022-3-23'
    }
    this.formInputs = [
      {
        type: "input",
        name: "xingming",
        value: "tsy",
        label: "姓名",
        meta: {
          placeholder: "请输入姓名",
          width: 300,
          maxlength: 30,
        },

        rule: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      {
        type: "options",
        name: "gender",
        value: "male",
        label: "性别",
        meta: {
          url: "/example/gender/options",
          type: 2,
          mock() {
            return [
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ];
          },
        },
      },
      {
        type: "options",
        name: "xueli",
        value: "bachelor",
        label: "学历",
        meta: {
          options: [
            {
              label: "中学",
              value: "highschool",
            },
            {
              label: "大专",
              value: "college",
            },
            {
              label: "大学（本科）",
              value: "bachelor",
            },
            {
              label: "研究生",
              value: "master",
            },
          ],
        },
      },
      {
        type: "options",
        kind: 2,
        name: "xingqu",
        label: "兴趣",
        meta: {
          url: "/example/xingqu/options",
          type: 2,
          multiple: true,
          mock() {
            return [
              {
                label: "篮球",
                value: "lanqiu",
              },
              {
                label: "足球",
                value: "zuqiu",
              },
              {
                label: "乒乓",
                value: "pingpang",
              },
            ];
          },
        },
      },
      {
        type: "options",
        name: "gangwei",
        label: "岗位",
        meta: {
          url: "/example/gangwei/options",
          multiple: true,
          mock() {
            return [
              {
                label: "前端工程师",
                value: "FE",
              },
              {
                label: "后端工程师",
                value: "BE",
              },
              {
                label: "技术经理",
                value: "MGR",
              },
            ];
          },
        },
      },
      {
        type: "datepicker",
        name: "birthday",
        label: "生日",
        value: "1983-7-4",
      },
    ];
  },
  methods: {
    updateSubmitted(data) {
      console.log(data)
      this.$message.success('编辑表单提交完成')
    },
    updateCanceled() {
      this.$message.error('编辑表单取消了')
      setTimeout(() => {
        this.goto("sy-form")
      }, 1500)
    },
    dataLoadedHandler(data) {
      this.$message.info('数据加载完成' + JSON.stringify(data))
      return data
    }, 
    beforePostHandler(data) {
      this.$message.info('加工提交数据' + JSON.stringify(data))
      return data
    }
  }
};
</script>