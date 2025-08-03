import Cookies from "js-cookie";
import { storageLocal } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";
import { TokenDTO } from "@/api/common/login";

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

export const userKey = "user-info";
export const TokenKey = "authorized-token";
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = "multiple-tabs";
export const sessionKey = "user-info";

/**
 * 后端处理token
 */
export function setTokenFromBackend(data, rememberMe = false, loginDays = 7): void {
  const { isRemembered, loginDay } = useUserStoreHook();
  const cookieOptions: Cookies.CookieAttributes = {
    sameSite: 'None',
    secure: true
  };

  // 如果勾选了记住登录，设置cookie过期时间
  if (rememberMe || isRemembered) {
    const days = Number(loginDays || loginDay);
    console.log("设置Cookie过期时间:", days, "天");
    cookieOptions.expires = days;
  }

  const cookieString = JSON.stringify(data);
  Cookies.set(TokenKey, cookieString, cookieOptions);
  Cookies.set(multipleTabsKey, 'multiple-tabs', cookieOptions);

  useUserStoreHook().SET_USERNAME(data.name);

  // 创建一个符合 DataInfo<number> 接口的对象
  const days = Number(rememberMe || isRemembered ? loginDays || loginDay : 1);
  const userInfo: DataInfo<number> = {
    accessToken: data.token,
    expires: Date.now() + 1000 * 60 * 60 * 24 * days, // 过期时间根据是否记住登录设置
    refreshToken: "your_refresh_token_here",
    username: data.name,
    avatar: data.profile,
    roles: ["user_role_1"],
    userId: data.userid
  };

  // 使用 localStorage 存储 userInfo 对象
  localStorage.setItem(userKey, JSON.stringify(userInfo));
}

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0;
  const { accessToken, refreshToken } = data;
  const { isRemembered, loginDay } = useUserStoreHook();
  expires = new Date(data.expires).getTime(); // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  const cookieString = JSON.stringify({ accessToken, expires });

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
      expires: (expires - Date.now()) / 86400000
    })
    : Cookies.set(TokenKey, cookieString);

  Cookies.set(
    multipleTabsKey,
    "true",
    isRemembered
      ? {
        expires: Number(loginDay)
      }
      : {}
  );

  function setUserKey(username: string, roles: Array<string>) {
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_ROLES(roles);
    storageLocal().setItem(userKey, {
      refreshToken,
      expires,
      username,
      roles
    });
  }

  if (data.username && data.roles) {
    const { username, roles } = data;
    setUserKey(username, roles);
  } else {
    const username =
      storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "";
    const roles =
      storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
    setUserKey(username, roles);
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove(multipleTabsKey);
  storageLocal().removeItem(userKey);
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};
