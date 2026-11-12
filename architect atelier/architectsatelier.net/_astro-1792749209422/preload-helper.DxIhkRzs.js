import {
    A as e,
    At as t,
    Ct as n,
    Dt as r,
    Et as i,
    H as a,
    I as o,
    J as s,
    M as c,
    N as l,
    Ot as u,
    Pt as d,
    S as f,
    St as p,
    Tt as m,
    U as h,
    _t as g,
    bt as _,
    ct as v,
    gt as y,
    ht as b,
    i as x,
    j as ee,
    m as te,
    mt as S,
    n as ne,
    p as C,
    pt as w,
    q as T,
    r as re,
    s as ie,
    t as ae,
    v as oe,
    vt as se,
    w as ce,
    wt as le,
    x as ue,
    xt as de,
    yt as fe
} from "./runtime-core.esm-bundler.CQ_8-9vl.js";
var E = void 0,
    D = typeof window < `u` && window.trustedTypes;
if (D) try {
    E = D.createPolicy(`vue`, {
        createHTML: e => e
    })
} catch {}
var pe = E ? e => E.createHTML(e) : e => e,
    me = `http://www.w3.org/2000/svg`,
    he = `http://www.w3.org/1998/Math/MathML`,
    O = typeof document < `u` ? document : null,
    ge = O && O.createElement(`template`),
    _e = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            let t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            let i = t === `svg` ? O.createElementNS(me, e) : t === `mathml` ? O.createElementNS(he, e) : n ? O.createElement(e, {
                is: n
            }) : O.createElement(e);
            return e === `select` && r && r.multiple != null && i.setAttribute(`multiple`, r.multiple), i
        },
        createText: e => O.createTextNode(e),
        createComment: e => O.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => O.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, ``)
        },
        insertStaticContent(e, t, n, r, i, a) {
            let o = n ? n.previousSibling : t.lastChild;
            if (i && (i === a || i.nextSibling))
                for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
            else {
                ge.innerHTML = pe(r === `svg` ? `<svg>${e}</svg>` : r === `mathml` ? `<math>${e}</math>` : e);
                let i = ge.content;
                if (r === `svg` || r === `mathml`) {
                    let e = i.firstChild;
                    for (; e.firstChild;) i.appendChild(e.firstChild);
                    i.removeChild(e)
                }
                t.insertBefore(i, n)
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    },
    k = `transition`,
    A = `animation`,
    j = Symbol(`_vtc`),
    ve = {
        name: String,
        type: String,
        css: {
            type: Boolean,
            default: !0
        },
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String
    },
    ye = y({}, ne, ve),
    be = (e => (e.displayName = `Transition`, e.props = ye, e))((e, {
        slots: t
    }) => ce(ae, Se(e), t)),
    M = (e, t = []) => {
        _(e) ? e.forEach(e => e(...t)) : e && e(...t)
    },
    xe = e => e ? _(e) ? e.some(e => e.length > 1) : e.length > 1 : !1;

function Se(e) {
    let t = {};
    for (let n in e) n in ve || (t[n] = e[n]);
    if (e.css === !1) return t;
    let {
        name: n = `v`,
        type: r,
        duration: i,
        enterFromClass: a = `${n}-enter-from`,
        enterActiveClass: o = `${n}-enter-active`,
        enterToClass: s = `${n}-enter-to`,
        appearFromClass: c = a,
        appearActiveClass: l = o,
        appearToClass: u = s,
        leaveFromClass: d = `${n}-leave-from`,
        leaveActiveClass: f = `${n}-leave-active`,
        leaveToClass: p = `${n}-leave-to`
    } = e, m = Ce(i), h = m && m[0], g = m && m[1], {
        onBeforeEnter: _,
        onEnter: v,
        onEnterCancelled: b,
        onLeave: x,
        onLeaveCancelled: ee,
        onBeforeAppear: te = _,
        onAppear: S = v,
        onAppearCancelled: ne = b
    } = t, C = (e, t, n, r) => {
        e._enterCancelled = r, F(e, t ? u : s), F(e, t ? l : o), n && n()
    }, w = (e, t) => {
        e._isLeaving = !1, F(e, d), F(e, p), F(e, f), t && t()
    }, T = e => (t, n) => {
        let i = e ? S : v,
            o = () => C(t, e, n);
        M(i, [t, o]), we(() => {
            F(t, e ? c : a), P(t, e ? u : s), xe(i) || Ee(t, r, h, o)
        })
    };
    return y(t, {
        onBeforeEnter(e) {
            M(_, [e]), P(e, a), P(e, o)
        },
        onBeforeAppear(e) {
            M(te, [e]), P(e, c), P(e, l)
        },
        onEnter: T(!1),
        onAppear: T(!0),
        onLeave(e, t) {
            e._isLeaving = !0;
            let n = () => w(e, t);
            P(e, d), e._enterCancelled ? (P(e, f), I(e)) : (I(e), P(e, f)), we(() => {
                e._isLeaving && (F(e, d), P(e, p), xe(x) || Ee(e, r, g, n))
            }), M(x, [e, n])
        },
        onEnterCancelled(e) {
            C(e, !1, void 0, !0), M(b, [e])
        },
        onAppearCancelled(e) {
            C(e, !0, void 0, !0), M(ne, [e])
        },
        onLeaveCancelled(e) {
            w(e), M(ee, [e])
        }
    })
}

function Ce(e) {
    if (e == null) return null;
    if (n(e)) return [N(e.enter), N(e.leave)]; {
        let t = N(e);
        return [t, t]
    }
}

function N(e) {
    return d(e)
}

function P(e, t) {
    t.split(/\s+/).forEach(t => t && e.classList.add(t)), (e[j] || (e[j] = new Set)).add(t)
}

function F(e, t) {
    t.split(/\s+/).forEach(t => t && e.classList.remove(t));
    let n = e[j];
    n && (n.delete(t), n.size || (e[j] = void 0))
}

function we(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e)
    })
}
var Te = 0;

