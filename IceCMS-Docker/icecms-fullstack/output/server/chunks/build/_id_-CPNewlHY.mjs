import { n as getResourceByClassAndType, _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, withAsyncContext, watch, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { f as formatDate } from './date-DoCWYhJL.mjs';
import { g as getResourceClasslist, a as getResourceClassNameByid } from './webresourceclass-DptsPlvX.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const moreIndex = ref(false);
    const className = ref("");
    const rlist = ref([]);
    const allCategories = ref([]);
    const acticve = ref("nav-link active");
    const currentPage = ref(1);
    const pageSize = ref(12);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const loading = ref(false);
    [__temp, __restore] = withAsyncContext(() => getAllCategories()), await __temp, __restore();
    async function getAllCategories() {
      try {
        const resp = await getResourceClasslist();
        if (resp && resp.data && resp.data.value) {
          allCategories.value = Array.isArray(resp.data.value) ? resp.data.value : [];
        } else if (resp && Array.isArray(resp)) {
          allCategories.value = resp;
        } else {
          allCategories.value = [];
        }
        console.log("获取所有分类成功:", allCategories.value);
      } catch (error) {
        console.error("获取所有分类失败", error);
        allCategories.value = [];
      }
    }
    [__temp, __restore] = withAsyncContext(() => getClassName()), await __temp, __restore();
    async function getClassName() {
      try {
        const resp = await getResourceClassNameByid(route.params.id);
        if (resp && resp.data) {
          if (resp.data.value) {
            className.value = resp.data.value;
          } else {
            className.value = resp.data;
          }
        } else {
          className.value = "未知分类";
        }
        console.log("获取分类名称成功:", className.value);
      } catch (error) {
        console.error("获取分类名称失败", error);
        className.value = "未知分类";
      }
    }
    [__temp, __restore] = withAsyncContext(() => getList()), await __temp, __restore();
    async function getList(page = currentPage.value) {
      try {
        loading.value = true;
        const resp = await getResourceByClassAndType(
          { page, limit: pageSize.value },
          route.params.id,
          "new"
          // 默认按最新排序，也可以改为其他类型
        );
        console.log("分页数据:", resp);
        if (resp && resp.data && resp.data.value) {
          const responseData = resp.data.value;
          if (responseData && responseData.data) {
            rlist.value = Array.isArray(responseData.data) ? responseData.data : [];
            if (responseData.total !== void 0) {
              totalItems.value = responseData.total;
              totalPages.value = Math.ceil(totalItems.value / pageSize.value);
            } else {
              if (rlist.value.length < pageSize.value) {
                totalPages.value = page;
                totalItems.value = (page - 1) * pageSize.value + rlist.value.length;
              } else {
                totalPages.value = page + 1;
              }
            }
          } else {
            rlist.value = [];
            totalItems.value = 0;
            totalPages.value = 0;
          }
        } else {
          rlist.value = [];
          totalItems.value = 0;
          totalPages.value = 0;
        }
        console.log("处理后的数据:", {
          items: rlist.value.length,
          totalItems: totalItems.value,
          totalPages: totalPages.value,
          currentPage: page
        });
      } catch (error) {
        console.error("获取资源列表失败", error);
        rlist.value = [];
        totalItems.value = 0;
        totalPages.value = 0;
      } finally {
        loading.value = false;
      }
    }
    watch(() => route.params.id, async (newId) => {
      if (newId) {
        currentPage.value = 1;
        await getClassName();
        await getList(1);
      }
    });
    const getVisiblePages = () => {
      const visiblePages = [];
      const maxVisiblePages = 7;
      if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
          visiblePages.push(i);
        }
      } else {
        const halfVisible = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, currentPage.value - halfVisible);
        let endPage = Math.min(totalPages.value, currentPage.value + halfVisible);
        if (endPage - startPage + 1 < maxVisiblePages) {
          if (startPage === 1) {
            endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
          } else {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
          }
        }
        if (startPage > 1) {
          visiblePages.push(1);
          if (startPage > 2) {
            visiblePages.push("...");
          }
        }
        for (let i = startPage; i <= endPage; i++) {
          visiblePages.push(i);
        }
        if (endPage < totalPages.value) {
          if (endPage < totalPages.value - 1) {
            visiblePages.push("...");
          }
          visiblePages.push(totalPages.value);
        }
      }
      return visiblePages;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_router_link = resolveComponent("router-link");
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-960733d6><div data-server-rendered="true" id="__nuxt" data-v-960733d6><div id="__layout" data-v-960733d6><div data-fetch-key="0" class="app macwk-animation" data-v-960733d6><div class="layout-min-full-height overflow-hidden special-content pb-8" data-v-960733d6>`);
      _push(ssrRenderComponent(_component_top, { message4: acticve.value }, null, _parent));
      _push(`<div class="container" data-v-960733d6><div class="row" data-v-960733d6><div class="col-sm-12 col-xxl-10 offset-xxl-1" data-v-960733d6><header class="text-center py-8" data-v-960733d6><h1 class="fw-600 fs-60" data-v-960733d6> Best Tools for <span class="text-primary hover-text-underline cursor" data-v-960733d6>${ssrInterpolate(className.value)} <i class="icon-chevron-down" data-v-960733d6></i></span></h1><span data-v-960733d6><div style="${ssrRenderStyle([
        moreIndex.value ? null : { display: "none" },
        { "width": "300px" }
      ])}" role="tooltip" id="el-popover-4430" aria-hidden="true" class="el-popover el-popper" data-v-960733d6><div data-v-960733d6><!--[-->`);
      ssrRenderList(allCategories.value, (category) => {
        _push(ssrRenderComponent(_component_router_link, {
          key: category.id,
          to: "/classdetal/" + category.id,
          class: ["px-5 py-3 fs-26 d-block hover:text-primary transition-colors", { "active text-primary": category.id == unref(route).params.id, "text-dark": category.id != unref(route).params.id }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(category.name)} `);
              if (category.num) {
                _push2(`<span class="text-muted fs-14 ml-2" data-v-960733d6${_scopeId}>(${ssrInterpolate(category.num)})</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createTextVNode(toDisplayString(category.name) + " ", 1),
                category.num ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-muted fs-14 ml-2"
                }, "(" + toDisplayString(category.num) + ")", 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (allCategories.value.length === 0) {
        _push(`<div class="px-5 py-3 text-center text-muted" data-v-960733d6> 暂无分类数据 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><span class="el-popover__reference-wrapper" data-v-960733d6></span></span><h5 class="text-muted" data-v-960733d6> 在这里，您可以找到面向${ssrInterpolate(className.value)}的最佳应用工具。<br data-v-960733d6> 如果您认为我们有所遗漏，请在<a href="/feedback" target="_blank" class="mx-1 text-primary" data-v-960733d6>意见建议</a>处提交给我们，谢谢。 </h5></header><div class="clearfix special-box-list" data-v-960733d6>`);
      if (loading.value) {
        _push(`<div class="text-center py-5" data-v-960733d6><div class="loading-spinner" data-v-960733d6><i class="el-icon-loading" data-v-960733d6></i><p class="mt-2" data-v-960733d6>加载中...</p></div></div>`);
      } else {
        _push(`<div class="w-r" style="${ssrRenderStyle({ "margin-left": "-15px", "margin-right": "-15px" })}" data-v-960733d6><!--[-->`);
        ssrRenderList(rlist.value, (item) => {
          _push(`<div class="list-animation-leftIn w-c w-c-6 delay-0" style="${ssrRenderStyle({ "padding-left": "15px", "padding-right": "15px", "padding-bottom": "30px" })}" data-v-960733d6>`);
          _push(ssrRenderComponent(_component_router_link, {
            to: "/list/" + item.id
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<a href="" target="_blank" class="macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-0" data-v-960733d6${_scopeId}><span class="snow-dot" data-v-960733d6${_scopeId}></span><span class="snow-dot" data-v-960733d6${_scopeId}></span><span class="snow-dot" data-v-960733d6${_scopeId}></span><span class="snow-dot" data-v-960733d6${_scopeId}></span><span class="snow-dot" data-v-960733d6${_scopeId}></span><span class="snow-dot" data-v-960733d6${_scopeId}></span><span class="snow-dot" data-v-960733d6${_scopeId}></span><div class="macwk-app__header--icon delay-0" data-v-960733d6${_scopeId}><div class="macwk-app__header--icon--content" data-v-960733d6${_scopeId}></div><img class="delay-0"${ssrRenderAttr("src", item.thumb)} data-v-960733d6${_scopeId}><div class="flex-grow-1 text-right fs-14" data-v-960733d6${_scopeId}></div></div><div class="macwk-app__body pt-6 pb-7" data-v-960733d6${_scopeId}><h4 class="macwk-app__body--title" data-v-960733d6${_scopeId}><span class="fw-600" data-v-960733d6${_scopeId}>${ssrInterpolate(item.title)}</span></h4><p class="macwk-app__body--info" data-v-960733d6${_scopeId}><span data-v-960733d6${_scopeId}>${ssrInterpolate(item.subhead)}</span></p><p class="text-muted text-truncate mb-0" data-v-960733d6${_scopeId}>${ssrInterpolate(item.intro)}</p></div><div class="macwk-app__extend" data-v-960733d6${_scopeId}><div class="macwk-app__extend--download" data-v-960733d6${_scopeId}><i class="icon-download2" data-v-960733d6${_scopeId}></i> <span data-v-960733d6${_scopeId}>${ssrInterpolate(item.hits ?? 0)}</span></div><div class="macwk-app__extend--comment" data-v-960733d6${_scopeId}><i class="icon-bubble" data-v-960733d6${_scopeId}></i> <span data-v-960733d6${_scopeId}>0</span></div><div class="macwk-app__extend--like" data-v-960733d6${_scopeId}><i class="icon-heart" data-v-960733d6${_scopeId}></i> <span data-v-960733d6${_scopeId}>0</span></div><div class="macwk-app__extend--os" data-v-960733d6${_scopeId}><i class="icon-disc fw-600" data-v-960733d6${_scopeId}></i><span data-v-960733d6${_scopeId}>&gt;= 0</span></div><div class="macwk-app__extend--update" data-v-960733d6${_scopeId}><i class="icon-clock" data-v-960733d6${_scopeId}></i>`);
                if (item.createTime != null) {
                  _push2(`<span data-v-960733d6${_scopeId}>${ssrInterpolate(unref(formatDate)(item.createTime))}</span>`);
                } else {
                  _push2(`<span data-v-960733d6${_scopeId}>${ssrInterpolate(unref(formatDate)(item.addTime))}</span>`);
                }
                _push2(`</div></div></a>`);
              } else {
                return [
                  createVNode("a", {
                    href: "",
                    target: "_blank",
                    class: "macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-0"
                  }, [
                    createVNode("span", { class: "snow-dot" }),
                    createVNode("span", { class: "snow-dot" }),
                    createVNode("span", { class: "snow-dot" }),
                    createVNode("span", { class: "snow-dot" }),
                    createVNode("span", { class: "snow-dot" }),
                    createVNode("span", { class: "snow-dot" }),
                    createVNode("span", { class: "snow-dot" }),
                    createVNode("div", { class: "macwk-app__header--icon delay-0" }, [
                      createVNode("div", { class: "macwk-app__header--icon--content" }),
                      createVNode("img", {
                        class: "delay-0",
                        src: item.thumb
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "flex-grow-1 text-right fs-14" })
                    ]),
                    createVNode("div", { class: "macwk-app__body pt-6 pb-7" }, [
                      createVNode("h4", { class: "macwk-app__body--title" }, [
                        createVNode("span", { class: "fw-600" }, toDisplayString(item.title), 1)
                      ]),
                      createVNode("p", { class: "macwk-app__body--info" }, [
                        createVNode("span", null, toDisplayString(item.subhead), 1)
                      ]),
                      createVNode("p", { class: "text-muted text-truncate mb-0" }, toDisplayString(item.intro), 1)
                    ]),
                    createVNode("div", { class: "macwk-app__extend" }, [
                      createVNode("div", { class: "macwk-app__extend--download" }, [
                        createVNode("i", { class: "icon-download2" }),
                        createTextVNode(),
                        createVNode("span", null, toDisplayString(item.hits ?? 0), 1)
                      ]),
                      createVNode("div", { class: "macwk-app__extend--comment" }, [
                        createVNode("i", { class: "icon-bubble" }),
                        createTextVNode(),
                        createVNode("span", null, "0")
                      ]),
                      createVNode("div", { class: "macwk-app__extend--like" }, [
                        createVNode("i", { class: "icon-heart" }),
                        createTextVNode(),
                        createVNode("span", null, "0")
                      ]),
                      createVNode("div", { class: "macwk-app__extend--os" }, [
                        createVNode("i", { class: "icon-disc fw-600" }),
                        createVNode("span", null, ">= 0")
                      ]),
                      createVNode("div", { class: "macwk-app__extend--update" }, [
                        createVNode("i", { class: "icon-clock" }),
                        item.createTime != null ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(formatDate)(item.createTime)), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(formatDate)(item.addTime)), 1))
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
      if (!loading.value && rlist.value.length > 0 && totalPages.value > 1) {
        _push(`<div class="pagination-wrapper text-center mt-5" data-v-960733d6><nav aria-label="分页导航" data-v-960733d6><ul class="pagination justify-content-center" data-v-960733d6><li class="${ssrRenderClass([{ disabled: currentPage.value === 1 }, "page-item"])}" data-v-960733d6><button class="page-link"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-960733d6><i class="icon-chevron-left" data-v-960733d6></i> 上一页 </button></li><!--[-->`);
        ssrRenderList(getVisiblePages(), (page) => {
          _push(`<li class="${ssrRenderClass([{ active: page === currentPage.value }, "page-item"])}" data-v-960733d6>`);
          if (page !== "...") {
            _push(`<button class="page-link" data-v-960733d6>${ssrInterpolate(page)}</button>`);
          } else {
            _push(`<span class="page-link disabled" data-v-960733d6>...</span>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--><li class="${ssrRenderClass([{ disabled: currentPage.value === totalPages.value }, "page-item"])}" data-v-960733d6><button class="page-link"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-960733d6> 下一页 <i class="icon-chevron-right" data-v-960733d6></i></button></li></ul></nav><div class="pagination-info mt-3" data-v-960733d6><span class="text-muted" data-v-960733d6> 第 ${ssrInterpolate(currentPage.value)} 页，共 ${ssrInterpolate(totalPages.value)} 页，共 ${ssrInterpolate(totalItems.value)} 条记录 </span></div></div>`);
      } else if (!loading.value && rlist.value.length === 0) {
        _push(`<div class="text-center py-5" data-v-960733d6><div class="empty-state" data-v-960733d6><i class="el-icon-folder-opened" style="${ssrRenderStyle({ "font-size": "48px", "color": "#ddd" })}" data-v-960733d6></i><p class="mt-2 text-muted" data-v-960733d6>该分类暂无资源</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div id="sidetools" class="macwk-animation tinUpIn" style="${ssrRenderStyle({ "display": "none" })}" data-v-960733d6><div class="sidetools-item" data-v-960733d6><div class="sidetools-wrapper" data-v-960733d6><a href="https://t.me/macwk" target="_blank" class="cursor" data-v-960733d6><span class="sidetools-icon kfqq" data-v-960733d6></span></a></div></div><div class="sidetools-item" data-v-960733d6><div class="sidetools-wrapper" data-v-960733d6><a class="el-tooltip cursor" data-v-960733d6><span class="sidetools-icon back-top" data-v-960733d6></span></a></div></div><span data-v-960733d6><div role="tooltip" id="el-popover-3162" aria-hidden="true" class="el-popover el-popper" style="${ssrRenderStyle({ "width": "200px", "display": "none" })}" data-v-960733d6><div class="text-center" data-v-960733d6><a href="/feedback" class="mt-15 mb-0" data-v-960733d6>在线留言</a></div></div><span class="el-popover__reference-wrapper" data-v-960733d6></span></span><span data-v-960733d6><div role="tooltip" id="el-popover-2721" aria-hidden="true" class="el-popover el-popper" style="${ssrRenderStyle({ "width": "200px", "display": "none" })}" data-v-960733d6><div class="text-center" data-v-960733d6><a href="/feedback" class="mt-15 mb-0" data-v-960733d6>在线留言</a></div></div><span class="el-popover__reference-wrapper" data-v-960733d6></span></span></div></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-960733d6><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-960733d6></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/classdetal/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-960733d6"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CPNewlHY.mjs.map
