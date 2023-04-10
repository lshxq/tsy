import RollingImage from "./src/rolling-image.vue";

RollingImage.install = function (Vue) {
  Vue.component(RollingImage.name, RollingImage);
};

export default RollingImage;
