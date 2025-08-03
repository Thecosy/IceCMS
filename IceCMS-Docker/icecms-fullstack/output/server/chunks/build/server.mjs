import * as vue from 'vue';
import { defineComponent, getCurrentInstance, inject, ref, computed, unref, toRaw, isRef, isReactive, toRef, h, Suspense, shallowRef, provide, cloneVNode, createElementBlock, readonly, watch, getCurrentScope, onScopeDispose, nextTick, hasInjectionContext, shallowReactive, Fragment, watchEffect, reactive, effectScope, toRefs, markRaw, createApp, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, isReadonly, isShallow, mergeProps, withCtx, useSSRContext } from 'vue';
import { c as createError$1, i as hasProtocol, k as isScriptProtocol, l as joinURL, w as withQuery, s as sanitizeStatusCode, m as getContext, $ as $fetch$1, n as createHooks, o as executeAsync, t as toRouteMatcher, p as createRouter$1, q as defu } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { RouterView, useRoute as useRoute$1, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { isArray, isObject, isString as isString$1 } from '@vue/shared';
import { isNil } from 'lodash-unified';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import Prism from 'prismjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var preview$1 = {exports: {}};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(vue);

var preview = preview$1.exports;

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory(require$$0);
	})(typeof self !== 'undefined' ? self : preview, function(__WEBPACK_EXTERNAL_MODULE__0__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 		}
	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
	/******/ 		if(mode & 1) value = __webpack_require__(value);
	/******/ 		if(mode & 8) return value;
	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
	/******/ 		var ns = Object.create(null);
	/******/ 		__webpack_require__.r(ns);
	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
	/******/ 		return ns;
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 9);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

	/***/ }),
	/* 1 */,
	/* 2 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isObject; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return arraytoObject; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return importAll; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return inBrowser; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isKorean; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return generatorText; });
	var toString = Object.prototype.toString;
	var isObject = function isObject(target) {
	  return toString.call(target) === '[object Object]';
	};

	function extend(to, _from) {
	  Object.keys(_from).forEach(function (key) {
	    to[key] = _from[key];
	  });
	  return to;
	}

	function arraytoObject(arr) {
	  var res = {};

	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }

	  return res;
	}
	function importAll(map, r) {
	  r.keys().forEach(function (filePath) {
	    map[filePath] = r(filePath);
	  });
	}
	var inBrowser = "undefined" !== 'undefined';
	function isKorean(text) {
	  var reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
	  return reg.test(text);
	}
	function generatorText(_ref) {
	  var selected = _ref.selected,
	      InsertGetter = _ref.InsertGetter,
	      _ref$selectedGetter = _ref.selectedGetter,
	      selectedGetter = _ref$selectedGetter === void 0 ? function (selected) {
	    return selected;
	  } : _ref$selectedGetter,
	      _ref$ignoreEmptyLine = _ref.ignoreEmptyLine,
	      ignoreEmptyLine = _ref$ignoreEmptyLine === void 0 ? true : _ref$ignoreEmptyLine;
	  var insertContent;
	  var newSelected;

	  if (selected) {
	    newSelected = selectedGetter(selected);
	    insertContent = InsertGetter(selected, 1); // 如果当前选中的文本包含换行 则插入后选中插入的所有文本

	    if (selected.indexOf('\n') !== -1) {
	      insertContent = selected.split('\n').map(function (rowText, index) {
	        var isEmptyLine = !rowText;
	        if (ignoreEmptyLine && isEmptyLine) return '';
	        return InsertGetter(rowText, index + 1).replace(selectedGetter(null), '');
	      }).join('\n');
	      newSelected = insertContent;
	    }
	  } else {
	    insertContent = InsertGetter(null, 1);
	    newSelected = selectedGetter(selected);
	  }

	  return {
	    insertContent: insertContent,
	    newSelected: newSelected
	  };
	}

	/***/ }),
	/* 3 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LINE_MARKUP; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HEADING_MARKUP; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ANCHOR_MARKUP; });
	var LINE_MARKUP = 'data-v-md-line';
	var HEADING_MARKUP = 'data-v-md-heading';
	var ANCHOR_MARKUP = 'data-v-md-anchor';

	/***/ }),
	/* 4 */,
	/* 5 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getScrollTop; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return scrollTo; });
	function getScrollTop(target) {
	  var result = 0;

	  if (target === window) {
	    result = target.pageYOffset;
	  } else if (target) {
	    result = target.scrollTop;
	  }

	  return result;
	}
	function scrollTo(target, scrollTop) {
	  if (target === window) {
	    window.scrollTo(window.pageYOffset, scrollTop);
	  } else if (target) {
	    target.scrollTop = scrollTop;
	  }
	}

	/***/ }),
	/* 6 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	/***/ }),
	/* 7 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
	var esm_extends = __webpack_require__(6);

	// EXTERNAL MODULE: ./node_modules/xss/lib/index.js
	var lib = __webpack_require__(11);
	var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

	// CONCATENATED MODULE: ./src/utils/xss/svg.js
	var svgTagWhiteList = {
	  svg: [],
	  altGlyph: [],
	  altGlyphDef: [],
	  altGlyphItem: [],
	  animate: [],
	  animateColor: [],
	  animateMotion: [],
	  animateTransform: [],
	  circle: [],
	  clipPath: [],
	  'color-profile': [],
	  cursor: [],
	  'definition-src': [],
	  defs: [],
	  desc: [],
	  ellipse: [],
	  feBlend: [],
	  feColorMatrix: [],
	  feComponentTransfer: [],
	  feComposite: [],
	  feConvolveMatrix: [],
	  feDiffuseLighting: [],
	  feDisplacementMap: [],
	  feDistantLight: [],
	  feFlood: [],
	  feFuncA: [],
	  feFuncB: [],
	  feFuncG: [],
	  feFuncR: [],
	  feGaussianBlur: [],
	  feImage: [],
	  feMerge: [],
	  feMergeNode: [],
	  feMorphology: [],
	  feOffset: [],
	  fePointLight: [],
	  feSpecularLighting: [],
	  feSpotLight: [],
	  feTile: [],
	  feTurbulence: [],
	  filter: [],
	  font: [],
	  foreignObject: [],
	  g: [],
	  glyph: [],
	  glyphRef: [],
	  hkern: [],
	  image: [],
	  line: [],
	  linearGradient: [],
	  marker: [],
	  mask: [],
	  metadata: [],
	  'missing-glyph': [],
	  mpath: [],
	  path: [],
	  pattern: [],
	  polygon: [],
	  polyline: [],
	  radialGradient: [],
	  rect: [],
	  set: [],
	  stop: [],
	  style: [],
	  switch: [],
	  symbol: [],
	  text: [],
	  textPath: [],
	  title: [],
	  tref: [],
	  tspan: [],
	  use: [],
	  view: [],
	  vkern: []
	};
	var svgAttrWhiteList = ['width', 'height', 'x', 'y', 'rx', 'ry', 'cx', 'cy', 'r', 'viewbox', 'points', 'fill', 'stroke', 'stroke-width', 'opacity', 'transform', 'd', 'text-anchor', 'font-family', 'font-size', 'font-weight', 'filter', 'href', 'xlink:href'];
	// CONCATENATED MODULE: ./src/utils/xss/KaTex.js
	var katexTagWhiteList = {
	  math: [],
	  annotation: [],
	  semantics: [],
	  mtext: [],
	  mn: [],
	  mo: [],
	  mi: [],
	  mspace: [],
	  mover: [],
	  munder: [],
	  munderover: [],
	  msup: [],
	  msub: [],
	  msubsup: [],
	  mfrac: [],
	  mroot: [],
	  msqrt: [],
	  mtable: [],
	  mtr: [],
	  mtd: [],
	  mlabeledtr: [],
	  mrow: [],
	  menclose: [],
	  mstyle: [],
	  mpadded: [],
	  mphantom: [],
	  mglyph: []
	};
	var katexAttrWhiteList = ['mathcolor', 'mathbackground', 'mathsize', 'mathvariant', 'mathfamily', 'mathweight', 'mathstyle', 'mathdisplay'];
	// CONCATENATED MODULE: ./src/utils/xss/common.js
	var attrWhiteList = ['style', 'align', 'class', 'id'];
	var prefixAttrWhiteList = ['data-'];
	var commonWhiteList = {
	  input: ['type'],
	  ol: ['reversed', 'start', 'type'],
	  button: ['type'],
	  summary: []
	};
	// CONCATENATED MODULE: ./src/utils/xss/index.js





	var options = {
	  whiteList: Object(esm_extends["a" /* default */])({}, lib_default.a.getDefaultWhiteList(), commonWhiteList, svgTagWhiteList, katexTagWhiteList),
	  onIgnoreTagAttr: function onIgnoreTagAttr(tag, name, value) {
	    if (svgTagWhiteList[tag] && svgAttrWhiteList.includes(name) || katexTagWhiteList[tag] && katexAttrWhiteList.includes(name) || attrWhiteList.some(function (attr) {
	      return attr === name;
	    }) || prefixAttrWhiteList.some(function (prefix) {
	      return name.startsWith(prefix);
	    })) {
	      return name + "=\"" + lib_default.a.escapeAttrValue(value) + "\"";
	    }
	  }
	};
	var xssFilterInstance = new lib_default.a.FilterXSS(options);

	xssFilterInstance.extend = function (extendOptions) {
	  var instanceOptions = xssFilterInstance.options;
	  Object.keys(extendOptions).forEach(function (optionName) {
	    // extend whiteList
	    if (optionName === 'whiteList') {
	      Object.keys(extendOptions.whiteList).forEach(function (tagName) {
	        var tagAttrWhiteList = extendOptions.whiteList[tagName];
	        var instanceWhiteList = instanceOptions.whiteList;

	        if (instanceWhiteList[tagName]) {
	          instanceWhiteList[tagName] = [].concat(instanceWhiteList[tagName], tagAttrWhiteList);
	        } else {
	          instanceWhiteList[tagName] = tagAttrWhiteList;
	        }
	      });
	    } else if (optionName === 'onIgnoreTagAttr') {
	      var oldHandler = instanceOptions[optionName];

	      instanceOptions[optionName] = function () {
	        var _extendOptions$option;

	        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
	          arg[_key] = arguments[_key];
	        }

	        var oldReturnVal = oldHandler.call.apply(oldHandler, [this].concat(arg));

	        var newReturnVal = (_extendOptions$option = extendOptions[optionName]).call.apply(_extendOptions$option, [this].concat(arg));

	        return oldReturnVal || newReturnVal;
	      };
	    } else {
	      instanceOptions[optionName] = extendOptions[optionName];
	    }
	  });
	};

	/* harmony default export */ __webpack_exports__["a"] = (xssFilterInstance);

	/***/ }),
	/* 8 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return smooth; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return smoothScroll; });
	/* harmony import */ var _scroll_top__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

	function smooth(_ref) {
	  var currentScrollTop = _ref.currentScrollTop,
	      scrollToTop = _ref.scrollToTop,
	      scrollFn = _ref.scrollFn,
	      _ref$percent = _ref.percent,
	      percent = _ref$percent === void 0 ? 10 : _ref$percent,
	      onScrollEnd = _ref.onScrollEnd;
	  var scrollWay = scrollToTop > currentScrollTop ? 'down' : 'up';
	  var step = (scrollToTop - currentScrollTop) * (percent / 100);
	  var id;

	  var scroll = function scroll() {
	    currentScrollTop += step;

	    if (scrollWay === 'down' && currentScrollTop >= scrollToTop || scrollWay === 'up' && currentScrollTop <= scrollToTop) {
	      scrollFn(scrollToTop);
	      window.cancelAnimationFrame(id);
	      if (onScrollEnd) window.requestAnimationFrame(onScrollEnd);
	    } else {
	      scrollFn(currentScrollTop);
	      window.requestAnimationFrame(scroll);
	    }
	  };

	  window.requestAnimationFrame(scroll);
	}
	function smoothScroll(_ref2) {
	  var scrollTarget = _ref2.scrollTarget,
	      scrollToTop = _ref2.scrollToTop,
	      _ref2$percent = _ref2.percent,
	      percent = _ref2$percent === void 0 ? 10 : _ref2$percent,
	      onScrollEnd = _ref2.onScrollEnd;
	  var currentScrollTop = Object(_scroll_top__WEBPACK_IMPORTED_MODULE_0__[/* getScrollTop */ "a"])(scrollTarget);
	  smooth({
	    currentScrollTop: currentScrollTop,
	    scrollToTop: scrollToTop,
	    scrollFn: function scrollFn(scrollTop) {
	      return Object(_scroll_top__WEBPACK_IMPORTED_MODULE_0__[/* scrollTo */ "b"])(scrollTarget, scrollTop);
	    },
	    percent: percent,
	    onScrollEnd: onScrollEnd
	  });
	}

	/***/ }),
	/* 9 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	// ESM COMPAT FLAG
	__webpack_require__.r(__webpack_exports__);

	// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
	var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__(0);

	// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/dist/templateLoader.js??ref--6!./node_modules/vue-loader/dist??ref--2-0!./src/preview.vue?vue&type=template&id=52ff70be&bindings={}

	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  return Object(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_["openBlock"])(), Object(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_["createBlock"])("div", {
	    class: "v-md-editor-preview",
	    style: {
	      tabSize: _ctx.tabSize,
	      '-moz-tab-size': _ctx.tabSize,
	      '-o-tab-size': _ctx.tabSize
	    },
	    onClick: _cache[1] || (_cache[1] = function () {
	      return _ctx.handlePreviewClick.apply(_ctx, arguments);
	    })
	  }, [Object(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_["createVNode"])("div", {
	    class: [_ctx.previewClass],
	    innerHTML: _ctx.html
	  }, null, 10
	  /* CLASS, PROPS */
	  , ["innerHTML"])], 4
	  /* STYLE */
	  );
	}
	// CONCATENATED MODULE: ./src/preview.vue?vue&type=template&id=52ff70be&bindings={}

	// EXTERNAL MODULE: ./src/utils/xss/index.js + 3 modules
	var xss = __webpack_require__(7);

	// EXTERNAL MODULE: ./src/utils/lang.js + 1 modules
	var lang = __webpack_require__(13);

	// CONCATENATED MODULE: ./src/utils/v-md-parser.js

	var v_md_parser_VMdParser = /*#__PURE__*/function () {
	  function VMdParser() {
	    this.lang = new lang["a" /* default */]();
	  }

	  var _proto = VMdParser.prototype;

	  _proto.defaultMarkdownLoader = function defaultMarkdownLoader(text) {
	    return text;
	  };

	  _proto.use = function use(optionsOrInstall, opt) {
	    if (typeof optionsOrInstall === 'function') {
	      optionsOrInstall(this, opt);
	    } else {
	      optionsOrInstall.install(this, opt);
	    }

	    return this;
	  };

	  _proto.theme = function theme(themeConfig) {
	    this.themeConfig = themeConfig;
	  };

	  _proto.extendMarkdown = function extendMarkdown(extender) {
	    if (!this.themeConfig) {
	      return console.error('Please use theme before using plugins');
	    }

	    var markdownParser = this.themeConfig.markdownParser;
	    extender(markdownParser);
	  };

	  _proto.parse = function parse(text) {
	    var _markdownParser$rende;

	    var markdownParser = this.themeConfig.markdownParser;
	    var markdownLoader = (markdownParser == null ? void 0 : (_markdownParser$rende = markdownParser.render) == null ? void 0 : _markdownParser$rende.bind(markdownParser)) || this.defaultMarkdownLoader;

	    if (typeof markdownLoader !== 'function' || markdownLoader === this.defaultMarkdownLoader) {
	      console.error('Please configure your markdown parser');
	    }

	    return markdownLoader(text);
	  };

	  return VMdParser;
	}();
	// EXTERNAL MODULE: ./src/mixins/preview.js
	var preview = __webpack_require__(16);

	// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--3!./node_modules/vue-loader/dist??ref--2-0!./src/preview.vue?vue&type=script&lang=js


	 // mixins


	var component = {
	  name: 'v-md-preview',
	  mixins: [preview["a" /* default */]],
	  props: {
	    text: {
	      type: String,
	      default: ''
	    },
	    theme: Object,
	    beforeChange: Function
	  },
	  emits: ['change'],
	  data: function data() {
	    return {
	      html: ''
	    };
	  },
	  watch: {
	    text: function text() {
	      this.handleTextChange();
	    },
	    langConfig: function langConfig() {
	      this.handleTextChange();
	    }
	  },
	  computed: {
	    vMdParser: function vMdParser() {
	      return this.$options.vMdParser;
	    },
	    previewClass: function previewClass() {
	      return this.vMdParser.themeConfig.previewClass;
	    },
	    langConfig: function langConfig() {
	      return this.vMdParser.lang.config;
	    }
	  },
	  created: function created() {
	    this.handleTextChange();
	  },
	  methods: {
	    handleTextChange: function handleTextChange() {
	      var _this = this;

	      var next = function next(text) {
	        _this.html = xss["a" /* default */].process(_this.$options.vMdParser.parse(text));

	        _this.$emit('change', text, _this.html);
	      };

	      if (this.beforeChange) {
	        this.beforeChange(this.text, next);
	      } else {
	        next(this.text);
	      }
	    }
	  }
	};
	var vMdParser = new v_md_parser_VMdParser();
	vMdParser.lang.config = Object(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_["reactive"])(vMdParser.lang.config);
	component.vMdParser = new v_md_parser_VMdParser();
	/* harmony default export */ var previewvue_type_script_lang_js = (component);
	// CONCATENATED MODULE: ./src/preview.vue?vue&type=script&lang=js
	 
	// CONCATENATED MODULE: ./src/preview.vue



	previewvue_type_script_lang_js.render = render;

	/* harmony default export */ var src_preview = (previewvue_type_script_lang_js);
	// EXTERNAL MODULE: ./src/assets/css/font.css
	__webpack_require__(18);

	// CONCATENATED MODULE: ./src/preview.js
	// This file is auto generated by build/build-entry.js

	 // font css


	var version = '2.3.18';

	var preview_install = function install(app) {
	  app.component(src_preview.name, src_preview);
	};

	src_preview.version = version;
	src_preview.install = preview_install;
	src_preview.xss = xss["a" /* default */];

	src_preview.use = function (optionsOrInstall, opt) {
	  if (typeof optionsOrInstall === 'function') {
	    optionsOrInstall(src_preview, opt);
	  } else {
	    optionsOrInstall.install(src_preview, opt);
	  }

	  return src_preview;
	};

	/* harmony default export */ __webpack_exports__["default"] = (src_preview);

	/***/ }),
	/* 10 */,
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * xss
	 *
	 * @author Zongmin Lei<leizongmin@gmail.com>
	 */

	var DEFAULT = __webpack_require__(19);
	var parser = __webpack_require__(22);
	var FilterXSS = __webpack_require__(26);

	/**
	 * filter xss function
	 *
	 * @param {String} html
	 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
	 * @return {String}
	 */
	function filterXSS(html, options) {
	  var xss = new FilterXSS(options);
	  return xss.process(html);
	}

	exports = module.exports = filterXSS;
	exports.filterXSS = filterXSS;
	exports.FilterXSS = FilterXSS;
	for (var i in DEFAULT) exports[i] = DEFAULT[i];
	for (var i in parser) exports[i] = parser[i];

	// using `xss` on the WebWorker, output `filterXSS` to the globals
	function isWorkerEnv() {
	  return (
	    typeof self !== "undefined" &&
	    typeof DedicatedWorkerGlobalScope !== "undefined" &&
	    self instanceof DedicatedWorkerGlobalScope
	  );
	}
	if (isWorkerEnv()) {
	  self.filterXSS = module.exports;
	}


	/***/ }),
	/* 12 */,
	/* 13 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	// EXPORTS
	__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ lang_Lang; });

	// EXTERNAL MODULE: ./src/utils/util.js
	var util = __webpack_require__(2);

	// CONCATENATED MODULE: ./src/utils/deep-assign.js

	var deep_assign_hasOwnProperty = Object.prototype.hasOwnProperty;

	function assignKey(to, from, key) {
	  var val = from[key];

	  if (val === undefined || val === null) {
	    return;
	  }

	  if (!deep_assign_hasOwnProperty.call(to, key) || !Object(util["f" /* isObject */])(val)) {
	    to[key] = val;
	  } else {
	    // eslint-disable-next-line
	    to[key] = deepAssign(Object(to[key]), from[key]);
	  }
	}

	function deepAssign(to, from) {
	  Object.keys(from).forEach(function (key) {
	    assignKey(to, from, key);
	  });
	  return to;
	}
	// CONCATENATED MODULE: ./src/utils/lang.js


	var lang_Lang = /*#__PURE__*/function () {
	  function Lang(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    this.config = {
	      lang: 'zh-CN',
	      langConfig: {
	        'zh-CN': {}
	      }
	    };
	    this.options = options;
	  }

	  var _proto = Lang.prototype;

	  _proto.use = function use(lang, config) {
	    var _this$add;

	    this.config.lang = lang;
	    this.add((_this$add = {}, _this$add[lang] = config, _this$add));
	    if (this.options.afterUse) this.options.afterUse(lang, config);
	  };

	  _proto.add = function add(config) {
	    if (config === void 0) {
	      config = {};
	    }

	    deepAssign(this.config.langConfig, config);
	  };

	  return Lang;
	}();



	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * cssfilter
	 *
	 * @author 老雷<leizongmin@gmail.com>
	 */

	var DEFAULT = __webpack_require__(20);
	var FilterCSS = __webpack_require__(24);


	/**
	 * XSS过滤
	 *
	 * @param {String} css 要过滤的CSS代码
	 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
	 * @return {String}
	 */
	function filterCSS (html, options) {
	  var xss = new FilterCSS(options);
	  return xss.process(html);
	}


	// 输出
	exports = module.exports = filterCSS;
	exports.FilterCSS = FilterCSS;
	for (var i in DEFAULT) exports[i] = DEFAULT[i];


	/***/ }),
	/* 15 */
	/***/ (function(module, exports) {

	module.exports = {
	  indexOf: function (arr, item) {
	    var i, j;
	    if (Array.prototype.indexOf) {
	      return arr.indexOf(item);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      if (arr[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  },
	  forEach: function (arr, fn, scope) {
	    var i, j;
	    if (Array.prototype.forEach) {
	      return arr.forEach(fn, scope);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      fn.call(scope, arr[i], i, arr);
	    }
	  },
	  trim: function (str) {
	    if (String.prototype.trim) {
	      return str.trim();
	    }
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	  },
	  spaceIndex: function (str) {
	    var reg = /\s|\n|\t/;
	    var match = reg.exec(str);
	    return match ? match.index : -1;
	  },
	};


	/***/ }),
	/* 16 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony import */ var _utils_scroll_top__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
	/* harmony import */ var _utils_smooth_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
	/* harmony import */ var _utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



	/* harmony default export */ __webpack_exports__["a"] = ({
	  props: {
	    tabSize: {
	      type: Number,
	      default: 2
	    },
	    scrollContainer: {
	      type: Function,
	      default: function _default() {
	        return window;
	      }
	    },
	    top: {
	      type: Number,
	      default: 0
	    }
	  },
	  emits: ['image-click'],
	  methods: {
	    handlePreviewClick: function handlePreviewClick(e) {
	      var target = e.target; // image preview

	      if (target.tagName === 'IMG') {
	        var src = target.getAttribute('src');
	        if (!src) return;
	        var imageEls = Array.from(this.$el.querySelectorAll('img'));
	        var images = imageEls.map(function (el) {
	          return el.getAttribute('src');
	        }).filter(function (src) {
	          return src;
	        });
	        var imagePreviewInitIndex = imageEls.indexOf(target);
	        this.$emit('image-click', images, imagePreviewInitIndex);
	        return;
	      }

	      var scrollToTargetId = target.getAttribute(_utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__[/* ANCHOR_MARKUP */ "a"]);
	      var scrollToTarget = this.$el.querySelector("[" + _utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__[/* HEADING_MARKUP */ "b"] + "=\"" + scrollToTargetId + "\"]");

	      if (scrollToTarget) {
	        this.scrollToTarget({
	          target: scrollToTarget
	        });
	      }
	    },
	    getOffsetTop: function getOffsetTop(target, container) {
	      var rect = target.getBoundingClientRect();

	      if (container === window || container === document.documentElement) {
	        return rect.top;
	      }

	      return rect.top - container.getBoundingClientRect().top;
	    },
	    scrollToTarget: function scrollToTarget(_ref) {
	      var target = _ref.target,
	          _ref$scrollContainer = _ref.scrollContainer,
	          scrollContainer = _ref$scrollContainer === void 0 ? this.scrollContainer() : _ref$scrollContainer,
	          _ref$top = _ref.top,
	          top = _ref$top === void 0 ? this.top : _ref$top,
	          onScrollEnd = _ref.onScrollEnd;
	      var offsetTop = this.getOffsetTop(target, scrollContainer);
	      var scrollTop = Object(_utils_scroll_top__WEBPACK_IMPORTED_MODULE_0__[/* getScrollTop */ "a"])(scrollContainer) + offsetTop - top;
	      Object(_utils_smooth_scroll__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
	        scrollTarget: scrollContainer,
	        scrollToTop: scrollTop,
	        onScrollEnd: onScrollEnd
	      });
	    },
	    scrollToLine: function scrollToLine(_ref2) {
	      var lineIndex = _ref2.lineIndex,
	          onScrollEnd = _ref2.onScrollEnd;

	      if (lineIndex) {
	        var target = this.$el.querySelector("[" + _utils_constants_markup__WEBPACK_IMPORTED_MODULE_2__[/* LINE_MARKUP */ "c"] + "=\"" + lineIndex + "\"]");
	        if (target) this.scrollToTarget({
	          target: target,
	          onScrollEnd: onScrollEnd
	        });
	      }
	    }
	  }
	});

	/***/ }),
	/* 17 */,
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {

	// extracted by mini-css-extract-plugin

	/***/ }),
	/* 19 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * default settings
	 *
	 * @author Zongmin Lei<leizongmin@gmail.com>
	 */

	var FilterCSS = __webpack_require__(14).FilterCSS;
	var getDefaultCSSWhiteList = __webpack_require__(14).getDefaultWhiteList;
	var _ = __webpack_require__(15);

	function getDefaultWhiteList() {
	  return {
	    a: ["target", "href", "title"],
	    abbr: ["title"],
	    address: [],
	    area: ["shape", "coords", "href", "alt"],
	    article: [],
	    aside: [],
	    audio: [
	      "autoplay",
	      "controls",
	      "crossorigin",
	      "loop",
	      "muted",
	      "preload",
	      "src",
	    ],
	    b: [],
	    bdi: ["dir"],
	    bdo: ["dir"],
	    big: [],
	    blockquote: ["cite"],
	    br: [],
	    caption: [],
	    center: [],
	    cite: [],
	    code: [],
	    col: ["align", "valign", "span", "width"],
	    colgroup: ["align", "valign", "span", "width"],
	    dd: [],
	    del: ["datetime"],
	    details: ["open"],
	    div: [],
	    dl: [],
	    dt: [],
	    em: [],
	    figcaption: [],
	    figure: [],
	    font: ["color", "size", "face"],
	    footer: [],
	    h1: [],
	    h2: [],
	    h3: [],
	    h4: [],
	    h5: [],
	    h6: [],
	    header: [],
	    hr: [],
	    i: [],
	    img: ["src", "alt", "title", "width", "height"],
	    ins: ["datetime"],
	    li: [],
	    mark: [],
	    nav: [],
	    ol: [],
	    p: [],
	    pre: [],
	    s: [],
	    section: [],
	    small: [],
	    span: [],
	    sub: [],
	    summary: [],
	    sup: [],
	    strong: [],
	    strike: [],
	    table: ["width", "border", "align", "valign"],
	    tbody: ["align", "valign"],
	    td: ["width", "rowspan", "colspan", "align", "valign"],
	    tfoot: ["align", "valign"],
	    th: ["width", "rowspan", "colspan", "align", "valign"],
	    thead: ["align", "valign"],
	    tr: ["rowspan", "align", "valign"],
	    tt: [],
	    u: [],
	    ul: [],
	    video: [
	      "autoplay",
	      "controls",
	      "crossorigin",
	      "loop",
	      "muted",
	      "playsinline",
	      "poster",
	      "preload",
	      "src",
	      "height",
	      "width",
	    ],
	  };
	}

	var defaultCSSFilter = new FilterCSS();

	/**
	 * default onTag function
	 *
	 * @param {String} tag
	 * @param {String} html
	 * @param {Object} options
	 * @return {String}
	 */
	function onTag(tag, html, options) {
	  // do nothing
	}

	/**
	 * default onIgnoreTag function
	 *
	 * @param {String} tag
	 * @param {String} html
	 * @param {Object} options
	 * @return {String}
	 */
	function onIgnoreTag(tag, html, options) {
	  // do nothing
	}

	/**
	 * default onTagAttr function
	 *
	 * @param {String} tag
	 * @param {String} name
	 * @param {String} value
	 * @return {String}
	 */
	function onTagAttr(tag, name, value) {
	  // do nothing
	}

	/**
	 * default onIgnoreTagAttr function
	 *
	 * @param {String} tag
	 * @param {String} name
	 * @param {String} value
	 * @return {String}
	 */
	function onIgnoreTagAttr(tag, name, value) {
	  // do nothing
	}

	/**
	 * default escapeHtml function
	 *
	 * @param {String} html
	 */
	function escapeHtml(html) {
	  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
	}

	/**
	 * default safeAttrValue function
	 *
	 * @param {String} tag
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} cssFilter
	 * @return {String}
	 */
	function safeAttrValue(tag, name, value, cssFilter) {
	  // unescape attribute value firstly
	  value = friendlyAttrValue(value);

	  if (name === "href" || name === "src") {
	    // filter `href` and `src` attribute
	    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
	    value = _.trim(value);
	    if (value === "#") return "#";
	    if (
	      !(
	        value.substr(0, 7) === "http://" ||
	        value.substr(0, 8) === "https://" ||
	        value.substr(0, 7) === "mailto:" ||
	        value.substr(0, 4) === "tel:" ||
	        value.substr(0, 11) === "data:image/" ||
	        value.substr(0, 6) === "ftp://" ||
	        value.substr(0, 2) === "./" ||
	        value.substr(0, 3) === "../" ||
	        value[0] === "#" ||
	        value[0] === "/"
	      )
	    ) {
	      return "";
	    }
	  } else if (name === "background") {
	    // filter `background` attribute (maybe no use)
	    // `javascript:`
	    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
	    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
	      return "";
	    }
	  } else if (name === "style") {
	    // `expression()`
	    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
	    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
	      return "";
	    }
	    // `url()`
	    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
	    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
	      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
	      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
	        return "";
	      }
	    }
	    if (cssFilter !== false) {
	      cssFilter = cssFilter || defaultCSSFilter;
	      value = cssFilter.process(value);
	    }
	  }

	  // escape `<>"` before returns
	  value = escapeAttrValue(value);
	  return value;
	}

	// RegExp list
	var REGEXP_LT = /</g;
	var REGEXP_GT = />/g;
	var REGEXP_QUOTE = /"/g;
	var REGEXP_QUOTE_2 = /&quot;/g;
	var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
	var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
	var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
	var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
	var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
	var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

	/**
	 * escape double quote
	 *
	 * @param {String} str
	 * @return {String} str
	 */
	function escapeQuote(str) {
	  return str.replace(REGEXP_QUOTE, "&quot;");
	}

	/**
	 * unescape double quote
	 *
	 * @param {String} str
	 * @return {String} str
	 */
	function unescapeQuote(str) {
	  return str.replace(REGEXP_QUOTE_2, '"');
	}

	/**
	 * escape html entities
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function escapeHtmlEntities(str) {
	  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
	    return code[0] === "x" || code[0] === "X"
	      ? String.fromCharCode(parseInt(code.substr(1), 16))
	      : String.fromCharCode(parseInt(code, 10));
	  });
	}

	/**
	 * escape html5 new danger entities
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function escapeDangerHtml5Entities(str) {
	  return str
	    .replace(REGEXP_ATTR_VALUE_COLON, ":")
	    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
	}

	/**
	 * clear nonprintable characters
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function clearNonPrintableCharacter(str) {
	  var str2 = "";
	  for (var i = 0, len = str.length; i < len; i++) {
	    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
	  }
	  return _.trim(str2);
	}

	/**
	 * get friendly attribute value
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function friendlyAttrValue(str) {
	  str = unescapeQuote(str);
	  str = escapeHtmlEntities(str);
	  str = escapeDangerHtml5Entities(str);
	  str = clearNonPrintableCharacter(str);
	  return str;
	}

	/**
	 * unescape attribute value
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function escapeAttrValue(str) {
	  str = escapeQuote(str);
	  str = escapeHtml(str);
	  return str;
	}

	/**
	 * `onIgnoreTag` function for removing all the tags that are not in whitelist
	 */
	function onIgnoreTagStripAll() {
	  return "";
	}

	/**
	 * remove tag body
	 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
	 *
	 * @param {array} tags
	 * @param {function} next
	 */
	function StripTagBody(tags, next) {
	  if (typeof next !== "function") {
	    next = function () {};
	  }

	  var isRemoveAllTag = !Array.isArray(tags);
	  function isRemoveTag(tag) {
	    if (isRemoveAllTag) return true;
	    return _.indexOf(tags, tag) !== -1;
	  }

	  var removeList = [];
	  var posStart = false;

	  return {
	    onIgnoreTag: function (tag, html, options) {
	      if (isRemoveTag(tag)) {
	        if (options.isClosing) {
	          var ret = "[/removed]";
	          var end = options.position + ret.length;
	          removeList.push([
	            posStart !== false ? posStart : options.position,
	            end,
	          ]);
	          posStart = false;
	          return ret;
	        } else {
	          if (!posStart) {
	            posStart = options.position;
	          }
	          return "[removed]";
	        }
	      } else {
	        return next(tag, html, options);
	      }
	    },
	    remove: function (html) {
	      var rethtml = "";
	      var lastPos = 0;
	      _.forEach(removeList, function (pos) {
	        rethtml += html.slice(lastPos, pos[0]);
	        lastPos = pos[1];
	      });
	      rethtml += html.slice(lastPos);
	      return rethtml;
	    },
	  };
	}

	/**
	 * remove html comments
	 *
	 * @param {String} html
	 * @return {String}
	 */
	function stripCommentTag(html) {
	  return html.replace(STRIP_COMMENT_TAG_REGEXP, "");
	}
	var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;

	/**
	 * remove invisible characters
	 *
	 * @param {String} html
	 * @return {String}
	 */
	function stripBlankChar(html) {
	  var chars = html.split("");
	  chars = chars.filter(function (char) {
	    var c = char.charCodeAt(0);
	    if (c === 127) return false;
	    if (c <= 31) {
	      if (c === 10 || c === 13) return true;
	      return false;
	    }
	    return true;
	  });
	  return chars.join("");
	}

	exports.whiteList = getDefaultWhiteList();
	exports.getDefaultWhiteList = getDefaultWhiteList;
	exports.onTag = onTag;
	exports.onIgnoreTag = onIgnoreTag;
	exports.onTagAttr = onTagAttr;
	exports.onIgnoreTagAttr = onIgnoreTagAttr;
	exports.safeAttrValue = safeAttrValue;
	exports.escapeHtml = escapeHtml;
	exports.escapeQuote = escapeQuote;
	exports.unescapeQuote = unescapeQuote;
	exports.escapeHtmlEntities = escapeHtmlEntities;
	exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
	exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
	exports.friendlyAttrValue = friendlyAttrValue;
	exports.escapeAttrValue = escapeAttrValue;
	exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
	exports.StripTagBody = StripTagBody;
	exports.stripCommentTag = stripCommentTag;
	exports.stripBlankChar = stripBlankChar;
	exports.cssFilter = defaultCSSFilter;
	exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;


	/***/ }),
	/* 20 */
	/***/ (function(module, exports) {

	/**
	 * cssfilter
	 *
	 * @author 老雷<leizongmin@gmail.com>
	 */

	function getDefaultWhiteList () {
	  // 白名单值说明：
	  // true: 允许该属性
	  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
	  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
	  // 除上面列出的值外均表示不允许
	  var whiteList = {};

	  whiteList['align-content'] = false; // default: auto
	  whiteList['align-items'] = false; // default: auto
	  whiteList['align-self'] = false; // default: auto
	  whiteList['alignment-adjust'] = false; // default: auto
	  whiteList['alignment-baseline'] = false; // default: baseline
	  whiteList['all'] = false; // default: depending on individual properties
	  whiteList['anchor-point'] = false; // default: none
	  whiteList['animation'] = false; // default: depending on individual properties
	  whiteList['animation-delay'] = false; // default: 0
	  whiteList['animation-direction'] = false; // default: normal
	  whiteList['animation-duration'] = false; // default: 0
	  whiteList['animation-fill-mode'] = false; // default: none
	  whiteList['animation-iteration-count'] = false; // default: 1
	  whiteList['animation-name'] = false; // default: none
	  whiteList['animation-play-state'] = false; // default: running
	  whiteList['animation-timing-function'] = false; // default: ease
	  whiteList['azimuth'] = false; // default: center
	  whiteList['backface-visibility'] = false; // default: visible
	  whiteList['background'] = true; // default: depending on individual properties
	  whiteList['background-attachment'] = true; // default: scroll
	  whiteList['background-clip'] = true; // default: border-box
	  whiteList['background-color'] = true; // default: transparent
	  whiteList['background-image'] = true; // default: none
	  whiteList['background-origin'] = true; // default: padding-box
	  whiteList['background-position'] = true; // default: 0% 0%
	  whiteList['background-repeat'] = true; // default: repeat
	  whiteList['background-size'] = true; // default: auto
	  whiteList['baseline-shift'] = false; // default: baseline
	  whiteList['binding'] = false; // default: none
	  whiteList['bleed'] = false; // default: 6pt
	  whiteList['bookmark-label'] = false; // default: content()
	  whiteList['bookmark-level'] = false; // default: none
	  whiteList['bookmark-state'] = false; // default: open
	  whiteList['border'] = true; // default: depending on individual properties
	  whiteList['border-bottom'] = true; // default: depending on individual properties
	  whiteList['border-bottom-color'] = true; // default: current color
	  whiteList['border-bottom-left-radius'] = true; // default: 0
	  whiteList['border-bottom-right-radius'] = true; // default: 0
	  whiteList['border-bottom-style'] = true; // default: none
	  whiteList['border-bottom-width'] = true; // default: medium
	  whiteList['border-collapse'] = true; // default: separate
	  whiteList['border-color'] = true; // default: depending on individual properties
	  whiteList['border-image'] = true; // default: none
	  whiteList['border-image-outset'] = true; // default: 0
	  whiteList['border-image-repeat'] = true; // default: stretch
	  whiteList['border-image-slice'] = true; // default: 100%
	  whiteList['border-image-source'] = true; // default: none
	  whiteList['border-image-width'] = true; // default: 1
	  whiteList['border-left'] = true; // default: depending on individual properties
	  whiteList['border-left-color'] = true; // default: current color
	  whiteList['border-left-style'] = true; // default: none
	  whiteList['border-left-width'] = true; // default: medium
	  whiteList['border-radius'] = true; // default: 0
	  whiteList['border-right'] = true; // default: depending on individual properties
	  whiteList['border-right-color'] = true; // default: current color
	  whiteList['border-right-style'] = true; // default: none
	  whiteList['border-right-width'] = true; // default: medium
	  whiteList['border-spacing'] = true; // default: 0
	  whiteList['border-style'] = true; // default: depending on individual properties
	  whiteList['border-top'] = true; // default: depending on individual properties
	  whiteList['border-top-color'] = true; // default: current color
	  whiteList['border-top-left-radius'] = true; // default: 0
	  whiteList['border-top-right-radius'] = true; // default: 0
	  whiteList['border-top-style'] = true; // default: none
	  whiteList['border-top-width'] = true; // default: medium
	  whiteList['border-width'] = true; // default: depending on individual properties
	  whiteList['bottom'] = false; // default: auto
	  whiteList['box-decoration-break'] = true; // default: slice
	  whiteList['box-shadow'] = true; // default: none
	  whiteList['box-sizing'] = true; // default: content-box
	  whiteList['box-snap'] = true; // default: none
	  whiteList['box-suppress'] = true; // default: show
	  whiteList['break-after'] = true; // default: auto
	  whiteList['break-before'] = true; // default: auto
	  whiteList['break-inside'] = true; // default: auto
	  whiteList['caption-side'] = false; // default: top
	  whiteList['chains'] = false; // default: none
	  whiteList['clear'] = true; // default: none
	  whiteList['clip'] = false; // default: auto
	  whiteList['clip-path'] = false; // default: none
	  whiteList['clip-rule'] = false; // default: nonzero
	  whiteList['color'] = true; // default: implementation dependent
	  whiteList['color-interpolation-filters'] = true; // default: auto
	  whiteList['column-count'] = false; // default: auto
	  whiteList['column-fill'] = false; // default: balance
	  whiteList['column-gap'] = false; // default: normal
	  whiteList['column-rule'] = false; // default: depending on individual properties
	  whiteList['column-rule-color'] = false; // default: current color
	  whiteList['column-rule-style'] = false; // default: medium
	  whiteList['column-rule-width'] = false; // default: medium
	  whiteList['column-span'] = false; // default: none
	  whiteList['column-width'] = false; // default: auto
	  whiteList['columns'] = false; // default: depending on individual properties
	  whiteList['contain'] = false; // default: none
	  whiteList['content'] = false; // default: normal
	  whiteList['counter-increment'] = false; // default: none
	  whiteList['counter-reset'] = false; // default: none
	  whiteList['counter-set'] = false; // default: none
	  whiteList['crop'] = false; // default: auto
	  whiteList['cue'] = false; // default: depending on individual properties
	  whiteList['cue-after'] = false; // default: none
	  whiteList['cue-before'] = false; // default: none
	  whiteList['cursor'] = false; // default: auto
	  whiteList['direction'] = false; // default: ltr
	  whiteList['display'] = true; // default: depending on individual properties
	  whiteList['display-inside'] = true; // default: auto
	  whiteList['display-list'] = true; // default: none
	  whiteList['display-outside'] = true; // default: inline-level
	  whiteList['dominant-baseline'] = false; // default: auto
	  whiteList['elevation'] = false; // default: level
	  whiteList['empty-cells'] = false; // default: show
	  whiteList['filter'] = false; // default: none
	  whiteList['flex'] = false; // default: depending on individual properties
	  whiteList['flex-basis'] = false; // default: auto
	  whiteList['flex-direction'] = false; // default: row
	  whiteList['flex-flow'] = false; // default: depending on individual properties
	  whiteList['flex-grow'] = false; // default: 0
	  whiteList['flex-shrink'] = false; // default: 1
	  whiteList['flex-wrap'] = false; // default: nowrap
	  whiteList['float'] = false; // default: none
	  whiteList['float-offset'] = false; // default: 0 0
	  whiteList['flood-color'] = false; // default: black
	  whiteList['flood-opacity'] = false; // default: 1
	  whiteList['flow-from'] = false; // default: none
	  whiteList['flow-into'] = false; // default: none
	  whiteList['font'] = true; // default: depending on individual properties
	  whiteList['font-family'] = true; // default: implementation dependent
	  whiteList['font-feature-settings'] = true; // default: normal
	  whiteList['font-kerning'] = true; // default: auto
	  whiteList['font-language-override'] = true; // default: normal
	  whiteList['font-size'] = true; // default: medium
	  whiteList['font-size-adjust'] = true; // default: none
	  whiteList['font-stretch'] = true; // default: normal
	  whiteList['font-style'] = true; // default: normal
	  whiteList['font-synthesis'] = true; // default: weight style
	  whiteList['font-variant'] = true; // default: normal
	  whiteList['font-variant-alternates'] = true; // default: normal
	  whiteList['font-variant-caps'] = true; // default: normal
	  whiteList['font-variant-east-asian'] = true; // default: normal
	  whiteList['font-variant-ligatures'] = true; // default: normal
	  whiteList['font-variant-numeric'] = true; // default: normal
	  whiteList['font-variant-position'] = true; // default: normal
	  whiteList['font-weight'] = true; // default: normal
	  whiteList['grid'] = false; // default: depending on individual properties
	  whiteList['grid-area'] = false; // default: depending on individual properties
	  whiteList['grid-auto-columns'] = false; // default: auto
	  whiteList['grid-auto-flow'] = false; // default: none
	  whiteList['grid-auto-rows'] = false; // default: auto
	  whiteList['grid-column'] = false; // default: depending on individual properties
	  whiteList['grid-column-end'] = false; // default: auto
	  whiteList['grid-column-start'] = false; // default: auto
	  whiteList['grid-row'] = false; // default: depending on individual properties
	  whiteList['grid-row-end'] = false; // default: auto
	  whiteList['grid-row-start'] = false; // default: auto
	  whiteList['grid-template'] = false; // default: depending on individual properties
	  whiteList['grid-template-areas'] = false; // default: none
	  whiteList['grid-template-columns'] = false; // default: none
	  whiteList['grid-template-rows'] = false; // default: none
	  whiteList['hanging-punctuation'] = false; // default: none
	  whiteList['height'] = true; // default: auto
	  whiteList['hyphens'] = false; // default: manual
	  whiteList['icon'] = false; // default: auto
	  whiteList['image-orientation'] = false; // default: auto
	  whiteList['image-resolution'] = false; // default: normal
	  whiteList['ime-mode'] = false; // default: auto
	  whiteList['initial-letters'] = false; // default: normal
	  whiteList['inline-box-align'] = false; // default: last
	  whiteList['justify-content'] = false; // default: auto
	  whiteList['justify-items'] = false; // default: auto
	  whiteList['justify-self'] = false; // default: auto
	  whiteList['left'] = false; // default: auto
	  whiteList['letter-spacing'] = true; // default: normal
	  whiteList['lighting-color'] = true; // default: white
	  whiteList['line-box-contain'] = false; // default: block inline replaced
	  whiteList['line-break'] = false; // default: auto
	  whiteList['line-grid'] = false; // default: match-parent
	  whiteList['line-height'] = false; // default: normal
	  whiteList['line-snap'] = false; // default: none
	  whiteList['line-stacking'] = false; // default: depending on individual properties
	  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
	  whiteList['line-stacking-shift'] = false; // default: consider-shifts
	  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
	  whiteList['list-style'] = true; // default: depending on individual properties
	  whiteList['list-style-image'] = true; // default: none
	  whiteList['list-style-position'] = true; // default: outside
	  whiteList['list-style-type'] = true; // default: disc
	  whiteList['margin'] = true; // default: depending on individual properties
	  whiteList['margin-bottom'] = true; // default: 0
	  whiteList['margin-left'] = true; // default: 0
	  whiteList['margin-right'] = true; // default: 0
	  whiteList['margin-top'] = true; // default: 0
	  whiteList['marker-offset'] = false; // default: auto
	  whiteList['marker-side'] = false; // default: list-item
	  whiteList['marks'] = false; // default: none
	  whiteList['mask'] = false; // default: border-box
	  whiteList['mask-box'] = false; // default: see individual properties
	  whiteList['mask-box-outset'] = false; // default: 0
	  whiteList['mask-box-repeat'] = false; // default: stretch
	  whiteList['mask-box-slice'] = false; // default: 0 fill
	  whiteList['mask-box-source'] = false; // default: none
	  whiteList['mask-box-width'] = false; // default: auto
	  whiteList['mask-clip'] = false; // default: border-box
	  whiteList['mask-image'] = false; // default: none
	  whiteList['mask-origin'] = false; // default: border-box
	  whiteList['mask-position'] = false; // default: center
	  whiteList['mask-repeat'] = false; // default: no-repeat
	  whiteList['mask-size'] = false; // default: border-box
	  whiteList['mask-source-type'] = false; // default: auto
	  whiteList['mask-type'] = false; // default: luminance
	  whiteList['max-height'] = true; // default: none
	  whiteList['max-lines'] = false; // default: none
	  whiteList['max-width'] = true; // default: none
	  whiteList['min-height'] = true; // default: 0
	  whiteList['min-width'] = true; // default: 0
	  whiteList['move-to'] = false; // default: normal
	  whiteList['nav-down'] = false; // default: auto
	  whiteList['nav-index'] = false; // default: auto
	  whiteList['nav-left'] = false; // default: auto
	  whiteList['nav-right'] = false; // default: auto
	  whiteList['nav-up'] = false; // default: auto
	  whiteList['object-fit'] = false; // default: fill
	  whiteList['object-position'] = false; // default: 50% 50%
	  whiteList['opacity'] = false; // default: 1
	  whiteList['order'] = false; // default: 0
	  whiteList['orphans'] = false; // default: 2
	  whiteList['outline'] = false; // default: depending on individual properties
	  whiteList['outline-color'] = false; // default: invert
	  whiteList['outline-offset'] = false; // default: 0
	  whiteList['outline-style'] = false; // default: none
	  whiteList['outline-width'] = false; // default: medium
	  whiteList['overflow'] = false; // default: depending on individual properties
	  whiteList['overflow-wrap'] = false; // default: normal
	  whiteList['overflow-x'] = false; // default: visible
	  whiteList['overflow-y'] = false; // default: visible
	  whiteList['padding'] = true; // default: depending on individual properties
	  whiteList['padding-bottom'] = true; // default: 0
	  whiteList['padding-left'] = true; // default: 0
	  whiteList['padding-right'] = true; // default: 0
	  whiteList['padding-top'] = true; // default: 0
	  whiteList['page'] = false; // default: auto
	  whiteList['page-break-after'] = false; // default: auto
	  whiteList['page-break-before'] = false; // default: auto
	  whiteList['page-break-inside'] = false; // default: auto
	  whiteList['page-policy'] = false; // default: start
	  whiteList['pause'] = false; // default: implementation dependent
	  whiteList['pause-after'] = false; // default: implementation dependent
	  whiteList['pause-before'] = false; // default: implementation dependent
	  whiteList['perspective'] = false; // default: none
	  whiteList['perspective-origin'] = false; // default: 50% 50%
	  whiteList['pitch'] = false; // default: medium
	  whiteList['pitch-range'] = false; // default: 50
	  whiteList['play-during'] = false; // default: auto
	  whiteList['position'] = false; // default: static
	  whiteList['presentation-level'] = false; // default: 0
	  whiteList['quotes'] = false; // default: text
	  whiteList['region-fragment'] = false; // default: auto
	  whiteList['resize'] = false; // default: none
	  whiteList['rest'] = false; // default: depending on individual properties
	  whiteList['rest-after'] = false; // default: none
	  whiteList['rest-before'] = false; // default: none
	  whiteList['richness'] = false; // default: 50
	  whiteList['right'] = false; // default: auto
	  whiteList['rotation'] = false; // default: 0
	  whiteList['rotation-point'] = false; // default: 50% 50%
	  whiteList['ruby-align'] = false; // default: auto
	  whiteList['ruby-merge'] = false; // default: separate
	  whiteList['ruby-position'] = false; // default: before
	  whiteList['shape-image-threshold'] = false; // default: 0.0
	  whiteList['shape-outside'] = false; // default: none
	  whiteList['shape-margin'] = false; // default: 0
	  whiteList['size'] = false; // default: auto
	  whiteList['speak'] = false; // default: auto
	  whiteList['speak-as'] = false; // default: normal
	  whiteList['speak-header'] = false; // default: once
	  whiteList['speak-numeral'] = false; // default: continuous
	  whiteList['speak-punctuation'] = false; // default: none
	  whiteList['speech-rate'] = false; // default: medium
	  whiteList['stress'] = false; // default: 50
	  whiteList['string-set'] = false; // default: none
	  whiteList['tab-size'] = false; // default: 8
	  whiteList['table-layout'] = false; // default: auto
	  whiteList['text-align'] = true; // default: start
	  whiteList['text-align-last'] = true; // default: auto
	  whiteList['text-combine-upright'] = true; // default: none
	  whiteList['text-decoration'] = true; // default: none
	  whiteList['text-decoration-color'] = true; // default: currentColor
	  whiteList['text-decoration-line'] = true; // default: none
	  whiteList['text-decoration-skip'] = true; // default: objects
	  whiteList['text-decoration-style'] = true; // default: solid
	  whiteList['text-emphasis'] = true; // default: depending on individual properties
	  whiteList['text-emphasis-color'] = true; // default: currentColor
	  whiteList['text-emphasis-position'] = true; // default: over right
	  whiteList['text-emphasis-style'] = true; // default: none
	  whiteList['text-height'] = true; // default: auto
	  whiteList['text-indent'] = true; // default: 0
	  whiteList['text-justify'] = true; // default: auto
	  whiteList['text-orientation'] = true; // default: mixed
	  whiteList['text-overflow'] = true; // default: clip
	  whiteList['text-shadow'] = true; // default: none
	  whiteList['text-space-collapse'] = true; // default: collapse
	  whiteList['text-transform'] = true; // default: none
	  whiteList['text-underline-position'] = true; // default: auto
	  whiteList['text-wrap'] = true; // default: normal
	  whiteList['top'] = false; // default: auto
	  whiteList['transform'] = false; // default: none
	  whiteList['transform-origin'] = false; // default: 50% 50% 0
	  whiteList['transform-style'] = false; // default: flat
	  whiteList['transition'] = false; // default: depending on individual properties
	  whiteList['transition-delay'] = false; // default: 0s
	  whiteList['transition-duration'] = false; // default: 0s
	  whiteList['transition-property'] = false; // default: all
	  whiteList['transition-timing-function'] = false; // default: ease
	  whiteList['unicode-bidi'] = false; // default: normal
	  whiteList['vertical-align'] = false; // default: baseline
	  whiteList['visibility'] = false; // default: visible
	  whiteList['voice-balance'] = false; // default: center
	  whiteList['voice-duration'] = false; // default: auto
	  whiteList['voice-family'] = false; // default: implementation dependent
	  whiteList['voice-pitch'] = false; // default: medium
	  whiteList['voice-range'] = false; // default: medium
	  whiteList['voice-rate'] = false; // default: normal
	  whiteList['voice-stress'] = false; // default: normal
	  whiteList['voice-volume'] = false; // default: medium
	  whiteList['volume'] = false; // default: medium
	  whiteList['white-space'] = false; // default: normal
	  whiteList['widows'] = false; // default: 2
	  whiteList['width'] = true; // default: auto
	  whiteList['will-change'] = false; // default: auto
	  whiteList['word-break'] = true; // default: normal
	  whiteList['word-spacing'] = true; // default: normal
	  whiteList['word-wrap'] = true; // default: normal
	  whiteList['wrap-flow'] = false; // default: auto
	  whiteList['wrap-through'] = false; // default: wrap
	  whiteList['writing-mode'] = false; // default: horizontal-tb
	  whiteList['z-index'] = false; // default: auto

	  return whiteList;
	}


	/**
	 * 匹配到白名单上的一个属性时
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {String}
	 */
	function onAttr (name, value, options) {
	  // do nothing
	}

	/**
	 * 匹配到不在白名单上的一个属性时
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {String}
	 */
	function onIgnoreAttr (name, value, options) {
	  // do nothing
	}

	var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

	/**
	 * 过滤属性值
	 *
	 * @param {String} name
	 * @param {String} value
	 * @return {String}
	 */
	function safeAttrValue(name, value) {
	  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
	  return value;
	}


	exports.whiteList = getDefaultWhiteList();
	exports.getDefaultWhiteList = getDefaultWhiteList;
	exports.onAttr = onAttr;
	exports.onIgnoreAttr = onIgnoreAttr;
	exports.safeAttrValue = safeAttrValue;


	/***/ }),
	/* 21 */
	/***/ (function(module, exports) {

	module.exports = {
	  indexOf: function (arr, item) {
	    var i, j;
	    if (Array.prototype.indexOf) {
	      return arr.indexOf(item);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      if (arr[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  },
	  forEach: function (arr, fn, scope) {
	    var i, j;
	    if (Array.prototype.forEach) {
	      return arr.forEach(fn, scope);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      fn.call(scope, arr[i], i, arr);
	    }
	  },
	  trim: function (str) {
	    if (String.prototype.trim) {
	      return str.trim();
	    }
	    return str.replace(/(^\s*)|(\s*$)/g, '');
	  },
	  trimRight: function (str) {
	    if (String.prototype.trimRight) {
	      return str.trimRight();
	    }
	    return str.replace(/(\s*$)/g, '');
	  }
	};


	/***/ }),
	/* 22 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Simple HTML Parser
	 *
	 * @author Zongmin Lei<leizongmin@gmail.com>
	 */

	var _ = __webpack_require__(15);

	/**
	 * get tag name
	 *
	 * @param {String} html e.g. '<a hef="#">'
	 * @return {String}
	 */
	function getTagName(html) {
	  var i = _.spaceIndex(html);
	  if (i === -1) {
	    var tagName = html.slice(1, -1);
	  } else {
	    var tagName = html.slice(1, i + 1);
	  }
	  tagName = _.trim(tagName).toLowerCase();
	  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
	  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
	  return tagName;
	}

	/**
	 * is close tag?
	 *
	 * @param {String} html 如：'<a hef="#">'
	 * @return {Boolean}
	 */
	function isClosing(html) {
	  return html.slice(0, 2) === "</";
	}

	/**
	 * parse input html and returns processed html
	 *
	 * @param {String} html
	 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
	 * @param {Function} escapeHtml
	 * @return {String}
	 */
	function parseTag(html, onTag, escapeHtml) {

	  var rethtml = "";
	  var lastPos = 0;
	  var tagStart = false;
	  var quoteStart = false;
	  var currentPos = 0;
	  var len = html.length;
	  var currentTagName = "";
	  var currentHtml = "";

	  chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
	    var c = html.charAt(currentPos);
	    if (tagStart === false) {
	      if (c === "<") {
	        tagStart = currentPos;
	        continue;
	      }
	    } else {
	      if (quoteStart === false) {
	        if (c === "<") {
	          rethtml += escapeHtml(html.slice(lastPos, currentPos));
	          tagStart = currentPos;
	          lastPos = currentPos;
	          continue;
	        }
	        if (c === ">") {
	          rethtml += escapeHtml(html.slice(lastPos, tagStart));
	          currentHtml = html.slice(tagStart, currentPos + 1);
	          currentTagName = getTagName(currentHtml);
	          rethtml += onTag(
	            tagStart,
	            rethtml.length,
	            currentTagName,
	            currentHtml,
	            isClosing(currentHtml)
	          );
	          lastPos = currentPos + 1;
	          tagStart = false;
	          continue;
	        }
	        if (c === '"' || c === "'") {
	          var i = 1;
	          var ic = html.charAt(currentPos - i);

	          while (ic.trim() === "" || ic === "=") {
	            if (ic === "=") {
	              quoteStart = c;
	              continue chariterator;
	            }
	            ic = html.charAt(currentPos - ++i);
	          }
	        }
	      } else {
	        if (c === quoteStart) {
	          quoteStart = false;
	          continue;
	        }
	      }
	    }
	  }
	  if (lastPos < html.length) {
	    rethtml += escapeHtml(html.substr(lastPos));
	  }

	  return rethtml;
	}

	var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;

	/**
	 * parse input attributes and returns processed attributes
	 *
	 * @param {String} html e.g. `href="#" target="_blank"`
	 * @param {Function} onAttr e.g. `function (name, value)`
	 * @return {String}
	 */
	function parseAttr(html, onAttr) {

	  var lastPos = 0;
	  var retAttrs = [];
	  var tmpName = false;
	  var len = html.length;

	  function addAttr(name, value) {
	    name = _.trim(name);
	    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
	    if (name.length < 1) return;
	    var ret = onAttr(name, value || "");
	    if (ret) retAttrs.push(ret);
	  }

	  // 逐个分析字符
	  for (var i = 0; i < len; i++) {
	    var c = html.charAt(i);
	    var v, j;
	    if (tmpName === false && c === "=") {
	      tmpName = html.slice(lastPos, i);
	      lastPos = i + 1;
	      continue;
	    }
	    if (tmpName !== false) {
	      if (
	        i === lastPos &&
	        (c === '"' || c === "'") &&
	        html.charAt(i - 1) === "="
	      ) {
	        j = html.indexOf(c, i + 1);
	        if (j === -1) {
	          break;
	        } else {
	          v = _.trim(html.slice(lastPos + 1, j));
	          addAttr(tmpName, v);
	          tmpName = false;
	          i = j;
	          lastPos = i + 1;
	          continue;
	        }
	      }
	    }
	    if (/\s|\n|\t/.test(c)) {
	      html = html.replace(/\s|\n|\t/g, " ");
	      if (tmpName === false) {
	        j = findNextEqual(html, i);
	        if (j === -1) {
	          v = _.trim(html.slice(lastPos, i));
	          addAttr(v);
	          tmpName = false;
	          lastPos = i + 1;
	          continue;
	        } else {
	          i = j - 1;
	          continue;
	        }
	      } else {
	        j = findBeforeEqual(html, i - 1);
	        if (j === -1) {
	          v = _.trim(html.slice(lastPos, i));
	          v = stripQuoteWrap(v);
	          addAttr(tmpName, v);
	          tmpName = false;
	          lastPos = i + 1;
	          continue;
	        } else {
	          continue;
	        }
	      }
	    }
	  }

	  if (lastPos < html.length) {
	    if (tmpName === false) {
	      addAttr(html.slice(lastPos));
	    } else {
	      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
	    }
	  }

	  return _.trim(retAttrs.join(" "));
	}

	function findNextEqual(str, i) {
	  for (; i < str.length; i++) {
	    var c = str[i];
	    if (c === " ") continue;
	    if (c === "=") return i;
	    return -1;
	  }
	}

	function findBeforeEqual(str, i) {
	  for (; i > 0; i--) {
	    var c = str[i];
	    if (c === " ") continue;
	    if (c === "=") return i;
	    return -1;
	  }
	}

	function isQuoteWrapString(text) {
	  if (
	    (text[0] === '"' && text[text.length - 1] === '"') ||
	    (text[0] === "'" && text[text.length - 1] === "'")
	  ) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function stripQuoteWrap(text) {
	  if (isQuoteWrapString(text)) {
	    return text.substr(1, text.length - 2);
	  } else {
	    return text;
	  }
	}

	exports.parseTag = parseTag;
	exports.parseAttr = parseAttr;


	/***/ }),
	/* 23 */,
	/* 24 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * cssfilter
	 *
	 * @author 老雷<leizongmin@gmail.com>
	 */

	var DEFAULT = __webpack_require__(20);
	var parseStyle = __webpack_require__(25);
	__webpack_require__(21);


	/**
	 * 返回值是否为空
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	function isNull (obj) {
	  return (obj === undefined || obj === null);
	}

	/**
	 * 浅拷贝对象
	 *
	 * @param {Object} obj
	 * @return {Object}
	 */
	function shallowCopyObject (obj) {
	  var ret = {};
	  for (var i in obj) {
	    ret[i] = obj[i];
	  }
	  return ret;
	}

	/**
	 * 创建CSS过滤器
	 *
	 * @param {Object} options
	 *   - {Object} whiteList
	 *   - {Function} onAttr
	 *   - {Function} onIgnoreAttr
	 *   - {Function} safeAttrValue
	 */
	function FilterCSS (options) {
	  options = shallowCopyObject(options || {});
	  options.whiteList = options.whiteList || DEFAULT.whiteList;
	  options.onAttr = options.onAttr || DEFAULT.onAttr;
	  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
	  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
	  this.options = options;
	}

	FilterCSS.prototype.process = function (css) {
	  // 兼容各种奇葩输入
	  css = css || '';
	  css = css.toString();
	  if (!css) return '';

	  var me = this;
	  var options = me.options;
	  var whiteList = options.whiteList;
	  var onAttr = options.onAttr;
	  var onIgnoreAttr = options.onIgnoreAttr;
	  var safeAttrValue = options.safeAttrValue;

	  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

	    var check = whiteList[name];
	    var isWhite = false;
	    if (check === true) isWhite = check;
	    else if (typeof check === 'function') isWhite = check(value);
	    else if (check instanceof RegExp) isWhite = check.test(value);
	    if (isWhite !== true) isWhite = false;

	    // 如果过滤后 value 为空则直接忽略
	    value = safeAttrValue(name, value);
	    if (!value) return;

	    var opts = {
	      position: position,
	      sourcePosition: sourcePosition,
	      source: source,
	      isWhite: isWhite
	    };

	    if (isWhite) {

	      var ret = onAttr(name, value, opts);
	      if (isNull(ret)) {
	        return name + ':' + value;
	      } else {
	        return ret;
	      }

	    } else {

	      var ret = onIgnoreAttr(name, value, opts);
	      if (!isNull(ret)) {
	        return ret;
	      }

	    }
	  });

	  return retCSS;
	};


	module.exports = FilterCSS;


	/***/ }),
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * cssfilter
	 *
	 * @author 老雷<leizongmin@gmail.com>
	 */

	var _ = __webpack_require__(21);


	/**
	 * 解析style
	 *
	 * @param {String} css
	 * @param {Function} onAttr 处理属性的函数
	 *   参数格式： function (sourcePosition, position, name, value, source)
	 * @return {String}
	 */
	function parseStyle (css, onAttr) {
	  css = _.trimRight(css);
	  if (css[css.length - 1] !== ';') css += ';';
	  var cssLength = css.length;
	  var isParenthesisOpen = false;
	  var lastPos = 0;
	  var i = 0;
	  var retCSS = '';

	  function addNewAttr () {
	    // 如果没有正常的闭合圆括号，则直接忽略当前属性
	    if (!isParenthesisOpen) {
	      var source = _.trim(css.slice(lastPos, i));
	      var j = source.indexOf(':');
	      if (j !== -1) {
	        var name = _.trim(source.slice(0, j));
	        var value = _.trim(source.slice(j + 1));
	        // 必须有属性名称
	        if (name) {
	          var ret = onAttr(lastPos, retCSS.length, name, value, source);
	          if (ret) retCSS += ret + '; ';
	        }
	      }
	    }
	    lastPos = i + 1;
	  }

	  for (; i < cssLength; i++) {
	    var c = css[i];
	    if (c === '/' && css[i + 1] === '*') {
	      // 备注开始
	      var j = css.indexOf('*/', i + 2);
	      // 如果没有正常的备注结束，则后面的部分全部跳过
	      if (j === -1) break;
	      // 直接将当前位置调到备注结尾，并且初始化状态
	      i = j + 1;
	      lastPos = i + 1;
	      isParenthesisOpen = false;
	    } else if (c === '(') {
	      isParenthesisOpen = true;
	    } else if (c === ')') {
	      isParenthesisOpen = false;
	    } else if (c === ';') {
	      if (isParenthesisOpen) ; else {
	        addNewAttr();
	      }
	    } else if (c === '\n') {
	      addNewAttr();
	    }
	  }

	  return _.trim(retCSS);
	}

	module.exports = parseStyle;


	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * filter xss
	 *
	 * @author Zongmin Lei<leizongmin@gmail.com>
	 */

	var FilterCSS = __webpack_require__(14).FilterCSS;
	var DEFAULT = __webpack_require__(19);
	var parser = __webpack_require__(22);
	var parseTag = parser.parseTag;
	var parseAttr = parser.parseAttr;
	var _ = __webpack_require__(15);

	/**
	 * returns `true` if the input value is `undefined` or `null`
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	function isNull(obj) {
	  return obj === undefined || obj === null;
	}

	/**
	 * get attributes for a tag
	 *
	 * @param {String} html
	 * @return {Object}
	 *   - {String} html
	 *   - {Boolean} closing
	 */
	function getAttrs(html) {
	  var i = _.spaceIndex(html);
	  if (i === -1) {
	    return {
	      html: "",
	      closing: html[html.length - 2] === "/",
	    };
	  }
	  html = _.trim(html.slice(i + 1, -1));
	  var isClosing = html[html.length - 1] === "/";
	  if (isClosing) html = _.trim(html.slice(0, -1));
	  return {
	    html: html,
	    closing: isClosing,
	  };
	}

	/**
	 * shallow copy
	 *
	 * @param {Object} obj
	 * @return {Object}
	 */
	function shallowCopyObject(obj) {
	  var ret = {};
	  for (var i in obj) {
	    ret[i] = obj[i];
	  }
	  return ret;
	}

	/**
	 * FilterXSS class
	 *
	 * @param {Object} options
	 *        whiteList, onTag, onTagAttr, onIgnoreTag,
	 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
	 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
	 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
	 */
	function FilterXSS(options) {
	  options = shallowCopyObject(options || {});

	  if (options.stripIgnoreTag) {
	    if (options.onIgnoreTag) {
	      console.error(
	        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
	      );
	    }
	    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
	  }

	  options.whiteList = options.whiteList || DEFAULT.whiteList;
	  options.onTag = options.onTag || DEFAULT.onTag;
	  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
	  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
	  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
	  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
	  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
	  this.options = options;

	  if (options.css === false) {
	    this.cssFilter = false;
	  } else {
	    options.css = options.css || {};
	    this.cssFilter = new FilterCSS(options.css);
	  }
	}

	/**
	 * start process and returns result
	 *
	 * @param {String} html
	 * @return {String}
	 */
	FilterXSS.prototype.process = function (html) {
	  // compatible with the input
	  html = html || "";
	  html = html.toString();
	  if (!html) return "";

	  var me = this;
	  var options = me.options;
	  var whiteList = options.whiteList;
	  var onTag = options.onTag;
	  var onIgnoreTag = options.onIgnoreTag;
	  var onTagAttr = options.onTagAttr;
	  var onIgnoreTagAttr = options.onIgnoreTagAttr;
	  var safeAttrValue = options.safeAttrValue;
	  var escapeHtml = options.escapeHtml;
	  var cssFilter = me.cssFilter;

	  // remove invisible characters
	  if (options.stripBlankChar) {
	    html = DEFAULT.stripBlankChar(html);
	  }

	  // remove html comments
	  if (!options.allowCommentTag) {
	    html = DEFAULT.stripCommentTag(html);
	  }

	  // if enable stripIgnoreTagBody
	  var stripIgnoreTagBody = false;
	  if (options.stripIgnoreTagBody) {
	    var stripIgnoreTagBody = DEFAULT.StripTagBody(
	      options.stripIgnoreTagBody,
	      onIgnoreTag
	    );
	    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
	  }

	  var retHtml = parseTag(
	    html,
	    function (sourcePosition, position, tag, html, isClosing) {
	      var info = {
	        sourcePosition: sourcePosition,
	        position: position,
	        isClosing: isClosing,
	        isWhite: whiteList.hasOwnProperty(tag),
	      };

	      // call `onTag()`
	      var ret = onTag(tag, html, info);
	      if (!isNull(ret)) return ret;

	      if (info.isWhite) {
	        if (info.isClosing) {
	          return "</" + tag + ">";
	        }

	        var attrs = getAttrs(html);
	        var whiteAttrList = whiteList[tag];
	        var attrsHtml = parseAttr(attrs.html, function (name, value) {
	          // call `onTagAttr()`
	          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
	          var ret = onTagAttr(tag, name, value, isWhiteAttr);
	          if (!isNull(ret)) return ret;

	          if (isWhiteAttr) {
	            // call `safeAttrValue()`
	            value = safeAttrValue(tag, name, value, cssFilter);
	            if (value) {
	              return name + '="' + value + '"';
	            } else {
	              return name;
	            }
	          } else {
	            // call `onIgnoreTagAttr()`
	            var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
	            if (!isNull(ret)) return ret;
	            return;
	          }
	        });

	        // build new tag html
	        var html = "<" + tag;
	        if (attrsHtml) html += " " + attrsHtml;
	        if (attrs.closing) html += " /";
	        html += ">";
	        return html;
	      } else {
	        // call `onIgnoreTag()`
	        var ret = onIgnoreTag(tag, html, info);
	        if (!isNull(ret)) return ret;
	        return escapeHtml(html);
	      }
	    },
	    escapeHtml
	  );

	  // if enable stripIgnoreTagBody
	  if (stripIgnoreTagBody) {
	    retHtml = stripIgnoreTagBody.remove(retHtml);
	  }

	  return retHtml;
	};

	module.exports = FilterXSS;


	/***/ })
	/******/ ])["default"];
	}); 
} (preview$1));

