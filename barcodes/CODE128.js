// This is the master class, it does require the start code to be
//included in the string
function CODE128(string) {
	// Fill the bytes variable with the ascii codes of string
	this.bytes = [];
	for (var i = 0; i < string.length; ++i) {
		this.bytes.push(string.charCodeAt(i));
	}

	// First element should be startcode, remove that
	this.string = string.substring(1);

	this.getText = function() {
		return this.string.replace(/[^\x20-\x7E]/g, "");
	};

	// The public encoding function
	this.encoded = function() {
		var encodingResult;
		var bytes = this.bytes;
		// Remove the startcode from the bytes and set its index
		var startIndex = bytes.shift() - 105;

		// Start encode with the right type
		if(startIndex === 103){
			encodingResult = nextA(bytes, 1);
		}
		else if(startIndex === 104){
			encodingResult = nextB(bytes, 1);
		}
		else if(startIndex === 105){
			encodingResult = nextC(bytes, 1);
		}

		return (
			//Add the start bits
			getEncoding(startIndex) +
			//Add the encoded bits
			encodingResult.result +
			//Add the checksum
			getEncoding((encodingResult.checksum + startIndex) % 103) +
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

	// Use the regexp variable for validation
	this.valid = function() {
		// ASCII value ranges 0-127, 200-211
		return !(this.string.search(/^[\x00-\x7F\xC8-\xD3]+$/) === -1);
	}

	function nextA(bytes, depth){
		if(bytes.length <= 0){
			return {"result": "", "checksum": 0};
		}

		var next, index;

		// Special characters
		if(bytes[0] >= 200){
			index = bytes[0] - 105;

			//Remove first element
			bytes.shift();

			// Swap to CODE128C
			if(index === 99){
				next = nextC(bytes, depth + 1);
			}
			// Swap to CODE128B
			else if(index === 100){
				next = nextB(bytes, depth + 1);
			}
			// Continue on CODE128A but encode a special character
			else{
				next = nextA(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128A
		else{
			var charCode = bytes[0];
			index = charCode < 32 ? charCode + 64 : charCode - 32;

			// Remove first element
			bytes.shift();

			next = nextA(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum}
	}

	function nextB(bytes, depth){
		if(bytes.length <= 0){
			return {"result": "", "checksum": 0};
		}

		var next, index;

		// Special characters
		if(bytes[0] >= 200){
			index = bytes[0] - 105;

			//Remove first element
			bytes.shift();

			// Swap to CODE128C
			if(index === 99){
				next = nextC(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if(index === 101){
				next = nextA(bytes, depth + 1);
			}
			// Continue on CODE128B but encode a special character
			else{
				next = nextB(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128B
		else {
			index = bytes[0] - 32;
			bytes.shift();
			next = nextB(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum};
	}

	function nextC(bytes, depth){
		if(bytes.length <= 0){
			return {"result": "", "checksum": 0};
		}

		var next, index;

		// Special characters
		if(bytes[0] >= 200){
			index = bytes[0] - 105;

			// Remove first element
			bytes.shift();

			// Swap to CODE128B
			if(index === 100){
				next = nextB(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if(index === 101){
				next = nextA(bytes, depth + 1);
			}
			// Continue on CODE128C but encode a special character
			else{
				next = nextC(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128C
		else{
			index = (bytes[0]-48) * 10 + bytes[1]-48;
			bytes.shift();
			bytes.shift();
			next = nextC(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum};
	}
}

var aMatch = /^[\x00-\x5F]+/;
var bMatch = /^[\x20-\x7F]+/;
var cMatch = /^([0-9]{2})+/

function autoStartCode(string){
	var aRes = string.match(aMatch);
	var bRes = string.match(bMatch);
	var cRes = string.match(cMatch);

	// Select CODE128C if the string start with enough digits
	if(cRes && (cRes[0].length > 2 || string.length == 2)){
		return String.fromCharCode(210) + autoNextCodeC(string);
	}
	// Select A/C depending on the longest match
	else if(bRes && (!aRes || bRes[0].length > aRes[0].length)){
		return String.fromCharCode(209) + autoNextCodeB(string);
	}
	else{
		return String.fromCharCode(208) + autoNextCodeA(string);
	}
}

function autoNextCodeA(string){
	// Get any character that is in B but not C
	var res = string.match(/^([^\x5f-\x7F]+?)([0-9]{4,}|[^\x00-\x5F]|$)/);

	// Remove the part that should be encoded by A
	string = string.substring(res[1].length);

	// If end return the current string
	if(string.length === 0){
		return res[1];
	}

	// If four or more digits, switch to CODE128C
	if(string.match(/^[0-9]{4,}/)){
		return res[1] + String.fromCharCode(204) + autoNextCodeC(string);
	}

	// Else, switch to CODE128A
	return res[1] + String.fromCharCode(205) + autoNextCodeB(string);
}

function autoNextCodeB(string){
	// Get all characters of CODE128B until 4 digits or invalid digit or end
	var res = string.match(/^([^\x00-\x1F]+?)([0-9]{4,}|[^\x20-\x7F]|$)/);

	// Remove the part that should be encoded by B
	string = string.substring(res[1].length);

	// If end return the current string
	if(string.length === 0){
		return res[1];
	}

	// If four or more digits, switch to CODE128C
	if(string.match(/^[0-9]{4,}/)){
		return res[1] + String.fromCharCode(204) + autoNextCodeC(string);
	}

	// Else, switch to CODE128A
	return res[1] + String.fromCharCode(206) + autoNextCodeA(string);
}

function autoNextCodeC(string){
	// Get as many digits (pairs) that is possible
	var cRes = string.match(cMatch);

	// Remove the part that should be encoded by C
	string = string.substring(cRes[0].length);

	// If end return the current string
	if(string.length === 0){
		return cRes[0];
	}

	// Select A/B depending on the longest match
	var aRes = string.match(aMatch);
	var bRes = string.match(bMatch);
	if(bRes && (!aRes || bRes[0].length > aRes[0].length)){
		return cRes[0] + String.fromCharCode(205) + autoNextCodeB(string);
	}
	else{
		return cRes[0] + String.fromCharCode(206) + autoNextCodeA(string);
	}
}

function CODE128AUTO(string) {
	return new CODE128(autoStartCode(string));
}
function CODE128A(string) {
	return new CODE128(String.fromCharCode(208) + string);
}
function CODE128B(string) {
	return new CODE128(String.fromCharCode(209) + string);
}
function CODE128C(string) {
	return new CODE128(String.fromCharCode(210) + string);
}

//Required to register for both browser and nodejs
var register = function(core) {
	core.register(CODE128AUTO, /^CODE128(.?AUTO)?$/, 10);
	core.register(CODE128A, /^CODE128.?A$/i, 2);
	core.register(CODE128B, /^CODE128.?B$/i, 3);
	core.register(CODE128C, /^CODE128.?C$/i, 2);
}
try {register(JsBarcode)} catch(e) {}
try {module.exports.register = register} catch(e) {}
