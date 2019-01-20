const assert = require('assert');
const jsbarcode = require('../../lib/').default;

const code128 = require('../../lib/barcodes/CODE128/CODE128_AUTO').default;
const code39 = require('../../lib/barcodes/CODE39').default;
const ean8 = require('../../lib/barcodes/EAN_UPC/EAN8').default;
const ean13 = require('../../lib/barcodes/EAN_UPC/EAN13').default;
const GENERIC = require('../../lib/barcodes/GenericBarcode').default;

const canvasRenderer =  require('../../lib/renderers/canvas').default;

const { createCanvas } = require("canvas-prebuilt");

describe('node-canvas generation', function() {
  it('should generate normal canvas', function () {
    var canvas = createCanvas();
    jsbarcode(canvas, "Hello", {
      encoder: code128,
      renderer: canvasRenderer,
    });
  });

  it('checking width', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();

    jsbarcode(canvas1, "Hello", {encoder: code128, renderer: canvasRenderer});
    jsbarcode(canvas2, "Hello", {encoder: code39, renderer: canvasRenderer});

    assert.notEqual(canvas1.width, canvas2.width);
  });

  it('should throws errors when suppose to', function () {
    var canvas = createCanvas();
    assert.throws(function(){jsbarcode(canvas, "Hello", {encoder: ean8, renderer: canvasRenderer});});
    assert.throws(function(){jsbarcode("Hello", "Hello");});
    assert.throws(function(){jsbarcode(123, "Hello");});
  });

  it('should throws error when no object is provided', function () {
    assert.throws(() =>{
      jsbarcode(undefined, "Hello", {encoder: ean8, renderer: canvasRenderer});
    }, (err) => err.name === 'NoElementException');
  });

  // it('should use the valid callback correct', function (done) {
  //   var canvas = createCanvas();

  //   jsbarcode(canvas, "Hello", {
  //     encoder: code128,
  //     renderer: canvasRenderer,
  //     valid: function(valid){
  //       if(valid){
  //         done();
  //       }
  //     }
  //   });
  // });

  // it('should use false valid callback correct', function (done) {
  //   var canvas = createCanvas();

  //   jsbarcode(canvas, "Hello", {
  //     encoder: pharmacode,
  //     renderer: canvasRenderer,
  //     valid: function(valid){
  //       if(!valid){
  //         done();
  //       }
  //     }
  //   });
  // });

  it('should create output with same input', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();

    jsbarcode(canvas1, "Hello", {encoder: code128, renderer: canvasRenderer});
    jsbarcode(canvas2, "Hello", {encoder: code128, renderer: canvasRenderer});

    assert.equal(canvas1.toDataURL(), canvas2.toDataURL());
  });

  it('should set background', function () {
    var canvas = createCanvas();
    var ctx = canvas.getContext("2d");
    jsbarcode(canvas, "Hello", {
      encoder: code128,
      renderer: canvasRenderer,
      background: "#f00"
    });

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

    jsbarcode(canvas1, "Hello", {encoder: code128, renderer: canvasRenderer, displayValue: false});
    jsbarcode(canvas2, "Hello", {encoder: code128, renderer: canvasRenderer});

    assert.notEqual(canvas1.toDataURL(), canvas2.toDataURL());
  });

  it('should produce different output when having different textAlign', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();
    var canvas3 = createCanvas();

    jsbarcode(canvas1, "Hello", {encoder: code128, renderer: canvasRenderer, displayValue: true, textAlign: "center"});
    jsbarcode(canvas2, "Hello", {encoder: code128, renderer: canvasRenderer, displayValue: true, textAlign: "left"});
    jsbarcode(canvas3, "Hello", {encoder: code128, renderer: canvasRenderer, displayValue: true, textAlign: "right"});

    assert.notEqual(canvas1.toDataURL(), canvas2.toDataURL());
    assert.notEqual(canvas2.toDataURL(), canvas3.toDataURL());
    assert.notEqual(canvas1.toDataURL(), canvas3.toDataURL());
  });

  it('should allow numbers as input', function () {
    var canvas = createCanvas();

    jsbarcode(canvas, 1234567890128, {encoder: ean13, renderer: canvasRenderer});
  });
});

describe('Advanced api use', function() {
  it('should work as simple version', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();

    jsbarcode(canvas1, "Hello", {encoder: code128, renderer: canvasRenderer});
    jsbarcode(canvas2).options({encoder: code128, renderer: canvasRenderer}).barcode("Hello").render();

    assert.equal(canvas1.toDataURL(), canvas2.toDataURL());
  });

  it('should work with blank', function () {
    var canvas1 = createCanvas();
    var canvas2 = createCanvas();

    jsbarcode(canvas1).options({encoder: code128, renderer: canvasRenderer}).barcode("Hello").barcode("Hello").render();
    jsbarcode(canvas2).options({encoder: code128, renderer: canvasRenderer}).barcode("Hello").blank(10).barcode("Hello").render();

    assert.notEqual(canvas1.toDataURL(), canvas2.toDataURL());
  });
});

describe('Extended Arrays', function() {
  it('should work with extended arrays', function () {
    Array.prototype.test = function(){};
    Array.prototype._test = "test";

    var canvas = createCanvas();
    jsbarcode(canvas, "Hello", {encoder: code128, renderer: canvasRenderer});
    jsbarcode(canvas, "HI", {encoder: code39, renderer: canvasRenderer});
  });
});

describe('Generic barcode', function() {
  it('should not fail generic barcode', function () {
    var enc = new GENERIC("1234", {});
    assert.equal(enc.valid(), true);
    assert.equal(enc.encode().text, "1234");
  });
});
