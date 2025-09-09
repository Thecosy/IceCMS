<template>
    <div class="page">
        <div class="loginBox">
            <el-card class="box-card">
                <h3 class="center top">基本信息</h3>
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left" label-width="110px"
                    class="top">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="账号" prop="supName">
                                <el-input v-model="ruleForm.supName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="密码" prop="taxNum">
                                <el-input v-model="ruleForm.taxNum" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="重复密码" prop="taxNum">
                                <el-input v-model="ruleForm.taxNum" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="center">
                        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                    </el-row>
                </el-form>
                <div class="bottom-btn" @click="login">返回登录</div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { baseUrl } from '@/config/index'
import {
    login,
    sendMobileVerifyCode,
    compareVerifycode,
    resetpass,
    register,
    getSignTypeList,
    zcDelectFile,
} from "@/api/user";

export default {
    name: 'register',
    components: {},
    props: {},
    watch: {},
    data () {
        var validatePass = (rule, value, callback) => {
            if (value == "") {
                callback(new Error("请输入密码"));
            } else {
                const reg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{8,}/;
                if (reg.test(value)) {
                    if (this.ruleForm.passwordCofirm !== "") {
                        // this.$refs.ruleForm.validateField('checkPass');
                        callback();
                    }
                } else {
                    callback(new Error("密码必须为8位以上包含大小写字母、特殊字符"));
                }
            }
        };
        return {
            ruleForm: {},
            fileList: [],
            baseUrl,
            buttonName: "发送验证码",//按钮初始化文字
            rules: {
                taxNum: [{ required: true, message: "请输入税号", trigger: "change" }],
                nickName: [
                    { required: true, message: "请输入昵称", trigger: "change" },
                ],
                phoneNum: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {
                        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: "请输入正确的手机号码"
                    }
                ],
                password: [
                    { validator: validatePass, required: true, trigger: "change" },
                ],
                passwordCofirm: [
                    { validator: validatePass, required: true, trigger: "change" },
                ],
            },
            keyBusinessOptions: [],
            businessFocusOptions: [],
        };
    },

    mounted () {

    },
    created () {

    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const password = this.$md5(this.ruleForm.password)
                    const passwordCofirm = this.$md5(this.ruleForm.passwordCofirm)
                    const param = {
                        param: this.ruleForm.phoneNum,
                        code: this.ruleForm.yzCode,
                    };
                    this.compareVerifycode(param, 0);
                    this.ruleForm.businessLicense = this.fileList.map((e) => e.id);

                    this.ruleForm.operationCertificate = [];
                    this.ruleForm.qualificationCertificate = [];

                    console.log(this.ruleForm, "submit");
                    setTimeout(() => {
                        this.register({
                            ...this.ruleForm,
                            password,
                            passwordCofirm,
                            serviceProviders: ''
                        });
                    }, 0);
                } else {
                    this.$message.error('请填写必填项~')
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        async register (param) {
            try {
                const res = await register(param);
                if (res.status == 0) {
                    this.$notify({
                        title: '提示信息',
                        type: 'success',
                        message: res.body,
                        duration: 0
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path: '/login'
                        })
                    }, 1000)
                } else {
                    this.$message.error(res.message);
                }
            } catch (error) {
                console.log(error);
            }
        },
        login () {
            this.$router.push({
                path: '/login'
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;

    .loginBox {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 50%;
        position: relative;
    }

    .box-card {
        width: 1000px;
        position: absolute;
        left: 50%;
        top: 50%;
        //position: relative;
        margin-left: -500px;
        margin-top: -20%;

        .bottom-btn {
            font-size: 14px;
            margin-top: 5px;
        }
    }
}
</style>
