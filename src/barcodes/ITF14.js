function ITF14(string){
	this.valid = function(){
		return string.search(/^[0-9]{13,14}$/) !== -1 &&
			(string.length === 13 || string[13] == checksum(string));
	};

	this.encode = function(){
		//Create the variable that should be returned at the end of the function
		var result = "";

		//If checksum is not already calculated, do it
		if(string.length === 13){
			string += checksum(string);
		}

		//Always add the same start bits
		result += startBin;

		//Calculate all the digit pairs
		for(var i=0;i<14;i+=2){
			result += calculatePair(string.substr(i,2));
		}

		//Always add the same end bits
		result += endBin;

		return {data: result, text: string};
	};

	//The structure for the all digits, 1 is wide and 0 is narrow
	var digitStructure = {
		 "0":"00110"
		,"1":"10001"
		,"2":"01001"
		,"3":"11000"
		,"4":"00101"
		,"5":"10100"
		,"6":"01100"
		,"7":"00011"
		,"8":"10010"
		,"9":"01010"
	};

	//The start bits
	var startBin = "1010";
	//The end bits
	var endBin = "11101";

	//Calculate the data of a number pair
	function calculatePair(twoNumbers){
		var result = "";

		var number1Struct = digitStructure[twoNumbers[0]];
		var number2Struct = digitStructure[twoNumbers[1]];

		//Take every second bit and add to the result
		for(var i=0;i<5;i++){
			result += (number1Struct[i]=="1") ? "111" : "1";
			result += (number2Struct[i]=="1") ? "000" : "0";
		}
		return result;
	}

	//Calulate the checksum digit
	function checksum(numberString){
		var result = 0;

		for(var i=0;i<13;i++){
			result += parseInt(numberString[i]) * (3 - (i % 2) * 2);
		}

		return 10 - (result % 10);
	}
}

//Required to register for both browser and nodejs
function register(core){
	core.register(ITF14, /^ITF.?14$/i, 5);
}
export default register;
