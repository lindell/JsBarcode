import { calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings } from './shared';
import { Options, Encoding } from '@jsbarcode/core';

function renderer(canvas: any, encodings: Encoding[], options: Options): void {
	// Abort if the browser does not support HTML5 canvas
	if (!canvas.getContext) {
		throw new Error('The browser does not support canvas');
	}

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	prepareCanvas();
	for (let i = 0; i < encodings.length; i++) {
		var encodingOptions = { ...options, ...encodings[i].options };

		drawCanvasBarcode(encodingOptions, encodings[i]);
		drawCanvasText(encodingOptions, encodings[i]);

		moveCanvasDrawing(encodings[i]);
	}
	ctx.restore();

	function prepareCanvas() {
		ctx.save();

		calculateEncodingAttributes(encodings, options, ctx);
		var totalWidth = getTotalWidthOfEncodings(encodings);
		var maxHeight = getMaximumHeightOfEncodings(encodings);

		canvas.width = totalWidth + options.marginLeft! + options.marginRight!;

		canvas.height = maxHeight;

		// Paint the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (options.background) {
			ctx.fillStyle = options.background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		ctx.translate(options.marginLeft!, 0);
	}

	function drawCanvasBarcode(options: Options, encoding: Encoding) {
		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom: number;
		if (options.textPosition == 'top') {
			yFrom = options.marginTop! + options.fontSize + options.textMargin;
		} else {
			yFrom = options.marginTop!;
		}

		ctx.fillStyle = options.lineColor;

		for (var b = 0; b < binary.length; b++) {
			var x = b * options.width + (encoding.barcodePadding || 0);

			if (binary[b] === '1') {
				ctx.fillRect(x, yFrom, options.width, options.height);
			} else if (binary[b]) {
				ctx.fillRect(x, yFrom, options.width, options.height * (+binary[b]));
			}
		}
	}

	function drawCanvasText(options: Options, encoding: Encoding) {
		var font = options.fontOptions + ' ' + options.fontSize + 'px ' + options.font;

		// Draw the text if displayValue is set
		if (options.displayValue && encoding.text) {
			var x: number, y: number;

			if (options.textPosition == 'top') {
				y = options.marginTop! + options.fontSize - options.textMargin;
			} else {
				y = options.height + options.textMargin + options.marginTop! + options.fontSize;
			}

			ctx.font = font;

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == 'left' || (encoding.barcodePadding && encoding.barcodePadding > 0)) {
				x = 0;
				ctx.textAlign = 'left';
			} else if (options.textAlign == 'right') {
				x = (encoding.width || 0) - 1;
				ctx.textAlign = 'right';
			}
			// In all other cases, center the text
			else {
				x = (encoding.width || 0) / 2;
				ctx.textAlign = 'center';
			}

			ctx.fillText(encoding.text, x, y);
		}
	}

	function moveCanvasDrawing(encoding: Encoding) {
		ctx.translate(encoding.width || 0, 0);
	}
}

export default renderer;
