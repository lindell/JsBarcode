var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");

describe('Object', function() {
	it('should handle default options', function () {
		var data = {};
		JsBarcode(data, '12345678');
		assert.equal(typeof data.encodings, 'object');
	});

	it('should still catch targets', function() {
		assert.throws(
			() => {
				JsBarcode(null, '12345678');
			},
			/InvalidElementException/
		);
	});
});
