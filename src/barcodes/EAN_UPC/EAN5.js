import EANencoder from './ean_encoder.js';

class EAN5{
	constructor(string){
		this.string = string;

		this.structure = [
			"GGLLL",
			"GLGLL",
			"GLLGL",
			"GLLLG",
			"LGGLL",
			"LLGGL",
			"LLLGG",
			"LGLGL",
			"LGLLG",
			"LLGLG"
		];
	}

	valid(){
		return this.string.search(/^[0-9]{5}$/)!==-1;
	}

	encode(){
		var encoder = new EANencoder();

		var result = "1011" +
			encoder.encode(this.string, this.structure[this.checksum(this.string)], "01");

		return {
			data: result,
			text: this.string
		};
	}

	checksum(){
		var result = 0;

		var i;
		for(i=0;i<5;i+=2){result+=parseInt(this.string[i])*3;}
		for(i=1;i<5;i+=2){result+=parseInt(this.string[i])*9;}

		return result % 10;
	}
}

export default EAN5;
