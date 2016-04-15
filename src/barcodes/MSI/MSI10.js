import MSI from './MSI.js';
import {mod10} from './checksums.js';

class MSI10 extends MSI{
	constructor(string){
		super(string);
		this.string += mod10(this.string);
	}
}

export default MSI10;
