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
	}

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
		if(options.format == "auto"){
			var encoder = new (JsBarcode.autoSelectEncoder(content))(content, options);
		}
		// ...or else, get by name
		else{
			var encoder = new (JsBarcode.getModule(options.format))(content, options);
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

	function drawSVG(svg, encodings, options){
		prepareSVG(svg, encodings, options);

		var currentX = options.marginLeft;
		for(var i in encodings){
			var newOptions = merge(options, encodings[i].options);

			var group = createGroup(currentX, options.marginTop, svg);

			var text= encodings[i].text;
			var binary = encodings[i].data;

			var yFrom, yHeight;
			if(newOptions.textPosition == "top"){
				yFrom = newOptions.marginTop + newOptions.fontSize + newOptions.textMargin;
			}
			else{
				yFrom = newOptions.marginTop;
			}
			yHeight = newOptions.height;

			for(var b in binary){
				var x = b*newOptions.width;
				if(binary[b] == 0){

				}
				else if(binary[b] === "1"){
					drawLine(x, yFrom, newOptions.width, newOptions.height, group);
				}
				else if(binary[b]){
					drawLine(x, yFrom, newOptions.width, newOptions.height * binary[b], group);
				}
			}

			// Draw the text if displayValue is set
			if(newOptions.displayValue){
				var x, y;
				var textElem = document.createElementNS("http://www.w3.org/2000/svg", 'text');

				if(newOptions.textPosition == "top"){
					y = newOptions.marginTop + newOptions.fontSize;
					textElem.setAttribute("alignment-baseline", "baseline");
				}
				else{
					y = newOptions.height + newOptions.textMargin + newOptions.marginTop;
					textElem.setAttribute("alignment-baseline", "text-before-edge");
				}

				textElem.setAttribute("font-family", newOptions.font);
				textElem.setAttribute("font-size", newOptions.fontSize);

				// Draw the text in the correct X depending on the textAlign option
				if(newOptions.textAlign == "left"){ // || barcodePadding > 0
					x = 0;
					textElem.setAttribute("text-anchor", "start");
				}
				else if(newOptions.textAlign == "right"){
					x = encodings[i].width-1;
					textElem.setAttribute("text-anchor", "end");
				}
				//In all other cases, center the text
				else{
					x = encodings[i].width / 2;
					textElem.setAttribute("text-anchor", "middle");
				}

				textElem.setAttribute("x", x);
				textElem.setAttribute("y", y);

				textElem.appendChild(document.createTextNode(text));

				group.appendChild(textElem);
			}

			currentX += encodings[i].width;
		}
	}

	var prepareSVG = function(svg, encodings, options){
		// Clear canvas
		// TODO

		// Calculate total width
		var totalWidth = 0;
		for(var i in encodings){
			var textWidth = messureSVGtext(encodings[i].text, svg, options);
			var barcodeWidth = encodings[i].data.length * options.width;

			encodings[i].width =  Math.ceil(Math.max(textWidth, barcodeWidth));

			totalWidth += encodings[i].width;
		}

		svg.setAttribute("width", totalWidth + options.marginLeft + options.marginRight);

		svg.setAttribute("height", options.height
			+ (options.displayValue ? options.fontSize : 0)
			+ options.textMargin
			+ options.marginTop
			+ options.marginBottom);

		// Paint the canvas
		/*ctx.clearRect(0,0,canvas.width,canvas.height);
		if(options.background){
			ctx.fillStyle = options.background;
			ctx.fillRect(0,0,canvas.width, canvas.height);
		}*/
	}

	var messureSVGtext = function(text, svg, options){
		// Create text element
		var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		text.style.fontFamily = options.font;
		// TODO add all font options

		var textNode = document.createTextNode(text);

		text.appendChild(textNode);

		return text.getComputedTextLength();
	}

	function createGroup(x, y, svg){
		var group = document.createElementNS("http://www.w3.org/2000/svg", 'g');

		group.setAttribute("transform", "translate(" + x +", " + y + ")");

		svg.appendChild(group);

		return group;
	}

	function drawLine(x, y, width, height, svg){
		var line = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

		line.setAttribute("x", x);
		line.setAttribute("y", y);
		line.setAttribute("width", width);
		line.setAttribute("height", height);
		line.setAttribute("style", "fill:rgb(0,0,0)");

		svg.appendChild(line);
	}

	function drawCanvas(canvas, encodings, options){
		//Abort if the browser does not support HTML5 canvas
		if (!canvas.getContext) {
			throw new Error('The browser does not support canvas.');
		}

		// Get the canvas context
		var ctx = canvas.getContext("2d");

		ctx.save();

		// Set font
		var font = options.fontOptions + " " + options.fontSize + "px "+options.font;
		ctx.font = font;

		// Calculate total width
		var totalWidth = 0;
		for(var i in encodings){
			var textWidth = ctx.measureText(encodings[i].text).width;
			var barcodeWidth = encodings[i].data.length * options.width;

			encodings[i].width =  Math.ceil(Math.max(textWidth, barcodeWidth));

			totalWidth += encodings[i].width;
		}

		canvas.width = totalWidth + options.marginLeft + options.marginRight;


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

		ctx.translate(options.marginLeft, 0);

		for(var i in encodings){
			var newOptions = merge(options, encodings[i].options);

			binary = encodings[i].data;
			text = encodings[i].text;

			// Set font
			var font = newOptions.fontOptions + " " + newOptions.fontSize + "px "+newOptions.font;
			ctx.font = font;

			// Set the width and height of the barcode
			var width = binary.length*newOptions.width;
			// Replace with width of the text if it is wider then the barcode
			var textWidth = ctx.measureText(text).width;

			var barcodePadding = 0;
			if(newOptions.displayValue && width < textWidth){
				if(newOptions.textAlign == "center"){
					barcodePadding = Math.floor((textWidth - width)/2);
				}
				else if(newOptions.textAlign == "left"){
					barcodePadding = 0;
				}
				else if(newOptions.textAlign == "right"){
					barcodePadding = Math.floor(textWidth - width);
				}

				width = textWidth;
			}

			// Creates the barcode out of the encoded binary
			var yFrom, yHeight;
			if(newOptions.textPosition == "top"){
				yFrom = newOptions.marginTop + newOptions.fontSize + newOptions.textMargin;
			}
			else{
				yFrom = newOptions.marginTop;
			}
			yHeight = newOptions.height;

			ctx.fillStyle = newOptions.lineColor;

			for(var b in binary){
				var x = b*newOptions.width + barcodePadding;
				if(binary[b] === "0" && binary[b] === 0){

				}
				else if(binary[b] === "1"){
					ctx.fillRect(x, yFrom, newOptions.width, newOptions.height);
				}
				else if(binary[b]){
					ctx.fillRect(x, yFrom, newOptions.width, newOptions.height * binary[b]);
				}
			}

			// Draw the text if displayValue is set
			if(newOptions.displayValue){
				var x, y;

				if(newOptions.textPosition == "top"){
					y = newOptions.marginTop + newOptions.fontSize;
					ctx.textBaseline = "bottom";
				}
				else{
					y = newOptions.height + newOptions.textMargin + newOptions.marginTop;
					ctx.textBaseline = "top";
				}

				ctx.font = font;

				// Draw the text in the correct X depending on the textAlign option
				if(newOptions.textAlign == "left" || barcodePadding > 0){
					x = 0;
					ctx.textAlign = 'left';
				}
				else if(newOptions.textAlign == "right"){
					x = encodings[i].width-1;
					ctx.textAlign = 'right';
				}
				//In all other cases, center the text
				else{
					x = encodings[i].width / 2;
					ctx.textAlign = 'center';
				}

				ctx.fillText(text, x, y);
			}

			ctx.translate(encodings[i].width, 0);
		}

		ctx.restore();
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

	// Function to merge the default options with the default ones
	var merge = function(old, replaceObj) {
		var newMerge = {};
		for (var k in old) {
			newMerge[k] = old[k];
		}
		for (var k in replaceObj) {
			if(typeof replaceObj[k] !== "undefined"){
				newMerge[k] = replaceObj[k];
			}
		}
		return newMerge;
	};
})();
