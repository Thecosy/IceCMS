import { _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    const acticve = ref("nav-link active");
    const setting = ref({});
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about" }, _attrs))} data-v-775acdba><div id="__nuxt" data-server-rendered="true" data-v-775acdba><div id="__layout" data-v-775acdba><div data-fetch-key="0" class="app macwk-animation" data-v-775acdba>`);
      _push(ssrRenderComponent(_component_top, { message11: unref(acticve) }, null, _parent));
      _push(`<div class="layout-min-full-height" data-v-775acdba><div class="macwk-about-section" data-v-775acdba><img${ssrRenderAttr("src", _imports_0)} alt="" class="people" data-v-775acdba><img${ssrRenderAttr("src", _imports_1)} alt="" class="people" data-v-775acdba><img${ssrRenderAttr("src", _imports_2)} alt="" class="people" data-v-775acdba><img${ssrRenderAttr("src", _imports_3)} alt="" class="people" data-v-775acdba><img${ssrRenderAttr("src", _imports_4)} alt="" class="people" data-v-775acdba><img${ssrRenderAttr("src", _imports_5)} alt="" class="people" data-v-775acdba><div class="container" data-v-775acdba><h1 class="fw-600 text-center" data-v-775acdba>IceCMS - 为工作而生。</h1><p class="sub-title text-center fs-20" data-v-775acdba>只提供精品Mac应用，站长款款测试，免费、安全、无广告、不限速。</p><div class="inner-container" data-v-775acdba><div class="main-content" data-v-775acdba><div class="macwk-about-slider" data-v-775acdba><div class="item" data-v-775acdba><p data-v-775acdba>在 <span class="fw-600 text-primary fs-22" data-v-775acdba>IceCMS.cn</span>，</p><p data-v-775acdba>不但有众多业界所推崇的主流软件，</p><p data-v-775acdba>还有许多你不曾了解的小众精品软件。</p><p data-v-775acdba>它们是工具，</p><p data-v-775acdba>可以帮助你轻松学习、高效工作；</p><p data-v-775acdba>它们又不仅仅是工具，</p><p data-v-775acdba>或许还可以成为和你一路成长并肩作战的“好朋友、好兄弟”。</p><p data-v-775acdba>够精品，才高效！</p><p data-v-775acdba>IceCMS.cn，为你精选！</p></div></div></div></div></div></div><div id="sidetools" class="macwk-animation tinUpIn" style="${ssrRenderStyle({ "display": "none" })}" data-v-775acdba><div class="sidetools-item" data-v-775acdba><div class="sidetools-wrapper" data-v-775acdba><a class="cursor" data-v-775acdba><span class="sidetools-icon kfwx" data-v-775acdba></span></a></div></div><div class="sidetools-item" data-v-775acdba><div class="sidetools-wrapper" data-v-775acdba><a class="cursor" data-v-775acdba><span class="sidetools-icon kfqq" data-v-775acdba></span></a></div></div><div class="sidetools-item" data-v-775acdba><div class="sidetools-wrapper" data-v-775acdba><a class="el-tooltip cursor" data-v-775acdba><span class="sidetools-icon back-top" data-v-775acdba></span></a></div></div><span data-v-775acdba><div id="el-popover-1306" role="tooltip" aria-hidden="true" class="el-popover el-popper" style="${ssrRenderStyle({ "width": "200px", "display": "none" })}" data-v-775acdba><div class="text-center" data-v-775acdba><a href="feedback.html" class="mt-15 mb-0" data-v-775acdba>在线留言</a></div></div><span class="el-popover__reference-wrapper" data-v-775acdba></span></span><span data-v-775acdba><div id="el-popover-762" role="tooltip" aria-hidden="true" class="el-popover el-popper" style="${ssrRenderStyle({ "width": "200px", "display": "none" })}" data-v-775acdba><div class="text-center" data-v-775acdba><a href="feedback.html" class="mt-15 mb-0" data-v-775acdba>在线留言</a></div></div><span class="el-popover__reference-wrapper" data-v-775acdba></span></span></div></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-775acdba"]]);

export { About as default };
//# sourceMappingURL=About-CGRkNdfk.mjs.map
