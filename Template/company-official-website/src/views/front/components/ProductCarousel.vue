<template>
    <div class="product-carousel">
      <el-carousel arrow="always">
        <el-carousel-item v-for="item in products" :key="item.id">
          <el-card @click.native="goToProductDetail(item.id)" class="product-card">
            <img :src="item.image" class="product-image" @error="handleImageError" />
            <div class="product-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>
  
  <script>
  import { getProductCarouselById } from '@/api/index'; // 从 index.js 导入 getProducts 函数
  
  export default {
    name: 'ProductCarousel',
    data() {
      return {
        products: []
      };
    },
    async created() {
       // 获取横向商品列表
        const response = await getProductCarouselById(1);
        this.products = response.data; // 访问response.data
        },
    methods: {
      goToProductDetail(id) {
        this.$router.push({ name: 'ProductDetail', params: { id } });
      },
      handleImageError(event) {
        console.error('图片加载失败:', event.target.src);
        event.target.src = require('@/assets/product/default.jpg'); // 替换为默认图片路径
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
.product-carousel {
  .product-card {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 300px;
    padding: 10px;
  }

  .product-info {
    h3 {
      font-size: 1.2em;
    }
    p {
      font-size: 1em;
    }
  }

  @media (max-width: 768px) {
    .product-card {
      padding: 5px;
    }
    .product-info {
      h3 {
        font-size: 1em;
      }
      p {
        font-size: 0.8em;
      }
    }
  }

  @media (max-width: 480px) {
    .product-card {
      padding: 5px;
    }
    .product-info {
      h3 {
        font-size: 1em;
      }
      p {
        font-size: 0.8em;
      }
    }
  }
}
</style>