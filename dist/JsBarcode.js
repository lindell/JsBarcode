/*! JsBarcode v3.6.0 | (c) Johan Lindell | MIT license */ ! function(t) {
	function e(r) {
		if (n[r]) return n[r].exports;
		var o = n[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
	}
	var n = {};
	return e.m = t, e.c = n, e.i = function(t) {
		return t
	}, e.d = function(t, e, n) {
		Object.defineProperty(t, e, {
			configurable: !1,
			enumerable: !0,
			get: n
		})
	}, e.n = function(t) {
		var n = t && t.__esModule ? function() {
			return t["default"]
		} : function() {
			return t
		};
		return e.d(n, "a", n), n
	}, e.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, e.p = "", e(e.s = 42)
}([function(t, e) {
	"use strict";

	function n(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var r = function o(t, e) {
		n(this, o), this.data = t, this.text = e.text || t, this.options = e
	};
	e["default"] = r
}, function(t, e) {
	"use strict";

	function n(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var r = function() {
		function t() {
			n(this, t), this.startBin = "101", this.endBin = "101", this.middleBin = "01010", this.Lbinary = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], this.Gbinary = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"], this.Rbinary = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"]
		}
		return t.prototype.encode = function(t, e, n) {
			var r = "";
			n = n || "";
			for (var o = 0; o < t.length; o++) "L" == e[o] ? r += this.Lbinary[t[o]] : "G" == e[o] ? r += this.Gbinary[t[o]] : "R" == e[o] && (r += this.Rbinary[t[o]]), o < t.length - 1 && (r += n);
			return r
		}, t
	}();
	e["default"] = r
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}

	function u(t, e) {
		for (var n = 0; n < e; n++) t = "0" + t;
		return t
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var s = n(0),
		c = r(s),
		f = function(t) {
			function e(n, r) {
				return o(this, e), i(this, t.call(this, n, r))
			}
			return a(e, t), e.prototype.encode = function() {
				for (var t = "110", e = 0; e < this.data.length; e++) {
					var n = parseInt(this.data[e]),
						r = n.toString(2);
					r = u(r, 4 - r.length);
					for (var o = 0; o < r.length; o++) t += "0" == r[o] ? "100" : "110"
				}
				return t += "1001", {
					data: t,
					text: this.text
				}
			}, e.prototype.valid = function() {
				return this.data.search(/^[0-9]+$/) !== -1
			}, e
		}(c["default"]);
	e["default"] = f
}, function(t, e) {
	"use strict";

	function n(t, e) {
		var n, r = {};
		for (n in t) t.hasOwnProperty(n) && (r[n] = t[n]);
		for (n in e) e.hasOwnProperty(n) && "undefined" != typeof e[n] && (r[n] = e[n]);
		return r
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e["default"] = n
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(0),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				o(this, e);
				var a = i(this, t.call(this, n.substring(1), r));
				a.bytes = [];
				for (var u = 0; u < n.length; ++u) a.bytes.push(n.charCodeAt(u));
				return a.encodings = [740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, 668, 680, 692, 5379], a
			}
			return a(e, t), e.prototype.encode = function() {
				var t, e = this.bytes,
					n = e.shift() - 105;
				if (103 === n) t = this.nextA(e, 1);
				else if (104 === n) t = this.nextB(e, 1);
				else {
					if (105 !== n) throw new f;
					t = this.nextC(e, 1)
				}
				return {
					text: this.text == this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
					data: this.getEncoding(n) + t.result + this.getEncoding((t.checksum + n) % 103) + this.getEncoding(106)
				}
			}, e.prototype.getEncoding = function(t) {
				return this.encodings[t] ? (this.encodings[t] + 1e3).toString(2) : ""
			}, e.prototype.valid = function() {
				return this.data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1
			}, e.prototype.nextA = function(t, e) {
				if (t.length <= 0) return {
					result: "",
					checksum: 0
				};
				var n, r;
				if (t[0] >= 200) r = t[0] - 105, t.shift(), 99 === r ? n = this.nextC(t, e + 1) : 100 === r ? n = this.nextB(t, e + 1) : 98 === r ? (t[0] = t[0] > 95 ? t[0] - 96 : t[0], n = this.nextA(t, e + 1)) : n = this.nextA(t, e + 1);
				else {
					var o = t[0];
					r = o < 32 ? o + 64 : o - 32, t.shift(), n = this.nextA(t, e + 1)
				}
				var i = this.getEncoding(r),
					a = r * e;
				return {
					result: i + n.result,
					checksum: a + n.checksum
				}
			}, e.prototype.nextB = function(t, e) {
				if (t.length <= 0) return {
					result: "",
					checksum: 0
				};
				var n, r;
				t[0] >= 200 ? (r = t[0] - 105, t.shift(), 99 === r ? n = this.nextC(t, e + 1) : 101 === r ? n = this.nextA(t, e + 1) : 98 === r ? (t[0] = t[0] < 32 ? t[0] + 96 : t[0], n = this.nextB(t, e + 1)) : n = this.nextB(t, e + 1)) : (r = t[0] - 32, t.shift(), n = this.nextB(t, e + 1));
				var o = this.getEncoding(r),
					i = r * e;
				return {
					result: o + n.result,
					checksum: i + n.checksum
				}
			}, e.prototype.nextC = function(t, e) {
				if (t.length <= 0) return {
					result: "",
					checksum: 0
				};
				var n, r;
				t[0] >= 200 ? (r = t[0] - 105, t.shift(), n = 100 === r ? this.nextB(t, e + 1) : 101 === r ? this.nextA(t, e + 1) : this.nextC(t, e + 1)) : (r = 10 * (t[0] - 48) + t[1] - 48, t.shift(), t.shift(), n = this.nextC(t, e + 1));
				var o = this.getEncoding(r),
					i = r * e;
				return {
					result: o + n.result,
					checksum: i + n.checksum
				}
			}, e
		}(s["default"]),
		f = function(t) {
			function e() {
				o(this, e);
				var n = i(this, t.call(this));
				return n.name = "InvalidStartCharacterException", n.message = "The encoding does not start with a start character.", n
			}
			return a(e, t), e
		}(Error);
	e["default"] = c
}, function(t, e) {
	"use strict";

	function n(t) {
		for (var e = 0, n = 0; n < t.length; n++) {
			var r = parseInt(t[n]);
			e += (n + t.length) % 2 === 0 ? r : 2 * r % 10 + Math.floor(2 * r / 10)
		}
		return (10 - e % 10) % 10
	}

	function r(t) {
		for (var e = 0, n = [2, 3, 4, 5, 6, 7], r = 0; r < t.length; r++) {
			var o = parseInt(t[t.length - 1 - r]);
			e += n[r % n.length] * o
		}
		return (11 - e % 11) % 11
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.mod10 = n, e.mod11 = r
}, function(t, e) {
	"use strict";

	function n(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function r(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function o(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var i = function(t) {
			function e(o, i) {
				n(this, e);
				var a = r(this, t.call(this));
				return a.name = "InvalidInputException", a.symbology = o, a.input = i, a.message = '"' + a.input + '" is not a valid input for ' + a.symbology, a
			}
			return o(e, t), e
		}(Error),
		a = function(t) {
			function e() {
				n(this, e);
				var o = r(this, t.call(this));
				return o.name = "InvalidElementException", o.message = "Not supported type to render on", o
			}
			return o(e, t), e
		}(Error),
		u = function(t) {
			function e() {
				n(this, e);
				var o = r(this, t.call(this));
				return o.name = "NoElementException", o.message = "No element to render on.", o
			}
			return o(e, t), e
		}(Error);
	e.InvalidInputException = i, e.InvalidElementException = a, e.NoElementException = u
}, function(t, e) {
	"use strict";

	function n(t) {
		var e = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
		for (var n in e) e.hasOwnProperty(n) && (n = e[n], "string" == typeof t[n] && (t[n] = parseInt(t[n], 10)));
		return "string" == typeof t.displayValue && (t.displayValue = "false" != t.displayValue), t
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e["default"] = n
}, function(t, e) {
	"use strict";
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var n = {
		width: 2,
		height: 100,
		format: "auto",
		displayValue: !0,
		fontOptions: "",
		font: "monospace",
		text: void 0,
		textAlign: "center",
		textPosition: "bottom",
		textMargin: 2,
		fontSize: 20,
		background: "#ffffff",
		lineColor: "#000000",
		margin: 10,
		marginTop: void 0,
		marginBottom: void 0,
		marginLeft: void 0,
		marginRight: void 0,
		valid: function() {}
	};
	e["default"] = n
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		return e.height + (e.displayValue && t.text.length > 0 ? e.fontSize + e.textMargin : 0) + e.marginTop + e.marginBottom
	}

	function i(t, e, n) {
		if (n.displayValue && e < t) {
			if ("center" == n.textAlign) return Math.floor((t - e) / 2);
			if ("left" == n.textAlign) return 0;
			if ("right" == n.textAlign) return Math.floor(t - e)
		}
		return 0
	}

	function a(t, e, n) {
		for (var r = 0; r < t.length; r++) {
			var a, u = t[r],
				s = (0, l["default"])(e, u.options);
			a = s.displayValue ? c(u.text, s, n) : 0;
			var f = u.data.length * s.width;
			u.width = Math.ceil(Math.max(a, f)), u.height = o(u, s), u.barcodePadding = i(a, f, s)
		}
	}

	function u(t) {
		for (var e = 0, n = 0; n < t.length; n++) e += t[n].width;
		return e
	}

	function s(t) {
		for (var e = 0, n = 0; n < t.length; n++) t[n].height > e && (e = t[n].height);
		return e
	}

	function c(t, e, n) {
		var r;
		r = "undefined" == typeof n ? document.createElement("canvas").getContext("2d") : n, r.font = e.fontOptions + " " + e.fontSize + "px " + e.font;
		var o = r.measureText(t).width;
		return o
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.getTotalWidthOfEncodings = e.calculateEncodingAttributes = e.getBarcodePadding = e.getEncodingHeight = e.getMaximumHeightOfEncodings = void 0;
	var f = n(3),
		l = r(f);
	e.getMaximumHeightOfEncodings = s, e.getEncodingHeight = o, e.getBarcodePadding = i, e.calculateEncodingAttributes = a, e.getTotalWidthOfEncodings = u
}, function(t, e, n) {
	"use strict";
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var r = n(20),
		o = n(19),
		i = n(26),
		a = n(29),
		u = n(28),
		s = n(34),
		c = n(36),
		f = n(35),
		l = n(27);
	e["default"] = {
		CODE39: r.CODE39,
		CODE128: o.CODE128,
		CODE128A: o.CODE128A,
		CODE128B: o.CODE128B,
		CODE128C: o.CODE128C,
		EAN13: i.EAN13,
		EAN8: i.EAN8,
		EAN5: i.EAN5,
		EAN2: i.EAN2,
		UPC: i.UPC,
		ITF14: a.ITF14,
		ITF: u.ITF,
		MSI: s.MSI,
		MSI10: s.MSI10,
		MSI11: s.MSI11,
		MSI1010: s.MSI1010,
		MSI1110: s.MSI1110,
		pharmacode: c.pharmacode,
		codabar: f.codabar,
		GenericBarcode: l.GenericBarcode
	}
}, function(t, e) {
	"use strict";

	function n(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var r = function() {
		function t(e) {
			n(this, t), this.api = e
		}
		return t.prototype.handleCatch = function(t) {
			if ("InvalidInputException" !== t.name) throw t;
			if (this.api._options.valid === this.api._defaults.valid) throw t.message;
			this.api._options.valid(!1), this.api.render = function() {}
		}, t.prototype.wrapBarcodeCall = function(t) {
			try {
				var e = t.apply(void 0, arguments);
				return this.api._options.valid(!0), e
			} catch (n) {
				return this.handleCatch(n), this.api
			}
		}, t
	}();
	e["default"] = r
}, function(t, e) {
	"use strict";

	function n(t) {
		return t.marginTop = t.marginTop || t.margin, t.marginBottom = t.marginBottom || t.margin, t.marginRight = t.marginRight || t.margin, t.marginLeft = t.marginLeft || t.margin, t
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e["default"] = n
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t) {
		if ("string" == typeof t) return i(t);
		if (Array.isArray(t)) {
			for (var e = [], n = 0; n < t.length; n++) e.push(o(t[n]));
			return e
		}
		if ("undefined" != typeof HTMLCanvasElement && t instanceof HTMLImageElement) return a(t);
		if ("undefined" != typeof SVGElement && t instanceof SVGElement) return {
			element: t,
			options: (0, c["default"])(t),
			renderer: l["default"].SVGRenderer
		};
		if ("undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement) return {
			element: t,
			options: (0, c["default"])(t),
			renderer: l["default"].CanvasRenderer
		};
		if (t && t.getContext) return {
			element: t,
			renderer: l["default"].CanvasRenderer
		};
		if (t && "object" === ("undefined" == typeof t ? "undefined" : u(t)) && !t.nodeName) return {
			element: t,
			renderer: l["default"].ObjectRenderer
		};
		throw new p.InvalidElementException
	}

	function i(t) {
		var e = document.querySelectorAll(t);
		if (0 !== e.length) {
			for (var n = [], r = 0; r < e.length; r++) n.push(o(e[r]));
			return n
		}
	}

	function a(t) {
		var e = document.createElement("canvas");
		return {
			element: e,
			options: (0, c["default"])(t),
			renderer: l["default"].CanvasRenderer,
			afterRender: function() {
				t.setAttribute("src", e.toDataURL())
			}
		}
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
		},
		s = n(37),
		c = r(s),
		f = n(39),
		l = r(f),
		p = n(6);
	e["default"] = o
}, function(t, e) {
	"use strict";

	function n(t) {
		function e(t) {
			if (Array.isArray(t))
				for (var r = 0; r < t.length; r++) e(t[r]);
			else t.text = t.text || "", t.data = t.data || "", n.push(t)
		}
		var n = [];
		return e(t), n
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e["default"] = n
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(4),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				return o(this, e), i(this, t.call(this, String.fromCharCode(208) + n, r))
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1
			}, e
		}(s["default"]);
	e["default"] = c
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(4),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				return o(this, e), i(this, t.call(this, String.fromCharCode(209) + n, r))
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1
			}, e
		}(s["default"]);
	e["default"] = c
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(4),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				return o(this, e), i(this, t.call(this, String.fromCharCode(210) + n, r))
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1
			}, e
		}(s["default"]);
	e["default"] = c
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}

	function u(t) {
		var e, n = t.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length,
			r = t.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length,
			o = t.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;
		return e = o >= 2 ? String.fromCharCode(210) + f(t) : n > r ? String.fromCharCode(208) + s(t) : String.fromCharCode(209) + c(t), e = e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function(t, e) {
			return String.fromCharCode(203) + e
		})
	}

	function s(t) {
		var e = t.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);
		if (e) return e[1] + String.fromCharCode(204) + f(t.substring(e[1].length));
		var n = t.match(/^[\x00-\x5F\xC8-\xCF]+/);
		return n[0].length === t.length ? t : n[0] + String.fromCharCode(205) + c(t.substring(n[0].length))
	}

	function c(t) {
		var e = t.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);
		if (e) return e[1] + String.fromCharCode(204) + f(t.substring(e[1].length));
		var n = t.match(/^[\x20-\x7F\xC8-\xCF]+/);
		return n[0].length === t.length ? t : n[0] + String.fromCharCode(206) + s(t.substring(n[0].length))
	}

	function f(t) {
		var e = t.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0],
			n = e.length;
		if (n === t.length) return t;
		t = t.substring(n);
		var r = t.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length,
			o = t.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
		return r >= o ? e + String.fromCharCode(206) + s(t) : e + String.fromCharCode(205) + c(t)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var l = n(4),
		p = r(l),
		h = function(t) {
			function e(n, r) {
				if (o(this, e), n.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1) var a = i(this, t.call(this, u(n), r));
				else var a = i(this, t.call(this, n, r));
				return i(a)
			}
			return a(e, t), e
		}(p["default"]);
	e["default"] = h
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.CODE128C = e.CODE128B = e.CODE128A = e.CODE128 = void 0;
	var o = n(18),
		i = r(o),
		a = n(15),
		u = r(a),
		s = n(16),
		c = r(s),
		f = n(17),
		l = r(f);
	e.CODE128 = i["default"], e.CODE128A = u["default"], e.CODE128B = c["default"], e.CODE128C = l["default"]
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}

	function u(t) {
		return s(f(t))
	}

	function s(t) {
		return b[t].toString(2)
	}

	function c(t) {
		return y[t]
	}

	function f(t) {
		return y.indexOf(t)
	}

	function l(t) {
		for (var e = 0, n = 0; n < t.length; n++) e += f(t[n]);
		return e %= 43
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.CODE39 = void 0;
	var p = n(0),
		h = r(p),
		d = function(t) {
			function e(n, r) {
				return o(this, e), n = n.toUpperCase(), r.mod43 && (n += c(l(n))), i(this, t.call(this, n, r))
			}
			return a(e, t), e.prototype.encode = function() {
				for (var t = u("*"), e = 0; e < this.data.length; e++) t += u(this.data[e]) + "0";
				return t += u("*"), {
					data: t,
					text: this.text
				}
			}, e.prototype.valid = function() {
				return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1
			}, e
		}(h["default"]),
		y = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"],
		b = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];
	e.CODE39 = d
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}

	function u(t) {
		var e, n = 0;
		for (e = 0; e < 12; e += 2) n += parseInt(t[e]);
		for (e = 1; e < 12; e += 2) n += 3 * parseInt(t[e]);
		return (10 - n % 10) % 10
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var s = n(1),
		c = r(s),
		f = n(0),
		l = r(f),
		p = function(t) {
			function e(n, r) {
				o(this, e), n.search(/^[0-9]{12}$/) !== -1 && (n += u(n));
				var a = i(this, t.call(this, n, r));
				return !r.flat && r.fontSize > 10 * r.width ? a.fontSize = 10 * r.width : a.fontSize = r.fontSize, a.guardHeight = r.height + a.fontSize / 2 + r.textMargin, a.lastChar = r.lastChar, a
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[0-9]{13}$/) !== -1 && this.data[12] == u(this.data)
			}, e.prototype.encode = function() {
				return this.options.flat ? this.flatEncoding() : this.guardedEncoding()
			}, e.prototype.getStructure = function() {
				return ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"]
			}, e.prototype.guardedEncoding = function() {
				var t = new c["default"],
					e = [],
					n = this.getStructure()[this.data[0]],
					r = this.data.substr(1, 6),
					o = this.data.substr(7, 6);
				return this.options.displayValue && e.push({
					data: "000000000000",
					text: this.text.substr(0, 1),
					options: {
						textAlign: "left",
						fontSize: this.fontSize
					}
				}), e.push({
					data: "101",
					options: {
						height: this.guardHeight
					}
				}), e.push({
					data: t.encode(r, n),
					text: this.text.substr(1, 6),
					options: {
						fontSize: this.fontSize
					}
				}), e.push({
					data: "01010",
					options: {
						height: this.guardHeight
					}
				}), e.push({
					data: t.encode(o, "RRRRRR"),
					text: this.text.substr(7, 6),
					options: {
						fontSize: this.fontSize
					}
				}), e.push({
					data: "101",
					options: {
						height: this.guardHeight
					}
				}), this.options.lastChar && this.options.displayValue && (e.push({
					data: "00"
				}), e.push({
					data: "00000",
					text: this.options.lastChar,
					options: {
						fontSize: this.fontSize
					}
				})), e
			}, e.prototype.flatEncoding = function() {
				var t = new c["default"],
					e = "",
					n = this.getStructure()[this.data[0]];
				return e += "101", e += t.encode(this.data.substr(1, 6), n), e += "01010", e += t.encode(this.data.substr(7, 6), "RRRRRR"), e += "101", {
					data: e,
					text: this.text
				}
			}, e
		}(l["default"]);
	e["default"] = p
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(1),
		s = r(u),
		c = n(0),
		f = r(c),
		l = function(t) {
			function e(n, r) {
				o(this, e);
				var a = i(this, t.call(this, n, r));
				return a.structure = ["LL", "LG", "GL", "GG"], a
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[0-9]{2}$/) !== -1
			}, e.prototype.encode = function() {
				var t = new s["default"],
					e = this.structure[parseInt(this.data) % 4],
					n = "1011";
				return n += t.encode(this.data, e, "01"), {
					data: n,
					text: this.text
				}
			}, e
		}(f["default"]);
	e["default"] = l
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(1),
		s = r(u),
		c = n(0),
		f = r(c),
		l = function(t) {
			function e(n, r) {
				o(this, e);
				var a = i(this, t.call(this, n, r));
				return a.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"], a
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[0-9]{5}$/) !== -1
			}, e.prototype.encode = function() {
				var t = new s["default"],
					e = this.checksum(),
					n = "1011";
				return n += t.encode(this.data, this.structure[e], "01"), {
					data: n,
					text: this.text
				}
			}, e.prototype.checksum = function() {
				var t = 0;
				return t += 3 * parseInt(this.data[0]), t += 9 * parseInt(this.data[1]), t += 3 * parseInt(this.data[2]), t += 9 * parseInt(this.data[3]), t += 3 * parseInt(this.data[4]), t % 10
			}, e
		}(f["default"]);
	e["default"] = l
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}

	function u(t) {
		var e, n = 0;
		for (e = 0; e < 7; e += 2) n += 3 * parseInt(t[e]);
		for (e = 1; e < 7; e += 2) n += parseInt(t[e]);
		return (10 - n % 10) % 10
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var s = n(1),
		c = r(s),
		f = n(0),
		l = r(f),
		p = function(t) {
			function e(n, r) {
				return o(this, e), n.search(/^[0-9]{7}$/) !== -1 && (n += u(n)), i(this, t.call(this, n, r))
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[0-9]{8}$/) !== -1 && this.data[7] == u(this.data)
			}, e.prototype.encode = function() {
				var t = new c["default"],
					e = "",
					n = this.data.substr(0, 4),
					r = this.data.substr(4, 4);
				return e += t.startBin, e += t.encode(n, "LLLL"), e += t.middleBin, e += t.encode(r, "RRRR"), e += t.endBin, {
					data: e,
					text: this.text
				}
			}, e
		}(l["default"]);
	e["default"] = p
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}

	function u(t) {
		var e, n = 0;
		for (e = 1; e < 11; e += 2) n += parseInt(t[e]);
		for (e = 0; e < 11; e += 2) n += 3 * parseInt(t[e]);
		return (10 - n % 10) % 10
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var s = n(1),
		c = r(s),
		f = n(0),
		l = r(f),
		p = function(t) {
			function e(n, r) {
				o(this, e), n.search(/^[0-9]{11}$/) !== -1 && (n += u(n));
				var a = i(this, t.call(this, n, r));
				return a.displayValue = r.displayValue, r.fontSize > 10 * r.width ? a.fontSize = 10 * r.width : a.fontSize = r.fontSize, a.guardHeight = r.height + a.fontSize / 2 + r.textMargin, a
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == u(this.data)
			}, e.prototype.encode = function() {
				return this.options.flat ? this.flatEncoding() : this.guardedEncoding()
			}, e.prototype.flatEncoding = function() {
				var t = new c["default"],
					e = "";
				return e += "101", e += t.encode(this.data.substr(0, 6), "LLLLLL"), e += "01010", e += t.encode(this.data.substr(6, 6), "RRRRRR"), e += "101", {
					data: e,
					text: this.text
				}
			}, e.prototype.guardedEncoding = function() {
				var t = new c["default"],
					e = [];
				return this.displayValue && e.push({
					data: "00000000",
					text: this.text.substr(0, 1),
					options: {
						textAlign: "left",
						fontSize: this.fontSize
					}
				}), e.push({
					data: "101" + t.encode(this.data[0], "L"),
					options: {
						height: this.guardHeight
					}
				}), e.push({
					data: t.encode(this.data.substr(1, 5), "LLLLL"),
					text: this.text.substr(1, 5),
					options: {
						fontSize: this.fontSize
					}
				}), e.push({
					data: "01010",
					options: {
						height: this.guardHeight
					}
				}), e.push({
					data: t.encode(this.data.substr(6, 5), "RRRRR"),
					text: this.text.substr(6, 5),
					options: {
						fontSize: this.fontSize
					}
				}), e.push({
					data: t.encode(this.data[11], "R") + "101",
					options: {
						height: this.guardHeight
					}
				}), this.displayValue && e.push({
					data: "00000000",
					text: this.text.substr(11, 1),
					options: {
						textAlign: "right",
						fontSize: this.fontSize
					}
				}), e
			}, e
		}(l["default"]);
	e["default"] = p
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.UPC = e.EAN2 = e.EAN5 = e.EAN8 = e.EAN13 = void 0;
	var o = n(21),
		i = r(o),
		a = n(24),
		u = r(a),
		s = n(23),
		c = r(s),
		f = n(22),
		l = r(f),
		p = n(25),
		h = r(p);
	e.EAN13 = i["default"], e.EAN8 = u["default"], e.EAN5 = c["default"], e.EAN2 = l["default"], e.UPC = h["default"]
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.GenericBarcode = void 0;
	var u = n(0),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				return o(this, e), i(this, t.call(this, n, r))
			}
			return a(e, t), e.prototype.encode = function() {
				return {
					data: "10101010101010101010101010101010101010101",
					text: this.text
				}
			}, e.prototype.valid = function() {
				return !0
			}, e
		}(s["default"]);
	e.GenericBarcode = c
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.ITF = void 0;
	var u = n(0),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				o(this, e);
				var a = i(this, t.call(this, n, r));
				return a.binaryRepresentation = {
					0: "00110",
					1: "10001",
					2: "01001",
					3: "11000",
					4: "00101",
					5: "10100",
					6: "01100",
					7: "00011",
					8: "10010",
					9: "01010"
				}, a
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^([0-9]{2})+$/) !== -1
			}, e.prototype.encode = function() {
				for (var t = "1010", e = 0; e < this.data.length; e += 2) t += this.calculatePair(this.data.substr(e, 2));
				return t += "11101", {
					data: t,
					text: this.text
				}
			}, e.prototype.calculatePair = function(t) {
				for (var e = "", n = this.binaryRepresentation[t[0]], r = this.binaryRepresentation[t[1]], o = 0; o < 5; o++) e += "1" == n[o] ? "111" : "1", e += "1" == r[o] ? "000" : "0";
				return e
			}, e
		}(s["default"]);
	e.ITF = c
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}

	function u(t) {
		for (var e = 0, n = 0; n < 13; n++) e += parseInt(t[n]) * (3 - n % 2 * 2);
		return 10 * Math.ceil(e / 10) - e
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.ITF14 = void 0;
	var s = n(0),
		c = r(s),
		f = function(t) {
			function e(n, r) {
				o(this, e), n.search(/^[0-9]{13}$/) !== -1 && (n += u(n));
				var a = i(this, t.call(this, n, r));
				return a.binaryRepresentation = {
					0: "00110",
					1: "10001",
					2: "01001",
					3: "11000",
					4: "00101",
					5: "10100",
					6: "01100",
					7: "00011",
					8: "10010",
					9: "01010"
				}, a
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[0-9]{14}$/) !== -1 && this.data[13] == u(this.data)
			}, e.prototype.encode = function() {
				for (var t = "1010", e = 0; e < 14; e += 2) t += this.calculatePair(this.data.substr(e, 2));
				return t += "11101", {
					data: t,
					text: this.text
				}
			}, e.prototype.calculatePair = function(t) {
				for (var e = "", n = this.binaryRepresentation[t[0]], r = this.binaryRepresentation[t[1]], o = 0; o < 5; o++) e += "1" == n[o] ? "111" : "1", e += "1" == r[o] ? "000" : "0";
				return e
			}, e
		}(c["default"]);
	e.ITF14 = f
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(2),
		s = r(u),
		c = n(5),
		f = function(t) {
			function e(n, r) {
				return o(this, e), i(this, t.call(this, n + (0, c.mod10)(n), r))
			}
			return a(e, t), e
		}(s["default"]);
	e["default"] = f
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(2),
		s = r(u),
		c = n(5),
		f = function(t) {
			function e(n, r) {
				return o(this, e), n += (0, c.mod10)(n), n += (0, c.mod10)(n), i(this, t.call(this, n, r))
			}
			return a(e, t), e
		}(s["default"]);
	e["default"] = f
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(2),
		s = r(u),
		c = n(5),
		f = function(t) {
			function e(n, r) {
				return o(this, e), i(this, t.call(this, n + (0, c.mod11)(n), r))
			}
			return a(e, t), e
		}(s["default"]);
	e["default"] = f
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var u = n(2),
		s = r(u),
		c = n(5),
		f = function(t) {
			function e(n, r) {
				return o(this, e), n += (0, c.mod11)(n), n += (0, c.mod10)(n), i(this, t.call(this, n, r))
			}
			return a(e, t), e
		}(s["default"]);
	e["default"] = f
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.MSI1110 = e.MSI1010 = e.MSI11 = e.MSI10 = e.MSI = void 0;
	var o = n(2),
		i = r(o),
		a = n(30),
		u = r(a),
		s = n(32),
		c = r(s),
		f = n(31),
		l = r(f),
		p = n(33),
		h = r(p);
	e.MSI = i["default"], e.MSI10 = u["default"], e.MSI11 = c["default"], e.MSI1010 = l["default"], e.MSI1110 = h["default"]
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.codabar = void 0;
	var u = n(0),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				o(this, e), 0 === n.search(/^[0-9\-\$\:\.\+\/]+$/) && (n = "A" + n + "A");
				var a = i(this, t.call(this, n.toUpperCase(), r));
				return a.text = a.options.text || a.text.replace(/[A-D]/g, ""), a
			}
			return a(e, t), e.prototype.valid = function() {
				return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1
			}, e.prototype.encode = function() {
				for (var t = [], e = this.getEncodings(), n = 0; n < this.data.length; n++) t.push(e[this.data.charAt(n)]), n !== this.data.length - 1 && t.push("0");
				return {
					text: this.text,
					data: t.join("")
				}
			}, e.prototype.getEncodings = function() {
				return {
					0: "101010011",
					1: "101011001",
					2: "101001011",
					3: "110010101",
					4: "101101001",
					5: "110101001",
					6: "100101011",
					7: "100101101",
					8: "100110101",
					9: "110100101",
					"-": "101001101",
					$: "101100101",
					":": "1101011011",
					"/": "1101101011",
					".": "1101101101",
					"+": "101100110011",
					A: "1011001001",
					B: "1010010011",
					C: "1001001011",
					D: "1010011001"
				}
			}, e
		}(s["default"]);
	e.codabar = c
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e) {
		if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" != typeof e && "function" != typeof e ? t : e
	}

	function a(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.pharmacode = void 0;
	var u = n(0),
		s = r(u),
		c = function(t) {
			function e(n, r) {
				o(this, e);
				var a = i(this, t.call(this, n, r));
				return a.number = parseInt(n, 10), a
			}
			return a(e, t), e.prototype.encode = function() {
				for (var t = this.number, e = ""; !isNaN(t) && 0 != t;) t % 2 === 0 ? (e = "11100" + e, t = (t - 2) / 2) : (e = "100" + e, t = (t - 1) / 2);
				return e = e.slice(0, -2), {
					data: e,
					text: this.text
				}
			}, e.prototype.valid = function() {
				return this.number >= 3 && this.number <= 131070
			}, e
		}(s["default"]);
	e.pharmacode = c
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t) {
		var e = {};
		for (var n in s["default"]) s["default"].hasOwnProperty(n) && (t.hasAttribute("jsbarcode-" + n.toLowerCase()) && (e[n] = t.getAttribute("jsbarcode-" + n.toLowerCase())), t.hasAttribute("data-" + n.toLowerCase()) && (e[n] = t.getAttribute("data-" + n.toLowerCase())));
		return e.value = t.getAttribute("jsbarcode-value") || t.getAttribute("data-value"), e = (0, a["default"])(e)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var i = n(7),
		a = r(i),
		u = n(8),
		s = r(u);
	e["default"] = o
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var i = n(3),
		a = r(i),
		u = n(9),
		s = function() {
			function t(e, n, r) {
				o(this, t), this.canvas = e, this.encodings = n, this.options = r
			}
			return t.prototype.render = function() {
				if (!this.canvas.getContext) throw new Error("The browser does not support canvas.");
				this.prepareCanvas();
				for (var t = 0; t < this.encodings.length; t++) {
					var e = (0, a["default"])(this.options, this.encodings[t].options);
					this.drawCanvasBarcode(e, this.encodings[t]), this.drawCanvasText(e, this.encodings[t]), this.moveCanvasDrawing(this.encodings[t])
				}
				this.restoreCanvas()
			}, t.prototype.prepareCanvas = function() {
				var t = this.canvas.getContext("2d");
				t.save(), (0, u.calculateEncodingAttributes)(this.encodings, this.options, t);
				var e = (0, u.getTotalWidthOfEncodings)(this.encodings),
					n = (0, u.getMaximumHeightOfEncodings)(this.encodings);
				this.canvas.width = e + this.options.marginLeft + this.options.marginRight, this.canvas.height = n, t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.options.background && (t.fillStyle = this.options.background, t.fillRect(0, 0, this.canvas.width, this.canvas.height)), t.translate(this.options.marginLeft, 0)
			}, t.prototype.drawCanvasBarcode = function(t, e) {
				var n, r = this.canvas.getContext("2d"),
					o = e.data;
				n = "top" == t.textPosition ? t.marginTop + t.fontSize + t.textMargin : t.marginTop, r.fillStyle = t.lineColor;
				for (var i = 0; i < o.length; i++) {
					var a = i * t.width + e.barcodePadding;
					"1" === o[i] ? r.fillRect(a, n, t.width, t.height) : o[i] && r.fillRect(a, n, t.width, t.height * o[i])
				}
			}, t.prototype.drawCanvasText = function(t, e) {
				var n = this.canvas.getContext("2d"),
					r = t.fontOptions + " " + t.fontSize + "px " + t.font;
				if (t.displayValue) {
					var o, i;
					i = "top" == t.textPosition ? t.marginTop + t.fontSize - t.textMargin : t.height + t.textMargin + t.marginTop + t.fontSize, n.font = r, "left" == t.textAlign || e.barcodePadding > 0 ? (o = 0, n.textAlign = "left") : "right" == t.textAlign ? (o = e.width - 1, n.textAlign = "right") : (o = e.width / 2, n.textAlign = "center"), n.fillText(e.text, o, i)
				}
			}, t.prototype.moveCanvasDrawing = function(t) {
				var e = this.canvas.getContext("2d");
				e.translate(t.width, 0)
			}, t.prototype.restoreCanvas = function() {
				var t = this.canvas.getContext("2d");
				t.restore()
			}, t
		}();
	e["default"] = s
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var o = n(38),
		i = r(o),
		a = n(41),
		u = r(a),
		s = n(40),
		c = r(s);
	e["default"] = {
		CanvasRenderer: i["default"],
		SVGRenderer: u["default"],
		ObjectRenderer: c["default"]
	}
}, function(t, e) {
	"use strict";

	function n(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var r = function() {
		function t(e, r, o) {
			n(this, t), this.object = e, this.encodings = r, this.options = o
		}
		return t.prototype.render = function() {
			this.object.encodings = this.encodings
		}, t
	}();
	e["default"] = r
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function i(t, e, n) {
		var r = document.createElementNS(l, "g");
		return r.setAttribute("transform", "translate(" + t + ", " + e + ")"), n.appendChild(r), r
	}

	function a(t, e) {
		t.setAttribute("style", "fill:" + e.lineColor + ";")
	}

	function u(t, e, n, r, o) {
		var i = document.createElementNS(l, "rect");
		return i.setAttribute("x", t), i.setAttribute("y", e), i.setAttribute("width", n), i.setAttribute("height", r), o.appendChild(i), i
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	});
	var s = n(3),
		c = r(s),
		f = n(9),
		l = "http://www.w3.org/2000/svg",
		p = function() {
			function t(e, n, r) {
				o(this, t), this.svg = e, this.encodings = n, this.options = r
			}
			return t.prototype.render = function() {
				var t = this.options.marginLeft;
				this.prepareSVG();
				for (var e = 0; e < this.encodings.length; e++) {
					var n = this.encodings[e],
						r = (0, c["default"])(this.options, n.options),
						o = i(t, r.marginTop, this.svg);
					a(o, r), this.drawSvgBarcode(o, r, n), this.drawSVGText(o, r, n), t += n.width
				}
			}, t.prototype.prepareSVG = function() {
				for (; this.svg.firstChild;) this.svg.removeChild(this.svg.firstChild);
				(0, f.calculateEncodingAttributes)(this.encodings, this.options);
				var t = (0, f.getTotalWidthOfEncodings)(this.encodings),
					e = (0, f.getMaximumHeightOfEncodings)(this.encodings),
					n = t + this.options.marginLeft + this.options.marginRight;
				this.setSvgAttributes(n, e), this.options.background && u(0, 0, n, e, this.svg).setAttribute("style", "fill:" + this.options.background + ";")
			}, t.prototype.drawSvgBarcode = function(t, e, n) {
				var r, o = n.data;
				r = "top" == e.textPosition ? e.fontSize + e.textMargin : 0;
				for (var i = 0, a = 0, s = 0; s < o.length; s++) a = s * e.width + n.barcodePadding, "1" === o[s] ? i++ : i > 0 && (u(a - e.width * i, r, e.width * i, e.height, t), i = 0);
				i > 0 && u(a - e.width * (i - 1), r, e.width * i, e.height, t)
			}, t.prototype.drawSVGText = function(t, e, n) {
				var r = document.createElementNS(l, "text");
				if (e.displayValue) {
					var o, i;
					r.setAttribute("style", "font:" + e.fontOptions + " " + e.fontSize + "px " + e.font), i = "top" == e.textPosition ? e.fontSize - e.textMargin : e.height + e.textMargin + e.fontSize, "left" == e.textAlign || n.barcodePadding > 0 ? (o = 0, r.setAttribute("text-anchor", "start")) : "right" == e.textAlign ? (o = n.width - 1, r.setAttribute("text-anchor", "end")) : (o = n.width / 2, r.setAttribute("text-anchor", "middle")), r.setAttribute("x", o), r.setAttribute("y", i), (e.textLength)?r.setAttribute("textLength", e.textLength):"", r.appendChild(document.createTextNode(n.text)), t.appendChild(r)
				}
			}, t.prototype.setSvgAttributes = function(t, e) {
				var n = this.svg;
				n.setAttribute("width", t + "px"), n.setAttribute("height", e + "px"), n.setAttribute("x", "0px"), n.setAttribute("y", "0px"), n.setAttribute("viewBox", "0 0 " + t + " " + e), n.setAttribute("xmlns", l), n.setAttribute("version", "1.1"), n.style.transform = "translate(0,0)"
			}, t
		}();
	e["default"] = p
}, function(t, e, n) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			"default": t
		}
	}

	function o(t, e) {
		E.prototype[e] = E.prototype[e.toUpperCase()] = E.prototype[e.toLowerCase()] = function(n, r) {
			var o = this;
			return o._errorHandler.wrapBarcodeCall(function() {
				r.text = "undefined" == typeof r.text ? void 0 : "" + r.text;
				var a = (0, l["default"])(o._options, r);
				a = (0, _["default"])(a);
				var u = t[e],
					s = i(n, u, a);
				return o._encodings.push(s), o
			})
		}
	}

	function i(t, e, n) {
		t = "" + t;
		var r = new e(t, n);
		if (!r.valid()) throw new m.InvalidInputException(r.constructor.name, t);
		var o = r.encode();
		o = (0, h["default"])(o);
		for (var i = 0; i < o.length; i++) o[i].options = (0, l["default"])(n, o[i].options);
		return o
	}

	function a() {
		return c["default"].CODE128 ? "CODE128" : Object.keys(c["default"])[0]
	}

	function u(t, e, n) {
		e = (0, h["default"])(e);
		for (var r = 0; r < e.length; r++) e[r].options = (0, l["default"])(n, e[r].options), (0, y["default"])(e[r].options);
		(0, y["default"])(n);
		var o = t.renderer,
			i = new o(t.element, e, n);
		i.render(), t.afterRender && t.afterRender()
	}
	var s = n(10),
		c = r(s),
		f = n(3),
		l = r(f),
		p = n(14),
		h = r(p),
		d = n(12),
		y = r(d),
		b = n(13),
		g = r(b),
		v = n(7),
		_ = r(v),
		w = n(11),
		x = r(w),
		m = n(6),
		O = n(8),
		C = r(O),
		E = function() {},
		j = function(t, e, n) {
			var r = new E;
			if ("undefined" == typeof t) throw Error("No element to render on was provided.");
			return r._renderProperties = (0, g["default"])(t), r._encodings = [], r._options = C["default"], r._errorHandler = new x["default"](r), "undefined" != typeof e && (n = n || {}, n.format || (n.format = a()), r.options(n)[n.format](e, n).render()), r
		};
	j.getModule = function(t) {
		return c["default"][t]
	};
	for (var P in c["default"]) c["default"].hasOwnProperty(P) && o(c["default"], P);
	E.prototype.options = function(t) {
		return this._options = (0, l["default"])(this._options, t), this
	}, E.prototype.blank = function(t) {
		var e = "0".repeat(t);
		return this._encodings.push({
			data: e
		}), this
	}, E.prototype.init = function() {
		if (this._renderProperties) {
			Array.isArray(this._renderProperties) || (this._renderProperties = [this._renderProperties]);
			var t;
			for (var e in this._renderProperties) {
				t = this._renderProperties[e];
				var n = (0, l["default"])(this._options, t.options);
				"auto" == n.format && (n.format = a()), this._errorHandler.wrapBarcodeCall(function() {
					var e = n.value,
						r = c["default"][n.format.toUpperCase()],
						o = i(e, r, n);
					u(t, o, n)
				})
			}
		}
	}, E.prototype.render = function() {
		if (!this._renderProperties) throw new m.NoElementException;
		if (Array.isArray(this._renderProperties))
			for (var t = 0; t < this._renderProperties.length; t++) u(this._renderProperties[t], this._encodings, this._options);
		else u(this._renderProperties, this._encodings, this._options);
		return this
	}, E.prototype._defaults = C["default"], "undefined" != typeof window && (window.JsBarcode = j), "undefined" != typeof jQuery && (jQuery.fn.JsBarcode = function(t, e) {
		var n = [];
		return jQuery(this).each(function() {
			n.push(this)
		}), j(n, t, e)
	}), t.exports = j
}]);