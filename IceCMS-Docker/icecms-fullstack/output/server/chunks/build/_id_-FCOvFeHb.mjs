import { h as getResourceFilter, i as getResourceByType, j as getAllResource, _ as __nuxt_component_0, a as __nuxt_component_2, E as ElAvatar } from './Top-z7S4M5x-.mjs';
import { E as ElSwitch } from './index-mwlAMJLR.mjs';
import { E as ElImage } from './el-image-viewer-Cf39pgBV.mjs';
import { E as ElPagination } from './el-pagination-BWqT6DSk.mjs';
import { _ as __nuxt_component_4 } from './Mobile-B_yVIgB6.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, computed, watchEffect, watch, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, Transition, withDirectives, vShow, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './con-view-BoxOm_cA.mjs';
import { useRoute, useRouter } from 'vue-router';
import { _ as _export_sfc, O as storeToRefs, u as useSettingStore } from './server.mjs';
import { u as useContentStore } from './AlllistContent-BEjQ_5eq.mjs';
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
import './el-select-ZvTonYnZ.mjs';
import './index-DM9QPBoH.mjs';
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
    const route = useRoute();
    useRouter();
    const contentStore = useContentStore();
    const { activeTab, contentList, layoutType, layoutActive, showFootNext, isTargetBlank } = storeToRefs(contentStore);
    const setting = ref({});
    const acticve = ref("nav-link active");
    const loading = ref(true);
    const isAcitive = ref(null);
    ref("new");
    const allIndex = ref(true);
    const classlist = ref([]);
    const istargetjudje = ref(isTargetBlank.value);
    const istarget = ref(isTargetBlank.value ? "_blank" : "_self");
    const ResourceNumber = ref("");
    const list = ref([]);
    const total = ref(0);
    const recommendedList = ref([]);
    const hotList = ref([]);
    const latestList = ref([]);
    const layoutactive = computed(() => layoutActive.value.layout);
    const gridactive = computed(() => layoutActive.value.grid);
    const listactive = computed(() => layoutActive.value.list);
    const showfootnext = computed(() => showFootNext.value);
    const gridOrlist = computed(() => layoutType.value);
    const listQuery = ref({
      page: 1,
      limit: 10
    });
    ref({
      page: 1,
      limit: 20,
      class: ""
    });
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    const clickIndex = ref(null);
    watchEffect(() => {
      const routeId = route.params.id ? Number(route.params.id) : null;
      clickIndex.value = routeId;
    });
    watch(() => route.params.id, () => {
      handleGetList();
    });
    watch(() => activeTab.value, () => {
      handleGetList();
    });
    async function handleGetList() {
      try {
        loading.value = true;
        let result;
        const currentClassId = route.params.id ? Number(route.params.id) : null;
        const tabToFilterMap = {
          "new": "news",
          "hot": "download",
          "commend": "discuss",
          "like": "love",
          "recommend": "recommend"
        };
        const filterType = tabToFilterMap[activeTab.value] || "news";
        if (currentClassId) {
          const query = {
            page: listQuery.value.page,
            limit: listQuery.value.limit,
            class: currentClassId.toString()
          };
          result = await getResourceFilter(query, filterType);
          allIndex.value = false;
        } else if (activeTab.value !== "new") {
          result = await getResourceByType(listQuery.value, activeTab.value);
          allIndex.value = true;
        } else {
          result = await getAllResource(listQuery.value);
          allIndex.value = true;
        }
        console.log("API响应结果:", result);
        if (result) {
          if (Array.isArray(result)) {
            list.value = result;
            total.value = result.length;
          } else if (typeof result === "object" && result.data) {
            list.value = result.data;
            total.value = result.total || result.data.length;
          } else {
            list.value = [];
            total.value = 0;
            console.warn("API返回的数据格式不符合预期:", result);
          }
        } else {
          console.warn("API返回的数据为空");
          list.value = [];
          total.value = 0;
        }
      } catch (error) {
        console.error("获取资源列表出错:", error);
        list.value = [];
        total.value = 0;
      } finally {
        loading.value = false;
      }
    }
    function handleSizeChange(val) {
      listQuery.value.limit = val;
      handleGetList();
    }
    function handleCurrentChange(val) {
      listQuery.value.page = val;
      handleGetList();
    }
    function istargetJudje() {
      contentStore.setIsTargetBlank(istargetjudje.value);
      if (!istargetjudje.value) {
        istarget.value = "_self";
      } else {
        istarget.value = "_blank";
      }
    }
    function getStyles() {
      const max = 8;
      const min = 1;
      const x = Math.floor(Math.random() * (max - min + 1)) + min;
      const backcolor = "randomColor" + x;
      const styles = {
        randomColor1: "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);",
        randomColor2: "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);",
        randomColor3: "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);",
        randomColor4: "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);",
        randomColor5: "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);",
        randomColor6: "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);",
        randomColor7: "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);",
        randomColor8: "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);"
      };
      return styles[backcolor] || styles.randomColor8;
    }
    function formatDate(time) {
      const date = new Date(time);
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const year = date.getFullYear();
      if (currentYear - year === 1) {
        return "去年 " + date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
      } else if (currentYear - year === 2) {
        return "前年 " + date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
      } else if (currentYear - year > 2) {
        return "多年前";
      } else {
        return date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
      }
    }
    function getPageTitle() {
      const currentClassId = route.params.id ? Number(route.params.id) : null;
      let title = "全部资源";
      if (currentClassId && Array.isArray(classlist.value)) {
        const currentClass = classlist.value.find((item) => item.id === currentClassId);
        if (currentClass) {
          title = currentClass.name;
        }
      }
      const tabNames = {
        "new": "最新",
        "hot": "热门下载",
        "commend": "评论最多",
        "like": "最受喜欢",
        "recommend": "精品推荐"
      };
      if (activeTab.value !== "new") {
        title += ` - ${tabNames[activeTab.value] || activeTab.value}`;
      }
      return title;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_el_switch = ElSwitch;
      const _component_nuxt_link = __nuxt_component_2;
      const _component_el_image = ElImage;
      const _component_el_avatar = ElAvatar;
      const _component_el_pagination = ElPagination;
      const _component_mobile = __nuxt_component_4;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-ec7c9e16><div data-server-rendered="true" id="__nuxt" data-v-ec7c9e16><div id="__layout" data-v-ec7c9e16><div data-fetch-key="0" class="app macwk-animation" data-v-ec7c9e16>`);
      _push(ssrRenderComponent(_component_top, { message2: acticve.value }, null, _parent));
      _push(`<div class="app-main mobile-layout" data-v-ec7c9e16><div class="${ssrRenderClass([gridOrlist.value, "w-full bg auto d-flex layout-min-full-height"])}" data-v-ec7c9e16><div class="app-sidebar pc-model" data-v-ec7c9e16><div class="pr-3 pl-2" data-v-ec7c9e16><p class="fs-12 opacity-40 mb-0 pt-1" data-v-ec7c9e16>分类</p><div class="macwk-sidebar mb-4 vsm_expanded" data-v-ec7c9e16><div class="vsm--scroll-wrapper" data-v-ec7c9e16><div class="vsm--list" data-v-ec7c9e16><div class="vsm--item" data-v-ec7c9e16><span role="link" href="[object Object]" class="${ssrRenderClass([{ " vsm--link_active": allIndex.value }, "vsm--link vsm--link_level-1"])}" data-v-ec7c9e16><span class="vsm--title" data-v-ec7c9e16>全部资源</span></span></div><!--[-->`);
      ssrRenderList(classlist.value, (item, id) => {
        _push(`<div class="vsm--item" data-v-ec7c9e16><span role="link"${ssrRenderAttr("href", "/class/" + item.id)} class="${ssrRenderClass([{ "vsm--link_active": item.id === clickIndex.value }, "vsm--link vsm--link_level-1"])}" data-v-ec7c9e16><span class="vsm--title" data-v-ec7c9e16>${ssrInterpolate(item.name)}</span><div class="vsm--arrow vsm--arrow_slot" data-v-ec7c9e16><span data-v-ec7c9e16><i class="icon-chevron-right" data-v-ec7c9e16></i></span></div></span></div>`);
      });
      _push(`<!--]--></div></div></div></div></div><div class="app-content pc-model" data-v-ec7c9e16><div class="app-content-main" data-v-ec7c9e16><div class="app-content-list" data-v-ec7c9e16><div class="app-content-header" data-v-ec7c9e16><div class="main-title" data-v-ec7c9e16><h5 class="i-con-h-a" data-v-ec7c9e16>${ssrInterpolate(getPageTitle())} <span class="text-muted fs-13 v-1 ml-1" data-v-ec7c9e16>${ssrInterpolate(ResourceNumber.value)}</span></h5></div><nav class="menu menu--macwk-list macwk-soft-list-menu flex" data-v-ec7c9e16><ul class="menu__list" data-v-ec7c9e16><li style="${ssrRenderStyle({ "display": "flex" })}" data-v-ec7c9e16><!--[-->`);
      ssrRenderList(["new", "hot", "commend", "like", "recommend"], (tab) => {
        _push(`<button class="${ssrRenderClass([{ active: unref(activeTab) === tab }, "menu__link"])}" data-v-ec7c9e16>${ssrInterpolate(tab === "new" ? "最新" : tab === "hot" ? "下载" : tab === "commend" ? "评论" : tab === "like" ? "喜欢" : tab === "recommend" ? "推荐" : "")}</button>`);
      });
      _push(`<!--]--></li></ul></nav><div class="target-blank" data-v-ec7c9e16><div role="switch" class="el-switch mr-6" style="${ssrRenderStyle({ "margin-top": "-3px" })}" data-v-ec7c9e16><input type="checkbox" name="" class="el-switch__input" data-v-ec7c9e16><div data-v-ec7c9e16>`);
      _push(ssrRenderComponent(_component_el_switch, {
        modelValue: istargetjudje.value,
        "onUpdate:modelValue": ($event) => istargetjudje.value = $event,
        onChange: ($event) => istargetJudje(),
        "active-color": "#13ce66",
        "inactive-color": "#ff4949"
      }, null, _parent));
      _push(`</div><span class="el-switch__label el-switch__label--right" data-v-ec7c9e16><span aria-hidden="true" data-v-ec7c9e16>新窗口打开</span></span></div></div><div class="d-flex justify-content-end" data-v-ec7c9e16><div class="grid-change" data-v-ec7c9e16><a class="${ssrRenderClass([layoutactive.value, "i-con-h-a position-relative cursor"])}" data-v-ec7c9e16><i class="i-con i-con-layout" data-v-ec7c9e16><i data-v-ec7c9e16></i></i></a><a class="${ssrRenderClass([listactive.value, "i-con-h-a position-relative cursor"])}" data-v-ec7c9e16><i class="i-con i-con-list" data-v-ec7c9e16><i data-v-ec7c9e16></i></i></a><a class="${ssrRenderClass([gridactive.value, "i-con-h-a position-relative cursor"])}" data-v-ec7c9e16><i class="i-con i-con-grid" data-v-ec7c9e16><i data-v-ec7c9e16></i></i></a></div></div></div><div id="listAppContainer" class="app-content-body listAppContainer" data-v-ec7c9e16><div class="${ssrRenderClass(["mw-row", gridOrlist.value])}" data-v-ec7c9e16>`);
      if (gridOrlist.value === "horizontal-layout") {
        _push(`<!--[--><div class="horizontal-main-content" data-v-ec7c9e16><!--[-->`);
        ssrRenderList(list.value, (item, index) => {
          _push(`<div class="mw-col list-animation-leftIn delay-3" data-v-ec7c9e16>`);
          if (!setting.value.imageFormat) {
            _push(`<div data-v-ec7c9e16>`);
            if (item && item.status && item.status.includes("published")) {
              _push(`<div data-v-ec7c9e16>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                target: istarget.value,
                to: "/list/" + (item?.id || "")
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<a class="macwk-app border white cursor-pointer" data-v-ec7c9e16${_scopeId}>`);
                    if (item.thumb != null) {
                      _push2(ssrRenderComponent(_component_el_image, {
                        class: "listtitleimg delay-3",
                        src: item.thumb,
                        lazy: ""
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`<div slot="placeholder" class="image-slot" data-v-ec7c9e16${_scopeId2}></div>`);
                          } else {
                            return [
                              createVNode("div", {
                                slot: "placeholder",
                                class: "image-slot"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                    } else {
                      _push2(`<div class="delayImg" style="${ssrRenderStyle(getStyles())}" data-v-ec7c9e16${_scopeId}><h3 class="flex text-center text-white opacity-50" data-v-ec7c9e16${_scopeId}>NOPIC</h3></div>`);
                    }
                    _push2(`<div class="macwk-app__body" data-v-ec7c9e16${_scopeId}><div class="card-meta" data-v-ec7c9e16${_scopeId}><div class="meta-item post-author" data-v-ec7c9e16${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_el_avatar, {
                      style: { "margin-bottom": "3px", "margin-right": "3px" },
                      src: item.authorThumb
                    }, null, _parent2, _scopeId));
                    _push2(`<a class="author-name" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.author)}</a></div>`);
                    if (item.createTime != null) {
                      _push2(`<span class="meta-item" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.createTime))}</span>`);
                    } else {
                      _push2(`<span class="meta-item" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.addTime))}</span>`);
                    }
                    _push2(`<span class="meta-item" data-v-ec7c9e16${_scopeId}><i class="el-icon-share" data-v-ec7c9e16${_scopeId}></i></span></div><h3 class="heading-tertiary-list" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</h3><p class="description" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.intro || "暂无介绍")}</p><div class="tag-container" data-v-ec7c9e16${_scopeId}><span class="tag" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.className || "未分类")}</span></div><div class="stats-container" data-v-ec7c9e16${_scopeId}><div class="stat-item" data-v-ec7c9e16${_scopeId}><i class="icon-eye" data-v-ec7c9e16${_scopeId}></i><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.hits || 0)}</span></div><div class="stat-item" data-v-ec7c9e16${_scopeId}><i class="icon-heart" data-v-ec7c9e16${_scopeId}></i><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.loveNum || 0)}</span></div><div class="stat-item" data-v-ec7c9e16${_scopeId}><i class="icon-message" data-v-ec7c9e16${_scopeId}></i><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.postNum || 0)}</span></div></div><div class="extend" data-v-ec7c9e16${_scopeId}><div class="button" data-v-ec7c9e16${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "12px" })}" data-v-ec7c9e16${_scopeId}><span style="${ssrRenderStyle({ "font-size": "36px", "line-height": "1" })}" data-v-ec7c9e16${_scopeId}><i class="light-icon-more icon-next-arrow" data-v-ec7c9e16${_scopeId}></i></span></div><div style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-ec7c9e16${_scopeId}><span class="value" data-v-ec7c9e16${_scopeId}>￥${ssrInterpolate(item.price)}</span></div></div></div></div></a>`);
                  } else {
                    return [
                      createVNode("a", { class: "macwk-app border white cursor-pointer" }, [
                        item.thumb != null ? (openBlock(), createBlock(_component_el_image, {
                          key: 0,
                          class: "listtitleimg delay-3",
                          src: item.thumb,
                          lazy: ""
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              slot: "placeholder",
                              class: "image-slot"
                            })
                          ]),
                          _: 2
                        }, 1032, ["src"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "delayImg",
                          style: getStyles()
                        }, [
                          createVNode("h3", { class: "flex text-center text-white opacity-50" }, "NOPIC")
                        ], 4)),
                        createVNode("div", { class: "macwk-app__body" }, [
                          createVNode("div", { class: "card-meta" }, [
                            createVNode("div", { class: "meta-item post-author" }, [
                              createVNode(_component_el_avatar, {
                                style: { "margin-bottom": "3px", "margin-right": "3px" },
                                src: item.authorThumb
                              }, null, 8, ["src"]),
                              createVNode("a", { class: "author-name" }, toDisplayString(item.author), 1)
                            ]),
                            item.createTime != null ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "meta-item"
                            }, toDisplayString(formatDate(item.createTime)), 1)) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "meta-item"
                            }, toDisplayString(formatDate(item.addTime)), 1)),
                            createVNode("span", { class: "meta-item" }, [
                              createVNode("i", { class: "el-icon-share" })
                            ])
                          ]),
                          createVNode("h3", { class: "heading-tertiary-list" }, toDisplayString(item.title), 1),
                          createVNode("p", { class: "description" }, toDisplayString(item.intro || "暂无介绍"), 1),
                          createVNode("div", { class: "tag-container" }, [
                            createVNode("span", { class: "tag" }, toDisplayString(item.className || "未分类"), 1)
                          ]),
                          createVNode("div", { class: "stats-container" }, [
                            createVNode("div", { class: "stat-item" }, [
                              createVNode("i", { class: "icon-eye" }),
                              createVNode("span", null, toDisplayString(item.hits || 0), 1)
                            ]),
                            createVNode("div", { class: "stat-item" }, [
                              createVNode("i", { class: "icon-heart" }),
                              createVNode("span", null, toDisplayString(item.loveNum || 0), 1)
                            ]),
                            createVNode("div", { class: "stat-item" }, [
                              createVNode("i", { class: "icon-message" }),
                              createVNode("span", null, toDisplayString(item.postNum || 0), 1)
                            ])
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
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<div data-v-ec7c9e16>`);
            if (item && item.status && item.status.includes("published")) {
              _push(`<div data-v-ec7c9e16>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                target: istarget.value,
                to: "/list/" + (item?.id || "")
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<a class="macwk-app border white cursor-pointer padding-xl" data-v-ec7c9e16${_scopeId}><div class="soft-card" data-v-ec7c9e16${_scopeId}><div class="li-card-img-div" data-v-ec7c9e16${_scopeId}><img${ssrRenderAttr("src", item.thumb)} class="budongImg img72 dingweiImg" data-v-ec7c9e16${_scopeId}><img style="${ssrRenderStyle(isAcitive.value == index ? null : { display: "none" })}"${ssrRenderAttr("src", item.thumb)} class="gaosiImg img72 dingweiImg" data-v-ec7c9e16${_scopeId}></div><div class="size-12 text-B6BABF margin-top-90" style="${ssrRenderStyle({ "min-height": "20px" })}" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.subhead)}</span></div><div class="margin-top size-18 text-bold text-block card-hover-red" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</span></div><div class="margin-top1 size-14 text-B6BABF limitText" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.intro)}</span></div><div class="margin-top2 text-B6BABF flex-row size-12" style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "justify-content": "space-between", "width": "100%" })}" data-v-ec7c9e16${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "0px", "display": "flex", "align-items": "center" })}" data-v-ec7c9e16${_scopeId}><img class="view-icon--right"${ssrRenderAttr("src", _imports_0)} data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.hits || 0)}</span></div><div style="${ssrRenderStyle({ "margin": "auto", "display": "flex", "align-items": "center" })}" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.author)}</span></div><div style="${ssrRenderStyle({ "position": "relative", "right": "0px", "display": "flex", "align-items": "center" })}" data-v-ec7c9e16${_scopeId}>`);
                    if (item.createTime != null) {
                      _push2(`<span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.createTime))}</span>`);
                    } else {
                      _push2(`<span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.addTime))}</span>`);
                    }
                    _push2(`</div></div></div></a>`);
                  } else {
                    return [
                      createVNode("a", { class: "macwk-app border white cursor-pointer padding-xl" }, [
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
                                  [vShow, isAcitive.value == index]
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
                              item.createTime != null ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatDate(item.createTime)), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(formatDate(item.addTime)), 1))
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
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="horizontal-sidebar" data-v-ec7c9e16>`);
        if (hotList.value.length > 0) {
          _push(`<div class="sidebar-section mb-4" data-v-ec7c9e16><h6 class="sidebar-title" data-v-ec7c9e16>🔥 热门资源</h6><!--[-->`);
          ssrRenderList(hotList.value.slice(0, 8), (item, index) => {
            _push(`<div class="sidebar-item" data-v-ec7c9e16>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              target: istarget.value,
              to: "/list/" + item.id,
              class: "sidebar-link"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="d-flex align-items-center" data-v-ec7c9e16${_scopeId}><span class="${ssrRenderClass([{ "top-rank": index < 3 }, "sidebar-rank"])}" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="sidebar-content" data-v-ec7c9e16${_scopeId}><h6 class="sidebar-item-title" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</h6><p class="sidebar-meta" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>👁️ ${ssrInterpolate(item.hits || 0)}</span><span data-v-ec7c9e16${_scopeId}>❤️ ${ssrInterpolate(item.loveNum || 0)}</span></p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-items-center" }, [
                      createVNode("span", {
                        class: ["sidebar-rank", { "top-rank": index < 3 }]
                      }, toDisplayString(index + 1), 3),
                      createVNode("div", { class: "sidebar-content" }, [
                        createVNode("h6", { class: "sidebar-item-title" }, toDisplayString(item.title), 1),
                        createVNode("p", { class: "sidebar-meta" }, [
                          createVNode("span", null, "👁️ " + toDisplayString(item.hits || 0), 1),
                          createVNode("span", null, "❤️ " + toDisplayString(item.loveNum || 0), 1)
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
        } else {
          _push(`<!---->`);
        }
        if (latestList.value.length > 0) {
          _push(`<div class="sidebar-section" data-v-ec7c9e16><h6 class="sidebar-title" data-v-ec7c9e16>✨ 最新资源</h6><!--[-->`);
          ssrRenderList(latestList.value.slice(0, 6), (item) => {
            _push(`<div class="sidebar-item" data-v-ec7c9e16>`);
            _push(ssrRenderComponent(_component_nuxt_link, {
              target: istarget.value,
              to: "/list/" + item.id,
              class: "sidebar-link"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="d-flex align-items-center" data-v-ec7c9e16${_scopeId}><img${ssrRenderAttr("src", item.thumb || "/default-thumb.png")} class="sidebar-thumb" alt="资源缩略图" data-v-ec7c9e16${_scopeId}><div class="sidebar-content" data-v-ec7c9e16${_scopeId}><h6 class="sidebar-item-title" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</h6><p class="sidebar-meta" data-v-ec7c9e16${_scopeId}><span class="sidebar-author" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.author)}</span><span class="sidebar-time" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.createTime || item.addTime))}</span></p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-items-center" }, [
                      createVNode("img", {
                        src: item.thumb || "/default-thumb.png",
                        class: "sidebar-thumb",
                        alt: "资源缩略图"
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "sidebar-content" }, [
                        createVNode("h6", { class: "sidebar-item-title" }, toDisplayString(item.title), 1),
                        createVNode("p", { class: "sidebar-meta" }, [
                          createVNode("span", { class: "sidebar-author" }, toDisplayString(item.author), 1),
                          createVNode("span", { class: "sidebar-time" }, toDisplayString(formatDate(item.createTime || item.addTime)), 1)
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
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(list.value, (item, index) => {
          _push(`<div class="mw-col list-animation-leftIn delay-3" data-v-ec7c9e16>`);
          if (!setting.value.imageFormat) {
            _push(`<div data-v-ec7c9e16>`);
            if (item && item.status && item.status.includes("published")) {
              _push(`<div data-v-ec7c9e16>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                target: istarget.value,
                to: "/list/" + (item?.id || "")
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<a class="macwk-app border white cursor-pointer" data-v-ec7c9e16${_scopeId}>`);
                    if (item.thumb != null) {
                      _push2(ssrRenderComponent(_component_el_image, {
                        class: "listtitleimg delay-3",
                        src: item.thumb,
                        lazy: ""
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`<div slot="placeholder" class="image-slot" data-v-ec7c9e16${_scopeId2}></div>`);
                          } else {
                            return [
                              createVNode("div", {
                                slot: "placeholder",
                                class: "image-slot"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                    } else {
                      _push2(`<div class="delayImg" style="${ssrRenderStyle(getStyles())}" data-v-ec7c9e16${_scopeId}><h3 class="flex text-center text-white opacity-50" data-v-ec7c9e16${_scopeId}>NOPIC</h3></div>`);
                    }
                    _push2(`<div class="macwk-app__body" data-v-ec7c9e16${_scopeId}><div class="card-meta" data-v-ec7c9e16${_scopeId}><div class="meta-item post-author" data-v-ec7c9e16${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_el_avatar, {
                      style: { "margin-bottom": "3px", "margin-right": "3px" },
                      src: item.authorThumb
                    }, null, _parent2, _scopeId));
                    _push2(`<a class="author-name" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.author)}</a></div>`);
                    if (item.createTime != null) {
                      _push2(`<span class="meta-item" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.createTime))}</span>`);
                    } else {
                      _push2(`<span class="meta-item" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.addTime))}</span>`);
                    }
                    _push2(`<span class="meta-item" data-v-ec7c9e16${_scopeId}><i class="el-icon-share" data-v-ec7c9e16${_scopeId}></i></span></div><h3 class="heading-tertiary-list" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</h3></div><div class="extend" data-v-ec7c9e16${_scopeId}><div class="button" data-v-ec7c9e16${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "12px" })}" data-v-ec7c9e16${_scopeId}><span style="${ssrRenderStyle({ "font-size": "36px", "line-height": "1" })}" data-v-ec7c9e16${_scopeId}><i class="light-icon-more icon-next-arrow" data-v-ec7c9e16${_scopeId}></i></span></div><div style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-ec7c9e16${_scopeId}><span class="value" data-v-ec7c9e16${_scopeId}>￥${ssrInterpolate(item.price)}</span></div></div></div><div class="macwk-app__footer" data-v-ec7c9e16${_scopeId}><div style="${ssrRenderStyle(showfootnext.value ? null : { display: "none" })}" class="macwk-app__footer--more" data-v-ec7c9e16${_scopeId}><i class="light-icon-more icon-next-arrow" data-v-ec7c9e16${_scopeId}></i></div></div></a>`);
                  } else {
                    return [
                      createVNode("a", { class: "macwk-app border white cursor-pointer" }, [
                        item.thumb != null ? (openBlock(), createBlock(_component_el_image, {
                          key: 0,
                          class: "listtitleimg delay-3",
                          src: item.thumb,
                          lazy: ""
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              slot: "placeholder",
                              class: "image-slot"
                            })
                          ]),
                          _: 2
                        }, 1032, ["src"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "delayImg",
                          style: getStyles()
                        }, [
                          createVNode("h3", { class: "flex text-center text-white opacity-50" }, "NOPIC")
                        ], 4)),
                        createVNode("div", { class: "macwk-app__body" }, [
                          createVNode("div", { class: "card-meta" }, [
                            createVNode("div", { class: "meta-item post-author" }, [
                              createVNode(_component_el_avatar, {
                                style: { "margin-bottom": "3px", "margin-right": "3px" },
                                src: item.authorThumb
                              }, null, 8, ["src"]),
                              createVNode("a", { class: "author-name" }, toDisplayString(item.author), 1)
                            ]),
                            item.createTime != null ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "meta-item"
                            }, toDisplayString(formatDate(item.createTime)), 1)) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "meta-item"
                            }, toDisplayString(formatDate(item.addTime)), 1)),
                            createVNode("span", { class: "meta-item" }, [
                              createVNode("i", { class: "el-icon-share" })
                            ])
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
                        ]),
                        createVNode("div", { class: "macwk-app__footer" }, [
                          withDirectives(createVNode("div", { class: "macwk-app__footer--more" }, [
                            createVNode("i", { class: "light-icon-more icon-next-arrow" })
                          ], 512), [
                            [vShow, showfootnext.value]
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<div data-v-ec7c9e16>`);
            if (item && item.status && item.status.includes("published")) {
              _push(`<div data-v-ec7c9e16>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                target: istarget.value,
                to: "/list/" + (item?.id || "")
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<a class="macwk-app border white cursor-pointer padding-xl" data-v-ec7c9e16${_scopeId}><div class="soft-card" data-v-ec7c9e16${_scopeId}><div class="li-card-img-div" data-v-ec7c9e16${_scopeId}><img${ssrRenderAttr("src", item.thumb)} class="budongImg img72 dingweiImg" data-v-ec7c9e16${_scopeId}><img style="${ssrRenderStyle(isAcitive.value == index ? null : { display: "none" })}"${ssrRenderAttr("src", item.thumb)} class="gaosiImg img72 dingweiImg" data-v-ec7c9e16${_scopeId}></div><div class="size-12 text-B6BABF margin-top-90" style="${ssrRenderStyle({ "min-height": "20px" })}" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.subhead)}</span></div><div class="margin-top size-18 text-bold text-block card-hover-red" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</span></div><div class="margin-top1 size-14 text-B6BABF limitText" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.intro)}</span></div><div class="margin-top2 text-B6BABF flex-row size-12" style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "justify-content": "space-between", "width": "100%" })}" data-v-ec7c9e16${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "0px", "display": "flex", "align-items": "center" })}" data-v-ec7c9e16${_scopeId}><img class="view-icon--right"${ssrRenderAttr("src", _imports_0)} data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.hits || 0)}</span></div><div style="${ssrRenderStyle({ "margin": "auto", "display": "flex", "align-items": "center" })}" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.author)}</span></div><div style="${ssrRenderStyle({ "position": "relative", "right": "0px", "display": "flex", "align-items": "center" })}" data-v-ec7c9e16${_scopeId}>`);
                    if (item.createTime != null) {
                      _push2(`<span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.createTime))}</span>`);
                    } else {
                      _push2(`<span data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.addTime))}</span>`);
                    }
                    _push2(`</div></div></div></a>`);
                  } else {
                    return [
                      createVNode("a", { class: "macwk-app border white cursor-pointer padding-xl" }, [
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
                                  [vShow, isAcitive.value == index]
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
                              item.createTime != null ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatDate(item.createTime)), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(formatDate(item.addTime)), 1))
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
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_el_pagination, {
        class: "app-content-bottom",
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange,
        "current-page": listQuery.value.page,
        "page-size": listQuery.value.limit,
        layout: "prev, pager, next",
        total: total.value
      }, null, _parent));
      _push(`</div><div class="app-content-info" data-v-ec7c9e16><div class="siderbar-apps border d-flex flex-column mb-5" data-v-ec7c9e16><div class="siderbar-apps__header" data-v-ec7c9e16><h6 class="mb-0" data-v-ec7c9e16>相关推荐</h6></div><div class="siderbar-apps__body min-h-415" data-v-ec7c9e16>`);
      if (recommendedList.value.length > 0) {
        _push(`<div class="recommended-section mb-4" data-v-ec7c9e16><h6 class="section-title mb-3" data-v-ec7c9e16>🎆 精品推荐</h6><!--[-->`);
        ssrRenderList(recommendedList.value.slice(0, 3), (item) => {
          _push(`<div class="recommend-item mb-3" data-v-ec7c9e16>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            target: istarget.value,
            to: "/list/" + item.id,
            class: "recommend-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="d-flex" data-v-ec7c9e16${_scopeId}><img${ssrRenderAttr("src", item.thumb || "/default-thumb.png")} class="recommend-thumb" alt="资源缩略图" data-v-ec7c9e16${_scopeId}><div class="recommend-content flex-1" data-v-ec7c9e16${_scopeId}><h6 class="recommend-title" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</h6><p class="recommend-meta" data-v-ec7c9e16${_scopeId}><span class="author" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.author)}</span><span class="category" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.className)}</span></p><div class="recommend-stats" data-v-ec7c9e16${_scopeId}><span class="stat-item" data-v-ec7c9e16${_scopeId}><i class="icon-eye" data-v-ec7c9e16${_scopeId}></i> ${ssrInterpolate(item.hits || 0)}</span><span class="stat-item" data-v-ec7c9e16${_scopeId}><i class="icon-heart" data-v-ec7c9e16${_scopeId}></i> ${ssrInterpolate(item.loveNum || 0)}</span></div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "d-flex" }, [
                    createVNode("img", {
                      src: item.thumb || "/default-thumb.png",
                      class: "recommend-thumb",
                      alt: "资源缩略图"
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "recommend-content flex-1" }, [
                      createVNode("h6", { class: "recommend-title" }, toDisplayString(item.title), 1),
                      createVNode("p", { class: "recommend-meta" }, [
                        createVNode("span", { class: "author" }, toDisplayString(item.author), 1),
                        createVNode("span", { class: "category" }, toDisplayString(item.className), 1)
                      ]),
                      createVNode("div", { class: "recommend-stats" }, [
                        createVNode("span", { class: "stat-item" }, [
                          createVNode("i", { class: "icon-eye" }),
                          createTextVNode(" " + toDisplayString(item.hits || 0), 1)
                        ]),
                        createVNode("span", { class: "stat-item" }, [
                          createVNode("i", { class: "icon-heart" }),
                          createTextVNode(" " + toDisplayString(item.loveNum || 0), 1)
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
      } else {
        _push(`<!---->`);
      }
      if (hotList.value.length > 0) {
        _push(`<div class="hot-section mb-4" data-v-ec7c9e16><h6 class="section-title mb-3" data-v-ec7c9e16>🔥 热门资源</h6><!--[-->`);
        ssrRenderList(hotList.value.slice(0, 5), (item, index) => {
          _push(`<div class="hot-item mb-2" data-v-ec7c9e16>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            target: istarget.value,
            to: "/list/" + item.id,
            class: "hot-link d-flex align-items-center"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="${ssrRenderClass([{ "top-rank": index < 3 }, "hot-rank"])}" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="hot-content flex-1" data-v-ec7c9e16${_scopeId}><h6 class="hot-title" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</h6><p class="hot-stats" data-v-ec7c9e16${_scopeId}><span data-v-ec7c9e16${_scopeId}>👁️ ${ssrInterpolate(item.hits || 0)}</span><span data-v-ec7c9e16${_scopeId}>❤️ ${ssrInterpolate(item.loveNum || 0)}</span></p></div>`);
              } else {
                return [
                  createVNode("span", {
                    class: ["hot-rank", { "top-rank": index < 3 }]
                  }, toDisplayString(index + 1), 3),
                  createVNode("div", { class: "hot-content flex-1" }, [
                    createVNode("h6", { class: "hot-title" }, toDisplayString(item.title), 1),
                    createVNode("p", { class: "hot-stats" }, [
                      createVNode("span", null, "👁️ " + toDisplayString(item.hits || 0), 1),
                      createVNode("span", null, "❤️ " + toDisplayString(item.loveNum || 0), 1)
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
      } else {
        _push(`<!---->`);
      }
      if (latestList.value.length > 0) {
        _push(`<div class="latest-section" data-v-ec7c9e16><h6 class="section-title mb-3" data-v-ec7c9e16>✨ 最新资源</h6><!--[-->`);
        ssrRenderList(latestList.value.slice(0, 4), (item) => {
          _push(`<div class="latest-item mb-2" data-v-ec7c9e16>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            target: istarget.value,
            to: "/list/" + item.id,
            class: "latest-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="d-flex align-items-center" data-v-ec7c9e16${_scopeId}><img${ssrRenderAttr("src", item.thumb || "/default-thumb.png")} class="latest-thumb" alt="资源缩略图" data-v-ec7c9e16${_scopeId}><div class="latest-content flex-1" data-v-ec7c9e16${_scopeId}><h6 class="latest-title" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.title)}</h6><p class="latest-meta" data-v-ec7c9e16${_scopeId}><span class="latest-author" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(item.author)}</span><span class="latest-time" data-v-ec7c9e16${_scopeId}>${ssrInterpolate(formatDate(item.createTime || item.addTime))}</span></p></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "d-flex align-items-center" }, [
                    createVNode("img", {
                      src: item.thumb || "/default-thumb.png",
                      class: "latest-thumb",
                      alt: "资源缩略图"
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "latest-content flex-1" }, [
                      createVNode("h6", { class: "latest-title" }, toDisplayString(item.title), 1),
                      createVNode("p", { class: "latest-meta" }, [
                        createVNode("span", { class: "latest-author" }, toDisplayString(item.author), 1),
                        createVNode("span", { class: "latest-time" }, toDisplayString(formatDate(item.createTime || item.addTime)), 1)
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
      } else {
        _push(`<!---->`);
      }
      if (recommendedList.value.length === 0 && hotList.value.length === 0 && latestList.value.length === 0) {
        _push(`<div class="empty-state text-center py-4" data-v-ec7c9e16><p class="text-muted" data-v-ec7c9e16>暂无推荐内容</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="siderbar-apps border d-flex flex-column" data-v-ec7c9e16><div class="van-tabs van-tabs--line" data-v-ec7c9e16><div class="van-tabs__wrap" data-v-ec7c9e16><div role="tablist" class="van-tabs__nav van-tabs__nav--line" data-v-ec7c9e16><div class="van-tabs__line" data-v-ec7c9e16></div></div></div><div class="van-tabs__content" data-v-ec7c9e16><div role="tabpanel" class="van-tab__pane" style="${ssrRenderStyle({ "display": "none" })}" data-v-ec7c9e16></div><div role="tabpanel" class="van-tab__pane" style="${ssrRenderStyle({ "display": "none" })}" data-v-ec7c9e16></div></div></div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_mobile, null, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-ec7c9e16><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-ec7c9e16></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/AllList/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ec7c9e16"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-FCOvFeHb.mjs.map
