(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["preferredPages/product"],{

/***/ 279:
/*!***************************************************************************************************!*\
  !*** /Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/main.js?{"page":"preferredPages%2Fproduct"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _product = _interopRequireDefault(__webpack_require__(/*! ./preferredPages/product.vue */ 280));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_product.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 280:
/*!**********************************************************************************!*\
  !*** /Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/preferredPages/product.vue ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product.vue?vue&type=template&id=fc367f9e&scoped=true& */ 281);
/* harmony import */ var _product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product.vue?vue&type=script&lang=js& */ 283);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _product_vue_vue_type_style_index_0_id_fc367f9e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product.vue?vue&type=style&index=0&id=fc367f9e&lang=scss&scoped=true& */ 285);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 35);

var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "fc367f9e",
  null,
  false,
  _product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "preferredPages/product.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 281:
/*!*****************************************************************************************************************************!*\
  !*** /Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/preferredPages/product.vue?vue&type=template&id=fc367f9e&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./product.vue?vue&type=template&id=fc367f9e&scoped=true& */ 282);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_template_id_fc367f9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 282:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/preferredPages/product.vue?vue&type=template&id=fc367f9e&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    tnNavBar: function () {
      return Promise.all(/*! import() | tuniao-ui/components/tn-nav-bar/tn-nav-bar */[__webpack_require__.e("common/vendor"), __webpack_require__.e("tuniao-ui/components/tn-nav-bar/tn-nav-bar")]).then(__webpack_require__.bind(null, /*! @/tuniao-ui/components/tn-nav-bar/tn-nav-bar.vue */ 521))
    },
    tnListCell: function () {
      return Promise.all(/*! import() | tuniao-ui/components/tn-list-cell/tn-list-cell */[__webpack_require__.e("common/vendor"), __webpack_require__.e("tuniao-ui/components/tn-list-cell/tn-list-cell")]).then(__webpack_require__.bind(null, /*! @/tuniao-ui/components/tn-list-cell/tn-list-cell.vue */ 624))
    },
    tnSticky: function () {
      return __webpack_require__.e(/*! import() | tuniao-ui/components/tn-sticky/tn-sticky */ "tuniao-ui/components/tn-sticky/tn-sticky").then(__webpack_require__.bind(null, /*! @/tuniao-ui/components/tn-sticky/tn-sticky.vue */ 631))
    },
    tnTabs: function () {
      return Promise.all(/*! import() | tuniao-ui/components/tn-tabs/tn-tabs */[__webpack_require__.e("common/vendor"), __webpack_require__.e("tuniao-ui/components/tn-tabs/tn-tabs")]).then(__webpack_require__.bind(null, /*! @/tuniao-ui/components/tn-tabs/tn-tabs.vue */ 636))
    },
    tnGoodsNav: function () {
      return __webpack_require__.e(/*! import() | tuniao-ui/components/tn-goods-nav/tn-goods-nav */ "tuniao-ui/components/tn-goods-nav/tn-goods-nav").then(__webpack_require__.bind(null, /*! @/tuniao-ui/components/tn-goods-nav/tn-goods-nav.vue */ 643))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 283:
/*!***********************************************************************************************************!*\
  !*** /Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/preferredPages/product.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./product.vue?vue&type=script&lang=js& */ 284);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 284:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/preferredPages/product.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _request = _interopRequireDefault(__webpack_require__(/*! @/common/request.js */ 148));
