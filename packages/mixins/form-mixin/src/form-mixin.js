import _ from "lodash";

export default {
  props: {
    url: String,
    id: null,
    mock: null
  },
  data() {
    return {
      original: {},
      modified: {},
      state: {
        submitted: false,
        loading: false,
      },
    };
  },
  computed: {
    locking() {
      const { submitted, loading } = this.state;
      return submitted || loading;
    },
    editMode() {
      const { id } = this;
      if (id || id === 0) {
        return true;
      }
      return false;
    },
    modelDiff() {
      const { original, modified } = this;
      const data = {};
      for (const key in modified) {
        if (original[key] != modified[key]) {
          data[key] = modified[key];
        }
      }
      return data;
    },
    postData() {
      return this.editMode ? this.modelDiff : this.modified;
    },
    postMethod() {
      return this.editMode ? "PATCH" : "POST";
    },
    postApi() {
      const that = this;
      const { id, url } = that;
      return that.editMode ? `${url}/${id}` : url;
    },
  },
  mounted() {
    const that = this;
    const { id, url, mock } = that;
    if (that.editMode) {
      // 加载数据
      that.state.loading = true;
      that.$axios({
          url: `${url}/${id}`,
          method: "GET",
          mock
        })
        .then((rv) => {
          const model = that.dataLoaded(_.get(rv, "data"));
          that.original = model;
          that.modified = JSON.parse(JSON.stringify(model));
        })
        .catch(() => {
          that.$message.error("加载数据失败");
        })
        .finally(() => {
          that.state.loading = false;
        });
    }
  },
  methods: {
    cancel() {
      console.log("default cancel implementation");
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    dataLoaded(data) {
      return data;
    },
    beforePost(data) {
      return data;
    },
    submitted(rv) {
      console.log(rv, "default submitted implementation.");
    },
    serverError(ex) {
      console.log(ex, "default serverError implementation.");
      this.$message.error("数据提交失败，请稍后再试，如问题依旧，请联系管理员");
    },
    apply() {
      const that = this;
      that.$refs.formRef.validate((valid) => {
        if (valid) {
          if (!that.state.submitted) {
            that.state.submitted = true;
            that.$axios({
                url: that.postApi,
                data: that.beforePost(that.postData),
                method: that.postMethod,
              })
              .then((rv) => {
                that.submitted(rv.data);
              })
              .catch((ex) => {
                that.serverError(ex);
              })
              .finally(() => {
                that.state.submitted = false;
              });
          }
        }
      });
    },
  },
};
