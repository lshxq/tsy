import Preview from "./src/image-preview.vue";

Preview.install = function (Vue) {
  Vue.component(Preview.name, Preview);
};

export default Preview;
