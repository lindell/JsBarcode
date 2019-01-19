var assert = require('assert');
var ITF = require('../../lib/barcodes/ITF/ITF').default;

describe('ITF', function() {
  it('should be able to encode normal text', function () {
    var enc = new ITF("123456", {});
    assert.equal("101011101000101011100011101110100010100011101000111000101011101"
      , enc.encode().data);
  });

  it('should return getText correct', function () {
    var enc = new ITF("123456", {});
    assert.equal("123456", enc.encode().text);
  });

  it('should warn with invalid text', function () {
    var enc = new ITF("12345", {});
    assert.equal(false, enc.valid());

    var enc = new ITF("1234AB", {});
    assert.equal(false, enc.valid());
  });

  it('should work with text option', function () {
    var enc = new ITF("123456", {text: "THISISTEXT"});
    assert.equal("THISISTEXT", enc.encode().text);
  });
});
