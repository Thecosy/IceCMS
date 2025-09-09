<template>
  <div>
    <TubelightNav />
    <Banner />
    <div class="container">
      <el-breadcrumb separator="/" class="top">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>当前</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="introduce">
        <h1 class="center">{{ homeTitle }}</h1>
        <p class="center">{{ homeDescription }}</p>
      </div>
      <!-- <div class="">
        <div class="features">
          <div class="feature">
            <img src="@/assets/images/icon.png" alt="古早味" class="feature-icon"/>
            <h3>古早味</h3>
            <p>古早味，是闽南地区特有的饮食文化，是闽南文化的重要组成部分，是闽南文化的象征之一。</p>
          </div>
          <div class="feature">
            <img src="@/assets/images/icon.png" alt="闽南文化" class="feature-icon"/>
            <h3>闽南文化</h3>
            <p>闽南文化，是闽南地区特有的饮食文化，是闽南文化的重要组成部分，是闽南文化的象征之一。</p>
          </div>
          <div class="feature">
            <img src="@/assets/images/icon.png" alt="多元宗教" class="feature-icon"/>
            <h3>多元宗教</h3>
            <p>多元宗教，是闽南地区特有的饮食文化，是闽南文化的重要组成部分，是闽南文化的象征之一。</p>
          </div>
          <div class="feature">
            <img src="@/assets/images/icon.png" alt="多元文化" class="feature-icon"/>
            <h3>多元文化</h3>
            <p>多元文化，是闽南地区特有的饮食文化，是闽南文化的重要组成部分，是闽南文化的象征之一。</p>
          </div>
        </div>
      </div> -->
      <!-- <el-card class="top">
        <div class="left">
          <img class="top5 full-image" src="@/assets/images/weChat-1.jpg"/>
        </div>
      </el-card> -->
      <!-- 为您提供更多资讯和服务 -->
      <el-card class="top">
        <div class="info-services">
        <div class="service" @click="showQRCode">
          <img src="@/assets/images/icon.png" alt="官方商城" class="service-icon" />
          <h3>官方商城</h3>
          <p>总部直销 优惠畅享</p>
        </div>
          <!-- <div class="service" @click="navigateTo('https://example.com/kitchen')">
            <img src="@/assets/images/icon.png" alt="厨房换新" class="service-icon"/>
            <h3>厨房换新</h3>
            <p>享受超值补贴</p>
          </div> -->
          <div class="service" @click="navigateTo('/Business')">
            <img src="@/assets/images/icon.png" alt="招商加盟" class="service-icon" />
            <h3>招商加盟</h3>
            <p>稀缺经销席位</p>
          </div>
          <div class="service" @click="showHotline">
            <img src="@/assets/images/icon.png" alt="服务支持" class="service-icon" />
            <h3>服务支持</h3>
            <p>热线400-887-9882</p>
          </div>
         
        </div>
      </el-card>
      <!-- 新增自动滚动模块 -->
      <el-card class="top">
        <div class="scrolling-container">
          <div class="scrolling-content" v-for="certificate in certificates" :key="certificate.id">
            <img :src="certificate.imageUrl" :alt="certificate.name" class="certificate-image" />
            <h3>{{ certificate.name }}</h3>
            <p>{{ certificate.description }}</p>
          </div>
        </div>
      </el-card>
      <!-- 新增的商品卡片轮播图组件 -->
      <!-- <ProductCarousel /> -->
    </div>
    <el-dialog :visible.sync="hotlineVisible" title="服务支持">
            <div class="hotline-container">
              <p class="hotline-text">热线电话: 400-887-9882</p>
              <el-button type="primary" @click="copyToClipboard('400-887-9882')">复制</el-button>
            </div>
          </el-dialog>
    <el-dialog :visible.sync="qrCodeVisible" title="官方商城" width="30%">
      <div class="qr-code-container">
        <img v-if="footerData" :src="footerData.weChatImage" style="width: 150px; height: 150px" />
        <p>扫描二维码进入官方商城</p>
      </div>
    </el-dialog>
    <Footer class="top" />
  </div>
</template>

