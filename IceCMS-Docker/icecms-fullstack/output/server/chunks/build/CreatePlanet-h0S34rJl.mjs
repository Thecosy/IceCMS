import { _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "CreatePlanet",
  __ssrInlineRender: true,
  setup(__props) {
    const acticve = ref("nav-link active");
    const setting = ref({});
    const planetForm = ref({
      name: "",
      description: "",
      category: "tech",
      // tech, life, entertainment, study, sports, other
      avatar: "",
      banner: "",
      rules: "",
      isPublic: true,
      allowInvite: true,
      requireApproval: true
    });
    const formErrors = ref({
      name: "",
      description: "",
      rules: ""
    });
    const isSubmitting = ref(false);
    const submitSuccess = ref(false);
    const submitMessage = ref("");
    const avatarUploading = ref(false);
    const bannerUploading = ref(false);
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    const categoryOptions = [
      { value: "tech", label: "科技数码" },
      { value: "life", label: "生活日常" },
      { value: "entertainment", label: "娱乐休闲" },
      { value: "study", label: "学习成长" },
      { value: "sports", label: "运动健身" },
      { value: "travel", label: "旅行摄影" },
      { value: "food", label: "美食烹饪" },
      { value: "game", label: "游戏竞技" },
      { value: "art", label: "艺术设计" },
      { value: "business", label: "商业财经" },
      { value: "other", label: "其他" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "create-planet" }, _attrs))} data-v-1a0e9567><div id="__nuxt" data-server-rendered="true" data-v-1a0e9567><div id="__layout" data-v-1a0e9567><div data-fetch-key="0" class="app macwk-animation" data-v-1a0e9567>`);
      _push(ssrRenderComponent(_component_top, { message11: acticve.value }, null, _parent));
      _push(`<div class="layout-min-full-height" data-v-1a0e9567><div class="macwk-create-planet-section" data-v-1a0e9567><img${ssrRenderAttr("src", _imports_0)} alt="" class="people people-1" data-v-1a0e9567><img${ssrRenderAttr("src", _imports_1)} alt="" class="people people-2" data-v-1a0e9567><img${ssrRenderAttr("src", _imports_2)} alt="" class="people people-3" data-v-1a0e9567><img${ssrRenderAttr("src", _imports_3)} alt="" class="people people-4" data-v-1a0e9567><img${ssrRenderAttr("src", _imports_4)} alt="" class="people people-5" data-v-1a0e9567><img${ssrRenderAttr("src", _imports_5)} alt="" class="people people-6" data-v-1a0e9567><div class="container" data-v-1a0e9567><h1 class="fw-600 text-center" data-v-1a0e9567>创建圈子</h1><p class="sub-title text-center fs-20" data-v-1a0e9567>创建属于您的专属圈子，聚集志同道合的朋友。</p><div class="inner-container" data-v-1a0e9567><div class="main-content" data-v-1a0e9567>`);
      if (submitSuccess.value) {
        _push(`<div class="success-message" data-v-1a0e9567><div class="success-content" data-v-1a0e9567><i class="success-icon" data-v-1a0e9567>✓</i><p data-v-1a0e9567>${ssrInterpolate(submitMessage.value)}</p><button class="close-btn" data-v-1a0e9567>关闭</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="create-planet-form-container" data-v-1a0e9567><div class="form-header" data-v-1a0e9567><h3 data-v-1a0e9567>填写圈子信息</h3><p class="form-description" data-v-1a0e9567>请详细填写圈子信息，我们会在1-3个工作日内完成审核。</p></div><form class="create-planet-form" data-v-1a0e9567><div class="form-row" data-v-1a0e9567><div class="form-group" data-v-1a0e9567><label for="name" data-v-1a0e9567>圈子名称 <span class="required" data-v-1a0e9567>*</span></label><input type="text" id="name"${ssrRenderAttr("value", planetForm.value.name)} placeholder="请输入圈子名称（2-20个字符）" class="${ssrRenderClass({ "error": formErrors.value.name })}" maxlength="20" data-v-1a0e9567>`);
      if (formErrors.value.name) {
        _push(`<span class="error-message" data-v-1a0e9567>${ssrInterpolate(formErrors.value.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-1a0e9567><label for="category" data-v-1a0e9567>圈子分类 <span class="required" data-v-1a0e9567>*</span></label><select id="category" data-v-1a0e9567><!--[-->`);
      ssrRenderList(categoryOptions, (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)} data-v-1a0e9567${ssrIncludeBooleanAttr(Array.isArray(planetForm.value.category) ? ssrLooseContain(planetForm.value.category, option.value) : ssrLooseEqual(planetForm.value.category, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="form-group" data-v-1a0e9567><label for="description" data-v-1a0e9567>圈子描述 <span class="required" data-v-1a0e9567>*</span></label><textarea id="description" placeholder="请详细描述您的圈子，包括主题、目标用户、活动内容等..." rows="4" class="${ssrRenderClass({ "error": formErrors.value.description })}" maxlength="200" data-v-1a0e9567>${ssrInterpolate(planetForm.value.description)}</textarea>`);
      if (formErrors.value.description) {
        _push(`<span class="error-message" data-v-1a0e9567>${ssrInterpolate(formErrors.value.description)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="char-count" data-v-1a0e9567>${ssrInterpolate(planetForm.value.description.length)}/200</div></div><div class="form-row" data-v-1a0e9567><div class="form-group" data-v-1a0e9567><label for="avatar" data-v-1a0e9567>圈子头像</label><div class="upload-area" data-v-1a0e9567>`);
      if (planetForm.value.avatar) {
        _push(`<div class="avatar-preview" data-v-1a0e9567><img${ssrRenderAttr("src", planetForm.value.avatar)} alt="圈子头像" data-v-1a0e9567><button type="button" class="remove-btn" data-v-1a0e9567>×</button></div>`);
      } else {
        _push(`<div class="upload-placeholder" data-v-1a0e9567><input type="file" id="avatar" accept="image/*" style="${ssrRenderStyle({ "display": "none" })}" data-v-1a0e9567><label for="avatar" class="${ssrRenderClass([{ "uploading": avatarUploading.value }, "upload-btn"])}" data-v-1a0e9567>`);
        if (!avatarUploading.value) {
          _push(`<i class="el-icon-plus" data-v-1a0e9567></i>`);
        } else {
          _push(`<i class="el-icon-loading" data-v-1a0e9567></i>`);
        }
        _push(`<span data-v-1a0e9567>${ssrInterpolate(avatarUploading.value ? "上传中..." : "上传头像")}</span></label></div>`);
      }
      _push(`</div></div><div class="form-group" data-v-1a0e9567><label for="banner" data-v-1a0e9567>圈子横幅</label><div class="upload-area banner-upload" data-v-1a0e9567>`);
      if (planetForm.value.banner) {
        _push(`<div class="banner-preview" data-v-1a0e9567><img${ssrRenderAttr("src", planetForm.value.banner)} alt="圈子横幅" data-v-1a0e9567><button type="button" class="remove-btn" data-v-1a0e9567>×</button></div>`);
      } else {
        _push(`<div class="upload-placeholder banner-placeholder" data-v-1a0e9567><input type="file" id="banner" accept="image/*" style="${ssrRenderStyle({ "display": "none" })}" data-v-1a0e9567><label for="banner" class="${ssrRenderClass([{ "uploading": bannerUploading.value }, "upload-btn"])}" data-v-1a0e9567>`);
        if (!bannerUploading.value) {
          _push(`<i class="el-icon-plus" data-v-1a0e9567></i>`);
        } else {
          _push(`<i class="el-icon-loading" data-v-1a0e9567></i>`);
        }
        _push(`<span data-v-1a0e9567>${ssrInterpolate(bannerUploading.value ? "上传中..." : "上传横幅")}</span></label></div>`);
      }
      _push(`</div></div></div><div class="form-group" data-v-1a0e9567><label for="rules" data-v-1a0e9567>圈子规则 <span class="required" data-v-1a0e9567>*</span></label><textarea id="rules" placeholder="请制定圈子规则，如：1. 保持友善讨论 2. 禁止广告刷屏 3. 尊重他人观点..." rows="6" class="${ssrRenderClass({ "error": formErrors.value.rules })}" maxlength="500" data-v-1a0e9567>${ssrInterpolate(planetForm.value.rules)}</textarea>`);
      if (formErrors.value.rules) {
        _push(`<span class="error-message" data-v-1a0e9567>${ssrInterpolate(formErrors.value.rules)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="char-count" data-v-1a0e9567>${ssrInterpolate(planetForm.value.rules.length)}/500</div></div><div class="form-group" data-v-1a0e9567><label data-v-1a0e9567>圈子设置</label><div class="checkbox-group" data-v-1a0e9567><label class="checkbox-item" data-v-1a0e9567><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(planetForm.value.isPublic) ? ssrLooseContain(planetForm.value.isPublic, null) : planetForm.value.isPublic) ? " checked" : ""} data-v-1a0e9567><span class="checkmark" data-v-1a0e9567></span> 公开圈子（其他用户可以搜索和查看） </label><label class="checkbox-item" data-v-1a0e9567><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(planetForm.value.allowInvite) ? ssrLooseContain(planetForm.value.allowInvite, null) : planetForm.value.allowInvite) ? " checked" : ""} data-v-1a0e9567><span class="checkmark" data-v-1a0e9567></span> 允许成员邀请好友加入 </label><label class="checkbox-item" data-v-1a0e9567><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(planetForm.value.requireApproval) ? ssrLooseContain(planetForm.value.requireApproval, null) : planetForm.value.requireApproval) ? " checked" : ""} data-v-1a0e9567><span class="checkmark" data-v-1a0e9567></span> 新成员需要审核批准 </label></div></div><div class="form-actions" data-v-1a0e9567><button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-1a0e9567> 重置 </button><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-1a0e9567>`);
      if (isSubmitting.value) {
        _push(`<span data-v-1a0e9567>提交中...</span>`);
      } else {
        _push(`<span data-v-1a0e9567>提交申请</span>`);
      }
      _push(`</button></div></form></div><div class="create-notice" data-v-1a0e9567><h4 data-v-1a0e9567>创建须知</h4><div class="notice-content" data-v-1a0e9567><div class="notice-item" data-v-1a0e9567><i class="icon-info" data-v-1a0e9567></i><div data-v-1a0e9567><strong data-v-1a0e9567>审核流程</strong><p data-v-1a0e9567>我们会在1-3个工作日内审核您的申请，审核通过后圈子将正式开放。</p></div></div><div class="notice-item" data-v-1a0e9567><i class="icon-rules" data-v-1a0e9567></i><div data-v-1a0e9567><strong data-v-1a0e9567>管理责任</strong><p data-v-1a0e9567>作为圈主，您需要维护圈子秩序，确保内容健康积极，遵守平台规范。</p></div></div><div class="notice-item" data-v-1a0e9567><i class="icon-community" data-v-1a0e9567></i><div data-v-1a0e9567><strong data-v-1a0e9567>社区建设</strong><p data-v-1a0e9567>建议定期发布优质内容，积极回复成员，营造良好的社区氛围。</p></div></div></div></div></div></div></div></div><div id="sidetools" class="macwk-animation tinUpIn" style="${ssrRenderStyle({ "display": "none" })}" data-v-1a0e9567><div class="sidetools-item" data-v-1a0e9567><div class="sidetools-wrapper" data-v-1a0e9567><a class="cursor" data-v-1a0e9567><span class="sidetools-icon kfwx" data-v-1a0e9567></span></a></div></div><div class="sidetools-item" data-v-1a0e9567><div class="sidetools-wrapper" data-v-1a0e9567><a class="cursor" data-v-1a0e9567><span class="sidetools-icon kfqq" data-v-1a0e9567></span></a></div></div><div class="sidetools-item" data-v-1a0e9567><div class="sidetools-wrapper" data-v-1a0e9567><a class="el-tooltip cursor" data-v-1a0e9567><span class="sidetools-icon back-top" data-v-1a0e9567></span></a></div></div></div></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/CreatePlanet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreatePlanet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a0e9567"]]);

export { CreatePlanet as default };
//# sourceMappingURL=CreatePlanet-h0S34rJl.mjs.map
