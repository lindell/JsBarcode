var assert = require('assert');
var { MSI, MSI10, MSI11, MSI1010, MSI1110 } = require('../../lib/barcodes/MSI');

describe('MSI', function() {
	it('should be able to encode normal text', function() {
		let encoded = MSI10().encode('1234567', {});
		let valid = MSI10().valid('1234567', {});
		assert.equal(true, valid);
		assert.equal('12345674', encoded.text);
		assert.equal(
			'1101001001001101001001101001001001101101001101001001001101001101001101101001001101101101001101001001001',
			encoded.data,
		);

		encoded = MSI().encode('12345674', {});
		assert.equal(
			'1101001001001101001001101001001001101101001101001001001101001101001101101001001101101101001101001001001',
			encoded.data,
		);

		valid = MSI10().valid('17345', {});
		encoded = MSI10().encode('17345', {});
		assert.equal(true, valid);
		assert.equal('173450', encoded.text);

		valid = MSI10().valid('1234', {});
		encoded = MSI10().encode('1234', {});
		assert.equal(true, valid);
		assert.equal('12344', encoded.text);
	});

	it('should encode MSI11', function() {
		let encoded = MSI11().encode('123456', {});
		assert.equal('1234560', encoded.text);

		encoded = MSI11().encode('12345678', {});
		assert.equal('123456785', encoded.text);

		encoded = MSI11().encode('1234567891011', {});
		assert.equal('12345678910115', encoded.text);

		encoded = MSI11().encode('1134567', {});
		assert.equal('11345670', encoded.text);
	});

	it('should encode MSI1010', function() {
		let encoded = MSI1010().encode('1234567', {});
		assert.equal('123456741', encoded.text);

		encoded = MSI1010().encode('1337', {});
		assert.equal('133751', encoded.text);
	});

	it('should encode MSI1110', function() {
		let encoded = MSI1110().encode('12345678', {});
		assert.equal('1234567855', encoded.text);

		encoded = MSI1110().encode('1337', {});
		assert.equal('133744', encoded.text);
	});

	it('should warn with invalid text', function() {
		let valid = MSI().valid('12345ABC', {});
		assert.equal(false, valid);

		valid = MSI().valid('12345AB675', {});
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		let encoded = MSI().encode('12345674', { text: 'THISISTEXT' });
		assert.equal('THISISTEXT', encoded.text);
	});
});
