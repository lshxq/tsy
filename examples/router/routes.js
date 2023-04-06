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
    path: "/sy-img",
    name: "sy-img",
    meta: {
      navi: "sy-img",
      label: "图片 sy-img",
    },
    component: () => import("../views/example-image.vue"),
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
    path: "/sy-left-right",
    name: "sy-left-right",
    meta: {
      navi: "sy-left-right",
      label: "左右布局 sy-left-right",
    },
    component: () => import("../views/example-left-right.vue"),
  },
  {
    path: "/sy-tags",
    name: "sy-tags",
    meta: {
      navi: "sy-tags",
      label: "标签 sy-tags",
    },
    component: () => import("../views/example-tags.vue"),
  },
  {
    path: "/form-mixin",
    name: "form-mixin",
    meta: {
      navi: "form-mixin",
      label: "form-mixin",
    },
    component: () => import("../views/form-mixin/example-form-mixin.vue"),
  },
  {
    path: "/sy-form",
    name: "sy-form",
    meta: {
      navi: "sy-form",
      label: "数据化表单 sy-form",
    },
    component: () => import("../views/example-form.vue"),
  },
  {
    path: "/sy-form-create",
    name: "sy-form-create",
    meta: {
      navi: "sy-form",
    },
    component: () => import("../views/example-form-create.vue"),
  },
  {
    path: "/sy-form-update",
    name: "sy-form-update",
    meta: {
      navi: "sy-form",
    },
    component: () => import("../views/example-form-update.vue"),
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
    path: "/sy-calendar",
    name: "sy-calendar",
    meta: {
      navi: "sy-calendar",
      label: "日历 sy-calendar",
    },
    component: () => import("../views/example-calendar.vue"),
  },
  {
    path: "/sy-water-drop",
    name: "sy-water-drop",
    meta: {
      navi: "sy-water-drop",
      label: "水滴 sy-water-drop",
    },
    component: () => import("../views/example-water-drop.vue"),
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
