const assert = require('assert');
const code128 = require('../../lib/barcodes/CODE128/CODE128_AUTO').default();
const code128a = require('../../lib/barcodes/CODE128/CODE128A').default();
const code128b = require('../../lib/barcodes/CODE128/CODE128B').default();
const code128c = require('../../lib/barcodes/CODE128/CODE128C').default();


describe('CODE128', function() {
  it('should encode CODE128A', function () {
    assert.equal("1101000010010100011000100010110001000100011011011011110100011101101100011101011"
      , code128a.encode("ABC" + String.fromCharCode(25), {}).data);
  });

  it('should encode CODE128B', function () {
    assert.equal("110100100001001011000011000110110100010110001110011001010011100110110111001001100011101011"
      , code128b.encode("a@B=1", {}).data);
  });

  it('should encode CODE128C', function () {
    assert.equal("11010011100101100111001000101100011100010110100011011101100011101011"
      , code128c.encode("123456", {}).data);
  });

  it('should encode CODE128 as GS1-128/EAN-128', function () {
    assert.equal("110100111001111010111010110011100100010110001110001011011000010100110010011101100011101011",
      code128c.encode("12345678", { ean128: true }).data);
  });

  it('should remove unprintable characters', function () {
    assert.equal("AB C", code128c.encode("A\n\x00B \x04\x10\x1FC", {}).text);
  });

  it('should encode CODE128 (auto)', function () {
    assert.equal("110100111001011001110010001011000101111011101101110010011000101000101100100001000011001010111100100100101100001100001010010111011110101100111001000101100011100010110111010111101000011010010100011000111011110101100011101011",
      code128.encode("12345Hejsan123456\tA", {}).data);

    assert.equal("110100100001100010100010000110100111010111101000011001010011100110101110111101110110111010111011000111001100101100011101011"
      , code128.encode("Hi\n12345", {}).data);

    assert.equal("11010000100110001010001100010001010000110010110001010001011110111010000110100110110011001100011101011"
      , code128.encode("HI\nHi", {}).data);

    assert.equal("1101000010011000101000110001000101000011001010111100010110001010001011110111010000110100111101010001011101111010110011100100010110001110001011011110101110110011100101100011101011"
      , code128.encode("HI\n" + String.fromCharCode(201) + "Hi" + String.fromCharCode(202) + "123456" + String.fromCharCode(207), {}).data);

    assert.equal("110100111001111010111010110111000110011100101100010100011001001110110001011101110101111010011101100101011110001100011101011"
      , code128.encode(String.fromCharCode(207) + "42184020500", {}).data);

    assert.equal("1101001000011011101000100110000101000111101010011110010110010100001000010011011110100010100001100101011110010010011000010100001101001011000010010011110100100011010001100011101011"
      , code128.encode("Should\nshift", {}).data);

    assert.equal("1101000010010000110100110001010001111010001010000110100100001100101100010100011000100010111101101101100011101011"
      , code128.encode("\tHi\nHI", {}).data);
  });

  it('should warn with invalid text', function () {
    assert.equal(false, code128.valid("ABC" + String.fromCharCode(500), {}));

    assert.equal(false, code128a.valid("Abc", {}));

    assert.equal(false, code128b.valid("Abc\t123", {}));

    assert.equal(false, code128c.valid("1234ab56", {}));

    assert.equal(false, code128c.valid("12345", {}));
  });

  it('should pass valid text', function () {
    assert.equal(true, code128.valid("ABC" + String.fromCharCode(207), {}));

    assert.equal(true, code128a.valid("ABC\t\n123", {}));

    assert.equal(true, code128b.valid("Abc123" + String.fromCharCode(202), {}));

    assert.equal(true, code128c.valid("123456", {}));
  });

  it('should work with text option', function () {
    assert.equal("THISISTEXT", code128.encode("AB12", {text: "THISISTEXT"}).text);
  });
});
