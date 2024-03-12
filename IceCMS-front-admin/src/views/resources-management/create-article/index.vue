<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Base } from "./components";
import { UploadFile, UploadRawFile, ElMessage } from 'element-plus';// import { ElUploadFile } from "element-plus/lib/el-upload/src/upload.type";
import * as ArticleAPI from "@/api/res_function/resourse";
import { useRoute } from 'vue-router';
const route = useRoute();
const articleId = ref(route.params.articleId);
import { getAllClassName } from '@/api/res_function/res_category'; // 请确保路径正确
import { getAllTag } from '@/api/common/tag'; // 请确保路径正确
import type { Tag } from './types';

import { storageLocal } from "@pureadmin/utils";
import dayjs from 'dayjs';
import { ElMessageBox, ElNotification } from 'element-plus';

import Sortable from "sortablejs";
import { message } from "@/utils/message";
import { getKeyList, extractFields, downloadByData } from "@pureadmin/utils";

import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import { reactive } from 'vue'

let fetchId = articleId.value

onMounted(() => {
  fetchClass();
  fetchTag();
  if (articleId.value) {
    // 如果有 articleId，加载资源数据进行编辑
    console.log('articleId:', articleId.value);
    fetchData(articleId.value);
  } else {
    // 如果没有 articleId，初始化为创建资源模式
  }
});

defineOptions({
  name: "Editor"
});

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

