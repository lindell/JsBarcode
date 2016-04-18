"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

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