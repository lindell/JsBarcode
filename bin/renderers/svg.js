"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _merge = require("../help/merge.js");

var _merge2 = _interopRequireDefault(_merge);

var _shared = require("./shared.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var svgns = "http://www.w3.org/2000/svg";

var SVGRenderer = function () {
	function SVGRenderer(svg, encodings, options) {
		_classCallCheck(this, SVGRenderer);

		this.svg = svg;
		this.encodings = encodings;
		this.options = options;
	}

	SVGRenderer.prototype.render = function render() {
		var currentX = this.options.marginLeft;

		this.prepareSVG();
		for (var i = 0; i < this.encodings.length; i++) {
			var encoding = this.encodings[i];
			var encodingOptions = (0, _merge2.default)(this.options, encoding.options);

			var group = createGroup(currentX, encodingOptions.marginTop, this.svg);

			setGroupOptions(group, encodingOptions);

			this.drawSvgBarcode(group, encodingOptions, encoding);
			this.drawSVGText(group, encodingOptions, encoding);

			currentX += encoding.width;
		}
	};

	SVGRenderer.prototype.prepareSVG = function prepareSVG() {
		// Clear the SVG
		while (this.svg.firstChild) {
			this.svg.removeChild(this.svg.firstChild);
		}

		(0, _shared.calculateEncodingAttributes)(this.encodings, this.options);
		var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
		var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

		var width = totalWidth + this.options.marginLeft + this.options.marginRight;
		this.setSvgAttributes(width, maxHeight);

		if (this.options.background) {
			drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
		}
	};

	SVGRenderer.prototype.drawSvgBarcode = function drawSvgBarcode(parent, options, encoding) {
		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom;
		if (options.textPosition == "top") {
			yFrom = options.fontSize + options.textMargin;
		} else {
			yFrom = 0;
		}

		var barWidth = 0;
		var x = 0;
		for (var b = 0; b < binary.length; b++) {
			x = b * options.width + encoding.barcodePadding;

			if (binary[b] === "1") {
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
	};

	SVGRenderer.prototype.drawSVGText = function drawSVGText(parent, options, encoding) {
		var textElem = document.createElementNS(svgns, 'text');

		// Draw the text if displayValue is set
		if (options.displayValue) {
			var x, y;

			textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

			if (options.textPosition == "top") {
				y = options.fontSize - options.textMargin;
			} else {
				y = options.height + options.textMargin + options.fontSize;
			}

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == "left" || encoding.barcodePadding > 0) {
				x = 0;
				textElem.setAttribute("text-anchor", "start");
			} else if (options.textAlign == "right") {
				x = encoding.width - 1;
				textElem.setAttribute("text-anchor", "end");
			}
			// In all other cases, center the text
			else {
					x = encoding.width / 2;
					textElem.setAttribute("text-anchor", "middle");
				}

			textElem.setAttribute("x", x);
			textElem.setAttribute("y", y);

			textElem.appendChild(document.createTextNode(encoding.text));

			parent.appendChild(textElem);
		}
	};

	SVGRenderer.prototype.setSvgAttributes = function setSvgAttributes(width, height) {
		var svg = this.svg;
		svg.setAttribute("width", width + "px");
		svg.setAttribute("height", height + "px");
		svg.setAttribute("x", "0px");
		svg.setAttribute("y", "0px");
		svg.setAttribute("viewBox", "0 0 " + width + " " + height);

		svg.setAttribute("xmlns", svgns);
		svg.setAttribute("version", "1.1");

		svg.style.transform = "translate(0,0)";
	};

	return SVGRenderer;
}();

function createGroup(x, y, parent) {
	var group = document.createElementNS(svgns, 'g');

	group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	parent.appendChild(group);

	return group;
}

function setGroupOptions(group, options) {
	group.setAttribute("style", "fill:" + options.lineColor + ";");
}

function drawRect(x, y, width, height, parent) {
	var rect = document.createElementNS(svgns, 'rect');

	rect.setAttribute("x", x);
	rect.setAttribute("y", y);
	rect.setAttribute("width", width);
	rect.setAttribute("height", height);

	parent.appendChild(rect);

	return rect;
}

exports.default = SVGRenderer;