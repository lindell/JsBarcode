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

	var _canvas = __webpack_require__(10);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _svg = __webpack_require__(12);

	var _svg2 = _interopRequireDefault(_svg);

	var _merge = __webpack_require__(11);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Import all the barcodes


	(function () {

		// Main function, calls drawCanvas(...) in the right way
		var JsBarcode = function JsBarcode(image, content, options) {
			// If the image is a string, query select call again
			if (typeof image === "string") {
				image = document.querySelector(image);
				JsBarcode(image, content, options);
			}
			// If image, draw on canvas and set the uri as src
			else if (typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLImageElement) {
					var canvas = document.createElement('canvas');
					draw(canvas, content, options, _canvas2.default);
					image.setAttribute("src", canvas.toDataURL());
				} else if (typeof SVGElement !== 'undefined' && image instanceof SVGElement) {
					draw(image, content, options, _svg2.default);
				}
				// If canvas, just draw
				else if (image.getContext) {
						draw(image, content, options, _canvas2.default);
					} else {
						throw new Error("Not supported type to draw on.");
					}
		};

		// The main function, handles everything with the modules and draws the image
		var draw = function draw(canvas, content, options, drawFunction) {
			// Make sure content is a string
			content = content + "";

			// Merge the user options with the default
			options = (0, _merge2.default)(JsBarcode.defaults, options);

			// Fix the margins
			options.marginTop = typeof options.marginTop === "undefined" ? options.margin : options.marginTop;
			options.marginBottom = typeof options.marginBottom === "undefined" ? options.margin : options.marginBottom;
			options.marginRight = typeof options.marginRight === "undefined" ? options.margin : options.marginRight;
			options.marginLeft = typeof options.marginLeft === "undefined" ? options.margin : options.marginLeft;

			// Automatically choose barcode if format set to "auto"...
			if (options.format == "auto") {
				var encoder = new (JsBarcode.autoSelectEncoder(content))(content, options);
			}
			// ...or else, get by name
			else {
					var encoder = new (JsBarcode.getModule(options.format))(content, options);
				}

			if (encoder.options) {
				encoder.options(options);
			}

			//Abort if the barcode format does not support the content
			if (!encoder.valid()) {
				options.valid(false);
				if (options.valid == JsBarcode.defaults.valid) {
					throw new Error('The data is not valid for the type of barcode.');
				}
				return;
			}

			// Set the binary to a cached version if possible
			var cached = JsBarcode.getCache(options.format, content);
			var encoded;
			if (cached) {
				encoded = cached;
			} else {
				encoded = encoder.encode();
				// Cache the encoding if it will be used again later
				JsBarcode.cache(options.format, content, encoded);
			}

			if (encoder.options) {
				options = (0, _merge2.default)(options, encoder.options(options));
			}

			var encodings = [];
			function linearizeEncodings(encoded) {
				if (Array.isArray(encoded)) {
					for (var i in encoded) {
						linearizeEncodings(encoded[i]);
					}
				} else {
					encoded.text = encoded.text || "";
					encoded.data = encoded.data || "";
					encodings.push(encoded);
				}
			}
			linearizeEncodings(encoded);

			drawFunction(canvas, encodings, options);

			// Send a confirmation that the generation was successful to the valid function if it does exist
			options.valid(true);
		};

		JsBarcode._modules = [];

		// Add a new module sorted in the array
		JsBarcode.register = function (module, regex, priority) {
			var position = 0;
			if (typeof priority === "undefined") {
				position = JsBarcode._modules.length - 1;
				priority = 0;
			} else {
				for (var i = 0; i < JsBarcode._modules.length; i++) {
					position = i + 1;
					if (!(priority < JsBarcode._modules[i].priority)) {
						break;
					}
				}
			}

			// Add the module in position position
			JsBarcode._modules.splice(position, 0, {
				"regex": regex,
				"module": module,
				"priority": priority
			});
		};

		// Get module by name
		JsBarcode.getModule = function (name) {
			for (var i in JsBarcode._modules) {
				if (name.search(JsBarcode._modules[i].regex) !== -1) {
					return JsBarcode._modules[i].module;
				}
			}
			throw new Error('Module ' + name + ' does not exist or is not loaded.');
		};

		// If any format is valid with the content, return the format with highest priority
		JsBarcode.autoSelectEncoder = function (content) {
			for (var i in JsBarcode._modules) {
				var barcode = new JsBarcode._modules[i].module(content);
				if (barcode.valid(content)) {
					return JsBarcode._modules[i].module;
				}
			}
			throw new Error("Can't automatically find a barcode format matching the string '" + content + "'");
		};

		// Defining the cache dictionary
		JsBarcode._cache = {};

		// Cache a regerated barcode
		JsBarcode.cache = function (format, input, output) {
			if (!JsBarcode._cache[format]) {
				JsBarcode._cache[format] = {};
			}
			JsBarcode._cache[format][input] = output;
		};

		// Get a chached barcode
		JsBarcode.getCache = function (format, input) {
			if (JsBarcode._cache[format]) {
				if (JsBarcode._cache[format][input]) {
					return JsBarcode._cache[format][input];
				}
			}
			return "";
		};

		module.exports = JsBarcode; // Export to nodejs

		// Register all barcodes
		for (var i in _barcodes2.default) {
			_barcodes2.default[i](JsBarcode);
		}

		//Regsiter JsBarcode for the browser
		if (typeof window !== 'undefined') {
			window.JsBarcode = JsBarcode;
		}

		// Register JsBarcode as an jQuery plugin if jQuery exist
		if (typeof jQuery !== 'undefined') {
			jQuery.fn.JsBarcode = function (content, options, validFunction) {
				JsBarcode(this.get(0), content, options, validFunction);
				return this;
			};
		}

		// All the default options. If one is not set.
		JsBarcode.defaults = {
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
	})();

	// Help functions


	// Import the renderers

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

	var _EAN_UPC2 = _interopRequireDefault(_EAN_UPC);

	var _ITF = __webpack_require__(5);

	var _ITF2 = _interopRequireDefault(_ITF);

	var _ITF3 = __webpack_require__(6);

	var _ITF4 = _interopRequireDefault(_ITF3);

	var _MSI = __webpack_require__(7);

	var _MSI2 = _interopRequireDefault(_MSI);

	var _pharmacode = __webpack_require__(8);

	var _pharmacode2 = _interopRequireDefault(_pharmacode);

	var _GenericBarcode = __webpack_require__(9);

	var _GenericBarcode2 = _interopRequireDefault(_GenericBarcode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  CODE39: _CODE2.default,
	  CODE128: _CODE4.default,
	  EAN_UPC: _EAN_UPC2.default,
	  ITF14: _ITF2.default,
	  ITF: _ITF4.default,
	  MSI: _MSI2.default,
	  pharmacode: _pharmacode2.default,
	  GenericBarcode: _GenericBarcode2.default
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function CODE39(string) {
		string = string.toUpperCase();

		var encodings = {
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

		this.encode = function () {
			var result = "";
			result += encodings["*"].toString(2);
			for (var i = 0; i < string.length; i++) {
				result += encodings[string[i]].toString(2) + "0";
			}
			result += encodings["*"].toString(2);

			return { data: result, text: string };
		};

		//Use the regexp variable for validation
		this.valid = function () {
			return string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		};
	}

	//Required to register for both browser and nodejs
	function register(core) {
		core.register(CODE39, /^CODE.?39$/i, 3);
	};
	exports.default = register;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// ASCII value ranges 0-127, 200-211
	var validCODE128 = /^[\x00-\x7F\xC8-\xD3]+$/;

	// This is the master class, it does require the start code to be
	//included in the string
	function CODE128(string) {
		// Fill the bytes variable with the ascii codes of string
		this.bytes = [];
		for (var i = 0; i < string.length; ++i) {
			this.bytes.push(string.charCodeAt(i));
		}

		// First element should be startcode, remove that
		this.string = string.substring(1);

		this.getText = function () {
			var string = this.string;

			/*
	  string = string.replace(String.fromCharCode(201), "[FNC3]");
	  string = string.replace(String.fromCharCode(202), "[FNC2]");
	  string = string.replace(String.fromCharCode(203), "[SHIFT]");
	  string = string.replace(String.fromCharCode(207), "[FNC1]");
	  */

			return string.replace(/[^\x20-\x7E]/g, "");
		};

		// The public encoding function
		this.encode = function () {
			var encodingResult;
			var bytes = this.bytes;
			// Remove the startcode from the bytes and set its index
			var startIndex = bytes.shift() - 105;

			// Start encode with the right type
			if (startIndex === 103) {
				encodingResult = nextA(bytes, 1);
			} else if (startIndex === 104) {
				encodingResult = nextB(bytes, 1);
			} else if (startIndex === 105) {
				encodingResult = nextC(bytes, 1);
			}

			return { text: this.getText(),
				data:
				//Add the start bits
				getEncoding(startIndex) +
				//Add the encoded bits
				encodingResult.result +
				//Add the checksum
				getEncoding((encodingResult.checksum + startIndex) % 103) +
				//Add the end bits
				getEncoding(106)
			};
		};

		//Data for each character, the last characters will not be encoded but are used for error correction
		//Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
		var code128b = [// + 1000
		740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, /* Start codes */668, 680, 692, 5379];
		var getEncoding = function getEncoding(n) {
			return code128b[n] ? (code128b[n] + 1000).toString(2) : '';
		};

		// Use the regexp variable for validation
		this.valid = function () {
			return !(this.string.search(validCODE128) === -1);
		};

		function nextA(bytes, depth) {
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
					next = nextC(bytes, depth + 1);
				}
				// Swap to CODE128B
				else if (index === 100) {
						next = nextB(bytes, depth + 1);
					}
					// Shift
					else if (index === 98) {
							// Convert the next character so that is encoded correctly
							bytes[0] = bytes[0] > 95 ? bytes[0] - 96 : bytes[0];
							next = nextA(bytes, depth + 1);
						}
						// Continue on CODE128A but encode a special character
						else {
								next = nextA(bytes, depth + 1);
							}
			}
			// Continue encoding of CODE128A
			else {
					var charCode = bytes[0];
					index = charCode < 32 ? charCode + 64 : charCode - 32;

					// Remove first element
					bytes.shift();

					next = nextA(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = getEncoding(index);
			var weight = index * depth;

			return { "result": enc + next.result, "checksum": weight + next.checksum };
		}

		function nextB(bytes, depth) {
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
					next = nextC(bytes, depth + 1);
				}
				// Swap to CODE128A
				else if (index === 101) {
						next = nextA(bytes, depth + 1);
					}
					// Shift
					else if (index === 98) {
							// Convert the next character so that is encoded correctly
							bytes[0] = bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
							next = nextB(bytes, depth + 1);
						}
						// Continue on CODE128B but encode a special character
						else {
								next = nextB(bytes, depth + 1);
							}
			}
			// Continue encoding of CODE128B
			else {
					index = bytes[0] - 32;
					bytes.shift();
					next = nextB(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = getEncoding(index);
			var weight = index * depth;

			return { "result": enc + next.result, "checksum": weight + next.checksum };
		}

		function nextC(bytes, depth) {
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
					next = nextB(bytes, depth + 1);
				}
				// Swap to CODE128A
				else if (index === 101) {
						next = nextA(bytes, depth + 1);
					}
					// Continue on CODE128C but encode a special character
					else {
							next = nextC(bytes, depth + 1);
						}
			}
			// Continue encoding of CODE128C
			else {
					index = (bytes[0] - 48) * 10 + bytes[1] - 48;
					bytes.shift();
					bytes.shift();
					next = nextC(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = getEncoding(index);
			var weight = index * depth;

			return { "result": enc + next.result, "checksum": weight + next.checksum };
		}
	}

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

	function CODE128AUTO(string) {
		// Check the validity of the string, don't even bother auto it when
		//it's not valid
		if (string.search(validCODE128) !== -1) {
			return new CODE128(autoSelectModes(string));
		}
		return new CODE128(string);
	}
	function CODE128A(string) {
		var code128 = new CODE128(String.fromCharCode(208) + string);
		code128.valid = function () {
			return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
		};
		return code128;
	}
	function CODE128B(string) {
		var code128 = new CODE128(String.fromCharCode(209) + string);
		code128.valid = function () {
			return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
		};
		return code128;
	}
	function CODE128C(string) {
		var code128 = new CODE128(String.fromCharCode(210) + string);
		code128.valid = function (str) {
			return this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
		};
		return code128;
	}

	//Required to register for both browser and nodejs
	function register(core) {
		core.register(CODE128AUTO, /^CODE128(.?AUTO)?$/, 10);
		core.register(CODE128A, /^CODE128.?A$/i, 2);
		core.register(CODE128B, /^CODE128.?B$/i, 3);
		core.register(CODE128C, /^CODE128.?C$/i, 2);
	}
	exports.default = register;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function EAN(string, options) {
		//Regexp to test if the EAN code is correct formated
		var fullEanRegexp = /^[0-9]{13}$/;
		var needLastDigitRegexp = /^[0-9]{12}$/;

		//Add checksum if it does not exist
		if (string.search(needLastDigitRegexp) != -1) {
			string += checksum(string);
		}

		this.valid = function () {
			return valid(string);
		};

		this.options = function () {
			options.textMargin = 0;
			if (options.fontSize > options.width * 11) {
				options.fontSize = options.width * 11;
			}
		};

		var EAN13structure = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

		this.encode = function () {
			var encoder = new EANencoder();
			var result = [];

			var structure = EAN13structure[string[0]];

			//Get the string to be encoded on the left side of the EAN code
			var leftSide = string.substr(1, 6);

			//Get the string to be encoded on the right side of the EAN code
			var rightSide = string.substr(7, 6);

			// Add the first digigt
			result.push({ data: "000000000000", text: string[0], options: { textAlign: "left" } });

			//Add the guard bars
			result.push({ data: [1.1, 0, 1.1] });

			//Add the left side
			result.push({ data: encoder.encode(leftSide, structure), text: leftSide });

			//Add the middle bits
			result.push({ data: [0, 1.1, 0, 1.1, 0] });

			//Add the right side
			result.push({ data: encoder.encode(rightSide, "RRRRRR"), text: rightSide });

			//Add the end bits
			result.push({ data: [1.1, 0, 1.1] });

			return result;
		};

		//Calulate the checksum digit
		function checksum(number) {
			var result = 0;

			for (var i = 0; i < 12; i += 2) {
				result += parseInt(number[i]);
			}
			for (var i = 1; i < 12; i += 2) {
				result += parseInt(number[i]) * 3;
			}

			return (10 - result % 10) % 10;
		}

		function valid(number) {
			if (number.search(fullEanRegexp) != -1) {
				return number[12] == checksum(number);
			} else {
				return false;
			}
		}
	}

	function EAN8(string) {
		//Regexp to test if the EAN code is correct formated
		var fullEanRegexp = /^[0-9]{8}$/;
		var needLastDigitRegexp = /^[0-9]{7}$/;

		//Add checksum if it does not exist
		if (string.search(needLastDigitRegexp) != -1) {
			string += checksum(string);
		}

		this.getText = function () {
			return string;
		};

		this.valid = function () {
			return string.search(fullEanRegexp) !== -1 && string[7] == checksum(string);
		};

		this.encode = function () {
			return { data: createEAN8(string), text: string };
		};

		//Calulate the checksum digit
		function checksum(number) {
			var result = 0;

			for (var i = 0; i < 7; i += 2) {
				result += parseInt(number[i]) * 3;
			}
			for (var i = 1; i < 7; i += 2) {
				result += parseInt(number[i]);
			}

			return (10 - result % 10) % 10;
		}

		function createEAN8(number) {
			var encoder = new EANencoder();

			//Create the return variable
			var result = "";

			//Get the number to be encoded on the left side of the EAN code
			var leftSide = number.substr(0, 4);

			//Get the number to be encoded on the right side of the EAN code
			var rightSide = number.substr(4, 4);

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

			return result;
		}
	}

	function EAN5(string) {
		//Regexp to test if the EAN code is correct formated
		var fullEanRegexp = /^[0-9]{5}$/;

		this.valid = function () {
			return string.search(fullEanRegexp) !== -1;
		};

		this.encode = function () {
			return { data: createEAN5(string), text: string };
		};

		//Calulate the checksum digit
		function checksum(number) {
			var result = 0;

			for (var i = 0; i < 5; i += 2) {
				result += parseInt(number[i]) * 3;
			}
			for (var i = 1; i < 5; i += 2) {
				result += parseInt(number[i]) * 9;
			}

			return result % 10;
		}

		var EAN5structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];

		function createEAN5(number) {
			var encoder = new EANencoder();

			//Create the return variable
			var result = "1011";

			// Add the encodings
			result += encoder.encode(number, EAN5structure[checksum(number)], "01");

			return result;
		}
	}

	function EAN2(string) {
		//Regexp to test if the EAN code is correct formated
		var fullEanRegexp = /^[0-9]{2}$/;

		this.valid = function () {
			return string.search(fullEanRegexp) !== -1;
		};

		this.encode = function () {
			return { data: createEAN2(string), text: string };
		};

		var EAN2structure = ["LL", "LG", "GL", "GG"];

		function createEAN2(number) {
			var encoder = new EANencoder();

			//Create the return variable
			var result = "1011";

			// Add the encodings
			result += encoder.encode(number, EAN2structure[parseInt(number) % 4], "01");

			return result;
		}
	}

	function UPC(string, options) {
		var ean = new EAN("0" + string, options);

		this.valid = ean.valid;
		this.encode = ean.encode;
		this.options = ean.options;
	}

	//
	// Help class that does all the encoding
	//
	function EANencoder() {
		//The start bits
		this.startBin = "101";
		//The end bits
		this.endBin = "101";
		//The middle bits
		this.middleBin = "01010";

		//The L (left) type of encoding
		var Lbinary = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];

		//The G type of encoding
		var Gbinary = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];

		//The R (right) type of encoding
		var Rbinary = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];

		//Convert a numberarray to the representing
		this.encode = function (number, structure, separator) {
			//Create the variable that should be returned at the end of the function
			var result = "";

			var separator = typeof separator === "undefined" ? "" : separator;

			//Loop all the numbers
			for (var i = 0; i < number.length; i++) {
				//Using the L, G or R encoding and add it to the returning variable
				if (structure[i] == "L") {
					result += Lbinary[number[i]];
				} else if (structure[i] == "G") {
					result += Gbinary[number[i]];
				} else if (structure[i] == "R") {
					result += Rbinary[number[i]];
				}

				// Add separator
				if (i < number.length - 1) {
					result += separator;
				}
			}
			return result;
		};
	}

	//Required to register for both browser and nodejs
	function register(core) {
		core.register(EAN, /^EAN(.?13)?$/i, 8);
		core.register(EAN8, /^EAN.?8$/i, 8);
		core.register(EAN5, /^EAN.?5$/i, 5);
		core.register(EAN2, /^EAN.?2$/i, 5);
		core.register(UPC, /^UPC(.?A)?$/i, 8);
	}
	exports.default = register;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function ITF14(string) {
		this.valid = function () {
			return string.search(/^[0-9]{13,14}$/) !== -1 && (string.length === 13 || string[13] == checksum(string));
		};

		this.encode = function () {
			//Create the variable that should be returned at the end of the function
			var result = "";

			//If checksum is not already calculated, do it
			if (string.length === 13) {
				string += checksum(string);
			}

			//Always add the same start bits
			result += startBin;

			//Calculate all the digit pairs
			for (var i = 0; i < 14; i += 2) {
				result += calculatePair(string.substr(i, 2));
			}

			//Always add the same end bits
			result += endBin;

			return { data: result, text: string };
		};

		//The structure for the all digits, 1 is wide and 0 is narrow
		var digitStructure = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010" };

		//The start bits
		var startBin = "1010";
		//The end bits
		var endBin = "11101";

		//Calculate the data of a number pair
		function calculatePair(twoNumbers) {
			var result = "";

			var number1Struct = digitStructure[twoNumbers[0]];
			var number2Struct = digitStructure[twoNumbers[1]];

			//Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}
			return result;
		}

		//Calulate the checksum digit
		function checksum(numberString) {
			var result = 0;

			for (var i = 0; i < 13; i++) {
				result += parseInt(numberString[i]) * (3 - i % 2 * 2);
			}

			return 10 - result % 10;
		}
	}

	//Required to register for both browser and nodejs
	function register(core) {
		core.register(ITF14, /^ITF.?14$/i, 5);
	}
	exports.default = register;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function ITF(string) {
		this.valid = function () {
			return valid(string);
		};

		this.encode = function () {
			//Create the variable that should be returned at the end of the function
			var result = "";

			//Always add the same start bits
			result += startBin;

			//Calculate all the digit pairs
			for (var i = 0; i < string.length; i += 2) {
				result += calculatePair(string.substr(i, 2));
			}

			//Always add the same end bits
			result += endBin;

			return { data: result, text: string };
		};

		//The structure for the all digits, 1 is wide and 0 is narrow
		var digitStructure = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010" };

		//The start bits
		var startBin = "1010";
		//The end bits
		var endBin = "11101";

		//Regexp for a valid Inter25 code
		var regexp = /^([0-9][0-9])+$/;

		//Calculate the data of a number pair
		function calculatePair(twoNumbers) {
			var result = "";

			var number1Struct = digitStructure[twoNumbers[0]];
			var number2Struct = digitStructure[twoNumbers[1]];

			//Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}
			return result;
		}

		function valid(number) {
			return number.search(regexp) !== -1;
		}
	}

	//Required to register for both browser and nodejs
	function register(core) {
		core.register(ITF, /^ITF$/i, 4);
	};
	exports.default = register;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var prototype = {};

	prototype.encode = function () {
		var ret = "110";

		for (var i = 0; i < this.string.length; i++) {
			var digit = parseInt(this.string[i]);
			var bin = digit.toString(2);
			bin = addZeroes(bin, 4 - bin.length);
			for (var b = 0; b < bin.length; b++) {
				ret += bin[b] == 0 ? "100" : "110";
			}
		}

		ret += "1001";
		return { data: ret, text: this.string };
	};

	prototype.valid = function () {
		return this.string.search(/^[0-9]+$/) != -1;
	};

	function MSI(string) {
		this.string = "" + string;
	}

	MSI.prototype = Object.create(prototype);

	function MSI10(string) {
		this.string = "" + string;
		this.string += mod10(this.string);
	}
	MSI10.prototype = Object.create(prototype);

	function MSI11(string) {
		this.string = "" + string;
		this.string += mod11(this.string);
	}
	MSI11.prototype = Object.create(prototype);

	function MSI1010(string) {
		this.string = "" + string;
		this.string += mod10(this.string);
		this.string += mod10(this.string);
	}
	MSI1010.prototype = Object.create(prototype);

	function MSI1110(string) {
		this.string = "" + string;
		this.string += mod11(this.string);
		this.string += mod10(this.string);
	}
	MSI1110.prototype = Object.create(prototype);

	function mod10(number) {
		var sum = 0;
		for (var i = 0; i < number.length; i++) {
			var n = parseInt(number[i]);
			if ((i + number.length) % 2 == 0) {
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

	function addZeroes(number, n) {
		for (var i = 0; i < n; i++) {
			number = "0" + number;
		}
		return number;
	}

	//Required to register for both browser and nodejs
	function register(core) {
		core.register(MSI, /^MSI$/i, 4);
		core.register(MSI10, /^MSI.?10$/i);
		core.register(MSI11, /^MSI.?11$/i);
		core.register(MSI1010, /^MSI.?1010$/i);
		core.register(MSI1110, /^MSI.?1110$/i);
	}
	exports.default = register;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function pharmacode(number) {
	    //Ensure that the input is inturpreted as a number
	    this.number = parseInt(number);

	    function recursiveEncoding(code, state) {
	        //End condition
	        if (code.length == 0) return "";

	        var generated;
	        var nextState = false;
	        var nZeros = zeros(code);
	        if (nZeros == 0) {
	            generated = state ? "001" : "00111";
	            nextState = state;
	        } else {
	            generated = "001".repeat(nZeros - (state ? 1 : 0));
	            generated += "00111";
	        }
	        return recursiveEncoding(code.substr(0, code.length - nZeros - 1), nextState) + generated;
	    };

	    this.encode = function () {
	        return {
	            data: recursiveEncoding(this.number.toString(2), true).substr(2),
	            text: this.number + ""
	        };
	    };

	    this.valid = function () {
	        return this.number >= 3 && this.number <= 131070;
	    };

	    //A help function to calculate the zeros at the end of a string (the code)
	    var zeros = function zeros(code) {
	        var i = code.length - 1;
	        var zeros = 0;
	        while (code[i] == "0" || i < 0) {
	            zeros++;
	            i--;
	        }
	        return zeros;
	    };

	    //http://stackoverflow.com/a/202627
	    String.prototype.repeat = function (num) {
	        return new Array(num + 1).join(this);
	    };
	};

	//Required to register for both browser and nodejs
	function register(core) {
	    core.register(pharmacode, /^pharmacode$/i, 2);
	}
	exports.default = register;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function GenericBarcode(string) {
		//Return the corresponding binary numbers for the data provided
		this.encode = function () {
			return { data: "10101010101010101010101010101010101010101", text: string };
		};

		//Resturn true/false if the string provided is valid for this encoder
		this.valid = function () {
			return true;
		};
	}

	//Required to register for both browser and nodejs
	function register(core) {
		core.register(GenericBarcode, /^GEN(ERIC(BARCODE)?)?$/i, 0);
	}
	exports.default = register;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _merge = __webpack_require__(11);

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

	function drawCanvasText(canvas, options, encoding, sizeOptions) {
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

	function drawCanvasBarcode(canvas, options, encoding, sizeOptions) {
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
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = merge;


	function merge(old, replaceObj) {
	  var newMerge = {};
	  for (var k in old) {
	    newMerge[k] = old[k];
	  }
	  for (var k in replaceObj) {
	    if (typeof replaceObj[k] !== "undefined") {
	      newMerge[k] = replaceObj[k];
	    }
	  }
	  return newMerge;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _merge = __webpack_require__(11);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = drawSVG;


	function drawSVG(svg, encodings, options) {
		prepareSVG(svg, encodings, options);

		var currentX = options.marginLeft;
		for (var i in encodings) {
			var options = (0, _merge2.default)(options, encodings[i].options);

			var group = createGroup(currentX, options.marginTop, svg);

			var text = encodings[i].text;
			var binary = encodings[i].data;

			var yFrom, yHeight;
			if (options.textPosition == "top") {
				yFrom = options.marginTop + options.fontSize + options.textMargin;
			} else {
				yFrom = options.marginTop;
			}
			yHeight = options.height;

			for (var b in binary) {
				var x = b * options.width;
				if (binary[b] == 0) {} else if (binary[b] === "1") {
					drawLine(x, yFrom, options.width, options.height, group);
				} else if (binary[b]) {
					drawLine(x, yFrom, options.width, options.height * binary[b], group);
				}
			}

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;
				var textElem = document.createElementNS("http://www.w3.org/2000/svg", 'text');

				if (options.textPosition == "top") {
					y = options.marginTop + options.fontSize;
					textElem.setAttribute("alignment-baseline", "baseline");
				} else {
					y = options.height + options.textMargin + options.marginTop;
					textElem.setAttribute("alignment-baseline", "text-before-edge");
				}

				textElem.setAttribute("font-family", options.font);
				textElem.setAttribute("font-size", options.fontSize);

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left") {
					// || barcodePadding > 0
					x = 0;
					textElem.setAttribute("text-anchor", "start");
				} else if (options.textAlign == "right") {
					x = encodings[i].width - 1;
					textElem.setAttribute("text-anchor", "end");
				}
				//In all other cases, center the text
				else {
						x = encodings[i].width / 2;
						textElem.setAttribute("text-anchor", "middle");
					}

				textElem.setAttribute("x", x);
				textElem.setAttribute("y", y);

				textElem.appendChild(document.createTextNode(text));

				group.appendChild(textElem);
			}

			currentX += encodings[i].width;
		}
	}

	var prepareSVG = function prepareSVG(svg, encodings, options) {
		// Clear SVG
		// TODO

		// Calculate total width
		var totalWidth = 0;
		for (var i in encodings) {
			var textWidth = messureSVGtext(encodings[i].text, svg, options);
			var barcodeWidth = encodings[i].data.length * options.width;

			encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

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
		var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		text.style.fontFamily = options.font;
		// TODO add all font options

		var textNode = document.createTextNode(text);

		text.appendChild(textNode);

		return text.getComputedTextLength();
	};

	function createGroup(x, y, svg) {
		var group = document.createElementNS("http://www.w3.org/2000/svg", 'g');

		group.setAttribute("transform", "translate(" + x + ", " + y + ")");

		svg.appendChild(group);

		return group;
	}

	function drawLine(x, y, width, height, svg) {
		var line = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

		line.setAttribute("x", x);
		line.setAttribute("y", y);
		line.setAttribute("width", width);
		line.setAttribute("height", height);
		line.setAttribute("style", "fill:rgb(0,0,0)");

		svg.appendChild(line);
	}

/***/ }
/******/ ]);