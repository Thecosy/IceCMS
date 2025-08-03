import { $t } from "@/plugins/i18n";
import { resourcesManagement } from "@/router/enums"; // Assuming contentManagement is already defined in enums

export default {
  path: "/resources-management",
  redirect: "/resources-management/create-article",
  meta: {
    icon: "card",
    title: $t("menus.hsResourcesManagement"), // Assuming you also change the translation keys accordingly
    rank: resourcesManagement
  },
  children: [
    {
      path: "/resources-management/create-article",
      name: "CreateResources",
      component: () => import("@/views/resources-management/create-article/index.vue"),
      meta: {
        icon: "create",
        title: $t("menus.hsCreateResources"), // Assuming translation keys are adjusted as needed
        showParent: true
      }
    },
    {
      path: "/resources-management/edit-article/:articleId",
      name: "EditResources",
      component: () => import("@/views/resources-management/create-article/index.vue"),
      meta: {
        showLink: false, // 这个路由不会在菜单中显示
        title: $t("menus.hsEditArticle")
      }
    },
    {
      path: "/resources-management/article-list",
      name: "ResourcesList",
      component: () => import("@/views/resources-management/article-list/index.vue"),
      meta: {
        icon: "list",
        title: $t("menus.hsResourcesList"), // Make sure to adjust translation keys if necessary
        showParent: true
      }
    },
    {
      path: "/resources-management/comment-management",
      name: "ResourcesCommentManagement",
      component: () => import("@/views/resources-management/comment-management/index.vue"),
      meta: {
        icon: "comment",
        title: $t("menus.hsCommentManagement"), // Ensure translation keys are changed accordingly
        showParent: true
      }
    },
    {
      path: "/resources-management/category-management",
      name: "ResourcesCategoryManagement",
      component: () => import("@/views/resources-management/category-management/index.vue"),
      meta: {
        icon: "category",
        title: $t("menus.hsCategoryManagement"), // Confirm translation keys are updated as needed
        showParent: true
      }
    }
  ]
};
