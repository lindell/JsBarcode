/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _barcodes = __webpack_require__(13);

	var _barcodes2 = _interopRequireDefault(_barcodes);

	var _canvas = __webpack_require__(79);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _svg = __webpack_require__(81);

	var _svg2 = _interopRequireDefault(_svg);

	var _merge = __webpack_require__(80);

	var _merge2 = _interopRequireDefault(_merge);

	var _linearizeEncodings = __webpack_require__(82);

	var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

	var _fixOptions = __webpack_require__(83);

	var _fixOptions2 = _interopRequireDefault(_fixOptions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Import the renderers

	var renderers = {
		"canvas": _canvas2.default,
		"svg": _svg2.default
	};

	// Help functions
	// Import all the barcodes


	var barcodesAPIs = {};

	// The first call of the library API
	// Will generate a
	var JsBarcode = function JsBarcode(element, text, options) {
		var api = {};
		for (var key in barcodesAPIs) {
			api[key] = barcodesAPIs[key];
		}

		if (typeof element === "undefined") {
			return api;
		}

		options = options || {};

		// Parts of the API that is not the barcodes
		api.render = renderCall;
		api.options = optionsCall;
		api.blank = blankCall;

		// Variables that will be pased through the API calls
		api._renderProperties = getRenderProperies(element);
		api._encodings = [];
		api._options = defaults;

		// If text is set, use simple syntax
		if (typeof text !== "undefined") {
			if (!options.format) {
				options.format = autoSelectBarcode();
			}

			api.options(options);
			api[options.format](text, options);
			api.render();
		}

		return api;
	};

	// To make tests work TODO: remove
	JsBarcode.getModule = function (name) {
		return _barcodes2.default[name];
	};

	// Register all barcodes
	for (var name in _barcodes2.default) {
		registerBarcode(_barcodes2.default, name);
	}
	function registerBarcode(barcodes, name) {
		barcodesAPIs[name] = barcodesAPIs[name.toUpperCase()] = barcodesAPIs[name.toLowerCase()] = function (text, options) {
			var newOptions = (0, _merge2.default)(this._options, options);

			var Encoder = barcodes[name];
			var encoder = new Encoder(text, newOptions);

			if (!encoder.valid()) {
				if (this._options.valid === defaults.valid) {
					throw new Error('"' + text + '" is not a valid input for ' + name);
				} else {
					this._options.valid(false);
				}
			}

			var encoded = encoder.encode();
			encoded = (0, _linearizeEncodings2.default)(encoded);

			for (var i in encoded) {
				encoded[i].options = (0, _merge2.default)(newOptions, encoded[i].options);
			}

			this._encodings.push(encoded);

			return this;
		};
	}

	function autoSelectBarcode() {
		// If CODE128 exists. Use it
		if (barcodesAPIs["CODE128"]) {
			return "CODE128";
		}

		// Else, take the first (probably only) barcode
		return (0, _keys2.default)(barcodesAPIs)[0];
	}

	// Sets global encoder options
	// Added to the api by the JsBarcode function
	function optionsCall(options) {
		this._options = (0, _merge2.default)(this._options, options);
		return this;
	}

	// Will create a blank space (usually in between barcodes)
	function blankCall(size) {
		var zeroes = "0".repeat(size);
		this._encodings.push({ data: zeroes });
		return this;
	}

	// Prepares the encodings and calls the renderer
	// Added to the api by the JsBarcode function
	function renderCall() {
		var renderer = renderers[this._renderProperties.renderer];

		var encodings = (0, _linearizeEncodings2.default)(this._encodings);

		for (var i in encodings) {
			encodings[i].options = (0, _merge2.default)(this._options, encodings[i].options);
			(0, _fixOptions2.default)(encodings[i].options);
		}

		(0, _fixOptions2.default)(this._options);

		renderer(this._renderProperties.element, encodings, this._options);

		if (this._renderProperties.afterRender) {
			this._renderProperties.afterRender();
		}

		this._options.valid(true);

		return this;
	}

	if (typeof window !== "undefined") {
		window.JsBarcode = JsBarcode;
	}
	module.exports = JsBarcode;

	// Takes an element and returns an object with information about how
	//it should be rendered
	// {
	//   element: The element that the renderer should draw on
	//   renderer: The name of the renderer
	//   afterRender (optional): If something has to done after the renderer
	//     completed, calls afterRender (function)
	// }
	function getRenderProperies(element) {
		// If the element is a string, query select call again
		if (typeof element === "string") {
			element = document.querySelector(element);
			return getRenderProperies(element);
		}
		// If element, render on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				var canvas = document.createElement('canvas');
				return {
					element: canvas,
					renderer: "canvas",
					afterRender: function afterRender() {
						element.setAttribute("src", canvas.toDataURL());
					}
				};
			} else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
				return {
					element: element,
					renderer: "svg"
				};
			}
			// If canvas
			else if (element.getContext) {
					return {
						element: element,
						renderer: "canvas"
					};
				} else {
					throw new Error("Not supported type to render on.");
				}
	};

	var defaults = {
		width: 2,
		height: 100,
		format: "auto",
		displayValue: true,
		fontOptions: "",
		font: "monospace",
		textAlign: "center",
		textPosition: "bottom",
		textMargin: 2,
		fontSize: 20,
		background: "#ffffff",
		lineColor: "#000000",
		margin: 10,
		marginTop: undefined,
		marginBottom: undefined,
		marginLeft: undefined,
		marginRight: undefined,
		valid: function valid(_valid) {}
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(9).Object.keys;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(4);

	__webpack_require__(6)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(7)
	  , core    = __webpack_require__(9)
	  , fails   = __webpack_require__(12);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(8)
	  , core      = __webpack_require__(9)
	  , ctx       = __webpack_require__(10)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CODE = __webpack_require__(14);

	var _CODE2 = _interopRequireDefault(_CODE);

	var _CODE3 = __webpack_require__(20);

	var _EAN_UPC = __webpack_require__(61);

	var _ITF = __webpack_require__(68);

	var _ITF2 = _interopRequireDefault(_ITF);

	var _ITF3 = __webpack_require__(69);

	var _ITF4 = _interopRequireDefault(_ITF3);

	var _MSI = __webpack_require__(70);

	var _pharmacode = __webpack_require__(77);

	var _pharmacode2 = _interopRequireDefault(_pharmacode);

	var _GenericBarcode = __webpack_require__(78);

	var _GenericBarcode2 = _interopRequireDefault(_GenericBarcode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  CODE39: _CODE2.default,
	  CODE128: _CODE3.CODE128, CODE128A: _CODE3.CODE128A, CODE128B: _CODE3.CODE128B, CODE128C: _CODE3.CODE128C,
	  EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC,
	  ITF14: _ITF2.default,
	  ITF: _ITF4.default,
	  MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
	  pharmacode: _pharmacode2.default,
	  GenericBarcode: _GenericBarcode2.default
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CODE39 = function () {
		function CODE39(string) {
			(0, _classCallCheck3.default)(this, CODE39);

			this.string = string.toUpperCase();

			this.encodings = {
				"0": 20957, "1": 29783, "2": 23639, "3": 30485,
				"4": 20951, "5": 29813, "6": 23669, "7": 20855,
				"8": 29789, "9": 23645, "A": 29975, "B": 23831,
				"C": 30533, "D": 22295, "E": 30149, "F": 24005,
				"G": 21623, "H": 29981, "I": 23837, "J": 22301,
				"K": 30023, "L": 23879, "M": 30545, "N": 22343,
				"O": 30161, "P": 24017, "Q": 21959, "R": 30065,
				"S": 23921, "T": 22385, "U": 29015, "V": 18263,
				"W": 29141, "X": 17879, "Y": 29045, "Z": 18293,
				"-": 17783, ".": 29021, " ": 18269, "$": 17477,
				"/": 17489, "+": 17681, "%": 20753, "*": 35770
			};
		}

		(0, _createClass3.default)(CODE39, [{
			key: "encode",
			value: function encode() {
				var result = "";
				result += this.encodings["*"].toString(2);
				for (var i = 0; i < this.string.length; i++) {
					result += this.encodings[this.string[i]].toString(2) + "0";
				}
				result += this.encodings["*"].toString(2);

				return { data: result, text: this.string };
			}
		}, {
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
			}
		}]);
		return CODE39;
	}();

	exports.default = CODE39;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(17);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(19);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

	var _CODE128_AUTO = __webpack_require__(21);

	var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

	var _CODE128A = __webpack_require__(58);

	var _CODE128A2 = _interopRequireDefault(_CODE128A);

	var _CODE128B = __webpack_require__(59);

	var _CODE128B2 = _interopRequireDefault(_CODE128B);

	var _CODE128C = __webpack_require__(60);

	var _CODE128C2 = _interopRequireDefault(_CODE128C);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CODE128 = _CODE128_AUTO2.default;
	exports.CODE128A = _CODE128A2.default;
	exports.CODE128B = _CODE128B2.default;
	exports.CODE128C = _CODE128C2.default;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _CODE2 = __webpack_require__(57);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CODE128AUTO = function (_CODE) {
		(0, _inherits3.default)(CODE128AUTO, _CODE);

		function CODE128AUTO(string) {
			(0, _classCallCheck3.default)(this, CODE128AUTO);


			// ASCII value ranges 0-127, 200-211

			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128AUTO).call(this, string));

			if (string.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1) {
				var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128AUTO).call(this, autoSelectModes(string)));
			} else {
				var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128AUTO).call(this, string));
			}
			return (0, _possibleConstructorReturn3.default)(_this);
		}

		return CODE128AUTO;
	}(_CODE3.default);

	function autoSelectModes(string) {
		// ASCII ranges 0-98 and 200-207 (FUNCs and SHIFTs)
		var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
		// ASCII ranges 32-127 and 200-207 (FUNCs and SHIFTs)
		var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
		// Number pairs or [FNC1]
		var cLength = string.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;

		var newString;
		// Select CODE128C if the string start with enough digits
		if (cLength >= 2) {
			newString = String.fromCharCode(210) + autoSelectFromC(string);
		}
		// Select A/C depending on the longest match
		else if (aLength > bLength) {
				newString = String.fromCharCode(208) + autoSelectFromA(string);
			} else {
				newString = String.fromCharCode(209) + autoSelectFromB(string);
			}

		newString = newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function (match, char) {
			return String.fromCharCode(203) + char;
		});

		return newString;
	}

	function autoSelectFromA(string) {
		var untilC = string.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

		if (untilC) {
			return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
		}

		var aChars = string.match(/^[\x00-\x5F\xC8-\xCF]+/);
		if (aChars[0].length === string.length) {
			return string;
		}

		return aChars[0] + String.fromCharCode(205) + autoSelectFromB(string.substring(aChars[0].length));
	}

	function autoSelectFromB(string) {
		var untilC = string.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

		if (untilC) {
			return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
		}

		var bChars = string.match(/^[\x20-\x7F\xC8-\xCF]+/);
		if (bChars[0].length === string.length) {
			return string;
		}

		return bChars[0] + String.fromCharCode(206) + autoSelectFromA(string.substring(bChars[0].length));
	}

	function autoSelectFromC(string) {
		var cMatch = string.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0];
		var length = cMatch.length;

		if (length === string.length) {
			return string;
		}

		string = string.substring(length);

		// Select A/B depending on the longest match
		var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
		var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
		if (aLength >= bLength) {
			return cMatch + String.fromCharCode(206) + autoSelectFromA(string);
		} else {
			return cMatch + String.fromCharCode(205) + autoSelectFromB(string);
		}
	}

	exports.default = CODE128AUTO;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	module.exports = __webpack_require__(9).Object.getPrototypeOf;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(4);

	__webpack_require__(6)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(26);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(27)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	__webpack_require__(49);
	module.exports = __webpack_require__(9).Symbol;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(19)
	  , global         = __webpack_require__(8)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(31)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(32)
	  , $fails         = __webpack_require__(12)
	  , shared         = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(36)
	  , uid            = __webpack_require__(38)
	  , wks            = __webpack_require__(37)
	  , keyOf          = __webpack_require__(39)
	  , $names         = __webpack_require__(43)
	  , enumKeys       = __webpack_require__(44)
	  , isArray        = __webpack_require__(45)
	  , anObject       = __webpack_require__(46)
	  , toIObject      = __webpack_require__(40)
	  , createDesc     = __webpack_require__(34)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(48)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(19)
	  , createDesc = __webpack_require__(34);
	module.exports = __webpack_require__(31) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(8)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).setDesc
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(37)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(35)('wks')
	  , uid    = __webpack_require__(38)
	  , Symbol = __webpack_require__(8).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(19)
	  , toIObject = __webpack_require__(40);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(41)
	  , defined = __webpack_require__(5);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(42);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(40)
	  , getNames  = __webpack_require__(19).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(19);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(42);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(47);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 49 */
