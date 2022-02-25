export default {
  created() {
    this.eventTableColumns = [
      {
        label: '事件名',
        width: 200,
        prop: 'name'
      },
      {
        label: '描述',
        prop: 'comment'
      }
    ];
    this.propTableColumns = [
      {
        label: "名称",
        prop: "name",
        width: 200,
      },
      {
        label: "类型",
        prop: "type",
        width: 150,
      },
      {
        label: "说明",
        slot: "comment",
      },
    ];
  }
}