import { $t } from "@/plugins/i18n";
import { userManagement } from "@/router/enums"; // 假设已在enums中定义了userManagement

export default {
  path: "/user-management",
  redirect: "/user-management/role-management",
  meta: {
    icon: "role",
    title: $t("menus.hsUserManagement"),
    rank: userManagement
  },
  children: [
    {
      path: "/user-management/role-management",
      name: "RoleManagement",
      component: () => import("@/views/user-management/role-management/index.vue"),
      meta: {
        icon: "admin",
        title: $t("menus.hsRoleManagement"),
        showParent: true
      }
    },
    {
      path: "/user-management/user-list",
      name: "UserList",
      component: () => import("@/views/user-management/user-list/index.vue"),
      meta: {
        icon: "list",
        title: $t("menus.hsUserList"),
        showParent: true
      }
    },
    {
      path: "/user-management/admin-info",
      name: "AdminInfo",
      component: () => import("@/views/user-management/admin-info/index.vue"),
      meta: {
        icon: "admin",
        title: $t("menus.hsAdminInfo"),
        showParent: true
      }
    }
  ]
};
