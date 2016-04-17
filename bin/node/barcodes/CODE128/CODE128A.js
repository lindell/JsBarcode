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

var CODE128A = function (_CODE) {
	(0, _inherits3.default)(CODE128A, _CODE);

	function CODE128A(string) {
		(0, _classCallCheck3.default)(this, CODE128A);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CODE128A).call(this, String.fromCharCode(208) + string));
	}

	(0, _createClass3.default)(CODE128A, [{
		key: 'valid',
		value: function valid() {
			return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
		}
	}]);
	return CODE128A;
}(_CODE3.default);

exports.default = CODE128A;