function Ee(e, t, n, r) {
    let i = e._endId = ++Te,
        a = () => {
            i === e._endId && r()
        };
    if (n != null) return setTimeout(a, n);
    let {
        type: o,
        timeout: s,
        propCount: c
    } = De(e, t);
    if (!o) return r();
    let l = o + `end`,
        u = 0,
        d = () => {
            e.removeEventListener(l, f), a()
        },
        f = t => {
            t.target === e && ++u >= c && d()
        };
    setTimeout(() => {
        u < c && d()
    }, s + 1), e.addEventListener(l, f)
}

function De(e, t) {
    let n = window.getComputedStyle(e),
        r = e => (n[e] || ``).split(`, `),
        i = r(`${k}Delay`),
        a = r(`${k}Duration`),
        o = Oe(i, a),
        s = r(`${A}Delay`),
        c = r(`${A}Duration`),
        l = Oe(s, c),
        u = null,
        d = 0,
        f = 0;
    t === k ? o > 0 && (u = k, d = o, f = a.length) : t === A ? l > 0 && (u = A, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? k : A : null, f = u ? u === k ? a.length : c.length : 0);
    let p = u === k && /\b(?:transform|all)(?:,|$)/.test(r(`${k}Property`).toString());
    return {
        type: u,
        timeout: d,
        propCount: f,
        hasTransform: p
    }
}

function Oe(e, t) {
    for (; e.length < t.length;) e = e.concat(e);
    return Math.max(...t.map((t, n) => ke(t) + ke(e[n])))
}

function ke(e) {
    return e === `auto` ? 0 : Number(e.slice(0, -1).replace(`,`, `.`)) * 1e3
}

function I(e) {
    return (e ? e.ownerDocument : document).body.offsetHeight
}