const fetchTag = async () => {
  try {
    const response = await getAllTag();
    if (response.code === 200) {
      console.log(response)
      tagList.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

const fetchData = async (articleId) => {
  try {
    const response = await ArticleAPI.getArticleById(articleId);
    if (response.code === 200) {
      // classList.value = response.data;
      const res: {
        [x: string]: string; title: string
      } = Array.isArray(response.data) ? { title: '' } : response.data;
      form.value.title = res.title
      form.value.category = res.sortClass
      form.value.summary = res.intro
      form.value.publishTime = res.createTime;
      // 更新 fileList 中对应文件的 URL
      fileList.value = [{ name: 'image', url: res.thumb }];
      // 将JSON数组转换为Json对象
      const urlListCarousel = JSON.parse(res.carousel);
      fileListCarousel.value = urlListCarousel;
      fetchTag();
      const tagsString = res.keyword; // 从 res.keyword 中获取的字符串
      const tagIds = tagsString.split(',').map(tag => parseInt(tag)); // 将字符串拆分为数组并转换为数字
      form.value.tags = tagIds; // 将转换后的数组赋值给 form.value.tags
      form.value.paymentType = res.isFree;
      form.value.resourceLink = res.resAddress;
      form.value.resourcePassword = res.resPassword;
      fileVideoList.value = [{ name: 'video', url: res.videoAddress }];
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

const tagList = ref<Tag[]>([]);

const carouselImage = ref('');
const generateImage = ref(false); // Define generateImage variable
const fileVideoList = ref([]);

// 图片上传模块开始
const fileList = ref([]);
const fileListCarousel = ref([]);

const curOpenImgIndex = ref(0);
const dialogVisible = ref(false);
const dialogVisibleCarousel = ref(false);

// 拼接环境变量和路径
const { VITE_APP_BASE_API } = import.meta.env;
const uploadUrl = ref(`${VITE_APP_BASE_API}/FileApi/updateimage`);

// 拼接环境变量和路径
const uploadVideoUrl = ref(`${VITE_APP_BASE_API}/FileApi/updatevideo`);


const urlList = computed(() => getKeyList(fileList.value, "url"));
const urlListCarousel = computed(() => getKeyList(fileListCarousel.value, "url"));

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

function handleUploadSuccessCarousel(response, file) {
  console.log(response, file);
  // 假设服务器响应中的 'url' 字段是图片的实际路径
  const serverUrl = response.url;
  // 更新 fileListCarousel 中对应文件的 URL
  const fileIndex = fileListCarousel.value.findIndex(item => item.uid === file.uid);
  if (fileIndex !== -1) {
    fileListCarousel.value[fileIndex].url = serverUrl;
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

const onExceedCarousel = () => {
  message("最多上传5张图片，请先删除在上传");
};

const onExceedVideo = () => {
  message("最多上传1张视频，请先删除在上传");
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
const handleRemoveCarousel = (file: UploadFile) => {
  fileListCarousel.value.splice(fileListCarousel.value.indexOf(file), 1);
};


/** 大图预览 */
const handlePictureCardPreviewCarousel = (file: UploadFile) => {
  curOpenImgIndex.value = fileListCarousel.value.findIndex(img => img.uid === file.uid);
  dialogVisibleCarousel.value = true;
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

const handleVideoUploadSuccess = (response, file) => {
  console.log("Video upload successful:", response, file);
  // Handle successful video upload here
};

const beforeVideoUpload = (file) => {
  // Check if the file extension is one of the common video file extensions
  const allowedExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'mpeg'];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    // If the file extension is not allowed, show an error message
    message("请上传有效视频文件");
    return false; // Prevent the video from being uploaded
  }

  // If the file extension is allowed, return true to allow the video to be uploaded
  return true;
};

const formRef = ref(null);
// 表单数据对象
const form = ref({
  title: '',      // 资源标题
  author: '',     // 作者
  publishTime: '',// 发布时间
  summary: '',    // 资源简介
  category: '',   // 资源分类
  tags: [],       // 资源标签
  thumb: '',
  paymentType: '', // 是否免费
  resourceLink: '', // 资源地址
  resourcePassword: '', // 资源密码
});
// 规则
const rules = ref({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请输入分类', trigger: 'blur' }
  ],
  // 其他规则...
});

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 用户名 */
  username?: string;
  /** 当前登陆用户的头像 */
  avatar?: string;
  /** 当前登陆用户的角色 */
  roles?: Array<string>;
  /** 当前登陆用户的id */
  userId?: number;
}

const confirmArticle = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const userKey = "user-info";

      const userid =
        storageLocal().getItem<DataInfo<number>>(userKey)?.userId ?? "";

      // 先复制 articleForm 的内容
      const formData = { ...form.value };

      // 格式化日期字段
      if (formData.publishTime) {
        formData.publishTime = dayjs(formData.publishTime).format('YYYY-MM-DD HH:mm:ss');
      }
      formData.thumb = urlList.value[0];
      // 将 form.value.tags 数组转换为逗号分隔的字符串
      const tagsString = form.value.tags.join(',');
      // console.log("str", fileVideoList.value)
      // console.log(urlListCarousel.value)
      // 在每个URL前面增加"url":，然后将ref对象转换为JSON字符串
      const carouselJSON = JSON.stringify(urlListCarousel.value.map(url => ({ "url": url })));
      let videoAddress = fileVideoList.value[0] ? fileVideoList.value[0].response.url : "";

      // 验证通过，执行提交逻辑
      fetchValueHtmlFromBase();
      ArticleAPI.newAaticle({
        title: form.value.title,
        sortClass: form.value.category,
        content: content.value,
        authorId: userid,
        intro: form.value.summary,
        createTime: formData.publishTime,
        thumb: formData.thumb,
        keyword: tagsString,
        isFree: form.value.paymentType,
        resAddress: form.value.resourceLink,
        resPassword: form.value.resourcePassword,
        videoAddress: videoAddress || undefined,
        carousel: carouselJSON,
      })
        .then(({ code }) => {
          console.log('data:', code);
          ElNotification({
            title: '成功',
            message: '资源创建成功',
            type: 'success',
          });
          // 处理成功
        })
        .catch(() => {
          // 处理错误
        });
    } else {
      console.log('验证失败');
      return false;
    }
  });
};

const classList = ref([
]);

const baseComponentRef = ref(null);
const content = ref('');

// 当需要获取 valueHtml 时，调用这个方法
const fetchValueHtmlFromBase = () => {
  if (baseComponentRef.value) {
    const valueHtml = baseComponentRef.value.getValueHtml();
    content.value = valueHtml; // Use .value to assign a new value
  }
};
</script>

<template>
  <div id="editor-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          {{ articleId ? '编辑资源' : '创建资源' }}
        </div>
        <div class="card-body">
          <Base :data="Array.isArray(fetchId) ? fetchId.join(',') : fetchId" ref="baseComponentRef" />
        </div>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" style="margin-top: 20px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker v-model="form.publishTime" type="datetime" placeholder="请选择发布时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.summary" type="textarea" placeholder="请输入简介"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category" placeholder="请选择分类">
              <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="form.tags" multiple filterable allow-create default-first-option placeholder="请输入标签">
              <el-option v-for="(tag, index) in tagList" :key="index" :label="tag.tagName" :value="tag.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片文字">
            <el-switch v-model="generateImage" active-color="#13ce66" inactive-color="#ff4949">生成图片文字</el-switch>
            <!-- <span v-if="generateImage">{{ carouselImage }}</span> -->
          </el-form-item>
          <el-form-item v-if="!generateImage" label="主图上传">
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
          <!-- 其他表单项 -->
          <el-form-item label="是否付费">
            <el-radio-group v-model="form.paymentType">
              <el-radio :label="0">免费</el-radio>
              <el-radio :label="1">付费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资源链接">
            <el-input v-model="form.resourceLink" placeholder="请输入资源链接"></el-input>
          </el-form-item>
          <el-form-item label="资源密码">
            <el-input v-model="form.resourcePassword" placeholder="请输入资源密码"></el-input>
          </el-form-item>
          <!-- Video upload -->
          <el-form-item label="视频上传">
            <el-upload v-model:file-list="fileVideoList" class="upload-demo" :action="uploadVideoUrl"
              name="editormd-video-file" :on-success="handleVideoUploadSuccess" :before-upload="beforeVideoUpload"
              :limit="1" :on-exceed="onExceedVideo" drag multiple list-type="text">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>

          <!-- Carousel image upload -->
          <el-form-item label="轮播图">
            <div class="updata" shadow="never">
              <el-upload v-model:file-list="fileListCarousel" drag multiple class="pure-upload" list-type="picture-card"
                accept="image/jpeg,image/png,image/gif" :action="uploadUrl" name="editormd-image-file" :limit="5"
                :on-exceed="onExceedCarousel" :before-upload="onBefore" :on-success="handleUploadSuccessCarousel">
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
                      fileListCarousel.length > 1 && '!cursor-move'
                    ]">
                      <span title="查看" class="hover:text-primary" @click="handlePictureCardPreviewCarousel(file)">
                        <IconifyIconOffline :icon="Eye" class="hover:scale-125 duration-100" />
                      </span>
                      <span class="el-upload-list__item-delete" @click="handleRemoveCarousel(file)">
                        <span title="移除" class="hover:text-[var(--el-color-danger)]">
                          <IconifyIconOffline :icon="Delete" class="hover:scale-125 duration-100" />
                        </span>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>
              <!-- 有时文档没写并不代表没有，多看源码好处多多😝 https://github.com/element-plus/element-plus/tree/dev/packages/components/image-viewer/src （emm...这让我想起刚开始写这个项目时，很多东西只有英文或者没有文档，需要看源码时，想笑🥹。那些美好时光都给这些坑了，giao） -->
              <el-image-viewer v-if="dialogVisibleCarousel" :initialIndex="curOpenImgIndex" :url-list="urlListCarousel"
                :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" @close="dialogVisibleCarousel = false"
                @switch="index => (curOpenImgIndex = index)" />
              <!-- 将自定义内容插入到body里，有了它在图片预览的时候，想插入个分页器或者别的东东在预览区某个位置就很方便咯（用户需求可以很灵活，开源组件库几乎不可能尽善尽美，很多时候寻找别的解决途径或许更好） -->
              <teleport to="body">
                <div v-if="fileListCarousel[curOpenImgIndex] && dialogVisibleCarousel" effect="dark" round size="large"
                  type="info" class="img-name">
                  <p class="text-[#fff] dark:text-black">
                    {{ fileListCarousel[curOpenImgIndex].name }}
                  </p>
                </div>
              </teleport>
            </div>
          </el-form-item>
          <!-- 其他表单项 -->
        </el-form>
      </template>
      <!-- Confirmation button -->
      <div class="confirmation-button">
        <el-button type="primary" @click="confirmArticle">确认</el-button>
      </div>
    </el-card>


  </div>
</template>

<style lang="scss" scoped>
#editor-container {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
  background-color: #409EFF;
  /* 背景色 */
  font-size: 24px;
  /* 字体大小 */
  font-weight: bold;
  /* 字体加粗 */
  color: #ffffff;
  /* 字体颜色 */
  text-align: center;
  /* 文本居中 */
  border-radius: 5px;
  /* 圆角 */
  margin-bottom: 20px;
  /* 底部外边距 */
}

.el-collapse-item__header {
  padding-left: 10px;
}
</style>

<style lang="scss" scoped>
#editor-container {
  max-width: 800px;
  margin: 0 auto;
}


.el-collapse-item__header {
  padding-left: 10px;
}

.confirmation-button {
  margin-top: 20px;
  text-align: right;
  /* Align the button to the right */
}

.confirmation-button .el-button {
  margin-left: 10px;
  /* Add some space between the button and other elements */
}

.card-body {
  border-bottom: 1px solid #ebeef5;
  /* 添加边框作为分割线 */
  padding-bottom: 15px;
  /* 添加一些内边距 */
  margin-bottom: 15px;
  /* 在分割线下方留出空间 */
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
