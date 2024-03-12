import { $t } from "@/plugins/i18n";
import { settings } from "@/router/enums"; // 假设已在enums中定义了settings

export default {
  path: "/settings",
  redirect: "/settings/website-information",
  meta: {
    icon: "setting",
    title: $t("menus.hsSettings"),
    rank: settings
  },
  children: [
    {
      path: "/settings/website-information",
      name: "WebsiteInformation",
      component: () => import("@/views/settings/website-information/index.vue"),
      meta: {
        icon: "website",
        title: $t("menus.hsWebsiteInformation"),
        showParent: true
      }
    },
    {
      path: "/settings/tag-settings",
      name: "TagSettings",
      component: () => import("@/views/settings/tag-settings/index.vue"),
      meta: {
        icon: "tag-settings",
        title: $t("menus.hsTag-settings"),
        showParent: true
      }
    },
    {
      path: "/settings/image-upload",
      name: "ImageUploadSettings",
      component: () => import("@/views/settings/image-upload/index.vue"),
      meta: {
        icon: "image-upload",
        title: $t("menus.hsImageUploadSettings"),
        showParent: true
      }
    }
  ]
};
