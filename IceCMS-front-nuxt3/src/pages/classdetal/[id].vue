
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getResourceByClass, getResourceByClassAndType } from '../../../api/webresource';
import { formatDate } from '@/utils/date';
import { getResourceClassNameByid, getResourceClasslist } from '../../../api/webresourceclass';
import httpRequest from '../../../service/index';

const route = useRoute();
const moreIndex = ref(false);
const className = ref<string>('');
const rlist = ref<any[]>([]);
const allCategories = ref<any[]>([]);
const acticve = ref<string>('nav-link active');

// 分页相关状态
const currentPage = ref(1);
const pageSize = ref(12); // 每页显示12个
const totalItems = ref(0);
const totalPages = ref(0);
const loading = ref(false);
const moreaction = () => {
  moreIndex.value = !moreIndex.value;
};

definePageMeta({
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.id)
  }
})

const formatDateString = (time: string | number | Date) => {
  return formatDate(new Date(time), 'yyyy-MM-dd ');
};

const getStyles = (): string => {
  const colors = [
    "linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)",
    "linear-gradient(135deg, #FEB692 10%, #EA5455 100%)",
    "linear-gradient(135deg, #CE9FFC 10%, #7367F0 100%)",
    "linear-gradient(135deg, #90F7EC 10%, #32CCBC 100%)",
    "linear-gradient(135deg, #81FBB8 10%, #28C76F 100%)",
    "linear-gradient(135deg, #E2B0FF 10%, #9F44D3 100%)",
    "linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%)",
    "linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%)",
  ];
  return `background-image: ${colors[Math.floor(Math.random() * colors.length)]};`;
};

await getAllCategories();
async function getAllCategories() {
  try {
    const resp = await getResourceClasslist();
    // 处理 useFetchGet 返回的数据结构
    if (resp && resp.data && resp.data.value) {
      allCategories.value = Array.isArray(resp.data.value) ? resp.data.value : [];
    } else if (resp && Array.isArray(resp)) {

      allCategories.value = resp;
    } else {
      allCategories.value = [];
    }
    console.log('获取所有分类成功:', allCategories.value);
  } catch (error) {
    console.error("获取所有分类失败", error);
    allCategories.value = [];
  }
};

await getClassName();
async function getClassName() {
  try {
    const resp = await getResourceClassNameByid(route.params.id as string);
    // 处理不同的响应数据结构
    if (resp && resp.data) {
      if (resp.data.value) {
        className.value = resp.data.value;
      } else {
        className.value = resp.data;
      }
    } else {
      className.value = '未知分类';
    }
    console.log('获取分类名称成功:', className.value);
  } catch (error) {
    console.error("获取分类名称失败", error);
    className.value = '未知分类';
  }
};

await getList();
async function getList(page: number = currentPage.value) {
  try {
    loading.value = true;
    const resp = await getResourceByClassAndType(
      { page: page, limit: pageSize.value },
      route.params.id,
      'new' // 默认按最新排序，也可以改为其他类型
    );
    
    console.log('分页数据:', resp);
    
    // 处理 Nuxt useFetch 返回的数据结构
    if (resp && resp.data && resp.data.value) {
      const responseData = resp.data.value;
      
      if (responseData && responseData.data) {
        rlist.value = Array.isArray(responseData.data) ? responseData.data : [];
        
        // 设置分页信息
        if (responseData.total !== undefined) {
          totalItems.value = responseData.total;
          totalPages.value = Math.ceil(totalItems.value / pageSize.value);
        } else {
          // 如果没有总数信息，根据返回的数据长度估算
          if (rlist.value.length < pageSize.value) {
            totalPages.value = page;
            totalItems.value = (page - 1) * pageSize.value + rlist.value.length;
          } else {
            totalPages.value = page + 1; // 至少还有下一页
          }
        }
      } else {
        rlist.value = [];
        totalItems.value = 0;
        totalPages.value = 0;
      }
    } else {
      rlist.value = [];
      totalItems.value = 0;
      totalPages.value = 0;
    }
    
    console.log('处理后的数据:', {
      items: rlist.value.length,
      totalItems: totalItems.value,
      totalPages: totalPages.value,
      currentPage: page
    });
  } catch (error) {
    console.error("获取资源列表失败", error);
    rlist.value = [];
    totalItems.value = 0;
    totalPages.value = 0;
  } finally {
    loading.value = false;
  }
};

// 分页处理函数
const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await getList(page);
  // 滚动到顶部
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 监听路由变化重新加载数据
watch(() => route.params.id, async (newId) => {
  if (newId) {
    currentPage.value = 1;
    await getClassName();
    await getList(1);
  }
});

