var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");

describe('Codabar', function() {
  it('should be able to include the encoder(s)', function () {
    Codabar = JsBarcode.getModule("codabar");
  });

  it('should encode a string with start and stop characters', function() {
    var enc = new Codabar("A12345B", {});
    assert.equal("10110010010101011001010100101101100101010101101001011010100101001001011"
      , enc.encode().data);
  });

  it('should add start and stop characters to a string without them', function() {
    var enc = new Codabar("12345", {});
    // should encode to "A12345A"
    assert.equal("10110010010101011001010100101101100101010101101001011010100101011001001"
      , enc.encode().data);
  });

  it('should return text string without start/stop characters', function() {
    var enc = new Codabar("A12345B", {});
    assert.equal("12345", enc.encode().text)
  });

  it('should warn with invalid start/stop characters', function () {
    var enc = new Codabar("X12345Y", {});
    assert.equal(false, enc.valid());
  });

  it('should warn with only a start character', function () {
    var enc = new Codabar("A12345", {});
    assert.equal(false, enc.valid());
  });

  it('should warn with only an invalid start character', function () {
    var enc = new Codabar("X12345", {});
    assert.equal(false, enc.valid());
  });

  it('should warn with only a stop character', function () {
    var enc = new Codabar("12345A", {});
    assert.equal(false, enc.valid());
  });

  it('should warn with only an invalid stop character', function () {
    var enc = new Codabar("12345X", {});
    assert.equal(false, enc.valid());
  });

  it('should warn with only start and stop characters', function() {
    var enc = new Codabar("AA", {})
    assert.equal(false, enc.valid());
  });

  it('should warn with an empty string', function() {
    var enc = new Codabar("", {})
    assert.equal(false, enc.valid());
  });

  it('should warn with invalid input', function () {
    var enc = new Codabar("A1234OOPS56A", {});
    assert.equal(false, enc.valid());
  });

  it('should work with text option', function () {
    var enc = new Codabar("A1234OOPS56A", {text: "THISISATEXT"});
    assert.equal("THISISATEXT", enc.encode().text);
  });

});
