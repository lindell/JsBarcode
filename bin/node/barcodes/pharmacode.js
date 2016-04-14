"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pharmacode = function () {
  function pharmacode(string) {
    _classCallCheck(this, pharmacode);

    this.number = parseInt(string);
  }

  _createClass(pharmacode, [{
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

  return pharmacode;
}();

function recursiveEncoding(code, state) {
  // TODO explanation needed

  //End condition
  if (code.length === 0) return "";

  var generated;
  var nextState = false;
  var nzeroes = zeroes(code);
  if (nzeroes === 0) {
    generated = state ? "001" : "00111";
    nextState = state;
  } else {
    generated = "001".repeat(nzeroes - (state ? 1 : 0));
    generated += "00111";
  }
  return recursiveEncoding(code.substr(0, code.length - nzeroes - 1), nextState) + generated;
}

//http://stackoverflow.com/a/202627
String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this);
};

//A help function to calculate the zeroes at the end of a string (the code)
function zeroes(code) {
  var i = code.length - 1;
  var zeroes = 0;
  while (code[i] == "0" || i < 0) {
    zeroes++;
    i--;
  }
  return zeroes;
}

exports.default = pharmacode;