import { system } from "@/router/enums";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

export default {
  path: "/system",
  redirect: "/store-management/store-overview",
  meta: {
    icon: "monitor",
    title: "menus.hssysManagement",
    rank: system
  },
  children: [
    {
      path: "/system/monitor/onlineUser/index/",
      name: "onlineUser",
      meta: {
        title: "menus.onlineUser",
        roles: ["admin"]
      }
    },
    {
      path: "/system/role/index",
      name: "SystemRole",
      meta: {
        title: "menus.hsRole",
        roles: ["admin"]
      }
    },
    {
      path: "/system/dept/index",
      name: "SystemDept",
      meta: {
        title: "menus.hsDept",
        roles: ["admin"]
      }
    }
  ]
};