var assert = require('assert');
const ean13 = require('../../lib/barcodes/EAN_UPC/EAN13').default;
const ean8 = require('../../lib/barcodes/EAN_UPC/EAN8').default;
const ean5 = require('../../lib/barcodes/EAN_UPC/EAN5').default;
const ean2 = require('../../lib/barcodes/EAN_UPC/EAN2').default;
const upc = require('../../lib/barcodes/EAN_UPC/UPC').default;
const upce = require('../../lib/barcodes/EAN_UPC/UPCE').default;
var help = require('./help/help');
var clone = help.clone;

var options = { height: 100, displayValue: true, fontSize: 20, textMargin: 2, width: 2 };

describe('UPC-A', function() {
	it('should be able to encode normal text', function() {
		const encoded = upc.encode('123456789999', clone(options));
		assert.equal(
			'10100110010010011011110101000110110001010111101010100010010010001110100111010011101001110100101',
			help.fixBin(encoded),
		);
	});

	it('should warn with invalid text', function() {
		const valid = upc.valid('12345678999', clone(options));
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const encoded = upc.encode('123456789999', help.merge(options, { text: 'THISISTEXT' }));
		assert.equal('THISISTEXT', help.fixText(encoded));
	});

	it('should work with flat option', function() {
		const encoded = upc.encode('123456789999', help.merge(options, { flat: true }));
		assert.equal(
			'10100110010010011011110101000110110001010111101010100010010010001110100111010011101001110100101',
			encoded.data,
		);
		assert.equal('123456789999', encoded.text);
	});
});

const UPCE_BINARY = '101011001100100110011101011100101110110011001010101';
describe('UPC-E', function() {
	it('should be able to encode 8-digit codes', function() {
		const encoded = upce.encode('01245714', clone(options));
		assert.equal(UPCE_BINARY, help.fixBin(encoded));
	});

	it('should be able to encode 6-digit codes by assuming a 0 number system', function() {
		const encoded = upce.encode('124571', clone(options));
		assert.equal(UPCE_BINARY, help.fixBin(encoded));
	});

	it('should warn with invalid text', function() {
		const valid = upce.valid('01245715', clone(options));
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const encoded = upce.encode('124571', help.merge(options, { text: 'SOMETEXT' }));
		assert.equal('SOMETEXT', help.fixText(encoded));
	});

	it('should work with flat option', function() {
		const encoded = upce.encode('01245714', help.merge(options, { flat: true }));
		assert.equal(UPCE_BINARY, encoded.data);
		assert.equal('01245714', encoded.text);
	});
});

describe('EAN', function() {
	it('should be able to encode normal text', function() {
		var encoded = ean13.encode('5901234123457', clone(options));
		var valid = ean13.valid('5901234123457', clone(options));
		assert.equal(true, valid);
		assert.equal(
			'10100010110100111011001100100110111101001110101010110011011011001000010101110010011101000100101',
			help.fixBin(encoded),
		);
		assert.equal('5901234123457', help.fixText(encoded));
	});

	it('should be able to encode normal text with flat option', function() {
		var encoded = ean13.encode('5901234123457', help.merge(options, { flat: true }));
		var valid = ean13.valid('5901234123457', help.merge(options, { flat: true }));
		assert.equal(true, valid);
		assert.equal(
			'10100010110100111011001100100110111101001110101010110011011011001000010101110010011101000100101',
			encoded.data,
		);
		assert.equal('5901234123457', help.fixText(encoded));
	});

	it('should warn with invalid text', function() {
		var valid = ean13.valid('12345', {});
		assert.equal(false, valid);

		valid = ean13.valid('5901234123456  ', {});
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		var encoded = ean13.encode('12345678999', help.merge(options, { text: 'THISISTEXT' }));
		assert.equal('THISISTEXT', help.fixText(encoded));
	});
});

describe('EAN-8', function() {
	it('should be able to encode normal text', function() {
		var encoded = ean8.encode('96385074', {});
		var valid = ean8.valid('96385074', {});

		assert.equal(true, valid);
		assert.equal('1010001011010111101111010110111010101001110111001010001001011100101', help.fixBin(encoded));
		assert.equal('96385074', help.fixText(encoded));
	});

	it('should be able to encode normal text with flat option', function() {
		const args = ['96385074', help.merge(options, { flat: true })];
		const encoded = ean8.encode(...args);
		const valid = ean8.valid(...args);

		assert.equal(true, valid);
		assert.equal('1010001011010111101111010110111010101001110111001010001001011100101', encoded.data);
		assert.equal('96385074', help.fixText(encoded));
	});

	it('should warn with invalid text', function() {
		var valid = ean8.valid('12345', {});
		assert.equal(false, valid);

		var valid = ean8.valid('96385073', {});
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		var encoded = ean8.encode('96385074', help.merge(options, { text: 'THISISTEXT', flat: true }));
		assert.equal('THISISTEXT', help.fixText(encoded));
	});
});

describe('EAN-5', function() {
	it('should be able to encode normal text', function() {
		let args = ['54495', {}];
		let encoded = ean5.encode(...args);
		let valid = ean5.valid(...args);
		assert.equal(true, valid);
		assert.equal('10110110001010100011010011101010001011010111001', encoded.data);

		args = ['12345', {}];
		encoded = ean5.encode(...args);
		valid = ean5.valid(...args);
		assert.equal(true, valid);
		assert.equal('10110110011010010011010100001010100011010110001', encoded.data);
	});

	it('should warn with invalid text', function() {
		let valid = ean5.valid('1234', {});
		assert.equal(false, valid);

		valid = ean5.valid('123a5', {});
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const args = ['12345', help.merge(options, { text: 'THISISTEXT' })];
		let encoded = ean5.encode(...args);
		assert.equal('THISISTEXT', help.fixText(encoded));
	});
});

describe('EAN-2', function() {
	it('should be able to encode normal text', function() {
		let encoded = ean2.encode('53', {});
		let valid = ean2.valid('53', {});
		assert.equal(true, valid);
		assert.equal('10110110001010100001', encoded.data);

		encoded = ean2.encode('12', {});
		valid = ean2.valid('12', {});
		assert.equal(true, valid);
		assert.equal('10110011001010010011', encoded.data);
	});

	it('should warn with invalid text', function() {
		let valid = ean2.valid('1', {});
		assert.equal(false, valid);

		valid = ean2.valid('a2', {});
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const encoded = ean2.encode('12', help.merge(options, { text: 'THISISTEXT' }));
		assert.equal('THISISTEXT', help.fixText(encoded));
	});
});
