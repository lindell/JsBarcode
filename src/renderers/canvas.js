import merge from "../help/merge.js";
import {getEncodingHeight, getBarcodePadding} from "./shared.js";

class CanvasRenderer{
	constructor(canvas, encodings, options){
		this.canvas = canvas;
		this.encodings = encodings;
		this.options = options;
	}

	render(){
		// Abort if the browser does not support HTML5 canvas
		if (!this.canvas.getContext) {
			throw new Error('The browser does not support canvas.');
		}

		this.prepareCanvas();
		for(let i = 0; i < this.encodings.length; i++){
			var encodingOptions = merge(this.options, this.encodings[i].options);

			this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
			this.drawCanvasText(encodingOptions, this.encodings[i]);

			this.moveCanvasDrawing(this.encodings[i]);
		}

		this.restoreCanvas();
	}

	prepareCanvas(){
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		ctx.save();

		// Calculate total width
		var totalWidth = 0;
		var maxHeight = 0;
		for(let i = 0; i < this.encodings.length; i++){
			var options = merge(this.options, this.encodings[i].options);
			var encoding = this.encodings[i];

			// Set font
			ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

			// Calculate the width of the encoding
			var textWidth = ctx.measureText(encoding.text).width;
			var barcodeWidth = encoding.data.length * options.width;
			encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

			// Calculate the height of the encoding
			var height = getEncodingHeight(encoding, options);

			encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);

			if(height > maxHeight){
				maxHeight = height;
			}

			totalWidth += encoding.width;
		}

		this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

		this.canvas.height = maxHeight;

		// Paint the canvas
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if(this.options.background){
			ctx.fillStyle = this.options.background;
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}

		ctx.translate(this.options.marginLeft, 0);
	}

	drawCanvasBarcode(options, encoding){
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom;
		if(options.textPosition == "top"){
			yFrom = options.marginTop + options.fontSize + options.textMargin;
		}
		else{
			yFrom = options.marginTop;
		}

		ctx.fillStyle = options.lineColor;

		for(var b = 0; b < binary.length; b++){
			var x = b * options.width + encoding.barcodePadding;

			if(binary[b] === "1"){
				ctx.fillRect(x, yFrom, options.width, options.height);
			}
			else if(binary[b]){
				ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
			}
		}
	}

	drawCanvasText(options, encoding){
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Draw the text if displayValue is set
		if(options.displayValue){
			var x, y;

			if(options.textPosition == "top"){
				y = options.marginTop + options.fontSize - options.textMargin;
			}
			else{
				y = options.height + options.textMargin + options.marginTop + options.fontSize;
			}

			ctx.font = font;

			// Draw the text in the correct X depending on the textAlign option
			if(options.textAlign == "left" || encoding.barcodePadding > 0){
				x = 0;
				ctx.textAlign = 'left';
			}
			else if(options.textAlign == "right"){
				x = encoding.width - 1;
				ctx.textAlign = 'right';
			}
			// In all other cases, center the text
			else{
				x = encoding.width / 2;
				ctx.textAlign = 'center';
			}

			ctx.fillText(encoding.text, x, y);
		}
	}



	moveCanvasDrawing(encoding){
		var ctx = this.canvas.getContext("2d");

		ctx.translate(encoding.width, 0);
	}

	restoreCanvas(){
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		ctx.restore();
	}
}

export default CanvasRenderer;
