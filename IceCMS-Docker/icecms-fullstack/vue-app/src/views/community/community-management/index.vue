<template>
  <div class="community-management">
    <el-card class="filter-card">
      <div class="filter-section">
        <el-input v-model="searchQuery" placeholder="搜索圈子内容" class="search-input" clearable />
        <el-select v-model="selectedCategory" placeholder="选择分类" clearable>
          <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
        </el-select>
        <el-button type="primary" @click="fetchData">搜索</el-button>
        <el-button type="success" @click="showAddDialog">新建圈子</el-button>
      </div>
    </el-card>

    <!-- 圈子列表 -->
    <el-card class="post-table">
      <template #header>
        <div class="card-header">
          <span class="font-medium">圈子列表</span>
          <el-button type="primary" size="small" @click="showAddCategoryDialog">新建分类</el-button>
        </div>
      </template>
      <el-table :data="postList" style="width: 100%" stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="缩略图" width="120">
          <template #default="scope">
            <el-image :src="scope.row.thumb" style="width: 80px; height: 80px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column prop="sortName" label="分类" width="120" />
        <el-table-column label="作者" width="150">
          <template #default="scope">
            <div class="author-info">
              <el-avatar :src="scope.row.authorImg" size="small" />
              <span>{{ scope.row.author }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="发布日期" width="180" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editPost(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deletePost(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
      </div>
    </el-card>

    <!-- 分类管理 -->
    <el-card class="category-table">
      <template #header>
        <div class="card-header">
          <span class="font-medium">分类管理</span>
        </div>
      </template>
      <el-table :data="categories" style="width: 100%" stripe v-loading="categoryLoading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column label="顶置" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.top"
              @change="toggleCategoryTop(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editCategory(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteCategory(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分类分页 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleCategorySizeChange"
          @current-change="handleCategoryCurrentChange"
          :current-page="categoryCurrentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="categoryPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="categoryTotal"
        />
      </div>
    </el-card>

    <!-- 新建/编辑圈子对话框 -->
    <el-dialog v-model="postDialogVisible" :title="isEdit ? '编辑圈子' : '新建圈子'" width="500px">
      <el-form :model="postForm" label-width="100px" :rules="postRules" ref="postFormRef">
        <el-form-item label="内容" prop="content">
          <el-input v-model="postForm.content" type="textarea" rows="4" />
        </el-form-item>
        <el-form-item label="分类" prop="sortClass">
          <el-select v-model="postForm.sortClass" placeholder="请选择分类">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-select v-model="postForm.author" placeholder="请选择作者">
            <el-option v-for="user in userList" :key="user.userId" :label="user.username" :value="user.userId">
              <div style="display: flex; align-items: center;">
                <el-avatar :size="30" :src="user.profile" style="margin-right: 10px;"></el-avatar>
                <span>{{ user.username }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="postForm.thumb" :src="postForm.thumb" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="postDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPost">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新建/编辑分类对话框 -->
    <el-dialog v-model="categoryDialogVisible" :title="isCategoryEdit ? '编辑分类' : '新建分类'" width="400px">
      <el-form :model="categoryForm" label-width="100px" :rules="categoryRules" ref="categoryFormRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" />
        </el-form-item>
        <el-form-item label="顶置">
          <el-switch v-model="categoryForm.top" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="categoryDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitCategory">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { getAllSquare, createArticle, updateArticles, deleteArticle } from '@/api/com_function/community';
import { getAllClassName, getallSquareClass, addArticleCategory, updateArticlesCategory, deleteArticleCategoryById, topSquareClass } from '@/api/com_function/com_category';
import { getAllUsers } from '@/api/system';
import dayjs from 'dayjs';

// 圈子列表数据
const postList = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const searchQuery = ref('');
const selectedCategory = ref('');

// 分类数据
const categories = ref([]);
const categoryLoading = ref(false);
const categoryCurrentPage = ref(1);
const categoryPageSize = ref(10);
const categoryTotal = ref(0);

// 用户列表
const userList = ref([]);

// 上传URL
const { VITE_APP_BASE_API } = import.meta.env;
const uploadUrl = `${VITE_APP_BASE_API}/FileApi/updateimage`;

// 圈子表单
const postDialogVisible = ref(false);
const isEdit = ref(false);
const postForm = reactive({
  id: null,
  content: '',
  sortClass: '',
  author: null,
  thumb: ''
});
const postRules = {
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  sortClass: [{ required: true, message: '请选择分类', trigger: 'change' }],
  author: [{ required: true, message: '请选择作者', trigger: 'change' }]
};
const postFormRef = ref();

// 分类表单
const categoryDialogVisible = ref(false);
const isCategoryEdit = ref(false);
const categoryForm = reactive({
  id: null,
  name: '',
  top: false
});
const categoryRules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
};
const categoryFormRef = ref();

// 获取圈子列表
const fetchData = async () => {
  loading.value = true;
  try {
    const categoryId = selectedCategory.value || (categories.value.length > 0 ? categories.value[0].id : 1);
    const response = await getAllSquare(categoryId, currentPage.value, pageSize.value);
    if (response.code === 200) {
      postList.value = response.data.data;
      total.value = response.data.total;

      // 如果有搜索关键词，过滤结果
      if (searchQuery.value) {
        postList.value = postList.value.filter(post =>
          post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
    }
  } catch (error) {
    console.error('获取圈子列表失败:', error);
    ElMessage.error('获取圈子列表失败');
  } finally {
    loading.value = false;
  }
};

// 获取分类列表
const fetchCategories = async () => {
  categoryLoading.value = true;
  try {
    // 获取所有分类名称
    const nameResponse = await getAllClassName();
    if (nameResponse.code === 200) {
      categories.value = nameResponse.data;
    }

    // 获取分页的分类列表
    const response = await getallSquareClass(categoryCurrentPage.value, categoryPageSize.value);
    if (response.code === 200) {
      categoryTotal.value = response.data.total;
      // 如果已经获取了详细分类信息，则使用它
      if (response.data.data && response.data.data.length > 0) {
        categories.value = response.data.data;
      }
    }
  } catch (error) {
    console.error('获取分类列表失败:', error);
    ElMessage.error('获取分类列表失败');
  } finally {
    categoryLoading.value = false;
  }
};

// 获取用户列表
const fetchUsers = async () => {
  try {
    const response = await getAllUsers();
    if (response.code === 200) {
      userList.value = response.data;
    }
  } catch (error) {
    console.error('获取用户列表失败:', error);
    ElMessage.error('获取用户列表失败');
  }
};

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchData();
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchData();
};

const handleCategorySizeChange = (size) => {
  categoryPageSize.value = size;
  fetchCategories();
};

const handleCategoryCurrentChange = (page) => {
  categoryCurrentPage.value = page;
  fetchCategories();
};

// 上传处理
const handleUploadSuccess = (response, file) => {
  postForm.thumb = response.url;
};

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('只能上传图片文件!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

// 圈子操作
const showAddDialog = () => {
  isEdit.value = false;
  postForm.id = null;
  postForm.content = '';
  postForm.sortClass = categories.value.length > 0 ? categories.value[0].id : '';
  postForm.author = null;
  postForm.thumb = '';
  postDialogVisible.value = true;
};

const editPost = (row) => {
  isEdit.value = true;
  postForm.id = row.id;
  postForm.content = row.content;
  postForm.sortClass = row.sortClass;
  postForm.author = row.userid; // 使用userid作为作者ID
  postForm.thumb = row.thumb;
  postDialogVisible.value = true;
};

const deletePost = (id) => {
  ElMessageBox.confirm('确定要删除这个圈子吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteArticle(id);
      ElMessage.success('删除成功');
      fetchData();
    } catch (error) {
      console.error('删除失败:', error);
      ElMessage.error('删除失败');
    }
  }).catch(() => {});
};

const submitPost = async () => {
  if (!postFormRef.value) return;

  await postFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const formData = {
          ...postForm,
          addTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        };

        if (isEdit.value) {
          await updateArticles(formData, formData.id);
          ElMessage.success('更新成功');
        } else {
          await createArticle(formData);
          ElMessage.success('创建成功');
        }

        postDialogVisible.value = false;
        fetchData();
      } catch (error) {
        console.error('提交失败:', error);
        ElMessage.error('提交失败');
      }
    }
  });
};

