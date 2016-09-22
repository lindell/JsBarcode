var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");


describe('ITF-14', function() {
  it('should be able to include the encoder(s)', function () {
    ITF14 = JsBarcode.getModule("ITF14");
  });

  it('should be able to encode normal text', function () {
    var enc = new ITF14("98765432109213", {});
    assert.equal("101010001110101110001010100010001110111011101011100010100011101110001010100011101010001000111010111000101110100011100010001010111011101"
      , enc.encode().data);
  });

  it('should be able to add checksum if needed', function () {
    var enc = new ITF14("9876543210921", {});
    assert.equal("101010001110101110001010100010001110111011101011100010100011101110001010100011101010001000111010111000101110100011100010001010111011101"
      , enc.encode().data);
  });

  it('should return text correct', function () {
    var enc = new ITF14("9876543210921", {});
    assert.equal("98765432109213", enc.encode().text);

    var enc = new ITF14("98765432109213", {});
    assert.equal("98765432109213", enc.encode().text);
  });

  it('should warn with invalid text and not when valid', function () {
    var enc = new ITF14("987654321092", {});
    assert.equal(false, enc.valid());

    var enc = new ITF14("98765432109212", {});
    assert.equal(false, enc.valid());

    var enc = new ITF14("98765432109213", {});
    assert.equal(true, enc.valid());

    var enc = new ITF14("9876543210921", {});
    assert.equal(true, enc.valid());

    // Edge cases for check digit of zero
    var enc = new ITF14("00847280031740", {});
    assert.equal(true, enc.valid());

    var enc = new ITF14("00847280031900", {});
    assert.equal(true, enc.valid());

    var enc = new ITF14("00847280032020", {});
    assert.equal(true, enc.valid());

    var enc = new ITF14("00847280031870", {});
    assert.equal(true, enc.valid());

    var enc = new ITF14("00847280031450", {});
    assert.equal(true, enc.valid());

    var enc = new ITF14("00847280031320", {});
    assert.equal(true, enc.valid());
  });

  it('should work with text option', function () {
    var enc = new ITF14("00847280031450", {text: "THISISTEXT"});
    assert.equal("THISISTEXT", enc.encode().text);
  });
});
