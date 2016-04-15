import MSI from './MSI.js';
import {mod10} from './checksums.js';

class MSI1010 extends MSI{
	constructor(string){
		super(string);
		this.string += mod10(this.string);
		this.string += mod10(this.string);
	}
}

export default MSI1010;
