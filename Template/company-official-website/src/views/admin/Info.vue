<template>
    <div class="info-container">
        <el-card class="card">
            <div class="title">【基础信息配置】</div>
            <div class="center">
                <!-- <img src="@/assets/avatar.png" width="100px" height="100px" alt=""> -->
            </div>
            <el-form :model="footerData" label-width="120px" class="input-width">
                <el-form-item label="首页标题">
                    <el-input v-model="footerData.homeTitle"></el-input>
                </el-form-item>
                <el-form-item label="首页描述">
                    <el-input v-model="footerData.homeDescription" type="textarea" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="footerData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="footerData.email"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="footerData.address"></el-input>
                </el-form-item>
                <el-form-item label="网站logo">
                    <el-input v-model="footerData.beianImage"></el-input>
                    <el-upload ref="logoUpload" class="upload-demo" :action="uploadUrl" :before-upload="beforeLogoUpload"
                        :on-success="handleLogoUploadSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">上传logo</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="微信客服二维码">
                    <el-input v-model="footerData.weChatImage"></el-input>
                    <el-upload ref="upload" class="upload-demo" :action="uploadUrl" :before-upload="beforeUpload"
                        :on-success="handleUploadSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">上传图片</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="ICP">
                    <el-input v-model="footerData.icp"></el-input>
                </el-form-item>
                <el-form-item label="公安信息">
                    <el-input v-model="footerData.publicSecurity"></el-input>
                </el-form-item>
                <el-form-item label="版权">
                    <el-input v-model="footerData.copyright"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveFooterData">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import service from '@/utils/request' // 导入封装好的 axios 实例
import { getFooterData, updateFooterData } from '@/api/index'
import { baseUrl } from '@/config/index'

export default {
    name: 'Info',
    data() {
        return {
            footerData: {
                id: 1,
                phone: '',
                email: '',
                address: '',
                weChatImage: '',
                beianImage: '',
                icp: '',
                publicSecurity: '',
                copyright: '' ,
                homeTitle: '', // 新增字段
                homeDescription: '' // 新增字段
            },
            uploadUrl: '/v1/fileUpload/upload' // 修改为相对路径
        };
    },
    mounted() {
        this.fetchFooterData();
    },
    methods: {
        async fetchFooterData() {
            try {
                const response = await getFooterData();
                if (response.code === 0 && response.data.length > 0) {
                    this.footerData = response.data[0];
                } else {
                    console.error('Failed to fetch footer data:', response.message);
                }
            } catch (error) {
                console.error('Failed to fetch footer data:', error);
            }
        },
        async saveFooterData() {
            try {
                const response = await updateFooterData(this.footerData);
                if (response.code === 0) {
                    this.$message.success('保存成功');
                } else {
                    this.$message.error('保存失败: ' + response.message);
                }
            } catch (error) {
                // 判断是否是登录超时
                if (error.response.status === 401) {
                    this.$message.error('登录超时，请重新登录');
                } else {
                    this.$message.error('保存失败: ' + error);
                }
            }
        },
        handleUploadSuccess(response) {
            if (response.code === 0) {
                this.footerData.weChatImage = `${baseUrl}/v1/getLatestImage?fileName=${response.data}`;
                this.$message.success('图片上传成功');
            } else {
                // 判断是否是登录超时
                if (response.code === 401) {
                    this.$message.error('登录超时，请重新登录');
                } else {
                    this.$message.error('图片上传失败: ' + response.message);
                }
            }
        },
        beforeUpload(file) {
            // 动态添加 userId 到 form-data
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', localStorage.getItem('SET_NAME'));

            // 手动上传文件
            this.uploadFile(formData);
            return false; // 阻止 el-upload 的默认上传行为
        },
        async uploadFile(formData) {
            try {
                const response = await service.post(this.uploadUrl, formData);
                this.handleUploadSuccess(response);
            } catch (error) {
                // 判断是否是登录超时
                if (response.code === 401) {
                    this.$message.error('登录超时，请重新登录');
                } else {
                    this.$message.error('图片上传失败: ' + response.message);
                }
            }
        },
        handleLogoUploadSuccess(response) {
            if (response.code === 0) {
                this.footerData.beianImage = `${baseUrl}/v1/getLatestImage?fileName=${response.data}`;
                this.$message.success('Logo上传成功');
            } else {
                if (response.code === 401) {
                    this.$message.error('登录超时，请重新登录');
                } else {
                    this.$message.error('Logo上传失败: ' + response.message);
                }
            }
        },
        beforeLogoUpload(file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', localStorage.getItem('SET_NAME'));
            this.uploadLogo(formData);
            return false;
        },
        async uploadLogo(formData) {
            try {
                const response = await service.post(this.uploadUrl, formData);
                this.handleLogoUploadSuccess(response);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.$message.error('登录超时，请重新登录');
                } else {
                    this.$message.error('Logo上传失败: ' + error.message);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.info-container {
    padding: 20px;
}

.card {
    min-height: 500px;
}

.title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.center {
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    .info-container {
        padding: 10px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }

    .el-form-item__label {
        float: none;
        display: block;
        text-align: left;
        padding: 0 0 10px;
    }

    .el-form-item__content {
        margin-left: 0 !important;
    }

    .el-input {
        width: 100%;
    }

    .el-button {
        width: 100%;
    }
}
</style>