import CODE128 from './CODE128.js';

class CODE128C extends CODE128{
	constructor(string){
		super(String.fromCharCode(210) + string);
	}

	valid(){
		return this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
	}
}

export default CODE128C;
