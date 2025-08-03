import { E as ElDialog } from './el-overlay-D0BXiGeq.mjs';
import { E as ElButton } from './el-button-LIU117i9.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _imports_3, a as _imports_4, b as _imports_0, c as _imports_1, d as _imports_2 } from './jifen-4MnSXMr0.mjs';
import { E as ElMessage } from './index-D2_eFSsF.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@vue/shared';
import './index-C6mv4HvU.mjs';
import 'lodash-unified';
import './event-BZTOGHfp.mjs';
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
  __name: "vip",
  __ssrInlineRender: true,
  setup(__props) {
    const wxDialogVisible = ref(false);
    const aliDialogVisible = ref(false);
    const PaymentDialogVisibleLogin = ref(false);
    const codeUrl = ref("");
    const form = ref({
      integral: ""
    });
    ref("");
    const selectPayTypeLogin = (type) => {
      console.log("支付方式：" + type);
      PaymentDialogVisibleLogin.value = false;
      if (type === "alipay") {
        aliDialogVisible.value = true;
      } else if (type === "wxpay") {
        wxDialogVisible.value = true;
      }
    };
    const closeDialog = () => {
      wxDialogVisible.value = false;
      aliDialogVisible.value = false;
      PaymentDialogVisibleLogin.value = false;
    };
    const onSubmit = () => {
      if (!form.value.integral) {
        ElMessage.warning("请先选择充值套餐");
        return;
      }
      PaymentDialogVisibleLogin.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_qriously = resolveComponent("qriously");
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "vip-container" }, _attrs))} data-v-a1cb9d83><div class="page-header" data-v-a1cb9d83><h2 class="page-title" data-v-a1cb9d83>会员充值</h2><p class="page-subtitle" data-v-a1cb9d83>选择充值套餐，享受更多特权</p></div><div data-v-a1cb9d83>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: wxDialogVisible.value,
        "onUpdate:modelValue": ($event) => wxDialogVisible.value = $event,
        "show-close": false,
        onClose: closeDialog,
        width: "320px",
        center: "",
        class: "payment-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="qr-header" data-v-a1cb9d83${_scopeId}><img${ssrRenderAttr("src", _imports_3)} class="payment-icon" data-v-a1cb9d83${_scopeId}></div><div class="qr-code-container" data-v-a1cb9d83${_scopeId}>`);
            _push2(ssrRenderComponent(_component_qriously, {
              value: codeUrl.value,
              size: 190
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="qr-footer wx-footer" data-v-a1cb9d83${_scopeId}><div class="payment-tip" data-v-a1cb9d83${_scopeId}> 请使用微信扫一扫<br data-v-a1cb9d83${_scopeId}>扫描二维码支付 </div></div>`);
          } else {
            return [
              createVNode("div", { class: "qr-header" }, [
                createVNode("img", {
                  src: _imports_3,
                  class: "payment-icon"
                })
              ]),
              createVNode("div", { class: "qr-code-container" }, [
                createVNode(_component_qriously, {
                  value: codeUrl.value,
                  size: 190
                }, null, 8, ["value"])
              ]),
              createVNode("div", { class: "qr-footer wx-footer" }, [
                createVNode("div", { class: "payment-tip" }, [
                  createTextVNode(" 请使用微信扫一扫"),
                  createVNode("br"),
                  createTextVNode("扫描二维码支付 ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-a1cb9d83>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: aliDialogVisible.value,
        "onUpdate:modelValue": ($event) => aliDialogVisible.value = $event,
        "show-close": false,
        onClose: closeDialog,
        width: "320px",
        center: "",
        class: "payment-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="qr-header" data-v-a1cb9d83${_scopeId}><img${ssrRenderAttr("src", _imports_4)} class="payment-icon" data-v-a1cb9d83${_scopeId}><div class="payment-amount" data-v-a1cb9d83${_scopeId}>扫码支付 ¥${ssrInterpolate(form.value.integral)}</div></div><div class="qr-code-container" data-v-a1cb9d83${_scopeId}>`);
            _push2(ssrRenderComponent(_component_qriously, {
              value: codeUrl.value,
              size: 190
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="qr-footer ali-footer" data-v-a1cb9d83${_scopeId}><div class="payment-tip" data-v-a1cb9d83${_scopeId}> 请使用支付宝扫一扫<br data-v-a1cb9d83${_scopeId}>扫描二维码支付 </div></div>`);
          } else {
            return [
              createVNode("div", { class: "qr-header" }, [
                createVNode("img", {
                  src: _imports_4,
                  class: "payment-icon"
                }),
                createVNode("div", { class: "payment-amount" }, "扫码支付 ¥" + toDisplayString(form.value.integral), 1)
              ]),
              createVNode("div", { class: "qr-code-container" }, [
                createVNode(_component_qriously, {
                  value: codeUrl.value,
                  size: 190
                }, null, 8, ["value"])
              ]),
              createVNode("div", { class: "qr-footer ali-footer" }, [
                createVNode("div", { class: "payment-tip" }, [
                  createTextVNode(" 请使用支付宝扫一扫"),
                  createVNode("br"),
                  createTextVNode("扫描二维码支付 ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: PaymentDialogVisibleLogin.value,
        "onUpdate:modelValue": ($event) => PaymentDialogVisibleLogin.value = $event,
        "show-close": false,
        onClose: closeDialog,
        width: "400px",
        center: "",
        class: "payment-method-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="payment-method-header" data-v-a1cb9d83${_scopeId}><h3 data-v-a1cb9d83${_scopeId}>选择支付方式</h3></div><div class="payment-methods" data-v-a1cb9d83${_scopeId}><div class="payment-method-item" data-v-a1cb9d83${_scopeId}><img${ssrRenderAttr("src", _imports_0)} class="method-icon" data-v-a1cb9d83${_scopeId}><span class="method-name" data-v-a1cb9d83${_scopeId}>支付宝</span><i class="el-icon-arrow-right method-arrow" data-v-a1cb9d83${_scopeId}></i></div><div class="payment-method-item" data-v-a1cb9d83${_scopeId}><img${ssrRenderAttr("src", _imports_1)} class="method-icon" data-v-a1cb9d83${_scopeId}><span class="method-name" data-v-a1cb9d83${_scopeId}>微信支付</span><i class="el-icon-arrow-right method-arrow" data-v-a1cb9d83${_scopeId}></i></div><div class="payment-method-item" data-v-a1cb9d83${_scopeId}><img${ssrRenderAttr("src", _imports_2)} class="method-icon" data-v-a1cb9d83${_scopeId}><span class="method-name" data-v-a1cb9d83${_scopeId}>积分支付</span><i class="el-icon-arrow-right method-arrow" data-v-a1cb9d83${_scopeId}></i></div></div>`);
          } else {
            return [
              createVNode("div", { class: "payment-method-header" }, [
                createVNode("h3", null, "选择支付方式")
              ]),
              createVNode("div", { class: "payment-methods" }, [
                createVNode("div", {
                  onClick: ($event) => selectPayTypeLogin("alipay"),
                  class: "payment-method-item"
                }, [
                  createVNode("img", {
                    src: _imports_0,
                    class: "method-icon"
                  }),
                  createVNode("span", { class: "method-name" }, "支付宝"),
                  createVNode("i", { class: "el-icon-arrow-right method-arrow" })
                ], 8, ["onClick"]),
                createVNode("div", {
                  onClick: ($event) => selectPayTypeLogin("wxpay"),
                  class: "payment-method-item"
                }, [
                  createVNode("img", {
                    src: _imports_1,
                    class: "method-icon"
                  }),
                  createVNode("span", { class: "method-name" }, "微信支付"),
                  createVNode("i", { class: "el-icon-arrow-right method-arrow" })
                ], 8, ["onClick"]),
                createVNode("div", {
                  onClick: ($event) => selectPayTypeLogin("integral"),
                  class: "payment-method-item"
                }, [
                  createVNode("img", {
                    src: _imports_2,
                    class: "method-icon"
                  }),
                  createVNode("span", { class: "method-name" }, "积分支付"),
                  createVNode("i", { class: "el-icon-arrow-right method-arrow" })
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="packages-container" data-v-a1cb9d83><div class="packages-grid" data-v-a1cb9d83><div class="${ssrRenderClass([{ active: form.value.integral === "20" }, "package-item"])}" data-v-a1cb9d83><div class="package-badge" data-v-a1cb9d83>基础版</div><div class="package-points" data-v-a1cb9d83>20</div><div class="package-unit" data-v-a1cb9d83>积分</div><div class="package-price" data-v-a1cb9d83>¥20</div><div class="package-desc" data-v-a1cb9d83>适合轻度使用</div></div><div class="${ssrRenderClass([{ active: form.value.integral === "78" }, "package-item popular"])}" data-v-a1cb9d83><div class="package-badge popular-badge" data-v-a1cb9d83>热门推荐</div><div class="package-points" data-v-a1cb9d83>78</div><div class="package-unit" data-v-a1cb9d83>积分</div><div class="package-price" data-v-a1cb9d83>¥78</div><div class="package-desc" data-v-a1cb9d83>性价比最佳</div><div class="package-savings" data-v-a1cb9d83>节省12元</div></div><div class="${ssrRenderClass([{ active: form.value.integral === "988" }, "package-item"])}" data-v-a1cb9d83><div class="package-badge" data-v-a1cb9d83>尊享版</div><div class="package-points" data-v-a1cb9d83>988</div><div class="package-unit" data-v-a1cb9d83>积分</div><div class="package-price" data-v-a1cb9d83>¥988</div><div class="package-desc" data-v-a1cb9d83>畅享所有功能</div><div class="package-savings" data-v-a1cb9d83>超值套餐</div></div></div></div><div class="purchase-section" data-v-a1cb9d83>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        size: "large",
        onClick: onSubmit,
        disabled: !form.value.integral,
        class: "purchase-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="el-icon-shopping-cart-2" data-v-a1cb9d83${_scopeId}></i> 立即充值${ssrInterpolate(form.value.integral ? ` ¥${form.value.integral}` : "")}`);
          } else {
            return [
              createVNode("i", { class: "el-icon-shopping-cart-2" }),
              createTextVNode(" 立即充值" + toDisplayString(form.value.integral ? ` ¥${form.value.integral}` : ""), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="purchase-tips" data-v-a1cb9d83><p data-v-a1cb9d83><i class="el-icon-info" data-v-a1cb9d83></i> 充值后积分立即到账</p><p data-v-a1cb9d83><i class="el-icon-circle-check" data-v-a1cb9d83></i> 支持支付宝、微信支付</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/vip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vip = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1cb9d83"]]);

export { vip as default };
//# sourceMappingURL=vip-JO8z9t7Z.mjs.map
