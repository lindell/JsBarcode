import { calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings } from './shared';
import { Options, Encoding } from '@jsbarcode/core';

var svgns = 'http://www.w3.org/2000/svg';

function renderer(svg: SVGElement, encodings: Encoding[], options: Options): void {
	const doc: Document = (options.xmlDocument as Document) || (typeof document !== 'undefined' ? document : undefined) as Document;

	var currentX = options.marginLeft!;

	prepareSVG();
	for (let i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var encodingOptions = { ...options, ...encoding.options };

		var group = createGroup(currentX, encodingOptions.marginTop!, svg);

		setGroupOptions(group, encodingOptions);

		drawSvgBarcode(group, encodingOptions, encoding);
		drawSVGText(group, encodingOptions, encoding);

		currentX += encoding.width || 0;
	}

	function prepareSVG() {
		// Clear the SVG
		while (svg.firstChild) {
			svg.removeChild(svg.firstChild);
		}

		calculateEncodingAttributes(encodings, options);
		var totalWidth = getTotalWidthOfEncodings(encodings);
		var maxHeight = getMaximumHeightOfEncodings(encodings);

		var width = totalWidth + options.marginLeft! + options.marginRight!;
		setSvgAttributes(width, maxHeight);

		if (options.background) {
			drawRect(0, 0, width, maxHeight, svg).setAttribute('style', 'fill:' + options.background + ';');
		}
	}

	function drawSvgBarcode(parent: SVGElement, options: Options, encoding: Encoding) {
		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom: number;
		if (options.textPosition == 'top') {
			yFrom = options.fontSize + options.textMargin;
		} else {
			yFrom = 0;
		}

		var barWidth = 0;
		var x = 0;
		for (var b = 0; b < binary.length; b++) {
			x = b * options.width + (encoding.barcodePadding || 0);

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

	function drawSVGText(parent: SVGElement, options: Options, encoding: Encoding) {
		var textElem = doc.createElementNS(svgns, 'text');

		// Draw the text if displayValue is set
		if (options.displayValue && encoding.text) {
			var x: number, y: number;

			textElem.setAttribute('style', 'font:' + options.fontOptions + ' ' + options.fontSize + 'px ' + options.font);

			if (options.textPosition == 'top') {
				y = options.fontSize - options.textMargin;
			} else {
				y = options.height + options.textMargin + options.fontSize;
			}

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == 'left' || (encoding.barcodePadding && encoding.barcodePadding > 0)) {
				x = 0;
				textElem.setAttribute('text-anchor', 'start');
			} else if (options.textAlign == 'right') {
				x = (encoding.width || 0) - 1;
				textElem.setAttribute('text-anchor', 'end');
			}
			// In all other cases, center the text
			else {
				x = (encoding.width || 0) / 2;
				textElem.setAttribute('text-anchor', 'middle');
			}

			textElem.setAttribute('x', x.toString());
			textElem.setAttribute('y', y.toString());

			textElem.appendChild(doc.createTextNode(encoding.text));

			parent.appendChild(textElem);
		}
	}

	function setSvgAttributes(width: number, height: number) {
		svg.setAttribute('width', width + 'px');
		svg.setAttribute('height', height + 'px');
		svg.setAttribute('x', '0px');
		svg.setAttribute('y', '0px');
		svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

		svg.setAttribute('xmlns', svgns);
		svg.setAttribute('version', '1.1');

		svg.setAttribute('style', 'transform: translate(0,0)');
	}

	function createGroup(x: number, y: number, parent: SVGElement): SVGElement {
		var group = doc.createElementNS(svgns, 'g') as SVGElement;
		group.setAttribute('transform', 'translate(' + x + ', ' + y + ')');

		parent.appendChild(group);

		return group;
	}

	function setGroupOptions(group: SVGElement, options: Options) {
		group.setAttribute('style', 'fill:' + options.lineColor + ';');
	}

	function drawRect(x: number, y: number, width: number, height: number, parent: SVGElement): SVGElement {
		var rect = doc.createElementNS(svgns, 'rect') as SVGElement;

		rect.setAttribute('x', x.toString());
		rect.setAttribute('y', y.toString());
		rect.setAttribute('width', width.toString());
		rect.setAttribute('height', height.toString());

		parent.appendChild(rect);

		return rect;
	}
}

export default renderer;
