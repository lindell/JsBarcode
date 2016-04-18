import CODE128 from './CODE128.js';

class CODE128A extends CODE128{
	constructor(string){
		super(String.fromCharCode(208) + string);
	}

	valid(){
		return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
	}
}

export default CODE128A;
