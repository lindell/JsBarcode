'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CODE = require('./barcodes/CODE39.js');

var _CODE2 = _interopRequireDefault(_CODE);

var _CODE3 = require('./barcodes/CODE128.js');

var _CODE4 = _interopRequireDefault(_CODE3);

var _EAN_UPC = require('./barcodes/EAN_UPC/');

var _ITF = require('./barcodes/ITF14.js');

var _ITF2 = _interopRequireDefault(_ITF);

var _ITF3 = require('./barcodes/ITF.js');

var _ITF4 = _interopRequireDefault(_ITF3);

var _MSI = require('./barcodes/MSI/MSI.js');

var _pharmacode = require('./barcodes/pharmacode.js');

var _pharmacode2 = _interopRequireDefault(_pharmacode);

var _blank = require('./barcodes/blank.js');

var _GenericBarcode = require('./barcodes/GenericBarcode.js');

var _GenericBarcode2 = _interopRequireDefault(_GenericBarcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  CODE39: _CODE2.default,
  CODE128: _CODE4.default,
  EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC,
  ITF14: _ITF2.default,
  ITF: _ITF4.default,
  MSI: _MSI.MSI, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010,
  pharmacode: _pharmacode2.default,
  blank: _blank.blank,
  GenericBarcode: _GenericBarcode2.default
};