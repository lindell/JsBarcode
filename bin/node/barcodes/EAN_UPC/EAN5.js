"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _ean_encoder = require("./ean_encoder.js");

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