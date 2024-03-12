// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { system, permission, frame, tabs } from "@/router/enums";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const tabsRouter = {
  path: "/tabs",
  meta: {
    icon: "tag",
    title: "menus.hstabs",
    rank: tabs
  },
  children: [
    {
      path: "/tabs/index",
      name: "Tabs",
      meta: {
        title: "menus.hstabs",
        roles: ["admin", "common"]
      }
    },
    // query 传参模式
    {
      path: "/tabs/query-detail",
      name: "TabQueryDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/tabs/index",
        roles: ["admin", "common"]
      }
    },
    // params 传参模式
    {
      path: "/tabs/params-detail/:id",
      component: "params-detail",
      name: "TabParamsDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/tabs/index",
        roles: ["admin", "common"]
      }
    }
  ]
};

export default defineFakeRoute([
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [tabsRouter]
      };
    }
  }
]);