function Ae(e, t, n) {
    let r = e[j];
    r && (t = (t ? [t, ...r] : [...r]).join(` `)), t == null ? e.removeAttribute(`class`) : n ? e.setAttribute(`class`, t) : e.className = t
}
var L = Symbol(`_vod`),
    R = Symbol(`_vsh`),
    je = {
        name: `show`,
        beforeMount(e, {
            value: t
        }, {
            transition: n
        }) {
            e[L] = e.style.display === `none` ? `` : e.style.display, n && t ? n.beforeEnter(e) : z(e, t)
        },
        mounted(e, {
            value: t
        }, {
            transition: n
        }) {
            n && t && n.enter(e)
        },
        updated(e, {
            value: t,
            oldValue: n
        }, {
            transition: r
        }) {
            !t != !n && (r ? t ? (r.beforeEnter(e), z(e, !0), r.enter(e)) : r.leave(e, () => {
                z(e, !1)
            }) : z(e, t))
        },
        beforeUnmount(e, {
            value: t
        }) {
            z(e, t)
        }
    };

function z(e, t) {
    e.style.display = t ? e[L] : `none`, e[R] = !t
}
var Me = Symbol(``);

function Ne(t) {
    let n = ue();
    if (!n) return;
    let r = n.ut = (e = t(n.proxy)) => {
            Array.from(document.querySelectorAll(`[data-v-owner="${n.uid}"]`)).forEach(t => V(t, e))
        },
        i = () => {
            let e = t(n.proxy);
            n.ce ? V(n.ce, e) : B(n.subTree, e), r(e)
        };
    e(() => {
        o(i)
    }), ee(() => {
        s(i, w, {
            flush: `post`
        });
        let e = new MutationObserver(i);
        e.observe(n.subTree.el.parentNode, {
            childList: !0
        }), c(() => e.disconnect())
    })
}

function B(e, t) {
    if (e.shapeFlag & 128) {
        let n = e.suspense;
        e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
            B(n.activeBranch, t)
        })
    }
    for (; e.component;) e = e.component.subTree;
    if (e.shapeFlag & 1 && e.el) V(e.el, t);
    else if (e.type === re) e.children.forEach(e => B(e, t));
    else if (e.type === x) {
        let {
            el: n,
            anchor: r
        } = e;
        for (; n && (V(n, t), n !== r);) n = n.nextSibling
    }
}

function V(e, n) {
    if (e.nodeType === 1) {
        let r = e.style,
            i = ``;
        for (let e in n) {
            let a = t(n[e]);
            r.setProperty(`--${e}`, a), i += `--${e}: ${a};`
        }
        r[Me] = i
    }
}
var Pe = /(?:^|;)\s*display\s*:/;

function Fe(e, t, n) {
    let r = e.style,
        a = i(n),
        o = !1;
    if (n && !a) {
        if (t)
            if (i(t))
                for (let e of t.split(`;`)) {
                    let t = e.slice(0, e.indexOf(`:`)).trim();
                    n[t] ? ? U(r, t, ``)
                } else
                    for (let e in t) n[e] ? ? U(r, e, ``);
        for (let a in n) {
            a === `display` && (o = !0);
            let s = n[a];
            s == null ? U(r, a, ``) : Re(e, a, !i(t) && t ? t[a] : void 0, s) || U(r, a, s)
        }
    } else if (a) {
        if (t !== n) {
            let e = r[Me];
            e && (n += `;` + e), r.cssText = n, o = Pe.test(n)
        }
    } else t && e.removeAttribute(`style`);
    L in e && ((!a || t !== n) && (e[L] = o ? r.display : ``), e[R] && (r.display = `none`))
}
var H = /\s*!important$/;

function U(e, t, n) {
    if (_(n)) n.forEach(n => U(e, t, n));
    else if (n ? ? = ``, t.startsWith(`--`)) H.test(n) ? e.setProperty(t, n.replace(H, ``), `important`) : e.setProperty(t, n);
    else {
        let r = Le(e, t);
        H.test(n) ? e.setProperty(g(r), n.replace(H, ``), `important`) : e[r] = n
    }
}
var Ie = [`Webkit`, `Moz`, `ms`],
    W = {};

