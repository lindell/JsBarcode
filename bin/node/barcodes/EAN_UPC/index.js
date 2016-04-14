"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ean_encoder = require("./ean_encoder.js");

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