import merge from "../help/merge.js";
import {calculateEncodingAttributes, getTotalWidthOfEncodings, getMaximumHeightOfEncodings} from "./shared.js";

var svgns = "http://www.w3.org/2000/svg";

var idSeq = 1;

class SVGRenderer{
	constructor(svg, encodings, options){
		this.svg = svg;
		this.encodings = encodings;
		this.options = options;
		this.document = options.xmlDocument || document;

		if (!options.xmlDocument) {
			this.createStylesheet();
		}
	}

	createStylesheet() {
		if (!this.svg.id) {
			this.svg.id = 'jsbc' + idSeq++;
		}
		var styleId = this.svg.id + '_jsbcstyle';
		if (!document.getElementById(styleId)) {
			var head = document.head || document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			style.id = styleId;
			var nonce = this.options.nonce;
			if (!nonce) {
				const cspNonce = document.querySelector('meta[property=csp-nonce]');
				if (cspNonce) {
					nonce = cspNonce.nonce;
				}
			}
			if (nonce) {
				style.setAttribute('nonce', nonce);
			}
			style.setAttribute('type', 'text/css');
			style.textContent = `
				#${this.svg.id} {
					transform: translate(0,0);
				}
			`;
			if (this.options.background) {
				style.textContent += `
				#${this.svg.id} > rect {
					fill: ${this.options.background};
				}
				`;
			}
			if (this.options.lineColor) {
				style.textContent += `
				#${this.svg.id} g {
					fill: ${this.options.lineColor};
				}
				`;
			}
			if (this.options.fontOptions || this.options.fontSize || this.options.font) {
				style.textContent += `
				#${this.svg.id} text {
					font: ${this.options.fontOptions} ${this.options.fontSize}px ${this.options.font};
				}
				`;
			}
			head.appendChild(style);
		}
	}

	render(){

		var currentX = this.options.marginLeft;

		this.prepareSVG();
		for(let i = 0; i < this.encodings.length; i++){
			var encoding = this.encodings[i];
			var encodingOptions = merge(this.options, encoding.options);

			var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);

			this.setGroupOptions(group, encodingOptions);

			this.drawSvgBarcode(group, encodingOptions, encoding);
			this.drawSVGText(group, encodingOptions, encoding);

			currentX += encoding.width;
		}
	}

	prepareSVG(){
		// Clear the SVG
		while (this.svg.firstChild) {
			this.svg.removeChild(this.svg.firstChild);
		}

		calculateEncodingAttributes(this.encodings, this.options);
		var totalWidth = getTotalWidthOfEncodings(this.encodings);
		var maxHeight = getMaximumHeightOfEncodings(this.encodings);

		var width = totalWidth + this.options.marginLeft + this.options.marginRight;
		this.setSvgAttributes(width, maxHeight);

		if(this.options.background){
			var rect = this.drawRect(0, 0, width, maxHeight, this.svg);
			if (this.options.xmlDocument) {
				rect.setAttribute(
					"style", "fill:" + this.options.background + ";"
				);
			}
		}
	}

	drawSvgBarcode(parent, options, encoding){
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
		var x = 0;
		for(var b = 0; b < binary.length; b++){
			x = b * options.width + encoding.barcodePadding;

			if(binary[b] === "1"){
				barWidth++;
			}
			else if(barWidth > 0){
				this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
				barWidth = 0;
			}
		}

		// Last draw is needed since the barcode ends with 1
		if(barWidth > 0){
			this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
		}
	}

	drawSVGText(parent, options, encoding){
		var textElem = this.document.createElementNS(svgns, 'text');

		// Draw the text if displayValue is set
		if(options.displayValue){
			var x, y;

			if (options.xmlDocument) {
				textElem.setAttribute("style",
					"font:" + options.fontOptions + " " + options.fontSize + "px " + options.font
				);
			}

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

			textElem.appendChild(this.document.createTextNode(encoding.text));

			parent.appendChild(textElem);
		}
	}


	setSvgAttributes(width, height){
		var svg = this.svg;
		svg.setAttribute("width", width + "px");
		svg.setAttribute("height", height + "px");
		svg.setAttribute("x", "0px");
		svg.setAttribute("y", "0px");
		svg.setAttribute("viewBox", "0 0 " + width + " " + height);

		svg.setAttribute("xmlns", svgns);
		svg.setAttribute("version", "1.1");

		if (this.options.xmlDocument) {
			svg.setAttribute("style", "transform: translate(0,0)");
		}
	}

	createGroup(x, y, parent){
		var group = this.document.createElementNS(svgns, 'g');
		group.setAttribute("transform", "translate(" + x + ", " + y + ")");

		parent.appendChild(group);

		return group;
	}

	setGroupOptions(group, options){
		if (options.xmlDocument) {
			group.setAttribute("style",
				"fill:" + options.lineColor + ";"
			);
		}
	}

	drawRect(x, y, width, height, parent){
		var rect = this.document.createElementNS(svgns, 'rect');

		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		rect.setAttribute("width", width);
		rect.setAttribute("height", height);

		parent.appendChild(rect);

		return rect;
	}
}

export default SVGRenderer;
