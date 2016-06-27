export default renderSVG;

import merge from "../help/merge.js";

var svgns = "http://www.w3.org/2000/svg";

function renderSVG(svg, encodings, options){
	var currentX = options.marginLeft;

	prepareSVG(svg, options, encodings);
	for(let i = 0; i < encodings.length; i++){
		var encodingOptions = merge(options, encodings[i].options);

		var group = createGroup(currentX, encodingOptions.marginTop, svg);

		setGroupOptions(group, encodingOptions);

		drawSvgBarcode(group, encodingOptions, encodings[i]);
		drawSVGText(group, encodingOptions, encodings[i]);

		currentX += encodings[i].width;
	}
}


function prepareSVG(svg, globalOptions, encodings){
	// Clear the SVG
	while (svg.firstChild) {
		svg.removeChild(svg.firstChild);
	}

	var totalWidth = 0;
	var maxHeight = 0;
	for(let i = 0; i < encodings.length; i++){
		var options = merge(globalOptions, encodings[i].options);

		// Calculate the width of the encoding
		var textWidth = messureSVGtext(encodings[i].text, svg, options);
		var barcodeWidth = encodings[i].data.length * options.width;
		encodings[i].width =  Math.ceil(Math.max(textWidth, barcodeWidth));

		// Calculate the height of the encoding
		var encodingHeight = options.height +
			((options.displayValue && encodings[i].text.length > 0) ? options.fontSize : 0) +
			options.textMargin +
			options.marginTop +
			options.marginBottom;

		var barcodePadding = 0;
		if(options.displayValue && barcodeWidth < textWidth){
			if(options.textAlign == "center"){
				barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
			}
			else if(options.textAlign == "left"){
				barcodePadding = 0;
			}
			else if(options.textAlign == "right"){
				barcodePadding = Math.floor(textWidth - barcodeWidth);
			}
		}
		encodings[i].barcodePadding = barcodePadding;

		if(encodingHeight > maxHeight){
			maxHeight = encodingHeight;
		}

		totalWidth += encodings[i].width;
	}

	var width = totalWidth + globalOptions.marginLeft + globalOptions.marginRight;
	var height = maxHeight;

	svg.setAttribute("width", width + "px");
	svg.setAttribute("height", height + "px");
	svg.setAttribute("x", "0px");
	svg.setAttribute("y", "0px");
	svg.setAttribute("viewBox", "0 0 " + width + " " + height);

	svg.setAttribute("xmlns", svgns);
	svg.setAttribute("version", "1.1");

	svg.style.transform = "translate(0,0)";

	if(globalOptions.background){
		svg.style.background = globalOptions.background;
	}
}

function drawSvgBarcode(parent, options, encoding){
	var binary = encoding.data;

	// Creates the barcode out of the encoded binary
	var yFrom;
	if(options.textPosition == "top"){
		yFrom = options.fontSize + options.textMargin;
	}
	else{
		yFrom = 0;
	}

	var barWidth = 0;
	var x;
	for(var b = 0; b < binary.length; b++){
		x = b * options.width + encoding.barcodePadding;

		if(binary[b] === "1"){
			barWidth++;
		}
		else if(barWidth > 0){
			drawLine(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
			barWidth = 0;
		}
	}

	// Last draw is needed since the barcode ends with 1
	if(barWidth > 0){
		drawLine(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
	}
}

function drawSVGText(parent, options, encoding){
	var textElem = document.createElementNS(svgns, 'text');

	// Draw the text if displayValue is set
	if(options.displayValue){
		var x, y;

		textElem.setAttribute("style",
	"font:" + options.fontOptions + " " + options.fontSize + "px " + options.font
	);

		if(options.textPosition == "top"){
			y = options.fontSize - options.textMargin;
		}
		else{
			y = options.height + options.textMargin + options.fontSize;
		}

	// Draw the text in the correct X depending on the textAlign option
		if(options.textAlign == "left" || encoding.barcodePadding > 0){
			x = 0;
			textElem.setAttribute("text-anchor", "start");
		}
		else if(options.textAlign == "right"){
			x = encoding.width - 1;
			textElem.setAttribute("text-anchor", "end");
		}
	// In all other cases, center the text
	else{
			x = encoding.width / 2;
			textElem.setAttribute("text-anchor", "middle");
		}

		textElem.setAttribute("x", x);
		textElem.setAttribute("y", y);

		textElem.appendChild(document.createTextNode(encoding.text));

		parent.appendChild(textElem);
	}
}

//
// Help functions
//
function messureSVGtext(string, svg, options){
	// Create text element
	/* var text = document.createElementNS(svgns, 'text');
	text.style.fontFamily = options.font;

	text.setAttribute("style",
	"font-family:" + options.font + ";" +
	"font-size:" + options.fontSize + "px;"
	);

	var textNode = document.createTextNode(string);

	text.appendChild(textNode);

	svg.appendChild(text);

	var size = text.getComputedTextLength();

	svg.removeChild(text);
	*/
	// TODO: Use svg to messure the text width
	// Set font
	var ctx = document.createElement("canvas").getContext("2d");
	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Calculate the width of the encoding
	var size = ctx.measureText(string).width;

	return size;
}

function createGroup(x, y, svg){
	var group = document.createElementNS(svgns, 'g');

	group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	svg.appendChild(group);

	return group;
}

function setGroupOptions(group, options){
	group.setAttribute("style",
	"fill:" + options.lineColor + ";"
	);
}

function drawLine(x, y, width, height, parent){
	var line = document.createElementNS(svgns, 'rect');

	line.setAttribute("x", x);
	line.setAttribute("y", y);
	line.setAttribute("width", width);
	line.setAttribute("height", height);

	parent.appendChild(line);
}
