import { F as defineStore } from './server.mjs';

const useUserStore = defineStore("user", {
  state: () => ({
    email: localStorage.getItem("email") || "",
    gender: localStorage.getItem("gender") || "",
    intro: localStorage.getItem("intro") || "",
    name: localStorage.getItem("name") || "",
    profile: localStorage.getItem("profile") || "",
    token: localStorage.getItem("token") || "",
    // 从 localStorage 获取 token
    userid: localStorage.getItem("userid") || "",
    username: localStorage.getItem("username") || "",
    // 临时用户信息
    tempUser: JSON.parse(localStorage.getItem("temp-user") || "null")
  }),
  getters: {
    fullName: (state) => `${state.name} (${state.username})`,
    isLoggedIn: (state) => !!state.token,
    userIntro: (state) => state.intro || "这位用户很神秘！",
    // 检查是否有临时用户或正式用户
    hasUser: (state) => !!state.token || !!state.tempUser,
    // 获取当前用户信息（优先使用正式用户，否则使用临时用户）
    currentUser: (state) => {
      if (state.token) {
        return {
          name: state.name,
          email: state.email,
          profile: state.profile,
          userid: state.userid,
          username: state.username,
          isTemp: false
        };
      } else if (state.tempUser) {
        return {
          name: state.tempUser.username,
          email: state.tempUser.email,
          profile: "",
          userid: "",
          username: state.tempUser.username,
          isTemp: true
        };
      }
      return null;
    }
  },
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.email = userInfo.email;
      this.gender = userInfo.gender;
      this.intro = userInfo.intro;
      this.name = userInfo.name;
      this.profile = userInfo.profile;
      this.token = userInfo.token;
      this.userid = userInfo.userid;
      this.username = userInfo.username;
      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("gender", userInfo.gender);
      localStorage.setItem("intro", userInfo.intro);
      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("profile", userInfo.profile);
      localStorage.setItem("token", userInfo.token);
      localStorage.setItem("userid", userInfo.userid);
      localStorage.setItem("username", userInfo.username);
    },
    // 清除用户信息（用于退出登录）
    clearUserInfo() {
      this.email = "";
      this.gender = "";
      this.intro = "";
      this.name = "";
      this.profile = "";
      this.token = "";
      this.userid = "";
      this.username = "";
      localStorage.removeItem("email");
      localStorage.removeItem("gender");
      localStorage.removeItem("intro");
      localStorage.removeItem("name");
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
    },
    // 更新用户的简介
    updateUserIntro(newIntro) {
      this.intro = newIntro;
      localStorage.setItem("intro", newIntro);
    },
    // 更新用户的资料图片
    updateProfilePicture(newProfile) {
      this.profile = newProfile;
      localStorage.setItem("profile", newProfile);
    },
    // 更新用户信息（部分更新）
    updateUserInfo(userInfo) {
      if (userInfo.userid !== void 0) {
        this.userid = userInfo.userid;
        localStorage.setItem("userid", userInfo.userid);
      }
      if (userInfo.name !== void 0) {
        this.name = userInfo.name;
        localStorage.setItem("name", userInfo.name);
      }
      if (userInfo.username !== void 0) {
        this.username = userInfo.username;
        localStorage.setItem("username", userInfo.username);
      }
      if (userInfo.profile !== void 0) {
        this.profile = userInfo.profile;
        localStorage.setItem("profile", userInfo.profile);
      }
      if (userInfo.intro !== void 0) {
        this.intro = userInfo.intro;
        localStorage.setItem("intro", userInfo.intro);
      }
      if (userInfo.email !== void 0) {
        this.email = userInfo.email;
        localStorage.setItem("email", userInfo.email);
      }
      if (userInfo.gender !== void 0) {
        this.gender = userInfo.gender;
        localStorage.setItem("gender", userInfo.gender);
      }
    },
    // 设置临时用户信息
    setTempUser(tempUserInfo) {
      this.tempUser = tempUserInfo;
      localStorage.setItem("temp-user", JSON.stringify(tempUserInfo));
    },
    // 清除临时用户信息
    clearTempUser() {
      this.tempUser = null;
      localStorage.removeItem("temp-user");
    },
    // 清除所有用户信息（包括临时用户）
    clearAllUserInfo() {
      this.clearUserInfo();
      this.clearTempUser();
    }
  }
});

export { useUserStore as u };
//# sourceMappingURL=useUserStore-gmH42dcJ.mjs.map
