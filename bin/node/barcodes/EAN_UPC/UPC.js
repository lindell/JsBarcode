"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _EAN2 = require("./EAN13.js");

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPC = function (_EAN) {
	(0, _inherits3.default)(UPC, _EAN);

	function UPC(string, options) {
		(0, _classCallCheck3.default)(this, UPC);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UPC).call(this, "0" + string, options));
	}

	return UPC;
}(_EAN3.default);

exports.default = UPC;