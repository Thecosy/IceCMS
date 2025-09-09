<template>
    <div>
        <TubelightNav />
        <Banner />
        <div class="container">
            <el-breadcrumb separator="/" class="top">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>招商</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card class="top">
                <div class="left">
                    <!-- <img class="top5" style="width: 150px; height: 150px;border: 1px solid #e1e1e1" src="../../assets/images/weChat-1.jpg"/> -->
                    <div class="business-sections">
                        <h2 class="center">商业前景 </h2>
                        <p class="text">xxxxxxxxxxxxxxx</p>
                        <div class="features">
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="top">
                <div class="left">
                    <img class="top5 full-image" src="../../assets/加盟优势.png" />
                </div>
            </el-card>
            <el-card class="top">
                <div class="left">
                    <img class="top5 full-image" src="../../assets/加盟流程.png" />
                </div>
            </el-card>
            <el-card class="top">
                <div class="form-container">
                    <h2 class="join-title">加盟申请</h2>
                    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="contactInfo">
                            <el-input v-model="form.contactInfo" placeholder="请输入电话"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="description">
                            <el-input type="textarea" v-model="form.description" placeholder="请输入备注"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form')">立即申请</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
        <Footer class="top" />
    </div>
</template>

<script>
import Banner from './components/Banner'
import TubelightNav from './components/TubelightNav.vue'
import Footer from './components/Footer.vue'
import { addBusiness } from '@/api/index.js'

export default {
    name: 'About',
    components: { TubelightNav, Footer, Banner },

    data() {
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else if (!/^1[3-9]\d{9}$/.test(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        return {
            form: {
                name: '',
                contactInfo: '',
                description: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                contactInfo: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入备注', trigger: 'blur' }
                ]
            }
        };
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const businessData = {
                        name: this.form.name,
                        contactInfo: this.form.contactInfo,
                        description: this.form.description,
                        isDeleted: false
                    };

                    addBusiness(businessData)
                        .then(response => {
                            console.log('API请求成功:', response);
                            this.$message.success('申请提交成功');
                            this.resetForm(formName);
                        })
                        .catch(error => {
                            console.error('API请求失败:', error);
                            this.$message.error('申请提交失败');
                        });
                } else {
                    console.log('表单验证失败');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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

.business-sections {
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
.full-image {
    width: 100%;
    height: 100%;
    object-fit: cover; // 保持图片的宽高比并裁剪以填充容器
}

.form-container {
    max-width: 600px; // 设置表单容器的最大宽度
    margin: 0 auto; // 将表单容器居中对齐
    padding: 20px;
}

.join-title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    position: relative;
}

.join-title::after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: #409EFF; // 使用主题色
    margin: 10px auto 0;
}
</style>