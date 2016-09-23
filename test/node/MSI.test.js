var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
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
    var enc = new MSI10("1234567", {});
    assert.equal(true, enc.valid());
    assert.equal("12345674", enc.encode().text);
    assert.equal("1101001001001101001001101001001001101101001101001001001101001101001101101001001101101101001101001001001"
      , enc.encode().data);

    var enc = new MSI("12345674", {});
    assert.equal("1101001001001101001001101001001001101101001101001001001101001101001101101001001101101101001101001001001"
      , enc.encode().data);

    var enc = new MSI10("17345", {});
    assert.equal(true, enc.valid());
    assert.equal("173450", enc.encode().text);

    var enc = new MSI10("1234", {});
    assert.equal(true, enc.valid());
    assert.equal("12344", enc.encode().text);
  });

  it('should encode MSI11', function () {
    var enc = new MSI11("123456", {});
    assert.equal("1234560", enc.encode().text);

    var enc = new MSI11("12345678", {});
    assert.equal("123456785", enc.encode().text);

    var enc = new MSI11("1234567891011", {});
    assert.equal("12345678910115", enc.encode().text);

    var enc = new MSI11("1134567", {});
    assert.equal("11345670", enc.encode().text);
  });

  it('should encode MSI1010', function () {
    var enc = new MSI1010("1234567", {});
    assert.equal("123456741", enc.encode().text);

    var enc = new MSI1010("1337", {});
    assert.equal("133751", enc.encode().text);
  });

  it('should encode MSI1110', function () {
    var enc = new MSI1110("12345678", {});
    assert.equal("1234567855", enc.encode().text);

    var enc = new MSI1110("1337", {});
    assert.equal("133744", enc.encode().text);
  });

  it('should warn with invalid text', function () {
    var enc = new MSI("12345ABC", {});
    assert.equal(false, enc.valid());

    var enc = new MSI("12345AB675", {});
    assert.equal(false, enc.valid());
  });

  it('should work with text option', function () {
    var enc = new MSI("12345674", {text: "THISISTEXT"});
    assert.equal("THISISTEXT", enc.encode().text);
  });
});
