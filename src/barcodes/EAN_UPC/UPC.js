import EAN13 from './EAN13.js';

class UPC extends EAN13{
	constructor(string, options){
		super("0" + string, options);
	}
}

export default UPC;
