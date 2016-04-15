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

let barcodesAPIs = {};

// The first call of the library API
// Will generate a
let JsBarcode = function(element, text, options){
	var api = {};
	for(var key in barcodesAPIs){
		api[key]=barcodesAPIs[key];
	}

	if(typeof element === "undefined"){
		return api;
	}

	// Parts of the API that is not the barcodes
	api.render = renderCall;
	api.options = optionsCall;

	// Variables that will be pased through the API calls
	api._drawProperties = getDrawProperies(element);
	api._encodings = [];
	api._options = defaults;

	// If text is set, use simple syntax
	if(typeof text !== "undefined"){
		api.options(options);
		api[options.format](text, options);
		api.render();
	}

	return api;
}

// To make tests work TODO: remove
JsBarcode.getModule = function(name){
	return barcodes[name];
}

// Register all barcodes
for(var name in barcodes){
	registerBarcode(barcodes, name);
}
function registerBarcode(barcodes, name){
	barcodesAPIs[name] =
	barcodesAPIs[name.toUpperCase()] =
	barcodesAPIs[name.toLowerCase()] =
	function(text, options){
		var newOptions = merge(this._options, options);

		var Encoder = barcodes[name];
		var encoder = new Encoder(text, newOptions);

		if(!encoder.valid()){
			throw new Error('"'+ text +'" is not a valid input for ' + name);
		}

		var encoded = encoder.encode();
		encoded = linearizeEncodings(encoded);

		for(var i in encoded){
			encoded[i].options = merge(newOptions, encoded[i].options);
		}

		this._encodings.push(encoded);

		return this;
	};
}

// Sets global encoder options
// Added to the api by the JsBarcode function
function optionsCall(options){
	this._options = merge(this._options, options);
	return this;
}

// Prepares the encodings and calls the renderer
// Added to the api by the JsBarcode function
function renderCall(){
	var renderer = renderers[this._drawProperties.renderer];

	var encodings = linearizeEncodings(this._encodings);

	for(var i in encodings){
		encodings[i].options = merge(this._options, encodings[i].options);
		fixOptions(encodings[i].options);
	}

	fixOptions(this._options);

	renderer(this._drawProperties.element, encodings, this._options);

	if(this._drawProperties.afterRender){
		this._drawProperties.afterRender();
	}

	return this;
}

if(typeof window !== "undefined"){
	window.JsBarcode = JsBarcode;
}
module.exports = JsBarcode;

// Takes an element and returns an object with information about how
//it should be rendered
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
// }
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