// 获取可见页码
const getVisiblePages = () => {
  const visiblePages = [];
  const maxVisiblePages = 7; // 最多显示7个页码
  
  if (totalPages.value <= maxVisiblePages) {
    // 如果总页数少于等于最大可见页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      visiblePages.push(i);
    }
  } else {
    // 总页数较多时，智能显示页码
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage.value - halfVisible);
    let endPage = Math.min(totalPages.value, currentPage.value + halfVisible);
    
    // 调整起始和结束页码，确保显示固定数量的页码
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    // 添加第一页
    if (startPage > 1) {
      visiblePages.push(1);
      if (startPage > 2) {
        visiblePages.push('...');
      }
    }
    
    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    
    // 添加最后一页
    if (endPage < totalPages.value) {
      if (endPage < totalPages.value - 1) {
        visiblePages.push('...');
      }
      visiblePages.push(totalPages.value);
    }
  }
  
  return visiblePages;
};

</script>

<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <div class="layout-min-full-height overflow-hidden special-content pb-8">
            <top :message4="acticve" />
            <div class="container">
              <div class="row">
                <div class="col-sm-12 col-xxl-10 offset-xxl-1">
                  <header class="text-center py-8">
                    <h1 class="fw-600 fs-60">
                      Best Tools for
                      <span @click="moreaction()"  class="text-primary hover-text-underline cursor">{{ className }} <i
                          class="icon-chevron-down"></i></span>
                    </h1>
                    <span>
                      <div v-show="moreIndex" role="tooltip" id="el-popover-4430" aria-hidden="true" class="el-popover el-popper" 
                        style="width: 300px; ">
                        <!---->
                        <div>
                          <router-link 
                            v-for="category in allCategories" 
                            :key="category.id" 
                            :to="'/classdetal/' + category.id"
                            class="px-5 py-3 fs-26 d-block hover:text-primary transition-colors"
                            :class="{ 'active text-primary': category.id == route.params.id, 'text-dark': category.id != route.params.id }"
                          >
                            {{ category.name }}
                            <span v-if="category.num" class="text-muted fs-14 ml-2">({{ category.num }})</span>
                          </router-link>
                          
                          <!-- 如果没有分类数据，显示提示 -->
                          <div v-if="allCategories.length === 0" class="px-5 py-3 text-center text-muted">
                            暂无分类数据
                          </div>
                        </div>
                      </div>
                      <span class="el-popover__reference-wrapper"></span>
                    </span>
                    <h5 class="text-muted">
                      在这里，您可以找到面向{{ className }}的最佳应用工具。<br />
                      如果您认为我们有所遗漏，请在<a href="/feedback" target="_blank" class="mx-1 text-primary">意见建议</a>处提交给我们，谢谢。
                    </h5>
                  </header>
                  <div class="clearfix special-box-list">
                    <!-- 加载状态 -->
                    <div v-if="loading" class="text-center py-5">
                      <div class="loading-spinner">
                        <i class="el-icon-loading"></i>
                        <p class="mt-2">加载中...</p>
                      </div>
                    </div>
                    
                    <!-- 资源列表 -->
                    <div v-else class="w-r" style="margin-left: -15px; margin-right: -15px">
                      <div
                        v-for="item in rlist"
                        :key="item.id"
                        class="list-animation-leftIn w-c w-c-6 delay-0"
                        style="padding-left: 15px;padding-right: 15px;padding-bottom: 30px;"
                      >
                      <router-link
                              :to="'/list/' + item.id"
                            >
                        <a
                          href=""
                          target="_blank"
                          class="
                            macwk-app
                            white
                            border
                            cursor-pointer
                            mb-0
                            macwk-box__animation
                            delay-0
                          "
                          ><span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <span class="snow-dot"></span>
                          <div class="macwk-app__header--icon delay-0">
                            <div class="macwk-app__header--icon--content"></div>
                            <img class="delay-0" :src="item.thumb" />
                            <div class="flex-grow-1 text-right fs-14"></div>
                          </div>
                          <div class="macwk-app__body pt-6 pb-7">
                            <h4 class="macwk-app__body--title">
                              <span class="fw-600">{{ item.title }}</span>
                            </h4>
                            <p class="macwk-app__body--info">
                              <span>{{item.subhead}}</span>
                            </p>
                            <p class="text-muted text-truncate mb-0">
                              {{ item.intro }}
                            </p>
                          </div>
                          <div class="macwk-app__extend">
                            <div class="macwk-app__extend--download">
                              <i class="icon-download2"></i> <span>{{ item.hits ?? 0 }}</span>
                            </div>
                            <div class="macwk-app__extend--comment">
                              <i class="icon-bubble"></i> <span>0</span>
                            </div>
                            <div class="macwk-app__extend--like">
                              <i class="icon-heart"></i> <span>0</span>
                            </div>
                            <div class="macwk-app__extend--os">
                              <i class="icon-disc fw-600"></i>
                              <span>&gt;= 0</span>
                            </div>
                            <div class="macwk-app__extend--update">
                              <i class="icon-clock"></i> 
                              <span v-if="item.createTime != null"  > {{formatDate(item.createTime)}}</span>
                                        <span v-else  > {{formatDate(item.addTime)}}</span>
                            </div>
                          </div>
                        </a>
                      </router-link>
                      </div>
                      <!-- <div v-for="item in rlist" :key="item.id" class="list-animation-leftIn w-c w-c-6 delay-0">
                        <div v-if="item.status.includes('published')">
                          <router-link :to="'/list/' + item.id">
                            <a class="macwk-app border white cursor-pointer">
                              <el-image v-if="item.thumb != null" class="listtitleimg delay-3" :src="item.thumb" lazy>
                                <div slot="placeholder" class="image-slot">
                                  <img style="
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                      " src="../static/image/loding.gif" />
                                </div>
                              </el-image>

                              <div v-else class="delayImg" :style="getStyles()">
                                <h3 class="
                                      flex
                                      text-center text-white
                                      opacity-50
                                    ">
                                  NOPIC
                                </h3>
                              </div>

                              <div class="macwk-app__body">
                                <h5 class="macwk-app__body--title">
                                  <span class="el-tooltip today-update v-3 item"></span>

                                  <span>{{ item.title | ellipsis }}</span>
                                  <span class="
                                        macwk-app__body--title--version
                                        text-muted
                                        fs-14
                                      "><span class="mx-1">-</span>83.1</span>
                                </h5>
                                <p class="macwk-app__body--info">
                                  <span>{{ item.intro }}</span>
                                </p>
                              </div>
                              <div class="macwk-app__extend">
                                <div class="macwk-app__extend--download">
                                  <i class="icon-download2"></i>
                                  <span>366.4k</span>
                                </div>
                                <div class="macwk-app__extend--comment">
                                  <i class="icon-bubble"></i> <span>800</span>
                                </div>
                                <div class="macwk-app__extend--os">
                                  <i class="icon-disc fw-600"></i>
                                  <span>&gt;= 10.12</span>
                                </div>
                                <div class="
                                      macwk-app__extend--update
                                      justify-content-end
                                    ">
                                  <i class="icon-clock"></i>

                                  <span> 02-10 </span>
                                </div>
                              </div>
                              <div class="macwk-app__footer">
                                <div v-show="showfootnext" class="macwk-app__footer--more">
                                  <i class="light-icon-more icon-next-arrow"></i>
                                </div>
                              </div>
                            </a>
                          </router-link>
                        </div>
                      </div> -->
                      <!-- ----- -->
                    </div>
                    
                    <!-- 分页组件 -->
                    <div v-if="!loading && rlist.length > 0 && totalPages > 1" class="pagination-wrapper text-center mt-5">
                      <nav aria-label="分页导航">
                        <ul class="pagination justify-content-center">
                          <!-- 上一页 -->
                          <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button 
                              class="page-link" 
                              @click="handlePageChange(currentPage - 1)" 
                              :disabled="currentPage === 1"
                            >
                              <i class="icon-chevron-left"></i> 上一页
                            </button>
                          </li>
                          
                          <!-- 页码 -->
                          <li 
                            v-for="page in getVisiblePages()" 
                            :key="page" 
                            class="page-item" 
                            :class="{ active: page === currentPage }"
                          >
                            <button 
                              class="page-link" 
                              @click="handlePageChange(page)"
                              v-if="page !== '...'"
                            >
                              {{ page }}
                            </button>
                            <span v-else class="page-link disabled">...</span>
                          </li>
                          
                          <!-- 下一页 -->
                          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <button 
                              class="page-link" 
                              @click="handlePageChange(currentPage + 1)" 
                              :disabled="currentPage === totalPages"
                            >
                              下一页 <i class="icon-chevron-right"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>
                      
                      <!-- 分页信息 -->
                      <div class="pagination-info mt-3">
                        <span class="text-muted">
                          第 {{ currentPage }} 页，共 {{ totalPages }} 页，共 {{ totalItems }} 条记录
                        </span>
                      </div>
                    </div>
                    
                    <!-- 空状态 -->
                    <div v-else-if="!loading && rlist.length === 0" class="text-center py-5">
                      <div class="empty-state">
                        <i class="el-icon-folder-opened" style="font-size: 48px; color: #ddd;"></i>
                        <p class="mt-2 text-muted">该分类暂无资源</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="sidetools" class="macwk-animation tinUpIn" style="display: none">
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a href="https://t.me/macwk" target="_blank" class="cursor"><span
                      class="sidetools-icon kfqq"></span></a>
                </div>
              </div>
              <div class="sidetools-item">
                <div class="sidetools-wrapper">
                  <a class="el-tooltip cursor"><span class="sidetools-icon back-top"></span></a>
                </div>
              </div>
              <span>
                <div role="tooltip" id="el-popover-3162" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
              <span>
                <div role="tooltip" id="el-popover-2721" aria-hidden="true" class="el-popover el-popper"
                  style="width: 200px; display: none">
                  <!---->
                  <div class="text-center">
                    <a href="/feedback" class="mt-15 mb-0">在线留言</a>
                  </div>
                </div>
                <span class="el-popover__reference-wrapper"></span>
              </span>
            </div>
          </div>
          <foot />
          <div infos="0">
            <div class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 
