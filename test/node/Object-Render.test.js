var assert = require('assert');
var jsbarcode = require('../../lib').default;
const objectRenderer = require('../../lib/renderers/object').default;
const code128 = require('../../lib/barcodes/CODE128/CODE128_AUTO').default;
const upc = require('../../lib/barcodes/EAN_UPC/UPC').default;

describe('Object', function() {
	it('should handle default options', function () {
		var data = {};
		jsbarcode(data, '12345678', { renderer: objectRenderer, encoder: code128 });
		assert.equal(typeof data.encodings, 'object', { renderer: objectRenderer });
	});

	it('should catch null', function() {
		assert.throws(
			() => {
				jsbarcode(null, '12345678', { renderer: objectRenderer, encoder: code128 });
			},
			(err) => err.name === 'InvalidElementException'
		);
	});
	
	it('should work for different types', function () {
		var data = {};
		jsbarcode(data, '550000000000', {
			renderer: objectRenderer,
			encoder: upc,
		});
		assert.equal(data.encodings.length, 7);
	});
});
