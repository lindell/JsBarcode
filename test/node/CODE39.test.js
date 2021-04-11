const assert = require('assert');
const {encode, valid} = require('../../lib/barcodes/CODE39').default();

describe('CODE39', function() {
  it('should be able to encode normal text', function () {
    assert.equal("100010111011101011101010001011101011101000101110111010001010111010111000101011101000101110111010"
      , encode('AB12', {}).data);
  });

  it('should warn with invalid text', function () {
    assert.equal(false, valid("AB!12", {}));
  });

  it('should make lowercase to uppercase', function () {
    assert.equal("ABC123ABC", encode('abc123ABC', {}).text);
  });

  it('should calculate correct checksums', function () {
    assert.equal("1000101110111010111010100010111010111010001011101110111010001010101011100010111011101011100010101011101110001010101010001110111011101000111010101000101110111010"
      , encode('ABCDEFG', {mod43: true}).data);
  });

  it('should work with text option', function () {
    assert.equal("THISISTEXT", encode("AB12", {text: "THISISTEXT"}).text);
  });
});
