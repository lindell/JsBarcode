import MSI from './MSI.js';
import {mod10, mod11} from './checksums.js';

class MSI1110 extends MSI{
	constructor(string){
		super(string);
		this.string += mod11(this.string);
		this.string += mod10(this.string);
	}
}

export default MSI1110;
