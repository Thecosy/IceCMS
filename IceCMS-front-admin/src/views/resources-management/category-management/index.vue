<template>
  <el-container>
    <el-dialog v-model="editDialogVisible" title="编辑文章" width="500px" :before-close="handleCloseEdit">
      <el-form :rules="rules" :model="editCategoryRef">
        <el-form-item label="标题" prop="name">
          <el-input v-model="editCategoryRef.name"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="otherName">
          <el-input v-model="editCategoryRef.otherName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describes">
          <el-input v-model="editCategoryRef.describes"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <div class="updata" shadow="never">
            <el-upload v-model:file-list="fileListEdit" drag multiple class="pure-upload" list-type="picture-card"
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
                    fileListEdit.length > 1 && '!cursor-move'
                  ]">
                    <span title="查看" class="hover:text-primary" @click="handlePictureCardPreviewEdit(file)">
                      <IconifyIconOffline :icon="Eye" class="hover:scale-125 duration-100" />
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemoveEdit(file)">
                      <span title="移除" class="hover:text-[var(--el-color-danger)]">
                        <IconifyIconOffline :icon="Delete" class="hover:scale-125 duration-100" />
                      </span>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <!-- 有时文档没写并不代表没有，多看源码好处多多😝 https://github.com/element-plus/element-plus/tree/dev/packages/components/image-viewer/src （emm...这让我想起刚开始写这个项目时，很多东西只有英文或者没有文档，需要看源码时，想笑🥹。那些美好时光都给这些坑了，giao） -->
            <el-image-viewer v-if="dialogVisibleEdit" :initialIndex="curOpenImgIndex" :url-list="urlListEdit"
              :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" @close="dialogVisibleEdit = false"
              @switch="index => (curOpenImgIndex = index)" />
            <!-- 将自定义内容插入到body里，有了它在图片预览的时候，想插入个分页器或者别的东东在预览区某个位置就很方便咯（用户需求可以很灵活，开源组件库几乎不可能尽善尽美，很多时候寻找别的解决途径或许更好） -->
            <teleport to="body">
              <div v-if="fileListEdit[curOpenImgIndex] && dialogVisibleEdit" effect="dark" round size="large" type="info"
                class="img-name">
                <p class="text-[#fff] dark:text-black">
                  {{ fileListEdit[curOpenImgIndex].name }}
                </p>
              </div>
            </teleport>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateCategory">更新</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 左侧边栏：添加新分类表单 -->
    <el-aside width="300px">
      <el-card class="category-form">
        <template #header>
          <div class="card-header">
            <span class="font-medium">添加新分类</span>
          </div>
        </template>
        <el-form ref="formRef" :rules="rules" :model="newCategory" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="newCategory.name"></el-input>
          </el-form-item>
          <el-form-item label="别名" prop="otherName">
            <el-input v-model="newCategory.otherName"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="newCategory.describes" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="分类图片">
            <div class="updata" shadow="never">
              <el-upload v-model:file-list="fileList" drag multiple class="pure-upload" list-type="picture-card"
                accept="image/jpeg,image/png,image/gif" :action="uploadUrl" name="editormd-image-file" :limit="1"
                :on-exceed="onExceed" :before-upload="onBefore" :on-success="handleUploadSuccess">
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
              <el-image-viewer v-if="dialogVisible" :initialIndex="curOpenImgIndex" :url-list="urlList" :zoom-rate="1.2"
                :max-scale="7" :min-scale="0.2" @close="dialogVisible = false"
                @switch="index => (curOpenImgIndex = index)" />
              <!-- 将自定义内容插入到body里，有了它在图片预览的时候，想插入个分页器或者别的东东在预览区某个位置就很方便咯（用户需求可以很灵活，开源组件库几乎不可能尽善尽美，很多时候寻找别的解决途径或许更好） -->
              <teleport to="body">
                <div v-if="fileList[curOpenImgIndex] && dialogVisible" effect="dark" round size="large" type="info"
                  class="img-name">
                  <p class="text-[#fff] dark:text-black">
                    {{ fileList[curOpenImgIndex].name }}
                  </p>
                </div>
              </teleport>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCategory">添加</el-button>
            <el-button type="default" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-aside>

    <!-- 右侧主区域：分类列表 -->
    <el-main>
      <el-card class="category-table">
        <template #header>
          <div class="card-header">
            <span class="font-medium">分类列表</span>
          </div>
        </template>
        <el-table :data="categoryList" style="width: 100%" stripe>

          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column label="图片" width="100">
            <template #default="scope">
              <el-image style="width: 90px; height: 80px" :src="scope.row.imgclass" fit="contain"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="otherName" label="别名"></el-table-column>
          <el-table-column prop="describes" label="描述"></el-table-column>
          <el-table-column label="置顶">
            <template #default="{ row }">
              <el-switch v-model="row.top" @change="handleTopChange(row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <div class="table-action-buttons">
                <el-button type="primary" plain size="small" @click="editCategory(row)">编辑</el-button>
                <el-button type="danger" plain size="small" @click="deleteCategory(row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next"
            :total="totalClass"></el-pagination>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>


