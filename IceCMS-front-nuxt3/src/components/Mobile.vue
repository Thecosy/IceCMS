<template>
        <div class="mobile-model">
          <div class="layout-min-full-height d-flex justify-content-center align-items-center">
      <div class="text-center content-box">
        <h1 class="title">哇，窗口太小啦</h1>
        <p class="message">请调整浏览器窗口大小或者请使用手机查看！</p>
        <button class="action-button" @click="redirectToMobile">了解更多</button>
      </div>
    </div>
            </div>
</template>
<style lang="css" scoped>
.mobile-model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.6); */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* z-index: 9999; */
}

.layout-min-full-height {
  width: 100%;
  height: 100%;
}

.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-box {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  text-align: center;
  width: 80%;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}

.message {
  font-size: 16px;
  margin-bottom: 30px;
  color: #555;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>

<script>
export default {
  methods: {
    redirectToMobile() {
      window.location.href = 'https://www.example.com'; // 这里可以放置一个跳转链接
    },
  },
};
</script>