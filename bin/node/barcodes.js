'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CODE = require('./barcodes/CODE39.js');

var _CODE2 = _interopRequireDefault(_CODE);

var _CODE3 = require('./barcodes/CODE128.js');

var _CODE4 = _interopRequireDefault(_CODE3);

var _EAN_UPC = require('./barcodes/EAN_UPC.js');

var _EAN_UPC2 = _interopRequireDefault(_EAN_UPC);

var _ITF = require('./barcodes/ITF14.js');

var _ITF2 = _interopRequireDefault(_ITF);

var _ITF3 = require('./barcodes/ITF.js');

var _ITF4 = _interopRequireDefault(_ITF3);

var _MSI = require('./barcodes/MSI.js');

var _MSI2 = _interopRequireDefault(_MSI);

var _pharmacode = require('./barcodes/pharmacode.js');

var _pharmacode2 = _interopRequireDefault(_pharmacode);

var _GenericBarcode = require('./barcodes/GenericBarcode.js');

var _GenericBarcode2 = _interopRequireDefault(_GenericBarcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  CODE39: _CODE2.default,
  CODE128: _CODE4.default,
  EAN_UPC: _EAN_UPC2.default,
  ITF14: _ITF2.default,
  ITF: _ITF4.default,
  MSI: _MSI2.default,
  pharmacode: _pharmacode2.default,
  GenericBarcode: _GenericBarcode2.default
};