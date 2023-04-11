<template>
  <div class="example-ray-border-main">
    <sy-ray-border :radius="5" :width="300" :height="500" color1="#e6f03c,#faf01e,#50befa,transparent" color2="#d232fa,#aab4f0,#f0c8fa,transparent">
      <div class="content-panel">
        <h1>23</h1>
      </div>
    </sy-ray-border>

    <div class="mt30">
      &lt;sy-ray-border :radius="5" :width="300" :height="500" color1="#e6f03c,#faf01e,#50befa,transparent" color2="#d232fa,#aab4f0,#f0c8fa,transparent"&gt;&lt;/sy-ray-border&gt;
      用这个面包保住，就可以个获得一个电光边框
    </div>
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
  user-select: none;
}

.content-panel>h1 {
  font-size: 140px;
  color: black;
  -webkit-text-stroke: 4px white;
}
</style>