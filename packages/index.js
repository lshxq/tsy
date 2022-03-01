import VTabs from "./components/vertical-tab";
import Table from "./components/table";
import PaginData from "./components/pagin-data";
import PaginTable from "./components/pagin-table";
import Options from "./components/options";
import SearchInput from "./components/search-input";
import Checkbox from './components/checkbox'
import SplitScreenVertical from './components/split-screen-vertical'
import ImagePreview from './components/preview'


import FormMixin from './mixins/form-mixin'

const components = [SplitScreenVertical, Table, PaginData, PaginTable, VTabs, Options, SearchInput, Checkbox, ImagePreview];

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
  Table,
  PaginData,
  PaginTable,
  VTabs,
  Options,
  Checkbox,
  SplitScreenVertical,
  ImagePreview,
  // mixins
  FormMixin
};
