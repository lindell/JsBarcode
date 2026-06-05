import { Encoding, Options } from '@jsbarcode/core';

function getEncodingHeight(encoding: Encoding, options: Options): number {
	return (
		options.height +
		(options.displayValue && encoding.text && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) +
		options.marginTop! +
		options.marginBottom!
	);
}

function getBarcodePadding(textWidth: number, barcodeWidth: number, options: Options): number {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == 'center') {
			return Math.floor((textWidth - barcodeWidth) / 2);
		} else if (options.textAlign == 'left') {
			return 0;
		} else if (options.textAlign == 'right') {
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings: Encoding[], barcodeOptions: Options, context?: any): void {
	for (let i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var options = { ...barcodeOptions, ...encoding.options };

		// Calculate the width of the encoding
		var textWidth: number;
		if (options.displayValue && encoding.text) {
			textWidth = messureText(encoding.text, options, context);
		} else {
			textWidth = 0;
		}

		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings: Encoding[]): number {
	var totalWidth = 0;
	for (let i = 0; i < encodings.length; i++) {
		totalWidth += encodings[i].width || 0;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings: Encoding[]): number {
	var maxHeight = 0;
	for (let i = 0; i < encodings.length; i++) {
		if (encodings[i].height && encodings[i].height! > maxHeight) {
			maxHeight = encodings[i].height!;
		}
	}
	return maxHeight;
}

function messureText(string: string, options: Options, context?: any): number {
	var ctx: any;

	if (context) {
		ctx = context;
	} else if (typeof document !== 'undefined') {
		ctx = document.createElement('canvas').getContext('2d');
	} else {
		// If the text cannot be messured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	ctx.font = options.fontOptions + ' ' + options.fontSize + 'px ' + options.font;

	// Calculate the width of the encoding
	var size = ctx.measureText(string).width;

	return size;
}

export {
	getMaximumHeightOfEncodings,
	getEncodingHeight,
	getBarcodePadding,
	calculateEncodingAttributes,
	getTotalWidthOfEncodings
};
