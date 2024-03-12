import { $t } from "@/plugins/i18n";

const operates = [
  {
    title: $t("login.phoneLogin"),
    page: 1
  },
  {
    title: $t("login.qRCodeLogin"),
    page: 2
  },
  {
    title: $t("login.register"),
    page: 3
  }
];

const thirdParty = [
  {
    title: $t("login.weChatLogin"),
    icon: "wechat"
  },
  {
    title: $t("login.alipayLogin"),
    icon: "alipay"
  },
  {
    title: $t("login.qqLogin"),
    icon: "qq"
  },
  {
    title: $t("login.weiboLogin"),
    icon: "weibo"
  }
];

export { operates, thirdParty };
