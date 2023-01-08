function Bs(e, t) {
	const n = Object.create(null),
		s = e.split(",");
	for (let o = 0; o < s.length; o++) n[s[o]] = !0;
	return t ? o => !!n[o.toLowerCase()] : o => !!n[o];
}
function zn(e) {
	if (K(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const s = e[n],
				o = we(s) ? Lr(s) : zn(s);
			if (o) for (const i in o) t[i] = o[i];
		}
		return t;
	} else {
		if (we(e)) return e;
		if (me(e)) return e;
	}
}
const Vr = /;(?![^(]*\))/g,
	Tr = /:([^]+)/,
	Er = /\/\*.*?\*\//gs;
function Lr(e) {
	const t = {};
	return (
		e
			.replace(Er, "")
			.split(Vr)
			.forEach(n => {
				if (n) {
					const s = n.split(Tr);
					s.length > 1 && (t[s[0].trim()] = s[1].trim());
				}
			}),
		t
	);
}
function de(e) {
	let t = "";
	if (we(e)) t = e;
	else if (K(e))
		for (let n = 0; n < e.length; n++) {
			const s = de(e[n]);
			s && (t += s + " ");
		}
	else if (me(e)) for (const n in e) e[n] && (t += n + " ");
	return t.trim();
}
const Mr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	Ar = Bs(Mr);
function di(e) {
	return !!e || e === "";
}
const ae = e =>
		we(e)
			? e
			: e == null
			? ""
			: K(e) || (me(e) && (e.toString === vi || !J(e.toString)))
			? JSON.stringify(e, hi, 2)
			: String(e),
	hi = (e, t) =>
		t && t.__v_isRef
			? hi(e, t.value)
			: Bt(t)
			? {
					[`Map(${t.size})`]: [...t.entries()].reduce(
						(n, [s, o]) => ((n[`${s} =>`] = o), n),
						{},
					),
			  }
			: _i(t)
			? { [`Set(${t.size})`]: [...t.values()] }
			: me(t) && !K(t) && !mi(t)
			? String(t)
			: t,
	ge = {},
	Nt = [],
	qe = () => {},
	Ir = () => !1,
	Nr = /^on[^a-z]/,
	pn = e => Nr.test(e),
	Os = e => e.startsWith("onUpdate:"),
	$e = Object.assign,
	Fs = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	},
	Br = Object.prototype.hasOwnProperty,
	ie = (e, t) => Br.call(e, t),
	K = Array.isArray,
	Bt = e => Un(e) === "[object Map]",
	_i = e => Un(e) === "[object Set]",
	J = e => typeof e == "function",
	we = e => typeof e == "string",
	Hs = e => typeof e == "symbol",
	me = e => e !== null && typeof e == "object",
	pi = e => me(e) && J(e.then) && J(e.catch),
	vi = Object.prototype.toString,
	Un = e => vi.call(e),
	Or = e => Un(e).slice(8, -1),
	mi = e => Un(e) === "[object Object]",
	Rs = e => we(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	tn = Bs(
		",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
	),
	jn = e => {
		const t = Object.create(null);
		return n => t[n] || (t[n] = e(n));
	},
	Fr = /-(\w)/g,
	tt = jn(e => e.replace(Fr, (t, n) => (n ? n.toUpperCase() : ""))),
	Hr = /\B([A-Z])/g,
	Gt = jn(e => e.replace(Hr, "-$1").toLowerCase()),
	Kn = jn(e => e.charAt(0).toUpperCase() + e.slice(1)),
	cs = jn(e => (e ? `on${Kn(e)}` : "")),
	cn = (e, t) => !Object.is(e, t),
	as = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t);
	},
	En = (e, t, n) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
	},
	Ds = e => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	};
let bo;
const Rr = () =>
	bo ||
	(bo =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
			? self
			: typeof window < "u"
			? window
			: typeof global < "u"
			? global
			: {});
let Ie;
class Dr {
	constructor(t = !1) {
		(this.detached = t),
			(this.active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = Ie),
			!t && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1);
	}
	run(t) {
		if (this.active) {
			const n = Ie;
			try {
				return (Ie = this), t();
			} finally {
				Ie = n;
			}
		}
	}
	on() {
		Ie = this;
	}
	off() {
		Ie = this.parent;
	}
	stop(t) {
		if (this.active) {
			let n, s;
			for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
			for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
			if (this.scopes)
				for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
			if (!this.detached && this.parent && !t) {
				const o = this.parent.scopes.pop();
				o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index));
			}
			(this.parent = void 0), (this.active = !1);
		}
	}
}
function zr(e, t = Ie) {
	t && t.active && t.effects.push(e);
}
function Ur() {
	return Ie;
}
function jr(e) {
	Ie && Ie.cleanups.push(e);
}
const zs = e => {
		const t = new Set(e);
		return (t.w = 0), (t.n = 0), t;
	},
	gi = e => (e.w & ht) > 0,
	bi = e => (e.n & ht) > 0,
	Kr = ({ deps: e }) => {
		if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ht;
	},
	qr = e => {
		const { deps: t } = e;
		if (t.length) {
			let n = 0;
			for (let s = 0; s < t.length; s++) {
				const o = t[s];
				gi(o) && !bi(o) ? o.delete(e) : (t[n++] = o), (o.w &= ~ht), (o.n &= ~ht);
			}
			t.length = n;
		}
	},
	bs = new WeakMap();
let en = 0,
	ht = 1;
const ys = 30;
let je;
const St = Symbol(""),
	ws = Symbol("");
