import EANencoder from './ean_encoder.js';

class EAN2{
	constructor(string){
		this.string = string;

		this.structure = ["LL", "LG", "GL", "GG"];
	}

	valid(){
		return this.string.search(/^[0-9]{2}$/) !== -1;
	}

	encode(){
		var encoder = new EANencoder();

		var result = "1011" +
			encoder.encode(this.string, this.structure[parseInt(this.string) % 4], "01");

		return {
			data: result,
			text: this.string
		};
	}
}

export default EAN2;
