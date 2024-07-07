<template>
  <div>
    <el-dialog v-model="dialogVisible" title="添加新文章" width="500px" :before-close="handleClose">
      <el-form :rules="rules" :model="articleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="sortClass">
          <el-select v-model="articleForm.sortClass" placeholder="请选择分类">
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker v-model="articleForm.addTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="图片地址">
          <div class="updata" shadow="never">
            <el-upload v-model:file-list="fileList" drag multiple class="pure-upload" list-type="picture-card"
              accept="image/jpeg,image/png,image/gif" :action="uploadUrl" name="editormd-image-file" :limit="1"
              :on-exceed="onExceed" :before-upload="onBefore" :on-success="handleUploadSuccessEdit">
              <IconifyIconOffline :icon="Add" class="m-auto mt-4" width="30" />
              <template #file="{ file }">
                <div v-if="file.status == 'ready' || file.status == 'uploading'" class="mt-[35%] m-auto">
                  <p class="font-medium">文件上传中</p>
                  <el-progress class="mt-2" :stroke-width="2" :text-inside="true" :show-text="false"
                    :percentage="file.percentage" />
                </div>
                <div v-else @mouseenter.stop="imgDrop(file.uid)">
                  <img class="el-upload-list__item-thumbnail select-none" :src="file.url" />
                  <span id="pure-upload-item" :class="[
                    'el-upload-list__item-actions',
                    fileList.length > 1 && '!cursor-move'
                  ]">
                    <span title="查看" class="hover:text-primary" @click="handlePictureCardPreview(file)">
                      <IconifyIconOffline :icon="Eye" class="hover:scale-125 duration-100" />
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <span title="移除" class="hover:text-[var(--el-color-danger)]">
                        <IconifyIconOffline :icon="Delete" class="hover:scale-125 duration-100" />
                      </span>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <!-- 有时文档没写并不代表没有，多看源码好处多多😝 https://github.com/element-plus/element-plus/tree/dev/packages/components/image-viewer/src （emm...这让我想起刚开始写这个项目时，很多东西只有英文或者没有文档，需要看源码时，想笑🥹。那些美好时光都给这些坑了，giao） -->
            <el-image-viewer v-if="dialogPicVisible" :initialIndex="curOpenImgIndex" :url-list="urlList" :zoom-rate="1.2"
              :max-scale="7" :min-scale="0.2" @close="dialogPicVisible = false"
              @switch="index => (curOpenImgIndex = index)" />
            <!-- 将自定义内容插入到body里，有了它在图片预览的时候，想插入个分页器或者别的东东在预览区某个位置就很方便咯（用户需求可以很灵活，开源组件库几乎不可能尽善尽美，很多时候寻找别的解决途径或许更好） -->
            <teleport to="body">
              <div v-if="fileList[curOpenImgIndex] && dialogPicVisible" effect="dark" round size="large" type="info"
                class="img-name">
                <p class="text-[#fff] dark:text-black">
                  {{ fileList[curOpenImgIndex].name }}
                </p>
              </div>
            </teleport>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitArticle">确认</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑文章的对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑文章" width="500px" :before-close="handleCloseEdit">
      <el-form :rules="rules" :model="editArticleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editArticleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="sortClass">
          <el-select v-model="articleForm.sortClass" placeholder="请选择分类">
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker v-model="editArticleForm.addTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="图片地址">
          <el-input v-model="editArticleForm.thumb"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateArticle">更新</el-button>
        </div>
      </template>
    </el-dialog>
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="table-operations">
          <el-input v-model="searchQuery" placeholder="请输入查询内容" class="search-input"></el-input>
          <el-button type="success" @click="searchArticles">查询</el-button>
          <el-button type="primary" @click="showAddArticleDialog">添加</el-button>
          <el-button type="danger" @click="confirmDeleteSelected">删除选中</el-button>
        </div>
      </template>
      <el-table @row-click="handleRowClick" :data="filteredArticles" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column label="图片" width="100">
          <template #default="scope">
            <el-image style="width: 90px; height: 80px" :src="scope.row.thumb" fit="contain"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template #default="scope">
            <a class="article-link">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者">
          <template #default="scope">
            <div class="author-container">
              <span>{{ scope.row.author }}</span>
              <el-avatar :src="scope.row.profile" size="small"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="className" label="分类">
        </el-table-column>

        <el-table-column prop="addTime" label="发布日期"
          :formatter="(row, column, cellValue) => dayjs(cellValue).format('YYYY-MM-DD  HH:mm')"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" plain size="small" @click.stop="editArticle(scope.row)"
              @click="editArticle(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="small" @click.stop="confirmDeleteArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next"
          :total="totalArticles"></el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import { deleteArticlesBatch, getAllArticles, createArticle, updateArticles, deleteArticle } from '@/api/art_function/article'; // 请确保路径正确
