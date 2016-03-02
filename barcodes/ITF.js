function ITF(ITFNumber){

	this.ITFNumber = ITFNumber+"";

	this.getText = function(){
		return this.ITFNumber;
	};

	this.valid = function(){
		return valid(this.ITFNumber);
	};

	this.encoded = function(){
		//Create the variable that should be returned at the end of the function
		var result = "";

		//Always add the same start bits
		result += startBin;

		//Calculate all the digit pairs
		for(var i=0;i<this.ITFNumber.length;i+=2){
			result += calculatePair(this.ITFNumber.substr(i,2));
		}

		//Always add the same end bits
		result += endBin;

		return result;
	}

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
	,"9":"01010"}

	//The start bits
	var startBin = "1010";
	//The end bits
	var endBin = "11101";

	//Regexp for a valid Inter25 code
	var regexp = /^([0-9][0-9])+$/;

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

  function valid(number){
		return number.search(regexp)!==-1;
	}
}

//Required to register for both browser and nodejs
var register = function(core){
	core.register(ITF, /^ITF$/i, 4);
};
try{register(JsBarcode)} catch(e){}
try{module.exports.register = register} catch(e){}
