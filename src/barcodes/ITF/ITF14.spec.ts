import assert from 'assert';
import itf14 from './ITF14';

describe('ITF-14', function() {
	it('should be able to encode normal text', function() {
		const encoded = itf14().encode('98765432109213', {});
		assert.equal(
			'101010001110101110001010100010001110111011101011100010100011101110001010100011101010001000111010111000101110100011100010001010111011101',
			encoded.data,
		);
	});

	it('should be able to add checksum if needed', function() {
		let encoded = itf14().encode('9876543210921', {});
		assert.equal(
			'101010001110101110001010100010001110111011101011100010100011101110001010100011101010001000111010111000101110100011100010001010111011101',
			encoded.data,
		);
	});

	it('should return text correct', function() {
		let encoded = itf14().encode('9876543210921', {});
		assert.equal('98765432109213', encoded.text);

		encoded = itf14().encode('98765432109213', {});
		assert.equal('98765432109213', encoded.text);
	});

	it('should warn with invalid text and not when valid', function() {
		let valid = itf14().valid('987654321092');
		assert.equal(false, valid);

		valid = itf14().valid('98765432109212');
		assert.equal(false, valid);

		valid = itf14().valid('98765432109213');
		assert.equal(true, valid);

		// Edge cases for check digit of zero
		valid = itf14().valid('00847280031740');
		assert.equal(true, valid);

		valid = itf14().valid('00847280031900');
		assert.equal(true, valid);

		valid = itf14().valid('00847280032020');
		assert.equal(true, valid);

		valid = itf14().valid('00847280031870');
		assert.equal(true, valid);

		valid = itf14().valid('00847280031450');
		assert.equal(true, valid);

		valid = itf14().valid('00847280031320');
		assert.equal(true, valid);
	});

	it('should work with text option', function() {
		let encoded = itf14().encode('00847280031450', { text: 'THISISTEXT' });
		assert.equal('THISISTEXT', encoded.text);
	});
});
