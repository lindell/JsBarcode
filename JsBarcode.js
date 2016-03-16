(function(){

	// Main function, calls drawCanvas(...) in the right way
	var JsBarcode = function(image, content, options){
		// If the image is a string, query select call again
		if(typeof image === "string"){
			image = document.querySelector(image);
			JsBarcode(image, content, options);
		}
		// If image, draw on canvas and set the uri as src
		else if(typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLImageElement){
			canvas = document.createElement('canvas');
			drawCanvas(canvas, content, options);
			image.setAttribute("src", canvas.toDataURL());
		}
		// If canvas, just draw
		else if(image.getContext){
			drawCanvas(image, content, options);
		}
		else{
			throw new Error("Not supported type to draw on.");
		}
	}

	// The main function, handles everything with the modules and draws the image
	var drawCanvas = function(canvas, content, options) {
		// Merge the user options with the default
		options = merge(JsBarcode.defaults, options);

		// Fix the margins
		options.marginTop = options.marginTop | options.margin;
		options.marginBottom = options.marginBottom | options.margin;
		options.marginRight = options.marginRight | options.margin;
		options.marginLeft = options.marginLeft | options.margin;

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
		  options.valid(false);
			if(options.valid == JsBarcode.defaults.valid){
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

		// Get the canvas context
		var ctx = canvas.getContext("2d");

		// Set font
		var font = options.fontOptions + " " + options.fontSize + "px "+options.font;
		ctx.font = font;

		// Set the width and height of the barcode
		var width = binary.length*options.width;
		// Replace with width of the text if it is wider then the barcode
		var textWidth = ctx.measureText(encoder.getText()).width;
		if(options.displayValue && width < textWidth){
			if(options.textAlign == "center"){
				var barcodePadding = Math.floor((textWidth - width)/2);
			}
			else if(options.textAlign == "left"){
				var barcodePadding = 0;
			}
			else if(options.textAlign == "right"){
				var barcodePadding = Math.floor(textWidth - width);
			}

			width = textWidth;
		}
		// Make sure barcodePadding is not undefined
		var barcodePadding = barcodePadding || 0;

		canvas.width = width + options.marginLeft + options.marginRight;

		// Set extra height if the value is displayed under the barcode. Multiplication with 1.3 t0 ensure that some
		//characters are not cut in half
		canvas.height = options.height
			+ (options.displayValue ? options.fontSize : 0)
			+ options.textMargin
			+ options.marginTop
			+ options.marginBottom;

		// Paint the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(options.background){
			ctx.fillStyle = options.background;
			ctx.fillRect(0,0,canvas.width, canvas.height);
		}

		// Creates the barcode out of the encoded binary
		ctx.fillStyle = options.lineColor;
		for(var i=0;i<binary.length;i++){
			var x = i*options.width + options.marginLeft + barcodePadding;
			if(binary[i] == "1"){
				ctx.fillRect(x, options.marginTop, options.width, options.height);
			}
		}

		// Draw the text if displayValue is set
		if(options.displayValue){
			var x, y;

			y = options.height + options.textMargin + options.marginTop;

			ctx.font = font;
			ctx.textBaseline = "bottom";
			ctx.textBaseline = 'top';

			// Draw the text in the correct X depending on the textAlign option
			if(options.textAlign == "left" || barcodePadding > 0){
				x = options.marginLeft;
				ctx.textAlign = 'left';
			}
			else if(options.textAlign == "right"){
				x = canvas.width - options.marginRight;
				ctx.textAlign = 'right';
			}
			//In all other cases, center the text
			else{
				x = canvas.width / 2;
				ctx.textAlign = 'center';
			}

			ctx.fillText(encoder.getText(), x, y);
		}

		// Send a confirmation that the generation was successful to the valid function if it does exist
		options.valid(true);
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
		format:	"auto",
		displayValue: true,
		fontOptions: "",
		font: "monospace",
		textAlign: "center",
		textMargin: 2,
		fontSize: 14,
		background: "#fff",
		lineColor: "#000",
		margin: 10,
		marginTop: undefined,
		marginBottom: undefined,
		marginLeft: undefined,
		marginRight: undefined,
		valid: function(valid){}
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
