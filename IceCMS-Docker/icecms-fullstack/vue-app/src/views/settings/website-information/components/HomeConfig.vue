<template>
  <el-card shadow="never" class="home-config">
    <template #header>
      <div class="clearfix">
        <span>首页设置</span>
      </div>
    </template>
    <el-form label-position="top" class="form-container">
      <!-- 轮播图管理卡片 -->
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="table-operations">
            <el-button type="primary" @click="showAddCarouselDialog">添加轮播图</el-button>
          </div>
        </template>
        <el-table :data="dispositionCarousel" style="width: 100%">
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="img" label="图片">
            <template #default="scope">
              <img :src="scope.row.img" style="width: 100px; height: auto;" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="button" label="按钮"></el-table-column>
          <el-table-column prop="introduce" label="简介"></el-table-column>
          <el-table-column prop="introduce" label="链接"></el-table-column>
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button type="primary" plain size="small" @click="showEditCarouselDialog(scope.row)">编辑</el-button>
              <el-button type="danger" plain size="small" @click="confirmDeleteCarousel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 轮播图数量限制设置 -->
      <el-form-item label="轮播图数量限制">
        <el-input-number v-model="carouselLimit" class="input-width" :min="1" :max="10"></el-input-number>
      </el-form-item>

      <!-- 启用特色区域开关 -->
      <el-form-item label="启用特色区域">
        <el-switch v-model="featureAreaEnabled"></el-switch>
      </el-form-item>

<!-- 特色区域内容输入框 -->

<el-form-item v-show="featureAreaEnabled" label="特色区域内容">
  <div class="feature-area">
    <div
      v-for="(block, index) in featureBlocks"
      :key="index"
      class="feature-block"
      style="margin-bottom: 20px;"
    >
      <!-- Content label at the top of each block -->
      <div style="font-weight: bold; margin-bottom: 10px;">
        内容{{ index + 1 }}:
      </div>

      <!-- Divider line -->
      <hr style="border: 1px solid #ddd; margin: 10px 0;" />

      <!-- Inputs for name, link, and color -->
      <div style="display: flex; gap: 10px; align-items: center;">
        <el-input
          v-model="block.featureName"
          style="flex: 1; padding: 10px;"
          placeholder="名称"
        ></el-input>
        <el-input
          v-model="block.featureLink"
          style="flex: 2; padding: 10px;"
          placeholder="链接"
        ></el-input>
        
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 5px;">颜色1：</span>
          <el-color-picker
            v-model="block.featureColor"
            style="padding: 0;"
          ></el-color-picker>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 5px;">颜色2：</span>
          <el-color-picker
            v-model="block.featureColor"
            style="padding: 0;"
          ></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</el-form-item>
<!-- <el-button type="primary" @click="addFeatureBlock">添加区块</el-button> -->
    <!-- <el-button type="danger" @click="removeFeatureBlock" v-if="featureBlocks.length > 1">删除区块</el-button> -->

      <!-- 首页公告输入框 -->
  <!-- 首页公告管理卡片 -->
