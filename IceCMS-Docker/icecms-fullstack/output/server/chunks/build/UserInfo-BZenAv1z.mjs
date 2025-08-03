import { _ as __nuxt_component_0, E as ElAvatar, a as __nuxt_component_2 } from './Top-z7S4M5x-.mjs';
import { _ as _export_sfc, R as __nuxt_component_3 } from './server.mjs';
import { _ as __nuxt_component_4 } from './Mobile-B_yVIgB6.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { v as vLoading } from './el-loading-B0BjiLcr.mjs';
import { defineComponent, ref, reactive, watch, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import './el-overlay-D0BXiGeq.mjs';
import '@vue/shared';
import './el-button-LIU117i9.mjs';
import 'lodash-unified';
import './index-C6mv4HvU.mjs';
import './event-BZTOGHfp.mjs';
import './el-form-DWMILsFE.mjs';
import './el-input-2q_vffSS.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './el-popper-mKntyvEc.mjs';
import './useUserStore-gmH42dcJ.mjs';
import './index-uy8e5Xzu.mjs';
import 'perfect-debounce';
import './webuser-CDNs4gr0.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserInfo",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    const loading = ref(false);
    const user = ref({
      userid: "",
      name: "",
      username: "",
      profile: "",
      intro: "",
      email: "",
      phone: "",
      gender: "",
      height: "",
      birthday: "",
      academic: "",
      monthly: "",
      permanent: "",
      userage: 0,
      createTime: "",
      lastLogin: "",
      integral: 0
    });
    reactive({
      userId: "",
      profile: ""
    });
    const router = useRouter();
    watch(
      () => router.currentRoute.value,
      () => {
        requestAnimationFrame(() => {
          (void 0).scrollTo({ top: (void 0).scrollY, behavior: "smooth" });
        });
      }
    );
    const activeItem = ref("Gai");
    useRoute();
    const menuItems = [
      { key: "Gai", label: "概览", link: "/userInfo", icon: "b2font b2-user-heart-line b2-light b2-color" },
      { key: "Fa", label: "作品查看", link: "/userInfo/post", icon: "b2font b2-quill-pen-line b2-light b2-color" },
      { key: "Hui", label: "关注列表", link: "/userInfo/follow", icon: "b2font b2-hand-heart-line b2-light b2-color" },
      { key: "Ding", label: "订单", link: "/userInfo/payInfo", icon: "b2font b2-file-list-2-line b2-light b2-color" },
      { key: "Yuan", label: "会员中心", link: "/userInfo/vip", icon: "b2font b2-hands-heart-line b2-light b2-color" },
      { key: "Chong", label: "充值中心", link: "/userInfo/charge", icon: "b2font b2-heart-add-line b2-light b2-color" },
      { key: "Xiu", label: "修改密码", link: "/userInfo/changePw", icon: "b2font b2-hearts-line b2-light b2-color" },
      { key: "Si", label: "私信", link: "/userInfo/chat/1", icon: "b2font b2-hearts-line b2-light b2-color" },
      { key: "Shou", label: "发布作品", link: "/userInfo/star", icon: "b2font b2-star-line b2-light b2-color" }
      // 这里可以继续添加其他菜单项
    ];
    const image = ref("https://img.tukuppt.com/bg_grid/00/14/86/WvJAithG7a.jpg!/fh/350");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_el_avatar = ElAvatar;
      const _component_NuxtLink = __nuxt_component_2;
      const _component_NuxtPage = __nuxt_component_3;
      const _component_mobile = __nuxt_component_4;
      const _component_foot = __nuxt_component_12;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-4a86a246><div id="__nuxt" data-v-4a86a246><div id="__layout" data-v-4a86a246><div data-fetch-key="0" class="app macwk-animation" data-v-4a86a246>`);
      _push(ssrRenderComponent(_component_top, null, null, _parent));
      _push(`<div data-v-4a86a246><section style="${ssrRenderStyle({ "margin-bottom": "100px" })}" class="layout-index pc-model mt-5" data-v-4a86a246><div id="content" class="site-content" data-v-4a86a246><div id="author" class="author wrapper" data-v-4a86a246><div class="box b2-radius author-header" data-v-4a86a246><div class="mask-wrapper" style="${ssrRenderStyle({ backgroundImage: "url(" + image.value + ")" })}" data-v-4a86a246><div data-v-4a86a246><div class="user-cover-button" data-v-4a86a246><label class="empty button" for="cover-input" data-v-4a86a246><i class="b2font b2-image-fill" data-v-4a86a246></i><span data-v-4a86a246>上传封面图片</span></label><input id="cover-input" type="file" class="b2-hidden-always" accept="image/jpg,image/jpeg,image/png,image/gif" data-v-4a86a246></div></div></div><div class="user-panel" data-v-4a86a246><div class="avatar" data-v-4a86a246>`);
      _push(ssrRenderComponent(_component_el_avatar, mergeProps({
        shape: "square",
        size: 150,
        src: user.value.profile
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), null, _parent));
      _push(`<label class="editor-avatar" for="avatar-input" data-v-4a86a246><i class="b2font b2-image-fill" data-v-4a86a246></i><span data-v-4a86a246>修改我的头像</span></label><input id="avatar-input" type="file" class="b2-hidden-always" accept="image/jpg,image/jpeg,image/png,image/gif" data-v-4a86a246></div><div class="user-panel-info" data-v-4a86a246><div class="" data-v-4a86a246><h1 style="${ssrRenderStyle({ "display": "flex" })}" data-v-4a86a246><span id="userDisplayName" class="usertopName" data-v-4a86a246>${ssrInterpolate(user.value.name || user.value.username || "新用户")}</span></h1><p data-v-4a86a246>${ssrInterpolate(user.value.intro || "这个人很懒，什么都没有留下！")}</p></div><div class="user-panel-editor-button" data-v-4a86a246><div class="user-follow" data-v-4a86a246></div></div></div></div></div><div class="author-table mg-t" data-v-4a86a246><div class="author-page-right" data-v-4a86a246><div class="author-page-right-in box b2-radius" data-v-4a86a246><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<div data-v-4a86a246>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.link
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass(["user-sidebar-info", { active: activeItem.value === item.key }])}" data-v-4a86a246${_scopeId}><p data-v-4a86a246${_scopeId}><i class="${ssrRenderClass(item.icon)}" data-v-4a86a246${_scopeId}></i> ${ssrInterpolate(item.label)}</p><div class="author-sidebar-down" data-v-4a86a246${_scopeId}><i class="b2font b2-arrow-right-s-line" data-v-4a86a246${_scopeId}></i></div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["user-sidebar-info", { active: activeItem.value === item.key }]
                }, [
                  createVNode("p", null, [
                    createVNode("i", {
                      class: item.icon
                    }, null, 2),
                    createTextVNode(" " + toDisplayString(item.label), 1)
                  ]),
                  createVNode("div", { class: "author-sidebar-down" }, [
                    createVNode("i", { class: "b2font b2-arrow-right-s-line" })
                  ])
                ], 2)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(_component_mobile, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-4a86a246><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-4a86a246></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UserInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4a86a246"]]);

export { UserInfo as default };
//# sourceMappingURL=UserInfo-BZenAv1z.mjs.map
