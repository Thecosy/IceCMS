import { g as getNewResource, _ as __nuxt_component_0, a as __nuxt_component_2, E as ElAvatar, b as getNewArticle } from './Top-z7S4M5x-.mjs';
import { E as ElCarousel, a as ElCarouselItem, _ as _imports_5, b as _imports_6, c as _imports_7, d as _imports_8, e as _imports_9, f as _imports_10, g as _imports_11, h as _imports_12, i as _imports_13, j as _imports_14, k as _imports_15 } from './shape-11-BIJngsJr.mjs';
import { E as ElImage } from './el-image-viewer-Cf39pgBV.mjs';
import { _ as __nuxt_component_4 } from './Mobile-B_yVIgB6.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, watchEffect, withAsyncContext, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, unref, createTextVNode, withDirectives, vShow, Transition, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _imports_1 } from './loding-CvhOAbHX.mjs';
import { _ as _imports_0 } from './con-view-BoxOm_cA.mjs';
import { f as formatDate } from './date-DoCWYhJL.mjs';
import { _ as _export_sfc, F as defineStore, O as storeToRefs, P as getCarousel, Q as getFourKingKong, u as useSettingStore } from './server.mjs';
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

const useContentStore = defineStore("content", {
  state: () => ({
    activeTab: "new",
    // 当前选中的标签
    contentList: {
      new: [
        { id: 1, title: "新鲜发布 1", description: "这是最新发布的内容" },
        { id: 2, title: "新鲜发布 2", description: "这是最新发布的内容" }
      ],
      hot: [
        { id: 3, title: "热门下载 1", description: "这是热门下载的内容" },
        { id: 4, title: "热门下载 2", description: "这是热门下载的内容" }
      ],
      recommend: [
        { id: 5, title: "站长推荐 1", description: "这是站长推荐的内容" },
        { id: 6, title: "站长推荐 2", description: "这是站长推荐的内容" }
      ],
      comments: [
        { id: 7, title: "最多评论 1", description: "这是评论最多的内容" },
        { id: 8, title: "最多评论 2", description: "这是评论最多的内容" }
      ]
    }
  }),
  actions: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
});
const useResourceStore = defineStore("resource", () => {
  const activeTab = ref("new");
  const rlist = ref({});
  const fetchResources = async (tab) => {
    try {
      const result = await getNewArticle(6, tab);
      rlist.value[tab] = result;
    } catch (error) {
      console.error(`获取 ${tab} 数据出错:`, error);
    }
  };
  return { activeTab, rlist, fetchResources };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    dataHeight: {
      type: String,
      default: "450px"
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const FourKingKong = ref("");
    const isAcitive = ref(null);
    const rlist = ref([]);
    const acticve = ref("nav-link active");
    const Carousel = ref({});
    ref(null);
    ref([]);
    ref([]);
    const setting = ref({});
    const contentStore = useContentStore();
    const { activeTab, contentList } = storeToRefs(contentStore);
    const resourceStore = useResourceStore();
    watchEffect(() => {
      if (!resourceStore.rlist[resourceStore.activeTab] || resourceStore.rlist[resourceStore.activeTab].length === 0) {
        resourceStore.fetchResources(resourceStore.activeTab);
      }
    });
    watchEffect(() => {
      if (!rlist.value[activeTab.value] || rlist.value[activeTab.value].length === 0) {
        handlegetNewResource(activeTab.value);
      }
    });
    async function dowmloadover(index2) {
      isAcitive.value = index2;
    }
    async function downloadleave() {
      isAcitive.value = null;
    }
    [__temp, __restore] = withAsyncContext(() => handlegetNewResource(activeTab.value)), await __temp, __restore();
    async function handlegetNewResource(tab) {
      try {
        const result = await getNewResource(10, tab);
        rlist.value[tab] = result;
      } catch (error) {
        console.error(`获取 ${tab} 数据出错:`, error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => handlegetCarousel()), await __temp, __restore();
    async function handlegetCarousel() {
      try {
        const result = await getCarousel("");
        Carousel.value = result;
      } catch (error) {
        console.error("获取Carousel出错:", error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => handlegetFourKingKong()), await __temp, __restore();
    async function handlegetFourKingKong() {
      try {
        const result = await getFourKingKong("");
        FourKingKong.value = result;
      } catch (error) {
        console.error("获取FourKingKong出错:", error);
      }
    }
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_el_carousel = ElCarousel;
      const _component_el_carousel_item = ElCarouselItem;
      const _component_router_link = resolveComponent("router-link");
      const _component_nuxt_link = __nuxt_component_2;
      const _component_el_image = ElImage;
      const _component_el_avatar = ElAvatar;
      const _component_mobile = __nuxt_component_4;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-bb80428c><div id="__nuxt" data-v-bb80428c><div id="__layout" data-v-bb80428c><div data-fetch-key="0" class="app macwk-animation" data-v-bb80428c>`);
      _push(ssrRenderComponent(_component_top, { message1: acticve.value }, null, _parent));
      _push(`<div data-v-bb80428c><section class="layout-index pc-model mt-5" data-v-bb80428c><div class="outsection" data-v-bb80428c>`);
      _push(ssrRenderComponent(_component_el_carousel, {
        "indicator-position": "outside",
        class: "index1 banner-index mb-6 Thecarousel",
        height: __props.dataHeight,
        interval: 3e3,
        arrow: "always"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(Carousel.value, (item, id) => {
              _push2(ssrRenderComponent(_component_el_carousel_item, {
                style: {},
                key: id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div data-v-bb80428c${_scopeId2}><div class="index-banner el-carousel el-carousel--horizontal" data-v-bb80428c${_scopeId2}><div class="el-carousel__container" style="${ssrRenderStyle({ "height": "450px" })}" data-v-bb80428c${_scopeId2}><i class="el-icon-arrow-right" data-v-bb80428c${_scopeId2}></i><div class="el-carousel__item is-active is-animating" style="${ssrRenderStyle({ "transform": "translateX(0px) scale(1)" })}" data-v-bb80428c${_scopeId2}><div class="index section white1 h-450 position-relative radius-4x d-flex align-items-center" data-v-bb80428c${_scopeId2}><div class="bg-shape-holder" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_5)} class="shape-three" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_6)} class="shape-four" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} class="shape-five" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_8)} class="shape-six" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_9)} class="shape-seven" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_10)} class="shape-eight" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_11)} class="shape-nine" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_12)} class="shape-ten" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_13)} class="shape-eleven" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_14)} class="shape-10" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", _imports_15)} class="shape-11" data-v-bb80428c${_scopeId2}><span class="big-round-one" data-v-bb80428c${_scopeId2}></span><span class="big-round-two" data-v-bb80428c${_scopeId2}></span><span class="big-round-three" data-v-bb80428c${_scopeId2}></span></div><div class="w-600 pl-10 position-relative z-index-9999" data-v-bb80428c${_scopeId2}><h2 data-v-bb80428c${_scopeId2}>${ssrInterpolate(item.title)}</h2><p class="text-muted fs-18" data-v-bb80428c${_scopeId2}>${ssrInterpolate(item.introduce)}</p><a class="btn btn-theme btn-round px-6" data-v-bb80428c${_scopeId2}>${ssrInterpolate(item.button)}</a></div><div class="index-banner-image-two" data-v-bb80428c${_scopeId2}><img${ssrRenderAttr("src", item.img)} data-v-bb80428c${_scopeId2}></div></div></div></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("div", { class: "index-banner el-carousel el-carousel--horizontal" }, [
                          createVNode("div", {
                            class: "el-carousel__container",
                            style: { "height": "450px" }
                          }, [
                            createVNode("i", { class: "el-icon-arrow-right" }),
                            createVNode("div", {
                              class: "el-carousel__item is-active is-animating",
                              style: { "transform": "translateX(0px) scale(1)" }
                            }, [
                              createVNode("div", { class: "index section white1 h-450 position-relative radius-4x d-flex align-items-center" }, [
                                createVNode("div", { class: "bg-shape-holder" }, [
                                  createVNode("img", {
                                    src: _imports_5,
                                    class: "shape-three"
                                  }),
                                  createVNode("img", {
                                    src: _imports_6,
                                    class: "shape-four"
                                  }),
                                  createVNode("img", {
                                    src: _imports_7,
                                    class: "shape-five"
                                  }),
                                  createVNode("img", {
                                    src: _imports_8,
                                    class: "shape-six"
                                  }),
                                  createVNode("img", {
                                    src: _imports_9,
                                    class: "shape-seven"
                                  }),
                                  createVNode("img", {
                                    src: _imports_10,
                                    class: "shape-eight"
                                  }),
                                  createVNode("img", {
                                    src: _imports_11,
                                    class: "shape-nine"
                                  }),
                                  createVNode("img", {
                                    src: _imports_12,
                                    class: "shape-ten"
                                  }),
                                  createVNode("img", {
                                    src: _imports_13,
                                    class: "shape-eleven"
                                  }),
                                  createVNode("img", {
                                    src: _imports_14,
                                    class: "shape-10"
                                  }),
                                  createVNode("img", {
                                    src: _imports_15,
                                    class: "shape-11"
                                  }),
                                  createVNode("span", { class: "big-round-one" }),
                                  createVNode("span", { class: "big-round-two" }),
                                  createVNode("span", { class: "big-round-three" })
                                ]),
                                createVNode("div", { class: "w-600 pl-10 position-relative z-index-9999" }, [
                                  createVNode("h2", null, toDisplayString(item.title), 1),
                                  createVNode("p", { class: "text-muted fs-18" }, toDisplayString(item.introduce), 1),
                                  createVNode("a", { class: "btn btn-theme btn-round px-6" }, toDisplayString(item.button), 1)
                                ]),
                                createVNode("div", { class: "index-banner-image-two" }, [
                                  createVNode("img", {
                                    src: item.img
                                  }, null, 8, ["src"])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(Carousel.value, (item, id) => {
                return openBlock(), createBlock(_component_el_carousel_item, {
                  style: {},
                  key: id
                }, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode("div", { class: "index-banner el-carousel el-carousel--horizontal" }, [
                        createVNode("div", {
                          class: "el-carousel__container",
                          style: { "height": "450px" }
                        }, [
                          createVNode("i", { class: "el-icon-arrow-right" }),
                          createVNode("div", {
                            class: "el-carousel__item is-active is-animating",
                            style: { "transform": "translateX(0px) scale(1)" }
                          }, [
                            createVNode("div", { class: "index section white1 h-450 position-relative radius-4x d-flex align-items-center" }, [
                              createVNode("div", { class: "bg-shape-holder" }, [
                                createVNode("img", {
                                  src: _imports_5,
                                  class: "shape-three"
                                }),
                                createVNode("img", {
                                  src: _imports_6,
                                  class: "shape-four"
                                }),
                                createVNode("img", {
                                  src: _imports_7,
                                  class: "shape-five"
                                }),
                                createVNode("img", {
                                  src: _imports_8,
                                  class: "shape-six"
                                }),
                                createVNode("img", {
                                  src: _imports_9,
                                  class: "shape-seven"
                                }),
                                createVNode("img", {
                                  src: _imports_10,
                                  class: "shape-eight"
                                }),
                                createVNode("img", {
                                  src: _imports_11,
                                  class: "shape-nine"
                                }),
                                createVNode("img", {
                                  src: _imports_12,
                                  class: "shape-ten"
                                }),
                                createVNode("img", {
                                  src: _imports_13,
                                  class: "shape-eleven"
                                }),
                                createVNode("img", {
                                  src: _imports_14,
                                  class: "shape-10"
                                }),
                                createVNode("img", {
                                  src: _imports_15,
                                  class: "shape-11"
                                }),
                                createVNode("span", { class: "big-round-one" }),
                                createVNode("span", { class: "big-round-two" }),
                                createVNode("span", { class: "big-round-three" })
                              ]),
                              createVNode("div", { class: "w-600 pl-10 position-relative z-index-9999" }, [
                                createVNode("h2", null, toDisplayString(item.title), 1),
                                createVNode("p", { class: "text-muted fs-18" }, toDisplayString(item.introduce), 1),
                                createVNode("a", { class: "btn btn-theme btn-round px-6" }, toDisplayString(item.button), 1)
                              ]),
                              createVNode("div", { class: "index-banner-image-two" }, [
                                createVNode("img", {
                                  src: item.img
                                }, null, 8, ["src"])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="container" data-v-bb80428c><div class="index-special row mb-6" data-v-bb80428c><!--[-->`);
      ssrRenderList(FourKingKong.value, (item, index2) => {
        _push(`<div class="col-3" data-v-bb80428c>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/" + item.featureSrc,
          class: "allad",
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="macwk-card hover-shadow-6 py-3 text-center" style="${ssrRenderStyle({
                backgroundImage: `linear-gradient(45deg, ${item.colorLeft}, ${item.colorRight})`,
                willChange: "transform",
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
              })}" data-v-bb80428c${_scopeId}><div class="macwk-card__collapsible-content vs-con-loading__container" data-v-bb80428c${_scopeId}><div class="macwk-card__body" data-v-bb80428c${_scopeId}><h6 class="mb-0 text-white" data-v-bb80428c${_scopeId}><i class="icon-office fs-22 mr-3 v-m-3" data-v-bb80428c${_scopeId}></i><span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.featureTitle)}</span></h6></div></div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "macwk-card hover-shadow-6 py-3 text-center",
                  style: {
                    backgroundImage: `linear-gradient(45deg, ${item.colorLeft}, ${item.colorRight})`,
                    willChange: "transform",
                    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
                  }
                }, [
                  createVNode("div", { class: "macwk-card__collapsible-content vs-con-loading__container" }, [
                    createVNode("div", { class: "macwk-card__body" }, [
                      createVNode("h6", { class: "mb-0 text-white" }, [
                        createVNode("i", { class: "icon-office fs-22 mr-3 v-m-3" }),
                        createVNode("span", null, toDisplayString(item.featureTitle), 1)
                      ])
                    ])
                  ])
                ], 4)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="container mb-5" data-v-bb80428c><div class="d-flex app-content-header mb-6" data-v-bb80428c><div class="main-title" data-v-bb80428c><h4 class="i-con-h-a mb-0" data-v-bb80428c><i class="mr-1 text-muted i-con i-con-calendar v-m-4" data-v-bb80428c><i data-v-bb80428c></i></i><span data-v-bb80428c>精品资源</span></h4></div><nav class="nav nav-title flex-grow-1" data-v-bb80428c><!--[-->`);
      ssrRenderList(["new", "hot", "recommend", "comments"], (tab) => {
        _push(`<button class="${ssrRenderClass({ active: unref(activeTab) === tab })}" data-v-bb80428c>${ssrInterpolate(tab === "new" ? "新鲜发布" : tab === "hot" ? "热门下载" : tab === "recommend" ? "站长推荐" : "最多评论")}</button>`);
      });
      _push(`<!--]--></nav><div class="more-action" data-v-bb80428c>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/alllist",
        class: "btn btn-more active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 更多资源 <i class="icon-arrow-right fw-600 fs-12 v-2" data-v-bb80428c${_scopeId}></i>`);
          } else {
            return [
              createTextVNode(" 更多资源 "),
              createVNode("i", { class: "icon-arrow-right fw-600 fs-12 v-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div id="listAppContainer" class="app-content-body listAppContainer" data-v-bb80428c><div class="mw-row" data-v-bb80428c><!--[-->`);
      ssrRenderList(rlist.value[unref(activeTab)] || [], (item, index2) => {
        _push(`<div class="mw-col list-animation-leftIn delay-3" data-v-bb80428c>`);
        if (item && item.id) {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: "/List/" + item.id
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (!setting.value.imageFormat) {
                  _push2(`<div data-v-bb80428c${_scopeId}><div data-v-bb80428c${_scopeId}><div class="macwk-app border white cursor-pointer" data-v-bb80428c${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_image, {
                    style: item.thumb != null ? null : { display: "none" },
                    class: "listtitleimg delay-3",
                    src: item.thumb,
                    lazy: ""
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div slot="placeholder" class="image-slot" data-v-bb80428c${_scopeId2}><img style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${ssrRenderAttr("src", _imports_1)} data-v-bb80428c${_scopeId2}></div>`);
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
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<div style="${ssrRenderStyle([
                    item.thumb == null ? null : { display: "none" },
                    item.backgroundStyle
                  ])}" class="delayImgss" data-v-bb80428c${_scopeId}><h3 class="flex text-center text-white opacity-50" data-v-bb80428c${_scopeId}> NOPIC </h3></div><div class="macwk-app__body" data-v-bb80428c${_scopeId}><div class="card-meta" data-v-bb80428c${_scopeId}><div class="meta-item post-author" data-v-bb80428c${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_avatar, {
                    style: { "margin-bottom": "3px", "margin-right": "3px" },
                    src: item.authorThumb
                  }, null, _parent2, _scopeId));
                  _push2(`<div class="author-name" data-v-bb80428c${_scopeId}>${ssrInterpolate(item.author)}</div></div>`);
                  if (item.createTime != null) {
                    _push2(`<span class="meta-item" data-v-bb80428c${_scopeId}>${ssrInterpolate(unref(formatDate)(item.createTime))}</span>`);
                  } else {
                    _push2(`<span class="meta-item" data-v-bb80428c${_scopeId}>${ssrInterpolate(unref(formatDate)(item.addTime))}</span>`);
                  }
                  _push2(`</div><h3 class="heading-tertiary-list" data-v-bb80428c${_scopeId}>${ssrInterpolate(item.title)}</h3></div><div class="extend" data-v-bb80428c${_scopeId}><div class="button" data-v-bb80428c${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "12px" })}" data-v-bb80428c${_scopeId}><span style="${ssrRenderStyle({ "font-size": "36px", "line-height": "1" })}" data-v-bb80428c${_scopeId}><i class="light-icon-more icon-next-arrow" data-v-bb80428c${_scopeId}></i></span></div><div style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-bb80428c${_scopeId}><span class="value" data-v-bb80428c${_scopeId}>￥${ssrInterpolate(item.price)}</span></div></div></div></div></div></div>`);
                } else {
                  _push2(`<div data-v-bb80428c${_scopeId}><div data-v-bb80428c${_scopeId}><div class="macwk-app border white cursor-pointer padding-xl" data-v-bb80428c${_scopeId}><div class="soft-card" data-v-bb80428c${_scopeId}><div class="li-card-img-div" data-v-bb80428c${_scopeId}><img${ssrRenderAttr("src", item.thumb)} class="budongImg img72 dingweiImg" data-v-bb80428c${_scopeId}><img style="${ssrRenderStyle(isAcitive.value == index2 ? null : { display: "none" })}"${ssrRenderAttr("src", item.thumb)} class="gaosiImg img72 dingweiImg" data-v-bb80428c${_scopeId}></div><div class="size-12 text-B6BABF margin-top-90" style="${ssrRenderStyle({ "min-height": "20px" })}" data-v-bb80428c${_scopeId}><span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.subhead)}</span></div><div class="margin-top size-18 text-bold text-block card-hover-red" data-v-bb80428c${_scopeId}><span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.title)}</span></div><div class="margin-top1 size-14 text-B6BABF limitText" data-v-bb80428c${_scopeId}><span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.intro)}</span></div><div class="margin-top2 text-B6BABF flex-row size-12" style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "justify-content": "space-between", "width": "100%" })}" data-v-bb80428c${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "0px", "display": "flex", "align-items": "center" })}" data-v-bb80428c${_scopeId}><img class="view-icon--right"${ssrRenderAttr("src", _imports_0)} data-v-bb80428c${_scopeId}><span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.hits || 0)}</span></div><div style="${ssrRenderStyle({ "margin": "auto", "display": "flex", "align-items": "center" })}" data-v-bb80428c${_scopeId}><span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.author)}</span></div><div style="${ssrRenderStyle({ "position": "relative", "right": "0px", "display": "flex", "align-items": "center" })}" data-v-bb80428c${_scopeId}>`);
                  if (item.createTime != null) {
                    _push2(`<span data-v-bb80428c${_scopeId}>${ssrInterpolate(unref(formatDate)(item.createTime))}</span>`);
                  } else {
                    _push2(`<span data-v-bb80428c${_scopeId}>${ssrInterpolate(unref(formatDate)(item.addTime))}</span>`);
                  }
                  _push2(`</div></div></div></div></div></div>`);
                }
              } else {
                return [
                  !setting.value.imageFormat ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "macwk-app border white cursor-pointer" }, [
                        withDirectives(createVNode(_component_el_image, {
                          class: "listtitleimg delay-3",
                          src: item.thumb,
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
                            ])
                          ]),
                          _: 2
                        }, 1032, ["src"]), [
                          [vShow, item.thumb != null]
                        ]),
                        withDirectives(createVNode("div", {
                          class: "delayImgss",
                          style: item.backgroundStyle
                        }, [
                          createVNode("h3", { class: "flex text-center text-white opacity-50" }, " NOPIC ")
                        ], 4), [
                          [vShow, item.thumb == null]
                        ]),
                        createVNode("div", { class: "macwk-app__body" }, [
                          createVNode("div", { class: "card-meta" }, [
                            createVNode("div", { class: "meta-item post-author" }, [
                              createVNode(_component_el_avatar, {
                                style: { "margin-bottom": "3px", "margin-right": "3px" },
                                src: item.authorThumb
                              }, null, 8, ["src"]),
                              createVNode("div", { class: "author-name" }, toDisplayString(item.author), 1)
                            ]),
                            item.createTime != null ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "meta-item"
                            }, toDisplayString(unref(formatDate)(item.createTime)), 1)) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "meta-item"
                            }, toDisplayString(unref(formatDate)(item.addTime)), 1))
                          ]),
                          createVNode("h3", { class: "heading-tertiary-list" }, toDisplayString(item.title), 1)
                        ]),
                        createVNode("div", { class: "extend" }, [
                          createVNode("div", { class: "button" }, [
                            createVNode("div", { style: { "margin-left": "12px" } }, [
                              createVNode("span", { style: { "font-size": "36px", "line-height": "1" } }, [
                                createVNode("i", { class: "light-icon-more icon-next-arrow" })
                              ])
                            ]),
                            createVNode("div", { style: { "margin-right": "12px" } }, [
                              createVNode("span", { class: "value" }, "￥" + toDisplayString(item.price), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("div", {
                      onMouseover: ($event) => dowmloadover(index2),
                      onMouseleave: ($event) => downloadleave()
                    }, [
                      createVNode("div", { class: "macwk-app border white cursor-pointer padding-xl" }, [
                        createVNode("div", { class: "soft-card" }, [
                          createVNode("div", { class: "li-card-img-div" }, [
                            createVNode("img", {
                              src: item.thumb,
                              class: "budongImg img72 dingweiImg"
                            }, null, 8, ["src"]),
                            createVNode(Transition, { name: "fade" }, {
                              default: withCtx(() => [
                                withDirectives(createVNode("img", {
                                  src: item.thumb,
                                  class: "gaosiImg img72 dingweiImg"
                                }, null, 8, ["src"]), [
                                  [vShow, isAcitive.value == index2]
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("div", {
                            class: "size-12 text-B6BABF margin-top-90",
                            style: { "min-height": "20px" }
                          }, [
                            createVNode("span", null, toDisplayString(item.subhead), 1)
                          ]),
                          createVNode("div", { class: "margin-top size-18 text-bold text-block card-hover-red" }, [
                            createVNode("span", null, toDisplayString(item.title), 1)
                          ]),
                          createVNode("div", { class: "margin-top1 size-14 text-B6BABF limitText" }, [
                            createVNode("span", null, toDisplayString(item.intro), 1)
                          ]),
                          createVNode("div", {
                            class: "margin-top2 text-B6BABF flex-row size-12",
                            style: { "display": "flex", "flex-wrap": "wrap", "justify-content": "space-between", "width": "100%" }
                          }, [
                            createVNode("div", { style: { "margin-left": "0px", "display": "flex", "align-items": "center" } }, [
                              createVNode("img", {
                                class: "view-icon--right",
                                src: _imports_0
                              }),
                              createVNode("span", null, toDisplayString(item.hits || 0), 1)
                            ]),
                            createVNode("div", { style: { "margin": "auto", "display": "flex", "align-items": "center" } }, [
                              createVNode("span", null, toDisplayString(item.author), 1)
                            ]),
                            createVNode("div", { style: { "position": "relative", "right": "0px", "display": "flex", "align-items": "center" } }, [
                              item.createTime != null ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(formatDate)(item.createTime)), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(formatDate)(item.addTime)), 1))
                            ])
                          ])
                        ])
                      ])
                    ], 40, ["onMouseover", "onMouseleave"])
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div><div class="white dk py-7" data-v-bb80428c><div class="container" data-v-bb80428c><div class="d-flex app-content-header mb-6" data-v-bb80428c><div class="main-title" data-v-bb80428c><h4 class="i-con-h-a mb-0" data-v-bb80428c><i class="mr-1 text-muted i-con i-con-layer v-m-4" data-v-bb80428c><i data-v-bb80428c></i></i><span data-v-bb80428c>教程文章</span></h4></div><nav class="nav nav-title flex-grow-1" data-v-bb80428c><!--[-->`);
      ssrRenderList(["new", "recommend", "comment"], (tab) => {
        _push(`<a class="${ssrRenderClass([{ active: unref(resourceStore).activeTab === tab }, "nav-link"])}" data-v-bb80428c>${ssrInterpolate(tab === "new" ? "新鲜发布" : tab === "recommend" ? "站长推荐" : "最多评论")}</a>`);
      });
      _push(`<!--]--></nav><div class="more-action" data-v-bb80428c>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/allpost",
        class: "btn btn-more active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 更多文章 <i class="icon-arrow-right fw-600 fs-12 v-2" data-v-bb80428c${_scopeId}></i>`);
          } else {
            return [
              createTextVNode(" 更多文章 "),
              createVNode("i", { class: "icon-arrow-right fw-600 fs-12 v-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="row gap-a" data-v-bb80428c><div class="com-md-12 col-lg-6" data-v-bb80428c><!--[-->`);
      ssrRenderList(unref(resourceStore).rlist[unref(resourceStore).activeTab], (item, index2) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/post/" + item.id,
          key: item.id,
          style: index2 % 2 === 0 ? null : { display: "none" },
          class: "feature-block-three border white dk hover-shadow-6 delay-0 list-animation-leftIn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex align-items-center" data-v-bb80428c${_scopeId}><div class="icon-box icon-one" data-v-bb80428c${_scopeId}>`);
              if (item.thumb) {
                _push2(ssrRenderComponent(_component_el_image, {
                  class: "delayImg",
                  src: item.thumb,
                  lazy: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div slot="placeholder" class="image-slot" data-v-bb80428c${_scopeId2}><img style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${ssrRenderAttr("src", _imports_1)} data-v-bb80428c${_scopeId2}></div>`);
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
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<div class="delayImg" style="${ssrRenderStyle(item.backgroundStyle)}" data-v-bb80428c${_scopeId}><h3 class="flex text-center text-white opacity-50" data-v-bb80428c${_scopeId}>NOPIC</h3></div>`);
              }
              _push2(`</div><div class="text" data-v-bb80428c${_scopeId}><h5 class="ellipsis-text" data-v-bb80428c${_scopeId}>${ssrInterpolate(item.title)}</h5><div class="text-muted fs-16 mr-3" data-v-bb80428c${_scopeId}>`);
              if (item.createTime) {
                _push2(`<span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.createTime)}</span>`);
              } else {
                _push2(`<span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.addTime)}</span>`);
              }
              _push2(`</div></div><div class="read-more d-flex justify-content-end w-80 pr-3" data-v-bb80428c${_scopeId}><i class="light-icon-more icon-next-arrow" data-v-bb80428c${_scopeId}></i></div></div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex align-items-center" }, [
                  createVNode("div", { class: "icon-box icon-one" }, [
                    item.thumb ? (openBlock(), createBlock(_component_el_image, {
                      key: 0,
                      class: "delayImg",
                      src: item.thumb,
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
                        ])
                      ]),
                      _: 2
                    }, 1032, ["src"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "delayImg",
                      style: item.backgroundStyle
                    }, [
                      createVNode("h3", { class: "flex text-center text-white opacity-50" }, "NOPIC")
                    ], 4))
                  ]),
                  createVNode("div", { class: "text" }, [
                    createVNode("h5", { class: "ellipsis-text" }, toDisplayString(item.title), 1),
                    createVNode("div", { class: "text-muted fs-16 mr-3" }, [
                      item.createTime ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.createTime), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(item.addTime), 1))
                    ])
                  ]),
                  createVNode("div", { class: "read-more d-flex justify-content-end w-80 pr-3" }, [
                    createVNode("i", { class: "light-icon-more icon-next-arrow" })
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="com-md-12 col-lg-6" data-v-bb80428c><!--[-->`);
      ssrRenderList(unref(resourceStore).rlist[unref(resourceStore).activeTab], (item, index2) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: "/post/" + item.id,
          key: item.id,
          style: index2 % 2 !== 0 ? null : { display: "none" },
          class: "feature-block-three border white dk hover-shadow-6 delay-5 list-animation-leftIn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex align-items-center" data-v-bb80428c${_scopeId}><div class="icon-box icon-one" data-v-bb80428c${_scopeId}>`);
              if (item.thumb) {
                _push2(ssrRenderComponent(_component_el_image, {
                  class: "delayImg",
                  src: item.thumb,
                  lazy: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div slot="placeholder" class="image-slot" data-v-bb80428c${_scopeId2}><img style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${ssrRenderAttr("src", _imports_1)} data-v-bb80428c${_scopeId2}></div>`);
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
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<div class="delayImg" style="${ssrRenderStyle(item.backgroundStyle)}" data-v-bb80428c${_scopeId}><h3 class="flex text-center text-white opacity-50" data-v-bb80428c${_scopeId}>NOPIC</h3></div>`);
              }
              _push2(`</div><div class="text" data-v-bb80428c${_scopeId}><h5 class="ellipsis-text" data-v-bb80428c${_scopeId}>${ssrInterpolate(item.title)}</h5><div class="text-muted fs-16 mr-3" data-v-bb80428c${_scopeId}>`);
              if (item.createTime) {
                _push2(`<span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.createTime)}</span>`);
              } else {
                _push2(`<span data-v-bb80428c${_scopeId}>${ssrInterpolate(item.addTime)}</span>`);
              }
              _push2(`</div></div><div class="read-more d-flex justify-content-end w-80 pr-3" data-v-bb80428c${_scopeId}><i class="light-icon-more icon-next-arrow" data-v-bb80428c${_scopeId}></i></div></div>`);
            } else {
              return [
                createVNode("div", { class: "d-flex align-items-center" }, [
                  createVNode("div", { class: "icon-box icon-one" }, [
                    item.thumb ? (openBlock(), createBlock(_component_el_image, {
                      key: 0,
                      class: "delayImg",
                      src: item.thumb,
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
                        ])
                      ]),
                      _: 2
                    }, 1032, ["src"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "delayImg",
                      style: item.backgroundStyle
                    }, [
                      createVNode("h3", { class: "flex text-center text-white opacity-50" }, "NOPIC")
                    ], 4))
                  ]),
                  createVNode("div", { class: "text" }, [
                    createVNode("h5", { class: "ellipsis-text" }, toDisplayString(item.title), 1),
                    createVNode("div", { class: "text-muted fs-16 mr-3" }, [
                      item.createTime ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.createTime), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(item.addTime), 1))
                    ])
                  ]),
                  createVNode("div", { class: "read-more d-flex justify-content-end w-80 pr-3" }, [
                    createVNode("i", { class: "light-icon-more icon-next-arrow" })
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div></div></section>`);
      _push(ssrRenderComponent(_component_mobile, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-bb80428c><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-bb80428c></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb80428c"]]);

export { index as default };
//# sourceMappingURL=index-D469HA-5.mjs.map