<el-card class="box-card" shadow="never">
  <template #header>
    <div class="table-operations">
      <el-button type="primary" @click="showAddAnnouncementDialog">添加公告</el-button>
    </div>
  </template>
  
  <el-table :data="announcementList" style="width: 100%">
    <!-- ID列 -->
    <el-table-column prop="id" label="ID" width="80"></el-table-column>
    
    <!-- 标题列 -->
    <el-table-column prop="title" label="标题"></el-table-column>

        <!-- 标题列 -->
        <el-table-column prop="title" label="作者"></el-table-column>

            <!-- 标题列 -->
    <el-table-column prop="title" label="显示"></el-table-column>

    <!-- 内容列 -->
    <el-table-column prop="content" label="内容">
      <template #default="scope">
        <el-input v-model="scope.row.content" type="textarea" readonly style="width: 100%;"></el-input>
      </template>
    </el-table-column>
    
    <!-- 操作列 -->
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button type="primary" plain size="small" @click="showEditAnnouncementDialog(scope.row)">编辑</el-button>
        <el-button type="danger" plain size="small" @click="confirmDeleteAnnouncement(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
      <!-- 按钮操作区 -->
      <div class="button-container">
        <el-button type="primary" @click="saveSettings">保存</el-button>
        <el-button @click="resetSettings">取消</el-button>
      </div>
    </el-form>
  </el-card>

  <!-- 添加轮播图的弹窗 -->
  <el-dialog v-model="dialogVisible" title="添加新内容" width="500px" :before-close="handleDialogClose">
    <el-form label-position="top" class="form-container" @submit.prevent="addCarousel">
      <el-form-item label="轮播图名称" :error="errors.name">
        <el-input v-model="newCarousel.title"></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片链接" :error="errors.imgUrl">
        <el-input v-model="newCarousel.img"></el-input>
      </el-form-item>
      <el-form-item label="简介" :error="errors.imgUrl">
        <el-input v-model="newCarousel.introduce"></el-input>
      </el-form-item>
      <el-form-item label="按钮" :error="errors.imgUrl">
        <el-input v-model="newCarousel.button"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addCarousel">确定</el-button>
    </span>
  </el-dialog>

    <!-- 编辑轮播图的弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑轮播图" width="500px" :before-close="handleEditDialogClose">
    <el-form label-position="top" class="form-container" @submit.prevent="updateCarousel">
      <el-form-item label="轮播图名称" :error="editErrors.name">
        <el-input v-model="editCarousel.title"></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片链接" :error="editErrors.imgUrl">
        <el-input v-model="editCarousel.img"></el-input>
      </el-form-item>
      <el-form-item label="简介" :error="editErrors.introduce">
        <el-input v-model="editCarousel.introduce"></el-input>
      </el-form-item>
      <el-form-item label="按钮" :error="editErrors.button">
        <el-input v-model="editCarousel.button"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="updateCarousel">确定</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { getAllDispositionCarousel, addDispositionCarousel, deleteAllDispositionCarousel, setAllDispositionCarousel,
  getAllFeature, setAllFeature } from '@/api/setting/webinfo';

  import { getAnnouncementslist, newAnnouncements, deleteAnnouncements, updateAnnouncements,
     } from '@/api/setting/announcements';

import { ref, onMounted } from 'vue';
import { ElMessageBox, ElNotification } from 'element-plus';

const carouselLimit = ref(5);
const featuredContent = ref('');
const homeAnnouncement = ref('');
const featureAreaEnabled = ref(true);

const dispositionCarousel = ref([]);
const feature = ref([]);

const dialogVisible = ref(false);
const editDialogVisible = ref(false);
const newCarousel = ref({ title: '', img: '', introduce: '', button: '' });
const editCarousel = ref({ id: '', title: '', img: '', introduce: '', button: '' });
const errors = ref({ name: '', imgUrl: '', introduce: '', button: '' });
const editErrors = ref({ name: '', imgUrl: '', introduce: '', button: '' });

const featureBlocks = ref([
  {id: '', featureTitle: '', featureSrc: '' },
  {id: '', featureTitle: '', featureSrc: '' },
  {id: '', featureTitle: '', featureSrc: '' },
  {id: '', featureTitle: '', featureSrc: '' }
]);

// 初始化公告列表数据
const announcementList = ref([
  { id: 1, title: "公告标题1", content: "公告内容1" },
  { id: 2, title: "公告标题2", content: "公告内容2" },
  // 可以根据需要添加更多公告
]);

// 初始化网站配置
const initSiteConfig = async () => {
  try {
    const response = await getAllDispositionCarousel();
    if (response && response.data) {
      dispositionCarousel.value = response.data;
      console.log('Site config loaded:', dispositionCarousel.value);
    }

    const response1 = await getAllFeature();
    if (response1 && response1.data) {
      featureBlocks.value = response1.data;
      console.log('Site config loaded:', response1);
    }

    const response2 = await getAnnouncementslist();
    if (response2 && response2.data) {
      announcementList.value = response2.data;
      console.log('Site config loaded:', response2);
    }

  } catch (error) {
    console.error('Error fetching site config:', error);
  }
};
onMounted(initSiteConfig);

