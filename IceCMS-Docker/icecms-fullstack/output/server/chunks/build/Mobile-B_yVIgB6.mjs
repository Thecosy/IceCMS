import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  methods: {
    redirectToMobile() {
      (void 0).location.href = "https://www.example.com";
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-model" }, _attrs))} data-v-8541fa6c><div class="layout-min-full-height d-flex justify-content-center align-items-center" data-v-8541fa6c><div class="text-center content-box" data-v-8541fa6c><h1 class="title" data-v-8541fa6c>哇，窗口太小啦</h1><p class="message" data-v-8541fa6c>请调整浏览器窗口大小或者请使用手机查看！</p><button class="action-button" data-v-8541fa6c>了解更多</button></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Mobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8541fa6c"]]), { __name: "Mobile" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=Mobile-B_yVIgB6.mjs.map
