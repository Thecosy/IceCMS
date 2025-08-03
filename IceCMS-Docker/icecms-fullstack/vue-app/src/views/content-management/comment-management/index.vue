<template>
  <div>
    <el-dialog v-model="dialogVisible" title="添加新评论" width="500px" :before-close="handleClose">
      <el-form :model="commentForm">
        <el-form-item label="内容">
          <el-input v-model="commentForm.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="文章">
          <el-select v-model="commentForm.articleId" placeholder="请选择分类">
            <el-option v-for="item in articleList" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select> </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitComment">提交</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" title="编辑评论" width="500px" :before-close="handleCloseEdit">
      <el-form :model="editCommentForm">
        <el-form-item label="内容" prop="content">
          <el-input v-model="editCommentForm.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateComment">更新</el-button>
        </div>
      </template>
    </el-dialog>

    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="table-operations">
          <el-button type="primary" @click="showAddCommentDialog">添加评论</el-button>
        </div>
      </template>
      <el-table :data="comments" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="articleId" label="文章ID"></el-table-column>
        <el-table-column prop="articleName" label="文章名">
          <template #default="scope">
            <a class="article-link" @click.prevent="navigateToArticle(scope.row.articleId)">{{ scope.row.articleName
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="username" label="用户名">
          <template #default="scope">
            <div class="author-container">
              <span>{{ scope.row.username }}</span>
              <el-avatar :src="scope.row.profile" size="small"></el-avatar>
            </div>
          </template>
        </el-table-column> <el-table-column prop="addTime" label="添加时间" width="120"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" plain size="small" @click="editComment(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="small" @click="confirmDeleteComment(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next"
          :total="totalArticlesComment"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import type { Comment } from './types';
import { getallArticleComments, addArticleComment, updateArticlesComment, deleteArticleCommentById, getAllArticleName } from '@/api/art_function/art_comment'; // 请确保路径正确
import { useRouter } from 'vue-router';
import { storageLocal } from "@pureadmin/utils";

const router = useRouter();

const navigateToArticle = (articleId) => {
  // 使用 router.push 进行路由跳转，这里的路径应该与你的路由配置匹配
  const newPath = '/content-management/edit-article/' + articleId
  if (router.currentRoute.value.path !== newPath) {
    router.push(newPath)
  }
};

const articleList = ref();

// 引入分页所需的响应式变量
const currentPage = ref(1);
const pageSize = ref(5);
const totalArticlesComment = ref(0);

const dialogVisible = ref(false);
const comments = ref<Comment[]>([]);

const editDialogVisible = ref(false);
const editCommentForm = ref({
  id: 0,
  content: '',
  addTime: new Date(),
  author: '',
});

interface CommentResponse {
  pages: any[]; // Replace any[] with the actual type of your pages
  total: number;
  data: Comment[];
}

// 分页改变时获取文章
const fetchArticles = async (pageNum = 1, limit = pageSize.value) => {
  try {
    const responseName = await getAllArticleName();
    articleList.value = responseName.data
    const response = await getallArticleComments(pageNum, limit) as unknown as { code: number, data: CommentResponse };
    if (response.code === 200) {
      console.log('response:', response);
      const res = response.data;
      comments.value = res.data;
      totalArticlesComment.value = res.total;
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

// 页面大小变化时的处理函数
const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  fetchArticles(currentPage.value, pageSize.value);
};

// 当前页面变化时的处理函数
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchArticles(currentPage.value, pageSize.value);
};

// 页面挂载时获取文章数据
onMounted(() => {
  fetchArticles(currentPage.value, pageSize.value);
});

// 页面挂载时获取文章数据
onMounted(fetchArticles);

const handleCloseEdit = (done: () => void) => {
  done();
};

const editComment = (comment) => {
  // 确保评论对象包含所有必需的属性
  editCommentForm.value = {
    id: comment.id,
    content: comment.content,
    author: comment.author, // 确保包含 author 属性
    addTime: comment.addTime,
    // ... 其他必需的属性 ...
  };
  editDialogVisible.value = true;
};

const updateComment = async () => {
  try {
    // 调用更新评论的接口
    await updateArticlesComment(editCommentForm.value, editCommentForm.value.id);
    fetchArticles(); // 重新获取文章列表
    editDialogVisible.value = false;
    ElNotification({
      title: '成功',
      message: '文章更新成功',
      type: 'success',
    });
  } catch (error) {
    console.error('Error updating article:', error);
  }
};

const commentForm = ref({
  content: '',
  articleId: '',
  userId: '',
});

const handleClose = (done: () => void) => {
  done();
};

const showAddCommentDialog = () => {
  commentForm.value = { content: '', articleId: '', userId: '' }; // Reset form
  dialogVisible.value = true;
};

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 用户名 */
  username?: string;
  /** 当前登录用户的头像 */
  avatar?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
  /** 当前登录用户的id */
  userId?: number;
}

// 添加文章评论
const submitComment = async () => {
  try {
    const userKey = "user-info";

    const userid =
      storageLocal().getItem<DataInfo<number>>(userKey)?.userId ?? "";
    commentForm.value.userId = userid.toString();
    await addArticleComment(commentForm.value);
    fetchArticles(); // 重新获取评论列表
    dialogVisible.value = false;
    ElNotification({
      title: '成功',
      message: '文章评论添加成功',
      type: 'success',
    });
  } catch (error) {
    console.error('Error submitting article:', error);
  }
};

const confirmDeleteComment = (commentId: number) => {
  ElMessageBox.confirm('你确定要删除此评论吗?')
    .then(() => {
      deleteArticleCommentById(commentId)
      fetchArticles(); // 重新获取评论列表
      ElNotification({
        title: '删除成功',
        message: '评论删除成功',
        type: 'success',
      });
    })
    .catch(() => { });
};
</script>

<style scoped>
.box-card {
  margin: 20px;
}

.table-operations {
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>
<style scoped>
/* 分页容器样式 */
.pagination-container {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 40px;
}

:deep(.el-pager li) {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  color: #85899c;
  border: 0.1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin-right: 10px;
}

:deep(.btn-prev) {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  color: #4D84EA;
  border: 1px solid rgba(21, 158, 255, 0.2);
  border-radius: 6px;
  margin-right: 15px;
  font-size: 20px;
}

:deep(.btn-next) {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  color: #4D84EA;
  border: 1px solid rgba(21, 158, 255, 0.2);
  border-radius: 6px;
  margin-left: 5px;
}

:deep(.el-pager li.is-active) {
  background-color: #409EFF;
  color: #ffffff;
  border: 1px solid #409EFF;
  border-radius: 6px;
}

:deep(.el-pagination) {
  float: right;
}

/* 调整作者信息和头像的样式 */
.author-container {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  gap: 10px;
  /* 文字和头像之间的距离 */
}

/* Remove the empty ruleset */
/* 可以添加更多样式来调整文字显示 */
/* } */
</style>
