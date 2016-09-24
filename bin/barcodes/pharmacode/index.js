"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pharmacode = undefined;

var _Barcode2 = require("../Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

var pharmacode = function (_Barcode) {
	_inherits(pharmacode, _Barcode);

	function pharmacode(data, options) {
		_classCallCheck(this, pharmacode);

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.number = parseInt(data, 10);
		return _this;
	}

	pharmacode.prototype.encode = function encode() {
		var z = this.number;
		var result = "";

		// http://i.imgur.com/RMm4UDJ.png
		// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
		while (!isNaN(z) && z != 0) {
			if (z % 2 === 0) {
				// Even
				result = "11100" + result;
				z = (z - 2) / 2;
			} else {
				// Odd
				result = "100" + result;
				z = (z - 1) / 2;
			}
		}

		// Remove the two last zeroes
		result = result.slice(0, -2);

		return {
			data: result,
			text: this.text
		};
	};

	pharmacode.prototype.valid = function valid() {
		return this.number >= 3 && this.number <= 131070;
	};

	return pharmacode;
}(_Barcode3.default);

exports.pharmacode = pharmacode;