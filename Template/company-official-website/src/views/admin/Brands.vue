<template>
     <div class="brands-container">
    <el-card class="card">
      <div class="title">【商品品牌管理】</div>
      <div class="center">
        <!-- 搜索框 -->
        <div class="search-bar">
          <el-input v-model="searchQuery" placeholder="请输入品牌名称" clearable class="search-input"></el-input>
          <el-button type="primary" @click="searchBrands" class="search-button">搜索</el-button>
          <el-button type="success" @click="showAddBrandDialog" class="search-button">新增品牌</el-button>
        </div>
        <!-- 列表 -->
        <el-table :data="brands" style="width: 100%" stripe class="brand-table">
          <el-table-column prop="name" sortable label="品牌名称"></el-table-column>
          <el-table-column prop="description" sortable label="品牌描述"></el-table-column>
          <el-table-column label="品牌Logo">
            <template slot-scope="scope">
              <el-image v-if="scope.row.logo" :src="scope.row.logo" :preview-src-list="[scope.row.logo]"
                @error="handleImageError" style="width: 80px; height: 80px;" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click="editBrand(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="confirmDeleteBrand(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalBrands"
          class="pagination">
        </el-pagination>
      </div>
    </el-card>
      <!-- 新增品牌弹窗 -->
      <el-dialog title="新增品牌" :visible.sync="addBrandDialogVisible">
        <el-form :model="newBrand" :rules="rules" ref="newBrandForm" label-position="top">
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="newBrand.name"></el-input>
          </el-form-item>
          <el-form-item label="品牌描述" prop="description">
            <el-input type="textarea" v-model="newBrand.description"></el-input>
          </el-form-item>
          <el-form-item label="品牌Logo" prop="logo">
            <el-input v-model="newBrand.logo"></el-input>
            <el-upload ref="uploadLogo" class="upload-demo" :action="uploadUrl" :before-upload="beforeUploadLogo"
              :on-success="handleLogoUploadSuccess" :show-file-list="false">
              <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addBrandDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('newBrandForm')">确定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑品牌弹窗 -->
      <el-dialog title="编辑品牌" :visible.sync="editBrandDialogVisible">
        <el-form :model="currentBrand" :rules="rules" ref="editBrandForm" label-position="top">
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="currentBrand.name"></el-input>
          </el-form-item>
          <el-form-item label="品牌描述" prop="description">
            <el-input type="textarea" v-model="currentBrand.description"></el-input>
          </el-form-item>
          <el-form-item label="品牌Logo" prop="logo">
            <el-input v-model="currentBrand.logo"></el-input>
            <el-upload ref="uploadLogo" class="upload-demo" :action="uploadUrl" :before-upload="beforeUploadLogo"
              :on-success="handleLogoUploadSuccess" :show-file-list="false">
              <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editBrandDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditForm('editBrandForm')">确定</el-button>
        </div>
      </el-dialog>
      <!-- 删除确认弹窗 -->
      <el-dialog title="确认删除" :visible.sync="deleteBrandDialogVisible">
        <span>你确定要删除这个品牌吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteBrandDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deleteBrand">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="imageDialogVisible" width="30%">
      <img :src="currentImage" style="width: 100%;" />
    </el-dialog>
    </div>
  </template>
  
  <script>
  import { addBrand, getBrandsPaged, deleteBrandById, updateBrand, searchBrandsByName, uploadFile } from '@/api/index.js';
  import { baseUrl } from '@/config/index';
  
  export default {
    name: 'Brands',
    data() {
      return {
        searchQuery: '',
        brands: [],
        currentPage: 1,
        pageSize: 10,
        totalBrands: 0,
        addBrandDialogVisible: false,
        editBrandDialogVisible: false,
        deleteBrandDialogVisible: false,
        newBrand: {
          name: '',
          description: '',
          logo: ''
        },
        currentBrand: {},
        brandToDelete: null,
        rules: {
          name: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
          description: [{ required: true, message: '请输入品牌描述', trigger: 'blur' }],
          logo: [{ required: true, message: '请输入品牌Logo', trigger: 'blur' }]
        },
        uploadUrl: '/api/v1/fileUpload/upload', 
        imageDialogVisible: false,
        currentImage: ''
      };
    },
    mounted() {
      this.fetchBrands();
    },
    methods: {
      async fetchBrands() {
        try {
          const response = await getBrandsPaged(this.currentPage - 1, this.pageSize, 'id');
          if (response.code === 0) {
            this.brands = response.data; // 确保数据绑定到 brands 变量上
            this.totalBrands = response.data.length; // 更新 totalBrands
          } else {
            this.$message.error('获取品牌列表失败: ' + response.message);
          }
        } catch (error) {
          this.$message.error('获取品牌列表失败: ' + error.message);
        }
      },
      async searchBrands() {
        try {
          const response = await searchBrandsByName(this.searchQuery);
          if (response.code === 0) {
            this.brands = response.data; // 确保数据绑定到 brands 变量上
            this.totalBrands = response.data.length; // 更新 totalBrands
          } else {
            this.$message.error('搜索品牌失败: ' + response.message);
          }
        } catch (error) {
          this.$message.error('搜索品牌失败: ' + error.message);
        }
      },
      handlePageChange(page) {
        this.currentPage = page;
        this.fetchBrands();
      },
      showAddBrandDialog() {
        this.addBrandDialogVisible = true;
      },
      async addBrand() {
        try {
          const response = await addBrand(this.newBrand);
          if (response.code === 0) {
            this.$message.success('新增品牌成功');
            this.addBrandDialogVisible = false;
            this.fetchBrands();
          } else {
            this.$message.error('新增品牌失败: ' + response.message);
          }
        } catch (error) {
          this.$message.error('新增品牌失败: ' + error.message);
        }
      },
      async editBrand(brand) {
        this.currentBrand = { ...brand };
        this.editBrandDialogVisible = true;
      },
      async submitEditForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            try {
              const response = await updateBrand(this.currentBrand);
              if (response.code === 0) {
                this.$message.success('编辑品牌成功');
                this.editBrandDialogVisible = false;
                this.fetchBrands();
              } else {
                this.$message.error('编辑品牌失败: ' + response.message);
              }
            } catch (error) {
              this.$message.error('编辑品牌失败: ' + error.message);
            }
          } else {
            this.$message.error('请填写完整的品牌信息');
          }
        });
      },
      confirmDeleteBrand(brand) {
        this.brandToDelete = brand;
        this.deleteBrandDialogVisible = true;
      },
      async deleteBrand() {
        try {
          const response = await deleteBrandById(this.brandToDelete.id);
          if (response.code === 0) {
            this.$message.success('删除品牌成功');
            this.deleteBrandDialogVisible = false;
            this.fetchBrands();
          } else {
            this.$message.error('删除品牌失败: ' + response.message);
          }
        } catch (error) {
          this.$message.error('删除品牌失败: ' + error.message);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addBrand();
          } else {
            this.$message.error('请填写完整的品牌信息');
          }
        });
      },
      handleLogoUploadSuccess(response) {
        if (response.code === 0) {
          const logoUrl = `${baseUrl}/v1/getLatestImage?fileName=${response.data}`;
          if (this.addBrandDialogVisible) {
            this.newBrand.logo = logoUrl;
          } else if (this.editBrandDialogVisible) {
            this.currentBrand.logo = logoUrl;
          }
          this.$message.success('图片上传成功');
        } else {
          if (response.code === 401) {
            this.$message.error('登录超时，请重新登录');
          } else {
            this.$message.error('图片上传失败: ' + response.message);
          }
        }
      },
      beforeUploadLogo(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', window.localStorage.getItem('SET_NAME'));// 获取storage中SET_NAME的值
        formData.append('type', 'logo');
        this.uploadFile(formData);
        return false; // 阻止 el-upload 的默认上传行为
      },
      async uploadFile(formData) {
        try {
          const response = await uploadFile(formData);
          this.handleLogoUploadSuccess(response);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.$message.error('登录超时，请重新登录');
          } else {
            this.$message.error('图片上传失败: ' + error.message);
          }
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
  .card {
  min-height: 500px;

  .title {
    width: 200px;
  }
}

.search-bar {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.search-input {
  margin-right: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
}

.search-button {
  margin-right: 5px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .card .title {
    width: 100%;
  }

  .search-input,
  .search-button {
    width: 100%;
    margin-right: 0;
  }
}
  </style>