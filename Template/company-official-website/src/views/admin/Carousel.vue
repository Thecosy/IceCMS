<template>
  <div class="carousel-container">
    <el-card class="card">
      <div class="title">【轮播图管理】</div>
      <div class="center">
        <!-- 搜索栏 -->
        <div class="search-bar">
          <el-input v-model="searchQuery" placeholder="请输入轮播图标题" class="search-input"></el-input>
          <el-button type="primary" @click="searchCarousels" class="search-button">搜索</el-button>
          <el-button type="success" @click="showAddCarouselDialog" class="search-button">新增轮播图</el-button>
        </div>
        
        <!-- 轮播图列表 -->
        <el-table :data="carousels" style="width: 100%" stripe class="carousel-table">
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 50px"
                :src="scope.row.imageUrl"
                fit="cover"
                @click="showImageDialog(scope.row.imageUrl)"
                :preview-src-list="[scope.row.imageUrl]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="order" label="排序" sortable></el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click="editCarousel(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="confirmDeleteCarousel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalCarousels"
          class="pagination">
        </el-pagination>
      </div>
    </el-card>

    <!-- 新增轮播图弹窗 -->
    <el-dialog title="新增轮播图" :visible.sync="addCarouselDialogVisible">
      <el-form :model="newCarousel" :rules="rules" ref="newCarouselForm" label-position="top">
        <el-form-item label="标题" prop="title">
          <el-input v-model="newCarousel.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="imageUrl">
          <el-input v-model="newCarousel.imageUrl"></el-input>
          <el-upload
            ref="uploadImage"
            class="upload-demo"
            :action="uploadUrl"
            :before-upload="beforeUploadImage"
            :on-success="handleImageUploadSuccess"
            :show-file-list="false">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="newCarousel.order" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCarouselDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('newCarouselForm')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑轮播图弹窗 -->
    <el-dialog title="编辑轮播图" :visible.sync="editCarouselDialogVisible">
      <el-form :model="currentCarousel" :rules="rules" ref="editCarouselForm" label-position="top">
        <el-form-item label="标题" prop="title">
          <el-input v-model="currentCarousel.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="imageUrl">
          <el-input v-model="currentCarousel.imageUrl"></el-input>
          <el-upload
            ref="uploadImage"
            class="upload-demo"
            :action="uploadUrl"
            :before-upload="beforeUploadImage"
            :on-success="handleImageUploadSuccess"
            :show-file-list="false">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="currentCarousel.order" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCarouselDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEditForm('editCarouselForm')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 删除确认弹窗 -->
    <el-dialog title="确认删除" :visible.sync="deleteCarouselDialogVisible">
      <span>你确定要删除这个轮播图吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteCarouselDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteCarousel">确定</el-button>
      </div>
    </el-dialog>

    <!-- 图片预览弹窗 -->
    <el-dialog :visible.sync="imageDialogVisible" width="30%">
      <img :src="currentImage" style="width: 100%;" />
    </el-dialog>
  </div>
</template>

<script>
import { getSwiperList, addCarousel, deleteCarouselById, updateCarousel, uploadFile } from '@/api/index.js';
import { baseUrl } from '@/config/index';

export default {
  name: 'Carousel',
  data() {
    return {
      searchQuery: '',
      carousels: [],
      currentPage: 1,
      pageSize: 10,
      totalCarousels: 0,
      addCarouselDialogVisible: false,
      editCarouselDialogVisible: false,
      deleteCarouselDialogVisible: false,
      newCarousel: {
        imageUrl: '',
        redirectUrl: '',
        isEnabled: true,
        order: 1
      },
      currentCarousel: {},
      carouselToDelete: null,
      rules: {
        title: [{ required: true, message: '请输入轮播图标题', trigger: 'blur' }],
        imageUrl: [{ required: true, message: '请上传轮播图图片', trigger: 'blur' }],
        order: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      uploadUrl: '/api/v1/fileUpload/upload',
      imageDialogVisible: false,
      currentImage: ''
    };
  },
  mounted() {
    this.fetchCarousels();
  },
  methods: {
    async fetchCarousels() {
      try {
        const response = await getSwiperList();
        if (response.code === 0) {
          this.carousels = response.data;
          this.totalCarousels = response.data.length;
        } else {
          this.$message.error('获取轮播图列表失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('获取轮播图列表失败: ' + error.message);
      }
    },
    searchCarousels() {
      // 由于没有专门的搜索接口，我们在前端进行过滤
      this.carousels = this.carousels.filter(carousel => 
        carousel.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    handlePageChange(page) {
      this.currentPage = page;
      // 由于没有分页接口，这里暂时不做处理
    },
    showAddCarouselDialog() {
      this.addCarouselDialogVisible = true;
    },
    async addCarousel() {
      try {
        const response = await addCarousel(this.newCarousel);
        if (response.code === 0) {
          this.$message.success('新增轮播图成功');
          this.addCarouselDialogVisible = false;
          this.fetchCarousels();
        } else {
          this.$message.error('新增轮播图失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('新增轮播图失败: ' + error.message);
      }
    },
    editCarousel(carousel) {
      this.currentCarousel = { ...carousel };
      this.editCarouselDialogVisible = true;
    },
    async submitEditForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await updateCarousel(this.currentCarousel);
            if (response.code === 0) {
              this.$message.success('编辑轮播图成功');
              this.editCarouselDialogVisible = false;
              this.fetchCarousels();
            } else {
              this.$message.error('编辑轮播图失败: ' + response.message);
            }
          } catch (error) {
            this.$message.error('编辑轮播图失败: ' + error.message);
          }
        } else {
          this.$message.error('请填写完整的轮播图信息');
        }
      });
    },
    confirmDeleteCarousel(carousel) {
      this.carouselToDelete = carousel;
      this.deleteCarouselDialogVisible = true;
    },
    async deleteCarousel() {
      try {
        const response = await deleteCarouselById(this.carouselToDelete.id);
        if (response.code === 0) {
          this.$message.success('删除轮播图成功');
          this.deleteCarouselDialogVisible = false;
          this.fetchCarousels();
        } else {
          this.$message.error('删除轮播图失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('删除轮播图失败: ' + error.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addCarousel();
        } else {
          this.$message.error('请填写完整的轮播图信息');
        }
      });
    },
    handleImageUploadSuccess(response) {
      if (response.code === 0) {
        const imageUrl = `${baseUrl}/v1/getLatestImage?fileName=${response.data}`;
        if (this.addCarouselDialogVisible) {
          this.newCarousel.imageUrl = imageUrl;
        } else if (this.editCarouselDialogVisible) {
          this.currentCarousel.imageUrl = imageUrl;
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
    beforeUploadImage(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', window.localStorage.getItem('SET_NAME'));
      formData.append('type', 'carousel');
      this.uploadFile(formData);
      return false;
    },
    async uploadFile(formData) {
      try {
        const response = await uploadFile(formData);
        this.handleImageUploadSuccess(response);
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
.carousel-container {
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

.carousel-table {
  margin-bottom: 20px;
}

.pagination {
  text-align: center;
}

@media (max-width: 768px) {
  .carousel-container {
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