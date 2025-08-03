import { E as ElRow, a as ElCol } from './el-col-P7eqMh2W.mjs';
import { E as ElCard } from './el-card-ReDS_y_B.mjs';
import { E as ElButton } from './el-button-LIU117i9.mjs';
import { E as ElEmpty } from './el-empty-CMBwVW-y.mjs';
import { E as ElPagination } from './el-pagination-BWqT6DSk.mjs';
import { v as vLoading } from './el-loading-B0BjiLcr.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { a as getCurrentUserOrders } from './webuser-CDNs4gr0.mjs';
import { E as ElMessage } from './index-D2_eFSsF.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@vue/shared';
import 'lodash-unified';
import './el-select-ZvTonYnZ.mjs';
import './el-popper-mKntyvEc.mjs';
import './el-input-2q_vffSS.mjs';
import './event-BZTOGHfp.mjs';
import './index-C6mv4HvU.mjs';
import './index-DM9QPBoH.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payInfo",
  __ssrInlineRender: true,
  setup(__props) {
    const orderList = ref([]);
    const isLoading = ref(true);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const totalPages = ref(0);
    async function getOrderList() {
      try {
        isLoading.value = true;
        const result = await getCurrentUserOrders(currentPage.value, pageSize.value);
        if (result.code === 200) {
          orderList.value = result.data.records || [];
          total.value = result.data.total || 0;
          totalPages.value = result.data.pages || 0;
          currentPage.value = result.data.current || 1;
        } else {
          ElMessage.error(result.msg || "获取订单列表失败");
          orderList.value = [];
        }
      } catch (error) {
        console.error("获取订单列表失败:", error);
        ElMessage.error("获取订单列表失败，请稍后重试");
        orderList.value = [];
      } finally {
        isLoading.value = false;
      }
    }
    function handlePageChange(page) {
      currentPage.value = page;
      getOrderList();
    }
    function formatOrderStatus(status) {
      const statusMap = {
        "PENDING": "待付款",
        "PAID": "已支付",
        "PROCESSING": "处理中",
        "SHIPPED": "已发货",
        "DELIVERED": "已完成",
        "CANCELLED": "已取消"
      };
      return statusMap[status] || status;
    }
    function formatAmount(amount) {
      return (amount / 100).toFixed(2);
    }
    function viewOrderDetails(orderId) {
      console.log("查看订单详情:", orderId);
    }
    async function handleCancelOrder(orderId) {
      console.log("取消订单:", orderId);
      ElMessage.warning("取消订单功能待实现");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_button = ElButton;
      const _component_el_empty = ElEmpty;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "order-list home" }, _attrs))} data-v-b5fc490a><h2 data-v-b5fc490a>我的订单</h2><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_loading, isLoading.value))} data-v-b5fc490a>`);
      if (orderList.value.length > 0) {
        _push(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(orderList.value, (order) => {
                _push2(ssrRenderComponent(_component_el_col, {
                  span: 8,
                  key: order.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_card, {
                        class: "order-card",
                        shadow: "hover"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="order-info" data-v-b5fc490a${_scopeId3}><div class="order-header" data-v-b5fc490a${_scopeId3}><p class="order-id" data-v-b5fc490a${_scopeId3}>订单号: ${ssrInterpolate(order.orderNo)}</p><p class="${ssrRenderClass([["status", formatOrderStatus(order.orderStatus)], "order-status"])}" data-v-b5fc490a${_scopeId3}>${ssrInterpolate(formatOrderStatus(order.orderStatus))}</p></div><div class="order-details" data-v-b5fc490a${_scopeId3}><p data-v-b5fc490a${_scopeId3}><strong data-v-b5fc490a${_scopeId3}>商品:</strong> ${ssrInterpolate(order.title)}</p><p data-v-b5fc490a${_scopeId3}><strong data-v-b5fc490a${_scopeId3}>支付方式:</strong> ${ssrInterpolate(order.payMent || "未知")}</p><p data-v-b5fc490a${_scopeId3}><strong data-v-b5fc490a${_scopeId3}>订单金额:</strong> ¥${ssrInterpolate(formatAmount(order.totalFee))}</p><p data-v-b5fc490a${_scopeId3}><strong data-v-b5fc490a${_scopeId3}>创建时间:</strong> ${ssrInterpolate(order.createTime)}</p></div><div class="order-actions" data-v-b5fc490a${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_el_button, {
                              onClick: ($event) => viewOrderDetails(order.id),
                              type: "primary",
                              size: "small"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`查看详情`);
                                } else {
                                  return [
                                    createTextVNode("查看详情")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            if (order.orderStatus === "PENDING") {
                              _push4(ssrRenderComponent(_component_el_button, {
                                onClick: ($event) => handleCancelOrder(order.id),
                                type: "danger",
                                size: "small",
                                class: "cancel-btn"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`取消订单`);
                                  } else {
                                    return [
                                      createTextVNode("取消订单")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "order-info" }, [
                                createVNode("div", { class: "order-header" }, [
                                  createVNode("p", { class: "order-id" }, "订单号: " + toDisplayString(order.orderNo), 1),
                                  createVNode("p", {
                                    class: ["order-status", ["status", formatOrderStatus(order.orderStatus)]]
                                  }, toDisplayString(formatOrderStatus(order.orderStatus)), 3)
                                ]),
                                createVNode("div", { class: "order-details" }, [
                                  createVNode("p", null, [
                                    createVNode("strong", null, "商品:"),
                                    createTextVNode(" " + toDisplayString(order.title), 1)
                                  ]),
                                  createVNode("p", null, [
                                    createVNode("strong", null, "支付方式:"),
                                    createTextVNode(" " + toDisplayString(order.payMent || "未知"), 1)
                                  ]),
                                  createVNode("p", null, [
                                    createVNode("strong", null, "订单金额:"),
                                    createTextVNode(" ¥" + toDisplayString(formatAmount(order.totalFee)), 1)
                                  ]),
                                  createVNode("p", null, [
                                    createVNode("strong", null, "创建时间:"),
                                    createTextVNode(" " + toDisplayString(order.createTime), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "order-actions" }, [
                                  createVNode(_component_el_button, {
                                    onClick: ($event) => viewOrderDetails(order.id),
                                    type: "primary",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("查看详情")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]),
                                  order.orderStatus === "PENDING" ? (openBlock(), createBlock(_component_el_button, {
                                    key: 0,
                                    onClick: ($event) => handleCancelOrder(order.id),
                                    type: "danger",
                                    size: "small",
                                    class: "cancel-btn"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消订单")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_card, {
                          class: "order-card",
                          shadow: "hover"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "order-info" }, [
                              createVNode("div", { class: "order-header" }, [
                                createVNode("p", { class: "order-id" }, "订单号: " + toDisplayString(order.orderNo), 1),
                                createVNode("p", {
                                  class: ["order-status", ["status", formatOrderStatus(order.orderStatus)]]
                                }, toDisplayString(formatOrderStatus(order.orderStatus)), 3)
                              ]),
                              createVNode("div", { class: "order-details" }, [
                                createVNode("p", null, [
                                  createVNode("strong", null, "商品:"),
                                  createTextVNode(" " + toDisplayString(order.title), 1)
                                ]),
                                createVNode("p", null, [
                                  createVNode("strong", null, "支付方式:"),
                                  createTextVNode(" " + toDisplayString(order.payMent || "未知"), 1)
                                ]),
                                createVNode("p", null, [
                                  createVNode("strong", null, "订单金额:"),
                                  createTextVNode(" ¥" + toDisplayString(formatAmount(order.totalFee)), 1)
                                ]),
                                createVNode("p", null, [
                                  createVNode("strong", null, "创建时间:"),
                                  createTextVNode(" " + toDisplayString(order.createTime), 1)
                                ])
                              ]),
                              createVNode("div", { class: "order-actions" }, [
                                createVNode(_component_el_button, {
                                  onClick: ($event) => viewOrderDetails(order.id),
                                  type: "primary",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("查看详情")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                order.orderStatus === "PENDING" ? (openBlock(), createBlock(_component_el_button, {
                                  key: 0,
                                  onClick: ($event) => handleCancelOrder(order.id),
                                  type: "danger",
                                  size: "small",
                                  class: "cancel-btn"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消订单")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(orderList.value, (order) => {
                  return openBlock(), createBlock(_component_el_col, {
                    span: 8,
                    key: order.id
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_card, {
                        class: "order-card",
                        shadow: "hover"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "order-info" }, [
                            createVNode("div", { class: "order-header" }, [
                              createVNode("p", { class: "order-id" }, "订单号: " + toDisplayString(order.orderNo), 1),
                              createVNode("p", {
                                class: ["order-status", ["status", formatOrderStatus(order.orderStatus)]]
                              }, toDisplayString(formatOrderStatus(order.orderStatus)), 3)
                            ]),
                            createVNode("div", { class: "order-details" }, [
                              createVNode("p", null, [
                                createVNode("strong", null, "商品:"),
                                createTextVNode(" " + toDisplayString(order.title), 1)
                              ]),
                              createVNode("p", null, [
                                createVNode("strong", null, "支付方式:"),
                                createTextVNode(" " + toDisplayString(order.payMent || "未知"), 1)
                              ]),
                              createVNode("p", null, [
                                createVNode("strong", null, "订单金额:"),
                                createTextVNode(" ¥" + toDisplayString(formatAmount(order.totalFee)), 1)
                              ]),
                              createVNode("p", null, [
                                createVNode("strong", null, "创建时间:"),
                                createTextVNode(" " + toDisplayString(order.createTime), 1)
                              ])
                            ]),
                            createVNode("div", { class: "order-actions" }, [
                              createVNode(_component_el_button, {
                                onClick: ($event) => viewOrderDetails(order.id),
                                type: "primary",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("查看详情")
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              order.orderStatus === "PENDING" ? (openBlock(), createBlock(_component_el_button, {
                                key: 0,
                                onClick: ($event) => handleCancelOrder(order.id),
                                type: "danger",
                                size: "small",
                                class: "cancel-btn"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("取消订单")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (!isLoading.value) {
        _push(`<div class="no-order-msg" data-v-b5fc490a>`);
        _push(ssrRenderComponent(_component_el_empty, { description: "暂无订单数据" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (orderList.value.length > 0) {
        _push(`<div class="pagination-container" data-v-b5fc490a>`);
        _push(ssrRenderComponent(_component_el_pagination, {
          background: "",
          layout: "prev, pager, next, total",
          "current-page": currentPage.value,
          "page-size": pageSize.value,
          total: total.value,
          onCurrentChange: handlePageChange
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/payInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const payInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b5fc490a"]]);

export { payInfo as default };
//# sourceMappingURL=payInfo-DjeoOArK.mjs.map
