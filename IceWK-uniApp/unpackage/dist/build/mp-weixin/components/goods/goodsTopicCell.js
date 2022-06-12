(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/goods/goodsTopicCell"],{6337:function(t,n,e){},7128:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={props:{item:{type:Object,default:function(){return{}}}},computed:{height:function(){var t=350*this.item.height/this.item.width;return t>400?400:t<100?100:t}},methods:{toDetail:function(){this.$emit("detail",this.item)}}};n.default=i},"734f":function(t,n,e){"use strict";e.r(n);var i=e("7128"),o=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=o.a},"7ab8":function(t,n,e){"use strict";e.r(n);var i=e("bd6f"),o=e("734f");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("a995");var r,c=e("f0c5"),f=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"47dd9e38",null,!1,i["a"],r);n["default"]=f.exports},a995:function(t,n,e){"use strict";var i=e("6337"),o=e.n(i);o.a},bd6f:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var i={nIcon:function(){return Promise.all([e.e("common/vendor"),e.e("nPro/icon/icon")]).then(e.bind(null,"0efe"))}},o=function(){var t=this,n=t.$createElement;t._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/goods/goodsTopicCell-create-component',
    {
        'components/goods/goodsTopicCell-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7ab8"))
        })
    },
    [['components/goods/goodsTopicCell-create-component']]
]);
