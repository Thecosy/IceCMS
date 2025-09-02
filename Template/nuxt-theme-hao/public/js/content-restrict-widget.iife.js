(function(ve){"use strict";var gn;const J='*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}:before,:after{--un-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}';/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=globalThis,It=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ut=Symbol(),xe=new WeakMap;let ke=class{constructor(t,n,r){if(this._$cssResult$=!0,r!==Ut)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(It&&t===void 0){const r=n!==void 0&&n.length===1;r&&(t=xe.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&xe.set(n,t))}return t}toString(){return this.cssText}};const U=e=>new ke(typeof e=="string"?e:e+"",void 0,Ut),L=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((r,o,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1],e[0]);return new ke(n,e,Ut)},mn=(e,t)=>{if(It)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const r=document.createElement("style"),o=vt.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=n.cssText,e.appendChild(r)}},Ee=It?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const r of t.cssRules)n+=r.cssText;return U(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:yn,defineProperty:bn,getOwnPropertyDescriptor:wn,getOwnPropertyNames:vn,getOwnPropertySymbols:xn,getPrototypeOf:kn}=Object,O=globalThis,$e=O.trustedTypes,En=$e?$e.emptyScript:"",Lt=O.reactiveElementPolyfillSupport,it=(e,t)=>e,xt={toAttribute(e,t){switch(t){case Boolean:e=e?En:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ot=(e,t)=>!yn(e,t),Ce={attribute:!0,type:String,converter:xt,reflect:!1,hasChanged:Ot};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),O.litPropertyMetadata??(O.litPropertyMetadata=new WeakMap);class X extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Ce){if(n.state&&(n.attribute=!1),this._$Ei(),this.elementProperties.set(t,n),!n.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(t,r,n);o!==void 0&&bn(this.prototype,t,o)}}static getPropertyDescriptor(t,n,r){const{get:o,set:s}=wn(this.prototype,t)??{get(){return this[n]},set(i){this[n]=i}};return{get(){return o==null?void 0:o.call(this)},set(i){const a=o==null?void 0:o.call(this);s.call(this,i),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ce}static _$Ei(){if(this.hasOwnProperty(it("elementProperties")))return;const t=kn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(it("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(it("properties"))){const n=this.properties,r=[...vn(n),...xn(n)];for(const o of r)this.createProperty(o,n[o])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[r,o]of n)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[n,r]of this.elementProperties){const o=this._$Eu(n,r);o!==void 0&&this._$Eh.set(o,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const o of r)n.unshift(Ee(o))}else t!==void 0&&n.push(Ee(t));return n}static _$Eu(t,n){const r=n.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const r of n.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mn(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var r;return(r=n.hostConnected)==null?void 0:r.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var r;return(r=n.hostDisconnected)==null?void 0:r.call(n)})}attributeChangedCallback(t,n,r){this._$AK(t,r)}_$EC(t,n){var s;const r=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,r);if(o!==void 0&&r.reflect===!0){const i=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:xt).toAttribute(n,r.type);this._$Em=t,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,n){var s;const r=this.constructor,o=r._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const i=r.getPropertyOptions(o),a=typeof i.converter=="function"?{fromAttribute:i.converter}:((s=i.converter)==null?void 0:s.fromAttribute)!==void 0?i.converter:xt;this._$Em=o,this[o]=a.fromAttribute(n,i.type),this._$Em=null}}requestUpdate(t,n,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??Ot)(this[t],n))return;this.P(t,n,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,n,r){this._$AL.has(t)||this._$AL.set(t,n),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[s,i]of o)i.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],i)}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(r=this._$EO)==null||r.forEach(o=>{var s;return(s=o.hostUpdate)==null?void 0:s.call(o)}),this.update(n)):this._$EU()}catch(o){throw t=!1,this._$EU(),o}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(r=>{var o;return(o=r.hostUpdated)==null?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(n=>this._$EC(n,this[n]))),this._$EU()}updated(t){}firstUpdated(t){}}X.elementStyles=[],X.shadowRootOptions={mode:"open"},X[it("elementProperties")]=new Map,X[it("finalized")]=new Map,Lt==null||Lt({ReactiveElement:X}),(O.reactiveElementVersions??(O.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=globalThis,kt=at.trustedTypes,_e=kt?kt.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ae="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,Se="?"+D,$n=`<${Se}>`,K=document,ct=()=>K.createComment(""),lt=e=>e===null||typeof e!="object"&&typeof e!="function",Pe=Array.isArray,Cn=e=>Pe(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Dt=`[ 	
\f\r]`,ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,Re=/>/g,Q=RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ne=/'/g,Me=/"/g,ze=/^(?:script|style|textarea|title)$/i,_n=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),E=_n(1),G=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Be=new WeakMap,W=K.createTreeWalker(K,129);function Ie(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(t):t}const An=(e,t)=>{const n=e.length-1,r=[];let o,s=t===2?"<svg>":"",i=ut;for(let a=0;a<n;a++){const c=e[a];let u,l,h=-1,p=0;for(;p<c.length&&(i.lastIndex=p,l=i.exec(c),l!==null);)p=i.lastIndex,i===ut?l[1]==="!--"?i=Te:l[1]!==void 0?i=Re:l[2]!==void 0?(ze.test(l[2])&&(o=RegExp("</"+l[2],"g")),i=Q):l[3]!==void 0&&(i=Q):i===Q?l[0]===">"?(i=o??ut,h=-1):l[1]===void 0?h=-2:(h=i.lastIndex-l[2].length,u=l[1],i=l[3]===void 0?Q:l[3]==='"'?Me:Ne):i===Me||i===Ne?i=Q:i===Te||i===Re?i=ut:(i=Q,o=void 0);const d=i===Q&&e[a+1].startsWith("/>")?" ":"";s+=i===ut?c+$n:h>=0?(r.push(u),c.slice(0,h)+Ae+c.slice(h)+D+d):c+D+(h===-2?a:d)}return[Ie(e,s+(e[n]||"<?>")+(t===2?"</svg>":"")),r]};class dt{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0;const a=t.length-1,c=this.parts,[u,l]=An(t,n);if(this.el=dt.createElement(u,r),W.currentNode=this.el.content,n===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=W.nextNode())!==null&&c.length<a;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(Ae)){const p=l[i++],d=o.getAttribute(h).split(D),f=/([.?@])?(.*)/.exec(p);c.push({type:1,index:s,name:f[2],strings:d,ctor:f[1]==="."?Pn:f[1]==="?"?Tn:f[1]==="@"?Rn:Et}),o.removeAttribute(h)}else h.startsWith(D)&&(c.push({type:6,index:s}),o.removeAttribute(h));if(ze.test(o.tagName)){const h=o.textContent.split(D),p=h.length-1;if(p>0){o.textContent=kt?kt.emptyScript:"";for(let d=0;d<p;d++)o.append(h[d],ct()),W.nextNode(),c.push({type:2,index:++s});o.append(h[p],ct())}}}else if(o.nodeType===8)if(o.data===Se)c.push({type:2,index:s});else{let h=-1;for(;(h=o.data.indexOf(D,h+1))!==-1;)c.push({type:7,index:s}),h+=D.length-1}s++}}static createElement(t,n){const r=K.createElement("template");return r.innerHTML=t,r}}function Z(e,t,n=e,r){var i,a;if(t===G)return t;let o=r!==void 0?(i=n._$Co)==null?void 0:i[r]:n._$Cl;const s=lt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==s&&((a=o==null?void 0:o._$AO)==null||a.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Z(e,o._$AS(e,t.values),o,r)),t}class Sn{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:r}=this._$AD,o=((t==null?void 0:t.creationScope)??K).importNode(n,!0);W.currentNode=o;let s=W.nextNode(),i=0,a=0,c=r[0];for(;c!==void 0;){if(i===c.index){let u;c.type===2?u=new ht(s,s.nextSibling,this,t):c.type===1?u=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(u=new Nn(s,this,t)),this._$AV.push(u),c=r[++a]}i!==(c==null?void 0:c.index)&&(s=W.nextNode(),i++)}return W.currentNode=K,o}p(t){let n=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}}class ht{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Z(this,t,n),lt(t)?t===k||t==null||t===""?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==G&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cn(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==k&&lt(this._$AH)?this._$AA.nextSibling.data=t:this.T(K.createTextNode(t)),this._$AH=t}$(t){var s;const{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=dt.createElement(Ie(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===o)this._$AH.p(n);else{const i=new Sn(o,this),a=i.u(this.options);i.p(n),this.T(a),this._$AH=i}}_$AC(t){let n=Be.get(t.strings);return n===void 0&&Be.set(t.strings,n=new dt(t)),n}k(t){Pe(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let r,o=0;for(const s of t)o===n.length?n.push(r=new ht(this.S(ct()),this.S(ct()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,n);t&&t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}}class Et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=k}_$AI(t,n=this,r,o){const s=this.strings;let i=!1;if(s===void 0)t=Z(this,t,n,0),i=!lt(t)||t!==this._$AH&&t!==G,i&&(this._$AH=t);else{const a=t;let c,u;for(t=s[0],c=0;c<s.length-1;c++)u=Z(this,a[r+c],n,c),u===G&&(u=this._$AH[c]),i||(i=!lt(u)||u!==this._$AH[c]),u===k?t=k:t!==k&&(t+=(u??"")+s[c+1]),this._$AH[c]=u}i&&!o&&this.j(t)}j(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pn extends Et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===k?void 0:t}}class Tn extends Et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==k)}}class Rn extends Et{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=Z(this,t,n,0)??k)===G)return;const r=this._$AH,o=t===k&&r!==k||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==k&&(r===k||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}}class Nn{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const jt=at.litHtmlPolyfillSupport;jt==null||jt(dt,ht),(at.litHtmlVersions??(at.litHtmlVersions=[])).push("3.1.4");const Mn=(e,t,n)=>{const r=(n==null?void 0:n.renderBefore)??t;let o=r._$litPart$;if(o===void 0){const s=(n==null?void 0:n.renderBefore)??null;r._$litPart$=o=new ht(t.insertBefore(ct(),s),s,void 0,n??{})}return o._$AI(e),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let S=class extends X{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mn(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return G}};S._$litElement$=!0,S.finalized=!0,(gn=globalThis.litElementHydrateSupport)==null||gn.call(globalThis,{LitElement:S});const Ft=globalThis.litElementPolyfillSupport;Ft==null||Ft({LitElement:S}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.6");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zn={attribute:!0,type:String,converter:xt,reflect:!1,hasChanged:Ot},Bn=(e=zn,t,n)=>{const{kind:r,metadata:o}=n;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),s.set(n.name,e),r==="accessor"){const{name:i}=n;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,c,e)},init(a){return a!==void 0&&this.P(i,void 0,e),a}}}if(r==="setter"){const{name:i}=n;return function(a){const c=this[i];t.call(this,a),this.requestUpdate(i,c,e)}}throw Error("Unsupported decorator location: "+r)};function _(e){return(t,n)=>typeof n=="object"?Bn(e,t,n):((r,o,s)=>{const i=o.hasOwnProperty(s);return o.constructor.createProperty(s,i?{...r,wrapped:!0}:r),i?Object.getOwnPropertyDescriptor(o,s):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(e){return _({...e,state:!0,attribute:!1})}const In=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,Un=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,Ln=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function On(e,t){if(e==="__proto__"||e==="constructor"&&t&&typeof t=="object"&&"prototype"in t){Dn(e);return}return t}function Dn(e){console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)}function jn(e,t={}){if(typeof e!="string")return e;const n=e.trim();if(e[0]==='"'&&e.endsWith('"')&&!e.includes("\\"))return n.slice(1,-1);if(n.length<=9){const r=n.toLowerCase();if(r==="true")return!0;if(r==="false")return!1;if(r==="undefined")return;if(r==="null")return null;if(r==="nan")return Number.NaN;if(r==="infinity")return Number.POSITIVE_INFINITY;if(r==="-infinity")return Number.NEGATIVE_INFINITY}if(!Ln.test(e)){if(t.strict)throw new SyntaxError("[destr] Invalid JSON");return e}try{if(In.test(e)||Un.test(e)){if(t.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(e,On)}return JSON.parse(e)}catch(r){if(t.strict)throw r;return e}}const Fn=/#/g,Hn=/&/g,Vn=/\//g,qn=/=/g,Ht=/\+/g,Yn=/%5e/gi,Jn=/%60/gi,Kn=/%7c/gi,Qn=/%20/gi;function Gn(e){return encodeURI(""+e).replace(Kn,"|")}function Vt(e){return Gn(typeof e=="string"?e:JSON.stringify(e)).replace(Ht,"%2B").replace(Qn,"+").replace(Fn,"%23").replace(Hn,"%26").replace(Jn,"`").replace(Yn,"^").replace(Vn,"%2F")}function qt(e){return Vt(e).replace(qn,"%3D")}function Ue(e=""){try{return decodeURIComponent(""+e)}catch{return""+e}}function Wn(e){return Ue(e.replace(Ht," "))}function Xn(e){return Ue(e.replace(Ht," "))}function Zn(e=""){const t={};e[0]==="?"&&(e=e.slice(1));for(const n of e.split("&")){const r=n.match(/([^=]+)=?(.*)/)||[];if(r.length<2)continue;const o=Wn(r[1]);if(o==="__proto__"||o==="constructor")continue;const s=Xn(r[2]||"");t[o]===void 0?t[o]=s:Array.isArray(t[o])?t[o].push(s):t[o]=[t[o],s]}return t}function tr(e,t){return(typeof t=="number"||typeof t=="boolean")&&(t=String(t)),t?Array.isArray(t)?t.map(n=>`${qt(e)}=${Vt(n)}`).join("&"):`${qt(e)}=${Vt(t)}`:qt(e)}function er(e){return Object.keys(e).filter(t=>e[t]!==void 0).map(t=>tr(t,e[t])).filter(Boolean).join("&")}const nr=/^[\s\w\0+.-]{2,}:([/\\]{1,2})/,rr=/^[\s\w\0+.-]{2,}:([/\\]{2})?/,or=/^([/\\]\s*){2,}[^/\\]/,sr=/^\.?\//;function Le(e,t={}){return typeof t=="boolean"&&(t={acceptRelative:t}),t.strict?nr.test(e):rr.test(e)||(t.acceptRelative?or.test(e):!1)}function ir(e="",t){return e.endsWith("/")}function ar(e="",t){return(ir(e)?e.slice(0,-1):e)||"/"}function cr(e="",t){return e.endsWith("/")?e:e+"/"}function lr(e,t){if(dr(t)||Le(e))return e;const n=ar(t);return e.startsWith(n)?e:pr(n,e)}function ur(e,t){const n=fr(e),r={...Zn(n.search),...t};return n.search=er(r),gr(n)}function dr(e){return!e||e==="/"}function hr(e){return e&&e!=="/"}function pr(e,...t){let n=e||"";for(const r of t.filter(o=>hr(o)))if(n){const o=r.replace(sr,"");n=cr(n)+o}else n=r;return n}const Oe=Symbol.for("ufo:protocolRelative");function fr(e="",t){const n=e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);if(n){const[,h,p=""]=n;return{protocol:h.toLowerCase(),pathname:p,href:h+p,auth:"",host:"",search:"",hash:""}}if(!Le(e,{acceptRelative:!0}))return De(e);const[,r="",o,s=""]=e.replace(/\\/g,"/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/)||[],[,i="",a=""]=s.match(/([^#/?]*)(.*)?/)||[],{pathname:c,search:u,hash:l}=De(a.replace(/\/(?=[A-Za-z]:)/,""));return{protocol:r.toLowerCase(),auth:o?o.slice(0,Math.max(0,o.length-1)):"",host:i,pathname:c,search:u,hash:l,[Oe]:!r}}function De(e=""){const[t="",n="",r=""]=(e.match(/([^#?]*)(\?[^#]*)?(#.*)?/)||[]).splice(1);return{pathname:t,search:n,hash:r}}function gr(e){const t=e.pathname||"",n=e.search?(e.search.startsWith("?")?"":"?")+e.search:"",r=e.hash||"",o=e.auth?e.auth+"@":"",s=e.host||"";return(e.protocol||e[Oe]?(e.protocol||"")+"//":"")+o+s+t+n+r}class mr extends Error{constructor(t,n){super(t,n),this.name="FetchError",n!=null&&n.cause&&!this.cause&&(this.cause=n.cause)}}function yr(e){var c,u,l,h,p;const t=((c=e.error)==null?void 0:c.message)||((u=e.error)==null?void 0:u.toString())||"",n=((l=e.request)==null?void 0:l.method)||((h=e.options)==null?void 0:h.method)||"GET",r=((p=e.request)==null?void 0:p.url)||String(e.request)||"/",o=`[${n}] ${JSON.stringify(r)}`,s=e.response?`${e.response.status} ${e.response.statusText}`:"<no response>",i=`${o}: ${s}${t?` ${t}`:""}`,a=new mr(i,e.error?{cause:e.error}:void 0);for(const d of["request","options","response"])Object.defineProperty(a,d,{get(){return e[d]}});for(const[d,f]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(a,d,{get(){return e.response&&e.response[f]}});return a}const br=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function je(e="GET"){return br.has(e.toUpperCase())}function wr(e){if(e===void 0)return!1;const t=typeof e;return t==="string"||t==="number"||t==="boolean"||t===null?!0:t!=="object"?!1:Array.isArray(e)?!0:e.buffer?!1:e.constructor&&e.constructor.name==="Object"||typeof e.toJSON=="function"}const vr=new Set(["image/svg","application/xml","application/xhtml","application/html"]),xr=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function kr(e=""){if(!e)return"json";const t=e.split(";").shift()||"";return xr.test(t)?"json":vr.has(t)||t.startsWith("text/")?"text":"blob"}function Er(e,t,n=globalThis.Headers){const r={...t,...e};if(t!=null&&t.params&&(e!=null&&e.params)&&(r.params={...t==null?void 0:t.params,...e==null?void 0:e.params}),t!=null&&t.query&&(e!=null&&e.query)&&(r.query={...t==null?void 0:t.query,...e==null?void 0:e.query}),t!=null&&t.headers&&(e!=null&&e.headers)){r.headers=new n((t==null?void 0:t.headers)||{});for(const[o,s]of new n((e==null?void 0:e.headers)||{}))r.headers.set(o,s)}return r}const $r=new Set([408,409,425,429,500,502,503,504]),Cr=new Set([101,204,205,304]);function Fe(e={}){const{fetch:t=globalThis.fetch,Headers:n=globalThis.Headers,AbortController:r=globalThis.AbortController}=e;async function o(a){const c=a.error&&a.error.name==="AbortError"&&!a.options.timeout||!1;if(a.options.retry!==!1&&!c){let l;typeof a.options.retry=="number"?l=a.options.retry:l=je(a.options.method)?0:1;const h=a.response&&a.response.status||500;if(l>0&&(Array.isArray(a.options.retryStatusCodes)?a.options.retryStatusCodes.includes(h):$r.has(h))){const p=a.options.retryDelay||0;return p>0&&await new Promise(d=>setTimeout(d,p)),s(a.request,{...a.options,retry:l-1})}}const u=yr(a);throw Error.captureStackTrace&&Error.captureStackTrace(u,s),u}const s=async function(c,u={}){var d;const l={request:c,options:Er(u,e.defaults,n),response:void 0,error:void 0};l.options.method=(d=l.options.method)==null?void 0:d.toUpperCase(),l.options.onRequest&&await l.options.onRequest(l),typeof l.request=="string"&&(l.options.baseURL&&(l.request=lr(l.request,l.options.baseURL)),(l.options.query||l.options.params)&&(l.request=ur(l.request,{...l.options.params,...l.options.query}))),l.options.body&&je(l.options.method)&&(wr(l.options.body)?(l.options.body=typeof l.options.body=="string"?l.options.body:JSON.stringify(l.options.body),l.options.headers=new n(l.options.headers||{}),l.options.headers.has("content-type")||l.options.headers.set("content-type","application/json"),l.options.headers.has("accept")||l.options.headers.set("accept","application/json")):("pipeTo"in l.options.body&&typeof l.options.body.pipeTo=="function"||typeof l.options.body.pipe=="function")&&("duplex"in l.options||(l.options.duplex="half")));let h;if(!l.options.signal&&l.options.timeout){const f=new r;h=setTimeout(()=>f.abort(),l.options.timeout),l.options.signal=f.signal}try{l.response=await t(l.request,l.options)}catch(f){return l.error=f,l.options.onRequestError&&await l.options.onRequestError(l),await o(l)}finally{h&&clearTimeout(h)}if(l.response.body&&!Cr.has(l.response.status)&&l.options.method!=="HEAD"){const f=(l.options.parseResponse?"json":l.options.responseType)||kr(l.response.headers.get("content-type")||"");switch(f){case"json":{const b=await l.response.text(),$=l.options.parseResponse||jn;l.response._data=$(b);break}case"stream":{l.response._data=l.response.body;break}default:l.response._data=await l.response[f]()}}return l.options.onResponse&&await l.options.onResponse(l),!l.options.ignoreResponseError&&l.response.status>=400&&l.response.status<600?(l.options.onResponseError&&await l.options.onResponseError(l),await o(l)):l.response},i=async function(c,u){return(await s(c,u))._data};return i.raw=s,i.native=(...a)=>t(...a),i.create=(a={})=>Fe({...e,defaults:{...e.defaults,...a}}),i}const Yt=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),_r=Yt.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),Ar=Yt.Headers,Sr=Yt.AbortController,j=Fe({fetch:_r,Headers:Ar,AbortController:Sr});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pr=e=>e.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const He={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ve=e=>(...t)=>({_$litDirective$:e,values:t});class qe{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=(e,t)=>{var r;const n=e._$AN;if(n===void 0)return!1;for(const o of n)(r=o._$AO)==null||r.call(o,t,!1),pt(o,t);return!0},$t=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},Ye=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Nr(t)}};function Tr(e){this._$AN!==void 0?($t(this),this._$AM=e,Ye(this)):this._$AM=e}function Rr(e,t=!1,n=0){const r=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(r))for(let s=n;s<r.length;s++)pt(r[s],!1),$t(r[s]);else r!=null&&(pt(r,!1),$t(r));else pt(this,e)}const Nr=e=>{e.type==He.CHILD&&(e._$AP??(e._$AP=Rr),e._$AQ??(e._$AQ=Tr))};class Mr extends qe{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,r){super._$AT(t,n,r),Ye(this),this.isConnected=t._$AU}_$AO(t,n=!0){var r,o;t!==this.isConnected&&(this.isConnected=t,t?(r=this.reconnected)==null||r.call(this):(o=this.disconnected)==null||o.call(this)),n&&(pt(this,t),$t(this))}setValue(t){if(Pr(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=()=>new zr;class zr{}const Kt=new WeakMap,Qt=Ve(class extends Mr{render(e){return k}update(e,[t]){var r;const n=t!==this.Y;return n&&this.Y!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.Y=t,this.ht=(r=e.options)==null?void 0:r.host,this.rt(this.ct=e.element)),k}rt(e){if(this.isConnected||(e=void 0),typeof this.Y=="function"){const t=this.ht??globalThis;let n=Kt.get(t);n===void 0&&(n=new WeakMap,Kt.set(t,n)),n.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),n.set(this.Y,e),e!==void 0&&this.Y.call(this.ht,e)}else this.Y.value=e}get lt(){var e,t;return typeof this.Y=="function"?(e=Kt.get(this.ht??globalThis))==null?void 0:e.get(this.Y):(t=this.Y)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Br=Object.defineProperty,Ir=(e,t,n,r)=>{for(var o=void 0,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=i(t,n,o)||o);return o&&Br(t,n,o),o};const de=class de extends S{constructor(){super(),this.modalTitle="",this.modalBodyRef=Jt(),this.handleKeydown=t=>{const{key:n}=t;n==="Escape"&&(this.close(),t.preventDefault())},this.handleClickOutside=this.handleClickOutside.bind(this)}handleClickOutside(t){this.modalBodyRef.value&&!t.composedPath().includes(this.modalBodyRef.value)&&this.close()}render(){return E`
      <div class="relative z-[999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity fadeIn"
          aria-hidden="true"
          @click=${this.close}
        ></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto fadeInUp">
          <div class="flex min-h-full justify-center p-4 items-center">
            <div
              ${Qt(this.modalBodyRef)}
              class="relative transform overflow-hidden rounded-lg bg-modal shadow-xl transition-all my-8 w-full max-w-sm"
            >
              <div class="flex items-center justify-between border-b border-secondary px-4 py-3">
                <span class="text-title">${this.modalTitle}</span>
                <button
                  @click=${this.close}
                  class="inline-flex items-center justify-center p-1 hover:bg-secondary transition-all group rounded-full"
                >
                  <span
                    class="i-tabler-x inline-block size-4.5 text-title-subtle group-hover:text-title"
                  ></span>
                </button>
              </div>
              <div class="px-4 py-3">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}close(){this.dispatchEvent(new CustomEvent("close"))}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.handleKeydown),document.addEventListener("click",this.handleClickOutside,!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.handleKeydown),document.removeEventListener("click",this.handleClickOutside,!0)}};de.styles=[U(J),L`
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: icons */
.i-tabler-x{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1em;height:1em;}
/* layer: shortcuts */
.bg-modal{background-color:var(--halo-restrict-widget-modal-bg-color,#fff);}
.text-title,
.group:hover .group-hover\\:text-title{color:var(--halo-restrict-widget-title-color,#18181b);}
.text-title-subtle{color:var(--halo-restrict-widget-title-subtle-color,#52525b);}
/* layer: default */
.fixed{position:fixed;}
.relative{position:relative;}
.static{position:static;}
.inset-0{inset:0;}
.z-\\[999\\]{z-index:999;}
.z-10{z-index:10;}
.my-8{margin-top:2em;margin-bottom:2em;}
.block{display:block;}
.inline-block{display:inline-block;}
.size-4\\.5{width:1.125em;height:1.125em;}
.max-w-sm{max-width:24em;}
.min-h-full{min-height:100%;}
.w-full{width:100%;}
.w-screen{width:100vw;}
.flex{display:flex;}
.inline-flex{display:inline-flex;}
.transform{transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}
.items-center{align-items:center;}
.justify-center{justify-content:center;}
.justify-between{justify-content:space-between;}
.overflow-hidden{overflow:hidden;}
.overflow-y-auto{overflow-y:auto;}
.border-b{border-bottom-width:1px;}
.border-secondary{border-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.rounded-full{border-radius:9999px;}
.rounded-lg{border-radius:0.5em;}
.bg-gray-500{--un-bg-opacity:1;background-color:rgb(107 114 128 / var(--un-bg-opacity));}
.hover\\:bg-secondary:hover{background-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.bg-opacity-75{--un-bg-opacity:0.75;}
.p-1{padding:0.25em;}
.p-4{padding:1em;}
.px-4{padding-left:1em;padding-right:1em;}
.py-3{padding-top:0.75em;padding-bottom:0.75em;}
.shadow-xl{--un-shadow:var(--un-shadow-inset) 0 20px 25px -5px var(--un-shadow-color, rgb(0 0 0 / 0.1)),var(--un-shadow-inset) 0 8px 10px -6px var(--un-shadow-color, rgb(0 0 0 / 0.1));box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}
.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;};

      :host {
        display: block;
      }

      .fadeIn {
        animation: fadeIn 0.15s both;
      }

      .fadeInUp {
        animation: fadeInUp 0.3s both;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 2%, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
    `];let Ct=de;Ir([_({type:String,attribute:"modal-title"})],Ct.prototype,"modalTitle"),customElements.get("content-restrict-base-modal")||customElements.define("content-restrict-base-modal",Ct);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ur=Ve(class extends qe{constructor(e){var t;if(super(e),e.type!==He.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var r,o;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in t)t[s]&&!((r=this.nt)!=null&&r.has(s))&&this.st.add(s);return this.render(t)}const n=e.element.classList;for(const s of this.st)s in t||(n.remove(s),this.st.delete(s));for(const s in t){const i=!!t[s];i===this.st.has(s)||(o=this.nt)!=null&&o.has(s)||(i?(n.add(s),this.st.add(s)):(n.remove(s),this.st.delete(s)))}return G}});var Lr=Object.defineProperty,Je=(e,t,n,r)=>{for(var o=void 0,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=i(t,n,o)||o);return o&&Lr(t,n,o),o};const he=class he extends S{constructor(){super(...arguments),this.message="",this.type="success"}render(){return E`<div
      class="toast ${Ur({"toast--error":this.type==="error","toast--success":this.type==="success","toast--warn":this.type==="warn"})}"
    >
      ${this.type==="success"?E`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
              <path d="m9 12l2 2l4-4" />
            </g>
          </svg>`:E`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9-3v4m0 3v.01"
            />
          </svg>`} <span>${this.message}</span>
    </div>`}};he.styles=[U(J),L`
      .toast {
        border-radius: 0.4em;
        font-size: 0.875em;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 0.625em;
        justify-content: space-between;
        overflow: hidden;
        color: #fff;
        gap: 0.5em;
        box-shadow:
          0 0 #0000,
          0 0 #0000,
          0 1px 3px 0 rgb(0 0 0 / 0.1),
          0 1px 2px -1px rgb(0 0 0 / 0.1);

        animation: slideInDown 0.3s ease-out forwards;
      }

      .toast--exit {
        animation: slideOutUp 0.3s ease-in forwards;
      }

      .toast--error {
        background-color: #d71d1d;
      }

      .toast--success {
        background-color: #4ccba0;
      }

      .toast--warn {
        background-color: #f5a623;
      }

      @keyframes slideInDown {
        from {
          transform: translateY(0);
          opacity: 0;
        }
        to {
          transform: translateY(100%);
          opacity: 1;
        }
      }

      @keyframes slideOutUp {
        from {
          transform: translateY(100%);
          opacity: 1;
        }
        to {
          transform: translateY(0);
          opacity: 0;
        }
      }
    `];let tt=he;Je([_({type:String})],tt.prototype,"message"),Je([_({type:String})],tt.prototype,"type");const pe=class pe extends S{render(){return E`<slot></slot>`}};pe.styles=[U(J),L`
      :host {
        position: fixed;
        top: 1em;
        z-index: 1000;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5em;
      }
    `];let _t=pe;customElements.get("content-restrict-toast")||customElements.define("content-restrict-toast",tt),customElements.get("content-restrict-toast-container")||customElements.define("content-restrict-toast-container",_t);class ft{constructor(){this.body=document.body;const t=this.body.querySelector("content-restrict-toast-container");t?this.toastContainer=t:(this.toastContainer=new _t,this.body.appendChild(this.toastContainer))}show(t,n){const r=new tt;r.message=t,r.type=n,this.toastContainer.appendChild(r),setTimeout(()=>{r.classList.add("toast--exit"),setTimeout(()=>{var o;(o=this.toastContainer)==null||o.removeChild(r)},300)},3e3)}success(t){this.show(t,"success")}error(t){this.show(t,"error")}warn(t){this.show(t,"warn")}}var Or=Object.defineProperty,At=(e,t,n,r)=>{for(var o=void 0,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=i(t,n,o)||o);return o&&Or(t,n,o),o};const fe=class fe extends S{constructor(){super(...arguments),this.name="",this.kind="Post",this.answerLabel="",this.isSubmitting=!1,this.inputRef=Jt()}connectedCallback(){super.connectedCallback(),setTimeout(()=>{var t;(t=this.inputRef.value)==null||t.focus()},0)}render(){return E`<content-restrict-base-modal
      modal-title="本次访问需要验证口令"
      @close=${this.close}
    >
      <form class="space-y-4" @submit="${this.onSubmit}">
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pr-2">
            <i class="i-tabler-lock h-5 w-5 text-gray-400"></i>
          </div>
          <input
            ${Qt(this.inputRef)}
            type="text"
            name="password"
            required
            autofocus
            class="block w-full bg-transparent h-11 outline-none rounded-md border-0 py-2 pl-12 text-title ring-1 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder=${this.answerLabel}
          />
        </div>
        <button
          type="submit"
          .disabled=${this.isSubmitting}
          class="py-2 px-4 inline-flex h-10 items-center gap-x-2 text-sm font-medium rounded-lg border border-secondary bg-light text-title-subtle shadow-sm hover:brightness-105 disabled:opacity-50 disabled:pointer-events-none"
        >
          ${this.isSubmitting?E`
                <span
                  class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-primary rounded-full"
                  role="status"
                  aria-label="loading"
                ></span>
              `:""}
          提交
        </button>
      </form>
    </content-restrict-base-modal>`}async onSubmit(t){var s;this.isSubmitting=!0,t.preventDefault();const n=t.target,r=new FormData(n),o=Object.fromEntries(r.entries());try{await j("/apis/anonymous.post.restrict.halo.run/v1alpha1/answer/-/verify",{method:"post",credentials:"same-origin",body:{objMetadataName:this.name,kind:this.kind,answerVal:o.password}});const i=new URL(window.location.href);i.searchParams.set("random",Math.random().toString(36).substring(2)),window.location.href=i.toString()}catch{new ft().error("口令错误，请重试"),(s=this.inputRef.value)==null||s.focus()}finally{this.isSubmitting=!1}}close(){this.dispatchEvent(new CustomEvent("close"))}};fe.styles=[U(J),L`
      :host {
        display: inline-block;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: icons */
.i-tabler-lock{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z'/%3E%3Cpath d='M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-3-5V7a4 4 0 1 1 8 0v4'/%3E%3C/g%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1em;height:1em;}
/* layer: shortcuts */
.text-title{color:var(--halo-restrict-widget-title-color,#18181b);}
.text-title-subtle{color:var(--halo-restrict-widget-title-subtle-color,#52525b);}
/* layer: default */
.pointer-events-none{pointer-events:none;}
.disabled\\:pointer-events-none:disabled{pointer-events:none;}
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.inset-y-0{top:0;bottom:0;}
.left-0{left:0;}
.mt-2{margin-top:0.5em;}
.block{display:block;}
.inline-block{display:inline-block;}
.size-4{width:1em;height:1em;}
.h-10{height:2.5em;}
.h-11{height:2.75em;}
.h-5{height:1.25em;}
.w-5{width:1.25em;}
.w-full{width:100%;}
.flex{display:flex;}
.inline-flex{display:inline-flex;}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.animate-spin{animation:spin 1s linear infinite;}
.items-center{align-items:center;}
.gap-x-2{column-gap:0.5em;}
.space-y-4>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(1em * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(1em * var(--un-space-y-reverse));}
.border{border-width:1px;}
.border-\\[3px\\]{border-width:3px;}
.border-0{border-width:0px;}
.border-current{border-color:currentColor;}
.border-secondary{border-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.border-t-transparent{border-top-color:transparent;}
.rounded-full{border-radius:9999px;}
.rounded-lg{border-radius:0.5em;}
.rounded-md{border-radius:0.375em;}
.bg-light{background-color:var(--halo-restrict-widget-light-color,#f9fafb);}
.bg-transparent{background-color:transparent;}
.px-4{padding-left:1em;padding-right:1em;}
.py-2{padding-top:0.5em;padding-bottom:0.5em;}
.pl-12{padding-left:3em;}
.pl-3{padding-left:0.75em;}
.pr-2{padding-right:0.5em;}
.text-sm{font-size:0.875em;line-height:1.25em;}
.text-gray-400{--un-text-opacity:1;color:rgb(156 163 175 / var(--un-text-opacity));}
.text-primary{color:var(--halo-restrict-widget-primary-color,#2563eb);}
.placeholder\\:text-gray-400::placeholder{--un-text-opacity:1;color:rgb(156 163 175 / var(--un-text-opacity));}
.font-medium{font-weight:500;}
.disabled\\:opacity-50:disabled{opacity:0.5;}
.shadow-sm{--un-shadow:var(--un-shadow-inset) 0 1px 2px 0 var(--un-shadow-color, rgb(0 0 0 / 0.05));box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.outline-none{outline:2px solid transparent;outline-offset:2px;}
.ring-1{--un-ring-width:1px;--un-ring-offset-shadow:var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color);--un-ring-shadow:var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color);box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.focus\\:ring-2:focus{--un-ring-width:2px;--un-ring-offset-shadow:var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color);--un-ring-shadow:var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color);box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.ring-secondary{--un-ring-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.focus\\:ring-primary:focus{--un-ring-color:var(--halo-restrict-widget-primary-color,#2563eb);}
.ring-inset{--un-ring-inset:inset;}
.focus\\:ring-inset:focus{--un-ring-inset:inset;}
.hover\\:brightness-105:hover{--un-brightness:brightness(1.05);filter:var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia);}
@media (min-width: 640px){
.sm\\:text-sm{font-size:0.875em;line-height:1.25em;}
.sm\\:leading-6{line-height:1.5em;}
};
    `];let F=fe;At([_({type:String})],F.prototype,"name"),At([_({type:String})],F.prototype,"kind"),At([_({type:String,attribute:"answer-label"})],F.prototype,"answerLabel"),At([R()],F.prototype,"isSubmitting"),customElements.get("content-restrict-answer-modal")||customElements.define("content-restrict-answer-modal",F);function Dr(e,t,n){const r=new F;r.name=e,r.kind=t,r.answerLabel=n,document.body.appendChild(r),r.addEventListener("close",()=>{r.remove()})}const ge=class ge extends S{render(){return E` <div class="loading-block">
      <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle
          style="opacity: 0.25;"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          style="opacity: 0.75;"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        ></path>
      </svg>
    </div>`}};ge.styles=L`
    .loading-block {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1em;
    }

    svg {
      height: 1.25em;
      width: 1.25em;
      animation: spin 1s linear infinite;
      display: inline-flex;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;let Gt=ge;customElements.get("content-restrict-loading")||customElements.define("content-restrict-loading",Gt);var jr=Object.defineProperty,gt=(e,t,n,r)=>{for(var o=void 0,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=i(t,n,o)||o);return o&&jr(t,n,o),o};const me=class me extends S{constructor(){super(...arguments),this.name="",this.kind="Post",this.isSubmitting=!1,this.loading=!1,this.inputRef=Jt()}connectedCallback(){super.connectedCallback(),this.handleFetchMpSetting()}async handleFetchMpSetting(){this.loading=!0;try{const t=await j("/apis/anonymous.post.restrict.halo.run/v1alpha1/wechat/mp/setting",{params:{objMetadataName:this.name,kind:this.kind},credentials:"same-origin"});this.setting=typeof t=="string"?JSON.parse(t):t}catch{new ft().error("获取微信公众号配置失败，请检查配置")}finally{this.loading=!1,setTimeout(()=>{var t;(t=this.inputRef.value)==null||t.focus()},0)}}render(){var t,n,r;return E`
      <content-restrict-base-modal modal-title="本次访问需要微信公众号验证" @close=${this.close}>
        ${this.loading?E`<content-restrict-loading></content-restrict-loading>`:E`
              <div class="flex space-y-4 text-center justify-center items-center flex-col">
                <div class="text-red-500">
                  微信扫码，发送：<span class="text-indigo-500 font-semibold select-all">
                    ${(t=this.setting)==null?void 0:t.code}
                  </span>
                  获取验证码
                </div>

                <img src=${((n=this.setting)==null?void 0:n.qrImg)||""} class="w-40 h-40" />

                <span class="text-title-subtle text-sm">${(r=this.setting)==null?void 0:r.name}</span>

                <form
                  class="space-y-4 mt-1 border-t border-secondary w-full items-start text-left"
                  @submit="${this.onSubmit}"
                >
                  <div class="relative mt-3 rounded-md shadow-sm">
                    <div
                      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pr-2"
                    >
                      <i class="i-tabler-lock h-5 w-5 text-gray-400"></i>
                    </div>
                    <input
                      ${Qt(this.inputRef)}
                      type="text"
                      name="password"
                      required
                      autofocus
                      class="block w-full bg-transparent h-11 outline-none rounded-md border-0 py-2 pl-12 text-title ring-1 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      placeholder="请输入验证码"
                    />
                  </div>
                  <button
                    type="submit"
                    .disabled=${this.isSubmitting}
                    class="py-2 px-4 inline-flex h-10 items-center gap-x-2 text-sm font-medium rounded-lg border border-secondary bg-light text-title-subtle shadow-sm hover:brightness-105 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    ${this.isSubmitting?E`
                          <span
                            class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-primary rounded-full"
                            role="status"
                            aria-label="loading"
                          ></span>
                        `:""}
                    提交
                  </button>
                </form>
              </div>
            `}
      </content-restrict-base-modal>
    `}async onSubmit(t){var s;this.isSubmitting=!0,t.preventDefault();const n=t.target,r=new FormData(n),o=Object.fromEntries(r.entries());try{await j("/apis/anonymous.post.restrict.halo.run/v1alpha1/wechat/mp/verify",{method:"post",body:{code:o.password},credentials:"same-origin"});const i=new URL(window.location.href);i.searchParams.set("random",Math.random().toString(36).substring(2)),window.location.href=i.toString()}catch{new ft().error("验证码有误，请重试"),(s=this.inputRef.value)==null||s.focus()}finally{this.isSubmitting=!1}}close(){this.dispatchEvent(new CustomEvent("close"))}};me.styles=[U(J),L`
      :host {
        display: block;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: icons */
.i-tabler-lock{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z'/%3E%3Cpath d='M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-3-5V7a4 4 0 1 1 8 0v4'/%3E%3C/g%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1em;height:1em;}
/* layer: shortcuts */
.text-title{color:var(--halo-restrict-widget-title-color,#18181b);}
.text-title-subtle{color:var(--halo-restrict-widget-title-subtle-color,#52525b);}
/* layer: default */
.pointer-events-none{pointer-events:none;}
.disabled\\:pointer-events-none:disabled{pointer-events:none;}
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.inset-y-0{top:0;bottom:0;}
.left-0{left:0;}
.mt-1{margin-top:0.25em;}
.mt-3{margin-top:0.75em;}
.block{display:block;}
.inline-block{display:inline-block;}
.size-4{width:1em;height:1em;}
.h-10{height:2.5em;}
.h-11{height:2.75em;}
.h-40{height:10em;}
.h-5{height:1.25em;}
.w-40{width:10em;}
.w-5{width:1.25em;}
.w-full{width:100%;}
.flex{display:flex;}
.inline-flex{display:inline-flex;}
.flex-col{flex-direction:column;}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.animate-spin{animation:spin 1s linear infinite;}
.select-all{-webkit-user-select:all;user-select:all;}
.items-start{align-items:flex-start;}
.items-center{align-items:center;}
.justify-center{justify-content:center;}
.gap-x-2{column-gap:0.5em;}
.space-y-4>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(1em * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(1em * var(--un-space-y-reverse));}
.border{border-width:1px;}
.border-\\[3px\\]{border-width:3px;}
.border-0{border-width:0px;}
.border-t{border-top-width:1px;}
.border-current{border-color:currentColor;}
.border-secondary{border-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.border-t-transparent{border-top-color:transparent;}
.rounded-full{border-radius:9999px;}
.rounded-lg{border-radius:0.5em;}
.rounded-md{border-radius:0.375em;}
.bg-light{background-color:var(--halo-restrict-widget-light-color,#f9fafb);}
.bg-transparent{background-color:transparent;}
.px-4{padding-left:1em;padding-right:1em;}
.py-2{padding-top:0.5em;padding-bottom:0.5em;}
.pl-12{padding-left:3em;}
.pl-3{padding-left:0.75em;}
.pr-2{padding-right:0.5em;}
.text-center{text-align:center;}
.text-left{text-align:left;}
.text-sm{font-size:0.875em;line-height:1.25em;}
.text-gray-400{--un-text-opacity:1;color:rgb(156 163 175 / var(--un-text-opacity));}
.text-indigo-500{--un-text-opacity:1;color:rgb(99 102 241 / var(--un-text-opacity));}
.text-primary{color:var(--halo-restrict-widget-primary-color,#2563eb);}
.text-red-500{--un-text-opacity:1;color:rgb(239 68 68 / var(--un-text-opacity));}
.placeholder\\:text-gray-400::placeholder{--un-text-opacity:1;color:rgb(156 163 175 / var(--un-text-opacity));}
.font-medium{font-weight:500;}
.font-semibold{font-weight:600;}
.disabled\\:opacity-50:disabled{opacity:0.5;}
.shadow-sm{--un-shadow:var(--un-shadow-inset) 0 1px 2px 0 var(--un-shadow-color, rgb(0 0 0 / 0.05));box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.outline-none{outline:2px solid transparent;outline-offset:2px;}
.ring-1{--un-ring-width:1px;--un-ring-offset-shadow:var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color);--un-ring-shadow:var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color);box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.focus\\:ring-2:focus{--un-ring-width:2px;--un-ring-offset-shadow:var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color);--un-ring-shadow:var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color);box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.ring-secondary{--un-ring-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.focus\\:ring-primary:focus{--un-ring-color:var(--halo-restrict-widget-primary-color,#2563eb);}
.ring-inset{--un-ring-inset:inset;}
.focus\\:ring-inset:focus{--un-ring-inset:inset;}
.hover\\:brightness-105:hover{--un-brightness:brightness(1.05);filter:var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia);}
@media (min-width: 640px){
.sm\\:text-sm{font-size:0.875em;line-height:1.25em;}
.sm\\:leading-6{line-height:1.5em;}
};
    `];let B=me;gt([_({type:String})],B.prototype,"name"),gt([_({type:String})],B.prototype,"kind"),gt([R()],B.prototype,"isSubmitting"),gt([R()],B.prototype,"setting"),gt([R()],B.prototype,"loading"),customElements.get("content-restrict-mp-modal")||customElements.define("content-restrict-mp-modal",B);function Fr(e,t){const n=new B;n.name=e,n.kind=t,document.body.appendChild(n),n.addEventListener("close",()=>{n.remove()})}var Hr=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Ke={},A={};let Wt;const Vr=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];A.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17},A.getSymbolTotalCodewords=function(t){return Vr[t]},A.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t},A.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');Wt=t},A.isKanjiModeEnabled=function(){return typeof Wt<"u"},A.toSJIS=function(t){return Wt(t)};var St={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+n)}}e.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},e.from=function(r,o){if(e.isValid(r))return r;try{return t(r)}catch{return o}}})(St);function Qe(){this.buffer=[],this.length=0}Qe.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var qr=Qe;function mt(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}mt.prototype.set=function(e,t,n,r){const o=e*this.size+t;this.data[o]=n,r&&(this.reservedBit[o]=!0)},mt.prototype.get=function(e,t){return this.data[e*this.size+t]},mt.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},mt.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var Yr=mt,Ge={};(function(e){const t=A.getSymbolSize;e.getRowColCoords=function(r){if(r===1)return[];const o=Math.floor(r/7)+2,s=t(r),i=s===145?26:Math.ceil((s-13)/(2*o-2))*2,a=[s-7];for(let c=1;c<o-1;c++)a[c]=a[c-1]-i;return a.push(6),a.reverse()},e.getPositions=function(r){const o=[],s=e.getRowColCoords(r),i=s.length;for(let a=0;a<i;a++)for(let c=0;c<i;c++)a===0&&c===0||a===0&&c===i-1||a===i-1&&c===0||o.push([s[a],s[c]]);return o}})(Ge);var We={};const Jr=A.getSymbolSize,Xe=7;We.getPositions=function(t){const n=Jr(t);return[[0,0],[n-Xe,0],[0,n-Xe]]};var Ze={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},e.from=function(o){return e.isValid(o)?parseInt(o,10):void 0},e.getPenaltyN1=function(o){const s=o.size;let i=0,a=0,c=0,u=null,l=null;for(let h=0;h<s;h++){a=c=0,u=l=null;for(let p=0;p<s;p++){let d=o.get(h,p);d===u?a++:(a>=5&&(i+=t.N1+(a-5)),u=d,a=1),d=o.get(p,h),d===l?c++:(c>=5&&(i+=t.N1+(c-5)),l=d,c=1)}a>=5&&(i+=t.N1+(a-5)),c>=5&&(i+=t.N1+(c-5))}return i},e.getPenaltyN2=function(o){const s=o.size;let i=0;for(let a=0;a<s-1;a++)for(let c=0;c<s-1;c++){const u=o.get(a,c)+o.get(a,c+1)+o.get(a+1,c)+o.get(a+1,c+1);(u===4||u===0)&&i++}return i*t.N2},e.getPenaltyN3=function(o){const s=o.size;let i=0,a=0,c=0;for(let u=0;u<s;u++){a=c=0;for(let l=0;l<s;l++)a=a<<1&2047|o.get(u,l),l>=10&&(a===1488||a===93)&&i++,c=c<<1&2047|o.get(l,u),l>=10&&(c===1488||c===93)&&i++}return i*t.N3},e.getPenaltyN4=function(o){let s=0;const i=o.data.length;for(let c=0;c<i;c++)s+=o.data[c];return Math.abs(Math.ceil(s*100/i/5)-10)*t.N4};function n(r,o,s){switch(r){case e.Patterns.PATTERN000:return(o+s)%2===0;case e.Patterns.PATTERN001:return o%2===0;case e.Patterns.PATTERN010:return s%3===0;case e.Patterns.PATTERN011:return(o+s)%3===0;case e.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(s/3))%2===0;case e.Patterns.PATTERN101:return o*s%2+o*s%3===0;case e.Patterns.PATTERN110:return(o*s%2+o*s%3)%2===0;case e.Patterns.PATTERN111:return(o*s%3+(o+s)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}e.applyMask=function(o,s){const i=s.size;for(let a=0;a<i;a++)for(let c=0;c<i;c++)s.isReserved(c,a)||s.xor(c,a,n(o,c,a))},e.getBestMask=function(o,s){const i=Object.keys(e.Patterns).length;let a=0,c=1/0;for(let u=0;u<i;u++){s(u),e.applyMask(u,o);const l=e.getPenaltyN1(o)+e.getPenaltyN2(o)+e.getPenaltyN3(o)+e.getPenaltyN4(o);e.applyMask(u,o),l<c&&(c=l,a=u)}return a}})(Ze);var Pt={};const H=St,Tt=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Rt=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Pt.getBlocksCount=function(t,n){switch(n){case H.L:return Tt[(t-1)*4+0];case H.M:return Tt[(t-1)*4+1];case H.Q:return Tt[(t-1)*4+2];case H.H:return Tt[(t-1)*4+3];default:return}},Pt.getTotalCodewordsCount=function(t,n){switch(n){case H.L:return Rt[(t-1)*4+0];case H.M:return Rt[(t-1)*4+1];case H.Q:return Rt[(t-1)*4+2];case H.H:return Rt[(t-1)*4+3];default:return}};var tn={},Nt={};const yt=new Uint8Array(512),Mt=new Uint8Array(256);(function(){let t=1;for(let n=0;n<255;n++)yt[n]=t,Mt[t]=n,t<<=1,t&256&&(t^=285);for(let n=255;n<512;n++)yt[n]=yt[n-255]})(),Nt.log=function(t){if(t<1)throw new Error("log("+t+")");return Mt[t]},Nt.exp=function(t){return yt[t]},Nt.mul=function(t,n){return t===0||n===0?0:yt[Mt[t]+Mt[n]]},function(e){const t=Nt;e.mul=function(r,o){const s=new Uint8Array(r.length+o.length-1);for(let i=0;i<r.length;i++)for(let a=0;a<o.length;a++)s[i+a]^=t.mul(r[i],o[a]);return s},e.mod=function(r,o){let s=new Uint8Array(r);for(;s.length-o.length>=0;){const i=s[0];for(let c=0;c<o.length;c++)s[c]^=t.mul(o[c],i);let a=0;for(;a<s.length&&s[a]===0;)a++;s=s.slice(a)}return s},e.generateECPolynomial=function(r){let o=new Uint8Array([1]);for(let s=0;s<r;s++)o=e.mul(o,new Uint8Array([1,t.exp(s)]));return o}}(tn);const en=tn;function Xt(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}Xt.prototype.initialize=function(t){this.degree=t,this.genPoly=en.generateECPolynomial(this.degree)},Xt.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(t.length+this.degree);n.set(t);const r=en.mod(n,this.genPoly),o=this.degree-r.length;if(o>0){const s=new Uint8Array(this.degree);return s.set(r,o),s}return r};var Kr=Xt,nn={},V={},Zt={};Zt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var N={};const rn="[0-9]+",Qr="[A-Z $%*+\\-./:]+";let bt="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";bt=bt.replace(/u/g,"\\u");const Gr="(?:(?![A-Z0-9 $%*+\\-./:]|"+bt+`)(?:.|[\r
]))+`;N.KANJI=new RegExp(bt,"g"),N.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),N.BYTE=new RegExp(Gr,"g"),N.NUMERIC=new RegExp(rn,"g"),N.ALPHANUMERIC=new RegExp(Qr,"g");const Wr=new RegExp("^"+bt+"$"),Xr=new RegExp("^"+rn+"$"),Zr=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");N.testKanji=function(t){return Wr.test(t)},N.testNumeric=function(t){return Xr.test(t)},N.testAlphanumeric=function(t){return Zr.test(t)},function(e){const t=Zt,n=N;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(s,i){if(!s.ccBits)throw new Error("Invalid mode: "+s);if(!t.isValid(i))throw new Error("Invalid version: "+i);return i>=1&&i<10?s.ccBits[0]:i<27?s.ccBits[1]:s.ccBits[2]},e.getBestModeForData=function(s){return n.testNumeric(s)?e.NUMERIC:n.testAlphanumeric(s)?e.ALPHANUMERIC:n.testKanji(s)?e.KANJI:e.BYTE},e.toString=function(s){if(s&&s.id)return s.id;throw new Error("Invalid mode")},e.isValid=function(s){return s&&s.bit&&s.ccBits};function r(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+o)}}e.from=function(s,i){if(e.isValid(s))return s;try{return r(s)}catch{return i}}}(V),function(e){const t=A,n=Pt,r=St,o=V,s=Zt,i=7973,a=t.getBCHDigit(i);function c(p,d,f){for(let b=1;b<=40;b++)if(d<=e.getCapacity(b,f,p))return b}function u(p,d){return o.getCharCountIndicator(p,d)+4}function l(p,d){let f=0;return p.forEach(function(b){const $=u(b.mode,d);f+=$+b.getBitsLength()}),f}function h(p,d){for(let f=1;f<=40;f++)if(l(p,f)<=e.getCapacity(f,d,o.MIXED))return f}e.from=function(d,f){return s.isValid(d)?parseInt(d,10):f},e.getCapacity=function(d,f,b){if(!s.isValid(d))throw new Error("Invalid QR Code version");typeof b>"u"&&(b=o.BYTE);const $=t.getSymbolTotalCodewords(d),y=n.getTotalCodewordsCount(d,f),w=($-y)*8;if(b===o.MIXED)return w;const m=w-u(b,d);switch(b){case o.NUMERIC:return Math.floor(m/10*3);case o.ALPHANUMERIC:return Math.floor(m/11*2);case o.KANJI:return Math.floor(m/13);case o.BYTE:default:return Math.floor(m/8)}},e.getBestVersionForData=function(d,f){let b;const $=r.from(f,r.M);if(Array.isArray(d)){if(d.length>1)return h(d,$);if(d.length===0)return 1;b=d[0]}else b=d;return c(b.mode,b.getLength(),$)},e.getEncodedBits=function(d){if(!s.isValid(d)||d<7)throw new Error("Invalid QR Code version");let f=d<<12;for(;t.getBCHDigit(f)-a>=0;)f^=i<<t.getBCHDigit(f)-a;return d<<12|f}}(nn);var on={};const te=A,sn=1335,to=21522,an=te.getBCHDigit(sn);on.getEncodedBits=function(t,n){const r=t.bit<<3|n;let o=r<<10;for(;te.getBCHDigit(o)-an>=0;)o^=sn<<te.getBCHDigit(o)-an;return(r<<10|o)^to};var cn={};const eo=V;function et(e){this.mode=eo.NUMERIC,this.data=e.toString()}et.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},et.prototype.getLength=function(){return this.data.length},et.prototype.getBitsLength=function(){return et.getBitsLength(this.data.length)},et.prototype.write=function(t){let n,r,o;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),o=parseInt(r,10),t.put(o,10);const s=this.data.length-n;s>0&&(r=this.data.substr(n),o=parseInt(r,10),t.put(o,s*3+1))};var no=et;const ro=V,ee=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function nt(e){this.mode=ro.ALPHANUMERIC,this.data=e}nt.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},nt.prototype.getLength=function(){return this.data.length},nt.prototype.getBitsLength=function(){return nt.getBitsLength(this.data.length)},nt.prototype.write=function(t){let n;for(n=0;n+2<=this.data.length;n+=2){let r=ee.indexOf(this.data[n])*45;r+=ee.indexOf(this.data[n+1]),t.put(r,11)}this.data.length%2&&t.put(ee.indexOf(this.data[n]),6)};var oo=nt,so=function(t){for(var n=[],r=t.length,o=0;o<r;o++){var s=t.charCodeAt(o);if(s>=55296&&s<=56319&&r>o+1){var i=t.charCodeAt(o+1);i>=56320&&i<=57343&&(s=(s-55296)*1024+i-56320+65536,o+=1)}if(s<128){n.push(s);continue}if(s<2048){n.push(s>>6|192),n.push(s&63|128);continue}if(s<55296||s>=57344&&s<65536){n.push(s>>12|224),n.push(s>>6&63|128),n.push(s&63|128);continue}if(s>=65536&&s<=1114111){n.push(s>>18|240),n.push(s>>12&63|128),n.push(s>>6&63|128),n.push(s&63|128);continue}n.push(239,191,189)}return new Uint8Array(n).buffer};const io=so,ao=V;function rt(e){this.mode=ao.BYTE,typeof e=="string"&&(e=io(e)),this.data=new Uint8Array(e)}rt.getBitsLength=function(t){return t*8},rt.prototype.getLength=function(){return this.data.length},rt.prototype.getBitsLength=function(){return rt.getBitsLength(this.data.length)},rt.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)};var co=rt;const lo=V,uo=A;function ot(e){this.mode=lo.KANJI,this.data=e}ot.getBitsLength=function(t){return t*13},ot.prototype.getLength=function(){return this.data.length},ot.prototype.getBitsLength=function(){return ot.getBitsLength(this.data.length)},ot.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=uo.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),e.put(n,13)}};var ho=ot,ln={exports:{}};(function(e){var t={single_source_shortest_paths:function(n,r,o){var s={},i={};i[r]=0;var a=t.PriorityQueue.make();a.push(r,0);for(var c,u,l,h,p,d,f,b,$;!a.empty();){c=a.pop(),u=c.value,h=c.cost,p=n[u]||{};for(l in p)p.hasOwnProperty(l)&&(d=p[l],f=h+d,b=i[l],$=typeof i[l]>"u",($||b>f)&&(i[l]=f,a.push(l,f),s[l]=u))}if(typeof o<"u"&&typeof i[o]>"u"){var y=["Could not find a path from ",r," to ",o,"."].join("");throw new Error(y)}return s},extract_shortest_path_from_predecessor_list:function(n,r){for(var o=[],s=r;s;)o.push(s),n[s],s=n[s];return o.reverse(),o},find_path:function(n,r,o){var s=t.single_source_shortest_paths(n,r,o);return t.extract_shortest_path_from_predecessor_list(s,o)},PriorityQueue:{make:function(n){var r=t.PriorityQueue,o={},s;n=n||{};for(s in r)r.hasOwnProperty(s)&&(o[s]=r[s]);return o.queue=[],o.sorter=n.sorter||r.default_sorter,o},default_sorter:function(n,r){return n.cost-r.cost},push:function(n,r){var o={value:n,cost:r};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(ln);var po=ln.exports;(function(e){const t=V,n=no,r=oo,o=co,s=ho,i=N,a=A,c=po;function u(y){return unescape(encodeURIComponent(y)).length}function l(y,w,m){const g=[];let v;for(;(v=y.exec(m))!==null;)g.push({data:v[0],index:v.index,mode:w,length:v[0].length});return g}function h(y){const w=l(i.NUMERIC,t.NUMERIC,y),m=l(i.ALPHANUMERIC,t.ALPHANUMERIC,y);let g,v;return a.isKanjiModeEnabled()?(g=l(i.BYTE,t.BYTE,y),v=l(i.KANJI,t.KANJI,y)):(g=l(i.BYTE_KANJI,t.BYTE,y),v=[]),w.concat(m,g,v).sort(function(C,T){return C.index-T.index}).map(function(C){return{data:C.data,mode:C.mode,length:C.length}})}function p(y,w){switch(w){case t.NUMERIC:return n.getBitsLength(y);case t.ALPHANUMERIC:return r.getBitsLength(y);case t.KANJI:return s.getBitsLength(y);case t.BYTE:return o.getBitsLength(y)}}function d(y){return y.reduce(function(w,m){const g=w.length-1>=0?w[w.length-1]:null;return g&&g.mode===m.mode?(w[w.length-1].data+=m.data,w):(w.push(m),w)},[])}function f(y){const w=[];for(let m=0;m<y.length;m++){const g=y[m];switch(g.mode){case t.NUMERIC:w.push([g,{data:g.data,mode:t.ALPHANUMERIC,length:g.length},{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.ALPHANUMERIC:w.push([g,{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.KANJI:w.push([g,{data:g.data,mode:t.BYTE,length:u(g.data)}]);break;case t.BYTE:w.push([{data:g.data,mode:t.BYTE,length:u(g.data)}])}}return w}function b(y,w){const m={},g={start:{}};let v=["start"];for(let x=0;x<y.length;x++){const C=y[x],T=[];for(let Y=0;Y<C.length;Y++){const z=C[Y],wt=""+x+Y;T.push(wt),m[wt]={node:z,lastCount:0},g[wt]={};for(let we=0;we<v.length;we++){const I=v[we];m[I]&&m[I].node.mode===z.mode?(g[I][wt]=p(m[I].lastCount+z.length,z.mode)-p(m[I].lastCount,z.mode),m[I].lastCount+=z.length):(m[I]&&(m[I].lastCount=z.length),g[I][wt]=p(z.length,z.mode)+4+t.getCharCountIndicator(z.mode,w))}}v=T}for(let x=0;x<v.length;x++)g[v[x]].end=0;return{map:g,table:m}}function $(y,w){let m;const g=t.getBestModeForData(y);if(m=t.from(w,g),m!==t.BYTE&&m.bit<g.bit)throw new Error('"'+y+'" cannot be encoded with mode '+t.toString(m)+`.
 Suggested mode is: `+t.toString(g));switch(m===t.KANJI&&!a.isKanjiModeEnabled()&&(m=t.BYTE),m){case t.NUMERIC:return new n(y);case t.ALPHANUMERIC:return new r(y);case t.KANJI:return new s(y);case t.BYTE:return new o(y)}}e.fromArray=function(w){return w.reduce(function(m,g){return typeof g=="string"?m.push($(g,null)):g.data&&m.push($(g.data,g.mode)),m},[])},e.fromString=function(w,m){const g=h(w,a.isKanjiModeEnabled()),v=f(g),x=b(v,m),C=c.find_path(x.map,"start","end"),T=[];for(let Y=1;Y<C.length-1;Y++)T.push(x.table[C[Y]].node);return e.fromArray(d(T))},e.rawSplit=function(w){return e.fromArray(h(w,a.isKanjiModeEnabled()))}})(cn);const zt=A,ne=St,fo=qr,go=Yr,mo=Ge,yo=We,re=Ze,oe=Pt,bo=Kr,Bt=nn,wo=on,vo=V,se=cn;function xo(e,t){const n=e.size,r=yo.getPositions(t);for(let o=0;o<r.length;o++){const s=r[o][0],i=r[o][1];for(let a=-1;a<=7;a++)if(!(s+a<=-1||n<=s+a))for(let c=-1;c<=7;c++)i+c<=-1||n<=i+c||(a>=0&&a<=6&&(c===0||c===6)||c>=0&&c<=6&&(a===0||a===6)||a>=2&&a<=4&&c>=2&&c<=4?e.set(s+a,i+c,!0,!0):e.set(s+a,i+c,!1,!0))}}function ko(e){const t=e.size;for(let n=8;n<t-8;n++){const r=n%2===0;e.set(n,6,r,!0),e.set(6,n,r,!0)}}function Eo(e,t){const n=mo.getPositions(t);for(let r=0;r<n.length;r++){const o=n[r][0],s=n[r][1];for(let i=-2;i<=2;i++)for(let a=-2;a<=2;a++)i===-2||i===2||a===-2||a===2||i===0&&a===0?e.set(o+i,s+a,!0,!0):e.set(o+i,s+a,!1,!0)}}function $o(e,t){const n=e.size,r=Bt.getEncodedBits(t);let o,s,i;for(let a=0;a<18;a++)o=Math.floor(a/3),s=a%3+n-8-3,i=(r>>a&1)===1,e.set(o,s,i,!0),e.set(s,o,i,!0)}function ie(e,t,n){const r=e.size,o=wo.getEncodedBits(t,n);let s,i;for(s=0;s<15;s++)i=(o>>s&1)===1,s<6?e.set(s,8,i,!0):s<8?e.set(s+1,8,i,!0):e.set(r-15+s,8,i,!0),s<8?e.set(8,r-s-1,i,!0):s<9?e.set(8,15-s-1+1,i,!0):e.set(8,15-s-1,i,!0);e.set(r-8,8,1,!0)}function Co(e,t){const n=e.size;let r=-1,o=n-1,s=7,i=0;for(let a=n-1;a>0;a-=2)for(a===6&&a--;;){for(let c=0;c<2;c++)if(!e.isReserved(o,a-c)){let u=!1;i<t.length&&(u=(t[i]>>>s&1)===1),e.set(o,a-c,u),s--,s===-1&&(i++,s=7)}if(o+=r,o<0||n<=o){o-=r,r=-r;break}}}function _o(e,t,n){const r=new fo;n.forEach(function(c){r.put(c.mode.bit,4),r.put(c.getLength(),vo.getCharCountIndicator(c.mode,e)),c.write(r)});const o=zt.getSymbolTotalCodewords(e),s=oe.getTotalCodewordsCount(e,t),i=(o-s)*8;for(r.getLengthInBits()+4<=i&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const a=(i-r.getLengthInBits())/8;for(let c=0;c<a;c++)r.put(c%2?17:236,8);return Ao(r,e,t)}function Ao(e,t,n){const r=zt.getSymbolTotalCodewords(t),o=oe.getTotalCodewordsCount(t,n),s=r-o,i=oe.getBlocksCount(t,n),a=r%i,c=i-a,u=Math.floor(r/i),l=Math.floor(s/i),h=l+1,p=u-l,d=new bo(p);let f=0;const b=new Array(i),$=new Array(i);let y=0;const w=new Uint8Array(e.buffer);for(let C=0;C<i;C++){const T=C<c?l:h;b[C]=w.slice(f,f+T),$[C]=d.encode(b[C]),f+=T,y=Math.max(y,T)}const m=new Uint8Array(r);let g=0,v,x;for(v=0;v<y;v++)for(x=0;x<i;x++)v<b[x].length&&(m[g++]=b[x][v]);for(v=0;v<p;v++)for(x=0;x<i;x++)m[g++]=$[x][v];return m}function So(e,t,n,r){let o;if(Array.isArray(e))o=se.fromArray(e);else if(typeof e=="string"){let u=t;if(!u){const l=se.rawSplit(e);u=Bt.getBestVersionForData(l,n)}o=se.fromString(e,u||40)}else throw new Error("Invalid data");const s=Bt.getBestVersionForData(o,n);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=s;else if(t<s)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+s+`.
`);const i=_o(t,n,o),a=zt.getSymbolSize(t),c=new go(a);return xo(c,t),ko(c),Eo(c,t),ie(c,n,0),t>=7&&$o(c,t),Co(c,i),isNaN(r)&&(r=re.getBestMask(c,ie.bind(null,c,n))),re.applyMask(r,c),ie(c,n,r),{modules:c,version:t,errorCorrectionLevel:n,maskPattern:r,segments:o}}Ke.create=function(t,n){if(typeof t>"u"||t==="")throw new Error("No input text");let r=ne.M,o,s;return typeof n<"u"&&(r=ne.from(n.errorCorrectionLevel,ne.M),o=Bt.from(n.version),s=re.from(n.maskPattern),n.toSJISFunc&&zt.setToSJISFunction(n.toSJISFunc)),So(t,o,r,s)};var un={},ae={};(function(e){function t(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let r=n.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+n);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(s){return[s,s]}))),r.length===6&&r.push("F","F");const o=parseInt(r.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+r.slice(0,6).join("")}}e.getOptions=function(r){r||(r={}),r.color||(r.color={});const o=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,s=r.width&&r.width>=21?r.width:void 0,i=r.scale||4;return{width:s,scale:s?4:i,margin:o,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},e.getScale=function(r,o){return o.width&&o.width>=r+o.margin*2?o.width/(r+o.margin*2):o.scale},e.getImageWidth=function(r,o){const s=e.getScale(r,o);return Math.floor((r+o.margin*2)*s)},e.qrToImageData=function(r,o,s){const i=o.modules.size,a=o.modules.data,c=e.getScale(i,s),u=Math.floor((i+s.margin*2)*c),l=s.margin*c,h=[s.color.light,s.color.dark];for(let p=0;p<u;p++)for(let d=0;d<u;d++){let f=(p*u+d)*4,b=s.color.light;if(p>=l&&d>=l&&p<u-l&&d<u-l){const $=Math.floor((p-l)/c),y=Math.floor((d-l)/c);b=h[a[$*i+y]?1:0]}r[f++]=b.r,r[f++]=b.g,r[f++]=b.b,r[f]=b.a}}})(ae),function(e){const t=ae;function n(o,s,i){o.clearRect(0,0,s.width,s.height),s.style||(s.style={}),s.height=i,s.width=i,s.style.height=i+"px",s.style.width=i+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(s,i,a){let c=a,u=i;typeof c>"u"&&(!i||!i.getContext)&&(c=i,i=void 0),i||(u=r()),c=t.getOptions(c);const l=t.getImageWidth(s.modules.size,c),h=u.getContext("2d"),p=h.createImageData(l,l);return t.qrToImageData(p.data,s,c),n(h,u,l),h.putImageData(p,0,0),u},e.renderToDataURL=function(s,i,a){let c=a;typeof c>"u"&&(!i||!i.getContext)&&(c=i,i=void 0),c||(c={});const u=e.render(s,i,c),l=c.type||"image/png",h=c.rendererOpts||{};return u.toDataURL(l,h.quality)}}(un);var dn={};const Po=ae;function hn(e,t){const n=e.a/255,r=t+'="'+e.hex+'"';return n<1?r+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function ce(e,t,n){let r=e+t;return typeof n<"u"&&(r+=" "+n),r}function To(e,t,n){let r="",o=0,s=!1,i=0;for(let a=0;a<e.length;a++){const c=Math.floor(a%t),u=Math.floor(a/t);!c&&!s&&(s=!0),e[a]?(i++,a>0&&c>0&&e[a-1]||(r+=s?ce("M",c+n,.5+u+n):ce("m",o,0),o=0,s=!1),c+1<t&&e[a+1]||(r+=ce("h",i),i=0)):o++}return r}dn.render=function(t,n,r){const o=Po.getOptions(n),s=t.modules.size,i=t.modules.data,a=s+o.margin*2,c=o.color.light.a?"<path "+hn(o.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",u="<path "+hn(o.color.dark,"stroke")+' d="'+To(i,s,o.margin)+'"/>',l='viewBox="0 0 '+a+" "+a+'"',p='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+l+' shape-rendering="crispEdges">'+c+u+`</svg>
`;return typeof r=="function"&&r(null,p),p};const Ro=Hr,le=Ke,pn=un,No=dn;function ue(e,t,n,r,o){const s=[].slice.call(arguments,1),i=s.length,a=typeof s[i-1]=="function";if(!a&&!Ro())throw new Error("Callback required as last argument");if(a){if(i<2)throw new Error("Too few arguments provided");i===2?(o=n,n=t,t=r=void 0):i===3&&(t.getContext&&typeof o>"u"?(o=r,r=void 0):(o=r,r=n,n=t,t=void 0))}else{if(i<1)throw new Error("Too few arguments provided");return i===1?(n=t,t=r=void 0):i===2&&!t.getContext&&(r=n,n=t,t=void 0),new Promise(function(c,u){try{const l=le.create(n,r);c(e(l,t,r))}catch(l){u(l)}})}try{const c=le.create(n,r);o(null,e(c,t,r))}catch(c){o(c)}}le.create,ue.bind(null,pn.render);var Mo=ue.bind(null,pn.renderToDataURL);ue.bind(null,function(e,t,n){return No.render(e,n)});var fn=(e=>(e.pending="pending",e.paid="paid",e.canceled="canceled",e))(fn||{}),zo=Object.defineProperty,q=(e,t,n,r)=>{for(var o=void 0,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=i(t,n,o)||o);return o&&zo(t,n,o),o};const Bo={alipay:"i-ri-alipay-fill text-[#1578FF]",wechat:"i-ri-wechat-pay-fill text-[#2AAE66]"},ye=class ye extends S{constructor(){super(...arguments),this.name="",this.kind="Post",this.payProviders=[],this.selectedPayProvider="",this.qrCode="",this.loading=!1}connectedCallback(){super.connectedCallback(),this.handleInit()}async handleInit(){try{this.loading=!0,await this.handleFetchPayProviders();const t=await j("/apis/uc.post.restrict.halo.run/v1alpha1/payorderrecords",{method:"post",body:{kind:this.kind,oid:this.name},credentials:"same-origin"});this.payOrderRecord=t,this.selectedPayProvider=this.payProviders[0].name,await this.handleChangePayProvider(this.selectedPayProvider),this.timer=setInterval(()=>this.fetchPayOrderStatus(),3e3)}catch(t){console.error(t)}finally{this.loading=!1}}async fetchPayOrderStatus(){var n;if((await j(`/apis/uc.post.restrict.halo.run/v1alpha1/payorderrecords/${(n=this.payOrderRecord)==null?void 0:n.metadata.name}`)).spec.status===fn.paid){clearInterval(this.timer);const r=new URL(window.location.href);r.searchParams.set("random",Math.random().toString(36).substring(2)),window.location.href=r.toString()}}async handleFetchPayProviders(){try{const t=await j("/apis/uc.post.restrict.halo.run/v1alpha1/payprovidersettings");if(!(t!=null&&t.length))throw new Error("No pay providers");this.payProviders=t}catch{new ft().error("获取支付提供商失败，请检查配置")}}async handleChangePayProvider(t){var r;this.selectedPayProvider=t;const n=`${window.location.origin}/apis/uc.post.restrict.halo.run/v1alpha1/payorderrecords/${(r=this.payOrderRecord)==null?void 0:r.metadata.name}/payment/${t}`;try{const o=await j(n);this.qrCode=await Mo(o.qrCode)}catch{new ft().error("获取支付二维码失败，请稍后重试")}}render(){var t;return E`
      <content-restrict-base-modal modal-title="本次访问需要付费" @close=${this.close}>
        ${this.loading?E`<content-restrict-loading></content-restrict-loading>`:E`<div class="flex items-center justify-center flex-col space-y-4 pb-4">
              <ul class="grid grid-cols-2 gap-3 w-full">
                ${this.payProviders.map(n=>E`
                    <li
                      @click=${()=>this.handleChangePayProvider(n.name)}
                      class="border-secondary cursor-pointer border relative hover:border-primary transition-all flex items-center gap-3 p-3 rounded-md ${this.selectedPayProvider===n.name?"!border-primary":""}"
                    >
                      <span class="w-8 h-8 inline-block ${Bo[n.name]}"></span>
                      <span class="text-sm font-semibold">${n.label}</span>

                      ${n.name===this.selectedPayProvider?E`
                            <i
                              class="i-ri-checkbox-circle-line absolute top-2 text-green right-2"
                            ></i>
                          `:""}
                    </li>
                  `)}
              </ul>
              <img src=${this.qrCode} class="w-2/3" />
              <span class="text-title-subtle">
                需要支付
                <span class="text-red font-semibold">
                  ¥${(((t=this.payOrderRecord)==null?void 0:t.spec.amount)||0)/100}
                </span>
              </span>
            </div>`}
      </content-restrict-base-modal>
    `}close(){this.dispatchEvent(new CustomEvent("close"))}};ye.styles=[U(J),L`
      :host {
        display: block;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: icons */
.i-ri-alipay-fill{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M21.422 15.358q-5.744-1.73-6.678-2.062a12.4 12.4 0 0 0 1.32-3.32H12.8V8.872h4v-.68h-4V6.344h-1.536c-.28 0-.312.248-.312.248v1.592H7.2v.68h3.752v1.104H7.88v.616h6.224a11 11 0 0 1-.888 2.176c-1.408-.464-2.192-.784-3.912-.944c-3.256-.312-4.008 1.48-4.128 2.576C5 16.064 6.48 17.424 8.688 17.424s3.68-1.024 5.08-2.72q1.75.837 6.514 2.902A9.99 9.99 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a10 10 0 0 1-.578 3.358m-12.99 1.01c-2.336 0-2.704-1.48-2.584-2.096s.8-1.416 2.104-1.416c1.496 0 2.832.384 4.44 1.16c-1.136 1.48-2.52 2.352-3.96 2.352'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1em;height:1em;}
.i-ri-checkbox-circle-line{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-.997-4L6.76 11.757l1.414-1.414l2.829 2.829l5.657-5.657l1.414 1.414z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1em;height:1em;}
.i-ri-wechat-pay-fill{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M9.271 14.669a.66.66 0 0 1-.88-.269l-.043-.095l-1.818-3.998a.5.5 0 0 1 0-.146a.327.327 0 0 1 .335-.327a.3.3 0 0 1 .196.066l2.18 1.527a1 1 0 0 0 .546.167a.9.9 0 0 0 .342-.066l10.047-4.5a10.73 10.73 0 0 0-8.171-3.526C6.479 3.502 2 7.232 2 11.87a7.83 7.83 0 0 0 3.46 6.296a.66.66 0 0 1 .24.727l-.45 1.701a1 1 0 0 0-.051.24a.327.327 0 0 0 .334.334a.4.4 0 0 0 .19-.058l2.18-1.265c.16-.098.343-.151.53-.152q.15 0 .292.043c1.062.3 2.16.452 3.264.45c5.525 0 10.011-3.729 10.011-8.33a7.23 7.23 0 0 0-1.098-3.883L9.351 14.625z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1em;height:1em;}
/* layer: shortcuts */
.text-title-subtle{color:var(--halo-restrict-widget-title-subtle-color,#52525b);}
/* layer: default */
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.right-2{right:0.5em;}
.top-2{top:0.5em;}
.grid{display:grid;}
.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr));}
.block{display:block;}
.inline-block{display:inline-block;}
.h-8{height:2em;}
.w-2\\/3{width:66.6666666667%;}
.w-8{width:2em;}
.w-full{width:100%;}
.flex{display:flex;}
.flex-col{flex-direction:column;}
.cursor-pointer{cursor:pointer;}
.items-center{align-items:center;}
.justify-center{justify-content:center;}
.gap-3{gap:0.75em;}
.space-y-4>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(1em * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(1em * var(--un-space-y-reverse));}
.border{border-width:1px;}
.\\!border-primary{border-color:var(--halo-restrict-widget-primary-color,#2563eb) !important;}
.border-secondary{border-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.hover\\:border-primary:hover{border-color:var(--halo-restrict-widget-primary-color,#2563eb);}
.rounded-md{border-radius:0.375em;}
.p-3{padding:0.75em;}
.pb-4{padding-bottom:1em;}
.text-sm{font-size:0.875em;line-height:1.25em;}
.text-\\[\\#1578FF\\]{--un-text-opacity:1;color:rgb(21 120 255 / var(--un-text-opacity));}
.text-\\[\\#2AAE66\\]{--un-text-opacity:1;color:rgb(42 174 102 / var(--un-text-opacity));}
.text-green{--un-text-opacity:1;color:rgb(74 222 128 / var(--un-text-opacity));}
.text-red{--un-text-opacity:1;color:rgb(248 113 113 / var(--un-text-opacity));}
.font-semibold{font-weight:600;}
.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;};
    `];let P=ye;q([_({type:String})],P.prototype,"name"),q([_({type:String})],P.prototype,"kind"),q([R()],P.prototype,"payProviders"),q([R()],P.prototype,"selectedPayProvider"),q([R()],P.prototype,"payOrderRecord"),q([R()],P.prototype,"qrCode"),q([R()],P.prototype,"timer"),q([R()],P.prototype,"loading"),customElements.get("content-restrict-pay-modal")||customElements.define("content-restrict-pay-modal",P);function Io(e,t){const n=new P;n.name=e,n.kind=t,document.body.appendChild(n),n.addEventListener("close",()=>{n.remove()})}function Uo(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}var Lo=Object.defineProperty,st=(e,t,n,r)=>{for(var o=void 0,s=e.length-1,i;s>=0;s--)(i=e[s])&&(o=i(t,n,o)||o);return o&&Lo(t,n,o),o};const be=class be extends S{constructor(){super(...arguments),this.type="answer",this.name="",this.kind="Post",this.label="",this.skeletonLines=6,this.answerLabel=""}render(){return E`
      <div
        class="border border-dashed border-secondary rounded-lg w-full h-auto p-3 relative bg-transparent"
      >
        <div class="-z-1">
          <ul class="space-y-3">
            ${Array(this.skeletonLines).fill(0).map(()=>E`<li
                    class="h-4 bg-secondary rounded-full "
                    style="width: ${Uo(20,100)}%"
                  ></li>`)}
          </ul>
        </div>
        <div class="absolute flex-col space-y-4 inset-0 flex items-center justify-center">
          <div class="text-title text-lg">此处内容已隐藏，「${this.hiddenText}」</div>
          <button
            type="button"
            @click=${this.handleClick}
            class="text-white bg-primary focus:ring-4 focus:ring-primary-subtle hover:brightness-105 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            ${this.buttonText}
          </button>
        </div>
      </div>
    `}get buttonText(){switch(this.type){case"login":return"去登录";case"comment":return"去评论";case"pay":return"去支付";default:return"查看更多"}}get hiddenText(){switch(this.type){case"login":return"登录可见";case"mp":return"微信关注可见";case"answer":return"输入口令可见";case"comment":return"评论后刷新页面可见";case"pay":return"付费后可见";default:return""}}async handleClick(){if(this.type==="answer"){Dr(this.name,this.kind,this.answerLabel);return}if(this.type==="mp"){Fr(this.name,this.kind);return}if(this.type==="pay"){if((await j("/apis/api.console.halo.run/v1alpha1/users/-",{credentials:"same-origin"})).user.metadata.name==="anonymousUser"){window.location.href=`/login?redirect_uri=${window.location.href}`;return}Io(this.name,this.kind);return}if(this.type==="comment"){const t=`comment-${["content-halo-run",this.kind,this.name].join("-").replaceAll(/-+/g,"-")}`,n=document.getElementById(t);n&&n.scrollIntoView({behavior:"smooth"});return}this.type==="login"&&(window.location.href=`/login?redirect_uri=${window.location.href}`)}};be.styles=[U(J),L`
      :host {
        display: block;
        width: 100%;
        margin: 1em 0;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.text-title{color:var(--halo-restrict-widget-title-color,#18181b);}
.focus\\:ring-primary-subtle:focus{--un-ring-color:var(--halo-restrict-widget-primary-subtle-color,#93c5fd);}
/* layer: default */
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.inset-0{inset:0;}
.-z-1{z-index:-1;}
.mb-2{margin-bottom:0.5em;}
.me-2{margin-inline-end:0.5em;}
.block{display:block;}
.h-4{height:1em;}
.h-auto{height:auto;}
.w-full{width:100%;}
.flex{display:flex;}
.flex-col{flex-direction:column;}
.items-center{align-items:center;}
.justify-center{justify-content:center;}
.space-y-3>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(0.75em * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(0.75em * var(--un-space-y-reverse));}
.space-y-4>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(1em * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(1em * var(--un-space-y-reverse));}
.border{border-width:1px;}
.border-secondary{border-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.rounded-full{border-radius:9999px;}
.rounded-lg{border-radius:0.5em;}
.border-dashed{border-style:dashed;}
.bg-primary{background-color:var(--halo-restrict-widget-primary-color,#2563eb);}
.bg-secondary{background-color:var(--halo-restrict-widget-secondary-color,#e4e4e7);}
.bg-transparent{background-color:transparent;}
.p-3{padding:0.75em;}
.px-5{padding-left:1.25em;padding-right:1.25em;}
.py-2\\.5{padding-top:0.625em;padding-bottom:0.625em;}
.text-lg{font-size:1.125em;line-height:1.75em;}
.text-sm{font-size:0.875em;line-height:1.25em;}
.text-white{--un-text-opacity:1;color:rgb(255 255 255 / var(--un-text-opacity));}
.font-medium{font-weight:500;}
.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px;}
.focus\\:ring-4:focus{--un-ring-width:4px;--un-ring-offset-shadow:var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color);--un-ring-shadow:var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color);box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}
.hover\\:brightness-105:hover{--un-brightness:brightness(1.05);filter:var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia);};
    `];let M=be;st([_({type:String})],M.prototype,"type"),st([_({type:String})],M.prototype,"name"),st([_({type:String})],M.prototype,"kind"),st([_({type:String})],M.prototype,"label"),st([_({type:Number,attribute:"skeleton-lines"})],M.prototype,"skeletonLines"),st([_({type:String,attribute:"answer-label"})],M.prototype,"answerLabel"),customElements.get("content-restrict-widget")||customElements.define("content-restrict-widget",M),ve.ContentRestrictWidget=M,Object.defineProperty(ve,Symbol.toStringTag,{value:"Module"})})(this["content-restrict-widget"]=this["content-restrict-widget"]||{});
