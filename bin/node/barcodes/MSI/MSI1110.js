'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _MSI2 = require('./MSI.js');

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = require('./checksums.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSI1110 = function (_MSI) {
	(0, _inherits3.default)(MSI1110, _MSI);

	function MSI1110(string) {
		(0, _classCallCheck3.default)(this, MSI1110);

		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MSI1110).call(this, string));

		_this.string += (0, _checksums.mod11)(_this.string);
		_this.string += (0, _checksums.mod10)(_this.string);
		return _this;
	}

	return MSI1110;
}(_MSI3.default);

exports.default = MSI1110;