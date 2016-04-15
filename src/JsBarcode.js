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
import fixOptions from "./help/fixOptions.js";


let api = {};
let JsBarcode = function(element, text, options){
	var newApi = {};
	for(var key in api){
		newApi[key]=api[key];
	}

	if(typeof element === "undefined"){
		return newApi;
	}

	newApi.drawProperties = getDrawProperies(element);

	newApi.encodings = [];
	newApi.render = render;
	newApi._options = defaults;

	// If text is set, use simple syntax
	if(typeof text !== "undefined"){
		newApi.options(options);
		newApi[options.format](text, options);
		newApi.render();
	}

	return newApi;
}

// To make tests work
JsBarcode.getModule = function(name){
	return barcodes[name];
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
		var newOptions = merge(this._options, options);

		var Encoder = barcodes[name];
		var encoder = new Encoder(text, newOptions);

		var encoded = encoder.encode();
		encoded = linearizeEncodings(encoded);

		for(var i in encoded){
			encoded[i].options = merge(newOptions, encoded[i].options);
		}

		this.encodings.push(encoded);

		return this;
	};
}

function render(){
	var renderer = renderers[this.drawProperties.renderer];

	var encodings = linearizeEncodings(this.encodings);

	for(var i in encodings){
		encodings[i].options = merge(this._options, encodings[i].options);
		fixOptions(encodings[i].options);
	}

	fixOptions(this._options);

	renderer(this.drawProperties.element, encodings, this._options);

	if(this.drawProperties.afterRender){
		this.drawProperties.afterRender();
	}

	return this;
}

if(typeof window !== "undefined"){
	window.JsBarcode = JsBarcode;
}
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
			afterRender: function(){
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
	// If canvas, draw it
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
