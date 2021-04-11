const assert = require('assert');
const {encode, valid} = require('../../lib/barcodes/codabar').default();

describe('Codabar', function() {
  it('should encode a string with start and stop characters', function() {
    assert.equal("10110010010101011001010100101101100101010101101001011010100101001001011"
      , encode("A12345B", {}).data);
  });

  it('should add start and stop characters to a string without them', function() {
    // should encode to "A12345A"
    assert.equal("10110010010101011001010100101101100101010101101001011010100101011001001"
      , encode("12345", {}).data);
  });

  it('should return text string without start/stop characters', function() {
    assert.equal("12345", encode("A12345B", {}).text)
  });

  it('should warn with invalid start/stop characters', function () {
    assert.equal(false, valid("X12345Y"));
  });

  it('should warn with only a start character', function () {
    assert.equal(false, valid("A12345"));
  });

  it('should warn with only an invalid start character', function () {
    assert.equal(false, valid("X12345"));
  });

  it('should warn with only a stop character', function () {
    assert.equal(false, valid("12345A"));
  });

  it('should warn with only an invalid stop character', function () {
    assert.equal(false, valid("12345X"));
  });

  it('should warn with only start and stop characters', function() {
    assert.equal(false, valid("AA"));
  });

  it('should warn with an empty string', function() {
    assert.equal(false, valid(""));
  });

  it('should warn with invalid input', function () {
    assert.equal(false, valid("A1234OOPS56A"));
  });

  it('should work with text option', function () {
    assert.equal("THISISATEXT", encode("A1234OOPS56A", {text: "THISISATEXT"}).text);
  });

});
