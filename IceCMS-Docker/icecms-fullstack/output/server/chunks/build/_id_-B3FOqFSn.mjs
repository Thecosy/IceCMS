import { E as ElDialog } from './el-overlay-D0BXiGeq.mjs';
import { c as getResourceById, _ as __nuxt_component_0 } from './Top-z7S4M5x-.mjs';
import { E as ElButton } from './el-button-LIU117i9.mjs';
import { _ as _imports_5, b as _imports_6, c as _imports_7, d as _imports_8, e as _imports_9, f as _imports_10, g as _imports_11, h as _imports_12, i as _imports_13, j as _imports_14, k as _imports_15, E as ElCarousel, a as ElCarouselItem } from './shape-11-BIJngsJr.mjs';
import { _ as _export_sfc, u as useSettingStore, U as __nuxt_component_2, h as useDollarGet } from './server.mjs';
import { _ as __nuxt_component_4 } from './Mobile-B_yVIgB6.mjs';
import { defineComponent, ref, reactive, computed, withAsyncContext, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useUserStore } from './useUserStore-gmH42dcJ.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { b as _imports_0, c as _imports_1, d as _imports_2, _ as _imports_3, a as _imports_4 } from './jifen-4MnSXMr0.mjs';
import { useRoute, useRouter } from 'vue-router';
import { f as formatDate, G as GetWeekdate } from './date-DoCWYhJL.mjs';
import { a as aliPayApi, w as wxPayApi } from './aliPay-DnvXTR5T.mjs';
import '@vue/shared';
import './index-C6mv4HvU.mjs';
import 'lodash-unified';
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
  __name: "ResComment",
  __ssrInlineRender: true,
  props: {
    resourceId: {},
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
      resourceId: props.resourceId,
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
    function formatDate2(time) {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-container overflow-hidden van-popup van-popup--round van-popup--bottom" }, _attrs))} data-v-cfc8cc4d><div style="${ssrRenderStyle([
        userJudje.value ? null : { display: "none" },
        { "width": "360px", "z-index": "2011" }
      ])}" role="dialog" aria-labelledby="输入昵称和邮箱" class="van-dialog shadow-4 position-absolute" data-v-cfc8cc4d><div class="van-dialog__header" data-v-cfc8cc4d>输入昵称和邮箱</div><div class="van-dialog__content" data-v-cfc8cc4d><div class="px-6 py-5" data-v-cfc8cc4d><p data-v-cfc8cc4d><span class="text-success" data-v-cfc8cc4d>推荐使用 QQ 邮箱</span>，有紧急的问题可以快速联系到您。 </p><div class="form-group comment-form-group" data-v-cfc8cc4d><input${ssrRenderAttr("value", tempuserform.username)} type="text" placeholder="您的昵称" class="form-control rounded" data-v-cfc8cc4d></div><div class="form-group comment-form-group" data-v-cfc8cc4d><input${ssrRenderAttr("value", tempuserform.email)} type="email" placeholder="您的邮箱" class="form-control rounded" data-v-cfc8cc4d></div></div></div><div class="van-hairline--top van-dialog__footer" data-v-cfc8cc4d><button class="van-button van-button--default van-button--large van-dialog__cancel" data-v-cfc8cc4d><div class="van-button__content" data-v-cfc8cc4d><span class="van-button__text" data-v-cfc8cc4d>取消</span></div></button><button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" data-v-cfc8cc4d><div class="van-button__content" data-v-cfc8cc4d><span class="van-button__text" data-v-cfc8cc4d>确认</span></div></button></div></div><div class="chat-header position-relative" data-v-cfc8cc4d> 评论列表 <i class="icon-close cursor-pointer" data-v-cfc8cc4d></i></div><div class="h-full w-full" data-v-cfc8cc4d><div id="chatRecord" class="chat-body p-4" data-v-cfc8cc4d><div class="in finite-loading-container" data-v-cfc8cc4d><div class="infinite-status-prompt" style="${ssrRenderStyle({ "color": "#666", "font-size": "14px", "padding": "10px 0", "display": "none" })}" data-v-cfc8cc4d><i class="loading-default" data-v-cfc8cc4d></i></div><div class="infinite-status-prompt" style="${ssrRenderStyle({ "display": "none" })}" data-v-cfc8cc4d><div class="mt-10" data-v-cfc8cc4d><h5 class="mb-6" data-v-cfc8cc4d>还没有评论哦!</h5></div></div><div class="infinite-status-prompt" style="${ssrRenderStyle({ "display": "none" })}" data-v-cfc8cc4d><div class="mb-3 fs-12 text-muted" data-v-cfc8cc4d> 全部数据已加载完毕…… </div></div><div class="infinite-status-prompt" style="${ssrRenderStyle({ "color": "#666", "font-size": "14px", "padding": "10px 0", "display": "none" })}" data-v-cfc8cc4d><div data-v-cfc8cc4d> 数据加载失败， <button class="btn btn-outline-theme btn-sm" data-v-cfc8cc4d> 重试 </button></div></div></div><!--[-->`);
      ssrRenderList(comment.value.value, (item, id) => {
        _push(`<div class="${ssrRenderClass(["d-flex mb-3", isCurrentUser(item) ? "flex-row-reverse" : ""])}" data-v-cfc8cc4d>`);
        if (!item.profile) {
          _push(`<div class="${ssrRenderClass(["w-28", isCurrentUser(item) ? "ml-3" : "mr-3"])}" data-v-cfc8cc4d><svg viewBox="0 0 264 280" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-v-cfc8cc4d><desc data-v-cfc8cc4d>Created with getavataaars.com</desc><defs data-v-cfc8cc4d><circle id="path-1" cx="120" cy="120" r="120" data-v-cfc8cc4d></circle><path d="M12,160 C12,226.27417 65.72583,280 132,280 C198.27417,280 252,226.27417 252,160 L264,160 L264,-1.42108547e-14 L-3.19744231e-14,-1.42108547e-14 L-3.19744231e-14,160 L12,160 Z" id="path-2" data-v-cfc8cc4d></path><path d="M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z" id="path-silhouette" data-v-cfc8cc4d></path></defs><g id="Avataaar" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" data-v-cfc8cc4d><g transform="translate(-825.000000, -1100.000000)" id="Avataaar/Circle" data-v-cfc8cc4d><g transform="translate(825.000000, 1100.000000)" data-v-cfc8cc4d><g id="Circle" stroke-width="1" fill-rule="evenodd" transform="translate(12.000000, 40.000000)" data-v-cfc8cc4d><mask id="mask-1" fill="white" data-v-cfc8cc4d><use xlink:href="#path-1" data-v-cfc8cc4d></use></mask><use id="Circle-Background" fill="#E6E6E6" xlink:href="#path-1" data-v-cfc8cc4d></use><g id="Color/Palette/Blue-01" mask="url(#mask-1)" fill="#6fb8e0" data-v-cfc8cc4d><rect id="🖍Color" x="0" y="0" width="240" height="240" data-v-cfc8cc4d></rect></g></g><mask id="mask-2" fill="white" data-v-cfc8cc4d><use xlink:href="#path-2" data-v-cfc8cc4d></use></mask><g id="Mask" data-v-cfc8cc4d></g><g id="Avataaar" stroke-width="1" fill-rule="evenodd" fill="black" mask="url(#mask-2)" data-v-cfc8cc4d><g id="Body" transform="translate(32.000000, 36.000000)" data-v-cfc8cc4d><mask id="mask-silhouette" fill="white" data-v-cfc8cc4d><use xlink:href="#path-silhouette" data-v-cfc8cc4d></use></mask><use fill="#AE5D29" xlink:href="#path-silhouette" data-v-cfc8cc4d></use><path d="M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z" id="Neck-Shadow" fill-opacity="0.100000001" fill="#000000" mask="url(#mask-silhouette)" data-v-cfc8cc4d></path></g><svg data-v-cfc8cc4d><g id="Clothing/Graphic-Shirt" transform="translate(0.000000, 170.000000)" data-v-cfc8cc4d><defs data-v-cfc8cc4d><path d="M165.624032,29.2681342 C202.760022,32.1373245 232,63.1798426 232,101.051724 L232,110 L32,110 L32,101.051724 C32,62.8348009 61.7752018,31.5722494 99.3929298,29.1967444 C99.1342224,30.2735458 99,31.3767131 99,32.5 C99,44.3741221 113.998461,54 132.5,54 C151.001539,54 166,44.3741221 166,32.5 C166,31.4015235 165.871641,30.3222877 165.624025,29.2681336 Z" id="GraphicShirt-path1" data-v-cfc8cc4d></path></defs><mask id="GraphicShirt-mask1" fill="white" data-v-cfc8cc4d><use href="#GraphicShirt-path1" data-v-cfc8cc4d></use></mask><use class="CustomColor" fill="#E6E6E6" fillrule="evenodd" href="#GraphicShirt-path1" data-v-cfc8cc4d></use></g></svg><svg data-v-cfc8cc4d><g transform="translate(76.000000, 82.000000)" data-v-cfc8cc4d><g id="Eyes/Happy-😁" transform="translate(0.000000, 8.000000)" opacity="0.599999964" data-v-cfc8cc4d><path d="M16.1601674,22.4473116 C18.006676,18.648508 22.1644225,16 26.9975803,16 C31.8136766,16 35.9591217,18.629842 37.8153518,22.4071242 C38.3667605,23.5291977 37.5821037,24.4474817 36.790607,23.7670228 C34.3395063,21.6597833 30.8587163,20.3437884 26.9975803,20.3437884 C23.2572061,20.3437884 19.8737584,21.5787519 17.4375392,23.5716412 C16.5467928,24.3002944 15.6201012,23.5583844 16.1601674,22.4473116 Z" id="Squint" data-v-cfc8cc4d></path><path d="M74.1601674,22.4473116 C76.006676,18.648508 80.1644225,16 84.9975803,16 C89.8136766,16 93.9591217,18.629842 95.8153518,22.4071242 C96.3667605,23.5291977 95.5821037,24.4474817 94.790607,23.7670228 C92.3395063,21.6597833 88.8587163,20.3437884 84.9975803,20.3437884 C81.2572061,20.3437884 77.8737584,21.5787519 75.4375392,23.5716412 C74.5467928,24.3002944 73.6201012,23.5583844 74.1601674,22.4473116 Z" id="Squint" data-v-cfc8cc4d></path></g></g></svg><svg data-v-cfc8cc4d><g transform="translate(76.000000, 82.000000)" data-v-cfc8cc4d><g id="Mouth/Serious" transform="translate(2.000000, 52.000000)" fill="#000000" opacity="0.699999988" data-v-cfc8cc4d><rect id="Why-so-serious?" x="42" y="18" width="24" height="6" rx="3" data-v-cfc8cc4d></rect></g></g></svg><svg data-v-cfc8cc4d><g transform="translate(76.000000, 82.000000)" data-v-cfc8cc4d><g id="Eyebrow/Natural/Angry-Natural" opacity="0.599999964" data-v-cfc8cc4d><path d="M44.8565785,12.2282877 C44.8578785,12.2192877 44.8578785,12.2192877 44.8565785,12.2282877 M17.5862288,7.89238094 C15.2441598,8.3302947 13.0866155,9.78806858 12.1523766,12.0987479 C11.8009169,12.967391 11.3917103,14.9243181 11.7083227,15.8073302 C11.8284629,16.14295 12.0332321,16.1008692 12.9555234,16.0430509 C14.643791,15.9369937 16.9330912,13.6622369 18.7484684,13.2557982 C21.2753939,12.6899315 23.9825295,13.1148447 26.4961798,13.6882381 C30.8109365,14.6725177 36.4854008,17.7875215 40.9461842,16.1699775 C41.2783949,16.0495512 45.6210294,12.9225732 44.3685187,12.2769925 C43.9238011,11.9068186 41.1370145,12.0854053 40.6216067,11.9988489 C38.2277647,11.5971998 35.7297127,10.9345131 33.373373,10.3265657 C28.2329017,9.00016592 22.9666484,6.88073171 17.5862288,7.89238094" class="CustomColor" transform="translate(28.094701, 12.127505) rotate(17.000000) translate(-28.094701, -12.127505) " data-v-cfc8cc4d></path><path d="M100.918293,12.2094196 C100.919593,12.2004196 100.919593,12.2004196 100.918293,12.2094196 M73.5862288,7.89238094 C71.2441598,8.3302947 69.0866155,9.78806858 68.1523766,12.0987479 C67.8009169,12.967391 67.3917103,14.9243181 67.7083227,15.8073302 C67.8284629,16.14295 68.0332321,16.1008692 68.9555234,16.0430509 C70.643791,15.9369937 72.9330912,13.6622369 74.7484684,13.2557982 C77.2753939,12.6899315 79.9825295,13.1148447 82.4961798,13.6882381 C86.8109365,14.6725177 92.4854008,17.7875215 96.9461842,16.1699775 C97.2783949,16.0495512 101.621029,12.9225732 100.368519,12.2769925 C99.9238011,11.9068186 97.1370145,12.0854053 96.6216067,11.9988489 C94.2277647,11.5971998 91.7297127,10.9345131 89.373373,10.3265657 C84.2329017,9.00016592 78.9666484,6.88073171 73.5862288,7.89238094" class="CustomColor" transform="translate(84.094701, 12.127505) scale(-1, 1) rotate(17.000000) translate(-84.094701, -12.127505) " data-v-cfc8cc4d></path></g></g></svg><svg data-v-cfc8cc4d><g fill="black" transform="translate(76.000000, 82.000000)" data-v-cfc8cc4d><g id="Nose/Default" transform="translate(28.000000, 40.000000)" opacity="0.16" data-v-cfc8cc4d><path d="M16,8 C16,12.418278 21.372583,16 28,16 L28,16 C34.627417,16 40,12.418278 40,8" id="Nose" data-v-cfc8cc4d></path></g></g></svg><svg style="${ssrRenderStyle({ "--avataaar-hair-color": "#724133", "--avataaar-facial-hair-color": "#ecdcbf", "--avataaar-hat-color": "#e6e6e6", "--avataaar-shirt-color": "#ff488e" })}" data-v-cfc8cc4d><g id="Top" strokewidth="1" fillrule="evenodd" data-v-cfc8cc4d><defs data-v-cfc8cc4d><rect id="ShortHairShortWaved-path2" x="0" y="0" width="264" height="280" data-v-cfc8cc4d></rect><path d="M183.679824,38.9488198 C189.086072,33.9985622 190.387393,23.9615454 187.317704,17.4493246 C183.549263,9.45385312 175.901319,8.45217737 168.572342,11.9686703 C161.664469,15.2835661 155.515175,16.3878671 147.950196,14.7817319 C140.691624,13.2406923 133.805566,10.5226172 126.303388,10.0762471 C113.978028,9.34292483 102.003367,13.914565 93.6031232,23.1292512 C92.0003538,24.8871655 90.7089493,26.8971594 89.4882796,28.9343872 C88.5115454,30.5644351 87.4105298,32.3133822 86.9950459,34.1921885 C86.7973853,35.0855929 87.165272,37.2898774 86.7203704,38.0218712 C86.2391099,38.8123183 84.4244668,39.5373375 83.6510124,40.1238625 C82.0842713,41.3125222 80.7267597,42.6539573 79.4713836,44.1710842 C76.8052796,47.3926541 75.3376994,50.7577001 74.1034777,54.7428152 C70.0005333,67.9877849 69.6528094,83.7412616 74.9569218,96.7467724 C75.6639385,98.4811062 77.8550622,102.098564 79.1431613,98.3847912 C79.3976741,97.6508047 78.8086588,95.1907873 78.8099809,94.4501584 C78.8146084,91.7300906 80.3160587,73.7213568 86.857084,63.6330196 C88.9862338,60.3491948 98.8298903,48.0522456 100.840541,47.9536058 C101.9058,49.6464245 112.720532,60.4624529 140.783385,59.1948919 C153.445253,58.6229725 163.18265,52.9341181 165.520833,50.4680909 C166.549375,56.0008881 178.51323,64.2839965 180.33625,67.6921976 C185.602529,77.5376948 186.770677,97.9957204 188.780988,97.9573368 C190.791299,97.9189532 192.234429,92.7197798 192.647929,91.7270713 C195.719601,84.351669 196.242509,75.0948338 195.914948,67.1684434 C195.487565,56.9663626 191.276535,45.9419513 183.679824,38.9488198 Z" id="ShortHairShortWaved-path1" data-v-cfc8cc4d></path><filter x="-0.8%" y="-2.0%" width="101.5%" height="108.0%" filterUnits="objectBoundingBox" id="filter1" data-v-cfc8cc4d><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" data-v-cfc8cc4d></feOffset><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.16 0" type="matrix" in="shadowOffsetOuter1" result="shadowMatrixOuter1" data-v-cfc8cc4d></feColorMatrix><feMerge data-v-cfc8cc4d><feMergeNode in="shadowMatrixOuter1" data-v-cfc8cc4d></feMergeNode><feMergeNode in="SourceGraphic" data-v-cfc8cc4d></feMergeNode></feMerge></filter></defs><mask id="ShortHairShortWaved-mask2" fill="white" data-v-cfc8cc4d><use href="#ShortHairShortWaved-path2" data-v-cfc8cc4d></use></mask><g id="Mask" data-v-cfc8cc4d></g><g id="Top/Short-Hair/Short-Waved" mask="url(&quot;#ShortHairShortWaved-mask2&quot;)" data-v-cfc8cc4d><g transform="translate(-1.000000, 0.000000)" data-v-cfc8cc4d><mask id="ShortHairShortWaved-mask1" fill="white" data-v-cfc8cc4d><use href="#ShortHairShortWaved-path1" data-v-cfc8cc4d></use></mask><use class="CustomColor" stroke="none" fill="var(--avataaar-hair-color)" fillrule="evenodd" href="#ShortHairShortWaved-path1" data-v-cfc8cc4d></use></g></g></g></svg><svg style="${ssrRenderStyle({ "--avataaar-hair-color": "#724133", "--avataaar-facial-hair-color": "#ecdcbf", "--avataaar-hat-color": "#e6e6e6", "--avataaar-shirt-color": "#ff488e" })}" data-v-cfc8cc4d><g id="Facial-Hair/Moustache-Fancy" transform="translate(49.000000, 72.000000)" data-v-cfc8cc4d><defs data-v-cfc8cc4d><path d="M84.0002865,69.2970648 C77.2083681,65.7112456 67.5782013,65.1489138 62.3885276,67.1316942 C56.6144416,69.3374281 51.5052994,75.5829845 42.6388201,72.8283797 C42.2699314,72.7136458 41.9094725,73.0449523 42.0204089,73.408662 C43.3937943,77.9183313 51.0278347,81.0068878 53.6221945,81.1080652 C64.961124,81.549609 74.0949802,72.8302891 84.0002865,72.1614794 C93.9055921,72.8302891 103.03945,81.549609 114.378714,81.1080652 C116.972736,81.0068878 124.607113,77.9183313 125.980498,73.408662 C126.091098,73.0449523 125.730639,72.7136458 125.36175,72.8283797 C116.495271,75.5829845 111.386129,69.3374281 105.612044,67.1316942 C100.422371,65.1489138 90.7922044,65.7112456 84.0002865,69.2970648 Z" id="MoustacheFancy-path1" data-v-cfc8cc4d></path></defs><mask id="MoustacheFancy-mask1" fill="white" data-v-cfc8cc4d><use href="#MoustacheFancy-path1" data-v-cfc8cc4d></use></mask><use class="CustomColor" fill="var(--avataaar-facial-hair-color)" fillrule="evenodd" href="#MoustacheFancy-path1" data-v-cfc8cc4d></use></g></svg><svg data-v-cfc8cc4d><g id="Top/_Resources/Round" fill="none" transform="translate(62.000000, 85.000000)" data-v-cfc8cc4d><defs data-v-cfc8cc4d><path d="M80.4646192,16.3941179 C84.3801509,8.45869677 92.552602,3 102,3 C110.919691,3 118.702887,7.86591082 122.839921,15.0880638 C123.050197,15.0306504 123.271519,15 123.5,15 L131.5,15 C132.880712,15 134,16.1192881 134,17.5 C134,18.8807119 132.880712,20 131.5,20 L124.963126,20 C125.637355,22.2145921 126,24.5649459 126,27 C126,40.254834 115.254834,51 102,51 C88.745166,51 78,40.254834 78,27 C78,25.5781066 78.1236513,24.1850936 78.3607874,22.8311273 C78.2762458,18.4553035 74.9135957,15 70.8624171,15 C67.1256697,15 63.9747186,17.9397535 63.4417635,21.8300629 C63.8073299,23.4951922 64,25.2250958 64,27 C64,40.254834 53.254834,51 40,51 C26.745166,51 16,40.254834 16,27 C16,24.5649459 16.3626451,22.2145921 17.0368738,20 L10.5,20 C9.11928813,20 8,18.8807119 8,17.5 C8,16.1192881 9.11928813,15 10.5,15 L10.5,15 L18.5,15 C18.728481,15 18.9498033,15.0306504 19.1600793,15.0880638 C23.2971127,7.86591082 31.0803092,3 40,3 C49.3521568,3 57.4549431,8.34919095 61.415666,16.15488 C63.4929212,13.0392725 66.9494432,11 70.8624171,11 C74.8746823,11 78.4070368,13.1440781 80.4646192,16.3941179 Z M40,47 C51.045695,47 60,38.045695 60,27 C60,15.954305 51.045695,7 40,7 C28.954305,7 20,15.954305 20,27 C20,38.045695 28.954305,47 40,47 Z M102,47 C113.045695,47 122,38.045695 122,27 C122,15.954305 113.045695,7 102,7 C90.954305,7 82,15.954305 82,27 C82,38.045695 90.954305,47 102,47 Z" id="Round-path1" data-v-cfc8cc4d></path><filter x="-0.8%" y="-2.1%" width="101.6%" height="108.3%" filterUnits="objectBoundingBox" id="filter1" data-v-cfc8cc4d><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" data-v-cfc8cc4d></feOffset><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" type="matrix" in="shadowOffsetOuter1" data-v-cfc8cc4d></feColorMatrix></filter></defs><g id="Lennon-Glasses" data-v-cfc8cc4d><use fill="black" fillopacity="1" filter="url(&quot;#filter1&quot;)" href="#Round-path1" data-v-cfc8cc4d></use><use fill="#252C2F" fillrule="evenodd" href="#Round-path1" data-v-cfc8cc4d></use></g></g></svg></g></g></g></g></svg></div>`);
        } else {
          _push(`<div class="${ssrRenderClass(["w-28", isCurrentUser(item) ? "ml-3" : "mr-3"])}" data-v-cfc8cc4d><img${ssrRenderAttr("src", item.profile)} style="${ssrRenderStyle({ "border-radius": "50%", "width": "100%", "height": "auto" })}" data-v-cfc8cc4d></div>`);
        }
        _push(`<section class="${ssrRenderClass([isCurrentUser(item) ? "current-user-container" : "", "flex-grow"])}" data-v-cfc8cc4d><div class="mb-1" data-v-cfc8cc4d><span class="fs-12 mr-1 fw-600 text-darken" data-v-cfc8cc4d>${ssrInterpolate(item.username)}</span><span class="opacity-70 fs-12 text-muted pl-1" data-v-cfc8cc4d><span data-v-cfc8cc4d>${ssrInterpolate(formatDate2(item.addTime))}</span></span></div><div class="${ssrRenderClass([isCurrentUser(item) ? "current-user-message" : "", "MessageBody mb-1"])}" data-v-cfc8cc4d>${ssrInterpolate(item.content)}</div></section></div>`);
      });
      _push(`<!--]--></div><div class="chat-footer" data-v-cfc8cc4d><div data-v-cfc8cc4d><textarea rows="2" placeholder="尽情畅所欲言把" data-v-cfc8cc4d>${ssrInterpolate(contentarea.value)}</textarea></div><div class="d-flex align-items-center pl-3 clearfix" data-v-cfc8cc4d><a class="nav-link p-0 cursor-pointer" data-v-cfc8cc4d><i class="icon-smile fs-18" data-v-cfc8cc4d></i></a><span data-v-cfc8cc4d><div id="el-popover-4635" role="tooltip" aria-hidden="true" class="el-popover el-popper emoji-popover" style="${ssrRenderStyle({ "width": "undefinedpx", "display": "none" })}" data-v-cfc8cc4d><div class="macwk-emoji" data-v-cfc8cc4d><div class="d-flex nav" data-v-cfc8cc4d><a class="nav-link flex-grow-1 cursor-pointer active" data-v-cfc8cc4d><span data-v-cfc8cc4d><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-cfc8cc4d><path d="M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z" data-v-cfc8cc4d></path><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10" data-v-cfc8cc4d></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-cfc8cc4d><span data-v-cfc8cc4d><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-cfc8cc4d><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10" data-v-cfc8cc4d></path><path d="M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0" data-v-cfc8cc4d></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-cfc8cc4d><span data-v-cfc8cc4d><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-cfc8cc4d><path d="M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8" data-v-cfc8cc4d></path><path d="M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235" data-v-cfc8cc4d></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-cfc8cc4d><span data-v-cfc8cc4d><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-cfc8cc4d><path d="M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9" data-v-cfc8cc4d></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-cfc8cc4d><span data-v-cfc8cc4d><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-cfc8cc4d><path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113" data-v-cfc8cc4d></path></svg></span></a><a class="nav-link flex-grow-1 cursor-pointer" data-v-cfc8cc4d><span data-v-cfc8cc4d><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" width="24" height="24" data-v-cfc8cc4d><path d="M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5" data-v-cfc8cc4d></path><path d="M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z" data-v-cfc8cc4d></path></svg></span></a></div><div class="p-2" data-v-cfc8cc4d><div class="input-group" data-v-cfc8cc4d><input type="text" placeholder="搜索表情……" value="" class="form-control" data-v-cfc8cc4d><div class="search-clear" style="${ssrRenderStyle({ "display": "none" })}" data-v-cfc8cc4d><i class="icon-close" data-v-cfc8cc4d></i></div><div class="input-group-append" data-v-cfc8cc4d><span class="input-group-text" data-v-cfc8cc4d><i class="icon-search" data-v-cfc8cc4d></i></span></div></div></div><div id="viewBox" data-v-cfc8cc4d><div id="recent" class="pl-2 pb-2 mb-2" data-v-cfc8cc4d><h6 data-v-cfc8cc4d>常用</h6><div class="emoji-container" data-v-cfc8cc4d></div></div><div id="people" class="pl-2 pb-2 mb-2" data-v-cfc8cc4d><h6 data-v-cfc8cc4d>表情 &amp; 人物</h6><div class="emoji-container" data-v-cfc8cc4d></div></div><div id="animals_and_nature" class="pl-2 pb-2 mb-2" data-v-cfc8cc4d><h6 data-v-cfc8cc4d>动物 &amp; 自然</h6><div class="emoji-container" data-v-cfc8cc4d></div></div><div id="food_and_drink" class="pl-2 pb-2 mb-2" data-v-cfc8cc4d><h6 data-v-cfc8cc4d>食品 &amp; 饮料</h6><div class="emoji-container" data-v-cfc8cc4d></div></div><div id="activity" class="pl-2 pb-2 mb-2" data-v-cfc8cc4d><h6 data-v-cfc8cc4d>运动</h6><div class="emoji-container" data-v-cfc8cc4d></div></div><div id="travel_and_places" class="pl-2 pb-2 mb-2" data-v-cfc8cc4d><h6 data-v-cfc8cc4d>旅行 &amp; 地点</h6><div class="emoji-container" data-v-cfc8cc4d></div></div></div><div class="emoji-footer b-t px-3 py-2 d-flex align-items-center" data-v-cfc8cc4d><div class="w-60" data-v-cfc8cc4d></div><div class="flex-grow" data-v-cfc8cc4d><span class="fw-300 fs-24" data-v-cfc8cc4d>IceCMS.com</span></div></div></div></div><span class="el-popover__reference-wrapper" data-v-cfc8cc4d></span></span><a href="/Privacy" target="_blank" class="fs-12 ml-5" style="${ssrRenderStyle({ "margin-top": "-2px" })}" data-v-cfc8cc4d>查看隐私政策</a><div class="comment-post flex-grow text-right" data-v-cfc8cc4d><span data-v-cfc8cc4d><button${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} style="${ssrRenderStyle({ "border-top-left-radius": "10px" })}" class="${ssrRenderClass([{ "opacity-50": isSubmitting.value }, "btn btn-theme btn-sm px-5 pt-1 fs-14"])}" data-v-cfc8cc4d>${ssrInterpolate(isSubmitting.value ? "发送中..." : "评论")}</button></span></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ResComment.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-cfc8cc4d"]]), { __name: "ResComment" });
const _imports_16 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='200'%20class='icon'%20version='1.1'%20viewBox='0%200%201024%201024'%3e%3cpath%20fill='%234FA1FF'%20d='M857.28%20344.992h-264.832c12.576-44.256%2018.944-83.584%2018.944-118.208%200-78.56-71.808-153.792-140.544-143.808-60.608%208.8-89.536%2059.904-89.536%20125.536v59.296c0%2076.064-58.208%20140.928-132.224%20148.064l-117.728-0.192A67.36%2067.36%200%200%200%2064%20483.04V872c0%2037.216%2030.144%2067.36%2067.36%2067.36h652.192a102.72%20102.72%200%200%200%20100.928-83.584l73.728-388.96a102.72%20102.72%200%200%200-100.928-121.824zM128%20872V483.04c0-1.856%201.504-3.36%203.36-3.36H208v395.68H131.36A3.36%203.36%200%200%201%20128%20872z%20m767.328-417.088l-73.728%20388.96a38.72%2038.72%200%200%201-38.048%2031.488H272V476.864a213.312%20213.312%200%200%200%20173.312-209.088V208.512c0-37.568%2012.064-58.912%2034.72-62.176%2027.04-3.936%2067.36%2038.336%2067.36%2080.48%200%2037.312-9.504%2084-28.864%20139.712a32%2032%200%200%200%2030.24%2042.496h308.512a38.72%2038.72%200%200%201%2038.048%2045.888z'/%3e%3c/svg%3e";
const _imports_17 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='200'%20class='icon'%20version='1.1'%20viewBox='0%200%201024%201024'%3e%3cpath%20fill='%23d81e06'%20d='M857.28%20344.992h-264.832c12.576-44.256%2018.944-83.584%2018.944-118.208%200-78.56-71.808-153.792-140.544-143.808-60.608%208.8-89.536%2059.904-89.536%20125.536v59.296c0%2076.064-58.208%20140.928-132.224%20148.064l-117.728-0.192A67.36%2067.36%200%200%200%2064%20483.04V872c0%2037.216%2030.144%2067.36%2067.36%2067.36h652.192a102.72%20102.72%200%200%200%20100.928-83.584l73.728-388.96a102.72%20102.72%200%200%200-100.928-121.824zM128%20872V483.04c0-1.856%201.504-3.36%203.36-3.36H208v395.68H131.36A3.36%203.36%200%200%201%20128%20872z%20m767.328-417.088l-73.728%20388.96a38.72%2038.72%200%200%201-38.048%2031.488H272V476.864a213.312%20213.312%200%200%200%20173.312-209.088V208.512c0-37.568%2012.064-58.912%2034.72-62.176%2027.04-3.936%2067.36%2038.336%2067.36%2080.48%200%2037.312-9.504%2084-28.864%20139.712a32%2032%200%200%200%2030.24%2042.496h308.512a38.72%2038.72%200%200%201%2038.048%2045.888z'/%3e%3c/svg%3e";
const getResourceCommentnum = (id) => {
  return useDollarGet(`/WebResourceComment/getResourceCommentnum/${id}`);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    ref(false);
    const videoSource = ref([]);
    const Resource = ref([]);
    const loveCheck = ref(false);
    ref(true);
    const loveNum = ref(0);
    const hits = ref(0);
    const carouselNum = ref(0);
    const commentNum = ref(0);
    const MyEmoge = ref("");
    const showDialog = ref(false);
    const mycomment = ref(true);
    const IsvideoSource = ref(false);
    const carousel = ref([]);
    ref("");
    const sortClasss = ref("");
    const addTime = ref("");
    const createTime = ref("");
    const Theweeks = ref("");
    const payJudge = ref(false);
    const IsFreePrice = ref("");
    const payBtnDisabled = ref(false);
    const orderNo = ref("");
    const codeUrl = ref("");
    const payOrder = reactive({
      productId: "",
      payType: "wxpay"
    });
    const PaymentDialogVisibleLogin = ref(false);
    const PaymentDialogVisibleTemp = ref(false);
    const wxDialogVisible = ref(false);
    const aliDialogVisible = ref(false);
    const intro = ref("");
    const content = ref("");
    const price = ref("");
    const title = ref("");
    const author = ref("");
    const weeks = {
      0: "星期日",
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六"
    };
    const DownloadVisible = ref(false);
    const downloads = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(5);
    const supportedSystems = computed(() => {
      if (downloads.value.length === 0) return "未知";
      const systems = [...new Set(downloads.value.map((d) => d.system))].filter((s) => s && s !== "All");
      if (systems.length === 0 || downloads.value.some((d) => d.system === "All")) return "全平台";
      return systems.join(", ");
    });
    const latestVersion = computed(() => {
      if (downloads.value.length === 0) return "未知";
      return downloads.value[0]?.version || "未知";
    });
    const totalVersions = computed(() => {
      return downloads.value.length;
    });
    const primaryLanguage = computed(() => {
      if (downloads.value.length === 0) return "未知";
      const languages = downloads.value.map((d) => d.language).filter((l) => l);
      const langCount = {};
      languages.forEach((lang) => {
        langCount[lang] = (langCount[lang] || 0) + 1;
      });
      const mostCommon = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0];
      return mostCommon ? mostCommon[0] : "简体中文";
    });
    computed(() => {
      if (downloads.value.length === 0) return "未知";
      const sizes = downloads.value.map((d) => d.size).filter((s) => s && s !== "未知");
      if (sizes.length === 0) return "未知";
      if (sizes.length === 1) return sizes[0];
      return `${sizes[0]}等多种规格`;
    });
    computed(() => {
      if (downloads.value.length > 0) {
        const hasMultipleSystems = downloads.value.some((d) => d.system !== downloads.value[0].system);
        if (hasMultipleSystems) return "跨平台应用";
        const system = downloads.value[0].system;
        switch (system) {
          case "macOS":
            return "Mac应用";
          case "Windows":
            return "Windows应用";
          case "iOS":
            return "iOS应用";
          case "Android":
            return "Android应用";
          case "Linux":
            return "Linux应用";
          default:
            return "软件资源";
        }
      }
      return "软件资源";
    });
    const acticve = ref("nav-link active");
    const setting = ref({});
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    [__temp, __restore] = withAsyncContext(() => handlegetResourceById()), await __temp, __restore();
    async function handlegetResourceById() {
      try {
        const result = await getResourceById(route.params.id);
        Resource.value = result;
        console.log(Resource);
        hits.value = Resource.value.hits ?? 0;
        if (false) ;
        loveNum.value = Resource.value.loveNum ?? 0;
        videoSource.value = Resource.value.resAddress ? [{ src: Resource.value.resAddress, resolution: "1080p" }] : [];
        if (Resource.value.resAddress) {
          IsvideoSource.value = true;
        } else {
          IsvideoSource.value = false;
        }
        try {
          if (Resource.value.resAddress && typeof Resource.value.resAddress === "string") {
            const downloadData = JSON.parse(Resource.value.resAddress);
            if (downloadData.versions && Array.isArray(downloadData.versions)) {
              downloads.value = downloadData.versions;
            }
          }
        } catch (e) {
          if (Resource.value.resAddress) {
            downloads.value = [{
              id: "1",
              version: "v1.0.0",
              language: "简体中文",
              system: "All",
              updateTime: formatDate(Resource.value.addTime),
              size: "未知",
              downloadLink: Resource.value.resAddress,
              description: "默认下载"
            }];
          }
        }
        IsFreePrice.value = Resource.value.price;
        carouselNum.value = Resource.value.carousel ? JSON.parse(Resource.value.carousel).length : 0;
        carousel.value = Resource.value.carousel ? JSON.parse(Resource.value.carousel) : [];
        sortClasss.value = Resource.value.sortClass;
        if (false) ;
        intro.value = Resource.value.intro ?? "";
        content.value = Resource.value.content ?? "";
        price.value = Resource.value.price ?? "";
        title.value = Resource.value.title ?? "";
        author.value = Resource.value.author ?? "";
        addTime.value = formatDate(Resource.value.addTime);
        createTime.value = Resource.value.createTime ? formatDate(Resource.value.createTime) : formatDate(Resource.value.addTime);
        const createTimetest = Resource.value.createTime ? Resource.value.createTime : Resource.value.addTime;
        Theweeks.value = weeks[GetWeekdate(formatDate(createTimetest))];
      } catch (error) {
        console.error("获取资源列表出错:", error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => handlegetResourceCommentnum()), await __temp, __restore();
    async function handlegetResourceCommentnum() {
      try {
        const result = await getResourceCommentnum(route.params.id);
        commentNum.value = result ?? 0;
      } catch (error) {
        console.error("获取资源评论数量出错:", error);
      }
    }
    const showemoge = () => {
      showDialog.value = !showDialog.value;
    };
    const updateDate = () => {
      showDialog.value = false;
      mycomment.value = true;
    };
    const selectPayTypeLogin = (type) => {
      payOrder.payType = type;
      PaymentDialogVisibleLogin.value = false;
      if (type === "alipay") {
        aliDialogVisible.value = true;
        aliPayApi.ftofPayLogin(route.params.id, payOrder.productId).then((response) => {
          codeUrl.value = response.data.data.codeUrl;
          orderNo.value = response.data.data.orderNo;
        });
      } else {
        wxDialogVisible.value = true;
        wxPayApi.nativePayLogin(route.params.id, payOrder.productId).then((response) => {
          codeUrl.value = response.data.data.codeUrl;
          orderNo.value = response.data.data.orderNo;
        });
      }
    };
    const selectPayType = (type) => {
      payOrder.payType = type;
      PaymentDialogVisibleTemp.value = false;
      if (type === "alipay") {
        aliDialogVisible.value = true;
        aliPayApi.ftofPayTemp(route.params.id).then((response) => {
          codeUrl.value = response.data.data.codeUrl;
          orderNo.value = response.data.data.orderNo;
        });
      } else {
        wxDialogVisible.value = true;
        wxPayApi.nativePayTemp(route.params.id).then((response) => {
          codeUrl.value = response.data.data.codeUrl;
          orderNo.value = response.data.data.orderNo;
        });
      }
    };
    const closeDialog = () => {
      payBtnDisabled.value = false;
    };
    const downloadFile = async (downloadLink) => {
    };
    const loadMore = () => {
      currentPage.value++;
    };
    const paginatedDownloads = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return downloads.value.slice(0, end);
    });
    const getSystemClass = (system) => {
      const systemMap = {
        "Windows": "system-windows",
        "macOS": "system-macos",
        "Linux": "system-linux",
        "iOS": "system-ios",
        "Android": "system-android",
        "All": "system-all"
      };
      return systemMap[system] || "system-default";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_top = __nuxt_component_0;
      const _component_el_button = ElButton;
      const _component_el_carousel = ElCarousel;
      const _component_el_carousel_item = ElCarouselItem;
      const _component_client_only = __nuxt_component_2;
      const _component_mobile = __nuxt_component_4;
      const _component_ResComment = __nuxt_component_7;
      const _component_foot = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "Resource" }, _attrs))} data-v-9a1e8286>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        visible: PaymentDialogVisibleLogin.value,
        "show-close": false,
        onClose: closeDialog,
        width: "320px",
        center: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h6 class="outh5" data-v-9a1e8286${_scopeId}>请选择支付方式</h6><div class="swal2-content" data-v-9a1e8286${_scopeId}><div id="swal2-content" style="${ssrRenderStyle({ "display": "block" })}" data-v-9a1e8286${_scopeId}><div class="pay-button-box" data-v-9a1e8286${_scopeId}><div class="pay-item" id="alipay" data-type="1" data-v-9a1e8286${_scopeId}><img style="${ssrRenderStyle({ "margin-right": "14px" })}" height="40" width="40"${ssrRenderAttr("src", _imports_0)} data-v-9a1e8286${_scopeId}><span data-v-9a1e8286${_scopeId}>支付宝</span></div><div class="pay-item" id="weixinpay" data-type="2" data-v-9a1e8286${_scopeId}><img style="${ssrRenderStyle({ "margin": "12px" })}" height="40" width="40"${ssrRenderAttr("src", _imports_1)} data-v-9a1e8286${_scopeId}><span data-v-9a1e8286${_scopeId}>微信支付</span></div><div class="pay-item" id="weixinpay" data-type="2" data-v-9a1e8286${_scopeId}><img style="${ssrRenderStyle({ "margin": "12px" })}" height="40" width="40"${ssrRenderAttr("src", _imports_2)} data-v-9a1e8286${_scopeId}><span data-v-9a1e8286${_scopeId}>积分支付</span></div></div><p style="${ssrRenderStyle({ "font-size": "13px", "padding": "0", "margin": "0" })}" data-v-9a1e8286${_scopeId}></p></div><input class="swal2-input" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><input type="file" class="swal2-file" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><div class="swal2-range" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><input type="range" data-v-9a1e8286${_scopeId}><output data-v-9a1e8286${_scopeId}></output></div><select class="swal2-select" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></select><div class="swal2-radio" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></div><label for="swal2-checkbox" class="swal2-checkbox" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><input type="checkbox" data-v-9a1e8286${_scopeId}><span class="swal2-label" data-v-9a1e8286${_scopeId}></span></label><textarea class="swal2-textarea" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></textarea><div class="swal2-validation-message" id="swal2-validation-message" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("h6", { class: "outh5" }, "请选择支付方式"),
              createVNode("div", { class: "swal2-content" }, [
                createVNode("div", {
                  id: "swal2-content",
                  style: { "display": "block" }
                }, [
                  createVNode("div", { class: "pay-button-box" }, [
                    createVNode("div", {
                      onClick: ($event) => selectPayTypeLogin("alipay"),
                      class: "pay-item",
                      id: "alipay",
                      "data-type": "1"
                    }, [
                      createVNode("img", {
                        style: { "margin-right": "14px" },
                        height: "40",
                        width: "40",
                        src: _imports_0
                      }),
                      createVNode("span", null, "支付宝")
                    ], 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => selectPayTypeLogin("wxpay"),
                      class: "pay-item",
                      id: "weixinpay",
                      "data-type": "2"
                    }, [
                      createVNode("img", {
                        style: { "margin": "12px" },
                        height: "40",
                        width: "40",
                        src: _imports_1
                      }),
                      createVNode("span", null, "微信支付")
                    ], 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => selectPayTypeLogin("wxpay"),
                      class: "pay-item",
                      id: "weixinpay",
                      "data-type": "2"
                    }, [
                      createVNode("img", {
                        style: { "margin": "12px" },
                        height: "40",
                        width: "40",
                        src: _imports_2
                      }),
                      createVNode("span", null, "积分支付")
                    ], 8, ["onClick"])
                  ]),
                  createVNode("p", { style: { "font-size": "13px", "padding": "0", "margin": "0" } })
                ]),
                createVNode("input", {
                  class: "swal2-input",
                  style: { "display": "none" }
                }),
                createVNode("input", {
                  type: "file",
                  class: "swal2-file",
                  style: { "display": "none" }
                }),
                createVNode("div", {
                  class: "swal2-range",
                  style: { "display": "none" }
                }, [
                  createVNode("input", { type: "range" }),
                  createVNode("output")
                ]),
                createVNode("select", {
                  class: "swal2-select",
                  style: { "display": "none" }
                }),
                createVNode("div", {
                  class: "swal2-radio",
                  style: { "display": "none" }
                }),
                createVNode("label", {
                  for: "swal2-checkbox",
                  class: "swal2-checkbox",
                  style: { "display": "none" }
                }, [
                  createVNode("input", { type: "checkbox" }),
                  createVNode("span", { class: "swal2-label" })
                ]),
                createVNode("textarea", {
                  class: "swal2-textarea",
                  style: { "display": "none" }
                }),
                createVNode("div", {
                  class: "swal2-validation-message",
                  id: "swal2-validation-message",
                  style: { "display": "none" }
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        visible: PaymentDialogVisibleTemp.value,
        "show-close": false,
        onClose: closeDialog,
        width: "320px",
        center: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h6 class="outh5" data-v-9a1e8286${_scopeId}>请选择支付方式</h6><div class="swal2-content" data-v-9a1e8286${_scopeId}><div id="swal2-content" style="${ssrRenderStyle({ "display": "block" })}" data-v-9a1e8286${_scopeId}><div class="pay-button-box" data-v-9a1e8286${_scopeId}><div class="pay-item" id="alipay" data-type="1" data-v-9a1e8286${_scopeId}><img style="${ssrRenderStyle({ "margin-right": "14px" })}" height="40" width="40"${ssrRenderAttr("src", _imports_0)} data-v-9a1e8286${_scopeId}><span data-v-9a1e8286${_scopeId}>支付宝</span></div><div class="pay-item" id="weixinpay" data-type="2" data-v-9a1e8286${_scopeId}><img style="${ssrRenderStyle({ "margin": "12px" })}" height="40" width="40"${ssrRenderAttr("src", _imports_1)} data-v-9a1e8286${_scopeId}><span data-v-9a1e8286${_scopeId}>微信支付</span></div></div><p style="${ssrRenderStyle({ "font-size": "13px", "padding": "0", "margin": "0" })}" data-v-9a1e8286${_scopeId}> 当前为游客购买模式 </p></div><input class="swal2-input" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><input type="file" class="swal2-file" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><div class="swal2-range" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><input type="range" data-v-9a1e8286${_scopeId}><output data-v-9a1e8286${_scopeId}></output></div><select class="swal2-select" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></select><div class="swal2-radio" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></div><label for="swal2-checkbox" class="swal2-checkbox" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}><input type="checkbox" data-v-9a1e8286${_scopeId}><span class="swal2-label" data-v-9a1e8286${_scopeId}></span></label><textarea class="swal2-textarea" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></textarea><div class="swal2-validation-message" id="swal2-validation-message" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("h6", { class: "outh5" }, "请选择支付方式"),
              createVNode("div", { class: "swal2-content" }, [
                createVNode("div", {
                  id: "swal2-content",
                  style: { "display": "block" }
                }, [
                  createVNode("div", { class: "pay-button-box" }, [
                    createVNode("div", {
                      onClick: ($event) => selectPayType("alipay"),
                      class: "pay-item",
                      id: "alipay",
                      "data-type": "1"
                    }, [
                      createVNode("img", {
                        style: { "margin-right": "14px" },
                        height: "40",
                        width: "40",
                        src: _imports_0
                      }),
                      createVNode("span", null, "支付宝")
                    ], 8, ["onClick"]),
                    createVNode("div", {
                      onClick: ($event) => selectPayType("wxpay"),
                      class: "pay-item",
                      id: "weixinpay",
                      "data-type": "2"
                    }, [
                      createVNode("img", {
                        style: { "margin": "12px" },
                        height: "40",
                        width: "40",
                        src: _imports_1
                      }),
                      createVNode("span", null, "微信支付")
                    ], 8, ["onClick"])
                  ]),
                  createVNode("p", { style: { "font-size": "13px", "padding": "0", "margin": "0" } }, " 当前为游客购买模式 ")
                ]),
                createVNode("input", {
                  class: "swal2-input",
                  style: { "display": "none" }
                }),
                createVNode("input", {
                  type: "file",
                  class: "swal2-file",
                  style: { "display": "none" }
                }),
                createVNode("div", {
                  class: "swal2-range",
                  style: { "display": "none" }
                }, [
                  createVNode("input", { type: "range" }),
                  createVNode("output")
                ]),
                createVNode("select", {
                  class: "swal2-select",
                  style: { "display": "none" }
                }),
                createVNode("div", {
                  class: "swal2-radio",
                  style: { "display": "none" }
                }),
                createVNode("label", {
                  for: "swal2-checkbox",
                  class: "swal2-checkbox",
                  style: { "display": "none" }
                }, [
                  createVNode("input", { type: "checkbox" }),
                  createVNode("span", { class: "swal2-label" })
                ]),
                createVNode("textarea", {
                  class: "swal2-textarea",
                  style: { "display": "none" }
                }),
                createVNode("div", {
                  class: "swal2-validation-message",
                  id: "swal2-validation-message",
                  style: { "display": "none" }
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div data-v-9a1e8286>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        visible: wxDialogVisible.value,
        "show-close": false,
        onClose: closeDialog,
        width: "320px",
        center: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h5 class="outh5" data-v-9a1e8286${_scopeId}><img${ssrRenderAttr("src", _imports_3)} class="alipaybig_icon" data-v-9a1e8286${_scopeId}></h5><h5 class="outh5" data-v-9a1e8286${_scopeId}><div class="bottom alipay" data-v-9a1e8286${_scopeId}>使用扫码支付 ${ssrInterpolate(price.value / 100)}元</div></h5><h5 class="outh5" data-v-9a1e8286${_scopeId}></h5><div style="${ssrRenderStyle({ "height": "40px" })}" data-v-9a1e8286${_scopeId}></div><h5 class="outh7" data-v-9a1e8286${_scopeId}><div style="${ssrRenderStyle({ "color": "#e0e0e0" })}" class="bottom alipay" data-v-9a1e8286${_scopeId}> 请使用微信扫一扫<br data-v-9a1e8286${_scopeId}>扫描二维码支付<br data-v-9a1e8286${_scopeId}></div></h5>`);
          } else {
            return [
              createVNode("h5", { class: "outh5" }, [
                createVNode("img", {
                  src: _imports_3,
                  class: "alipaybig_icon"
                })
              ]),
              createVNode("h5", { class: "outh5" }, [
                createVNode("div", { class: "bottom alipay" }, "使用扫码支付 " + toDisplayString(price.value / 100) + "元", 1)
              ]),
              createVNode("h5", { class: "outh5" }),
              createVNode("div", { style: { "height": "40px" } }),
              createVNode("h5", { class: "outh7" }, [
                createVNode("div", {
                  style: { "color": "#e0e0e0" },
                  class: "bottom alipay"
                }, [
                  createTextVNode(" 请使用微信扫一扫"),
                  createVNode("br"),
                  createTextVNode("扫描二维码支付"),
                  createVNode("br")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-9a1e8286>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        visible: aliDialogVisible.value,
        "show-close": false,
        onClose: closeDialog,
        width: "320px",
        center: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h5 class="outh5" data-v-9a1e8286${_scopeId}><img${ssrRenderAttr("src", _imports_4)} class="alipaybig_icon" data-v-9a1e8286${_scopeId}></h5><h5 class="outh5" data-v-9a1e8286${_scopeId}><div class="bottom alipay" data-v-9a1e8286${_scopeId}>使用扫码支付 ${ssrInterpolate(price.value / 100)}元</div></h5><h5 class="outh5" data-v-9a1e8286${_scopeId}></h5><div style="${ssrRenderStyle({ "height": "40px" })}" data-v-9a1e8286${_scopeId}></div><h5 class="outh6" data-v-9a1e8286${_scopeId}><div style="${ssrRenderStyle({ "color": "#e0e0e0" })}" class="bottom alipay" data-v-9a1e8286${_scopeId}> 请使用支付宝扫一扫<br data-v-9a1e8286${_scopeId}>扫描二维码支付<br data-v-9a1e8286${_scopeId}></div></h5>`);
          } else {
            return [
              createVNode("h5", { class: "outh5" }, [
                createVNode("img", {
                  src: _imports_4,
                  class: "alipaybig_icon"
                })
              ]),
              createVNode("h5", { class: "outh5" }, [
                createVNode("div", { class: "bottom alipay" }, "使用扫码支付 " + toDisplayString(price.value / 100) + "元", 1)
              ]),
              createVNode("h5", { class: "outh5" }),
              createVNode("div", { style: { "height": "40px" } }),
              createVNode("h5", { class: "outh6" }, [
                createVNode("div", {
                  style: { "color": "#e0e0e0" },
                  class: "bottom alipay"
                }, [
                  createTextVNode(" 请使用支付宝扫一扫"),
                  createVNode("br"),
                  createTextVNode("扫描二维码支付"),
                  createVNode("br")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-server-rendered="true" id="__nuxt" data-v-9a1e8286><div id="__layout" data-v-9a1e8286><div data-fetch-key="0" class="app macwk-animation" data-v-9a1e8286>`);
      _push(ssrRenderComponent(_component_top, { message2: acticve.value }, null, _parent));
      _push(`<div class="overflow-hidden pt-5" data-v-9a1e8286><div class="layout-header pt-5 pb-5 position-relative pc-model" data-v-9a1e8286><div data-v-9a1e8286><img${ssrRenderAttr("src", _imports_5)} class="shape-three" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_6)} class="shape-four" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_7)} class="shape-five" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_8)} class="shape-six" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_9)} class="shape-seven" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_10)} class="shape-eight" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_11)} class="shape-nine" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_12)} class="shape-ten" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_13)} class="shape-eleven" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_14)} class="shape-10" data-v-9a1e8286><img${ssrRenderAttr("src", _imports_15)} class="shape-11" data-v-9a1e8286></div>`);
      if (IsvideoSource.value) {
        _push(`<div class="container" data-v-9a1e8286><div class="row align-items-center" data-v-9a1e8286><div class="col-xs-12 col-lg-6 col-xl-6" data-v-9a1e8286><div class="header-app" data-v-9a1e8286><img class="app-icon mr-3" data-v-9a1e8286><div class="list-body" data-v-9a1e8286><h2 class="mb-4" data-v-9a1e8286>${ssrInterpolate(title.value)}</h2><div class="mb-15" data-v-9a1e8286>`);
        if (!IsFreePrice.value || IsFreePrice.value == "0") {
          _push(ssrRenderComponent(_component_el_button, {
            disabled: payBtnDisabled.value,
            onClick: ($event) => DownloadVisible.value = true,
            class: "large-btn btn btn-theme btn-round w-200 cursor mr-4",
            round: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="el-icon-download" data-v-9a1e8286${_scopeId}></i> 免费下载`);
              } else {
                return [
                  createVNode("i", { class: "el-icon-download" }),
                  createTextVNode(" 免费下载")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div data-v-9a1e8286>`);
          if (!payJudge.value) {
            _push(ssrRenderComponent(_component_el_button, {
              disabled: payBtnDisabled.value,
              onClick: ($event) => DownloadVisible.value = true,
              class: "large-btn btn btn-theme btn-round w-200 cursor mr-4",
              round: ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="el-icon-download" data-v-9a1e8286${_scopeId}></i> 支付下载`);
                } else {
                  return [
                    createVNode("i", { class: "el-icon-download" }),
                    createTextVNode(" 支付下载")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_el_button, {
              disabled: payBtnDisabled.value,
              onClick: ($event) => DownloadVisible.value = true,
              class: "large-btn btn btn-theme btn-round w-200 cursor mr-4",
              round: ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="el-icon-download" data-v-9a1e8286${_scopeId}></i> 立即下载(已支付)`);
                } else {
                  return [
                    createVNode("i", { class: "el-icon-download" }),
                    createTextVNode(" 立即下载(已支付)")
                  ];
                }
              }),
              _: 1
            }, _parent));
          }
          _push(`</div>`);
        }
        _push(ssrRenderComponent(_component_el_dialog, {
          modelValue: DownloadVisible.value,
          "onUpdate:modelValue": ($event) => DownloadVisible.value = $event,
          "show-close": false,
          width: "900px",
          class: "download-dialog",
          "append-to-body": true
        }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="download-header" data-v-9a1e8286${_scopeId}><div class="header-icon" data-v-9a1e8286${_scopeId}><i class="el-icon-download" data-v-9a1e8286${_scopeId}></i></div><div class="header-content" data-v-9a1e8286${_scopeId}><h2 class="header-title" data-v-9a1e8286${_scopeId}>选择下载版本</h2><p class="header-subtitle" data-v-9a1e8286${_scopeId}>请选择适合您设备的版本进行下载</p></div><div class="header-close" data-v-9a1e8286${_scopeId}><i class="el-icon-close" data-v-9a1e8286${_scopeId}></i></div></div>`);
            } else {
              return [
                createVNode("div", { class: "download-header" }, [
                  createVNode("div", { class: "header-icon" }, [
                    createVNode("i", { class: "el-icon-download" })
                  ]),
                  createVNode("div", { class: "header-content" }, [
                    createVNode("h2", { class: "header-title" }, "选择下载版本"),
                    createVNode("p", { class: "header-subtitle" }, "请选择适合您设备的版本进行下载")
                  ]),
                  createVNode("div", {
                    class: "header-close",
                    onClick: ($event) => DownloadVisible.value = false
                  }, [
                    createVNode("i", { class: "el-icon-close" })
                  ], 8, ["onClick"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="download-content" data-v-9a1e8286${_scopeId}><div class="versions-grid" data-v-9a1e8286${_scopeId}><!--[-->`);
              ssrRenderList(paginatedDownloads.value, (item, index) => {
                _push2(`<div class="version-card" data-v-9a1e8286${_scopeId}><div class="version-card-header" data-v-9a1e8286${_scopeId}><div class="version-info" data-v-9a1e8286${_scopeId}><span class="version-number" data-v-9a1e8286${_scopeId}>${ssrInterpolate(item.version)}</span><span class="version-language" data-v-9a1e8286${_scopeId}>${ssrInterpolate(item.language)}</span></div><div class="${ssrRenderClass([getSystemClass(item.system), "system-badge"])}" data-v-9a1e8286${_scopeId}>${ssrInterpolate(item.system)}</div></div><div class="version-card-body" data-v-9a1e8286${_scopeId}><div class="version-details" data-v-9a1e8286${_scopeId}><div class="detail-item" data-v-9a1e8286${_scopeId}><i class="el-icon-date" data-v-9a1e8286${_scopeId}></i><span data-v-9a1e8286${_scopeId}>${ssrInterpolate(item.updateTime)}</span></div><div class="detail-item" data-v-9a1e8286${_scopeId}><i class="el-icon-document" data-v-9a1e8286${_scopeId}></i><span data-v-9a1e8286${_scopeId}>${ssrInterpolate(item.size)}</span></div></div>`);
                if (item.description) {
                  _push2(`<div class="version-description" data-v-9a1e8286${_scopeId}>${ssrInterpolate(item.description)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="version-card-footer" data-v-9a1e8286${_scopeId}><button class="download-btn" data-v-9a1e8286${_scopeId}><i class="el-icon-download" data-v-9a1e8286${_scopeId}></i><span data-v-9a1e8286${_scopeId}>立即下载</span></button></div></div>`);
              });
              _push2(`<!--]--></div>`);
              if (downloads.value.length > paginatedDownloads.value.length) {
                _push2(`<div class="load-more-section" data-v-9a1e8286${_scopeId}><button class="load-more-btn" data-v-9a1e8286${_scopeId}><i class="el-icon-more" data-v-9a1e8286${_scopeId}></i><span data-v-9a1e8286${_scopeId}>加载更多版本</span></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "download-content" }, [
                  createVNode("div", { class: "versions-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(paginatedDownloads.value, (item, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "version-card",
                        onClick: ($event) => downloadFile(item.downloadLink)
                      }, [
                        createVNode("div", { class: "version-card-header" }, [
                          createVNode("div", { class: "version-info" }, [
                            createVNode("span", { class: "version-number" }, toDisplayString(item.version), 1),
                            createVNode("span", { class: "version-language" }, toDisplayString(item.language), 1)
                          ]),
                          createVNode("div", {
                            class: ["system-badge", getSystemClass(item.system)]
                          }, toDisplayString(item.system), 3)
                        ]),
                        createVNode("div", { class: "version-card-body" }, [
                          createVNode("div", { class: "version-details" }, [
                            createVNode("div", { class: "detail-item" }, [
                              createVNode("i", { class: "el-icon-date" }),
                              createVNode("span", null, toDisplayString(item.updateTime), 1)
                            ]),
                            createVNode("div", { class: "detail-item" }, [
                              createVNode("i", { class: "el-icon-document" }),
                              createVNode("span", null, toDisplayString(item.size), 1)
                            ])
                          ]),
                          item.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "version-description"
                          }, toDisplayString(item.description), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "version-card-footer" }, [
                          createVNode("button", { class: "download-btn" }, [
                            createVNode("i", { class: "el-icon-download" }),
                            createVNode("span", null, "立即下载")
                          ])
                        ])
                      ], 8, ["onClick"]);
                    }), 128))
                  ]),
                  downloads.value.length > paginatedDownloads.value.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "load-more-section"
                  }, [
                    createVNode("button", {
                      class: "load-more-btn",
                      onClick: loadMore
                    }, [
                      createVNode("i", { class: "el-icon-more" }),
                      createVNode("span", null, "加载更多版本")
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (!loveCheck.value) {
          _push(`<button class="btn btn-outline-theme btn-round px-5 zanUp position-relative" data-v-9a1e8286><img class="dianzan"${ssrRenderAttr("src", _imports_16)} data-v-9a1e8286> 赞 (${ssrInterpolate(loveNum.value)}) <span class="likeanimation" data-v-9a1e8286>+1</span></button>`);
        } else {
          _push(`<button class="btn btn-outline-theme btn-round px-5 zanUp position-relative" data-v-9a1e8286><img class="dianzan"${ssrRenderAttr("src", _imports_17)} data-v-9a1e8286> 赞 (${ssrInterpolate(loveNum.value)}) <span class="likeanimation" data-v-9a1e8286>+1</span></button>`);
        }
        _push(`</div><div class="mt-4 mb-6" data-v-9a1e8286></div><div class="mt-6 fs-13" data-v-9a1e8286></div></div></div></div><div class="col-xs-12 col-lg-6 col-xl-6 text-center" data-v-9a1e8286><div class="device device-macbook-pro device-silver device-silver" data-v-9a1e8286><div class="device-frame" data-v-9a1e8286>`);
        _push(ssrRenderComponent(_component_el_carousel, { height: "350px" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(carousel.value, (item) => {
                _push2(ssrRenderComponent(_component_el_carousel_item, {
                  key: item.uid
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img style="${ssrRenderStyle({ "height": "360px", "width": "620px", "object-fit": "cover" })}"${ssrRenderAttr("src", item.url)} data-v-9a1e8286${_scopeId2}>`);
                    } else {
                      return [
                        createVNode("img", {
                          style: { "height": "360px", "width": "620px", "object-fit": "cover" },
                          src: item.url
                        }, null, 8, ["src"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(carousel.value, (item) => {
                  return openBlock(), createBlock(_component_el_carousel_item, {
                    key: item.uid
                  }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        style: { "height": "360px", "width": "620px", "object-fit": "cover" },
                        src: item.url
                      }, null, 8, ["src"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="device-stripe" data-v-9a1e8286></div><div class="device-header" data-v-9a1e8286></div><div class="device-sensors" data-v-9a1e8286></div><div class="device-btns" data-v-9a1e8286></div><div class="device-power" data-v-9a1e8286></div></div></div></div></div>`);
      } else {
        _push(`<div class="container" data-v-9a1e8286><div class="row align-items-center" data-v-9a1e8286><div class="col-xs-12 col-lg-6 col-xl-6" data-v-9a1e8286><div class="header-app" data-v-9a1e8286><img class="app-icon mr-3" data-v-9a1e8286><div class="list-body" data-v-9a1e8286><h2 class="mb-4" data-v-9a1e8286>${ssrInterpolate(title.value)}</h2><div class="mb-15" data-v-9a1e8286>`);
        if (!IsFreePrice.value || IsFreePrice.value == "0") {
          _push(ssrRenderComponent(_component_el_button, {
            disabled: payBtnDisabled.value,
            onClick: ($event) => _ctx.Download(),
            class: "large-btn btn btn-theme btn-round w-200 cursor mr-4",
            round: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="el-icon-download" data-v-9a1e8286${_scopeId}></i> 免费下载`);
              } else {
                return [
                  createVNode("i", { class: "el-icon-download" }),
                  createTextVNode(" 免费下载")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div data-v-9a1e8286>`);
          if (!payJudge.value) {
            _push(ssrRenderComponent(_component_el_button, {
              disabled: payBtnDisabled.value,
              onClick: ($event) => _ctx.Download(),
              class: "large-btn btn btn-theme btn-round w-200 cursor mr-4",
              round: ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="el-icon-download" data-v-9a1e8286${_scopeId}></i> 支付下载`);
                } else {
                  return [
                    createVNode("i", { class: "el-icon-download" }),
                    createTextVNode(" 支付下载")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(ssrRenderComponent(_component_el_button, {
              disabled: payBtnDisabled.value,
              onClick: ($event) => _ctx.NowDownload(),
              class: "large-btn btn btn-theme btn-round w-200 cursor mr-4",
              round: ""
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="el-icon-download" data-v-9a1e8286${_scopeId}></i> 立即下载(已支付)`);
                } else {
                  return [
                    createVNode("i", { class: "el-icon-download" }),
                    createTextVNode(" 立即下载(已支付)")
                  ];
                }
              }),
              _: 1
            }, _parent));
          }
          _push(`</div>`);
        }
        if (!loveCheck.value) {
          _push(`<button class="btn btn-outline-theme btn-round px-5 zanUp position-relative" data-v-9a1e8286><img class="dianzan"${ssrRenderAttr("src", _imports_16)} data-v-9a1e8286> 赞 (${ssrInterpolate(loveNum.value)}) <span class="likeanimation" data-v-9a1e8286>+1</span></button>`);
        } else {
          _push(`<button class="btn btn-outline-theme btn-round px-5 zanUp position-relative" data-v-9a1e8286><img class="dianzan"${ssrRenderAttr("src", _imports_17)} data-v-9a1e8286> 赞 (${ssrInterpolate(loveNum.value)}) <span class="likeanimation" data-v-9a1e8286>+1</span></button>`);
        }
        _push(`</div><div class="mt-4 mb-6" data-v-9a1e8286></div><div class="mt-6 fs-13" data-v-9a1e8286></div></div></div></div><div class="col-xs-12 col-lg-6 col-xl-6 text-center" data-v-9a1e8286><div class="device device-macbook-pro device-silver device-silver" data-v-9a1e8286>`);
        if (carouselNum.value === 0) {
          _push(`<div class="device-frame" data-v-9a1e8286>`);
          _push(ssrRenderComponent(_component_el_carousel, { height: "350px" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(1, (item) => {
                  _push2(ssrRenderComponent(_component_el_carousel_item, {
                    key: item.id
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<img style="${ssrRenderStyle({ "height": "360px", "width": "620px" })}"${ssrRenderAttr("src", _ctx.thumb)} data-v-9a1e8286${_scopeId2}><img data-v-9a1e8286${_scopeId2}>`);
                      } else {
                        return [
                          createVNode("img", {
                            style: { "height": "360px", "width": "620px" },
                            src: _ctx.thumb
                          }, null, 8, ["src"]),
                          createVNode("img")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(), createBlock(Fragment, null, renderList(1, (item) => {
                    return createVNode(_component_el_carousel_item, {
                      key: item.id
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          style: { "height": "360px", "width": "620px" },
                          src: _ctx.thumb
                        }, null, 8, ["src"]),
                        createVNode("img")
                      ]),
                      _: 2
                    }, 1024);
                  }), 64))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="device-frame" data-v-9a1e8286>`);
          _push(ssrRenderComponent(_component_el_carousel, { height: "350px" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(carousel.value, (item) => {
                  _push2(ssrRenderComponent(_component_el_carousel_item, {
                    key: item.id
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<img style="${ssrRenderStyle({ "height": "360px", "width": "620px" })}"${ssrRenderAttr("src", item.url)} data-v-9a1e8286${_scopeId2}><img data-v-9a1e8286${_scopeId2}>`);
                      } else {
                        return [
                          createVNode("img", {
                            style: { "height": "360px", "width": "620px" },
                            src: item.url
                          }, null, 8, ["src"]),
                          createVNode("img")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(carousel.value, (item) => {
                    return openBlock(), createBlock(_component_el_carousel_item, {
                      key: item.id
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          style: { "height": "360px", "width": "620px" },
                          src: item.url
                        }, null, 8, ["src"]),
                        createVNode("img")
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`<div class="device-stripe" data-v-9a1e8286></div><div class="device-header" data-v-9a1e8286></div><div class="device-sensors" data-v-9a1e8286></div><div class="device-btns" data-v-9a1e8286></div><div class="device-power" data-v-9a1e8286></div></div></div></div></div>`);
      }
      _push(`</div><div class="soft-layout white bg mb-8 pc-model" data-v-9a1e8286><section class="layout-info" data-v-9a1e8286><div class="app-info shadow-2 white bg text-center" data-v-9a1e8286><div class="w-r" data-v-9a1e8286><div class="w-c w-c-4" data-v-9a1e8286><div class="border-right my-4" data-v-9a1e8286><p class="text-muted text-uppercase fs-10 ls-2 mb-0" data-v-9a1e8286> 下载 </p>`);
      if (hits.value == null) {
        _push(`<p class="mb-0 fs-20 font-weight-bolder line-height-3 opacity-70" data-v-9a1e8286> 0 </p>`);
      } else {
        _push(`<p class="mb-0 fs-20 font-weight-bolder line-height-3 opacity-70" data-v-9a1e8286>${ssrInterpolate(hits.value)}</p>`);
      }
      _push(`<p class="text-uppercase fs-10 ls-2 mb-0 opacity-70" data-v-9a1e8286> 次 </p></div></div><div class="w-c w-c-4" data-v-9a1e8286><div class="border-right my-4" data-v-9a1e8286><p class="text-muted text-uppercase fs-10 ls-2 mb-0" data-v-9a1e8286> 语言 </p><p class="mb-0 fs-20 font-weight-bolder line-height-3 opacity-70" data-v-9a1e8286><span class="text-inherit" data-v-9a1e8286>${ssrInterpolate(primaryLanguage.value)}</span></p><p class="text-uppercase fs-10 ls-2 mb-0 opacity-70" data-v-9a1e8286> cn </p></div></div><div class="w-c w-c-4" data-v-9a1e8286><div class="border-right my-4" data-v-9a1e8286><p class="text-muted text-uppercase fs-10 ls-2 mb-0" data-v-9a1e8286> 系统 </p><p class="mb-0 fs-20 font-weight-bolder line-height-3 opacity-70" data-v-9a1e8286>${ssrInterpolate(supportedSystems.value)}</p><p class="text-uppercase fs-10 ls-2 mb-0 opacity-70" data-v-9a1e8286> platform </p></div></div><div class="w-c w-c-4" data-v-9a1e8286><div class="border-right my-4" data-v-9a1e8286><p class="text-muted text-uppercase fs-10 ls-2 mb-0" data-v-9a1e8286> 版本 </p><p class="mb-0 fs-20 font-weight-bolder line-height-3 opacity-70" data-v-9a1e8286>${ssrInterpolate(latestVersion.value)}</p><p class="fs-10 ls-2 mb-0 opacity-70" data-v-9a1e8286>${ssrInterpolate(totalVersions.value)} 个版本</p></div></div><div class="w-c w-c-4" data-v-9a1e8286><div class="border-right my-4" data-v-9a1e8286><p class="text-muted text-uppercase fs-10 ls-2 mb-0" data-v-9a1e8286> 类别 </p>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`<p class="fs-10 ls-2 mb-0 opacity-70" data-v-9a1e8286>enhancement</p></div></div><div class="w-c w-c-4" data-v-9a1e8286><div class="my-4" data-v-9a1e8286><p class="text-uppercase fs-10 ls-2 mb-0 opacity-40" data-v-9a1e8286> 更新日期 </p>`);
      if (createTime.value != null) {
        _push(`<p class="mb-0 fs-20 font-weight-bolder line-height-3 opacity-70" data-v-9a1e8286>${ssrInterpolate(createTime.value)}</p>`);
      } else {
        _push(`<p class="mb-0 fs-20 font-weight-bolder line-height-3 opacity-70" data-v-9a1e8286>${ssrInterpolate(addTime.value)}</p>`);
      }
      _push(`<p class="text-uppercase fs-10 ls-2 mb-0 opacity-70" data-v-9a1e8286>${ssrInterpolate(Theweeks.value)}</p></div></div></div></div></section><section class="layout-content" data-v-9a1e8286><div id="step-read" class="layout-content-install pt-7 mb-5" data-v-9a1e8286></div><div id="step-content" class="layout-content-infos" data-v-9a1e8286><div class="container" data-v-9a1e8286><div class="content-header" data-v-9a1e8286><div class="h-150 w-r is-align-middle w-r--flex" data-v-9a1e8286><div class="w-c w-c-2" data-v-9a1e8286><svg width="80" height="70" viewBox="0 0 125 107" xmlns="http://www.w3.org/2000/svg" data-v-9a1e8286><g fill="none" fill-rule="evenodd" data-v-9a1e8286><circle cx="48" cy="59" r="48" class="circle-fill" data-v-9a1e8286></circle><path d="M58.536 39.713c0-6.884 1.72-14.007 5.163-21.368 3.443-7.36 8.167-13.458 14.173-18.292l11.645 7.91c-3.589 4.98-6.262 10.016-8.02 15.106S78.86 33.598 78.86 39.384v13.623H58.536V39.713z" class="path-fill" data-v-9a1e8286></path><path d="M93.252 39.713c0-6.884 1.722-14.007 5.164-21.368 3.442-7.36 8.166-13.458 14.172-18.292l11.646 7.91c-3.589 4.98-6.262 10.016-8.02 15.106s-2.637 10.529-2.637 16.315v13.623H93.252V39.713z" class="path-fill-1" data-v-9a1e8286></path></g></svg></div><div class="w-c w-c-22" data-v-9a1e8286><h3 data-v-9a1e8286> 正文概述 </h3></div></div></div><div data-v-9a1e8286><div class="soft-blockquote fw-400" data-v-9a1e8286><div data-v-9a1e8286><p data-v-9a1e8286>${ssrInterpolate(intro.value)}</p></div></div></div><div id="sidelist" data-v-9a1e8286>${content.value ?? ""}</div></div></div></section></div>`);
      _push(ssrRenderComponent(_component_mobile, null, null, _parent));
      _push(`<div class="el-dialog__wrapper text-center" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286><div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog no-bg no-shadow" style="${ssrRenderStyle({ "margin-top": "15vh", "width": "1300px" })}" data-v-9a1e8286><div class="el-dialog__header" data-v-9a1e8286><span class="el-dialog__title" data-v-9a1e8286></span><button type="button" aria-label="Close" class="el-dialog__headerbtn" data-v-9a1e8286><i class="el-dialog__close el-icon el-icon-close" data-v-9a1e8286></i></button></div></div></div><div id="sidetools" class="macwk-animation tinUpIn" style="${ssrRenderStyle({ "display": "none" })}" data-v-9a1e8286><div class="sidetools-item" data-v-9a1e8286><div class="sidetools-wrapper" data-v-9a1e8286><a href="https://t.me/macwk" target="_blank" class="cursor" data-v-9a1e8286><span class="sidetools-icon kfqq" data-v-9a1e8286></span></a></div></div><div class="sidetools-item" data-v-9a1e8286><div class="sidetools-wrapper" data-v-9a1e8286><a class="el-tooltip cursor" data-v-9a1e8286><span class="sidetools-icon back-top" data-v-9a1e8286></span></a></div></div><span data-v-9a1e8286><div role="tooltip" id="el-popover-6929" aria-hidden="true" class="el-popover el-popper" style="${ssrRenderStyle({ "width": "200px", "display": "none" })}" data-v-9a1e8286><div class="text-center" data-v-9a1e8286><a href="/feedback" class="mt-15 mb-0" data-v-9a1e8286>在线留言</a></div></div><span class="el-popover__reference-wrapper" data-v-9a1e8286></span></span><span data-v-9a1e8286><div role="tooltip" id="el-popover-3926" aria-hidden="true" class="el-popover el-popper" style="${ssrRenderStyle({ "width": "200px", "display": "none" })}" data-v-9a1e8286><div class="text-center" data-v-9a1e8286><a href="/feedback" class="mt-15 mb-0" data-v-9a1e8286>在线留言</a></div></div><span class="el-popover__reference-wrapper" data-v-9a1e8286></span></span></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      if (mycomment.value) {
        _push(`<section class="fiexd-comments-bar d-flex align-items-center is-scroll macwk-animation slow pc-model tinRightIn" data-v-9a1e8286><div class="d-flex align-items-center fs-20 fw-700 cursor-pointer w-full pl-3" data-v-9a1e8286><div class="flex" data-v-9a1e8286> 共 <span class="fs-36 mx-1" data-v-9a1e8286>${ssrInterpolate(commentNum.value || 0)}</span> 条评论 </div><svg color="inherit" viewbox="0 0 32 32" class="w-32" style="${ssrRenderStyle({ "width": "1.5em", "height": "1.5em", "font-size": "2rem", "vertical-align": "-6px" })}" data-v-9a1e8286><path fill="#FFFFFF" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46" data-v-9a1e8286></path><path d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="comment-icon-path" data-v-9a1e8286></path></svg></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (!mycomment.value) {
        _push(ssrRenderComponent(_component_ResComment, {
          resourceId: _ctx.$route.params.id,
          theEmoge: MyEmoge.value,
          ref: "child",
          onClosethecpmmentName: ($event) => updateDate(),
          onOpenthecpmmentName: ($event) => showemoge()
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-9a1e8286><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-9a1e8286></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/List/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a1e8286"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-B3FOqFSn.mjs.map