function Le(e, t) {
    let n = W[t];
    if (n) return n;
    let r = S(t);
    if (r !== `filter` && r in e) return W[t] = r;
    r = b(r);
    for (let n = 0; n < Ie.length; n++) {
        let i = Ie[n] + r;
        if (i in e) return W[t] = i
    }
    return t
}

function Re(e, t, n, r) {
    return e.tagName === `TEXTAREA` && (t === `width` || t === `height`) && i(r) && n === r
}
var ze = `http://www.w3.org/1999/xlink`;

function Be(e, t, n, i, a, o = m(t)) {
    i && t.startsWith(`xlink:`) ? n == null ? e.removeAttributeNS(ze, t.slice(6, t.length)) : e.setAttributeNS(ze, t, n) : n == null || o && !se(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? `` : r(n) ? String(n) : n)
}

function Ve(e, t, n, r, i) {
    if (t === `innerHTML` || t === `textContent`) {
        n != null && (e[t] = t === `innerHTML` ? pe(n) : n);
        return
    }
    let a = e.tagName;
    if (t === `value` && a !== `PROGRESS` && !a.includes(`-`)) {
        let r = a === `OPTION` ? e.getAttribute(`value`) || `` : e.value,
            i = n == null ? e.type === `checkbox` ? `on` : `` : String(n);
        (r !== i || !(`_value` in e)) && (e.value = i), n ? ? e.removeAttribute(t), e._value = n;
        return
    }
    let o = !1;
    if (n === `` || n == null) {
        let r = typeof e[t];
        r === `boolean` ? n = se(n) : n == null && r === `string` ? (n = ``, o = !0) : r === `number` && (n = 0, o = !0)
    }
    try {
        e[t] = n
    } catch {}
    o && e.removeAttribute(i || t)
}

