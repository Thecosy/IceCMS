import { _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "changelogs",
  __ssrInlineRender: true,
  setup(__props) {
    const acticve = ref("nav-link active");
    const setting = ref({});
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about" }, _attrs))} data-v-6914e75a><div id="__nuxt" data-server-rendered="true" data-v-6914e75a><div id="__layout" data-v-6914e75a><div data-fetch-key="0" class="app macwk-animation" data-v-6914e75a>`);
      _push(ssrRenderComponent(_component_top, { message11: unref(acticve) }, null, _parent));
      _push(`<div class="layout-min-full-height" style="${ssrRenderStyle({ "width": "900px", "margin": "0px auto" })}" data-v-6914e75a><div class="clearfix grid-list py-7" data-v-6914e75a><div class="text-center py-6 mb-4" data-v-6914e75a><h1 data-v-6914e75a>MacWk 优化记录</h1><p class="fs-20 text-muted" data-v-6914e75a>了解 MacWk 在改进用户体验的过程中做了哪些努力。</p></div><div class="changelog-list" data-v-6914e75a><div class="changelog-item d-flex" data-v-6914e75a><div class="w-120 text-right" data-v-6914e75a> 2024-06-01 </div><div class="mr-6 ml-6 position-relative" data-v-6914e75a><span class="changelog-item__bullet" data-v-6914e75a><i class="icon-clock" data-v-6914e75a></i></span><div class="changelog-item__line" data-v-6914e75a></div></div><div class="article-content pb-5 flex" data-v-6914e75a><h4 class="mt-0 mb-5 fs-22" data-v-6914e75a> 2.0.0 - 终于上线啦！ </h4><div class="blockquote" data-v-6914e75a></div><div data-v-6914e75a><h5 data-v-6914e75a><span class="badge px-4 py-2 btn-round badge-success" data-v-6914e75a>正式上线</span></h5><ul data-v-6914e75a><li data-v-6914e75a><p data-v-6914e75a>使用Nuxt.js和Vue.js技术栈重新开发</p></li><li data-v-6914e75a><p data-v-6914e75a>支持SEO，搜索逻辑重新优化了</p></li><li data-v-6914e75a><p data-v-6914e75a>增加了软件详情顶部导航栏</p></li><li data-v-6914e75a><p data-v-6914e75a>重写了<a href="genuine.html" rel="noopener noreferrer" target="_blank" class="" data-v-6914e75a>优惠正版</a>页面</p></li><li data-v-6914e75a><p data-v-6914e75a>虽然还有小问题，慢慢优化吧</p></li></ul></div></div></div><div class="changelog-item d-flex" data-v-6914e75a><div class="w-120 text-right" data-v-6914e75a> 2024-03-23 </div><div class="mr-6 ml-6 position-relative" data-v-6914e75a><span class="changelog-item__bullet" data-v-6914e75a><i class="icon-clock" data-v-6914e75a></i></span><div class="changelog-item__line" data-v-6914e75a></div></div><div class="article-content pb-5 flex" data-v-6914e75a><h4 class="mt-0 mb-5 fs-22" data-v-6914e75a> 2.0.0 - 计划使用全新前端技术架构重写 </h4><div class="blockquote" data-v-6914e75a></div><div data-v-6914e75a><h5 data-v-6914e75a><span class="badge px-4 py-2 btn-round badge-danger" data-v-6914e75a>重大决策</span></h5><ul data-v-6914e75a><li data-v-6914e75a><p data-v-6914e75a>本次重构希望借助Nuxt.js让本站具有SEO能力</p></li><li data-v-6914e75a><p data-v-6914e75a>正式上线时间预计7月份之前，感谢大家的持续关注</p></li></ul></div></div></div><div class="changelog-item d-flex" data-v-6914e75a><div class="w-120 text-right" data-v-6914e75a> 2024-01-01 </div><div class="mr-6 ml-6 position-relative" data-v-6914e75a><span class="changelog-item__bullet" data-v-6914e75a><i class="icon-clock" data-v-6914e75a></i></span><div class="changelog-item__line" data-v-6914e75a></div></div><div class="article-content pb-5 flex" data-v-6914e75a><h4 class="mt-0 mb-5 fs-22" data-v-6914e75a> 1.0.2 - 内测结束，正式上线 </h4><div class="blockquote" data-v-6914e75a></div><div data-v-6914e75a><h5 data-v-6914e75a><span class="badge px-4 py-2 btn-round badge-success" data-v-6914e75a>正式上线</span></h5><ul data-v-6914e75a><li data-v-6914e75a><p data-v-6914e75a>内测终于结束，终于迎来了上线，感谢大家的支持！</p></li></ul></div></div></div><div class="changelog-item d-flex" data-v-6914e75a><div class="w-120 text-right" data-v-6914e75a> 2023-11-19 </div><div class="mr-6 ml-6 position-relative" data-v-6914e75a><span class="changelog-item__bullet" data-v-6914e75a><i class="icon-clock" data-v-6914e75a></i></span><div class="changelog-item__line" data-v-6914e75a></div></div><div class="article-content pb-5 flex" data-v-6914e75a><h4 class="mt-0 mb-5 fs-22" data-v-6914e75a> 1.0.2 - 内部测试整站功能 </h4><div class="blockquote" data-v-6914e75a></div><div data-v-6914e75a><h5 data-v-6914e75a><span class="badge px-4 py-2 btn-round badge-primary" data-v-6914e75a>内部测试</span></h5><ul data-v-6914e75a><li data-v-6914e75a><p data-v-6914e75a>基本功能已经完善，下载上传测试无问题，UI无重大问题</p></li><li data-v-6914e75a><p data-v-6914e75a>后台管理系统测试完成，可以上传软件了</p></li></ul></div></div></div><div class="changelog-item d-flex" data-v-6914e75a><div class="w-120 text-right" data-v-6914e75a> 2023-11-15 </div><div class="mr-6 ml-6 position-relative" data-v-6914e75a><span class="changelog-item__bullet" data-v-6914e75a><i class="icon-clock" data-v-6914e75a></i></span><div class="changelog-item__line" data-v-6914e75a></div></div><div class="article-content pb-5 flex" data-v-6914e75a><h4 class="mt-0 mb-5 fs-22" data-v-6914e75a> 1.0.1 - 内部测试UI，UI无重大问题 </h4><div class="blockquote" data-v-6914e75a></div><div data-v-6914e75a><h5 data-v-6914e75a><span class="badge px-4 py-2 btn-round badge-primary" data-v-6914e75a>内部测试</span></h5><ul data-v-6914e75a><li data-v-6914e75a><p data-v-6914e75a>使用Vue2.js SPA技术栈开发</p></li><li data-v-6914e75a><p data-v-6914e75a>增加隐私政策页面，对于侵犯用户隐私的行为，macwk 说：不！<a href="privacy.html" target="_blank" class="text-primary" data-v-6914e75a>点我查看</a></p></li></ul></div></div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/changelogs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const changelogs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6914e75a"]]);

export { changelogs as default };
//# sourceMappingURL=changelogs-Bliy9VWL.mjs.map
