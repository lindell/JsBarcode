// Import all the barcodes
import barcodes from './barcodes.js';

// Import the renderers
import drawCanvas from './renderers/canvas.js';
import drawSVG from './renderers/svg.js';

// Help functions
import merge from './help/merge.js';

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
			var canvas = document.createElement('canvas');
			draw(canvas, content, options, drawCanvas);
			image.setAttribute("src", canvas.toDataURL());
		}
		else if(typeof SVGElement !== 'undefined' && image instanceof SVGElement){
			draw(image, content, options, drawSVG);
		}
		// If canvas, just draw
		else if(image.getContext){
			draw(image, content, options, drawCanvas);
		}
		else{
			throw new Error("Not supported type to draw on.");
		}
	};

	// The main function, handles everything with the modules and draws the image
	var draw = function(canvas, content, options, drawFunction) {
		// Make sure content is a string
		content = content + "";

		// Merge the user options with the default
		options = merge(JsBarcode.defaults, options);

		// Fix the margins
		options.marginTop = typeof options.marginTop === "undefined" ?
			options.margin : options.marginTop;
		options.marginBottom = typeof options.marginBottom === "undefined" ?
			options.margin : options.marginBottom;
		options.marginRight = typeof options.marginRight === "undefined" ?
			options.margin : options.marginRight;
		options.marginLeft = typeof options.marginLeft === "undefined" ?
			options.margin : options.marginLeft;

		// Automatically choose barcode if format set to "auto"...
		var encoder;
		if(options.format === "auto"){
			encoder = new (JsBarcode.autoSelectEncoder(content))(content, options);
		}
		// ...or else, get by name
		else{
			encoder = new (JsBarcode.getModule(options.format))(content, options);
		}

		if(encoder.options){
			encoder.options(options);
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
		var cached = JsBarcode.getCache(options.format, content);
		var encoded;
		if(cached){
			encoded = cached;
		}
		else{
			encoded = encoder.encode();
			// Cache the encoding if it will be used again later
			JsBarcode.cache(options.format, content, encoded);
		}

		if(encoder.options){
			options = merge(options, encoder.options(options));
		}

		var encodings = [];
		function linearizeEncodings(encoded){
			if(Array.isArray(encoded)){
				for(var i in encoded){
					linearizeEncodings(encoded[i]);
				}
			}
			else{
				encoded.text = encoded.text || "";
				encoded.data = encoded.data || "";
				encodings.push(encoded);
			}
		}
		linearizeEncodings(encoded);

		drawFunction(canvas, encodings, options);

		// Send a confirmation that the generation was successful to the valid function if it does exist
		options.valid(true);
	};

	JsBarcode._modules = [];

	// Add a new module sorted in the array
	JsBarcode.register = function(module, regex, priority){
		var position = 0;
		if(typeof priority === "undefined"){
			position = JsBarcode._modules.length - 1;
			priority = 0;
		}
		else{
			for(var i=0;i<JsBarcode._modules.length;i++){
				position = i + 1;
				if(priority > JsBarcode._modules[i].priority){
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

	module.exports = JsBarcode;	// Export to nodejs

	// Register all barcodes
	for(var i in barcodes){
		barcodes[i](JsBarcode);
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
		height: 100,
		format: "auto",
		displayValue: true,
		fontOptions: "",
		font: "monospace",
		textAlign: "center",
		textPosition: "bottom",
		textMargin: 2,
		fontSize: 20,
		background: "#ffffff",
		lineColor: "#000000",
		margin: 10,
		marginTop: undefined,
		marginBottom: undefined,
		marginLeft: undefined,
		marginRight: undefined,
		valid: function(valid){}
	};
})();
