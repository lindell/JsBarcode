"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checksums = require("./checksums.js");

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