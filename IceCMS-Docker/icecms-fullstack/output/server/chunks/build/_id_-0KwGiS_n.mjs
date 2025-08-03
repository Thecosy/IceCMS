import { _ as __nuxt_component_0, E as ElAvatar, a as __nuxt_component_2 } from './Top-z7S4M5x-.mjs';
import { _ as _export_sfc, R as __nuxt_component_3 } from './server.mjs';
import { _ as __nuxt_component_4 } from './Mobile-B_yVIgB6.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, reactive, watch, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    const user = ref({
      name: "",
      profile: "",
      intro: ""
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-a2970458><div id="__nuxt" data-v-a2970458><div id="__layout" data-v-a2970458><div data-fetch-key="0" class="app macwk-animation" data-v-a2970458>`);
      _push(ssrRenderComponent(_component_top, { message1: _ctx.acticve }, null, _parent));
      _push(`<div data-v-a2970458><section style="${ssrRenderStyle({ "margin-bottom": "100px" })}" class="layout-index pc-model mt-5" data-v-a2970458><div id="content" class="site-content" data-v-a2970458><div id="author" class="author wrapper" data-v-a2970458><div class="box b2-radius author-header" data-v-a2970458><div class="mask-wrapper" style="${ssrRenderStyle({ backgroundImage: "url(" + image.value + ")" })}" data-v-a2970458><div data-v-a2970458><div class="user-cover-button" data-v-a2970458><label class="empty button" for="cover-input" data-v-a2970458><i class="b2font b2-image-fill" data-v-a2970458></i><span data-v-a2970458>上传封面图片</span></label><input id="cover-input" type="file" class="b2-hidden-always" accept="image/jpg,image/jpeg,image/png,image/gif" data-v-a2970458></div></div></div><div class="user-panel" data-v-a2970458><div class="avatar" data-v-a2970458>`);
      _push(ssrRenderComponent(_component_el_avatar, {
        shape: "square",
        size: 150,
        src: user.value.profile
      }, null, _parent));
      _push(`<label class="editor-avatar" for="avatar-input" data-v-a2970458><i class="b2font b2-image-fill" data-v-a2970458></i><span data-v-a2970458>修改我的头像</span></label><input id="avatar-input" type="file" class="b2-hidden-always" accept="image/jpg,image/jpeg,image/png,image/gif" data-v-a2970458></div><div class="user-panel-info" data-v-a2970458><div class="" data-v-a2970458><h1 style="${ssrRenderStyle({ "display": "flex" })}" data-v-a2970458><span id="userDisplayName" class="usertopName" data-v-a2970458>${ssrInterpolate(user.value.name)}</span><span class="user-page-lv" data-v-a2970458><span class="lv-icon user-lv b2-lv0" data-v-a2970458><b data-v-a2970458>Lv0 新手上路</b><i data-v-a2970458>lv0</i></span></span></h1><p data-v-a2970458>${ssrInterpolate(user.value.intro)}</p></div><div class="user-panel-editor-button" data-v-a2970458><div class="user-follow" data-v-a2970458></div></div></div></div></div><div class="author-table mg-t" data-v-a2970458><div class="author-page-right" data-v-a2970458><div class="author-page-right-in box b2-radius" data-v-a2970458><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<div data-v-a2970458>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.link
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass(["user-sidebar-info", { active: activeItem.value === item.key }])}" data-v-a2970458${_scopeId}><a class="link-block" data-v-a2970458${_scopeId}></a><p data-v-a2970458${_scopeId}><i class="${ssrRenderClass(item.icon)}" data-v-a2970458${_scopeId}></i> ${ssrInterpolate(item.label)}</p><div class="author-sidebar-down" data-v-a2970458${_scopeId}><i class="b2font b2-arrow-right-s-line" data-v-a2970458${_scopeId}></i></div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["user-sidebar-info", { active: activeItem.value === item.key }]
                }, [
                  createVNode("a", { class: "link-block" }),
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
      _push(`<div infos="0" data-v-a2970458><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-a2970458></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/otheruserinfo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a2970458"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-0KwGiS_n.mjs.map
