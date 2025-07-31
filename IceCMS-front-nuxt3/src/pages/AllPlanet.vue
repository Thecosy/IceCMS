<script setup lang="ts">
import { getSquareClasslist } from "../../api/websquareClass";

// 标题栏默认值为 'nav-link active'
const acticve = ref<string>("nav-link active");
const setting = ref<any>({});
const classlist = ref<any[]>([]);
const loading = ref(true);

// 分享功能相关状态
const showShareModal = ref(false);
const shareUrl = ref('');
const shareTitle = ref('全部圈子 - IceCMS');
const shareDescription = ref('发现更多有趣圈子，参与社区讨论');

// **获取圈子分类数据**
await getPlanetData();
async function getPlanetData() {
  try {
    const res = await getSquareClasslist();
    console.log('获取圈子分类数据:', res);
    
    // 处理圈子分类数据
    if (res && res.data && res.data.value) {
      classlist.value = Array.isArray(res.data.value) ? res.data.value : [];
    } else if (res && Array.isArray(res)) {
      classlist.value = res;
    } else {
      console.warn('获取圈子分类数据为空');
      classlist.value = [];
    }
  } catch (error) {
    console.error("获取圈子分类数据出错:", error);
    // 出错时设置空数组，保证页面可以正常渲染
    classlist.value = [];
  } finally {
    loading.value = false;
  }
}

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings;

// 初始化分享信息
if (process.client) {
  shareUrl.value = window.location.href;
}

// 分享功能方法

// QQ分享
function shareToQQ(item?: any) {
  const url = encodeURIComponent(shareUrl.value);
  const title = encodeURIComponent(item ? `${item.name} - 圈子分类` : shareTitle.value);
  const desc = encodeURIComponent(item ? `${item.name}圈子分类，探索有趣的社区讨论` : shareDescription.value);
  
  const qqShareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}&summary=${desc}&site=IceCMS`;
  window.open(qqShareUrl, '_blank', 'width=600,height=400');
}

// 微博分享
function shareToWeibo(item?: any) {
  const url = encodeURIComponent(shareUrl.value);
  const title = encodeURIComponent(item ? `${item.name} - 圈子分类` : shareTitle.value);
  const content = `${title} ${url}`;
  
  const weiboShareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${content}&pic=`;
  window.open(weiboShareUrl, '_blank', 'width=600,height=400');
}

// 微信分享（显示二维码）
function shareToWechat() {
  // 微信分享需要二维码，这里简单处理
  navigator.clipboard?.writeText(shareUrl.value).then(() => {
    alert('链接已复制到剪切板，可以分享到微信了！');
  }).catch(() => {
    prompt('请复制以下链接分享到微信:', shareUrl.value);
  });
}

// 复制链接
function copyLink() {
  navigator.clipboard?.writeText(shareUrl.value).then(() => {
    alert('链接已复制到剪切板！');
  }).catch(() => {
    prompt('请复制以下链接:', shareUrl.value);
  });
}

// 其他分享平台
function shareToOther(platform: string) {
  const url = encodeURIComponent(shareUrl.value);
  const title = encodeURIComponent(shareTitle.value);
  
  let shareUrlTemplate = '';
  
  switch (platform) {
    case 'twitter':
      shareUrlTemplate = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case 'facebook':
      shareUrlTemplate = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'linkedin':
      shareUrlTemplate = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'telegram':
      shareUrlTemplate = `https://t.me/share/url?url=${url}&text=${title}`;
      break;
    default:
      return;
  }
  
  window.open(shareUrlTemplate, '_blank', 'width=600,height=400');
}

// 显示分享模态框
function showShare() {
  showShareModal.value = true;
}

// 关闭分享模态框
function closeShareModal() {
  showShareModal.value = false;
}
</script>

