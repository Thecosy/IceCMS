import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './Top-z7S4M5x-.mjs';
import { E as ElImage } from './el-image-viewer-Cf39pgBV.mjs';
import { _ as __nuxt_component_4 } from './Mobile-B_yVIgB6.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_1 } from './loding-CvhOAbHX.mjs';
import { g as getSquareClasslist } from './websquareClass-C9NX0NxG.mjs';
import { _ as _export_sfc, u as useSettingStore } from './server.mjs';
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
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AllPlanet",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const acticve = ref("nav-link active");
    const setting = ref({});
    const classlist = ref([]);
    const loading = ref(true);
    ref(false);
    const shareUrl = ref("");
    const shareTitle = ref("全部圈子 - IceCMS");
    const shareDescription = ref("发现更多有趣圈子，参与社区讨论");
    [__temp, __restore] = withAsyncContext(() => getPlanetData()), await __temp, __restore();
    async function getPlanetData() {
      try {
        const res = await getSquareClasslist();
        console.log("获取圈子分类数据:", res);
        if (res && res.data && res.data.value) {
          classlist.value = Array.isArray(res.data.value) ? res.data.value : [];
        } else if (res && Array.isArray(res)) {
          classlist.value = res;
        } else {
          console.warn("获取圈子分类数据为空");
          classlist.value = [];
        }
      } catch (error) {
        console.error("获取圈子分类数据出错:", error);
        classlist.value = [];
      } finally {
        loading.value = false;
      }
    }
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    function shareToQQ(item) {
      const url = encodeURIComponent(shareUrl.value);
      const title = encodeURIComponent(item ? `${item.name} - 圈子分类` : shareTitle.value);
      const desc = encodeURIComponent(item ? `${item.name}圈子分类，探索有趣的社区讨论` : shareDescription.value);
      const qqShareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}&summary=${desc}&site=IceCMS`;
      (void 0).open(qqShareUrl, "_blank", "width=600,height=400");
    }
    function shareToWeibo(item) {
      const url = encodeURIComponent(shareUrl.value);
      const title = encodeURIComponent(item ? `${item.name} - 圈子分类` : shareTitle.value);
      const content = `${title} ${url}`;
      const weiboShareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${content}&pic=`;
      (void 0).open(weiboShareUrl, "_blank", "width=600,height=400");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_2;
      const _component_el_image = ElImage;
      const _component_mobile = __nuxt_component_4;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-475ab3d3><div data-server-rendered="true" id="__nuxt" data-v-475ab3d3><div id="__layout" data-v-475ab3d3><div data-fetch-key="0" class="app macwk-animation" data-v-475ab3d3>`);
      _push(ssrRenderComponent(_component_top, { message4: unref(acticve) }, null, _parent));
      _push(`<div data-v-475ab3d3><div class="layout-min-full-height special-standard our-special py-7 pc-model" data-v-475ab3d3><div class="container" data-v-475ab3d3>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-5" data-v-475ab3d3><div class="loading-spinner" data-v-475ab3d3><i class="el-icon-loading" data-v-475ab3d3></i><p class="mt-2" data-v-475ab3d3>加载中...</p></div></div>`);
      } else if (unref(classlist).length === 0) {
        _push(`<div class="text-center py-5" data-v-475ab3d3><div class="empty-state" data-v-475ab3d3><i class="el-icon-folder-opened" style="${ssrRenderStyle({ "font-size": "48px", "color": "#ddd" })}" data-v-475ab3d3></i><p class="mt-2 text-muted" data-v-475ab3d3>暂无圈子分类数据</p></div></div>`);
      } else {
        _push(`<div class="row" data-v-475ab3d3><!--[-->`);
        ssrRenderList(unref(classlist), (item) => {
          _push(`<div class="col-3 delay-0 list-animation-leftIn" data-v-475ab3d3>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: "/planet/" + (item?.id || "")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<a class="cursor-pointer" data-v-475ab3d3${_scopeId}><div class="single-special-member" data-v-475ab3d3${_scopeId}><div class="wrapper" data-v-475ab3d3${_scopeId}><div class="img-box" data-v-475ab3d3${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_image, {
                  src: item?.imgclass || "/default-planet.png",
                  lazy: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div slot="placeholder" class="image-slot" data-v-475ab3d3${_scopeId2}><img style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${ssrRenderAttr("src", _imports_1)} data-v-475ab3d3${_scopeId2}></div><div slot="error" class="image-slot" data-v-475ab3d3${_scopeId2}><div class="default-img" data-v-475ab3d3${_scopeId2}><i class="el-icon-chat-dot-round" style="${ssrRenderStyle({ "font-size": "32px", "color": "#ddd" })}" data-v-475ab3d3${_scopeId2}></i></div></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          slot: "placeholder",
                          class: "image-slot"
                        }, [
                          createVNode("img", {
                            style: { "width": "100%", "height": "100%", "object-fit": "cover" },
                            src: _imports_1
                          })
                        ]),
                        createVNode("div", {
                          slot: "error",
                          class: "image-slot"
                        }, [
                          createVNode("div", { class: "default-img" }, [
                            createVNode("i", {
                              class: "el-icon-chat-dot-round",
                              style: { "font-size": "32px", "color": "#ddd" }
                            })
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="info-meta" data-v-475ab3d3${_scopeId}><h6 class="name" data-v-475ab3d3${_scopeId}>${ssrInterpolate(item?.name || "未知圈子")} <span class="ml-2 text-muted fs-16" data-v-475ab3d3${_scopeId}> (${ssrInterpolate(item?.postCount || 0)}帖) </span></h6></div></div><div class="hover-content" data-v-475ab3d3${_scopeId}><p class="share-buttons" data-v-475ab3d3${_scopeId}><span class="share-btn weibo-btn" title="分享到微博" data-v-475ab3d3${_scopeId}><i class="icon-weibo" data-v-475ab3d3${_scopeId}></i></span><span class="share-btn qq-btn" title="分享到QQ" data-v-475ab3d3${_scopeId}><i class="icon-qq" data-v-475ab3d3${_scopeId}></i></span></p></div></div></a>`);
              } else {
                return [
                  createVNode("a", { class: "cursor-pointer" }, [
                    createVNode("div", { class: "single-special-member" }, [
                      createVNode("div", { class: "wrapper" }, [
                        createVNode("div", { class: "img-box" }, [
                          createVNode(_component_el_image, {
                            src: item?.imgclass || "/default-planet.png",
                            lazy: ""
                          }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                slot: "placeholder",
                                class: "image-slot"
                              }, [
                                createVNode("img", {
                                  style: { "width": "100%", "height": "100%", "object-fit": "cover" },
                                  src: _imports_1
                                })
                              ]),
                              createVNode("div", {
                                slot: "error",
                                class: "image-slot"
                              }, [
                                createVNode("div", { class: "default-img" }, [
                                  createVNode("i", {
                                    class: "el-icon-chat-dot-round",
                                    style: { "font-size": "32px", "color": "#ddd" }
                                  })
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["src"])
                        ]),
                        createVNode("div", { class: "info-meta" }, [
                          createVNode("h6", { class: "name" }, [
                            createTextVNode(toDisplayString(item?.name || "未知圈子") + " ", 1),
                            createVNode("span", { class: "ml-2 text-muted fs-16" }, " (" + toDisplayString(item?.postCount || 0) + "帖) ", 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "hover-content" }, [
                        createVNode("p", { class: "share-buttons" }, [
                          createVNode("span", {
                            onClick: withModifiers(($event) => shareToWeibo(item), ["prevent"]),
                            class: "share-btn weibo-btn",
                            title: "分享到微博"
                          }, [
                            createVNode("i", { class: "icon-weibo" })
                          ], 8, ["onClick"]),
                          createVNode("span", {
                            onClick: withModifiers(($event) => shareToQQ(item), ["prevent"]),
                            class: "share-btn qq-btn",
                            title: "分享到QQ"
                          }, [
                            createVNode("i", { class: "icon-qq" })
                          ], 8, ["onClick"])
                        ])
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="clearfix pt-8" data-v-475ab3d3></div></div></div>`);
      _push(ssrRenderComponent(_component_mobile, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-475ab3d3><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-475ab3d3></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/AllPlanet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AllPlanet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-475ab3d3"]]);

export { AllPlanet as default };
//# sourceMappingURL=AllPlanet-PJvNdnyd.mjs.map
