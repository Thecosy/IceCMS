<template>
    <div class="page">
        <div class="loginBox">
            <el-card class="box-card">
                <h3 class="center">欢迎登录</h3>
                <el-form ref="loginForm" :model="loginForm" label-width="80px" class="top">
                    <el-input placeholder="请输入账号" v-model="loginForm.userName">
                        <template slot="prepend">
                            <i class="el-icon-user"></i>
                        </template>
                    </el-input>
                    <el-input placeholder="请输入密码" v-model="loginForm.password" type="password" show-password class="top">
                        <template slot="prepend">
                            <i class="el-icon-lock"></i>
                        </template>
                    </el-input>
                    <el-button type="primary" @click="handleLogin" style="width: 100%;margin-top: 30px">立即登录</el-button>
                </el-form>
                <!-- <div class="bottom-btn" @click="register">立即注册</div> -->
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    components: {},
    props: {},
    watch: {},
    data() {
        return {
            loginForm: {},
        };
    },

    mounted() {

    },
    created() {

    },

    methods: {
        handleLogin() {
            const { userName, password } = this.loginForm
            if (userName && password) {
                const param = {
                    userName,
                    password,
                };
                this.$store.dispatch("user/login", param).then(response => {
                    if (response.code === 0) {
                        localStorage.setItem('token', response.data.token);
                        this.$router.push({
                            path: this.redirect || "/info", 
                            query: this.otherQuery,
                        });
                    } else {
                        this.$message.warning("账号或密码错误！");
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$message.warning("账号或密码错误！");
                });
            } else {
                this.$message.warning("账号或密码不能为空！");
                return false;
            }
        },
        register() {
            this.$router.push({
                path: '/register'
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;

    .loginBox {
        width: 100%;
        height: 100%;
        background-image: url(../../assets/login-bg-2.jpg);
        background-size: cover;
        background-position: 50%;
        position: relative;
        display: flex;
        align-items: center;

        @media (max-width: 768px) {
            background-size: contain;
        }
    }

    .box-card {
        width: 400px;
        position: absolute;
        right: 150px;

        .bottom-btn {
            font-size: 14px;
            margin-top: 5px;
        }

        @media (max-width: 768px) {
            width: 300px;
            right: 50px;
        }

        @media (max-width: 480px) {
            width: 100%;
            right: 0;
            padding: 10px;
        }
    }
}
</style>

<style>
.dialog-border {
    border-radius: 10px;
}
</style>
