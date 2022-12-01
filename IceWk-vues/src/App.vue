<template>
  <div id="app">
    <!--$route.fullpath: Vue.js当前页面跳转当前页面 -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "./static/mycss/top.css";
  @import "./static/mycss/body.css";
</style>