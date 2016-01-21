function EAN(EANnumber){
	this.EANnumber = EANnumber+"";

	//Regexp to test if the EAN code is correct formated
	var fullEanRegexp = /^[0-9]{13}$/;
	var needLastDigitRegexp = /^[0-9]{12}$/;

	//Add checksum if it does not exist
	if(this.EANnumber.search(needLastDigitRegexp)!=-1){
		this.EANnumber += checksum(this.EANnumber);
	}

	this.getText = function(){
		return this.EANnumber;
	};

	this.valid = function(){
		return valid(this.EANnumber);
	};

	this.encoded = function (){
		if(valid(this.EANnumber)){
			return createEAN13(this.EANnumber);
		}
		return "";
	}

	//Create the binary representation of the EAN code
	//number needs to be a string
	function createEAN13(number){
		var encoder = new EANencoder();

		//Create the return variable
		var result = "";

		var structure = encoder.getEANstructure(number);

		//Get the number to be encoded on the left side of the EAN code
		var leftSide = number.substr(1,7);

		//Get the number to be encoded on the right side of the EAN code
		var rightSide = number.substr(7,6);

		//Add the start bits
		result += encoder.startBin;

		//Add the left side
		result += encoder.encode(leftSide, structure);

		//Add the middle bits
		result += encoder.middleBin;

		//Add the right side
		result += encoder.encode(rightSide,"RRRRRR");

		//Add the end bits
		result += encoder.endBin;

		return result;
	}

	//Calulate the checksum digit
	function checksum(number){
		var result = 0;

		for(var i=0;i<12;i+=2){result+=parseInt(number[i])}
		for(var i=1;i<12;i+=2){result+=parseInt(number[i])*3}

		return (10 - (result % 10)) % 10;
	}

	function valid(number){
		if(number.search(fullEanRegexp)!=-1){
			return number[12] == checksum(number);
		}
		else{
			return false;
		}
	}
}

function EAN8(EAN8number){
	this.EAN8number = EAN8number+"";

	//Regexp to test if the EAN code is correct formated
	var fullEanRegexp = /^[0-9]{8}$/;
	var needLastDigitRegexp = /^[0-9]{7}$/;

	//Add checksum if it does not exist
	if(this.EAN8number.search(needLastDigitRegexp)!=-1){
		this.EAN8number += checksum(this.EAN8number);
	}

	this.getText = function(){
		return this.EAN8number;
	}

	this.valid = function(){
		return valid(this.EAN8number);
	};

	this.encoded = function (){
		if(valid(this.EAN8number)){
			return createEAN8(this.EAN8number);
		}
		return "";
	}

	function valid(number){
		if(number.search(fullEanRegexp)!=-1){
			return number[7] == checksum(number);
		}
		else{
			return false;
		}
	}

	//Calulate the checksum digit
	function checksum(number){
		var result = 0;

		for(var i=0;i<7;i+=2){result+=parseInt(number[i])*3}
		for(var i=1;i<7;i+=2){result+=parseInt(number[i])}

		return (10 - (result % 10)) % 10;
	}

	function createEAN8(number){
		var encoder = new EANencoder();

		//Create the return variable
		var result = "";

		//Get the number to be encoded on the left side of the EAN code
		var leftSide = number.substr(0,4);

		//Get the number to be encoded on the right side of the EAN code
		var rightSide = number.substr(4,4);

		//Add the start bits
		result += encoder.startBin;

		//Add the left side
		result += encoder.encode(leftSide, "LLLL");

		//Add the middle bits
		result += encoder.middleBin;

		//Add the right side
		result += encoder.encode(rightSide,"RRRR");

		//Add the end bits
		result += encoder.endBin;

		return result;
	}
}


function UPC(UPCnumber){
	this.ean = new EAN("0"+UPCnumber);

	this.getText = function(){
		return this.ean.getText().substring(1);
	}

	this.valid = function(){
		return this.ean.valid();
	}

	this.encoded = function(){
		return this.ean.encoded();
	}

}

//
// Help class that does all the encoding
//
function EANencoder(){
	//The start bits
	this.startBin = "101";
	//The end bits
	this.endBin = "101";
	//The middle bits
	this.middleBin = "01010";

	//The L (left) type of encoding
	var Lbinary = {
	0: "0001101",
	1: "0011001",
	2: "0010011",
	3: "0111101",
	4: "0100011",
	5: "0110001",
	6: "0101111",
	7: "0111011",
	8: "0110111",
	9: "0001011"};

	//The G type of encoding
	var Gbinary = {
	0: "0100111",
	1: "0110011",
	2: "0011011",
	3: "0100001",
	4: "0011101",
	5: "0111001",
	6: "0000101",
	7: "0010001",
	8: "0001001",
	9: "0010111"};

	//The R (right) type of encoding
	var Rbinary = {
	0: "1110010",
	1: "1100110",
	2: "1101100",
	3: "1000010",
	4: "1011100",
	5: "1001110",
	6: "1010000",
	7: "1000100",
	8: "1001000",
	9: "1110100"};

	//The left side structure in EAN-13
	var EANstructure = {
	0: "LLLLLL",
	1: "LLGLGG",
	2: "LLGGLG",
	3: "LLGGGL",
	4: "LGLLGG",
	5: "LGGLLG",
	6: "LGGGLL",
	7: "LGLGLG",
	8: "LGLGGL",
	9: "LGGLGL"}

	this.getEANstructure = function(number){
		return EANstructure[number[0]];
	};

	//Convert a numberarray to the representing
	this.encode = function(number,structure){
		//Create the variable that should be returned at the end of the function
		var result = "";

		//Loop all the numbers
		for(var i = 0;i<number.length;i++){
			//Using the L, G or R encoding and add it to the returning variable
			if(structure[i]=="L"){
				result += Lbinary[number[i]];
			}
			else if(structure[i]=="G"){
				result += Gbinary[number[i]];
			}
			else if(structure[i]=="R"){
				result += Rbinary[number[i]];
			}
		}
		return result;
	};
}