<script>
import { getResourceByClass } from '@/api/webresource'
import { formatDate, GetWeekdate } from '@/utils/date.js'

import { getResourceClassNameByid } from '@/api/webresourceclass'

export default ({
  name: 'ClassDetal',
  data() {
    return {
      moreIndex: false,
      className: '',
      rlist: '',
      acticve: 'nav-link active',
    }
  },
  created() {
    this.getList()
    this.getClassName()
  },

  methods: {
    moreaction() {
      this.moreIndex = !this.moreIndex
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd ')
    },
    getStyles() {
      //生成随机颜色
      let max = 8;
      let min = 1;

      let x = Math.floor(Math.random() * (max - min + 1)) + min;

      const backcolor = "randomColor" + x;

      if (backcolor == "randomColor1") {
        return "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);"
      }
      if (backcolor == "randomColor2") {
        return "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);"
      }
      if (backcolor == "randomColor3") {
        return "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);"
      }
      if (backcolor == "randomColor4") {
        return "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);"
      }
      if (backcolor == "randomColor5") {
        return "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);"
      }
      if (backcolor == "randomColor6") {
        return "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);"
      }
      if (backcolor == "randomColor7") {
        return "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);"
      }
      if (backcolor == "randomColor8") {
        return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
      }


      return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
    },
    getClassName() {
      getResourceClassNameByid(this.$route.params.id).then(resp => {
        console.log(resp.data)
        this.className = resp.data

      })
    },
    getList() {
      getResourceByClass(this.$route.params.id).then(resp => {
        console.log(resp.data)
        this.rlist = resp.data

      })
    }
  }
})
</script> -->
<style scoped>
.macwk-animation .delay-0{
  padding: 5px;
}
.delayImg {
  height: 100px;
  width: 145px;
  border-radius: 8px;
}
</style>


