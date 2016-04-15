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

function addZeroes(number, n){
	for(var i=0;i<n;i++){
		number = "0"+number;
	}
	return number;
}

export default MSI;
