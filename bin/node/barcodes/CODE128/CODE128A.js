'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE2 = require('./CODE128.js');

var _CODE3 = _interopRequireDefault(_CODE2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128A = function (_CODE) {
	_inherits(CODE128A, _CODE);

	function CODE128A(string) {
		_classCallCheck(this, CODE128A);

		return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(208) + string));
	}

	CODE128A.prototype.valid = function valid() {
		return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
	};

	return CODE128A;
}(_CODE3.default);

exports.default = CODE128A;