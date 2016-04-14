"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var blank = function () {
	function blank(string) {
		_classCallCheck(this, blank);

		this.size = parseInt(string, 10);
	}

	_createClass(blank, [{
		key: "encode",
		value: function encode() {
			var binary = "";
			for (var i = 0; i < this.size; i++) {
				binary += "0";
			}
			return {
				data: binary,
				text: ""
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.size > 0;
		}
	}]);

	return blank;
}();

exports.blank = blank;