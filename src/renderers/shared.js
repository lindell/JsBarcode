export {getEncodingHeight, getBarcodePadding};

function getEncodingHeight(encoding, options){
	return options.height +
		((options.displayValue && encoding.text.length > 0) ? options.fontSize : 0) +
		options.textMargin +
		options.marginTop +
		options.marginBottom;
}

function getBarcodePadding(textWidth, barcodeWidth, options){
	if(options.displayValue && barcodeWidth < textWidth){
		if(options.textAlign == "center"){
			return Math.floor((textWidth - barcodeWidth) / 2);
		}
		else if(options.textAlign == "left"){
			return 0;
		}
		else if(options.textAlign == "right"){
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}
