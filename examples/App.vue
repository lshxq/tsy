<template lang="pug">
  #app
    sy-v-tabs(:tabs='tabs')
      template(slot='home')
        home

      template(slot='basic-table')
        table-example
      
      template(slot='pagin-data')
        pagin-data-example

      template(slot='pagin-table')
        pagin-table-example

      template(slot='options')
        options-example

      template(slot='search-input')
        search-input-example

</template>

<script>
import Home from "./components/home.vue";
import TableExample from "./components/example-table.vue";
import PaginDataExample from "./components/example-pagin-data.vue";
import PaginTableExample from "./components/example-pagin-table.vue";
import OptionsExample from "./components/example-options.vue";
import SearchInputExample from "./components/example-search-input.vue";

const tabsData = () => {
  return [
    {
      label: "Home",
      slot: "home",
    },
    {
      label: "基础Table   sy-table",
      slot: "basic-table",
    },
    {
      label: "分页数据   sy-pagin-data",
      slot: "pagin-data",
    },
    {
      label: "分页Table   sy-pagin-table",
      slot: "pagin-table",
    },
    {
      label: "备选项   sy-options",
      slot: "options",
    },
    {
      label: "检索输入框 sy-search-input",
      slot: "search-input",
    },
  ];
};

export default {
  name: "App",
  components: {
    OptionsExample,
    TableExample,
    PaginDataExample,
    PaginTableExample,
    Home,
    SearchInputExample,
  },
  created() {
    this.tabs = tabsData();
  },
  methods: {},
};
</script>
<style lang="sass">
body,html
  height: 100%
</style>
<style lang="sass" scoped>
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  height: 100%
  padding: 0
  margin: 0
  background-color: rgba(200, 250, 240, .2)
</style>
