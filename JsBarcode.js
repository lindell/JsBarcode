(function($){

	JsBarcode = function(image, content, options, validFunction) {

		//Check if the image parameter should be
		if(typeof image === "string"){
			image = document.querySelector(image);
		}

		var merge = function(m1, m2) {
			var newMerge = {};
			for (var k in m1) {
				newMerge[k] = m1[k];
			}
			for (var k in m2) {
				newMerge[k] = m2[k];
			}
			return newMerge;
		};

		//This tries to call the valid function only if it's specified. Otherwise nothing happens
		var validFunctionIfExist = function(valid){
		    if(validFunction){
		        validFunction(valid);
		    }
		};

		//Merge the user options with the default
		options = merge(JsBarcode.defaults, options);

		//Create the canvas where the barcode will be drawn on
		// Check if the given image is already a canvas
		var canvas = image;

		// check if it is a jQuery object
		if ($ && canvas instanceof $) {
			// get the DOM element of the object
			canvas = image.get(0);
		}

		// check if DOM element is a canvas, otherwise it will be probably an image so create a canvas
		if (!(canvas instanceof HTMLCanvasElement)) {
			canvas = document.createElement('canvas');
		}

		//Abort if the browser does not support HTML5canvas
		if (!canvas.getContext) {
			return image;
		}

		var encoder = new window[options.format](content);

		//Abort if the barcode format does not support the content
		if(!encoder.valid()){
		    validFunctionIfExist(false);
			throw new Error('The data is not valid for the type of barcode.');
		}

		//Encode the content
		var binary = encoder.encoded();

		var _drawBarcodeText = function (text) {
					var x, y;

					// allow definition of some spare space above the text as textGutter
					y = options.height + textGutter;

					ctx.font = options.fontOptions + " " + options.fontSize + "px "+options.font;
					ctx.textBaseline = "bottom";
					ctx.textBaseline = 'top';

					if(options.textAlign == "left"){
						x = options.quite;
						ctx.textAlign = 'left';
					}
					else if(options.textAlign == "right"){
						x = canvas.width - options.quite;
						ctx.textAlign = 'right';
					}
					else{ //All other center
						x = canvas.width / 2;
						ctx.textAlign = 'center';
					}

					ctx.fillText(text, x, y);
				}

		//Get the canvas context
		var ctx	= canvas.getContext("2d");

		//Set the width and height of the barcode
		canvas.width = binary.length*options.width+2*options.quite;
        //Set extra height if the value is displayed under the barcode. Multiplication with 1.3 t0 ensure that some
        //characters are not cut in half
		canvas.height = options.height + (options.displayValue ? options.fontSize * 1.3 : 0);

		//Paint the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(options.backgroundColor){
			ctx.fillStyle = options.backgroundColor;
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}

		//Creates the barcode out of the encoded binary
		ctx.fillStyle = options.lineColor;
		for(var i=0;i<binary.length;i++){
			var x = i*options.width+options.quite;
			if(binary[i] == "1"){
				ctx.fillRect(x,0,options.width,options.height);
			}
		}

		if(options.displayValue){
			_drawBarcodeText(encoder.getText());
		}

		//Grab the dataUri from the canvas
		uri = canvas.toDataURL('image/png');

		// check if given image is a jQuery object
		if ($ && image instanceof $) {
			// check if DOM element of jQuery selection is not a canvas, so assume that it is an image
			if (!(image.get(0) instanceof HTMLCanvasElement)) {
				 //Put the data uri into the image
			 	image.attr("src", uri);
			}
		} else if (!(image instanceof HTMLCanvasElement)) {
			// There is no jQuery object so just check if the given image was a canvas, if not set the source attr
			image.setAttribute("src", uri);
		}


		validFunctionIfExist(true);

	};

	JsBarcode.defaults = {
		width:	2,
		height:	100,
		quite: 10,
		format:	"CODE128",
		displayValue: false,
		fontOptions: "",
		font:"monospace",
		textAlign:"center",
		fontSize: 12,
		textGutter: 0,
		backgroundColor:"",
		lineColor:"#000"
	};

	if ($) {
		$.fn.JsBarcode = function(content, options,validFunction){
			JsBarcode(this, content, options,validFunction);
			return this;
		};
	}

})(typeof jQuery != 'undefined' ? jQuery : null);