<script setup lang="ts">

import { ref, computed, onMounted } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import {
  getallArticleCategorys,
  addArticleCategory,
  updateArticlesCategory,
  deleteArticleCategoryById,
  topArticleClass
} from '@/api/res_function/res_category';
import type { Category } from './types';

import Sortable from "sortablejs";
import { message } from "@/utils/message";
import type { UploadFile } from "element-plus";
import { getKeyList, extractFields, downloadByData } from "@pureadmin/utils";

import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";

// 引入分页所需的响应式变量
const currentPage = ref(1);
const pageSize = ref(5);
const totalClass = ref(0);

const editDialogVisible = ref(false);

// 规则
const rules = ref({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  otherName: [
    { required: true, message: '请输入别名', trigger: 'blur' }
  ],
  describes: [
    { required: true, message: '请输入描述', trigger: 'blur' }
  ],
  // 其他规则...
});

const newCategory = ref({
  name: '',
  otherName: '',
  describes: '',
  imgclass: ''
});
const categoryList = ref([]);

interface CategoryResponse {
  pages: any[]; // Replace any[] with the actual type of your pages
  total: number;
  data: Category[];
}

const editCategoryRef = ref({
  id: 0,
  name: '',
  otherName: '',
  describes: '',
  imgclass: ''
});

// 图片上传模块开始
const fileList = ref([]);
const fileListEdit = ref([]);
const curOpenImgIndex = ref(0);
const dialogVisible = ref(false);
const dialogVisibleEdit = ref(false);
// 拼接环境变量和路径
const { VITE_APP_BASE_API } = import.meta.env;
const uploadUrl = ref(`${VITE_APP_BASE_API}/FileApi/updateimage`);

const urlList = computed(() => getKeyList(fileList.value, "url"));
const urlListEdit = computed(() => getKeyList(fileListEdit.value, "url"));

function handleUploadSuccess(response, file) {
  console.log(response, file);
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
  // 更新 fileListEdit 中对应文件的 URL
  const fileIndex = fileListEdit.value.findIndex(item => item.uid === file.uid);
  if (fileIndex !== -1) {
    fileListEdit.value[fileIndex].url = serverUrl;
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
  message("最多上传1张图片，请先删除再上传");
};

/** 移除上传的文件 */
const handleRemove = (file: UploadFile) => {
  fileList.value.splice(fileList.value.indexOf(file), 1);
};

/** 大图预览 */
const handlePictureCardPreview = (file: UploadFile) => {
  curOpenImgIndex.value = fileList.value.findIndex(img => img.uid === file.uid);
  dialogVisible.value = true;
};

/** 移除上传的文件 */
const handleRemoveEdit = (file: UploadFile) => {
  fileListEdit.value.splice(fileListEdit.value.indexOf(file), 1);
};


/** 大图预览 */
const handlePictureCardPreviewEdit = (file: UploadFile) => {
  curOpenImgIndex.value = fileListEdit.value.findIndex(img => img.uid === file.uid);
  dialogVisibleEdit.value = true;
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

const handleCloseEdit = (done: () => void) => {
  // 可以根据需要定制关闭编辑对话框前的逻辑
  done();
};

const editCategory = (category: Category) => {
  editCategoryRef.value = { ...category };
  editDialogVisible.value = true;
};

// 分页改变时获取文章
const fetchCategories = async (pageNum = 1, limit = pageSize.value) => {
  try {
    const response = await getallArticleCategorys(currentPage.value, pageSize.value) as unknown as { code: number, data: CategoryResponse };
    if (response.code === 200) {
      console.log('response:', response);
      const res = response.data;
      categoryList.value = res.data;
      totalClass.value = res.total;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// 页面大小变化时的处理函数
const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  fetchCategories(currentPage.value, pageSize.value);
};

// 当前页面变化时的处理函数
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchCategories(currentPage.value, pageSize.value);
};

// 页面挂载时获取文章数据
onMounted(() => {
  fetchCategories(currentPage.value, pageSize.value);
});

// 页面挂载时获取文章数据
onMounted(fetchCategories);

const formRef = ref(null);

const addCategory = async () => {
  if (!formRef.value) {
    console.error('表单引用未定义');
    ElNotification({
      title: '失败',
      message: '请输入内容',
      type: 'warning',
    });
  }

  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        newCategory.value.imgclass = urlList.value[0];
        // 调用 API 添加分类
        await addArticleCategory(newCategory.value);
        ElNotification({
          title: '成功',
          message: '分类添加成功',
          type: 'success',
        });
        // 重置表单
        newCategory.value = { name: '', otherName: '', describes: '', imgclass: '' };
        // 重置图片上传
        fileList.value = [];

        fetchCategories();
      } catch (error) {
        console.error('Error adding category:', error);
      }
    } else {
      console.log('表单验证失败');
      ElNotification({
        title: '失败',
        message: '请输入内容',
        type: 'warning',
      });
      return false;
    }
  });
};

