<template>
	<div>
		<TubelightNav/>
		<Banner/>
		<div class="container">
			<el-breadcrumb separator="/" class="top">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>关于我们</el-breadcrumb-item>
			</el-breadcrumb>
			<el-card class="top">
				<div class="left">
					<img v-if="imageUrl" :src="imageUrl" alt="关于我们图片" class="about-image"/>
				</div>
			</el-card>
		</div>
		<Footer class="top"/>
	</div>
</template>

<script>
import Banner from './components/Banner'
import TubelightNav from './components/TubelightNav.vue'
import Footer from './components/Footer.vue'
import { getAboutById } from '@/api/index.js'

export default {
    name: 'About',
    components: { TubelightNav, Footer, Banner },

    data() {
        return {
            imageUrl: ''
        };
    },

    mounted() {
        this.fetchAboutImage();
    },

    methods: {
        fetchAboutImage() {
            getAboutById(1)
                .then(response => {
                    this.imageUrl = response.data.imageUrl; // 假设返回的数据中包含 imageUrl 字段
                })
                .catch(error => {
                    console.error('API request failed:', error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh; // Ensure the page takes at least the full height of the viewport
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
    }

    @media (max-width: 480px) {
        padding: 5px;
    }
}

.container {
    flex: 1; // Allow the container to grow and fill available space
    margin-top: 150px; // 增加导航栏与内容的距离
    margin-bottom: 100px; // Add space between container and footer
    
    @media (max-width: 768px) {
        margin-top: 130px;
    }
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

/* 新增样式 */
.about-image {
    width: 100%;
    height: auto;
    border: 1px solid #e1e1e1;
}
</style>