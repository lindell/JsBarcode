"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GenericBarcode = undefined;

var _Barcode2 = require("../Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericBarcode = function (_Barcode) {
	_inherits(GenericBarcode, _Barcode);

	function GenericBarcode(data, options) {
		_classCallCheck(this, GenericBarcode);

		return _possibleConstructorReturn(this, _Barcode.call(this, data, options)); // Sets this.data and this.text
	}

	// Return the corresponding binary numbers for the data provided


	GenericBarcode.prototype.encode = function encode() {
		return {
			data: "10101010101010101010101010101010101010101",
			text: this.text
		};
	};

	// Resturn true/false if the string provided is valid for this encoder


	GenericBarcode.prototype.valid = function valid() {
		return true;
	};

	return GenericBarcode;
}(_Barcode3.default);

exports.GenericBarcode = GenericBarcode;