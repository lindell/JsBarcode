var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");


describe('CODE39', function() {
  it('should be able to include the encoder(s)', function () {
    CODE39 = JsBarcode.getModule("CODE39");
  });

  it('should be able to encode normal text', function () {
    var enc = new CODE39("AB12", {});
    assert.equal("100010111011101011101010001011101011101000101110111010001010111010111000101011101000101110111010"
      , enc.encode().data);
  });

  it('should warn with invalid text', function () {
    var enc = new CODE39("AB!12", {});
    assert.equal(false, enc.valid());
  });

  it('should make lowercase to uppercase', function () {
    var enc = new CODE39("abc123ABC", {});
    assert.equal("ABC123ABC", enc.encode().text);
  });

  it('should calculate correct checksums', function () {
    var enc = new CODE39("ABCDEFG", {});
    assert.equal("100010111011101011101010001011101011101000101110111011101000101010101110001011101110101110001010101110111000101010101000111011101000101110111010"
      , enc.encode().data);
  });
});
