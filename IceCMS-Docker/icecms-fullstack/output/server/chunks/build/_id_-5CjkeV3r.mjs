import { _ as __nuxt_component_0, a as __nuxt_component_2, E as ElAvatar, e as _imports_0, f as ElPopover } from './Top-z7S4M5x-.mjs';
import { defineComponent, ref, reactive, withAsyncContext, watch, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, unref, withModifiers, withDirectives, vShow, shallowRef, computed, createElementBlock, normalizeStyle, normalizeClass, renderSlot, useSlots, useSSRContext } from 'vue';
import { n as withNoopInstall, E as ElButton, _ as _export_sfc$1, w as withInstall } from './el-button-LIU117i9.mjs';
import { _ as _export_sfc, F as defineStore, O as storeToRefs, u as useSettingStore, h as useDollarGet, U as __nuxt_component_2$1, J as useFetchPost, e as useNamespace } from './server.mjs';
import { E as ElImage } from './el-image-viewer-Cf39pgBV.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useUserStore } from './useUserStore-gmH42dcJ.mjs';
import { h as httpRequest } from './index-uy8e5Xzu.mjs';
import { a as getArticleClassByotherName, g as getSquareClasslist } from './websquareClass-C9NX0NxG.mjs';
import { g as getAnnouncementslistByNum } from './webannouncements-Cw9vJNJn.mjs';
import { c as getUserInfobyid } from './webuser-CDNs4gr0.mjs';
import { E as ElMessage } from './index-D2_eFSsF.mjs';
import './el-overlay-D0BXiGeq.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';
import 'perfect-debounce';