var _template_page_mixin = _interopRequireDefault(__webpack_require__(/*! @/libs/mixin/template_page_mixin.js */ 63));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'TemplateProduct',
  mixins: [_template_page_mixin.default],
  data: function data() {
    return {
      url: '',
      resourceList: [],
      cardCur: 0,
      swiperList: [{
        id: 0,
        type: 'image',
        title: '免费开源',
        name: '商业合作请联系作者',
        text: '微信：tnkewo',
        url: 'https://resource.tuniaokj.com/images/swiper/ad1.jpg'
      }, {
        id: 1,
        type: 'image',
        title: 'IceCMS南南',
        name: '欢迎加入东东们',
        text: '如果你也有不错的作品',
        url: 'https://resource.tuniaokj.com/images/swiper/ad2.jpg'
      }, {
        id: 2,
        type: 'image',
        title: 'IceCMS西西',
        name: '一起玩转scss',
        text: '用最少的代码做最骚的效果',
        url: 'https://resource.tuniaokj.com/images/swiper/ad3.jpg'
      }, {
        id: 3,
        type: 'image',
        title: 'IceCMS北北',
        name: '微信号 tnkewo',
        text: '商业合作请联系作者',
        url: 'https://resource.tuniaokj.com/images/swiper/ad4.jpg'
      }],
      current: 0,
      fixedList: [{
        name: '推荐'
      }, {
        name: '同款'
      }, {
        name: '热卖',
        count: '99+'
      }, {
        name: '爆款'
      }],
      content: [{
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 129,
        commentCount: 999,
        likeCount: 999
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['炸串', '火锅'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '我们都是好孩子',
        mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/sticker.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }],
      content2: [{
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['炸串', '火锅'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 129,
        commentCount: 999,
        likeCount: 999
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/sticker.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '我们都是好孩子',
        mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }],
      content3: [{
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '我们都是好孩子',
        mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['炸串', '火锅'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 129,
        commentCount: 999,
        likeCount: 999
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/sticker.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }],
      content4: [{
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/card.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/computer2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '我们都是好孩子',
        mainImage: 'https://resource.tuniaokj.com/images/shop/watch1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['炸串', '火锅'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/prototype2.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 129,
        commentCount: 999,
        likeCount: 999
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/sticker.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }, {
        userAvatar: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg',
        userName: '可我会像',
        date: '2021年12月20日',
        label: ['烤肉', '烤肉'],
        desc: '免费开源可商用组件',
        mainImage: 'https://resource.tuniaokj.com/images/shop/phonecase1.jpg',
        viewUser: {
          latestUserAvatar: [{
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_1.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_2.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_3.jpeg'
          }, {
            src: 'https://resource.tuniaokj.com/images/blogger/avatar_4.jpeg'
          }],
          viewUserCount: 129
        },
        collectionCount: 265,
        commentCount: 22,
        likeCount: 62
      }],
      countOptions: [{
        icon: 'star',
        text: '收藏'
      }, {
        icon: 'share-circle',
        text: '分享'
      }],
      customButtonGroups: [{
        text: '咨询客服',
        backgroundColor: 'tn-cool-bg-color-5',
        color: '#FFFFFF'
      }, {
        text: '立即购买',
        backgroundColor: 'tn-cool-bg-color-15--reverse',
        color: '#FFFFFF'
      }],
      tagList: [{
        color: 'red',
        title: "酷炫"
      }, {
        color: 'cyan',
        title: "设计"
      }, {
        color: 'blue',
        title: "IceCMS"
      }, {
        color: 'green',
        title: "互联网"
      }, {
        color: 'orange',
        title: "免费"
      }, {
        color: 'purplered',
        title: "配色"
      }, {
        color: 'purple',
        title: "软件开发"
      }, {
        color: 'brown',
        title: "插画"
      }, {
        color: 'yellowgreen',
        title: "C4D"
      }, {
        color: 'grey',
        title: "海报"
      }]
    };
  },
  onLoad: function onLoad(url) {
    this.url = url.url;
    console.log(url);
    this.getDataById(this.url);
  },
  created: function created() {},
  methods: {
    getDataById: function getDataById(id) {
      var _this = this;
      (0, _request.default)("/Mini/getResourceById/" + id, {
        method: 'GET'
      }).then(function (response) {
        console.log(response);
        _this.resourceList = response;
        // 解析并转换carousel字符串
        var carouselData = JSON.parse(response.carousel);
        _this.swiperList = carouselData.map(function (item, index) {
          return {
            id: index,
            type: 'image',
            title: 'Sample Title',
            // 可以根据需要修改标题
            name: item.name,
            text: 'Sample Text',
            // 可以根据需要修改文本
            url: item.url
          };
        });
        console.log(_this.swiperList);
      }).catch(function (error) {
        console.error('Request failed', error);
      });
    },
    // cardSwiper
    cardSwiper: function cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    // 跳转
    tn: function tn(e) {
      uni.navigateTo({
        url: e
      });
    },
    // tab选项卡切换
    tabChange: function tabChange(index) {
      this.current = index;
    },
    getRandomCoolBg: function getRandomCoolBg() {
      return this.$t.colorUtils.getRandomCoolBgClass();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 285:
/*!********************************************************************************************************************************************!*\
  !*** /Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/preferredPages/product.vue?vue&type=style&index=0&id=fc367f9e&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_style_index_0_id_fc367f9e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./product.vue?vue&type=style&index=0&id=fc367f9e&lang=scss&scoped=true& */ 286);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_style_index_0_id_fc367f9e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_style_index_0_id_fc367f9e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_style_index_0_id_fc367f9e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_style_index_0_id_fc367f9e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_product_vue_vue_type_style_index_0_id_fc367f9e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 286:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/apple/Documents/HBuilderProjects/图鸟模板-圈子/preferredPages/product.vue?vue&type=style&index=0&id=fc367f9e&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[279,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/preferredPages/product.js.map