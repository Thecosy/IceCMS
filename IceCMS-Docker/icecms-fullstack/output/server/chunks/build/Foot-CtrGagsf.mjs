import { m as _imports_0$1, a as __nuxt_component_2 } from './Top-z7S4M5x-.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, u as useSettingStore } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Foot",
  __ssrInlineRender: true,
  setup(__props) {
    const setting = ref({});
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "macwk-footer white border-top pc-model" }, _attrs))} data-v-e7e26f17><div class="container" data-v-e7e26f17><a href="/" class="logo" data-v-e7e26f17><div class="login-logo" data-v-e7e26f17>`);
      if (unref(setting).sitLogo) {
        _push(`<div data-v-e7e26f17><img${ssrRenderAttr("src", unref(setting).sitLogo)} data-v-e7e26f17></div>`);
      } else {
        _push(`<div data-v-e7e26f17><img${ssrRenderAttr("src", _imports_0$1)} data-v-e7e26f17></div>`);
      }
      _push(`</div><span class="ml-4" data-v-e7e26f17>${ssrInterpolate(unref(setting).sitTitle)}</span></a><div class="nav" data-v-e7e26f17>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`关于 `);
          } else {
            return [
              createTextVNode("关于 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`联系 `);
          } else {
            return [
              createTextVNode("联系 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`隐私 `);
          } else {
            return [
              createTextVNode("隐私 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        href: "/changelogs",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`更新日志 `);
          } else {
            return [
              createTextVNode("更新日志 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="copyright" data-v-e7e26f17><p class="mb-0" data-v-e7e26f17><span class="mr-3" data-v-e7e26f17>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "https://beian.miit.gov.cn/",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(setting).beian)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(setting).beian), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span data-v-e7e26f17>${ssrInterpolate(unref(setting).banquan)}</span></p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Foot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_12 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-e7e26f17"]]), { __name: "Foot" });

export { __nuxt_component_12 as _ };
//# sourceMappingURL=Foot-CtrGagsf.mjs.map
