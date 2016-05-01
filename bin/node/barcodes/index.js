'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CODE = require('./CODE39/');

var _CODE2 = _interopRequireDefault(_CODE);

var _CODE3 = require('./CODE128/');

var _EAN_UPC = require('./EAN_UPC/');

var _ITF = require('./ITF14/');

var _ITF2 = _interopRequireDefault(_ITF);

var _MSI = require('./MSI/');

var _pharmacode = require('./pharmacode/');

var _pharmacode2 = _interopRequireDefault(_pharmacode);

var _GenericBarcode = require('./GenericBarcode/');

var _GenericBarcode2 = _interopRequireDefault(_GenericBarcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  CODE39: _CODE2.default,
  CODE128: _CODE3.CODE128, CODE128A: _CODE3.CODE128A, CODE128B: _CODE3.CODE128B, CODE128C: _CODE3.CODE128C,
  EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC,
  ITF14: _ITF2.default,
  MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
  pharmacode: _pharmacode2.default,
  GenericBarcode: _GenericBarcode2.default
};