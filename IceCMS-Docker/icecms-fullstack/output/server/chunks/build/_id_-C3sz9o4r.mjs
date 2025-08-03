import { d as getArticleById, _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { _ as _export_sfc, u as useSettingStore, U as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, resolveComponent, mergeProps, unref, reactive, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useUserStore } from './useUserStore-gmH42dcJ.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { useRoute } from 'vue-router';
import { g as getArticleCommentnum } from './webarticleComment-A4dopcaE.mjs';
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
import './index-uy8e5Xzu.mjs';
import 'perfect-debounce';
import './webuser-CDNs4gr0.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Comment",
  __ssrInlineRender: true,
  props: {
    articleId: {},
    theEmoge: {}
  },
  emits: ["closethecpmmentName", "openthecpmmentName", "clearEmojiCache"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const contentarea = ref("");
    const userJudje = ref(false);
    const comment = ref({});
    ref(false);
    const isSubmitting = ref(false);
    ref(0);
    const lastEmojiValue = ref("");
    const lastEmojiTime = ref(0);
    const tempuserform = reactive({
      username: "",
      email: ""
    });
    reactive({
      content: "",
      useaname: "",
      articleId: props.articleId,
      profile: "",
      userId: ""
    });
    const userStore = useUserStore();
    watch(() => props.theEmoge, (val, oldVal) => {
      const currentTime = Date.now();
      if (!val || val.trim() === "") {
        console.log("Empty emoji value, ignoring");
        return;
      }
      if (val === oldVal) {
        console.log("Same emoji value as previous, ignoring");
        return;
      }
      if (val === lastEmojiValue.value) {
        console.log("Same emoji as last added, ignoring");
        return;
      }
      if (currentTime - lastEmojiTime.value < 100) {
        console.log("Too fast emoji clicking, ignoring");
        return;
      }
      console.log("Adding emoji:", val, "at time:", currentTime);
      contentarea.value += val;
      lastEmojiValue.value = val;
      lastEmojiTime.value = currentTime;
      emit("clearEmojiCache");
      setTimeout(() => {
        clearEmojiSelection();
      }, 200);
    }, { flush: "post" });
    function formatDate(time) {
      if (!time) return "";
      try {
        const date = new Date(time);
        if (isNaN(date.getTime())) return time;
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        if (currentYear - year === 1) {
          return `去年 ${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        } else if (currentYear - year === 2) {
          return `前年 ${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        } else if (currentYear - year > 2) {
          return "多年前";
        } else {
          return `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        }
      } catch (e) {
        console.error("日期格式化错误:", e);
        return time;
      }
    }
    function isCurrentUser(item) {
      const currentUser = userStore.currentUser;
      if (!currentUser) return false;
      if (currentUser.userid && item.userId) {
        return String(item.userId) === String(currentUser.userid);
      }
      if (currentUser.isTemp && item.username && item.email) {
        return item.username === currentUser.name && item.email === currentUser.email;
      }
      return false;
    }
    function clearEmojiSelection() {
      lastEmojiValue.value = "";
      lastEmojiTime.value = 0;
      console.log("Emoji selection cache cleared");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-container overflow-hidden van-popup van-popup--round van-popup--bottom" }, _attrs))} data-v-c9d90b9c><div style="${ssrRenderStyle([
        userJudje.value ? null : { display: "none" },
        { "width": "360px", "z-index": "2011" }
      ])}" role="dialog" aria-labelledby="输入昵称和邮箱" class="van-dialog shadow-4 position-absolute" data-v-c9d90b9c><div class="van-dialog__header" data-v-c9d90b9c>输入昵称和邮箱</div><div class="van-dialog__content" data-v-c9d90b9c><div class="px-6 py-5" data-v-c9d90b9c><p data-v-c9d90b9c><span class="text-success" data-v-c9d90b9c>推荐使用 QQ 邮箱</span>，有紧急的问题可以快速联系到您。 </p><div class="form-group comment-form-group" data-v-c9d90b9c><input${ssrRenderAttr("value", tempuserform.username)} type="text" placeholder="您的昵称" class="form-control rounded" data-v-c9d90b9c></div><div class="form-group comment-form-group" data-v-c9d90b9c><input${ssrRenderAttr("value", tempuserform.email)} type="email" placeholder="您的邮箱" class="form-control rounded" data-v-c9d90b9c></div></div></div><div class="van-hairline--top van-dialog__footer" data-v-c9d90b9c><button class="van-button van-button--default van-button--large van-dialog__cancel" data-v-c9d90b9c><div class="van-button__content" data-v-c9d90b9c><span class="van-button__text" data-v-c9d90b9c>取消</span></div></button><button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" data-v-c9d90b9c><div class="van-button__content" data-v-c9d90b9c><span class="van-button__text" data-v-c9d90b9c>确认</span></div></button></div></div><div class="chat-header position-relative" data-v-c9d90b9c> 评论列表 <i class="icon-close cursor-pointer" data-v-c9d90b9c></i></div><div class="h-full w-full" data-v-c9d90b9c><div id="chatRecord" class="chat-body p-4" data-v-c9d90b9c><div class="in finite-loading-container" data-v-c9d90b9c><div class="infinite-status-prompt" style="${ssrRenderStyle({ "color": "#666", "font-size": "14px", "padding": "10px 0", "display": "none" })}" data-v-c9d90b9c><i class="loading-default" data-v-c9d90b9c></i></div><div class="infinite-status-prompt" style="${ssrRenderStyle({ "display": "none" })}" data-v-c9d90b9c><div class="mt-10" data-v-c9d90b9c><h5 class="mb-6" data-v-c9d90b9c>还没有评论哦!</h5></div></div><div class="infinite-status-prompt" style="${ssrRenderStyle({ "display": "none" })}" data-v-c9d90b9c><div class="mb-3 fs-12 text-muted" data-v-c9d90b9c> 全部数据已加载完毕…… </div></div><div class="infinite-status-prompt" style="${ssrRenderStyle({ "color": "#666", "font-size": "14px", "padding": "10px 0", "display": "none" })}" data-v-c9d90b9c><div data-v-c9d90b9c> 数据加载失败， <button class="btn btn-outline-theme btn-sm" data-v-c9d90b9c> 重试 </button></div></div></div><!--[-->`);
      ssrRenderList(comment.value.value, (item, id) => {
        _push(`<div class="${ssrRenderClass(["d-flex mb-3", isCurrentUser(item) ? "flex-row-reverse" : ""])}" data-v-c9d90b9c>`);
        if (!item.profile) {
          _push(`<div class="${ssrRenderClass(["w-28", isCurrentUser(item) ? "ml-3" : "mr-3"])}" data-v-c9d90b9c><svg viewBox="0 0 264 280" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-v-c9d90b9c><desc data-v-c9d90b9c>Created with getavataaars.com</desc><defs data-v-c9d90b9c><circle id="path-1" cx="120" cy="120" r="120" data-v-c9d90b9c></circle><path d="M12,160 C12,226.27417 65.72583,280 132,280 C198.27417,280 252,226.27417 252,160 L264,160 L264,-1.42108547e-14 L-3.19744231e-14,-1.42108547e-14 L-3.19744231e-14,160 L12,160 Z" id="path-2" data-v-c9d90b9c></path><path d="M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z" id="path-silhouette" data-v-c9d90b9c></path></defs><g id="Avataaar" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" data-v-c9d90b9c><g transform="translate(-825.000000, -1100.000000)" id="Avataaar/Circle" data-v-c9d90b9c><g transform="translate(825.000000, 1100.000000)" data-v-c9d90b9c><g id="Circle" stroke-width="1" fill-rule="evenodd" transform="translate(12.000000, 40.000000)" data-v-c9d90b9c><mask id="mask-1" fill="white" data-v-c9d90b9c><use xlink:href="#path-1" data-v-c9d90b9c></use></mask><use id="Circle-Background" fill="#E6E6E6" xlink:href="#path-1" data-v-c9d90b9c></use><g id="Color/Palette/Blue-01" mask="url(#mask-1)" fill="#6fb8e0" data-v-c9d90b9c><rect id="🖍Color" x="0" y="0" width="240" height="240" data-v-c9d90b9c></rect></g></g><mask id="mask-2" fill="white" data-v-c9d90b9c><use xlink:href="#path-2" data-v-c9d90b9c></use></mask><g id="Mask" data-v-c9d90b9c></g><g id="Avataaar" stroke-width="1" fill-rule="evenodd" fill="black" mask="url(#mask-2)" data-v-c9d90b9c><g id="Body" transform="translate(32.000000, 36.000000)" data-v-c9d90b9c><mask id="mask-silhouette" fill="white" data-v-c9d90b9c><use xlink:href="#path-silhouette" data-v-c9d90b9c></use></mask><use fill="#AE5D29" xlink:href="#path-silhouette" data-v-c9d90b9c></use><path d="M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z" id="Neck-Shadow" fill-opacity="0.100000001" fill="#000000" mask="url(#mask-silhouette)" data-v-c9d90b9c></path></g><svg data-v-c9d90b9c><g id="Clothing/Graphic-Shirt" transform="translate(0.000000, 170.000000)" data-v-c9d90b9c><defs data-v-c9d90b9c><path d="M165.624032,29.2681342 C202.760022,32.1373245 232,63.1798426 232,101.051724 L232,110 L32,110 L32,101.051724 C32,62.8348009 61.7752018,31.5722494 99.3929298,29.1967444 C99.1342224,30.2735458 99,31.3767131 99,32.5 C99,44.3741221 113.998461,54 132.5,54 C151.001539,54 166,44.3741221 166,32.5 C166,31.4015235 165.871641,30.3222877 165.624025,29.2681336 Z" id="GraphicShirt-path1" data-v-c9d90b9c></path></defs><mask id="GraphicShirt-mask1" fill="white" data-v-c9d90b9c><use href="#GraphicShirt-path1" data-v-c9d90b9c></use></mask><use class="CustomColor" fill="#E6E6E6" fillrule="evenodd" href="#GraphicShirt-path1" data-v-c9d90b9c></use></g></svg><svg data-v-c9d90b9c><g transform="translate(76.000000, 82.000000)" data-v-c9d90b9c><g id="Eyes/Happy-😁" transform="translate(0.000000, 8.000000)" opacity="0.599999964" data-v-c9d90b9c><path d="M16.1601674,22.4473116 C18.006676,18.648508 22.1644225,16 26.9975803,16 C31.8136766,16 35.9591217,18.629842 37.8153518,22.4071242 C38.3667605,23.5291977 37.5821037,24.4474817 36.790607,23.7670228 C34.3395063,21.6597833 30.8587163,20.3437884 26.9975803,20.3437884 C23.2572061,20.3437884 19.8737584,21.5787519 17.4375392,23.5716412 C16.5467928,24.3002944 15.6201012,23.5583844 16.1601674,22.4473116 Z" id="Squint" data-v-c9d90b9c></path><path d="M74.1601674,22.4473116 C76.006676,18.648508 80.1644225,16 84.9975803,16 C89.8136766,16 93.9591217,18.629842 95.8153518,22.4071242 C96.3667605,23.5291977 95.5821037,24.4474817 94.790607,23.7670228 C92.3395063,21.6597833 88.8587163,20.3437884 84.9975803,20.3437884 C81.2572061,20.3437884 77.8737584,21.5787519 75.4375392,23.5716412 C74.5467928,24.3002944 73.6201012,23.5583844 74.1601674,22.4473116 Z" id="Squint" data-v-c9d90b9c></path></g></g></svg><svg data-v-c9d90b9c><g transform="translate(76.000000, 82.000000)" data-v-c9d90b9c><g id="Mouth/Serious" transform="translate(2.000000, 52.000000)" fill="#000000" opacity="0.699999988" data-v-c9d90b9c><rect id="Why-so-serious?" x="42" y="18" width="24" height="6" rx="3" data-v-c9d90b9c></rect></g></g></svg><svg data-v-c9d90b9c><g transform="translate(76.000000, 82.000000)" data-v-c9d90b9c><g id="Eyebrow/Natural/Angry-Natural" opacity="0.599999964" data-v-c9d90b9c><path d="M44.8565785,12.2282877 C44.8578785,12.2192877 44.8578785,12.2192877 44.8565785,12.2282877 M17.5862288,7.89238094 C15.2441598,8.3302947 13.0866155,9.78806858 12.1523766,12.0987479 C11.8009169,12.967391 11.3917103,14.9243181 11.7083227,15.8073302 C11.8284629,16.14295 12.0332321,16.1008692 12.9555234,16.0430509 C14.643791,15.9369937 16.9330912,13.6622369 18.7484684,13.2557982 C21.2753939,12.6899315 23.9825295,13.1148447 26.4961798,13.6882381 C30.8109365,14.6725177 36.4854008,17.7875215 40.9461842,16.1699775 C41.2783949,16.0495512 45.6210294,12.9225732 44.3685187,12.2769925 C43.9238011,11.9068186 41.1370145,12.0854053 40.6216067,11.9988489 C38.2277647,11.5971998 35.7297127,10.9345131 33.373373,10.3265657 C28.2329017,9.00016592 22.9666484,6.88073171 17.5862288,7.89238094" class="CustomColor" transform="translate(28.094701, 12.127505) rotate(17.000000) translate(-28.094701, -12.127505) " data-v-c9d90b9c></path><path d="M100.918293,12.2094196 C100.919593,12.2004196 100.919593,12.2004196 100.918293,12.2094196 M73.5862288,7.89238094 C71.2441598,8.3302947 69.0866155,9.78806858 68.1523766,12.0987479 C67.8009169,12.967391 67.3917103,14.9243181 67.7083227,15.8073302 C67.8284629,16.14295 68.0332321,16.1008692 68.9555234,16.0430509 C70.643791,15.9369937 72.9330912,13.6622369 74.7484684,13.2557982 C77.2753939,12.6899315 79.9825295,13.1148447 82.4961798,13.6882381 C86.8109365,14.6725177 92.4854008,17.7875215 96.9461842,16.1699775 C97.2783949,16.0495512 101.621029,12.9225732 100.368519,12.2769925 C99.9238011,11.9068186 97.1370145,12.0854053 96.6216067,11.9988489 C94.2277647,11.5971998 91.7297127,10.9345131 89.373373,10.3265657 C84.2329017,9.00016592 78.9666484,6.88073171 73.5862288,7.89238094" class="CustomColor" transform="translate(84.094701, 12.127505) scale(-1, 1) rotate(17.000000) translate(-84.094701, -12.127505) " data-v-c9d90b9c></path></g></g></svg><svg data-v-c9d90b9c><g fill="black" transform="translate(76.000000, 82.000000)" data-v-c9d90b9c><g id="Nose/Default" transform="translate(28.000000, 40.000000)" opacity="0.16" data-v-c9d90b9c><path d="M16,8 C16,12.418278 21.372583,16 28,16 L28,16 C34.627417,16 40,12.418278 40,8" id="Nose" data-v-c9d90b9c></path></g></g></svg><svg style="${ssrRenderStyle({ "--avataaar-hair-color": "#724133", "--avataaar-facial-hair-color": "#ecdcbf", "--avataaar-hat-color": "#e6e6e6", "--avataaar-shirt-color": "#ff488e" })}" data-v-c9d90b9c><g id="Top" strokewidth="1" fillrule="evenodd" data-v-c9d90b9c><defs data-v-c9d90b9c><rect id="ShortHairShortWaved-path2" x="0" y="0" width="264" height="280" data-v-c9d90b9c></rect><path d="M183.679824,38.9488198 C189.086072,33.9985622 190.387393,23.9615454 187.317704,17.4493246 C183.549263,9.45385312 175.901319,8.45217737 168.572342,11.9686703 C161.664469,15.2835661 155.515175,16.3878671 147.950196,14.7817319 C140.691624,13.2406923 133.805566,10.5226172 126.303388,10.0762471 C113.978028,9.34292483 102.003367,13.914565 93.6031232,23.1292512 C92.0003538,24.8871655 90.7089493,26.8971594 89.4882796,28.9343872 C88.5115454,30.5644351 87.4105298,32.3133822 86.9950459,34.1921885 C86.7973853,35.0855929 87.165272,37.2898774 86.7203704,38.0218712 C86.2391099,38.8123183 84.4244668,39.5373375 83.6510124,40.1238625 C82.0842713,41.3125222 80.7267597,42.6539573 79.4713836,44.1710842 C76.8052796,47.3926541 75.3376994,50.7577001 74.1034777,54.7428152 C70.0005333,67.9877849 69.6528094,83.7412616 74.9569218,96.7467724 C75.6639385,98.4811062 77.8550622,102.098564 79.1431613,98.3847912 C79.3976741,97.6508047 78.8086588,95.1907873 78.8099809,94.4501584 C78.8146084,91.7300906 80.3160587,73.7213568 86.857084,63.6330196 C88.9862338,60.3491948 98.8298903,48.0522456 100.840541,47.9536058 C101.9058,49.6464245 112.720532,60.4624529 140.783385,59.1948919 C153.445253,58.6229725 163.18265,52.9341181 165.520833,50.4680909 C166.549375,56.0008881 178.51323,64.2839965 180.33625,67.6921976 C185.602529,77.5376948 186.770677,97.9957204 188.780988,97.9573368 C190.791299,97.9189532 192.234429,92.7197798 192.647929,91.7270713 C195.719601,84.351669 196.242509,75.0948338 195.914948,67.1684434 C195.487565,56.9663626 191.276535,45.9419513 183.679824,38.9488198 Z" id="ShortHairShortWaved-path1" data-v-c9d90b9c></path><filter x="-0.8%" y="-2.0%" width="101.5%" height="108.0%" filterUnits="objectBoundingBox" id="filter1" data-v-c9d90b9c><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" data-v-c9d90b9c></feOffset><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.16 0" type="matrix" in="shadowOffsetOuter1" result="shadowMatrixOuter1" data-v-c9d90b9c></feColorMatrix><feMerge data-v-c9d90b9c><feMergeNode in="shadowMatrixOuter1" data-v-c9d90b9c></feMergeNode><feMergeNode in="SourceGraphic" data-v-c9d90b9c></feMergeNode></feMerge></filter></defs><mask id="ShortHairShortWaved-mask2" fill="white" data-v-c9d90b9c><use href="#ShortHairShortWaved-path2" data-v-c9d90b9c></use></mask><g id="Mask" data-v-c9d90b9c></g><g id="Top/Short-Hair/Short-Waved" mask="url(&quot;#ShortHairShortWaved-mask2&quot;)" data-v-c9d90b9c><g transform="translate(-1.000000, 0.000000)" data-v-c9d90b9c><mask id="ShortHairShortWaved-mask1" fill="white" data-v-c9d90b9c><use href="#ShortHairShortWaved-path1" data-v-c9d90b9c></use></mask><use class="CustomColor" stroke="none" fill="var(--avataaar-hair-color)" fillrule="evenodd" href="#ShortHairShortWaved-path1" data-v-c9d90b9c></use></g></g></g></svg><svg style="${ssrRenderStyle({ "--avataaar-hair-color": "#724133", "--avataaar-facial-hair-color": "#ecdcbf", "--avataaar-hat-color": "#e6e6e6", "--avataaar-shirt-color": "#ff488e" })}" data-v-c9d90b9c><g id="Facial-Hair/Moustache-Fancy" transform="translate(49.000000, 72.000000)" data-v-c9d90b9c><defs data-v-c9d90b9c><path d="M84.0002865,69.2970648 C77.2083681,65.7112456 67.5782013,65.1489138 62.3885276,67.1316942 C56.6144416,69.3374281 51.5052994,75.5829845 42.6388201,72.8283797 C42.2699314,72.7136458 41.9094725,73.0449523 42.0204089,73.408662 C43.3937943,77.9183313 51.0278347,81.0068878 53.6221945,81.1080652 C64.961124,81.549609 74.0949802,72.8302891 84.0002865,72.1614794 C93.9055921,72.8302891 103.03945,81.549609 114.378714,81.1080652 C116.972736,81.0068878 124.607113,77.9183313 125.980498,73.408662 C126.091098,73.0449523 125.730639,72.7136458 125.36175,72.8283797 C116.495271,75.5829845 111.386129,69.3374281 105.612044,67.1316942 C100.422371,65.1489138 90.7922044,65.7112456 84.0002865,69.2970648 Z" id="MoustacheFancy-path1" data-v-c9d90b9c></path></defs><mask id="MoustacheFancy-mask1" fill="white" data-v-c9d90b9c><use href="#MoustacheFancy-path1" data-v-c9d90b9c></use></mask><use class="CustomColor" fill="var(--avataaar-facial-hair-color)" fillrule="evenodd" href="#MoustacheFancy-path1" data-v-c9d90b9c></use></g></svg><svg data-v-c9d90b9c><g id="Top/_Resources/Round" fill="none" transform="translate(62.000000, 85.000000)" data-v-c9d90b9c><defs data-v-c9d90b9c><path d="M80.4646192,16.3941179 C84.3801509,8.45869677 92.552602,3 102,3 C110.919691,3 118.702887,7.86591082 122.839921,15.0880638 C123.050197,15.0306504 123.271519,15 123.5,15 L131.5,15 C132.880712,15 134,16.1192881 134,17.5 C134,18.8807119 132.880712,20 131.5,20 L124.963126,20 C125.637355,22.2145921 126,24.5649459 126,27 C126,40.254834 115.254834,51 102,51 C88.745166,51 78,40.254834 78,27 C78,25.5781066 78.1236513,24.1850936 78.3607874,22.8311273 C78.2762458,18.4553035 74.9135957,15 70.8624171,15 C67.1256697,15 63.9747186,17.9397535 63.4417635,21.8300629 C63.8073299,23.4951922 64,25.2250958 64,27 C64,40.254834 53.254834,51 40,51 C26.745166,51 16,40.254834 16,27 C16,24.5649459 16.3626451,22.2145921 17.0368738,20 L10.5,20 C9.11928813,20 8,18.8807119 8,17.5 C8,16.1192881 9.11928813,15 10.5,15 L10.5,15 L18.5,15 C18.728481,15 18.9498033,15.0306504 19.1600793,15.0880638 C23.2971127,7.86591082 31.0803092,3 40,3 C49.3521568,3 57.4549431,8.34919095 61.415666,16.15488 C63.4929212,13.0392725 66.9494432,11 70.8624171,11 C74.8746823,11 78.4070368,13.1440781 80.4646192,16.3941179 Z M40,47 C51.045695,47 60,38.045695 60,27 C60,15.954305 51.045695,7 40,7 C28.954305,7 20,15.954305 20,27 C20,38.045695 28.954305,47 40,47 Z M102,47 C113.045695,47 122,38.045695 122,27 C122,15.954305 113.045695,7 102,7 C90.954305,7 82,15.954305 82,27 C82,38.045695 90.954305,47 102,47 Z" id="Round-path1" data-v-c9d90b9c></path><filter x="-0.8%" y="-2.1%" width="101.6%" height="108.3%" filterUnits="objectBoundingBox" id="filter1" data-v-c9d90b9c><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" data-v-c9d90b9c></feOffset><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowOffsetOuter1" data-v-c9d90b9c></feColorMatrix></filter></defs><g id="Lennon-Glasses" data-v-c9d90b9c><use fill="black" fillopacity="1" filter="url(&quot;#filter1&quot;)" href="#Round-path1" data-v-c9d90b9c></use><use fill="#252C2F" fillrule="evenodd" href="#Round-path1" data-v-c9d90b9c></use></g></g></svg></g></g></g></g></svg></div>`);
        } else {
          _push(`<div class="${ssrRenderClass(["w-28", isCurrentUser(item) ? "ml-3" : "mr-3"])}" data-v-c9d90b9c><img${ssrRenderAttr("src", item.profile)} style="${ssrRenderStyle({ "border-radius": "50%", "width": "100%", "height": "auto" })}" data-v-c9d90b9c></div>`);
        }
        _push(`<section class="${ssrRenderClass([isCurrentUser(item) ? "current-user-container" : "", "flex-grow"])}" data-v-c9d90b9c><div class="mb-1" data-v-c9d90b9c><span class="fs-12 mr-1 fw-600 text-darken" data-v-c9d90b9c>${ssrInterpolate(item.username)}</span><span class="opacity-70 fs-12 text-muted pl-1" data-v-c9d90b9c><span data-v-c9d90b9c>${ssrInterpolate(formatDate(item.addTime))}</span></span></div><div class="${ssrRenderClass([isCurrentUser(item) ? "current-user-message" : "", "MessageBody mb-1"])}" data-v-c9d90b9c>${ssrInterpolate(item.content)}</div></section></div>`);
      });
      _push(`<!--]--></div><div class="chat-footer" data-v-c9d90b9c><div data-v-c9d90b9c><textarea rows="2" placeholder="尽情畅所欲言把" data-v-c9d90b9c>${ssrInterpolate(contentarea.value)}</textarea></div><div class="d-flex align-items-center pl-3 clearfix" data-v-c9d90b9c><a class="nav-link p-0 cursor-pointer" data-v-c9d90b9c><i class="icon-smile fs-18" data-v-c9d90b9c></i></a><span data-v-c9d90b9c><div id="el-popover-4635" role="tooltip" aria-hidden="true" class="el-popover el-popper emoji-popover" style="${ssrRenderStyle({ "width": "undefinedpx", "display": "none" })}" data-v-c9d90b9c><div class="macwk-emoji" data-v-c9d90b9c><div class="d-flex nav" data-v-c9d90b9c><a class="nav-link flex-grow-1 cursor-pointer active" data-v-c9d90b9c><span data-v-c9d90b9c><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-c9d90b9c><path d="M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z" data-v-c9d90b9c></path><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10" data-v-c9d90b9c></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-c9d90b9c><span data-v-c9d90b9c><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-c9d90b9c><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10" data-v-c9d90b9c></path><path d="M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0" data-v-c9d90b9c></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-c9d90b9c><span data-v-c9d90b9c><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-c9d90b9c><path d="M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8" data-v-c9d90b9c></path><path d="M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235" data-v-c9d90b9c></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-c9d90b9c><span data-v-c9d90b9c><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-c9d90b9c><path d="M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9" data-v-c9d90b9c></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-c9d90b9c><span data-v-c9d90b9c><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-c9d90b9c><path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113" data-v-c9d90b9c></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-c9d90b9c><span data-v-c9d90b9c><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-c9d90b9c><path d="M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5" data-v-c9d90b9c></path><path d="M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z" data-v-c9d90b9c></path></svg></span></a></div><div class="p-2" data-v-c9d90b9c><div class="input-group" data-v-c9d90b9c><input type="text" placeholder="搜索表情……" value="" class="form-control" data-v-c9d90b9c><div class="search-clear" style="${ssrRenderStyle({ "display": "none" })}" data-v-c9d90b9c><i class="icon-close" data-v-c9d90b9c></i></div><div class="input-group-append" data-v-c9d90b9c><span class="input-group-text" data-v-c9d90b9c><i class="icon-search" data-v-c9d90b9c></i></span></div></div></div><div id="viewBox" data-v-c9d90b9c><div id="recent" class="pl-2 pb-2 mb-2" data-v-c9d90b9c><h6 data-v-c9d90b9c>常用</h6><div class="emoji-container" data-v-c9d90b9c></div></div><div id="people" class="pl-2 pb-2 mb-2" data-v-c9d90b9c><h6 data-v-c9d90b9c>表情 &amp; 人物</h6><div class="emoji-container" data-v-c9d90b9c></div></div><div id="animals_and_nature" class="pl-2 pb-2 mb-2" data-v-c9d90b9c><h6 data-v-c9d90b9c>动物 &amp; 自然</h6><div class="emoji-container" data-v-c9d90b9c></div></div><div id="food_and_drink" class="pl-2 pb-2 mb-2" data-v-c9d90b9c><h6 data-v-c9d90b9c>食品 &amp; 饮料</h6><div class="emoji-container" data-v-c9d90b9c></div></div><div id="activity" class="pl-2 pb-2 mb-2" data-v-c9d90b9c><h6 data-v-c9d90b9c>运动</h6><div class="emoji-container" data-v-c9d90b9c></div></div><div id="travel_and_places" class="pl-2 pb-2 mb-2" data-v-c9d90b9c><h6 data-v-c9d90b9c>旅行 &amp; 地点</h6><div class="emoji-container" data-v-c9d90b9c></div></div></div><div class="emoji-footer b-t px-3 py-2 d-flex align-items-center" data-v-c9d90b9c><div class="w-60" data-v-c9d90b9c></div><div class="flex-grow" data-v-c9d90b9c><span class="fw-300 fs-24" data-v-c9d90b9c>IceCMS.com</span></div></div></div></div><span class="el-popover__reference-wrapper" data-v-c9d90b9c></span></span><a href="/Privacy" target="_blank" class="fs-12 ml-5" style="${ssrRenderStyle({ "margin-top": "-2px" })}" data-v-c9d90b9c>查看隐私政策</a><div class="comment-post flex-grow text-right" data-v-c9d90b9c><span data-v-c9d90b9c><button${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} style="${ssrRenderStyle({ "border-top-left-radius": "10px" })}" class="${ssrRenderClass([{ "opacity-50": isSubmitting.value }, "btn btn-theme btn-sm px-5 pt-1 fs-14"])}" data-v-c9d90b9c>${ssrInterpolate(isSubmitting.value ? "发送中..." : "评论")}</button></span></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Comment.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-c9d90b9c"]]), { __name: "Comment" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const previewRef = ref(null);
    const toc = ref([]);
    const articleId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    ref(true);
    const lovecheck = ref(false);
    const loveNum = ref("");
    const judjeComment = ref(false);
    const profile = ref("");
    const thumb = ref("");
    const MyEmoge = ref("");
    const showDialog = ref(false);
    const commentnum = ref("");
    const mycomment = ref(true);
    ref("nav-link active");
    ref({
      container: "#sidelist",
      height: "calc(100% - 100px)",
      iconLeft: true,
      lineLeft: 0,
      watch: true
    });
    const intro = ref("");
    const addTime = ref("");
    const hits = ref("");
    const authorName = ref("");
    const content = ref("ded");
    const title = ref("");
    ref(false);
    const Article = ref(null);
    const acticve = ref("nav-link active");
    const setting = ref({});
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };
    [__temp, __restore] = withAsyncContext(() => handlegetArticleById()), await __temp, __restore();
    async function handlegetArticleById() {
      try {
        const result = await getArticleById(articleId);
        console.log(result);
        Article.value = result;
        content.value = Article.value.content;
        profile.value = Article.value.profile;
        thumb.value = Article.value.thumb;
        title.value = Article.value.title;
        loveNum.value = Article.value.loveNum;
        authorName.value = Article.value.authorName;
        addTime.value = Article.value.createTime ?? Article.value.addTime;
        intro.value = Article.value.intro;
        hits.value = Article.value.hits;
        if (Article.value.commentDisabled === "true") {
          judjeComment.value = true;
        }
      } catch (error) {
        console.error("获取资源列表出错:", error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => handlegetArticleCommentnum()), await __temp, __restore();
    async function handlegetArticleCommentnum() {
      try {
        const result = await getArticleCommentnum(articleId);
        commentnum.value = result;
      } catch (error) {
        console.error("获取文章评论数量出错:", error);
      }
    }
    const showemoge = () => {
      showDialog.value = !showDialog.value;
    };
    const updateDate = () => {
      showDialog.value = false;
      mycomment.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_v_md_preview = resolveComponent("v-md-preview");
      const _component_client_only = __nuxt_component_2$1;
      const _component_comment = __nuxt_component_2;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "post" }, _attrs))} data-v-07f01436><div id="__nuxt" data-server-rendered="true" data-v-07f01436><div id="__layout" data-v-07f01436><div data-fetch-key="0" class="app macwk-animation" data-v-07f01436>`);
      _push(ssrRenderComponent(_component_top, { message3: acticve.value }, null, _parent));
      _push(`<div class="overflow-hidden" data-v-07f01436><div class="article-details white bg layout-min-full-height" data-v-07f01436><div class="py-6" data-v-07f01436><div class="article-details-fg" data-v-07f01436><div class="article-banner" data-v-07f01436><div class="imgBox" data-v-07f01436><img alt="" data-v-07f01436></div></div><div class="article-content py-7 px-10" data-v-07f01436><h1 id="article-top" class="b-0 mt-0 pb-0 mb-15" data-v-07f01436>${ssrInterpolate(title.value)}</h1><div class="d-flex mb-6 align-items-center" data-v-07f01436><img${ssrRenderAttr("src", profile.value)} class="w-50 mw-50 h-50 b-0 circle m-0 mr-4" data-v-07f01436><div class="flex" data-v-07f01436><h4 class="mb-0 mt-0" data-v-07f01436>${ssrInterpolate(authorName.value)}</h4><p class="mb-0 py-0 fs-14" data-v-07f01436>${ssrInterpolate(formatDate(addTime.value))} 阅读 ${ssrInterpolate(hits.value)}</p></div></div><blockquote class="blockquote" data-v-07f01436><div class="text-muted" data-v-07f01436>${ssrInterpolate(intro.value)}</div></blockquote><div class=".image-header-side" data-v-07f01436><div class="imgBox" data-v-07f01436><img class="image-header" alt=""${ssrRenderAttr("data-src", thumb.value)}${ssrRenderAttr("src", thumb.value)} lazy="loaded" data-v-07f01436></div></div><div class="content-markdown" data-v-07f01436>`);
      _push(ssrRenderComponent(_component_v_md_preview, {
        ref_key: "previewRef",
        ref: previewRef,
        text: content.value,
        height: "400px"
      }, null, _parent));
      if (toc.value.length) {
        _push(`<div style="${ssrRenderStyle({ "margin-left": "150px" })}" class="toc-sidebar" data-v-07f01436><ul data-v-07f01436><!--[-->`);
        ssrRenderList(toc.value, (item) => {
          _push(`<li class="toc-item" style="${ssrRenderStyle({ paddingLeft: `${item.indent * 20}px` })}" data-v-07f01436><a${ssrRenderAttr("href", "#" + item.id)} data-v-07f01436>${ssrInterpolate(item.title)}</a></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="catalogleft" data-v-07f01436><aside class="crayons-layout__sidebar-left" aria-label="Article actions" data-v-07f01436><div class="crayons-article-actions print-hidden" data-v-07f01436><div style="${ssrRenderStyle({ "margin-bottom": "20px", "display": "flex", "flex-direction": "column", "align-items": "center" })}" class="crayons-article-actions__inner" data-v-07f01436><button id="reaction-butt-like" aria-label="Like" aria-pressed="false" class="sogood crayons-reaction crayons-reaction--like activated" data-category="like" title="Heart" data-v-07f01436>`);
      if (!lovecheck.value) {
        _push(`<span class="crayons-reaction__icon crayons-reaction__icon--inactive" data-v-07f01436><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true" class="crayons-icon" data-v-07f01436><path d="M21.179 12.794l.013.014L12 22l-9.192-9.192.013-.014A6.5 6.5 0 0112 3.64a6.5 6.5 0 019.179 9.154zM4.575 5.383a4.5 4.5 0 000 6.364L12 19.172l7.425-7.425a4.5 4.5 0 10-6.364-6.364L8.818 9.626 7.404 8.21l3.162-3.162a4.5 4.5 0 00-5.99.334l-.001.001z" data-v-07f01436></path></svg></span>`);
      } else {
        _push(`<span class="crayons-reaction__icon crayons-reaction__icon--inactive" data-v-07f01436><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true" class="crayons-icon" data-v-07f01436><path fill="red" d="M21.179 12.794l.013.014L12 22l-9.192-9.192.013-.014A6.5 6.5 0 0112 3.64a6.5 6.5 0 019.179 9.154zM4.575 5.383a4.5 4.5 0 000 6.364L12 19.172l7.425-7.425a4.5 4.5 0 10-6.364-6.364L8.818 9.626 7.404 8.21l3.162-3.162a4.5 4.5 0 00-5.99.334l-.001.001z" data-v-07f01436></path></svg></span>`);
      }
      if (!lovecheck.value) {
        _push(`<span class="crayons-reaction__count" id="reaction-number-like" data-v-07f01436>${ssrInterpolate(loveNum.value)}</span>`);
      } else {
        _push(`<span style="${ssrRenderStyle({ "color": "red" })}" class="crayons-reaction__count" id="reaction-number-like" data-v-07f01436>${ssrInterpolate(loveNum.value)}</span>`);
      }
      _push(`</button><button style="${ssrRenderStyle({})}" id="reaction-butt-unicorn" aria-label="React with unicorn" aria-pressed="false" class="make crayons-reaction crayons-reaction--unicorn" data-category="unicorn" title="Unicorn" data-v-07f01436><span class="crayons-reaction__icon crayons-reaction__icon--inactive" data-v-07f01436><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-hidden="true" class="crayons-icon" data-v-07f01436><path d="M5.645 8.013c.013-.265-.261-.323-.4-.183-1.16 1.17-1.822 3.865-.344 7.32.294.961 1.938 3.19.84 6.131l-.003.006c-.094.255.206.404.366.263 1.395-1.226 1.933-3.593 1.1-6.375-.488-1.657-1.955-4.226-1.559-7.162zm-3.22 2.738c.05-.137-.124-.417-.326-.225-.939.893-1.316 2.863-.976 4.605.547 2.878 2.374 3.526 2.066 6.629-.028.102.176.38.348.154 1.546-2.033.409-4.453-.241-6.006-1.005-2.386-1.087-4.118-.871-5.157z" fill="#08090A" data-v-07f01436></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.622 7.223l8.579-3.68c.598-.256 1.087.547.6.985l-6.618 5.941c.881 2.043 2.738 6.34 2.931 6.775 1.348 3.031-2.055 4.918-3.807 3.583a7.027 7.027 0 01-.623-.574c-.974-.965-2.419-2.398-5.207-1.877.284-2.115-.313-3.737-.883-5.288-.38-1.032-.747-2.032-.837-3.124-.346-3.329 3.763-8.23 4.696-7.953.386.115.326 1.229.266 2.319-.051.948-.102 1.88.143 2.12.145.142.428.43.76.773zM11.5 16.5l2.5.5 2.5 2 1-.5-2-4.5-1.5-4-1.5-1-1-1-1-1.5L10 8l-.5 1.5 1 2.5 1 4.5z" data-v-07f01436></path></svg></span><span class="crayons-reaction__count" id="reaction-number-unicorn" data-v-07f01436>0</span></button><button id="reaction-butt-readinglist" aria-label="Add to reading list" aria-pressed="false" class="collect crayons-reaction crayons-reaction--readinglist" data-category="readinglist" title="Save" data-v-07f01436><span class="crayons-reaction__icon crayons-reaction__icon--inactive" data-v-07f01436><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true" class="crayons-icon" data-v-07f01436><path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z" data-v-07f01436></path></svg></span><span class="crayons-reaction__count" id="reaction-number-readinglist" data-v-07f01436>0</span></button><div id="mod-actions-menu-btn-area" class="print-hidden hidden align-center" data-v-07f01436></div><div class="align-center m:relative" data-v-07f01436><button id="article-show-more-button" aria-controls="article-show-more-dropdown" aria-expanded="false" aria-haspopup="true" class="more dropbtn crayons-btn crayons-btn--ghost-dimmed crayons-btn--icon-rounded" aria-label="Share post options" data-initialized="true" data-v-07f01436><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="a6r3b1dohi4el9rjyuy41avu2a0sm5bz" aria-hidden="true" class="crayons-icon dropdown-icon" data-v-07f01436><title id="a6r3b1dohi4el9rjyuy41avu2a0sm5bz" data-v-07f01436> More... </title><path fill-rule="evenodd" clip-rule="evenodd" d="M7 12a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm5 2a2 2 0 100-4 2 2 0 000 4z" data-v-07f01436></path></svg></button></div></div></div></aside></div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`<div data-v-07f01436><div style="${ssrRenderStyle(!judjeComment.value ? null : { display: "none" })}" data-v-07f01436>`);
      if (mycomment.value) {
        _push(`<section class="fiexd-comments-bar d-flex align-items-center is-scroll macwk-animation slow pc-model tinRightIn" data-v-07f01436><div class="d-flex align-items-center fs-20 fw-700 cursor-pointer w-full pl-3" data-v-07f01436><div class="flex" data-v-07f01436> 共 <span class="fs-36 mx-1" data-v-07f01436>${ssrInterpolate(commentnum.value || 0)}</span> 条评论 </div><svg color="inherit" viewbox="0 0 32 32" class="w-32" style="${ssrRenderStyle({ "width": "1.5em", "height": "1.5em", "font-size": "2rem", "vertical-align": "-6px" })}" data-v-07f01436><path fill="#FFFFFF" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46" data-v-07f01436></path><path d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="comment-icon-path" data-v-07f01436></path></svg></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (!mycomment.value) {
        _push(ssrRenderComponent(_component_comment, {
          articleId: unref(articleId),
          theEmoge: MyEmoge.value,
          ref: "child",
          onClosethecpmmentName: ($event) => updateDate(),
          onOpenthecpmmentName: ($event) => showemoge()
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-07f01436><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-07f01436></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Post/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-07f01436"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-C3sz9o4r.mjs.map
