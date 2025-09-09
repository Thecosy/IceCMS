<template>
  <div class="certificate-container">
    <el-card class="card">
      <div class="title">【品牌授权证书管理】</div>
      <div class="center">
        <!-- 搜索框 -->
        <div class="search-bar">
          <el-input v-model="searchQuery" placeholder="请输入证书名称" clearable class="search-input"></el-input>
          <el-button type="primary" @click="searchCertificates" class="search-button">搜索</el-button>
          <el-button type="success" @click="showAddCertificateDialog" class="search-button">新增证书</el-button>
        </div>
        <!-- 列表 -->
        <el-table :data="certificates" style="width: 100%" stripe class="certificate-table">
          <el-table-column prop="name" sortable label="证书名称"></el-table-column>
          <el-table-column prop="description" sortable label="证书描述"></el-table-column>
          <el-table-column label="证书图片">
            <template slot-scope="scope">
              <el-image v-if="scope.row.imageUrl" :src="scope.row.imageUrl" :preview-src-list="[scope.row.imageUrl]"
                @error="handleImageError" style="width: 80px; height: 80px;" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click="editCertificate(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="confirmDeleteCertificate(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalCertificates"
          class="pagination">
        </el-pagination>
      </div>
    </el-card>
    <!-- 新增证书弹窗 -->
    <el-dialog title="新增证书" :visible.sync="addCertificateDialogVisible">
      <el-form :model="newCertificate" :rules="rules" ref="newCertificateForm" label-position="top">
        <el-form-item label="证书名称" prop="name">
          <el-input v-model="newCertificate.name"></el-input>
        </el-form-item>
        <el-form-item label="证书描述" prop="description">
          <el-input type="textarea" v-model="newCertificate.description"></el-input>
        </el-form-item>
        <el-form-item label="证书图片" prop="imageUrl">
          <el-input v-model="newCertificate.imageUrl"></el-input>
          <el-upload ref="uploadCertificate" class="upload-demo" :action="uploadUrl"
            :before-upload="beforeUploadCertificate" :on-success="handleCertificateUploadSuccess" :show-file-list="false">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCertificateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('newCertificateForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑证书弹窗 -->
    <el-dialog title="编辑证书" :visible.sync="editCertificateDialogVisible">
      <el-form :model="currentCertificate" :rules="rules" ref="editCertificateForm" label-position="top">
        <el-form-item label="证书名称" prop="name">
          <el-input v-model="currentCertificate.name"></el-input>
        </el-form-item>
        <el-form-item label="证书描述" prop="description">
          <el-input type="textarea" v-model="currentCertificate.description"></el-input>
        </el-form-item>
        <el-form-item label="证书图片" prop="imageUrl">
          <el-input v-model="currentCertificate.imageUrl"></el-input>
          <el-upload ref="uploadCertificate" class="upload-demo" :action="uploadUrl"
            :before-upload="beforeUploadCertificate" :on-success="handleCertificateUploadSuccess" :show-file-list="false">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCertificateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEditForm('editCertificateForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 删除确认弹窗 -->
    <el-dialog title="确认删除" :visible.sync="deleteCertificateDialogVisible">
      <span>你确定要删除这个证书吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteCertificateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteCertificate">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imageDialogVisible" width="30%">
      <img :src="currentImage" style="width: 100%;" />
    </el-dialog>
  </div>
</template>

<script>
import { addCertificate, getCertificatesPaged, deleteCertificateById, updateCertificate, searchCertificatesByName, uploadFile, searchCertificates } from '@/api/index.js';
import { baseUrl } from '@/config/index';

export default {
  name: 'BrandAuthorizationCertificate',
  data() {
    return {
      searchQuery: '',
      certificates: [],
      currentPage: 1,
      pageSize: 10,
      totalCertificates: 0,
      addCertificateDialogVisible: false,
      editCertificateDialogVisible: false,
      deleteCertificateDialogVisible: false,
      // 新增
      newCertificate: {
        name: '',
        description: '',
        imageUrl: ''
      },
      // 编辑
      currentCertificate: {
        name: '',
        description: '',
        imageUrl: ''
      },
      certificateToDelete: null,
      rules: {
        name: [{ required: true, message: '请输入证书名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入证书描述', trigger: 'blur' }],
        imageUrl: [{ required: true, message: '请上传证书图片', trigger: 'blur' }]
      },
      uploadUrl: '/api/v1/fileUpload/upload',
      imageDialogVisible: false,
      currentImage: '',
      tableData: [], // 定义 tableData 并初始化为空数组
    };
  },
  mounted() {
    this.fetchCertificates();
  },
  methods: {
    async fetchCertificates() {
      try {
        const response = await getCertificatesPaged(this.currentPage - 1, this.pageSize, 'id');
        if (response.code === 0) {
          this.certificates = response.data;
          this.totalCertificates = response.data.length;
        } else {
          this.$message.error('获取证书列表失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('获取证书列表失败: ' + error.message);
      }
    },
    async searchCertificates() {
      try {
        const response = await searchCertificatesByName(this.searchQuery);
        if (response.code === 0) {
          this.certificates = response.data;
          this.totalCertificates = response.data.length;
        } else {
          this.$message.error('搜索证书失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('搜索证书失败: ' + error.message);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchCertificates();
    },
    showAddCertificateDialog() {
      this.addCertificateDialogVisible = true;
    },
    handleImageError() {
      this.$message.error('图片加载失败');
    },
    async addCertificate() {
      try {
        const response = await addCertificate(this.newCertificate);
        if (response.code === 0) {
          this.$message.success('新增证书成功');
          this.addCertificateDialogVisible = false;
          this.fetchCertificates();
        } else {
          this.$message.error('新增证书失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('新增证书失败: ' + error.message);
      }
    },
    async editCertificate(certificate) {
      this.currentCertificate = { ...certificate };// 展开运算符。创建一个 certificate 对象的浅拷贝，并将其赋值给 this.currentCertificate。这样可以避免直接修改原始的 certificate 对象，确保数据的独立性和安全性。
      this.editCertificateDialogVisible = true;
    },
    async submitEditForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await updateCertificate(this.currentCertificate);
            if (response.code === 0) {
              this.$message.success('编辑证书成功');
              this.editCertificateDialogVisible = false;
              this.fetchCertificates();
            } else {
              this.$message.error('编辑证书失败: ' + response.message);
            }
          } catch (error) {
            this.$message.error('编辑证书失败: ' + error.message);
          }
        } else {
          this.$message.error('请填写完整的证书信息');
        }
      });
    },
    confirmDeleteCertificate(certificate) {
      this.certificateToDelete = certificate;
      this.deleteCertificateDialogVisible = true;
    },
    async deleteCertificate() {
      try {
        const response = await deleteCertificateById(this.certificateToDelete.id);
        if (response.code === 0) {
          this.$message.success('删除证书成功');
          this.deleteCertificateDialogVisible = false;
          this.fetchCertificates();
        } else {
          this.$message.error('删除证书失败: ' + response.message);
        }
      } catch (error) {
        this.$message.error('删除证书失败: ' + error.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addCertificate();
        } else {
          this.$message.error('请填写完整的证书信息');
        }
      });
    },
    handleCertificateUploadSuccess(response) {
      if (response.code === 0) {
        const imageUrl = `${baseUrl}/v1/getLatestImage?fileName=${response.data}`;
        if (this.addCertificateDialogVisible) {
          this.$set(this.newCertificate, 'imageUrl', imageUrl);
        } else if (this.editCertificateDialogVisible) {
          this.$set(this.currentCertificate, 'imageUrl', imageUrl);
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
    beforeUploadCertificate(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', window.localStorage.getItem('SET_NAME'));
      formData.append('type', 'certificate');
      this.uploadFile(formData);
      return false;
    },
    async uploadFile(formData) {
      try {
        const response = await uploadFile(formData);
        this.handleCertificateUploadSuccess(response);
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
.certificate-container {
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

.certificate-table {
  margin-bottom: 20px;
}

.pagination {
  text-align: center;
}

@media (max-width: 768px) {
  .certificate-container {
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