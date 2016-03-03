(function(){

	// Main function, calls drawCanvas(...) in the right way
	var JsBarcode = function(image, content, options, validFunction){
		// If the image is a string, query select call again
		if(typeof image === "string"){
			image = document.querySelector(image);
			JsBarcode(image, content, options, validFunction);
		}
		// If image, draw on canvas and set the uri as src
		else if(typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLImageElement){
			canvas = document.createElement('canvas');
			drawCanvas(canvas, content, options, validFunction);
			image.setAttribute("src", canvas.toDataURL());
		}
		// If canvas, just draw
		else if(image.getContext){
			drawCanvas(image, content, options, validFunction);
		}
		else{
			throw new Error("Not supported type to draw on.");
		}
	}

	// The main function, handles everything with the modules and draws the image
	var drawCanvas = function(canvas, content, options, validFunction) {

		// This tries to call the valid function only if it's specified. Otherwise nothing happens
		var validFunctionIfExist = function(valid){
		  if(validFunction){
		    validFunction(valid);
		  }
		};

		// Merge the user options with the default
		options = merge(JsBarcode.defaults, options);

		//Abort if the browser does not support HTML5 canvas
		if (!canvas.getContext) {
			throw new Error('The browser does not support canvas.');
		}

		// Automatically choose barcode if format set to "auto"...
		if(options.format == "auto"){
			var encoder = new (JsBarcode.autoSelectEncoder(content))(content);
		}
		// ...or else, get by name
		else{
			var encoder = new (JsBarcode.getModule(options.format))(content);
		}

		//Abort if the barcode format does not support the content
		if(!encoder.valid()){
		  validFunctionIfExist(false);
			if(!validFunction){
				throw new Error('The data is not valid for the type of barcode.');
			}
			return;
		}

		// Set the binary to a cached version if possible
		var cachedBinary = JsBarcode.getCache(options.format, content);
		if(cachedBinary){
			var binary = cachedBinary;
		}
		else{
			// Encode the content
			var binary = encoder.encoded();
			// Cache the encoding if it will be used again later
			JsBarcode.cache(options.format, content, binary);
		}

		var _drawBarcodeText = function (text) {
			var x, y;

			y = options.height + options.textPadding;

			ctx.font = options.fontOptions + " " + options.fontSize + "px "+options.font;
			ctx.textBaseline = "bottom";
			ctx.textBaseline = 'top';

			// Draw the text in the right X depending on the textAlign option
			if(options.textAlign == "left"){
				x = options.quite;
				ctx.textAlign = 'left';
			}
			else if(options.textAlign == "right"){
				x = canvas.width - options.quite;
				ctx.textAlign = 'right';
			}
			//In all other cases, center the text
			else{
				x = canvas.width / 2;
				ctx.textAlign = 'center';
			}

			ctx.fillText(text, x, y);
		};

		// Get the canvas context
		var ctx	= canvas.getContext("2d");

		// Set the width and height of the barcode
		canvas.width = binary.length*options.width+2*options.quite;
    // Set extra height if the value is displayed under the barcode. Multiplication with 1.3 t0 ensure that some
    //characters are not cut in half
		canvas.height = options.height + (options.displayValue ? options.fontSize * 1.3 : 0) + options.textPadding;

		//Paint the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(options.backgroundColor){
			ctx.fillStyle = options.backgroundColor;
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}

		// Creates the barcode out of the encoded binary
		ctx.fillStyle = options.lineColor;
		for(var i=0;i<binary.length;i++){
			var x = i*options.width+options.quite;
			if(binary[i] == "1"){
				ctx.fillRect(x,0,options.width,options.height);
			}
		}

		// Draw the text if displayValue is set
		if(options.displayValue){
			_drawBarcodeText(encoder.getText());
		}

		// Send a confirmation that the generation was successful to the valid function if it does exist
		validFunctionIfExist(true);
	};

	JsBarcode._modules = [];

	// Add a new module sorted in the array
	JsBarcode.register = function(module, regex, priority){
		var position = 0;
		if(typeof priority === "undefined"){
			position = JsBarcode._modules.length - 1;
		}
		else{
			for(var i=0;i<JsBarcode._modules.length;i++){
				position = i;
				if(!(priority < JsBarcode._modules[i].priority)){
					break;
				}
			}
		}

		// Add the module in position position
		JsBarcode._modules.splice(position, 0, {
			"regex": regex,
			"module": module,
			"priority": priority
		});
	};

	// Get module by name
	JsBarcode.getModule = function(name){
		for(var i in JsBarcode._modules){
			if(name.search(JsBarcode._modules[i].regex) !== -1){
				return JsBarcode._modules[i].module;
			}
		}
		throw new Error('Module ' + name + ' does not exist or is not loaded.');
	};

	// If any format is valid with the content, return the format with highest priority
	JsBarcode.autoSelectEncoder = function(content){
		for(var i in JsBarcode._modules){
			var barcode = new (JsBarcode._modules[i].module)(content);
			if(barcode.valid(content)){
				return JsBarcode._modules[i].module;
			}
		}
		throw new Error("Can't automatically find a barcode format matching the string '" + content + "'");
	};

	// Defining the cache dictionary
	JsBarcode._cache = {};

	// Cache a regerated barcode
	JsBarcode.cache = function(format, input, output){
		if(!JsBarcode._cache[format]){
			JsBarcode._cache[format] = {};
		}
		JsBarcode._cache[format][input] = output;
	};

	// Get a chached barcode
	JsBarcode.getCache = function(format, input){
		if(JsBarcode._cache[format]){
			if(JsBarcode._cache[format][input]){
				return JsBarcode._cache[format][input];
			}
		}
		return "";
	};

	// Detect if the code is running under nodejs
	JsBarcode._isNode = false;
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = JsBarcode;	// Export to nodejs
		JsBarcode._isNode = true;

		//Register all modules in ./barcodes/
		var path = require("path");
		var dir = path.join(__dirname, "barcodes");
		var files = require("fs").readdirSync(dir);
		for(var i in files){
			var barcode = require(path.join(dir, files[i]));
			barcode.register(JsBarcode);
		}
	}

	//Regsiter JsBarcode for the browser
	if(typeof window !== 'undefined'){
		window.JsBarcode = JsBarcode;
	}

	// Register JsBarcode as an jQuery plugin if jQuery exist
	if (typeof jQuery !== 'undefined') {
		jQuery.fn.JsBarcode = function(content, options, validFunction){
			JsBarcode(this.get(0), content, options, validFunction);
			return this;
		};
	}

	// All the default options. If one is not set.
	JsBarcode.defaults = {
		width: 2,
		height:	100,
		quite: 10,
		format:	"auto",
		displayValue: false,
		fontOptions: "",
		font: "monospace",
		textAlign: "center",
		textPadding: 0,
		fontSize: 12,
		backgroundColor: "",
		lineColor: "#000"
	};

	// Function to merge the default options with the default ones
	var merge = function(m1, m2) {
		var newMerge = {};
		for (var k in m1) {
			newMerge[k] = m1[k];
		}
		for (var k in m2) {
			if(typeof m2[k] !== "undefined"){
				newMerge[k] = m2[k];
			}
		}
		return newMerge;
	};
})();
