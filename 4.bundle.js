(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{170:function(n,e,t){"use strict";t.r(e),t.d(e,"Home",(function(){return N}));var r=t(17),u=t.n(r),i=t(0),c=t.n(i),o=t(9),a=t(19),l=Object(a.a)((function(){return t.e(6).then(t.bind(null,167)).then((function(n){return{default:n.Editor}}))})),f=t(18),s=t(21),d=t(72),v=Object(a.a)((function(){return Promise.all([t.e(1),t.e(5)]).then(t.bind(null,171)).then((function(n){return{default:n.Slide}}))}));function b(){var n=u()(["\n  height: 100%;\n  overflow: auto;\n\n  &:fullscreen {\n    scroll-snap-type: y mandatory;\n\n    .slide {\n      display: grid;\n      height: 100%;\n      scroll-snap-align: start;\n      svg {\n        margin: auto;\n      }\n    }\n  }\n\n  &:-webkit-full-screen {\n    background-color: rgba(255, 255, 255, 0);\n\n    .slide {\n      display: grid;\n      height: 100%;\n      svg {\n        margin: auto;\n      }\n    }\n  }\n"]);return b=function(){return n},n}var m=o.d.article(b()),h=t(101),j=t.n(h),p=t(102),O=t.n(p),g=function(){return new Worker(t.p+"bundle.worker.js")},k=t(4),w=function(){function n(e){j()(this,n),this.worker=new g,this.worker.onmessage=function(n){var t=n.data;return e({type:k.a.SetHtmlArray,htmlArray:t})}}return O()(n,[{key:"parse",value:function(n){this.worker.postMessage(n)}},{key:"terminate",value:function(){this.worker&&this.worker.terminate()}}]),n}();var E=t(92);var y=t(3),L=t.n(y),C=t(168),x=t(164),S=t(165),A=t(166),R=t(76),z=t.n(R),H=t(59);function P(n){var e=n.dispatch,t=n.entries,r=n.isActive,u=n.ref,c=Object(i.useMemo)((function(){return z()((function(){var n,r=C.a(x.a(S.a,0),A.a(S.a,H.a)),u=Object.entries(t).find((function(n){var e=L()(n,2)[1];return r(e.getBoundingClientRect().top)}));u&&(n=parseInt(u[0],10),e({type:k.a.SetPreviewCodeLine,previewCodeLine:n}))}),100)}),[e,t]),o=null==u?void 0:u.current;Object(i.useEffect)((function(){return r?null==o||o.addEventListener("scroll",c,{passive:!0}):null==o||o.removeEventListener("scroll",c),function(){return null==o?void 0:o.removeEventListener("scroll",c)}}),[r,c,o])}function q(){var n=u()(["\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n"]);return q=function(){return n},n}var B=o.d.div(q()),J=Object(i.memo)(Object(i.forwardRef)((function(n,e){var t=Object(f.b)(),r=Object(f.c)(),u=r.htmlArray,o=r.md,a=r.editorLine,l=Object(d.a)({ref:e,initialValue:!1}),b=Object(s.b)();return function(n){var e=n.dispatch,t=n.md,r=Object(i.useRef)(null);Object(i.useEffect)((function(){return r.current=new w(e),function(){var n;null===(n=r.current)||void 0===n||n.terminate()}}),[e]),Object(i.useEffect)((function(){var n=r.current;null==n||n.parse(t)}),[t])}({dispatch:t,md:o}),function(n){var e=n.entries,t=n.editorLine;Object(i.useEffect)((function(){var n=e[t];n&&Object(E.a)(n,{block:"start"})}),[e,t])}({entries:b,editorLine:a}),P({dispatch:t,entries:b,isActive:l,ref:e}),c.a.createElement(B,{id:"preview"},c.a.createElement(m,{ref:e,id:"slideshow"},u.map((function(n,e){return c.a.createElement(v,{key:"slide-".concat(e+1),htmlString:n,index:e})}))))}))),M=Object(a.a)((function(){return t.e(3).then(t.bind(null,169)).then((function(n){return{default:n.Toolbar}}))})),V=t(103),D=t.n(V),F=t(22);function I(n){var e=Object(i.useState)(!1),t=L()(e,2),r=t[0],u=t[1],c=Object(i.useCallback)((function(){return u(!1)}),[]),o=Object(i.useCallback)((function(){return u(!0)}),[]);!function(n){var e=Object(i.useState)(1),t=L()(e,2),r=t[0],u=t[1],c=Object(F.b)(),o=Object.keys(c).length;Object(i.useEffect)((function(){return u(1)}),[n]),Object(i.useEffect)((function(){n&&Object(E.a)(c[r])}),[n,r,c]);var a=Object(i.useCallback)((function(){return u((function(n){return n<o?n+1:n}))}),[o]),l=Object(i.useCallback)((function(){return u((function(n){return n>1?n-1:n}))}),[]);Object(i.useEffect)((function(){var e=function(n){switch(n.preventDefault(),n.keyCode){case 37:case 38:l();break;case 39:case 40:a()}};return n?document.addEventListener("keydown",e):document.removeEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}}),[a,l,n])}(r);var a=Object(i.useCallback)((function(){var e=null==n?void 0:n.current;e&&D.a.request(e)}),[n]);return Object(i.useEffect)((function(){var n=D.a,e=function(){return n.isFullscreen?o():c()};return n.on("change",e),function(){return n.off("change",e)}}),[c,o]),a}function T(){var n=u()(["\n  display: flex;\n  height: 100%;\n  padding-bottom: ","px;\n"]);return T=function(){return n},n}function W(){var n=u()(["\n  height: 100%;\n"]);return W=function(){return n},n}var G=o.d.div(W()),K=o.d.div(T(),(function(n){return n.theme.toolbarHeight+2})),N=function(){var n=Object(i.useRef)(null),e=I(n);return c.a.createElement(G,{id:"main"},c.a.createElement(K,null,c.a.createElement(l,null),c.a.createElement(J,{ref:n})),c.a.createElement(M,{requestPresentation:e}))}},59:function(n,e,t){"use strict";t.d(e,"a",(function(){return o})),t.d(e,"b",(function(){return a}));var r=t(17),u=t.n(r),i=t(9);function c(){var n=u()(["\n  background-color: ",";\n  border: none;\n  color: ",";\n  font-size: 15px;\n  height: 100%;\n  line-height: ","px;\n  outline: none;\n  padding: 0.5em;\n  resize: none;\n  tab-size: 2;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n"]);return c=function(){return n},n}var o=18,a=i.d.textarea(c(),(function(n){return n.theme.editorBackgroundColor}),(function(n){return n.theme.textColor}),o)},72:function(n,e,t){"use strict";t.d(e,"a",(function(){return a}));var r=t(3),u=t.n(r),i=t(0),c=t(73),o=t.n(c);function a(n){var e=n.ref,t=n.initialValue,r=Object(i.useState)(t),c=u()(r,2),a=c[0],l=c[1],f=null==e?void 0:e.current;return Object(i.useEffect)((function(){var n=o()((function(n){return l(n)}),300),e=function(){return n(!0)},t=function(){return n(!1)};return null==f||f.addEventListener("mouseenter",e),null==f||f.addEventListener("mouseleave",t),function(){null==f||f.removeEventListener("mouseenter",e),null==f||f.removeEventListener("mouseleave",t)}}),[f,l]),a}}}]);
//# sourceMappingURL=4.bundle.js.map