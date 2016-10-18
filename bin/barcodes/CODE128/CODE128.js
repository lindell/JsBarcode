"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Barcode2 = require("../Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // This is the master class, it does require the start code to be
// included in the string

var CODE128 = function (_Barcode) {
	_inherits(CODE128, _Barcode);

	function CODE128(data, options) {
		_classCallCheck(this, CODE128);

		// Fill the bytes variable with the ascii codes of string
		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data.substring(1), options));

		_this.bytes = [];
		for (var i = 0; i < data.length; ++i) {
			_this.bytes.push(data.charCodeAt(i));
		}

		// Data for each character, the last characters will not be encoded but are used for error correction
		// Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
		_this.encodings = [// + 1000
		740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, /* Start codes */668, 680, 692, 5379];
		return _this;
	}

	// The public encoding function


	CODE128.prototype.encode = function encode() {
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

		return {
			text: this.text == this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
			data:
			// Add the start bits
			this.getEncoding(startIndex) +
			// Add the encoded bits
			encodingResult.result +
			// Add the checksum
			this.getEncoding((encodingResult.checksum + startIndex) % 103) +
			// Add the end bits
			this.getEncoding(106)
		};
	};

	CODE128.prototype.getEncoding = function getEncoding(n) {
		return this.encodings[n] ? (this.encodings[n] + 1000).toString(2) : '';
	};

	// Use the regexp variable for validation


	CODE128.prototype.valid = function valid() {
		// ASCII value ranges 0-127, 200-211
		return this.data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1;
	};

	CODE128.prototype.nextA = function nextA(bytes, depth) {
		if (bytes.length <= 0) {
			return { "result": "", "checksum": 0 };
		}

		var next, index;

		// Special characters
		if (bytes[0] >= 200) {
			index = bytes[0] - 105;

			// Remove first element
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
	};

	CODE128.prototype.nextB = function nextB(bytes, depth) {
		if (bytes.length <= 0) {
			return { "result": "", "checksum": 0 };
		}

		var next, index;

		// Special characters
		if (bytes[0] >= 200) {
			index = bytes[0] - 105;

			// Remove first element
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
	};

	CODE128.prototype.nextC = function nextC(bytes, depth) {
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
	};

	return CODE128;
}(_Barcode3.default);

exports.default = CODE128;