<script>
import Banner from './components/Banner'
import ProductCarousel from './components/ProductCarousel' // 引入新组件
import TubelightNav from './components/TubelightNav' // 引入新的导航栏组件
import { getAllCertificates, getFooterData } from '@/api/index' // 引入API方法
export default {
  name: 'Home',
  components: {
    Banner, // 轮播图
    ProductCarousel, // 横向商品
    TubelightNav // 新导航栏
  },
  props: {},
  watch: {},
  data() {
    return {
      homeTitle: '',
      homeDescription: '',
      hotlineVisible: false,// 服务支持弹窗
      certificates: [], // 存储证书数据
      qrCodeVisible: false,
      footerData: null
    };
  },
  mounted() {
    this.fetchHomeData();
    this.fetchCertificates();
    this.fetchFooterData();
  },
  created() { },
  methods: {
    navigateTo(url) {
      // window.location.href = url;
      this.$router.push(url);
    },
    showHotline() {
      this.hotlineVisible = true;
    },
    copyToClipboard(text) {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      this.$message.success('复制成功');
    },
    async fetchCertificates() {
      try {
        const response = await getAllCertificates();
        this.certificates = response.data;
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      }
    },
    async fetchHomeData() {
      try {
        const response = await getFooterData();
        // console.log("response", response);
        if (response && response.data) {
          this.homeTitle = response.data[0].homeTitle || 'IceCMS';
          this.homeDescription = response.data[0].homeDescription || '一个XXXXXXXXXX、经典、文化的深度用户';
        }
      } catch (error) {
        console.error('获取首页数据失败:', error);
      }
    },
    showQRCode() {
      this.qrCodeVisible = true;
    },
    async fetchFooterData() {
      try {
        const response = await getFooterData();
        if (response && response.data && response.data.length > 0) {
          this.footerData = response.data[0];
        }
      } catch (error) {
        console.error('获取页脚数据失败:', error);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.hotline-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hotline-text {
  font-size: 18px;
  /* Increase font size */
  user-select: text;
  /* Make text selectable */
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure the page takes at least the full height of the viewport
  padding: 20px;
  margin-top: 150px; // 增加导航栏与内容的距离

  @media (max-width: 768px) {
    padding: 10px;
    margin-top: 130px; // 在移动设备上调整这个值
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
}

.container {
  flex: 1; // Allow the container to grow and fill available space
  margin-bottom: 100px; // Add space between container and footer
}

.introduce {
  margin: 60px 0;
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(59, 130, 246, 0.05));
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    line-height: 1.2;
  }
  
  p {
    font-size: 1.2rem;
    color: #6b7280;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    margin: 30px 0;
    padding: 30px 15px;
    
    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
}

.center {
  text-align: center;
}

.about-us {
  margin: 40px 0;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    position: relative;
  }

  h2::after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: red;
    margin: 10px auto 0;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
  }
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .feature {
    width: 200px;
    text-align: center;
    margin-bottom: 20px;

    .feature-icon {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: #666;
    }
  }
}

/* 现代化信息服务样式 */
.info-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px 0;
  margin: 40px 0;

  .service {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 30px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(30, 64, 175, 0.2);
      
      &::before {
        opacity: 1;
      }
      
      .service-icon {
        transform: scale(1.1) rotateY(180deg);
      }
      
      h3 {
        color: #1e40af;
      }
    }

    .service-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 20px;
      border-radius: 15px;
      padding: 10px;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      transition: all 0.3s ease;
      position: relative;
      z-index: 2;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 15px;
      color: #2d3748;
      transition: color 0.3s ease;
      position: relative;
      z-index: 2;
    }

    p {
      font-size: 0.95rem;
      color: #6b7280;
      line-height: 1.5;
      position: relative;
      z-index: 2;
    }
    
    @media (max-width: 768px) {
      padding: 25px 15px;
      
      .service-icon {
        width: 50px;
        height: 50px;
      }
      
      h3 {
        font-size: 1.1rem;
      }
      
      p {
        font-size: 0.9rem;
      }
    }
  }
}

.full-image {
  width: 100%;
  height: 100%;
  object-fit: cover; // 保持图片的宽高比并裁剪以填充容器
}

.scrolling-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
}

.scrolling-content {
  display: inline-block;
  animation: scroll 20s linear infinite;
  text-align: center;
  margin: 0 10px;
}

.certificate-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .scrolling-content {
    animation: scroll 10s linear infinite;
  }
}

@keyframes scroll {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  p {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
  }
}
</style>