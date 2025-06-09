var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");


describe('CODE93', function() {
  it('should be able to include the encoder(s)', function () {
    CODE93 = JsBarcode.getModule("CODE93");
    CODE93FullASCII = JsBarcode.getModule("CODE93FullASCII");
  });

  it('should be able to encode normal text', function () {
    const encoded = "1010111101101010001101001001010010001010001001100101101110101001010111101";

    var enc = new CODE93("AB12", {});
    assert.equal(encoded, enc.encode().data);

    var enc = new CODE93FullASCII("AB12", {});
    assert.equal(encoded, enc.encode().data);
  });

  it('should be able to encode full ASCII', function () {
    // Lowercase characters
    var enc = new CODE93FullASCII("ABab12", {});
    assert.equal("1010111101101010001101001001001100101101010001001100101101001001010010001010001001001100101011101101010111101",
      enc.encode().data);

    // Special characters
    var enc = new CODE93FullASCII("AB!*12", {});
    assert.equal("1010111101101010001101001001110101101101010001110101101001101001010010001010001001100101001101011001010111101",
      enc.encode().data);

    // Non-printable ASCII characters
    var enc = new CODE93FullASCII("AB\x07\x09", {});
    assert.equal("1010111101101010001101001001001001101011010001001001101011000101011010001011011001010111101",
      enc.encode().data);
  });

  it('should warn with invalid text', function () {
    // Lowercase characters
    var enc = new CODE93("ABab12", {});
    assert.equal(false, enc.valid());

    // Special characters
    var enc = new CODE93("AB!12", {});
    assert.equal(false, enc.valid());

    // Non-printable ASCII
    var enc = new CODE93("AB\x07	", {});
    assert.equal(false, enc.valid());

    // Non-ASCII
    var enc = new CODE93FullASCII("ABð", {});
    assert.equal(false, enc.valid());
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
