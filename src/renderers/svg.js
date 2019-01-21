import { calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings } from './shared.js';

var svgns = 'http://www.w3.org/2000/svg';

function renderer(svg, encodings, options) {
	const doc = options.xmlDocument || document;

	var currentX = options.marginLeft;

	prepareSVG();
	for (let i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var encodingOptions = { ...options, ...encoding.options };

		var group = createGroup(currentX, encodingOptions.marginTop, svg);

		setGroupOptions(group, encodingOptions);

		drawSvgBarcode(group, encodingOptions, encoding);
		drawSVGText(group, encodingOptions, encoding);

		currentX += encoding.width;
	}

	function prepareSVG() {
		// Clear the SVG
		while (svg.firstChild) {
			svg.removeChild(svg.firstChild);
		}

		calculateEncodingAttributes(encodings, options);
		var totalWidth = getTotalWidthOfEncodings(encodings);
		var maxHeight = getMaximumHeightOfEncodings(encodings);

		var width = totalWidth + options.marginLeft + options.marginRight;
		setSvgAttributes(width, maxHeight);

		if (options.background) {
			drawRect(0, 0, width, maxHeight, svg).setAttribute('style', 'fill:' + options.background + ';');
		}
	}

	function drawSvgBarcode(parent, options, encoding) {
		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom;
		if (options.textPosition == 'top') {
			yFrom = options.fontSize + options.textMargin;
		} else {
			yFrom = 0;
		}

		var barWidth = 0;
		var x = 0;
		for (var b = 0; b < binary.length; b++) {
			x = b * options.width + encoding.barcodePadding;

			if (binary[b] === '1') {
				barWidth++;
			} else if (barWidth > 0) {
				drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
				barWidth = 0;
			}
		}

		// Last draw is needed since the barcode ends with 1
		if (barWidth > 0) {
			drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
		}
	}

	function drawSVGText(parent, options, encoding) {
		var textElem = doc.createElementNS(svgns, 'text');

		// Draw the text if displayValue is set
		if (options.displayValue) {
			var x, y;

			textElem.setAttribute('style', 'font:' + options.fontOptions + ' ' + options.fontSize + 'px ' + options.font);

			if (options.textPosition == 'top') {
				y = options.fontSize - options.textMargin;
			} else {
				y = options.height + options.textMargin + options.fontSize;
			}

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == 'left' || encoding.barcodePadding > 0) {
				x = 0;
				textElem.setAttribute('text-anchor', 'start');
			} else if (options.textAlign == 'right') {
				x = encoding.width - 1;
				textElem.setAttribute('text-anchor', 'end');
			}
			// In all other cases, center the text
			else {
				x = encoding.width / 2;
				textElem.setAttribute('text-anchor', 'middle');
			}

			textElem.setAttribute('x', x);
			textElem.setAttribute('y', y);

			textElem.appendChild(doc.createTextNode(encoding.text));

			parent.appendChild(textElem);
		}
	}

	function setSvgAttributes(width, height) {
		svg.setAttribute('width', width + 'px');
		svg.setAttribute('height', height + 'px');
		svg.setAttribute('x', '0px');
		svg.setAttribute('y', '0px');
		svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

		svg.setAttribute('xmlns', svgns);
		svg.setAttribute('version', '1.1');

		svg.setAttribute('style', 'transform: translate(0,0)');
	}

	function createGroup(x, y, parent) {
		var group = doc.createElementNS(svgns, 'g');
		group.setAttribute('transform', 'translate(' + x + ', ' + y + ')');

		parent.appendChild(group);

		return group;
	}

	function setGroupOptions(group, options) {
		group.setAttribute('style', 'fill:' + options.lineColor + ';');
	}

	function drawRect(x, y, width, height, parent) {
		var rect = doc.createElementNS(svgns, 'rect');

		rect.setAttribute('x', x);
		rect.setAttribute('y', y);
		rect.setAttribute('width', width);
		rect.setAttribute('height', height);

		parent.appendChild(rect);

		return rect;
	}
}

export default renderer;
