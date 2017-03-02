const assert = require('assert');
const JsBarcode = require('../../bin/JsBarcode.js');

describe('KIX', function () {
    it('should be able to include the encoder(s)', function () {
        KIX = JsBarcode.getModule("KIX");
    });

    it('should be able to encode normal text', function () {
        const enc = new KIX("AB12", {height: 100});
        const expectedResult = [
            {"start": 0.37, "end": 1},
            0,
            {"start": 0, "end": 0.63},
            0,
            {"start": 0.37, "end": 1},
            0,
            {"start": 0, "end": 0.63},
            0,
            {"start": 0.37, "end": 1},
            0,
            {"start": 0, "end": 1},
            0,
            {"start": 0.37, "end": 0.63},
            0,
            {"start": 0, "end": 0.63},
            0,
            {"start": 0.37, "end": 0.63},
            0,
            {"start": 0.37, "end": 1},
            0,
            {"start": 0, "end": 0.63},
            0,
            {"start": 0, "end": 1},
            0,
            {"start": 0.37, "end": 0.63},
            0,
            {"start": 0.37, "end": 1},
            0,
            {"start": 0, "end": 1},
            0,
            {"start": 0, "end": 0.63}
        ];
        assert.deepEqual(expectedResult, enc.encode().data);
    });

    it('should warn with invalid text', function () {
        const enc = new KIX("AB!12", {});
        assert.equal(false, enc.valid());
    });

    it('should make lowercase to uppercase', function () {
        const enc = new KIX("abc123ABC", {});
        assert.equal("ABC123ABC", enc.encode().text);
    });

    it('should work with text option', function () {
        const enc = new KIX("AB12", {text: "THISISTEXT"});
        assert.equal("THISISTEXT", enc.encode().text);
    });
});
