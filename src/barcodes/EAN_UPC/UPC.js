// UPC is encoded as EAN13 but the first digit always being zero

import EAN13 from './EAN13.js';

class UPC extends EAN13{
	constructor(string, options){
		super("0" + string, options);
	}
}

export default UPC;
