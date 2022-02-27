import VTabs from "./vertical-tab";
import Table from "./table";
import PaginData from "./pagin-data";
import PaginTable from "./pagin-table";
import Options from "./options";
import SearchInput from "./search-input";

const components = [Table, PaginData, PaginTable, VTabs, Options, SearchInput];

const install = (Vue) => {
  if (install.installed) return;
  components.map((com) => com.install(Vue));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.vue);
}

export default {
  install,
  Table,
  PaginData,
  PaginTable,
  VTabs,
  Options,
};
