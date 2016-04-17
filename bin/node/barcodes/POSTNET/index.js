"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POSTNET = function () {
  function POSTNET(string) {
    (0, _classCallCheck3.default)(this, POSTNET);

    this.string = string;
  }

  (0, _createClass3.default)(POSTNET, [{
    key: "encode",
    value: function encode() {
      return {
        data: recursiveEncoding(this.number.toString(2), true).substr(2),
        text: this.number + ""
      };
    }
  }, {
    key: "valid",
    value: function valid() {
      return this.number >= 3 && this.number <= 131070;
    }
  }]);
  return POSTNET;
}();

exports.default = POSTNET;