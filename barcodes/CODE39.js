function CODE39(string){
	string = string.toUpperCase();

	var encodings = {
		"0": 20957, "1": 29783, "2": 23639, "3": 30485,
		"4": 20951, "5": 29813, "6": 23669, "7": 20855,
		"8": 29789, "9": 23645, "A": 29975, "B": 23831,
		"C": 30533, "D": 22295, "E": 30149, "F": 24005,
		"G": 21623, "H": 29981, "I": 23837, "J": 22301,
		"K": 30023, "L": 23879, "M": 30545, "N": 22343,
		"O": 30161, "P": 24017, "Q": 21959, "R": 30065,
		"S": 23921, "T": 22385, "U": 29015, "V": 18263,
		"W": 29141, "X": 17879, "Y": 29045, "Z": 18293,
		"-": 17783, ".": 29021, " ": 18269, "$": 17477,
		"/": 17489, "+": 17681, "%": 20753, "*": 35770
	};

	this.getText = function(){
		return string;
	};

	this.encoded = function(){
		var result = "";
		result += encodings["*"].toString(2);
		for(var i=0; i<string.length; i++){
			result += encodings[string[i]].toString(2) + "0";
		}
		result += encodings["*"].toString(2);

		return result;
	};

	//Use the regexp variable for validation
	this.valid = function(){
		return string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
	};
}


//Required to register for both browser and nodejs
var register = function(core){
	core.register(CODE39, /^CODE.?39$/i, 3);
};
try{register(JsBarcode)} catch(e){}
try{module.exports.register = register} catch(e){}
