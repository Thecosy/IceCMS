import { E as ElForm } from './el-form-DWMILsFE.mjs';
import { E as ElInput } from './el-input-2q_vffSS.mjs';
import { E as ElButton } from './el-button-LIU117i9.mjs';
import { E as ElDialog } from './el-overlay-D0BXiGeq.mjs';
import { ref, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, createCommentVNode, toDisplayString, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { a as aliPayApi, w as wxPayApi } from './aliPay-DnvXTR5T.mjs';
import { _ as _export_sfc, b as useNuxtApp } from './server.mjs';
import { e as destr, r as klona, v as parse, x as getRequestHeader, y as isEqual, z as setCookie, A as getCookie, B as deleteCookie } from '../nitro/nitro.mjs';
import { u as useRequestEvent } from './index-uy8e5Xzu.mjs';
import { E as ElNotification } from './index-0K9UalJV.mjs';
import '@vue/shared';
import 'lodash-unified';
import './event-BZTOGHfp.mjs';
import './index-C6mv4HvU.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'perfect-debounce';

const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = {
  __name: "charge",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedAmount = ref(0);
    ref(true);
    const payBtnDisabled = ref(false);
    const orderNo = ref("");
    const codeUrl = ref("url");
    const PaymentDialogVisibleLogin = ref(false);
    const wxDialogVisible = ref(false);
    const aliDialogVisible = ref(false);
    const timer = ref(null);
    const payOrder = ref({
      productId: "",
      payType: "wxpay"
    });
    const form = ref({
      integral: ""
    });
    const calculatePrice = (integral) => {
      if (!integral || integral <= 0) return "0.00";
      return (integral * 0.1).toFixed(2);
    };
    const canCharge = computed(() => {
      return form.value.integral && form.value.integral > 0;
    });
    const closeDialog = () => {
      console.log("关闭对话框");
      payBtnDisabled.value = false;
      if (timer.value) {
        console.log("清除定时器");
        clearInterval(timer.value);
      }
    };
    const selectPayTypeLogin = (type) => {
      console.log("支付方式：" + type);
      payOrder.value.payType = type;
      PaymentDialogVisibleLogin.value = false;
      const user = useCookie("access-user");
      if (type === "alipay") {
        aliDialogVisible.value = true;
        aliPayApi.ftofPayVipIntegralLogin(form.value.integral, user.value?.data?.userid).then((response) => {
          console.log(response.data.data.codeUrl);
          codeUrl.value = response.data.data.codeUrl;
          orderNo.value = response.data.data.orderNo;
          timer.value = setInterval();
        });
      } else if (type === "wxpay") {
        wxDialogVisible.value = true;
        wxPayApi.nativePayVipIntegralLogin(form.value.integral, user.value?.data?.userid).then((response) => {
          console.log(response.data.data.codeUrl);
          codeUrl.value = response.data.data.codeUrl;
          orderNo.value = response.data.data.orderNo;
          timer.value = setInterval();
        });
      }
    };
    const onSubmit = () => {
      const user = useCookie("access-user");
      if (!user.value || !user.value.data) {
        ElNotification({
          title: "失败",
          message: "暂未登录，请登录后重试",
          type: "warning",
          offset: 50
        });
        return;
      }
      if (!form.value.integral || form.value.integral <= 0) {
        ElNotification({
          title: "提示",
          message: "请输入有效的积分数量",
          type: "warning",
          offset: 50
        });
        return;
      }
      payBtnDisabled.value = true;
      PaymentDialogVisibleLogin.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_dialog = ElDialog;
      const _component_qriously = resolveComponent("qriously");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "charge-container home" }, _attrs))} data-v-b9f3a935><div class="page-header" data-v-b9f3a935><div class="header-icon" data-v-b9f3a935><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935><path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor" data-v-b9f3a935></path><path d="M19 15L20.09 18.26L24 19L20.09 19.74L19 23L17.91 19.74L14 19L17.91 18.26L19 15Z" fill="currentColor" data-v-b9f3a935></path><path d="M5 15L6.09 18.26L10 19L6.09 19.74L5 23L3.91 19.74L0 19L3.91 18.26L5 15Z" fill="currentColor" data-v-b9f3a935></path></svg></div><h2 data-v-b9f3a935>积分充值</h2><p class="subtitle" data-v-b9f3a935>充值积分，解锁更多优质内容</p></div><div class="quick-charge-section" data-v-b9f3a935><h3 data-v-b9f3a935>快速充值</h3><div class="charge-options" data-v-b9f3a935><div class="${ssrRenderClass([{ active: unref(selectedAmount) === 100 }, "charge-option"])}" data-v-b9f3a935><div class="amount" data-v-b9f3a935>100</div><div class="unit" data-v-b9f3a935>积分</div><div class="price" data-v-b9f3a935>¥10</div><div class="badge popular" data-v-b9f3a935>热门</div></div><div class="${ssrRenderClass([{ active: unref(selectedAmount) === 500 }, "charge-option"])}" data-v-b9f3a935><div class="amount" data-v-b9f3a935>500</div><div class="unit" data-v-b9f3a935>积分</div><div class="price" data-v-b9f3a935>¥45</div><div class="badge discount" data-v-b9f3a935>9折</div></div><div class="${ssrRenderClass([{ active: unref(selectedAmount) === 1e3 }, "charge-option"])}" data-v-b9f3a935><div class="amount" data-v-b9f3a935>1000</div><div class="unit" data-v-b9f3a935>积分</div><div class="price" data-v-b9f3a935>¥80</div><div class="badge discount" data-v-b9f3a935>8折</div></div><div class="${ssrRenderClass([{ active: unref(selectedAmount) === 2e3 }, "charge-option"])}" data-v-b9f3a935><div class="amount" data-v-b9f3a935>2000</div><div class="unit" data-v-b9f3a935>积分</div><div class="price" data-v-b9f3a935>¥140</div><div class="badge vip" data-v-b9f3a935>VIP</div></div></div></div><div class="custom-charge-section" data-v-b9f3a935><h3 data-v-b9f3a935>自定义充值</h3><div class="custom-input-container" data-v-b9f3a935>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "form",
        ref: form,
        model: unref(form),
        "label-width": "0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="input-wrapper" data-v-b9f3a935${_scopeId}><div class="input-label" data-v-b9f3a935${_scopeId}>充值积分数量</div><div class="input-group" data-v-b9f3a935${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(form).integral,
              "onUpdate:modelValue": ($event) => unref(form).integral = $event,
              placeholder: "请输入积分数量",
              type: "number",
              size: "large",
              class: "integral-input",
              min: 1,
              max: 1e4
            }, {
              prefix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId2}><path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor" data-v-b9f3a935${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
                        fill: "currentColor"
                      })
                    ]))
                  ];
                }
              }),
              suffix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="input-suffix" data-v-b9f3a935${_scopeId2}>积分</span>`);
                } else {
                  return [
                    createVNode("span", { class: "input-suffix" }, "积分")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(form).integral && unref(form).integral > 0) {
              _push2(`<div class="charge-info" data-v-b9f3a935${_scopeId}><div class="info-item" data-v-b9f3a935${_scopeId}><span class="label" data-v-b9f3a935${_scopeId}>充值积分：</span><span class="value" data-v-b9f3a935${_scopeId}>${ssrInterpolate(unref(form).integral)} 积分</span></div><div class="info-item" data-v-b9f3a935${_scopeId}><span class="label" data-v-b9f3a935${_scopeId}>需要支付：</span><span class="value price-highlight" data-v-b9f3a935${_scopeId}>¥${ssrInterpolate(calculatePrice(unref(form).integral))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "input-wrapper" }, [
                createVNode("div", { class: "input-label" }, "充值积分数量"),
                createVNode("div", { class: "input-group" }, [
                  createVNode(_component_el_input, {
                    modelValue: unref(form).integral,
                    "onUpdate:modelValue": ($event) => unref(form).integral = $event,
                    placeholder: "请输入积分数量",
                    type: "number",
                    size: "large",
                    class: "integral-input",
                    min: 1,
                    max: 1e4
                  }, {
                    prefix: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          d: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
                          fill: "currentColor"
                        })
                      ]))
                    ]),
                    suffix: withCtx(() => [
                      createVNode("span", { class: "input-suffix" }, "积分")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                unref(form).integral && unref(form).integral > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "charge-info"
                }, [
                  createVNode("div", { class: "info-item" }, [
                    createVNode("span", { class: "label" }, "充值积分："),
                    createVNode("span", { class: "value" }, toDisplayString(unref(form).integral) + " 积分", 1)
                  ]),
                  createVNode("div", { class: "info-item" }, [
                    createVNode("span", { class: "label" }, "需要支付："),
                    createVNode("span", { class: "value price-highlight" }, "¥" + toDisplayString(calculatePrice(unref(form).integral)), 1)
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="charge-actions" data-v-b9f3a935>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: onSubmit,
        disabled: !unref(canCharge),
        size: "large",
        class: "charge-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId}><path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor" data-v-b9f3a935${_scopeId}></path></svg> 立即充值 `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("path", {
                  d: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
                  fill: "currentColor"
                })
              ])),
              createTextVNode(" 立即充值 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="charge-notice" data-v-b9f3a935><h4 data-v-b9f3a935>充值说明</h4><ul data-v-b9f3a935><li data-v-b9f3a935>充值的积分可用于购买付费内容、下载资源等</li><li data-v-b9f3a935>积分一经充值不可退换，请谨慎操作</li><li data-v-b9f3a935>支持微信支付、支付宝等多种支付方式</li><li data-v-b9f3a935>充值过程中如遇问题，请联系客服</li></ul></div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: unref(PaymentDialogVisibleLogin),
        "onUpdate:modelValue": ($event) => isRef(PaymentDialogVisibleLogin) ? PaymentDialogVisibleLogin.value = $event : null,
        title: "选择支付方式",
        width: "400px",
        "before-close": closeDialog,
        class: "payment-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="payment-methods" data-v-b9f3a935${_scopeId}><div class="payment-method" data-v-b9f3a935${_scopeId}><div class="method-icon alipay" data-v-b9f3a935${_scopeId}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId}><path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z" fill="#1677FF" data-v-b9f3a935${_scopeId}></path><path d="M12 6V18M6 12H18" stroke="white" stroke-width="2" stroke-linecap="round" data-v-b9f3a935${_scopeId}></path></svg></div><div class="method-info" data-v-b9f3a935${_scopeId}><div class="method-name" data-v-b9f3a935${_scopeId}>支付宝</div><div class="method-desc" data-v-b9f3a935${_scopeId}>推荐使用</div></div><div class="method-arrow" data-v-b9f3a935${_scopeId}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId}><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9f3a935${_scopeId}></path></svg></div></div><div class="payment-method" data-v-b9f3a935${_scopeId}><div class="method-icon wechat" data-v-b9f3a935${_scopeId}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId}><path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z" fill="#09bb21" data-v-b9f3a935${_scopeId}></path><path d="M8 14L12 10L16 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9f3a935${_scopeId}></path></svg></div><div class="method-info" data-v-b9f3a935${_scopeId}><div class="method-name" data-v-b9f3a935${_scopeId}>微信支付</div><div class="method-desc" data-v-b9f3a935${_scopeId}>安全便捷</div></div><div class="method-arrow" data-v-b9f3a935${_scopeId}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId}><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9f3a935${_scopeId}></path></svg></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "payment-methods" }, [
                createVNode("div", {
                  class: "payment-method",
                  onClick: ($event) => selectPayTypeLogin("alipay")
                }, [
                  createVNode("div", { class: "method-icon alipay" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z",
                        fill: "#1677FF"
                      }),
                      createVNode("path", {
                        d: "M12 6V18M6 12H18",
                        stroke: "white",
                        "stroke-width": "2",
                        "stroke-linecap": "round"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "method-info" }, [
                    createVNode("div", { class: "method-name" }, "支付宝"),
                    createVNode("div", { class: "method-desc" }, "推荐使用")
                  ]),
                  createVNode("div", { class: "method-arrow" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M9 18L15 12L9 6",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      })
                    ]))
                  ])
                ], 8, ["onClick"]),
                createVNode("div", {
                  class: "payment-method",
                  onClick: ($event) => selectPayTypeLogin("wxpay")
                }, [
                  createVNode("div", { class: "method-icon wechat" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z",
                        fill: "#09bb21"
                      }),
                      createVNode("path", {
                        d: "M8 14L12 10L16 14",
                        stroke: "white",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "method-info" }, [
                    createVNode("div", { class: "method-name" }, "微信支付"),
                    createVNode("div", { class: "method-desc" }, "安全便捷")
                  ]),
                  createVNode("div", { class: "method-arrow" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M9 18L15 12L9 6",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      })
                    ]))
                  ])
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: unref(wxDialogVisible),
        "onUpdate:modelValue": ($event) => isRef(wxDialogVisible) ? wxDialogVisible.value = $event : null,
        title: "微信支付",
        width: "360px",
        "before-close": closeDialog,
        class: "qr-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="qr-content" data-v-b9f3a935${_scopeId}><div class="qr-header" data-v-b9f3a935${_scopeId}><div class="payment-logo wechat-logo" data-v-b9f3a935${_scopeId}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId}><path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z" fill="#09bb21" data-v-b9f3a935${_scopeId}></path></svg></div><div class="payment-info" data-v-b9f3a935${_scopeId}><div class="amount" data-v-b9f3a935${_scopeId}>¥${ssrInterpolate(calculatePrice(unref(form).integral))}</div><div class="desc" data-v-b9f3a935${_scopeId}>${ssrInterpolate(unref(form).integral)} 积分</div></div></div><div class="qr-code" data-v-b9f3a935${_scopeId}>`);
            _push2(ssrRenderComponent(_component_qriously, {
              value: unref(codeUrl),
              size: 200
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="qr-footer" data-v-b9f3a935${_scopeId}><p data-v-b9f3a935${_scopeId}>请使用微信扫一扫</p><p data-v-b9f3a935${_scopeId}>扫描二维码完成支付</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "qr-content" }, [
                createVNode("div", { class: "qr-header" }, [
                  createVNode("div", { class: "payment-logo wechat-logo" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z",
                        fill: "#09bb21"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "payment-info" }, [
                    createVNode("div", { class: "amount" }, "¥" + toDisplayString(calculatePrice(unref(form).integral)), 1),
                    createVNode("div", { class: "desc" }, toDisplayString(unref(form).integral) + " 积分", 1)
                  ])
                ]),
                createVNode("div", { class: "qr-code" }, [
                  createVNode(_component_qriously, {
                    value: unref(codeUrl),
                    size: 200
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "qr-footer" }, [
                  createVNode("p", null, "请使用微信扫一扫"),
                  createVNode("p", null, "扫描二维码完成支付")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: unref(aliDialogVisible),
        "onUpdate:modelValue": ($event) => isRef(aliDialogVisible) ? aliDialogVisible.value = $event : null,
        title: "支付宝支付",
        width: "360px",
        "before-close": closeDialog,
        class: "qr-dialog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="qr-content" data-v-b9f3a935${_scopeId}><div class="qr-header" data-v-b9f3a935${_scopeId}><div class="payment-logo alipay-logo" data-v-b9f3a935${_scopeId}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-b9f3a935${_scopeId}><path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z" fill="#1677FF" data-v-b9f3a935${_scopeId}></path></svg></div><div class="payment-info" data-v-b9f3a935${_scopeId}><div class="amount" data-v-b9f3a935${_scopeId}>¥${ssrInterpolate(calculatePrice(unref(form).integral))}</div><div class="desc" data-v-b9f3a935${_scopeId}>${ssrInterpolate(unref(form).integral)} 积分</div></div></div><div class="qr-code" data-v-b9f3a935${_scopeId}>`);
            _push2(ssrRenderComponent(_component_qriously, {
              value: unref(codeUrl),
              size: 200
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="qr-footer" data-v-b9f3a935${_scopeId}><p data-v-b9f3a935${_scopeId}>请使用支付宝扫一扫</p><p data-v-b9f3a935${_scopeId}>扫描二维码完成支付</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "qr-content" }, [
                createVNode("div", { class: "qr-header" }, [
                  createVNode("div", { class: "payment-logo alipay-logo" }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z",
                        fill: "#1677FF"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "payment-info" }, [
                    createVNode("div", { class: "amount" }, "¥" + toDisplayString(calculatePrice(unref(form).integral)), 1),
                    createVNode("div", { class: "desc" }, toDisplayString(unref(form).integral) + " 积分", 1)
                  ])
                ]),
                createVNode("div", { class: "qr-code" }, [
                  createVNode(_component_qriously, {
                    value: unref(codeUrl),
                    size: 200
                  }, null, 8, ["value"])
                ]),
                createVNode("div", { class: "qr-footer" }, [
                  createVNode("p", null, "请使用支付宝扫一扫"),
                  createVNode("p", null, "扫描二维码完成支付")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/charge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const charge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9f3a935"]]);

export { charge as default };
//# sourceMappingURL=charge-DFiOQjLy.mjs.map