// 添加轮播图的逻辑
const showAddCarouselDialog = () => {
  if (dispositionCarousel.value.length >= carouselLimit.value) {
    ElNotification({
      title: '警告',
      message: '轮播图数量已达上限',
      type: 'warning',
    });
    return;
  }
  console.log('Showing add carousel dialog');
  dialogVisible.value = true;
};
const showAddAnnouncementDialog= () => {

};
const addCarousel = () => {
  // 表单验证
  errors.value = {};
  if (!newCarousel.value.name) {
    // errors.value.name = '轮播图名称不能为空';
  }
  if (!newCarousel.value.imgUrl) {
    // errors.value.imgUrl = '图片链接不能为空';
  }
  if (Object.keys(errors.value).length) return;

  console.log('Adding carousel:', newCarousel.value);
  
  const response = addDispositionCarousel(newCarousel.value);
    if (response) {
      // dispositionCarousel.value = response.data;
      console.log('Site config loaded:', response);
      ElNotification({
      title: '成功',
      message: '添加成功',
      type: 'success',
    });
    dialogVisible.value = false;

    }
  // 可以在这里调用接口，添加新的轮播图
  // 成功后关闭弹窗，更新界面等操作
  // dispositionCarousel.value.push({ ...newCarousel.value, id: Date.now() }); // Example of adding a new item
  // dialogVisible.value = false;
  // handleDialogClose();
};

const handleDialogClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要关闭此页面?')
    .then(() => done())
    .catch(() => { });
};

const showEditCarouselDialog = (carousel) => {
  editCarousel.value = { ...carousel };
  editDialogVisible.value = true;
};

const showEditAnnouncementDialog = (carousel) => {
  editCarousel.value = { ...carousel };
  editDialogVisible.value = true;
};

const updateCarousel = async () => {
  // 表单验证
  editErrors.value = { name: '', imgUrl: '', introduce: '', button: '' };
  if (!editCarousel.value.title) editErrors.value.name = '轮播图名称不能为空';
  if (!editCarousel.value.img) editErrors.value.imgUrl = '图片链接不能为空';
  if (!editCarousel.value.introduce) editErrors.value.introduce = '简介不能为空';
  if (!editCarousel.value.button) editErrors.value.button = '按钮不能为空';

  if (Object.values(editErrors.value).some(error => error)) return;
  // 登陆
  

  try {
    const response = await setAllDispositionCarousel(editCarousel.value.id, editCarousel.value);
    if (response) {
      const index = dispositionCarousel.value.findIndex(c => c.id === editCarousel.value.id);
      // if (index !== -1) dispositionCarousel.value[index] = response.data;
      ElNotification({
        title: '成功',
        message: '更新成功',
        type: 'success',
      });
      editDialogVisible.value = false;
    }

  } catch (error) {
    console.error('Error updating carousel:', error);
  }
};

const handleEditDialogClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要关闭此页面?')
    .then(() => done())
    .catch(() => {});
};

const confirmDeleteCarousel = async (carouselId) => {
  try {
    await ElMessageBox.confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    const response = await deleteAllDispositionCarousel(carouselId);
    if (response && response.data) {
      dispositionCarousel.value = dispositionCarousel.value.filter(c => c.id !== carouselId);
      ElNotification({
        title: '成功',
        message: '删除成功',
        type: 'success',
      });
    }
  } catch (error) {
    console.error('Error deleting carousel:', error);
  }
};

const confirmDeleteAnnouncement = async (carouselId) => {
  try {
    await ElMessageBox.confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    const response = await deleteAllDispositionCarousel(carouselId);
    if (response && response.data) {
      dispositionCarousel.value = dispositionCarousel.value.filter(c => c.id !== carouselId);
      ElNotification({
        title: '成功',
        message: '删除成功',
        type: 'success',
      });
    }
  } catch (error) {
    console.error('Error deleting carousel:', error);
  }
};

const saveSettings = async () => {
  console.log('featureBlocks.value', featureBlocks.value[0]);
  const response0 = await setAllFeature( featureBlocks.value[0]);
  const response1 = await setAllFeature( featureBlocks.value[1]);
  const response2 = await setAllFeature( featureBlocks.value[2]);
  const response3 = await setAllFeature( featureBlocks.value[3]);

    if (response1) {
      ElNotification({
        title: '成功',
        message: '更新成功',
        type: 'success',
      });
      editDialogVisible.value = false;
    }
  console.log('Settings saved:', { carouselLimit, featuredContent, homeAnnouncement, featureAreaEnabled });
};

const resetSettings = () => {
  carouselLimit.value = 5;
  featuredContent.value = '';
  homeAnnouncement.value = '';
  featureAreaEnabled.value = true;
};
</script>

<style scoped>
.input-width {
  width: 100%;
}

@media (min-width: 769px) {
  .input-width {
    width: 35%;
  }
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