// 分类操作
const showAddCategoryDialog = () => {
  isCategoryEdit.value = false;
  categoryForm.id = null;
  categoryForm.name = '';
  categoryForm.top = false;
  categoryDialogVisible.value = true;
};

const editCategory = (row) => {
  isCategoryEdit.value = true;
  categoryForm.id = row.id;
  categoryForm.name = row.name;
  categoryForm.top = row.top;
  categoryDialogVisible.value = true;
};

const deleteCategory = (id) => {
  ElMessageBox.confirm('确定要删除这个分类吗？删除后分类下的圈子将无法显示', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteArticleCategoryById(id);
      ElMessage.success('删除成功');
      fetchCategories();
    } catch (error) {
      console.error('删除失败:', error);
      ElMessage.error('删除失败');
    }
  }).catch(() => {});
};

const submitCategory = async () => {
  if (!categoryFormRef.value) return;

  await categoryFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isCategoryEdit.value) {
          await updateArticlesCategory(categoryForm, categoryForm.id);
          ElMessage.success('更新成功');
        } else {
          await addArticleCategory(categoryForm);
          ElMessage.success('创建成功');
        }

        categoryDialogVisible.value = false;
        fetchCategories();
      } catch (error) {
        console.error('提交失败:', error);
        ElMessage.error('提交失败');
      }
    }
  });
};

const toggleCategoryTop = async (row) => {
  try {
    await topSquareClass(row.id);
    ElMessage.success(`${row.top ? '顶置' : '取消顶置'}成功`);
    fetchCategories();
  } catch (error) {
    console.error('操作失败:', error);
    ElMessage.error('操作失败');
    // 恢复状态
    row.top = !row.top;
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchCategories();
  fetchUsers();
  fetchData();
});
</script>

<style scoped>
.community-management {
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-input {
  width: 250px;
}

.post-table, .category-table {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style>
