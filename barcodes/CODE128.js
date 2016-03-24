// This is the master class, it does require the start code to be
//included in the string
function CODE128(string) {
	this.bytes = [];
	for (var i = 0; i < string.length; ++i) {
		this.bytes.push(string.charCodeAt(i));
	}
	this.string = string.substring(1);

	this.getText = function() {
		return this.string;
	};

	// The public encoding function
	this.encoded = function() {
		var encodingResult;
		var bytes = this.bytes;
		// Remove first element and but i variable
		var firstByte = bytes.shift() - 105;

		if(firstByte === 103){
			encodingResult = nextAChar(bytes, 1);
		}
		else if(firstByte === 104){
			encodingResult = nextBChar(bytes, 1);
		}
		else if(firstByte === 105){
			encodingResult = nextCChar(bytes, 1);
		}

		return (
			//Add the start bits
			getEncoding(firstByte) +
			//Add the encoded bits
			encodingResult.result +
			//Add the checksum
			getEncoding((encodingResult.checksum + firstByte) % 103) +
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

	function nextAChar(bytes, depth){
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
				next = nextCChar(bytes, depth + 1);
			}
			// Swap to CODE128B
			else if(index === 100){
				next = nextBChar(bytes, depth + 1);
			}
			// Continue on CODE128A but encode a special character
			else{
				next = nextAChar(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128A
		else{
			var charCode = bytes[0];
			index = charCode < 32 ? charCode + 64 : charCode - 32;

			// Remove first element
			bytes.shift();

			next = nextBChar(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum}
	}

	function nextBChar(bytes, depth){
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
				next = nextCChar(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if(index === 101){
				next = nextAChar(bytes, depth + 1);
			}
			// Continue on CODE128B but encode a special character
			else{
				next = nextCChar(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128B
		else {
			index = bytes[0] - 32;
			bytes.shift();
			next = nextBChar(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum};
	}

	function nextCChar(bytes, depth){
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
				next = nextBChar(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if(index === 101){
				next = nextAChar(bytes, depth + 1);
			}
			// Continue on CODE128C but encode a special character
			else{
				next = nextCChar(bytes, depth + 1);
			}
		}
		// Continue encoding of CODE128C
		else{
			index = (bytes[0]-48) * 10 + bytes[1]-48;
			bytes.shift();
			bytes.shift();
			next = nextCChar(bytes, depth + 1);
		}

		// Get the correct binary encoding and calculate the weight
		var enc = getEncoding(index);
		var weight = index * depth;

		return {"result": enc + next.result, "checksum": weight + next.checksum};
	}
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
	core.register(CODE128A, /^CODE128.?A$/i, 2);
	core.register(CODE128B, /^CODE128(.?B)?$/i, 3);
	core.register(CODE128C, /^CODE128.?C$/i, 2);
}
try {register(JsBarcode)} catch(e) {}
try {module.exports.register = register} catch(e) {}
