const assert = require('assert');
const JsBarcode = require('packages/jsbarcode/src/index').default;
const code128 = require('packages/barcodes/code128/src/CODE128_AUTO').default();
const svgRenderer = require('packages/renderer/svg/src/index').default;
const xmldom  = require('@xmldom/xmldom');
const DOMImplementation = xmldom.DOMImplementation;
const XMLSerializer = xmldom.XMLSerializer;
const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);

describe('SVG', function() {
  it('should work with external SVG implementation', function () {
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    JsBarcode(svgNode, 'test', {
      xmlDocument: document,
      encoder: code128,
      renderer: svgRenderer,
    });

    const xml = xmlSerializer.serializeToString(svgNode);
    assert(xml.length > 200);
  });
});