<style scoped>
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
<style lang="scss" scoped>
.delayImg {
  :v-deep(.el-image__inner) {
      border-radius: 8px;
  }
}

.delay-3 {
  :v-deep(.el-image__inner) {
      width: 224px;
      height: 128px;
      border-radius: 8px 8px 0px 0px;
  }
}

.delayImgs {
  width: 224px;
  height: 128px;
  border-radius: 8px 8px 0px 0px;
}

.h-150 {
  margin-top: -20px;
  margin-bottom: -55px;
  height: 150px !important;
}
</style>


<style lang="scss" scoped>
.macwk-app__body {
  padding: 13px 9px 5px;
}

.macwk-animation .delay-3 {
  border-radius: 8px 8px 0px 0px;
}

.listtitleimg {
  height: 155px;
  width: 260.5px;
}

.delay-3 {
  :v-deep(.el-image__inner) {
      border-radius: 8px 8px 0px 0px;
  }
}

.delayImg {
  height: 155px;
  width: 260.5px;
  border-radius: 8px 8px 0px 0px;
}

.app-content-main .app-content-bottom {
  border-radius: 15px;
}
.el-popover{
  right: 300px;
    position: absolute;
    background: #FFF;
    min-width: 165px;
    border: 1px solid #EBEEF5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
}

/* 分页样式 */
.pagination-wrapper {
  margin-top: 40px;
  margin-bottom: 40px;
}

.pagination {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.page-item {
  margin: 0;
}

.page-link {
  display: block;
  padding: 8px 12px;
  margin: 0;
  text-decoration: none;
  color: #666;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
}

.page-link:hover:not(.disabled) {
  color: #007bff;
  background-color: #f8f9fa;
  border-color: #007bff;
  text-decoration: none;
}

.page-item.active .page-link {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  background-color: #fff;
  border-color: #dee2e6;
  cursor: not-allowed;
}

.page-link.disabled {
  color: #6c757d;
  background-color: #fff;
  border-color: #dee2e6;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
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
</style>