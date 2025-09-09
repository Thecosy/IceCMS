<template>
	<div>
		<el-card class="card">
			<div class="title"> 【瀑布流商品配置】</div>
			<div class="center">
				<!-- <img src="@/assets/avatar.png" width="100px" height="100px" alt=""> -->
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
    name: '',
    props: {},
    watch: {},
    data() {
        return {};
    },

    mounted() {

    },

    created() {
    },

    methods: {},
};

</script>
<style lang="scss" scoped>
.card {
  min-height: 500px;

  .title {
    width: 200px;
    // background: linear-gradient(to right, #1E6BDC, #FFFEFF);
  }

  @media (max-width: 768px) {
    .title {
      width: 80px;
    }
  }

  @media (max-width: 480px) {
    .title {
      width: 60px;
    }
  }
}
</style>
