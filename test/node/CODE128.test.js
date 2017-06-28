var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");


describe('CODE128', function() {
  it('should be able to include the encoder(s)', function () {
    CODE128 = JsBarcode.getModule("CODE128");
    CODE128A = JsBarcode.getModule("CODE128A");
    CODE128B = JsBarcode.getModule("CODE128B");
    CODE128C = JsBarcode.getModule("CODE128C");
  });

  it('should encode CODE128A', function () {
    var enc = new CODE128A("ABC" + String.fromCharCode(25), {});
    assert.equal("1101000010010100011000100010110001000100011011011011110100011101101100011101011"
      , enc.encode().data);
  });

  it('should encode CODE128B', function () {
    var enc = new CODE128B("a@B=1", {});
    assert.equal("110100100001001011000011000110110100010110001110011001010011100110110111001001100011101011"
      , enc.encode().data);
  });

  it('should encode CODE128C', function () {
    var enc = new CODE128C("123456", {});
    assert.equal("11010011100101100111001000101100011100010110100011011101100011101011"
      , enc.encode().data);
  });

  it('should encode CODE128 as GS1-128/EAN-128', function () {
    var enc = new CODE128C("12345678", { ean128: true });
    assert.equal("110100111001111010111010110011100100010110001110001011011000010100110010011101100011101011",
      enc.encode().data);
  });

  it('should remove unprintable characters', function () {
    var enc = new CODE128C("A\n\x00B \x04\x10\x1FC", {});
    assert.equal("AB C", enc.encode().text);
  });

  it('should encode CODE128 (auto)', function () {
    var enc = new CODE128("12345Hejsan123456\tA", {});
    assert.equal("110100111001011001110010001011000101111011101101110010011000101000101100100001000011001010111100100100101100001100001010010111011110101100111001000101100011100010110111010111101000011010010100011000111011110101100011101011",
      enc.encode().data);

    var enc = new CODE128("Hi\n12345", {});
    assert.equal("110100100001100010100010000110100111010111101000011001010011100110101110111101110110111010111011000111001100101100011101011"
      , enc.encode().data);

    var enc = new CODE128("HI\nHi", {});
    assert.equal("11010000100110001010001100010001010000110010110001010001011110111010000110100110110011001100011101011"
      , enc.encode().data);

    var enc = new CODE128("HI\n" + String.fromCharCode(201) + "Hi" + String.fromCharCode(202) + "123456" + String.fromCharCode(207), {});
    assert.equal("1101000010011000101000110001000101000011001010111100010110001010001011110111010000110100111101010001011101111010110011100100010110001110001011011110101110110011100101100011101011"
      , enc.encode().data);

    var enc = new CODE128(String.fromCharCode(207) + "42184020500", {});
    assert.equal("110100111001111010111010110111000110011100101100010100011001001110110001011101110101111010011101100101011110001100011101011"
      , enc.encode().data);

    var enc = new CODE128("Should\nshift", {});
    assert.equal("1101001000011011101000100110000101000111101010011110010110010100001000010011011110100010100001100101011110010010011000010100001101001011000010010011110100100011010001100011101011"
      , enc.encode().data);

    var enc = new CODE128("\tHi\nHI", {});
    assert.equal("1101000010010000110100110001010001111010001010000110100100001100101100010100011000100010111101101101100011101011"
      , enc.encode().data);

  });

  it('should warn with invalid text', function () {
    var enc = new CODE128("ABC" + String.fromCharCode(500), {});
    assert.equal(false, enc.valid(), {});

    var enc = new CODE128A("Abc", {});
    assert.equal(false, enc.valid());

    var enc = new CODE128B("Abc\t123", {});
    assert.equal(false, enc.valid());

    var enc = new CODE128C("1234ab56", {});
    assert.equal(false, enc.valid());

    var enc = new CODE128C("12345", {});
    assert.equal(false, enc.valid());
  });

  it('should pass valid text', function () {
    var enc = new CODE128("ABC" + String.fromCharCode(207), {});
    assert.equal(true, enc.valid());

    var enc = new CODE128A("ABC\t\n123", {});
    assert.equal(true, enc.valid());

    var enc = new CODE128B("Abc123" + String.fromCharCode(202), {});
    assert.equal(true, enc.valid());

    var enc = new CODE128C("123456", {});
    assert.equal(true, enc.valid());
  });

  it('should work with text option', function () {
    var enc = new CODE128("AB12", {text: "THISISTEXT"});
    assert.equal("THISISTEXT", enc.encode().text);
  });
});
