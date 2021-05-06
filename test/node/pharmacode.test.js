var assert = require('assert');
const pharmacode = require('../../lib/barcodes/pharmacode').default();

describe('Pharmacode', function() {
	it('should be able to encode normal text', function() {
		let encoded = pharmacode.encode('1234', {});
		assert.equal('10010011100111001001110010010011100111', encoded.data);

		encoded = pharmacode.encode('4567', {});
		assert.equal('10010010011100111001110010011100111001001001', encoded.data);

		encoded = pharmacode.encode('12', {});
		assert.equal('11100100111', encoded.data);
	});

	it('should return getText correct', function() {
		let encoded = pharmacode.encode('1234', {});
		assert.equal('1234', encoded.text);
	});

	it('should warn with invalid text', function() {
		assert.equal(false, pharmacode.valid('12345678', {}));
	});

	it('should work with text option', function() {
		let encoded = pharmacode.encode('12345678', { text: 'THISISTEXT' });
		assert.equal('THISISTEXT', encoded.text);
	});
});
