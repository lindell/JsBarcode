import CODE39 from './barcodes/CODE39/';
import {CODE128, CODE128A, CODE128B, CODE128C} from './barcodes/CODE128/';
import {EAN13, EAN8, EAN5, EAN2, UPC} from './barcodes/EAN_UPC/';
import ITF14 from './barcodes/ITF14/';
import ITF from './barcodes/ITF/';
import {MSI, MSI11, MSI1010} from './barcodes/MSI/MSI.js';
import pharmacode from './barcodes/pharmacode/';
import {blank} from './barcodes/blank.js'
import GenericBarcode from './barcodes/GenericBarcode/';

export default {
  CODE39,
  CODE128, CODE128A, CODE128B, CODE128C,
  EAN13, EAN8, EAN5, EAN2, UPC,
  ITF14,
  ITF,
  MSI, MSI11, MSI1010,
  pharmacode,
  blank,
  GenericBarcode
};
