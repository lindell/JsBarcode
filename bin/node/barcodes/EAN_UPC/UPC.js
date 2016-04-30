"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _EAN2 = require("./EAN13.js");

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // UPC is encoded as EAN13 but the first digit always being zero

var UPC = function (_EAN) {
	_inherits(UPC, _EAN);

	function UPC(string, options) {
		_classCallCheck(this, UPC);

		return _possibleConstructorReturn(this, _EAN.call(this, "0" + string, options));
	}

	return UPC;
}(_EAN3.default);

exports.default = UPC;