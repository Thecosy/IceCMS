import { $t } from "@/plugins/i18n";
import { storeManagement } from "@/router/enums"; // 假设已在enums中定义了storeManagement

export default {
  path: "/store-management",
  redirect: "/store-management/store-overview",
  meta: {
    icon: "guide",
    title: $t("menus.hsStoreManagement"),
    rank: storeManagement
  },
  children: [
    {
      path: "/store-management/store-overview",
      name: "StoreOverview",
      component: () => import("@/views/store-management/store-overview/index.vue"),
      meta: {
        icon: "overview",
        title: $t("menus.hsStoreOverview"),
        showParent: true
      }
    },{
      path: "/store-management/pay-ment",
      name: "PayMent",
      component: () => import("@/views/store-management/pay-ment/index.vue"),
      meta: {
        icon: "member",
        title: $t("menus.hsPayMent"),
        showParent: true
      }
    },
    {
      path: "/store-management/member-management",
      name: "MemberManagement",
      component: () => import("@/views/store-management/member-management/index.vue"),
      meta: {
        icon: "member",
        title: $t("menus.hsMemberManagement"),
        showParent: true
      }
    },
    {
      path: "/store-management/order-management",
      name: "OrderManagement",
      component: () => import("@/views/store-management/order-management/index.vue"),
      meta: {
        icon: "order",
        title: $t("menus.hsOrderManagement"),
        showParent: true
      }
    }
  ]
};
