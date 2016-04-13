var prototype = {};

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

class MSI10 extends MSI{
	constructor(string){
		super(string);
		this.string += mod10(this.string);
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

function mod10(number){
	var sum = 0;
	for(var i=0;i<number.length;i++){
		var n = parseInt(number[i]);
		if((i + number.length) % 2 === 0){
			sum += n;
		}
		else{
			sum += (n*2)%10 + Math.floor((n*2)/10);
		}
	}
	return (10-(sum%10))%10;
}

function mod11(number){
	var sum = 0;
	var weights = [2,3,4,5,6,7];
	for(var i=0;i<number.length;i++){
		var n = parseInt(number[number.length-1-i]);
		sum += weights[i % weights.length] * n;
	}
	return (11-(sum%11))%11;
}

function addZeroes(number, n){
	for(var i=0;i<n;i++){
		number = "0"+number;
	}
	return number;
}

//Required to register for both browser and nodejs
function register(core){
	core.register(MSI, /^MSI$/i, 4);
	core.register(MSI10, /^MSI.?10$/i);
	core.register(MSI11, /^MSI.?11$/i);
	core.register(MSI1010, /^MSI.?1010$/i);
	core.register(MSI1110, /^MSI.?1110$/i);
}
export default register;
