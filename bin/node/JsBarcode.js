'use strict';

var _barcodes = require('./barcodes/');

var _barcodes2 = _interopRequireDefault(_barcodes);

var _canvas = require('./renderers/canvas.js');

var _canvas2 = _interopRequireDefault(_canvas);

var _svg = require('./renderers/svg.js');

var _svg2 = _interopRequireDefault(_svg);

var _merge = require('./help/merge.js');

var _merge2 = _interopRequireDefault(_merge);

var _linearizeEncodings = require('./help/linearizeEncodings.js');

var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

var _fixOptions = require('./help/fixOptions.js');

var _fixOptions2 = _interopRequireDefault(_fixOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import the renderers

var renderers = {
	"canvas": _canvas2.default,
	"svg": _svg2.default
};

// Help functions
// Import all the barcodes


// The protype of the object returned from the JsBarcode() call
var API = function API() {};

// The first call of the library API
// Will return an object with all barcodes calls and the information needed
// when the rendering function is called and options the barcodes might need
var JsBarcode = function JsBarcode(element, text, options) {
	var api = new API();

	if (typeof element === "undefined") {
		throw Error("No element to render on was provided.");
	}

	// Variables that will be pased through the API calls
	api._renderProperties = getRenderProperies(element);
	api._encodings = [];
	api._options = defaults;

	// If text is set, use simple syntax
	if (typeof text !== "undefined") {
		options = options || {};

		if (!options.format) {
			options.format = autoSelectBarcode();
		}

		api.options(options);
		api[options.format](text, options);
		api.render();
	}

	return api;
};

// To make tests work TODO: remove
JsBarcode.getModule = function (name) {
	return _barcodes2.default[name];
};

// Register all barcodes
for (var name in _barcodes2.default) {
	if (_barcodes2.default.hasOwnProperty(name)) {
		// Security check if the propery is a prototype property
		registerBarcode(_barcodes2.default, name);
	}
}
function registerBarcode(barcodes, name) {
	API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
		var newOptions = (0, _merge2.default)(this._options, options);

		var Encoder = barcodes[name];
		var encoder = new Encoder(text, newOptions);

		// If the input is not valid for the encoder, throw error.
		// If the valid callback option is set, call it instead of throwing error
		if (!encoder.valid()) {
			if (this._options.valid === defaults.valid) {
				throw new Error('"' + text + '" is not a valid input for ' + name);
			} else {
				this._options.valid(false);
			}
		}

		var encoded = encoder.encode();

		// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
		// Convert to [1-1, 1-2, 2, 3-1, 3-2]
		encoded = (0, _linearizeEncodings2.default)(encoded);

		for (var i = 0; i < encoded.length; i++) {
			encoded[i].options = (0, _merge2.default)(newOptions, encoded[i].options);
		}

		this._encodings.push(encoded);

		return this;
	};
}

function autoSelectBarcode() {
	// If CODE128 exists. Use it
	if (_barcodes2.default["CODE128"]) {
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return Object.keys(_barcodes2.default)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function (options) {
	this._options = (0, _merge2.default)(this._options, options);
	return this;
};

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function (size) {
	var zeroes = "0".repeat(size);
	this._encodings.push({ data: zeroes });
	return this;
};

// Prepares the encodings and calls the renderer
// Added to the api by the JsBarcode function
API.prototype.render = function () {
	var renderer = renderers[this._renderProperties.renderer];

	var encodings = (0, _linearizeEncodings2.default)(this._encodings);

	for (var i = 0; i < encodings.length; i++) {
		encodings[i].options = (0, _merge2.default)(this._options, encodings[i].options);
		(0, _fixOptions2.default)(encodings[i].options);
	}

	(0, _fixOptions2.default)(this._options);

	renderer(this._renderProperties.element, encodings, this._options);

	if (this._renderProperties.afterRender) {
		this._renderProperties.afterRender();
	}

	this._options.valid(true);

	return this;
};

if (typeof window !== "undefined") {
	window.JsBarcode = JsBarcode;
}
module.exports = JsBarcode;

// Takes an element and returns an object with information about how
// it should be rendered
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
// }
function getRenderProperies(element) {
	// If the element is a string, query select call again
	if (typeof element === "string") {
		element = document.querySelector(element);
		return getRenderProperies(element);
	}
	// If element, render on canvas and set the uri as src
	else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
			var canvas = document.createElement('canvas');
			return {
				element: canvas,
				renderer: "canvas",
				afterRender: function afterRender() {
					element.setAttribute("src", canvas.toDataURL());
				}
			};
		}
		// If SVG
		else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
				return {
					element: element,
					renderer: "svg"
				};
			}
			// If canvas
			else if (element.getContext) {
					return {
						element: element,
						renderer: "canvas"
					};
				} else {
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
	valid: function valid(_valid) {}
};