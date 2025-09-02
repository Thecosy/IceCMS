(function(exports){var t=`*,:before,:after{box-sizing:border-box;border-style:solid;border-width:0;border-color:var(--un-default-border-color,#e5e7eb)}:before,:after{--un-content:""}html,:host{-webkit-text-size-adjust:100%;tab-size:4;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{line-height:inherit;margin:0}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-feature-settings:normal;font-variation-settings:normal;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-feature-settings:inherit;font-variation-settings:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:#0000;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{margin:0;padding:0;list-style:none}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}[hidden]{display:none}`;
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let n=globalThis,r=n.ShadowRoot&&(n.ShadyCSS===void 0||n.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;var o=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(r&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=a.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&a.set(t,e))}return e}toString(){return this.cssText}};let s=e=>new o(typeof e==`string`?e:e+``,void 0,i),c=(e,...t)=>{let n=e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]);return new o(n,e,i)},l=(e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement(`style`),i=n.litNonce;i!==void 0&&t.setAttribute(`nonce`,i),t.textContent=r.cssText,e.appendChild(t)}},u=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return s(t)})(e):e,{is:d,defineProperty:ee,getOwnPropertyDescriptor:te,getOwnPropertyNames:ne,getOwnPropertySymbols:re,getPrototypeOf:ie}=Object,f=globalThis,ae=f.trustedTypes,oe=ae?ae.emptyScript:``,se=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?oe:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},h=(e,t)=>!d(e,t),ce={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:h};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&ee(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=te(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return r?.call(this)},set(t){let a=r?.call(this);i.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ce}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=ie(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ne(e),...re(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(u(e))}else e!==void 0&&t.push(u(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EC(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r,this[r]=i.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){if(n??=this.constructor.getPropertyOptions(e),!(n.hasChanged??h)(this[e],t))return;this.P(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,n){this._$AL.has(e)||this._$AL.set(e,t),!0===n.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e)!0!==n.wrapped||this._$AL.has(t)||this[t]===void 0||this.P(t,this[t],n)}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach(e=>this._$EC(e,this[e])),this._$EU()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:`open`},g[p(`elementProperties`)]=new Map,g[p(`finalized`)]=new Map,se?.({ReactiveElement:g}),(f.reactiveElementVersions??=[]).push(`2.0.4`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let _=globalThis,v=_.trustedTypes,y=v?v.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,b=`$lit$`,x=`lit$${Math.random().toFixed(9).slice(2)}$`,S=`?`+x,le=`<${S}>`,C=document,w=()=>C.createComment(``),T=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ue=Array.isArray,de=e=>ue(e)||typeof e?.[Symbol.iterator]==`function`,E=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,pe=/>/g,O=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),me=/'/g,k=/"/g,he=/^(?:script|style|textarea|title)$/i,A=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),j=A(1),ge=A(2),M=Symbol.for(`lit-noChange`),N=Symbol.for(`lit-nothing`),_e=new WeakMap,P=C.createTreeWalker(C,129);function ve(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return y===void 0?t:y.createHTML(t)}let F=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=D;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===D?c[1]===`!--`?o=fe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=O):(he.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=O):o=pe:o===O?c[0]===`>`?(o=i??D,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?O:c[3]===`"`?k:me):o===k||o===me?o=O:o===fe||o===pe?o=D:(o=O,i=void 0);let d=o===O&&e[t+1].startsWith(`/>`)?` `:``;a+=o===D?n+le:l>=0?(r.push(s),n.slice(0,l)+b+n.slice(l)+x+d):n+x+(l===-2?t:d)}return[ve(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]};var I=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=F(t,n);if(this.el=e.createElement(l,r),P.currentNode=this.el.content,n===2){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=P.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(b)){let t=u[o++],n=i.getAttribute(e).split(x),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ye:r[1]===`?`?be:r[1]===`@`?xe:B}),i.removeAttribute(e)}else e.startsWith(x)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(he.test(i.tagName)){let e=i.textContent.split(x),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],w()),P.nextNode(),c.push({type:2,index:++a});i.append(e[t],w())}}}else if(i.nodeType===8)if(i.data===S)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(x,e+1))!==-1;)c.push({type:7,index:a}),e+=x.length-1}a++}}static createElement(e,t){let n=C.createElement(`template`);return n.innerHTML=e,n}};function L(e,t,n=e,r){if(t===M)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=T(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=L(e,i._$AS(e,t.values),i,r)),t}var R=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??C).importNode(t,!0);P.currentNode=r;let i=P.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new z(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new V(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=P.nextNode(),a++)}return P.currentNode=C,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},z=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),T(e)?e===N||e==null||e===``?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==M&&this._(e):e._$litType$===void 0?e.nodeType===void 0?de(e)?this.k(e):this._(e):this.T(e):this.$(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==N&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=I.createElement(ve(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new R(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=_e.get(e.strings);return t===void 0&&_e.set(e.strings,t=new I(e)),t}k(t){ue(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.S(w()),this.S(w()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=N}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=L(this,e,t,0),a=!T(e)||e!==this._$AH&&e!==M,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=L(this,r[n+o],t,o),s===M&&(s=this._$AH[o]),a||=!T(s)||s!==this._$AH[o],s===N?e=N:e!==N&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ye=class extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}},be=class extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}},xe=class extends B{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=L(this,e,t,0)??N)===M)return;let n=this._$AH,r=e===N&&n!==N||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==N&&(n===N||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},V=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}};let Se={P:b,A:x,C:S,M:1,L:F,R,D:de,V:L,I:z,H:B,N:be,U:xe,B:ye,F:V},Ce=_.litHtmlPolyfillSupport;Ce?.(I,z),(_.litHtmlVersions??=[]).push(`3.1.3`);let we=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new z(t.insertBefore(w(),e),e,void 0,n??{})}return i._$AI(e),i};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var H=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};H._$litElement$=!0,H.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:H});let Te=globalThis.litElementPolyfillSupport;Te?.({LitElement:H}),(globalThis.litElementVersions??=[]).push(`4.0.5`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let Ee={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:h},De=(e=Ee,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e)},init(t){return t!==void 0&&this.P(r,void 0,e),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e)}}throw Error(`Unsupported decorator location: `+r)};function U(e){return(t,n)=>typeof n==`object`?De(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,r?{...e,wrapped:!0}:e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function W(e){return U({...e,state:!0,attribute:!1})}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let Oe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ke=e=>(...t)=>({_$litDirective$:e,values:t});var Ae=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let je=`important`,Me=` !`+je,Ne=ke(class extends Ae{constructor(e){if(super(e),e.type!==Oe.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Me);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?je:``):n[e]=r}}return M}});
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var Pe=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function Fe(e){return e}
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var Ie=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new Pe(this.context,this.host,this.t,this.subscribe))}},Le=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},Re=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},ze=class extends Le{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new Pe(this.context,n,e,!0)));e.stopPropagation()},this.host=e,t.context===void 0?this.context=t:this.context=t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Re(this.context,this.host))}};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function Be({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new ze(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer(t=>{r.set(t,new ze(t,{context:e}))});let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}return void Object.defineProperty(t,n,a)}}}
/**
* @license
* Copyright 2022 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function G({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer(function(){new Ie(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})}):n.constructor.addInitializer(n=>{new Ie(n,{context:e,callback:e=>{n[r]=e},subscribe:t})})}}let K=Fe(Symbol(`customTitle`)),q=Fe(Symbol(`customDescription`));function J(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Y=class extends H{constructor(...e){super(...e),this.href=``}render(){return j`<div class="items-center relative grid grid-cols-12 p-2 gap-3">
      ${this.siteData?.image?j`
            <div
              class="h-full z-0 w-full rounded-b-none absolute inset-0 rounded-t-md bg-cover bg-center bg-no-repeat"
              style=${Ne({backgroundImage:`var(--halo-hyperlink-card-bg-gradient,linear-gradient(#f2f2f2, #f2f2f2), linear-gradient(#000000, #000000)), url('${this.siteData.image||this.siteData.icon}')`,backgroundBlendMode:`luminosity, overlay, normal`,transform:`scale(1.5) translate3d(0, 0, 0)`,filter:`blur(64px) saturate(4) contrast(90%)`})}
            ></div>
          `:``}
      ${this.siteData?.image||this.siteData?.icon?j`<div class="col-span-12 z-[1]">
            <img
              class="rounded-lg size-full object-cover aspect-16/9"
              src=${this.siteData?.image||this.siteData?.icon||``}
              referrerpolicy="no-referrer"
            />
          </div>`:``}

      <div class="col-span-12 space-y-1 z-[1]">
        <div class="text-link text-xs line-clamp-1">${this.siteData?.url}</div>
        <h2 class="font-semibold text-base text-title line-clamp-2">
          ${this.customTitle||this.siteData?.title}
        </h2>
        <p class="text-sm text-description line-clamp-2">
          ${this.customDescription||this.siteData?.description}
        </p>
      </div>
    </div>`}};J([U({type:String})],Y.prototype,`href`,void 0),J([G({context:K,subscribe:!0}),W()],Y.prototype,`customTitle`,void 0),J([G({context:q,subscribe:!0}),W()],Y.prototype,`customDescription`,void 0),J([U({type:Object})],Y.prototype,`siteData`,void 0),Y.styles=[s(t),c`
      :host {
        display: inline-block;
        width: 100%;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.text-description{color:var(--halo-hyperlink-card-description-color,#71717a);}
.text-link{color:var(--halo-hyperlink-card-link-color,#4f46e5);}
.text-title{color:var(--halo-hyperlink-card-title-color,#18181b);}
/* layer: default */
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.inset-0{inset:0;}
.line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;line-clamp:1;}
.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;}
.z-\\[1\\]{z-index:1;}
.z-0{z-index:0;}
.grid{display:grid;}
.col-span-12{grid-column:span 12/span 12;}
.grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr));}
.inline-block{display:inline-block;}
.aspect-16\\/9{aspect-ratio:16/9;}
.size-full{width:100%;height:100%;}
.h-full{height:100%;}
.w-full{width:100%;}
.transform{transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}
.items-center{align-items:center;}
.gap-3{gap:0.75rem;}
.space-y-1>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(0.25rem * var(--un-space-y-reverse));}
.rounded-lg{border-radius:0.5rem;}
.rounded-b-none{border-bottom-left-radius:0;border-bottom-right-radius:0;}
.rounded-t-md{border-top-left-radius:0.375rem;border-top-right-radius:0.375rem;}
.bg-cover{background-size:cover;}
.bg-center{background-position:center;}
.bg-no-repeat{background-repeat:no-repeat;}
.object-cover{object-fit:cover;}
.p-2{padding:0.5rem;}
.text-base{font-size:1rem;line-height:1.5rem;}
.text-sm{font-size:0.875rem;line-height:1.25rem;}
.text-xs{font-size:0.75rem;line-height:1rem;}
.font-semibold{font-weight:600;}
.filter{filter:var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia);};
    `],customElements.get(`hyperlink-grid-card`)||customElements.define(`hyperlink-grid-card`,Y);var Ve=class extends H{render(){return j`
      <div class="items-center relative grid grid-cols-12 p-2 gap-3">
        <div class="col-span-12 z-[1]">
          <div class="bg-skeleton rounded-lg size-full aspect-16/9 animate-pulse"></div>
        </div>

        <div class="col-span-12 space-y-1 z-[1]">
          <div class="h-3 bg-skeleton rounded animate-pulse w-1/3"></div>

          <div class="space-y-1">
            <div class="h-4 bg-skeleton rounded animate-pulse w-4/5"></div>
            <div class="h-4 bg-skeleton rounded animate-pulse w-3/5"></div>
          </div>

          <div class="space-y-1">
            <div class="h-3 bg-skeleton rounded animate-pulse w-full"></div>
            <div class="h-3 bg-skeleton rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    `}};Ve.styles=[s(t),c`
      :host {
        display: inline-block;
        width: 100%;
      }

      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.bg-skeleton{background-color:var(--halo-hyperlink-card-skeleton-color,#e4e4e7);}
/* layer: default */
.relative{position:relative;}
.static{position:static;}
.z-\\[1\\]{z-index:1;}
.grid{display:grid;}
.col-span-12{grid-column:span 12/span 12;}
.grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr));}
.inline-block{display:inline-block;}
.aspect-16\\/9{aspect-ratio:16/9;}
.size-full{width:100%;height:100%;}
.h-3{height:0.75rem;}
.h-4{height:1rem;}
.w-1\\/3{width:33.3333333333%;}
.w-2\\/3{width:66.6666666667%;}
.w-3\\/5{width:60%;}
.w-4\\/5{width:80%;}
.w-full{width:100%;}
@keyframes pulse{0%, 100% {opacity:1} 50% {opacity:.5}}
.animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,.6,1) infinite;}
.items-center{align-items:center;}
.gap-3{gap:0.75rem;}
.space-y-1>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(0.25rem * var(--un-space-y-reverse));}
.rounded{border-radius:0.25rem;}
.rounded-lg{border-radius:0.5rem;}
.p-2{padding:0.5rem;};
    `],customElements.get(`hyperlink-grid-card-loading`)||customElements.define(`hyperlink-grid-card-loading`,Ve);var X=class extends H{constructor(...e){super(...e),this.href=``}render(){let e=!this.siteData?.image&&this.siteData?.icon;return j`<div
      class="items-center flex ${e?`flex-row`:`flex-col`} sm:flex-row relative p-2 gap-3"
    >
      ${this.siteData?.image?j`
            <div
              class="h-full z-0 w-full rounded-b-none absolute inset-0 rounded-t-md bg-cover bg-center bg-no-repeat"
              style=${Ne({backgroundImage:`var(--halo-hyperlink-card-bg-gradient,linear-gradient(#f2f2f2, #f2f2f2), linear-gradient(#000000, #000000)), url('${this.siteData.image||this.siteData.icon}')`,backgroundBlendMode:`luminosity, overlay, normal`,transform:`scale(1.5) translate3d(0, 0, 0)`,filter:`blur(64px) saturate(4) contrast(90%)`})}
            ></div>
            <div class="aspect-16/9 w-full sm:w-56 flex-none z-[1]">
              <img
                class="rounded-lg size-full object-cover"
                src=${this.siteData?.image}
                referrerpolicy="no-referrer"
              />
            </div>
          `:``}
      ${e?j`<div class="aspect-square w-18 flex-none z-[1]">
            <img
              class="rounded-lg size-full object-cover"
              src=${this.siteData?.icon}
              referrerpolicy="no-referrer"
            />
          </div>`:``}

      <div class="flex-auto shrink space-y-1 z-[1] text-ellipsis overflow-hidden w-full">
        <div>
          <span class="text-link text-xs line-clamp-1">${this.siteData?.url}</span>
        </div>
        <div>
          <h2 class="font-semibold text-base text-title line-clamp-2 lg:line-clamp-1">
            ${this.customTitle||this.siteData?.title}
          </h2>
        </div>
        <p class="text-sm text-description ${e?`line-clamp-1`:`line-clamp-2`}">
          ${this.customDescription||this.siteData?.description}
        </p>
      </div>
    </div>`}};J([U({type:String})],X.prototype,`href`,void 0),J([G({context:K,subscribe:!0}),W()],X.prototype,`customTitle`,void 0),J([G({context:q,subscribe:!0}),W()],X.prototype,`customDescription`,void 0),J([U({type:Object})],X.prototype,`siteData`,void 0),X.styles=[s(t),c`
      :host {
        display: inline-block;
        width: 100%;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.text-description{color:var(--halo-hyperlink-card-description-color,#71717a);}
.text-link{color:var(--halo-hyperlink-card-link-color,#4f46e5);}
.text-title{color:var(--halo-hyperlink-card-title-color,#18181b);}
/* layer: default */
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.inset-0{inset:0;}
.line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;line-clamp:1;}
.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;}
.z-\\[1\\]{z-index:1;}
.z-0{z-index:0;}
.inline-block{display:inline-block;}
.aspect-16\\/9{aspect-ratio:16/9;}
.aspect-square{aspect-ratio:1/1;}
.size-full{width:100%;height:100%;}
.h-full{height:100%;}
.w-18{width:4.5rem;}
.w-full{width:100%;}
.flex{display:flex;}
.flex-auto{flex:1 1 auto;}
.flex-none{flex:none;}
.shrink{flex-shrink:1;}
.flex-row{flex-direction:row;}
.flex-col{flex-direction:column;}
.transform{transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}
.items-center{align-items:center;}
.gap-3{gap:0.75rem;}
.space-y-1>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(0.25rem * var(--un-space-y-reverse));}
.overflow-hidden{overflow:hidden;}
.text-ellipsis{text-overflow:ellipsis;}
.rounded-lg{border-radius:0.5rem;}
.rounded-b-none{border-bottom-left-radius:0;border-bottom-right-radius:0;}
.rounded-t-md{border-top-left-radius:0.375rem;border-top-right-radius:0.375rem;}
.bg-cover{background-size:cover;}
.bg-center{background-position:center;}
.bg-no-repeat{background-repeat:no-repeat;}
.object-cover{object-fit:cover;}
.p-2{padding:0.5rem;}
.text-base{font-size:1rem;line-height:1.5rem;}
.text-sm{font-size:0.875rem;line-height:1.25rem;}
.text-xs{font-size:0.75rem;line-height:1rem;}
.font-semibold{font-weight:600;}
.filter{filter:var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia);}
@media (min-width: 640px){
.sm\\:w-56{width:14rem;}
.sm\\:flex-row{flex-direction:row;}
}
@media (min-width: 1024px){
.lg\\:line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;line-clamp:1;}
};
    `],customElements.get(`hyperlink-regular-card`)||customElements.define(`hyperlink-regular-card`,X);var He=class extends H{render(){return j`
      <div class="items-center flex flex-col sm:flex-row relative p-2 gap-3">
        <div
          class="aspect-16/9 w-full sm:w-56 flex-none z-[1] bg-skeleton rounded-lg animate-pulse"
        ></div>

        <div class="flex-auto shrink space-y-1 z-[1] overflow-hidden w-full">
          <div class="h-3 bg-skeleton rounded animate-pulse w-1/3"></div>

          <div class="space-y-1">
            <div class="h-4 bg-skeleton rounded animate-pulse w-4/5"></div>
            <div class="h-4 bg-skeleton rounded animate-pulse w-3/5 hidden lg:block"></div>
          </div>

          <div class="space-y-1">
            <div class="h-3 bg-skeleton rounded animate-pulse w-full"></div>
            <div class="h-3 bg-skeleton rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    `}};He.styles=[s(t),c`
      :host {
        display: inline-block;
        width: 100%;
      }

      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.bg-skeleton{background-color:var(--halo-hyperlink-card-skeleton-color,#e4e4e7);}
/* layer: default */
.relative{position:relative;}
.static{position:static;}
.z-\\[1\\]{z-index:1;}
.inline-block{display:inline-block;}
.hidden{display:none;}
.aspect-16\\/9{aspect-ratio:16/9;}
.h-3{height:0.75rem;}
.h-4{height:1rem;}
.w-1\\/3{width:33.3333333333%;}
.w-2\\/3{width:66.6666666667%;}
.w-3\\/5{width:60%;}
.w-4\\/5{width:80%;}
.w-full{width:100%;}
.flex{display:flex;}
.flex-auto{flex:1 1 auto;}
.flex-none{flex:none;}
.shrink{flex-shrink:1;}
.flex-col{flex-direction:column;}
@keyframes pulse{0%, 100% {opacity:1} 50% {opacity:.5}}
.animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,.6,1) infinite;}
.items-center{align-items:center;}
.gap-3{gap:0.75rem;}
.space-y-1>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(0.25rem * var(--un-space-y-reverse));}
.overflow-hidden{overflow:hidden;}
.rounded{border-radius:0.25rem;}
.rounded-lg{border-radius:0.5rem;}
.p-2{padding:0.5rem;}
@media (min-width: 640px){
.sm\\:w-56{width:14rem;}
.sm\\:flex-row{flex-direction:row;}
}
@media (min-width: 1024px){
.lg\\:block{display:block;}
};
    `],customElements.get(`hyperlink-regular-card-loading`)||customElements.define(`hyperlink-regular-card-loading`,He);var Z=class extends H{constructor(...e){super(...e),this.href=``}render(){return j`
      <div class="items-center relative flex p-2 gap-3">
        ${this.siteData?.image||this.siteData?.icon?j`<div class="flex-none w-8 z-[1] aspect-square">
              <img
                class="rounded-lg size-full object-cover"
                src=${this.siteData.icon||this.siteData?.image||``}
                referrerpolicy="no-referrer"
              />
            </div>`:``}

        <h2 class="font-semibold text-base whitespace-nowrap truncate text-title">
          ${this.customTitle||this.siteData?.title}
        </h2>
        <p class="text-sm truncate text-description">
          ${this.customDescription||this.siteData?.description}
        </p>
      </div>
    `}};J([U({type:String})],Z.prototype,`href`,void 0),J([G({context:K,subscribe:!0}),W()],Z.prototype,`customTitle`,void 0),J([G({context:q,subscribe:!0}),W()],Z.prototype,`customDescription`,void 0),J([U({type:Object})],Z.prototype,`siteData`,void 0),Z.styles=[s(t),c`
      :host {
        display: inline-block;
        width: 100%;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.text-description{color:var(--halo-hyperlink-card-description-color,#71717a);}
.text-title{color:var(--halo-hyperlink-card-title-color,#18181b);}
/* layer: default */
.relative{position:relative;}
.static{position:static;}
.z-\\[1\\]{z-index:1;}
.inline-block{display:inline-block;}
.aspect-square{aspect-ratio:1/1;}
.size-full{width:100%;height:100%;}
.w-8{width:2rem;}
.flex{display:flex;}
.flex-none{flex:none;}
.items-center{align-items:center;}
.gap-3{gap:0.75rem;}
.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.whitespace-nowrap{white-space:nowrap;}
.rounded-lg{border-radius:0.5rem;}
.object-cover{object-fit:cover;}
.p-2{padding:0.5rem;}
.text-base{font-size:1rem;line-height:1.5rem;}
.text-sm{font-size:0.875rem;line-height:1.25rem;}
.font-semibold{font-weight:600;};
    `],customElements.get(`hyperlink-small-card`)||customElements.define(`hyperlink-small-card`,Z);var Ue=class extends H{render(){return j`
      <div class="items-center relative flex p-2 gap-3">
        <div class="flex-none w-8 z-[1] aspect-square bg-skeleton rounded-lg animate-pulse"></div>
        <div class="h-4 bg-skeleton rounded animate-pulse w-30"></div>
        <div class="h-3 bg-skeleton rounded animate-pulse w-40"></div>
      </div>
    `}};Ue.styles=[s(t),c`
      :host {
        display: inline-block;
        width: 100%;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.bg-skeleton{background-color:var(--halo-hyperlink-card-skeleton-color,#e4e4e7);}
/* layer: default */
.relative{position:relative;}
.static{position:static;}
.z-\\[1\\]{z-index:1;}
.inline-block{display:inline-block;}
.aspect-square{aspect-ratio:1/1;}
.h-3{height:0.75rem;}
.h-4{height:1rem;}
.w-30{width:7.5rem;}
.w-40{width:10rem;}
.w-8{width:2rem;}
.flex{display:flex;}
.flex-none{flex:none;}
@keyframes pulse{0%, 100% {opacity:1} 50% {opacity:.5}}
.animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,.6,1) infinite;}
.items-center{align-items:center;}
.gap-3{gap:0.75rem;}
.rounded{border-radius:0.25rem;}
.rounded-lg{border-radius:0.5rem;}
.p-2{padding:0.5rem;};
    `],customElements.get(`hyperlink-small-card-loading`)||customElements.define(`hyperlink-small-card-loading`,Ue);var Q=class extends H{constructor(...e){super(...e),this.href=``,this.target=`_self`,this.theme=`regular`,this.loading=!1}connectedCallback(){super.connectedCallback(),this.fetchSiteData()}async fetchSiteData(){try{this.loading=!0;let e=await fetch(`/apis/api.hyperlink.halo.run/v1alpha1/link-detail?url=${this.href}`);if(!e.ok)throw Error(`Failed to fetch site data`);this.siteData=await e.json()}catch(e){console.error(e)}finally{this.loading=!1}}render(){return j`
      <a
        href=${this.href}
        target=${this.target}
        class="border h-full border-card relative flex rounded-xl overflow-hidden border-hover-card bg-card transition-all"
      >
        ${this.renderContent()}
      </a>
    `}renderContent(){if(this.loading)switch(this.theme){case`small`:return j`<hyperlink-small-card-loading></hyperlink-small-card-loading>`;case`grid`:return j`<hyperlink-grid-card-loading></hyperlink-grid-card-loading>`;default:return j`<hyperlink-regular-card-loading></hyperlink-regular-card-loading>`}if(this.siteData)switch(this.theme){case`small`:return j`<hyperlink-small-card
            .href=${this.href}
            .siteData=${this.siteData}
          ></hyperlink-small-card>`;case`grid`:return j`<hyperlink-grid-card
            .href=${this.href}
            .siteData=${this.siteData}
          ></hyperlink-grid-card>`;default:return j`<hyperlink-regular-card
            .href=${this.href}
            .siteData=${this.siteData}
          ></hyperlink-regular-card>`}return j`<span class="text-link text-xs p-1 px-2">${this.href}</span>`}};J([U({type:String})],Q.prototype,`href`,void 0),J([Be({context:K}),U({type:String,attribute:`custom-title`})],Q.prototype,`customTitle`,void 0),J([Be({context:q}),U({type:String,attribute:`custom-description`})],Q.prototype,`customDescription`,void 0),J([U({type:String})],Q.prototype,`target`,void 0),J([U({type:String})],Q.prototype,`theme`,void 0),J([W()],Q.prototype,`siteData`,void 0),J([W()],Q.prototype,`loading`,void 0),Q.styles=[s(t),c`
      :host {
        display: inline-block;
        width: 100%;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.border-card{border-color:var(--halo-hyperlink-card-border-color,#e4e4e7);}
.border-hover-card:hover{border-color:var(--halo-hyperlink-card-border-hover-color,#818cf8);}
.bg-card{background-color:var(--halo-hyperlink-card-bg-color,#fff);}
.text-link{color:var(--halo-hyperlink-card-link-color,#4f46e5);}
/* layer: default */
.relative{position:relative;}
.static{position:static;}
.grid{display:grid;}
.inline-block{display:inline-block;}
.h-full{height:100%;}
.flex{display:flex;}
.overflow-hidden{overflow:hidden;}
.border{border-width:1px;}
.rounded-xl{border-radius:0.75rem;}
.p-1{padding:0.25rem;}
.px-2{padding-left:0.5rem;padding-right:0.5rem;}
.text-xs{font-size:0.75rem;line-height:1rem;}
.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;};
    `],customElements.get(`hyperlink-card`)||customElements.define(`hyperlink-card`,Q);var We=class extends H{render(){return j`
      <span
        class="inline-flex items-center group space-x-1.5 px-1.5 text-inline-title bg-inline-card text-[90%] rounded transition-all mx-1 py-0.5"
      >
        <div class="size-4 bg-skeleton rounded-sm animate-pulse"></div>
        <div class="h-3 bg-skeleton rounded animate-pulse w-16"></div>
      </span>
    `}};We.styles=[s(t),c`
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: shortcuts */
.bg-inline-card{background-color:var(--halo-hyperlink-card-inline-bg-color,#fafafa);}
.bg-skeleton{background-color:var(--halo-hyperlink-card-skeleton-color,#e4e4e7);}
.text-inline-title{color:var(--halo-hyperlink-card-inline-title-color,#27272a);}
/* layer: default */
.static{position:static;}
.mx-1{margin-left:0.25rem;margin-right:0.25rem;}
.inline-block{display:inline-block;}
.size-4{width:1rem;height:1rem;}
.h-3{height:0.75rem;}
.w-16{width:4rem;}
.inline-flex{display:inline-flex;}
@keyframes pulse{0%, 100% {opacity:1} 50% {opacity:.5}}
.animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,.6,1) infinite;}
.items-center{align-items:center;}
.space-x-1\\.5>:not([hidden])~:not([hidden]){--un-space-x-reverse:0;margin-left:calc(0.375rem * calc(1 - var(--un-space-x-reverse)));margin-right:calc(0.375rem * var(--un-space-x-reverse));}
.rounded{border-radius:0.25rem;}
.rounded-sm{border-radius:0.125rem;}
.px-1\\.5{padding-left:0.375rem;padding-right:0.375rem;}
.py-0\\.5{padding-top:0.125rem;padding-bottom:0.125rem;}
.text-\\[90\\%\\]{font-size:90%;}
.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;};
    `],customElements.get(`hyperlink-inline-card-loading`)||customElements.define(`hyperlink-inline-card-loading`,We);var $=class extends H{constructor(...e){super(...e),this.href=``,this.target=`_self`,this.loading=!1}connectedCallback(){super.connectedCallback(),this.fetchSiteData()}async fetchSiteData(){try{this.loading=!0;let e=await fetch(`/apis/api.hyperlink.halo.run/v1alpha1/link-detail?url=${this.href}`);if(!e.ok)throw Error(`Failed to fetch site data`);this.siteData=await e.json()}catch(e){console.error(e)}finally{this.loading=!1}}render(){return this.loading?j`<hyperlink-inline-card-loading></hyperlink-inline-card-loading>`:this.siteData?j`<a
        class="inline-flex items-center group space-x-1.5 px-1.5 text-inline-title bg-hover-inline-card text-[90%] rounded bg-inline-card transition-all mx-1 py-0.5"
        href=${this.href}
        target=${this.target}
      >
        ${this.siteData.icon||this.siteData.image?j`<img
              class="size-4 rounded-sm"
              src=${this.siteData.icon||this.siteData.image||``}
              referrerpolicy="no-referrer"
            />`:``}
        <span>${this.customTitle||this.siteData.title||this.href}</span>
        ${this.href.startsWith(location.origin)?``:j` <span class="i-tabler-external-link text-inline-title"></span>`}
      </a>`:j`<a class="text-indigo-600" href=${this.href} target=${this.target}>
      ${this.href}
    </a>`}};J([U({type:String})],$.prototype,`href`,void 0),J([U({type:String,attribute:`custom-title`})],$.prototype,`customTitle`,void 0),J([U({type:String,attribute:`custom-description`})],$.prototype,`customDescription`,void 0),J([U({type:String})],$.prototype,`target`,void 0),J([W()],$.prototype,`siteData`,void 0),J([W()],$.prototype,`loading`,void 0),$.styles=[s(t),c`
      :host {
        display: inline-block;
        vertical-align: middle;
      }
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: icons */
.i-tabler-external-link{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;width:1em;height:1em;}
/* layer: shortcuts */
.bg-inline-card{background-color:var(--halo-hyperlink-card-inline-bg-color,#fafafa);}
.bg-hover-inline-card:hover{background-color:var(--halo-hyperlink-card-inline-hover-bg-color,#f4f4f5);}
.text-inline-title{color:var(--halo-hyperlink-card-inline-title-color,#27272a);}
/* layer: default */
.static{position:static;}
.mx-1{margin-left:0.25rem;margin-right:0.25rem;}
.inline-block{display:inline-block;}
.size-4{width:1rem;height:1rem;}
.inline-flex{display:inline-flex;}
.items-center{align-items:center;}
.space-x-1\\.5>:not([hidden])~:not([hidden]){--un-space-x-reverse:0;margin-left:calc(0.375rem * calc(1 - var(--un-space-x-reverse)));margin-right:calc(0.375rem * var(--un-space-x-reverse));}
.rounded{border-radius:0.25rem;}
.rounded-sm{border-radius:0.125rem;}
.px-1\\.5{padding-left:0.375rem;padding-right:0.375rem;}
.py-0\\.5{padding-top:0.125rem;padding-bottom:0.125rem;}
.text-\\[90\\%\\]{font-size:90%;}
.text-indigo-600{--un-text-opacity:1;color:rgb(79 70 229 / var(--un-text-opacity));}
.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;};
    `],customElements.get(`hyperlink-inline-card`)||customElements.define(`hyperlink-inline-card`,$),exports.HyperlinkCard=Q,exports.HyperlinkInlineCard=$})(this[`hyperlink-card`]=this[`hyperlink-card`]||{});