const updateCategory = async () => {
  try {
    editCategoryRef.value.imgclass = urlListEdit.value[0];
    console.log('editCategoryRef:', urlListEdit.value);
    await updateArticlesCategory(editCategoryRef.value, editCategoryRef.value.id);
    fetchCategories();
    editDialogVisible.value = false;
    ElNotification({
      title: '成功',
      message: '分类更新成功',
      type: 'success',
    });
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

// 删除文章分类的函数
const deleteCategory = async (categoryId) => {
  // 显示确认对话框
  ElMessageBox.confirm(
    '删除分类将会删除对应的文章，你确定要删除吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    // 用户点击了确认按钮
    try {
      await deleteArticleCategoryById(categoryId.id);
      fetchCategories();
      ElNotification({
        title: '成功',
        message: '分类删除成功',
        type: 'success',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      ElNotification({
        title: '错误',
        message: '删除分类失败',
        type: 'error',
      });
    }
  }).catch(() => {
    // 用户点击了取消按钮
    ElNotification({
      title: '取消操作',
      message: '删除操作已取消',
      type: 'info',
    });
  });
};


const resetForm = () => {
  newCategory.value = { name: '', otherName: '', describes: '', imgclass: '' };
};


const handleTopChange = (category) => {
  console.log('category:', category);
  // 实现置顶分类的逻辑
  topArticleClass(category.id).then(() => {
    ElNotification({
      title: '成功',
      message: '分类置顶状态已更新',
      type: 'success',
    });
  }).catch((error) => {
    console.error('Error updating top status:', error);
    ElNotification({
      title: '错误',
      message: '分类置顶状态更新失败',
      type: 'error',
    });
  });
};

</script>

<style>
.card-header {
  font-size: 18px;
  font-weight: bold;
}

.category-form,
.category-table {
  margin: 20px;
}

.el-main {
  padding: 20px;
}

.el-footer {
  margin-top: auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.upload-demo {
  display: inline-block;
  margin-left: 10px;
}

/* 媒体查询，适用于小屏幕设备 */
@media (max-width: 768px) {
  .el-aside {
    width: auto;
    /* 侧边栏宽度调整为自动 */
    order: 2;
    /* 调整顺序使之在列表下方显示 */
  }

  .el-main {
    order: 1;
    /* 调整顺序使之在表单上方显示 */
  }

  .el-container {
    flex-direction: column;
    /* 更改布局方向为垂直 */
  }
}


/* 重置按钮样式 */
.el-button[type="default"] {
  margin-left: 10px;
  /* 与添加按钮之间的间隔 */
  background-color: #f2f2f2;
  /* 背景色 */
  color: #333;
  /* 文字颜色 */
}

/* 表单样式调整 */
.el-form-item {
  margin-bottom: 16px;
  /* 调整表单项间隔 */
}

/* 卡片样式调整 */
.category-form,
.category-table {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
  border-radius: 4px;
  /* 圆角边框 */
}

/* 标题样式调整 */
.card-header {
  color: #409EFF;
  /* 蓝色标题 */
  font-size: 20px;
  /* 字体大小 */
  margin-bottom: 16px;
  /* 与内容间隔 */
}

/* 添加上传按钮样式 */
.upload-demo {
  /* 添加其他样式以美化上传按钮 */
  /* border: 1px solid #dcdfe6; */
  border-radius: 4px;
  padding: 5px 10px;
}

/* 调整媒体查询样式 */
@media (max-width: 768px) {
  /* ...其他媒体查询样式... */
}


/* 调整操作按钮的布局 */
.table-action-buttons {
  display: flex;
  /* 启用Flex布局 */
  align-items: center;
  /* 垂直居中 */
  justify-content: flex-start;
  /* 水平起始对齐 */
  gap: 10px;
  /* 按钮间隔 */
}

/* 响应式布局调整 */
@media (max-width: 768px) {
  .table-action-buttons {
    flex-direction: column;
    /* 在小屏幕上改为垂直布局 */
  }
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