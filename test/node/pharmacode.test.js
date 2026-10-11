var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");

describe('Pharmacode', function() {
  it('should be able to include the encoder(s)', function () {
    Pharmacode = JsBarcode.getModule("pharmacode");
  });

  it('should be able to encode normal text', function () {
    var enc = new Pharmacode("1234", {});
    assert.equal("10010011100111001001110010010011100111"
      , enc.encode().data);

    var enc = new Pharmacode("4567", {});
    assert.equal("10010010011100111001110010011100111001001001"
      , enc.encode().data);

    var enc = new Pharmacode("12", {});
    assert.equal("11100100111", enc.encode().data);
  });

  it('should return getText correct', function () {
    var enc = new Pharmacode("1234", {});
    assert.equal("1234", enc.encode().text);
  });

  it('should warn with invalid text', function () {
    var enc = new Pharmacode("12345678", {});
    assert.equal(false, enc.valid());
  });

  it('should reject non-integer text instead of encoding a numeric prefix', function () {
    ["3.5", "3junk", "3e4", " 3", "3 ", "3\n", "3\r", "3\t"].forEach(function(value) {
      var enc = new Pharmacode(value, {});
      assert.equal(false, enc.valid(), JSON.stringify(value));
    });
  });

  it('should retain integer range boundaries and leading zeroes', function () {
    ["3", "003", "131070"].forEach(function(value) {
      assert.equal(true, new Pharmacode(value, {}).valid(), value);
    });
    ["2", "131071"].forEach(function(value) {
      assert.equal(false, new Pharmacode(value, {}).valid(), value);
    });
  });

  it('should work with text option', function () {
    var enc = new Pharmacode("12345678", {text: "THISISTEXT"});
    assert.equal("THISISTEXT", enc.encode().text);
  });
});
