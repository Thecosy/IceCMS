<template>
  <div class="not-found">
    <img src="@/assets/img/404.png" alt="" width="100%" />
    <div class="msg">抱歉，你访问的页面不存在</div>
    <div class="seconds">{{ seconds }} 秒后将跳转改成首页</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seconds: 5,
    };
  },
  mounted() {
    // 判断是否在客户端
    if (process.client) {
      setInterval(() => {
        this.seconds = this.seconds - 1;
        if (this.seconds >= 0) {
          location.href = "/";
        }
      }, 1000);
    }
  },
};
</script>
<style scoped lang="less">
.not-found {
  background: #fff;
  height: 100%;
  padding-bottom: 200px;
  .msg,
  .seconds {
    text-align: center;
  }
}
</style>