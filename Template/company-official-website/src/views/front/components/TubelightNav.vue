<template>
  <div class="tubelight-nav-container">
    <nav class="tubelight-nav">
      <div class="nav-content">
        <!-- Logo区域 -->
        <div class="logo-section">
          <img v-if="logoImage" :src="logoImage" alt="logo" class="logo-img">
          <span v-else class="logo-text">Logo</span>
        </div>

        <!-- 导航菜单 -->
        <div class="nav-menu">
          <div 
            v-for="(item, index) in navList" 
            :key="index"
            @click="navigateTo(item)"
            :class="['nav-item', { 'active': isActive(item.path) }]"
            @mouseenter="setHoverIndex(index)"
            @mouseleave="setHoverIndex(-1)"
          >
            <span class="nav-text">{{ item.name }}</span>
            <div 
              v-if="isActive(item.path)" 
              class="tubelight-effect"
            >
              <!-- 主光效 -->
              <div class="tube-main"></div>
              <!-- 光晕效果 -->
              <div class="tube-glow"></div>
              <div class="tube-glow-2"></div>
              <div class="tube-spark"></div>
            </div>
          </div>
        </div>

        <!-- 登录区域 -->
        <div class="login-section">
          <div v-if="!isLogin" class="login-btn" @click="login">
            <span>登录</span>
          </div>
          <div v-else class="user-menu">
            <el-dropdown trigger="hover">
              <div class="user-info">
                <el-avatar :src="avatarUrl" :size="32"></el-avatar>
                <span class="username">{{ name }}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="goToAdmin">
                  <span>后台管理</span>
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'TubelightNav',
  data() {
    return {
      navList: [
        {
          name: '首页',
          path: '/home',
        },
        {
          name: '产品与服务',
          path: '/ProductService',
        },
        {
          name: '招商',
          path: '/Business',
        },
        {
          name: '关于我们',
          path: '/about',
        },
      ],
      isLogin: false,
      logoImage: null,
      hoverIndex: -1,
      avatarUrl: 'https://www.aliboxx.com/uploadfile/avatar/8.png'
    };
  },
  computed: {
    ...mapGetters(["avatar", "name", "roles"]),
  },
  mounted() {
    this.isLogin = localStorage.getItem("token") ? true : false;
    this.loadLogoImage();
  },
  methods: {
    loadLogoImage() {
      const cachedFooterData = localStorage.getItem('footerData');
      if (cachedFooterData) {
        const footerData = JSON.parse(cachedFooterData);
        this.logoImage = footerData.beianImage;
      }
    },
    isActive(path) {
      return this.$route.path === path;
    },
    navigateTo(item) {
      this.$router.push({ path: item.path });
    },
    setHoverIndex(index) {
      this.hoverIndex = index;
    },
    login() {
      this.$router.push('/login');
    },
    logout() {
      this.$message.success('退出成功');
      localStorage.removeItem('token');
      this.isLogin = false;
      this.$router.replace({ path: '/login' });
    },
    goToAdmin() {
      this.$router.push({ path: '/info' });
    }
  }
};
</script>

<style lang="scss" scoped>
.tubelight-nav-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 90%;
  max-width: 1200px;
}

.tubelight-nav {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 8px 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo-section {
  display: flex;
  align-items: center;
  min-width: 120px;

  .logo-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .logo-text {
    font-size: 24px;
    font-weight: bold;
    color: #2d3748;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

.nav-item {
  position: relative;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  .nav-text {
    position: relative;
    z-index: 2;
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
    transition: all 0.3s ease;
  }

  &:hover .nav-text {
    color: #2d3748;
    transform: translateY(-1px);
  }

  &.active {
    .nav-text {
      color: #ffffff;
      font-weight: 600;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }
}

.tubelight-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 30px;
  overflow: hidden;
  z-index: 1;

  .tube-main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    border-radius: 30px;
    animation: pulse 2s ease-in-out infinite alternate;
  }

  .tube-glow {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    border-radius: 34px;
    opacity: 0.6;
    filter: blur(8px);
    animation: glow 2s ease-in-out infinite alternate;
  }

  .tube-glow-2 {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    border-radius: 38px;
    opacity: 0.3;
    filter: blur(16px);
    animation: glow 2s ease-in-out infinite alternate 0.5s;
  }

  .tube-spark {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 4px;
    height: 4px;
    background: #ffffff;
    border-radius: 50%;
    transform: translateY(-50%);
    animation: spark 1.5s ease-in-out infinite;
    box-shadow: 0 0 10px #ffffff;
  }
}

.login-section {
  min-width: 120px;
  display: flex;
  justify-content: flex-end;

  .login-btn {
    padding: 10px 20px;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .user-menu {
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 25px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .username {
        font-size: 14px;
        color: #4a5568;
        font-weight: 500;
      }
    }
  }
}

// 动画效果
@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.02);
  }
}

@keyframes glow {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.8;
  }
}

@keyframes spark {
  0%, 100% {
    opacity: 0;
    transform: translateY(-50%) translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-50%) translateX(200px);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .tubelight-nav-container {
    top: 10px;
    width: 95%;
  }

  .tubelight-nav {
    padding: 6px 16px;
  }

  .nav-content {
    height: 50px;
  }

  .nav-item {
    padding: 8px 16px;

    .nav-text {
      font-size: 13px;
    }
  }

  .logo-section {
    min-width: 80px;

    .logo-img {
      height: 32px;
      width: 32px;
    }

    .logo-text {
      font-size: 20px;
    }
  }

  .login-section {
    min-width: 80px;

    .login-btn {
      padding: 8px 16px;
      font-size: 13px;
    }
  }
}

@media (max-width: 480px) {
  .nav-menu {
    gap: 4px;
  }

  .nav-item {
    padding: 6px 12px;

    .nav-text {
      font-size: 12px;
    }
  }
}
</style> 