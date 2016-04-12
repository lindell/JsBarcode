export default drawCanvas;

import merge from "../help/merge.js";

function drawCanvas(canvas, encodings, options){
	//Abort if the browser does not support HTML5 canvas
	if (!canvas.getContext) {
		throw new Error('The browser does not support canvas.');
	}

	prepareCanvas(canvas, options, encodings);
	for(var i in encodings){
		var encodingOptions = merge(options, encodings[i].options);

		drawCanvasBarcode(canvas, encodingOptions, encodings[i]);
		drawCanvasText(canvas, encodingOptions, encodings[i]);

		moveCanvasDrawing(canvas, encodings[i]);
	}

	restoreCanvas(canvas);
}

function moveCanvasDrawing(canvas, encoding){
	var ctx = canvas.getContext("2d");

	ctx.translate(encoding.width, 0);
}

function restoreCanvas(canvas){
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	ctx.restore();
}

function drawCanvasText(canvas, options, encoding, sizeOptions){
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	var font = options.fontOptions + " " + options.fontSize + "px "+options.font;

	// Draw the text if displayValue is set
	if(options.displayValue){
		var x, y;

		if(options.textPosition == "top"){
			y = options.marginTop + options.fontSize;
			ctx.textBaseline = "bottom";
		}
		else{
			y = options.height + options.textMargin + options.marginTop;
			ctx.textBaseline = "top";
		}

		ctx.font = font;

		// Draw the text in the correct X depending on the textAlign option
		if(options.textAlign == "left" || encoding.barcodePadding > 0){
			x = 0;
			ctx.textAlign = 'left';
		}
		else if(options.textAlign == "right"){
			x = encoding.width-1;
			ctx.textAlign = 'right';
		}
		//In all other cases, center the text
		else{
			x = encoding.width / 2;
			ctx.textAlign = 'center';
		}

		ctx.fillText(encoding.text, x, y);
	}
}

function prepareCanvas(canvas, options, encodings){
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	ctx.save();

	// Set font
	ctx.font = options.fontOptions + " " + options.fontSize + "px "+options.font;

	// Calculate total width
	var totalWidth = 0;
	for(var i in encodings){
		var textWidth = ctx.measureText(encodings[i].text).width;
		var barcodeWidth = encodings[i].data.length * options.width;

		encodings[i].width =  Math.ceil(Math.max(textWidth, barcodeWidth));

		var barcodePadding = 0;
		if(options.displayValue && barcodeWidth < textWidth){
			if(options.textAlign == "center"){
				barcodePadding = Math.floor((textWidth - barcodeWidth)/2);
			}
			else if(options.textAlign == "left"){
				barcodePadding = 0;
			}
			else if(options.textAlign == "right"){
				barcodePadding = Math.floor(textWidth - barcodeWidth);
			}
		}
		encodings[i].barcodePadding = barcodePadding;

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
}

function drawCanvasBarcode(canvas, options, encoding, sizeOptions){
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	var binary = encoding.data;
	var text = encoding.text;

	// Creates the barcode out of the encoded binary
	var yFrom, yHeight;
	if(options.textPosition == "top"){
		yFrom = options.marginTop + options.fontSize + options.textMargin;
	}
	else{
		yFrom = options.marginTop;
	}
	yHeight = options.height;

	ctx.fillStyle = options.lineColor;

	for(var b in binary){
		var x = b*options.width + encoding.barcodePadding;
		if(binary[b] === "0" && binary[b] === 0){

		}
		else if(binary[b] === "1"){
			ctx.fillRect(x, yFrom, options.width, options.height);
		}
		else if(binary[b]){
			ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
		}
	}
}
