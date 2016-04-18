"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GenericBarcode = function () {
	function GenericBarcode(string) {
		(0, _classCallCheck3.default)(this, GenericBarcode);

		this.string = string;
	}

	//Return the corresponding binary numbers for the data provided


	(0, _createClass3.default)(GenericBarcode, [{
		key: "encode",
		value: function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.string
			};
		}

		//Resturn true/false if the string provided is valid for this encoder

	}, {
		key: "valid",
		value: function valid() {
			return true;
		}
	}]);
	return GenericBarcode;
}();

exports.default = GenericBarcode;