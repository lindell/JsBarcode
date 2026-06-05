import assert from 'assert';
import _ean13 from './EAN13';
import _ean8 from './EAN8';
import _ean5 from './EAN5';
import _ean2 from './EAN2';
import _upc from './UPC';
import _upce from './UPCE';
const ean13 = _ean13 as any;
const ean8 = _ean8 as any;
const ean5 = _ean5 as any;
const ean2 = _ean2 as any;
const upc = _upc as any;
const upce = _upce as any;
function fixBin(a: any): string {
	return stripZero(mergeToBin(a));
}

function fixText(encodeData: any): string {
	if (Array.isArray(encodeData)) {
		var ret = '';
		for (var i = 0; i < encodeData.length; i++) {
			ret += fixText(encodeData[i]);
		}
		return ret;
	} else {
		return encodeData.text || '';
	}
}

function mergeToBin(encodeData: any): string {
	if (Array.isArray(encodeData)) {
		var ret = '';
		for (var i = 0; i < encodeData.length; i++) {
			ret += toBin(encodeData[i].data);
		}
		return ret;
	} else {
		return toBin(encodeData);
	}
}

function toBin(res: any): string {
	var ret = '';
	for (var i = 0; i < res.length; i++) {
		if (res[i] > 0) {
			ret += '1';
		} else {
			ret += '0';
		}
	}
	return ret;
}

function stripZero(string: string): string {
	const match = string.match(/^0*(.+?)0*$/);
	return match ? match[1] : '';
}

var options = { height: 100, displayValue: true, fontSize: 20, textMargin: 2, width: 2 };

describe('UPC-A', function() {
	it('should be able to encode normal text', function() {
		const encoded = upc().encode('123456789999', { ...options });
		assert.equal(
			'10100110010010011011110101000110110001010111101010100010010010001110100111010011101001110100101',
			fixBin(encoded),
		);
	});

	it('should warn with invalid text', function() {
		const valid = upc().valid('12345678999');
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const encoded = upc().encode('123456789999', { ...options, ...{ text: 'THISISTEXT' } });
		assert.equal('THISISTEXT', fixText(encoded));
	});

	it('should work with flat option', function() {
		const encoded: any = upc({ flat: true }).encode('123456789999', { ...options });
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
		const encoded = upce().encode('01245714', { ...options });
		assert.equal(UPCE_BINARY, fixBin(encoded));
	});

	it('should be able to encode 6-digit codes by assuming a 0 number system', function() {
		const encoded = upce().encode('124571', { ...options });
		assert.equal(UPCE_BINARY, fixBin(encoded));
	});

	it('should warn with invalid text', function() {
		const valid = upce().valid('01245715');
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const encoded = upce().encode('124571', { ...options, ...{ text: 'SOMETEXT' } });
		assert.equal('SOMETEXT', fixText(encoded));
	});

	it('should work with flat option', function() {
		const encoded: any = upce().encode('01245714', { ...options, ...{ flat: true } });
		assert.equal(UPCE_BINARY, encoded.data);
		assert.equal('01245714', encoded.text);
	});
});

describe('EAN', function() {
	it('should be able to encode normal text', function() {
		var encoded = ean13().encode('5901234123457', { ...options });
		var valid = ean13().valid('5901234123457');
		assert.equal(true, valid);
		assert.equal(
			'10100010110100111011001100100110111101001110101010110011011011001000010101110010011101000100101',
			fixBin(encoded),
		);
		assert.equal('5901234123457', fixText(encoded));
	});

	it('should be able to encode normal text with flat option', function() {
		var encoded: any = ean13({ flat: true }).encode('5901234123457', { ...options });
		var valid = ean13({ flat: true }).valid('5901234123457');
		assert.equal(true, valid);
		assert.equal(
			'10100010110100111011001100100110111101001110101010110011011011001000010101110010011101000100101',
			encoded.data,
		);
		assert.equal('5901234123457', fixText(encoded));
	});

	it('should warn with invalid text', function() {
		var valid = ean13().valid('12345');
		assert.equal(false, valid);

		valid = ean13().valid('5901234123456  ');
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		var encoded = ean13().encode('12345678999', { ...options, ...{ text: 'THISISTEXT' } });
		assert.equal('THISISTEXT', fixText(encoded));
	});
});

describe('EAN-8', function() {
	it('should be able to encode normal text', function() {
		var encoded = ean8().encode('96385074', {});
		var valid = ean8().valid('96385074');

		assert.equal(true, valid);
		assert.equal('1010001011010111101111010110111010101001110111001010001001011100101', fixBin(encoded));
		assert.equal('96385074', fixText(encoded));
	});

	it('should be able to encode normal text with flat option', function() {
		const encoded: any = ean8().encode('96385074', { ...options, ...{ flat: true } });
		const valid = ean8().valid('96385074');

		assert.equal(true, valid);
		assert.equal('1010001011010111101111010110111010101001110111001010001001011100101', encoded.data);
		assert.equal('96385074', fixText(encoded));
	});

	it('should warn with invalid text', function() {
		var valid = ean8().valid('12345');
		assert.equal(false, valid);

		var valid = ean8().valid('96385073');
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		var encoded = ean8().encode('96385074', { ...options, ...{ text: 'THISISTEXT', flat: true } });
		assert.equal('THISISTEXT', fixText(encoded));
	});
});

describe('EAN-5', function() {
	it('should be able to encode normal text', function() {
		let encoded = ean5().encode('54495', {});
		let valid = ean5().valid('54495');
		assert.equal(true, valid);
		assert.equal('10110110001010100011010011101010001011010111001', encoded.data);

		encoded = ean5().encode('12345', {});
		valid = ean5().valid('12345');
		assert.equal(true, valid);
		assert.equal('10110110011010010011010100001010100011010110001', encoded.data);
	});

	it('should warn with invalid text', function() {
		let valid = ean5().valid('1234');
		assert.equal(false, valid);

		valid = ean5().valid('123a5');
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		let encoded = ean5().encode('12345', { ...options, ...{ text: 'THISISTEXT' } });
		assert.equal('THISISTEXT', fixText(encoded));
	});
});

describe('EAN-2', function() {
	it('should be able to encode normal text', function() {
		let encoded = ean2().encode('53', {});
		let valid = ean2().valid('53');
		assert.equal(true, valid);
		assert.equal('10110110001010100001', encoded.data);

		encoded = ean2().encode('12', {});
		valid = ean2().valid('12');
		assert.equal(true, valid);
		assert.equal('10110011001010010011', encoded.data);
	});

	it('should warn with invalid text', function() {
		let valid = ean2().valid('1');
		assert.equal(false, valid);

		valid = ean2().valid('a2');
		assert.equal(false, valid);
	});

	it('should work with text option', function() {
		const encoded = ean2().encode('12', { ...options, ...{ text: 'THISISTEXT' } });
		assert.equal('THISISTEXT', fixText(encoded));
	});
});
