import CODE128 from './CODE128.js';

class CODE128B extends CODE128{
	constructor(string){
		super(String.fromCharCode(209) + string);
	}

	valid(){
		return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
	}
}

export default CODE128B;
