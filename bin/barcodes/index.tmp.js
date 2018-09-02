'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE = require('./CODE39/');

var _CODE2 = require('./CODE128/');

var _EAN_UPC = require('./EAN_UPC/');

var _ITF = require('./ITF/');

var _MSI = require('./MSI/');

var _pharmacode = require('./pharmacode/');

var _codabar = require('./codabar');

var _GenericBarcode = require('./GenericBarcode/');

exports.default = {
	CODE39: _CODE.CODE39,
	CODE128: _CODE2.CODE128, CODE128A: _CODE2.CODE128A, CODE128B: _CODE2.CODE128B, CODE128C: _CODE2.CODE128C,
	EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC, UPCE: _EAN_UPC.UPCE,
	ITF14: _ITF.ITF14,
	ITF: _ITF.ITF,
	MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
	pharmacode: _pharmacode.pharmacode,
	codabar: _codabar.codabar,
	GenericBarcode: _GenericBarcode.GenericBarcode
};