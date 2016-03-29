var assert = require('assert');
var JsBarcode = require('../../JsBarcode.js');
var Canvas = require("canvas");

describe('Pharmacode', function() {
  it('should be able to include the encoder(s)', function () {
    Pharmacode = JsBarcode.getModule("pharmacode");
  });

  it('should be able to encode normal text', function () {
    var enc = new Pharmacode("1234");
    assert.equal(enc.encoded(), "10010011100111001001110010010011100111");

    var enc = new Pharmacode("4567");
    assert.equal(enc.encoded(), "10010010011100111001110010011100111001001001");

    var enc = new Pharmacode("12");
    assert.equal(enc.encoded(), "11100100111");
  });

  it('should return getText correct', function () {
    var enc = new Pharmacode("1234");
    assert.equal(enc.getText(), "1234");
  });

  it('should warn with invalid text', function () {
    var enc = new Pharmacode("12345678");
    assert.equal(false, enc.valid());
  });
});

describe('Generic barcode', function() {
  it('should not fail generic barcode', function () {
    var enc = new GENERIC("1234");
    assert.equal(enc.valid(), true);
    assert.equal(enc.getText(), "1234");
  });
});
