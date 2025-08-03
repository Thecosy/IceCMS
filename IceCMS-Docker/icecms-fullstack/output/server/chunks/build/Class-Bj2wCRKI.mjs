import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './Top-z7S4M5x-.mjs';
import { E as ElImage } from './el-image-viewer-Cf39pgBV.mjs';
import { _ as __nuxt_component_4 } from './Mobile-B_yVIgB6.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_1 } from './loding-CvhOAbHX.mjs';
import { g as getResourceClasslist } from './webresourceclass-DptsPlvX.mjs';
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
  __name: "Class",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const acticve = ref("nav-link active");
    const setting = ref({});
    const classlist = ref([]);
    const loading = ref(true);
    ref(false);
    const shareUrl = ref("");
    const shareTitle = ref("资源分类 - IceCMS");
    const shareDescription = ref("发现更多优质资源，探索不同分类内容");
    [__temp, __restore] = withAsyncContext(() => getArticleData()), await __temp, __restore();
    async function getArticleData() {
      try {
        const res = await getResourceClasslist();
        console.log("获取分类数据:", res);
        if (res) {
          classlist.value = Array.isArray(res) ? res : [];
        } else {
          console.warn("获取分类数据为空");
          classlist.value = [];
        }
      } catch (error) {
        console.error("获取class数据出错:", error);
        classlist.value = [];
      } finally {
        loading.value = false;
      }
    }
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    function shareToQQ(item) {
      const url = encodeURIComponent(shareUrl.value);
      const title = encodeURIComponent(item ? `${item.name} - 资源分类` : shareTitle.value);
      const desc = encodeURIComponent(item ? `${item.name}分类下有${item.num || 0}个资源` : shareDescription.value);
      const qqShareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}&summary=${desc}&site=IceCMS`;
      (void 0).open(qqShareUrl, "_blank", "width=600,height=400");
    }
    function shareToWeibo(item) {
      const url = encodeURIComponent(shareUrl.value);
      const title = encodeURIComponent(item ? `${item.name} - 资源分类` : shareTitle.value);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-ff2d912e><div data-server-rendered="true" id="__nuxt" data-v-ff2d912e><div id="__layout" data-v-ff2d912e><div data-fetch-key="0" class="app macwk-animation" data-v-ff2d912e>`);
      _push(ssrRenderComponent(_component_top, { message4: unref(acticve) }, null, _parent));
      _push(`<div data-v-ff2d912e><div class="layout-min-full-height special-standard our-special py-7 pc-model" data-v-ff2d912e><div class="container" data-v-ff2d912e>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-5" data-v-ff2d912e><div class="loading-spinner" data-v-ff2d912e><i class="el-icon-loading" data-v-ff2d912e></i><p class="mt-2" data-v-ff2d912e>加载中...</p></div></div>`);
      } else {
        _push(`<div class="row" data-v-ff2d912e><!--[-->`);
        ssrRenderList(unref(classlist), (item) => {
          _push(`<div class="col-3 delay-0 list-animation-leftIn" data-v-ff2d912e>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: "/classdetal/" + (item?.id || "")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<a class="cursor-pointer" data-v-ff2d912e${_scopeId}><div class="single-special-member" data-v-ff2d912e${_scopeId}><div class="wrapper" data-v-ff2d912e${_scopeId}><div class="img-box" data-v-ff2d912e${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_image, {
                  src: item?.imgclass || "/default-class.png",
                  lazy: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div slot="placeholder" class="image-slot" data-v-ff2d912e${_scopeId2}><img style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${ssrRenderAttr("src", _imports_1)} data-v-ff2d912e${_scopeId2}></div><div slot="error" class="image-slot" data-v-ff2d912e${_scopeId2}><div class="default-img" data-v-ff2d912e${_scopeId2}><i class="el-icon-picture-outline" style="${ssrRenderStyle({ "font-size": "32px", "color": "#ddd" })}" data-v-ff2d912e${_scopeId2}></i></div></div>`);
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
                              class: "el-icon-picture-outline",
                              style: { "font-size": "32px", "color": "#ddd" }
                            })
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="info-meta" data-v-ff2d912e${_scopeId}><h6 class="name" data-v-ff2d912e${_scopeId}>${ssrInterpolate(item?.name || "未知分类")} <span class="ml-2 text-muted fs-16" data-v-ff2d912e${_scopeId}> (${ssrInterpolate(item?.num || 0)}) </span></h6></div></div><div class="hover-content" data-v-ff2d912e${_scopeId}><p class="share-buttons" data-v-ff2d912e${_scopeId}><span class="share-btn weibo-btn" title="分享到微博" data-v-ff2d912e${_scopeId}><i class="icon-weibo" data-v-ff2d912e${_scopeId}></i></span><span class="share-btn qq-btn" title="分享到QQ" data-v-ff2d912e${_scopeId}><i class="icon-qq" data-v-ff2d912e${_scopeId}></i></span></p></div></div></a>`);
              } else {
                return [
                  createVNode("a", { class: "cursor-pointer" }, [
                    createVNode("div", { class: "single-special-member" }, [
                      createVNode("div", { class: "wrapper" }, [
                        createVNode("div", { class: "img-box" }, [
                          createVNode(_component_el_image, {
                            src: item?.imgclass || "/default-class.png",
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
                                    class: "el-icon-picture-outline",
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
                            createTextVNode(toDisplayString(item?.name || "未知分类") + " ", 1),
                            createVNode("span", { class: "ml-2 text-muted fs-16" }, " (" + toDisplayString(item?.num || 0) + ") ", 1)
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
      _push(`<div class="clearfix pt-8" data-v-ff2d912e></div></div></div>`);
      _push(ssrRenderComponent(_component_mobile, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-ff2d912e><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-ff2d912e></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Class.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Class = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ff2d912e"]]);

export { Class as default };
//# sourceMappingURL=Class-Bj2wCRKI.mjs.map
