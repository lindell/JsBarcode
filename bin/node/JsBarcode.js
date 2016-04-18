'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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


var barcodesAPIs = {};

// The first call of the library API
// Will generate a
var JsBarcode = function JsBarcode(element, text, options) {
	var api = {};
	for (var key in barcodesAPIs) {
		api[key] = barcodesAPIs[key];
	}

	if (typeof element === "undefined") {
		return api;
	}

	options = options || {};

	// Parts of the API that is not the barcodes
	api.render = renderCall;
	api.options = optionsCall;
	api.blank = blankCall;

	// Variables that will be pased through the API calls
	api._renderProperties = getRenderProperies(element);
	api._encodings = [];
	api._options = defaults;

	// If text is set, use simple syntax
	if (typeof text !== "undefined") {
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
	registerBarcode(_barcodes2.default, name);
}
function registerBarcode(barcodes, name) {
	barcodesAPIs[name] = barcodesAPIs[name.toUpperCase()] = barcodesAPIs[name.toLowerCase()] = function (text, options) {
		var newOptions = (0, _merge2.default)(this._options, options);

		var Encoder = barcodes[name];
		var encoder = new Encoder(text, newOptions);

		if (!encoder.valid()) {
			if (this._options.valid === defaults.valid) {
				throw new Error('"' + text + '" is not a valid input for ' + name);
			} else {
				this._options.valid(false);
			}
		}

		var encoded = encoder.encode();
		encoded = (0, _linearizeEncodings2.default)(encoded);

		for (var i in encoded) {
			encoded[i].options = (0, _merge2.default)(newOptions, encoded[i].options);
		}

		this._encodings.push(encoded);

		return this;
	};
}

function autoSelectBarcode() {
	// If CODE128 exists. Use it
	if (barcodesAPIs["CODE128"]) {
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return (0, _keys2.default)(barcodesAPIs)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
function optionsCall(options) {
	this._options = (0, _merge2.default)(this._options, options);
	return this;
}

// Will create a blank space (usually in between barcodes)
function blankCall(size) {
	var zeroes = "0".repeat(size);
	this._encodings.push({ data: zeroes });
	return this;
}

// Prepares the encodings and calls the renderer
// Added to the api by the JsBarcode function
function renderCall() {
	var renderer = renderers[this._renderProperties.renderer];

	var encodings = (0, _linearizeEncodings2.default)(this._encodings);

	for (var i in encodings) {
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
}

if (typeof window !== "undefined") {
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
		} else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
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
	valid: function valid(_valid) {}
};