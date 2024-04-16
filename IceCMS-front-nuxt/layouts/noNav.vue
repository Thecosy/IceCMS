<template>
  <div class="nuxt-router">
    <HomeHeader></HomeHeader>
    <div class="router">
      <Nuxt class="nuxt-router" />
    </div>
    <commonFooter></commonFooter>
  </div>
</template>
<script>
export default {
  components: {
    commonFooter: () => import("../components/common/homeFooter.vue"),
    HomeHeader: () => import("../components/common/homeHeader.vue"),
  },
};
</script>
<style lang="less" scoped>
.nuxt-router {
  .router {
    max-width: 1280px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    .nuxt-router {
      width: 100%;
    }
    .layouts-sideBar {
      width: 385px;
    }
  }
  @media screen and (max-width: 1024px) {
    .layouts-sideBar {
      display: none;
    }
  }
}
</style>
