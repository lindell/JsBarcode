var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
var xmldom  = require('xmldom');
var DOMImplementation = xmldom.DOMImplementation;
var XMLSerializer = xmldom.XMLSerializer;
var xmlSerializer = new XMLSerializer();
var document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);

describe('SVG', function() {
  it('should work with external SVG implementation', function () {
    var svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    JsBarcode(svgNode, 'test', {
      xmlDocument: document
    });

    var xml = xmlSerializer.serializeToString(svgNode);
    assert(xml.length > 200);
  });
});
