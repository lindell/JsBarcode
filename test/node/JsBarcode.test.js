var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var { createCanvas } = require("canvas");

describe('Encoders', function() {
  it('should be able to include the encoders needed', function () {
    CODE128 = JsBarcode.getModule("CODE128");
    GENERIC = JsBarcode.getModule("GenericBarcode");
  });
});

describe('node-canvas generation', function() {
  it('should generate normal canvas', function () {
    var canvas = createCanvas();
    JsBarcode(canvas, "Hello");
  });

  it('checking width', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();

    JsBarcode(canvas1, "Hello", {format: "CODE128"});
    JsBarcode(canvas2, "Hello", {format: "CODE39"});

    assert.notEqual(canvas1.width, canvas2.width);
  });

  it('should throws errors when suppose to', function () {
    var canvas = createCanvas();
    assert.throws(function(){JsBarcode(canvas, "Hello", {format: "EAN8"});});
    assert.throws(function(){JsBarcode("Hello", "Hello", {format: "DOESNOTEXIST"});});
    assert.throws(function(){JsBarcode(123, "Hello", {format: "DOESNOTEXIST"});});
  });

  it('should use the valid callback correct', function (done) {
    var canvas = createCanvas();

    JsBarcode(canvas, "Hello", {
      format: "CODE128",
      valid: function(valid){
        if(valid){
          done();
        }
      }
    });
  });

  it('should use false valid callback correct', function (done) {
    var canvas = createCanvas();

    JsBarcode(canvas, "Hello", {
      format: "pharmacode",
      valid: function(valid){
        if(!valid){
          done();
        }
      }
    });
  });

  it('should create output with same input', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();

    JsBarcode(canvas1, "Hello", {format: "CODE128"});
    JsBarcode(canvas2, "Hello", {format: "CODE128"});

    assert.equal(canvas1.toDataURL(), canvas2.toDataURL());
  });

  it('should set background', function () {
    var canvas = createCanvas();
    var ctx = canvas.getContext("2d");
    JsBarcode(canvas, "Hello", {format: "CODE128", background: "#f00"});

    var topLeft = ctx.getImageData(0,0,1,1);
    assert.equal(255, topLeft.data[0]);
    assert.equal(0, topLeft.data[1]);
    assert.equal(0, topLeft.data[2]);
  });
});

describe('Text printing', function() {
  it('should produce different output when displaying value', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();

    JsBarcode(canvas1, "Hello", {format: "CODE128", displayValue: false});
    JsBarcode(canvas2, "Hello", {format: "CODE128"});

    assert.notEqual(canvas1.toDataURL(), canvas2.toDataURL());
  });

  it('should produce different output when having different textAlign', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();
    var canvas3 = createCanvas();

    JsBarcode(canvas1, "Hello", {format: "CODE128", displayValue: true, textAlign: "center"});
    JsBarcode(canvas2, "Hello", {format: "CODE128", displayValue: true, textAlign: "left"});
    JsBarcode(canvas3, "Hello", {format: "CODE128", displayValue: true, textAlign: "right"});

    assert.notEqual(canvas1.toDataURL(), canvas2.toDataURL());
    assert.notEqual(canvas2.toDataURL(), canvas3.toDataURL());
    assert.notEqual(canvas1.toDataURL(), canvas3.toDataURL());
  });

  it('should allow numbers as input', function () {
    var canvas = createCanvas();

    JsBarcode(canvas, 1234567890128, {format: "EAN13"});
  });
});

describe('Extended Arrays', function() {
  it('should work with extended arrays', function () {
    Array.prototype.test = function(){};
    Array.prototype._test = "test";

    var canvas = createCanvas();
    JsBarcode(canvas, "Hello");
    JsBarcode(canvas, "HI", {format: "CODE39"});
  });
});

describe('Generic barcode', function() {
  it('should not fail generic barcode', function () {
    var enc = new GENERIC("1234", {});
    assert.equal(enc.valid(), true);
    assert.equal(enc.encode().text, "1234");
  });
});
