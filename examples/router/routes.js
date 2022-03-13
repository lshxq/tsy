const naviRoutes = [
  {
    path: "/home",
    name: "home",
    meta: {
      navi: "home",
      label: "首页",
    },
    component: () => import("../views/home.vue"),
  },
  {
    path: "/sy-table",
    name: "sy-table",
    meta: {
      navi: "sy-table",
      label: "基础Table sy-table",
    },
    component: () => import("../views/example-table.vue"),
  },
  {
    path: "/sy-radio-group",
    name: "sy-radio-group",
    meta: {
      navi: "sy-radio-group",
      label: "单选按钮 sy-radio-group",
    },
    component: () => import("../views/example-radio.vue"),
  },
  {
    path: "/sy-checkbox-group",
    name: "sy-checkbox-group",
    meta: {
      navi: "sy-checkbox-group",
      label: "单选按钮 sy-checkbox-group",
    },
    component: () => import("../views/example-checkbox.vue"),
  },
  {
    path: "/sy-pagin-data",
    name: "sy-pagin-data",
    meta: {
      navi: "sy-pagin-data",
      label: "分页数据 sy-pagin-data",
    },
    component: () => import("../views/example-pagin-data.vue"),
  },
  {
    path: "/sy-pagin-table",
    name: "sy-pagin-table",
    meta: {
      navi: "sy-pagin-table",
      label: "分页Table   sy-pagin-table",
    },
    component: () => import("../views/example-pagin-table.vue"),
  },
  {
    path: "/sy-options",
    name: "sy-options",
    meta: {
      navi: "sy-options",
      label: "备选项   sy-options",
    },
    component: () => import("../views/example-options.vue"),
  },
  {
    path: "/sy-search-input",
    name: "sy-search-input",
    meta: {
      navi: "sy-search-input",
      label: "检索输入框 sy-search-input",
    },
    component: () => import("../views/example-search-input.vue"),
  },
  {
    path: "/sy-split-screen-vertical",
    name: "sy-split-screen-vertical",
    meta: {
      navi: "sy-split-screen-vertical",
      label: "纵向分屏 sy-split-screen-vertical",
    },
    component: () => import("../views/example-split-screen-vertical.vue"),
  },
  {
    path: "/sy-preview",
    name: "sy-preview",
    meta: {
      navi: "sy-preview",
      label: "图片预览 sy-preview",
    },
    component: () => import("../views/example-preview.vue"),
  },
  {
    path: "/sy-panel",
    name: "sy-panel",
    meta: {
      navi: "sy-panel",
      label: "面板 sy-panel",
    },
    component: () => import("../views/example-panel.vue"),
  },
  {
    path: "/form-mixin",
    name: "form-mixin",
    meta: {
      navi: "form-mixin",
      label: "标准Form",
    },
    component: () => import("../views/form-mixin/example-form-mixin.vue"),
  },
  {
    path: "/user-form/new",
    name: "user-form-new",
    meta: {
      navi: "form-mixin",
    },
    component: () => import("../views/form-mixin/user-form-new.vue"),
  },
  {
    path: "/user-form/:id/update",
    name: "user-form-update",
    meta: {
      navi: "form-mixin",
    },
    component: () => import("../views/form-mixin/user-form-update.vue"),
  },
  {
    path: "/thanks",
    name: "thanks",
    meta: {
      label: "特别感谢",
      navi: "thanks",
    },
    component: () => import("../views/thanks.vue"),
  },
];

export default naviRoutes;
