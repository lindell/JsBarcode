"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _merge = require("../help/merge.js");

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = drawSVG;


function drawSVG(svg, encodings, options) {
	prepareSVG(svg, encodings, options);

	var currentX = options.marginLeft;
	for (var i in encodings) {
		var options = (0, _merge2.default)(options, encodings[i].options);

		var group = createGroup(currentX, options.marginTop, svg);

		var text = encodings[i].text;
		var binary = encodings[i].data;

		var yFrom, yHeight;
		if (options.textPosition == "top") {
			yFrom = options.marginTop + options.fontSize + options.textMargin;
		} else {
			yFrom = options.marginTop;
		}
		yHeight = options.height;

		for (var b in binary) {
			var x = b * options.width;
			if (binary[b] == 0) {} else if (binary[b] === "1") {
				drawLine(x, yFrom, options.width, options.height, group);
			} else if (binary[b]) {
				drawLine(x, yFrom, options.width, options.height * binary[b], group);
			}
		}

		// Draw the text if displayValue is set
		if (options.displayValue) {
			var x, y;
			var textElem = document.createElementNS("http://www.w3.org/2000/svg", 'text');

			if (options.textPosition == "top") {
				y = options.marginTop + options.fontSize;
				textElem.setAttribute("alignment-baseline", "baseline");
			} else {
				y = options.height + options.textMargin + options.marginTop;
				textElem.setAttribute("alignment-baseline", "text-before-edge");
			}

			textElem.setAttribute("font-family", options.font);
			textElem.setAttribute("font-size", options.fontSize);

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == "left") {
				// || barcodePadding > 0
				x = 0;
				textElem.setAttribute("text-anchor", "start");
			} else if (options.textAlign == "right") {
				x = encodings[i].width - 1;
				textElem.setAttribute("text-anchor", "end");
			}
			//In all other cases, center the text
			else {
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

var prepareSVG = function prepareSVG(svg, encodings, options) {
	// Clear SVG
	// TODO

	// Calculate total width
	var totalWidth = 0;
	for (var i in encodings) {
		var textWidth = messureSVGtext(encodings[i].text, svg, options);
		var barcodeWidth = encodings[i].data.length * options.width;

		encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

		totalWidth += encodings[i].width;
	}

	svg.setAttribute("width", totalWidth + options.marginLeft + options.marginRight);

	svg.setAttribute("height", options.height + (options.displayValue ? options.fontSize : 0) + options.textMargin + options.marginTop + options.marginBottom);

	// Paint the canvas
	/*ctx.clearRect(0,0,canvas.width,canvas.height);
 if(options.background){
 	ctx.fillStyle = options.background;
 	ctx.fillRect(0,0,canvas.width, canvas.height);
 }*/
};

var messureSVGtext = function messureSVGtext(text, svg, options) {
	// Create text element
	var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	text.style.fontFamily = options.font;
	// TODO add all font options

	var textNode = document.createTextNode(text);

	text.appendChild(textNode);

	return text.getComputedTextLength();
};

function createGroup(x, y, svg) {
	var group = document.createElementNS("http://www.w3.org/2000/svg", 'g');

	group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	svg.appendChild(group);

	return group;
}

function drawLine(x, y, width, height, svg) {
	var line = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

	line.setAttribute("x", x);
	line.setAttribute("y", y);
	line.setAttribute("width", width);
	line.setAttribute("height", height);
	line.setAttribute("style", "fill:rgb(0,0,0)");

	svg.appendChild(line);
}