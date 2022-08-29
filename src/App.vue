<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style lang="less">
// 滚动条整体
::-webkit-scrollbar {
  z-index: 50;
  width: 5px;
  height: 3px;
}

// 滚动条滑道
::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

// 滚动滑块样式
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  height: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

// 滚动条的样式，是可以跟 :hover 伪类叠加使用的
// 滚动条鼠标悬浮时的样式
:hover::-webkit-scrollbar-thumb {
  transition: all 0.2s;
}
// 滚动条上下的箭头按钮
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-corner {
  display: none;
}

body {
  margin: 0;
  user-select: none;
  padding: 0;
}
a {
  color: #000000;
  text-decoration: none;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
ul,
ol {
  list-style: none;
}
p,
div {
  margin: 0;
}
#app {
  font-size: 14px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;

  // overflow-x: hidden;
  line-height: 1.5;
  box-sizing: border-box;
  // min-width: 920px;
  // min-height: 560px;
}
</style>
