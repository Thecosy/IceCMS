<template>
  <div id="app">
    <!-- 回到顶部 -->
    <el-backtop :bottom="60"></el-backtop>
    <!-- 路由 -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
  max-width: 100%;
}
body {
  padding-top: 75px; // 根据您的导航栏高度调整这个值
}

@media screen and (max-width: 768px) {
  #app {
    padding: 10px;
  }
}

@media screen and (max-width: 480px) {
  #app {
    padding: 5px;
  }
}
</style>