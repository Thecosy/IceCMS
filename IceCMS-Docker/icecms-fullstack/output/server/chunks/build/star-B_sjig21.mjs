import { E as ElForm, a as ElFormItem } from './el-form-DWMILsFE.mjs';
import { E as ElCard } from './el-card-ReDS_y_B.mjs';
import { E as ElInput, u as useVModel } from './el-input-2q_vffSS.mjs';
import { E as ElSelect, a as ElOption } from './el-select-ZvTonYnZ.mjs';
import { E as ElDatePicker } from './el-date-picker-Dm-PCStW.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createTextVNode, createCommentVNode, toDisplayString, shallowRef, computed, provide, toRef, createElementBlock, renderSlot, unref, createSlots, watch, TransitionGroup, normalizeClass, withKeys, createElementVNode, withModifiers, normalizeStyle, inject, resolveDynamicComponent, useSSRContext } from 'vue';
import { w as withInstall, a as ElIcon, E as ElButton, _ as _export_sfc$1, b as buildProps, u as useFormDisabled, d as definePropType, m as mutable, c as useLocale, e as document_default, f as circle_check_default, g as check_default, h as close_default, z as zoom_in_default, i as delete_default, j as entriesOf, k as warning_filled_default, l as circle_close_default } from './el-button-LIU117i9.mjs';
import { _ as _export_sfc, t as throwError, o as debugWarn, e as useNamespace } from './server.mjs';
import { NOOP, isArray, isPlainObject, isFunction, isString } from '@vue/shared';
import { isNil, cloneDeep, isEqual } from 'lodash-unified';
import { E as ElRow, a as ElCol } from './el-col-P7eqMh2W.mjs';
import { E as ElRadioGroup, a as ElRadio } from './el-radio-CyHK4L3b.mjs';
import { u as useUserStore } from './useUserStore-gmH42dcJ.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import dayjs from 'dayjs';
import { E as ElMessage } from './index-D2_eFSsF.mjs';
import { E as ElNotification } from './index-0K9UalJV.mjs';
import './event-BZTOGHfp.mjs';
import './el-popper-mKntyvEc.mjs';
import './index-C6mv4HvU.mjs';
import './index-DM9QPBoH.mjs';
import 'dayjs/plugin/customParseFormat.js';
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/localeData.js';
import 'dayjs/plugin/weekOfYear.js';
import 'dayjs/plugin/weekYear.js';
import 'dayjs/plugin/dayOfYear.js';
import 'dayjs/plugin/isSameOrAfter.js';
import 'dayjs/plugin/isSameOrBefore.js';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const progressProps = buildProps({
  type: {
    type: String,
    default: "line",
    values: ["line", "circle", "dashboard"]
  },
  percentage: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  status: {
    type: String,
    default: "",
    values: ["", "success", "exception", "warning"]
  },
  indeterminate: Boolean,
  duration: {
    type: Number,
    default: 3
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  strokeLinecap: {
    type: definePropType(String),
    default: "round"
  },
  textInside: Boolean,
  width: {
    type: Number,
    default: 126
  },
  showText: {
    type: Boolean,
    default: true
  },
  color: {
    type: definePropType([
      String,
      Array,
      Function
    ]),
    default: ""
  },
  striped: Boolean,
  stripedFlow: Boolean,
  format: {
    type: definePropType(Function),
    default: (percentage) => `${percentage}%`
  }
});
const __default__$4 = defineComponent({
  name: "ElProgress"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: progressProps,
  setup(__props) {
    const props = __props;
    const STATUS_COLOR_MAP = {
      success: "#13ce66",
      exception: "#ff4949",
      warning: "#e6a23c",
      default: "#20a0ff"
    };
    const ns = useNamespace("progress");
    const barStyle = computed(() => {
      const barStyle2 = {
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`
      };
      const color = getCurrentColor(props.percentage);
      if (color.includes("gradient")) {
        barStyle2.background = color;
      } else {
        barStyle2.backgroundColor = color;
      }
      return barStyle2;
    });
    const relativeStrokeWidth = computed(() => (props.strokeWidth / props.width * 100).toFixed(1));
    const radius = computed(() => {
      if (["circle", "dashboard"].includes(props.type)) {
        return Number.parseInt(`${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`, 10);
      }
      return 0;
    });
    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });
    const perimeter = computed(() => 2 * Math.PI * radius.value);
    const rate = computed(() => props.type === "dashboard" ? 0.75 : 1);
    const strokeDashoffset = computed(() => {
      const offset = -1 * perimeter.value * (1 - rate.value) / 2;
      return `${offset}px`;
    });
    const trailPathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value
    }));
    const circlePathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
    }));
    const stroke = computed(() => {
      let ret;
      if (props.color) {
        ret = getCurrentColor(props.percentage);
      } else {
        ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
      }
      return ret;
    });
    const statusIcon = computed(() => {
      if (props.status === "warning") {
        return warning_filled_default;
      }
      if (props.type === "line") {
        return props.status === "success" ? circle_check_default : circle_close_default;
      } else {
        return props.status === "success" ? check_default : close_default;
      }
    });
    const progressTextSize = computed(() => {
      return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });
    const content = computed(() => props.format(props.percentage));
    function getColors(color) {
      const span = 100 / color.length;
      const seriesColors = color.map((seriesColor, index) => {
        if (isString(seriesColor)) {
          return {
            color: seriesColor,
            percentage: (index + 1) * span
          };
        }
        return seriesColor;
      });
      return seriesColors.sort((a, b) => a.percentage - b.percentage);
    }
    const getCurrentColor = (percentage) => {
      var _a;
      const { color } = props;
      if (isFunction(color)) {
        return color(percentage);
      } else if (isString(color)) {
        return color;
      } else {
        const colors = getColors(color);
        for (const color2 of colors) {
          if (color2.percentage > percentage)
            return color2.color;
        }
        return (_a = colors[colors.length - 1]) == null ? void 0 : _a.color;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(_ctx.type),
          unref(ns).is(_ctx.status),
          {
            [unref(ns).m("without-text")]: !_ctx.showText,
            [unref(ns).m("text-inside")]: _ctx.textInside
          }
        ]),
        role: "progressbar",
        "aria-valuenow": _ctx.percentage,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [
        _ctx.type === "line" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).b("bar"))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(ns).be("bar", "outer")),
            style: normalizeStyle({ height: `${_ctx.strokeWidth}px` })
          }, [
            createElementVNode("div", {
              class: normalizeClass([
                unref(ns).be("bar", "inner"),
                { [unref(ns).bem("bar", "inner", "indeterminate")]: _ctx.indeterminate },
                { [unref(ns).bem("bar", "inner", "striped")]: _ctx.striped },
                { [unref(ns).bem("bar", "inner", "striped-flow")]: _ctx.stripedFlow }
              ]),
              style: normalizeStyle(unref(barStyle))
            }, [
              (_ctx.showText || _ctx.$slots.default) && _ctx.textInside ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(ns).be("bar", "innerText"))
              }, [
                renderSlot(_ctx.$slots, "default", { percentage: _ctx.percentage }, () => [
                  createElementVNode("span", null, toDisplayString(unref(content)), 1)
                ])
              ], 2)) : createCommentVNode("v-if", true)
            ], 6)
          ], 6)
        ], 2)) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(ns).b("circle")),
          style: normalizeStyle({ height: `${_ctx.width}px`, width: `${_ctx.width}px` })
        }, [
          (openBlock(), createElementBlock("svg", { viewBox: "0 0 100 100" }, [
            createElementVNode("path", {
              class: normalizeClass(unref(ns).be("circle", "track")),
              d: unref(trackPath),
              stroke: `var(${unref(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
              "stroke-linecap": _ctx.strokeLinecap,
              "stroke-width": unref(relativeStrokeWidth),
              fill: "none",
              style: normalizeStyle(unref(trailPathStyle))
            }, null, 14, ["d", "stroke", "stroke-linecap", "stroke-width"]),
            createElementVNode("path", {
              class: normalizeClass(unref(ns).be("circle", "path")),
              d: unref(trackPath),
              stroke: unref(stroke),
              fill: "none",
              opacity: _ctx.percentage ? 1 : 0,
              "stroke-linecap": _ctx.strokeLinecap,
              "stroke-width": unref(relativeStrokeWidth),
              style: normalizeStyle(unref(circlePathStyle))
            }, null, 14, ["d", "stroke", "opacity", "stroke-linecap", "stroke-width"])
          ]))
        ], 6)),
        (_ctx.showText || _ctx.$slots.default) && !_ctx.textInside ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(unref(ns).e("text")),
          style: normalizeStyle({ fontSize: `${unref(progressTextSize)}px` })
        }, [
          renderSlot(_ctx.$slots, "default", { percentage: _ctx.percentage }, () => [
            !_ctx.status ? (openBlock(), createElementBlock("span", { key: 0 }, toDisplayString(unref(content)), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(statusIcon))))
              ]),
              _: 1
            }))
          ])
        ], 6)) : createCommentVNode("v-if", true)
      ], 10, ["aria-valuenow"]);
    };
  }
});
var Progress = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["__file", "progress.vue"]]);
const ElProgress = withInstall(Progress);
const uploadContextKey = Symbol("uploadContextKey");
const SCOPE$1 = "ElUpload";
class UploadAjaxError extends Error {
  constructor(message, status, method, url) {
    super(message);
    this.name = "UploadAjaxError";
    this.status = status;
    this.method = method;
    this.url = url;
  }
}
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to ${option.method} ${action} ${xhr.status}`;
  }
  return new UploadAjaxError(msg, xhr.status, option.method, action);
}
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
const ajaxUpload = (option) => {
  throwError(SCOPE$1, "XMLHttpRequest is undefined");
  const xhr = new (void 0)();
  const action = option.action;
  if (xhr.upload) {
    xhr.upload.addEventListener("progress", (evt) => {
      const progressEvt = evt;
      progressEvt.percent = evt.total > 0 ? evt.loaded / evt.total * 100 : 0;
      option.onProgress(progressEvt);
    });
  }
  const formData = new FormData();
  if (option.data) {
    for (const [key, value] of Object.entries(option.data)) {
      if (isArray(value) && value.length)
        formData.append(key, ...value);
      else
        formData.append(key, value);
    }
  }
  formData.append(option.filename, option.file, option.file.name);
  xhr.addEventListener("error", () => {
    option.onError(getError(action, option, xhr));
  });
  xhr.addEventListener("load", () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }
    option.onSuccess(getBody(xhr));
  });
  xhr.open(option.method, action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  if (headers instanceof Headers) {
    headers.forEach((value, key) => xhr.setRequestHeader(key, value));
  } else {
    for (const [key, value] of Object.entries(headers)) {
      if (isNil(value))
        continue;
      xhr.setRequestHeader(key, String(value));
    }
  }
  xhr.send(formData);
  return xhr;
};
const uploadListTypes = ["text", "picture", "picture-card"];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
const uploadBaseProps = buildProps({
  action: {
    type: String,
    default: "#"
  },
  headers: {
    type: definePropType(Object)
  },
  method: {
    type: String,
    default: "post"
  },
  data: {
    type: definePropType([Object, Function, Promise]),
    default: () => mutable({})
  },
  multiple: Boolean,
  name: {
    type: String,
    default: "file"
  },
  drag: Boolean,
  withCredentials: Boolean,
  showFileList: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: ""
  },
  fileList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  httpRequest: {
    type: definePropType(Function),
    default: ajaxUpload
  },
  disabled: Boolean,
  limit: Number
});
const uploadProps = buildProps({
  ...uploadBaseProps,
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  beforeRemove: {
    type: definePropType(Function)
  },
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  onChange: {
    type: definePropType(Function),
    default: NOOP
  },
  onPreview: {
    type: definePropType(Function),
    default: NOOP
  },
  onSuccess: {
    type: definePropType(Function),
    default: NOOP
  },
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  },
  crossorigin: {
    type: definePropType(String)
  }
});
const uploadListProps = buildProps({
  files: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  disabled: {
    type: Boolean,
    default: false
  },
  handlePreview: {
    type: definePropType(Function),
    default: NOOP
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  crossorigin: {
    type: definePropType(String)
  }
});
const uploadListEmits = {
  remove: (file) => !!file
};
const __default__$3 = defineComponent({
  name: "ElUploadList"
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: uploadListProps,
  emits: uploadListEmits,
  setup(__props, { emit }) {
    const props = __props;
    const { t } = useLocale();
    const nsUpload = useNamespace("upload");
    const nsIcon = useNamespace("icon");
    const nsList = useNamespace("list");
    const disabled = useFormDisabled();
    const focusing = ref(false);
    const containerKls = computed(() => [
      nsUpload.b("list"),
      nsUpload.bm("list", props.listType),
      nsUpload.is("disabled", props.disabled)
    ]);
    const handleRemove = (file) => {
      emit("remove", file);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        tag: "ul",
        class: normalizeClass(unref(containerKls)),
        name: unref(nsList).b()
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.files, (file, index) => {
            return openBlock(), createElementBlock("li", {
              key: file.uid || file.name,
              class: normalizeClass([
                unref(nsUpload).be("list", "item"),
                unref(nsUpload).is(file.status),
                { focusing: focusing.value }
              ]),
              tabindex: "0",
              onKeydown: withKeys(($event) => !unref(disabled) && handleRemove(file), ["delete"]),
              onFocus: ($event) => focusing.value = true,
              onBlur: ($event) => focusing.value = false,
              onClick: ($event) => focusing.value = false
            }, [
              renderSlot(_ctx.$slots, "default", {
                file,
                index
              }, () => [
                _ctx.listType === "picture" || file.status !== "uploading" && _ctx.listType === "picture-card" ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  class: normalizeClass(unref(nsUpload).be("list", "item-thumbnail")),
                  src: file.url,
                  crossorigin: _ctx.crossorigin,
                  alt: ""
                }, null, 10, ["src", "crossorigin"])) : createCommentVNode("v-if", true),
                file.status === "uploading" || _ctx.listType !== "picture-card" ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(unref(nsUpload).be("list", "item-info"))
                }, [
                  createElementVNode("a", {
                    class: normalizeClass(unref(nsUpload).be("list", "item-name")),
                    onClick: withModifiers(($event) => _ctx.handlePreview(file), ["prevent"])
                  }, [
                    createVNode(unref(ElIcon), {
                      class: normalizeClass(unref(nsIcon).m("document"))
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(document_default))
                      ]),
                      _: 1
                    }, 8, ["class"]),
                    createElementVNode("span", {
                      class: normalizeClass(unref(nsUpload).be("list", "item-file-name")),
                      title: file.name
                    }, toDisplayString(file.name), 11, ["title"])
                  ], 10, ["onClick"]),
                  file.status === "uploading" ? (openBlock(), createBlock(unref(ElProgress), {
                    key: 0,
                    type: _ctx.listType === "picture-card" ? "circle" : "line",
                    "stroke-width": _ctx.listType === "picture-card" ? 6 : 2,
                    percentage: Number(file.percentage),
                    style: normalizeStyle(_ctx.listType === "picture-card" ? "" : "margin-top: 0.5rem")
                  }, null, 8, ["type", "stroke-width", "percentage", "style"])) : createCommentVNode("v-if", true)
                ], 2)) : createCommentVNode("v-if", true),
                createElementVNode("label", {
                  class: normalizeClass(unref(nsUpload).be("list", "item-status-label"))
                }, [
                  _ctx.listType === "text" ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 0,
                    class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("circle-check")])
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(circle_check_default))
                    ]),
                    _: 1
                  }, 8, ["class"])) : ["picture-card", "picture"].includes(_ctx.listType) ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 1,
                    class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("check")])
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(check_default))
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("v-if", true)
                ], 2),
                !unref(disabled) ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 2,
                  class: normalizeClass(unref(nsIcon).m("close")),
                  onClick: ($event) => handleRemove(file)
                }, {
                  default: withCtx(() => [
                    createVNode(unref(close_default))
                  ]),
                  _: 2
                }, 1032, ["class", "onClick"])) : createCommentVNode("v-if", true),
                createCommentVNode(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),
                createCommentVNode(" This is a bug which needs to be fixed "),
                createCommentVNode(" TODO: Fix the incorrect navigation interaction "),
                !unref(disabled) ? (openBlock(), createElementBlock("i", {
                  key: 3,
                  class: normalizeClass(unref(nsIcon).m("close-tip"))
                }, toDisplayString(unref(t)("el.upload.deleteTip")), 3)) : createCommentVNode("v-if", true),
                _ctx.listType === "picture-card" ? (openBlock(), createElementBlock("span", {
                  key: 4,
                  class: normalizeClass(unref(nsUpload).be("list", "item-actions"))
                }, [
                  createElementVNode("span", {
                    class: normalizeClass(unref(nsUpload).be("list", "item-preview")),
                    onClick: ($event) => _ctx.handlePreview(file)
                  }, [
                    createVNode(unref(ElIcon), {
                      class: normalizeClass(unref(nsIcon).m("zoom-in"))
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(zoom_in_default))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ], 10, ["onClick"]),
                  !unref(disabled) ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(unref(nsUpload).be("list", "item-delete")),
                    onClick: ($event) => handleRemove(file)
                  }, [
                    createVNode(unref(ElIcon), {
                      class: normalizeClass(unref(nsIcon).m("delete"))
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(delete_default))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ], 10, ["onClick"])) : createCommentVNode("v-if", true)
                ], 2)) : createCommentVNode("v-if", true)
              ])
            ], 42, ["onKeydown", "onFocus", "onBlur", "onClick"]);
          }), 128)),
          renderSlot(_ctx.$slots, "append")
        ]),
        _: 3
      }, 8, ["class", "name"]);
    };
  }
});
var UploadList = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__file", "upload-list.vue"]]);
const uploadDraggerProps = buildProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const uploadDraggerEmits = {
  file: (file) => isArray(file)
};
const COMPONENT_NAME = "ElUploadDrag";
const __default__$2 = defineComponent({
  name: COMPONENT_NAME
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: uploadDraggerProps,
  emits: uploadDraggerEmits,
  setup(__props, { emit }) {
    const uploaderContext = inject(uploadContextKey);
    if (!uploaderContext) {
      throwError(COMPONENT_NAME, "usage: <el-upload><el-upload-dragger /></el-upload>");
    }
    const ns = useNamespace("upload");
    const dragover = ref(false);
    const disabled = useFormDisabled();
    const onDrop = (e) => {
      if (disabled.value)
        return;
      dragover.value = false;
      e.stopPropagation();
      const files = Array.from(e.dataTransfer.files);
      emit("file", files);
    };
    const onDragover = () => {
      if (!disabled.value)
        dragover.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(ns).b("dragger"), unref(ns).is("dragover", dragover.value)]),
        onDrop: withModifiers(onDrop, ["prevent"]),
        onDragover: withModifiers(onDragover, ["prevent"]),
        onDragleave: withModifiers(($event) => dragover.value = false, ["prevent"])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 42, ["onDrop", "onDragover", "onDragleave"]);
    };
  }
});
var UploadDragger = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "upload-dragger.vue"]]);
const uploadContentProps = buildProps({
  ...uploadBaseProps,
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  onStart: {
    type: definePropType(Function),
    default: NOOP
  },
  onSuccess: {
    type: definePropType(Function),
    default: NOOP
  },
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  }
});
const __default__$1 = defineComponent({
  name: "ElUploadContent",
  inheritAttrs: false
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: uploadContentProps,
  setup(__props, { expose }) {
    const props = __props;
    const ns = useNamespace("upload");
    const disabled = useFormDisabled();
    const requests = shallowRef({});
    const inputRef = shallowRef();
    const uploadFiles = (files) => {
      if (files.length === 0)
        return;
      const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;
      if (limit && fileList.length + files.length > limit) {
        onExceed(files, fileList);
        return;
      }
      if (!multiple) {
        files = files.slice(0, 1);
      }
      for (const file of files) {
        const rawFile = file;
        rawFile.uid = genFileId();
        onStart(rawFile);
        if (autoUpload)
          upload(rawFile);
      }
    };
    const upload = async (rawFile) => {
      inputRef.value.value = "";
      if (!props.beforeUpload) {
        return doUpload(rawFile);
      }
      let hookResult;
      let beforeData = {};
      try {
        const originData = props.data;
        const beforeUploadPromise = props.beforeUpload(rawFile);
        beforeData = isPlainObject(props.data) ? cloneDeep(props.data) : props.data;
        hookResult = await beforeUploadPromise;
        if (isPlainObject(props.data) && isEqual(originData, beforeData)) {
          beforeData = cloneDeep(props.data);
        }
      } catch (e) {
        hookResult = false;
      }
      if (hookResult === false) {
        props.onRemove(rawFile);
        return;
      }
      let file = rawFile;
      if (hookResult instanceof Blob) {
        if (hookResult instanceof File) {
          file = hookResult;
        } else {
          file = new File([hookResult], rawFile.name, {
            type: rawFile.type
          });
        }
      }
      doUpload(Object.assign(file, {
        uid: rawFile.uid
      }), beforeData);
    };
    const resolveData = async (data, rawFile) => {
      if (isFunction(data)) {
        return data(rawFile);
      }
      return data;
    };
    const doUpload = async (rawFile, beforeData) => {
      const {
        headers,
        data,
        method,
        withCredentials,
        name: filename,
        action,
        onProgress,
        onSuccess,
        onError,
        httpRequest
      } = props;
      try {
        beforeData = await resolveData(beforeData != null ? beforeData : data, rawFile);
      } catch (e) {
        props.onRemove(rawFile);
        return;
      }
      const { uid } = rawFile;
      const options = {
        headers: headers || {},
        withCredentials,
        file: rawFile,
        data: beforeData,
        method,
        filename,
        action,
        onProgress: (evt) => {
          onProgress(evt, rawFile);
        },
        onSuccess: (res) => {
          onSuccess(res, rawFile);
          delete requests.value[uid];
        },
        onError: (err) => {
          onError(err, rawFile);
          delete requests.value[uid];
        }
      };
      const request = httpRequest(options);
      requests.value[uid] = request;
      if (request instanceof Promise) {
        request.then(options.onSuccess, options.onError);
      }
    };
    const handleChange = (e) => {
      const files = e.target.files;
      if (!files)
        return;
      uploadFiles(Array.from(files));
    };
    const handleClick = () => {
      if (!disabled.value) {
        inputRef.value.value = "";
        inputRef.value.click();
      }
    };
    const handleKeydown = () => {
      handleClick();
    };
    const abort = (file) => {
      const _reqs = entriesOf(requests.value).filter(file ? ([uid]) => String(file.uid) === uid : () => true);
      _reqs.forEach(([uid, req]) => {
        if (req instanceof void 0)
          req.abort();
        delete requests.value[uid];
      });
    };
    expose({
      abort,
      upload
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(_ctx.listType),
          unref(ns).is("drag", _ctx.drag),
          unref(ns).is("disabled", unref(disabled))
        ]),
        tabindex: unref(disabled) ? "-1" : "0",
        onClick: handleClick,
        onKeydown: withKeys(withModifiers(handleKeydown, ["self"]), ["enter", "space"])
      }, [
        _ctx.drag ? (openBlock(), createBlock(UploadDragger, {
          key: 0,
          disabled: unref(disabled),
          onFile: uploadFiles
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["disabled"])) : renderSlot(_ctx.$slots, "default", { key: 1 }),
        createElementVNode("input", {
          ref_key: "inputRef",
          ref: inputRef,
          class: normalizeClass(unref(ns).e("input")),
          name: _ctx.name,
          disabled: unref(disabled),
          multiple: _ctx.multiple,
          accept: _ctx.accept,
          type: "file",
          onChange: handleChange,
          onClick: withModifiers(() => {
          }, ["stop"])
        }, null, 42, ["name", "disabled", "multiple", "accept", "onClick"])
      ], 42, ["tabindex", "onKeydown"]);
    };
  }
});
var UploadContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "upload-content.vue"]]);
const SCOPE = "ElUpload";
const revokeFileObjectURL = (file) => {
  var _a;
  if ((_a = file.url) == null ? void 0 : _a.startsWith("blob:")) {
    URL.revokeObjectURL(file.url);
  }
};
const useHandlers = (props, uploadRef) => {
  const uploadFiles = useVModel(props, "fileList", void 0, { passive: true });
  const getFile = (rawFile) => uploadFiles.value.find((file) => file.uid === rawFile.uid);
  function abort(file) {
    var _a;
    (_a = uploadRef.value) == null ? void 0 : _a.abort(file);
  }
  function clearFiles(states = ["ready", "uploading", "success", "fail"]) {
    uploadFiles.value = uploadFiles.value.filter((row) => !states.includes(row.status));
  }
  function removeFile(file) {
    uploadFiles.value = uploadFiles.value.filter((uploadFile) => uploadFile.uid !== file.uid);
  }
  const handleError = (err, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    console.error(err);
    file.status = "fail";
    removeFile(file);
    props.onError(err, file, uploadFiles.value);
    props.onChange(file, uploadFiles.value);
  };
  const handleProgress = (evt, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    props.onProgress(evt, file, uploadFiles.value);
    file.status = "uploading";
    file.percentage = Math.round(evt.percent);
  };
  const handleSuccess = (response, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    file.status = "success";
    file.response = response;
    props.onSuccess(response, file, uploadFiles.value);
    props.onChange(file, uploadFiles.value);
  };
  const handleStart = (file) => {
    if (isNil(file.uid))
      file.uid = genFileId();
    const uploadFile = {
      name: file.name,
      percentage: 0,
      status: "ready",
      size: file.size,
      raw: file,
      uid: file.uid
    };
    if (props.listType === "picture-card" || props.listType === "picture") {
      try {
        uploadFile.url = URL.createObjectURL(file);
      } catch (err) {
        debugWarn(SCOPE, err.message);
        props.onError(err, uploadFile, uploadFiles.value);
      }
    }
    uploadFiles.value = [...uploadFiles.value, uploadFile];
    props.onChange(uploadFile, uploadFiles.value);
  };
  const handleRemove = async (file) => {
    const uploadFile = file instanceof File ? getFile(file) : file;
    if (!uploadFile)
      throwError(SCOPE, "file to be removed not found");
    const doRemove = (file2) => {
      abort(file2);
      removeFile(file2);
      props.onRemove(file2, uploadFiles.value);
      revokeFileObjectURL(file2);
    };
    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.value);
      if (before !== false)
        doRemove(uploadFile);
    } else {
      doRemove(uploadFile);
    }
  };
  function submit() {
    uploadFiles.value.filter(({ status }) => status === "ready").forEach(({ raw }) => {
      var _a;
      return raw && ((_a = uploadRef.value) == null ? void 0 : _a.upload(raw));
    });
  }
  watch(() => props.listType, (val) => {
    if (val !== "picture-card" && val !== "picture") {
      return;
    }
    uploadFiles.value = uploadFiles.value.map((file) => {
      const { raw, url } = file;
      if (!url && raw) {
        try {
          file.url = URL.createObjectURL(raw);
        } catch (err) {
          props.onError(err, file, uploadFiles.value);
        }
      }
      return file;
    });
  });
  watch(uploadFiles, (files) => {
    for (const file of files) {
      file.uid || (file.uid = genFileId());
      file.status || (file.status = "success");
    }
  }, { immediate: true, deep: true });
  return {
    uploadFiles,
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    revokeFileObjectURL
  };
};
const __default__ = defineComponent({
  name: "ElUpload"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: uploadProps,
  setup(__props, { expose }) {
    const props = __props;
    const disabled = useFormDisabled();
    const uploadRef = shallowRef();
    const {
      abort,
      submit,
      clearFiles,
      uploadFiles,
      handleStart,
      handleError,
      handleRemove,
      handleSuccess,
      handleProgress
    } = useHandlers(props, uploadRef);
    const isPictureCard = computed(() => props.listType === "picture-card");
    const uploadContentProps2 = computed(() => ({
      ...props,
      fileList: uploadFiles.value,
      onStart: handleStart,
      onProgress: handleProgress,
      onSuccess: handleSuccess,
      onError: handleError,
      onRemove: handleRemove
    }));
    provide(uploadContextKey, {
      accept: toRef(props, "accept")
    });
    expose({
      abort,
      submit,
      clearFiles,
      handleStart,
      handleRemove
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        unref(isPictureCard) && _ctx.showFileList ? (openBlock(), createBlock(UploadList, {
          key: 0,
          disabled: unref(disabled),
          "list-type": _ctx.listType,
          files: unref(uploadFiles),
          crossorigin: _ctx.crossorigin,
          "handle-preview": _ctx.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          append: withCtx(() => [
            createVNode(UploadContent, mergeProps({
              ref_key: "uploadRef",
              ref: uploadRef
            }, unref(uploadContentProps2)), {
              default: withCtx(() => [
                _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
                !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 16)
          ]),
          _: 2
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ])
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true),
        !unref(isPictureCard) || unref(isPictureCard) && !_ctx.showFileList ? (openBlock(), createBlock(UploadContent, mergeProps({
          key: 1,
          ref_key: "uploadRef",
          ref: uploadRef
        }, unref(uploadContentProps2)), {
          default: withCtx(() => [
            _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
            !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 16)) : createCommentVNode("v-if", true),
        _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "default", { key: 2 }) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "tip"),
        !unref(isPictureCard) && _ctx.showFileList ? (openBlock(), createBlock(UploadList, {
          key: 3,
          disabled: unref(disabled),
          "list-type": _ctx.listType,
          files: unref(uploadFiles),
          crossorigin: _ctx.crossorigin,
          "handle-preview": _ctx.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          _: 2
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ])
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var Upload = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "upload.vue"]]);
const ElUpload = withInstall(Upload);
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ResourcePublish"
  },
  __name: "star",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const form = ref({
      title: "",
      // 资源标题
      publishTime: "",
      // 发布时间
      summary: "",
      // 资源简介
      content: "",
      // 资源内容
      category: "",
      // 资源分类
      tags: [],
      // 资源标签
      paymentType: 0,
      // 是否免费
      resourcePassword: ""
      // 资源密码
    });
    const downloadVersions = ref([
      {
        id: Date.now().toString(),
        version: "",
        language: "简体中文",
        system: "All",
        updateTime: dayjs().format("YYYY-MM-DD"),
        size: "",
        downloadLink: "",
        description: ""
      }
    ]);
    const fileList = ref([]);
    const fileListCarousel = ref([]);
    const fileVideoList = ref([]);
    const classList = ref([
      { id: 1, name: "软件工具" },
      { id: 2, name: "设计素材" },
      { id: 3, name: "教程资料" },
      { id: 4, name: "源码分享" },
      { id: 5, name: "其他资源" }
    ]);
    const tagList = ref([
      { id: 1, tagName: "Vue" },
      { id: 2, tagName: "React" },
      { id: 3, tagName: "Node.js" },
      { id: 4, tagName: "TypeScript" },
      { id: 5, tagName: "JavaScript" },
      { id: 6, tagName: "CSS" },
      { id: 7, tagName: "HTML" },
      { id: 8, tagName: "Python" }
    ]);
    const systemOptions = [
      { label: "All", value: "All" },
      { label: "Windows", value: "Windows" },
      { label: "macOS", value: "macOS" },
      { label: "Linux", value: "Linux" },
      { label: "iOS", value: "iOS" },
      { label: "Android", value: "Android" }
    ];
    const languageOptions = [
      { label: "简体中文", value: "简体中文" },
      { label: "English", value: "English" },
      { label: "繁體中文", value: "繁體中文" },
      { label: "日本語", value: "日本語" },
      { label: "한국어", value: "한국어" }
    ];
    const rules = ref({
      title: [
        { required: true, message: "请输入资源标题", trigger: "blur" }
      ],
      category: [
        { required: true, message: "请选择资源分类", trigger: "change" }
      ],
      summary: [
        { required: true, message: "请输入资源简介", trigger: "blur" }
      ],
      content: [
        { required: true, message: "请输入资源内容", trigger: "blur" }
      ]
    });
    const formRef = ref(null);
    const addDownloadVersion = () => {
      downloadVersions.value.push({
        id: Date.now().toString(),
        version: "",
        language: "简体中文",
        system: "All",
        updateTime: dayjs().format("YYYY-MM-DD"),
        size: "",
        downloadLink: "",
        description: ""
      });
    };
    const removeDownloadVersion = (index) => {
      if (downloadVersions.value.length > 1) {
        downloadVersions.value.splice(index, 1);
      }
    };
    const handleUploadSuccess = (response, file) => {
      console.log("Upload success:", response, file);
      if (response && response.url) {
        const fileIndex = fileList.value.findIndex((item) => item.uid === file.uid);
        if (fileIndex !== -1) {
          fileList.value[fileIndex].url = response.url;
        }
      }
    };
    const handleUploadSuccessCarousel = (response, file) => {
      console.log("Carousel upload success:", response, file);
      if (response && response.url) {
        const fileIndex = fileListCarousel.value.findIndex((item) => item.uid === file.uid);
        if (fileIndex !== -1) {
          fileListCarousel.value[fileIndex].url = response.url;
        }
      }
    };
    const handleVideoUploadSuccess = (response, file) => {
      console.log("Video upload success:", response, file);
      if (response && response.url) {
        const fileIndex = fileVideoList.value.findIndex((item) => item.uid === file.uid);
        if (fileIndex !== -1) {
          fileVideoList.value[fileIndex].url = response.url;
        }
      }
    };
    const beforeUpload = (file) => {
      const isImage = ["image/jpeg", "image/png", "image/gif"].includes(file.type);
      if (!isImage) {
        ElMessage.error("只能上传 JPG/PNG/GIF 格式的图片!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        ElMessage.error("图片大小不能超过 2MB!");
        return false;
      }
      return true;
    };
    const beforeVideoUpload = (file) => {
      const allowedExtensions = ["mp4", "mov", "avi", "mkv", "wmv", "flv", "mpeg"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        ElMessage.error("请上传有效的视频文件格式!");
        return false;
      }
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        ElMessage.error("视频大小不能超过 50MB!");
        return false;
      }
      return true;
    };
    const submitForm = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          const formData = { ...form.value };
          if (formData.publishTime) {
            formData.publishTime = dayjs(formData.publishTime).format("YYYY-MM-DD HH:mm:ss");
          }
          const thumbUrl = fileList.value.length > 0 ? fileList.value[0].url : "";
          const carouselUrls = fileListCarousel.value.map((file) => ({ url: file.url }));
          const videoUrl = fileVideoList.value.length > 0 ? fileVideoList.value[0].url : "";
          const tagsString = form.value.tags.join(",");
          const downloadVersionsJSON = JSON.stringify({
            versions: downloadVersions.value.filter((version) => version.downloadLink && version.version)
          });
          const submitData = {
            title: formData.title,
            sortClass: formData.category,
            content: formData.content,
            intro: formData.summary,
            createTime: formData.publishTime || dayjs().format("YYYY-MM-DD HH:mm:ss"),
            thumb: thumbUrl,
            keyword: tagsString,
            isFree: formData.paymentType,
            resAddress: downloadVersionsJSON,
            resPassword: formData.resourcePassword,
            videoAddress: videoUrl,
            carousel: JSON.stringify(carouselUrls)
          };
          console.log("提交数据:", submitData);
          ElNotification({
            title: "成功",
            message: "资源发布成功（演示）",
            type: "success"
          });
        } else {
          ElMessage.error("请完善表单信息");
        }
      });
    };
    const resetForm = () => {
      formRef.value?.resetFields();
      fileList.value = [];
      fileListCarousel.value = [];
      fileVideoList.value = [];
      downloadVersions.value = [{
        id: Date.now().toString(),
        version: "",
        language: "简体中文",
        system: "All",
        updateTime: dayjs().format("YYYY-MM-DD"),
        size: "",
        downloadLink: "",
        description: ""
      }];
    };
    const handlePictureCardPreview = (file) => {
      console.log("Preview:", file);
    };
    const handleRemove = (file) => {
      console.log("Remove:", file);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = ElForm;
      const _component_el_card = ElCard;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_date_picker = ElDatePicker;
      const _component_el_upload = ElUpload;
      const _component_el_icon = ElIcon;
      const _component_Plus = resolveComponent("Plus");
      const _component_zoom_in = resolveComponent("zoom-in");
      const _component_Delete = resolveComponent("Delete");
      const _component_upload_filled = resolveComponent("upload-filled");
      const _component_el_button = ElButton;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio = ElRadio;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "resource-publish-container home" }, _attrs))} data-v-41010d3f><div class="header" data-v-41010d3f><h2 data-v-41010d3f>发布资源</h2><p class="subtitle" data-v-41010d3f>分享您的优质内容给其他用户</p></div>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "formRef",
        ref: formRef,
        model: form.value,
        rules: rules.value,
        "label-width": "100px",
        class: "publish-form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_card, {
              class: "form-section",
              shadow: "never"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="section-title" data-v-41010d3f${_scopeId2}>基本信息</span>`);
                } else {
                  return [
                    createVNode("span", { class: "section-title" }, "基本信息")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "资源标题",
                    prop: "title"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.title,
                          "onUpdate:modelValue": ($event) => form.value.title = $event,
                          placeholder: "请输入资源标题",
                          maxlength: "100",
                          "show-word-limit": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.title,
                            "onUpdate:modelValue": ($event) => form.value.title = $event,
                            placeholder: "请输入资源标题",
                            maxlength: "100",
                            "show-word-limit": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "资源分类",
                    prop: "category"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: form.value.category,
                          "onUpdate:modelValue": ($event) => form.value.category = $event,
                          placeholder: "请选择资源分类",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(classList.value, (item) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: item.id,
                                  label: item.name,
                                  value: item.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(classList.value, (item) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: item.id,
                                    label: item.name,
                                    value: item.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: form.value.category,
                            "onUpdate:modelValue": ($event) => form.value.category = $event,
                            placeholder: "请选择资源分类",
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(classList.value, (item) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: item.id,
                                  label: item.name,
                                  value: item.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "资源标签" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: form.value.tags,
                          "onUpdate:modelValue": ($event) => form.value.tags = $event,
                          multiple: "",
                          filterable: "",
                          "allow-create": "",
                          "default-first-option": "",
                          placeholder: "请选择或输入标签",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(tagList.value, (tag) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: tag.id,
                                  label: tag.tagName,
                                  value: tag.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(tagList.value, (tag) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: tag.id,
                                    label: tag.tagName,
                                    value: tag.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: form.value.tags,
                            "onUpdate:modelValue": ($event) => form.value.tags = $event,
                            multiple: "",
                            filterable: "",
                            "allow-create": "",
                            "default-first-option": "",
                            placeholder: "请选择或输入标签",
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(tagList.value, (tag) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: tag.id,
                                  label: tag.tagName,
                                  value: tag.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "发布时间" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_date_picker, {
                          modelValue: form.value.publishTime,
                          "onUpdate:modelValue": ($event) => form.value.publishTime = $event,
                          type: "datetime",
                          placeholder: "选择发布时间（默认为当前时间）",
                          style: { "width": "100%" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_date_picker, {
                            modelValue: form.value.publishTime,
                            "onUpdate:modelValue": ($event) => form.value.publishTime = $event,
                            type: "datetime",
                            placeholder: "选择发布时间（默认为当前时间）",
                            style: { "width": "100%" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "资源简介",
                    prop: "summary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.summary,
                          "onUpdate:modelValue": ($event) => form.value.summary = $event,
                          type: "textarea",
                          rows: 4,
                          placeholder: "请输入资源简介，建议150字以内",
                          maxlength: "300",
                          "show-word-limit": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.summary,
                            "onUpdate:modelValue": ($event) => form.value.summary = $event,
                            type: "textarea",
                            rows: 4,
                            placeholder: "请输入资源简介，建议150字以内",
                            maxlength: "300",
                            "show-word-limit": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "详细内容",
                    prop: "content"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.content,
                          "onUpdate:modelValue": ($event) => form.value.content = $event,
                          type: "textarea",
                          rows: 8,
                          placeholder: "请详细描述您的资源内容、使用方法、注意事项等",
                          maxlength: "2000",
                          "show-word-limit": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.content,
                            "onUpdate:modelValue": ($event) => form.value.content = $event,
                            type: "textarea",
                            rows: 8,
                            placeholder: "请详细描述您的资源内容、使用方法、注意事项等",
                            maxlength: "2000",
                            "show-word-limit": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "资源标题",
                      prop: "title"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.title,
                          "onUpdate:modelValue": ($event) => form.value.title = $event,
                          placeholder: "请输入资源标题",
                          maxlength: "100",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "资源分类",
                      prop: "category"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: form.value.category,
                          "onUpdate:modelValue": ($event) => form.value.category = $event,
                          placeholder: "请选择资源分类",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(classList.value, (item) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: item.id,
                                label: item.name,
                                value: item.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "资源标签" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: form.value.tags,
                          "onUpdate:modelValue": ($event) => form.value.tags = $event,
                          multiple: "",
                          filterable: "",
                          "allow-create": "",
                          "default-first-option": "",
                          placeholder: "请选择或输入标签",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(tagList.value, (tag) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: tag.id,
                                label: tag.tagName,
                                value: tag.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "发布时间" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_date_picker, {
                          modelValue: form.value.publishTime,
                          "onUpdate:modelValue": ($event) => form.value.publishTime = $event,
                          type: "datetime",
                          placeholder: "选择发布时间（默认为当前时间）",
                          style: { "width": "100%" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "资源简介",
                      prop: "summary"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.summary,
                          "onUpdate:modelValue": ($event) => form.value.summary = $event,
                          type: "textarea",
                          rows: 4,
                          placeholder: "请输入资源简介，建议150字以内",
                          maxlength: "300",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, {
                      label: "详细内容",
                      prop: "content"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.content,
                          "onUpdate:modelValue": ($event) => form.value.content = $event,
                          type: "textarea",
                          rows: 8,
                          placeholder: "请详细描述您的资源内容、使用方法、注意事项等",
                          maxlength: "2000",
                          "show-word-limit": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, {
              class: "form-section",
              shadow: "never"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="section-title" data-v-41010d3f${_scopeId2}>媒体文件</span>`);
                } else {
                  return [
                    createVNode("span", { class: "section-title" }, "媒体文件")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "封面图片" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_upload, {
                          "file-list": fileList.value,
                          "onUpdate:fileList": ($event) => fileList.value = $event,
                          action: "/api/upload/image",
                          "list-type": "picture-card",
                          limit: 1,
                          "before-upload": beforeUpload,
                          "on-success": handleUploadSuccess,
                          accept: "image/*"
                        }, {
                          file: withCtx(({ file }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div data-v-41010d3f${_scopeId4}><img class="el-upload-list__item-thumbnail"${ssrRenderAttr("src", file.url)} alt="" data-v-41010d3f${_scopeId4}><span class="el-upload-list__item-actions" data-v-41010d3f${_scopeId4}><span class="el-upload-list__item-preview" data-v-41010d3f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_zoom_in, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_zoom_in)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</span><span class="el-upload-list__item-delete" data-v-41010d3f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Delete, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Delete)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</span></span></div>`);
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode("img", {
                                    class: "el-upload-list__item-thumbnail",
                                    src: file.url,
                                    alt: ""
                                  }, null, 8, ["src"]),
                                  createVNode("span", { class: "el-upload-list__item-actions" }, [
                                    createVNode("span", {
                                      class: "el-upload-list__item-preview",
                                      onClick: ($event) => handlePictureCardPreview(file)
                                    }, [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_zoom_in)
                                        ]),
                                        _: 1
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("span", {
                                      class: "el-upload-list__item-delete",
                                      onClick: ($event) => handleRemove(file)
                                    }, [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_Delete)
                                        ]),
                                        _: 1
                                      })
                                    ], 8, ["onClick"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Plus, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Plus)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Plus)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="upload-tip" data-v-41010d3f${_scopeId3}>建议上传 16:9 比例的图片，支持 JPG、PNG、GIF 格式，大小不超过 2MB</div>`);
                      } else {
                        return [
                          createVNode(_component_el_upload, {
                            "file-list": fileList.value,
                            "onUpdate:fileList": ($event) => fileList.value = $event,
                            action: "/api/upload/image",
                            "list-type": "picture-card",
                            limit: 1,
                            "before-upload": beforeUpload,
                            "on-success": handleUploadSuccess,
                            accept: "image/*"
                          }, {
                            file: withCtx(({ file }) => [
                              createVNode("div", null, [
                                createVNode("img", {
                                  class: "el-upload-list__item-thumbnail",
                                  src: file.url,
                                  alt: ""
                                }, null, 8, ["src"]),
                                createVNode("span", { class: "el-upload-list__item-actions" }, [
                                  createVNode("span", {
                                    class: "el-upload-list__item-preview",
                                    onClick: ($event) => handlePictureCardPreview(file)
                                  }, [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_zoom_in)
                                      ]),
                                      _: 1
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("span", {
                                    class: "el-upload-list__item-delete",
                                    onClick: ($event) => handleRemove(file)
                                  }, [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_Delete)
                                      ]),
                                      _: 1
                                    })
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Plus)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["file-list", "onUpdate:fileList"]),
                          createVNode("div", { class: "upload-tip" }, "建议上传 16:9 比例的图片，支持 JPG、PNG、GIF 格式，大小不超过 2MB")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "轮播图片" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_upload, {
                          "file-list": fileListCarousel.value,
                          "onUpdate:fileList": ($event) => fileListCarousel.value = $event,
                          action: "/api/upload/image",
                          "list-type": "picture-card",
                          limit: 5,
                          "before-upload": beforeUpload,
                          "on-success": handleUploadSuccessCarousel,
                          accept: "image/*",
                          multiple: ""
                        }, {
                          file: withCtx(({ file }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div data-v-41010d3f${_scopeId4}><img class="el-upload-list__item-thumbnail"${ssrRenderAttr("src", file.url)} alt="" data-v-41010d3f${_scopeId4}><span class="el-upload-list__item-actions" data-v-41010d3f${_scopeId4}><span class="el-upload-list__item-preview" data-v-41010d3f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_zoom_in, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_zoom_in)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</span><span class="el-upload-list__item-delete" data-v-41010d3f${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Delete, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Delete)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`</span></span></div>`);
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode("img", {
                                    class: "el-upload-list__item-thumbnail",
                                    src: file.url,
                                    alt: ""
                                  }, null, 8, ["src"]),
                                  createVNode("span", { class: "el-upload-list__item-actions" }, [
                                    createVNode("span", {
                                      class: "el-upload-list__item-preview",
                                      onClick: ($event) => handlePictureCardPreview(file)
                                    }, [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_zoom_in)
                                        ]),
                                        _: 1
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("span", {
                                      class: "el-upload-list__item-delete",
                                      onClick: ($event) => handleRemove(file)
                                    }, [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_Delete)
                                        ]),
                                        _: 1
                                      })
                                    ], 8, ["onClick"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Plus, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Plus)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Plus)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="upload-tip" data-v-41010d3f${_scopeId3}>最多上传 5 张轮播图片，用于展示资源详情</div>`);
                      } else {
                        return [
                          createVNode(_component_el_upload, {
                            "file-list": fileListCarousel.value,
                            "onUpdate:fileList": ($event) => fileListCarousel.value = $event,
                            action: "/api/upload/image",
                            "list-type": "picture-card",
                            limit: 5,
                            "before-upload": beforeUpload,
                            "on-success": handleUploadSuccessCarousel,
                            accept: "image/*",
                            multiple: ""
                          }, {
                            file: withCtx(({ file }) => [
                              createVNode("div", null, [
                                createVNode("img", {
                                  class: "el-upload-list__item-thumbnail",
                                  src: file.url,
                                  alt: ""
                                }, null, 8, ["src"]),
                                createVNode("span", { class: "el-upload-list__item-actions" }, [
                                  createVNode("span", {
                                    class: "el-upload-list__item-preview",
                                    onClick: ($event) => handlePictureCardPreview(file)
                                  }, [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_zoom_in)
                                      ]),
                                      _: 1
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("span", {
                                    class: "el-upload-list__item-delete",
                                    onClick: ($event) => handleRemove(file)
                                  }, [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_Delete)
                                      ]),
                                      _: 1
                                    })
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Plus)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["file-list", "onUpdate:fileList"]),
                          createVNode("div", { class: "upload-tip" }, "最多上传 5 张轮播图片，用于展示资源详情")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "预览视频" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_upload, {
                          "file-list": fileVideoList.value,
                          "onUpdate:fileList": ($event) => fileVideoList.value = $event,
                          action: "/api/upload/video",
                          limit: 1,
                          "before-upload": beforeVideoUpload,
                          "on-success": handleVideoUploadSuccess,
                          accept: "video/*",
                          drag: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, { class: "el-icon--upload" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_upload_filled, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_upload_filled)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="el-upload__text" data-v-41010d3f${_scopeId4}> 将视频文件拖到此处，或<em data-v-41010d3f${_scopeId4}>点击上传</em></div>`);
                            } else {
                              return [
                                createVNode(_component_el_icon, { class: "el-icon--upload" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_upload_filled)
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "el-upload__text" }, [
                                  createTextVNode(" 将视频文件拖到此处，或"),
                                  createVNode("em", null, "点击上传")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="upload-tip" data-v-41010d3f${_scopeId3}>支持 MP4、MOV、AVI 等格式，大小不超过 50MB</div>`);
                      } else {
                        return [
                          createVNode(_component_el_upload, {
                            "file-list": fileVideoList.value,
                            "onUpdate:fileList": ($event) => fileVideoList.value = $event,
                            action: "/api/upload/video",
                            limit: 1,
                            "before-upload": beforeVideoUpload,
                            "on-success": handleVideoUploadSuccess,
                            accept: "video/*",
                            drag: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, { class: "el-icon--upload" }, {
                                default: withCtx(() => [
                                  createVNode(_component_upload_filled)
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "el-upload__text" }, [
                                createTextVNode(" 将视频文件拖到此处，或"),
                                createVNode("em", null, "点击上传")
                              ])
                            ]),
                            _: 1
                          }, 8, ["file-list", "onUpdate:fileList"]),
                          createVNode("div", { class: "upload-tip" }, "支持 MP4、MOV、AVI 等格式，大小不超过 50MB")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "封面图片" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_upload, {
                          "file-list": fileList.value,
                          "onUpdate:fileList": ($event) => fileList.value = $event,
                          action: "/api/upload/image",
                          "list-type": "picture-card",
                          limit: 1,
                          "before-upload": beforeUpload,
                          "on-success": handleUploadSuccess,
                          accept: "image/*"
                        }, {
                          file: withCtx(({ file }) => [
                            createVNode("div", null, [
                              createVNode("img", {
                                class: "el-upload-list__item-thumbnail",
                                src: file.url,
                                alt: ""
                              }, null, 8, ["src"]),
                              createVNode("span", { class: "el-upload-list__item-actions" }, [
                                createVNode("span", {
                                  class: "el-upload-list__item-preview",
                                  onClick: ($event) => handlePictureCardPreview(file)
                                }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_zoom_in)
                                    ]),
                                    _: 1
                                  })
                                ], 8, ["onClick"]),
                                createVNode("span", {
                                  class: "el-upload-list__item-delete",
                                  onClick: ($event) => handleRemove(file)
                                }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Delete)
                                    ]),
                                    _: 1
                                  })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_Plus)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["file-list", "onUpdate:fileList"]),
                        createVNode("div", { class: "upload-tip" }, "建议上传 16:9 比例的图片，支持 JPG、PNG、GIF 格式，大小不超过 2MB")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "轮播图片" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_upload, {
                          "file-list": fileListCarousel.value,
                          "onUpdate:fileList": ($event) => fileListCarousel.value = $event,
                          action: "/api/upload/image",
                          "list-type": "picture-card",
                          limit: 5,
                          "before-upload": beforeUpload,
                          "on-success": handleUploadSuccessCarousel,
                          accept: "image/*",
                          multiple: ""
                        }, {
                          file: withCtx(({ file }) => [
                            createVNode("div", null, [
                              createVNode("img", {
                                class: "el-upload-list__item-thumbnail",
                                src: file.url,
                                alt: ""
                              }, null, 8, ["src"]),
                              createVNode("span", { class: "el-upload-list__item-actions" }, [
                                createVNode("span", {
                                  class: "el-upload-list__item-preview",
                                  onClick: ($event) => handlePictureCardPreview(file)
                                }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_zoom_in)
                                    ]),
                                    _: 1
                                  })
                                ], 8, ["onClick"]),
                                createVNode("span", {
                                  class: "el-upload-list__item-delete",
                                  onClick: ($event) => handleRemove(file)
                                }, [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Delete)
                                    ]),
                                    _: 1
                                  })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(_component_Plus)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["file-list", "onUpdate:fileList"]),
                        createVNode("div", { class: "upload-tip" }, "最多上传 5 张轮播图片，用于展示资源详情")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "预览视频" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_upload, {
                          "file-list": fileVideoList.value,
                          "onUpdate:fileList": ($event) => fileVideoList.value = $event,
                          action: "/api/upload/video",
                          limit: 1,
                          "before-upload": beforeVideoUpload,
                          "on-success": handleVideoUploadSuccess,
                          accept: "video/*",
                          drag: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, { class: "el-icon--upload" }, {
                              default: withCtx(() => [
                                createVNode(_component_upload_filled)
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "el-upload__text" }, [
                              createTextVNode(" 将视频文件拖到此处，或"),
                              createVNode("em", null, "点击上传")
                            ])
                          ]),
                          _: 1
                        }, 8, ["file-list", "onUpdate:fileList"]),
                        createVNode("div", { class: "upload-tip" }, "支持 MP4、MOV、AVI 等格式，大小不超过 50MB")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, {
              class: "form-section",
              shadow: "never"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="section-header" data-v-41010d3f${_scopeId2}><span class="section-title" data-v-41010d3f${_scopeId2}>下载版本</span>`);
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    size: "small",
                    onClick: addDownloadVersion
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Plus, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Plus)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` 添加版本 `);
                      } else {
                        return [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Plus)
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 添加版本 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "section-header" }, [
                      createVNode("span", { class: "section-title" }, "下载版本"),
                      createVNode(_component_el_button, {
                        type: "primary",
                        size: "small",
                        onClick: addDownloadVersion
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Plus)
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 添加版本 ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(downloadVersions.value, (version, index) => {
                    _push3(`<div class="version-item" data-v-41010d3f${_scopeId2}><div class="version-header" data-v-41010d3f${_scopeId2}><span class="version-label" data-v-41010d3f${_scopeId2}>版本 ${ssrInterpolate(index + 1)}</span>`);
                    if (downloadVersions.value.length > 1) {
                      _push3(ssrRenderComponent(_component_el_button, {
                        type: "danger",
                        size: "small",
                        onClick: ($event) => removeDownloadVersion(index)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` 删除 `);
                          } else {
                            return [
                              createTextVNode(" 删除 ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_col, { span: 6 }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, {
                                  label: "版本号",
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_input, {
                                        modelValue: version.version,
                                        "onUpdate:modelValue": ($event) => version.version = $event,
                                        placeholder: "如: v1.0.0"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_input, {
                                          modelValue: version.version,
                                          "onUpdate:modelValue": ($event) => version.version = $event,
                                          placeholder: "如: v1.0.0"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_form_item, {
                                    label: "版本号",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input, {
                                        modelValue: version.version,
                                        "onUpdate:modelValue": ($event) => version.version = $event,
                                        placeholder: "如: v1.0.0"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_col, { span: 6 }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, {
                                  label: "语言",
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_select, {
                                        modelValue: version.language,
                                        "onUpdate:modelValue": ($event) => version.language = $event,
                                        placeholder: "选择语言"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(languageOptions, (lang) => {
                                              _push7(ssrRenderComponent(_component_el_option, {
                                                key: lang.value,
                                                label: lang.label,
                                                value: lang.value
                                              }, null, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(), createBlock(Fragment, null, renderList(languageOptions, (lang) => {
                                                return createVNode(_component_el_option, {
                                                  key: lang.value,
                                                  label: lang.label,
                                                  value: lang.value
                                                }, null, 8, ["label", "value"]);
                                              }), 64))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_select, {
                                          modelValue: version.language,
                                          "onUpdate:modelValue": ($event) => version.language = $event,
                                          placeholder: "选择语言"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(Fragment, null, renderList(languageOptions, (lang) => {
                                              return createVNode(_component_el_option, {
                                                key: lang.value,
                                                label: lang.label,
                                                value: lang.value
                                              }, null, 8, ["label", "value"]);
                                            }), 64))
                                          ]),
                                          _: 2
                                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_form_item, {
                                    label: "语言",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_select, {
                                        modelValue: version.language,
                                        "onUpdate:modelValue": ($event) => version.language = $event,
                                        placeholder: "选择语言"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList(languageOptions, (lang) => {
                                            return createVNode(_component_el_option, {
                                              key: lang.value,
                                              label: lang.label,
                                              value: lang.value
                                            }, null, 8, ["label", "value"]);
                                          }), 64))
                                        ]),
                                        _: 2
                                      }, 1032, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_col, { span: 6 }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, {
                                  label: "系统",
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_select, {
                                        modelValue: version.system,
                                        "onUpdate:modelValue": ($event) => version.system = $event,
                                        placeholder: "选择系统"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(systemOptions, (sys) => {
                                              _push7(ssrRenderComponent(_component_el_option, {
                                                key: sys.value,
                                                label: sys.label,
                                                value: sys.value
                                              }, null, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(), createBlock(Fragment, null, renderList(systemOptions, (sys) => {
                                                return createVNode(_component_el_option, {
                                                  key: sys.value,
                                                  label: sys.label,
                                                  value: sys.value
                                                }, null, 8, ["label", "value"]);
                                              }), 64))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_select, {
                                          modelValue: version.system,
                                          "onUpdate:modelValue": ($event) => version.system = $event,
                                          placeholder: "选择系统"
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(Fragment, null, renderList(systemOptions, (sys) => {
                                              return createVNode(_component_el_option, {
                                                key: sys.value,
                                                label: sys.label,
                                                value: sys.value
                                              }, null, 8, ["label", "value"]);
                                            }), 64))
                                          ]),
                                          _: 2
                                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_form_item, {
                                    label: "系统",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_select, {
                                        modelValue: version.system,
                                        "onUpdate:modelValue": ($event) => version.system = $event,
                                        placeholder: "选择系统"
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList(systemOptions, (sys) => {
                                            return createVNode(_component_el_option, {
                                              key: sys.value,
                                              label: sys.label,
                                              value: sys.value
                                            }, null, 8, ["label", "value"]);
                                          }), 64))
                                        ]),
                                        _: 2
                                      }, 1032, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_col, { span: 6 }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, {
                                  label: "更新时间",
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_date_picker, {
                                        modelValue: version.updateTime,
                                        "onUpdate:modelValue": ($event) => version.updateTime = $event,
                                        type: "date",
                                        placeholder: "选择日期",
                                        "value-format": "YYYY-MM-DD",
                                        style: { "width": "100%" }
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_date_picker, {
                                          modelValue: version.updateTime,
                                          "onUpdate:modelValue": ($event) => version.updateTime = $event,
                                          type: "date",
                                          placeholder: "选择日期",
                                          "value-format": "YYYY-MM-DD",
                                          style: { "width": "100%" }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_form_item, {
                                    label: "更新时间",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_date_picker, {
                                        modelValue: version.updateTime,
                                        "onUpdate:modelValue": ($event) => version.updateTime = $event,
                                        type: "date",
                                        placeholder: "选择日期",
                                        "value-format": "YYYY-MM-DD",
                                        style: { "width": "100%" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "版本号",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: version.version,
                                      "onUpdate:modelValue": ($event) => version.version = $event,
                                      placeholder: "如: v1.0.0"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "语言",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: version.language,
                                      "onUpdate:modelValue": ($event) => version.language = $event,
                                      placeholder: "选择语言"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(languageOptions, (lang) => {
                                          return createVNode(_component_el_option, {
                                            key: lang.value,
                                            label: lang.label,
                                            value: lang.value
                                          }, null, 8, ["label", "value"]);
                                        }), 64))
                                      ]),
                                      _: 2
                                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "系统",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: version.system,
                                      "onUpdate:modelValue": ($event) => version.system = $event,
                                      placeholder: "选择系统"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(systemOptions, (sys) => {
                                          return createVNode(_component_el_option, {
                                            key: sys.value,
                                            label: sys.label,
                                            value: sys.value
                                          }, null, 8, ["label", "value"]);
                                        }), 64))
                                      ]),
                                      _: 2
                                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "更新时间",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_date_picker, {
                                      modelValue: version.updateTime,
                                      "onUpdate:modelValue": ($event) => version.updateTime = $event,
                                      type: "date",
                                      placeholder: "选择日期",
                                      "value-format": "YYYY-MM-DD",
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_row, { gutter: 20 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_col, { span: 8 }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, {
                                  label: "文件大小",
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_input, {
                                        modelValue: version.size,
                                        "onUpdate:modelValue": ($event) => version.size = $event,
                                        placeholder: "如: 125MB"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_input, {
                                          modelValue: version.size,
                                          "onUpdate:modelValue": ($event) => version.size = $event,
                                          placeholder: "如: 125MB"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_form_item, {
                                    label: "文件大小",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input, {
                                        modelValue: version.size,
                                        "onUpdate:modelValue": ($event) => version.size = $event,
                                        placeholder: "如: 125MB"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_col, { span: 16 }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_form_item, {
                                  label: "下载链接",
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_input, {
                                        modelValue: version.downloadLink,
                                        "onUpdate:modelValue": ($event) => version.downloadLink = $event,
                                        placeholder: "输入下载链接"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_input, {
                                          modelValue: version.downloadLink,
                                          "onUpdate:modelValue": ($event) => version.downloadLink = $event,
                                          placeholder: "输入下载链接"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_form_item, {
                                    label: "下载链接",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_input, {
                                        modelValue: version.downloadLink,
                                        "onUpdate:modelValue": ($event) => version.downloadLink = $event,
                                        placeholder: "输入下载链接"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_col, { span: 8 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "文件大小",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: version.size,
                                      "onUpdate:modelValue": ($event) => version.size = $event,
                                      placeholder: "如: 125MB"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 16 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "下载链接",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: version.downloadLink,
                                      "onUpdate:modelValue": ($event) => version.downloadLink = $event,
                                      placeholder: "输入下载链接"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "版本描述",
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: version.description,
                            "onUpdate:modelValue": ($event) => version.description = $event,
                            type: "textarea",
                            rows: 2,
                            placeholder: "版本更新说明或其他描述信息"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: version.description,
                              "onUpdate:modelValue": ($event) => version.description = $event,
                              type: "textarea",
                              rows: 2,
                              placeholder: "版本更新说明或其他描述信息"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(downloadVersions.value, (version, index) => {
                      return openBlock(), createBlock("div", {
                        key: version.id,
                        class: "version-item"
                      }, [
                        createVNode("div", { class: "version-header" }, [
                          createVNode("span", { class: "version-label" }, "版本 " + toDisplayString(index + 1), 1),
                          downloadVersions.value.length > 1 ? (openBlock(), createBlock(_component_el_button, {
                            key: 0,
                            type: "danger",
                            size: "small",
                            onClick: ($event) => removeDownloadVersion(index)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 删除 ")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        createVNode(_component_el_row, { gutter: 20 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "版本号",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: version.version,
                                      "onUpdate:modelValue": ($event) => version.version = $event,
                                      placeholder: "如: v1.0.0"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "语言",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: version.language,
                                      "onUpdate:modelValue": ($event) => version.language = $event,
                                      placeholder: "选择语言"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(languageOptions, (lang) => {
                                          return createVNode(_component_el_option, {
                                            key: lang.value,
                                            label: lang.label,
                                            value: lang.value
                                          }, null, 8, ["label", "value"]);
                                        }), 64))
                                      ]),
                                      _: 2
                                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "系统",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_select, {
                                      modelValue: version.system,
                                      "onUpdate:modelValue": ($event) => version.system = $event,
                                      placeholder: "选择系统"
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(systemOptions, (sys) => {
                                          return createVNode(_component_el_option, {
                                            key: sys.value,
                                            label: sys.label,
                                            value: sys.value
                                          }, null, 8, ["label", "value"]);
                                        }), 64))
                                      ]),
                                      _: 2
                                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 6 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "更新时间",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_date_picker, {
                                      modelValue: version.updateTime,
                                      "onUpdate:modelValue": ($event) => version.updateTime = $event,
                                      type: "date",
                                      placeholder: "选择日期",
                                      "value-format": "YYYY-MM-DD",
                                      style: { "width": "100%" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_el_row, { gutter: 20 }, {
                          default: withCtx(() => [
                            createVNode(_component_el_col, { span: 8 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "文件大小",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: version.size,
                                      "onUpdate:modelValue": ($event) => version.size = $event,
                                      placeholder: "如: 125MB"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_el_col, { span: 16 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_form_item, {
                                  label: "下载链接",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: version.downloadLink,
                                      "onUpdate:modelValue": ($event) => version.downloadLink = $event,
                                      placeholder: "输入下载链接"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_el_form_item, {
                          label: "版本描述",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: version.description,
                              "onUpdate:modelValue": ($event) => version.description = $event,
                              type: "textarea",
                              rows: 2,
                              placeholder: "版本更新说明或其他描述信息"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1024)
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, {
              class: "form-section",
              shadow: "never"
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="section-title" data-v-41010d3f${_scopeId2}>其他设置</span>`);
                } else {
                  return [
                    createVNode("span", { class: "section-title" }, "其他设置")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "资源类型" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_radio_group, {
                          modelValue: form.value.paymentType,
                          "onUpdate:modelValue": ($event) => form.value.paymentType = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_radio, { label: 0 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`免费资源`);
                                  } else {
                                    return [
                                      createTextVNode("免费资源")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_radio, { label: 1 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`付费资源`);
                                  } else {
                                    return [
                                      createTextVNode("付费资源")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_radio, { label: 0 }, {
                                  default: withCtx(() => [
                                    createTextVNode("免费资源")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_radio, { label: 1 }, {
                                  default: withCtx(() => [
                                    createTextVNode("付费资源")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_radio_group, {
                            modelValue: form.value.paymentType,
                            "onUpdate:modelValue": ($event) => form.value.paymentType = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_radio, { label: 0 }, {
                                default: withCtx(() => [
                                  createTextVNode("免费资源")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_radio, { label: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode("付费资源")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "资源密码" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.resourcePassword,
                          "onUpdate:modelValue": ($event) => form.value.resourcePassword = $event,
                          placeholder: "可选，为资源设置提取密码",
                          maxlength: "20"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="form-tip" data-v-41010d3f${_scopeId3}>设置后用户下载时需要输入密码</div>`);
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.resourcePassword,
                            "onUpdate:modelValue": ($event) => form.value.resourcePassword = $event,
                            placeholder: "可选，为资源设置提取密码",
                            maxlength: "20"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "form-tip" }, "设置后用户下载时需要输入密码")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "资源类型" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_radio_group, {
                          modelValue: form.value.paymentType,
                          "onUpdate:modelValue": ($event) => form.value.paymentType = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_radio, { label: 0 }, {
                              default: withCtx(() => [
                                createTextVNode("免费资源")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_radio, { label: 1 }, {
                              default: withCtx(() => [
                                createTextVNode("付费资源")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "资源密码" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.resourcePassword,
                          "onUpdate:modelValue": ($event) => form.value.resourcePassword = $event,
                          placeholder: "可选，为资源设置提取密码",
                          maxlength: "20"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "form-tip" }, "设置后用户下载时需要输入密码")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="form-actions" data-v-41010d3f${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              size: "large",
              onClick: resetForm
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`重置`);
                } else {
                  return [
                    createTextVNode("重置")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              size: "large",
              onClick: submitForm
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 发布资源 `);
                } else {
                  return [
                    createTextVNode(" 发布资源 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_el_card, {
                class: "form-section",
                shadow: "never"
              }, {
                header: withCtx(() => [
                  createVNode("span", { class: "section-title" }, "基本信息")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "资源标题",
                    prop: "title"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.title,
                        "onUpdate:modelValue": ($event) => form.value.title = $event,
                        placeholder: "请输入资源标题",
                        maxlength: "100",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "资源分类",
                    prop: "category"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: form.value.category,
                        "onUpdate:modelValue": ($event) => form.value.category = $event,
                        placeholder: "请选择资源分类",
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(classList.value, (item) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: item.id,
                              label: item.name,
                              value: item.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "资源标签" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: form.value.tags,
                        "onUpdate:modelValue": ($event) => form.value.tags = $event,
                        multiple: "",
                        filterable: "",
                        "allow-create": "",
                        "default-first-option": "",
                        placeholder: "请选择或输入标签",
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(tagList.value, (tag) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: tag.id,
                              label: tag.tagName,
                              value: tag.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "发布时间" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_date_picker, {
                        modelValue: form.value.publishTime,
                        "onUpdate:modelValue": ($event) => form.value.publishTime = $event,
                        type: "datetime",
                        placeholder: "选择发布时间（默认为当前时间）",
                        style: { "width": "100%" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "资源简介",
                    prop: "summary"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.summary,
                        "onUpdate:modelValue": ($event) => form.value.summary = $event,
                        type: "textarea",
                        rows: 4,
                        placeholder: "请输入资源简介，建议150字以内",
                        maxlength: "300",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, {
                    label: "详细内容",
                    prop: "content"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.content,
                        "onUpdate:modelValue": ($event) => form.value.content = $event,
                        type: "textarea",
                        rows: 8,
                        placeholder: "请详细描述您的资源内容、使用方法、注意事项等",
                        maxlength: "2000",
                        "show-word-limit": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_card, {
                class: "form-section",
                shadow: "never"
              }, {
                header: withCtx(() => [
                  createVNode("span", { class: "section-title" }, "媒体文件")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "封面图片" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_upload, {
                        "file-list": fileList.value,
                        "onUpdate:fileList": ($event) => fileList.value = $event,
                        action: "/api/upload/image",
                        "list-type": "picture-card",
                        limit: 1,
                        "before-upload": beforeUpload,
                        "on-success": handleUploadSuccess,
                        accept: "image/*"
                      }, {
                        file: withCtx(({ file }) => [
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "el-upload-list__item-thumbnail",
                              src: file.url,
                              alt: ""
                            }, null, 8, ["src"]),
                            createVNode("span", { class: "el-upload-list__item-actions" }, [
                              createVNode("span", {
                                class: "el-upload-list__item-preview",
                                onClick: ($event) => handlePictureCardPreview(file)
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_zoom_in)
                                  ]),
                                  _: 1
                                })
                              ], 8, ["onClick"]),
                              createVNode("span", {
                                class: "el-upload-list__item-delete",
                                onClick: ($event) => handleRemove(file)
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Delete)
                                  ]),
                                  _: 1
                                })
                              ], 8, ["onClick"])
                            ])
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Plus)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["file-list", "onUpdate:fileList"]),
                      createVNode("div", { class: "upload-tip" }, "建议上传 16:9 比例的图片，支持 JPG、PNG、GIF 格式，大小不超过 2MB")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "轮播图片" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_upload, {
                        "file-list": fileListCarousel.value,
                        "onUpdate:fileList": ($event) => fileListCarousel.value = $event,
                        action: "/api/upload/image",
                        "list-type": "picture-card",
                        limit: 5,
                        "before-upload": beforeUpload,
                        "on-success": handleUploadSuccessCarousel,
                        accept: "image/*",
                        multiple: ""
                      }, {
                        file: withCtx(({ file }) => [
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "el-upload-list__item-thumbnail",
                              src: file.url,
                              alt: ""
                            }, null, 8, ["src"]),
                            createVNode("span", { class: "el-upload-list__item-actions" }, [
                              createVNode("span", {
                                class: "el-upload-list__item-preview",
                                onClick: ($event) => handlePictureCardPreview(file)
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_zoom_in)
                                  ]),
                                  _: 1
                                })
                              ], 8, ["onClick"]),
                              createVNode("span", {
                                class: "el-upload-list__item-delete",
                                onClick: ($event) => handleRemove(file)
                              }, [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Delete)
                                  ]),
                                  _: 1
                                })
                              ], 8, ["onClick"])
                            ])
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Plus)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["file-list", "onUpdate:fileList"]),
                      createVNode("div", { class: "upload-tip" }, "最多上传 5 张轮播图片，用于展示资源详情")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "预览视频" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_upload, {
                        "file-list": fileVideoList.value,
                        "onUpdate:fileList": ($event) => fileVideoList.value = $event,
                        action: "/api/upload/video",
                        limit: 1,
                        "before-upload": beforeVideoUpload,
                        "on-success": handleVideoUploadSuccess,
                        accept: "video/*",
                        drag: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, { class: "el-icon--upload" }, {
                            default: withCtx(() => [
                              createVNode(_component_upload_filled)
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "el-upload__text" }, [
                            createTextVNode(" 将视频文件拖到此处，或"),
                            createVNode("em", null, "点击上传")
                          ])
                        ]),
                        _: 1
                      }, 8, ["file-list", "onUpdate:fileList"]),
                      createVNode("div", { class: "upload-tip" }, "支持 MP4、MOV、AVI 等格式，大小不超过 50MB")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_card, {
                class: "form-section",
                shadow: "never"
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "section-header" }, [
                    createVNode("span", { class: "section-title" }, "下载版本"),
                    createVNode(_component_el_button, {
                      type: "primary",
                      size: "small",
                      onClick: addDownloadVersion
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_Plus)
                          ]),
                          _: 1
                        }),
                        createTextVNode(" 添加版本 ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(downloadVersions.value, (version, index) => {
                    return openBlock(), createBlock("div", {
                      key: version.id,
                      class: "version-item"
                    }, [
                      createVNode("div", { class: "version-header" }, [
                        createVNode("span", { class: "version-label" }, "版本 " + toDisplayString(index + 1), 1),
                        downloadVersions.value.length > 1 ? (openBlock(), createBlock(_component_el_button, {
                          key: 0,
                          type: "danger",
                          size: "small",
                          onClick: ($event) => removeDownloadVersion(index)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 删除 ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode(_component_el_row, { gutter: 20 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 6 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "版本号",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: version.version,
                                    "onUpdate:modelValue": ($event) => version.version = $event,
                                    placeholder: "如: v1.0.0"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_el_col, { span: 6 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "语言",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_select, {
                                    modelValue: version.language,
                                    "onUpdate:modelValue": ($event) => version.language = $event,
                                    placeholder: "选择语言"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(languageOptions, (lang) => {
                                        return createVNode(_component_el_option, {
                                          key: lang.value,
                                          label: lang.label,
                                          value: lang.value
                                        }, null, 8, ["label", "value"]);
                                      }), 64))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_el_col, { span: 6 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "系统",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_select, {
                                    modelValue: version.system,
                                    "onUpdate:modelValue": ($event) => version.system = $event,
                                    placeholder: "选择系统"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(systemOptions, (sys) => {
                                        return createVNode(_component_el_option, {
                                          key: sys.value,
                                          label: sys.label,
                                          value: sys.value
                                        }, null, 8, ["label", "value"]);
                                      }), 64))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_el_col, { span: 6 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "更新时间",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_date_picker, {
                                    modelValue: version.updateTime,
                                    "onUpdate:modelValue": ($event) => version.updateTime = $event,
                                    type: "date",
                                    placeholder: "选择日期",
                                    "value-format": "YYYY-MM-DD",
                                    style: { "width": "100%" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_el_row, { gutter: 20 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_col, { span: 8 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "文件大小",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: version.size,
                                    "onUpdate:modelValue": ($event) => version.size = $event,
                                    placeholder: "如: 125MB"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_el_col, { span: 16 }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, {
                                label: "下载链接",
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: version.downloadLink,
                                    "onUpdate:modelValue": ($event) => version.downloadLink = $event,
                                    placeholder: "输入下载链接"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_el_form_item, {
                        label: "版本描述",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: version.description,
                            "onUpdate:modelValue": ($event) => version.description = $event,
                            type: "textarea",
                            rows: 2,
                            placeholder: "版本更新说明或其他描述信息"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 2
                      }, 1024)
                    ]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_component_el_card, {
                class: "form-section",
                shadow: "never"
              }, {
                header: withCtx(() => [
                  createVNode("span", { class: "section-title" }, "其他设置")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "资源类型" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio_group, {
                        modelValue: form.value.paymentType,
                        "onUpdate:modelValue": ($event) => form.value.paymentType = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_radio, { label: 0 }, {
                            default: withCtx(() => [
                              createTextVNode("免费资源")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_radio, { label: 1 }, {
                            default: withCtx(() => [
                              createTextVNode("付费资源")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "资源密码" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.resourcePassword,
                        "onUpdate:modelValue": ($event) => form.value.resourcePassword = $event,
                        placeholder: "可选，为资源设置提取密码",
                        maxlength: "20"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "form-tip" }, "设置后用户下载时需要输入密码")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "form-actions" }, [
                createVNode(_component_el_button, {
                  size: "large",
                  onClick: resetForm
                }, {
                  default: withCtx(() => [
                    createTextVNode("重置")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  size: "large",
                  onClick: submitForm
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 发布资源 ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserInfo/star.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const star = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41010d3f"]]);

export { star as default };
//# sourceMappingURL=star-B_sjig21.mjs.map
