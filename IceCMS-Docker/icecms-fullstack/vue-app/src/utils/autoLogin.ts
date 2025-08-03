import Cookies from "js-cookie";
import { TokenKey, multipleTabsKey, userKey } from "./auth";
import { useUserStoreHook } from "@/store/modules/user";
import { router } from "@/router";
import { getTopMenu, initRouter } from "@/router/utils";
import { message } from "@/utils/message";

/**
 * 检查是否有有效的登录信息，如果有则自动登录
 * @returns {Promise<boolean>} 是否自动登录成功
 */
export async function checkAutoLogin(): Promise<boolean> {
  // 检查是否有token和多标签页cookie
  const tokenCookie = Cookies.get(TokenKey);
  const multipleTabsCookie = Cookies.get(multipleTabsKey);

  // 如果没有token或多标签页cookie，则不进行自动登录
  if (!tokenCookie || !multipleTabsCookie) {
    return false;
  }

  try {
    // 解析token
    const tokenData = JSON.parse(tokenCookie);

    // 检查token是否过期
    if (tokenData.expires && new Date(tokenData.expires).getTime() < Date.now()) {
      // token已过期，清除cookie
      Cookies.remove(TokenKey);
      Cookies.remove(multipleTabsKey);
      return false;
    }

    // 获取用户信息
    const userInfoStr = localStorage.getItem(userKey);
    if (!userInfoStr) {
      return false;
    }

    const userInfo = JSON.parse(userInfoStr);

    // 更新store中的用户信息
    const userStore = useUserStoreHook();
    userStore.SET_USERNAME(userInfo.username);
    if (userInfo.roles) {
      userStore.SET_ROLES(userInfo.roles);
    }

    // 初始化路由
    await initRouter();

    return true;
  } catch (error) {
    console.error("自动登录失败:", error);
    return false;
  }
}
