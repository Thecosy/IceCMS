import { $t } from "@/plugins/i18n";
import { communityManagement } from "@/router/enums"; // 假设已在enums中定义了communityManagement

export default {
  path: "/community",
  redirect: "/community/content-management",
  meta: {
    icon: "lollipop",
    title: $t("menus.hsCommunity"),
    rank: communityManagement
  },
  children: [
    {
      path: "/community/content-management",
      name: "CommunityContentManagement",
      component: () => import("@/views/community/content-management/index.vue"),
      meta: {
        icon: "content",
        title: $t("menus.hsCommunityContentManagement"),
        showParent: true
      }
    },
    {
      path: "/community/category-management",
      name: "CommunityCategoryManagement",
      component: () => import("@/views/community/category-management/index.vue"),
      meta: {
        icon: "category",
        title: $t("menus.hsCommunityCategoryManagement"),
        showParent: true
      }
    },
    {
      path: "/community/community-management",
      name: "CommunityManagement",
      component: () => import("@/views/community/community-management/index.vue"),
      meta: {
        icon: "manage",
        title: $t("menus.hsCommunityManagement"),
        showParent: true
      }
    }
  ]
};