var previewExports = preview$1.exports;
const VMdPreview = /*@__PURE__*/getDefaultExportFromCjs(previewExports);

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": false };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.0.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw error;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_DoWlW7Bxcm7P3XRV9XeMSTyudVNEVVKvQkhoCFEDE_Y = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$5 = null;
const __nuxt_page_meta$4 = {
  validate: async (route2) => {
    return /^\d+$/.test(route2.params.id);
  }
};
const __nuxt_page_meta$3 = {
  validate: async (route2) => {
    return /^\d+$/.test(route2.params.id);
  }
};
const __nuxt_page_meta$2 = {
  validate: async (route2) => {
    return /^\d+$/.test(route2.params.id);
  }
};
const __nuxt_page_meta$1 = {
  validate: async (route2) => {
    return /^\d+$/.test(route2.params.id);
  }
};
const __nuxt_page_meta = {
  validate: async (route2) => {
    return /^\d+$/.test(route2.params.id);
  }
};
const _routes = [
  {
    name: "About",
    path: "/About",
    component: () => import('./About-CGRkNdfk.mjs')
  },
  {
    name: "Class",
    path: "/Class",
    component: () => import('./Class-Bj2wCRKI.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-D469HA-5.mjs')
  },
  {
    name: "contact",
    path: "/contact",
    component: () => import('./contact-SmZAZ_H9.mjs')
  },
  {
    name: "Privacy",
    path: "/Privacy",
    component: () => import('./Privacy-BbAH4It4.mjs')
  },
  {
    name: "feedback",
    path: "/feedback",
    component: () => import('./feedback-B_E_Zb22.mjs')
  },
  {
    name: __nuxt_page_meta$5?.name,
    path: "/UserInfo",
    component: () => import('./UserInfo-BZenAv1z.mjs'),
    children: [
      {
        name: "UserInfo-vip",
        path: "vip",
        component: () => import('./vip-JO8z9t7Z.mjs')
      },
      {
        name: "UserInfo-post",
        path: "post",
        component: () => import('./post-DBz9Y-4g.mjs')
      },
      {
        name: "UserInfo-star",
        path: "star",
        component: () => import('./star-B_sjig21.mjs')
      },
      {
        name: "UserInfo",
        path: "",
        component: () => import('./index-D3D4GOmK.mjs')
      },
      {
        name: "UserInfo-charge",
        path: "charge",
        component: () => import('./charge-DFiOQjLy.mjs')
      },
      {
        name: "UserInfo-follow",
        path: "follow",
        component: () => import('./follow-DzkZ3uzX.mjs')
      },
      {
        name: "UserInfo-payInfo",
        path: "payInfo",
        component: () => import('./payInfo-DjeoOArK.mjs')
      },
      {
        name: "UserInfo-changePw",
        path: "changePw",
        component: () => import('./changePw-DC9r0nYZ.mjs')
      },
      {
        name: "UserInfo-chat-id",
        path: "chat/:id()",
        component: () => import('./_id_-D3k4BI-9.mjs')
      }
    ]
  },
  {
    name: "AllPlanet",
    path: "/AllPlanet",
    component: () => import('./AllPlanet-PJvNdnyd.mjs')
  },
  {
    name: "List-id",
    path: "/List/:id()",
    meta: __nuxt_page_meta$4 || {},
    component: () => import('./_id_-B3FOqFSn.mjs')
  },
  {
    name: "Post-id",
    path: "/Post/:id()",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./_id_-C3sz9o4r.mjs')
  },
  {
    name: "changelogs",
    path: "/changelogs",
    component: () => import('./changelogs-Bliy9VWL.mjs')
  },
  {
    name: "Planet-id",
    path: "/Planet/:id()",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./_id_-5CjkeV3r.mjs')
  },
  {
    name: "AllList-id",
    path: "/AllList/:id()",
    component: () => import('./_id_-FCOvFeHb.mjs')
  },
  {
    name: "AllPost-id",
    path: "/AllPost/:id()",
    component: () => import('./_id_-DPHLuCE5.mjs')
  },
  {
    name: "CreatePlanet",
    path: "/CreatePlanet",
    component: () => import('./CreatePlanet-h0S34rJl.mjs')
  },
  {
    name: "Planet",
    path: "/Planet",
    component: () => import('./index-achEDoP0.mjs')
  },
  {
    name: "AllList",
    path: "/AllList",
    component: () => import('./index-BrxR1070.mjs')
  },
  {
    name: "AllPost",
    path: "/AllPost",
    component: () => import('./index-BQ7cPO8r.mjs')
  },
  {
    name: "classdetal-id",
    path: "/classdetal/:id()",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./_id_-CPNewlHY.mjs')
  },
  {
    name: "Notification-im",
    path: "/Notification/im",
    component: () => import('./im-B07WoGG7.mjs')
  },
  {
    name: "Notification-digg",
    path: "/Notification/digg",
    component: () => import('./digg-CySUixDQ.mjs')
  },
  {
    name: "Notification",
    path: "/Notification",
    component: () => import('./index-YwFdpGJV.mjs')
  },
  {
    name: "otheruserinfo-id",
    path: "/otheruserinfo/:id()",
    meta: __nuxt_page_meta || {},
    component: () => import('./_id_-0KwGiS_n.mjs')
  },
  {
    name: "Notification-follow",
    path: "/Notification/follow",
    component: () => import('./follow-DjUnudcc.mjs')
  },
  {
    name: "Notification-system",
    path: "/Notification/system",
    component: () => import('./system-ChhwFG5H.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[0]?.components?.default === from.matched[0]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    useError();
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server__ffAnxteZa1axMzOi6mrmwTSrfOJAfNoYBKtbZV3b2g = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (true)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (true)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop$1
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    const rawStore = toRaw(store);
    const refs = {};
    for (const key in rawStore) {
      const value = rawStore[key];
      if (value.effect) {
        refs[key] = // ...
        computed({
          get: () => store[key],
          set(value2) {
            store[key] = value2;
          }
        });
      } else if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
const __nuxt_component_1 = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_2 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const element_plus_teleports_plugin_MqfudBumuoE3Pez3fuUvb8WdTojFg8JYYTQkOWOC5VM = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:rendered", (ctx) => {
    if (ctx.ssrContext?.teleports) {
      ctx.ssrContext.teleports = renderTeleports(ctx.ssrContext.teleports);
    }
  });
});
function renderTeleports(teleports) {
  const body = Object.entries(teleports).reduce((all, [key, value]) => {
    if (key.startsWith("#el-popper-container-") || [].includes(key)) {
      return `${all}<div id="${key.slice(1)}">${value}</div>`;
    }
    return all;
  }, teleports.body || "");
  return { ...teleports, body };
}
var __defProp$9 = Object.defineProperty;
var __defProps$6 = Object.defineProperties;
var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$b = Object.getOwnPropertySymbols;
var __hasOwnProp$b = Object.prototype.hasOwnProperty;
var __propIsEnum$b = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$b.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$b)
    for (var prop of __getOwnPropSymbols$b(b)) {
      if (__propIsEnum$b.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
function computedEager(fn, options) {
  var _a2;
  const result = shallowRef();
  watchEffect(() => {
    result.value = fn();
  }, __spreadProps$6(__spreadValues$9({}, options), {
    flush: (_a2 = void 0) != null ? _a2 : "sync"
  }));
  return readonly(result);
}
const isClient = false;
const isDef = (val) => typeof val !== "undefined";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const noop = () => {
};
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke2) => {
    const duration = resolveUnref(ms);
    const maxDuration = resolveUnref(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke2());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke2());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke2());
      }, duration);
    });
  };
  return filter;
}
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function refDebounced(value, ms = 200, options = {}) {
  const debounced = ref(value.value);
  const updater = useDebounceFn(() => {
    debounced.value = value.value;
  }, ms, options);
  watch(value, () => updater());
  return debounced;
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, resolveUnref(interval));
  }
  if (immediate) {
    isPending.value = true;
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
const defaultNamespace = "el";
const statePrefix = "is-";
const _bem = (namespace, block, blockSuffix, element, modifier) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};
const namespaceContextKey = Symbol("namespaceContextKey");
const useGetDerivedNamespace = (namespaceOverrides) => {
  const derivedNamespace = getCurrentInstance() ? inject(namespaceContextKey, ref(defaultNamespace)) : ref(defaultNamespace);
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace;
  });
  return namespace;
};
const useNamespace = (block, namespaceOverrides) => {
  const namespace = useGetDerivedNamespace();
  const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
  const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
  const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
  const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
  const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
  const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
  const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : "";
  };
  const cssVar = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarBlock = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarName = (name) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  };
};
class ElementPlusError extends Error {
  constructor(m) {
    super(m);
    this.name = "ElementPlusError";
  }
}
function throwError(scope, m) {
  throw new ElementPlusError(`[${scope}] ${m}`);
}
function debugWarn(scope, message) {
}
const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
};
const ID_INJECTION_KEY = Symbol("elIdInjection");
const useIdInjection = () => {
  return getCurrentInstance() ? inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
};
const useId = (deterministicId) => {
  const idInjection = useIdInjection();
  const namespace = useGetDerivedNamespace();
  const idRef = computedEager(() => unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
  return idRef;
};
const isUndefined = (val) => val === void 0;
const isBoolean = (val) => typeof val === "boolean";
const isNumber = (val) => typeof val === "number";
const isEmpty = (val) => !val && val !== 0 || isArray(val) && val.length === 0 || isObject(val) && !Object.keys(val).length;
const isElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const isPropAbsent = (prop) => isNil(prop);
const isStringNumber = (val) => {
  if (!isString$1(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
const initial = {
  current: 0
};
const zIndex = ref(0);
const defaultInitialZIndex = 2e3;
const ZINDEX_INJECTION_KEY = Symbol("elZIndexContextKey");
const zIndexContextKey = Symbol("zIndexContextKey");
const useZIndex = (zIndexOverrides) => {
  const increasingInjection = getCurrentInstance() ? inject(ZINDEX_INJECTION_KEY, initial) : initial;
  const zIndexInjection = getCurrentInstance() ? inject(zIndexContextKey, void 0) : void 0;
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection);
    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
  });
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);
  const nextZIndex = () => {
    increasingInjection.current++;
    zIndex.value = increasingInjection.current;
    return currentZIndex.value;
  };
  if (!inject(ZINDEX_INJECTION_KEY)) ;
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};
const element_plus_injection_plugin_rmo8goqVWUJloFdo3_62mQljiuVWSYSpjiB72zna6Cs = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, { "prefix": 1024, "current": 0 }).provide(ZINDEX_INJECTION_KEY, { "current": 0 });
});
function handleRequest({ options }) {
  const cleanHeaders = options.headers ? Object.fromEntries(
    Object.entries(options.headers).filter(
      ([key, value]) => typeof key === "string" && (typeof value === "string" || typeof value === "number")
    ).map(([key, value]) => [key, String(value)])
  ) : {};
  let authHeaders = {};
  options.headers = {
    ...cleanHeaders,
    ...authHeaders,
    "Content-Type": "application/json"
  };
}
function handleResponse({ response }) {
  if (response._data.error) {
    throw new Error(response._data.error.message || "响应错误");
  }
  return response._data;
}
function createUseFetchRequest(method) {
  return async function(url, data, options = {}) {
    const {
      public: {
        apiBaseUrl
      }
    } = /* @__PURE__ */ useRuntimeConfig();
    const baseURL2 = apiBaseUrl;
    const requestUrl = new URL(
      url,
      options.customBaseURL || baseURL2
    ).toString();
    return await $fetch(requestUrl, {
      ...options,
      method,
      body: data,
      onRequest: handleRequest,
      onResponse: handleResponse
    });
  };
}
const useFetchGet = createUseFetchRequest("GET");
const useFetchPost = createUseFetchRequest("POST");
const useDollarGet = createUseFetchRequest("GET");
const getCarousel = (params) => {
  return useDollarGet("/WebSitting/getCarousel");
};
const getSetting = (params) => {
  return useDollarGet("/WebSitting/getSetting");
};
const getFourKingKong = (params) => {
  return useDollarGet("/WebSitting/getFourKingKong");
};
const useSettingStore = /* @__PURE__ */ defineStore("setting", {
  state: () => ({
    settings: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchSettings() {
      return;
    },
    clearSettings() {
      this.settings = null;
    }
  }
});
const initSettings_KdkQUvDbGYuYPuF7MVufekjc6Ik8EgOjsbIpZp36XD4 = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  {
    const settingStore = useSettingStore();
    if (!settingStore.settings) {
      try {
        const result = ([__temp, __restore] = executeAsync(() => getSetting("")), __temp = await __temp, __restore(), __temp);
        settingStore.$patch({
          settings: result || null
        });
      } catch (err) {
        console.error("Failed to prefetch settings on server:", err);
      }
    }
  }
});
const main_ER_eLK56_DFXw0rzevpZiwdTs1jGSkhgaJZdQtea6_E = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VMdPreview);
  VMdPreview.use(vuepressTheme, {
    Prism
  });
});
const plugins = [
  unhead_DoWlW7Bxcm7P3XRV9XeMSTyudVNEVVKvQkhoCFEDE_Y,
  plugin$1,
  revive_payload_server__ffAnxteZa1axMzOi6mrmwTSrfOJAfNoYBKtbZV3b2g,
  plugin,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  element_plus_teleports_plugin_MqfudBumuoE3Pez3fuUvb8WdTojFg8JYYTQkOWOC5VM,
  element_plus_injection_plugin_rmo8goqVWUJloFdo3_62mQljiuVWSYSpjiB72zna6Cs,
  initSettings_KdkQUvDbGYuYPuF7MVufekjc6Ik8EgOjsbIpZp36XD4,
  main_ER_eLK56_DFXw0rzevpZiwdTs1jGSkhgaJZdQtea6_E
];
const layouts = {};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_3 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtRouteAnnouncer = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_3;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtRouteAnnouncer),
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.0.2_@vue+compiler-sfc@3.5.18_sass-embedded@1.83.4_typescript@5.7.3_vite@6.0.11/node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  name: "error",
  layout: "error",
  // you can set a custom layout for the error page
  props: {
    // 接受错误页面传递的错误信息
    error: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.error);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "error" }, _attrs))} data-v-89c24e7e><div class="error-box" data-v-89c24e7e><h1${ssrRenderAttr("data-t", $props.error.statusCode)} class="h1" data-v-89c24e7e>${ssrInterpolate($props.error.statusCode)}</h1></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-89c24e7e"]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.0.2_@vue+compiler-sfc@3.5.18_sass-embedded@1.83.4_typescript@5.7.3_vite@6.0.11/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { identity as A, isStringNumber as B, isUndefined as C, namespaceContextKey as D, zIndexContextKey as E, defineStore as F, isClient as G, useGetDerivedNamespace as H, useIdInjection as I, useFetchPost as J, asyncDataDefaults as K, createError as L, fetchDefaults as M, isElement as N, storeToRefs as O, getCarousel as P, getFourKingKong as Q, __nuxt_component_3 as R, isEmpty as S, isPropAbsent as T, __nuxt_component_2 as U, _export_sfc as _, useRouter as a, useNuxtApp as b, useRuntimeConfig as c, nuxtLinkDefaults as d, entry$1 as default, useNamespace as e, isNumber as f, useFetchGet as g, useDollarGet as h, isBoolean as i, useZIndex as j, useId as k, defaultNamespace as l, useTimeoutFn as m, navigateTo as n, debugWarn as o, refDebounced as p, tryOnScopeDispose as q, resolveRouteObject as r, isString as s, throwError as t, useSettingStore as u, noop as v, resolveUnref as w, tryOnMounted as x, isDef as y, isFunction as z };
//# sourceMappingURL=server.mjs.map
