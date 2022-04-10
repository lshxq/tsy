<template>
<div>
  <div class="h1">左右布局 sy-left-right</div>
  <sy-left-right>
    <div slot='left'>left content</div>
    <div slot='right'>right content</div>
  </sy-left-right>
  <div class='mt30'>我们市场会遇到左右布局的场合，比如标题栏左面是icon，右面是button，每次都写相同的样式很烦，做一个组件，提供 left和right的两个slot</div>
</div>
</template>