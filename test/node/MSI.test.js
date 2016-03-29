var assert = require('assert');
var JsBarcode = require('../../JsBarcode.js');
var Canvas = require("canvas");


describe('MSI', function() {
  it('should be able to include the encoder(s)', function () {
    MSI = JsBarcode.getModule("MSI");
    MSI10 = JsBarcode.getModule("MSI10");
    MSI11 = JsBarcode.getModule("MSI11");
    MSI1010 = JsBarcode.getModule("MSI1010");
    MSI1110 = JsBarcode.getModule("MSI1110");
  });

  it('should be able to encode normal text', function () {
    var enc = new MSI10("1234567");
    assert.equal(enc.valid(), true);
    assert.equal(enc.getText(), "12345674");
    assert.equal(enc.encoded(), "1101001001001101001001101001001001101101001101001001001101001101001101101001001101101101001101001001001");

    var enc = new MSI("12345674");
    assert.equal(enc.encoded(), "1101001001001101001001101001001001101101001101001001001101001101001101101001001101101101001101001001001");

    var enc = new MSI10("17345");
    assert.equal(enc.valid(), true);
    assert.equal(enc.getText(), "173450");

    var enc = new MSI10("1234");
    assert.equal(enc.valid(), true);
    assert.equal(enc.getText(), "12344");
  });

  it('should encode MSI11', function () {
    var enc = new MSI11("123456");
    assert.equal("1234560", enc.getText());

    var enc = new MSI11("12345678");
    assert.equal("123456785", enc.getText());

    var enc = new MSI11("1234567891011");
    assert.equal("12345678910115", enc.getText());

    var enc = new MSI11("1134567");
    assert.equal("11345670", enc.getText());
  });

  it('should encode MSI1010', function () {
    var enc = new MSI1010("1234567");
    assert.equal("123456741", enc.getText());

    var enc = new MSI1010("1337");
    assert.equal("133751", enc.getText());
  });

  it('should encode MSI1110', function () {
    var enc = new MSI1110("12345678");
    assert.equal("1234567855", enc.getText());

    var enc = new MSI1110("1337");
    assert.equal("133744", enc.getText());
  });

  it('should warn with invalid text', function () {
    var enc = new MSI("12345ABC");
    assert.equal(false, enc.valid());

    var enc = new MSI("12345AB675");
    assert.equal(false, enc.valid());
  });
});
