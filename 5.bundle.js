(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{170:function(e,n,t){"use strict";t.r(n),t.d(n,"Preview",(function(){return U}));var r=t(10),u=t.n(r),c=t(0),i=t.n(c),a=t(11),o=t(54),s=t(56),l=t(12),f=Object(l.a)((function(){return Promise.all([t.e(1),t.e(7)]).then(t.bind(null,172))}),(function(e){return e.Slide})),b=t(57),d=t(94);var v=t(37),m=t.n(v),h=t(169),p=t(167),j=t(100),O=t(168),w=t(67),E=t.n(w),k=t(41);function y(e){var n=e.dispatch,t=e.entries,r=e.isActive,u=e.ref,i=Object(c.useMemo)((function(){return E()((function(){var e,r=h.a(p.a(j.a,0),O.a(j.a,18)),u=Object.entries(t).find((function(e){var n=m()(e,2)[1];return r(n.getBoundingClientRect().top)}));u&&(e=parseInt(u[0],10),n({type:k.a.SetSlideshowLineNumber,slideshowLineNumber:e}))}),100)}),[n,t]);Object(c.useEffect)((function(){var e=u.current;return r?null==e||e.addEventListener("scroll",i,{passive:!0}):null==e||e.removeEventListener("scroll",i),function(){return null==e?void 0:e.removeEventListener("scroll",i)}}),[r,i,u])}function g(){var e=u()(["\n  height: 100%;\n  overflow: auto;\n\n  &:fullscreen {\n    scroll-snap-type: y mandatory;\n\n    .slide {\n      display: grid;\n      height: 100%;\n      scroll-snap-align: start;\n\n      svg {\n        margin: auto;\n      }\n    }\n  }\n\n  &:-webkit-full-screen {\n    background-color: rgba(255, 255, 255, 0);\n    height: 100%;\n    scroll-snap-type: y mandatory;\n    width: 100%;\n\n    .slide {\n      display: grid;\n      height: 100%;\n      scroll-snap-align: start;\n\n      svg {\n        margin: auto;\n      }\n    }\n  }\n"]);return g=function(){return e},e}var L=a.b.article(g()),x=Object(c.forwardRef)((function(e,n){var t=e.dispatch,r=e.htmlArray,u=e.textLineNumber,a=Object(b.a)({ref:n,initialValue:!1}),o=Object(s.b)();return function(e){var n=e.entries,t=e.textLineNumber;Object(c.useEffect)((function(){var e=n[t];e&&Object(d.a)(e,{block:"start"})}),[n,t])}({entries:o,textLineNumber:u}),y({dispatch:t,entries:o,isActive:a,ref:n}),i.a.createElement(L,{ref:n,id:"slideshow"},r.map((function(e,n){return i.a.createElement(f,{key:"slide-".concat(n+1),htmlString:e,index:n})})))})),S=Object(c.memo)(x),N=t(101),A=t.n(N),C=t(78);function R(e){var n=Object(c.useState)(!1),t=m()(n,2),r=t[0],u=t[1];!function(e){var n=Object(c.useState)(1),t=m()(n,2),r=t[0],u=t[1],i=Object(C.b)(),a=Object.keys(i).length;Object(c.useEffect)((function(){return u(1)}),[e]),Object(c.useEffect)((function(){e&&Object(d.a)(i[r])}),[e,r,i]);var o=Object(c.useCallback)((function(){return u((function(e){return e<a?e+1:e}))}),[a]),s=Object(c.useCallback)((function(){return u((function(e){return e>1?e-1:e}))}),[]);Object(c.useEffect)((function(){var n=function(e){switch(e.preventDefault(),e.keyCode){case 37:case 38:s();break;case 39:case 40:o()}};return e?document.addEventListener("keydown",n):document.removeEventListener("keydown",n),function(){return document.removeEventListener("keydown",n)}}),[o,s,e])}(r);var i=Object(c.useCallback)((function(){e.current&&A.a.request(e.current)}),[e]);return Object(c.useEffect)((function(){var e=A.a,n=function(){return u(e.isFullscreen)};return e.on("change",n),function(){return e.off("change",n)}}),[]),i}var F=t(102),J=t.n(F),M=t(103),P=t.n(M),V=function(){return new Worker(t.p+"bundle.worker.js")},q=function(){function e(n){J()(this,e),this.worker=new V,this.worker.onmessage=function(e){var t=e.data;return n({type:k.a.SetHtmlArray,htmlArray:t})}}return P()(e,[{key:"parse",value:function(e){this.worker.postMessage(e)}},{key:"terminate",value:function(){this.worker&&this.worker.terminate()}}]),e}();function B(){var e=u()(["\n  position: absolute;\n  right: 0;\n  bottom: 0;\n"]);return B=function(){return e},e}function D(){var e=u()(["\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n"]);return D=function(){return e},e}var H=a.b.div(D()),I=a.b.button(B()),U=Object(c.memo)((function(){var e=Object(c.useRef)(null),n=Object(o.c)(),t=Object(o.d)(),r=t.htmlArray,u=t.md,a=t.textLineNumber,s=R(e);return function(e){var n=e.dispatch,t=e.md,r=Object(c.useRef)(null);Object(c.useEffect)((function(){return r.current=new q(n),function(){var e;null===(e=r.current)||void 0===e||e.terminate()}}),[n]),Object(c.useEffect)((function(){var e=r.current;null==e||e.parse(t)}),[t])}({dispatch:n,md:u}),i.a.createElement(H,null,i.a.createElement(S,{ref:e,dispatch:n,htmlArray:r,textLineNumber:a}),i.a.createElement(I,{disabled:u===o.a.md,onClick:function(){return s()},type:"button"},"FULLSCREEN"))}))},57:function(e,n,t){"use strict";t.d(n,"a",(function(){return o}));var r=t(37),u=t.n(r),c=t(0),i=t(43),a=t.n(i);function o(e){var n=e.ref,t=e.initialValue,r=n.current,i=Object(c.useState)(t),o=u()(i,2),s=o[0],l=o[1];return Object(c.useEffect)((function(){var e=a()((function(e){return l(e)}),300),n=function(){return e(!0)},t=function(){return e(!1)};return null==r||r.addEventListener("mouseenter",n),null==r||r.addEventListener("mouseleave",t),function(){null==r||r.removeEventListener("mouseenter",n),null==r||r.removeEventListener("mouseleave",t)}}),[r,l]),s}}}]);
//# sourceMappingURL=5.bundle.js.map