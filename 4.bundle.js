(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{100:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},175:function(e,t,n){"use strict";n.r(t),n.d(t,"Editor",(function(){return h}));var r=n(11),u=n.n(r),o=n(0),i=n.n(o),c=n(10),a=n(55),l=n(79),f=n(57),s=n(12),b=Object(s.a)((function(){return n.e(9).then(n.bind(null,172))}),(function(e){return e.Toolbar})),d=Object(s.a)((function(){return Promise.all([n.e(2),n.e(6)]).then(n.bind(null,177))}),(function(e){return e.TextEditor})),v=Object(s.a)((function(){return Promise.all([n.e(3),n.e(5)]).then(n.bind(null,171))}),(function(e){return e.Preview}));function O(){var e=u()(["\n  display: flex;\n  height: 100%;\n  padding-bottom: ","px;\n"]);return O=function(){return e},e}var m=c.d.div(O(),(function(e){return e.theme.navBarHeight+2})),h=Object(o.memo)((function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(m,null,i.a.createElement(a.b,null,i.a.createElement(d,null),i.a.createElement(l.a,null,i.a.createElement(f.a,null,i.a.createElement(v,null))))),i.a.createElement(b,null))}))},178:function(e,t,n){"use strict";var r=n(56);var u="function"==typeof Object.assign?Object.assign:function(e){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),n=1,u=arguments.length;n<u;){var o=arguments[n];if(null!=o)for(var i in o)Object(r.a)(i,o)&&(t[i]=o[i]);n+=1}return t},o=n(34),i=Object(o.a)((function(e,t){return u({},e,t)}));t.a=i},34:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(36),u=n(42);function o(e){return function t(n,o){switch(arguments.length){case 0:return t;case 1:return Object(u.a)(n)?t:Object(r.a)((function(t){return e(n,t)}));default:return Object(u.a)(n)&&Object(u.a)(o)?t:Object(u.a)(n)?Object(r.a)((function(t){return e(t,o)})):Object(u.a)(o)?Object(r.a)((function(t){return e(n,t)})):e(n,o)}}}},36:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(42);function u(e){return function t(n){return 0===arguments.length||Object(r.a)(n)?t:e.apply(this,arguments)}}},37:function(e,t,n){var r=n(96),u=n(97),o=n(98),i=n(100);e.exports=function(e,t){return r(e)||u(e,t)||o(e,t)||i()}},41:function(e,t,n){"use strict";var r;n.d(t,"a",(function(){return r})),function(e){e.SetHtmlArray="SET_HTML_STRING",e.SetMd="SET_MD",e.SetSlideshowLineNumber="SET_SLIDESHOW_LINE_NUMBER",e.SetTextLineNumber="SET_TEXT_LINE_NUMBER"}(r||(r={}))},42:function(e,t,n){"use strict";function r(e){return null!=e&&"object"==typeof e&&!0===e["@@functional/placeholder"]}n.d(t,"a",(function(){return r}))},55:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m})),n.d(t,"c",(function(){return h})),n.d(t,"d",(function(){return j}));var r=n(37),u=n.n(r),o=n(80),i=n.n(o),c=n(0),a=n.n(c),l=n(41);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var b={htmlArray:[],md:"",slideshowLineNumber:0,textLineNumber:0},d=Object(c.createContext)(void 0),v=Object(c.createContext)(void 0);function O(e,t){switch(t.type){case l.a.SetHtmlArray:return s(s({},e),{},{htmlArray:t.htmlArray});case l.a.SetMd:return s(s({},e),{},{md:t.md});case l.a.SetSlideshowLineNumber:return s(s({},e),{},{slideshowLineNumber:t.slideshowLineNumber});case l.a.SetTextLineNumber:return s(s({},e),{},{textLineNumber:t.textLineNumber});default:throw new Error("Unhandled action type")}}var m=function(e){var t=e.children,n=e.initialState,r=Object(c.useReducer)(O,n||b),o=u()(r,2),i=o[0],l=o[1];return a.a.createElement(d.Provider,{value:i},a.a.createElement(v.Provider,{value:l},t))};function h(){var e=Object(c.useContext)(v);if(void 0===e)throw new Error("useMarkdownDispatch must be used within a MarkdownProvider");return e}function j(){var e=Object(c.useContext)(d);if(void 0===e)throw new Error("useMarkdownState must be used within a MarkdownProvider");return e}},56:function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(t,e)}n.d(t,"a",(function(){return r}))},57:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return b})),n.d(t,"c",(function(){return d}));var r=n(37),u=n.n(r),o=n(0),i=n.n(o),c=n(178),a={},l=Object(o.createContext)(void 0),f=Object(o.createContext)(void 0),s=function(e){var t=e.children,n=e.initialEntries,r=Object(o.useState)(n||a),s=u()(r,2),b=s[0],d=s[1],v=Object(o.useCallback)((function(e){return d((function(t){return c.a(t,e)}))}),[]),O=Object(o.useMemo)((function(){return{observe:v}}),[v]);return i.a.createElement(l.Provider,{value:b},i.a.createElement(f.Provider,{value:O},t))};function b(){var e=Object(o.useContext)(l);if(void 0===e)throw new Error("useCodeLineEntries must be used within a CodeLineObserverProvider");return e}function d(){var e=Object(o.useContext)(f);if(void 0===e)throw new Error("useCodeLineObserver must be used within a CodeLineObserverProvider");return e}},79:function(e,t,n){"use strict";n.d(t,"a",(function(){return O})),n.d(t,"b",(function(){return m})),n.d(t,"c",(function(){return h}));var r=n(80),u=n.n(r),o=n(37),i=n.n(o),c=n(0),a=n.n(c),l=n(178),f=n(34),s=Object(f.a)((function(e,t){for(var n={},r={},u=0,o=e.length;u<o;)r[e[u]]=1,u+=1;for(var i in t)r.hasOwnProperty(i)||(n[i]=t[i]);return n})),b={},d=Object(c.createContext)(void 0),v=Object(c.createContext)(void 0),O=function(e){var t=e.children,n=e.initialEntries,r=Object(c.useState)(n||b),o=i()(r,2),f=o[0],O=o[1],m=Object(c.useCallback)((function(e,t){return O((function(n){return l.a(n,u()({},e,t))}))}),[]),h=Object(c.useCallback)((function(e){return O((function(t){return s([e],t)}))}),[]),j=Object(c.useMemo)((function(){return{observe:m,unobserve:h}}),[m,h]);return a.a.createElement(d.Provider,{value:f},a.a.createElement(v.Provider,{value:j},t))};function m(){var e=Object(c.useContext)(d);if(void 0===e)throw new Error("useSlideEntries must be used within a SlideObserverProvider");return e}function h(){var e=Object(c.useContext)(v);if(void 0===e)throw new Error("useSlideObserver must be used within a SlideObserverProvider");return e}},80:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},96:function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},97:function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,u=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){u=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(u)throw o}}return n}}},98:function(e,t,n){var r=n(99);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},99:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}}}]);
//# sourceMappingURL=4.bundle.js.map