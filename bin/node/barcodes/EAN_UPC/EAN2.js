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