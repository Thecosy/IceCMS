import { _ as __nuxt_component_0, E as ElAvatar, o as dropdownMenuProps, C as COLLECTION_INJECTION_KEY$1, p as createCollectionWithScope, q as dropdownItemProps, r as ElCollectionItem$1, s as dropdownProps, t as ElCollection$1, F as FIRST_LAST_KEYS, L as LAST_KEYS, u as COLLECTION_ITEM_INJECTION_KEY$1, v as COLLECTION_ITEM_SIGN } from './Top-z7S4M5x-.mjs';
import { E as ElSelect, a as ElOption } from './el-select-ZvTonYnZ.mjs';
import { E as ElDatePicker } from './el-date-picker-Dm-PCStW.mjs';
import { E as ElButton, a as ElIcon, g as check_default, a6 as refresh_default, X as clock_default, a7 as bell_default, U as arrow_down_default, a2 as arrow_up_default, a8 as star_default, w as withInstall, a9 as more_default, n as withNoopInstall, aa as copy_document_default, ab as share_default, i as delete_default, _ as _export_sfc$1, c as useLocale, t as addUnit, r as useFormSize, b as buildProps, d as definePropType } from './el-button-LIU117i9.mjs';
import { E as ElTooltip, c as composeEventHandlers, O as OnlyChild, w as whenMouse } from './el-popper-mKntyvEc.mjs';
import { ref, computed, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, withModifiers, defineComponent, createElementBlock, normalizeStyle, normalizeClass, renderSlot, inject, resolveComponent, getCurrentInstance, createCommentVNode, createSlots, watch, provide, toRef, Fragment, createElementVNode, resolveDynamicComponent, nextTick, normalizeProps, guardReactiveProps, readonly, useSSRContext } from 'vue';
import { E as ElScrollbar } from './index-DM9QPBoH.mjs';
import { d as useEventListener } from './el-input-2q_vffSS.mjs';
import { _ as _export_sfc, e as useNamespace, k as useId, C as isUndefined } from './server.mjs';
import { castArray } from 'lodash-unified';
import { F as FOCUS_TRAP_INJECTION_KEY, E as EVENT_CODE } from './index-C6mv4HvU.mjs';
import { c as composeRefs } from './el-overlay-D0BXiGeq.mjs';
import { E as ElPagination } from './el-pagination-BWqT6DSk.mjs';
import { _ as __nuxt_component_12 } from './Foot-CtrGagsf.mjs';
import { v as vLoading } from './el-loading-B0BjiLcr.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { a as getAnnouncementslist } from './webannouncements-Cw9vJNJn.mjs';
import dayjs from 'dayjs';
import { isObject } from '@vue/shared';
import { E as ElNotification } from './index-0K9UalJV.mjs';
import { E as ElMessage } from './index-D2_eFSsF.mjs';
import './el-form-DWMILsFE.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './useUserStore-gmH42dcJ.mjs';
import './index-uy8e5Xzu.mjs';
import 'perfect-debounce';
import './webuser-CDNs4gr0.mjs';
import './event-BZTOGHfp.mjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/weekOfYear.js';
import 'dayjs/plugin/weekYear.js';
import 'dayjs/plugin/dayOfYear.js';
import 'dayjs/plugin/isSameOrAfter.js';
import 'dayjs/plugin/isSameOrBefore.js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const rovingFocusGroupProps = buildProps({
  style: { type: definePropType([String, Array, Object]) },
  currentTabId: {
    type: definePropType(String)
  },
  defaultCurrentTabId: String,
  loop: Boolean,
  dir: {
    type: String,
    values: ["ltr", "rtl"],
    default: "ltr"
  },
  orientation: {
    type: definePropType(String)
  },
  onBlur: Function,
  onFocus: Function,
  onMousedown: Function
});
const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY
} = createCollectionWithScope("RovingFocusGroup");
const ROVING_FOCUS_GROUP_INJECTION_KEY = Symbol("elRovingFocusGroup");
const ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY = Symbol("elRovingFocusGroupItem");
const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
const getDirectionAwareKey = (key, dir) => {
  return key;
};
const getFocusIntent = (event, orientation, dir) => {
  const key = getDirectionAwareKey(event.code);
  return MAP_KEY_TO_FOCUS_INTENT[key];
};
const reorderArray = (array, atIdx) => {
  return array.map((_, idx) => array[(idx + atIdx) % array.length]);
};
const focusFirst = (elements) => {
  const { activeElement: prevActive } = void 0;
  for (const element of elements) {
    if (element === prevActive)
      return;
    element.focus();
    if (prevActive !== (void 0).activeElement)
      return;
  }
};
const CURRENT_TAB_ID_CHANGE_EVT = "currentTabIdChange";
const ENTRY_FOCUS_EVT = "rovingFocusGroup.entryFocus";
const EVT_OPTS = { bubbles: false, cancelable: true };
const _sfc_main$7 = defineComponent({
  name: "ElRovingFocusGroupImpl",
  inheritAttrs: false,
  props: rovingFocusGroupProps,
  emits: [CURRENT_TAB_ID_CHANGE_EVT, "entryFocus"],
  setup(props, { emit }) {
    var _a;
    const currentTabbedId = ref((_a = props.currentTabId || props.defaultCurrentTabId) != null ? _a : null);
    const isBackingOut = ref(false);
    const isClickFocus = ref(false);
    const rovingFocusGroupRef = ref(null);
    const { getItems } = inject(COLLECTION_INJECTION_KEY, void 0);
    const rovingFocusGroupRootStyle = computed(() => {
      return [
        {
          outline: "none"
        },
        props.style
      ];
    });
    const onItemFocus = (tabbedId) => {
      emit(CURRENT_TAB_ID_CHANGE_EVT, tabbedId);
    };
    const onItemShiftTab = () => {
      isBackingOut.value = true;
    };
    const onMousedown = composeEventHandlers((e) => {
      var _a2;
      (_a2 = props.onMousedown) == null ? void 0 : _a2.call(props, e);
    }, () => {
      isClickFocus.value = true;
    });
    const onFocus = composeEventHandlers((e) => {
      var _a2;
      (_a2 = props.onFocus) == null ? void 0 : _a2.call(props, e);
    }, (e) => {
      const isKeyboardFocus = !unref(isClickFocus);
      const { target, currentTarget } = e;
      if (target === currentTarget && isKeyboardFocus && !unref(isBackingOut)) {
        const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
        currentTarget == null ? void 0 : currentTarget.dispatchEvent(entryFocusEvt);
        if (!entryFocusEvt.defaultPrevented) {
          const items = getItems().filter((item) => item.focusable);
          const activeItem = items.find((item) => item.active);
          const currentItem = items.find((item) => item.id === unref(currentTabbedId));
          const candidates = [activeItem, currentItem, ...items].filter(Boolean);
          const candidateNodes = candidates.map((item) => item.ref);
          focusFirst(candidateNodes);
        }
      }
      isClickFocus.value = false;
    });
    const onBlur = composeEventHandlers((e) => {
      var _a2;
      (_a2 = props.onBlur) == null ? void 0 : _a2.call(props, e);
    }, () => {
      isBackingOut.value = false;
    });
    const handleEntryFocus = (...args) => {
      emit("entryFocus", ...args);
    };
    provide(ROVING_FOCUS_GROUP_INJECTION_KEY, {
      currentTabbedId: readonly(currentTabbedId),
      loop: toRef(props, "loop"),
      tabIndex: computed(() => {
        return unref(isBackingOut) ? -1 : 0;
      }),
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      orientation: toRef(props, "orientation"),
      dir: toRef(props, "dir"),
      onItemFocus,
      onItemShiftTab,
      onBlur,
      onFocus,
      onMousedown
    });
    watch(() => props.currentTabId, (val) => {
      currentTabbedId.value = val != null ? val : null;
    });
    useEventListener(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus);
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var ElRovingFocusGroupImpl = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["render", _sfc_render$6], ["__file", "roving-focus-group-impl.vue"]]);
const _sfc_main$6 = defineComponent({
  name: "ElRovingFocusGroup",
  components: {
    ElFocusGroupCollection: ElCollection,
    ElRovingFocusGroupImpl
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_group_impl = resolveComponent("el-roving-focus-group-impl");
  const _component_el_focus_group_collection = resolveComponent("el-focus-group-collection");
  return openBlock(), createBlock(_component_el_focus_group_collection, null, {
    default: withCtx(() => [
      createVNode(_component_el_roving_focus_group_impl, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)
    ]),
    _: 3
  });
}
var ElRovingFocusGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["render", _sfc_render$5], ["__file", "roving-focus-group.vue"]]);
const DROPDOWN_INJECTION_KEY = Symbol("elDropdown");
const { ButtonGroup: ElButtonGroup } = ElButton;
const _sfc_main$5 = defineComponent({
  name: "ElDropdown",
  components: {
    ElButton,
    ElButtonGroup,
    ElScrollbar,
    ElDropdownCollection: ElCollection$1,
    ElTooltip,
    ElRovingFocusGroup,
    ElOnlyChild: OnlyChild,
    ElIcon,
    ArrowDown: arrow_down_default
  },
  props: dropdownProps,
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = getCurrentInstance();
    const ns = useNamespace("dropdown");
    const { t } = useLocale();
    const triggeringElementRef = ref();
    const referenceElementRef = ref();
    const popperRef = ref(null);
    const contentRef = ref(null);
    const scrollbar = ref(null);
    const currentTabId = ref(null);
    const isUsingKeyboard = ref(false);
    const wrapStyle = computed(() => ({
      maxHeight: addUnit(props.maxHeight)
    }));
    const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)]);
    const trigger = computed(() => castArray(props.trigger));
    const defaultTriggerId = useId().value;
    const triggerId = computed(() => props.id || defaultTriggerId);
    watch([triggeringElementRef, trigger], ([triggeringElement, trigger2], [prevTriggeringElement]) => {
      var _a, _b, _c;
      if ((_a = prevTriggeringElement == null ? void 0 : prevTriggeringElement.$el) == null ? void 0 : _a.removeEventListener) {
        prevTriggeringElement.$el.removeEventListener("pointerenter", onAutofocusTriggerEnter);
      }
      if ((_b = triggeringElement == null ? void 0 : triggeringElement.$el) == null ? void 0 : _b.removeEventListener) {
        triggeringElement.$el.removeEventListener("pointerenter", onAutofocusTriggerEnter);
      }
      if (((_c = triggeringElement == null ? void 0 : triggeringElement.$el) == null ? void 0 : _c.addEventListener) && trigger2.includes("hover")) {
        triggeringElement.$el.addEventListener("pointerenter", onAutofocusTriggerEnter);
      }
    }, { immediate: true });
    function handleClick() {
      handleClose();
    }
    function handleClose() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose();
    }
    function handleOpen() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onOpen();
    }
    const dropdownSize = useFormSize();
    function commandHandler(...args) {
      emit("command", ...args);
    }
    function onAutofocusTriggerEnter() {
      var _a, _b;
      (_b = (_a = triggeringElementRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.focus();
    }
    function onItemEnter() {
    }
    function onItemLeave() {
      const contentEl = unref(contentRef);
      trigger.value.includes("hover") && (contentEl == null ? void 0 : contentEl.focus());
      currentTabId.value = null;
    }
    function handleCurrentTabIdChange(id) {
      currentTabId.value = id;
    }
    function handleEntryFocus(e) {
      if (!isUsingKeyboard.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }
    function handleBeforeShowTooltip() {
      emit("visible-change", true);
    }
    function handleShowTooltip(event) {
      if ((event == null ? void 0 : event.type) === "keydown") {
        contentRef.value.focus();
      }
    }
    function handleBeforeHideTooltip() {
      emit("visible-change", false);
    }
    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave
    });
    provide("elDropdown", {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, "trigger"),
      hideOnClick: toRef(props, "hideOnClick")
    });
    const onFocusAfterTrapped = (e) => {
      var _a, _b;
      e.preventDefault();
      (_b = (_a = contentRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a, {
        preventScroll: true
      });
    };
    const handlerMainButtonClick = (event) => {
      emit("click", event);
    };
    return {
      t,
      ns,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      triggerId,
      currentTabId,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleEntryFocus,
      handleClose,
      handleOpen,
      handleBeforeShowTooltip,
      handleShowTooltip,
      handleBeforeHideTooltip,
      onFocusAfterTrapped,
      popperRef,
      contentRef,
      triggeringElementRef,
      referenceElementRef
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_el_dropdown_collection = resolveComponent("el-dropdown-collection");
  const _component_el_roving_focus_group = resolveComponent("el-roving-focus-group");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_only_child = resolveComponent("el-only-child");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_button = resolveComponent("el-button");
  const _component_arrow_down = resolveComponent("arrow-down");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button_group = resolveComponent("el-button-group");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.ns.b(), _ctx.ns.is("disabled", _ctx.disabled)])
  }, [
    createVNode(_component_el_tooltip, {
      ref: "popperRef",
      role: _ctx.role,
      effect: _ctx.effect,
      "fallback-placements": ["bottom", "top"],
      "popper-options": _ctx.popperOptions,
      "gpu-acceleration": false,
      "hide-after": _ctx.trigger === "hover" ? _ctx.hideTimeout : 0,
      "manual-mode": true,
      placement: _ctx.placement,
      "popper-class": [_ctx.ns.e("popper"), _ctx.popperClass],
      "reference-element": (_a = _ctx.referenceElementRef) == null ? void 0 : _a.$el,
      trigger: _ctx.trigger,
      "trigger-keys": _ctx.triggerKeys,
      "trigger-target-el": _ctx.contentRef,
      "show-after": _ctx.trigger === "hover" ? _ctx.showTimeout : 0,
      "stop-popper-mouse-event": false,
      "virtual-ref": _ctx.triggeringElementRef,
      "virtual-triggering": _ctx.splitButton,
      disabled: _ctx.disabled,
      transition: `${_ctx.ns.namespace.value}-zoom-in-top`,
      teleported: _ctx.teleported,
      pure: "",
      persistent: "",
      onBeforeShow: _ctx.handleBeforeShowTooltip,
      onShow: _ctx.handleShowTooltip,
      onBeforeHide: _ctx.handleBeforeHideTooltip
    }, createSlots({
      content: withCtx(() => [
        createVNode(_component_el_scrollbar, {
          ref: "scrollbar",
          "wrap-style": _ctx.wrapStyle,
          tag: "div",
          "view-class": _ctx.ns.e("list")
        }, {
          default: withCtx(() => [
            createVNode(_component_el_roving_focus_group, {
              loop: _ctx.loop,
              "current-tab-id": _ctx.currentTabId,
              orientation: "horizontal",
              onCurrentTabIdChange: _ctx.handleCurrentTabIdChange,
              onEntryFocus: _ctx.handleEntryFocus
            }, {
              default: withCtx(() => [
                createVNode(_component_el_dropdown_collection, null, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "dropdown")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 8, ["loop", "current-tab-id", "onCurrentTabIdChange", "onEntryFocus"])
          ]),
          _: 3
        }, 8, ["wrap-style", "view-class"])
      ]),
      _: 2
    }, [
      !_ctx.splitButton ? {
        name: "default",
        fn: withCtx(() => [
          createVNode(_component_el_only_child, {
            id: _ctx.triggerId,
            ref: "triggeringElementRef",
            role: "button",
            tabindex: _ctx.tabindex
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "tabindex"])
        ])
      } : void 0
    ]), 1032, ["role", "effect", "popper-options", "hide-after", "placement", "popper-class", "reference-element", "trigger", "trigger-keys", "trigger-target-el", "show-after", "virtual-ref", "virtual-triggering", "disabled", "transition", "teleported", "onBeforeShow", "onShow", "onBeforeHide"]),
    _ctx.splitButton ? (openBlock(), createBlock(_component_el_button_group, { key: 0 }, {
      default: withCtx(() => [
        createVNode(_component_el_button, mergeProps({ ref: "referenceElementRef" }, _ctx.buttonProps, {
          size: _ctx.dropdownSize,
          type: _ctx.type,
          disabled: _ctx.disabled,
          tabindex: _ctx.tabindex,
          onClick: _ctx.handlerMainButtonClick
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["size", "type", "disabled", "tabindex", "onClick"]),
        createVNode(_component_el_button, mergeProps({
          id: _ctx.triggerId,
          ref: "triggeringElementRef"
        }, _ctx.buttonProps, {
          role: "button",
          size: _ctx.dropdownSize,
          type: _ctx.type,
          class: _ctx.ns.e("caret-button"),
          disabled: _ctx.disabled,
          tabindex: _ctx.tabindex,
          "aria-label": _ctx.t("el.dropdown.toggleDropdown")
        }), {
          default: withCtx(() => [
            createVNode(_component_el_icon, {
              class: normalizeClass(_ctx.ns.e("icon"))
            }, {
              default: withCtx(() => [
                createVNode(_component_arrow_down)
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 16, ["id", "size", "type", "class", "disabled", "tabindex", "aria-label"])
      ]),
      _: 3
    })) : createCommentVNode("v-if", true)
  ], 2);
}
var Dropdown = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["render", _sfc_render$4], ["__file", "dropdown.vue"]]);
const _sfc_main$4 = defineComponent({
  components: {
    ElRovingFocusCollectionItem: ElCollectionItem
  },
  props: {
    focusable: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ["mousedown", "focus", "keydown"],
  setup(props, { emit }) {
    const { currentTabbedId, loop, onItemFocus, onItemShiftTab } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const { getItems } = inject(COLLECTION_INJECTION_KEY, void 0);
    const id = useId();
    const rovingFocusGroupItemRef = ref(null);
    const handleMousedown = composeEventHandlers((e) => {
      emit("mousedown", e);
    }, (e) => {
      if (!props.focusable) {
        e.preventDefault();
      } else {
        onItemFocus(unref(id));
      }
    });
    const handleFocus = composeEventHandlers((e) => {
      emit("focus", e);
    }, () => {
      onItemFocus(unref(id));
    });
    const handleKeydown = composeEventHandlers((e) => {
      emit("keydown", e);
    }, (e) => {
      const { code, shiftKey, target, currentTarget } = e;
      if (code === EVENT_CODE.tab && shiftKey) {
        onItemShiftTab();
        return;
      }
      if (target !== currentTarget)
        return;
      const focusIntent = getFocusIntent(e);
      if (focusIntent) {
        e.preventDefault();
        const items = getItems().filter((item) => item.focusable);
        let elements = items.map((item) => item.ref);
        switch (focusIntent) {
          case "last": {
            elements.reverse();
            break;
          }
          case "prev":
          case "next": {
            if (focusIntent === "prev") {
              elements.reverse();
            }
            const currentIdx = elements.indexOf(currentTarget);
            elements = loop.value ? reorderArray(elements, currentIdx + 1) : elements.slice(currentIdx + 1);
            break;
          }
        }
        nextTick(() => {
          focusFirst(elements);
        });
      }
    });
    const isCurrentTab = computed(() => currentTabbedId.value === unref(id));
    provide(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
      rovingFocusGroupItemRef,
      tabIndex: computed(() => unref(isCurrentTab) ? 0 : -1),
      handleMousedown,
      handleFocus,
      handleKeydown
    });
    return {
      id,
      handleKeydown,
      handleFocus,
      handleMousedown
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_collection_item = resolveComponent("el-roving-focus-collection-item");
  return openBlock(), createBlock(_component_el_roving_focus_collection_item, {
    id: _ctx.id,
    focusable: _ctx.focusable,
    active: _ctx.active
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "focusable", "active"]);
}
var ElRovingFocusItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["render", _sfc_render$3], ["__file", "roving-focus-item.vue"]]);
const _sfc_main$3 = defineComponent({
  name: "DropdownItemImpl",
  components: {
    ElIcon
  },
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click", "clickimpl"],
  setup(_, { emit }) {
    const ns = useNamespace("dropdown");
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionItemRef: dropdownCollectionItemRef } = inject(COLLECTION_ITEM_INJECTION_KEY$1, void 0);
    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(COLLECTION_ITEM_INJECTION_KEY, void 0);
    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
    const itemRef = composeRefs(dropdownCollectionItemRef, rovingFocusCollectionItemRef, rovingFocusGroupItemRef);
    const role = computed(() => {
      if (menuRole.value === "menu") {
        return "menuitem";
      } else if (menuRole.value === "navigation") {
        return "link";
      }
      return "button";
    });
    const handleKeydown = composeEventHandlers((e) => {
      if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space].includes(e.code)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        emit("clickimpl", e);
        return true;
      }
    }, handleItemKeydown);
    return {
      ns,
      itemRef,
      dataset: {
        [COLLECTION_ITEM_SIGN]: ""
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock(Fragment, null, [
    _ctx.divided ? (openBlock(), createElementBlock("li", {
      key: 0,
      role: "separator",
      class: normalizeClass(_ctx.ns.bem("menu", "item", "divided"))
    }, null, 2)) : createCommentVNode("v-if", true),
    createElementVNode("li", mergeProps({ ref: _ctx.itemRef }, { ..._ctx.dataset, ..._ctx.$attrs }, {
      "aria-disabled": _ctx.disabled,
      class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
      tabindex: _ctx.tabIndex,
      role: _ctx.role,
      onClick: (e) => _ctx.$emit("clickimpl", e),
      onFocus: _ctx.handleFocus,
      onKeydown: withModifiers(_ctx.handleKeydown, ["self"]),
      onMousedown: _ctx.handleMousedown,
      onPointermove: (e) => _ctx.$emit("pointermove", e),
      onPointerleave: (e) => _ctx.$emit("pointerleave", e)
    }), [
      _ctx.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
        ]),
        _: 1
      })) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default")
    ], 16, ["aria-disabled", "tabindex", "role", "onClick", "onFocus", "onKeydown", "onMousedown", "onPointermove", "onPointerleave"])
  ], 64);
}
var ElDropdownItemImpl = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["render", _sfc_render$2], ["__file", "dropdown-item-impl.vue"]]);
const useDropdown = () => {
  const elDropdown = inject("elDropdown", {});
  const _elDropdownSize = computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    elDropdown,
    _elDropdownSize
  };
};
const _sfc_main$2 = defineComponent({
  name: "ElDropdownItem",
  components: {
    ElDropdownCollectionItem: ElCollectionItem$1,
    ElRovingFocusItem,
    ElDropdownItemImpl
  },
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click"],
  setup(props, { emit, attrs }) {
    const { elDropdown } = useDropdown();
    const _instance = getCurrentInstance();
    const itemRef = ref(null);
    const textContent = computed(() => {
      var _a, _b;
      return (_b = (_a = unref(itemRef)) == null ? void 0 : _a.textContent) != null ? _b : "";
    });
    const { onItemEnter, onItemLeave } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const handlePointerMove = composeEventHandlers((e) => {
      emit("pointermove", e);
      return e.defaultPrevented;
    }, whenMouse((e) => {
      if (props.disabled) {
        onItemLeave(e);
        return;
      }
      const target = e.currentTarget;
      if (target === (void 0).activeElement || target.contains((void 0).activeElement)) {
        return;
      }
      onItemEnter(e);
      if (!e.defaultPrevented) {
        target == null ? void 0 : target.focus();
      }
    }));
    const handlePointerLeave = composeEventHandlers((e) => {
      emit("pointerleave", e);
      return e.defaultPrevented;
    }, whenMouse(onItemLeave));
    const handleClick = composeEventHandlers((e) => {
      if (props.disabled) {
        return;
      }
      emit("click", e);
      return e.type !== "keydown" && e.defaultPrevented;
    }, (e) => {
      var _a, _b, _c;
      if (props.disabled) {
        e.stopImmediatePropagation();
        return;
      }
      if ((_a = elDropdown == null ? void 0 : elDropdown.hideOnClick) == null ? void 0 : _a.value) {
        (_b = elDropdown.handleClick) == null ? void 0 : _b.call(elDropdown);
      }
      (_c = elDropdown.commandHandler) == null ? void 0 : _c.call(elDropdown, props.command, _instance, e);
    });
    const propsAndAttrs = computed(() => ({ ...props, ...attrs }));
    return {
      handleClick,
      handlePointerMove,
      handlePointerLeave,
      textContent,
      propsAndAttrs
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_el_dropdown_item_impl = resolveComponent("el-dropdown-item-impl");
  const _component_el_roving_focus_item = resolveComponent("el-roving-focus-item");
  const _component_el_dropdown_collection_item = resolveComponent("el-dropdown-collection-item");
  return openBlock(), createBlock(_component_el_dropdown_collection_item, {
    disabled: _ctx.disabled,
    "text-value": (_a = _ctx.textValue) != null ? _a : _ctx.textContent
  }, {
    default: withCtx(() => [
      createVNode(_component_el_roving_focus_item, {
        focusable: !_ctx.disabled
      }, {
        default: withCtx(() => [
          createVNode(_component_el_dropdown_item_impl, mergeProps(_ctx.propsAndAttrs, {
            onPointerleave: _ctx.handlePointerLeave,
            onPointermove: _ctx.handlePointerMove,
            onClickimpl: _ctx.handleClick
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["onPointerleave", "onPointermove", "onClickimpl"])
        ]),
        _: 3
      }, 8, ["focusable"])
    ]),
    _: 3
  }, 8, ["disabled", "text-value"]);
}
var DropdownItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["render", _sfc_render$1], ["__file", "dropdown-item.vue"]]);
const _sfc_main$1 = defineComponent({
  name: "ElDropdownMenu",
  props: dropdownMenuProps,
  setup(props) {
    const ns = useNamespace("dropdown");
    const { _elDropdownSize } = useDropdown();
    const size = _elDropdownSize.value;
    const { focusTrapRef, onKeydown } = inject(FOCUS_TRAP_INJECTION_KEY, void 0);
    const { contentRef, role, triggerId } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionRef: dropdownCollectionRef, getItems } = inject(COLLECTION_INJECTION_KEY$1, void 0);
    const {
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      tabIndex,
      onBlur,
      onFocus,
      onMousedown
    } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const { collectionRef: rovingFocusGroupCollectionRef } = inject(COLLECTION_INJECTION_KEY, void 0);
    const dropdownKls = computed(() => {
      return [ns.b("menu"), ns.bm("menu", size == null ? void 0 : size.value)];
    });
    const dropdownListWrapperRef = composeRefs(contentRef, dropdownCollectionRef, focusTrapRef, rovingFocusGroupRef, rovingFocusGroupCollectionRef);
    const composedKeydown = composeEventHandlers((e) => {
      var _a;
      (_a = props.onKeydown) == null ? void 0 : _a.call(props, e);
    }, (e) => {
      const { currentTarget, code, target } = e;
      currentTarget.contains(target);
      if (EVENT_CODE.tab === code) {
        e.stopImmediatePropagation();
      }
      e.preventDefault();
      if (target !== unref(contentRef) || !FIRST_LAST_KEYS.includes(code))
        return;
      const items = getItems().filter((item) => !item.disabled);
      const targets = items.map((item) => item.ref);
      if (LAST_KEYS.includes(code)) {
        targets.reverse();
      }
      focusFirst(targets);
    });
    const handleKeydown = (e) => {
      composedKeydown(e);
      onKeydown(e);
    };
    return {
      size,
      rovingFocusGroupRootStyle,
      tabIndex,
      dropdownKls,
      role,
      triggerId,
      dropdownListWrapperRef,
      handleKeydown,
      onBlur,
      onFocus,
      onMousedown
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    ref: _ctx.dropdownListWrapperRef,
    class: normalizeClass(_ctx.dropdownKls),
    style: normalizeStyle(_ctx.rovingFocusGroupRootStyle),
    tabindex: -1,
    role: _ctx.role,
    "aria-labelledby": _ctx.triggerId,
    onBlur: _ctx.onBlur,
    onFocus: _ctx.onFocus,
    onKeydown: withModifiers(_ctx.handleKeydown, ["self"]),
    onMousedown: withModifiers(_ctx.onMousedown, ["self"])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 46, ["role", "aria-labelledby", "onBlur", "onFocus", "onKeydown", "onMousedown"]);
}
var DropdownMenu = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["render", _sfc_render], ["__file", "dropdown-menu.vue"]]);
const ElDropdown = withInstall(Dropdown, {
  DropdownItem,
  DropdownMenu
});
const ElDropdownItem = withNoopInstall(DropdownItem);
const ElDropdownMenu = withNoopInstall(DropdownMenu);
const messageInstance = /* @__PURE__ */ new Map();
function MessageBox(options, appContext = null) {
  return Promise.reject();
}
const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"];
const MESSAGE_BOX_DEFAULT_OPTS = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true }
};
MESSAGE_BOX_VARIANTS.forEach((boxType) => {
  MessageBox[boxType] = messageBoxFactory(boxType);
});
function messageBoxFactory(boxType) {
  return (message, title, options, appContext) => {
    let titleOrOpts = "";
    if (isObject(title)) {
      options = title;
      titleOrOpts = "";
    } else if (isUndefined(title)) {
      titleOrOpts = "";
    } else {
      titleOrOpts = title;
    }
    return MessageBox(Object.assign({
      title: titleOrOpts,
      message,
      type: "",
      ...MESSAGE_BOX_DEFAULT_OPTS[boxType]
    }, options, {
      boxType
    }), appContext);
  };
}
MessageBox.close = () => {
  messageInstance.forEach((_, vm) => {
    vm.doClose();
  });
  messageInstance.clear();
};
MessageBox._context = null;
const _MessageBox = MessageBox;
_MessageBox.install = (app) => {
  _MessageBox._context = app._context;
  app.config.globalProperties.$msgbox = _MessageBox;
  app.config.globalProperties.$messageBox = _MessageBox;
  app.config.globalProperties.$alert = _MessageBox.alert;
  app.config.globalProperties.$confirm = _MessageBox.confirm;
  app.config.globalProperties.$prompt = _MessageBox.prompt;
};
const ElMessageBox = _MessageBox;
const _sfc_main = {
  __name: "system",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const announcementsList = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const totalCount = ref(0);
    const filterType = ref("");
    const filterStatus = ref("");
    const dateRange = ref([]);
    const unreadCount = computed(() => {
      return announcementsList.value.filter((item) => !item.isRead).length;
    });
    const todayCount = computed(() => {
      const today = dayjs().format("YYYY-MM-DD");
      return announcementsList.value.filter(
        (item) => dayjs(item.caeated || item.createdAt).format("YYYY-MM-DD") === today
      ).length;
    });
    const filteredList = computed(() => {
      let list = [...announcementsList.value];
      if (filterType.value) {
        list = list.filter((item) => item.type === filterType.value);
      }
      if (filterStatus.value) {
        if (filterStatus.value === "unread") {
          list = list.filter((item) => !item.isRead);
        } else if (filterStatus.value === "read") {
          list = list.filter((item) => item.isRead);
        }
      }
      if (dateRange.value && dateRange.value.length === 2) {
        const [startDate, endDate] = dateRange.value;
        list = list.filter((item) => {
          const itemDate = dayjs(item.caeated || item.createdAt);
          return itemDate.isAfter(dayjs(startDate).subtract(1, "day")) && itemDate.isBefore(dayjs(endDate).add(1, "day"));
        });
      }
      return list.sort((a, b) => {
        const timeA = dayjs(a.caeated || a.createdAt);
        const timeB = dayjs(b.caeated || b.createdAt);
        return timeB.diff(timeA);
      });
    });
    const getAnnouncements = async () => {
      loading.value = true;
      try {
        const response = await getAnnouncementslist();
        console.log("公告数据:", response);
        if (response && response.data) {
          announcementsList.value = response.data.map((item, index) => ({
            ...item,
            isRead: Math.random() > 0.3,
            // 模拟已读状态
            priority: index % 5 === 0 ? "high" : "normal",
            // 模拟优先级
            type: getRandomType(),
            // 模拟类型
            isFavorite: false,
            expanded: false,
            authorAvatar: null
          }));
          totalCount.value = announcementsList.value.length;
        }
      } catch (error) {
        console.error("获取公告失败:", error);
        ElMessage.error("获取公告失败");
      } finally {
        loading.value = false;
      }
    };
    const getRandomType = () => {
      const types = ["system", "security", "update", "activity"];
      return types[Math.floor(Math.random() * types.length)];
    };
    const getDefaultAvatar = (author) => {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(author || "System")}&background=409eff&color=fff`;
    };
    const getAuthorRole = (author) => {
      if (!author) return "系统";
      const roles = ["管理员", "运营", "技术", "客服"];
      return roles[Math.floor(Math.random() * roles.length)];
    };
    const getTypeLabel = (type) => {
      const labels = {
        system: "系统通知",
        security: "安全提醒",
        update: "功能更新",
        activity: "活动公告"
      };
      return labels[type] || "通知";
    };
    const getTypeBadgeClass = (type) => {
      const classes = {
        system: "badge-system",
        security: "badge-security",
        update: "badge-update",
        activity: "badge-activity"
      };
      return classes[type] || "badge-default";
    };
    const formatTime = (time) => {
      if (!time) return "";
      const now = dayjs();
      const itemTime = dayjs(time);
      if (now.diff(itemTime, "minute") < 1) {
        return "刚刚";
      } else if (now.diff(itemTime, "hour") < 1) {
        return `${now.diff(itemTime, "minute")}分钟前`;
      } else if (now.diff(itemTime, "day") < 1) {
        return `${now.diff(itemTime, "hour")}小时前`;
      } else if (now.diff(itemTime, "day") < 7) {
        return `${now.diff(itemTime, "day")}天前`;
      } else {
        return itemTime.format("YYYY-MM-DD HH:mm");
      }
    };
    const getContentSummary = (content) => {
      if (!content) return "";
      const plainText = content.replace(/<[^>]*>/g, "");
      return plainText.length > 100 ? `${plainText.substring(0, 100)}...` : plainText;
    };
    const isContentLong = (content) => {
      if (!content) return false;
      const plainText = content.replace(/<[^>]*>/g, "");
      return plainText.length > 100;
    };
    const markAsRead = (item) => {
      item.isRead = true;
      ElMessage.success("已标记为已读");
    };
    const markAllAsRead = async () => {
      try {
        await ElMessageBox.confirm("确定要将所有通知标记为已读吗？", "确认操作", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        announcementsList.value.forEach((item) => {
          item.isRead = true;
        });
        ElNotification({
          title: "操作成功",
          message: "所有通知已标记为已读",
          type: "success"
        });
      } catch {
      }
    };
    const toggleFavorite = (item) => {
      item.isFavorite = !item.isFavorite;
      ElMessage.success(item.isFavorite ? "已收藏" : "已取消收藏");
    };
    const refreshList = () => {
      getAnnouncements();
      ElMessage.success("列表已刷新");
    };
    const handleCommand = async (command) => {
      const [action, id] = command.split("_");
      const item = announcementsList.value.find((item2) => item2.id.toString() === id);
      if (!item) return;
      switch (action) {
        case "copy":
          try {
            await (void 0).clipboard.writeText(item.content.replace(/<[^>]*>/g, ""));
            ElMessage.success("内容已复制到剪贴板");
          } catch {
            ElMessage.error("复制失败");
          }
          break;
        case "share":
          ElMessage.info("分享功能开发中...");
          break;
        case "delete":
          try {
            await ElMessageBox.confirm("确定要删除这条通知吗？", "确认删除", {
              confirmButtonText: "删除",
              cancelButtonText: "取消",
              type: "warning"
            });
            const index = announcementsList.value.findIndex((item2) => item2.id.toString() === id);
            if (index > -1) {
              announcementsList.value.splice(index, 1);
              totalCount.value--;
              ElMessage.success("通知已删除");
            }
          } catch {
          }
          break;
      }
    };
    const handleSizeChange = (size) => {
      pageSize.value = size;
      currentPage.value = 1;
    };
    const handleCurrentChange = (page) => {
      currentPage.value = page;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_top = __nuxt_component_0;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_date_picker = ElDatePicker;
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      const _component_el_avatar = ElAvatar;
      const _component_el_tooltip = ElTooltip;
      const _component_el_dropdown = ElDropdown;
      const _component_el_dropdown_menu = ElDropdownMenu;
      const _component_el_dropdown_item = ElDropdownItem;
      const _component_el_pagination = ElPagination;
      const _component_foot = __nuxt_component_12;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-60c54055><div data-server-rendered="true" id="__nuxt" data-v-60c54055><div id="__layout" data-v-60c54055><div data-fetch-key="0" class="app macwk-animation" data-v-60c54055>`);
      _push(ssrRenderComponent(_component_top, null, null, _parent));
      _push(`<div class="system-notification-container" data-v-60c54055><div class="page-header" data-v-60c54055><div class="header-content" data-v-60c54055><div class="header-icon" data-v-60c54055><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-60c54055><path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-60c54055></path><path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-60c54055></path></svg></div><div class="header-text" data-v-60c54055><h1 data-v-60c54055>系统公告</h1><p data-v-60c54055>查看最新的系统消息和重要通知</p></div></div><div class="stats-bar" data-v-60c54055><div class="stat-item" data-v-60c54055><span class="stat-number" data-v-60c54055>${ssrInterpolate(unref(totalCount))}</span><span class="stat-label" data-v-60c54055>总计</span></div><div class="stat-item" data-v-60c54055><span class="stat-number" data-v-60c54055>${ssrInterpolate(unref(unreadCount))}</span><span class="stat-label" data-v-60c54055>未读</span></div><div class="stat-item" data-v-60c54055><span class="stat-number" data-v-60c54055>${ssrInterpolate(unref(todayCount))}</span><span class="stat-label" data-v-60c54055>今日</span></div></div></div><div class="filter-bar" data-v-60c54055><div class="filter-left" data-v-60c54055>`);
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: unref(filterType),
        "onUpdate:modelValue": ($event) => isRef(filterType) ? filterType.value = $event : null,
        placeholder: "通知类型",
        clearable: "",
        size: "default",
        class: "filter-select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_option, {
              label: "全部",
              value: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "系统通知",
              value: "system"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "安全提醒",
              value: "security"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "功能更新",
              value: "update"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "活动公告",
              value: "activity"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_option, {
                label: "全部",
                value: ""
              }),
              createVNode(_component_el_option, {
                label: "系统通知",
                value: "system"
              }),
              createVNode(_component_el_option, {
                label: "安全提醒",
                value: "security"
              }),
              createVNode(_component_el_option, {
                label: "功能更新",
                value: "update"
              }),
              createVNode(_component_el_option, {
                label: "活动公告",
                value: "activity"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: unref(filterStatus),
        "onUpdate:modelValue": ($event) => isRef(filterStatus) ? filterStatus.value = $event : null,
        placeholder: "阅读状态",
        clearable: "",
        size: "default",
        class: "filter-select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_option, {
              label: "全部",
              value: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "未读",
              value: "unread"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "已读",
              value: "read"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_option, {
                label: "全部",
                value: ""
              }),
              createVNode(_component_el_option, {
                label: "未读",
                value: "unread"
              }),
              createVNode(_component_el_option, {
                label: "已读",
                value: "read"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_date_picker, {
        modelValue: unref(dateRange),
        "onUpdate:modelValue": ($event) => isRef(dateRange) ? dateRange.value = $event : null,
        type: "daterange",
        "range-separator": "至",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        size: "default",
        class: "date-picker"
      }, null, _parent));
      _push(`</div><div class="filter-right" data-v-60c54055>`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: markAllAsRead,
        type: "primary",
        size: "default"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(check_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(check_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` 全部标记已读 `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(check_default))
                ]),
                _: 1
              }),
              createTextVNode(" 全部标记已读 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        onClick: refreshList,
        size: "default"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(refresh_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(refresh_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` 刷新 `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(refresh_default))
                ]),
                _: 1
              }),
              createTextVNode(" 刷新 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div${ssrRenderAttrs(mergeProps({ class: "notifications-list" }, ssrGetDirectiveProps(_ctx, _directive_loading, unref(loading))))} data-v-60c54055>`);
      if (unref(filteredList).length === 0 && !unref(loading)) {
        _push(`<div class="empty-state" data-v-60c54055><div class="empty-icon" data-v-60c54055><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-60c54055><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" data-v-60c54055></circle><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-60c54055></path></svg></div><h3 data-v-60c54055>暂无公告</h3><p data-v-60c54055>当前没有符合条件的系统公告</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(filteredList), (item) => {
          _push(`<div class="${ssrRenderClass([{ "unread": !item.isRead, "important": item.priority === "high" }, "notification-item"])}" data-v-60c54055>`);
          if (item.priority === "high") {
            _push(`<div class="priority-indicator" data-v-60c54055></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="notification-content" data-v-60c54055><div class="left-section" data-v-60c54055><div class="author-info" data-v-60c54055>`);
          _push(ssrRenderComponent(_component_el_avatar, {
            size: 50,
            src: item.authorAvatar || getDefaultAvatar(item.author)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.author ? item.author.charAt(0) : "S")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.author ? item.author.charAt(0) : "S"), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="author-details" data-v-60c54055><div class="author-name" data-v-60c54055>${ssrInterpolate(item.author || "系统管理员")}</div><div class="author-role" data-v-60c54055>${ssrInterpolate(getAuthorRole(item.author))}</div></div></div></div><div class="center-section" data-v-60c54055><div class="notification-header" data-v-60c54055><h3 class="notification-title" data-v-60c54055>${ssrInterpolate(item.title)} <span class="${ssrRenderClass([getTypeBadgeClass(item.type), "type-badge"])}" data-v-60c54055>${ssrInterpolate(getTypeLabel(item.type))}</span></h3><div class="notification-meta" data-v-60c54055><span class="notification-time" data-v-60c54055>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(clock_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(clock_default))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(` ${ssrInterpolate(formatTime(item.caeated || item.createdAt))}</span>`);
          if (!item.isRead) {
            _push(`<span class="read-status" data-v-60c54055>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(bell_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(bell_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(` 未读 </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="notification-body" data-v-60c54055>`);
          if (!item.expanded) {
            _push(`<div class="notification-summary" data-v-60c54055>${ssrInterpolate(getContentSummary(item.content))}</div>`);
          } else {
            _push(`<div class="notification-full-content" data-v-60c54055>${item.content ?? ""}</div>`);
          }
          if (isContentLong(item.content)) {
            _push(`<div class="expand-toggle" data-v-60c54055>${ssrInterpolate(item.expanded ? "收起" : "展开全文")} `);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (!item.expanded) {
                    _push2(ssrRenderComponent(unref(arrow_down_default), null, null, _parent2, _scopeId));
                  } else {
                    _push2(ssrRenderComponent(unref(arrow_up_default), null, null, _parent2, _scopeId));
                  }
                } else {
                  return [
                    !item.expanded ? (openBlock(), createBlock(unref(arrow_down_default), { key: 0 })) : (openBlock(), createBlock(unref(arrow_up_default), { key: 1 }))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="right-section" data-v-60c54055><div class="action-buttons" data-v-60c54055>`);
          if (!item.isRead) {
            _push(ssrRenderComponent(_component_el_tooltip, { content: "标记为已读" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => markAsRead(item),
                    type: "primary",
                    size: "small",
                    circle: ""
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(check_default), null, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(check_default))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(check_default))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      onClick: withModifiers(($event) => markAsRead(item), ["stop"]),
                      type: "primary",
                      size: "small",
                      circle: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_el_tooltip, { content: "收藏" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_button, {
                  onClick: ($event) => toggleFavorite(item),
                  type: item.isFavorite ? "warning" : "default",
                  size: "small",
                  circle: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_icon, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(star_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(star_default))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(star_default))
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_button, {
                    onClick: withModifiers(($event) => toggleFavorite(item), ["stop"]),
                    type: item.isFavorite ? "warning" : "default",
                    size: "small",
                    circle: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(star_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["onClick", "type"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_el_dropdown, {
            onCommand: handleCommand,
            trigger: "click"
          }, {
            dropdown: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_dropdown_menu, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_dropdown_item, {
                        command: `copy_${item.id}`
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_icon, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(copy_document_default), null, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(copy_document_default))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(` 复制内容 `);
                          } else {
                            return [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(copy_document_default))
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 复制内容 ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_dropdown_item, {
                        command: `share_${item.id}`
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_icon, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(share_default), null, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(share_default))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(` 分享 `);
                          } else {
                            return [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(share_default))
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 分享 ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_dropdown_item, {
                        command: `delete_${item.id}`,
                        divided: ""
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_icon, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(delete_default), null, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(delete_default))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(` 删除 `);
                          } else {
                            return [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(delete_default))
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 删除 ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_dropdown_item, {
                          command: `copy_${item.id}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(copy_document_default))
                              ]),
                              _: 1
                            }),
                            createTextVNode(" 复制内容 ")
                          ]),
                          _: 2
                        }, 1032, ["command"]),
                        createVNode(_component_el_dropdown_item, {
                          command: `share_${item.id}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(share_default))
                              ]),
                              _: 1
                            }),
                            createTextVNode(" 分享 ")
                          ]),
                          _: 2
                        }, 1032, ["command"]),
                        createVNode(_component_el_dropdown_item, {
                          command: `delete_${item.id}`,
                          divided: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(delete_default))
                              ]),
                              _: 1
                            }),
                            createTextVNode(" 删除 ")
                          ]),
                          _: 2
                        }, 1032, ["command"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_dropdown_menu, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_dropdown_item, {
                        command: `copy_${item.id}`
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(copy_document_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 复制内容 ")
                        ]),
                        _: 2
                      }, 1032, ["command"]),
                      createVNode(_component_el_dropdown_item, {
                        command: `share_${item.id}`
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(share_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 分享 ")
                        ]),
                        _: 2
                      }, 1032, ["command"]),
                      createVNode(_component_el_dropdown_item, {
                        command: `delete_${item.id}`,
                        divided: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(delete_default))
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 删除 ")
                        ]),
                        _: 2
                      }, 1032, ["command"])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "default",
                  size: "small",
                  circle: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_icon, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(more_default), null, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(more_default))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(more_default))
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_button, {
                    type: "default",
                    size: "small",
                    circle: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(more_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      if (unref(totalCount) > 0) {
        _push(`<div class="pagination-container" data-v-60c54055>`);
        _push(ssrRenderComponent(_component_el_pagination, {
          "current-page": unref(currentPage),
          "onUpdate:currentPage": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
          "page-size": unref(pageSize),
          "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
          "page-sizes": [10, 20, 50, 100],
          small: false,
          disabled: unref(loading),
          background: true,
          layout: "total, sizes, prev, pager, next, jumper",
          total: unref(totalCount),
          onSizeChange: handleSizeChange,
          onCurrentChange: handleCurrentChange
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_foot, null, null, _parent));
      _push(`<div infos="0" data-v-60c54055><div class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links" data-v-60c54055></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Notification/system.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const system = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-60c54055"]]);

export { system as default };
//# sourceMappingURL=system-ChhwFG5H.mjs.map
