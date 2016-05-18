"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _merge = require("../help/merge.js");

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = renderCanvas;


function renderCanvas(canvas, encodings, options) {
	// Abort if the browser does not support HTML5 canvas
	if (!canvas.getContext) {
		throw new Error('The browser does not support canvas.');
	}

	prepareCanvas(canvas, options, encodings);
	for (var i = 0; i < encodings.length; i++) {
		var encodingOptions = (0, _merge2.default)(options, encodings[i].options);

		drawCanvasBarcode(canvas, encodingOptions, encodings[i]);
		drawCanvasText(canvas, encodingOptions, encodings[i]);

		moveCanvasDrawing(canvas, encodings[i]);
	}

	restoreCanvas(canvas);
}

function prepareCanvas(canvas, options, encodings) {
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	ctx.save();

	// Calculate total width
	var totalWidth = 0;
	var maxHeight = 0;
	for (var i = 0; i < encodings.length; i++) {
		var _options = (0, _merge2.default)(_options, encodings[i].options);

		// Set font
		ctx.font = _options.fontOptions + " " + _options.fontSize + "px " + _options.font;

		// Calculate the width of the encoding
		var textWidth = ctx.measureText(encodings[i].text).width;
		var barcodeWidth = encodings[i].data.length * _options.width;
		encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

		// Calculate the height of the encoding
		var height = _options.height + (_options.displayValue && encodings[i].text.length > 0 ? _options.fontSize : 0) + _options.textMargin + _options.marginTop + _options.marginBottom;

		var barcodePadding = 0;
		if (_options.displayValue && barcodeWidth < textWidth) {
			if (_options.textAlign == "center") {
				barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
			} else if (_options.textAlign == "left") {
				barcodePadding = 0;
			} else if (_options.textAlign == "right") {
				barcodePadding = Math.floor(textWidth - barcodeWidth);
			}
		}
		encodings[i].barcodePadding = barcodePadding;

		if (height > maxHeight) {
			maxHeight = height;
		}

		totalWidth += encodings[i].width;
	}

	canvas.width = totalWidth + options.marginLeft + options.marginRight;

	canvas.height = maxHeight;

	// Paint the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (options.background) {
		ctx.fillStyle = options.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	ctx.translate(options.marginLeft, 0);
}

function drawCanvasBarcode(canvas, options, encoding) {
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	var binary = encoding.data;

	// Creates the barcode out of the encoded binary
	var yFrom, yHeight;
	if (options.textPosition == "top") {
		yFrom = options.marginTop + options.fontSize + options.textMargin;
	} else {
		yFrom = options.marginTop;
	}
	yHeight = options.height;

	ctx.fillStyle = options.lineColor;

	for (var b = 0; b < binary.length; b++) {
		var x = b * options.width + encoding.barcodePadding;

		if (binary[b] === "1") {
			ctx.fillRect(x, yFrom, options.width, options.height);
		} else if (binary[b]) {
			ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
		}
	}
}

function drawCanvasText(canvas, options, encoding) {
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Draw the text if displayValue is set
	if (options.displayValue) {
		var x, y;

		if (options.textPosition == "top") {
			y = options.marginTop + options.fontSize - options.textMargin;
		} else {
			y = options.height + options.textMargin + options.marginTop + options.fontSize;
		}

		ctx.font = font;

		// Draw the text in the correct X depending on the textAlign option
		if (options.textAlign == "left" || encoding.barcodePadding > 0) {
			x = 0;
			ctx.textAlign = 'left';
		} else if (options.textAlign == "right") {
			x = encoding.width - 1;
			ctx.textAlign = 'right';
		}
		// In all other cases, center the text
		else {
				x = encoding.width / 2;
				ctx.textAlign = 'center';
			}

		ctx.fillText(encoding.text, x, y);
	}
}

function moveCanvasDrawing(canvas, encoding) {
	var ctx = canvas.getContext("2d");

	ctx.translate(encoding.width, 0);
}

function restoreCanvas(canvas) {
	// Get the canvas context
	var ctx = canvas.getContext("2d");

	ctx.restore();
}