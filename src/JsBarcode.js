// Import all the barcodes
import barcodes from './barcodes.js';

// Import the renderers
import drawCanvas from './renderers/canvas.js';
import drawSVG from './renderers/svg.js';
let renderers = {
	"canvas": drawCanvas,
	"svg": drawSVG
};

// Help functions
import merge from './help/merge.js';
import linearizeEncodings from './help/linearizeEncodings.js'

let api = {};
let JsBarcode = function(element){
	var newApi = {};
	for(var key in api){
		newApi[key]=api[key];
	}

	newApi.drawProperties = getDrawProperies(element);

	newApi.encodings = [];
	newApi.draw = draw;
	newApi._options = defaults;

	return newApi;
}

api.options = function(options){
	this._options = merge(this._options, options);

	return this;
}

// Register all barcodes
for(var name in barcodes){
	registerBarcode(barcodes, name);
}

function registerBarcode(barcodes, name){
	api[name] = function(text, options){

		var Encoder = barcodes[name];
		var encoder = new Encoder(text, this._options);

		this.encodings.push(encoder.encode());

		return this;
	};
}

function draw(){
	var renderer = renderers[this.drawProperties.renderer];

	var encodings = linearizeEncodings(this.encodings);
	fixOptions(this._options);

	renderer(this.drawProperties.element, encodings, this._options);

	return this;
}

window.JsBarcode = JsBarcode;
module.exports = JsBarcode;

function getDrawProperies(element){
	// If the element is a string, query select call again
	if(typeof element === "string"){
		element = document.querySelector(element);
		return getDrawProperies(element);
	}
	// If element, draw on canvas and set the uri as src
	else if(typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement){
		var canvas = document.createElement('canvas');
		return {
			element: canvas,
			renderer: "canvas",
			afterDraw: function(){
				element.setAttribute("src", canvas.toDataURL());
			}
		};
	}
	else if(typeof SVGElement !== 'undefined' && element instanceof SVGElement){
		return {
			element: element,
			renderer: "svg"
		};
	}
	// If canvas, just draw
	else if(element.getContext){
		return {
			element: element,
			renderer: "canvas"
		};
	}
	else{
		throw new Error("Not supported type to draw on.");
	}
};

function fixOptions(options){
	// Fix the margins
	options.marginTop = typeof options.marginTop === "undefined" ?
		options.margin : options.marginTop;
	options.marginBottom = typeof options.marginBottom === "undefined" ?
		options.margin : options.marginBottom;
	options.marginRight = typeof options.marginRight === "undefined" ?
		options.margin : options.marginRight;
	options.marginLeft = typeof options.marginLeft === "undefined" ?
		options.margin : options.marginLeft;

	return options;
}

var defaults = {
	width: 2,
	height: 100,
	format: "auto",
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: undefined,
	marginBottom: undefined,
	marginLeft: undefined,
	marginRight: undefined,
	valid: function(valid){}
};
