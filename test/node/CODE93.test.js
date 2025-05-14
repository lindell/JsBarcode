var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");


describe('CODE93', function() {
  it('should be able to include the encoder(s)', function () {
    CODE93 = JsBarcode.getModule("CODE93");
  });

  it('should be able to encode normal text', function () {
    var enc = new CODE93("AB12", {});
    assert.equal("1010111101101010001101001001010010001010001001100101101110101001010111101"
      , enc.encode().data);
  });

  it('should warn with invalid text', function () {
    var enc = new CODE93("AB!12", {});
    assert.equal(false, enc.valid());
  });

  it('should make lowercase to uppercase', function () {
    var enc = new CODE93("abc123ABC", {});
    assert.equal("ABC123ABC", enc.encode().text);
  });

  it('should calculate correct checksums with special character checksum values', function () {
    var enc = new CODE93("ABCDEF123456", {});
    assert.equal("1010111101101010001101001001101000101100101001100100101100010101010010001010001001010000101001010001001001001001000101001100101000101001010111101"
      , enc.encode().data);
  });

  it('should work with text option', function () {
    var enc = new CODE93("AB12", {text: "THISISTEXT"});
    assert.equal("THISISTEXT", enc.encode().text);
  });
});