import { getAllClassName } from '@/api/art_function/art_category'; // 请确保路径正确
import type { Article } from './types';
import { useRouter } from 'vue-router'
import dayjs from 'dayjs';
import { storageLocal } from "@pureadmin/utils";

import { getKeyList, extractFields, downloadByData } from "@pureadmin/utils";
import { message } from "@/utils/message";
import type { UploadFile } from "element-plus";
import Sortable from "sortablejs";
import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";

const searchQuery = ref('');
const selectedArticles = ref<Article[]>([]);

const dialogVisible = ref(false);

// 引入分页所需的响应式变量
const currentPage = ref(1);
const pageSize = ref(5);
const totalArticles = ref(0);

// 规则
const rules = ref({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  sortClass: [
    { required: true, message: '请输入分类', trigger: 'blur' }
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' }
  ],
  // 其他规则...
});

const classList = ref([
]);

// 用于存储文章数据的响应式变量
const articles = ref([]);

const router = useRouter()


// 图片上传模块开始
const fileList = ref([]);
const curOpenImgIndex = ref(0);
const dialogPicVisible = ref(false);

// 拼接环境变量和路径
const { VITE_APP_BASE_API } = import.meta.env;
const uploadUrl = ref(`${VITE_APP_BASE_API}/FileApi/updateimage`);

const urlList = computed(() => getKeyList(fileList.value, "url"));

function handleUploadSuccess(response, file) {
  // console.log(response, file);
  // 假设服务器响应中的 'url' 字段是图片的实际路径
  const serverUrl = response.url;
  // 更新 fileList 中对应文件的 URL
  const fileIndex = fileList.value.findIndex(item => item.uid === file.uid);
  if (fileIndex !== -1) {
    fileList.value[fileIndex].url = serverUrl;
  }
}

function handleUploadSuccessEdit(response, file) {
  console.log(response, file);
  // 假设服务器响应中的 'url' 字段是图片的实际路径
  const serverUrl = response.url;
  // 更新 fileList 中对应文件的 URL
  const fileIndex = fileList.value.findIndex(item => item.uid === file.uid);
  if (fileIndex !== -1) {
    fileList.value[fileIndex].url = serverUrl;
  }
}

/** 上传文件前校验 */
const onBefore = file => {
  if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
    message("只能上传图片");
    return false;
  }
  const isExceed = file.size / 1024 / 1024 > 2;
  if (isExceed) {
    message(`单个图片大小不能超过2MB`);
    return false;
  }
};

/** 超出最大上传数时触发 */
const onExceed = () => {
  message("最多上传1张图片，请先删除在上传");
};

/** 移除上传的文件 */
const handleRemove = (file: UploadFile) => {
  fileList.value.splice(fileList.value.indexOf(file), 1);
};

/** 大图预览 */
const handlePictureCardPreview = (file: UploadFile) => {
  curOpenImgIndex.value = fileList.value.findIndex(img => img.uid === file.uid);
  dialogPicVisible.value = true;
};

