import VTabs from "./components/vertical-tab";
import RollingImage from './components/rolling-image';
import Arrow from './components/arrow';
import Select from "./components/select";
import Table from "./components/table";
import Paginator from "./components/paginator";
import PaginData from "./components/pagin-data";
import PaginTable from "./components/pagin-table";
import Options from "./components/options";
import SearchInput from "./components/search-input";
import Checkbox from "./components/checkbox";
import CheckboxGroup from "./components/checkbox-group";
import Radio from "./components/radio";
import RadioGroup from "./components/radio-group";
import SplitScreenVertical from "./components/split-screen-vertical";
import ImagePreview from "./components/preview";
import Panel from "./components/panel";
import Tags from './components/tags';
import Form from './components/form';
import Image from './components/image';
import LeftRight from './components/left-right';
import Calendar from './components/calendar';
import WaterDrop from './components/water-drop';
import FormMixin from "./mixins/form-mixin";

const components = [
  SplitScreenVertical, // 左右分屏
  RollingImage,
  Arrow,
  Select, // 下拉选择
  Table, // 基础Table
  Paginator, // 分页器
  PaginData, // 分页查询
  PaginTable, // 分页查询table
  VTabs, // 左右分屏tab
  Options, // 自动拉取options的备选项
  SearchInput, // 检索条件 输入框
  Checkbox, // 多选按钮
  CheckboxGroup, // 多选按钮组
  ImagePreview, // 图片预览
  Radio, // 单选按钮
  RadioGroup, // 单选按钮组
  Panel, // 面板
  Tags, // Tag
  Form, // 自能表单
  Image, // 图片
  LeftRight, // 左右布局
  Calendar, // 日历
  WaterDrop, // 水滴
];

const install = (Vue) => {
  if (install.installed) return;
  components.map((com) => com.install(Vue));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.vue);
}

export default {
  install,
  // components
  Arrow,
  RollingImage,
  Select,
  Table,
  Paginator,
  PaginData,
  PaginTable,
  VTabs,
  Options,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  SplitScreenVertical,
  ImagePreview,
  Panel,
  Tags,
  Form,
  Image,
  Calendar,
  WaterDrop,
  // mixins
  FormMixin,
};
