function CODE128(string, code) {
	code = code || "B";

	this.string = string + "";

	this.valid = valid;

	this.getText = function() {
		return this.string;
	};

	//The public encoding function
	this.encoded = function() {
		var encodingResult;
		var startCode;
		if(code === "B"){
			encodingResult = nextBChar(this.string, 1);
			startCode = 104;
		}
		else if(code === "C"){
			encodingResult = nextCChar(this.string, 1);
			startCode = 105;
		}

		return (
			//Add the start bits
			getEncoding(startCode) +
			//Add the encoded bits
			encodingResult.result +
			//Add the checksum
			getEncoding((encodingResult.checksum + startCode) % 103) +
			//Add the end bits
			getEncoding(106)
		);
	}

	//Data for each character, the last characters will not be encoded but are used for error correction
	//Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
	var code128b = [ // + 1000
			740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604,
			572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764,
			652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590,
			304, 112,  94, 416, 128, 122, 672, 576, 570, 464, 422,
			134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880,
			862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200,
			158,  68,  62, 424, 412, 232, 218,  76,  74, 554, 616,
			978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940,
			938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954,
			502, 518, 886, 966, /* Start codes */   668, 680, 692,
			5379
		];
	var getEncoding = function(n) {
		return (code128b[n] ? (code128b[n] + 1000).toString(2) : '');
	};

	//Use the regexp variable for validation
	function valid() {
		return !(this.string.search(/^[!-~ ]+$/) === -1);
	}

	function nextBChar(string, depth){
		if(string.length == 0){
			return {"result": "", "checksum": 0};
		}

		var index = string.charCodeAt(0) - 32;
		var enc = getEncoding(index);
		var weight = index * depth;

		var next = nextBChar(string.substring(1), depth + 1);

		return {"result": enc + next.result, "checksum": weight + next.checksum}
	}

	function nextCChar(string, depth){
		if(string.length <= 0){
			return {"result": "", "checksum": 0};
		}

		var index = parseInt(string.substr(0, 2));
		var enc = getEncoding(index);
		var weight = index * depth;

		var next = nextCChar(string.substring(2), depth + 1);

		return {"result": enc + next.result, "checksum": weight + next.checksum}
	}
}


function CODE128B(string) {
	return new CODE128(string, "B");
}
function CODE128C(string) {
	return new CODE128(string, "C");
};

//Required to register for both browser and nodejs
var register = function(core) {
	core.register(CODE128B, /^CODE128(.?B)?$/i, 2);
	core.register(CODE128C, /^CODE128.?C$/i, 2);
}
try {register(JsBarcode)} catch(e) {}
try {module.exports.register = register} catch(e) {}