const getUploadItem = () => document.querySelectorAll("#pure-upload-item");

/** 缩略图拖拽排序 */
const imgDrop = uid => {
  const CLASSNAME = "el-upload-list";
  const _curIndex = fileList.value.findIndex(img => img.uid === uid);
  getUploadItem()?.[_curIndex]?.classList?.add(`${CLASSNAME}__item-actions`);
  const wrapper: HTMLElement = document.querySelector(`.${CLASSNAME}`);
  Sortable.create(wrapper, {
    handle: `.${CLASSNAME}__item`,
    onEnd: ({ newIndex, oldIndex }) => {
      const oldFile = fileList.value[oldIndex];
      fileList.value.splice(oldIndex, 1);
      fileList.value.splice(newIndex, 0, oldFile);
      // fix: https://github.com/SortableJS/Sortable/issues/232 (firefox is ok, but chromium is bad. see https://bugs.chromium.org/p/chromium/issues/detail?id=410328)
      getUploadItem().forEach(ele => {
        ele.classList.remove(`${CLASSNAME}__item-actions`);
      });
    }
  });
};
// 图片上传模块结束

const handleRowClick = (row, column, event) => {
  // 检查点击的元素是否是按钮
  if (event.target.tagName === 'BUTTON') {
    // 如果是按钮，则不执行导航逻辑
    return;
  }

  // 如果不是按钮，则执行原来的导航逻辑
  // 使用Vue Router的push方法来导航到新的URL
  const newPath = '/content-management/edit-article/' + row.id
  if (router.currentRoute.value.path !== newPath) {
    router.push(newPath)
  }
}

interface ArticleResponse {
  pages: any[]; // Replace any[] with the actual type of your pages
  total: number;
  data: Article[];
}

