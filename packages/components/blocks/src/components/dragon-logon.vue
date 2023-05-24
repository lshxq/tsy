<template>
  <div class="dragon-logon-main"></div>
</template>

<style scoped>
.dragon-logon-main {
  display: inline-block;
  background: url(../../../../assets/images/blocks.png) no-repeat left center;
  background-position: 0 -99px;
  width: 100px;
  height: 100px;
  animation: block-pause-dragon infinite 3s steps(3);
  filter: hue-rotate(30deg);
}

.dragon-logon-main:after {
  content: '';
  background: inherit;
  height: 100%;
  display: block;
  filter: drop-shadow(2px 0 0 red);
}

@keyframes block-pause-dragon {
  0% {
    background-position: 0 -99px;
  }
  30%{
    background-position: -299px -99px;
  }
  60% {
    background-position: 0 -99px;
  }
  100% {
    background-position: 0 -99px;
  }
}
</style>