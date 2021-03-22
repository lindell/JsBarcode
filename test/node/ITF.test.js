var assert = require('assert');
var itf = require('../../lib/barcodes/ITF/ITF').default;

describe('ITF', function() {
	it('should be able to encode normal text', function() {
		const encoded = itf.encode('123456', {});
		assert.equal('101011101000101011100011101110100010100011101000111000101011101', encoded.data);
	});

	it('should return getText correct', function() {
		const encoded = itf.encode('123456', {});
		assert.equal('123456', encoded.text);
	});

	it('should warn with invalid text', function() {
		let valid = itf.valid('12345', {});
		assert.equal(false, valid);

		valid = itf.valid('1234AB', {});
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const encoded = itf.encode('123456', { text: 'THISISTEXT' });
		assert.equal('THISISTEXT', encoded.text);
	});
});
