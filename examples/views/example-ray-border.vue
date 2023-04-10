<template>
  <div class="example-ray-border-main">
    <sy-ray-border :width="300" :height="500" color1="blue" color2="orange">
      <div class="content-panel">
        <h1>23</h1>
      </div>
    </sy-ray-border>
  </div>
</template>


<style scoped>
.example-ray-border-main {
  padding: 100px;
}
.content-panel {
  display: flex;
  background: red;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.content-panel>h1 {
  font-size: 140px;
  color: black;
  -webkit-text-stroke: 4px white;
}
</style>