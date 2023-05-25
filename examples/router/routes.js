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
    path: "/sy-switch",
    name: "sy-switch",
    meta: {
      navi: "sy-switch",
      label: "开关 sy-switch",
    },
    component: () => import("../views/example-switch.vue"),
  },
  {
    path: "/sy-paginator",
    name: "sy-paginator",
    meta: {
      navi: "sy-paginator",
      label: "分页器 sy-paginator",
    },
    component: () => import("../views/example-paginator.vue"),
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
    path: "/sy-select",
    name: "sy-select",
    meta: {
      navi: "sy-select",
      label: "下拉列表   sy-select",
    },
    component: () => import("../views/example-select.vue"),
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
    path: "/sy-rolling-image",
    name: "sy-rolling-image",
    meta: {
      navi: "sy-rolling-image",
      label: "旋转照片 sy-rolling-image",
    },
    component: () => import("../views/example-rolling-image.vue"),
  },
  {
    path: "/sy-ray-border",
    name: "sy-ray-border",
    meta: {
      navi: "sy-ray-border",
      label: "旋转照片 sy-ray-border",
    },
    component: () => import("../views/example-ray-border.vue"),
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
    path: "/sy-arrow",
    name: "sy-arrow",
    meta: {
      navi: "sy-arrow",
      label: "箭头 sy-arrow",
    },
    component: () => import("../views/example-arrow.vue"),
  },
  {
    path: "/blocks",
    name: "blocks",
    meta: {
      navi: "blocks",
      label: "俄罗斯方块",
    },
    component: () => import("../views/example-blocks.vue"),
  },
  {
    path: "/colors",
    name: "colors",
    meta: {
      navi: "colors",
      label: "color代码表",
    },
    component: () => import("../views/example-colors.vue"),
  },
  {
    path: "/border-radius",
    name: "border-radius",
    meta: {
      navi: "border-radius",
      label: "border radius",
    },
    component: () => import("../views/example-border-radius.vue"),
  },
  {
    path: "/clip-path",
    name: "clip-path",
    meta: {
      navi: "clip-path",
      label: "clip-path",
    },
    component: () => import("../views/example-clip-path.vue"),
  },
  {
    path: "/directives",
    name: "directives",
    meta: {
      navi: "directives",
      label: "directives",
    },
    component: () => import("../views/example-directives.vue"),
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
