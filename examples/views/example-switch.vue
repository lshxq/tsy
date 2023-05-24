<template>
  <div class="example-tsy-switch">
    <div class="example">
      <div class="row">
        <div class="label">默认</div>
        <div class="input">
          <sy-switch v-model="checked"></sy-switch>
        </div>
      </div>
      <div class="desc">
        &lt;sy-switch v-model='{{checked}}'/&gt;
      </div>
    </div>
    
    <div class="example">
      <div class="row">
        <div class="label">添加label</div>
        <div class="input">
          <sy-switch v-model="checked" label-on="开启" label-off="关闭"></sy-switch>
        </div>
      </div>
      <div class="desc">
        &lt;sy-switch v-model='{{checked}}' label-on='开启' label-off='关闭'/&gt;
      </div>
    </div>

    <div class="example">
      <div class="row">
        <div class="label">指定颜色</div>
        <div class="input">
          <sy-switch v-model="checked" label-on="开启" label-off="关闭" bg-color-on="#28d21e" bg-color-off="#fa3246"></sy-switch>
        </div>
      </div>
      <div class="desc">
        &lt;sy-switch v-model='{{checked}}' label-on='开启' label-off='关闭' bg-color-on="#28d21e" bg-color-off="#fa3246"/&gt;
      </div>
    </div>

    <div class="example">
      <div class="row">
        <div class="label">指定大小</div>
        <div class="input">
          <sy-switch v-model="checked" label-on="开启" label-off="关闭" bg-color-on="#28d21e" bg-color-off="#fa3246" size="200,50" width="300" height="50"></sy-switch>
        </div>
      </div>
      <div class="desc">
        &lt;sy-switch v-model='{{checked}}' label-on='开启' label-off='关闭' bg-color-on="#28d21e" bg-color-off="#fa3246" width="300" height="50"/&gt;
      </div>
    </div>

    <div class="example">
      <div class="row">
        <div class="label">标签文字大小</div>
        <div class="input">
          <sy-switch v-model="checked" label-on="开启" label-off="关闭" bg-color-on="#28d21e" bg-color-off="#fa3246" size="200,50" width="300" height="50" label-font-size="50"></sy-switch>
        </div>
      </div>
      <div class="desc">
        &lt;sy-switch v-model='{{checked}}' label-on='开启' label-off='关闭' bg-color-on="#28d21e" bg-color-off="#fa3246" width="300" height="50"  label-font-size="50"/&gt;
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  }
}
</script>

<style scoped>
.example-tsy-switch {
  padding: 30px;
}
.example-tsy-switch>.example {
  margin-bottom: 80px;
}

.example-tsy-switch>.example>.row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.example-tsy-switch>.example>.row>.label {
  min-width: 120px;
}
.example-tsy-switch>.example>.row>.input {

}
</style>