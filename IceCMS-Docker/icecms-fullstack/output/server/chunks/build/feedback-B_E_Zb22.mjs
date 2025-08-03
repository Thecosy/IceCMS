import { _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1, b as _imports_2, c as _imports_3, d as _imports_4, e as _imports_5 } from './movist-DkjKOLeJ.mjs';
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
  __name: "feedback",
  __ssrInlineRender: true,
  setup(__props) {
    const acticve = ref("nav-link active");
    const setting = ref({});
    const feedbackForm = ref({
      name: "",
      email: "",
      phone: "",
      type: "suggestion",
      // suggestion, bug, complaint, other
      subject: "",
      content: "",
      attachments: []
    });
    const formErrors = ref({
      name: "",
      email: "",
      subject: "",
      content: ""
    });
    const isSubmitting = ref(false);
    const submitSuccess = ref(false);
    const submitMessage = ref("");
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "feedback" }, _attrs))} data-v-893042c0><div id="__nuxt" data-server-rendered="true" data-v-893042c0><div id="__layout" data-v-893042c0><div data-fetch-key="0" class="app macwk-animation" data-v-893042c0>`);
      _push(ssrRenderComponent(_component_top, { message11: acticve.value }, null, _parent));
      _push(`<div class="layout-min-full-height" data-v-893042c0><div class="macwk-feedback-section" data-v-893042c0><img${ssrRenderAttr("src", _imports_0)} alt="" class="people people-1" data-v-893042c0><img${ssrRenderAttr("src", _imports_1)} alt="" class="people people-2" data-v-893042c0><img${ssrRenderAttr("src", _imports_2)} alt="" class="people people-3" data-v-893042c0><img${ssrRenderAttr("src", _imports_3)} alt="" class="people people-4" data-v-893042c0><img${ssrRenderAttr("src", _imports_4)} alt="" class="people people-5" data-v-893042c0><img${ssrRenderAttr("src", _imports_5)} alt="" class="people people-6" data-v-893042c0><div class="container" data-v-893042c0><h1 class="fw-600 text-center" data-v-893042c0>意见反馈</h1><p class="sub-title text-center fs-20" data-v-893042c0>您的建议是我们改进的动力，期待听到您的声音。</p><div class="inner-container" data-v-893042c0><div class="main-content" data-v-893042c0>`);
      if (submitSuccess.value) {
        _push(`<div class="success-message" data-v-893042c0><div class="success-content" data-v-893042c0><i class="success-icon" data-v-893042c0>✓</i><p data-v-893042c0>${ssrInterpolate(submitMessage.value)}</p><button class="close-btn" data-v-893042c0>关闭</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="feedback-form-container" data-v-893042c0><div class="form-header" data-v-893042c0><h3 data-v-893042c0>请填写您的反馈信息</h3><p class="form-description" data-v-893042c0>我们重视每一条反馈，您的意见将帮助我们提供更好的服务。</p></div><form class="feedback-form" data-v-893042c0><div class="form-row" data-v-893042c0><div class="form-group" data-v-893042c0><label for="name" data-v-893042c0>姓名 <span class="required" data-v-893042c0>*</span></label><input type="text" id="name"${ssrRenderAttr("value", feedbackForm.value.name)} placeholder="请输入您的姓名" class="${ssrRenderClass({ "error": formErrors.value.name })}" data-v-893042c0>`);
      if (formErrors.value.name) {
        _push(`<span class="error-message" data-v-893042c0>${ssrInterpolate(formErrors.value.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-893042c0><label for="email" data-v-893042c0>邮箱 <span class="required" data-v-893042c0>*</span></label><input type="email" id="email"${ssrRenderAttr("value", feedbackForm.value.email)} placeholder="请输入您的邮箱地址" class="${ssrRenderClass({ "error": formErrors.value.email })}" data-v-893042c0>`);
      if (formErrors.value.email) {
        _push(`<span class="error-message" data-v-893042c0>${ssrInterpolate(formErrors.value.email)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-row" data-v-893042c0><div class="form-group" data-v-893042c0><label for="phone" data-v-893042c0>手机号码</label><input type="tel" id="phone"${ssrRenderAttr("value", feedbackForm.value.phone)} placeholder="请输入您的手机号码（可选）" data-v-893042c0></div><div class="form-group" data-v-893042c0><label for="type" data-v-893042c0>反馈类型</label><select id="type" data-v-893042c0><option value="suggestion" data-v-893042c0${ssrIncludeBooleanAttr(Array.isArray(feedbackForm.value.type) ? ssrLooseContain(feedbackForm.value.type, "suggestion") : ssrLooseEqual(feedbackForm.value.type, "suggestion")) ? " selected" : ""}>建议</option><option value="bug" data-v-893042c0${ssrIncludeBooleanAttr(Array.isArray(feedbackForm.value.type) ? ssrLooseContain(feedbackForm.value.type, "bug") : ssrLooseEqual(feedbackForm.value.type, "bug")) ? " selected" : ""}>BUG反馈</option><option value="complaint" data-v-893042c0${ssrIncludeBooleanAttr(Array.isArray(feedbackForm.value.type) ? ssrLooseContain(feedbackForm.value.type, "complaint") : ssrLooseEqual(feedbackForm.value.type, "complaint")) ? " selected" : ""}>投诉</option><option value="praise" data-v-893042c0${ssrIncludeBooleanAttr(Array.isArray(feedbackForm.value.type) ? ssrLooseContain(feedbackForm.value.type, "praise") : ssrLooseEqual(feedbackForm.value.type, "praise")) ? " selected" : ""}>表扬</option><option value="other" data-v-893042c0${ssrIncludeBooleanAttr(Array.isArray(feedbackForm.value.type) ? ssrLooseContain(feedbackForm.value.type, "other") : ssrLooseEqual(feedbackForm.value.type, "other")) ? " selected" : ""}>其他</option></select></div></div><div class="form-group" data-v-893042c0><label for="subject" data-v-893042c0>反馈主题 <span class="required" data-v-893042c0>*</span></label><input type="text" id="subject"${ssrRenderAttr("value", feedbackForm.value.subject)} placeholder="请简要描述您的反馈主题" class="${ssrRenderClass({ "error": formErrors.value.subject })}" data-v-893042c0>`);
      if (formErrors.value.subject) {
        _push(`<span class="error-message" data-v-893042c0>${ssrInterpolate(formErrors.value.subject)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-893042c0><label for="content" data-v-893042c0>详细内容 <span class="required" data-v-893042c0>*</span></label><textarea id="content" placeholder="请详细描述您的反馈内容，我们会认真阅读并处理..." rows="6" class="${ssrRenderClass({ "error": formErrors.value.content })}" data-v-893042c0>${ssrInterpolate(feedbackForm.value.content)}</textarea>`);
      if (formErrors.value.content) {
        _push(`<span class="error-message" data-v-893042c0>${ssrInterpolate(formErrors.value.content)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="char-count" data-v-893042c0>${ssrInterpolate(feedbackForm.value.content.length)}/1000</div></div><div class="form-actions" data-v-893042c0><button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-893042c0> 重置 </button><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-893042c0>`);
      if (isSubmitting.value) {
        _push(`<span data-v-893042c0>提交中...</span>`);
      } else {
        _push(`<span data-v-893042c0>提交反馈</span>`);
      }
      _push(`</button></div></form></div><div class="contact-info" data-v-893042c0><h4 data-v-893042c0>其他联系方式</h4><div class="contact-methods" data-v-893042c0><div class="contact-item" data-v-893042c0><i class="icon-mail" data-v-893042c0></i><div data-v-893042c0><strong data-v-893042c0>邮箱</strong><p data-v-893042c0>feedback@icecms.cn</p></div></div><div class="contact-item" data-v-893042c0><i class="icon-wechat" data-v-893042c0></i><div data-v-893042c0><strong data-v-893042c0>微信</strong><p data-v-893042c0>IceCMS_Official</p></div></div><div class="contact-item" data-v-893042c0><i class="icon-qq" data-v-893042c0></i><div data-v-893042c0><strong data-v-893042c0>QQ群</strong><p data-v-893042c0>123456789</p></div></div></div></div></div></div></div></div><div id="sidetools" class="macwk-animation tinUpIn" style="${ssrRenderStyle({ "display": "none" })}" data-v-893042c0><div class="sidetools-item" data-v-893042c0><div class="sidetools-wrapper" data-v-893042c0><a class="cursor" data-v-893042c0><span class="sidetools-icon kfwx" data-v-893042c0></span></a></div></div><div class="sidetools-item" data-v-893042c0><div class="sidetools-wrapper" data-v-893042c0><a class="cursor" data-v-893042c0><span class="sidetools-icon kfqq" data-v-893042c0></span></a></div></div><div class="sidetools-item" data-v-893042c0><div class="sidetools-wrapper" data-v-893042c0><a class="el-tooltip cursor" data-v-893042c0><span class="sidetools-icon back-top" data-v-893042c0></span></a></div></div></div></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/feedback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const feedback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-893042c0"]]);

export { feedback as default };
//# sourceMappingURL=feedback-B_E_Zb22.mjs.map
