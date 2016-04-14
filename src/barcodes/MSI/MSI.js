import {mod10, mod11} from './checksums.js'

class MSI{
	constructor(string){
		this.string = string;
	}

	encode(){
		var ret = "110";

		for(var i=0;i<this.string.length;i++){
			var digit = parseInt(this.string[i]);
			var bin = digit.toString(2);
			bin = addZeroes(bin, 4-bin.length);
			for(var b=0;b<bin.length;b++){
				ret += bin[b] == "0" ? "100" : "110";
			}
		}

		ret += "1001";
		return {
			data: ret,
			text: this.string
		};
	}

	valid(){
		return this.string.search(/^[0-9]+$/) !== -1;
	}
}

class MSI11 extends MSI{
	constructor(string){
		super(string);
		this.string += mod11(this.string);
	}
}
class MSI1010 extends MSI{
	constructor(string){
		super(string);
		this.string += mod10(this.string);
		this.string += mod10(this.string);
	}
}
class MSI1110 extends MSI{
	constructor(string){
		super(string);
		this.string += mod11(this.string);
		this.string += mod10(this.string);
	}
}

function addZeroes(number, n){
	for(var i=0;i<n;i++){
		number = "0"+number;
	}
	return number;
}

export {MSI, MSI11, MSI1010, MSI1110};
