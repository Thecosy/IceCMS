import { $t } from "@/plugins/i18n";
import { notificationManagement } from "@/router/enums";
import Bell from "@iconify-icons/ep/bell";
import Notification from "@iconify-icons/ep/message";
import Announcement from "@iconify-icons/ep/chat-dot-round";

export default {
  path: "/notification",
  redirect: "/notification/notification-list",
  meta: {
    icon: Bell,
    title: $t("menus.hsNotificationManagement"),
    rank: notificationManagement
  },
  children: [
    {
      path: "/notification/notification-list",
      name: "NotificationList",
      component: () => import("@/views/notification/notification-list/index.vue"),
      meta: {
        title: $t("menus.hsNotificationList"),
        showParent: true
      }
    },
    {
      path: "/notification/announcement-settings",
      name: "AnnouncementSettings",
      component: () => import("@/views/notification/announcement-settings/index.vue"),
      meta: {
        title: $t("menus.hsAnnouncementSettings"),
        showParent: true
      }
    }
  ]
};
