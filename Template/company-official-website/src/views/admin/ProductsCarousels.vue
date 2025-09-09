<template>
  <div>
    <el-card class="card">
      <div class="title">【横向商品配置】</div>
      <div class="center">
        <!-- <img src="@/assets/avatar.png" width="100px" height="100px" alt=""> -->
      </div>
      <el-form :model="form" @submit.native.prevent="addProductToCarousel">
        <el-form-item label="选择商品">
          <el-select v-model="form.selectedProduct" placeholder="请选择商品">
            <el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addProductToCarousel">添加</el-button>
        </el-form-item>
      </el-form>
      <div v-if="carouselItems.length">
        <!-- <h3>已添加到轮播图的商品：</h3> -->
        <el-table :data="carouselItems" style="width: 100%">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="coverImage" label="商品图片">
            <template #default="scope">
              <el-image :src="scope.row.coverImage" style="width: 50px; height: 50px;" fit="cover" alt="商品图片" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="danger" @click="removeProductFromCarousel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增的保存配置按钮 -->
      <div class="save-button">
        <el-button type="success" @click="saveCarouselConfig">保存配置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAllProducts, getAllProductsCarousel,getProductCarouselById, deleteProductsCarousel, saveProductsCarousel, updateProductsCarousel } from '@/api/index.js';


export default {
  name: 'ProductsCarousels',
  data() {
    return {
      form: {
        selectedProduct: null,
      },
      products: [], // 商品数据
      carouselItems: [], // 轮播图中的商品
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await getAllProducts();
        if (response.code === 0) {
          this.products = response.data;
        } else {
          this.$message.error('获取商品数据失败: ' + response.message);
        }
      } catch (error) {
        console.error('获取商品数据失败:', error);
        this.$message.error('获取商品数据失败');
      }
    },
    addProductToCarousel() {
      if (this.form.selectedProduct) {
        const selectedProduct = this.products.find(product => product.id === this.form.selectedProduct);
        if (selectedProduct && !this.carouselItems.some(item => item.id === selectedProduct.id)) {
          this.carouselItems.push(selectedProduct);
          console.log('添加商品ID:', this.form.selectedProduct);
        } else {
          this.$message.error('该商品已在轮播图中');
        }
      } else {
        this.$message.error('请选择一个商品');
      }
    },
    async removeProductFromCarousel(productId) {
      // 直接从 carouselItems 中删除，不调用后端接口
      this.carouselItems = this.carouselItems.filter(item => item.id !== productId);
      this.$message.success('商品已从轮播图中删除');
    },
    // 新增的保存配置方法
    async saveCarouselConfig() {
      console.log('准备保存配置，当前商品ID:', this.carouselItems.map(item => item.id)); // 调试信息
      try {
        const response = await updateProductsCarousel({
          id: 1, // 假设只有一条数据，ID 为 1
          products: this.carouselItems.map(item => item.id) // 提取当前商品的 ID
        });
        console.log('保存配置响应:', response); // 调试信息
        if (response.code === 0) {
          this.$message.success('轮播图配置已保存');
        } else {
          this.$message.error('保存配置失败: ' + response.message);
        }
      } catch (error) {
        console.error('保存配置失败:', error);
        this.$message.error('保存配置失败');
      }
    },
    // 新增的获取当前轮播图配置的方法
    async fetchCarouselConfig() {
      // 实现获取当前轮播图配置的逻辑
      console.log('获取当前轮播图配置');
      try {
        const response = await getProductCarouselById(1); // 假设ID为1
        if (response.code === 0) {
          this.carouselItems = response.data.products; // 假设返回的数据结构中有products
        } else {
          this.$message.error('获取轮播图配置失败: ' + response.message);
        }
      } catch (error) {
        console.error('获取轮播图配置失败:', error);
        this.$message.error('获取轮播图配置失败');
      }
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchCarouselConfig(); // 获取当前轮播图配置
  },
};
</script>

<style lang="scss" scoped>
.card {
  min-height: 500px;

  .title {
    width: 100%;
    max-width: 200px;
  }
}

.save-button {
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .card .title {
    max-width: 100%;
  }
}
</style>