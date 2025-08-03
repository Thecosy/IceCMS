import { $t } from "@/plugins/i18n";
import { contentManagement } from "@/router/enums"; // 假设已在enums中定义了contentManagement

export default {
  path: "/content-management",
  redirect: "/content-management/create-article",
  meta: {
    icon: "edit",
    title: $t("menus.hsContentManagement"),
    rank: contentManagement
  },
  children: [
    {
      path: "/content-management/create-article",
      name: "CreateArticle",
      component: () => import("@/views/content-management/create-article/index.vue"),
      meta: {
        icon: "create",
        title: $t("menus.hsCreateArticle"),
        showParent: true
      }
    },
    {
      path: "/content-management/edit-article/:articleId",
      name: "EditArticle",
      component: () => import("@/views/content-management/create-article/index.vue"),
      meta: {
        showLink: false, // 这个路由不会在菜单中显示
        title: $t("menus.hsEditArticle")
      }
    },
    {
      path: "/content-management/article-list",
      name: "ArticleList",
      component: () => import("@/views/content-management/article-list/index.vue"),
      meta: {
        icon: "list",
        title: $t("menus.hsArticleList"),
        showParent: true
      }
    },
    {
      path: "/content-management/comment-management",
      name: "CommentManagement",
      component: () => import("@/views/content-management/comment-management/index.vue"),
      meta: {
        icon: "comment",
        title: $t("menus.hsCommentManagement"),
        showParent: true
      }
    },
    {
      path: "/content-management/category-management",
      name: "CategoryManagement",
      component: () => import("@/views/content-management/category-management/index.vue"),
      meta: {
        icon: "category",
        title: $t("menus.hsCategoryManagement"),
        showParent: true
      }
    }
    // ,
    // {
    //   path: "/content-management/category-managementk",
    //   name: "CategoryManagemenkt",
    //   component: () => import("@/views/upload/index.vue"),
    //   meta: {
    //     icon: "category",
    //     title: $t("menus.hsCategoryManagement"),
    //     showParent: true
    //   }
    // }
  ]
};