const __default__$4 = defineComponent({
  name: "ElContainer"
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: {
    direction: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("container");
    const isVertical = computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        class: normalizeClass([unref(ns).b(), unref(ns).is("vertical", unref(isVertical))])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Container = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["__file", "container.vue"]]);
const __default__$3 = defineComponent({
  name: "ElAside"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("aside");
    const style = computed(() => props.width ? ns.cssVarBlock({ width: props.width }) : {});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(unref(style))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var Aside = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["__file", "aside.vue"]]);
const __default__$2 = defineComponent({
  name: "ElFooter"
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("footer");
    const style = computed(() => props.height ? ns.cssVarBlock({ height: props.height }) : {});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(unref(style))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var Footer = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__file", "footer.vue"]]);
const __default__$1 = defineComponent({
  name: "ElHeader"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("header");
    const style = computed(() => {
      return props.height ? ns.cssVarBlock({
        height: props.height
      }) : {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(unref(style))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var Header = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "header.vue"]]);
const __default__ = defineComponent({
  name: "ElMain"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    const ns = useNamespace("main");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", {
        class: normalizeClass(unref(ns).b())
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Main = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "main.vue"]]);
withInstall(Container, {
  Aside,
  Footer,
  Header,
  Main
});
const ElAside = withNoopInstall(Aside);
withNoopInstall(Footer);
withNoopInstall(Header);
const ElMain = withNoopInstall(Main);
const usePlanetStore = defineStore("planet", {
  state: () => ({
    // 当前选中的筛选类型: 'all', 'recent', 'hot'
    filterType: "all",
    // 加载状态
    isLoading: false,
    // 当前页码
    currentPage: 1,
    // 每页数量
    pageSize: 6,
    // 总数
    total: 0
  }),
  getters: {
    // 获取当前筛选类型的显示文本
    filterTypeText() {
      const typeMap = {
        all: "全部",
        recent: "最近",
        hot: "热门"
      };
      return typeMap[this.filterType] || "全部";
    },
    // 检查是否为指定类型
    isFilterType: (state) => (type) => {
      return state.filterType === type;
    }
  },
  actions: {
    // 设置筛选类型
    setFilterType(type) {
      this.filterType = type;
      this.currentPage = 1;
    },
    // 设置加载状态
    setLoading(loading) {
      this.isLoading = loading;
    },
    // 设置分页信息
    setPagination(page, total) {
      this.currentPage = page;
      this.total = total;
    },
    // 重置到初始状态
    reset() {
      this.filterType = "all";
      this.isLoading = false;
      this.currentPage = 1;
      this.total = 0;
    }
  }
});
const createSquare = (data) => {
  console.log("发送了1次");
  return useFetchPost("/Websquare/create", data);
};
const getAllSquare = (otherName, page, limit, type = "all") => useDollarGet(`/Websquare/getAllSquare/${otherName}/${page}/${limit}?type=${type}`);
const likeClickComments = (id) => {
  return httpRequest.get(`/Websquare/likeClickComment/${id}`);
};
const getPlanetIdComment = (id) => {
  return useDollarGet(`/WebSquareComment/getPlanetIdComment/${id}`);
};
const addPlanetComment = (data) => {
  return useFetchPost("/WebSquareComment/addPlanetComment", data);
};
const likeClickComment = (id) => {
  return useDollarGet(`/WebSquareComment/likeClickComment/${id}`);
};
const EmojiArr = [
  "daxiao",
  "jingxia",
  "ku_1",
  "qushi",
  "tushe",
  "dianyan",
  "jingya",
  "kunao",
  "se",
  "weixiao",
  "fadai",
  "kouzhao",
  "liuhan",
  "shengbing",
  "xiaoku",
  "jinchi",
  "ku",
  "qinqin",
  "tianshi",
  "yihuo"
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: ["show", "append", "clearCache"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    ref(EmojiArr);
    ref();
    const lastClickedEmoji = ref("");
    const lastClickTime = ref(0);
    function clearSelectionCache() {
      lastClickedEmoji.value = "";
      lastClickTime.value = 0;
      emit("clearCache");
      console.log("Emoji selection cache cleared");
    }
    __expose({
      clearSelectionCache
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/emoji/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const EmojiPicker = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-bb7279c7"]]), { __name: "Emoji" });
const useInput = () => {
  const commenterRef = shallowRef(null);
  const richInputRef = shallowRef(null);
  const inputFocus = ref(false);
  const placeholder = ref("快来说两句吧...");
  const inputLength = ref(0);
  const onRichFocus = () => {
    richInputRef.value?.focus();
  };
  const onInputText = () => {
    const inputNode = richInputRef.value;
    if (!inputNode) return;
    let textLength = 0;
    for (const child of inputNode.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const textContent = child.textContent || "";
        textLength += textContent.trim().length;
        console.log(textContent);
      }
      if (child.nodeName === "DIV") {
        const outerText = child.outerText || "";
        textLength += outerText.trim().length;
      }
      if (child.nodeType === 1) {
        textLength += 1;
      }
    }
    inputLength.value = textLength;
    if (textLength) {
      placeholder.value = "";
    } else {
      placeholder.value = "快来说两句吧...";
    }
  };
  const clearInputText = () => {
    inputLength.value = 0;
    richInputRef.value.innerHTML = "";
  };
  const moveCursorToEnd = () => {
    const richInput = richInputRef.value;
    richInput.focus();
    const range = (void 0).createRange();
    const sel = (void 0).getSelection();
    range.selectNodeContents(richInput);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };
  return {
    commenterRef,
    richInputRef,
    inputFocus,
    placeholder,
    inputLength,
    onRichFocus,
    onInputText,
    clearInputText,
    moveCursorToEnd
  };
};
const useEmoji = () => {
  const richRange = ref(null);
  const appendEmoji = async (emoji) => {
    richRange.value = await getRichRange();
    const editorRange = richRange.value.range;
    const textNode = editorRange.endContainer;
    const endOffset = editorRange.endOffset;
    if (editorRange.commonAncestorContainer?.dataset?.placeholder) {
      editorRange.commonAncestorContainer.dataset.placeholder = "";
    }
    editorRange.setStart(textNode, endOffset);
    editorRange.setEnd(textNode, endOffset);
    editorRange.deleteContents();
    const emojiDom = createEmojiElement(emoji);
    insertHtmlEmojiAtCaret(
      emojiDom,
      richRange.value.selection,
      richRange.value.range
    );
  };
  const createEmojiElement = (emoji) => {
    const emojiDom = (void 0).createElement("img");
    emojiDom.setAttribute("src", `/emoji/${emoji}.png`);
    emojiDom.setAttribute(
      "style",
      `width: 24px; height: 24px; transform: scale(0.9); cursor: default;`
    );
    return emojiDom;
  };
  const insertHtmlEmojiAtCaret = (html, selection, range) => {
    if (range && selection) {
      const el = (void 0).createElement("div");
      if (typeof html === "string") {
        el.innerHTML = html;
      } else if (Array.isArray(html)) {
        html.forEach((item) => {
          el.appendChild(item);
        });
      } else {
        el.appendChild(html);
      }
      const frag = (void 0).createDocumentFragment();
      let node;
      let lastNode;
      while (node = el.firstChild) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(html);
      if (lastNode) {
        selection.collapseToEnd();
      }
    }
  };
  const getRichRange = () => {
    return new Promise((resolve, reject) => {
      const selection = (void 0).getSelection();
      if (selection.getRangeAt && selection.rangeCount) {
        const range = selection.getRangeAt(0);
        resolve({
          range,
          selection
        });
      } else {
        reject(null);
      }
    });
  };
  return { appendEmoji };
};
const useUpload = () => {
  const fileList = ref([]);
  const onUpload = (result) => {
    fileList.value.push(result.uri);
  };
  const removeFile = (index) => {
    fileList.value.splice(index, 1);
  };
  return {
    fileList,
    onUpload,
    removeFile
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  props: {
    pid: { default: "" },
    reply_id: { default: "" }
  },
  emits: ["blur", "submit"],
  async setup(__props, { expose: __expose, emit: __emit }) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const planetStore = usePlanetStore();
    const { filterType, isLoading: storeLoading } = storeToRefs(planetStore);
    function renderEmojiContent(content) {
      if (!content) return "";
      const emojiRegex = /\[([^\]]+?)\]/g;
      return content.replace(emojiRegex, (match, emojiName) => {
        return `<img src="/emoji/${emojiName}.png" class="emoji-icon" alt="${emojiName}" style="width: 24px; height: 24px; vertical-align: middle;" />`;
      });
    }
    const announcementsList = ref([]);
    ref(false);
    const pagetotal = ref(0);
    const isLoading = ref(false);
    const isSubmitting = ref(false);
    ref("");
    const userJudje = ref(false);
    ref(false);
    ref([]);
    ref(new FormData());
    const sentence = ref("");
    const page = ref(1);
    ref("");
    ref(false);
    const planetInfo = ref({});
    const classlist = ref([]);
    const squaredata = ref([]);
    const isClient = ref(false);
    const postForm = reactive({
      image: [],
      isLock: false,
      content: "",
      author: "",
      sortClass: ""
    });
    const postReplyForm = reactive({
      content: "",
      parentId: "",
      userId: "",
      postId: ""
    });
    const postReplysForm = reactive({
      content: "",
      parentId: "",
      userId: "",
      postId: ""
    });
    const postReplysToUserForm = reactive({
      content: "",
      parentId: "",
      userId: "",
      toUserId: "",
      postId: ""
    });
    const shownologin = ref(false);
    const comment = ref([]);
    const acticve = ref("nav-link active");
    const setting = ref({});
    const emit = __emit;
    const {
      commenterRef,
      // 根元素实力
      richInputRef,
      // 输入框实力
      inputFocus,
      // 输入框聚焦
      placeholder,
      // 描述
      inputLength,
      // 输入长度
      onRichFocus,
      // 事件-聚焦输入框
      onInputText,
      // 事件-输入文字
      clearInputText,
      // 事件-清空输入框文字
      moveCursorToEnd
      // 移动光标至最后
    } = useInput();
    [__temp, __restore] = withAsyncContext(() => handlegetAnnouncementslistByNum()), await __temp, __restore();
    async function handlegetAnnouncementslistByNum() {
      try {
        const result = await getAnnouncementslistByNum(4);
        announcementsList.value = result;
      } catch (error) {
        console.error("获取Announcementslist出错:", error);
      }
    }
    const { appendEmoji } = useEmoji();
    const { fileList } = useUpload();
    watch(
      inputFocus,
      (value) => {
        if (value == true) return;
        setTimeout(() => {
          emit("blur");
        }, 300);
      },
      { immediate: false }
    );
    const onSend = async () => {
      if (inputLength.value >= 1e3) {
        ElMessage.warning("字数超过限制，请删减后发送");
        return;
      }
      if (isSubmitting.value) {
        ElMessage.warning("正在发布中，请勿重复点击");
        return;
      }
      const content = richInputRef.value.innerHTML;
      const regex = /<img src="\/emoji\/(.+?)".*?>/g;
      let replacedStr = content;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const emojiUrl = match[1];
        const emojiText = `[${emojiUrl.split("/").pop().split(".")[0]}]`;
        replacedStr = replacedStr.replace(match[0], emojiText);
      }
      if (!replacedStr.trim() && fileList.value.length === 0) {
        ElMessage.warning("请输入内容或上传图片");
        return;
      }
      const userStore = useUserStore();
      if (!userStore.userid) {
        ElMessage.warning("请先登录");
        shownologin.value = true;
        return;
      }
      isSubmitting.value = true;
      try {
        postForm.content = replacedStr;
        postForm.author = userStore.userid;
        postForm.sortClass = route.params.id || "";
        postForm.image = JSON.stringify(fileList.value.map((file) => ({ url: file.url, name: file.name })));
        const squareId = route.params.id || "circle";
        await createSquare(postForm);
        clearInputContent();
        postForm.content = "";
        postForm.image = "[]";
        await fetchData();
        ElMessage.success("发表成功");
      } catch (error) {
        console.error("发布失败:", error);
        ElMessage.error("发布失败，请重试");
      } finally {
        setTimeout(() => {
          isSubmitting.value = false;
        }, 1e3);
      }
    };
    const onPasteContent = async (event) => {
      event.preventDefault();
      const text = (event.originalEvent || event).clipboardData.getData(
        "text/plain"
      );
      (void 0).execCommand("insertText", false, text);
    };
    const clearInputContent = () => {
      clearInputText();
      fileList.value = [];
    };
    __expose({ onRichFocus, clearInputContent });
    const settingStore = useSettingStore();
    setting.value = settingStore.settings;
    watch(() => route.params.id, () => {
      planetStore.reset();
      fetchData();
    });
    const fetchData = async (type) => {
      squaredata.value = [];
      page.value = 1;
      if (type) {
        planetStore.setFilterType(type);
      }
      await handlegetSquare();
    };
    async function handlegetSquare() {
      if (squaredata.value.length !== pagetotal.value) {
        isLoading.value = true;
        planetStore.setLoading(true);
      }
      try {
        const squareResponse = await getAllSquare(route.params.id, page.value, 6, filterType.value);
        pagetotal.value = squareResponse.total;
        planetStore.setPagination(page.value, squareResponse.total);
        squaredata.value = squaredata.value.concat(squareResponse.data.map((item) => {
          item.image = JSON.parse(item.image);
          return item;
        }));
        const response = await getArticleClassByotherName(route.params.id);
        planetInfo.value = response;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
        planetStore.setLoading(false);
      }
    }
    [__temp, __restore] = withAsyncContext(() => handlgetSquareClasslist()), await __temp, __restore();
    async function handlgetSquareClasslist() {
      try {
        const response = await getSquareClasslist();
        classlist.value = response;
        if (!route.params.id && classlist.value.length > 0) {
          router.push({ path: `/planet/${classlist.value[0].id}` });
        }
      } catch (error) {
        console.error(error);
      }
    }
    const getTime = (time) => {
      const now = /* @__PURE__ */ new Date();
      const nowTime = now.getTime();
      const timeTime = new Date(time).getTime();
      const timeDiff = nowTime - timeTime;
      const dayDiff = Math.floor(timeDiff / (24 * 3600 * 1e3));
      const yearDiff = Math.floor(timeDiff / (24 * 3600 * 1e3 * 365));
      if (dayDiff === 0) {
        if (Math.floor(timeDiff / (3600 * 1e3)) === 0) {
          return Math.floor(timeDiff / (60 * 1e3)) === 0 ? "刚刚" : `${Math.floor(timeDiff / (60 * 1e3))}分钟前`;
        } else {
          return `${Math.floor(timeDiff / (3600 * 1e3))}小时前`;
        }
      } else if (dayDiff === 1) {
        return "昨天";
      } else if (dayDiff === 2) {
        return "前天";
      } else if (dayDiff > 2 && dayDiff < 7) {
        return "最近一周";
      } else if (yearDiff === 1) {
        return "去年";
      } else if (yearDiff > 1) {
        return `${yearDiff}年前`;
      } else {
        return new Date(time).toLocaleDateString();
      }
    };
    const likeClick = async (item) => {
      if (!item.isLike) {
        item.isLike = true;
        item.loveNum++;
        await likeClickComment(item.id);
      } else {
        item.isLike = false;
        item.loveNum--;
      }
    };
    const shareUrl = ref("");
    const shareTitle = ref("社区动态 - IceCMS");
    const shareDescription = ref("发现更多有趣内容，参与社区讨论");
    const showHelpModal = ref(false);
    const helpModalType = ref("");
    const helpModalTitle = ref("");
    const helpModalContent = ref("");
    const helpContents = {
      create: {
        title: "怎么创建圈子？",
        content: `
      <div class="help-content">
        <h3>创建圈子指南</h3>
        <div class="step-list">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>准备工作</h4>
              <p>确保您已经完成实名认证，并且账户状态正常。新用户需要注册满7天才能创建圈子。</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>提交申请</h4>
              <p>点击"创建圈子"按钮，填写圈子名称、描述、分类等基本信息。圈子名称需要具有独特性，不能与现有圈子重复。</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>审核流程</h4>
              <p>提交申请后，管理员会在1-3个工作日内完成审核。审核通过后，您将收到通知，圈子正式开放。</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>圈子管理</h4>
              <p>作为圈主，您可以邀请管理员、制定圈子规则、管理成员、发布公告等。请确保圈子内容健康、积极。</p>
            </div>
          </div>
        </div>
        <div class="help-tips">
          <h4>💡 小贴士</h4>
          <ul>
            <li>圈子名称建议简洁明了，便于用户理解和搜索</li>
            <li>详细的圈子描述有助于吸引更多志同道合的用户</li>
            <li>选择合适的分类能让更多用户发现您的圈子</li>
            <li>定期发布优质内容，活跃圈子氛围</li>
          </ul>
        </div>
      </div>
    `
      },
      communication: {
        title: "如何进行沟通？",
        content: `
      <div class="help-content">
        <h3>圈子沟通指南</h3>
        <div class="comm-section">
          <h4>🗣️ 发布动态</h4>
          <ul>
            <li>在圈子首页点击发布框，分享您的想法、经验或问题</li>
            <li>支持文字、图片、链接等多种内容形式</li>
            <li>使用话题标签，让内容更容易被发现</li>
            <li>遵守圈子规则，发布有价值的内容</li>
          </ul>
        </div>
        
        <div class="comm-section">
          <h4>💬 评论互动</h4>
          <ul>
            <li>在感兴趣的动态下方进行评论</li>
            <li>可以回复其他用户的评论，形成讨论</li>
            <li>使用表情包让交流更生动有趣</li>
            <li>尊重他人观点，保持友善讨论</li>
          </ul>
        </div>
        
        <div class="comm-section">
          <h4>👍 点赞收藏</h4>
          <ul>
            <li>对喜欢的内容点赞，表达支持</li>
            <li>收藏有价值的内容，方便日后查看</li>
            <li>分享优质内容给更多朋友</li>
          </ul>
        </div>
        
        <div class="comm-section">
          <h4>🔔 消息通知</h4>
          <ul>
            <li>及时查看系统通知和私信</li>
            <li>关注感兴趣的用户，获取最新动态</li>
            <li>开启推送通知，不错过重要消息</li>
          </ul>
        </div>
        
        <div class="help-tips">
          <h4>💡 沟通技巧</h4>
          <ul>
            <li>保持积极正面的沟通态度</li>
            <li>用事实和逻辑支撑观点</li>
            <li>避免人身攻击和恶意言论</li>
            <li>多倾听他人意见，开放讨论</li>
          </ul>
        </div>
      </div>
    `
      },
      terms: {
        title: "圈子条款",
        content: `
      <div class="help-content">
        <h3>IceCMS 圈子服务条款</h3>
        
        <div class="terms-section">
          <h4>第一条 服务说明</h4>
          <p>IceCMS圈子是为用户提供的社区交流服务平台。用户可以在圈子中发布内容、参与讨论、分享经验等。</p>
        </div>
        
        <div class="terms-section">
          <h4>第二条 用户行为规范</h4>
          <ol>
            <li><strong>内容规范：</strong>不得发布违法、有害、虚假、侵权的内容</li>
            <li><strong>言论规范：</strong>保持文明用语，不得进行人身攻击或恶意诽谤</li>
            <li><strong>版权规范：</strong>尊重他人知识产权，不得未经授权转载他人作品</li>
            <li><strong>隐私规范：</strong>不得泄露他人隐私信息</li>
          </ol>
        </div>
        
        <div class="terms-section">
          <h4>第三条 圈主权利与义务</h4>
          <ol>
            <li><strong>管理权利：</strong>圈主有权制定圈子规则、管理成员、删除违规内容</li>
            <li><strong>维护义务：</strong>圈主应维护圈子秩序，确保内容健康积极</li>
            <li><strong>责任义务：</strong>对圈子内违法违规行为承担管理责任</li>
          </ol>
        </div>
        
        <div class="terms-section">
          <h4>第四条 平台权利</h4>
          <ol>
            <li>对违规内容进行删除、屏蔽处理</li>
            <li>对违规用户进行警告、限制、封禁等处理</li>
            <li>对违规圈子进行整改、关闭等处理</li>
            <li>根据法律法规要求配合相关部门调查</li>
          </ol>
        </div>
        
        <div class="terms-section">
          <h4>第五条 免责声明</h4>
          <p>平台不对用户发布的内容承担法律责任，用户应对自己的言行负责。因用户违规行为导致的任何法律后果，由用户自行承担。</p>
        </div>
        
        <div class="terms-section">
          <h4>第六条 条款变更</h4>
          <p>平台有权根据法律法规变化和业务发展需要修改本条款。修改后的条款将在平台公布，用户继续使用服务即视为同意新条款。</p>
        </div>
        
        <div class="terms-section">
          <h4>第七条 联系方式</h4>
          <p>如有疑问或建议，请通过以下方式联系我们：</p>
          <ul>
            <li>邮箱：support@icecms.cn</li>
            <li>客服QQ：123456789</li>
            <li>工作时间：周一至周五 9:00-18:00</li>
          </ul>
        </div>
        
        <div class="update-time">
          <p><small>最后更新时间：2024年1月1日</small></p>
        </div>
      </div>
    `
      }
    };
    const showHelp = (type) => {
      const content = helpContents[type];
      if (content) {
        helpModalType.value = type;
        helpModalTitle.value = content.title;
        helpModalContent.value = content.content;
        showHelpModal.value = true;
      }
    };
    const shareToQQ = (item) => {
      const url = encodeURIComponent(shareUrl.value);
      const title = encodeURIComponent(item ? `${item.author} 的动态` : shareTitle.value);
      const desc = encodeURIComponent(item ? item.content.replace(/<[^>]*>/g, "").substring(0, 100) : shareDescription.value);
      const qqShareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}&summary=${desc}&site=IceCMS`;
      (void 0).open(qqShareUrl, "_blank", "width=600,height=400");
    };
    const shareToWeibo = (item) => {
      const url = encodeURIComponent(shareUrl.value);
      const title = encodeURIComponent(item ? `${item.author} 的动态` : shareTitle.value);
      const content = `${title} ${url}`;
      const weiboShareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${content}&pic=`;
      (void 0).open(weiboShareUrl, "_blank", "width=600,height=400");
    };
    const shareToWechat = (item) => {
      const shareContent = item ? `${item.author} 的动态: ${item.content.replace(/<[^>]*>/g, "").substring(0, 50)}...` : shareTitle.value;
      (void 0).clipboard?.writeText(`${shareContent} ${shareUrl.value}`).then(() => {
        alert("内容已复制到剪切板，可以分享到微信了！");
      }).catch(() => {
        prompt("请复制以下内容分享到微信:", `${shareContent} ${shareUrl.value}`);
      });
    };
    const copyLink = (item) => {
      (void 0).clipboard?.writeText(shareUrl.value).then(() => {
        alert("链接已复制到剪切板！");
      }).catch(() => {
        prompt("请复制以下链接:", shareUrl.value);
      });
    };
    const setPullDown = async (item) => {
      comment.value = [];
      if (!item.isShow) {
        try {
          console.log("正在获取评论，postId:", item.id);
          const res = await Promise.race([
            getPlanetIdComment(item.id),
            new Promise(
              (_, reject) => setTimeout(() => reject(new Error("获取评论超时")), 8e3)
            )
          ]);
          console.log("获取评论响应:", res);
          let rawComments = [];
          if (res && res.data) {
            rawComments = Array.isArray(res.data) ? res.data : [];
          } else if (Array.isArray(res)) {
            rawComments = res;
          } else {
            console.warn("评论数据格式异常:", res);
            rawComments = [];
          }
          try {
            comment.value = await Promise.race([
              processCommentsWithUserInfo(rawComments),
              new Promise(
                (resolve) => setTimeout(() => {
                  console.warn("用户信息获取超时，使用原始评论数据");
                  resolve(rawComments);
                }, 5e3)
              )
            ]);
          } catch (error) {
            console.error("处理评论数据失败，使用原始数据:", error);
            comment.value = rawComments;
          }
          console.log("设置评论数据:", comment.value);
        } catch (error) {
          console.error("获取评论失败:", error);
          comment.value = [];
          ElMessage.error("获取评论失败，请重试");
        }
        if (!Object.prototype.hasOwnProperty.call(item, "isShow")) {
          item.isShow = false;
        }
        item.isShow = !item.isShow;
      } else {
        item.isShow = !item.isShow;
      }
    };
    const setReplayPullDown = (item) => {
      if (!Object.prototype.hasOwnProperty.call(item, "isShow")) {
        item.isShow = false;
      }
      item.isShow = !item.isShow;
    };
    const setReplaysPullDown = (reply) => {
      if (!Object.prototype.hasOwnProperty.call(reply, "isShow")) {
        reply.isShow = false;
      }
      reply.isShow = !reply.isShow;
    };
    const likeClickMains = async (item) => {
      if (item.isLose) {
        item.isLose = false;
      }
      if (!item.isLike) {
        if (!Object.prototype.hasOwnProperty.call(item, "isLike")) {
          item.isLike = false;
        }
        item.isLike = true;
        item.loveNum = (item.loveNum || 0) + 1;
        try {
          await likeClickComments(item.id);
        } catch (error) {
          console.error("点赞失败:", error);
          item.isLike = false;
          item.loveNum = Math.max(0, item.loveNum - 1);
        }
      } else {
        item.isLike = false;
        item.loveNum = Math.max(0, (item.loveNum || 0) - 1);
      }
    };
    const LoseClickMains = (item) => {
      if (item.isLike) {
        item.isLike = false;
        item.loveNum = Math.max(0, (item.loveNum || 0) - 1);
      }
      if (!Object.prototype.hasOwnProperty.call(item, "isLose")) {
        item.isLose = false;
      }
      item.isLose = !item.isLose;
    };
    const likeClicks = async (item) => {
      if (!item.isLike) {
        if (!Object.prototype.hasOwnProperty.call(item, "isLike")) {
          item.isLike = false;
        }
        item.isLike = !item.isLike;
        try {
          await likeClickComment(item.id);
        } catch (error) {
          console.error("点赞失败:", error);
        }
        item.loveNum++;
      } else {
        item.loveNum--;
        item.isLike = !item.isLike;
      }
    };
    const userInfoCache = ref(/* @__PURE__ */ new Map());
    const batchGetUserInfo = async (userIds) => {
      const uniqueIds = [...new Set(userIds)];
      const promises = uniqueIds.map(async (userId) => {
        if (userInfoCache.value.has(userId)) {
          return { userId, userInfo: userInfoCache.value.get(userId) };
        }
        try {
          const userInfo = await Promise.race([
            getUserInfobyid(userId),
            new Promise(
              (_, reject) => setTimeout(() => reject(new Error("User info timeout")), 3e3)
            )
          ]);
          let userName = "未知用户";
          if (userInfo && userInfo.data) {
            userName = userInfo.data.othername || userInfo.data.name || "未知用户";
          } else if (userInfo && userInfo.othername) {
            userName = userInfo.othername;
          }
          userInfoCache.value.set(userId, userName);
          return { userId, userInfo: userName };
        } catch (error) {
          console.error("获取用户信息失败:", userId, error);
          userInfoCache.value.set(userId, "未知用户");
          return { userId, userInfo: "未知用户" };
        }
      });
      const results = await Promise.allSettled(promises);
      const userInfoMap = /* @__PURE__ */ new Map();
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const { userId, userInfo } = result.value;
          userInfoMap.set(userId, userInfo);
        } else {
          userInfoMap.set(uniqueIds[index], "未知用户");
        }
      });
      return userInfoMap;
    };
    const processCommentsWithUserInfo = async (comments) => {
      if (!comments || !Array.isArray(comments)) return comments;
      const userIdsToFetch = [];
      comments.forEach((comment2) => {
        if (comment2.reply && Array.isArray(comment2.reply)) {
          comment2.reply.forEach((reply) => {
            if (reply.toUserId && reply.toUserId !== 0 && !userInfoCache.value.has(reply.toUserId)) {
              userIdsToFetch.push(reply.toUserId);
            }
          });
        }
      });
      let userInfoMap = /* @__PURE__ */ new Map();
      if (userIdsToFetch.length > 0) {
        try {
          userInfoMap = await batchGetUserInfo(userIdsToFetch);
        } catch (error) {
          console.error("批量获取用户信息失败:", error);
        }
      }
      const processedComments = comments.map((comment2) => {
        const processedComment = { ...comment2 };
        if (comment2.reply && Array.isArray(comment2.reply)) {
          processedComment.reply = comment2.reply.map((reply) => {
            const processedReply = { ...reply };
            if (reply.toUserId && reply.toUserId !== 0) {
              processedReply.toUserName = userInfoCache.value.get(reply.toUserId) || userInfoMap.get(reply.toUserId) || "未知用户";
            }
            return processedReply;
          });
        }
        return processedComment;
      });
      return processedComments;
    };
    const refreshPostComments = async (postId, retryCount = 0) => {
      const maxRetries = 2;
      try {
        console.log("刷新帖子评论，postId:", postId, "retry:", retryCount);
        const res = await Promise.race([
          getPlanetIdComment(postId),
          new Promise(
            (_, reject) => setTimeout(() => reject(new Error("获取评论超时")), 8e3)
          )
        ]);
        console.log("获取评论响应:", res);
        let rawComments = [];
        if (res && res.data) {
          rawComments = Array.isArray(res.data) ? res.data : [];
        } else if (Array.isArray(res)) {
          rawComments = res;
        } else {
          console.warn("评论数据格式异常:", res);
          rawComments = [];
        }
        try {
          comment.value = await Promise.race([
            processCommentsWithUserInfo(rawComments),
            new Promise(
              (resolve) => setTimeout(() => {
                console.warn("用户信息获取超时，使用原始评论数据");
                resolve(rawComments);
              }, 5e3)
            )
          ]);
        } catch (error) {
          console.error("处理评论数据失败，使用原始数据:", error);
          comment.value = rawComments;
        }
        console.log("刷新后的评论数据:", comment.value);
        const targetPost = squaredata.value.find((item) => item.id === postId);
        if (targetPost) {
          targetPost.commentNum = comment.value.length;
          console.log("更新帖子评论数量为:", comment.value.length);
        }
        const targetItem = squaredata.value.find((item) => item.id === postId);
        if (targetItem && !targetItem.isShow) {
          targetItem.isShow = true;
        }
      } catch (error) {
        console.error("刷新评论失败:", error);
        if (retryCount < maxRetries) {
          console.log(`刷新评论失败，进行第${retryCount + 1}次重试`);
          setTimeout(() => {
            refreshPostComments(postId, retryCount + 1);
          }, 1e3 * (retryCount + 1));
        } else {
          ElMessage.error("刷新评论失败，请手动刷新页面");
        }
      }
    };
    const setUpPostReply = async (item) => {
      if (isSubmitting.value) {
        console.log("正在提交评论，请勿重复点击");
        return;
      }
      const replyInput = (void 0).getElementById(`reply-input-${item.id}`);
      if (replyInput) {
        const content = replyInput.innerHTML;
        const regex = /<img src="\/emoji\/(.+?)".*?>/g;
        let replacedStr = content;
        let match;
        while ((match = regex.exec(content)) !== null) {
          const emojiUrl = match[1];
          const emojiText = `[${emojiUrl.split("/").pop().split(".")[0]}]`;
          replacedStr = replacedStr.replace(match[0], emojiText);
        }
        postReplyForm.content = replacedStr.replace(/<[^>]*>/g, "").trim();
      }
      if (!postReplyForm.content || postReplyForm.content.trim() === "") {
        ElMessage.warning("评论内容不能为空");
        return;
      }
      postReplyForm.postId = item.id;
      const userStore = useUserStore();
      if (!userStore.userid) {
        shownologin.value = true;
        ElMessage.warning("请先登录");
        return;
      } else {
        postReplyForm.userId = userStore.userid;
        shownologin.value = false;
      }
      isSubmitting.value = true;
      try {
        console.log("提交评论:", postReplyForm);
        const result = await addPlanetComment(postReplyForm);
        console.log("评论提交结果:", result);
        postReplyForm.content = "";
        if (replyInput) {
          replyInput.innerHTML = "";
        }
        await refreshPostComments(item.id);
        ElMessage.success("评论发布成功");
      } catch (error) {
        console.error("发布评论失败:", error);
        ElMessage.error("评论发布失败，请重试");
      } finally {
        setTimeout(() => {
          isSubmitting.value = false;
        }, 1e3);
      }
    };
    const setUpPostReplys = async (userId, id, postId) => {
      if (isSubmitting.value) {
        ElMessage.warning("正在提交回复，请稍候");
        return;
      }
      const replysInput = (void 0).getElementById(`replys-input-${id}`);
      if (replysInput) {
        const content = replysInput.innerHTML;
        const regex = /<img src="\/emoji\/(.+?)".*?>/g;
        let replacedStr = content;
        let match;
        while ((match = regex.exec(content)) !== null) {
          const emojiUrl = match[1];
          const emojiText = `[${emojiUrl.split("/").pop().split(".")[0]}]`;
          replacedStr = replacedStr.replace(match[0], emojiText);
        }
        postReplysForm.content = replacedStr.replace(/<[^>]*>/g, "").trim();
      }
      if (!postReplysForm.content || postReplysForm.content.trim() === "") {
        ElMessage.warning("回复内容不能为空");
        return;
      }
      postReplysForm.postId = postId;
      postReplysForm.parentId = id;
      const userStore = useUserStore();
      if (!userStore.userid) {
        shownologin.value = true;
        ElMessage.warning("请先登录");
        return;
      } else {
        postReplysForm.userId = userStore.userid;
        shownologin.value = false;
      }
      isSubmitting.value = true;
      try {
        console.log("提交回复数据:", postReplysForm);
        const res = await addPlanetComment(postReplysForm);
        console.log("回复提交响应:", res);
        const isSuccess = res && (res.code === 0 || res.code === "0" || res.status === "success" || res.success === true || res.data && !res.error || !res.code && !res.error);
        if (isSuccess) {
          postReplysForm.content = "";
          if (replysInput) {
            replysInput.innerHTML = "";
          }
          await refreshPostComments(postId);
          ElMessage.success("回复发布成功");
        } else {
          console.warn("API响应格式异常，尝试刷新数据:", res);
          await refreshPostComments(postId);
          if (comment.value && comment.value.length > 0) {
            postReplysForm.content = "";
            if (replysInput) {
              replysInput.innerHTML = "";
            }
            ElMessage.success("回复发布成功");
          } else {
            ElMessage.error(res.msg || res.message || "回复发布失败");
          }
        }
      } catch (error) {
        console.error("发布回复失败:", error);
        try {
          await refreshPostComments(postId);
          if (comment.value && comment.value.length > 0) {
            postReplysForm.content = "";
            if (replysInput) {
              replysInput.innerHTML = "";
            }
            ElMessage.success("回复发布成功");
            return;
          }
        } catch (refreshError) {
          console.error("刷新评论失败:", refreshError);
        }
        ElMessage.error("回复发布失败，请重试");
      } finally {
        setTimeout(() => {
          isSubmitting.value = false;
        }, 1e3);
      }
    };
    const setUpPostReplysTouser = async (usersId, id, postId, uId) => {
      if (isSubmitting.value) {
        ElMessage.warning("正在提交回复，请稍候");
        return;
      }
      const replyIdForInput = usersId;
      let replysToUserInput = (void 0).getElementById(`replysToUser-input-${replyIdForInput}`);
      if (!replysToUserInput) {
        const allReplysToUserInputs = (void 0).querySelectorAll('[id*="replysToUser-input"]');
        const activeInput = Array.from(allReplysToUserInputs).find((input) => {
          return input.offsetParent !== null;
        });
        if (activeInput) {
          replysToUserInput = activeInput;
        }
      }
      if (replysToUserInput) {
        const content = replysToUserInput.innerHTML;
        const regex = /<img src="\/emoji\/(.+?)".*?>/g;
        let replacedStr = content;
        let match;
        while ((match = regex.exec(content)) !== null) {
          const emojiUrl = match[1];
          const emojiText = `[${emojiUrl.split("/").pop().split(".")[0]}]`;
          replacedStr = replacedStr.replace(match[0], emojiText);
        }
        postReplysToUserForm.content = replacedStr.replace(/<[^>]*>/g, "").trim();
      }
      if (!postReplysToUserForm.content || postReplysToUserForm.content.trim() === "") {
        ElMessage.warning("回复内容不能为空");
        return;
      }
      postReplysToUserForm.postId = postId;
      postReplysToUserForm.parentId = id;
      postReplysToUserForm.toUserId = uId;
      const userStore = useUserStore();
      if (!userStore.userid) {
        shownologin.value = true;
        ElMessage.warning("请先登录");
        return;
      } else {
        postReplysToUserForm.userId = userStore.userid;
        shownologin.value = false;
      }
      isSubmitting.value = true;
      try {
        console.log("提交回复数据:", postReplysToUserForm);
        const res = await addPlanetComment(postReplysToUserForm);
        console.log("回复提交响应:", res);
        const isSuccess = res && (res.code === 0 || res.code === "0" || res.status === "success" || res.success === true || res.data && !res.error || !res.code && !res.error);
        if (isSuccess) {
          postReplysToUserForm.content = "";
          if (replysToUserInput) {
            replysToUserInput.innerHTML = "";
          }
          await refreshPostComments(postId);
          ElMessage.success("回复发布成功");
        } else {
          console.warn("API响应格式异常，尝试刷新数据:", res);
          await refreshPostComments(postId);
          if (comment.value && comment.value.length > 0) {
            postReplysToUserForm.content = "";
            if (replysToUserInput) {
              replysToUserInput.innerHTML = "";
            }
            ElMessage.success("回复发布成功");
          } else {
            ElMessage.error(res.msg || res.message || "回复发布失败");
          }
        }
      } catch (error) {
        console.error("发布回复失败:", error);
        try {
          await refreshPostComments(postId);
          if (comment.value && comment.value.length > 0) {
            postReplysToUserForm.content = "";
            if (replysToUserInput) {
              replysToUserInput.innerHTML = "";
            }
            ElMessage.success("回复发布成功");
            return;
          }
        } catch (refreshError) {
          console.error("刷新评论失败:", refreshError);
        }
        ElMessage.error("回复发布失败，请重试");
      } finally {
        setTimeout(() => {
          isSubmitting.value = false;
        }, 1e3);
      }
    };
    const handleReplyInput = (event, formType) => {
      const target = event.target;
      const content = target.innerHTML;
      const regex = /<img src="\/emoji\/(.+?)".*?>/g;
      let replacedStr = content;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const emojiUrl = match[1];
        const emojiText = `[${emojiUrl.split("/").pop().split(".")[0]}]`;
        replacedStr = replacedStr.replace(match[0], emojiText);
      }
      if (formType === "postReplyForm") {
        postReplyForm.content = replacedStr;
      } else if (formType === "postReplysForm") {
        postReplysForm.content = replacedStr;
      } else if (formType === "postReplysToUserForm") {
        postReplysToUserForm.content = replacedStr;
      }
    };
    const appendEmojiToSpecificReply = async (emoji, targetId) => {
      const targetInput = (void 0).getElementById(targetId);
      if (!targetInput) {
        console.error("目标输入框未找到:", targetId);
        return;
      }
      targetInput.focus();
      const selection = (void 0).getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (!targetInput.contains(range.commonAncestorContainer)) {
          range.selectNodeContents(targetInput);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        const range = (void 0).createRange();
        range.selectNodeContents(targetInput);
        range.collapse(false);
        const selection3 = (void 0).getSelection();
        if (selection3) {
          selection3.removeAllRanges();
          selection3.addRange(range);
        }
      }
      const selection2 = (void 0).getSelection();
      if (selection2 && selection2.rangeCount > 0) {
        const range = selection2.getRangeAt(0);
        const emojiImg = (void 0).createElement("img");
        emojiImg.src = `/emoji/${emoji}.png`;
        emojiImg.style.cssText = "width: 20px; height: 20px; vertical-align: middle; margin: 0 2px;";
        emojiImg.className = "emoji-icon";
        emojiImg.alt = emoji;
        range.deleteContents();
        range.insertNode(emojiImg);
        range.setStartAfter(emojiImg);
        range.setEndAfter(emojiImg);
        selection2.removeAllRanges();
        selection2.addRange(range);
        const inputEvent = new Event("input", { bubbles: true });
        targetInput.dispatchEvent(inputEvent);
      }
    };
    const clearPlaceholder = (event) => {
      const target = event.target;
      if (target.innerHTML.trim() === "") {
        target.setAttribute("data-placeholder", "");
      }
    };
    const addPlaceholder = (event) => {
      const target = event.target;
      if (target.innerHTML.trim() === "") {
        const placeholder2 = target.getAttribute("data-placeholder");
        if (placeholder2) {
          target.setAttribute("data-placeholder", placeholder2);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_el_aside = ElAside;
      const _component_nuxt_link = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_2;
      const _component_el_avatar = ElAvatar;
      const _component_el_main = ElMain;
      const _component_ElButton = ElButton;
      const _component_el_button = ElButton;
      const _component_el_image = ElImage;
      const _component_el_popover = ElPopover;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))} data-v-24984097><div data-server-rendered="true" id="__nuxt" data-v-24984097><div id="__layout" data-v-24984097><div data-fetch-key="0" class="app macwk-animation" data-v-24984097>`);
      _push(ssrRenderComponent(_component_top, { message5: acticve.value }, null, _parent));
      _push(`<div data-v-24984097><div class="body" data-v-24984097><div class="container" data-v-24984097><div class="row" data-v-24984097>`);
      _push(ssrRenderComponent(_component_el_aside, { width: "260px" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sidebar-innter widget-ffixed" data-v-24984097${_scopeId}><section id="b2-widget-circle-info-2" class="mobile-hidden widget b2-widget-circle-info mg-b box b2-radius-aside-left" data-v-24984097${_scopeId}><div class="b2-widget-title" data-v-24984097${_scopeId}><h2 class="widget-title" data-v-24984097${_scopeId}>找到你自己的圈子</h2></div><div class="b2-widget-box" data-v-24984097${_scopeId}><div class="about-widget" data-v-24984097${_scopeId}><div class="user-w-announcement" data-v-24984097${_scopeId}><ul class="planet-aside-ul" data-v-24984097${_scopeId}><li class="planet-aside-li el-icon-ice-cream-round" data-v-24984097${_scopeId}><a href="javascript:void(0)" data-v-24984097${_scopeId}>怎么创建圈子？</a></li><li class="planet-aside-li el-icon-ice-cream-round" data-v-24984097${_scopeId}><a href="javascript:void(0)" data-v-24984097${_scopeId}>如何进行沟通？</a></li><li class="planet-aside-li el-icon-ice-cream-round" data-v-24984097${_scopeId}><a href="javascript:void(0)" data-v-24984097${_scopeId}>圈子条款</a></li></ul></div><div class="circle-widget-button" data-v-24984097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_nuxt_link, { to: "/CreatePlanet" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button class="text-great" data-v-24984097${_scopeId2}> 创建圈子 </button>`);
                } else {
                  return [
                    createVNode("button", { class: "text-great" }, " 创建圈子 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></section></div><div class="sidebar-innter widget-ffixed" data-v-24984097${_scopeId}><section id="b2-widget-circle-info-2" class="mobile-hidden widget b2-widget-circle-info mg-b box b2-radius-aside-left-plant" data-v-24984097${_scopeId}><div class="b2-widget-title" data-v-24984097${_scopeId}><h2 class="widget-title-plant" data-v-24984097${_scopeId}>推荐圈子</h2></div><div class="b2-widget-box" data-v-24984097${_scopeId}><div class="about-widget" data-v-24984097${_scopeId}>`);
            if (isClient.value) {
              _push2(`<div class="PlanetListCare" data-v-24984097${_scopeId}><!--[-->`);
              ssrRenderList(classlist.value, (item) => {
                _push2(`<div class="PlanetListItem" data-v-24984097${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  href: "/planet/" + item.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div style="${ssrRenderStyle({ "margin-left": "10px" })}" class="PlanetListItems" data-v-24984097${_scopeId2}><div class="PlanetListItem-img" data-v-24984097${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_avatar, {
                        shape: "square",
                        size: 38,
                        src: item.imgclass
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="PlanetListItem-info" data-v-24984097${_scopeId2}><div class="PlanetListItem-title" data-v-24984097${_scopeId2}><a class="planetTitletext" href="#" data-v-24984097${_scopeId2}><span data-v-24984097${_scopeId2}>${ssrInterpolate(item.name)}</span></a></div></div></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          style: { "margin-left": "10px" },
                          class: "PlanetListItems"
                        }, [
                          createVNode("div", { class: "PlanetListItem-img" }, [
                            createVNode(_component_el_avatar, {
                              shape: "square",
                              size: 38,
                              src: item.imgclass
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "PlanetListItem-info" }, [
                            createVNode("div", { class: "PlanetListItem-title" }, [
                              createVNode("a", {
                                class: "planetTitletext",
                                href: "#"
                              }, [
                                createVNode("span", null, toDisplayString(item.name), 1)
                              ])
                            ])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="widget-mission-footer" data-v-24984097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/AllPlanet",
              class: "allad"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`全部圈子`);
                } else {
                  return [
                    createTextVNode("全部圈子")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section></div>`);
          } else {
            return [
              createVNode("div", { class: "sidebar-innter widget-ffixed" }, [
                createVNode("section", {
                  id: "b2-widget-circle-info-2",
                  class: "mobile-hidden widget b2-widget-circle-info mg-b box b2-radius-aside-left"
                }, [
                  createVNode("div", { class: "b2-widget-title" }, [
                    createVNode("h2", { class: "widget-title" }, "找到你自己的圈子")
                  ]),
                  createVNode("div", { class: "b2-widget-box" }, [
                    createVNode("div", { class: "about-widget" }, [
                      createVNode("div", { class: "user-w-announcement" }, [
                        createVNode("ul", { class: "planet-aside-ul" }, [
                          createVNode("li", { class: "planet-aside-li el-icon-ice-cream-round" }, [
                            createVNode("a", {
                              href: "javascript:void(0)",
                              onClick: ($event) => showHelp("create")
                            }, "怎么创建圈子？", 8, ["onClick"])
                          ]),
                          createVNode("li", { class: "planet-aside-li el-icon-ice-cream-round" }, [
                            createVNode("a", {
                              href: "javascript:void(0)",
                              onClick: ($event) => showHelp("communication")
                            }, "如何进行沟通？", 8, ["onClick"])
                          ]),
                          createVNode("li", { class: "planet-aside-li el-icon-ice-cream-round" }, [
                            createVNode("a", {
                              href: "javascript:void(0)",
                              onClick: ($event) => showHelp("terms")
                            }, "圈子条款", 8, ["onClick"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "circle-widget-button" }, [
                        createVNode(_component_nuxt_link, { to: "/CreatePlanet" }, {
                          default: withCtx(() => [
                            createVNode("button", { class: "text-great" }, " 创建圈子 ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "sidebar-innter widget-ffixed" }, [
                createVNode("section", {
                  id: "b2-widget-circle-info-2",
                  class: "mobile-hidden widget b2-widget-circle-info mg-b box b2-radius-aside-left-plant"
                }, [
                  createVNode("div", { class: "b2-widget-title" }, [
                    createVNode("h2", { class: "widget-title-plant" }, "推荐圈子")
                  ]),
                  createVNode("div", { class: "b2-widget-box" }, [
                    createVNode("div", { class: "about-widget" }, [
                      isClient.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "PlanetListCare"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(classlist.value, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "PlanetListItem"
                          }, [
                            createVNode(_component_NuxtLink, {
                              href: "/planet/" + item.id
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  style: { "margin-left": "10px" },
                                  class: "PlanetListItems"
                                }, [
                                  createVNode("div", { class: "PlanetListItem-img" }, [
                                    createVNode(_component_el_avatar, {
                                      shape: "square",
                                      size: 38,
                                      src: item.imgclass
                                    }, null, 8, ["src"])
                                  ]),
                                  createVNode("div", { class: "PlanetListItem-info" }, [
                                    createVNode("div", { class: "PlanetListItem-title" }, [
                                      createVNode("a", {
                                        class: "planetTitletext",
                                        href: "#"
                                      }, [
                                        createVNode("span", null, toDisplayString(item.name), 1)
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "widget-mission-footer" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/AllPlanet",
                      class: "allad"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("全部圈子")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_main, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="circle-top white" data-v-24984097${_scopeId}><div id="po-topic-box" class="box b2-radius" data-v-24984097${_scopeId}><div class="po-topic" data-v-24984097${_scopeId}><div class="circle-info" data-v-24984097${_scopeId}><div class="circle-info-in" data-v-24984097${_scopeId}><div class="circle-info-left" data-v-24984097${_scopeId}><img data-src="" alt=""${ssrRenderAttr("src", planetInfo.value.imgclass)} data-was-processed="true" class="topimg" data-v-24984097${_scopeId}><h1 class="planeth1" data-v-24984097${_scopeId}><p data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}>${ssrInterpolate(planetInfo.value.name)}</b><span class="mobile-show" data-v-24984097${_scopeId}><i class="b2font b2-arrow-right-s-line picked" data-v-24984097${_scopeId}></i></span></p><a target="_blank" data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>Alextao</span><span data-v-24984097${_scopeId}>(圈主)</span></a></h1><div class="mobile-show po-top-submit" data-v-24984097${_scopeId}><button class="empty" data-v-24984097${_scopeId}>发布话题</button></div></div><div class="circle-admin-info" style="${ssrRenderStyle({})}" data-v-24984097${_scopeId}><div data-v-24984097${_scopeId}><div class="top-card" data-v-24984097${_scopeId}><span class="" data-v-24984097${_scopeId}>所有圈子(3)</span></div><i class="b2font b2-donut-chart-fill" data-v-24984097${_scopeId}></i></div><span class="mobile-show close-admin-box" data-v-24984097${_scopeId}><i class="b2font b2-close-line" data-v-24984097${_scopeId}></i></span></div></div><p class="circle-desc tip-radius" data-v-24984097${_scopeId}> 公共区域，请文明发言! </p>`);
            if (!userJudje.value) {
              _push2(`<div class="nologin" data-v-24984097${_scopeId}><div class="nologintext" data-v-24984097${_scopeId}><h5 data-v-24984097${_scopeId}>您还未登录</h5></div><div class="nologintext" data-v-24984097${_scopeId}><p class="circle-desc" data-v-24984097${_scopeId}> 登录后可阅读更多话题 </p></div></div>`);
            } else {
              _push2(`<div data-v-24984097${_scopeId}><div class="commenter-container" data-v-24984097${_scopeId}><div class="${ssrRenderClass([{ "commenter-focused": unref(inputFocus) }, "commenter-wrapper"])}" data-v-24984097${_scopeId}><div id="rich-input" class="rich-input" tabindex="-3" contenteditable="true"${ssrRenderAttr("data-placeholder", unref(placeholder))} data-v-24984097${_scopeId}></div><div class="commenter-upload" data-v-24984097${_scopeId}></div><div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "row", "flex-wrap": "wrap", "align-content": "flex-start", "justify-content": "center", "align-items": "flex-start" })}" class="commenter-footer flex items-center justify-between px-3 pb-3 pt-2" data-v-24984097${_scopeId}><div class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
              _push2(ssrRenderComponent(EmojiPicker, {
                onShow: unref(moveCursorToEnd),
                onAppend: ($event) => {
                  unref(appendEmoji)($event);
                  inputLength.value += 1;
                }
              }, null, _parent2, _scopeId));
              _push2(`</div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start", "align-content": "center", "flex-wrap": "wrap", "flex-direction": "row-reverse" })}" class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ElButton, {
                class: "!text-base",
                type: "primary",
                onClick: onSend
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 发送 `);
                  } else {
                    return [
                      createTextVNode(" 发送 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div style="${ssrRenderStyle({ "padding": "6px" })}" class="${ssrRenderClass([[unref(inputLength) >= 1e3 ? "text-error" : "text-[#666]"], "text-xs"])}" data-v-24984097${_scopeId}>${ssrInterpolate(unref(inputLength))} / 1000 </div></div></div></div></div><div class="PutContent" data-v-24984097${_scopeId}><div class="leftMenu" data-v-24984097${_scopeId}></div></div><div style="${ssrRenderStyle({ "padding": "30px", "margin-left": "56px" })}" data-v-24984097${_scopeId}></div></div>`);
            }
            _push2(`</div><div id="show-form" class="po-form-box" data-v-24984097${_scopeId}><div class="po-form-box-in" style="${ssrRenderStyle({ "opacity": "1" })}" data-v-24984097${_scopeId}></div></div></div></div></div><div class="topic-type-menu white" data-v-24984097${_scopeId}><ul class="planetul" data-v-24984097${_scopeId}><li class="planetli" data-v-24984097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: unref(planetStore).isFilterType("all") ? "primary" : "",
              round: "",
              onClick: ($event) => fetchData("all")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 全部 `);
                } else {
                  return [
                    createTextVNode(" 全部 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="planetli" data-v-24984097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: unref(planetStore).isFilterType("recent") ? "primary" : "",
              round: "",
              onClick: ($event) => fetchData("recent")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 最近 `);
                } else {
                  return [
                    createTextVNode(" 最近 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="planetli" data-v-24984097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: unref(planetStore).isFilterType("hot") ? "primary" : "",
              round: "",
              onClick: ($event) => fetchData("hot")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 热门 `);
                } else {
                  return [
                    createTextVNode(" 热门 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ul><div class="topic-drop" data-v-24984097${_scopeId}><button class="planettext" data-v-24984097${_scopeId}><i class="el-icon-lollipop" data-v-24984097${_scopeId}></i><span data-v-24984097${_scopeId}>筛选</span></button></div></div><!--[-->`);
            ssrRenderList(squaredata.value, (item) => {
              _push2(`<div class="circle-contenr-out white" data-v-24984097${_scopeId}><div class="circle-contenr" data-v-24984097${_scopeId}><div class="topic-header" data-v-24984097${_scopeId}><div class="topic-header-left" data-v-24984097${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: "/otheruserinfo/" + item.userid
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="topic-avatar" data-v-24984097${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_avatar, {
                      src: item.authorImg
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "topic-avatar" }, [
                        createVNode(_component_el_avatar, {
                          src: item.authorImg
                        }, null, 8, ["src"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="topic-name" data-v-24984097${_scopeId}><div data-v-24984097${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: "/otheruserinfo/" + item.userid
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="topic-name-data" data-v-24984097${_scopeId2}><a target="_blank" data-v-24984097${_scopeId2}><b data-v-24984097${_scopeId2}>${ssrInterpolate(item.author)}</b></a></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "topic-name-data" }, [
                        createVNode("a", { target: "_blank" }, [
                          createVNode("b", null, toDisplayString(item.author), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="topic-user-lv" data-v-24984097${_scopeId}></div></div></div></div></div><div class="topic-header-right" data-v-24984097${_scopeId}><span class="topic-date topic-circle" data-v-24984097${_scopeId}><a target="_blank" data-v-24984097${_scopeId}><b class="circle-hash" data-v-24984097${_scopeId}><svg width="16" height="16" viewBox="0 0 36 36" data-v-24984097${_scopeId}><g fill-rule="evenodd" data-v-24984097${_scopeId}><path d="M18 0c9.941 0 18 8.059 18 18 0 2.723-.604 5.304-1.687 7.617v6.445a2.25 2.25 0 0 1-2.096 2.245l-.154.005-6.446.001A17.932 17.932 0 0 1 18 36C8.059 36 0 27.941 0 18S8.059 0 18 0z" fill-opacity=".1" data-v-24984097${_scopeId}></path><path d="M23.32 7.875c.517 0 .948.18 1.293.54.296.294.444.632.444 1.015a.589.589 0 0 1-.037.202l-.258 2.17c0 .18.087.27.259.27h.96c.592 0 1.097.185 1.516.557.419.372.628.828.628 1.369 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.478c-.197 0-.308.09-.333.27l-.517 3.684c-.025.158.049.237.221.237h1.22c.591 0 1.096.191 1.515.574.419.384.628.845.628 1.386 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.7c-.172 0-.27.08-.296.237l-.273 2.062c-.05.495-.283.912-.702 1.25a2.282 2.282 0 0 1-1.478.507c-.518 0-.949-.18-1.294-.54-.295-.294-.443-.632-.443-1.015 0-.067.012-.135.037-.202l.236-2.062c.025-.158-.049-.237-.221-.237h-3.732c-.198 0-.296.08-.296.237l-.31 2.062a1.96 1.96 0 0 1-.721 1.25c-.407.338-.88.507-1.423.507-.517 0-.948-.18-1.293-.54-.296-.294-.444-.632-.444-1.015v-.202l.274-2.062c.025-.158-.062-.237-.259-.237h-.739a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.845-.628-1.386 0-.54.21-1.002.628-1.386a2.166 2.166 0 0 1 1.515-.574h1.257c.172 0 .27-.079.295-.237l.48-3.684c.025-.18-.06-.27-.258-.27h-.924a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.84-.628-1.37 0-.529.21-.985.628-1.368a2.166 2.166 0 0 1 1.515-.575h1.515c.197 0 .308-.09.333-.27L13.01 9.6c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507.518 0 .949.18 1.294.54.27.294.406.62.406.98v.237l-.294 2.17c-.025.18.061.27.259.27h3.769c.172 0 .27-.09.295-.27l.295-2.203c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507zm-3.316 7.875h-3.49c-.157 0-.256.071-.296.213l-.014.077-.45 3.956c-.02.145.029.228.144.249l.064.005h3.524c.134 0 .22-.059.26-.176l.016-.078.484-3.956c.02-.166-.037-.26-.17-.284l-.072-.006z" fill-rule="nonzero" data-v-24984097${_scopeId}></path></g></svg></b><b data-v-24984097${_scopeId}>${ssrInterpolate(item.sortName)}</b></a></span></div></div><div class="topic-content" data-v-24984097${_scopeId}><div class="topic-content-text" data-v-24984097${_scopeId}>${renderEmojiContent(item.content) ?? ""}</div></div>`);
              if (item.image !== null && item.image != "") {
                _push2(`<div style="${ssrRenderStyle({ "padding": "30px", "display": "flex", "flex-direction": "row", "width": "521px", "height": "230px", "margin-right": "10px" })}" data-v-24984097${_scopeId}><!--[-->`);
                ssrRenderList(item.image, (imagess) => {
                  _push2(`<div class="topic-img-inner" data-v-24984097${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_image, {
                    style: { "margin-right": "10px", "max-width": "400px", "height": "200px" },
                    src: imagess.url,
                    fit: "scale-down"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(imagess.url)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(imagess.url), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="topic-footer" data-v-24984097${_scopeId}><div class="topic-footer-left" data-v-24984097${_scopeId}>`);
              if (!item.isLike) {
                _push2(`<button class="planettext like-btn" data-v-24984097${_scopeId}><i class="el-icon-caret-top" data-v-24984097${_scopeId}></i><span class="el-icon-caret-planettext" data-v-24984097${_scopeId}>${ssrInterpolate(item.loveNum > 0 ? item.loveNum + "赞" : "赞")}</span></button>`);
              } else {
                _push2(`<button class="planettext like-btn active-like" data-v-24984097${_scopeId}><i class="el-icon-caret-top" data-v-24984097${_scopeId}></i><span class="el-icon-caret-planettext" data-v-24984097${_scopeId}>${ssrInterpolate(item.loveNum > 0 ? item.loveNum + "赞" : "赞")}</span></button>`);
              }
              if (!item.isLose) {
                _push2(`<button class="planettext dislike-btn" data-v-24984097${_scopeId}><img class="link-icon--right"${ssrRenderAttr("src", _imports_0)} data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>踩</span></button>`);
              } else {
                _push2(`<button class="planettext dislike-btn active-dislike" data-v-24984097${_scopeId}><img class="link-icon--right"${ssrRenderAttr("src", _imports_0)} data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>踩</span></button>`);
              }
              _push2(`<span class="topic-date" data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}><time class="b2timeago" datetime="2021-12-27 21:58:17" itemprop="datePublished" data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>${ssrInterpolate(getTime(item.addTime))}</span></time></b></span><div class="topic-meta-more-box" data-v-24984097${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_popover, {
                placement: "bottom-start",
                title: "分享与更多",
                width: 280,
                trigger: "hover",
                "popper-class": "share-popover"
              }, {
                reference: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button class="topic-date topic-meta-more" data-v-24984097${_scopeId2}><div data-v-24984097${_scopeId2}>更多</div></button>`);
                  } else {
                    return [
                      createVNode("button", { class: "topic-date topic-meta-more" }, [
                        createVNode("div", null, "更多")
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="share-content" data-v-24984097${_scopeId2}><div class="share-title" data-v-24984097${_scopeId2}><i class="el-icon-share" data-v-24984097${_scopeId2}></i><span data-v-24984097${_scopeId2}>分享动态</span></div><div class="share-buttons" data-v-24984097${_scopeId2}><div class="share-row" data-v-24984097${_scopeId2}><button class="share-btn qq-btn" title="分享到QQ" data-v-24984097${_scopeId2}><div class="share-icon qq-icon" data-v-24984097${_scopeId2}>QQ</div><span data-v-24984097${_scopeId2}>QQ</span></button><button class="share-btn weibo-btn" title="分享到微博" data-v-24984097${_scopeId2}><div class="share-icon weibo-icon" data-v-24984097${_scopeId2}>微博</div><span data-v-24984097${_scopeId2}>微博</span></button><button class="share-btn wechat-btn" title="分享到微信" data-v-24984097${_scopeId2}><div class="share-icon wechat-icon" data-v-24984097${_scopeId2}>微信</div><span data-v-24984097${_scopeId2}>微信</span></button><button class="share-btn copy-btn" title="复制链接" data-v-24984097${_scopeId2}><div class="share-icon copy-icon" data-v-24984097${_scopeId2}>链接</div><span data-v-24984097${_scopeId2}>复制</span></button></div></div><div class="more-actions" data-v-24984097${_scopeId2}><div class="action-divider" data-v-24984097${_scopeId2}></div><button class="action-btn report-btn" data-v-24984097${_scopeId2}><i class="el-icon-warning" data-v-24984097${_scopeId2}></i><span data-v-24984097${_scopeId2}>举报</span></button><button class="action-btn collect-btn" data-v-24984097${_scopeId2}><i class="el-icon-star-off" data-v-24984097${_scopeId2}></i><span data-v-24984097${_scopeId2}>收藏</span></button></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "share-content" }, [
                        createVNode("div", { class: "share-title" }, [
                          createVNode("i", { class: "el-icon-share" }),
                          createVNode("span", null, "分享动态")
                        ]),
                        createVNode("div", { class: "share-buttons" }, [
                          createVNode("div", { class: "share-row" }, [
                            createVNode("button", {
                              onClick: ($event) => shareToQQ(item),
                              class: "share-btn qq-btn",
                              title: "分享到QQ"
                            }, [
                              createVNode("div", { class: "share-icon qq-icon" }, "QQ"),
                              createVNode("span", null, "QQ")
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => shareToWeibo(item),
                              class: "share-btn weibo-btn",
                              title: "分享到微博"
                            }, [
                              createVNode("div", { class: "share-icon weibo-icon" }, "微博"),
                              createVNode("span", null, "微博")
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => shareToWechat(item),
                              class: "share-btn wechat-btn",
                              title: "分享到微信"
                            }, [
                              createVNode("div", { class: "share-icon wechat-icon" }, "微信"),
                              createVNode("span", null, "微信")
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => copyLink(),
                              class: "share-btn copy-btn",
                              title: "复制链接"
                            }, [
                              createVNode("div", { class: "share-icon copy-icon" }, "链接"),
                              createVNode("span", null, "复制")
                            ], 8, ["onClick"])
                          ])
                        ]),
                        createVNode("div", { class: "more-actions" }, [
                          createVNode("div", { class: "action-divider" }),
                          createVNode("button", { class: "action-btn report-btn" }, [
                            createVNode("i", { class: "el-icon-warning" }),
                            createVNode("span", null, "举报")
                          ]),
                          createVNode("button", { class: "action-btn collect-btn" }, [
                            createVNode("i", { class: "el-icon-star-off" }),
                            createVNode("span", null, "收藏")
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div><div class="topic-footer-right" data-v-24984097${_scopeId}>`);
              if (!item.isShow) {
                _push2(ssrRenderComponent(_component_el_button, {
                  icon: "el-icon-caret-bottom",
                  onClick: ($event) => setPullDown(item),
                  size: "small",
                  plain: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-24984097${_scopeId2}><b data-v-24984097${_scopeId2}>${ssrInterpolate(item.commentNum)}</b>条讨论</span>`);
                    } else {
                      return [
                        createVNode("span", null, [
                          createVNode("b", null, toDisplayString(item.commentNum), 1),
                          createTextVNode("条讨论")
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (item.isShow) {
                _push2(ssrRenderComponent(_component_el_button, {
                  icon: "el-icon-caret-top",
                  onClick: ($event) => setPullDown(item),
                  size: "small",
                  plain: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-24984097${_scopeId2}>收起评论</span>`);
                    } else {
                      return [
                        createVNode("span", null, "收起评论")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div style="${ssrRenderStyle(item.isShow ? null : { display: "none" })}" data-v-24984097${_scopeId}><div class="reply-box-root" data-v-24984097${_scopeId}><div class="commenter-container" data-v-24984097${_scopeId}><div class="commenter-wrapper" data-v-24984097${_scopeId}><div class="rich-input reply-rich-input"${ssrRenderAttr("id", `reply-input-${item.id}`)} contenteditable="true" data-placeholder="写评论" data-v-24984097${_scopeId}></div><div class="commenter-footer" data-v-24984097${_scopeId}><div class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
              _push2(ssrRenderComponent(EmojiPicker, {
                onAppend: ($event) => appendEmojiToSpecificReply($event, `reply-input-${item.id}`)
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                size: "small",
                class: "replyBut",
                type: "success",
                round: "",
                onClick: ($event) => setUpPostReply(item)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`发布`);
                  } else {
                    return [
                      createTextVNode("发布")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div></div><div class="commentBox" data-v-24984097${_scopeId}><div class="css-we6n55" data-v-24984097${_scopeId}><div class="css-vpssrj" data-v-24984097${_scopeId}><div class="css-1k10w8f" data-v-24984097${_scopeId}>${ssrInterpolate(item.commentNum)} 条评论 </div></div></div><div data-v-24984097${_scopeId}>`);
              if (!comment.value || comment.value.length === 0) {
                _push2(`<div class="commentCons" data-v-24984097${_scopeId}><p data-v-24984097${_scopeId}>暂无评论，我来发表第一篇评论！</p></div>`);
              } else {
                _push2(`<div data-v-24984097${_scopeId}><!--[-->`);
                ssrRenderList(comment.value, (commentItem, index) => {
                  _push2(`<div class="comments" data-v-24984097${_scopeId}>`);
                  if (commentItem) {
                    _push2(`<div data-v-24984097${_scopeId}><div class="circle-contenr" data-v-24984097${_scopeId}><div class="topic-header" data-v-24984097${_scopeId}><div class="topic-header-left" data-v-24984097${_scopeId}><div class="topic-avatar" data-v-24984097${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_el_avatar, {
                      src: commentItem.profile
                    }, null, _parent2, _scopeId));
                    _push2(`</div><div class="topic-name" data-v-24984097${_scopeId}><div data-v-24984097${_scopeId}><div class="topic-name-data" data-v-24984097${_scopeId}><a target="_blank" data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}>${ssrInterpolate(commentItem.reviewers)}</b></a></div></div></div></div></div></div><div class="topic-content" data-v-24984097${_scopeId}><div class="topic-content-text" data-v-24984097${_scopeId}>${renderEmojiContent(commentItem.content) ?? ""}</div></div><div class="topic-footer" data-v-24984097${_scopeId}><div class="topic-footer-left" data-v-24984097${_scopeId}><span class="topic-date" data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}><time class="b2timeago" datetime="2021-12-27 21:58:17" itemprop="datePublished" data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>${ssrInterpolate(getTime(commentItem.addTime))}</span></time></b></span></div><div class="chat-dot-round" data-v-24984097${_scopeId}><span class="comment-reply" data-v-24984097${_scopeId}><i class="iconfont icon-comment" data-v-24984097${_scopeId}></i><b data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>回复</span></b></span><div data-v-24984097${_scopeId}>`);
                    if (!commentItem.isLike) {
                      _push2(`<span class="like" data-v-24984097${_scopeId}><i class="iconfont icon-like" data-v-24984097${_scopeId}></i><span class="like-num" data-v-24984097${_scopeId}>${ssrInterpolate(commentItem.loveNum > 0 ? commentItem.loveNum + "人赞" : "赞")}</span></span>`);
                    } else {
                      _push2(`<span class="like active" data-v-24984097${_scopeId}><i class="iconfont icon-like" data-v-24984097${_scopeId}></i><span class="like-num" data-v-24984097${_scopeId}>${ssrInterpolate(commentItem.loveNum > 0 ? commentItem.loveNum + "人赞" : "赞")}</span></span>`);
                    }
                    _push2(`</div></div></div><div style="${ssrRenderStyle(commentItem.isShow ? null : { display: "none" })}" class="reply-box" data-v-24984097${_scopeId}><div class="commenter-container" data-v-24984097${_scopeId}><div class="commenter-wrapper" data-v-24984097${_scopeId}><div class="rich-input reply-rich-input"${ssrRenderAttr("id", `replys-input-${commentItem.id}`)} contenteditable="true" data-placeholder="请输入内容" data-v-24984097${_scopeId}></div><div class="commenter-footer" data-v-24984097${_scopeId}><div class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
                    _push2(ssrRenderComponent(EmojiPicker, {
                      onAppend: ($event) => appendEmojiToSpecificReply($event, `replys-input-${commentItem.id}`)
                    }, null, _parent2, _scopeId));
                    _push2(`</div><div class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_el_button, {
                      size: "small",
                      class: "replyBut",
                      type: "success",
                      round: "",
                      onClick: ($event) => setUpPostReplys(
                        commentItem.responderId,
                        commentItem.id,
                        commentItem.postId
                      )
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`发布`);
                        } else {
                          return [
                            createTextVNode("发布")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(`</div></div></div></div></div>`);
                    if (commentItem.reply && commentItem.reply.length > 0) {
                      _push2(`<div class="comments" data-v-24984097${_scopeId}><!--[-->`);
                      ssrRenderList(commentItem.reply, (reply) => {
                        _push2(`<div class="reply" data-v-24984097${_scopeId}><div class="circle-contenr" data-v-24984097${_scopeId}><div class="topic-header" data-v-24984097${_scopeId}><div class="topic-header-left" data-v-24984097${_scopeId}><div class="topic-avatar" data-v-24984097${_scopeId}>`);
                        _push2(ssrRenderComponent(_component_el_avatar, {
                          src: reply.profile
                        }, null, _parent2, _scopeId));
                        _push2(`</div><div class="topic-name" data-v-24984097${_scopeId}><div data-v-24984097${_scopeId}>`);
                        if (reply.toUserId && reply.toUserId !== 0 && reply.toUserName) {
                          _push2(`<div class="topic-name-data" data-v-24984097${_scopeId}><a target="_blank" data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}>${ssrInterpolate(reply.reviewers)}${ssrInterpolate(" ")} <i class="el-icon-caret-right" style="${ssrRenderStyle({ "font-size": "12px", "font-weight": "500" })}" data-v-24984097${_scopeId}></i>回复${ssrInterpolate(" ")}${ssrInterpolate(reply.toUserName)}</b></a></div>`);
                        } else {
                          _push2(`<div class="topic-name-data" data-v-24984097${_scopeId}><a target="_blank" data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}>${ssrInterpolate(reply.reviewers)}</b></a></div>`);
                        }
                        _push2(`</div></div></div></div></div><div class="topic-content" data-v-24984097${_scopeId}><div class="topic-content-text" data-v-24984097${_scopeId}>${renderEmojiContent(reply.content) ?? ""}</div></div><div class="topic-footer" data-v-24984097${_scopeId}><div class="topic-footer-left" data-v-24984097${_scopeId}><span class="topic-date" data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}><time class="b2timeago" datetime="2021-12-27 21:58:17" itemprop="datePublished" data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>${ssrInterpolate(
                          getTime(reply.addTime)
                        )}</span></time></b></span></div><div class="chat-dot-round" data-v-24984097${_scopeId}><span class="comment-reply" data-v-24984097${_scopeId}><i class="iconfont icon-comment" data-v-24984097${_scopeId}></i><b data-v-24984097${_scopeId}><span data-v-24984097${_scopeId}>回复</span></b></span><div data-v-24984097${_scopeId}>`);
                        if (!reply.isLike) {
                          _push2(`<span class="like" data-v-24984097${_scopeId}><i class="iconfont icon-like" data-v-24984097${_scopeId}></i><span class="like-num" data-v-24984097${_scopeId}>${ssrInterpolate(reply.loveNum > 0 ? reply.loveNum + "人赞" : "赞")}</span></span>`);
                        } else {
                          _push2(`<span class="like active" data-v-24984097${_scopeId}><i class="iconfont icon-like" data-v-24984097${_scopeId}></i><span class="like-num" data-v-24984097${_scopeId}>${ssrInterpolate(reply.loveNum > 0 ? reply.loveNum + "人赞" : "赞")}</span></span>`);
                        }
                        _push2(`</div></div></div><div style="${ssrRenderStyle(reply.isShow ? null : { display: "none" })}" class="reply-box" data-v-24984097${_scopeId}><div class="commenter-container" data-v-24984097${_scopeId}><div class="commenter-wrapper" data-v-24984097${_scopeId}><div class="rich-input reply-rich-input"${ssrRenderAttr("id", `replysToUser-input-${reply.id}`)} contenteditable="true" data-placeholder="请输入内容" data-v-24984097${_scopeId}></div><div class="commenter-footer" data-v-24984097${_scopeId}><div class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
                        _push2(ssrRenderComponent(EmojiPicker, {
                          onAppend: ($event) => appendEmojiToSpecificReply($event, `replysToUser-input-${reply.id}`)
                        }, null, _parent2, _scopeId));
                        _push2(`</div><div class="flex items-center gap-x-5" data-v-24984097${_scopeId}>`);
                        _push2(ssrRenderComponent(_component_el_button, {
                          size: "small",
                          class: "replyBut",
                          type: "success",
                          round: "",
                          onClick: ($event) => setUpPostReplysTouser(
                            reply.responderId,
                            commentItem.id,
                            reply.postId,
                            reply.userId
                          )
                        }, {
                          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                            if (_push3) {
                              _push3(`发布`);
                            } else {
                              return [
                                createTextVNode("发布")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent2, _scopeId));
                        _push2(`</div></div></div></div></div></div>`);
                      });
                      _push2(`<!--]--></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div data-v-24984097${_scopeId}></div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div></div></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("div", { class: "circle-top white" }, [
                createVNode("div", {
                  id: "po-topic-box",
                  class: "box b2-radius"
                }, [
                  createVNode("div", { class: "po-topic" }, [
                    createVNode("div", { class: "circle-info" }, [
                      createVNode("div", { class: "circle-info-in" }, [
                        createVNode("div", { class: "circle-info-left" }, [
                          createVNode("img", {
                            "data-src": "",
                            alt: "",
                            src: planetInfo.value.imgclass,
                            "data-was-processed": "true",
                            class: "topimg"
                          }, null, 8, ["src"]),
                          createVNode("h1", { class: "planeth1" }, [
                            createVNode("p", null, [
                              createVNode("b", null, toDisplayString(planetInfo.value.name), 1),
                              createVNode("span", { class: "mobile-show" }, [
                                createVNode("i", { class: "b2font b2-arrow-right-s-line picked" })
                              ])
                            ]),
                            createVNode("a", { target: "_blank" }, [
                              createVNode("span", null, "Alextao"),
                              createVNode("span", null, "(圈主)")
                            ])
                          ]),
                          createVNode("div", { class: "mobile-show po-top-submit" }, [
                            createVNode("button", { class: "empty" }, "发布话题")
                          ])
                        ]),
                        createVNode("div", {
                          class: "circle-admin-info",
                          style: {}
                        }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "top-card" }, [
                              createVNode("span", { class: "" }, "所有圈子(3)")
                            ]),
                            createVNode("i", { class: "b2font b2-donut-chart-fill" })
                          ]),
                          createVNode("span", { class: "mobile-show close-admin-box" }, [
                            createVNode("i", { class: "b2font b2-close-line" })
                          ])
                        ])
                      ]),
                      createVNode("p", { class: "circle-desc tip-radius" }, " 公共区域，请文明发言! "),
                      !userJudje.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "nologin"
                      }, [
                        createVNode("div", { class: "nologintext" }, [
                          createVNode("h5", null, "您还未登录")
                        ]),
                        createVNode("div", { class: "nologintext" }, [
                          createVNode("p", { class: "circle-desc" }, " 登录后可阅读更多话题 ")
                        ])
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", {
                          class: "commenter-container",
                          ref_key: "commenterRef",
                          ref: commenterRef
                        }, [
                          createVNode("div", {
                            class: ["commenter-wrapper", { "commenter-focused": unref(inputFocus) }],
                            onClick: unref(onRichFocus)
                          }, [
                            createVNode("div", {
                              id: "rich-input",
                              ref_key: "richInputRef",
                              ref: richInputRef,
                              class: "rich-input",
                              tabindex: "-3",
                              contenteditable: "true",
                              "data-placeholder": unref(placeholder),
                              onFocus: ($event) => inputFocus.value = true,
                              onBlur: ($event) => unref(inputFocus) ? unref(onRichFocus)() : "",
                              onInput: unref(onInputText),
                              onPaste: onPasteContent
                            }, null, 40, ["data-placeholder", "onFocus", "onBlur", "onInput"]),
                            createVNode("div", { class: "commenter-upload" }),
                            createVNode("div", {
                              style: { "display": "flex", "flex-direction": "row", "flex-wrap": "wrap", "align-content": "flex-start", "justify-content": "center", "align-items": "flex-start" },
                              class: "commenter-footer flex items-center justify-between px-3 pb-3 pt-2",
                              onClick: unref(moveCursorToEnd)
                            }, [
                              createVNode("div", {
                                class: "flex items-center gap-x-5",
                                onClick: withModifiers(() => {
                                }, ["stop"])
                              }, [
                                createVNode(EmojiPicker, {
                                  onShow: unref(moveCursorToEnd),
                                  onAppend: ($event) => {
                                    unref(appendEmoji)($event);
                                    inputLength.value += 1;
                                  }
                                }, null, 8, ["onShow", "onAppend"])
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "display": "flex", "justify-content": "flex-start", "align-content": "center", "flex-wrap": "wrap", "flex-direction": "row-reverse" },
                                class: "flex items-center gap-x-5"
                              }, [
                                createVNode(_component_ElButton, {
                                  class: "!text-base",
                                  type: "primary",
                                  onClick: onSend
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 发送 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", {
                                  class: ["text-xs", [unref(inputLength) >= 1e3 ? "text-error" : "text-[#666]"]],
                                  style: { "padding": "6px" }
                                }, toDisplayString(unref(inputLength)) + " / 1000 ", 3)
                              ])
                            ], 8, ["onClick"])
                          ], 10, ["onClick"])
                        ], 512),
                        createVNode("div", { class: "PutContent" }, [
                          createVNode("div", { class: "leftMenu" })
                        ]),
                        createVNode("div", { style: { "padding": "30px", "margin-left": "56px" } })
                      ]))
                    ]),
                    createVNode("div", {
                      id: "show-form",
                      class: "po-form-box"
                    }, [
                      createVNode("div", {
                        class: "po-form-box-in",
                        style: { "opacity": "1" }
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "topic-type-menu white" }, [
                createVNode("ul", { class: "planetul" }, [
                  createVNode("li", { class: "planetli" }, [
                    createVNode(_component_el_button, {
                      type: unref(planetStore).isFilterType("all") ? "primary" : "",
                      round: "",
                      onClick: ($event) => fetchData("all")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 全部 ")
                      ]),
                      _: 1
                    }, 8, ["type", "onClick"])
                  ]),
                  createVNode("li", { class: "planetli" }, [
                    createVNode(_component_el_button, {
                      type: unref(planetStore).isFilterType("recent") ? "primary" : "",
                      round: "",
                      onClick: ($event) => fetchData("recent")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 最近 ")
                      ]),
                      _: 1
                    }, 8, ["type", "onClick"])
                  ]),
                  createVNode("li", { class: "planetli" }, [
                    createVNode(_component_el_button, {
                      type: unref(planetStore).isFilterType("hot") ? "primary" : "",
                      round: "",
                      onClick: ($event) => fetchData("hot")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 热门 ")
                      ]),
                      _: 1
                    }, 8, ["type", "onClick"])
                  ])
                ]),
                createVNode("div", { class: "topic-drop" }, [
                  createVNode("button", { class: "planettext" }, [
                    createVNode("i", { class: "el-icon-lollipop" }),
                    createVNode("span", null, "筛选")
                  ])
                ])
              ]),
              (openBlock(true), createBlock(Fragment, null, renderList(squaredata.value, (item) => {
                return openBlock(), createBlock("div", {
                  key: item.id,
                  class: "circle-contenr-out white"
                }, [
                  createVNode("div", { class: "circle-contenr" }, [
                    createVNode("div", { class: "topic-header" }, [
                      createVNode("div", { class: "topic-header-left" }, [
                        createVNode(_component_nuxt_link, {
                          to: "/otheruserinfo/" + item.userid
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "topic-avatar" }, [
                              createVNode(_component_el_avatar, {
                                src: item.authorImg
                              }, null, 8, ["src"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        createVNode("div", { class: "topic-name" }, [
                          createVNode("div", null, [
                            createVNode(_component_nuxt_link, {
                              to: "/otheruserinfo/" + item.userid
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "topic-name-data" }, [
                                  createVNode("a", { target: "_blank" }, [
                                    createVNode("b", null, toDisplayString(item.author), 1)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            createVNode("div", { class: "topic-user-lv" })
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "topic-header-right" }, [
                      createVNode("span", { class: "topic-date topic-circle" }, [
                        createVNode("a", { target: "_blank" }, [
                          createVNode("b", { class: "circle-hash" }, [
                            (openBlock(), createBlock("svg", {
                              width: "16",
                              height: "16",
                              viewBox: "0 0 36 36"
                            }, [
                              createVNode("g", { "fill-rule": "evenodd" }, [
                                createVNode("path", {
                                  d: "M18 0c9.941 0 18 8.059 18 18 0 2.723-.604 5.304-1.687 7.617v6.445a2.25 2.25 0 0 1-2.096 2.245l-.154.005-6.446.001A17.932 17.932 0 0 1 18 36C8.059 36 0 27.941 0 18S8.059 0 18 0z",
                                  "fill-opacity": ".1"
                                }),
                                createVNode("path", {
                                  d: "M23.32 7.875c.517 0 .948.18 1.293.54.296.294.444.632.444 1.015a.589.589 0 0 1-.037.202l-.258 2.17c0 .18.087.27.259.27h.96c.592 0 1.097.185 1.516.557.419.372.628.828.628 1.369 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.478c-.197 0-.308.09-.333.27l-.517 3.684c-.025.158.049.237.221.237h1.22c.591 0 1.096.191 1.515.574.419.384.628.845.628 1.386 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.7c-.172 0-.27.08-.296.237l-.273 2.062c-.05.495-.283.912-.702 1.25a2.282 2.282 0 0 1-1.478.507c-.518 0-.949-.18-1.294-.54-.295-.294-.443-.632-.443-1.015 0-.067.012-.135.037-.202l.236-2.062c.025-.158-.049-.237-.221-.237h-3.732c-.198 0-.296.08-.296.237l-.31 2.062a1.96 1.96 0 0 1-.721 1.25c-.407.338-.88.507-1.423.507-.517 0-.948-.18-1.293-.54-.296-.294-.444-.632-.444-1.015v-.202l.274-2.062c.025-.158-.062-.237-.259-.237h-.739a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.845-.628-1.386 0-.54.21-1.002.628-1.386a2.166 2.166 0 0 1 1.515-.574h1.257c.172 0 .27-.079.295-.237l.48-3.684c.025-.18-.06-.27-.258-.27h-.924a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.84-.628-1.37 0-.529.21-.985.628-1.368a2.166 2.166 0 0 1 1.515-.575h1.515c.197 0 .308-.09.333-.27L13.01 9.6c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507.518 0 .949.18 1.294.54.27.294.406.62.406.98v.237l-.294 2.17c-.025.18.061.27.259.27h3.769c.172 0 .27-.09.295-.27l.295-2.203c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507zm-3.316 7.875h-3.49c-.157 0-.256.071-.296.213l-.014.077-.45 3.956c-.02.145.029.228.144.249l.064.005h3.524c.134 0 .22-.059.26-.176l.016-.078.484-3.956c.02-.166-.037-.26-.17-.284l-.072-.006z",
                                  "fill-rule": "nonzero"
                                })
                              ])
                            ]))
                          ]),
                          createVNode("b", null, toDisplayString(item.sortName), 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "topic-content" }, [
                    createVNode("div", {
                      innerHTML: renderEmojiContent(item.content),
                      class: "topic-content-text"
                    }, null, 8, ["innerHTML"])
                  ]),
                  item.image !== null && item.image != "" ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "padding": "30px", "display": "flex", "flex-direction": "row", "width": "521px", "height": "230px", "margin-right": "10px" }
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(item.image, (imagess) => {
                      return openBlock(), createBlock("div", {
                        class: "topic-img-inner",
                        key: imagess.id
                      }, [
                        createVNode(_component_el_image, {
                          style: { "margin-right": "10px", "max-width": "400px", "height": "200px" },
                          src: imagess.url,
                          fit: "scale-down"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(imagess.url), 1)
                          ]),
                          _: 2
                        }, 1032, ["src"])
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "topic-footer" }, [
                    createVNode("div", { class: "topic-footer-left" }, [
                      !item.isLike ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => likeClickMains(item),
                        class: "planettext like-btn"
                      }, [
                        createVNode("i", { class: "el-icon-caret-top" }),
                        createVNode("span", { class: "el-icon-caret-planettext" }, toDisplayString(item.loveNum > 0 ? item.loveNum + "赞" : "赞"), 1)
                      ], 8, ["onClick"])) : (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: ($event) => likeClickMains(item),
                        class: "planettext like-btn active-like"
                      }, [
                        createVNode("i", { class: "el-icon-caret-top" }),
                        createVNode("span", { class: "el-icon-caret-planettext" }, toDisplayString(item.loveNum > 0 ? item.loveNum + "赞" : "赞"), 1)
                      ], 8, ["onClick"])),
                      !item.isLose ? (openBlock(), createBlock("button", {
                        key: 2,
                        class: "planettext dislike-btn",
                        onClick: ($event) => LoseClickMains(item)
                      }, [
                        createVNode("img", {
                          class: "link-icon--right",
                          src: _imports_0
                        }),
                        createVNode("span", null, "踩")
                      ], 8, ["onClick"])) : (openBlock(), createBlock("button", {
                        key: 3,
                        class: "planettext dislike-btn active-dislike",
                        onClick: ($event) => LoseClickMains(item)
                      }, [
                        createVNode("img", {
                          class: "link-icon--right",
                          src: _imports_0
                        }),
                        createVNode("span", null, "踩")
                      ], 8, ["onClick"])),
                      createVNode("span", { class: "topic-date" }, [
                        createVNode("b", null, [
                          createVNode("time", {
                            class: "b2timeago",
                            datetime: "2021-12-27 21:58:17",
                            itemprop: "datePublished"
                          }, [
                            createVNode("span", {
                              textContent: toDisplayString(getTime(item.addTime))
                            }, null, 8, ["textContent"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "topic-meta-more-box" }, [
                        createVNode(_component_el_popover, {
                          placement: "bottom-start",
                          title: "分享与更多",
                          width: 280,
                          trigger: "hover",
                          "popper-class": "share-popover"
                        }, {
                          reference: withCtx(() => [
                            createVNode("button", { class: "topic-date topic-meta-more" }, [
                              createVNode("div", null, "更多")
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode("div", { class: "share-content" }, [
                              createVNode("div", { class: "share-title" }, [
                                createVNode("i", { class: "el-icon-share" }),
                                createVNode("span", null, "分享动态")
                              ]),
                              createVNode("div", { class: "share-buttons" }, [
                                createVNode("div", { class: "share-row" }, [
                                  createVNode("button", {
                                    onClick: ($event) => shareToQQ(item),
                                    class: "share-btn qq-btn",
                                    title: "分享到QQ"
                                  }, [
                                    createVNode("div", { class: "share-icon qq-icon" }, "QQ"),
                                    createVNode("span", null, "QQ")
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => shareToWeibo(item),
                                    class: "share-btn weibo-btn",
                                    title: "分享到微博"
                                  }, [
                                    createVNode("div", { class: "share-icon weibo-icon" }, "微博"),
                                    createVNode("span", null, "微博")
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => shareToWechat(item),
                                    class: "share-btn wechat-btn",
                                    title: "分享到微信"
                                  }, [
                                    createVNode("div", { class: "share-icon wechat-icon" }, "微信"),
                                    createVNode("span", null, "微信")
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => copyLink(),
                                    class: "share-btn copy-btn",
                                    title: "复制链接"
                                  }, [
                                    createVNode("div", { class: "share-icon copy-icon" }, "链接"),
                                    createVNode("span", null, "复制")
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "more-actions" }, [
                                createVNode("div", { class: "action-divider" }),
                                createVNode("button", { class: "action-btn report-btn" }, [
                                  createVNode("i", { class: "el-icon-warning" }),
                                  createVNode("span", null, "举报")
                                ]),
                                createVNode("button", { class: "action-btn collect-btn" }, [
                                  createVNode("i", { class: "el-icon-star-off" }),
                                  createVNode("span", null, "收藏")
                                ])
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    createVNode("div", { class: "topic-footer-right" }, [
                      !item.isShow ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        icon: "el-icon-caret-bottom",
                        onClick: ($event) => setPullDown(item),
                        size: "small",
                        plain: ""
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, [
                            createVNode("b", null, toDisplayString(item.commentNum), 1),
                            createTextVNode("条讨论")
                          ])
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : createCommentVNode("", true),
                      item.isShow ? (openBlock(), createBlock(_component_el_button, {
                        key: 1,
                        icon: "el-icon-caret-top",
                        onClick: ($event) => setPullDown(item),
                        size: "small",
                        plain: ""
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "收起评论")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ]),
                  withDirectives(createVNode("div", null, [
                    createVNode("div", { class: "reply-box-root" }, [
                      createVNode("div", { class: "commenter-container" }, [
                        createVNode("div", { class: "commenter-wrapper" }, [
                          createVNode("div", {
                            class: "rich-input reply-rich-input",
                            id: `reply-input-${item.id}`,
                            contenteditable: "true",
                            "data-placeholder": "写评论",
                            onInput: ($event) => handleReplyInput($event, "postReplyForm"),
                            onFocus: ($event) => clearPlaceholder($event),
                            onBlur: ($event) => addPlaceholder($event)
                          }, null, 40, ["id", "onInput", "onFocus", "onBlur"]),
                          createVNode("div", { class: "commenter-footer" }, [
                            createVNode("div", { class: "flex items-center gap-x-5" }, [
                              createVNode(EmojiPicker, {
                                onAppend: ($event) => appendEmojiToSpecificReply($event, `reply-input-${item.id}`)
                              }, null, 8, ["onAppend"])
                            ]),
                            createVNode("div", { class: "flex items-center gap-x-5" }, [
                              createVNode(_component_el_button, {
                                size: "small",
                                class: "replyBut",
                                type: "success",
                                round: "",
                                onClick: ($event) => setUpPostReply(item)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("发布")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "commentBox" }, [
                      createVNode("div", { class: "css-we6n55" }, [
                        createVNode("div", { class: "css-vpssrj" }, [
                          createVNode("div", { class: "css-1k10w8f" }, toDisplayString(item.commentNum) + " 条评论 ", 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        !comment.value || comment.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "commentCons"
                        }, [
                          createVNode("p", null, "暂无评论，我来发表第一篇评论！")
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(comment.value, (commentItem, index) => {
                            return openBlock(), createBlock("div", {
                              class: "comments",
                              key: index
                            }, [
                              commentItem ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("div", { class: "circle-contenr" }, [
                                  createVNode("div", { class: "topic-header" }, [
                                    createVNode("div", { class: "topic-header-left" }, [
                                      createVNode("div", { class: "topic-avatar" }, [
                                        createVNode(_component_el_avatar, {
                                          src: commentItem.profile
                                        }, null, 8, ["src"])
                                      ]),
                                      createVNode("div", { class: "topic-name" }, [
                                        createVNode("div", null, [
                                          createVNode("div", { class: "topic-name-data" }, [
                                            createVNode("a", { target: "_blank" }, [
                                              createVNode("b", null, toDisplayString(commentItem.reviewers), 1)
                                            ])
                                          ])
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "topic-content" }, [
                                  createVNode("div", {
                                    innerHTML: renderEmojiContent(commentItem.content),
                                    class: "topic-content-text"
                                  }, null, 8, ["innerHTML"])
                                ]),
                                createVNode("div", { class: "topic-footer" }, [
                                  createVNode("div", { class: "topic-footer-left" }, [
                                    createVNode("span", { class: "topic-date" }, [
                                      createVNode("b", null, [
                                        createVNode("time", {
                                          class: "b2timeago",
                                          datetime: "2021-12-27 21:58:17",
                                          itemprop: "datePublished"
                                        }, [
                                          createVNode("span", {
                                            textContent: toDisplayString(getTime(commentItem.addTime))
                                          }, null, 8, ["textContent"])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "chat-dot-round" }, [
                                    createVNode("span", {
                                      onClick: ($event) => setReplayPullDown(commentItem),
                                      class: "comment-reply"
                                    }, [
                                      createVNode("i", { class: "iconfont icon-comment" }),
                                      createVNode("b", null, [
                                        createVNode("span", null, "回复")
                                      ])
                                    ], 8, ["onClick"]),
                                    createVNode("div", null, [
                                      !commentItem.isLike ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        onClick: ($event) => likeClick(commentItem),
                                        class: "like"
                                      }, [
                                        createVNode("i", { class: "iconfont icon-like" }),
                                        createVNode("span", { class: "like-num" }, toDisplayString(commentItem.loveNum > 0 ? commentItem.loveNum + "人赞" : "赞"), 1)
                                      ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        onClick: ($event) => likeClick(commentItem),
                                        class: "like active"
                                      }, [
                                        createVNode("i", { class: "iconfont icon-like" }),
                                        createVNode("span", { class: "like-num" }, toDisplayString(commentItem.loveNum > 0 ? commentItem.loveNum + "人赞" : "赞"), 1)
                                      ], 8, ["onClick"]))
                                    ])
                                  ])
                                ]),
                                withDirectives(createVNode("div", { class: "reply-box" }, [
                                  createVNode("div", { class: "commenter-container" }, [
                                    createVNode("div", { class: "commenter-wrapper" }, [
                                      createVNode("div", {
                                        class: "rich-input reply-rich-input",
                                        id: `replys-input-${commentItem.id}`,
                                        contenteditable: "true",
                                        "data-placeholder": "请输入内容",
                                        onInput: ($event) => handleReplyInput($event, "postReplysForm"),
                                        onFocus: ($event) => clearPlaceholder($event),
                                        onBlur: ($event) => addPlaceholder($event)
                                      }, null, 40, ["id", "onInput", "onFocus", "onBlur"]),
                                      createVNode("div", { class: "commenter-footer" }, [
                                        createVNode("div", { class: "flex items-center gap-x-5" }, [
                                          createVNode(EmojiPicker, {
                                            onAppend: ($event) => appendEmojiToSpecificReply($event, `replys-input-${commentItem.id}`)
                                          }, null, 8, ["onAppend"])
                                        ]),
                                        createVNode("div", { class: "flex items-center gap-x-5" }, [
                                          createVNode(_component_el_button, {
                                            size: "small",
                                            class: "replyBut",
                                            type: "success",
                                            round: "",
                                            onClick: ($event) => setUpPostReplys(
                                              commentItem.responderId,
                                              commentItem.id,
                                              commentItem.postId
                                            )
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("发布")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ])
                                      ])
                                    ])
                                  ])
                                ], 512), [
                                  [vShow, commentItem.isShow]
                                ]),
                                commentItem.reply && commentItem.reply.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "comments"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(commentItem.reply, (reply) => {
                                    return openBlock(), createBlock("div", {
                                      class: "reply",
                                      key: reply.id
                                    }, [
                                      createVNode("div", { class: "circle-contenr" }, [
                                        createVNode("div", { class: "topic-header" }, [
                                          createVNode("div", { class: "topic-header-left" }, [
                                            createVNode("div", { class: "topic-avatar" }, [
                                              createVNode(_component_el_avatar, {
                                                src: reply.profile
                                              }, null, 8, ["src"])
                                            ]),
                                            createVNode("div", { class: "topic-name" }, [
                                              createVNode("div", null, [
                                                reply.toUserId && reply.toUserId !== 0 && reply.toUserName ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "topic-name-data"
                                                }, [
                                                  createVNode("a", { target: "_blank" }, [
                                                    createVNode("b", null, [
                                                      createTextVNode(toDisplayString(reply.reviewers) + toDisplayString(" ") + " ", 1),
                                                      createVNode("i", {
                                                        class: "el-icon-caret-right",
                                                        style: { "font-size": "12px", "font-weight": "500" }
                                                      }),
                                                      createTextVNode("回复" + toDisplayString(" ") + toDisplayString(reply.toUserName), 1)
                                                    ])
                                                  ])
                                                ])) : (openBlock(), createBlock("div", {
                                                  key: 1,
                                                  class: "topic-name-data"
                                                }, [
                                                  createVNode("a", { target: "_blank" }, [
                                                    createVNode("b", null, toDisplayString(reply.reviewers), 1)
                                                  ])
                                                ]))
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", { class: "topic-content" }, [
                                        createVNode("div", {
                                          innerHTML: renderEmojiContent(reply.content),
                                          class: "topic-content-text"
                                        }, null, 8, ["innerHTML"])
                                      ]),
                                      createVNode("div", { class: "topic-footer" }, [
                                        createVNode("div", { class: "topic-footer-left" }, [
                                          createVNode("span", { class: "topic-date" }, [
                                            createVNode("b", null, [
                                              createVNode("time", {
                                                class: "b2timeago",
                                                datetime: "2021-12-27 21:58:17",
                                                itemprop: "datePublished"
                                              }, [
                                                createVNode("span", {
                                                  textContent: toDisplayString(
                                                    getTime(reply.addTime)
                                                  )
                                                }, null, 8, ["textContent"])
                                              ])
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "chat-dot-round" }, [
                                          createVNode("span", {
                                            onClick: ($event) => setReplaysPullDown(reply),
                                            class: "comment-reply"
                                          }, [
                                            createVNode("i", { class: "iconfont icon-comment" }),
                                            createVNode("b", null, [
                                              createVNode("span", null, "回复")
                                            ])
                                          ], 8, ["onClick"]),
                                          createVNode("div", null, [
                                            !reply.isLike ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              onClick: ($event) => likeClicks(reply),
                                              class: "like"
                                            }, [
                                              createVNode("i", { class: "iconfont icon-like" }),
                                              createVNode("span", { class: "like-num" }, toDisplayString(reply.loveNum > 0 ? reply.loveNum + "人赞" : "赞"), 1)
                                            ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                                              key: 1,
                                              onClick: ($event) => likeClicks(reply),
                                              class: "like active"
                                            }, [
                                              createVNode("i", { class: "iconfont icon-like" }),
                                              createVNode("span", { class: "like-num" }, toDisplayString(reply.loveNum > 0 ? reply.loveNum + "人赞" : "赞"), 1)
                                            ], 8, ["onClick"]))
                                          ])
                                        ])
                                      ]),
                                      withDirectives(createVNode("div", { class: "reply-box" }, [
                                        createVNode("div", { class: "commenter-container" }, [
                                          createVNode("div", { class: "commenter-wrapper" }, [
                                            createVNode("div", {
                                              class: "rich-input reply-rich-input",
                                              id: `replysToUser-input-${reply.id}`,
                                              contenteditable: "true",
                                              "data-placeholder": "请输入内容",
                                              onInput: ($event) => handleReplyInput($event, "postReplysToUserForm"),
                                              onFocus: ($event) => clearPlaceholder($event),
                                              onBlur: ($event) => addPlaceholder($event)
                                            }, null, 40, ["id", "onInput", "onFocus", "onBlur"]),
                                            createVNode("div", { class: "commenter-footer" }, [
                                              createVNode("div", { class: "flex items-center gap-x-5" }, [
                                                createVNode(EmojiPicker, {
                                                  onAppend: ($event) => appendEmojiToSpecificReply($event, `replysToUser-input-${reply.id}`)
                                                }, null, 8, ["onAppend"])
                                              ]),
                                              createVNode("div", { class: "flex items-center gap-x-5" }, [
                                                createVNode(_component_el_button, {
                                                  size: "small",
                                                  class: "replyBut",
                                                  type: "success",
                                                  round: "",
                                                  onClick: ($event) => setUpPostReplysTouser(
                                                    reply.responderId,
                                                    commentItem.id,
                                                    reply.postId,
                                                    reply.userId
                                                  )
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("发布")
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"])
                                              ])
                                            ])
                                          ])
                                        ])
                                      ], 512), [
                                        [vShow, reply.isShow]
                                      ])
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true),
                                createVNode("div")
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ]))
                      ])
                    ])
                  ], 512), [
                    [vShow, item.isShow]
                  ])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_aside, { width: "260px" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section id="b2-widget-user-6" class="mobile-hidden widget b2-widget-user mg-b b2-radius b2-radius-aside-right" data-v-24984097${_scopeId}><div class="b2-widget-box" data-v-24984097${_scopeId}><div id="user-widget" class="user-widget" data-v-24984097${_scopeId}><div class="user-widget-content" data-v-24984097${_scopeId}><div style="${ssrRenderStyle({})}" data-v-24984097${_scopeId}><div data-v-24984097${_scopeId}><div class="user-w-logon" data-v-24984097${_scopeId}><div class="tools" data-v-24984097${_scopeId}><div class="circle" data-v-24984097${_scopeId}><span class="red box1" data-v-24984097${_scopeId}></span></div><div class="circle" data-v-24984097${_scopeId}><span class="yellow box1" data-v-24984097${_scopeId}></span></div><div class="circle" data-v-24984097${_scopeId}><span class="green box1" data-v-24984097${_scopeId}></span></div></div><p class="user-w-logon-title b2-color" data-v-24984097${_scopeId}>${ssrInterpolate(sentence.value)}</p></div><div data-v-24984097${_scopeId}><div class="oauth-login-button" data-v-24984097${_scopeId}><a href="" class="login-weixin" data-v-24984097${_scopeId}>微信登录</a><a href="" class="login-weibo" data-v-24984097${_scopeId}>Github登录</a><a href="https://graph.qq.com/oauth2.0/authorize?client_id=101057247&amp;state=6b96c86f14fab2f3ce7af8fc5d72c943&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F7b2.com%2Fopen%3Ftype%3Dqq" class="login-qq" data-v-24984097${_scopeId}>qq登录</a></div></div></div><div class="user-w-announcement" data-v-24984097${_scopeId}><div data-v-24984097${_scopeId}><ul class="planet-aside-ul" data-v-24984097${_scopeId}><!--[-->`);
            ssrRenderList(announcementsList.value, (item) => {
              _push2(`<div data-v-24984097${_scopeId}><li class="planet-aside-li-ad" data-v-24984097${_scopeId}><b data-v-24984097${_scopeId}>${ssrInterpolate(item.title)}:</b><span href="#" data-v-24984097${_scopeId}>${ssrInterpolate(item.content)}</span></li></div>`);
            });
            _push2(`<!--]--></ul></div></div></div><div class="widget-mission-footer" data-v-24984097${_scopeId}>`);
            _push2(ssrRenderComponent(_component_router_link, {
              to: "/Notification/system",
              class: "allad",
              target: "_blank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`全部公告`);
                } else {
                  return [
                    createTextVNode("全部公告")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></section>`);
          } else {
            return [
              createVNode("section", {
                id: "b2-widget-user-6",
                class: "mobile-hidden widget b2-widget-user mg-b b2-radius b2-radius-aside-right"
              }, [
                createVNode("div", { class: "b2-widget-box" }, [
                  createVNode("div", {
                    id: "user-widget",
                    class: "user-widget"
                  }, [
                    createVNode("div", { class: "user-widget-content" }, [
                      createVNode("div", { style: {} }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "user-w-logon" }, [
                            createVNode("div", { class: "tools" }, [
                              createVNode("div", { class: "circle" }, [
                                createVNode("span", { class: "red box1" })
                              ]),
                              createVNode("div", { class: "circle" }, [
                                createVNode("span", { class: "yellow box1" })
                              ]),
                              createVNode("div", { class: "circle" }, [
                                createVNode("span", { class: "green box1" })
                              ])
                            ]),
                            createVNode("p", { class: "user-w-logon-title b2-color" }, toDisplayString(sentence.value), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "oauth-login-button" }, [
                              createVNode("a", {
                                href: "",
                                class: "login-weixin"
                              }, "微信登录"),
                              createVNode("a", {
                                href: "",
                                class: "login-weibo"
                              }, "Github登录"),
                              createVNode("a", {
                                href: "https://graph.qq.com/oauth2.0/authorize?client_id=101057247&state=6b96c86f14fab2f3ce7af8fc5d72c943&response_type=code&redirect_uri=https%3A%2F%2F7b2.com%2Fopen%3Ftype%3Dqq",
                                class: "login-qq"
                              }, "qq登录")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "user-w-announcement" }, [
                          createVNode("div", null, [
                            createVNode("ul", { class: "planet-aside-ul" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(announcementsList.value, (item) => {
                                return openBlock(), createBlock("div", {
                                  key: item.id
                                }, [
                                  createVNode("li", { class: "planet-aside-li-ad" }, [
                                    createVNode("b", null, toDisplayString(item.title) + ":", 1),
                                    createVNode("span", { href: "#" }, toDisplayString(item.content), 1)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "widget-mission-footer" }, [
                        createVNode(_component_router_link, {
                          to: "/Notification/system",
                          class: "allad",
                          target: "_blank"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("全部公告")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="clearfix pt-8" data-v-24984097></div></div></div></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-indicator" data-v-24984097><div class="loader" data-v-24984097></div></div>`);
      } else {
        _push(`<div data-v-24984097><div class="loading-indicator" data-v-24984097>我是有底线的</div></div>`);
      }
      _push(`<div infos="0" data-v-24984097><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-24984097></div></div></div></div>`);
      if (showHelpModal.value) {
        _push(`<div class="help-modal-overlay" data-v-24984097><div class="help-modal" data-v-24984097><div class="help-modal-header" data-v-24984097><h2 data-v-24984097>${ssrInterpolate(helpModalTitle.value)}</h2><button class="help-modal-close" data-v-24984097><i class="el-icon-close" data-v-24984097></i></button></div><div class="help-modal-body" data-v-24984097><div data-v-24984097>${helpModalContent.value ?? ""}</div></div><div class="help-modal-footer" data-v-24984097><button class="help-modal-btn" data-v-24984097>我知道了</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Planet/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-24984097"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-5CjkeV3r.mjs.map
