var assert = require('assert');
var JsBarcode = require('../../bin/JsBarcode.js');
const { DOMImplementation, XMLSerializer } = require('xmldom');
const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);

describe('SVG', function() {
  it('should work with external SVG implementation', function () {
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    JsBarcode(svgNode, 'test', {
      xmlDocument: document
    });

    let xml = xmlSerializer.serializeToString(svgNode);
    assert(xml.length > 200);
  });
});