class Us {
	constructor(t, n = null, s) {
		(this.fn = t),
			(this.scheduler = n),
			(this.active = !0),
			(this.deps = []),
			(this.parent = void 0),
			zr(this, s);
	}
	run() {
		if (!this.active) return this.fn();
		let t = je,
			n = ft;
		for (; t; ) {
			if (t === this) return;
			t = t.parent;
		}
		try {
			return (
				(this.parent = je),
				(je = this),
				(ft = !0),
				(ht = 1 << ++en),
				en <= ys ? Kr(this) : yo(this),
				this.fn()
			);
		} finally {
			en <= ys && qr(this),
				(ht = 1 << --en),
				(je = this.parent),
				(ft = n),
				(this.parent = void 0),
				this.deferStop && this.stop();
		}
	}
	stop() {
		je === this
			? (this.deferStop = !0)
			: this.active && (yo(this), this.onStop && this.onStop(), (this.active = !1));
	}
}
function yo(e) {
	const { deps: t } = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0;
	}
}
let ft = !0;
const yi = [];
function Yt() {
	yi.push(ft), (ft = !1);
}
function Qt() {
	const e = yi.pop();
	ft = e === void 0 ? !0 : e;
}
function Oe(e, t, n) {
	if (ft && je) {
		let s = bs.get(e);
		s || bs.set(e, (s = new Map()));
		let o = s.get(n);
		o || s.set(n, (o = zs())), wi(o);
	}
}
function wi(e, t) {
	let n = !1;
	en <= ys ? bi(e) || ((e.n |= ht), (n = !gi(e))) : (n = !e.has(je)),
		n && (e.add(je), je.deps.push(e));
}
function ot(e, t, n, s, o, i) {
	const r = bs.get(e);
	if (!r) return;
	let l = [];
	if (t === "clear") l = [...r.values()];
	else if (n === "length" && K(e)) {
		const c = Ds(s);
		r.forEach((f, h) => {
			(h === "length" || h >= c) && l.push(f);
		});
	} else
		switch ((n !== void 0 && l.push(r.get(n)), t)) {
			case "add":
				K(e)
					? Rs(n) && l.push(r.get("length"))
					: (l.push(r.get(St)), Bt(e) && l.push(r.get(ws)));
				break;
			case "delete":
				K(e) || (l.push(r.get(St)), Bt(e) && l.push(r.get(ws)));
				break;
			case "set":
				Bt(e) && l.push(r.get(St));
				break;
		}
	if (l.length === 1) l[0] && xs(l[0]);
	else {
		const c = [];
		for (const f of l) f && c.push(...f);
		xs(zs(c));
	}
}
function xs(e, t) {
	const n = K(e) ? e : [...e];
	for (const s of n) s.computed && wo(s);
	for (const s of n) s.computed || wo(s);
}
function wo(e, t) {
	(e !== je || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Wr = Bs("__proto__,__v_isRef,__isVue"),
	xi = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter(e => e !== "arguments" && e !== "caller")
			.map(e => Symbol[e])
			.filter(Hs),
	),
	Gr = js(),
	Yr = js(!1, !0),
	Qr = js(!0),
	xo = Jr();
function Jr() {
	const e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach(t => {
			e[t] = function (...n) {
				const s = ce(this);
				for (let i = 0, r = this.length; i < r; i++) Oe(s, "get", i + "");
				const o = s[t](...n);
				return o === -1 || o === !1 ? s[t](...n.map(ce)) : o;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach(t => {
			e[t] = function (...n) {
				Yt();
				const s = ce(this)[t].apply(this, n);
				return Qt(), s;
			};
		}),
		e
	);
}
function js(e = !1, t = !1) {
	return function (s, o, i) {
		if (o === "__v_isReactive") return !e;
		if (o === "__v_isReadonly") return e;
		if (o === "__v_isShallow") return t;
		if (o === "__v_raw" && i === (e ? (t ? hl : Si) : t ? Ci : ki).get(s)) return s;
		const r = K(s);
		if (!e && r && ie(xo, o)) return Reflect.get(xo, o, i);
		const l = Reflect.get(s, o, i);
		return (Hs(o) ? xi.has(o) : Wr(o)) || (e || Oe(s, "get", o), t)
			? l
			: ke(l)
			? r && Rs(o)
				? l
				: l.value
			: me(l)
			? e
				? Ws(l)
				: Wn(l)
			: l;
	};
}
const Xr = $i(),
	Zr = $i(!0);
function $i(e = !1) {
	return function (n, s, o, i) {
		let r = n[s];
		if (jt(r) && ke(r) && !ke(o)) return !1;
		if (!e && (!Ln(o) && !jt(o) && ((r = ce(r)), (o = ce(o))), !K(n) && ke(r) && !ke(o)))
			return (r.value = o), !0;
		const l = K(n) && Rs(s) ? Number(s) < n.length : ie(n, s),
			c = Reflect.set(n, s, o, i);
		return n === ce(i) && (l ? cn(o, r) && ot(n, "set", s, o) : ot(n, "add", s, o)), c;
	};
}
function el(e, t) {
	const n = ie(e, t);
	e[t];
	const s = Reflect.deleteProperty(e, t);
	return s && n && ot(e, "delete", t, void 0), s;
}
function tl(e, t) {
	const n = Reflect.has(e, t);
	return (!Hs(t) || !xi.has(t)) && Oe(e, "has", t), n;
}
function nl(e) {
	return Oe(e, "iterate", K(e) ? "length" : St), Reflect.ownKeys(e);
}
const Pi = { get: Gr, set: Xr, deleteProperty: el, has: tl, ownKeys: nl },
	sl = {
		get: Qr,
		set(e, t) {
			return !0;
		},
		deleteProperty(e, t) {
			return !0;
		},
	},
	ol = $e({}, Pi, { get: Yr, set: Zr }),
	Ks = e => e,
	qn = e => Reflect.getPrototypeOf(e);
function bn(e, t, n = !1, s = !1) {
	e = e.__v_raw;
	const o = ce(e),
		i = ce(t);
	n || (t !== i && Oe(o, "get", t), Oe(o, "get", i));
	const { has: r } = qn(o),
		l = s ? Ks : n ? Ys : an;
	if (r.call(o, t)) return l(e.get(t));
	if (r.call(o, i)) return l(e.get(i));
	e !== o && e.get(t);
}
function yn(e, t = !1) {
	const n = this.__v_raw,
		s = ce(n),
		o = ce(e);
	return (
		t || (e !== o && Oe(s, "has", e), Oe(s, "has", o)),
		e === o ? n.has(e) : n.has(e) || n.has(o)
	);
}
function wn(e, t = !1) {
	return (e = e.__v_raw), !t && Oe(ce(e), "iterate", St), Reflect.get(e, "size", e);
}
function $o(e) {
	e = ce(e);
	const t = ce(this);
	return qn(t).has.call(t, e) || (t.add(e), ot(t, "add", e, e)), this;
}
function Po(e, t) {
	t = ce(t);
	const n = ce(this),
		{ has: s, get: o } = qn(n);
	let i = s.call(n, e);
	i || ((e = ce(e)), (i = s.call(n, e)));
	const r = o.call(n, e);
	return n.set(e, t), i ? cn(t, r) && ot(n, "set", e, t) : ot(n, "add", e, t), this;
}
function ko(e) {
	const t = ce(this),
		{ has: n, get: s } = qn(t);
	let o = n.call(t, e);
	o || ((e = ce(e)), (o = n.call(t, e))), s && s.call(t, e);
	const i = t.delete(e);
	return o && ot(t, "delete", e, void 0), i;
}
function Co() {
	const e = ce(this),
		t = e.size !== 0,
		n = e.clear();
	return t && ot(e, "clear", void 0, void 0), n;
}
function xn(e, t) {
	return function (s, o) {
		const i = this,
			r = i.__v_raw,
			l = ce(r),
			c = t ? Ks : e ? Ys : an;
		return !e && Oe(l, "iterate", St), r.forEach((f, h) => s.call(o, c(f), c(h), i));
	};
}
function $n(e, t, n) {
	return function (...s) {
		const o = this.__v_raw,
			i = ce(o),
			r = Bt(i),
			l = e === "entries" || (e === Symbol.iterator && r),
			c = e === "keys" && r,
			f = o[e](...s),
			h = n ? Ks : t ? Ys : an;
		return (
			!t && Oe(i, "iterate", c ? ws : St),
			{
				next() {
					const { value: p, done: g } = f.next();
					return g
						? { value: p, done: g }
						: { value: l ? [h(p[0]), h(p[1])] : h(p), done: g };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function rt(e) {
	return function (...t) {
		return e === "delete" ? !1 : this;
	};
}
function il() {
	const e = {
			get(i) {
				return bn(this, i);
			},
			get size() {
				return wn(this);
			},
			has: yn,
			add: $o,
			set: Po,
			delete: ko,
			clear: Co,
			forEach: xn(!1, !1),
		},
		t = {
			get(i) {
				return bn(this, i, !1, !0);
			},
			get size() {
				return wn(this);
			},
			has: yn,
			add: $o,
			set: Po,
			delete: ko,
			clear: Co,
			forEach: xn(!1, !0),
		},
		n = {
			get(i) {
				return bn(this, i, !0);
			},
			get size() {
				return wn(this, !0);
			},
			has(i) {
				return yn.call(this, i, !0);
			},
			add: rt("add"),
			set: rt("set"),
			delete: rt("delete"),
			clear: rt("clear"),
			forEach: xn(!0, !1),
		},
		s = {
			get(i) {
				return bn(this, i, !0, !0);
			},
			get size() {
				return wn(this, !0);
			},
			has(i) {
				return yn.call(this, i, !0);
			},
			add: rt("add"),
			set: rt("set"),
			delete: rt("delete"),
			clear: rt("clear"),
			forEach: xn(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach(i => {
			(e[i] = $n(i, !1, !1)),
				(n[i] = $n(i, !0, !1)),
				(t[i] = $n(i, !1, !0)),
				(s[i] = $n(i, !0, !0));
		}),
		[e, n, t, s]
	);
}
const [rl, ll, cl, al] = il();
function qs(e, t) {
	const n = t ? (e ? al : cl) : e ? ll : rl;
	return (s, o, i) =>
		o === "__v_isReactive"
			? !e
			: o === "__v_isReadonly"
			? e
			: o === "__v_raw"
			? s
			: Reflect.get(ie(n, o) && o in s ? n : s, o, i);
}
const ul = { get: qs(!1, !1) },
	fl = { get: qs(!1, !0) },
	dl = { get: qs(!0, !1) },
	ki = new WeakMap(),
	Ci = new WeakMap(),
	Si = new WeakMap(),
	hl = new WeakMap();
function _l(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function pl(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : _l(Or(e));
}
function Wn(e) {
	return jt(e) ? e : Gs(e, !1, Pi, ul, ki);
}
function vl(e) {
	return Gs(e, !1, ol, fl, Ci);
}
function Ws(e) {
	return Gs(e, !0, sl, dl, Si);
}
function Gs(e, t, n, s, o) {
	if (!me(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const i = o.get(e);
	if (i) return i;
	const r = pl(e);
	if (r === 0) return e;
	const l = new Proxy(e, r === 2 ? s : n);
	return o.set(e, l), l;
}
function Ot(e) {
	return jt(e) ? Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function jt(e) {
	return !!(e && e.__v_isReadonly);
}
function Ln(e) {
	return !!(e && e.__v_isShallow);
}
function Vi(e) {
	return Ot(e) || jt(e);
}
function ce(e) {
	const t = e && e.__v_raw;
	return t ? ce(t) : e;
}
function nn(e) {
	return En(e, "__v_skip", !0), e;
}
const an = e => (me(e) ? Wn(e) : e),
	Ys = e => (me(e) ? Ws(e) : e);
function Ti(e) {
	ft && je && ((e = ce(e)), wi(e.dep || (e.dep = zs())));
}
function Ei(e, t) {
	(e = ce(e)), e.dep && xs(e.dep);
}
function ke(e) {
	return !!(e && e.__v_isRef === !0);
}
function _e(e) {
	return Li(e, !1);
}
function ml(e) {
	return Li(e, !0);
}
function Li(e, t) {
	return ke(e) ? e : new gl(e, t);
}
class gl {
	constructor(t, n) {
		(this.__v_isShallow = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = n ? t : ce(t)),
			(this._value = n ? t : an(t));
	}
	get value() {
		return Ti(this), this._value;
	}
	set value(t) {
		const n = this.__v_isShallow || Ln(t) || jt(t);
		(t = n ? t : ce(t)),
			cn(t, this._rawValue) &&
				((this._rawValue = t), (this._value = n ? t : an(t)), Ei(this));
	}
}
function _(e) {
	return ke(e) ? e.value : e;
}
const bl = {
	get: (e, t, n) => _(Reflect.get(e, t, n)),
	set: (e, t, n, s) => {
		const o = e[t];
		return ke(o) && !ke(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, s);
	},
};
function Mi(e) {
	return Ot(e) ? e : new Proxy(e, bl);
}
var Ai;
class yl {
	constructor(t, n, s, o) {
		(this._setter = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this[Ai] = !1),
			(this._dirty = !0),
			(this.effect = new Us(t, () => {
				this._dirty || ((this._dirty = !0), Ei(this));
			})),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !o),
			(this.__v_isReadonly = s);
	}
	get value() {
		const t = ce(this);
		return (
			Ti(t),
			(t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())),
			t._value
		);
	}
	set value(t) {
		this._setter(t);
	}
}
Ai = "__v_isReadonly";
function wl(e, t, n = !1) {
	let s, o;
	const i = J(e);
	return i ? ((s = e), (o = qe)) : ((s = e.get), (o = e.set)), new yl(s, o, i || !o, n);
}
function dt(e, t, n, s) {
	let o;
	try {
		o = s ? e(...s) : e();
	} catch (i) {
		Gn(i, t, n);
	}
	return o;
}
function Re(e, t, n, s) {
	if (J(e)) {
		const i = dt(e, t, n, s);
		return (
			i &&
				pi(i) &&
				i.catch(r => {
					Gn(r, t, n);
				}),
			i
		);
	}
	const o = [];
	for (let i = 0; i < e.length; i++) o.push(Re(e[i], t, n, s));
	return o;
}
function Gn(e, t, n, s = !0) {
	const o = t ? t.vnode : null;
	if (t) {
		let i = t.parent;
		const r = t.proxy,
			l = n;
		for (; i; ) {
			const f = i.ec;
			if (f) {
				for (let h = 0; h < f.length; h++) if (f[h](e, r, l) === !1) return;
			}
			i = i.parent;
		}
		const c = t.appContext.config.errorHandler;
		if (c) {
			dt(c, null, 10, [e, r, l]);
			return;
		}
	}
	xl(e, n, o, s);
}
function xl(e, t, n, s = !0) {
	console.error(e);
}
let un = !1,
	$s = !1;
const Pe = [];
let Ze = 0;
const Ft = [];
let st = null,
	$t = 0;
const Ii = Promise.resolve();
let Qs = null;
function Js(e) {
	const t = Qs || Ii;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function $l(e) {
	let t = Ze + 1,
		n = Pe.length;
	for (; t < n; ) {
		const s = (t + n) >>> 1;
		fn(Pe[s]) < e ? (t = s + 1) : (n = s);
	}
	return t;
}
function Xs(e) {
	(!Pe.length || !Pe.includes(e, un && e.allowRecurse ? Ze + 1 : Ze)) &&
		(e.id == null ? Pe.push(e) : Pe.splice($l(e.id), 0, e), Ni());
}
function Ni() {
	!un && !$s && (($s = !0), (Qs = Ii.then(Bi)));
}
function Pl(e) {
	const t = Pe.indexOf(e);
	t > Ze && Pe.splice(t, 1);
}
function kl(e) {
	K(e) ? Ft.push(...e) : (!st || !st.includes(e, e.allowRecurse ? $t + 1 : $t)) && Ft.push(e),
		Ni();
}
function So(e, t = un ? Ze + 1 : 0) {
	for (; t < Pe.length; t++) {
		const n = Pe[t];
		n && n.pre && (Pe.splice(t, 1), t--, n());
	}
}
function Mn(e) {
	if (Ft.length) {
		const t = [...new Set(Ft)];
		if (((Ft.length = 0), st)) {
			st.push(...t);
			return;
		}
		for (st = t, st.sort((n, s) => fn(n) - fn(s)), $t = 0; $t < st.length; $t++) st[$t]();
		(st = null), ($t = 0);
	}
}
const fn = e => (e.id == null ? 1 / 0 : e.id),
	Cl = (e, t) => {
		const n = fn(e) - fn(t);
		if (n === 0) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1;
		}
		return n;
	};
function Bi(e) {
	($s = !1), (un = !0), Pe.sort(Cl);
	const t = qe;
	try {
		for (Ze = 0; Ze < Pe.length; Ze++) {
			const n = Pe[Ze];
			n && n.active !== !1 && dt(n, null, 14);
		}
	} finally {
		(Ze = 0), (Pe.length = 0), Mn(), (un = !1), (Qs = null), (Pe.length || Ft.length) && Bi();
	}
}
function Sl(e, t, ...n) {
	if (e.isUnmounted) return;
	const s = e.vnode.props || ge;
	let o = n;
	const i = t.startsWith("update:"),
		r = i && t.slice(7);
	if (r && r in s) {
		const h = `${r === "modelValue" ? "model" : r}Modifiers`,
			{ number: p, trim: g } = s[h] || ge;
		g && (o = n.map(P => (we(P) ? P.trim() : P))), p && (o = n.map(Ds));
	}
	let l,
		c = s[(l = cs(t))] || s[(l = cs(tt(t)))];
	!c && i && (c = s[(l = cs(Gt(t)))]), c && Re(c, e, 6, o);
	const f = s[l + "Once"];
	if (f) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[l]) return;
		(e.emitted[l] = !0), Re(f, e, 6, o);
	}
}
function Oi(e, t, n = !1) {
	const s = t.emitsCache,
		o = s.get(e);
	if (o !== void 0) return o;
	const i = e.emits;
	let r = {},
		l = !1;
	if (!J(e)) {
		const c = f => {
			const h = Oi(f, t, !0);
			h && ((l = !0), $e(r, h));
		};
		!n && t.mixins.length && t.mixins.forEach(c),
			e.extends && c(e.extends),
			e.mixins && e.mixins.forEach(c);
	}
	return !i && !l
		? (me(e) && s.set(e, null), null)
		: (K(i) ? i.forEach(c => (r[c] = null)) : $e(r, i), me(e) && s.set(e, r), r);
}
function Yn(e, t) {
	return !e || !pn(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, "")),
		  ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, Gt(t)) || ie(e, t));
}
let Ce = null,
	Qn = null;
function An(e) {
	const t = Ce;
	return (Ce = e), (Qn = (e && e.type.__scopeId) || null), t;
}
function We(e) {
	Qn = e;
}
function Ge() {
	Qn = null;
}
function A(e, t = Ce, n) {
	if (!t || e._n) return e;
	const s = (...o) => {
		s._d && Oo(-1);
		const i = An(t);
		let r;
		try {
			r = e(...o);
		} finally {
			An(i), s._d && Oo(1);
		}
		return r;
	};
	return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function us(e) {
	const {
		type: t,
		vnode: n,
		proxy: s,
		withProxy: o,
		props: i,
		propsOptions: [r],
		slots: l,
		attrs: c,
		emit: f,
		render: h,
		renderCache: p,
		data: g,
		setupState: P,
		ctx: j,
		inheritAttrs: F,
	} = e;
	let se, x;
	const E = An(e);
	try {
		if (n.shapeFlag & 4) {
			const G = o || s;
			(se = Ue(h.call(G, G, p, i, P, g, j))), (x = c);
		} else {
			const G = t;
			(se = Ue(G.length > 1 ? G(i, { attrs: c, slots: l, emit: f }) : G(i, null))),
				(x = t.props ? c : Vl(c));
		}
	} catch (G) {
		(on.length = 0), Gn(G, e, 1), (se = T(Be));
	}
	let I = se;
	if (x && F !== !1) {
		const G = Object.keys(x),
			{ shapeFlag: Z } = I;
		G.length && Z & 7 && (r && G.some(Os) && (x = Tl(x, r)), (I = _t(I, x)));
	}
	return (
		n.dirs && ((I = _t(I)), (I.dirs = I.dirs ? I.dirs.concat(n.dirs) : n.dirs)),
		n.transition && (I.transition = n.transition),
		(se = I),
		An(E),
		se
	);
}
const Vl = e => {
		let t;
		for (const n in e) (n === "class" || n === "style" || pn(n)) && ((t || (t = {}))[n] = e[n]);
		return t;
	},
	Tl = (e, t) => {
		const n = {};
		for (const s in e) (!Os(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
		return n;
	};
function El(e, t, n) {
	const { props: s, children: o, component: i } = e,
		{ props: r, children: l, patchFlag: c } = t,
		f = i.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return s ? Vo(s, r, f) : !!r;
		if (c & 8) {
			const h = t.dynamicProps;
			for (let p = 0; p < h.length; p++) {
				const g = h[p];
				if (r[g] !== s[g] && !Yn(f, g)) return !0;
			}
		}
	} else
		return (o || l) && (!l || !l.$stable)
			? !0
			: s === r
			? !1
			: s
			? r
				? Vo(s, r, f)
				: !0
			: !!r;
	return !1;
}
function Vo(e, t, n) {
	const s = Object.keys(t);
	if (s.length !== Object.keys(e).length) return !0;
	for (let o = 0; o < s.length; o++) {
		const i = s[o];
		if (t[i] !== e[i] && !Yn(n, i)) return !0;
	}
	return !1;
}
function Ll({ vnode: e, parent: t }, n) {
	for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ml = e => e.__isSuspense;
function Fi(e, t) {
	t && t.pendingBranch ? (K(e) ? t.effects.push(...e) : t.effects.push(e)) : kl(e);
}
function Ht(e, t) {
	if (xe) {
		let n = xe.provides;
		const s = xe.parent && xe.parent.provides;
		s === n && (n = xe.provides = Object.create(s)), (n[e] = t);
	}
}
function Ne(e, t, n = !1) {
	const s = xe || Ce;
	if (s) {
		const o =
			s.parent == null
				? s.vnode.appContext && s.vnode.appContext.provides
				: s.parent.provides;
		if (o && e in o) return o[e];
		if (arguments.length > 1) return n && J(t) ? t.call(s.proxy) : t;
	}
}
function Tt(e, t) {
	return Jn(e, null, t);
}
function Hi(e, t) {
	return Jn(e, null, { flush: "post" });
}
const Pn = {};
function et(e, t, n) {
	return Jn(e, t, n);
}
function Jn(e, t, { immediate: n, deep: s, flush: o, onTrack: i, onTrigger: r } = ge) {
	const l = xe;
	let c,
		f = !1,
		h = !1;
	if (
		(ke(e)
			? ((c = () => e.value), (f = Ln(e)))
			: Ot(e)
			? ((c = () => e), (s = !0))
			: K(e)
			? ((h = !0),
			  (f = e.some(I => Ot(I) || Ln(I))),
			  (c = () =>
					e.map(I => {
						if (ke(I)) return I.value;
						if (Ot(I)) return It(I);
						if (J(I)) return dt(I, l, 2);
					})))
			: J(e)
			? t
				? (c = () => dt(e, l, 2))
				: (c = () => {
						if (!(l && l.isUnmounted)) return p && p(), Re(e, l, 3, [g]);
				  })
			: (c = qe),
		t && s)
	) {
		const I = c;
		c = () => It(I());
	}
	let p,
		g = I => {
			p = x.onStop = () => {
				dt(I, l, 4);
			};
		},
		P;
	if (hn)
		if (((g = qe), t ? n && Re(t, l, 3, [c(), h ? [] : void 0, g]) : c(), o === "sync")) {
			const I = Pc();
			P = I.__watcherHandles || (I.__watcherHandles = []);
		} else return qe;
	let j = h ? new Array(e.length).fill(Pn) : Pn;
	const F = () => {
		if (x.active)
			if (t) {
				const I = x.run();
				(s || f || (h ? I.some((G, Z) => cn(G, j[Z])) : cn(I, j))) &&
					(p && p(),
					Re(t, l, 3, [I, j === Pn ? void 0 : h && j[0] === Pn ? [] : j, g]),
					(j = I));
			} else x.run();
	};
	F.allowRecurse = !!t;
	let se;
	o === "sync"
		? (se = F)
		: o === "post"
		? (se = () => Le(F, l && l.suspense))
		: ((F.pre = !0), l && (F.id = l.uid), (se = () => Xs(F)));
	const x = new Us(c, se);
	t ? (n ? F() : (j = x.run())) : o === "post" ? Le(x.run.bind(x), l && l.suspense) : x.run();
	const E = () => {
		x.stop(), l && l.scope && Fs(l.scope.effects, x);
	};
	return P && P.push(E), E;
}
function Al(e, t, n) {
	const s = this.proxy,
		o = we(e) ? (e.includes(".") ? Ri(s, e) : () => s[e]) : e.bind(s, s);
	let i;
	J(t) ? (i = t) : ((i = t.handler), (n = t));
	const r = xe;
	qt(this);
	const l = Jn(o, i.bind(s), n);
	return r ? qt(r) : Vt(), l;
}
function Ri(e, t) {
	const n = t.split(".");
	return () => {
		let s = e;
		for (let o = 0; o < n.length && s; o++) s = s[n[o]];
		return s;
	};
}
function It(e, t) {
	if (!me(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
	if ((t.add(e), ke(e))) It(e.value, t);
	else if (K(e)) for (let n = 0; n < e.length; n++) It(e[n], t);
	else if (_i(e) || Bt(e))
		e.forEach(n => {
			It(n, t);
		});
	else if (mi(e)) for (const n in e) It(e[n], t);
	return e;
}
function Il() {
	const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
	return (
		De(() => {
			e.isMounted = !0;
		}),
		Ki(() => {
			e.isUnmounting = !0;
		}),
		e
	);
}
const Fe = [Function, Array],
	Nl = {
		name: "BaseTransition",
		props: {
			mode: String,
			appear: Boolean,
			persisted: Boolean,
			onBeforeEnter: Fe,
			onEnter: Fe,
			onAfterEnter: Fe,
			onEnterCancelled: Fe,
			onBeforeLeave: Fe,
			onLeave: Fe,
			onAfterLeave: Fe,
			onLeaveCancelled: Fe,
			onBeforeAppear: Fe,
			onAppear: Fe,
			onAfterAppear: Fe,
			onAppearCancelled: Fe,
		},
		setup(e, { slots: t }) {
			const n = ts(),
				s = Il();
			let o;
			return () => {
				const i = t.default && Ui(t.default(), !0);
				if (!i || !i.length) return;
				let r = i[0];
				if (i.length > 1) {
					for (const F of i)
						if (F.type !== Be) {
							r = F;
							break;
						}
				}
				const l = ce(e),
					{ mode: c } = l;
				if (s.isLeaving) return fs(r);
				const f = To(r);
				if (!f) return fs(r);
				const h = Ps(f, l, s, n);
				ks(f, h);
				const p = n.subTree,
					g = p && To(p);
				let P = !1;
				const { getTransitionKey: j } = f.type;
				if (j) {
					const F = j();
					o === void 0 ? (o = F) : F !== o && ((o = F), (P = !0));
				}
				if (g && g.type !== Be && (!Pt(f, g) || P)) {
					const F = Ps(g, l, s, n);
					if ((ks(g, F), c === "out-in"))
						return (
							(s.isLeaving = !0),
							(F.afterLeave = () => {
								(s.isLeaving = !1), n.update.active !== !1 && n.update();
							}),
							fs(r)
						);
					c === "in-out" &&
						f.type !== Be &&
						(F.delayLeave = (se, x, E) => {
							const I = zi(s, g);
							(I[String(g.key)] = g),
								(se._leaveCb = () => {
									x(), (se._leaveCb = void 0), delete h.delayedLeave;
								}),
								(h.delayedLeave = E);
						});
				}
				return r;
			};
		},
	},
	Di = Nl;
function zi(e, t) {
	const { leavingVNodes: n } = e;
	let s = n.get(t.type);
	return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function Ps(e, t, n, s) {
	const {
			appear: o,
			mode: i,
			persisted: r = !1,
			onBeforeEnter: l,
			onEnter: c,
			onAfterEnter: f,
			onEnterCancelled: h,
			onBeforeLeave: p,
			onLeave: g,
			onAfterLeave: P,
			onLeaveCancelled: j,
			onBeforeAppear: F,
			onAppear: se,
			onAfterAppear: x,
			onAppearCancelled: E,
		} = t,
		I = String(e.key),
		G = zi(n, e),
		Z = (M, X) => {
			M && Re(M, s, 9, X);
		},
		he = (M, X) => {
			const Q = X[1];
			Z(M, X), K(M) ? M.every(re => re.length <= 1) && Q() : M.length <= 1 && Q();
		},
		oe = {
			mode: i,
			persisted: r,
			beforeEnter(M) {
				let X = l;
				if (!n.isMounted)
					if (o) X = F || l;
					else return;
				M._leaveCb && M._leaveCb(!0);
				const Q = G[I];
				Q && Pt(e, Q) && Q.el._leaveCb && Q.el._leaveCb(), Z(X, [M]);
			},
			enter(M) {
				let X = c,
					Q = f,
					re = h;
				if (!n.isMounted)
					if (o) (X = se || c), (Q = x || f), (re = E || h);
					else return;
				let B = !1;
				const ee = (M._enterCb = R => {
					B ||
						((B = !0),
						R ? Z(re, [M]) : Z(Q, [M]),
						oe.delayedLeave && oe.delayedLeave(),
						(M._enterCb = void 0));
				});
				X ? he(X, [M, ee]) : ee();
			},
			leave(M, X) {
				const Q = String(e.key);
				if ((M._enterCb && M._enterCb(!0), n.isUnmounting)) return X();
				Z(p, [M]);
				let re = !1;
				const B = (M._leaveCb = ee => {
					re ||
						((re = !0),
						X(),
						ee ? Z(j, [M]) : Z(P, [M]),
						(M._leaveCb = void 0),
						G[Q] === e && delete G[Q]);
				});
				(G[Q] = e), g ? he(g, [M, B]) : B();
			},
			clone(M) {
				return Ps(M, t, n, s);
			},
		};
	return oe;
}
function fs(e) {
	if (Xn(e)) return (e = _t(e)), (e.children = null), e;
}
function To(e) {
	return Xn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function ks(e, t) {
	e.shapeFlag & 6 && e.component
		? ks(e.component.subTree, t)
		: e.shapeFlag & 128
		? ((e.ssContent.transition = t.clone(e.ssContent)),
		  (e.ssFallback.transition = t.clone(e.ssFallback)))
		: (e.transition = t);
}
function Ui(e, t = !1, n) {
	let s = [],
		o = 0;
	for (let i = 0; i < e.length; i++) {
		let r = e[i];
		const l = n == null ? r.key : String(n) + String(r.key != null ? r.key : i);
		r.type === Y
			? (r.patchFlag & 128 && o++, (s = s.concat(Ui(r.children, t, l))))
			: (t || r.type !== Be) && s.push(l != null ? _t(r, { key: l }) : r);
	}
	if (o > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2;
	return s;
}
function H(e) {
	return J(e) ? { setup: e, name: e.name } : e;
}
const Rt = e => !!e.type.__asyncLoader,
	Xn = e => e.type.__isKeepAlive;
function Bl(e, t) {
	ji(e, "a", t);
}
function Ol(e, t) {
	ji(e, "da", t);
}
function ji(e, t, n = xe) {
	const s =
		e.__wdc ||
		(e.__wdc = () => {
			let o = n;
			for (; o; ) {
				if (o.isDeactivated) return;
				o = o.parent;
			}
			return e();
		});
	if ((Zn(t, s, n), n)) {
		let o = n.parent;
		for (; o && o.parent; ) Xn(o.parent.vnode) && Fl(s, t, n, o), (o = o.parent);
	}
}
function Fl(e, t, n, s) {
	const o = Zn(t, e, s, !0);
	pt(() => {
		Fs(s[t], o);
	}, n);
}
function Zn(e, t, n = xe, s = !1) {
	if (n) {
		const o = n[e] || (n[e] = []),
			i =
				t.__weh ||
				(t.__weh = (...r) => {
					if (n.isUnmounted) return;
					Yt(), qt(n);
					const l = Re(t, n, e, r);
					return Vt(), Qt(), l;
				});
		return s ? o.unshift(i) : o.push(i), i;
	}
}
const it =
		e =>
		(t, n = xe) =>
			(!hn || e === "sp") && Zn(e, (...s) => t(...s), n),
	Hl = it("bm"),
	De = it("m"),
	Rl = it("bu"),
	Zs = it("u"),
	Ki = it("bum"),
	pt = it("um"),
	Dl = it("sp"),
	zl = it("rtg"),
	Ul = it("rtc");
function jl(e, t = xe) {
	Zn("ec", e, t);
}
function Xe(e, t, n, s) {
	const o = e.dirs,
		i = t && t.dirs;
	for (let r = 0; r < o.length; r++) {
		const l = o[r];
		i && (l.oldValue = i[r].value);
		let c = l.dir[s];
		c && (Yt(), Re(c, n, 8, [e.el, l, e, t]), Qt());
	}
}
const eo = "components";
function Et(e, t) {
	return Wi(eo, e, !0, t) || e;
}
const qi = Symbol();
function to(e) {
	return we(e) ? Wi(eo, e, !1) || e : e || qi;
}
function Wi(e, t, n = !0, s = !1) {
	const o = Ce || xe;
	if (o) {
		const i = o.type;
		if (e === eo) {
			const l = bc(i, !1);
			if (l && (l === t || l === tt(t) || l === Kn(tt(t)))) return i;
		}
		const r = Eo(o[e] || i[e], t) || Eo(o.appContext[e], t);
		return !r && s ? i : r;
	}
}
function Eo(e, t) {
	return e && (e[t] || e[tt(t)] || e[Kn(tt(t))]);
}
function Se(e, t, n, s) {
	let o;
	const i = n && n[s];
	if (K(e) || we(e)) {
		o = new Array(e.length);
		for (let r = 0, l = e.length; r < l; r++) o[r] = t(e[r], r, void 0, i && i[r]);
	} else if (typeof e == "number") {
		o = new Array(e);
		for (let r = 0; r < e; r++) o[r] = t(r + 1, r, void 0, i && i[r]);
	} else if (me(e))
		if (e[Symbol.iterator]) o = Array.from(e, (r, l) => t(r, l, void 0, i && i[l]));
		else {
			const r = Object.keys(e);
			o = new Array(r.length);
			for (let l = 0, c = r.length; l < c; l++) {
				const f = r[l];
				o[l] = t(e[f], f, l, i && i[l]);
			}
		}
	else o = [];
	return n && (n[s] = o), o;
}
function S(e, t, n = {}, s, o) {
	if (Ce.isCE || (Ce.parent && Rt(Ce.parent) && Ce.parent.isCE))
		return t !== "default" && (n.name = t), T("slot", n, s && s());
	let i = e[t];
	i && i._c && (i._d = !1), d();
	const r = i && Gi(i(n)),
		l = W(
			Y,
			{ key: n.key || (r && r.key) || `_${t}` },
			r || (s ? s() : []),
			r && e._ === 1 ? 64 : -2,
		);
	return !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), i && i._c && (i._d = !0), l;
}
function Gi(e) {
	return e.some(t => (Bn(t) ? !(t.type === Be || (t.type === Y && !Gi(t.children))) : !0))
		? e
		: null;
}
const Cs = e => (e ? (ir(e) ? io(e) || e.proxy : Cs(e.parent)) : null),
	sn = $e(Object.create(null), {
		$: e => e,
		$el: e => e.vnode.el,
		$data: e => e.data,
		$props: e => e.props,
		$attrs: e => e.attrs,
		$slots: e => e.slots,
		$refs: e => e.refs,
		$parent: e => Cs(e.parent),
		$root: e => Cs(e.root),
		$emit: e => e.emit,
		$options: e => no(e),
		$forceUpdate: e => e.f || (e.f = () => Xs(e.update)),
		$nextTick: e => e.n || (e.n = Js.bind(e.proxy)),
		$watch: e => Al.bind(e),
	}),
	ds = (e, t) => e !== ge && !e.__isScriptSetup && ie(e, t),
	Kl = {
		get({ _: e }, t) {
			const {
				ctx: n,
				setupState: s,
				data: o,
				props: i,
				accessCache: r,
				type: l,
				appContext: c,
			} = e;
			let f;
			if (t[0] !== "$") {
				const P = r[t];
				if (P !== void 0)
					switch (P) {
						case 1:
							return s[t];
						case 2:
							return o[t];
						case 4:
							return n[t];
						case 3:
							return i[t];
					}
				else {
					if (ds(s, t)) return (r[t] = 1), s[t];
					if (o !== ge && ie(o, t)) return (r[t] = 2), o[t];
					if ((f = e.propsOptions[0]) && ie(f, t)) return (r[t] = 3), i[t];
					if (n !== ge && ie(n, t)) return (r[t] = 4), n[t];
					Ss && (r[t] = 0);
				}
			}
			const h = sn[t];
			let p, g;
			if (h) return t === "$attrs" && Oe(e, "get", t), h(e);
			if ((p = l.__cssModules) && (p = p[t])) return p;
			if (n !== ge && ie(n, t)) return (r[t] = 4), n[t];
			if (((g = c.config.globalProperties), ie(g, t))) return g[t];
		},
		set({ _: e }, t, n) {
			const { data: s, setupState: o, ctx: i } = e;
			return ds(o, t)
				? ((o[t] = n), !0)
				: s !== ge && ie(s, t)
				? ((s[t] = n), !0)
				: ie(e.props, t) || (t[0] === "$" && t.slice(1) in e)
				? !1
				: ((i[t] = n), !0);
		},
		has(
			{
				_: {
					data: e,
					setupState: t,
					accessCache: n,
					ctx: s,
					appContext: o,
					propsOptions: i,
				},
			},
			r,
		) {
			let l;
			return (
				!!n[r] ||
				(e !== ge && ie(e, r)) ||
				ds(t, r) ||
				((l = i[0]) && ie(l, r)) ||
				ie(s, r) ||
				ie(sn, r) ||
				ie(o.config.globalProperties, r)
			);
		},
		defineProperty(e, t, n) {
			return (
				n.get != null
					? (e._.accessCache[t] = 0)
					: ie(n, "value") && this.set(e, t, n.value, null),
				Reflect.defineProperty(e, t, n)
			);
		},
	};
let Ss = !0;
function ql(e) {
	const t = no(e),
		n = e.proxy,
		s = e.ctx;
	(Ss = !1), t.beforeCreate && Lo(t.beforeCreate, e, "bc");
	const {
		data: o,
		computed: i,
		methods: r,
		watch: l,
		provide: c,
		inject: f,
		created: h,
		beforeMount: p,
		mounted: g,
		beforeUpdate: P,
		updated: j,
		activated: F,
		deactivated: se,
		beforeDestroy: x,
		beforeUnmount: E,
		destroyed: I,
		unmounted: G,
		render: Z,
		renderTracked: he,
		renderTriggered: oe,
		errorCaptured: M,
		serverPrefetch: X,
		expose: Q,
		inheritAttrs: re,
		components: B,
		directives: ee,
		filters: R,
	} = t;
	if ((f && Wl(f, s, null, e.appContext.config.unwrapInjectedRef), r))
		for (const be in r) {
			const pe = r[be];
			J(pe) && (s[be] = pe.bind(n));
		}
	if (o) {
		const be = o.call(n, n);
		me(be) && (e.data = Wn(be));
	}
	if (((Ss = !0), i))
		for (const be in i) {
			const pe = i[be],
				mt = J(pe) ? pe.bind(n, n) : J(pe.get) ? pe.get.bind(n, n) : qe,
				mn = !J(pe) && J(pe.set) ? pe.set.bind(n) : qe,
				gt = ne({ get: mt, set: mn });
			Object.defineProperty(s, be, {
				enumerable: !0,
				configurable: !0,
				get: () => gt.value,
				set: Qe => (gt.value = Qe),
			});
		}
	if (l) for (const be in l) Yi(l[be], s, n, be);
	if (c) {
		const be = J(c) ? c.call(n) : c;
		Reflect.ownKeys(be).forEach(pe => {
			Ht(pe, be[pe]);
		});
	}
	h && Lo(h, e, "c");
	function ue(be, pe) {
		K(pe) ? pe.forEach(mt => be(mt.bind(n))) : pe && be(pe.bind(n));
	}
	if (
		(ue(Hl, p),
		ue(De, g),
		ue(Rl, P),
		ue(Zs, j),
		ue(Bl, F),
		ue(Ol, se),
		ue(jl, M),
		ue(Ul, he),
		ue(zl, oe),
		ue(Ki, E),
		ue(pt, G),
		ue(Dl, X),
		K(Q))
	)
		if (Q.length) {
			const be = e.exposed || (e.exposed = {});
			Q.forEach(pe => {
				Object.defineProperty(be, pe, { get: () => n[pe], set: mt => (n[pe] = mt) });
			});
		} else e.exposed || (e.exposed = {});
	Z && e.render === qe && (e.render = Z),
		re != null && (e.inheritAttrs = re),
		B && (e.components = B),
		ee && (e.directives = ee);
}
function Wl(e, t, n = qe, s = !1) {
	K(e) && (e = Vs(e));
	for (const o in e) {
		const i = e[o];
		let r;
		me(i)
			? "default" in i
				? (r = Ne(i.from || o, i.default, !0))
				: (r = Ne(i.from || o))
			: (r = Ne(i)),
			ke(r) && s
				? Object.defineProperty(t, o, {
						enumerable: !0,
						configurable: !0,
						get: () => r.value,
						set: l => (r.value = l),
				  })
				: (t[o] = r);
	}
}
function Lo(e, t, n) {
	Re(K(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Yi(e, t, n, s) {
	const o = s.includes(".") ? Ri(n, s) : () => n[s];
	if (we(e)) {
		const i = t[e];
		J(i) && et(o, i);
	} else if (J(e)) et(o, e.bind(n));
	else if (me(e))
		if (K(e)) e.forEach(i => Yi(i, t, n, s));
		else {
			const i = J(e.handler) ? e.handler.bind(n) : t[e.handler];
			J(i) && et(o, i, e);
		}
}
function no(e) {
	const t = e.type,
		{ mixins: n, extends: s } = t,
		{
			mixins: o,
			optionsCache: i,
			config: { optionMergeStrategies: r },
		} = e.appContext,
		l = i.get(t);
	let c;
	return (
		l
			? (c = l)
			: !o.length && !n && !s
			? (c = t)
			: ((c = {}), o.length && o.forEach(f => In(c, f, r, !0)), In(c, t, r)),
		me(t) && i.set(t, c),
		c
	);
}
function In(e, t, n, s = !1) {
	const { mixins: o, extends: i } = t;
	i && In(e, i, n, !0), o && o.forEach(r => In(e, r, n, !0));
	for (const r in t)
		if (!(s && r === "expose")) {
			const l = Gl[r] || (n && n[r]);
			e[r] = l ? l(e[r], t[r]) : t[r];
		}
	return e;
}
const Gl = {
	data: Mo,
	props: xt,
	emits: xt,
	methods: xt,
	computed: xt,
	beforeCreate: Ve,
	created: Ve,
	beforeMount: Ve,
	mounted: Ve,
	beforeUpdate: Ve,
	updated: Ve,
	beforeDestroy: Ve,
	beforeUnmount: Ve,
	destroyed: Ve,
	unmounted: Ve,
	activated: Ve,
	deactivated: Ve,
	errorCaptured: Ve,
	serverPrefetch: Ve,
	components: xt,
	directives: xt,
	watch: Ql,
	provide: Mo,
	inject: Yl,
};
function Mo(e, t) {
	return t
		? e
			? function () {
					return $e(J(e) ? e.call(this, this) : e, J(t) ? t.call(this, this) : t);
			  }
			: t
		: e;
}
function Yl(e, t) {
	return xt(Vs(e), Vs(t));
}
function Vs(e) {
	if (K(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Ve(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function xt(e, t) {
	return e ? $e($e(Object.create(null), e), t) : t;
}
function Ql(e, t) {
	if (!e) return t;
	if (!t) return e;
	const n = $e(Object.create(null), e);
	for (const s in t) n[s] = Ve(e[s], t[s]);
	return n;
}
function Jl(e, t, n, s = !1) {
	const o = {},
		i = {};
	En(i, es, 1), (e.propsDefaults = Object.create(null)), Qi(e, t, o, i);
	for (const r in e.propsOptions[0]) r in o || (o[r] = void 0);
	n ? (e.props = s ? o : vl(o)) : e.type.props ? (e.props = o) : (e.props = i), (e.attrs = i);
}
function Xl(e, t, n, s) {
	const {
			props: o,
			attrs: i,
			vnode: { patchFlag: r },
		} = e,
		l = ce(o),
		[c] = e.propsOptions;
	let f = !1;
	if ((s || r > 0) && !(r & 16)) {
		if (r & 8) {
			const h = e.vnode.dynamicProps;
			for (let p = 0; p < h.length; p++) {
				let g = h[p];
				if (Yn(e.emitsOptions, g)) continue;
				const P = t[g];
				if (c)
					if (ie(i, g)) P !== i[g] && ((i[g] = P), (f = !0));
					else {
						const j = tt(g);
						o[j] = Ts(c, l, j, P, e, !1);
					}
				else P !== i[g] && ((i[g] = P), (f = !0));
			}
		}
	} else {
		Qi(e, t, o, i) && (f = !0);
		let h;
		for (const p in l)
			(!t || (!ie(t, p) && ((h = Gt(p)) === p || !ie(t, h)))) &&
				(c
					? n &&
					  (n[p] !== void 0 || n[h] !== void 0) &&
					  (o[p] = Ts(c, l, p, void 0, e, !0))
					: delete o[p]);
		if (i !== l) for (const p in i) (!t || !ie(t, p)) && (delete i[p], (f = !0));
	}
	f && ot(e, "set", "$attrs");
}
function Qi(e, t, n, s) {
	const [o, i] = e.propsOptions;
	let r = !1,
		l;
	if (t)
		for (let c in t) {
			if (tn(c)) continue;
			const f = t[c];
			let h;
			o && ie(o, (h = tt(c)))
				? !i || !i.includes(h)
					? (n[h] = f)
					: ((l || (l = {}))[h] = f)
				: Yn(e.emitsOptions, c) || ((!(c in s) || f !== s[c]) && ((s[c] = f), (r = !0)));
		}
	if (i) {
		const c = ce(n),
			f = l || ge;
		for (let h = 0; h < i.length; h++) {
			const p = i[h];
			n[p] = Ts(o, c, p, f[p], e, !ie(f, p));
		}
	}
	return r;
}
function Ts(e, t, n, s, o, i) {
	const r = e[n];
	if (r != null) {
		const l = ie(r, "default");
		if (l && s === void 0) {
			const c = r.default;
			if (r.type !== Function && J(c)) {
				const { propsDefaults: f } = o;
				n in f ? (s = f[n]) : (qt(o), (s = f[n] = c.call(null, t)), Vt());
			} else s = c;
		}
		r[0] && (i && !l ? (s = !1) : r[1] && (s === "" || s === Gt(n)) && (s = !0));
	}
	return s;
}
function Ji(e, t, n = !1) {
	const s = t.propsCache,
		o = s.get(e);
	if (o) return o;
	const i = e.props,
		r = {},
		l = [];
	let c = !1;
	if (!J(e)) {
		const h = p => {
			c = !0;
			const [g, P] = Ji(p, t, !0);
			$e(r, g), P && l.push(...P);
		};
		!n && t.mixins.length && t.mixins.forEach(h),
			e.extends && h(e.extends),
			e.mixins && e.mixins.forEach(h);
	}
	if (!i && !c) return me(e) && s.set(e, Nt), Nt;
	if (K(i))
		for (let h = 0; h < i.length; h++) {
			const p = tt(i[h]);
			Ao(p) && (r[p] = ge);
		}
	else if (i)
		for (const h in i) {
			const p = tt(h);
			if (Ao(p)) {
				const g = i[h],
					P = (r[p] = K(g) || J(g) ? { type: g } : Object.assign({}, g));
				if (P) {
					const j = Bo(Boolean, P.type),
						F = Bo(String, P.type);
					(P[0] = j > -1),
						(P[1] = F < 0 || j < F),
						(j > -1 || ie(P, "default")) && l.push(p);
				}
			}
		}
	const f = [r, l];
	return me(e) && s.set(e, f), f;
}
function Ao(e) {
	return e[0] !== "$";
}
function Io(e) {
	const t = e && e.toString().match(/^\s*function (\w+)/);
	return t ? t[1] : e === null ? "null" : "";
}
function No(e, t) {
	return Io(e) === Io(t);
}
function Bo(e, t) {
	return K(t) ? t.findIndex(n => No(n, e)) : J(t) && No(t, e) ? 0 : -1;
}
const Xi = e => e[0] === "_" || e === "$stable",
	so = e => (K(e) ? e.map(Ue) : [Ue(e)]),
	Zl = (e, t, n) => {
		if (t._n) return t;
		const s = A((...o) => so(t(...o)), n);
		return (s._c = !1), s;
	},
	Zi = (e, t, n) => {
		const s = e._ctx;
		for (const o in e) {
			if (Xi(o)) continue;
			const i = e[o];
			if (J(i)) t[o] = Zl(o, i, s);
			else if (i != null) {
				const r = so(i);
				t[o] = () => r;
			}
		}
	},
	er = (e, t) => {
		const n = so(t);
		e.slots.default = () => n;
	},
	ec = (e, t) => {
		if (e.vnode.shapeFlag & 32) {
			const n = t._;
			n ? ((e.slots = ce(t)), En(t, "_", n)) : Zi(t, (e.slots = {}));
		} else (e.slots = {}), t && er(e, t);
		En(e.slots, es, 1);
	},
	tc = (e, t, n) => {
		const { vnode: s, slots: o } = e;
		let i = !0,
			r = ge;
		if (s.shapeFlag & 32) {
			const l = t._;
			l
				? n && l === 1
					? (i = !1)
					: ($e(o, t), !n && l === 1 && delete o._)
				: ((i = !t.$stable), Zi(t, o)),
				(r = t);
		} else t && (er(e, t), (r = { default: 1 }));
		if (i) for (const l in o) !Xi(l) && !(l in r) && delete o[l];
	};
function tr() {
	return {
		app: null,
		config: {
			isNativeTag: Ir,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let nc = 0;
function sc(e, t) {
	return function (s, o = null) {
		J(s) || (s = Object.assign({}, s)), o != null && !me(o) && (o = null);
		const i = tr(),
			r = new Set();
		let l = !1;
		const c = (i.app = {
			_uid: nc++,
			_component: s,
			_props: o,
			_container: null,
			_context: i,
			_instance: null,
			version: kc,
			get config() {
				return i.config;
			},
			set config(f) {},
			use(f, ...h) {
				return (
					r.has(f) ||
						(f && J(f.install)
							? (r.add(f), f.install(c, ...h))
							: J(f) && (r.add(f), f(c, ...h))),
					c
				);
			},
			mixin(f) {
				return i.mixins.includes(f) || i.mixins.push(f), c;
			},
			component(f, h) {
				return h ? ((i.components[f] = h), c) : i.components[f];
			},
			directive(f, h) {
				return h ? ((i.directives[f] = h), c) : i.directives[f];
			},
			mount(f, h, p) {
				if (!l) {
					const g = T(s, o);
					return (
						(g.appContext = i),
						h && t ? t(g, f) : e(g, f, p),
						(l = !0),
						(c._container = f),
						(f.__vue_app__ = c),
						io(g.component) || g.component.proxy
					);
				}
			},
			unmount() {
				l && (e(null, c._container), delete c._container.__vue_app__);
			},
			provide(f, h) {
				return (i.provides[f] = h), c;
			},
		});
		return c;
	};
}
function Nn(e, t, n, s, o = !1) {
	if (K(e)) {
		e.forEach((g, P) => Nn(g, t && (K(t) ? t[P] : t), n, s, o));
		return;
	}
	if (Rt(s) && !o) return;
	const i = s.shapeFlag & 4 ? io(s.component) || s.component.proxy : s.el,
		r = o ? null : i,
		{ i: l, r: c } = e,
		f = t && t.r,
		h = l.refs === ge ? (l.refs = {}) : l.refs,
		p = l.setupState;
	if (
		(f != null &&
			f !== c &&
			(we(f) ? ((h[f] = null), ie(p, f) && (p[f] = null)) : ke(f) && (f.value = null)),
		J(c))
	)
		dt(c, l, 12, [r, h]);
	else {
		const g = we(c),
			P = ke(c);
		if (g || P) {
			const j = () => {
				if (e.f) {
					const F = g ? (ie(p, c) ? p[c] : h[c]) : c.value;
					o
						? K(F) && Fs(F, i)
						: K(F)
						? F.includes(i) || F.push(i)
						: g
						? ((h[c] = [i]), ie(p, c) && (p[c] = h[c]))
						: ((c.value = [i]), e.k && (h[e.k] = c.value));
				} else
					g
						? ((h[c] = r), ie(p, c) && (p[c] = r))
						: P && ((c.value = r), e.k && (h[e.k] = r));
			};
			r ? ((j.id = -1), Le(j, n)) : j();
		}
	}
}
let lt = !1;
const kn = e => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
	Cn = e => e.nodeType === 8;
function oc(e) {
	const {
			mt: t,
			p: n,
			o: {
				patchProp: s,
				createText: o,
				nextSibling: i,
				parentNode: r,
				remove: l,
				insert: c,
				createComment: f,
			},
		} = e,
		h = (x, E) => {
			if (!E.hasChildNodes()) {
				n(null, x, E), Mn(), (E._vnode = x);
				return;
			}
			(lt = !1),
				p(E.firstChild, x, null, null, null),
				Mn(),
				(E._vnode = x),
				lt && console.error("Hydration completed but contains mismatches.");
		},
		p = (x, E, I, G, Z, he = !1) => {
			const oe = Cn(x) && x.data === "[",
				M = () => F(x, E, I, G, Z, oe),
				{ type: X, ref: Q, shapeFlag: re, patchFlag: B } = E;
			let ee = x.nodeType;
			(E.el = x), B === -2 && ((he = !1), (E.dynamicChildren = null));
			let R = null;
			switch (X) {
				case Kt:
					ee !== 3
						? E.children === ""
							? (c((E.el = o("")), r(x), x), (R = x))
							: (R = M())
						: (x.data !== E.children && ((lt = !0), (x.data = E.children)), (R = i(x)));
					break;
				case Be:
					ee !== 8 || oe ? (R = M()) : (R = i(x));
					break;
				case Dt:
					if ((oe && ((x = i(x)), (ee = x.nodeType)), ee === 1 || ee === 3)) {
						R = x;
						const Me = !E.children.length;
						for (let ue = 0; ue < E.staticCount; ue++)
							Me && (E.children += R.nodeType === 1 ? R.outerHTML : R.data),
								ue === E.staticCount - 1 && (E.anchor = R),
								(R = i(R));
						return oe ? i(R) : R;
					} else M();
					break;
				case Y:
					oe ? (R = j(x, E, I, G, Z, he)) : (R = M());
					break;
				default:
					if (re & 1)
						ee !== 1 || E.type.toLowerCase() !== x.tagName.toLowerCase()
							? (R = M())
							: (R = g(x, E, I, G, Z, he));
					else if (re & 6) {
						E.slotScopeIds = Z;
						const Me = r(x);
						if (
							(t(E, Me, null, I, G, kn(Me), he),
							(R = oe ? se(x) : i(x)),
							R && Cn(R) && R.data === "teleport end" && (R = i(R)),
							Rt(E))
						) {
							let ue;
							oe
								? ((ue = T(Y)), (ue.anchor = R ? R.previousSibling : Me.lastChild))
								: (ue = x.nodeType === 3 ? Ee("") : T("div")),
								(ue.el = x),
								(E.component.subTree = ue);
						}
					} else
						re & 64
							? ee !== 8
								? (R = M())
								: (R = E.type.hydrate(x, E, I, G, Z, he, e, P))
							: re & 128 && (R = E.type.hydrate(x, E, I, G, kn(r(x)), Z, he, e, p));
			}
			return Q != null && Nn(Q, null, G, E), R;
		},
		g = (x, E, I, G, Z, he) => {
			he = he || !!E.dynamicChildren;
			const { type: oe, props: M, patchFlag: X, shapeFlag: Q, dirs: re } = E,
				B = (oe === "input" && re) || oe === "option";
			if (B || X !== -1) {
				if ((re && Xe(E, null, I, "created"), M))
					if (B || !he || X & 48)
						for (const R in M)
							((B && R.endsWith("value")) || (pn(R) && !tn(R))) &&
								s(x, R, null, M[R], !1, void 0, I);
					else M.onClick && s(x, "onClick", null, M.onClick, !1, void 0, I);
				let ee;
				if (
					((ee = M && M.onVnodeBeforeMount) && He(ee, I, E),
					re && Xe(E, null, I, "beforeMount"),
					((ee = M && M.onVnodeMounted) || re) &&
						Fi(() => {
							ee && He(ee, I, E), re && Xe(E, null, I, "mounted");
						}, G),
					Q & 16 && !(M && (M.innerHTML || M.textContent)))
				) {
					let R = P(x.firstChild, E, x, I, G, Z, he);
					for (; R; ) {
						lt = !0;
						const Me = R;
						(R = R.nextSibling), l(Me);
					}
				} else
					Q & 8 &&
						x.textContent !== E.children &&
						((lt = !0), (x.textContent = E.children));
			}
			return x.nextSibling;
		},
		P = (x, E, I, G, Z, he, oe) => {
			oe = oe || !!E.dynamicChildren;
			const M = E.children,
				X = M.length;
			for (let Q = 0; Q < X; Q++) {
				const re = oe ? M[Q] : (M[Q] = Ue(M[Q]));
				if (x) x = p(x, re, G, Z, he, oe);
				else {
					if (re.type === Kt && !re.children) continue;
					(lt = !0), n(null, re, I, null, G, Z, kn(I), he);
				}
			}
			return x;
		},
		j = (x, E, I, G, Z, he) => {
			const { slotScopeIds: oe } = E;
			oe && (Z = Z ? Z.concat(oe) : oe);
			const M = r(x),
				X = P(i(x), E, M, I, G, Z, he);
			return X && Cn(X) && X.data === "]"
				? i((E.anchor = X))
				: ((lt = !0), c((E.anchor = f("]")), M, X), X);
		},
		F = (x, E, I, G, Z, he) => {
			if (((lt = !0), (E.el = null), he)) {
				const X = se(x);
				for (;;) {
					const Q = i(x);
					if (Q && Q !== X) l(Q);
					else break;
				}
			}
			const oe = i(x),
				M = r(x);
			return l(x), n(null, E, M, oe, I, G, kn(M), Z), oe;
		},
		se = x => {
			let E = 0;
			for (; x; )
				if (((x = i(x)), x && Cn(x) && (x.data === "[" && E++, x.data === "]"))) {
					if (E === 0) return i(x);
					E--;
				}
			return x;
		};
	return [h, p];
}
const Le = Fi;
function ic(e) {
	return rc(e, oc);
}
function rc(e, t) {
	const n = Rr();
	n.__VUE__ = !0;
	const {
			insert: s,
			remove: o,
			patchProp: i,
			createElement: r,
			createText: l,
			createComment: c,
			setText: f,
			setElementText: h,
			parentNode: p,
			nextSibling: g,
			setScopeId: P = qe,
			insertStaticContent: j,
		} = e,
		F = (a, u, v, w = null, y = null, C = null, L = !1, k = null, V = !!u.dynamicChildren) => {
			if (a === u) return;
			a && !Pt(a, u) && ((w = gn(a)), Qe(a, y, C, !0), (a = null)),
				u.patchFlag === -2 && ((V = !1), (u.dynamicChildren = null));
			const { type: $, ref: D, shapeFlag: O } = u;
			switch ($) {
				case Kt:
					se(a, u, v, w);
					break;
				case Be:
					x(a, u, v, w);
					break;
				case Dt:
					a == null && E(u, v, w, L);
					break;
				case Y:
					B(a, u, v, w, y, C, L, k, V);
					break;
				default:
					O & 1
						? Z(a, u, v, w, y, C, L, k, V)
						: O & 6
						? ee(a, u, v, w, y, C, L, k, V)
						: (O & 64 || O & 128) && $.process(a, u, v, w, y, C, L, k, V, Mt);
			}
			D != null && y && Nn(D, a && a.ref, C, u || a, !u);
		},
		se = (a, u, v, w) => {
			if (a == null) s((u.el = l(u.children)), v, w);
			else {
				const y = (u.el = a.el);
				u.children !== a.children && f(y, u.children);
			}
		},
		x = (a, u, v, w) => {
			a == null ? s((u.el = c(u.children || "")), v, w) : (u.el = a.el);
		},
		E = (a, u, v, w) => {
			[a.el, a.anchor] = j(a.children, u, v, w, a.el, a.anchor);
		},
		I = ({ el: a, anchor: u }, v, w) => {
			let y;
			for (; a && a !== u; ) (y = g(a)), s(a, v, w), (a = y);
			s(u, v, w);
		},
		G = ({ el: a, anchor: u }) => {
			let v;
			for (; a && a !== u; ) (v = g(a)), o(a), (a = v);
			o(u);
		},
		Z = (a, u, v, w, y, C, L, k, V) => {
			(L = L || u.type === "svg"),
				a == null ? he(u, v, w, y, C, L, k, V) : X(a, u, y, C, L, k, V);
		},
		he = (a, u, v, w, y, C, L, k) => {
			let V, $;
			const { type: D, props: O, shapeFlag: z, transition: q, dirs: te } = a;
			if (
				((V = a.el = r(a.type, C, O && O.is, O)),
				z & 8
					? h(V, a.children)
					: z & 16 && M(a.children, V, null, w, y, C && D !== "foreignObject", L, k),
				te && Xe(a, null, w, "created"),
				O)
			) {
				for (const fe in O)
					fe !== "value" && !tn(fe) && i(V, fe, null, O[fe], C, a.children, w, y, nt);
				"value" in O && i(V, "value", null, O.value),
					($ = O.onVnodeBeforeMount) && He($, w, a);
			}
			oe(V, a, a.scopeId, L, w), te && Xe(a, null, w, "beforeMount");
			const ve = (!y || (y && !y.pendingBranch)) && q && !q.persisted;
			ve && q.beforeEnter(V),
				s(V, u, v),
				(($ = O && O.onVnodeMounted) || ve || te) &&
					Le(() => {
						$ && He($, w, a), ve && q.enter(V), te && Xe(a, null, w, "mounted");
					}, y);
		},
		oe = (a, u, v, w, y) => {
			if ((v && P(a, v), w)) for (let C = 0; C < w.length; C++) P(a, w[C]);
			if (y) {
				let C = y.subTree;
				if (u === C) {
					const L = y.vnode;
					oe(a, L, L.scopeId, L.slotScopeIds, y.parent);
				}
			}
		},
		M = (a, u, v, w, y, C, L, k, V = 0) => {
			for (let $ = V; $ < a.length; $++) {
				const D = (a[$] = k ? ut(a[$]) : Ue(a[$]));
				F(null, D, u, v, w, y, C, L, k);
			}
		},
		X = (a, u, v, w, y, C, L) => {
			const k = (u.el = a.el);
			let { patchFlag: V, dynamicChildren: $, dirs: D } = u;
			V |= a.patchFlag & 16;
			const O = a.props || ge,
				z = u.props || ge;
			let q;
			v && bt(v, !1),
				(q = z.onVnodeBeforeUpdate) && He(q, v, u, a),
				D && Xe(u, a, v, "beforeUpdate"),
				v && bt(v, !0);
			const te = y && u.type !== "foreignObject";
			if (
				($
					? Q(a.dynamicChildren, $, k, v, w, te, C)
					: L || pe(a, u, k, null, v, w, te, C, !1),
				V > 0)
			) {
				if (V & 16) re(k, u, O, z, v, w, y);
				else if (
					(V & 2 && O.class !== z.class && i(k, "class", null, z.class, y),
					V & 4 && i(k, "style", O.style, z.style, y),
					V & 8)
				) {
					const ve = u.dynamicProps;
					for (let fe = 0; fe < ve.length; fe++) {
						const ye = ve[fe],
							ze = O[ye],
							At = z[ye];
						(At !== ze || ye === "value") && i(k, ye, ze, At, y, a.children, v, w, nt);
					}
				}
				V & 1 && a.children !== u.children && h(k, u.children);
			} else !L && $ == null && re(k, u, O, z, v, w, y);
			((q = z.onVnodeUpdated) || D) &&
				Le(() => {
					q && He(q, v, u, a), D && Xe(u, a, v, "updated");
				}, w);
		},
		Q = (a, u, v, w, y, C, L) => {
			for (let k = 0; k < u.length; k++) {
				const V = a[k],
					$ = u[k],
					D = V.el && (V.type === Y || !Pt(V, $) || V.shapeFlag & 70) ? p(V.el) : v;
				F(V, $, D, null, w, y, C, L, !0);
			}
		},
		re = (a, u, v, w, y, C, L) => {
			if (v !== w) {
				if (v !== ge)
					for (const k in v)
						!tn(k) && !(k in w) && i(a, k, v[k], null, L, u.children, y, C, nt);
				for (const k in w) {
					if (tn(k)) continue;
					const V = w[k],
						$ = v[k];
					V !== $ && k !== "value" && i(a, k, $, V, L, u.children, y, C, nt);
				}
				"value" in w && i(a, "value", v.value, w.value);
			}
		},
		B = (a, u, v, w, y, C, L, k, V) => {
			const $ = (u.el = a ? a.el : l("")),
				D = (u.anchor = a ? a.anchor : l(""));
			let { patchFlag: O, dynamicChildren: z, slotScopeIds: q } = u;
			q && (k = k ? k.concat(q) : q),
				a == null
					? (s($, v, w), s(D, v, w), M(u.children, v, D, y, C, L, k, V))
					: O > 0 && O & 64 && z && a.dynamicChildren
					? (Q(a.dynamicChildren, z, v, y, C, L, k),
					  (u.key != null || (y && u === y.subTree)) && nr(a, u, !0))
					: pe(a, u, v, D, y, C, L, k, V);
		},
		ee = (a, u, v, w, y, C, L, k, V) => {
			(u.slotScopeIds = k),
				a == null
					? u.shapeFlag & 512
						? y.ctx.activate(u, v, w, L, V)
						: R(u, v, w, y, C, L, V)
					: Me(a, u, V);
		},
		R = (a, u, v, w, y, C, L) => {
			const k = (a.component = pc(a, w, y));
			if ((Xn(a) && (k.ctx.renderer = Mt), vc(k), k.asyncDep)) {
				if ((y && y.registerDep(k, ue), !a.el)) {
					const V = (k.subTree = T(Be));
					x(null, V, u, v);
				}
				return;
			}
			ue(k, a, u, v, y, C, L);
		},
		Me = (a, u, v) => {
			const w = (u.component = a.component);
			if (El(a, u, v))
				if (w.asyncDep && !w.asyncResolved) {
					be(w, u, v);
					return;
				} else (w.next = u), Pl(w.update), w.update();
			else (u.el = a.el), (w.vnode = u);
		},
		ue = (a, u, v, w, y, C, L) => {
			const k = () => {
					if (a.isMounted) {
						let { next: D, bu: O, u: z, parent: q, vnode: te } = a,
							ve = D,
							fe;
						bt(a, !1),
							D ? ((D.el = te.el), be(a, D, L)) : (D = te),
							O && as(O),
							(fe = D.props && D.props.onVnodeBeforeUpdate) && He(fe, q, D, te),
							bt(a, !0);
						const ye = us(a),
							ze = a.subTree;
						(a.subTree = ye),
							F(ze, ye, p(ze.el), gn(ze), a, y, C),
							(D.el = ye.el),
							ve === null && Ll(a, ye.el),
							z && Le(z, y),
							(fe = D.props && D.props.onVnodeUpdated) &&
								Le(() => He(fe, q, D, te), y);
					} else {
						let D;
						const { el: O, props: z } = u,
							{ bm: q, m: te, parent: ve } = a,
							fe = Rt(u);
						if (
							(bt(a, !1),
							q && as(q),
							!fe && (D = z && z.onVnodeBeforeMount) && He(D, ve, u),
							bt(a, !0),
							O && ls)
						) {
							const ye = () => {
								(a.subTree = us(a)), ls(O, a.subTree, a, y, null);
							};
							fe ? u.type.__asyncLoader().then(() => !a.isUnmounted && ye()) : ye();
						} else {
							const ye = (a.subTree = us(a));
							F(null, ye, v, w, a, y, C), (u.el = ye.el);
						}
						if ((te && Le(te, y), !fe && (D = z && z.onVnodeMounted))) {
							const ye = u;
							Le(() => He(D, ve, ye), y);
						}
						(u.shapeFlag & 256 || (ve && Rt(ve.vnode) && ve.vnode.shapeFlag & 256)) &&
							a.a &&
							Le(a.a, y),
							(a.isMounted = !0),
							(u = v = w = null);
					}
				},
				V = (a.effect = new Us(k, () => Xs($), a.scope)),
				$ = (a.update = () => V.run());
			($.id = a.uid), bt(a, !0), $();
		},
		be = (a, u, v) => {
			u.component = a;
			const w = a.vnode.props;
			(a.vnode = u),
				(a.next = null),
				Xl(a, u.props, w, v),
				tc(a, u.children, v),
				Yt(),
				So(),
				Qt();
		},
		pe = (a, u, v, w, y, C, L, k, V = !1) => {
			const $ = a && a.children,
				D = a ? a.shapeFlag : 0,
				O = u.children,
				{ patchFlag: z, shapeFlag: q } = u;
			if (z > 0) {
				if (z & 128) {
					mn($, O, v, w, y, C, L, k, V);
					return;
				} else if (z & 256) {
					mt($, O, v, w, y, C, L, k, V);
					return;
				}
			}
			q & 8
				? (D & 16 && nt($, y, C), O !== $ && h(v, O))
				: D & 16
				? q & 16
					? mn($, O, v, w, y, C, L, k, V)
					: nt($, y, C, !0)
				: (D & 8 && h(v, ""), q & 16 && M(O, v, w, y, C, L, k, V));
		},
		mt = (a, u, v, w, y, C, L, k, V) => {
			(a = a || Nt), (u = u || Nt);
			const $ = a.length,
				D = u.length,
				O = Math.min($, D);
			let z;
			for (z = 0; z < O; z++) {
				const q = (u[z] = V ? ut(u[z]) : Ue(u[z]));
				F(a[z], q, v, null, y, C, L, k, V);
			}
			$ > D ? nt(a, y, C, !0, !1, O) : M(u, v, w, y, C, L, k, V, O);
		},
		mn = (a, u, v, w, y, C, L, k, V) => {
			let $ = 0;
			const D = u.length;
			let O = a.length - 1,
				z = D - 1;
			for (; $ <= O && $ <= z; ) {
				const q = a[$],
					te = (u[$] = V ? ut(u[$]) : Ue(u[$]));
				if (Pt(q, te)) F(q, te, v, null, y, C, L, k, V);
				else break;
				$++;
			}
			for (; $ <= O && $ <= z; ) {
				const q = a[O],
					te = (u[z] = V ? ut(u[z]) : Ue(u[z]));
				if (Pt(q, te)) F(q, te, v, null, y, C, L, k, V);
				else break;
				O--, z--;
			}
			if ($ > O) {
				if ($ <= z) {
					const q = z + 1,
						te = q < D ? u[q].el : w;
					for (; $ <= z; )
						F(null, (u[$] = V ? ut(u[$]) : Ue(u[$])), v, te, y, C, L, k, V), $++;
				}
			} else if ($ > z) for (; $ <= O; ) Qe(a[$], y, C, !0), $++;
			else {
				const q = $,
					te = $,
					ve = new Map();
				for ($ = te; $ <= z; $++) {
					const Ae = (u[$] = V ? ut(u[$]) : Ue(u[$]));
					Ae.key != null && ve.set(Ae.key, $);
				}
				let fe,
					ye = 0;
				const ze = z - te + 1;
				let At = !1,
					vo = 0;
				const Xt = new Array(ze);
				for ($ = 0; $ < ze; $++) Xt[$] = 0;
				for ($ = q; $ <= O; $++) {
					const Ae = a[$];
					if (ye >= ze) {
						Qe(Ae, y, C, !0);
						continue;
					}
					let Je;
					if (Ae.key != null) Je = ve.get(Ae.key);
					else
						for (fe = te; fe <= z; fe++)
							if (Xt[fe - te] === 0 && Pt(Ae, u[fe])) {
								Je = fe;
								break;
							}
					Je === void 0
						? Qe(Ae, y, C, !0)
						: ((Xt[Je - te] = $ + 1),
						  Je >= vo ? (vo = Je) : (At = !0),
						  F(Ae, u[Je], v, null, y, C, L, k, V),
						  ye++);
				}
				const mo = At ? lc(Xt) : Nt;
				for (fe = mo.length - 1, $ = ze - 1; $ >= 0; $--) {
					const Ae = te + $,
						Je = u[Ae],
						go = Ae + 1 < D ? u[Ae + 1].el : w;
					Xt[$] === 0
						? F(null, Je, v, go, y, C, L, k, V)
						: At && (fe < 0 || $ !== mo[fe] ? gt(Je, v, go, 2) : fe--);
				}
			}
		},
		gt = (a, u, v, w, y = null) => {
			const { el: C, type: L, transition: k, children: V, shapeFlag: $ } = a;
			if ($ & 6) {
				gt(a.component.subTree, u, v, w);
				return;
			}
			if ($ & 128) {
				a.suspense.move(u, v, w);
				return;
			}
			if ($ & 64) {
				L.move(a, u, v, Mt);
				return;
			}
			if (L === Y) {
				s(C, u, v);
				for (let O = 0; O < V.length; O++) gt(V[O], u, v, w);
				s(a.anchor, u, v);
				return;
			}
			if (L === Dt) {
				I(a, u, v);
				return;
			}
			if (w !== 2 && $ & 1 && k)
				if (w === 0) k.beforeEnter(C), s(C, u, v), Le(() => k.enter(C), y);
				else {
					const { leave: O, delayLeave: z, afterLeave: q } = k,
						te = () => s(C, u, v),
						ve = () => {
							O(C, () => {
								te(), q && q();
							});
						};
					z ? z(C, te, ve) : ve();
				}
			else s(C, u, v);
		},
		Qe = (a, u, v, w = !1, y = !1) => {
			const {
				type: C,
				props: L,
				ref: k,
				children: V,
				dynamicChildren: $,
				shapeFlag: D,
				patchFlag: O,
				dirs: z,
			} = a;
			if ((k != null && Nn(k, null, v, a, !0), D & 256)) {
				u.ctx.deactivate(a);
				return;
			}
			const q = D & 1 && z,
				te = !Rt(a);
			let ve;
			if ((te && (ve = L && L.onVnodeBeforeUnmount) && He(ve, u, a), D & 6))
				Sr(a.component, v, w);
			else {
				if (D & 128) {
					a.suspense.unmount(v, w);
					return;
				}
				q && Xe(a, null, u, "beforeUnmount"),
					D & 64
						? a.type.remove(a, u, v, y, Mt, w)
						: $ && (C !== Y || (O > 0 && O & 64))
						? nt($, u, v, !1, !0)
						: ((C === Y && O & 384) || (!y && D & 16)) && nt(V, u, v),
					w && _o(a);
			}
			((te && (ve = L && L.onVnodeUnmounted)) || q) &&
				Le(() => {
					ve && He(ve, u, a), q && Xe(a, null, u, "unmounted");
				}, v);
		},
		_o = a => {
			const { type: u, el: v, anchor: w, transition: y } = a;
			if (u === Y) {
				Cr(v, w);
				return;
			}
			if (u === Dt) {
				G(a);
				return;
			}
			const C = () => {
				o(v), y && !y.persisted && y.afterLeave && y.afterLeave();
			};
			if (a.shapeFlag & 1 && y && !y.persisted) {
				const { leave: L, delayLeave: k } = y,
					V = () => L(v, C);
				k ? k(a.el, C, V) : V();
			} else C();
		},
		Cr = (a, u) => {
			let v;
			for (; a !== u; ) (v = g(a)), o(a), (a = v);
			o(u);
		},
		Sr = (a, u, v) => {
			const { bum: w, scope: y, update: C, subTree: L, um: k } = a;
			w && as(w),
				y.stop(),
				C && ((C.active = !1), Qe(L, a, u, v)),
				k && Le(k, u),
				Le(() => {
					a.isUnmounted = !0;
				}, u),
				u &&
					u.pendingBranch &&
					!u.isUnmounted &&
					a.asyncDep &&
					!a.asyncResolved &&
					a.suspenseId === u.pendingId &&
					(u.deps--, u.deps === 0 && u.resolve());
		},
		nt = (a, u, v, w = !1, y = !1, C = 0) => {
			for (let L = C; L < a.length; L++) Qe(a[L], u, v, w, y);
		},
		gn = a =>
			a.shapeFlag & 6
				? gn(a.component.subTree)
				: a.shapeFlag & 128
				? a.suspense.next()
				: g(a.anchor || a.el),
		po = (a, u, v) => {
			a == null
				? u._vnode && Qe(u._vnode, null, null, !0)
				: F(u._vnode || null, a, u, null, null, null, v),
				So(),
				Mn(),
				(u._vnode = a);
		},
		Mt = { p: F, um: Qe, m: gt, r: _o, mt: R, mc: M, pc: pe, pbc: Q, n: gn, o: e };
	let rs, ls;
	return t && ([rs, ls] = t(Mt)), { render: po, hydrate: rs, createApp: sc(po, rs) };
}
function bt({ effect: e, update: t }, n) {
	e.allowRecurse = t.allowRecurse = n;
}
function nr(e, t, n = !1) {
	const s = e.children,
		o = t.children;
	if (K(s) && K(o))
		for (let i = 0; i < s.length; i++) {
			const r = s[i];
			let l = o[i];
			l.shapeFlag & 1 &&
				!l.dynamicChildren &&
				((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = o[i] = ut(o[i])), (l.el = r.el)),
				n || nr(r, l)),
				l.type === Kt && (l.el = r.el);
		}
}
function lc(e) {
	const t = e.slice(),
		n = [0];
	let s, o, i, r, l;
	const c = e.length;
	for (s = 0; s < c; s++) {
		const f = e[s];
		if (f !== 0) {
			if (((o = n[n.length - 1]), e[o] < f)) {
				(t[s] = o), n.push(s);
				continue;
			}
			for (i = 0, r = n.length - 1; i < r; )
				(l = (i + r) >> 1), e[n[l]] < f ? (i = l + 1) : (r = l);
			f < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
		}
	}
	for (i = n.length, r = n[i - 1]; i-- > 0; ) (n[i] = r), (r = t[r]);
	return n;
}
const cc = e => e.__isTeleport,
	Y = Symbol(void 0),
	Kt = Symbol(void 0),
	Be = Symbol(void 0),
	Dt = Symbol(void 0),
	on = [];
let Ke = null;
function d(e = !1) {
	on.push((Ke = e ? null : []));
}
function ac() {
	on.pop(), (Ke = on[on.length - 1] || null);
}
let dn = 1;
function Oo(e) {
	dn += e;
}
function sr(e) {
	return (e.dynamicChildren = dn > 0 ? Ke || Nt : null), ac(), dn > 0 && Ke && Ke.push(e), e;
}
function m(e, t, n, s, o, i) {
	return sr(b(e, t, n, s, o, i, !0));
}
function W(e, t, n, s, o) {
	return sr(T(e, t, n, s, o, !0));
}
function Bn(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Pt(e, t) {
	return e.type === t.type && e.key === t.key;
}
const es = "__vInternal",
	or = ({ key: e }) => e ?? null,
	Vn = ({ ref: e, ref_key: t, ref_for: n }) =>
		e != null ? (we(e) || ke(e) || J(e) ? { i: Ce, r: e, k: t, f: !!n } : e) : null;
function b(e, t = null, n = null, s = 0, o = null, i = e === Y ? 0 : 1, r = !1, l = !1) {
	const c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && or(t),
		ref: t && Vn(t),
		scopeId: Qn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: i,
		patchFlag: s,
		dynamicProps: o,
		dynamicChildren: null,
		appContext: null,
		ctx: Ce,
	};
	return (
		l ? (oo(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= we(n) ? 8 : 16),
		dn > 0 && !r && Ke && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && Ke.push(c),
		c
	);
}
const T = uc;
function uc(e, t = null, n = null, s = 0, o = null, i = !1) {
	if (((!e || e === qi) && (e = Be), Bn(e))) {
		const l = _t(e, t, !0);
		return (
			n && oo(l, n),
			dn > 0 && !i && Ke && (l.shapeFlag & 6 ? (Ke[Ke.indexOf(e)] = l) : Ke.push(l)),
			(l.patchFlag |= -2),
			l
		);
	}
	if ((yc(e) && (e = e.__vccOpts), t)) {
		t = fc(t);
		let { class: l, style: c } = t;
		l && !we(l) && (t.class = de(l)),
			me(c) && (Vi(c) && !K(c) && (c = $e({}, c)), (t.style = zn(c)));
	}
	const r = we(e) ? 1 : Ml(e) ? 128 : cc(e) ? 64 : me(e) ? 4 : J(e) ? 2 : 0;
	return b(e, t, n, s, o, r, i, !0);
}
function fc(e) {
	return e ? (Vi(e) || es in e ? $e({}, e) : e) : null;
}
function _t(e, t, n = !1) {
	const { props: s, ref: o, patchFlag: i, children: r } = e,
		l = t ? Tn(s || {}, t) : s;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && or(l),
		ref: t && t.ref ? (n && o ? (K(o) ? o.concat(Vn(t)) : [o, Vn(t)]) : Vn(t)) : o,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: r,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Y ? (i === -1 ? 16 : i | 16) : i,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && _t(e.ssContent),
		ssFallback: e.ssFallback && _t(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
	};
}
function Ee(e = " ", t = 0) {
	return T(Kt, null, e, t);
}
function dc(e, t) {
	const n = T(Dt, null, e);
	return (n.staticCount = t), n;
}
function U(e = "", t = !1) {
	return t ? (d(), W(Be, null, e)) : T(Be, null, e);
}
function Ue(e) {
	return e == null || typeof e == "boolean"
		? T(Be)
		: K(e)
		? T(Y, null, e.slice())
		: typeof e == "object"
		? ut(e)
		: T(Kt, null, String(e));
}
function ut(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : _t(e);
}
function oo(e, t) {
	let n = 0;
	const { shapeFlag: s } = e;
	if (t == null) t = null;
	else if (K(t)) n = 16;
	else if (typeof t == "object")
		if (s & 65) {
			const o = t.default;
			o && (o._c && (o._d = !1), oo(e, o()), o._c && (o._d = !0));
			return;
		} else {
			n = 32;
			const o = t._;
			!o && !(es in t)
				? (t._ctx = Ce)
				: o === 3 &&
				  Ce &&
				  (Ce.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		J(t)
			? ((t = { default: t, _ctx: Ce }), (n = 32))
			: ((t = String(t)), s & 64 ? ((n = 16), (t = [Ee(t)])) : (n = 8));
	(e.children = t), (e.shapeFlag |= n);
}
function Tn(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const s = e[n];
		for (const o in s)
			if (o === "class") t.class !== s.class && (t.class = de([t.class, s.class]));
			else if (o === "style") t.style = zn([t.style, s.style]);
			else if (pn(o)) {
				const i = t[o],
					r = s[o];
				r && i !== r && !(K(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
			} else o !== "" && (t[o] = s[o]);
	}
	return t;
}
function He(e, t, n, s = null) {
	Re(e, t, 7, [n, s]);
}
const hc = tr();
let _c = 0;
function pc(e, t, n) {
	const s = e.type,
		o = (t ? t.appContext : e.appContext) || hc,
		i = {
			uid: _c++,
			vnode: e,
			type: s,
			parent: t,
			appContext: o,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new Dr(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(o.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: Ji(s, o),
			emitsOptions: Oi(s, o),
			emit: null,
			emitted: null,
			propsDefaults: ge,
			inheritAttrs: s.inheritAttrs,
			ctx: ge,
			data: ge,
			props: ge,
			attrs: ge,
			slots: ge,
			refs: ge,
			setupState: ge,
			setupContext: null,
			suspense: n,
			suspenseId: n ? n.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (
		(i.ctx = { _: i }),
		(i.root = t ? t.root : i),
		(i.emit = Sl.bind(null, i)),
		e.ce && e.ce(i),
		i
	);
}
let xe = null;
const ts = () => xe || Ce,
	qt = e => {
		(xe = e), e.scope.on();
	},
	Vt = () => {
		xe && xe.scope.off(), (xe = null);
	};
function ir(e) {
	return e.vnode.shapeFlag & 4;
}
let hn = !1;
function vc(e, t = !1) {
	hn = t;
	const { props: n, children: s } = e.vnode,
		o = ir(e);
	Jl(e, n, o, t), ec(e, s);
	const i = o ? mc(e, t) : void 0;
	return (hn = !1), i;
}
function mc(e, t) {
	const n = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = nn(new Proxy(e.ctx, Kl)));
	const { setup: s } = n;
	if (s) {
		const o = (e.setupContext = s.length > 1 ? lr(e) : null);
		qt(e), Yt();
		const i = dt(s, e, 0, [e.props, o]);
		if ((Qt(), Vt(), pi(i))) {
			if ((i.then(Vt, Vt), t))
				return i
					.then(r => {
						Fo(e, r, t);
					})
					.catch(r => {
						Gn(r, e, 0);
					});
			e.asyncDep = i;
		} else Fo(e, i, t);
	} else rr(e, t);
}
function Fo(e, t, n) {
	J(t)
		? e.type.__ssrInlineRender
			? (e.ssrRender = t)
			: (e.render = t)
		: me(t) && (e.setupState = Mi(t)),
		rr(e, n);
}
let Ho;
function rr(e, t, n) {
	const s = e.type;
	if (!e.render) {
		if (!t && Ho && !s.render) {
			const o = s.template || no(e).template;
			if (o) {
				const { isCustomElement: i, compilerOptions: r } = e.appContext.config,
					{ delimiters: l, compilerOptions: c } = s,
					f = $e($e({ isCustomElement: i, delimiters: l }, r), c);
				s.render = Ho(o, f);
			}
		}
		e.render = s.render || qe;
	}
	qt(e), Yt(), ql(e), Qt(), Vt();
}
function gc(e) {
	return new Proxy(e.attrs, {
		get(t, n) {
			return Oe(e, "get", "$attrs"), t[n];
		},
	});
}
function lr(e) {
	const t = s => {
		e.exposed = s || {};
	};
	let n;
	return {
		get attrs() {
			return n || (n = gc(e));
		},
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function io(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(Mi(nn(e.exposed)), {
				get(t, n) {
					if (n in t) return t[n];
					if (n in sn) return sn[n](e);
				},
				has(t, n) {
					return n in t || n in sn;
				},
			}))
		);
}
function bc(e, t = !0) {
	return J(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function yc(e) {
	return J(e) && "__vccOpts" in e;
}
const ne = (e, t) => wl(e, t, hn);
function wc() {
	return xc().slots;
}
function xc() {
	const e = ts();
	return e.setupContext || (e.setupContext = lr(e));
}
function On(e, t, n) {
	const s = arguments.length;
	return s === 2
		? me(t) && !K(t)
			? Bn(t)
				? T(e, null, [t])
				: T(e, t)
			: T(e, null, t)
		: (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && Bn(n) && (n = [n]),
		  T(e, t, n));
}
const $c = Symbol(""),
	Pc = () => Ne($c),
	kc = "3.2.45",
	Cc = "http://www.w3.org/2000/svg",
	kt = typeof document < "u" ? document : null,
	Ro = kt && kt.createElement("template"),
	Sc = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null);
		},
		remove: e => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, n, s) => {
			const o = t ? kt.createElementNS(Cc, e) : kt.createElement(e, n ? { is: n } : void 0);
			return (
				e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple),
				o
			);
		},
		createText: e => kt.createTextNode(e),
		createComment: e => kt.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: e => e.parentNode,
		nextSibling: e => e.nextSibling,
		querySelector: e => kt.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "");
		},
		insertStaticContent(e, t, n, s, o, i) {
			const r = n ? n.previousSibling : t.lastChild;
			if (o && (o === i || o.nextSibling))
				for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling)); );
			else {
				Ro.innerHTML = s ? `<svg>${e}</svg>` : e;
				const l = Ro.content;
				if (s) {
					const c = l.firstChild;
					for (; c.firstChild; ) l.appendChild(c.firstChild);
					l.removeChild(c);
				}
				t.insertBefore(l, n);
			}
			return [r ? r.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
		},
	};
function Vc(e, t, n) {
	const s = e._vtc;
	s && (t = (t ? [t, ...s] : [...s]).join(" ")),
		t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
function Tc(e, t, n) {
	const s = e.style,
		o = we(n);
	if (n && !o) {
		for (const i in n) Es(s, i, n[i]);
		if (t && !we(t)) for (const i in t) n[i] == null && Es(s, i, "");
	} else {
		const i = s.display;
		o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
			"_vod" in e && (s.display = i);
	}
}
const Do = /\s*!important$/;
function Es(e, t, n) {
	if (K(n)) n.forEach(s => Es(e, t, s));
	else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
	else {
		const s = Ec(e, t);
		Do.test(n) ? e.setProperty(Gt(s), n.replace(Do, ""), "important") : (e[s] = n);
	}
}
const zo = ["Webkit", "Moz", "ms"],
	hs = {};
function Ec(e, t) {
	const n = hs[t];
	if (n) return n;
	let s = tt(t);
	if (s !== "filter" && s in e) return (hs[t] = s);
	s = Kn(s);
	for (let o = 0; o < zo.length; o++) {
		const i = zo[o] + s;
		if (i in e) return (hs[t] = i);
	}
	return t;
}
const Uo = "http://www.w3.org/1999/xlink";
function Lc(e, t, n, s, o) {
	if (s && t.startsWith("xlink:"))
		n == null ? e.removeAttributeNS(Uo, t.slice(6, t.length)) : e.setAttributeNS(Uo, t, n);
	else {
		const i = Ar(t);
		n == null || (i && !di(n)) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
	}
}
function Mc(e, t, n, s, o, i, r) {
	if (t === "innerHTML" || t === "textContent") {
		s && r(s, o, i), (e[t] = n ?? "");
		return;
	}
	if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
		e._value = n;
		const c = n ?? "";
		(e.value !== c || e.tagName === "OPTION") && (e.value = c),
			n == null && e.removeAttribute(t);
		return;
	}
	let l = !1;
	if (n === "" || n == null) {
		const c = typeof e[t];
		c === "boolean"
			? (n = di(n))
			: n == null && c === "string"
			? ((n = ""), (l = !0))
			: c === "number" && ((n = 0), (l = !0));
	}
	try {
		e[t] = n;
	} catch {}
	l && e.removeAttribute(t);
}
function Ac(e, t, n, s) {
	e.addEventListener(t, n, s);
}
function Ic(e, t, n, s) {
	e.removeEventListener(t, n, s);
}
function Nc(e, t, n, s, o = null) {
	const i = e._vei || (e._vei = {}),
		r = i[t];
	if (s && r) r.value = s;
	else {
		const [l, c] = Bc(t);
		if (s) {
			const f = (i[t] = Hc(s, o));
			Ac(e, l, f, c);
		} else r && (Ic(e, l, r, c), (i[t] = void 0));
	}
}
const jo = /(?:Once|Passive|Capture)$/;
function Bc(e) {
	let t;
	if (jo.test(e)) {
		t = {};
		let s;
		for (; (s = e.match(jo)); )
			(e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
	}
	return [e[2] === ":" ? e.slice(3) : Gt(e.slice(2)), t];
}
let _s = 0;
const Oc = Promise.resolve(),
	Fc = () => _s || (Oc.then(() => (_s = 0)), (_s = Date.now()));
function Hc(e, t) {
	const n = s => {
		if (!s._vts) s._vts = Date.now();
		else if (s._vts <= n.attached) return;
		Re(Rc(s, n.value), t, 5, [s]);
	};
	return (n.value = e), (n.attached = Fc()), n;
}
function Rc(e, t) {
	if (K(t)) {
		const n = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				n.call(e), (e._stopped = !0);
			}),
			t.map(s => o => !o._stopped && s && s(o))
		);
	} else return t;
}
const Ko = /^on[a-z]/,
	Dc = (e, t, n, s, o = !1, i, r, l, c) => {
		t === "class"
			? Vc(e, s, o)
			: t === "style"
			? Tc(e, n, s)
			: pn(t)
			? Os(t) || Nc(e, t, n, s, r)
			: (
					t[0] === "."
						? ((t = t.slice(1)), !0)
						: t[0] === "^"
						? ((t = t.slice(1)), !1)
						: zc(e, t, s, o)
			  )
			? Mc(e, t, s, i, r, l, c)
			: (t === "true-value" ? (e._trueValue = s) : t === "false-value" && (e._falseValue = s),
			  Lc(e, t, s, o));
	};
function zc(e, t, n, s) {
	return s
		? !!(t === "innerHTML" || t === "textContent" || (t in e && Ko.test(t) && J(n)))
		: t === "spellcheck" ||
		  t === "draggable" ||
		  t === "translate" ||
		  t === "form" ||
		  (t === "list" && e.tagName === "INPUT") ||
		  (t === "type" && e.tagName === "TEXTAREA") ||
		  (Ko.test(t) && we(n))
		? !1
		: t in e;
}
function Uc(e) {
	const t = ts();
	if (!t) return;
	const n = (t.ut = (o = e(t.proxy)) => {
			Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i =>
				Ms(i, o),
			);
		}),
		s = () => {
			const o = e(t.proxy);
			Ls(t.subTree, o), n(o);
		};
	Hi(s),
		De(() => {
			const o = new MutationObserver(s);
			o.observe(t.subTree.el.parentNode, { childList: !0 }), pt(() => o.disconnect());
		});
}
function Ls(e, t) {
	if (e.shapeFlag & 128) {
		const n = e.suspense;
		(e = n.activeBranch),
			n.pendingBranch &&
				!n.isHydrating &&
				n.effects.push(() => {
					Ls(n.activeBranch, t);
				});
	}
	for (; e.component; ) e = e.component.subTree;
	if (e.shapeFlag & 1 && e.el) Ms(e.el, t);
	else if (e.type === Y) e.children.forEach(n => Ls(n, t));
	else if (e.type === Dt) {
		let { el: n, anchor: s } = e;
		for (; n && (Ms(n, t), n !== s); ) n = n.nextSibling;
	}
}
function Ms(e, t) {
	if (e.nodeType === 1) {
		const n = e.style;
		for (const s in t) n.setProperty(`--${s}`, t[s]);
	}
}
const ct = "transition",
	Zt = "animation",
	ns = (e, { slots: t }) => On(Di, jc(e), t);
ns.displayName = "Transition";
const cr = {
	name: String,
	type: String,
	css: { type: Boolean, default: !0 },
	duration: [String, Number, Object],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String,
};
ns.props = $e({}, Di.props, cr);
const yt = (e, t = []) => {
		K(e) ? e.forEach(n => n(...t)) : e && e(...t);
	},
	qo = e => (e ? (K(e) ? e.some(t => t.length > 1) : e.length > 1) : !1);
function jc(e) {
	const t = {};
	for (const B in e) B in cr || (t[B] = e[B]);
	if (e.css === !1) return t;
	const {
			name: n = "v",
			type: s,
			duration: o,
			enterFromClass: i = `${n}-enter-from`,
			enterActiveClass: r = `${n}-enter-active`,
			enterToClass: l = `${n}-enter-to`,
			appearFromClass: c = i,
			appearActiveClass: f = r,
			appearToClass: h = l,
			leaveFromClass: p = `${n}-leave-from`,
			leaveActiveClass: g = `${n}-leave-active`,
			leaveToClass: P = `${n}-leave-to`,
		} = e,
		j = Kc(o),
		F = j && j[0],
		se = j && j[1],
		{
			onBeforeEnter: x,
			onEnter: E,
			onEnterCancelled: I,
			onLeave: G,
			onLeaveCancelled: Z,
			onBeforeAppear: he = x,
			onAppear: oe = E,
			onAppearCancelled: M = I,
		} = t,
		X = (B, ee, R) => {
			wt(B, ee ? h : l), wt(B, ee ? f : r), R && R();
		},
		Q = (B, ee) => {
			(B._isLeaving = !1), wt(B, p), wt(B, P), wt(B, g), ee && ee();
		},
		re = B => (ee, R) => {
			const Me = B ? oe : E,
				ue = () => X(ee, B, R);
			yt(Me, [ee, ue]),
				Wo(() => {
					wt(ee, B ? c : i), at(ee, B ? h : l), qo(Me) || Go(ee, s, F, ue);
				});
		};
	return $e(t, {
		onBeforeEnter(B) {
			yt(x, [B]), at(B, i), at(B, r);
		},
		onBeforeAppear(B) {
			yt(he, [B]), at(B, c), at(B, f);
		},
		onEnter: re(!1),
		onAppear: re(!0),
		onLeave(B, ee) {
			B._isLeaving = !0;
			const R = () => Q(B, ee);
			at(B, p),
				Gc(),
				at(B, g),
				Wo(() => {
					B._isLeaving && (wt(B, p), at(B, P), qo(G) || Go(B, s, se, R));
				}),
				yt(G, [B, R]);
		},
		onEnterCancelled(B) {
			X(B, !1), yt(I, [B]);
		},
		onAppearCancelled(B) {
			X(B, !0), yt(M, [B]);
		},
		onLeaveCancelled(B) {
			Q(B), yt(Z, [B]);
		},
	});
}
function Kc(e) {
	if (e == null) return null;
	if (me(e)) return [ps(e.enter), ps(e.leave)];
	{
		const t = ps(e);
		return [t, t];
	}
}
function ps(e) {
	return Ds(e);
}
function at(e, t) {
	t.split(/\s+/).forEach(n => n && e.classList.add(n)), (e._vtc || (e._vtc = new Set())).add(t);
}
function wt(e, t) {
	t.split(/\s+/).forEach(s => s && e.classList.remove(s));
	const { _vtc: n } = e;
	n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Wo(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
let qc = 0;
function Go(e, t, n, s) {
	const o = (e._endId = ++qc),
		i = () => {
			o === e._endId && s();
		};
	if (n) return setTimeout(i, n);
	const { type: r, timeout: l, propCount: c } = Wc(e, t);
	if (!r) return s();
	const f = r + "end";
	let h = 0;
	const p = () => {
			e.removeEventListener(f, g), i();
		},
		g = P => {
			P.target === e && ++h >= c && p();
		};
	setTimeout(() => {
		h < c && p();
	}, l + 1),
		e.addEventListener(f, g);
}
function Wc(e, t) {
	const n = window.getComputedStyle(e),
		s = j => (n[j] || "").split(", "),
		o = s(`${ct}Delay`),
		i = s(`${ct}Duration`),
		r = Yo(o, i),
		l = s(`${Zt}Delay`),
		c = s(`${Zt}Duration`),
		f = Yo(l, c);
	let h = null,
		p = 0,
		g = 0;
	t === ct
		? r > 0 && ((h = ct), (p = r), (g = i.length))
		: t === Zt
		? f > 0 && ((h = Zt), (p = f), (g = c.length))
		: ((p = Math.max(r, f)),
		  (h = p > 0 ? (r > f ? ct : Zt) : null),
		  (g = h ? (h === ct ? i.length : c.length) : 0));
	const P = h === ct && /\b(transform|all)(,|$)/.test(s(`${ct}Property`).toString());
	return { type: h, timeout: p, propCount: g, hasTransform: P };
}
function Yo(e, t) {
	for (; e.length < t.length; ) e = e.concat(e);
	return Math.max(...t.map((n, s) => Qo(n) + Qo(e[s])));
}
function Qo(e) {
	return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Gc() {
	return document.body.offsetHeight;
}
const Yc = ["ctrl", "shift", "alt", "meta"],
	Qc = {
		stop: e => e.stopPropagation(),
		prevent: e => e.preventDefault(),
		self: e => e.target !== e.currentTarget,
		ctrl: e => !e.ctrlKey,
		shift: e => !e.shiftKey,
		alt: e => !e.altKey,
		meta: e => !e.metaKey,
		left: e => "button" in e && e.button !== 0,
		middle: e => "button" in e && e.button !== 1,
		right: e => "button" in e && e.button !== 2,
		exact: (e, t) => Yc.some(n => e[`${n}Key`] && !t.includes(n)),
	},
	Jc =
		(e, t) =>
		(n, ...s) => {
			for (let o = 0; o < t.length; o++) {
				const i = Qc[t[o]];
				if (i && i(n, t)) return;
			}
			return e(n, ...s);
		},
	Xc = $e({ patchProp: Dc }, Sc);
let vs,
	Jo = !1;
function Zc() {
	return (vs = Jo ? vs : ic(Xc)), (Jo = !0), vs;
}
const ea = (...e) => {
	const t = Zc().createApp(...e),
		{ mount: n } = t;
	return (
		(t.mount = s => {
			const o = ta(s);
			if (o) return n(o, !0, o instanceof SVGElement);
		}),
		t
	);
};
function ta(e) {
	return we(e) ? document.querySelector(e) : e;
}
const N = (e, t) => {
		const n = e.__vccOpts || e;
		for (const [s, o] of t) n[s] = o;
		return n;
	},
	na = "modulepreload",
	sa = function (e) {
		return "/" + e;
	},
	Xo = {},
	oa = function (t, n, s) {
		if (!n || n.length === 0) return t();
		const o = document.getElementsByTagName("link");
		return Promise.all(
			n.map(i => {
				if (((i = sa(i)), i in Xo)) return;
				Xo[i] = !0;
				const r = i.endsWith(".css"),
					l = r ? '[rel="stylesheet"]' : "";
				if (!!s)
					for (let h = o.length - 1; h >= 0; h--) {
						const p = o[h];
						if (p.href === i && (!r || p.rel === "stylesheet")) return;
					}
				else if (document.querySelector(`link[href="${i}"]${l}`)) return;
				const f = document.createElement("link");
				if (
					((f.rel = r ? "stylesheet" : na),
					r || ((f.as = "script"), (f.crossOrigin = "")),
					(f.href = i),
					document.head.appendChild(f),
					r)
				)
					return new Promise((h, p) => {
						f.addEventListener("load", h),
							f.addEventListener("error", () =>
								p(new Error(`Unable to preload CSS for ${i}`)),
							);
					});
			}),
		).then(() => t());
	};
const ia = H({
	__name: "VPBadge",
	props: { text: null, type: null },
	setup(e) {
		return (t, n) => (
			d(),
			m(
				"span",
				{ class: de(["VPBadge", e.type ?? "tip"]) },
				[S(t.$slots, "default", {}, () => [Ee(ae(e.text), 1)], !0)],
				2,
			)
		);
	},
});
const ra = N(ia, [["__scopeId", "data-v-7cd5b1ac"]]),
	la = JSON.parse(
		'{"lang":"en-US","title":"scs blog","description":"手机点播，喷泉表演","base":"/","head":[],"appearance":true,"themeConfig":{},"locales":{},"langs":{},"scrollOffset":90,"cleanUrls":"disabled"}',
	),
	ss = /^[a-z]+:/i,
	ca = /^pathname:\/\//,
	Zo = "vitepress-theme-appearance",
	Te = typeof window < "u",
	ar = {
		relativePath: "",
		title: "404",
		description: "Not Found",
		headers: [],
		frontmatter: { sidebar: !1, layout: "page" },
		lastUpdated: 0,
	};
function aa(e, t) {
	t.sort((n, s) => {
		const o = s.split("/").length - n.split("/").length;
		return o !== 0 ? o : s.length - n.length;
	});
	for (const n of t) if (e.startsWith(n)) return n;
}
function ei(e, t) {
	const n = aa(t, Object.keys(e));
	return n ? e[n] : void 0;
}
function ua(e) {
	const { locales: t } = e.themeConfig || {},
		n = e.locales;
	return t && n
		? Object.keys(t).reduce((s, o) => ((s[o] = { label: t[o].label, lang: n[o].lang }), s), {})
		: {};
}
function fa(e, t) {
	t = ha(e, t);
	const n = ei(e.locales || {}, t),
		s = ei(e.themeConfig.locales || {}, t);
	return Object.assign({}, e, n, {
		themeConfig: Object.assign({}, e.themeConfig, s, { locales: {} }),
		lang: (n || e).lang,
		locales: {},
		langs: ua(e),
	});
}
function ur(e, t) {
	const n = t.title || e.title,
		s = t.titleTemplate ?? e.titleTemplate;
	if (typeof s == "string" && s.includes(":title")) return s.replace(/:title/g, n);
	const o = da(e.title, s);
	return `${n}${o}`;
}
function da(e, t) {
	return t === !1 ? "" : t === !0 || t === void 0 ? ` | ${e}` : e === t ? "" : ` | ${t}`;
}
function ha(e, t) {
	if (!Te) return t;
	const n = e.base,
		s = n.endsWith("/") ? n.slice(0, -1) : n;
	return t.slice(s.length);
}
function _a(e, t) {
	const [n, s] = t;
	if (n !== "meta") return !1;
	const o = Object.entries(s)[0];
	return o == null ? !1 : e.some(([i, r]) => i === n && r[o[0]] === o[1]);
}
function pa(e, t) {
	return [...e.filter(n => !_a(t, n)), ...t];
}
const va = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
	ma = /^[a-z]:/i;
function ti(e) {
	const t = ma.exec(e),
		n = t ? t[0] : "";
	return (
		n +
		e
			.slice(n.length)
			.replace(va, "_")
			.replace(/(^|\/)_+(?=[^/]*$)/, "$1")
	);
}
function ga(e, t) {
	return `${e}${t}`.replace(/\/+/g, "/");
}
function _n(e) {
	return ss.test(e) ? e : ga(Wt.value.base, e);
}
function fr(e) {
	let t = e.replace(/\.html$/, "");
	if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, "/index")), Te)) {
		const n = "/";
		t = ti(t.slice(n.length).replace(/\//g, "_") || "index") + ".md";
		let s = __VP_HASH_MAP__[t.toLowerCase()];
		!s &&
			t.endsWith("_index.md") &&
			((t = t.slice(0, -9) + ".md"), (s = __VP_HASH_MAP__[t.toLowerCase()])),
			(t = `${n}assets/${t}.${s}.js`);
	} else t = `./${ti(t.slice(1).replace(/\//g, "_"))}.md.js`;
	return t;
}
const dr = Symbol(),
	Wt = ml(la);
function ba(e) {
	const t = ne(() => fa(Wt.value, e.path));
	return {
		site: t,
		theme: ne(() => t.value.themeConfig),
		page: ne(() => e.data),
		frontmatter: ne(() => e.data.frontmatter),
		lang: ne(() => t.value.lang),
		localePath: ne(() => {
			const { langs: n, lang: s } = t.value,
				o = Object.keys(n).find(i => n[i].lang === s);
			return _n(o || "/");
		}),
		title: ne(() => ur(t.value, e.data)),
		description: ne(() => e.data.description || t.value.description),
		isDark: _e(!1),
	};
}
function le() {
	const e = Ne(dr);
	if (!e) throw new Error("vitepress data not properly injected in app");
	return e;
}
const hr = Symbol(),
	ni = "http://a.com",
	ya = () => ({ path: "/", component: null, data: ar });
function wa(e, t) {
	const n = Wn(ya()),
		s = { route: n, go: o };
	async function o(l = Te ? location.href : "/") {
		var f, h;
		await ((f = s.onBeforeRouteChange) == null ? void 0 : f.call(s, l));
		const c = new URL(l, ni);
		Wt.value.cleanUrls === "disabled" &&
			!c.pathname.endsWith("/") &&
			!c.pathname.endsWith(".html") &&
			((c.pathname += ".html"), (l = c.pathname + c.search + c.hash)),
			Te &&
				(history.replaceState({ scrollPosition: window.scrollY }, document.title),
				history.pushState(null, "", l)),
			await r(l),
			await ((h = s.onAfterRouteChanged) == null ? void 0 : h.call(s, l));
	}
	let i = null;
	async function r(l, c = 0, f = !1) {
		const h = new URL(l, ni),
			p = (i = h.pathname);
		try {
			let g = await e(p);
			if (i === p) {
				i = null;
				const { default: P, __pageData: j } = g;
				if (!P) throw new Error(`Invalid route component: ${P}`);
				(n.path = Te ? p : _n(p)),
					(n.component = nn(P)),
					(n.data = nn(j)),
					Te &&
						Js(() => {
							if (h.hash && !c) {
								let F = null;
								try {
									F = document.querySelector(decodeURIComponent(h.hash));
								} catch (se) {
									console.warn(se);
								}
								if (F) {
									si(F, h.hash);
									return;
								}
							}
							window.scrollTo(0, c);
						});
			}
		} catch (g) {
			if (
				(!/fetch/.test(g.message) && !/^\/404(\.html|\/)?$/.test(l) && console.error(g), !f)
			)
				try {
					const P = await fetch(Wt.value.base + "hashmap.json");
					(window.__VP_HASH_MAP__ = await P.json()), await r(l, c, !0);
					return;
				} catch {}
			i === p &&
				((i = null),
				(n.path = Te ? p : _n(p)),
				(n.component = t ? nn(t) : null),
				(n.data = ar));
		}
	}
	return (
		Te &&
			(window.addEventListener(
				"click",
				l => {
					if (l.target.closest("button")) return;
					const f = l.target.closest("a");
					if (f && !f.closest(".vp-raw") && !f.download) {
						const {
								href: h,
								origin: p,
								pathname: g,
								hash: P,
								search: j,
								target: F,
							} = f,
							se = window.location,
							x = g.match(/\.\w+$/);
						!l.ctrlKey &&
							!l.shiftKey &&
							!l.altKey &&
							!l.metaKey &&
							F !== "_blank" &&
							p === se.origin &&
							!(x && x[0] !== ".html") &&
							(l.preventDefault(),
							g === se.pathname && j === se.search
								? P &&
								  P !== se.hash &&
								  (history.pushState(null, "", P),
								  window.dispatchEvent(new Event("hashchange")),
								  si(f, P, f.classList.contains("header-anchor")))
								: o(h));
					}
				},
				{ capture: !0 },
			),
			window.addEventListener("popstate", l => {
				r(location.href, (l.state && l.state.scrollPosition) || 0);
			}),
			window.addEventListener("hashchange", l => {
				l.preventDefault();
			})),
		s
	);
}
function xa() {
	const e = Ne(hr);
	if (!e) throw new Error("useRouter() is called without provider.");
	return e;
}
function vt() {
	return xa().route;
}
function si(e, t, n = !1) {
	let s = null;
	try {
		s = e.classList.contains("header-anchor")
			? e
			: document.querySelector(decodeURIComponent(t));
	} catch (o) {
		console.warn(o);
	}
	if (s) {
		let o = Wt.value.scrollOffset;
		typeof o == "string" && (o = document.querySelector(o).getBoundingClientRect().bottom + 24);
		const i = parseInt(window.getComputedStyle(s).paddingTop, 10),
			r = window.scrollY + s.getBoundingClientRect().top - o + i;
		!n || Math.abs(r - window.scrollY) > window.innerHeight
			? window.scrollTo(0, r)
			: window.scrollTo({ left: 0, top: r, behavior: "smooth" });
	}
}
const $a = H({
	name: "VitePressContent",
	props: { onContentUpdated: Function },
	setup(e) {
		const t = vt();
		return (
			Zs(() => {
				var n;
				(n = e.onContentUpdated) == null || n.call(e);
			}),
			() =>
				On("div", { style: { position: "relative" } }, [
					t.component ? On(t.component) : null,
				])
		);
	},
});
var oi;
const vn = typeof window < "u";
vn &&
	(oi = window == null ? void 0 : window.navigator) != null &&
	oi.userAgent &&
	/iP(ad|hone|od)/.test(window.navigator.userAgent);
function Pa(e) {
	return e;
}
function ka(e) {
	return Ur() ? (jr(e), !0) : !1;
}
function Ca(e) {
	return typeof e == "function" ? ne(e) : _e(e);
}
function Sa(e, t = !0) {
	ts() ? De(e) : t ? e() : Js(e);
}
const Va = vn ? window : void 0;
vn && window.document;
vn && window.navigator;
vn && window.location;
function Ta(e, t = !1) {
	const n = _e(),
		s = () => (n.value = Boolean(e()));
	return s(), Sa(s, t), n;
}
function As(e, t = {}) {
	const { window: n = Va } = t,
		s = Ta(() => n && "matchMedia" in n && typeof n.matchMedia == "function");
	let o;
	const i = _e(!1),
		r = () => {
			o &&
				("removeEventListener" in o
					? o.removeEventListener("change", l)
					: o.removeListener(l));
		},
		l = () => {
			s.value &&
				(r(),
				(o = n.matchMedia(Ca(e).value)),
				(i.value = o.matches),
				"addEventListener" in o ? o.addEventListener("change", l) : o.addListener(l));
		};
	return Tt(l), ka(() => r()), i;
}
const Is =
		typeof globalThis < "u"
			? globalThis
			: typeof window < "u"
			? window
			: typeof global < "u"
			? global
			: typeof self < "u"
			? self
			: {},
	Ns = "__vueuse_ssr_handlers__";
Is[Ns] = Is[Ns] || {};
Is[Ns];
var ii;
(function (e) {
	(e.UP = "UP"), (e.RIGHT = "RIGHT"), (e.DOWN = "DOWN"), (e.LEFT = "LEFT"), (e.NONE = "NONE");
})(ii || (ii = {}));
var Ea = Object.defineProperty,
	ri = Object.getOwnPropertySymbols,
	La = Object.prototype.hasOwnProperty,
	Ma = Object.prototype.propertyIsEnumerable,
	li = (e, t, n) =>
		t in e
			? Ea(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
			: (e[t] = n),
	Aa = (e, t) => {
		for (var n in t || (t = {})) La.call(t, n) && li(e, n, t[n]);
		if (ri) for (var n of ri(t)) Ma.call(t, n) && li(e, n, t[n]);
		return e;
	};
const Ia = {
	easeInSine: [0.12, 0, 0.39, 0],
	easeOutSine: [0.61, 1, 0.88, 1],
	easeInOutSine: [0.37, 0, 0.63, 1],
	easeInQuad: [0.11, 0, 0.5, 0],
	easeOutQuad: [0.5, 1, 0.89, 1],
	easeInOutQuad: [0.45, 0, 0.55, 1],
	easeInCubic: [0.32, 0, 0.67, 0],
	easeOutCubic: [0.33, 1, 0.68, 1],
	easeInOutCubic: [0.65, 0, 0.35, 1],
	easeInQuart: [0.5, 0, 0.75, 0],
	easeOutQuart: [0.25, 1, 0.5, 1],
	easeInOutQuart: [0.76, 0, 0.24, 1],
	easeInQuint: [0.64, 0, 0.78, 0],
	easeOutQuint: [0.22, 1, 0.36, 1],
	easeInOutQuint: [0.83, 0, 0.17, 1],
	easeInExpo: [0.7, 0, 0.84, 0],
	easeOutExpo: [0.16, 1, 0.3, 1],
	easeInOutExpo: [0.87, 0, 0.13, 1],
	easeInCirc: [0.55, 0, 1, 0.45],
	easeOutCirc: [0, 0.55, 0.45, 1],
	easeInOutCirc: [0.85, 0, 0.15, 1],
	easeInBack: [0.36, 0, 0.66, -0.56],
	easeOutBack: [0.34, 1.56, 0.64, 1],
	easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
Aa({ linear: Pa }, Ia);
const _r = /#.*$/,
	Na = /(index)?\.(md|html)$/,
	Ba = typeof window < "u",
	Oa = _e(Ba ? location.hash : "");
function Fa(e) {
	return ss.test(e);
}
function Ha(e, t) {
	let n,
		s = !1;
	return () => {
		n && clearTimeout(n),
			s
				? (n = setTimeout(e, t))
				: (e(),
				  (s = !0),
				  setTimeout(() => {
						s = !1;
				  }, t));
	};
}
function Jt(e, t, n = !1) {
	if (t === void 0) return !1;
	if (((e = ai(`/${e}`)), n)) return new RegExp(t).test(e);
	if (ai(t) !== e) return !1;
	const s = t.match(_r);
	return s ? Oa.value === s[0] : !0;
}
function ci(e) {
	return /^\//.test(e) ? e : `/${e}`;
}
function ai(e) {
	return decodeURI(e).replace(_r, "").replace(Na, "");
}
function Fn(e) {
	if (Fa(e)) return e.replace(ca, "");
	const { site: t } = le(),
		{ pathname: n, search: s, hash: o } = new URL(e, "http://example.com"),
		i =
			n.endsWith("/") || n.endsWith(".html")
				? e
				: `${n.replace(
						/(\.md)?$/,
						t.value.cleanUrls === "disabled" ? ".html" : "",
				  )}${s}${o}`;
	return _n(i);
}
function pr(e, t) {
	if (Array.isArray(e)) return e;
	if (e == null) return [];
	t = ci(t);
	const n = Object.keys(e)
		.sort((s, o) => o.split("/").length - s.split("/").length)
		.find(s => t.startsWith(ci(s)));
	return n ? e[n] : [];
}
function Ra(e) {
	const t = [];
	function n(s) {
		for (const o of s) o.link && t.push({ ...o, link: o.link }), "items" in o && n(o.items);
	}
	for (const s of e) n(s.items);
	return t;
}
function Ye() {
	const e = vt(),
		{ theme: t, frontmatter: n } = le(),
		s = As("(min-width: 960px)"),
		o = _e(!1),
		i = ne(() => {
			const g = t.value.sidebar,
				P = e.data.relativePath;
			return g ? pr(g, P) : [];
		}),
		r = ne(() => n.value.sidebar !== !1 && i.value.length > 0 && n.value.layout !== "home"),
		l = ne(() => n.value.layout !== "home" && n.value.aside !== !1),
		c = ne(() => r.value && s.value);
	function f() {
		o.value = !0;
	}
	function h() {
		o.value = !1;
	}
	function p() {
		o.value ? h() : f();
	}
	return {
		isOpen: o,
		sidebar: i,
		hasSidebar: r,
		hasAside: l,
		isSidebarEnabled: c,
		open: f,
		close: h,
		toggle: p,
	};
}
function Da(e, t) {
	let n;
	Tt(() => {
		n = e.value ? document.activeElement : void 0;
	}),
		De(() => {
			window.addEventListener("keyup", s);
		}),
		pt(() => {
			window.removeEventListener("keyup", s);
		});
	function s(o) {
		o.key === "Escape" && e.value && (t(), n == null || n.focus());
	}
}
const za = H({
	__name: "VPSkipLink",
	setup(e) {
		const t = vt(),
			n = _e();
		et(
			() => t.path,
			() => n.value.focus(),
		);
		function s({ target: o }) {
			const i = document.querySelector(o.hash);
			if (i) {
				const r = () => {
					i.removeAttribute("tabindex"), i.removeEventListener("blur", r);
				};
				i.setAttribute("tabindex", "-1"),
					i.addEventListener("blur", r),
					i.focus(),
					window.scrollTo(0, 0);
			}
		}
		return (o, i) => (
			d(),
			m(
				Y,
				null,
				[
					b("span", { ref_key: "backToTop", ref: n, tabindex: "-1" }, null, 512),
					b(
						"a",
						{ href: "#VPContent", class: "VPSkipLink visually-hidden", onClick: s },
						" Skip to content ",
					),
				],
				64,
			)
		);
	},
});
const Ua = N(za, [["__scopeId", "data-v-9b6ee0d8"]]),
	ja = { key: 0, class: "VPBackdrop" },
	Ka = H({
		__name: "VPBackdrop",
		props: { show: { type: Boolean } },
		setup(e) {
			return (t, n) => (
				d(),
				W(
					ns,
					{ name: "fade" },
					{ default: A(() => [e.show ? (d(), m("div", ja)) : U("", !0)]), _: 1 },
				)
			);
		},
	});
const qa = N(Ka, [["__scopeId", "data-v-7f9602e2"]]);
function Wa() {
	const e = _e(!1);
	function t() {
		(e.value = !0), window.addEventListener("resize", o);
	}
	function n() {
		(e.value = !1), window.removeEventListener("resize", o);
	}
	function s() {
		e.value ? n() : t();
	}
	function o() {
		window.outerWidth >= 768 && n();
	}
	const i = vt();
	return et(() => i.path, n), { isScreenOpen: e, openScreen: t, closeScreen: n, toggleScreen: s };
}
const Ga = ["src", "alt"],
	Ya = { inheritAttrs: !1 },
	Qa = H({
		...Ya,
		__name: "VPImage",
		props: { image: null, alt: null },
		setup(e) {
			return (t, n) => {
				const s = Et("VPImage", !0);
				return e.image
					? (d(),
					  m(
							Y,
							{ key: 0 },
							[
								typeof e.image == "string" || "src" in e.image
									? (d(),
									  m(
											"img",
											Tn(
												{ key: 0, class: "VPImage" },
												typeof e.image == "string"
													? t.$attrs
													: { ...e.image, ...t.$attrs },
												{
													src: _(_n)(
														typeof e.image == "string"
															? e.image
															: e.image.src,
													),
													alt:
														e.alt ??
														(typeof e.image == "string"
															? ""
															: e.image.alt || ""),
												},
											),
											null,
											16,
											Ga,
									  ))
									: (d(),
									  m(
											Y,
											{ key: 1 },
											[
												T(
													s,
													Tn(
														{
															class: "dark",
															image: e.image.dark,
															alt: e.image.alt,
														},
														t.$attrs,
													),
													null,
													16,
													["image", "alt"],
												),
												T(
													s,
													Tn(
														{
															class: "light",
															image: e.image.light,
															alt: e.image.alt,
														},
														t.$attrs,
													),
													null,
													16,
													["image", "alt"],
												),
											],
											64,
									  )),
							],
							64,
					  ))
					: U("", !0);
			};
		},
	});
const ro = N(Qa, [["__scopeId", "data-v-bbcdc917"]]),
	Ja = ["href"],
	Xa = H({
		__name: "VPNavBarTitle",
		setup(e) {
			const { site: t, theme: n } = le(),
				{ hasSidebar: s } = Ye();
			return (o, i) => (
				d(),
				m(
					"div",
					{ class: de(["VPNavBarTitle", { "has-sidebar": _(s) }]) },
					[
						b(
							"a",
							{ class: "title", href: _(t).base },
							[
								S(o.$slots, "nav-bar-title-before", {}, void 0, !0),
								T(ro, { class: "logo", image: _(n).logo }, null, 8, ["image"]),
								_(n).siteTitle
									? (d(), m(Y, { key: 0 }, [Ee(ae(_(n).siteTitle), 1)], 64))
									: _(n).siteTitle === void 0
									? (d(), m(Y, { key: 1 }, [Ee(ae(_(t).title), 1)], 64))
									: U("", !0),
								S(o.$slots, "nav-bar-title-after", {}, void 0, !0),
							],
							8,
							Ja,
						),
					],
					2,
				)
			);
		},
	});
const Za = N(Xa, [["__scopeId", "data-v-093469ac"]]);
const eu = { key: 0, class: "VPNavBarSearch" },
	tu = { type: "button", class: "DocSearch DocSearch-Button", "aria-label": "Search" },
	nu = { class: "DocSearch-Button-Container" },
	su = b(
		"svg",
		{ class: "DocSearch-Search-Icon", width: "20", height: "20", viewBox: "0 0 20 20" },
		[
			b("path", {
				d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",
				stroke: "currentColor",
				fill: "none",
				"fill-rule": "evenodd",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
			}),
		],
		-1,
	),
	ou = { class: "DocSearch-Button-Placeholder" },
	iu = b(
		"span",
		{ class: "DocSearch-Button-Keys" },
		[
			b("kbd", { class: "DocSearch-Button-Key" }),
			b("kbd", { class: "DocSearch-Button-Key" }, "K"),
		],
		-1,
	),
	ru = H({
		__name: "VPNavBarSearch",
		setup(e) {
			Uc(r => ({ "5210043a": o.value }));
			const t = () => null,
				{ theme: n } = le(),
				s = _e(!1),
				o = _e("'Meta'");
			De(() => {
				if (!n.value.algolia) return;
				o.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "'⌘'" : "'Ctrl'";
				const r = c => {
						c.key === "k" && (c.ctrlKey || c.metaKey) && (c.preventDefault(), i(), l());
					},
					l = () => {
						window.removeEventListener("keydown", r);
					};
				window.addEventListener("keydown", r), pt(l);
			});
			function i() {
				s.value || (s.value = !0);
			}
			return (r, l) => {
				var c;
				return _(n).algolia
					? (d(),
					  m("div", eu, [
							s.value
								? (d(), W(_(t), { key: 0 }))
								: (d(),
								  m("div", { key: 1, id: "docsearch", onClick: i }, [
										b("button", tu, [
											b("span", nu, [
												su,
												b(
													"span",
													ou,
													ae(
														((c = _(n).algolia) == null
															? void 0
															: c.buttonText) || "Search",
													),
													1,
												),
											]),
											iu,
										]),
								  ])),
					  ]))
					: U("", !0);
			};
		},
	});
const lu = {},
	cu = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		height: "24px",
		viewBox: "0 0 24 24",
		width: "24px",
	},
	au = b("path", { d: "M0 0h24v24H0V0z", fill: "none" }, null, -1),
	uu = b("path", { d: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" }, null, -1),
	fu = [au, uu];
function du(e, t) {
	return d(), m("svg", cu, fu);
}
const hu = N(lu, [["render", du]]),
	_u = H({
		__name: "VPLink",
		props: { href: null, noIcon: { type: Boolean } },
		setup(e) {
			const t = e,
				n = ne(() => t.href && ss.test(t.href));
			return (s, o) => (
				d(),
				W(
					to(e.href ? "a" : "span"),
					{
						class: de(["VPLink", { link: e.href }]),
						href: e.href ? _(Fn)(e.href) : void 0,
						target: _(n) ? "_blank" : void 0,
						rel: _(n) ? "noreferrer" : void 0,
					},
					{
						default: A(() => [
							S(s.$slots, "default", {}, void 0, !0),
							_(n) && !e.noIcon ? (d(), W(hu, { key: 0, class: "icon" })) : U("", !0),
						]),
						_: 3,
					},
					8,
					["class", "href", "target", "rel"],
				)
			);
		},
	});
const Lt = N(_u, [["__scopeId", "data-v-cb3c066f"]]),
	pu = H({
		__name: "VPNavBarMenuLink",
		props: { item: null },
		setup(e) {
			const { page: t } = le();
			return (n, s) => (
				d(),
				W(
					Lt,
					{
						class: de({
							VPNavBarMenuLink: !0,
							active: _(Jt)(
								_(t).relativePath,
								e.item.activeMatch || e.item.link,
								!!e.item.activeMatch,
							),
						}),
						href: e.item.link,
						noIcon: !0,
					},
					{ default: A(() => [Ee(ae(e.item.text), 1)]), _: 1 },
					8,
					["class", "href"],
				)
			);
		},
	});
const vu = N(pu, [["__scopeId", "data-v-f5bf1aba"]]),
	lo = _e();
let vr = !1,
	ms = 0;
function mu(e) {
	const t = _e(!1);
	if (typeof window < "u") {
		!vr && gu(), ms++;
		const n = et(lo, s => {
			var o, i, r;
			s === e.el.value || ((o = e.el.value) != null && o.contains(s))
				? ((t.value = !0), (i = e.onFocus) == null || i.call(e))
				: ((t.value = !1), (r = e.onBlur) == null || r.call(e));
		});
		pt(() => {
			n(), ms--, ms || bu();
		});
	}
	return Ws(t);
}
function gu() {
	document.addEventListener("focusin", mr), (vr = !0), (lo.value = document.activeElement);
}
function bu() {
	document.removeEventListener("focusin", mr);
}
function mr() {
	lo.value = document.activeElement;
}
const yu = {},
	wu = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		viewBox: "0 0 24 24",
	},
	xu = b(
		"path",
		{
			d: "M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z",
		},
		null,
		-1,
	),
	$u = [xu];
function Pu(e, t) {
	return d(), m("svg", wu, $u);
}
const gr = N(yu, [["render", Pu]]),
	ku = {},
	Cu = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		viewBox: "0 0 24 24",
	},
	Su = b("circle", { cx: "12", cy: "12", r: "2" }, null, -1),
	Vu = b("circle", { cx: "19", cy: "12", r: "2" }, null, -1),
	Tu = b("circle", { cx: "5", cy: "12", r: "2" }, null, -1),
	Eu = [Su, Vu, Tu];
function Lu(e, t) {
	return d(), m("svg", Cu, Eu);
}
const Mu = N(ku, [["render", Lu]]),
	Au = { class: "VPMenuLink" },
	Iu = H({
		__name: "VPMenuLink",
		props: { item: null },
		setup(e) {
			const { page: t } = le();
			return (n, s) => (
				d(),
				m("div", Au, [
					T(
						Lt,
						{
							class: de({
								active: _(Jt)(_(t).relativePath, e.item.activeMatch || e.item.link),
							}),
							href: e.item.link,
						},
						{ default: A(() => [Ee(ae(e.item.text), 1)]), _: 1 },
						8,
						["class", "href"],
					),
				])
			);
		},
	});
const os = N(Iu, [["__scopeId", "data-v-efaa38fe"]]),
	Nu = { class: "VPMenuGroup" },
	Bu = { key: 0, class: "title" },
	Ou = H({
		__name: "VPMenuGroup",
		props: { text: null, items: null },
		setup(e) {
			return (t, n) => (
				d(),
				m("div", Nu, [
					e.text ? (d(), m("p", Bu, ae(e.text), 1)) : U("", !0),
					(d(!0),
					m(
						Y,
						null,
						Se(
							e.items,
							s => (
								d(),
								m(
									Y,
									null,
									[
										"link" in s
											? (d(), W(os, { key: 0, item: s }, null, 8, ["item"]))
											: U("", !0),
									],
									64,
								)
							),
						),
						256,
					)),
				])
			);
		},
	});
const Fu = N(Ou, [["__scopeId", "data-v-d558c689"]]),
	Hu = { class: "VPMenu" },
	Ru = { key: 0, class: "items" },
	Du = H({
		__name: "VPMenu",
		props: { items: null },
		setup(e) {
			return (t, n) => (
				d(),
				m("div", Hu, [
					e.items
						? (d(),
						  m("div", Ru, [
								(d(!0),
								m(
									Y,
									null,
									Se(
										e.items,
										s => (
											d(),
											m(
												Y,
												{ key: s.text },
												[
													"link" in s
														? (d(),
														  W(os, { key: 0, item: s }, null, 8, [
																"item",
														  ]))
														: (d(),
														  W(
																Fu,
																{
																	key: 1,
																	text: s.text,
																	items: s.items,
																},
																null,
																8,
																["text", "items"],
														  )),
												],
												64,
											)
										),
									),
									128,
								)),
						  ]))
						: U("", !0),
					S(t.$slots, "default", {}, void 0, !0),
				])
			);
		},
	});
const zu = N(Du, [["__scopeId", "data-v-71622125"]]),
	Uu = ["aria-expanded", "aria-label"],
	ju = { key: 0, class: "text" },
	Ku = { class: "menu" },
	qu = H({
		__name: "VPFlyout",
		props: { icon: null, button: null, label: null, items: null },
		setup(e) {
			const t = _e(!1),
				n = _e();
			mu({ el: n, onBlur: s });
			function s() {
				t.value = !1;
			}
			return (o, i) => (
				d(),
				m(
					"div",
					{
						class: "VPFlyout",
						ref_key: "el",
						ref: n,
						onMouseenter: i[1] || (i[1] = r => (t.value = !0)),
						onMouseleave: i[2] || (i[2] = r => (t.value = !1)),
					},
					[
						b(
							"button",
							{
								type: "button",
								class: "button",
								"aria-haspopup": "true",
								"aria-expanded": t.value,
								"aria-label": e.label,
								onClick: i[0] || (i[0] = r => (t.value = !t.value)),
							},
							[
								e.button || e.icon
									? (d(),
									  m("span", ju, [
											e.icon
												? (d(),
												  W(to(e.icon), { key: 0, class: "option-icon" }))
												: U("", !0),
											Ee(" " + ae(e.button) + " ", 1),
											T(gr, { class: "text-icon" }),
									  ]))
									: (d(), W(Mu, { key: 1, class: "icon" })),
							],
							8,
							Uu,
						),
						b("div", Ku, [
							T(
								zu,
								{ items: e.items },
								{
									default: A(() => [S(o.$slots, "default", {}, void 0, !0)]),
									_: 3,
								},
								8,
								["items"],
							),
						]),
					],
					544,
				)
			);
		},
	});
const co = N(qu, [["__scopeId", "data-v-2caac71f"]]),
	Wu = H({
		__name: "VPNavBarMenuGroup",
		props: { item: null },
		setup(e) {
			const { page: t } = le();
			return (n, s) => (
				d(),
				W(
					co,
					{
						class: de({
							VPNavBarMenuGroup: !0,
							active: _(Jt)(
								_(t).relativePath,
								e.item.activeMatch,
								!!e.item.activeMatch,
							),
						}),
						button: e.item.text,
						items: e.item.items,
					},
					null,
					8,
					["class", "button", "items"],
				)
			);
		},
	}),
	Gu = e => (We("data-v-c0d0f014"), (e = e()), Ge(), e),
	Yu = { key: 0, "aria-labelledby": "main-nav-aria-label", class: "VPNavBarMenu" },
	Qu = Gu(() =>
		b("span", { id: "main-nav-aria-label", class: "visually-hidden" }, "Main Navigation", -1),
	),
	Ju = H({
		__name: "VPNavBarMenu",
		setup(e) {
			const { theme: t } = le();
			return (n, s) =>
				_(t).nav
					? (d(),
					  m("nav", Yu, [
							Qu,
							(d(!0),
							m(
								Y,
								null,
								Se(
									_(t).nav,
									o => (
										d(),
										m(
											Y,
											{ key: o.text },
											[
												"link" in o
													? (d(),
													  W(vu, { key: 0, item: o }, null, 8, ["item"]))
													: (d(),
													  W(Wu, { key: 1, item: o }, null, 8, [
															"item",
													  ])),
											],
											64,
										)
									),
								),
								128,
							)),
					  ]))
					: U("", !0);
		},
	});
const Xu = N(Ju, [["__scopeId", "data-v-c0d0f014"]]),
	Zu = {},
	ef = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		viewBox: "0 0 24 24",
	},
	tf = b("path", { d: "M0 0h24v24H0z", fill: "none" }, null, -1),
	nf = b(
		"path",
		{
			d: " M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",
			class: "css-c4d79v",
		},
		null,
		-1,
	),
	sf = [tf, nf];
function of(e, t) {
	return d(), m("svg", ef, sf);
}
const br = N(Zu, [["render", of]]),
	rf = { class: "items" },
	lf = { class: "title" },
	cf = H({
		__name: "VPNavBarTranslations",
		setup(e) {
			const { theme: t } = le();
			return (n, s) =>
				_(t).localeLinks
					? (d(),
					  W(
							co,
							{ key: 0, class: "VPNavBarTranslations", icon: br },
							{
								default: A(() => [
									b("div", rf, [
										b("p", lf, ae(_(t).localeLinks.text), 1),
										(d(!0),
										m(
											Y,
											null,
											Se(
												_(t).localeLinks.items,
												o => (
													d(),
													W(os, { key: o.link, item: o }, null, 8, [
														"item",
													])
												),
											),
											128,
										)),
									]),
								]),
								_: 1,
							},
					  ))
					: U("", !0);
		},
	});
const af = N(cf, [["__scopeId", "data-v-9785e138"]]);
const uf = {},
	ff = { class: "VPSwitch", type: "button", role: "switch" },
	df = { class: "check" },
	hf = { key: 0, class: "icon" };
function _f(e, t) {
	return (
		d(),
		m("button", ff, [
			b("span", df, [
				e.$slots.default
					? (d(), m("span", hf, [S(e.$slots, "default", {}, void 0, !0)]))
					: U("", !0),
			]),
		])
	);
}
const pf = N(uf, [
		["render", _f],
		["__scopeId", "data-v-ab73b0bb"],
	]),
	vf = {},
	mf = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		viewBox: "0 0 24 24",
	},
	gf = dc(
		'<path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>',
		9,
	),
	bf = [gf];
function yf(e, t) {
	return d(), m("svg", mf, bf);
}
const wf = N(vf, [["render", yf]]),
	xf = {},
	$f = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		viewBox: "0 0 24 24",
	},
	Pf = b(
		"path",
		{
			d: "M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z",
		},
		null,
		-1,
	),
	kf = [Pf];
function Cf(e, t) {
	return d(), m("svg", $f, kf);
}
const Sf = N(xf, [["render", Cf]]),
	Vf = H({
		__name: "VPSwitchAppearance",
		setup(e) {
			const { site: t, isDark: n } = le(),
				s = _e(!1),
				o = typeof localStorage < "u" ? i() : () => {};
			De(() => {
				s.value = document.documentElement.classList.contains("dark");
			});
			function i() {
				const r = window.matchMedia("(prefers-color-scheme: dark)"),
					l = document.documentElement.classList;
				let c = localStorage.getItem(Zo),
					f =
						(t.value.appearance === "dark" && c == null) ||
						(c === "auto" || c == null ? r.matches : c === "dark");
				r.onchange = g => {
					c === "auto" && p((f = g.matches));
				};
				function h() {
					p((f = !f)),
						(c = f ? (r.matches ? "auto" : "dark") : r.matches ? "light" : "auto"),
						localStorage.setItem(Zo, c);
				}
				function p(g) {
					const P = document.createElement("style");
					(P.type = "text/css"),
						P.appendChild(
							document.createTextNode(`:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`),
						),
						document.head.appendChild(P),
						(s.value = g),
						l[g ? "add" : "remove"]("dark"),
						window.getComputedStyle(P).opacity,
						document.head.removeChild(P);
				}
				return h;
			}
			return (
				et(s, r => {
					n.value = r;
				}),
				(r, l) => (
					d(),
					W(
						pf,
						{
							class: "VPSwitchAppearance",
							"aria-label": "toggle dark mode",
							"aria-checked": s.value,
							onClick: _(o),
						},
						{
							default: A(() => [T(wf, { class: "sun" }), T(Sf, { class: "moon" })]),
							_: 1,
						},
						8,
						["aria-checked", "onClick"],
					)
				)
			);
		},
	});
const ao = N(Vf, [["__scopeId", "data-v-bdf24275"]]),
	Tf = { key: 0, class: "VPNavBarAppearance" },
	Ef = H({
		__name: "VPNavBarAppearance",
		setup(e) {
			const { site: t } = le();
			return (n, s) => (_(t).appearance ? (d(), m("div", Tf, [T(ao)])) : U("", !0));
		},
	});
const Lf = N(Ef, [["__scopeId", "data-v-2a0b2176"]]),
	Mf = {
		discord:
			'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
		facebook:
			'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
		github: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
		instagram:
			'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
		linkedin:
			'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
		mastodon:
			'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Mastodon</title><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg>',
		slack: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
		twitter:
			'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
		youtube:
			'<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
	},
	Af = ["href", "innerHTML"],
	If = H({
		__name: "VPSocialLink",
		props: { icon: null, link: null },
		setup(e) {
			const t = e,
				n = ne(() => (typeof t.icon == "object" ? t.icon.svg : Mf[t.icon]));
			return (s, o) => (
				d(),
				m(
					"a",
					{
						class: "VPSocialLink",
						href: e.link,
						target: "_blank",
						rel: "noopener",
						innerHTML: _(n),
					},
					null,
					8,
					Af,
				)
			);
		},
	});
const Nf = N(If, [["__scopeId", "data-v-cb32d883"]]),
	Bf = { class: "VPSocialLinks" },
	Of = H({
		__name: "VPSocialLinks",
		props: { links: null },
		setup(e) {
			return (t, n) => (
				d(),
				m("div", Bf, [
					(d(!0),
					m(
						Y,
						null,
						Se(
							e.links,
							({ link: s, icon: o }) => (
								d(), W(Nf, { key: s, icon: o, link: s }, null, 8, ["icon", "link"])
							),
						),
						128,
					)),
				])
			);
		},
	});
const uo = N(Of, [["__scopeId", "data-v-9287af2d"]]),
	Ff = H({
		__name: "VPNavBarSocialLinks",
		setup(e) {
			const { theme: t } = le();
			return (n, s) =>
				_(t).socialLinks
					? (d(),
					  W(
							uo,
							{ key: 0, class: "VPNavBarSocialLinks", links: _(t).socialLinks },
							null,
							8,
							["links"],
					  ))
					: U("", !0);
		},
	});
const Hf = N(Ff, [["__scopeId", "data-v-b4e75887"]]),
	Rf = e => (We("data-v-e98948db"), (e = e()), Ge(), e),
	Df = { key: 0, class: "group" },
	zf = { class: "trans-title" },
	Uf = { key: 1, class: "group" },
	jf = { class: "item appearance" },
	Kf = Rf(() => b("p", { class: "label" }, "Appearance", -1)),
	qf = { class: "appearance-action" },
	Wf = { key: 2, class: "group" },
	Gf = { class: "item social-links" },
	Yf = H({
		__name: "VPNavBarExtra",
		setup(e) {
			const { site: t, theme: n } = le(),
				s = ne(() => n.value.localeLinks || t.value.appearance || n.value.socialLinks);
			return (o, i) =>
				_(s)
					? (d(),
					  W(
							co,
							{ key: 0, class: "VPNavBarExtra", label: "extra navigation" },
							{
								default: A(() => [
									_(n).localeLinks
										? (d(),
										  m("div", Df, [
												b("p", zf, ae(_(n).localeLinks.text), 1),
												(d(!0),
												m(
													Y,
													null,
													Se(
														_(n).localeLinks.items,
														r => (
															d(),
															W(
																os,
																{ key: r.link, item: r },
																null,
																8,
																["item"],
															)
														),
													),
													128,
												)),
										  ]))
										: U("", !0),
									_(t).appearance
										? (d(),
										  m("div", Uf, [b("div", jf, [Kf, b("div", qf, [T(ao)])])]))
										: U("", !0),
									_(n).socialLinks
										? (d(),
										  m("div", Wf, [
												b("div", Gf, [
													T(
														uo,
														{
															class: "social-links-list",
															links: _(n).socialLinks,
														},
														null,
														8,
														["links"],
													),
												]),
										  ]))
										: U("", !0),
								]),
								_: 1,
							},
					  ))
					: U("", !0);
		},
	});
const Qf = N(Yf, [["__scopeId", "data-v-e98948db"]]),
	Jf = e => (We("data-v-69091399"), (e = e()), Ge(), e),
	Xf = ["aria-expanded"],
	Zf = Jf(() =>
		b(
			"span",
			{ class: "container" },
			[
				b("span", { class: "top" }),
				b("span", { class: "middle" }),
				b("span", { class: "bottom" }),
			],
			-1,
		),
	),
	ed = [Zf],
	td = H({
		__name: "VPNavBarHamburger",
		props: { active: { type: Boolean } },
		emits: ["click"],
		setup(e) {
			return (t, n) => (
				d(),
				m(
					"button",
					{
						type: "button",
						class: de(["VPNavBarHamburger", { active: e.active }]),
						"aria-label": "mobile navigation",
						"aria-expanded": e.active,
						"aria-controls": "VPNavScreen",
						onClick: n[0] || (n[0] = s => t.$emit("click")),
					},
					ed,
					10,
					Xf,
				)
			);
		},
	});
const nd = N(td, [["__scopeId", "data-v-69091399"]]),
	sd = { class: "container" },
	od = { class: "content" },
	id = H({
		__name: "VPNavBar",
		props: { isScreenOpen: { type: Boolean } },
		emits: ["toggle-screen"],
		setup(e) {
			const { hasSidebar: t } = Ye();
			return (n, s) => (
				d(),
				m(
					"div",
					{ class: de(["VPNavBar", { "has-sidebar": _(t) }]) },
					[
						b("div", sd, [
							T(Za, null, {
								"nav-bar-title-before": A(() => [
									S(n.$slots, "nav-bar-title-before", {}, void 0, !0),
								]),
								"nav-bar-title-after": A(() => [
									S(n.$slots, "nav-bar-title-after", {}, void 0, !0),
								]),
								_: 3,
							}),
							b("div", od, [
								S(n.$slots, "nav-bar-content-before", {}, void 0, !0),
								T(ru, { class: "search" }),
								T(Xu, { class: "menu" }),
								T(af, { class: "translations" }),
								T(Lf, { class: "appearance" }),
								T(Hf, { class: "social-links" }),
								T(Qf, { class: "extra" }),
								S(n.$slots, "nav-bar-content-after", {}, void 0, !0),
								T(
									nd,
									{
										class: "hamburger",
										active: e.isScreenOpen,
										onClick: s[0] || (s[0] = o => n.$emit("toggle-screen")),
									},
									null,
									8,
									["active"],
								),
							]),
						]),
					],
					2,
				)
			);
		},
	});
const rd = N(id, [["__scopeId", "data-v-2e7ba255"]]);
function ld(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	} else return Array.from(e);
}
var fo = !1;
if (typeof window < "u") {
	var ui = {
		get passive() {
			fo = !0;
		},
	};
	window.addEventListener("testPassive", null, ui),
		window.removeEventListener("testPassive", null, ui);
}
var Hn =
		typeof window < "u" &&
		window.navigator &&
		window.navigator.platform &&
		(/iP(ad|hone|od)/.test(window.navigator.platform) ||
			(window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1)),
	zt = [],
	Rn = !1,
	ho = -1,
	rn = void 0,
	Ct = void 0,
	ln = void 0,
	yr = function (t) {
		return zt.some(function (n) {
			return !!(n.options.allowTouchMove && n.options.allowTouchMove(t));
		});
	},
	Dn = function (t) {
		var n = t || window.event;
		return yr(n.target) || n.touches.length > 1
			? !0
			: (n.preventDefault && n.preventDefault(), !1);
	},
	cd = function (t) {
		if (ln === void 0) {
			var n = !!t && t.reserveScrollBarGap === !0,
				s = window.innerWidth - document.documentElement.clientWidth;
			if (n && s > 0) {
				var o = parseInt(
					window.getComputedStyle(document.body).getPropertyValue("padding-right"),
					10,
				);
				(ln = document.body.style.paddingRight),
					(document.body.style.paddingRight = o + s + "px");
			}
		}
		rn === void 0 &&
			((rn = document.body.style.overflow), (document.body.style.overflow = "hidden"));
	},
	ad = function () {
		ln !== void 0 && ((document.body.style.paddingRight = ln), (ln = void 0)),
			rn !== void 0 && ((document.body.style.overflow = rn), (rn = void 0));
	},
	ud = function () {
		return window.requestAnimationFrame(function () {
			if (Ct === void 0) {
				Ct = {
					position: document.body.style.position,
					top: document.body.style.top,
					left: document.body.style.left,
				};
				var t = window,
					n = t.scrollY,
					s = t.scrollX,
					o = t.innerHeight;
				(document.body.style.position = "fixed"),
					(document.body.style.top = -n),
					(document.body.style.left = -s),
					setTimeout(function () {
						return window.requestAnimationFrame(function () {
							var i = o - window.innerHeight;
							i && n >= o && (document.body.style.top = -(n + i));
						});
					}, 300);
			}
		});
	},
	fd = function () {
		if (Ct !== void 0) {
			var t = -parseInt(document.body.style.top, 10),
				n = -parseInt(document.body.style.left, 10);
			(document.body.style.position = Ct.position),
				(document.body.style.top = Ct.top),
				(document.body.style.left = Ct.left),
				window.scrollTo(n, t),
				(Ct = void 0);
		}
	},
	dd = function (t) {
		return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1;
	},
	hd = function (t, n) {
		var s = t.targetTouches[0].clientY - ho;
		return yr(t.target)
			? !1
			: (n && n.scrollTop === 0 && s > 0) || (dd(n) && s < 0)
			? Dn(t)
			: (t.stopPropagation(), !0);
	},
	wr = function (t, n) {
		if (!t) {
			console.error(
				"disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.",
			);
			return;
		}
		if (
			!zt.some(function (o) {
				return o.targetElement === t;
			})
		) {
			var s = { targetElement: t, options: n || {} };
			(zt = [].concat(ld(zt), [s])),
				Hn ? ud() : cd(n),
				Hn &&
					((t.ontouchstart = function (o) {
						o.targetTouches.length === 1 && (ho = o.targetTouches[0].clientY);
					}),
					(t.ontouchmove = function (o) {
						o.targetTouches.length === 1 && hd(o, t);
					}),
					Rn ||
						(document.addEventListener("touchmove", Dn, fo ? { passive: !1 } : void 0),
						(Rn = !0)));
		}
	},
	xr = function () {
		Hn &&
			(zt.forEach(function (t) {
				(t.targetElement.ontouchstart = null), (t.targetElement.ontouchmove = null);
			}),
			Rn &&
				(document.removeEventListener("touchmove", Dn, fo ? { passive: !1 } : void 0),
				(Rn = !1)),
			(ho = -1)),
			Hn ? fd() : ad(),
			(zt = []);
	};
const _d = H({
	__name: "VPNavScreenMenuLink",
	props: { text: null, link: null },
	setup(e) {
		const t = Ne("close-screen");
		return (n, s) => (
			d(),
			W(
				Lt,
				{ class: "VPNavScreenMenuLink", href: e.link, onClick: _(t) },
				{ default: A(() => [Ee(ae(e.text), 1)]), _: 1 },
				8,
				["href", "onClick"],
			)
		);
	},
});
const pd = N(_d, [["__scopeId", "data-v-a3797f97"]]),
	vd = {},
	md = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		viewBox: "0 0 24 24",
	},
	gd = b(
		"path",
		{
			d: "M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z",
		},
		null,
		-1,
	),
	bd = [gd];
function yd(e, t) {
	return d(), m("svg", md, bd);
}
const wd = N(vd, [["render", yd]]),
	xd = H({
		__name: "VPNavScreenMenuGroupLink",
		props: { text: null, link: null },
		setup(e) {
			const t = Ne("close-screen");
			return (n, s) => (
				d(),
				W(
					Lt,
					{ class: "VPNavScreenMenuGroupLink", href: e.link, onClick: _(t) },
					{ default: A(() => [Ee(ae(e.text), 1)]), _: 1 },
					8,
					["href", "onClick"],
				)
			);
		},
	});
const $r = N(xd, [["__scopeId", "data-v-d8ff7ec0"]]),
	$d = { class: "VPNavScreenMenuGroupSection" },
	Pd = { key: 0, class: "title" },
	kd = H({
		__name: "VPNavScreenMenuGroupSection",
		props: { text: null, items: null },
		setup(e) {
			return (t, n) => (
				d(),
				m("div", $d, [
					e.text ? (d(), m("p", Pd, ae(e.text), 1)) : U("", !0),
					(d(!0),
					m(
						Y,
						null,
						Se(
							e.items,
							s => (
								d(),
								W($r, { key: s.text, text: s.text, link: s.link }, null, 8, [
									"text",
									"link",
								])
							),
						),
						128,
					)),
				])
			);
		},
	});
const Cd = N(kd, [["__scopeId", "data-v-82df8a9a"]]),
	Sd = ["aria-controls", "aria-expanded"],
	Vd = { class: "button-text" },
	Td = ["id"],
	Ed = { key: 1, class: "group" },
	Ld = H({
		__name: "VPNavScreenMenuGroup",
		props: { text: null, items: null },
		setup(e) {
			const t = e,
				n = _e(!1),
				s = ne(() => `NavScreenGroup-${t.text.replace(" ", "-").toLowerCase()}`);
			function o() {
				n.value = !n.value;
			}
			return (i, r) => (
				d(),
				m(
					"div",
					{ class: de(["VPNavScreenMenuGroup", { open: n.value }]) },
					[
						b(
							"button",
							{
								class: "button",
								"aria-controls": _(s),
								"aria-expanded": n.value,
								onClick: o,
							},
							[b("span", Vd, ae(e.text), 1), T(wd, { class: "button-icon" })],
							8,
							Sd,
						),
						b(
							"div",
							{ id: _(s), class: "items" },
							[
								(d(!0),
								m(
									Y,
									null,
									Se(
										e.items,
										l => (
											d(),
											m(
												Y,
												{ key: l.text },
												[
													"link" in l
														? (d(),
														  m("div", { key: l.text, class: "item" }, [
																T(
																	$r,
																	{ text: l.text, link: l.link },
																	null,
																	8,
																	["text", "link"],
																),
														  ]))
														: (d(),
														  m("div", Ed, [
																T(
																	Cd,
																	{
																		text: l.text,
																		items: l.items,
																	},
																	null,
																	8,
																	["text", "items"],
																),
														  ])),
												],
												64,
											)
										),
									),
									128,
								)),
							],
							8,
							Td,
						),
					],
					2,
				)
			);
		},
	});
const Md = N(Ld, [["__scopeId", "data-v-90e12a27"]]),
	Ad = { key: 0, class: "VPNavScreenMenu" },
	Id = H({
		__name: "VPNavScreenMenu",
		setup(e) {
			const { theme: t } = le();
			return (n, s) =>
				_(t).nav
					? (d(),
					  m("nav", Ad, [
							(d(!0),
							m(
								Y,
								null,
								Se(
									_(t).nav,
									o => (
										d(),
										m(
											Y,
											{ key: o.text },
											[
												"link" in o
													? (d(),
													  W(
															pd,
															{ key: 0, text: o.text, link: o.link },
															null,
															8,
															["text", "link"],
													  ))
													: (d(),
													  W(
															Md,
															{
																key: 1,
																text: o.text || "",
																items: o.items,
															},
															null,
															8,
															["text", "items"],
													  )),
											],
											64,
										)
									),
								),
								128,
							)),
					  ]))
					: U("", !0);
		},
	}),
	Nd = e => (We("data-v-ef1c5141"), (e = e()), Ge(), e),
	Bd = { key: 0, class: "VPNavScreenAppearance" },
	Od = Nd(() => b("p", { class: "text" }, "Appearance", -1)),
	Fd = H({
		__name: "VPNavScreenAppearance",
		setup(e) {
			const { site: t } = le();
			return (n, s) => (_(t).appearance ? (d(), m("div", Bd, [Od, T(ao)])) : U("", !0));
		},
	});
const Hd = N(Fd, [["__scopeId", "data-v-ef1c5141"]]),
	Rd = { class: "list" },
	Dd = ["href"],
	zd = H({
		__name: "VPNavScreenTranslations",
		setup(e) {
			const { theme: t } = le(),
				n = _e(!1);
			function s() {
				n.value = !n.value;
			}
			return (o, i) =>
				_(t).localeLinks
					? (d(),
					  m(
							"div",
							{ key: 0, class: de(["VPNavScreenTranslations", { open: n.value }]) },
							[
								b("button", { class: "title", onClick: s }, [
									T(br, { class: "icon lang" }),
									Ee(" " + ae(_(t).localeLinks.text) + " ", 1),
									T(gr, { class: "icon chevron" }),
								]),
								b("ul", Rd, [
									(d(!0),
									m(
										Y,
										null,
										Se(
											_(t).localeLinks.items,
											r => (
												d(),
												m("li", { key: r.link, class: "item" }, [
													b(
														"a",
														{ class: "link", href: r.link },
														ae(r.text),
														9,
														Dd,
													),
												])
											),
										),
										128,
									)),
								]),
							],
							2,
					  ))
					: U("", !0);
		},
	});
const Ud = N(zd, [["__scopeId", "data-v-6922e19f"]]),
	jd = H({
		__name: "VPNavScreenSocialLinks",
		setup(e) {
			const { theme: t } = le();
			return (n, s) =>
				_(t).socialLinks
					? (d(),
					  W(
							uo,
							{ key: 0, class: "VPNavScreenSocialLinks", links: _(t).socialLinks },
							null,
							8,
							["links"],
					  ))
					: U("", !0);
		},
	}),
	Kd = { class: "container" },
	qd = H({
		__name: "VPNavScreen",
		props: { open: { type: Boolean } },
		setup(e) {
			const t = _e(null);
			function n() {
				wr(t.value, { reserveScrollBarGap: !0 });
			}
			function s() {
				xr();
			}
			return (o, i) => (
				d(),
				W(
					ns,
					{ name: "fade", onEnter: n, onAfterLeave: s },
					{
						default: A(() => [
							e.open
								? (d(),
								  m(
										"div",
										{ key: 0, class: "VPNavScreen", ref_key: "screen", ref: t },
										[
											b("div", Kd, [
												S(
													o.$slots,
													"nav-screen-content-before",
													{},
													void 0,
													!0,
												),
												T(Id, { class: "menu" }),
												T(Ud, { class: "translations" }),
												T(Hd, { class: "appearance" }),
												T(jd, { class: "social-links" }),
												S(
													o.$slots,
													"nav-screen-content-after",
													{},
													void 0,
													!0,
												),
											]),
										],
										512,
								  ))
								: U("", !0),
						]),
						_: 3,
					},
				)
			);
		},
	});
const Wd = N(qd, [["__scopeId", "data-v-5b830efc"]]),
	Gd = H({
		__name: "VPNav",
		setup(e) {
			const { isScreenOpen: t, closeScreen: n, toggleScreen: s } = Wa(),
				{ hasSidebar: o } = Ye();
			return (
				Ht("close-screen", n),
				(i, r) => (
					d(),
					m(
						"header",
						{ class: de(["VPNav", { "no-sidebar": !_(o) }]) },
						[
							T(
								rd,
								{ "is-screen-open": _(t), onToggleScreen: _(s) },
								{
									"nav-bar-title-before": A(() => [
										S(i.$slots, "nav-bar-title-before", {}, void 0, !0),
									]),
									"nav-bar-title-after": A(() => [
										S(i.$slots, "nav-bar-title-after", {}, void 0, !0),
									]),
									"nav-bar-content-before": A(() => [
										S(i.$slots, "nav-bar-content-before", {}, void 0, !0),
									]),
									"nav-bar-content-after": A(() => [
										S(i.$slots, "nav-bar-content-after", {}, void 0, !0),
									]),
									_: 3,
								},
								8,
								["is-screen-open", "onToggleScreen"],
							),
							T(
								Wd,
								{ open: _(t) },
								{
									"nav-screen-content-before": A(() => [
										S(i.$slots, "nav-screen-content-before", {}, void 0, !0),
									]),
									"nav-screen-content-after": A(() => [
										S(i.$slots, "nav-screen-content-after", {}, void 0, !0),
									]),
									_: 3,
								},
								8,
								["open"],
							),
						],
						2,
					)
				)
			);
		},
	});
const Yd = N(Gd, [["__scopeId", "data-v-719ca951"]]),
	Qd = {},
	Jd = {
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		viewBox: "0 0 24 24",
	},
	Xd = b(
		"path",
		{ d: "M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z" },
		null,
		-1,
	),
	Zd = b(
		"path",
		{ d: "M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z" },
		null,
		-1,
	),
	e0 = b(
		"path",
		{ d: "M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z" },
		null,
		-1,
	),
	t0 = b(
		"path",
		{ d: "M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z" },
		null,
		-1,
	),
	n0 = [Xd, Zd, e0, t0];
function s0(e, t) {
	return d(), m("svg", Jd, n0);
}
const o0 = N(Qd, [["render", s0]]),
	i0 = e => (We("data-v-d4ef4c0a"), (e = e()), Ge(), e),
	r0 = { key: 0, class: "VPLocalNav" },
	l0 = ["aria-expanded"],
	c0 = i0(() => b("span", { class: "menu-text" }, "Menu", -1)),
	a0 = H({
		__name: "VPLocalNav",
		props: { open: { type: Boolean } },
		emits: ["open-menu"],
		setup(e) {
			const { hasSidebar: t } = Ye();
			function n() {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
			return (s, o) =>
				_(t)
					? (d(),
					  m("div", r0, [
							b(
								"button",
								{
									class: "menu",
									"aria-expanded": e.open,
									"aria-controls": "VPSidebarNav",
									onClick: o[0] || (o[0] = i => s.$emit("open-menu")),
								},
								[T(o0, { class: "menu-icon" }), c0],
								8,
								l0,
							),
							b("a", { class: "top-link", href: "#", onClick: n }, " Return to top "),
					  ]))
					: U("", !0);
		},
	});
const u0 = N(a0, [["__scopeId", "data-v-d4ef4c0a"]]),
	f0 = {},
	d0 = { version: "1.1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
	h0 = b(
		"path",
		{
			d: "M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z",
		},
		null,
		-1,
	),
	_0 = b(
		"path",
		{
			d: "M16,11h-3V8c0-0.6-0.4-1-1-1s-1,0.4-1,1v3H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h3v3c0,0.6,0.4,1,1,1s1-0.4,1-1v-3h3c0.6,0,1-0.4,1-1S16.6,11,16,11z",
		},
		null,
		-1,
	),
	p0 = [h0, _0];
function v0(e, t) {
	return d(), m("svg", d0, p0);
}
const m0 = N(f0, [["render", v0]]),
	g0 = {},
	b0 = {
		xmlns: "http://www.w3.org/2000/svg",
		"xmlns:xlink": "http://www.w3.org/1999/xlink",
		viewBox: "0 0 24 24",
	},
	y0 = b(
		"path",
		{
			d: "M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2zM20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z",
		},
		null,
		-1,
	),
	w0 = b(
		"path",
		{ d: "M16,11H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S16.6,11,16,11z" },
		null,
		-1,
	),
	x0 = [y0, w0];
function $0(e, t) {
	return d(), m("svg", b0, x0);
}
const P0 = N(g0, [["render", $0]]),
	k0 = ["innerHTML"],
	C0 = H({
		__name: "VPSidebarLink",
		props: { item: null, depth: { default: 1 } },
		setup(e) {
			const t = e,
				{ page: n, frontmatter: s } = le(),
				o = ne(() => s.value.sidebarDepth || 1 / 0),
				i = ne(() => Jt(n.value.relativePath, t.item.link)),
				{ isSidebarEnabled: r } = Ye(),
				l = Ne("close-sidebar"),
				c = Ne("is-sidebar-open"),
				f = _e(null);
			return (
				Tt(() => {
					var h, p;
					c.value &&
						i.value &&
						((p = (h = f.value) == null ? void 0 : h.$el) == null || p.focus());
				}),
				(h, p) => {
					const g = Et("VPSidebarLink", !0);
					return (
						d(),
						m(
							Y,
							null,
							[
								T(
									Lt,
									{
										class: de(["link", { active: _(i) }]),
										style: zn({ paddingLeft: 16 * (e.depth - 1) + "px" }),
										href: e.item.link,
										tabindex: _(r) || _(c) ? 0 : -1,
										onClick: _(l),
										ref_key: "link",
										ref: f,
									},
									{
										default: A(() => [
											b(
												"span",
												{
													innerHTML: e.item.text,
													class: de([
														"link-text",
														{ light: e.depth > 1 },
													]),
												},
												null,
												10,
												k0,
											),
										]),
										_: 1,
									},
									8,
									["class", "style", "href", "tabindex", "onClick"],
								),
								"items" in e.item && e.depth < _(o)
									? (d(!0),
									  m(
											Y,
											{ key: 0 },
											Se(
												e.item.items,
												P => (
													d(),
													W(
														g,
														{
															key: P.link,
															item: P,
															depth: e.depth + 1,
														},
														null,
														8,
														["item", "depth"],
													)
												),
											),
											128,
									  ))
									: U("", !0),
							],
							64,
						)
					);
				}
			);
		},
	});
const S0 = N(C0, [["__scopeId", "data-v-77fbd15e"]]),
	V0 = ["role"],
	T0 = ["innerHTML"],
	E0 = { class: "action" },
	L0 = { class: "items" },
	M0 = H({
		__name: "VPSidebarGroup",
		props: {
			text: null,
			items: null,
			collapsible: { type: Boolean },
			collapsed: { type: Boolean },
		},
		setup(e) {
			const t = e,
				n = _e(!1);
			Tt(() => {
				n.value = !!(t.collapsible && t.collapsed);
			});
			const { page: s } = le();
			Tt(() => {
				t.items.some(i => Jt(s.value.relativePath, i.link)) && (n.value = !1);
			});
			function o() {
				t.collapsible && (n.value = !n.value);
			}
			return (i, r) => (
				d(),
				m(
					"section",
					{
						class: de([
							"VPSidebarGroup",
							{ collapsible: e.collapsible, collapsed: n.value },
						]),
					},
					[
						e.text
							? (d(),
							  m(
									"div",
									{
										key: 0,
										class: "title",
										role: e.collapsible ? "button" : void 0,
										onClick: o,
									},
									[
										b(
											"h2",
											{ innerHTML: e.text, class: "title-text" },
											null,
											8,
											T0,
										),
										b("div", E0, [
											T(P0, { class: "icon minus" }),
											T(m0, { class: "icon plus" }),
										]),
									],
									8,
									V0,
							  ))
							: U("", !0),
						b("div", L0, [
							(d(!0),
							m(
								Y,
								null,
								Se(
									e.items,
									l => (d(), W(S0, { key: l.link, item: l }, null, 8, ["item"])),
								),
								128,
							)),
						]),
					],
					2,
				)
			);
		},
	});
const A0 = N(M0, [["__scopeId", "data-v-bcc74eb6"]]),
	I0 = e => (We("data-v-ee59d3a7"), (e = e()), Ge(), e),
	N0 = {
		class: "nav",
		id: "VPSidebarNav",
		"aria-labelledby": "sidebar-aria-label",
		tabindex: "-1",
	},
	B0 = I0(() =>
		b(
			"span",
			{ class: "visually-hidden", id: "sidebar-aria-label" },
			" Sidebar Navigation ",
			-1,
		),
	),
	O0 = H({
		__name: "VPSidebar",
		props: { open: { type: Boolean } },
		setup(e) {
			const t = e,
				{ sidebar: n, hasSidebar: s } = Ye();
			let o = _e(null);
			function i() {
				wr(o.value, { reserveScrollBarGap: !0 });
			}
			function r() {
				xr();
			}
			return (
				Hi(async () => {
					var l;
					t.open ? (i(), (l = o.value) == null || l.focus()) : r();
				}),
				(l, c) =>
					_(s)
						? (d(),
						  m(
								"aside",
								{
									key: 0,
									class: de(["VPSidebar", { open: e.open }]),
									ref_key: "navEl",
									ref: o,
									onClick: c[0] || (c[0] = Jc(() => {}, ["stop"])),
								},
								[
									b("nav", N0, [
										B0,
										S(l.$slots, "sidebar-nav-before", {}, void 0, !0),
										(d(!0),
										m(
											Y,
											null,
											Se(
												_(n),
												f => (
													d(),
													m("div", { key: f.text, class: "group" }, [
														T(
															A0,
															{
																text: f.text,
																items: f.items,
																collapsible: f.collapsible,
																collapsed: f.collapsed,
															},
															null,
															8,
															[
																"text",
																"items",
																"collapsible",
																"collapsed",
															],
														),
													])
												),
											),
											128,
										)),
										S(l.$slots, "sidebar-nav-after", {}, void 0, !0),
									]),
								],
								2,
						  ))
						: U("", !0)
			);
		},
	});
const F0 = N(O0, [["__scopeId", "data-v-ee59d3a7"]]),
	H0 = {},
	R0 = { class: "VPPage" };
function D0(e, t) {
	const n = Et("Content");
	return d(), m("div", R0, [T(n)]);
}
const z0 = N(H0, [["render", D0]]),
	U0 = H({
		__name: "VPButton",
		props: { tag: null, size: null, theme: null, text: null, href: null },
		setup(e) {
			const t = e,
				n = ne(() => [t.size ?? "medium", t.theme ?? "brand"]),
				s = ne(() => t.href && ss.test(t.href)),
				o = ne(() => (t.tag ? t.tag : t.href ? "a" : "button"));
			return (i, r) => (
				d(),
				W(
					to(_(o)),
					{
						class: de(["VPButton", _(n)]),
						href: e.href ? _(Fn)(e.href) : void 0,
						target: _(s) ? "_blank" : void 0,
						rel: _(s) ? "noreferrer" : void 0,
					},
					{ default: A(() => [Ee(ae(e.text), 1)]), _: 1 },
					8,
					["class", "href", "target", "rel"],
				)
			);
		},
	});
const j0 = N(U0, [["__scopeId", "data-v-dbec6081"]]),
	K0 = e => (We("data-v-f4d8d212"), (e = e()), Ge(), e),
	q0 = { class: "container" },
	W0 = { class: "main" },
	G0 = { key: 0, class: "name" },
	Y0 = { class: "clip" },
	Q0 = { key: 1, class: "text" },
	J0 = { key: 2, class: "tagline" },
	X0 = { key: 3, class: "actions" },
	Z0 = { key: 0, class: "image" },
	e1 = { class: "image-container" },
	t1 = K0(() => b("div", { class: "image-bg" }, null, -1)),
	n1 = H({
		__name: "VPHero",
		props: { name: null, text: null, tagline: null, image: null, actions: null },
		setup(e) {
			const t = Ne("hero-image-slot-exists");
			return (n, s) => (
				d(),
				m(
					"div",
					{ class: de(["VPHero", { "has-image": e.image || _(t) }]) },
					[
						b("div", q0, [
							b("div", W0, [
								e.name
									? (d(), m("h1", G0, [b("span", Y0, ae(e.name), 1)]))
									: U("", !0),
								e.text ? (d(), m("p", Q0, ae(e.text), 1)) : U("", !0),
								e.tagline ? (d(), m("p", J0, ae(e.tagline), 1)) : U("", !0),
								e.actions
									? (d(),
									  m("div", X0, [
											(d(!0),
											m(
												Y,
												null,
												Se(
													e.actions,
													o => (
														d(),
														m("div", { key: o.link, class: "action" }, [
															T(
																j0,
																{
																	tag: "a",
																	size: "medium",
																	theme: o.theme,
																	text: o.text,
																	href: o.link,
																},
																null,
																8,
																["theme", "text", "href"],
															),
														])
													),
												),
												128,
											)),
									  ]))
									: U("", !0),
							]),
							e.image || _(t)
								? (d(),
								  m("div", Z0, [
										b("div", e1, [
											t1,
											S(
												n.$slots,
												"home-hero-image",
												{},
												() => [
													e.image
														? (d(),
														  W(
																ro,
																{
																	key: 0,
																	class: "image-src",
																	image: e.image,
																},
																null,
																8,
																["image"],
														  ))
														: U("", !0),
												],
												!0,
											),
										]),
								  ]))
								: U("", !0),
						]),
					],
					2,
				)
			);
		},
	});
const s1 = N(n1, [["__scopeId", "data-v-f4d8d212"]]),
	o1 = H({
		__name: "VPHomeHero",
		setup(e) {
			const { frontmatter: t } = le();
			return (n, s) =>
				_(t).hero
					? (d(),
					  W(
							s1,
							{
								key: 0,
								class: "VPHomeHero",
								name: _(t).hero.name,
								text: _(t).hero.text,
								tagline: _(t).hero.tagline,
								image: _(t).hero.image,
								actions: _(t).hero.actions,
							},
							{ "home-hero-image": A(() => [S(n.$slots, "home-hero-image")]), _: 3 },
							8,
							["name", "text", "tagline", "image", "actions"],
					  ))
					: U("", !0);
		},
	}),
	i1 = {},
	r1 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
	l1 = b(
		"path",
		{
			d: "M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z",
		},
		null,
		-1,
	),
	c1 = [l1];
function a1(e, t) {
	return d(), m("svg", r1, c1);
}
const u1 = N(i1, [["render", a1]]),
	f1 = { class: "box" },
	d1 = { key: 1, class: "icon" },
	h1 = { class: "title" },
	_1 = { class: "details" },
	p1 = { key: 2, class: "link-text" },
	v1 = { class: "link-text-value" },
	m1 = H({
		__name: "VPFeature",
		props: { icon: null, title: null, details: null, link: null, linkText: null },
		setup(e) {
			return (t, n) => (
				d(),
				W(
					Lt,
					{ class: "VPFeature", href: e.link, "no-icon": !0 },
					{
						default: A(() => [
							b("article", f1, [
								typeof e.icon == "object"
									? (d(),
									  W(
											ro,
											{
												key: 0,
												image: e.icon,
												alt: e.icon.alt,
												height: e.icon.height,
												width: e.icon.width,
											},
											null,
											8,
											["image", "alt", "height", "width"],
									  ))
									: e.icon
									? (d(), m("div", d1, ae(e.icon), 1))
									: U("", !0),
								b("h2", h1, ae(e.title), 1),
								b("p", _1, ae(e.details), 1),
								e.linkText
									? (d(),
									  m("div", p1, [
											b("p", v1, [
												Ee(ae(e.linkText) + " ", 1),
												T(u1, { class: "link-text-icon" }),
											]),
									  ]))
									: U("", !0),
							]),
						]),
						_: 1,
					},
					8,
					["href"],
				)
			);
		},
	});
const g1 = N(m1, [["__scopeId", "data-v-4204e358"]]),
	b1 = { key: 0, class: "VPFeatures" },
	y1 = { class: "container" },
	w1 = { class: "items" },
	x1 = H({
		__name: "VPFeatures",
		props: { features: null },
		setup(e) {
			const t = e,
				n = ne(() => {
					const s = t.features.length;
					if (s) {
						if (s === 2) return "grid-2";
						if (s === 3) return "grid-3";
						if (s % 3 === 0) return "grid-6";
						if (s % 2 === 0) return "grid-4";
					} else return;
				});
			return (s, o) =>
				e.features
					? (d(),
					  m("div", b1, [
							b("div", y1, [
								b("div", w1, [
									(d(!0),
									m(
										Y,
										null,
										Se(
											e.features,
											i => (
												d(),
												m(
													"div",
													{ key: i.title, class: de(["item", [_(n)]]) },
													[
														T(
															g1,
															{
																icon: i.icon,
																title: i.title,
																details: i.details,
																link: i.link,
																"link-text": i.linkText,
															},
															null,
															8,
															[
																"icon",
																"title",
																"details",
																"link",
																"link-text",
															],
														),
													],
													2,
												)
											),
										),
										128,
									)),
								]),
							]),
					  ]))
					: U("", !0);
		},
	});
const $1 = N(x1, [["__scopeId", "data-v-fc2661e5"]]),
	P1 = H({
		__name: "VPHomeFeatures",
		setup(e) {
			const { frontmatter: t } = le();
			return (n, s) =>
				_(t).features
					? (d(),
					  W($1, { key: 0, class: "VPHomeFeatures", features: _(t).features }, null, 8, [
							"features",
					  ]))
					: U("", !0);
		},
	}),
	k1 = { class: "VPHome" },
	C1 = H({
		__name: "VPHome",
		setup(e) {
			return (t, n) => {
				const s = Et("Content");
				return (
					d(),
					m("div", k1, [
						S(t.$slots, "home-hero-before", {}, void 0, !0),
						T(o1, null, {
							"home-hero-image": A(() => [
								S(t.$slots, "home-hero-image", {}, void 0, !0),
							]),
							_: 3,
						}),
						S(t.$slots, "home-hero-after", {}, void 0, !0),
						S(t.$slots, "home-features-before", {}, void 0, !0),
						T(P1),
						S(t.$slots, "home-features-after", {}, void 0, !0),
						T(s),
					])
				);
			};
		},
	});
const S1 = N(C1, [["__scopeId", "data-v-288e01ed"]]);
function V1() {
	const { hasSidebar: e } = Ye(),
		t = As("(min-width: 960px)"),
		n = As("(min-width: 1280px)");
	return { isAsideEnabled: ne(() => (!n.value && !t.value ? !1 : e.value ? n.value : t.value)) };
}
const T1 = 71;
function E1(e) {
	if (e === !1) return [];
	let t = [];
	return (
		document.querySelectorAll("h2, h3, h4, h5, h6").forEach(n => {
			n.textContent &&
				n.id &&
				t.push({
					level: Number(n.tagName[1]),
					title: n.innerText.replace(/\s+#\s*$/, ""),
					link: `#${n.id}`,
				});
		}),
		L1(t, e)
	);
}
function L1(e, t = 2) {
	return M1(e, typeof t == "number" ? [t, t] : t === "deep" ? [2, 6] : t);
}
function M1(e, t) {
	const n = [];
	return (
		(e = e.map(s => ({ ...s }))),
		e.forEach((s, o) => {
			s.level >= t[0] && s.level <= t[1] && A1(o, e, t) && n.push(s);
		}),
		n
	);
}
function A1(e, t, n) {
	if (e === 0) return !0;
	const s = t[e];
	for (let o = e - 1; o >= 0; o--) {
		const i = t[o];
		if (i.level < s.level && i.level >= n[0] && i.level <= n[1])
			return i.children == null && (i.children = []), i.children.push(s), !1;
	}
	return !0;
}
function I1(e, t) {
	const { isAsideEnabled: n } = V1(),
		s = Ha(i, 100);
	let o = null;
	De(() => {
		requestAnimationFrame(i), window.addEventListener("scroll", s);
	}),
		Zs(() => {
			r(location.hash);
		}),
		pt(() => {
			window.removeEventListener("scroll", s);
		});
	function i() {
		if (!n.value) return;
		const l = [].slice.call(e.value.querySelectorAll(".outline-link")),
			c = [].slice
				.call(document.querySelectorAll(".content .header-anchor"))
				.filter(P => l.some(j => j.hash === P.hash && P.offsetParent !== null)),
			f = window.scrollY,
			h = window.innerHeight,
			p = document.body.offsetHeight,
			g = Math.abs(f + h - p) < 1;
		if (c.length && g) {
			r(c[c.length - 1].hash);
			return;
		}
		for (let P = 0; P < c.length; P++) {
			const j = c[P],
				F = c[P + 1],
				[se, x] = N1(P, j, F);
			if (se) {
				r(x);
				return;
			}
		}
	}
	function r(l) {
		o && o.classList.remove("active"),
			l !== null && (o = e.value.querySelector(`a[href="${decodeURIComponent(l)}"]`));
		const c = o;
		c
			? (c.classList.add("active"),
			  (t.value.style.top = c.offsetTop + 33 + "px"),
			  (t.value.style.opacity = "1"))
			: ((t.value.style.top = "33px"), (t.value.style.opacity = "0"));
	}
}
function fi(e) {
	return e.parentElement.offsetTop - T1;
}
function N1(e, t, n) {
	const s = window.scrollY;
	return e === 0 && s === 0
		? [!0, null]
		: s < fi(t)
		? [!1, null]
		: !n || s < fi(n)
		? [!0, t.hash]
		: [!1, null];
}
const B1 = ["href"],
	O1 = H({
		__name: "VPDocAsideOutlineItem",
		props: { headers: null, onClick: null, root: { type: Boolean } },
		setup(e) {
			return (t, n) => {
				const s = Et("VPDocAsideOutlineItem", !0);
				return (
					d(),
					m(
						"ul",
						{ class: de(e.root ? "root" : "nested") },
						[
							(d(!0),
							m(
								Y,
								null,
								Se(
									e.headers,
									({ children: o, link: i, title: r }) => (
										d(),
										m("li", null, [
											b(
												"a",
												{
													class: "outline-link",
													href: i,
													onClick:
														n[0] ||
														(n[0] = (...l) =>
															e.onClick && e.onClick(...l)),
												},
												ae(r),
												9,
												B1,
											),
											o != null && o.length
												? (d(),
												  W(
														s,
														{ key: 0, headers: o, onClick: e.onClick },
														null,
														8,
														["headers", "onClick"],
												  ))
												: U("", !0),
										])
									),
								),
								256,
							)),
						],
						2,
					)
				);
			};
		},
	});
const F1 = N(O1, [["__scopeId", "data-v-09dbc40e"]]),
	H1 = e => (We("data-v-a8d80780"), (e = e()), Ge(), e),
	R1 = { class: "content" },
	D1 = { class: "outline-title" },
	z1 = { "aria-labelledby": "doc-outline-aria-label" },
	U1 = H1(() =>
		b(
			"span",
			{ class: "visually-hidden", id: "doc-outline-aria-label" },
			" Table of Contents for current page ",
			-1,
		),
	),
	j1 = H({
		__name: "VPDocAsideOutline",
		setup(e) {
			const { frontmatter: t, theme: n } = le(),
				s = ne(() => t.value.outline ?? n.value.outline),
				o = Ne("onContentUpdated");
			o.value = () => {
				i.value = E1(s.value);
			};
			const i = _e([]),
				r = ne(() => i.value.length > 0),
				l = _e(),
				c = _e();
			I1(l, c);
			function f({ target: h }) {
				const p = "#" + h.href.split("#")[1],
					g = document.querySelector(decodeURIComponent(p));
				g == null || g.focus();
			}
			return (h, p) => (
				d(),
				m(
					"div",
					{
						class: de(["VPDocAsideOutline", { "has-outline": _(r) }]),
						ref_key: "container",
						ref: l,
					},
					[
						b("div", R1, [
							b(
								"div",
								{ class: "outline-marker", ref_key: "marker", ref: c },
								null,
								512,
							),
							b("div", D1, ae(_(n).outlineTitle || "On this page"), 1),
							b("nav", z1, [
								U1,
								T(F1, { headers: i.value, root: !0, onClick: f }, null, 8, [
									"headers",
								]),
							]),
						]),
					],
					2,
				)
			);
		},
	});
const K1 = N(j1, [["__scopeId", "data-v-a8d80780"]]),
	q1 = { class: "VPDocAsideCarbonAds" },
	W1 = H({
		__name: "VPDocAsideCarbonAds",
		setup(e) {
			const t = () => null;
			return (n, s) => (d(), m("div", q1, [T(_(t))]));
		},
	}),
	G1 = e => (We("data-v-41ede2d8"), (e = e()), Ge(), e),
	Y1 = { class: "VPDocAside" },
	Q1 = G1(() => b("div", { class: "spacer" }, null, -1)),
	J1 = H({
		__name: "VPDocAside",
		setup(e) {
			const { theme: t } = le();
			return (n, s) => (
				d(),
				m("div", Y1, [
					S(n.$slots, "aside-top", {}, void 0, !0),
					S(n.$slots, "aside-outline-before", {}, void 0, !0),
					T(K1),
					S(n.$slots, "aside-outline-after", {}, void 0, !0),
					Q1,
					S(n.$slots, "aside-ads-before", {}, void 0, !0),
					_(t).carbonAds ? (d(), W(W1, { key: 0 })) : U("", !0),
					S(n.$slots, "aside-ads-after", {}, void 0, !0),
					S(n.$slots, "aside-bottom", {}, void 0, !0),
				])
			);
		},
	});
const X1 = N(J1, [["__scopeId", "data-v-41ede2d8"]]);
function Z1() {
	const { theme: e, page: t } = le();
	return ne(() => {
		const { text: n = "Edit this page", pattern: s } = e.value.editLink || {},
			{ relativePath: o } = t.value;
		return { url: s.replace(/:path/g, o), text: n };
	});
}
function eh() {
	const { page: e, theme: t, frontmatter: n } = le();
	return ne(() => {
		const s = pr(t.value.sidebar, e.value.relativePath),
			o = Ra(s),
			i = o.findIndex(r => Jt(e.value.relativePath, r.link));
		return {
			prev: n.value.prev ? { ...o[i - 1], text: n.value.prev } : o[i - 1],
			next: n.value.next ? { ...o[i + 1], text: n.value.next } : o[i + 1],
		};
	});
}
const th = {},
	nh = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
	sh = b(
		"path",
		{
			d: "M18,23H4c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c0.6,0,1,0.4,1,1s-0.4,1-1,1H4C3.4,5,3,5.4,3,6v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-7c0-0.6,0.4-1,1-1s1,0.4,1,1v7C21,21.7,19.7,23,18,23z",
		},
		null,
		-1,
	),
	oh = b(
		"path",
		{
			d: "M8,17c-0.3,0-0.5-0.1-0.7-0.3C7,16.5,6.9,16.1,7,15.8l1-4c0-0.2,0.1-0.3,0.3-0.5l9.5-9.5c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4l-9.5,9.5c-0.1,0.1-0.3,0.2-0.5,0.3l-4,1C8.2,17,8.1,17,8,17zM9.9,12.5l-0.5,2.1l2.1-0.5l9.3-9.3c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l0,0L9.9,12.5z M18.5,2.5L18.5,2.5L18.5,2.5z",
		},
		null,
		-1,
	),
	ih = [sh, oh];
function rh(e, t) {
	return d(), m("svg", nh, ih);
}
const lh = N(th, [["render", rh]]),
	ch = { class: "VPLastUpdated" },
	ah = ["datetime"],
	uh = H({
		__name: "VPDocFooterLastUpdated",
		setup(e) {
			const { theme: t, page: n } = le(),
				s = ne(() => new Date(n.value.lastUpdated)),
				o = ne(() => s.value.toISOString()),
				i = _e("");
			return (
				De(() => {
					Tt(() => {
						i.value = s.value.toLocaleString(window.navigator.language);
					});
				}),
				(r, l) => (
					d(),
					m("p", ch, [
						Ee(ae(_(t).lastUpdatedText ?? "Last updated") + ": ", 1),
						b("time", { datetime: _(o) }, ae(i.value), 9, ah),
					])
				)
			);
		},
	});
const fh = N(uh, [["__scopeId", "data-v-1dd28732"]]),
	dh = { key: 0, class: "VPDocFooter" },
	hh = { key: 0, class: "edit-info" },
	_h = { key: 0, class: "edit-link" },
	ph = { key: 1, class: "last-updated" },
	vh = { key: 1, class: "prev-next" },
	mh = { class: "pager" },
	gh = ["href"],
	bh = ["innerHTML"],
	yh = ["innerHTML"],
	wh = ["href"],
	xh = ["innerHTML"],
	$h = ["innerHTML"],
	Ph = H({
		__name: "VPDocFooter",
		setup(e) {
			const { theme: t, page: n, frontmatter: s } = le(),
				o = Z1(),
				i = eh(),
				r = ne(() => t.value.editLink && s.value.editLink !== !1),
				l = ne(() => n.value.lastUpdated && s.value.lastUpdated !== !1),
				c = ne(() => r.value || l.value || i.value.prev || i.value.next);
			return (f, h) => {
				var p, g;
				return _(c)
					? (d(),
					  m("footer", dh, [
							_(r) || _(l)
								? (d(),
								  m("div", hh, [
										_(r)
											? (d(),
											  m("div", _h, [
													T(
														Lt,
														{
															class: "edit-link-button",
															href: _(o).url,
															"no-icon": !0,
														},
														{
															default: A(() => [
																T(lh, { class: "edit-link-icon" }),
																Ee(" " + ae(_(o).text), 1),
															]),
															_: 1,
														},
														8,
														["href"],
													),
											  ]))
											: U("", !0),
										_(l) ? (d(), m("div", ph, [T(fh)])) : U("", !0),
								  ]))
								: U("", !0),
							_(i).prev || _(i).next
								? (d(),
								  m("div", vh, [
										b("div", mh, [
											_(i).prev
												? (d(),
												  m(
														"a",
														{
															key: 0,
															class: "pager-link prev",
															href: _(Fn)(_(i).prev.link),
														},
														[
															b(
																"span",
																{
																	class: "desc",
																	innerHTML:
																		((p = _(t).docFooter) ==
																		null
																			? void 0
																			: p.prev) ??
																		"Previous page",
																},
																null,
																8,
																bh,
															),
															b(
																"span",
																{
																	class: "title",
																	innerHTML: _(i).prev.text,
																},
																null,
																8,
																yh,
															),
														],
														8,
														gh,
												  ))
												: U("", !0),
										]),
										b(
											"div",
											{ class: de(["pager", { "has-prev": _(i).prev }]) },
											[
												_(i).next
													? (d(),
													  m(
															"a",
															{
																key: 0,
																class: "pager-link next",
																href: _(Fn)(_(i).next.link),
															},
															[
																b(
																	"span",
																	{
																		class: "desc",
																		innerHTML:
																			((g = _(t).docFooter) ==
																			null
																				? void 0
																				: g.next) ??
																			"Next page",
																	},
																	null,
																	8,
																	xh,
																),
																b(
																	"span",
																	{
																		class: "title",
																		innerHTML: _(i).next.text,
																	},
																	null,
																	8,
																	$h,
																),
															],
															8,
															wh,
													  ))
													: U("", !0),
											],
											2,
										),
								  ]))
								: U("", !0),
					  ]))
					: U("", !0);
			};
		},
	});
const kh = N(Ph, [["__scopeId", "data-v-469957c9"]]),
	Ch = e => (We("data-v-655a8b2e"), (e = e()), Ge(), e),
	Sh = { class: "container" },
	Vh = { key: 0, class: "aside" },
	Th = Ch(() => b("div", { class: "aside-curtain" }, null, -1)),
	Eh = { class: "aside-container" },
	Lh = { class: "aside-content" },
	Mh = { class: "content" },
	Ah = { class: "content-container" },
	Ih = { class: "main" },
	Nh = H({
		__name: "VPDoc",
		setup(e) {
			const t = vt(),
				{ hasSidebar: n, hasAside: s } = Ye(),
				o = ne(() => t.path.replace(/[./]+/g, "_").replace(/_html$/, "")),
				i = _e();
			return (
				Ht("onContentUpdated", i),
				(r, l) => {
					const c = Et("Content");
					return (
						d(),
						m(
							"div",
							{ class: de(["VPDoc", { "has-sidebar": _(n), "has-aside": _(s) }]) },
							[
								b("div", Sh, [
									_(s)
										? (d(),
										  m("div", Vh, [
												Th,
												b("div", Eh, [
													b("div", Lh, [
														T(X1, null, {
															"aside-top": A(() => [
																S(
																	r.$slots,
																	"aside-top",
																	{},
																	void 0,
																	!0,
																),
															]),
															"aside-bottom": A(() => [
																S(
																	r.$slots,
																	"aside-bottom",
																	{},
																	void 0,
																	!0,
																),
															]),
															"aside-outline-before": A(() => [
																S(
																	r.$slots,
																	"aside-outline-before",
																	{},
																	void 0,
																	!0,
																),
															]),
															"aside-outline-after": A(() => [
																S(
																	r.$slots,
																	"aside-outline-after",
																	{},
																	void 0,
																	!0,
																),
															]),
															"aside-ads-before": A(() => [
																S(
																	r.$slots,
																	"aside-ads-before",
																	{},
																	void 0,
																	!0,
																),
															]),
															"aside-ads-after": A(() => [
																S(
																	r.$slots,
																	"aside-ads-after",
																	{},
																	void 0,
																	!0,
																),
															]),
															_: 3,
														}),
													]),
												]),
										  ]))
										: U("", !0),
									b("div", Mh, [
										b("div", Ah, [
											S(r.$slots, "doc-before", {}, void 0, !0),
											b("main", Ih, [
												T(
													c,
													{
														class: de(["vp-doc", _(o)]),
														onContentUpdated: i.value,
													},
													null,
													8,
													["class", "onContentUpdated"],
												),
											]),
											S(r.$slots, "doc-footer-before", {}, void 0, !0),
											T(kh),
											S(r.$slots, "doc-after", {}, void 0, !0),
										]),
									]),
								]),
							],
							2,
						)
					);
				}
			);
		},
	});
const Bh = N(Nh, [["__scopeId", "data-v-655a8b2e"]]),
	Oh = H({
		__name: "VPContent",
		setup(e) {
			const t = vt(),
				{ frontmatter: n } = le(),
				{ hasSidebar: s } = Ye(),
				o = Ne("NotFound");
			return (i, r) => (
				d(),
				m(
					"div",
					{
						class: de([
							"VPContent",
							{ "has-sidebar": _(s), "is-home": _(n).layout === "home" },
						]),
						id: "VPContent",
					},
					[
						_(t).component === _(o)
							? (d(), W(_(o), { key: 0 }))
							: _(n).layout === "page"
							? (d(), W(z0, { key: 1 }))
							: _(n).layout === "home"
							? (d(),
							  W(
									S1,
									{ key: 2 },
									{
										"home-hero-before": A(() => [
											S(i.$slots, "home-hero-before", {}, void 0, !0),
										]),
										"home-hero-image": A(() => [
											S(i.$slots, "home-hero-image", {}, void 0, !0),
										]),
										"home-hero-after": A(() => [
											S(i.$slots, "home-hero-after", {}, void 0, !0),
										]),
										"home-features-before": A(() => [
											S(i.$slots, "home-features-before", {}, void 0, !0),
										]),
										"home-features-after": A(() => [
											S(i.$slots, "home-features-after", {}, void 0, !0),
										]),
										_: 3,
									},
							  ))
							: (d(),
							  W(
									Bh,
									{ key: 3 },
									{
										"doc-footer-before": A(() => [
											S(i.$slots, "doc-footer-before", {}, void 0, !0),
										]),
										"doc-before": A(() => [
											S(i.$slots, "doc-before", {}, void 0, !0),
										]),
										"doc-after": A(() => [
											S(i.$slots, "doc-after", {}, void 0, !0),
										]),
										"aside-top": A(() => [
											S(i.$slots, "aside-top", {}, void 0, !0),
										]),
										"aside-outline-before": A(() => [
											S(i.$slots, "aside-outline-before", {}, void 0, !0),
										]),
										"aside-outline-after": A(() => [
											S(i.$slots, "aside-outline-after", {}, void 0, !0),
										]),
										"aside-ads-before": A(() => [
											S(i.$slots, "aside-ads-before", {}, void 0, !0),
										]),
										"aside-ads-after": A(() => [
											S(i.$slots, "aside-ads-after", {}, void 0, !0),
										]),
										"aside-bottom": A(() => [
											S(i.$slots, "aside-bottom", {}, void 0, !0),
										]),
										_: 3,
									},
							  )),
					],
					2,
				)
			);
		},
	});
const Fh = N(Oh, [["__scopeId", "data-v-9d6f2d23"]]),
	Hh = { class: "container" },
	Rh = ["innerHTML"],
	Dh = ["innerHTML"],
	zh = H({
		__name: "VPFooter",
		setup(e) {
			const { theme: t } = le(),
				{ hasSidebar: n } = Ye();
			return (s, o) =>
				_(t).footer
					? (d(),
					  m(
							"footer",
							{ key: 0, class: de(["VPFooter", { "has-sidebar": _(n) }]) },
							[
								b("div", Hh, [
									_(t).footer.message
										? (d(),
										  m(
												"p",
												{
													key: 0,
													class: "message",
													innerHTML: _(t).footer.message,
												},
												null,
												8,
												Rh,
										  ))
										: U("", !0),
									_(t).footer.copyright
										? (d(),
										  m(
												"p",
												{
													key: 1,
													class: "copyright",
													innerHTML: _(t).footer.copyright,
												},
												null,
												8,
												Dh,
										  ))
										: U("", !0),
								]),
							],
							2,
					  ))
					: U("", !0);
		},
	});
const Uh = N(zh, [["__scopeId", "data-v-abbb3aea"]]),
	jh = { key: 0, class: "Layout" },
	Kh = H({
		__name: "Layout",
		setup(e) {
			const { isOpen: t, open: n, close: s } = Ye(),
				o = vt();
			et(() => o.path, s), Da(t, s), Ht("close-sidebar", s), Ht("is-sidebar-open", t);
			const { frontmatter: i } = le(),
				r = wc(),
				l = ne(() => !!r["home-hero-image"]);
			return (
				Ht("hero-image-slot-exists", l),
				(c, f) => {
					const h = Et("Content");
					return _(i).layout !== !1
						? (d(),
						  m("div", jh, [
								S(c.$slots, "layout-top", {}, void 0, !0),
								T(Ua),
								T(qa, { class: "backdrop", show: _(t), onClick: _(s) }, null, 8, [
									"show",
									"onClick",
								]),
								T(Yd, null, {
									"nav-bar-title-before": A(() => [
										S(c.$slots, "nav-bar-title-before", {}, void 0, !0),
									]),
									"nav-bar-title-after": A(() => [
										S(c.$slots, "nav-bar-title-after", {}, void 0, !0),
									]),
									"nav-bar-content-before": A(() => [
										S(c.$slots, "nav-bar-content-before", {}, void 0, !0),
									]),
									"nav-bar-content-after": A(() => [
										S(c.$slots, "nav-bar-content-after", {}, void 0, !0),
									]),
									"nav-screen-content-before": A(() => [
										S(c.$slots, "nav-screen-content-before", {}, void 0, !0),
									]),
									"nav-screen-content-after": A(() => [
										S(c.$slots, "nav-screen-content-after", {}, void 0, !0),
									]),
									_: 3,
								}),
								T(u0, { open: _(t), onOpenMenu: _(n) }, null, 8, [
									"open",
									"onOpenMenu",
								]),
								T(
									F0,
									{ open: _(t) },
									{
										"sidebar-nav-before": A(() => [
											S(c.$slots, "sidebar-nav-before", {}, void 0, !0),
										]),
										"sidebar-nav-after": A(() => [
											S(c.$slots, "sidebar-nav-after", {}, void 0, !0),
										]),
										_: 3,
									},
									8,
									["open"],
								),
								T(Fh, null, {
									"home-hero-before": A(() => [
										S(c.$slots, "home-hero-before", {}, void 0, !0),
									]),
									"home-hero-image": A(() => [
										S(c.$slots, "home-hero-image", {}, void 0, !0),
									]),
									"home-hero-after": A(() => [
										S(c.$slots, "home-hero-after", {}, void 0, !0),
									]),
									"home-features-before": A(() => [
										S(c.$slots, "home-features-before", {}, void 0, !0),
									]),
									"home-features-after": A(() => [
										S(c.$slots, "home-features-after", {}, void 0, !0),
									]),
									"doc-footer-before": A(() => [
										S(c.$slots, "doc-footer-before", {}, void 0, !0),
									]),
									"doc-before": A(() => [
										S(c.$slots, "doc-before", {}, void 0, !0),
									]),
									"doc-after": A(() => [
										S(c.$slots, "doc-after", {}, void 0, !0),
									]),
									"aside-top": A(() => [
										S(c.$slots, "aside-top", {}, void 0, !0),
									]),
									"aside-bottom": A(() => [
										S(c.$slots, "aside-bottom", {}, void 0, !0),
									]),
									"aside-outline-before": A(() => [
										S(c.$slots, "aside-outline-before", {}, void 0, !0),
									]),
									"aside-outline-after": A(() => [
										S(c.$slots, "aside-outline-after", {}, void 0, !0),
									]),
									"aside-ads-before": A(() => [
										S(c.$slots, "aside-ads-before", {}, void 0, !0),
									]),
									"aside-ads-after": A(() => [
										S(c.$slots, "aside-ads-after", {}, void 0, !0),
									]),
									_: 3,
								}),
								T(Uh),
								S(c.$slots, "layout-bottom", {}, void 0, !0),
						  ]))
						: (d(), W(h, { key: 1 }));
				}
			);
		},
	});
const qh = N(Kh, [["__scopeId", "data-v-7a3ccfd4"]]),
	is = e => (We("data-v-69dfe270"), (e = e()), Ge(), e),
	Wh = { class: "NotFound" },
	Gh = is(() => b("p", { class: "code" }, "404", -1)),
	Yh = is(() => b("h1", { class: "title" }, "PAGE NOT FOUND", -1)),
	Qh = is(() => b("div", { class: "divider" }, null, -1)),
	Jh = is(() =>
		b(
			"blockquote",
			{ class: "quote" },
			" But if you don't change your direction, and if you keep looking, you may end up where you are heading. ",
			-1,
		),
	),
	Xh = { class: "action" },
	Zh = ["href"],
	e_ = H({
		__name: "NotFound",
		setup(e) {
			const { site: t } = le();
			return (n, s) => (
				d(),
				m("div", Wh, [
					Gh,
					Yh,
					Qh,
					Jh,
					b("div", Xh, [
						b(
							"a",
							{ class: "link", href: _(t).base, "aria-label": "go to home" },
							" Take me home ",
							8,
							Zh,
						),
					]),
				])
			);
		},
	});
const t_ = N(e_, [["__scopeId", "data-v-69dfe270"]]);
const Ut = {
	Layout: qh,
	NotFound: t_,
	enhanceApp: ({ app: e }) => {
		e.component("Badge", ra);
	},
};
function n_(e, t) {
	let n = [],
		s = !0;
	const o = i => {
		if (s) {
			s = !1;
			return;
		}
		n.forEach(r => document.head.removeChild(r)),
			(n = []),
			i.forEach(r => {
				const l = s_(r);
				document.head.appendChild(l), n.push(l);
			});
	};
	Tt(() => {
		const i = e.data,
			r = t.value,
			l = i && i.description,
			c = (i && i.frontmatter.head) || [];
		(document.title = ur(r, i)),
			document
				.querySelector("meta[name=description]")
				.setAttribute("content", l || r.description),
			o(pa(r.head, i_(c)));
	});
}
function s_([e, t, n]) {
	const s = document.createElement(e);
	for (const o in t) s.setAttribute(o, t[o]);
	return n && (s.innerHTML = n), s;
}
function o_(e) {
	return e[0] === "meta" && e[1] && e[1].name === "description";
}
function i_(e) {
	return e.filter(t => !o_(t));
}
const gs = new Set(),
	Pr = () => document.createElement("link"),
	r_ = e => {
		const t = Pr();
		(t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
	},
	l_ = e => {
		const t = new XMLHttpRequest();
		t.open("GET", e, (t.withCredentials = !0)), t.send();
	};
let Sn;
const c_ =
	Te && (Sn = Pr()) && Sn.relList && Sn.relList.supports && Sn.relList.supports("prefetch")
		? r_
		: l_;
function a_() {
	if (!Te || !window.IntersectionObserver) return;
	let e;
	if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType))) return;
	const t = window.requestIdleCallback || setTimeout;
	let n = null;
	const s = () => {
		n && n.disconnect(),
			(n = new IntersectionObserver(i => {
				i.forEach(r => {
					if (r.isIntersecting) {
						const l = r.target;
						n.unobserve(l);
						const { pathname: c } = l;
						if (!gs.has(c)) {
							gs.add(c);
							const f = fr(c);
							c_(f);
						}
					}
				});
			})),
			t(() => {
				document.querySelectorAll("#app a").forEach(i => {
					const { target: r, hostname: l, pathname: c } = i,
						f = c.match(/\.\w+$/);
					(f && f[0] !== ".html") ||
						(r !== "_blank" &&
							l === location.hostname &&
							(c !== location.pathname ? n.observe(i) : gs.add(c)));
				});
			});
	};
	De(s);
	const o = vt();
	et(() => o.path, s),
		pt(() => {
			n && n.disconnect();
		});
}
const u_ = H({
	setup(e, { slots: t }) {
		const n = _e(!1);
		return (
			De(() => {
				n.value = !0;
			}),
			() => (n.value && t.default ? t.default() : null)
		);
	},
});
function f_() {
	if (Te) {
		const e = new Map();
		window.addEventListener("click", t => {
			var s;
			const n = t.target;
			if (n.matches('div[class*="language-"] > button.copy')) {
				const o = n.parentElement,
					i = (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling;
				if (!o || !i) return;
				const r = /language-(shellscript|shell|bash|sh|zsh)/.test(o.className);
				let l = "";
				i.querySelectorAll("span.line:not(.diff.remove)").forEach(
					c =>
						(l +=
							(c.textContent || "") +
							`
`),
				),
					(l = l.slice(0, -1)),
					r && (l = l.replace(/^ *(\$|>) /gm, "").trim()),
					d_(l).then(() => {
						n.classList.add("copied"), clearTimeout(e.get(n));
						const c = setTimeout(() => {
							n.classList.remove("copied"), n.blur(), e.delete(n);
						}, 2e3);
						e.set(n, c);
					});
			}
		});
	}
}
async function d_(e) {
	try {
		return navigator.clipboard.writeText(e);
	} catch {
		const t = document.createElement("textarea"),
			n = document.activeElement;
		(t.value = e),
			t.setAttribute("readonly", ""),
			(t.style.contain = "strict"),
			(t.style.position = "absolute"),
			(t.style.left = "-9999px"),
			(t.style.fontSize = "12pt");
		const s = document.getSelection(),
			o = s ? s.rangeCount > 0 && s.getRangeAt(0) : null;
		document.body.appendChild(t),
			t.select(),
			(t.selectionStart = 0),
			(t.selectionEnd = e.length),
			document.execCommand("copy"),
			document.body.removeChild(t),
			o && (s.removeAllRanges(), s.addRange(o)),
			n && n.focus();
	}
}
function h_() {
	Te &&
		window.addEventListener("click", e => {
			var n, s;
			const t = e.target;
			if (t.matches(".vp-code-group input")) {
				const o = (n = t.parentElement) == null ? void 0 : n.parentElement,
					i = Array.from(
						(o == null ? void 0 : o.querySelectorAll("input")) || [],
					).indexOf(t),
					r = o == null ? void 0 : o.querySelector('div[class*="language-"].active'),
					l =
						(s = o == null ? void 0 : o.querySelectorAll('div[class*="language-"]')) ==
						null
							? void 0
							: s[i];
				r && l && r !== l && (r.classList.remove("active"), l.classList.add("active"));
			}
		});
}
const kr = Ut.NotFound || (() => "404 Not Found"),
	__ = H({
		name: "VitePressApp",
		setup() {
			const { site: e } = le();
			return (
				De(() => {
					et(
						() => e.value.lang,
						t => {
							document.documentElement.lang = t;
						},
						{ immediate: !0 },
					);
				}),
				a_(),
				f_(),
				h_(),
				Ut.setup && Ut.setup(),
				() => On(Ut.Layout)
			);
		},
	});
function p_() {
	const e = m_(),
		t = v_();
	t.provide(hr, e);
	const n = ba(e.route);
	return (
		t.provide(dr, n),
		t.provide("NotFound", kr),
		t.component("Content", $a),
		t.component("ClientOnly", u_),
		Object.defineProperty(t.config.globalProperties, "$frontmatter", {
			get() {
				return n.frontmatter.value;
			},
		}),
		Ut.enhanceApp && Ut.enhanceApp({ app: t, router: e, siteData: Wt }),
		{ app: t, router: e, data: n }
	);
}
function v_() {
	return ea(__);
}
function m_() {
	let e = Te,
		t;
	return wa(n => {
		let s = fr(n);
		return (
			e && (t = s),
			(e || t === s) && (s = s.replace(/\.js$/, ".lean.js")),
			Te && (e = !1),
			oa(() => import(s), [])
		);
	}, kr);
}
if (Te) {
	const { app: e, router: t, data: n } = p_();
	t.go().then(() => {
		n_(t.route, n.site), e.mount("#app");
	});
}
export { N as _, b as a, Ee as b, m as c, p_ as createApp, dc as d, d as o };
