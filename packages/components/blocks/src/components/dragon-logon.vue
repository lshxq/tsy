<template>
  <div class="dragon-logon-main"></div>
</template>

<style scoped>
.dragon-logon-main {
  display: inline-block;
  margin: 30px;
  background: url(../../../../assets/images/blocks.png) no-repeat left center;
  width: 100px;
  height: 100px;
  animation: block-pause-dragon infinite 10s steps(11);
}

@keyframes block-pause-dragon {
  0% {
    background-position: 0 -99px;
  }
  10% {
    background-position: -99px -100px;
  }
  20%{
    background-position: -199% -100px;
  }
  30%{
    background-position: -299px -100px;
  }
  40%{
    background-position: -199px -100px;
  }
  50% {
    background-position: -99px -100px;
  }
  60% {
    background-position: 0 -100px;
  }
  70% {
    background-position: 0 -100px;
  }
  80% {
    background-position: 0 -100px;
  }
  90% {
    background-position: 0 -100px;
  }
  100% {
    background-position: 0 -100px;
  }
}
</style>