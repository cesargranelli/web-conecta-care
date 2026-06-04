// node_modules/primeng/node_modules/@primeuix/utils/dist/classnames/index.mjs
function f(...e) {
  if (e) {
    let t2 = [];
    for (let i3 = 0; i3 < e.length; i3++) {
      let n = e[i3];
      if (!n) continue;
      let s3 = typeof n;
      if (s3 === "string" || s3 === "number") t2.push(n);
      else if (s3 === "object") {
        let c3 = Array.isArray(n) ? [f(...n)] : Object.entries(n).map(([r, o]) => o ? r : void 0);
        t2 = c3.length ? t2.concat(c3.filter((r) => !!r)) : t2;
      }
    }
    return t2.join(" ").trim();
  }
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/object/index.mjs
function l(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function b(e, t2, n = /* @__PURE__ */ new WeakSet()) {
  if (e === t2) return true;
  if (!e || !t2 || typeof e != "object" || typeof t2 != "object" || n.has(e) || n.has(t2)) return false;
  n.add(e).add(t2);
  let o = Array.isArray(e), r = Array.isArray(t2), u2, f2, T;
  if (o && r) {
    if (f2 = e.length, f2 != t2.length) return false;
    for (u2 = f2; u2-- !== 0; ) if (!b(e[u2], t2[u2], n)) return false;
    return true;
  }
  if (o != r) return false;
  let S2 = e instanceof Date, A = t2 instanceof Date;
  if (S2 != A) return false;
  if (S2 && A) return e.getTime() == t2.getTime();
  let I2 = e instanceof RegExp, L2 = t2 instanceof RegExp;
  if (I2 != L2) return false;
  if (I2 && L2) return e.toString() == t2.toString();
  let F = Object.keys(e);
  if (f2 = F.length, f2 !== Object.keys(t2).length) return false;
  for (u2 = f2; u2-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t2, F[u2])) return false;
  for (u2 = f2; u2-- !== 0; ) if (T = F[u2], !b(e[T], t2[T], n)) return false;
  return true;
}
function y(e, t2) {
  return b(e, t2);
}
function c(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function s(e) {
  return !l(e);
}
function p(e, t2) {
  if (!e || !t2) return null;
  try {
    let n = e[t2];
    if (s(n)) return n;
  } catch (n) {
  }
  if (Object.keys(e).length) {
    if (c(t2)) return t2(e);
    if (t2.indexOf(".") === -1) return e[t2];
    {
      let n = t2.split("."), o = e;
      for (let r = 0, u2 = n.length; r < u2; ++r) {
        if (o == null) return null;
        o = o[n[r]];
      }
      return o;
    }
  }
  return null;
}
function k(e, t2, n) {
  return n ? p(e, n) === p(t2, n) : y(e, t2);
}
function i(e, t2 = true) {
  return e instanceof Object && e.constructor === Object && (t2 || Object.keys(e).length !== 0);
}
function m(e, ...t2) {
  return c(e) ? e(...t2) : e;
}
function a(e, t2 = true) {
  return typeof e == "string" && (t2 || e !== "");
}
function g(e) {
  return a(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
}
function R(e, t2 = "", n = {}) {
  let o = g(t2).split("."), r = o.shift();
  if (r) {
    if (i(e)) {
      let u2 = Object.keys(e).find((f2) => g(f2) === r) || "";
      return R(m(e[u2], n), o.join("."), n);
    }
    return;
  }
  return m(e, n);
}
function h(e, t2 = true) {
  return Array.isArray(e) && (t2 || e.length !== 0);
}
function Y(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function X(e) {
  if (e && /[\xC0-\xFF\u0100-\u017E]/.test(e)) {
    let n = { A: /[\xC0-\xC5\u0100\u0102\u0104]/g, AE: /[\xC6]/g, C: /[\xC7\u0106\u0108\u010A\u010C]/g, D: /[\xD0\u010E\u0110]/g, E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g, G: /[\u011C\u011E\u0120\u0122]/g, H: /[\u0124\u0126]/g, I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g, IJ: /[\u0132]/g, J: /[\u0134]/g, K: /[\u0136]/g, L: /[\u0139\u013B\u013D\u013F\u0141]/g, N: /[\xD1\u0143\u0145\u0147\u014A]/g, O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g, OE: /[\u0152]/g, R: /[\u0154\u0156\u0158]/g, S: /[\u015A\u015C\u015E\u0160]/g, T: /[\u0162\u0164\u0166]/g, U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g, W: /[\u0174]/g, Y: /[\xDD\u0176\u0178]/g, Z: /[\u0179\u017B\u017D]/g, a: /[\xE0-\xE5\u0101\u0103\u0105]/g, ae: /[\xE6]/g, c: /[\xE7\u0107\u0109\u010B\u010D]/g, d: /[\u010F\u0111]/g, e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g, g: /[\u011D\u011F\u0121\u0123]/g, i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g, ij: /[\u0133]/g, j: /[\u0135]/g, k: /[\u0137,\u0138]/g, l: /[\u013A\u013C\u013E\u0140\u0142]/g, n: /[\xF1\u0144\u0146\u0148\u014B]/g, p: /[\xFE]/g, o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g, oe: /[\u0153]/g, r: /[\u0155\u0157\u0159]/g, s: /[\u015B\u015D\u015F\u0161]/g, t: /[\u0163\u0165\u0167]/g, u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g, w: /[\u0175]/g, y: /[\xFD\xFF\u0177]/g, z: /[\u017A\u017C\u017E]/g };
    for (let o in n) e = e.replace(n[o], o);
  }
  return e;
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/dom/index.mjs
function k2(t2, e) {
  return t2 ? t2.classList ? t2.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t2.className) : false;
}
function P(t2, e) {
  if (t2 && e) {
    let o = (n) => {
      k2(t2, n) || (t2.classList ? t2.classList.add(n) : t2.className += " " + n);
    };
    [e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
  }
}
function M(t2, e) {
  if (t2 && e) {
    let o = (n) => {
      t2.classList ? t2.classList.remove(n) : t2.className = t2.className.replace(new RegExp("(^|\\b)" + n.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };
    [e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
  }
}
function E(t2) {
  for (let e of document == null ? void 0 : document.styleSheets) try {
    for (let o of e == null ? void 0 : e.cssRules) for (let n of o == null ? void 0 : o.style) if (t2.test(n)) return { name: n, value: o.style.getPropertyValue(n).trim() };
  } catch (o) {
  }
  return null;
}
function v(t2) {
  let e = { width: 0, height: 0 };
  if (t2) {
    let [o, n] = [t2.style.visibility, t2.style.display], r = t2.getBoundingClientRect();
    t2.style.visibility = "hidden", t2.style.display = "block", e.width = r.width || t2.offsetWidth, e.height = r.height || t2.offsetHeight, t2.style.display = n, t2.style.visibility = o;
  }
  return e;
}
function y2() {
  let t2 = window, e = document, o = e.documentElement, n = e.getElementsByTagName("body")[0], r = t2.innerWidth || o.clientWidth || n.clientWidth, i3 = t2.innerHeight || o.clientHeight || n.clientHeight;
  return { width: r, height: i3 };
}
function S(t2) {
  return t2 ? Math.abs(t2.scrollLeft) : 0;
}
function $() {
  let t2 = document.documentElement;
  return (window.pageXOffset || S(t2)) - (t2.clientLeft || 0);
}
function D() {
  let t2 = document.documentElement;
  return (window.pageYOffset || t2.scrollTop) - (t2.clientTop || 0);
}
function I(t2) {
  return t2 ? getComputedStyle(t2).direction === "rtl" : false;
}
function V(t2, e, o = true) {
  var n, r, i3, s3;
  if (t2) {
    let a2 = t2.offsetParent ? { width: t2.offsetWidth, height: t2.offsetHeight } : v(t2), l3 = a2.height, d2 = a2.width, f2 = e.offsetHeight, c3 = e.offsetWidth, u2 = e.getBoundingClientRect(), g3 = D(), w2 = $(), st = y2(), W, N, nt = "top";
    u2.top + f2 + l3 > st.height ? (W = u2.top + g3 - l3, nt = "bottom", W < 0 && (W = g3)) : W = f2 + u2.top + g3, u2.left + d2 > st.width ? N = Math.max(0, u2.left + w2 + c3 - d2) : N = u2.left + w2, I(t2) ? t2.style.insetInlineEnd = N + "px" : t2.style.insetInlineStart = N + "px", t2.style.top = W + "px", t2.style.transformOrigin = nt, o && (t2.style.marginTop = nt === "bottom" ? `calc(${(r = (n = E(/-anchor-gutter$/)) == null ? void 0 : n.value) != null ? r : "2px"} * -1)` : (s3 = (i3 = E(/-anchor-gutter$/)) == null ? void 0 : i3.value) != null ? s3 : "");
  }
}
function C(t2, e) {
  if (t2 instanceof HTMLElement) {
    let o = t2.offsetWidth;
    if (e) {
      let n = getComputedStyle(t2);
      o += parseFloat(n.marginLeft) + parseFloat(n.marginRight);
    }
    return o;
  }
  return 0;
}
function j(t2, e, o = true, n = void 0) {
  var r;
  if (t2) {
    let i3 = t2.offsetParent ? { width: t2.offsetWidth, height: t2.offsetHeight } : v(t2), s3 = e.offsetHeight, a2 = e.getBoundingClientRect(), l3 = y2(), d2, f2, c3 = n != null ? n : "top";
    if (!n && a2.top + s3 + i3.height > l3.height ? (d2 = -1 * i3.height, c3 = "bottom", a2.top + d2 < 0 && (d2 = -1 * a2.top)) : d2 = s3, i3.width > l3.width ? f2 = a2.left * -1 : a2.left + i3.width > l3.width ? f2 = (a2.left + i3.width - l3.width) * -1 : f2 = 0, t2.style.top = d2 + "px", t2.style.insetInlineStart = f2 + "px", t2.style.transformOrigin = c3, o) {
      let u2 = (r = E(/-anchor-gutter$/)) == null ? void 0 : r.value;
      t2.style.marginTop = c3 === "bottom" ? `calc(${u2 != null ? u2 : "2px"} * -1)` : u2 != null ? u2 : "";
    }
  }
}
function h2(t2) {
  if (t2) {
    let e = t2.parentNode;
    return e && e instanceof ShadowRoot && e.host && (e = e.host), e;
  }
  return null;
}
function H(t2) {
  return !!(t2 !== null && typeof t2 != "undefined" && t2.nodeName && h2(t2));
}
function p2(t2) {
  return typeof Element != "undefined" ? t2 instanceof Element : t2 !== null && typeof t2 == "object" && t2.nodeType === 1 && typeof t2.nodeName == "string";
}
function b2(t2) {
  var o;
  if (p2(t2)) return t2;
  if (!t2 || typeof t2 != "object") return;
  let e = t2;
  if ("current" in t2) e = t2.current, e = (o = b2(e == null ? void 0 : e.elementRef)) != null ? o : e;
  else if ("value" in t2) e = t2.value;
  else if ("nativeElement" in t2) e = t2.nativeElement;
  else if ("el" in t2) {
    let n = t2.el;
    n && typeof n == "object" && "nativeElement" in n ? e = n.nativeElement : e = n;
  } else if ("elementRef" in t2) return b2(t2.elementRef);
  return e = m(e), p2(e) ? e : void 0;
}
function U(t2, e) {
  var o, n, r;
  if (t2) switch (t2) {
    case "document":
      return document;
    case "window":
      return window;
    case "body":
      return document.body;
    case "@next":
      return e == null ? void 0 : e.nextElementSibling;
    case "@prev":
      return e == null ? void 0 : e.previousElementSibling;
    case "@first":
      return e == null ? void 0 : e.firstElementChild;
    case "@last":
      return e == null ? void 0 : e.lastElementChild;
    case "@child":
      return (o = e == null ? void 0 : e.children) == null ? void 0 : o[0];
    case "@parent":
      return e == null ? void 0 : e.parentElement;
    case "@grandparent":
      return (n = e == null ? void 0 : e.parentElement) == null ? void 0 : n.parentElement;
    default: {
      if (typeof t2 == "string") {
        let l3 = t2.match(/^@child\[(\d+)]/);
        return l3 ? ((r = e == null ? void 0 : e.children) == null ? void 0 : r[parseInt(l3[1], 10)]) || null : document.querySelector(t2) || null;
      }
      let s3 = ((l3) => typeof l3 == "function" && "call" in l3 && "apply" in l3)(t2) ? t2() : t2, a2 = b2(s3);
      return H(a2) ? a2 : (s3 == null ? void 0 : s3.nodeType) === 9 ? s3 : void 0;
    }
  }
}
function ut(t2, e) {
  let o = U(t2, e);
  if (o) o.appendChild(e);
  else throw new Error("Cannot append " + e + " to " + t2);
}
function O(t2, e = {}) {
  if (p2(t2)) {
    let o = (r, i3) => {
      var a2, l3;
      let s3 = (a2 = t2 == null ? void 0 : t2.$attrs) != null && a2[r] ? [(l3 = t2 == null ? void 0 : t2.$attrs) == null ? void 0 : l3[r]] : [];
      return [i3].flat().reduce((d2, f2) => {
        if (f2 != null) {
          let c3 = typeof f2;
          if (c3 === "string" || c3 === "number") d2.push(f2);
          else if (c3 === "object") {
            let u2 = Array.isArray(f2) ? o(r, f2) : Object.entries(f2).map(([g3, w2]) => r === "style" && (w2 || w2 === 0) ? `${g3.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${w2}` : w2 ? g3 : void 0);
            d2 = u2.length ? d2.concat(u2.filter((g3) => !!g3)) : d2;
          }
        }
        return d2;
      }, s3);
    }, n = (r) => {
      o("style", r).forEach((s3) => {
        let a2 = s3.indexOf(":");
        if (a2 < 0) return;
        let l3 = s3.slice(0, a2).trim(), d2 = s3.slice(a2 + 1).trim();
        l3 && t2.style.setProperty(l3, d2);
      });
    };
    Object.entries(e).forEach(([r, i3]) => {
      if (i3 != null) {
        let s3 = r.match(/^on(.+)/);
        s3 ? t2.addEventListener(s3[1].toLowerCase(), i3) : r === "p-bind" || r === "pBind" ? O(t2, i3) : r === "style" ? (n(i3), (t2.$attrs = t2.$attrs || {}) && (t2.$attrs[r] = t2.style.cssText)) : (i3 = r === "class" ? [...new Set(o("class", i3))].join(" ").trim() : i3, (t2.$attrs = t2.$attrs || {}) && (t2.$attrs[r] = i3), t2.setAttribute(r, i3));
      }
    });
  }
}
function q(t2, e = {}, ...o) {
  if (t2) {
    let n = document.createElement(t2);
    return O(n, e), n.append(...o), n;
  }
}
function Z(t2, e) {
  return p2(t2) ? t2.matches(e) ? t2 : t2.querySelector(e) : null;
}
function bt(t2, e) {
  t2 && document.activeElement !== t2 && t2.focus(e);
}
function Tt(t2) {
  if (t2) {
    let e = t2.offsetHeight, o = getComputedStyle(t2);
    return e -= parseFloat(o.paddingTop) + parseFloat(o.paddingBottom) + parseFloat(o.borderTopWidth) + parseFloat(o.borderBottomWidth), e;
  }
  return 0;
}
function _(t2) {
  if (t2) {
    let e = t2.getBoundingClientRect();
    return { top: e.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0), left: e.left + (window.pageXOffset || S(document.documentElement) || S(document.body) || 0) };
  }
  return { top: "auto", left: "auto" };
}
function L(t2, e) {
  if (t2) {
    let o = t2.offsetHeight;
    if (e) {
      let n = getComputedStyle(t2);
      o += parseFloat(n.marginTop) + parseFloat(n.marginBottom);
    }
    return o;
  }
  return 0;
}
function Nt(t2) {
  if (t2) {
    let e = t2.offsetWidth, o = getComputedStyle(t2);
    return e -= parseFloat(o.paddingLeft) + parseFloat(o.paddingRight) + parseFloat(o.borderLeftWidth) + parseFloat(o.borderRightWidth), e;
  }
  return 0;
}
function Yt() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
function Qt() {
  return new Promise((t2) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(t2);
    });
  });
}
function Gt(t2) {
  var e;
  t2 && ("remove" in Element.prototype ? t2.remove() : (e = t2.parentNode) == null || e.removeChild(t2));
}
function te(t2, e = "", o) {
  if (p2(t2) && o !== null && o !== void 0) {
    if (e === "style") {
      typeof o == "string" ? t2.style.cssText = o : typeof o == "object" && Object.entries(o).forEach(([n, r]) => {
        if (r == null) return;
        let i3 = n.startsWith("--") ? n : n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        t2.style.setProperty(i3, String(r));
      });
      return;
    }
    t2.setAttribute(e, o);
  }
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/mergeprops/index.mjs
var x = Object.defineProperty;
var d = Object.getOwnPropertySymbols;
var c2 = Object.prototype.hasOwnProperty;
var y3 = Object.prototype.propertyIsEnumerable;
var m2 = (t2, r, e) => r in t2 ? x(t2, r, { enumerable: true, configurable: true, writable: true, value: e }) : t2[r] = e;
var u = (t2, r) => {
  for (var e in r || (r = {})) c2.call(r, e) && m2(t2, e, r[e]);
  if (d) for (var e of d(r)) y3.call(r, e) && m2(t2, e, r[e]);
  return t2;
};
function i2(...t2) {
  if (t2) {
    let r = [];
    for (let e = 0; e < t2.length; e++) {
      let a2 = t2[e];
      if (!a2) continue;
      let o = typeof a2;
      if (o === "string" || o === "number") r.push(a2);
      else if (o === "object") {
        let f2 = Array.isArray(a2) ? [i2(...a2)] : Object.entries(a2).map(([s3, n]) => n ? s3 : void 0);
        r = f2.length ? r.concat(f2.filter((s3) => !!s3)) : r;
      }
    }
    return r.join(" ").trim();
  }
}
function l2(t2) {
  return typeof t2 == "function" && "call" in t2 && "apply" in t2;
}
function p3({ skipUndefined: t2 = false }, ...r) {
  return r == null ? void 0 : r.reduce((e, a2 = {}) => {
    for (let o in a2) {
      let f2 = a2[o];
      if (!(t2 && f2 === void 0)) if (o === "style") e.style = u(u({}, e.style), a2.style);
      else if (o === "class" || o === "className") e[o] = i2(e[o], a2[o]);
      else if (l2(f2)) {
        let s3 = e[o];
        e[o] = s3 ? (...n) => {
          s3(...n), f2(...n);
        } : f2;
      } else e[o] = f2;
    }
    return e;
  }, {});
}
function w(...t2) {
  return p3({ skipUndefined: false }, ...t2);
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/uuid/index.mjs
var t = {};
function s2(n = "pui_id_") {
  return Object.hasOwn(t, n) || (t[n] = 0), t[n]++, `${n}${t[n]}`;
}

// node_modules/primeng/node_modules/@primeuix/utils/dist/zindex/index.mjs
function g2() {
  let r = [], i3 = (e, n, t2 = 999) => {
    let s3 = u2(e, n, t2), o = s3.value + (s3.key === e ? 0 : t2) + 1;
    return r.push({ key: e, value: o }), o;
  }, d2 = (e) => {
    r = r.filter((n) => n.value !== e);
  }, a2 = (e, n) => u2(e, n).value, u2 = (e, n, t2 = 0) => [...r].reverse().find((s3) => n ? true : s3.key === e) || { key: e, value: t2 }, l3 = (e) => e && parseInt(e.style.zIndex, 10) || 0;
  return { get: l3, set: (e, n, t2) => {
    n && (n.style.zIndex = String(i3(e, true, t2)));
  }, clear: (e) => {
    e && (d2(l3(e)), e.style.zIndex = "");
  }, getCurrent: (e) => a2(e, true) };
}
var x2 = g2();

export {
  f,
  l,
  c,
  s,
  p,
  k,
  m,
  a,
  g,
  R,
  h,
  Y,
  X,
  k2,
  P,
  M,
  E,
  V,
  C,
  j,
  U,
  ut,
  O,
  q,
  Z,
  bt,
  Tt,
  _,
  L,
  Nt,
  Yt,
  Qt,
  Gt,
  te,
  w,
  s2
};
//# sourceMappingURL=chunk-JFTSXROT.js.map
