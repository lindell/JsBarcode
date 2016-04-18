'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _CODE2 = require('./CODE128.js');

var _CODE3 = _interopRequireDefault(_CODE2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CODE128B = function (_CODE) {
	(0, _inherits3.default)(CODE128B, _CODE);

	function CODE128B(string) {
		(0, _classCallCheck3.default)(this, CODE128B);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128B).call(this, String.fromCharCode(209) + string));
	}

	(0, _createClass3.default)(CODE128B, [{
		key: 'valid',
		value: function valid() {
			return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
		}
	}]);
	return CODE128B;
}(_CODE3.default);

exports.default = CODE128B;