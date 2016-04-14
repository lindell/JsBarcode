import CODE39 from './barcodes/CODE39.js';
import CODE128 from './barcodes/CODE128.js';
import {EAN13, EAN8, EAN5, EAN2, UPC} from './barcodes/EAN_UPC/';
import ITF14 from './barcodes/ITF14.js';
import ITF from './barcodes/ITF.js';
import {MSI, MSI11, MSI1010} from './barcodes/MSI/MSI.js';
import pharmacode from './barcodes/pharmacode.js';
import {blank} from './barcodes/blank.js'
import GenericBarcode from './barcodes/GenericBarcode.js';

export default {
  CODE39,
  CODE128,
  EAN13, EAN8, EAN5, EAN2, UPC,
  ITF14,
  ITF,
  MSI, MSI11, MSI1010,
  pharmacode,
  blank,
  GenericBarcode
};
