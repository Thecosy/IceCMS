<script setup lang="ts">
// import { updateUserProfile } from '@/api/system/userApi';
// import * as userApi from "@/api/system/userApi";
import { ref, reactive,onMounted } from "vue";
import { updateUserProfileApi, UserProfileRequest,GetUserInfoByid } from "@/api/system/user";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { storageLocal } from "@pureadmin/utils";

defineOptions({
  name: "SystemUserProfile"
});

const userRef = ref<FormInstance>();

const props = defineProps({
  user: {
    type: Object
  }
});

const userModel = reactive<UserProfileRequest>({
  nickname: props.user.nickname,
  phoneNumber: props.user.phoneNumber,
  email: props.user.email,
  sex: props.user.sex
});

/** 用户名 */
// const currentUserInfo = useUserStoreHook()?.currentUserInfo;
export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 用户名 */
  username?: string;
  /** 当前登录用户的头像 */
  avatar?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
  /** 当前登录用户的id */
  userId?: number;
}

const userKey = "user-info";

const currentUserInfo =
  storageLocal().getItem<DataInfo<number>>(userKey);
    // console.log('user',currentUserInfo)

const UserInfo = ref({
});

// 初始化网站配置
const initSiteConfig = async () => {
  try {
    console.log('currentUserInfo.userId',currentUserInfo.userId);
    const response = await GetUserInfoByid(currentUserInfo.userId);
    if (response) {
      UserInfo.value = response;
      console.log('Site config loaded:', response);
      // dispositionCarousel.value = response.data;
      // console.log('Site config loaded:', dispositionCarousel.value);
    }
  } catch (error) {
    console.error('Error fetching site config:', error);
  }
};
onMounted(initSiteConfig);

// console.log(userModel);
// console.log(props.user);

// const { proxy } = getCurrentInstance();

const rules = ref({
  name: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "邮箱地址不能为空", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"]
    }
  ],
  phone: [
    { required: true, message: "手机号码不能为空", trigger: "blur" },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur"
    }
  ]
});

/** 提交按钮 */
function submit() {
  console.log(UserInfo.value);
  userRef.value.validate(valid => {
    if (valid) {
      updateUserProfileApi(currentUserInfo.accessToken,UserInfo.value).then(() => {
        message("修改成功", {
          type: "success"
        });
      });
    }
  });
}
</script>

<template>
  <el-form ref="userRef" :model="UserInfo" :rules="rules" label-width="80px">
    <el-form-item label="用户昵称">
      <el-input v-model="UserInfo.name" maxlength="30" />
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="UserInfo.phone" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="UserInfo.email" maxlength="50" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="UserInfo.gender">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
