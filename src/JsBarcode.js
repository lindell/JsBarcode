// Import all the barcodes
import barcodes from './barcodes/';

// Import the renderers
import renderers from './renderers/';

// Help functions
import merge from './help/merge.js';
import linearizeEncodings from './help/linearizeEncodings.js';
import fixOptions from "./help/fixOptions.js";
import getOptionsFromElement from "./help/getOptionsFromElement.js";

// The protype of the object returned from the JsBarcode() call
let API = function(){};

// The first call of the library API
// Will return an object with all barcodes calls and the information needed
// when the rendering function is called and options the barcodes might need
let JsBarcode = function(element, text, options){
	var api = new API();

	if(typeof element === "undefined"){
		throw Error("No element to render on was provided.");
	}

	// Variables that will be pased through the API calls
	api._renderProperties = getRenderProperies(element);
	api._encodings = [];
	api._options = defaults;

	// If text is set, use simple syntax
	if(typeof text !== "undefined"){
		options = options || {};

		if(!options.format){
			options.format = autoSelectBarcode();
		}

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
	if(barcodes.hasOwnProperty(name)){ // Security check if the propery is a prototype property
		registerBarcode(barcodes, name);
	}
}
function registerBarcode(barcodes, name){
	API.prototype[name] =
	API.prototype[name.toUpperCase()] =
	API.prototype[name.toLowerCase()] =
	function(text, options){
		var newOptions = merge(this._options, options);
		var Encoder = barcodes[name];
		var encoded = encode(text, Encoder, newOptions);
		this._encodings.push(encoded);

		return this;
	};
}

function encode(text, Encoder, options){
	var encoder = new Encoder(text, options);

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if(!encoder.valid()){
		if(options.valid === defaults.valid){
			throw new Error('"' + text + '" is not a valid input for ' + name);
		}
		else{
			options.valid(false);
		}
	}

	var encoded = encoder.encode();

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]
	encoded = linearizeEncodings(encoded);

	// Merge
	for(let i = 0; i < encoded.length; i++){
		encoded[i].options = merge(options, encoded[i].options);
	}

	return encoded;
}

function autoSelectBarcode(){
	// If CODE128 exists. Use it
	if(barcodes["CODE128"]){
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return Object.keys(barcodes)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function(options){
	this._options = merge(this._options, options);
	return this;
}

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function(size){
	var zeroes = "0".repeat(size);
	this._encodings.push({data: zeroes});
	return this;
}

API.prototype.init = function(){
	// this._renderProperties can be
	if(!Array.isArray(this._renderProperties)){
		this._renderProperties = [this._renderProperties];
	}

	var renderProperty;
	for(let i in this._renderProperties){
		renderProperty = this._renderProperties[i];
		var options = merge(this._options, renderProperty.options);

		if(options.format == "auto"){
			options.format = autoSelectBarcode();
		}

		var text = options.value;

		var Encoder = barcodes[options.format.toUpperCase()];

		var encoded = encode(text, Encoder, options);

		render(renderProperty, encoded, options);
	}
}


// The render API call. Calls the real render function.
API.prototype.render = function(){
	if(Array.isArray(this._renderProperties)){
		for(let i in this._renderProperties){
			render(this._renderProperties[i], this._encodings, this._options);
		}
	}
	else{
		render(this._renderProperties, this._encodings, this._options);
	}

	this._options.valid(true);

	return this;
}

// Prepares the encodings and calls the renderer
function render(renderProperties, encodings, options){
	var renderer = renderers[renderProperties.renderer];

	encodings = linearizeEncodings(encodings);

	for(let i = 0; i < encodings.length; i++){
		encodings[i].options = merge(options, encodings[i].options);
		fixOptions(encodings[i].options);
	}

	fixOptions(options);

	renderer(renderProperties.element, encodings, options);

	if(renderProperties.afterRender){
		renderProperties.afterRender();
	}
}

// Export to browser
if(typeof window !== "undefined"){
	window.JsBarcode = JsBarcode;
}

// Export to jQuery
if (typeof jQuery !== 'undefined') {
	jQuery.fn.JsBarcode = function(content, options){
		var elementArray = [];
		jQuery(this).each(function() {
			elementArray.push(this);
		});
		return JsBarcode(elementArray, content, options);
	};
}

// Export to commonJS
module.exports = JsBarcode;

// Takes an element and returns an object with information about how
// it should be rendered
// This could also return an array with these objects
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
//   options (optional): Options that can be defined in the element
// }
function getRenderProperies(element){
	// If the element is a string, query select call again
	if(typeof element === "string"){
		var selector = document.querySelectorAll(element);
		if(selector.length === 0){
			throw new Error("No element found");
		}
		else{
			var returnArray = [];
			for(var i = 0; i < selector.length; i++){
				returnArray.push(getRenderProperies(selector[i]));
			}
			return returnArray;
		}
	}
	// If element is array. Recursivly call with every object in the array
	else if(Array.isArray(element)){
		var returnArray = [];
		for(var i = 0; i < element.length; i++){
			returnArray.push(getRenderProperies(element[i]));
		}
		return returnArray;
	}
	// If element, render on canvas and set the uri as src
	else if(typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement){
		var canvas = document.createElement('canvas');
		return {
			element: canvas,
			options: getOptionsFromElement(element, defaults),
			renderer: "canvas",
			afterRender: function(){
				element.setAttribute("src", canvas.toDataURL());
			}
		};
	}
	// If SVG
	else if(typeof SVGElement !== 'undefined' && element instanceof SVGElement){
		return {
			element: element,
			options: getOptionsFromElement(element, defaults),
			renderer: "svg"
		};
	}
	// If canvas (in browser)
	else if(typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement){
		return {
			element: element,
			options: getOptionsFromElement(element, defaults),
			renderer: "canvas"
		};
	}
	// If canvas (in node)
	else if(element.getContext){
		return {
			element: element,
			renderer: "canvas"
		};
	}
	else{
		throw new Error("Not supported type to render on.");
	}
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
