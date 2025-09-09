<template>
 <div class="products-container">
    <el-card class="card">
      <div class="title">【商品管理】</div>
      <div class="center">
        <!-- 搜索栏 -->
        <div class="search-bar">
          <el-input v-model="searchQuery" placeholder="请输入商品名称" class="search-input"></el-input>
          <el-button type="primary" @click="searchProducts" class="search-button">搜索</el-button>
          <el-button type="success" @click="showAddProductDialog" class="search-button">新增商品</el-button>
        </div>
        
        <!-- 商品列表 -->
        <el-table :data="products" style="width: 100%" stripe class="product-table">
          <el-table-column prop="name" label="商品名称" sortable></el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.coverImage"
                fit="cover"
                @click="showImageDialog(scope.row.coverImage)"
                :preview-src-list="[scope.row.coverImage]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="salePrice" label="售价" sortable></el-table-column>
          <el-table-column prop="stockQuantity" label="库存" sortable></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="viewProduct(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="confirmDeleteProduct(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalProducts"
          class="pagination"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 新增商品弹窗 -->
    <el-dialog title="新增商品" :visible.sync="addProductDialogVisible">
      <el-form :model="newProduct" :rules="rules" ref="newProductForm" label-position="top">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="newProduct.name"></el-input>
        </el-form-item>
        <el-form-item label="商品封面图片" prop="coverImage">
          <el-input v-model="newProduct.coverImage"></el-input>
          <el-upload ref="uploadCover" class="upload-demo" :action="uploadUrl" :before-upload="beforeUploadCover"
            :on-success="handleCoverUploadSuccess" :show-file-list="false">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品详情图片" prop="detailImages">
          <el-upload ref="uploadDetail" class="upload-demo" :action="uploadUrl" :before-upload="beforeUploadDetail"
            :on-success="handleDetailUploadSuccess" list-type="picture-card" :file-list="detailImageList"
            :on-remove="handleDetailRemove">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" v-model="newProduct.description"></el-input>
        </el-form-item>
        <el-form-item label="销售价格" prop="salePrice">
          <el-input v-model="newProduct.salePrice"></el-input>
        </el-form-item>
        <el-form-item label="成本价格" prop="costPrice">
          <el-input v-model="newProduct.costPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stockQuantity">
          <el-input v-model="newProduct.stockQuantity"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌" prop="brand">
          <el-select v-model="newProduct.brand" placeholder="请选择品牌">
            <el-option v-for="brand in brands" :key="brand.id" :label="brand.name" :value="brand.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类ID" prop="categoryId">
          <el-select v-model="newProduct.categoryId" placeholder="请选择分类">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProductDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('newProductForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 查看商品弹窗 -->
    <el-dialog title="查看商品" :visible.sync="viewProductDialogVisible">
      <el-form :model="currentProduct" label-position="top">
        <el-form-item label="商品名称">
          <el-input v-model="currentProduct.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品封面图片地址">
          <el-input v-model="currentProduct.coverImage" readonly></el-input>
        </el-form-item>
        <el-form-item label="商品封面图片">
          <el-image :src="currentProduct.coverImage" alt="商品封面图片" style="width: 100px; height: 100px;" />
        </el-form-item>
        <el-form-item label="商品详情图片地址">
          <div v-for="(image, index) in currentProduct.detailImages" :key="index" style="margin-bottom: 10px;">
            <el-input :value="image" readonly></el-input>
          </div>
        </el-form-item>
        <el-form-item label="商品详情图片">
          <div v-for="(image, index) in currentProduct.detailImages" :key="index"
            style="display: inline-block; margin-right: 10px;">
            <el-image :src="image" alt="商品详情图片" style="width: 100px; height: 100px;" />
          </div>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="currentProduct.description" disabled></el-input>
        </el-form-item>
        <el-form-item label="销售价格">
          <el-input v-model="currentProduct.salePrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="成本价格">
          <el-input v-model="currentProduct.costPrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="currentProduct.stockQuantity" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-input v-model="currentProduct.brand" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品分类ID">
          <el-input v-model="currentProduct.categoryId" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewProductDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 删除确认弹窗 -->
    <el-dialog title="确认删除" :visible.sync="deleteProductDialogVisible">
      <span>你确定要删除这个商品吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteProductDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteProduct">确定</el-button>
      </div>
    </el-dialog>
     <!-- 图片查看弹窗 -->
     <el-dialog :visible.sync="imageDialogVisible" width="30%">
      <img :src="currentImage" style="width: 100%;" />
    </el-dialog>
  </div>
</template>
  
<script>
import { deleteProductById, getProductById, getProductCarousel, getProductCategories, getBrands, addProduct, uploadFile, getProductsPaged, searchProductsByName } from '@/api/index.js';
import { baseUrl } from '@/config/index';

export default {
  name: 'Products',
  data() {
    return {
      searchQuery: '',// 搜索框的值
      products: [],// 商品列表
      currentPage: 1,// 当前页
      pageSize: 10,// 每页显示的数量
      totalProducts: 0,// 总商品数
      addProductDialogVisible: false,// 新增商品弹窗是否显示
      newProduct: { // 新增商品的数据
        name: '',
        coverImage: '',
        detailImages: [],
        description: '',
        salePrice: '',
        costPrice: '',
        stockQuantity: '',
        brand: null,
        categoryId: null,
      },
      categories: [],// 商品分类列表
      brands: [],// 商品品牌列表
      uploadUrl: '/api/v1/fileUpload/upload', // 修改为相对路径
      detailImageList: [],// 商品详情图片列表
      rules: {  // 表单验证规则
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        coverImage: [{ required: true, message: '请上传商品封面图片', trigger: 'change' }],
        detailImages: [{ required: true, message: '请上传商品详情图片', trigger: 'change' }],
        description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        salePrice: [{ required: true, message: '请输入销售价格', trigger: 'blur' }],
        costPrice: [{ required: true, message: '请输入成本价格', trigger: 'blur' }],
        stockQuantity: [{ required: true, message: '请输入库存数量', trigger: 'blur' }],
        brand: [{ required: true, message: '请选择商品品牌', trigger: 'change' }],
        categoryId: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
      },
      viewProductDialogVisible: false,// 查看商品弹窗是否显示
      deleteProductDialogVisible: false, // 删除商品弹窗是否显示
      currentProduct: {},// 当前商品
      productToDelete: null,// 要删除的商品
      imageDialogVisible: false,// 图片查看弹窗是否显示
       currentImage: ''// 用于存储当前要查看的图片
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchBrands();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await getProductsPaged(this.currentPage - 1, this.pageSize, 'id');
        if (response.code === 0) {
          this.products = response.data.products;
          this.totalProducts = response.data.total;
          console.log('商品列表:', response.data.products);
        } else {
          this.$message.error('获取商品列表失败: ' + response.message);
          console.log('商品列表失败:', response.message);
        }
      } catch (error) {
        this.$message.error('获取商品列表失败: ' + error.message);
      }
    },
    fetchCategories() {
      getProductCategories().then(response => {
        if (response.code === 0) {
          this.categories = response.data;
        } else {
          this.$message.error('获取商品分类失败: ' + response.message);
        }
      }).catch(error => {
        console.error('获取商品分类失败:', error);
      });
    },
    fetchBrands() {
      getBrands().then(response => {
        if (response.code === 0) {
          this.brands = response.data;
        } else {
          this.$message.error('获取品牌数据失败: ' + response.message);
        }
      }).catch(error => {
        console.error('获取品牌数据失败:', error);
      });
    },
    async searchProducts() {
      try {
        const response = await searchProductsByName(this.searchQuery);
        if (response.code === 0) {
          this.products = response.data;
          this.totalProducts = response.data.length;
          console.log('搜索结果:', response.data);
        } else {
          this.$message.error('搜索失败: ' + response.message);
          console.log('搜索失败:', response.message);
        }
      } catch (error) {
        this.$message.error('搜索失败: ' + error.message);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchProducts();
    },
    showAddProductDialog() {
      this.addProductDialogVisible = true;
    },
    async addProduct() {
      try {
        const response = await addProduct(this.newProduct);
        if (response.code === 0) {
          this.$message.success(response.message);
          this.addProductDialogVisible = false;
          this.fetchProducts(); // 重新获取商品列表
        } else {
          this.$message.error('新增失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('新增失败: ' + error.message);
      }
    },
    handleCoverUploadSuccess(response) {
      if (response.code === 0) {
        this.newProduct.coverImage = `${baseUrl}/v1/getLatestImage?fileName=${response.data}`;
        this.$message.success('图片上传成功');
      } else {
        if (response.code === 401) {
          this.$message.error('登录超时，请重新登录');
        } else {
          this.$message.error('图片上传失败: ' + response.message);
        }
      }
    },
    handleDetailUploadSuccess(response) {
      if (response.code === 0) {
        const imageUrl = `${baseUrl}/v1/getLatestImage?fileName=${response.data}`;
        this.newProduct.detailImages.push(imageUrl);
        this.detailImageList.push({ name: response.data, url: imageUrl });
        this.$message.success('图片上传成功');
        console.log('商品详情图片数组:', this.newProduct.detailImages); // 调试输出
      } else {
        if (response.code === 401) {
          this.$message.error('登录超时，请重新登录');
        } else {
          this.$message.error('图片上传失败: ' + response.message);
        }
      }
    },
    handleDetailRemove(file) {
      const index = this.newProduct.detailImages.indexOf(file.url);
      if (index !== -1) {
        this.newProduct.detailImages.splice(index, 1);
        this.detailImageList.splice(index, 1);
      }
    },
    beforeUploadCover(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', window.localStorage.getItem('SET_NAME'));// 获取storage中SET_NAME的值
      formData.append('type', 'cover');
      this.uploadFile(formData);
      return false; // 阻止 el-upload 的默认上传行为
    },
    beforeUploadDetail(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', window.localStorage.getItem('SET_NAME'));// 获取storage中SET_NAME的值
      formData.append('type', 'detail');
      this.uploadFile(formData);
      return false; // 阻止 el-upload 的默认上传行为
    },
    async uploadFile(formData) {
      try {
        const response = await uploadFile(formData);
        if (formData.get('type') === 'cover') {
          this.handleCoverUploadSuccess(response);
        } else {
          this.handleDetailUploadSuccess(response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$message.error('登录超时，请重新登录');
        } else {
          this.$message.error('图片上传失败: ' + error.message);
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addProduct();
        } else {
          this.$message.error('请填写完整的商品信息');
          return false;
        }
      });
    },
    viewProduct(product) {
      // 实现查看商品的逻辑
      this.currentProduct = { ...product, detailImages: product.detailImages || [] };
      this.viewProductDialogVisible = true;
      console.log('查看商品:', product);
    },
    // 确认删除商品
    confirmDeleteProduct(product) {
      this.productToDelete = product;
      this.deleteProductDialogVisible = true;
    },
    async deleteProduct() {
      if (!this.productToDelete) {
        this.$message.error('未选择要删除的商品');
        return;
      }
      try {
        // 实现删除商品的逻辑
        const response = await deleteProductById(this.productToDelete.id);
        if (response.code === 0) {
          this.$message.success('删除成功');
          this.fetchProducts(); // 重新获取商品列表
          this.deleteProductDialogVisible = false;
          this.productToDelete = null; // 重置 productToDelete
        } else {
          this.$message.error('删除失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('删除失败: ' + error.message);
      }
    },
    showImageDialog(imageUrl) {
      this.currentImage = imageUrl;
      this.imageDialogVisible = true;
    }
  }
};
</script>
  
<style lang="scss" scoped>
.products-container {
  padding: 20px;
}

.card {
  min-height: 500px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
  margin-bottom: 10px;
}

.search-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.product-table {
  margin-bottom: 20px;
}

.pagination {
  text-align: center;
}

@media (max-width: 768px) {
  .products-container {
    padding: 10px;
  }

  .search-bar {
    flex-direction: column;
  }

  .search-input,
  .search-button {
    width: 100%;
    margin-right: 0;
  }

  .el-table {
    font-size: 12px;
  }

  .el-button--mini {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>