function G(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function He(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
var Ue = Symbol(`_vei`);

function We(e, t, n, r, i = null) {
    let a = e[Ue] || (e[Ue] = {}),
        o = a[t];
    if (r && o) o.value = r;
    else {
        let [n, s] = qe(t);
        r ? G(e, n, a[t] = Ze(r, i), s) : o && (He(e, n, o, s), a[t] = void 0)
    }
}
var Ge = /(Once|Passive|Capture)$/,
    Ke = /^on:?(?:Once|Passive|Capture)$/;

function qe(e) {
    let t, n;
    for (;
        (n = e.match(Ge)) && !Ke.test(e);) t || = {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
    return [e[2] === `:` ? e.slice(3) : g(e.slice(2)), t]
}
var Je = 0,
    Ye = Promise.resolve(),
    Xe = () => Je || = (Ye.then(() => Je = 0), Date.now());

function Ze(e, t) {
    let n = e => {
        if (!e._vts) e._vts = Date.now();
        else if (e._vts <= n.attached) return;
        let r = n.value;
        if (_(r)) {
            let n = e.stopImmediatePropagation;
            e.stopImmediatePropagation = () => {
                n.call(e), e._stopped = !0
            };
            let i = r.slice(),
                a = [e];
            for (let n = 0; n < i.length && !e._stopped; n++) {
                let e = i[n];
                e && ie(e, t, 5, a)
            }
        } else ie(r, t, 5, [e])
    };
    return n.value = e, n.attached = Xe(), n
}
var Qe = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    $e = (e, t, n, r, a, o) => {
        let s = a === `svg`;
        t === `class` ? Ae(e, r, s) : t === `style` ? Fe(e, n, r) : le(t) ? p(t) || We(e, t, n, r, o) : (t[0] === `.` ? (t = t.slice(1), !0) : t[0] === `^` ? (t = t.slice(1), !1) : et(e, t, r, s)) ? (Ve(e, t, r), !e.tagName.includes(`-`) && (t === `value` || t === `checked` || t === `selected`) && Be(e, t, r, s, o, t !== `value`)) : e._isVueCE && (tt(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !i(r))) ? Ve(e, S(t), r, o, t) : (t === `true-value` ? e._trueValue = r : t === `false-value` && (e._falseValue = r), Be(e, t, r, s))
    };

function et(e, t, n, r) {
    if (r) return !!(t === `innerHTML` || t === `textContent` || t in e && Qe(t) && de(n));
    if (t === `spellcheck` || t === `draggable` || t === `translate` || t === `autocorrect` || t === `sandbox` && e.tagName === `IFRAME` || t === `form` || t === `list` && e.tagName === `INPUT` || t === `type` && e.tagName === `TEXTAREA`) return !1;
    if (t === `width` || t === `height`) {
        let t = e.tagName;
        if (t === `IMG` || t === `VIDEO` || t === `CANVAS` || t === `SOURCE`) return !1
    }
    return Qe(t) && i(n) ? !1 : t in e
}

function tt(e, t) {
    let n = e._def.props;
    if (!n) return !1;
    let r = S(t);
    return Array.isArray(n) ? n.some(e => S(e) === r) : Object.keys(n).some(e => S(e) === r)
}
var nt = new WeakMap,
    rt = new WeakMap,
    K = Symbol(`_moveCb`),
    it = Symbol(`_enterCb`),
    q = new WeakMap,
    at = (e => (delete e.props.mode, e))({
        name: `TransitionGroup`,
        props: y({}, ye, {
            tag: String,
            moveClass: String
        }),
        setup(e, {
            slots: t
        }) {
            let n = ue(),
                r = T(),
                i, o, s, c, u = () => (c === void 0 && (c = i.length > 0 && pt(i[0].el, n.vnode.el, st(e))), c);
            return l(() => {
                if (q.delete(n), !u()) {
                    i = [], s = void 0;
                    return
                }
                let t = st(e);
                i.forEach(ot);
                let r = s && ft(s, n.vnode.el);
                s = void 0, i.forEach(e => ct(e, r));
                let a = i.filter(lt);
                I(n.vnode.el), a.forEach(e => {
                    let n = e.el,
                        r = n.style;
                    P(n, t), r.transform = r.webkitTransform = r.transitionDuration = ``;
                    let i = n[K] = e => {
                        e && e.target !== n || (!e || e.propertyName.endsWith(`transform`)) && (n.removeEventListener(`transitionend`, i), n[K] = null, F(n, t))
                    };
                    n.addEventListener(`transitionend`, i)
                }), i = []
            }), () => {
                let l = v(e),
                    d = Se(l),
                    p = l.tag || re;
                if (i = [], c = void 0, o)
                    for (let e = 0; e < o.length; e++) {
                        let t = o[e];
                        t.el && t.el instanceof Element && !t.el[R] && (i.push(t), h(t, a(t, d, r, n)), nt.set(t, J(t.el)))
                    }
                o = t.default ? f(t.default()) : [];
                for (let e = 0; e < o.length; e++) {
                    let t = o[e];
                    t.key != null && h(t, a(t, d, r, n))
                }
                return i.length && (s = ut(n), q.set(n, u)), oe(p, null, o)
            }
        }
    });

function ot(e) {
    let t = e.el;
    t[K] && t[K](), t[it] && t[it]()
}

function st(e) {
    return e.moveClass || `${e.name||`v`}-move`
}

function ct(e, t) {
    rt.set(e, J(e.el, t))
}

function lt(e) {
    let t = nt.get(e),
        n = rt.get(e),
        r = t.left - n.left,
        i = t.top - n.top;
    if (r || i) {
        let t = e.el,
            n = t.style,
            a = t.getBoundingClientRect(),
            o = 1,
            s = 1;
        return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r/o}px,${i/s}px)`, n.transitionDuration = `0s`, e
    }
}

function J(e, t) {
    let n = e.getBoundingClientRect();
    return {
        left: n.left - (t ? t.left : 0),
        top: n.top - (t ? t.top : 0)
    }
}

function ut(e) {
    let t;
    for (let n = e.parent; n; n = n.parent) {
        let r = q.get(n);
        if (r) {
            let i = dt(n.vnode.el, e.vnode.el);
            i && (t || = []).push(y(J(i), {
                item: i,
                willMove: r
            }))
        }
    }
    return t
}

function dt(e, t) {
    let n = e.nodeType === 1 ? e : e.parentNode;
    for (; t && t.parentNode !== n;) t = t.parentNode;
    if (t && t.nodeType === 1) return t
}

function ft(e, t) {
    let n = e.find(e => e.willMove() && e.item.contains(t));
    return n && J(n.item, n)
}

function pt(e, t, n) {
    let r = e.cloneNode(),
        i = e[j];
    i && i.forEach(e => {
        e.split(/\s+/).forEach(e => e && r.classList.remove(e))
    }), n.split(/\s+/).forEach(e => e && r.classList.add(e)), r.style.display = `none`;
    let a = t.nodeType === 1 ? t : t.parentNode;
    a.appendChild(r);
    let {
        hasTransform: o
    } = De(r);
    return a.removeChild(r), o
}
var mt = e => {
    let t = e.props[`onUpdate:modelValue`] || !1;
    return _(t) ? e => fe(t, e) : t
};

function ht(e) {
    e.target.composing = !0
}

function gt(e) {
    let t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event(`input`)))
}
var Y = Symbol(`_assign`),
    X = Symbol(`_initialValue`);

function Z(e, t, n) {
    return t && (e = e.trim()), n && (e = u(e)), e
}
var _t = {
        created(e, {
            modifiers: {
                lazy: t,
                trim: n,
                number: r
            }
        }, i) {
            e.parentNode && (e.type === `text` ? e[X] = e.defaultValue.replace(/[\r\n]/g, ``) : e.type === `textarea` && (e[X] = e.defaultValue.replace(/\r\n?/g, `
`))), e[Y] = mt(i);
            let a = r || i.props && i.props.type === `number`;
            G(e, t ? `change` : `input`, t => {
                t.target.composing || e[Y](Z(e.value, n, a))
            }), (n || a) && G(e, `change`, () => {
                e.value = Z(e.value, n, a)
            }), t || (G(e, `compositionstart`, ht), G(e, `compositionend`, gt), G(e, `change`, gt))
        },
        mounted(e, {
            value: t,
            modifiers: {
                trim: n,
                number: r
            }
        }) {
            let i = t ? ? ``,
                a = e[X];
            delete e[X], a !== void 0 && (e.type === `text` || e.type === `textarea`) && e.value !== a ? e[Y](Z(e.value, n, r)) : e.value = i
        },
        beforeUpdate(e, {
            value: t,
            oldValue: n,
            modifiers: {
                lazy: r,
                trim: i,
                number: a
            }
        }, o) {
            if (e[Y] = mt(o), e.composing) return;
            let s = (a || e.type === `number`) && !/^0\d/.test(e.value) ? u(e.value) : e.value,
                c = t ? ? ``;
            if (s === c) return;
            let l = e.getRootNode();
            (l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== `range` && (r && t === n || i && e.value.trim() === c) || (e.value = c)
        }
    },
    vt = [`ctrl`, `shift`, `alt`, `meta`],
    yt = {
        stop: e => e.stopPropagation(),
        prevent: e => e.preventDefault(),
        self: e => e.target !== e.currentTarget,
        ctrl: e => !e.ctrlKey,
        shift: e => !e.shiftKey,
        alt: e => !e.altKey,
        meta: e => !e.metaKey,
        left: e => `button` in e && e.button !== 0,
        middle: e => `button` in e && e.button !== 1,
        right: e => `button` in e && e.button !== 2,
        exact: (e, t) => vt.some(n => e[`${n}Key`] && !t.includes(n))
    },
    bt = (e, t) => {
        if (!e) return e;
        let n = e._withMods || = {},
            r = t.join(`.`);
        return n[r] || (n[r] = ((n, ...r) => {
            for (let e = 0; e < t.length; e++) {
                let r = yt[t[e]];
                if (r && r(n, t)) return
            }
            return e(n, ...r)
        }))
    },
    xt = {
        esc: `escape`,
        space: ` `,
        up: `arrow-up`,
        left: `arrow-left`,
        right: `arrow-right`,
        down: `arrow-down`,
        delete: `backspace`
    },
    St = (e, t) => {
        let n = e._withKeys || = {},
            r = t.join(`.`);
        return n[r] || (n[r] = (n => {
            if (!(`key` in n)) return;
            let r = g(n.key);
            if (t.some(e => e === r || xt[e] === r)) return e(n)
        }))
    },
    Q = y({
        patchProp: $e
    }, _e),
    $, Ct = !1;

function wt() {
    return $ || = te(Q)
}

function Tt() {
    return $ = Ct ? $ : C(Q), Ct = !0, $
}
var Et = ((...e) => {
        wt().render(...e)
    }),
    Dt = ((...e) => {
        let t = wt().createApp(...e),
            {
                mount: n
            } = t;
        return t.mount = e => {
            let r = At(e);
            if (!r) return;
            let i = t._component;
            !de(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = ``);
            let a = n(r, !1, kt(r));
            return r instanceof Element && (r.removeAttribute(`v-cloak`), r.setAttribute(`data-v-app`, ``)), a
        }, t
    }),
    Ot = ((...e) => {
        let t = Tt().createApp(...e),
            {
                mount: n
            } = t;
        return t.mount = e => {
            let t = At(e);
            if (t) return n(t, !0, kt(t))
        }, t
    });

function kt(e) {
    if (e instanceof SVGElement) return `svg`;
    if (typeof MathMLElement == `function` && e instanceof MathMLElement) return `mathml`
}

function At(e) {
    return i(e) ? document.querySelector(e) : e
}
var jt = (function() {
        let e = typeof document < `u` && document.createElement(`link`).relList;
        return e && e.supports && e.supports(`modulepreload`) ? `modulepreload` : `preload`
    })(),
    Mt = function(e) {
        return `/` + e
    },
    Nt = {},
    Pt = function(e, t, n) {
        let r = Promise.resolve();
        if (t && t.length > 0) {
            let e = document.getElementsByTagName(`link`),
                i = document.querySelector(`meta[property=csp-nonce]`),
                a = i ? .nonce || i ? .getAttribute(`nonce`);

            function o(e) {
                return Promise.all(e.map(e => Promise.resolve(e).then(e => ({
                    status: `fulfilled`,
                    value: e
                }), e => ({
                    status: `rejected`,
                    reason: e
                }))))
            }

            function s(e) {
                return import.meta.resolve ?
                    import.meta.resolve(e) : new URL(e,
                        import.meta.url).href
            }
            r = o(t.map(t => {
                if (t = Mt(t, n), t = s(t), t in Nt) return;
                Nt[t] = !0;
                let r = t.endsWith(`.css`);
                for (let n = e.length - 1; n >= 0; n--) {
                    let i = e[n];
                    if (i.href === t && (!r || i.rel === `stylesheet`)) return
                }
                let i = document.createElement(`link`);
                if (i.rel = r ? `stylesheet` : jt, r || (i.as = `script`), i.crossOrigin = ``, i.href = t, a && i.setAttribute(`nonce`, a), document.head.appendChild(i), r) return new Promise((e, n) => {
                    i.addEventListener(`load`, e), i.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`)))
                })
            }))
        }

        function i(e) {
            let t = new Event(`vite:preloadError`, {
                cancelable: !0
            });
            if (t.payload = e, window.dispatchEvent(t), !t.defaultPrevented) throw e
        }
        return r.then(t => {
            for (let e of t || []) e.status === `rejected` && i(e.reason);
            return e().catch(i)
        })
    };
export {
    Ot as a, _t as c, bt as d, Dt as i, je as l, be as n, Et as o, at as r, Ne as s, Pt as t, St as u
};