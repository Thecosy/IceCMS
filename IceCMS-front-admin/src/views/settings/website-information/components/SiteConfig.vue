<template>
  <el-card shadow="never" class="site-config">
    <template #header>
      <div class="clearfix">
        <span>网站配置</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <el-form-item label="网站标题">
        <el-input v-model="siteConfig.sitTitle" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="网站域名 (例如www.icecms.cn)">
        <el-input v-model="siteConfig.sitSrc" class="input-width">
        </el-input>
      </el-form-item>
         <!-- 启用域名图片开关 -->
         <el-form-item label="启用图片域名绑定">
        <el-switch v-model="imageSiteEnabled"></el-switch>
      </el-form-item>
      <el-form-item label="主图上传">
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
      <el-form-item label="版权信息">
        <el-input v-model="siteConfig.banquan" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="备案号">
        <el-input v-model="siteConfig.beian" class="input-width"></el-input>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="saveSettings">保存</el-button>
        <el-button @click="resetSettings">取消</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getSettingInfo, setSettingInfo } from '@/api/setting/webinfo';

import { ElMessageBox, ElNotification } from 'element-plus';


import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import { UploadFile, UploadRawFile, ElMessage } from 'element-plus';// import { ElUploadFile } from "element-plus/lib/el-upload/src/upload.type";
import Sortable from "sortablejs";
import { getKeyList, extractFields, downloadByData } from "@pureadmin/utils";
import { message } from "@/utils/message";

const imageSiteEnabled = ref(true);

const siteConfig = ref({
  sitTitle: '',
  sitLogo: '',
  sitSrc: '',
  banquan: '',
  imageFormat: '',
  beian: '',
  h5Show: '',
});

// 初始化网站配置
const initSiteConfig = async () => {
  try {
    const response = await getSettingInfo();
    if (response && response.data) {
      siteConfig.value = response.data;
      fileList.value = [{ name: 'image', url: siteConfig.value.sitLogo }];
    }
  } catch (error) {
    console.error('Error fetching site config:', error);
  }
};

// 图片上传模块开始
const fileList = ref([]);
const curOpenImgIndex = ref(0);
const dialogVisible = ref(false);

// 拼接环境变量和路径
const { VITE_APP_BASE_API } = import.meta.env;
const uploadUrl = ref(`${VITE_APP_BASE_API}/FileApi/updateimage`);

const urlList = computed(() => getKeyList(fileList.value, "url"));

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

// 保存设置
const saveSettings = async () => {
  try {
    siteConfig.value.sitLogo = fileList.value[0].url;
    console.log('siteConfig.value:', siteConfig.value);
    await setSettingInfo(siteConfig.value);
    console.log('Settings saved successfully');
    ElNotification({
      title: '成功',
      message: '保存成功',
      type: 'success',
    });
  } catch (error) {
    console.error('Error saving site config:', error);
  }
};

// 重置设置
const resetSettings = () => {
  initSiteConfig(); // 重新加载初始配置
};

onMounted(initSiteConfig);
</script>

<style scoped>
.input-width {
  width: 35%;
  /* 默认情况下，输入框宽度为页面宽度的 35% */
}

/* 媒体查询 */
@media (max-width: 768px) {

  /* 在屏幕宽度小于或等于 768px 的设备上，输入框宽度调整为 100% */
  .input-width {
    width: 100%;
  }
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  /* 按钮之间的间隔 */
}</style>

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