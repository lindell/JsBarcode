import MSI from './MSI.js';
import {mod11} from './checksums.js';

class MSI11 extends MSI{
	constructor(string, options){
		super(string, options);
		this.string += mod11(this.string);
	}
}

export default MSI11;
