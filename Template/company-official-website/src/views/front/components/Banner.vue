<template>
    <div>
        <el-carousel :interval="5000" arrow="always" :height="carouselHeight">
            <el-carousel-item v-for="(item, i) in swiperList" :key="i">
                <el-image :src="encodeUrl(item.imageUrl)" alt="" style="width:100%;height:100%" fit="cover"
                    @error="handleImageError" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { getSwiperList } from '@/api/index.js' // 导入API方法

export default {
    name: 'Banner',
    components: {},
    props: {},
    watch: {},
    data() {
        return {
            swiperList: [],
            carouselHeight: '500px', // 默认高度
        };
    },

    mounted() {
        console.log('Component mounted'); // 确认组件挂载
        this.fetchSwiperList(); // 组件挂载后获取数据
        window.addEventListener('resize', this.setCarouselHeight);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setCarouselHeight);
    },
    methods: {
        async fetchSwiperList() {
            console.log('fetchSwiperList called');
            try {
                console.log('Before API call');
                const response = await getSwiperList();
                console.log('API response:', response);
                if (response && response.data) {
                    // 修改这里：只过滤掉deleted为true的轮播图
                    this.swiperList = response.data.filter(item => !item.deleted);
                    console.log('Filtered swiperList:', this.swiperList);
                } else {
                    console.error('API response does not contain data');
                }
            } catch (error) {
                console.error('获取轮播图数据失败:', error);
            }
        },
        encodeUrl(url) {
            const [baseUrl, queryString] = url.split('?');
            if (!queryString) return baseUrl;
            return baseUrl + '?' + queryString.split('&').map(param => {
                const [key, value] = param.split('=');
                return `${key}=${encodeURIComponent(value)}`;
            }).join('&');
        },
        handleImageError(event) {
            console.error('图片加载失败:', event.target.src);
            event.target.src = require('@/assets/banner/default.jpg'); // 替换为默认图片路径
        },
        setCarouselHeight() {
            if (window.innerWidth <= 768) {
                this.carouselHeight = '200px'; // 将移动端高度调整为200px
            } else {
                this.carouselHeight = '500px';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin: 40px 0 20px 0; // 增加顶部边距
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.1));
    z-index: 1;
    pointer-events: none;
  }
}

.el-carousel {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  
  // 自定义轮播图指示器
  :deep(.el-carousel__indicators) {
    bottom: 20px;
    
    .el-carousel__indicator {
      .el-carousel__button {
        width: 30px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
      }
      
      &.is-active .el-carousel__button {
        background: #1e40af;
        transform: scaleX(1.5);
      }
    }
  }
  
  // 自定义轮播图箭头
  :deep(.el-carousel__arrow) {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(30, 64, 175, 0.8);
      transform: scale(1.1);
    }
    
    i {
      font-size: 18px;
    }
  }
}

.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    z-index: 1;
  }
}

.el-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

@media (max-width: 768px) {
  .banner {
    margin: 20px 10px 10px 10px; // 移动端也增加顶部边距
    border-radius: 15px;
  }
  
  .el-carousel {
    height: 250px;
    border-radius: 15px;
    
    :deep(.el-carousel__arrow) {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      
      i {
        font-size: 14px;
      }
    }
  }
  
  .el-image {
    object-position: center;
  }
}

@media (max-width: 480px) {
  .el-carousel {
    height: 200px;
  }
}
</style>