<script setup lang="ts">
import resetPwd from "./resetPwd.vue";
import userInfo from "./userInfo.vue";
import userAvatar from "./userAvatar.vue";
// import userAvatar from "./userAvatar";
// import { getUserProfile } from '@/api/system/user';
// import * as userApi from "@/api/system/userApi";
import { ref, reactive,onMounted } from "vue";
import dayjs from "dayjs";
// import { useUserStoreHook } from "@/store/modules/user";
import { storageLocal } from "@pureadmin/utils";
import { updateUserProfileApi, UserProfileRequest,GetUserInfoByid } from "@/api/system/user";
import { any } from "vue-types";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
  roleName: {},
  postName: {}
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
    console.log('user',currentUserInfo)

state.user = currentUserInfo;
const UserInfo = ref({
});
// 初始化网站配置
const initSiteConfig = async () => {
  try {
    const response = await GetUserInfoByid(currentUserInfo.userId);
    if (response ) {
      UserInfo.value = response;
      // console.log('Site config loaded:', response);
      // dispositionCarousel.value = response.data;
      // console.log('Site config loaded:', dispositionCarousel.value);
    }
  } catch (error) {
    console.error('Error fetching site config:', error);
  }
};
onMounted(initSiteConfig);

</script>
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div class="text-center">
              <!-- <userAvatar :user="state.user" /> -->
            </div>

            <el-row>
              <el-descriptions :column="1">
                <el-descriptions-item label="用户名称">{{
                  UserInfo.name
                }}</el-descriptions-item>
                <el-descriptions-item label="手机号码">{{
                  UserInfo.phone
                }}</el-descriptions-item>
                <el-descriptions-item label="用户邮箱">{{
                  UserInfo.email
                }}</el-descriptions-item>
  
                <el-descriptions-item label="角色">
                  <!-- {{ UserInfo.roleName }} -->管理员
                </el-descriptions-item>
                <el-descriptions-item label="创建日期">
                  {{
                    dayjs(UserInfo.createTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </el-descriptions-item>
              </el-descriptions>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>基本资料</span>
            </div>
          </template>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="state.user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="state.user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