<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
           <top :message4="acticve" />
          <div>
            <div
              class="
                layout-min-full-height
                special-standard
                our-special
                py-7
                pc-model
              "
            >
              <div class="container">
                <!-- 加载状态 -->
                <div v-if="loading" class="text-center py-5">
                  <div class="loading-spinner">
                    <i class="el-icon-loading"></i>
                    <p class="mt-2">加载中...</p>
                  </div>
                </div>
                
                <!-- 空状态 -->
                <div v-else-if="classlist.length === 0" class="text-center py-5">
                  <div class="empty-state">
                    <i class="el-icon-folder-opened" style="font-size: 48px; color: #ddd;"></i>
                    <p class="mt-2 text-muted">暂无圈子分类数据</p>
                  </div>
                </div>
                
                <!-- 圈子分类列表 -->
                <div v-else class="row">
                  <div v-for="item in classlist" :key="item?.id || Math.random()" class="col-3 delay-0 list-animation-leftIn">
                    <nuxt-link :to="'/planet/' + (item?.id || '')">
                      <a class="cursor-pointer">
                        <div class="single-special-member">
                          <div class="wrapper">
                            <div class="img-box">
                              <el-image :src="item?.imgclass || '/default-planet.png'" lazy>
                                <div slot="placeholder" class="image-slot">
                                  <img style="width:100%; height:100%; object-fit:cover;" src="../static/image/loding.gif" />
                                </div>
                                <div slot="error" class="image-slot">
                                  <div class="default-img">
                                    <i class="el-icon-chat-dot-round" style="font-size: 32px; color: #ddd;"></i>
                                  </div>
                                </div>
                              </el-image>
                            </div>
                            <div class="info-meta">
                              <h6 class="name">
                                {{ item?.name || '未知圈子' }}
                                <span class="ml-2 text-muted fs-16"> ({{ item?.postCount || 0 }}帖) </span>
                              </h6>
                            </div>
                          </div>
                          <div class="hover-content">
                            <p class="share-buttons">
                              <span @click.prevent="shareToWeibo(item)" class="share-btn weibo-btn" title="分享到微博">
                                <i class="icon-weibo"></i>
                              </span>
                              <span @click.prevent="shareToQQ(item)" class="share-btn qq-btn" title="分享到QQ">
                                <i class="icon-qq"></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </nuxt-link>
                  </div>
                </div>
                <div class="clearfix pt-8"></div>
              </div>
            </div>
            <mobile />
          </div>
          <foot />
          <div infos="0">
            <div
              class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 
<script>
import { getNewArticle } from '@/api/webarticle'
import { formatDate } from '@/utils/date.js'
import { getCarousel } from '@/api/setting'
import { getResourceClasslist } from '@/api/webresourceclass'
export default ({
  name: 'Home',
  components: {
    top: () => import("./components/Top.vue"),
    foot: () => import("./components/Foots.vue"),
  },
  created() {
    this.getList()
  },
   methods: {
      getList() {
      getResourceClasslist().then(resp => {
        //获取分类
        console.log(resp)
        this.classlist = resp.data
      })
    },
   },
  data() {
    return {
      classlist:"",
      acticve:'nav-link active',
    }
  },
  
})
</script> -->
<style scoped>
.delayImg {
  height: 100px;
  width: 145px;
}

/* 确保行布局正常 */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

/* 确保列布局正常 */
.col-3 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 25%;
  max-width: 25%;
}

/* 加载状态样式 */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
}

.loading-spinner i {
  font-size: 32px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

/* 默认图片样式 */
.default-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
}

/* 卡片悬停效果增强 */
.single-special-member {
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}

.single-special-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 分享按钮样式 */
.share-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 0;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.share-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.weibo-btn {
  background: linear-gradient(135deg, #ff6b35 0%, #e85d2c 100%);
}

.qq-btn {
  background: linear-gradient(135deg, #12b7f5 0%, #0e9fe3 100%);
}

.share-btn i {
  font-size: 16px;
}

/* 响应式断点 */
@media (max-width: 1199px) {
  .col-3 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}

@media (max-width: 991px) {
  .col-3 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 575px) {
  .col-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
<style>
.white1 {
  background-color: rgb(255, 255, 255);
  z-index: -1;
}
.index1 {
  z-index: 555;
}
.index {
  z-index: -1;
}
.outsection {
  display: flex;
  align-items: center;
  justify-content: center;
}
.Thecarousel {
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  width: 1435px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>