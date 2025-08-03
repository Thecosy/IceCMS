import { _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { u as useSettingStore } from './server.mjs';
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
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const acticve = ref("nav-link active");
    const setting = ref({});
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about" }, _attrs))}><div id="__nuxt" data-server-rendered="true"><div id="__layout"><div data-fetch-key="0" class="app macwk-animation">`);
      _push(ssrRenderComponent(_component_top, { message11: unref(acticve) }, null, _parent));
      _push(`<div class="layout-min-full-height"><section class="layout-index mt-5 pb-7"><div class="container"><div class="text-center pt-8 pb-5"><h1>联系 IceCMS.cn</h1><p class="fs-20 text-muted">软件版权及合作请发邮件，每周处理一次，谢谢合作。</p></div><div class="row mb-8"><div class="col-xl-6 offset-xl-3"><div class="form-group input-group rss-input-group radius-top-left-5x radius-bottom-left-5x"><input type="text" value="IceCMS.com.cn@gmail.com" disabled class="form-control radius-top-left-5x radius-bottom-left-5x"><div class="input-group-append"><button type="button" class="btn btn-theme px-5 radius-top-right-5x radius-bottom-right-5x">复制 </button></div></div></div></div><div class="w-r" style="${ssrRenderStyle({ "margin-left": "-15px", "margin-right": "-15px" })}"><div class="list-animation-leftIn w-c w-c-6 delay-0" style="${ssrRenderStyle({ "padding-left": "15px", "padding-right": "15px", "padding-bottom": "30px" })}"><a href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&amp;k=QMe6PjtKnzoMnXd3qWHGDsFyAjnHC_HY&amp;authKey=sgkvrRw1Z4UC0zDAGgiY9XGXr%2FCSAlq0i6VKmpFEaiRkX64Isr2L%2BHIFgt6mo3lm&amp;noverify=0&amp;group_code=623760607" target="_blank" class="macwk-app white border mb-0 macwk-box__animation delay-0"><span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span><div class="macwk-app__header--icon delay-0"><div class="macwk-app__header--icon--content"></div><img class="delay-0"><div class="flex-grow-1 text-right fs-14"></div></div><div class="macwk-app__body pt-6 pb-5"><h5 class="macwk-app__body--title" style="${ssrRenderStyle({ "display": "-webkit-box", "-webkit-box-orient": "vertical", "overflow": "hidden", "word-break": "break-all", "text-overflow": "ellipsis", "-webkit-line-clamp": "1" })}"><span class="fw-600">MacWk官方交流①群</span></h5><p class="text-truncate mb-6"><span class="text-muted">未满员</span></p><div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div></div></a></div><div class="list-animation-leftIn w-c w-c-6 delay-1" style="${ssrRenderStyle({ "padding-left": "15px", "padding-right": "15px", "padding-bottom": "30px" })}"><a href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&amp;k=nLT0zJmFvWTBZi0ad6xfgipbfPykUsO_&amp;authKey=O7IhlOBJ%2BFSvy9MH2qU9SEg1OYai5Eg8rUkPP6fYJJhhogE3t6N4Lq424NWTJKvh&amp;noverify=0&amp;group_code=780792337" target="_blank" class="macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-1"><span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span><div class="macwk-app__header--icon delay-1"><div class="macwk-app__header--icon--content"></div><img class="delay-1" alt="QQ群"><div class="flex-grow-1 text-right fs-14"></div></div><div class="macwk-app__body pt-6 pb-5"><h5 class="macwk-app__body--title" style="${ssrRenderStyle({ "display": "-webkit-box", "-webkit-box-orient": "vertical", "overflow": "hidden", "word-break": "break-all", "text-overflow": "ellipsis", "-webkit-line-clamp": "1" })}"><span class="fw-600">MacWk官方交流②群</span></h5><p class="text-truncate mb-6"><span class="text-muted">未满员</span></p><div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div></div></a></div><div class="list-animation-leftIn w-c w-c-6 delay-2" style="${ssrRenderStyle({ "padding-left": "15px", "padding-right": "15px", "padding-bottom": "30px" })}"><a href="https://qm.qq.com/q/fzdsRqvq2Q" target="_blank" class="macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-2"><span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span><div class="macwk-app__header--icon delay-2"><div class="macwk-app__header--icon--content"></div><img class="delay-2"><div class="flex-grow-1 text-right fs-14"></div></div><div class="macwk-app__body pt-6 pb-5"><h5 class="macwk-app__body--title" style="${ssrRenderStyle({ "display": "-webkit-box", "-webkit-box-orient": "vertical", "overflow": "hidden", "word-break": "break-all", "text-overflow": "ellipsis", "-webkit-line-clamp": "1" })}"><span class="fw-600">MacWk官方交流③群</span></h5><p class="text-truncate mb-6"><span class="text-muted">未满员</span></p><div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div></div></a></div><div class="list-animation-leftIn w-c w-c-6 delay-3" style="${ssrRenderStyle({ "padding-left": "15px", "padding-right": "15px", "padding-bottom": "30px" })}"><a href="https://qm.qq.com/q/tzJsg0nmeW" target="_blank" class="macwk-app white border cursor-pointer mb-0 macwk-box__animation delay-3"><span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span> <span class="snow-dot"></span><div class="macwk-app__header--icon delay-2"><div class="macwk-app__header--icon--content"></div><img class="delay-3"><div class="flex-grow-1 text-right fs-14"></div></div><div class="macwk-app__body pt-6 pb-5"><h5 class="macwk-app__body--title" style="${ssrRenderStyle({ "display": "-webkit-box", "-webkit-box-orient": "vertical", "overflow": "hidden", "word-break": "break-all", "text-overflow": "ellipsis", "-webkit-line-clamp": "1" })}"><span class="fw-600">MacWk官方交流④群</span></h5><p class="text-truncate mb-6"><span class="text-muted">未满员</span></p><div class="btn btn-outline-theme px-6 btn-round"> 加入群聊 </div></div></a></div></div></div></section></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-SmZAZ_H9.mjs.map