/***/ function(module, exports) {

	

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(51)["default"];

	var _Object$setPrototypeOf = __webpack_require__(53)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(19);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	module.exports = __webpack_require__(9).Object.setPrototypeOf;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(7);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(56).set});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(19).getDesc
	  , isObject = __webpack_require__(47)
	  , anObject = __webpack_require__(46);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(10)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// This is the master class, it does require the start code to be
	//included in the string

	var CODE128 = function () {
		function CODE128(string) {
			(0, _classCallCheck3.default)(this, CODE128);

			// Fill the bytes variable with the ascii codes of string
			this.bytes = [];
			for (var i = 0; i < string.length; ++i) {
				this.bytes.push(string.charCodeAt(i));
			}

			// First element should be startcode, remove that
			this.string = string.substring(1);

			//Data for each character, the last characters will not be encoded but are used for error correction
			//Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
			this.encodings = [// + 1000
			740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, /* Start codes */668, 680, 692, 5379];
		}

		(0, _createClass3.default)(CODE128, [{
			key: "getText",
			value: function getText() {
				var string = this.string;

				/*
	   string = string.replace(String.fromCharCode(201), "[FNC3]");
	   string = string.replace(String.fromCharCode(202), "[FNC2]");
	   string = string.replace(String.fromCharCode(203), "[SHIFT]");
	   string = string.replace(String.fromCharCode(207), "[FNC1]");
	   */

				return string.replace(/[^\x20-\x7E]/g, "");
			}

			// The public encoding function

		}, {
			key: "encode",
			value: function encode() {
				var encodingResult;
				var bytes = this.bytes;
				// Remove the startcode from the bytes and set its index
				var startIndex = bytes.shift() - 105;

				// Start encode with the right type
				if (startIndex === 103) {
					encodingResult = this.nextA(bytes, 1);
				} else if (startIndex === 104) {
					encodingResult = this.nextB(bytes, 1);
				} else if (startIndex === 105) {
					encodingResult = this.nextC(bytes, 1);
				}

				return { text: this.getText(),
					data:
					//Add the start bits
					this.getEncoding(startIndex) +
					//Add the encoded bits
					encodingResult.result +
					//Add the checksum
					this.getEncoding((encodingResult.checksum + startIndex) % 103) +
					//Add the end bits
					this.getEncoding(106)
				};
			}
		}, {
			key: "getEncoding",
			value: function getEncoding(n) {
				return this.encodings[n] ? (this.encodings[n] + 1000).toString(2) : '';
			}

			// Use the regexp variable for validation

		}, {
			key: "valid",
			value: function valid() {
				// ASCII value ranges 0-127, 200-211
				return this.string.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1;
			}
		}, {
			key: "nextA",
			value: function nextA(bytes, depth) {
				if (bytes.length <= 0) {
					return { "result": "", "checksum": 0 };
				}

				var next, index;

				// Special characters
				if (bytes[0] >= 200) {
					index = bytes[0] - 105;

					//Remove first element
					bytes.shift();

					// Swap to CODE128C
					if (index === 99) {
						next = this.nextC(bytes, depth + 1);
					}
					// Swap to CODE128B
					else if (index === 100) {
							next = this.nextB(bytes, depth + 1);
						}
						// Shift
						else if (index === 98) {
								// Convert the next character so that is encoded correctly
								bytes[0] = bytes[0] > 95 ? bytes[0] - 96 : bytes[0];
								next = this.nextA(bytes, depth + 1);
							}
							// Continue on CODE128A but encode a special character
							else {
									next = this.nextA(bytes, depth + 1);
								}
				}
				// Continue encoding of CODE128A
				else {
						var charCode = bytes[0];
						index = charCode < 32 ? charCode + 64 : charCode - 32;

						// Remove first element
						bytes.shift();

						next = this.nextA(bytes, depth + 1);
					}

				// Get the correct binary encoding and calculate the weight
				var enc = this.getEncoding(index);
				var weight = index * depth;

				return {
					"result": enc + next.result,
					"checksum": weight + next.checksum
				};
			}
		}, {
			key: "nextB",
			value: function nextB(bytes, depth) {
				if (bytes.length <= 0) {
					return { "result": "", "checksum": 0 };
				}

				var next, index;

				// Special characters
				if (bytes[0] >= 200) {
					index = bytes[0] - 105;

					//Remove first element
					bytes.shift();

					// Swap to CODE128C
					if (index === 99) {
						next = this.nextC(bytes, depth + 1);
					}
					// Swap to CODE128A
					else if (index === 101) {
							next = this.nextA(bytes, depth + 1);
						}
						// Shift
						else if (index === 98) {
								// Convert the next character so that is encoded correctly
								bytes[0] = bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
								next = this.nextB(bytes, depth + 1);
							}
							// Continue on CODE128B but encode a special character
							else {
									next = this.nextB(bytes, depth + 1);
								}
				}
				// Continue encoding of CODE128B
				else {
						index = bytes[0] - 32;
						bytes.shift();
						next = this.nextB(bytes, depth + 1);
					}

				// Get the correct binary encoding and calculate the weight
				var enc = this.getEncoding(index);
				var weight = index * depth;

				return { "result": enc + next.result, "checksum": weight + next.checksum };
			}
		}, {
			key: "nextC",
			value: function nextC(bytes, depth) {
				if (bytes.length <= 0) {
					return { "result": "", "checksum": 0 };
				}

				var next, index;

				// Special characters
				if (bytes[0] >= 200) {
					index = bytes[0] - 105;

					// Remove first element
					bytes.shift();

					// Swap to CODE128B
					if (index === 100) {
						next = this.nextB(bytes, depth + 1);
					}
					// Swap to CODE128A
					else if (index === 101) {
							next = this.nextA(bytes, depth + 1);
						}
						// Continue on CODE128C but encode a special character
						else {
								next = this.nextC(bytes, depth + 1);
							}
				}
				// Continue encoding of CODE128C
				else {
						index = (bytes[0] - 48) * 10 + bytes[1] - 48;
						bytes.shift();
						bytes.shift();
						next = this.nextC(bytes, depth + 1);
					}

				// Get the correct binary encoding and calculate the weight
				var enc = this.getEncoding(index);
				var weight = index * depth;

				return { "result": enc + next.result, "checksum": weight + next.checksum };
			}
		}]);
		return CODE128;
	}();

	exports.default = CODE128;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _CODE2 = __webpack_require__(57);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CODE128A = function (_CODE) {
		(0, _inherits3.default)(CODE128A, _CODE);

		function CODE128A(string) {
			(0, _classCallCheck3.default)(this, CODE128A);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128A).call(this, String.fromCharCode(208) + string));
		}

		(0, _createClass3.default)(CODE128A, [{
			key: 'valid',
			value: function valid() {
				return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
			}
		}]);
		return CODE128A;
	}(_CODE3.default);

	exports.default = CODE128A;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _CODE2 = __webpack_require__(57);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CODE128B = function (_CODE) {
		(0, _inherits3.default)(CODE128B, _CODE);

		function CODE128B(string) {
			(0, _classCallCheck3.default)(this, CODE128B);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128B).call(this, String.fromCharCode(209) + string));
		}

		(0, _createClass3.default)(CODE128B, [{
			key: 'valid',
			value: function valid() {
				return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
			}
		}]);
		return CODE128B;
	}(_CODE3.default);

	exports.default = CODE128B;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _CODE2 = __webpack_require__(57);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CODE128C = function (_CODE) {
		(0, _inherits3.default)(CODE128C, _CODE);

		function CODE128C(string) {
			(0, _classCallCheck3.default)(this, CODE128C);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128C).call(this, String.fromCharCode(210) + string));
		}

		(0, _createClass3.default)(CODE128C, [{
			key: 'valid',
			value: function valid() {
				return this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
			}
		}]);
		return CODE128C;
	}(_CODE3.default);

	exports.default = CODE128C;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

	var _EAN = __webpack_require__(62);

	var _EAN2 = _interopRequireDefault(_EAN);

	var _EAN3 = __webpack_require__(64);

	var _EAN4 = _interopRequireDefault(_EAN3);

	var _EAN5 = __webpack_require__(65);

	var _EAN6 = _interopRequireDefault(_EAN5);

	var _EAN7 = __webpack_require__(66);

	var _EAN8 = _interopRequireDefault(_EAN7);

	var _UPC = __webpack_require__(67);

	var _UPC2 = _interopRequireDefault(_UPC);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.EAN13 = _EAN2.default;
	exports.EAN8 = _EAN4.default;
	exports.EAN5 = _EAN6.default;
	exports.EAN2 = _EAN8.default;
	exports.UPC = _UPC2.default;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _ean_encoder = __webpack_require__(63);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EAN13 = function () {
		function EAN13(string, options) {
			(0, _classCallCheck3.default)(this, EAN13);

			//Add checksum if it does not exist
			if (string.search(/^[0-9]{12}$/) != -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}

			// Define the EAN-13 structure
			this.structure = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

			if (options.fontSize > options.width * 10) {
				this.fontSize = options.width * 10;
			} else {
				this.fontSize = options.fontSize;
			}

			this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
		}

		(0, _createClass3.default)(EAN13, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9]{13}$/) !== -1 && this.string[12] == this.checksum(this.string);
			}
		}, {
			key: "encode",
			value: function encode() {
				var encoder = new _ean_encoder2.default();
				var result = [];

				var structure = this.structure[this.string[0]];

				//Get the string to be encoded on the left side of the EAN code
				var leftSide = this.string.substr(1, 6);

				//Get the string to be encoded on the right side of the EAN code
				var rightSide = this.string.substr(7, 6);

				// Add the first digigt
				result.push({
					data: "000000000000",
					text: this.string[0],
					options: { textAlign: "left", fontSize: this.fontSize }
				});

				//Add the guard bars
				result.push({
					data: "101",
					options: { height: this.guardHeight }
				});

				//Add the left side
				result.push({
					data: encoder.encode(leftSide, structure),
					text: leftSide,
					options: { fontSize: this.fontSize }
				});

				//Add the middle bits
				result.push({
					data: "01010",
					options: { height: this.guardHeight }
				});

				//Add the right side
				result.push({
					data: encoder.encode(rightSide, "RRRRRR"),
					text: rightSide,
					options: { fontSize: this.fontSize }
				});

				//Add the end bits
				result.push({
					data: "101",
					options: { height: this.guardHeight }
				});

				return result;
			}

			//Calulate the checksum digit

		}, {
			key: "checksum",
			value: function checksum(number) {
				var result = 0;

				var i;
				for (i = 0; i < 12; i += 2) {
					result += parseInt(number[i]);
				}
				for (i = 1; i < 12; i += 2) {
					result += parseInt(number[i]) * 3;
				}

				return (10 - result % 10) % 10;
			}
		}]);
		return EAN13;
	}();

	exports.default = EAN13;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EANencoder = function () {
		function EANencoder() {
			(0, _classCallCheck3.default)(this, EANencoder);

			this.startBin = "101";
			this.endBin = "101";
			this.middleBin = "01010";

			//The L (left) type of encoding
			this.Lbinary = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];

			//The G type of encoding
			this.Gbinary = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];

			//The R (right) type of encoding
			this.Rbinary = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
		}

		//Convert a numberarray to the representing


		(0, _createClass3.default)(EANencoder, [{
			key: "encode",
			value: function encode(number, structure, separator) {
				//Create the variable that should be returned at the end of the function
				var result = "";

				separator = typeof separator === "undefined" ? "" : separator;

				//Loop all the numbers
				for (var i = 0; i < number.length; i++) {
					//Using the L, G or R encoding and add it to the returning variable
					if (structure[i] == "L") {
						result += this.Lbinary[number[i]];
					} else if (structure[i] == "G") {
						result += this.Gbinary[number[i]];
					} else if (structure[i] == "R") {
						result += this.Rbinary[number[i]];
					}

					// Add separator
					if (i < number.length - 1) {
						result += separator;
					}
				}
				return result;
			}
		}]);
		return EANencoder;
	}();

	exports.default = EANencoder;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _ean_encoder = __webpack_require__(63);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EAN8 = function () {
		function EAN8(string) {
			(0, _classCallCheck3.default)(this, EAN8);

			//Add checksum if it does not exist
			if (string.search(/^[0-9]{7}$/) !== -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}
		}

		(0, _createClass3.default)(EAN8, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9]{8}$/) !== -1 && this.string[7] == this.checksum(this.string);
			}
		}, {
			key: "encode",
			value: function encode() {
				var encoder = new _ean_encoder2.default();

				//Create the return variable
				var result = "";

				//Get the number to be encoded on the left side of the EAN code
				var leftSide = this.string.substr(0, 4);

				//Get the number to be encoded on the right side of the EAN code
				var rightSide = this.string.substr(4, 4);

				//Add the start bits
				result += encoder.startBin;

				//Add the left side
				result += encoder.encode(leftSide, "LLLL");

				//Add the middle bits
				result += encoder.middleBin;

				//Add the right side
				result += encoder.encode(rightSide, "RRRR");

				//Add the end bits
				result += encoder.endBin;

				return {
					data: result,
					text: this.string
				};
			}

			//Calulate the checksum digit

		}, {
			key: "checksum",
			value: function checksum(number) {
				var result = 0;

				var i;
				for (i = 0; i < 7; i += 2) {
					result += parseInt(number[i]) * 3;
				}
				for (i = 1; i < 7; i += 2) {
					result += parseInt(number[i]);
				}

				return (10 - result % 10) % 10;
			}
		}]);
		return EAN8;
	}();

	exports.default = EAN8;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _ean_encoder = __webpack_require__(63);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EAN5 = function () {
		function EAN5(string) {
			(0, _classCallCheck3.default)(this, EAN5);

			this.string = string;

			this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
		}

		(0, _createClass3.default)(EAN5, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9]{5}$/) !== -1;
			}
		}, {
			key: "encode",
			value: function encode() {
				var encoder = new _ean_encoder2.default();

				var result = "1011" + encoder.encode(this.string, this.structure[this.checksum(this.string)], "01");

				return {
					data: result,
					text: this.string
				};
			}
		}, {
			key: "checksum",
			value: function checksum() {
				var result = 0;

				var i;
				for (i = 0; i < 5; i += 2) {
					result += parseInt(this.string[i]) * 3;
				}
				for (i = 1; i < 5; i += 2) {
					result += parseInt(this.string[i]) * 9;
				}

				return result % 10;
			}
		}]);
		return EAN5;
	}();

	exports.default = EAN5;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _ean_encoder = __webpack_require__(63);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EAN2 = function () {
		function EAN2(string) {
			(0, _classCallCheck3.default)(this, EAN2);

			this.string = string;

			this.structure = ["LL", "LG", "GL", "GG"];
		}

		(0, _createClass3.default)(EAN2, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9]{2}$/) !== -1;
			}
		}, {
			key: "encode",
			value: function encode() {
				var encoder = new _ean_encoder2.default();

				var result = "1011" + encoder.encode(this.string, this.structure[parseInt(this.string) % 4], "01");

				return {
					data: result,
					text: this.string
				};
			}
		}]);
		return EAN2;
	}();

	exports.default = EAN2;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EAN2 = __webpack_require__(62);

	var _EAN3 = _interopRequireDefault(_EAN2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UPC = function (_EAN) {
		(0, _inherits3.default)(UPC, _EAN);

		function UPC(string, options) {
			(0, _classCallCheck3.default)(this, UPC);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UPC).call(this, "0" + string, options));
		}

		return UPC;
	}(_EAN3.default);

	exports.default = UPC;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ITF14 = function () {
		function ITF14(string) {
			(0, _classCallCheck3.default)(this, ITF14);

			this.string = string;

			// Add checksum if it does not exist
			if (string.search(/^[0-9]{13}$/) !== -1) {
				this.string += this.checksum(string);
			}

			this.binaryRepresentation = {
				"0": "00110",
				"1": "10001",
				"2": "01001",
				"3": "11000",
				"4": "00101",
				"5": "10100",
				"6": "01100",
				"7": "00011",
				"8": "10010",
				"9": "01010"
			};
		}

		(0, _createClass3.default)(ITF14, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9]{14}$/) !== -1 && this.string[13] == this.checksum();
			}
		}, {
			key: "encode",
			value: function encode() {
				var result = "1010";

				//Calculate all the digit pairs
				for (var i = 0; i < 14; i += 2) {
					result += this.calculatePair(this.string.substr(i, 2));
				}

				//Always add the same end bits
				result += "11101";

				return {
					data: result,
					text: this.string
				};
			}

			//Calculate the data of a number pair

		}, {
			key: "calculatePair",
			value: function calculatePair(numberPair) {
				var result = "";

				var number1Struct = this.binaryRepresentation[numberPair[0]];
				var number2Struct = this.binaryRepresentation[numberPair[1]];

				//Take every second bit and add to the result
				for (var i = 0; i < 5; i++) {
					result += number1Struct[i] == "1" ? "111" : "1";
					result += number2Struct[i] == "1" ? "000" : "0";
				}

				return result;
			}

			//Calulate the checksum digit

		}, {
			key: "checksum",
			value: function checksum() {
				var result = 0;

				for (var i = 0; i < 13; i++) {
					result += parseInt(this.string[i]) * (3 - i % 2 * 2);
				}

				return 10 - result % 10;
			}
		}]);
		return ITF14;
	}();

	exports.default = ITF14;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ITF = function () {
		function ITF(string) {
			(0, _classCallCheck3.default)(this, ITF);

			this.string = string;

			this.binaryRepresentation = {
				"0": "00110",
				"1": "10001",
				"2": "01001",
				"3": "11000",
				"4": "00101",
				"5": "10100",
				"6": "01100",
				"7": "00011",
				"8": "10010",
				"9": "01010"
			};
		}

		(0, _createClass3.default)(ITF, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^([0-9]{2})+$/) !== -1;
			}
		}, {
			key: "encode",
			value: function encode() {
				//Always add the same start bits
				var result = "1010";

				//Calculate all the digit pairs
				for (var i = 0; i < this.string.length; i += 2) {
					result += this.calculatePair(this.string.substr(i, 2));
				}

				//Always add the same end bits
				result += "11101";

				return {
					data: result,
					text: this.string
				};
			}

			//Calculate the data of a number pair

		}, {
			key: "calculatePair",
			value: function calculatePair(numberPair) {
				var result = "";

				var number1Struct = this.binaryRepresentation[numberPair[0]];
				var number2Struct = this.binaryRepresentation[numberPair[1]];

				//Take every second bit and add to the result
				for (var i = 0; i < 5; i++) {
					result += number1Struct[i] == "1" ? "111" : "1";
					result += number2Struct[i] == "1" ? "000" : "0";
				}

				return result;
			}
		}]);
		return ITF;
	}();

	exports.default = ITF;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

	var _MSI = __webpack_require__(71);

	var _MSI2 = _interopRequireDefault(_MSI);

	var _MSI3 = __webpack_require__(72);

	var _MSI4 = _interopRequireDefault(_MSI3);

	var _MSI5 = __webpack_require__(74);

	var _MSI6 = _interopRequireDefault(_MSI5);

	var _MSI7 = __webpack_require__(75);

	var _MSI8 = _interopRequireDefault(_MSI7);

	var _MSI9 = __webpack_require__(76);

	var _MSI10 = _interopRequireDefault(_MSI9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.MSI = _MSI2.default;
	exports.MSI10 = _MSI4.default;
	exports.MSI11 = _MSI6.default;
	exports.MSI1010 = _MSI8.default;
	exports.MSI1110 = _MSI10.default;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MSI = function () {
		function MSI(string) {
			(0, _classCallCheck3.default)(this, MSI);

			this.string = string;
		}

		(0, _createClass3.default)(MSI, [{
			key: "encode",
			value: function encode() {
				var ret = "110";

				for (var i = 0; i < this.string.length; i++) {
					var digit = parseInt(this.string[i]);
					var bin = digit.toString(2);
					bin = addZeroes(bin, 4 - bin.length);
					for (var b = 0; b < bin.length; b++) {
						ret += bin[b] == "0" ? "100" : "110";
					}
				}

				ret += "1001";
				return {
					data: ret,
					text: this.string
				};
			}
		}, {
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9]+$/) !== -1;
			}
		}]);
		return MSI;
	}();

	function addZeroes(number, n) {
		for (var i = 0; i < n; i++) {
			number = "0" + number;
		}
		return number;
	}

	exports.default = MSI;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _MSI2 = __webpack_require__(71);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MSI10 = function (_MSI) {
		(0, _inherits3.default)(MSI10, _MSI);

		function MSI10(string) {
			(0, _classCallCheck3.default)(this, MSI10);

			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MSI10).call(this, string));

			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI10;
	}(_MSI3.default);

	exports.default = MSI10;

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mod10 = mod10;
	exports.mod11 = mod11;
	function mod10(number) {
		var sum = 0;
		for (var i = 0; i < number.length; i++) {
			var n = parseInt(number[i]);
			if ((i + number.length) % 2 === 0) {
				sum += n;
			} else {
				sum += n * 2 % 10 + Math.floor(n * 2 / 10);
			}
		}
		return (10 - sum % 10) % 10;
	}

	function mod11(number) {
		var sum = 0;
		var weights = [2, 3, 4, 5, 6, 7];
		for (var i = 0; i < number.length; i++) {
			var n = parseInt(number[number.length - 1 - i]);
			sum += weights[i % weights.length] * n;
		}
		return (11 - sum % 11) % 11;
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _MSI2 = __webpack_require__(71);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MSI11 = function (_MSI) {
		(0, _inherits3.default)(MSI11, _MSI);

		function MSI11(string) {
			(0, _classCallCheck3.default)(this, MSI11);

			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MSI11).call(this, string));

			_this.string += (0, _checksums.mod11)(_this.string);
			return _this;
		}

		return MSI11;
	}(_MSI3.default);

	exports.default = MSI11;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _MSI2 = __webpack_require__(71);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MSI1010 = function (_MSI) {
		(0, _inherits3.default)(MSI1010, _MSI);

		function MSI1010(string) {
			(0, _classCallCheck3.default)(this, MSI1010);

			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MSI1010).call(this, string));

			_this.string += (0, _checksums.mod10)(_this.string);
			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI1010;
	}(_MSI3.default);

	exports.default = MSI1010;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(22);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(25);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(50);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _MSI2 = __webpack_require__(71);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MSI1110 = function (_MSI) {
		(0, _inherits3.default)(MSI1110, _MSI);

		function MSI1110(string) {
			(0, _classCallCheck3.default)(this, MSI1110);

			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MSI1110).call(this, string));

			_this.string += (0, _checksums.mod11)(_this.string);
			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI1110;
	}(_MSI3.default);

	exports.default = MSI1110;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pharmacode = function () {
	  function pharmacode(string) {
	    (0, _classCallCheck3.default)(this, pharmacode);

	    this.number = parseInt(string);
	  }

	  (0, _createClass3.default)(pharmacode, [{
	    key: "encode",
	    value: function encode() {
	      return {
	        data: recursiveEncoding(this.number.toString(2), true).substr(2),
	        text: this.number + ""
	      };
	    }
	  }, {
	    key: "valid",
	    value: function valid() {
	      return this.number >= 3 && this.number <= 131070;
	    }
	  }]);
	  return pharmacode;
	}();

	function recursiveEncoding(code, state) {
	  // TODO explanation needed

	  //End condition
	  if (code.length === 0) return "";

	  var generated;
	  var nextState = false;
	  var nzeroes = zeroes(code);
	  if (nzeroes === 0) {
	    generated = state ? "001" : "00111";
	    nextState = state;
	  } else {
	    generated = "001".repeat(nzeroes - (state ? 1 : 0));
	    generated += "00111";
	  }
	  return recursiveEncoding(code.substr(0, code.length - nzeroes - 1), nextState) + generated;
	}

	//http://stackoverflow.com/a/202627
	String.prototype.repeat = function (num) {
	  return new Array(num + 1).join(this);
	};

	//A help function to calculate the zeroes at the end of a string (the code)
	function zeroes(code) {
	  var i = code.length - 1;
	  var zeroes = 0;
	  while (code[i] == "0" || i < 0) {
	    zeroes++;
	    i--;
	  }
	  return zeroes;
	}

	exports.default = pharmacode;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(15);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(16);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GenericBarcode = function () {
		function GenericBarcode(string) {
			(0, _classCallCheck3.default)(this, GenericBarcode);

			this.string = string;
		}

		//Return the corresponding binary numbers for the data provided


		(0, _createClass3.default)(GenericBarcode, [{
			key: "encode",
			value: function encode() {
				return {
					data: "10101010101010101010101010101010101010101",
					text: this.string
				};
			}

			//Resturn true/false if the string provided is valid for this encoder

		}, {
			key: "valid",
			value: function valid() {
				return true;
			}
		}]);
		return GenericBarcode;
	}();

	exports.default = GenericBarcode;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _merge = __webpack_require__(80);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = renderCanvas;


	function renderCanvas(canvas, encodings, options) {
		//Abort if the browser does not support HTML5 canvas
		if (!canvas.getContext) {
			throw new Error('The browser does not support canvas.');
		}

		prepareCanvas(canvas, options, encodings);
		for (var i in encodings) {
			var encodingOptions = (0, _merge2.default)(options, encodings[i].options);

			drawCanvasBarcode(canvas, encodingOptions, encodings[i]);
			drawCanvasText(canvas, encodingOptions, encodings[i]);

			moveCanvasDrawing(canvas, encodings[i]);
		}

		restoreCanvas(canvas);
	}

	function prepareCanvas(canvas, options, encodings) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		ctx.save();

		// Calculate total width
		var totalWidth = 0;
		var maxHeight = 0;
		for (var i in encodings) {
			var _options = (0, _merge2.default)(_options, encodings[i].options);

			// Set font
			ctx.font = _options.fontOptions + " " + _options.fontSize + "px " + _options.font;

			// Calculate the width of the encoding
			var textWidth = ctx.measureText(encodings[i].text).width;
			var barcodeWidth = encodings[i].data.length * _options.width;
			encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

			// Calculate the height of the encoding
			var height = _options.height + (_options.displayValue && encodings[i].text.length > 0 ? _options.fontSize : 0) + _options.textMargin + _options.marginTop + _options.marginBottom;

			var barcodePadding = 0;
			if (_options.displayValue && barcodeWidth < textWidth) {
				if (_options.textAlign == "center") {
					barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
				} else if (_options.textAlign == "left") {
					barcodePadding = 0;
				} else if (_options.textAlign == "right") {
					barcodePadding = Math.floor(textWidth - barcodeWidth);
				}
			}
			encodings[i].barcodePadding = barcodePadding;

			if (height > maxHeight) {
				maxHeight = height;
			}

			totalWidth += encodings[i].width;
		}

		canvas.width = totalWidth + options.marginLeft + options.marginRight;

		canvas.height = maxHeight;

		// Paint the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (options.background) {
			ctx.fillStyle = options.background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		ctx.translate(options.marginLeft, 0);
	}

	function drawCanvasBarcode(canvas, options, encoding) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		var binary = encoding.data;
		var text = encoding.text;

		// Creates the barcode out of the encoded binary
		var yFrom, yHeight;
		if (options.textPosition == "top") {
			yFrom = options.marginTop + options.fontSize + options.textMargin;
		} else {
			yFrom = options.marginTop;
		}
		yHeight = options.height;

		ctx.fillStyle = options.lineColor;

		for (var b in binary) {
			var x = b * options.width + encoding.barcodePadding;
			if (binary[b] === "0" && binary[b] === 0) {} else if (binary[b] === "1") {
				ctx.fillRect(x, yFrom, options.width, options.height);
			} else if (binary[b]) {
				ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
			}
		}
	}

	function drawCanvasText(canvas, options, encoding) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Draw the text if displayValue is set
		if (options.displayValue) {
			var x, y;

			if (options.textPosition == "top") {
				y = options.marginTop + options.fontSize - options.textMargin;
			} else {
				y = options.height + options.textMargin + options.marginTop + options.fontSize;
			}

			ctx.font = font;

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == "left" || encoding.barcodePadding > 0) {
				x = 0;
				ctx.textAlign = 'left';
			} else if (options.textAlign == "right") {
				x = encoding.width - 1;
				ctx.textAlign = 'right';
			}
			//In all other cases, center the text
			else {
					x = encoding.width / 2;
					ctx.textAlign = 'center';
				}

			ctx.fillText(encoding.text, x, y);
		}
	}

	function moveCanvasDrawing(canvas, encoding) {
		var ctx = canvas.getContext("2d");

		ctx.translate(encoding.width, 0);
	}

	function restoreCanvas(canvas) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		ctx.restore();
	}

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = merge;


	function merge(old, replaceObj) {
	  var newMerge = {};
	  var k;
	  for (k in old) {
	    newMerge[k] = old[k];
	  }
	  for (k in replaceObj) {
	    if (typeof replaceObj[k] !== "undefined") {
	      newMerge[k] = replaceObj[k];
	    }
	  }
	  return newMerge;
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _merge = __webpack_require__(80);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = renderSVG;


	var svgns = "http://www.w3.org/2000/svg";

	function renderSVG(svg, encodings, options) {
	  var currentX = options.marginLeft;

	  prepareSVG(svg, options, encodings);
	  for (var i in encodings) {
	    var encodingOptions = (0, _merge2.default)(options, encodings[i].options);

	    var group = createGroup(currentX, encodingOptions.marginTop, svg);

	    setGroupOptions(group, encodingOptions, encodings[i]);

	    drawSvgBarcode(group, encodingOptions, encodings[i]);
	    drawSVGText(group, encodingOptions, encodings[i]);

	    currentX += encodings[i].width;
	  }
	}

	function prepareSVG(svg, options, encodings) {
	  // Clear the SVG
	  while (svg.firstChild) {
	    svg.removeChild(svg.firstChild);
	  }

	  var totalWidth = 0;
	  var maxHeight = 0;
	  for (var i in encodings) {
	    var _options = (0, _merge2.default)(_options, encodings[i].options);

	    // Calculate the width of the encoding
	    var textWidth = messureSVGtext(encodings[i].text, svg, _options);
	    var barcodeWidth = encodings[i].data.length * _options.width;
	    encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

	    // Calculate the height of the encoding
	    var height = _options.height + (_options.displayValue && encodings[i].text.length > 0 ? _options.fontSize : 0) + _options.textMargin + _options.marginTop + _options.marginBottom;

	    var barcodePadding = 0;
	    if (_options.displayValue && barcodeWidth < textWidth) {
	      if (_options.textAlign == "center") {
	        barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
	      } else if (_options.textAlign == "left") {
	        barcodePadding = 0;
	      } else if (_options.textAlign == "right") {
	        barcodePadding = Math.floor(textWidth - barcodeWidth);
	      }
	    }
	    encodings[i].barcodePadding = barcodePadding;

	    if (height > maxHeight) {
	      maxHeight = height;
	    }

	    totalWidth += encodings[i].width;
	  }

	  var width = totalWidth + options.marginLeft + options.marginRight;
	  var height = maxHeight;

	  svg.setAttribute("width", width + "px");
	  svg.setAttribute("height", height + "px");
	  svg.setAttribute("x", "0px");
	  svg.setAttribute("y", "0px");
	  svg.setAttribute("viewBox", "0 0 " + width + " " + height);

	  if (options.background) {
	    svg.style.background = options.background;
	  }
	}

	function drawSvgBarcode(parent, options, encoding) {
	  var binary = encoding.data;
	  var text = encoding.text;

	  // Creates the barcode out of the encoded binary
	  var yFrom, yHeight;
	  if (options.textPosition == "top") {
	    yFrom = options.fontSize + options.textMargin;
	  } else {
	    yFrom = 0;
	  }
	  yHeight = options.height;

	  for (var b in binary) {
	    var x = b * options.width + encoding.barcodePadding;
	    if (binary[b] === "0" && binary[b] === 0) {} else if (binary[b] === "1") {
	      drawLine(x, yFrom, options.width, options.height, parent);
	    } else if (binary[b] > 0) {
	      drawLine(x, yFrom, options.width, options.height * binary[b], parent);
	    }
	  }
	}

	function drawSVGText(parent, options, encoding) {
	  var textElem = document.createElementNS(svgns, 'text');

	  // Draw the text if displayValue is set
	  if (options.displayValue) {
	    var x, y;

	    textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

	    if (options.textPosition == "top") {
	      y = options.fontSize - options.textMargin;
	    } else {
	      y = options.height + options.textMargin + options.fontSize;
	    }

	    // Draw the text in the correct X depending on the textAlign option
	    if (options.textAlign == "left" || encoding.barcodePadding > 0) {
	      x = 0;
	      textElem.setAttribute("text-anchor", "start");
	    } else if (options.textAlign == "right") {
	      x = encoding.width - 1;
	      textElem.setAttribute("text-anchor", "end");
	    }
	    //In all other cases, center the text
	    else {
	        x = encoding.width / 2;
	        textElem.setAttribute("text-anchor", "middle");
	      }

	    textElem.setAttribute("x", x);
	    textElem.setAttribute("y", y);

	    textElem.appendChild(document.createTextNode(encoding.text));

	    parent.appendChild(textElem);
	  }
	}

	//
	// Help functions
	//
	function messureSVGtext(string, svg, options) {
	  // Create text element
	  /*var text = document.createElementNS(svgns, 'text');
	  text.style.fontFamily = options.font;
	    text.setAttribute("style",
	     "font-family:" + options.font + ";" +
	     "font-size:" + options.fontSize + "px;"
	   );
	  	var textNode = document.createTextNode(string);
	  	text.appendChild(textNode);
	    svg.appendChild(text);
	    var size = text.getComputedTextLength();
	    svg.removeChild(text);
	   */
	  // TODO: Use svg to messure the text width
	  // Set font
	  var ctx = document.createElement("canvas").getContext("2d");
	  ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	  // Calculate the width of the encoding
	  var size = ctx.measureText(string).width;

	  return size;
	}

	function createGroup(x, y, svg) {
	  var group = document.createElementNS(svgns, 'g');

	  group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	  svg.appendChild(group);

	  return group;
	}

	function setGroupOptions(group, options, encoding) {
	  group.setAttribute("style", "fill:" + options.lineColor + ";");
	}

	function drawLine(x, y, width, height, parent) {
	  var line = document.createElementNS(svgns, 'rect');

	  line.setAttribute("x", x);
	  line.setAttribute("y", y);
	  line.setAttribute("width", width);
	  line.setAttribute("height", height);

	  parent.appendChild(line);
	}

/***/ },
/* 82 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = linearizeEncodings;


	function linearizeEncodings(encodings) {
	  var linearEncodings = [];
	  function nextLevel(encoded) {
	    if (Array.isArray(encoded)) {
	      for (var i in encoded) {
	        nextLevel(encoded[i]);
	      }
	    } else {
	      encoded.text = encoded.text || "";
	      encoded.data = encoded.data || "";
	      linearEncodings.push(encoded);
	    }
	  }
	  nextLevel(encodings);

	  return linearEncodings;
	}

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = fixOptions;


	function fixOptions(options) {
		// Fix the margins
		options.marginTop = options.marginTop || options.margin;
		options.marginBottom = options.marginBottom || options.margin;
		options.marginRight = options.marginRight || options.margin;
		options.marginLeft = options.marginLeft || options.margin;

		return options;
	}

/***/ }
/******/ ]);