// 分页改变时获取文章
const fetchArticles = async (pageNum = 1, limit = pageSize.value) => {
  try {
    const response = await getAllArticles(pageNum, limit) as unknown as { code: number, data: ArticleResponse };
    if (response.code === 200) {
      const res = response.data;
      articles.value = res.data;
      console.log('articles:', articles.value);
      totalArticles.value = res.total;
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

const fetchClass = async () => {
  try {
    const response = await getAllClassName();
    if (response.code === 200) {
      classList.value = response.data;
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
  fetchClass();
});

// 页面挂载时获取文章数据
onMounted(fetchArticles);

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

// 添加文章
const submitArticle = async () => {
  try {
    const userKey = "user-info";

    const userid =
      storageLocal().getItem<DataInfo<number>>(userKey)?.userId ?? "";

    // 先复制 articleForm 的内容
    const formData = { ...articleForm.value };

    // 格式化日期字段
    if (formData.addTime) {
      formData.addTime = dayjs(formData.addTime).format('YYYY-MM-DD HH:mm:ss');
    }
    formData.authorId = String(userid);
    formData.thumb = urlList.value[0];
    console.log(urlList)

    await createArticle(formData);
    fetchArticles(); // 重新获取文章列表
    dialogVisible.value = false;
    ElNotification({
      title: '成功',
      message: '文章添加成功',
      type: 'success',
    });
  } catch (error) {
    console.error('Error submitting article:', error);
  }
};

// 更新文章
const updateArticle = async () => {
  try {
    // 先复制 articleForm 的内容
    const formData = { ...editArticleForm.value };

    // 格式化日期字段
    if (formData.addTime) {
      formData.addTime = dayjs(formData.addTime).format('YYYY-MM-DD HH:mm:ss');
    }
    await updateArticles(formData, editArticleForm.value.id);
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

// 删除文章
const confirmDeleteArticle = async (articleId) => {
  // 弹出确认框
  ElMessageBox.confirm('你确定要删除此文章吗?')
    .then(() => {
      // 如果用户点击了确认按钮
      try {
        deleteArticle(articleId);
        fetchArticles(); // 重新获取文章列表
        ElNotification({
          title: '删除文章',
          message: '文章删除成功',
          type: 'success',
        });
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    })
    .catch(() => {
      // 如果用户点击了取消按钮
      ElNotification({
        title: '取消删除',
        message: '文章未被删除',
        type: 'info',
      });
    });
};

const editDialogVisible = ref(false);
const editArticleForm = ref({
  id: 0,
  title: '',
  author: '',
  addTime: '',
  className: '',
  thumb: '',
});

const articleForm = ref({
  title: '',
  sortClass: '',
  author: '',
  addTime: '',
  className: '',
  thumb: '',
  authorId: ''
});

const handleCloseEdit = (done: () => void) => {
  // 可以根据需要定制关闭编辑对话框前的逻辑
  done();
};
// 定义 searchArticles
const searchArticles = () => {
  // 搜索文章的逻辑
}
const editArticle = (article: Article) => {
  editArticleForm.value = { ...article };
  editDialogVisible.value = true;
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要关闭此页面?')
    .then(() => done())
    .catch(() => { });
};

const showAddArticleDialog = () => {
  articleForm.value = { title: '', author: '', className: '', addTime: '', thumb: '', sortClass: '', authorId: '' }; // Reset form
  dialogVisible.value = true;
};

const filteredArticles = computed(() => {
  return articles.value.filter(article => article.title.includes(searchQuery.value));
});

const handleSelectionChange = (val: Article[]) => {
  selectedArticles.value = val;
};

const confirmDeleteSelected = async () => {
  if (selectedArticles.value.length === 0) {
    ElNotification({
      title: '没有选择文章',
      message: '请选择要删除的文章',
      type: 'warning',
    });
    return;
  }

  try {
    await ElMessageBox.confirm('你确定要删除此文章吗?');

    // Extract IDs of selected articles
    const idsToDelete = selectedArticles.value.map(a => a.id);

    // Call the API to delete articles
    const response = await deleteArticlesBatch(idsToDelete);

    // Check if deletion was successful based on your API response structure
    if (response.code === 200) {
      // Filter out deleted articles from the articles array
      fetchArticles(); // 重新获取文章列表
      selectedArticles.value = [];

      ElNotification({
        title: '删除成功',
        message: '成功删除文章',
        type: 'success',
      });
    } else {
      // Handle unsuccessful deletion
      ElNotification({
        title: '失败',
        message: '删除文章失败',
        type: 'error',
      });
    }
  } catch (error) {
    // Handle cancellation or error
    console.error('Deletion cancelled or failed:', error);
  }
};
</script>

<style scoped>
.box-card {
  margin: 20px;
}

.table-operations {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  margin-right: 10px;
}

.dialog-footer {
  text-align: right;
}
</style>


<style scoped>
.box-card {
  margin: 20px;
}

.table-operations {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  margin-right: 10px;
}

/* 添加的样式 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.float-left {
  float: left;
}

.box-card {
  margin: 20px;
}

.table-operations {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
  margin-right: 10px;
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
<style lang="scss" scoped>
:deep(.card-header) {
  display: flex;

  .header-right {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
  }
}

:deep(.el-upload) {
  height: 137px;
  width: 137px;
}

:deep(.el-upload-list__item) {
  height: 137px;
  width: 137px;
}

:deep(.pure-upload) {
  .el-upload-dragger {
    background-color: transparent;
    border: none;
  }
}

.img-name {
  position: absolute;
  bottom: 80px;
  left: 50%;
  z-index: 4000;
  padding: 5px 23px;
  background-color: var(--el-text-color-regular);
  border-radius: 22px;
  transform: translateX(-50%);

  /** 将下面的 left: 50%; bottom: 80px; transform: translateX(-50%); 注释掉
   *  解开下面 left: 40px; top: 40px; 注释，体验不一样的感觉。啊？还是差强人意，自己调整位置吧🥹
   */
  // left: 40px;
  // top: 40px;
}
</style>
