var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var Canvas = require("canvas");

describe('Object', function() {
	it('should handle default options', function () {
		var data = {};
		JsBarcode(data, '12345678');
		assert.equal(typeof data.encodings, 'object');
	});

	it('should catch null', function() {
		assert.throws(
			() => {
				JsBarcode(null, '12345678');
			},
			/InvalidElementException/
		);
	});

  it('should ignore dom elements', function() {
    var fakeElement = {
      nodeName: 'Some Dom Element'
    }
    assert.throws(
      () => {
        JsBarcode(fakeElement, '2345678');
      },
      /InvalidElementException/
    );
  });
	
	it('should work for different types', function () {
		var data = {};
		JsBarcode(data, '550000000000', {
			format: 'upc'
		});
		assert.equal(data.encodings.length, 7);
		assert.ok(data.encodings.every((val) => val.options.format === 'upc'));
	});
});
