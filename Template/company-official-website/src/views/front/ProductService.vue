<template>
	<div>
		<TubelightNav/>
		<Banner/>
		<div class="container">
			<el-breadcrumb separator="/" class="top">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>产品与服务</el-breadcrumb-item>
			</el-breadcrumb>
			<el-card class="top">
				<div class="left">
					<!-- 产品横向逐一展示 -->
					<div v-for="product in products" :key="product.id" class="product-card">
						<img :src="product.coverImage" alt="暂无图片" class="product-image"/>
						<p>品牌：{{ product.brand }}</p>
						<p>名称：{{ product.name }}</p>
						<el-button type="primary" @click="viewDetails(product.id)">查看详情</el-button>
					</div>
				</div>
			</el-card>
		</div>
		<Footer class="top"/>
	</div>
</template>

<script>
import Banner from './components/Banner'
import TubelightNav from './components/TubelightNav.vue'
import Footer from './components/Footer.vue'
import { getAllProducts } from '@/api/index.js'

export default {
    name: 'ProductService',
    components: {TubelightNav, Footer, Banner},

    data() {
        return {
            products: []
        };
    },

    mounted() {
        this.fetchProducts();
    },

    methods: {
      fetchProducts() {
        getAllProducts().then(response => {
                this.products = response.data; // 访问response.data
            }).catch(error => {
                console.error('Failed to fetch products:', error);
            });
        },
        viewDetails(id) {
          this.$router.push({ name: 'ProductDetail', params: { id } });
        }
    },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure the page takes at least the full height of the viewport
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
}

.container {
  flex: 1; // Allow the container to grow and fill available space
  margin-top: 150px; // 增加导航栏与内容的距离
  margin-bottom: 100px; // Add space between container and footer
  
  @media (max-width: 768px) {
    margin-top: 130px;
  }
}

.left {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: 200px;
  border: 1px solid #e1e1e1;
  padding: 10px;
  text-align: center;
}

.product-image {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .product-card {
    width: 100%;
  }
}

@media (min-width: 769px) {
  .product-card {
    width: calc(33.33% - 20px);
    margin-right: 20px;
  }

  .left {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>