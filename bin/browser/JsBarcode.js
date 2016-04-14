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

	var _barcodes = __webpack_require__(1);

	var _barcodes2 = _interopRequireDefault(_barcodes);

	var _canvas = __webpack_require__(13);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _svg = __webpack_require__(15);

	var _svg2 = _interopRequireDefault(_svg);

	var _merge = __webpack_require__(14);

	var _merge2 = _interopRequireDefault(_merge);

	var _linearizeEncodings = __webpack_require__(16);

	var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Import the renderers

	var renderers = {
		"canvas": _canvas2.default,
		"svg": _svg2.default
	};

	// Help functions
	// Import all the barcodes


	var api = {};
	var JsBarcode = function JsBarcode(element) {
		var newApi = {};
		for (var key in api) {
			newApi[key] = api[key];
		}

		newApi.drawProperties = getDrawProperies(element);

		newApi.encodings = [];
		newApi.draw = draw;
		newApi._options = defaults;

		return newApi;
	};

	api.options = function (options) {
		this._options = (0, _merge2.default)(this._options, options);

		return this;
	};

	// Register all barcodes
	for (var name in _barcodes2.default) {
		registerBarcode(_barcodes2.default, name);
	}

	function registerBarcode(barcodes, name) {
		api[name] = function (text, options) {

			var Encoder = barcodes[name];
			var encoder = new Encoder(text, this._options);

			this.encodings.push(encoder.encode());

			return this;
		};
	}

	function draw() {
		var renderer = renderers[this.drawProperties.renderer];

		var encodings = (0, _linearizeEncodings2.default)(this.encodings);
		fixOptions(this._options);

		renderer(this.drawProperties.element, encodings, this._options);

		return this;
	}

	window.JsBarcode = JsBarcode;
	module.exports = JsBarcode;

	function getDrawProperies(element) {
		// If the element is a string, query select call again
		if (typeof element === "string") {
			element = document.querySelector(element);
			return getDrawProperies(element);
		}
		// If element, draw on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				var canvas = document.createElement('canvas');
				return {
					element: canvas,
					renderer: "canvas",
					afterDraw: function afterDraw() {
						element.setAttribute("src", canvas.toDataURL());
					}
				};
			} else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
				return {
					element: element,
					renderer: "svg"
				};
			}
			// If canvas, just draw
			else if (element.getContext) {
					return {
						element: element,
						renderer: "canvas"
					};
				} else {
					throw new Error("Not supported type to draw on.");
				}
	};

	function fixOptions(options) {
		// Fix the margins
		options.marginTop = typeof options.marginTop === "undefined" ? options.margin : options.marginTop;
		options.marginBottom = typeof options.marginBottom === "undefined" ? options.margin : options.marginBottom;
		options.marginRight = typeof options.marginRight === "undefined" ? options.margin : options.marginRight;
		options.marginLeft = typeof options.marginLeft === "undefined" ? options.margin : options.marginLeft;

		return options;
	}

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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CODE = __webpack_require__(2);

	var _CODE2 = _interopRequireDefault(_CODE);

	var _CODE3 = __webpack_require__(3);

	var _CODE4 = _interopRequireDefault(_CODE3);

	var _EAN_UPC = __webpack_require__(4);

	var _ITF = __webpack_require__(6);

	var _ITF2 = _interopRequireDefault(_ITF);

	var _ITF3 = __webpack_require__(7);

	var _ITF4 = _interopRequireDefault(_ITF3);

	var _MSI = __webpack_require__(8);

	var _pharmacode = __webpack_require__(10);

	var _pharmacode2 = _interopRequireDefault(_pharmacode);

	var _blank = __webpack_require__(11);

	var _GenericBarcode = __webpack_require__(12);

	var _GenericBarcode2 = _interopRequireDefault(_GenericBarcode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  CODE39: _CODE2.default,
	  CODE128: _CODE4.default,
	  EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC,
	  ITF14: _ITF2.default,
	  ITF: _ITF4.default,
	  MSI: _MSI.MSI, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010,
	  pharmacode: _pharmacode2.default,
	  blank: _blank.blank,
	  GenericBarcode: _GenericBarcode2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CODE39 = function () {
		function CODE39(string) {
			_classCallCheck(this, CODE39);

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

		_createClass(CODE39, [{
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
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// ASCII value ranges 0-127, 200-211
	var validCODE128 = /^[\x00-\x7F\xC8-\xD3]+$/;

	// This is the master class, it does require the start code to be
	//included in the string

	var CODE128 = function () {
		function CODE128(string) {
			_classCallCheck(this, CODE128);

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

		_createClass(CODE128, [{
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
				return this.string.search(validCODE128) !== -1;
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

	var CODE128AUTO = function (_CODE) {
		_inherits(CODE128AUTO, _CODE);

		function CODE128AUTO(string) {
			_classCallCheck(this, CODE128AUTO);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CODE128AUTO).call(this, string));

			if (string.search(validCODE128) !== -1) {
				var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CODE128AUTO).call(this, autoSelectModes(string)));
			} else {
				var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CODE128AUTO).call(this, string));
			}
			return _possibleConstructorReturn(_this);
		}

		return CODE128AUTO;
	}(CODE128);

	var CODE128A = function (_CODE2) {
		_inherits(CODE128A, _CODE2);

		function CODE128A(string) {
			_classCallCheck(this, CODE128A);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(CODE128A).call(this, String.fromCharCode(208) + string));
		}

		_createClass(CODE128A, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
			}
		}]);

		return CODE128A;
	}(CODE128);

	var CODE128B = function (_CODE3) {
		_inherits(CODE128B, _CODE3);

		function CODE128B(string) {
			_classCallCheck(this, CODE128B);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(CODE128B).call(this, String.fromCharCode(209) + string));
		}

		_createClass(CODE128B, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
			}
		}]);

		return CODE128B;
	}(CODE128);

	var CODE128C = function (_CODE4) {
		_inherits(CODE128C, _CODE4);

		function CODE128C(string) {
			_classCallCheck(this, CODE128C);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(CODE128C).call(this, String.fromCharCode(210) + string));
		}

		_createClass(CODE128C, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
			}
		}]);

		return CODE128C;
	}(CODE128);

	exports.CODE128 = CODE128;
	exports.CODE128A = CODE128A;
	exports.CODE128B = CODE128B;
	exports.CODE128C = CODE128C;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ean_encoder = __webpack_require__(5);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EAN13 = function () {
		function EAN13(string, options) {
			_classCallCheck(this, EAN13);

			//Add checksum if it does not exist
			if (string.search(/^[0-9]{12}$/) != -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}

			// Define the EAN-13 structure
			this.structure = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

			this.guardHeight = options.height + options.fontSize / 2 + options.textMargin;
		}

		_createClass(EAN13, [{
			key: "valid",
			value: function valid() {
				return this.string.search(/^[0-9]{13}$/) !== -1 && this.string[12] == this.checksum(this.string);
			}
		}, {
			key: "options",
			value: function options(_options) {
				_options.textMargin = 0;
				if (_options.fontSize > _options.width * 11) {
					_options.fontSize = _options.width * 11;
				}
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
					text: this.string[0], options: { textAlign: "left" }
				});

				//Add the guard bars
				result.push({ data: "101", options: { height: this.guardHeight } });

				//Add the left side
				result.push({
					data: encoder.encode(leftSide, structure),
					text: leftSide
				});

				//Add the middle bits
				result.push({ data: "01010", options: { height: this.guardHeight } });

				//Add the right side
				result.push({ data: encoder.encode(rightSide, "RRRRRR"), text: rightSide });

				//Add the end bits
				result.push({ data: "101", options: { height: this.guardHeight } });

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

	var EAN8 = function () {
		function EAN8(string) {
			_classCallCheck(this, EAN8);

			//Add checksum if it does not exist
			if (string.search(/^[0-9]{7}$/) !== -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}
		}

		_createClass(EAN8, [{
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

	var EAN5 = function () {
		function EAN5(string) {
			_classCallCheck(this, EAN5);

			this.string = string;

			this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
		}

		_createClass(EAN5, [{
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

	var EAN2 = function () {
		function EAN2(string) {
			_classCallCheck(this, EAN2);

			this.string = string;

			this.structure = ["LL", "LG", "GL", "GG"];
		}

		_createClass(EAN2, [{
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

	var UPC = function (_EAN) {
		_inherits(UPC, _EAN);

		function UPC(string, options) {
			_classCallCheck(this, UPC);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(UPC).call(this, "0" + string, options));
		}

		return UPC;
	}(EAN13);

	exports.EAN13 = EAN13;
	exports.EAN8 = EAN8;
	exports.EAN5 = EAN5;
	exports.EAN2 = EAN2;
	exports.UPC = UPC;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EANencoder = function () {
		function EANencoder() {
			_classCallCheck(this, EANencoder);

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


		_createClass(EANencoder, [{
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
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITF14 = function () {
		function ITF14(string) {
			_classCallCheck(this, ITF14);

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

		_createClass(ITF14, [{
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
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITF = function () {
		function ITF(string) {
			_classCallCheck(this, ITF);

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

		_createClass(ITF, [{
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _checksums = __webpack_require__(9);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MSI = function () {
		function MSI(string) {
			_classCallCheck(this, MSI);

			this.string = string;
		}

		_createClass(MSI, [{
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

	var MSI11 = function (_MSI) {
		_inherits(MSI11, _MSI);

		function MSI11(string) {
			_classCallCheck(this, MSI11);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MSI11).call(this, string));

			_this.string += (0, _checksums.mod11)(_this.string);
			return _this;
		}

		return MSI11;
	}(MSI);

	var MSI1010 = function (_MSI2) {
		_inherits(MSI1010, _MSI2);

		function MSI1010(string) {
			_classCallCheck(this, MSI1010);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MSI1010).call(this, string));

			_this2.string += (0, _checksums.mod10)(_this2.string);
			_this2.string += (0, _checksums.mod10)(_this2.string);
			return _this2;
		}

		return MSI1010;
	}(MSI);

	var MSI1110 = function (_MSI3) {
		_inherits(MSI1110, _MSI3);

		function MSI1110(string) {
			_classCallCheck(this, MSI1110);

			var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(MSI1110).call(this, string));

			_this3.string += (0, _checksums.mod11)(_this3.string);
			_this3.string += (0, _checksums.mod10)(_this3.string);
			return _this3;
		}

		return MSI1110;
	}(MSI);

	function addZeroes(number, n) {
		for (var i = 0; i < n; i++) {
			number = "0" + number;
		}
		return number;
	}

	exports.MSI = MSI;
	exports.MSI11 = MSI11;
	exports.MSI1010 = MSI1010;
	exports.MSI1110 = MSI1110;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var pharmacode = function () {
	  function pharmacode(string) {
	    _classCallCheck(this, pharmacode);

	    this.number = parseInt(string);
	  }

	  _createClass(pharmacode, [{
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
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var blank = function () {
		function blank(string) {
			_classCallCheck(this, blank);

			this.size = parseInt(string, 10);
		}

		_createClass(blank, [{
			key: "encode",
			value: function encode() {
				var binary = "";
				for (var i = 0; i < this.size; i++) {
					binary += "0";
				}
				return {
					data: binary,
					text: ""
				};
			}
		}, {
			key: "valid",
			value: function valid() {
				return this.size > 0;
			}
		}]);

		return blank;
	}();

	exports.blank = blank;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GenericBarcode = function () {
		function GenericBarcode(string) {
			_classCallCheck(this, GenericBarcode);

			this.string = string;
		}

		//Return the corresponding binary numbers for the data provided


		_createClass(GenericBarcode, [{
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _merge = __webpack_require__(14);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = drawCanvas;


	function drawCanvas(canvas, encodings, options) {
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

	function moveCanvasDrawing(canvas, encoding) {
		var ctx = canvas.getContext("2d");

		ctx.translate(encoding.width, 0);
	}

	function restoreCanvas(canvas) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		ctx.restore();
	}

	function drawCanvasText(canvas, options, encoding) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Draw the text if displayValue is set
		if (options.displayValue) {
			var x, y;

			if (options.textPosition == "top") {
				y = options.marginTop + options.fontSize;
				ctx.textBaseline = "bottom";
			} else {
				y = options.height + options.textMargin + options.marginTop;
				ctx.textBaseline = "top";
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

	function prepareCanvas(canvas, options, encodings) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		ctx.save();

		// Set font
		ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Calculate total width
		var totalWidth = 0;
		for (var i in encodings) {
			var textWidth = ctx.measureText(encodings[i].text).width;
			var barcodeWidth = encodings[i].data.length * options.width;

			encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

			var barcodePadding = 0;
			if (options.displayValue && barcodeWidth < textWidth) {
				if (options.textAlign == "center") {
					barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
				} else if (options.textAlign == "left") {
					barcodePadding = 0;
				} else if (options.textAlign == "right") {
					barcodePadding = Math.floor(textWidth - barcodeWidth);
				}
			}
			encodings[i].barcodePadding = barcodePadding;

			totalWidth += encodings[i].width;
		}

		canvas.width = totalWidth + options.marginLeft + options.marginRight;

		canvas.height = options.height + (options.displayValue ? options.fontSize : 0) + options.textMargin + options.marginTop + options.marginBottom;

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

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _merge = __webpack_require__(14);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = drawSVG;


	var svgns = "http://www.w3.org/2000/svg";

	function drawSVG(svg, encodings, options) {
	  var currentX = options.marginLeft;

	  prepareSVG(svg, options, encodings);
	  for (var i in encodings) {
	    var encodingOptions = (0, _merge2.default)(options, encodings[i].options);
	    var group = createGroup(currentX, options.marginTop, svg);

	    drawSvgBarcode(group, encodingOptions, encodings[i]);
	    drawSVGText(group, encodingOptions, encodings[i]);

	    currentX += encodings[i].width;
	  }

	  //restoreCanvas(canvas);
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

	  // TODO fix line color here

	  for (var b in binary) {
	    var x = b * options.width + encoding.barcodePadding;
	    if (binary[b] === "0" && binary[b] === 0) {} else if (binary[b] === "1") {
	      drawLine(x, yFrom, options.width, options.height, parent);
	    } else if (binary[b]) {
	      drawLine(x, yFrom, options.width, options.height * binary[b], parent);
	    }
	  }
	}

	function drawSVGText(parent, options, encoding) {
	  var textElem = document.createElementNS(svgns, 'text');

	  // Draw the text if displayValue is set
	  if (options.displayValue) {
	    var x, y;

	    textElem.setAttribute("style", "font-family:" + options.font + ";" + "font-size:" + options.fontSize + "px;");

	    if (options.textPosition == "top") {
	      y = options.fontSize;
	      textElem.setAttribute("alignment-baseline", "baseline");
	    } else {
	      y = options.height + options.textMargin;
	      textElem.setAttribute("alignment-baseline", "text-before-edge");
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

	var prepareSVG = function prepareSVG(svg, options, encodings) {
	  // Clear SVG
	  // TODO

	  var totalWidth = 0;
	  for (var i in encodings) {
	    var textWidth = messureSVGtext(encodings[i].text, svg, options);
	    var barcodeWidth = encodings[i].data.length * options.width;

	    encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

	    var barcodePadding = 0;
	    if (options.displayValue && barcodeWidth < textWidth) {
	      if (options.textAlign == "center") {
	        barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
	      } else if (options.textAlign == "left") {
	        barcodePadding = 0;
	      } else if (options.textAlign == "right") {
	        barcodePadding = Math.floor(textWidth - barcodeWidth);
	      }
	    }
	    encodings[i].barcodePadding = barcodePadding;

	    totalWidth += encodings[i].width;
	  }

	  svg.setAttribute("width", totalWidth + options.marginLeft + options.marginRight);

	  svg.setAttribute("height", options.height + (options.displayValue ? options.fontSize : 0) + options.textMargin + options.marginTop + options.marginBottom);

	  // Paint the canvas
	  /*ctx.clearRect(0,0,canvas.width,canvas.height);
	  if(options.background){
	  	ctx.fillStyle = options.background;
	  	ctx.fillRect(0,0,canvas.width, canvas.height);
	  }*/
	};

	var messureSVGtext = function messureSVGtext(text, svg, options) {
	  // Create text element
	  var text = document.createElementNS(svgns, 'text');
	  text.style.fontFamily = options.font;

	  text.setAttribute("style", "font-family:" + options.font + ";" + "font-size:" + options.fontSize + "px;");

	  var textNode = document.createTextNode(text);

	  text.appendChild(textNode);

	  //svg.appendChild(text);

	  return text.getComputedTextLength();
	};

	function createGroup(x, y, svg) {
	  var group = document.createElementNS(svgns, 'g');

	  group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	  svg.appendChild(group);

	  return group;
	}

	function drawLine(x, y, width, height, parent) {
	  var line = document.createElementNS(svgns, 'rect');

	  line.setAttribute("x", x);
	  line.setAttribute("y", y);
	  line.setAttribute("width", width);
	  line.setAttribute("height", height);
	  line.setAttribute("style", "fill:rgb(0,0,0)");

	  parent.appendChild(line);
	}

/***/ },
/* 16 */
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

/***/ }
/******/ ]);