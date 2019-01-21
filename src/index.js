// Help functions
import linearizeEncodings from './help/linearizeEncodings.js';
import fixOptions from './help/fixOptions.js';

// Exceptions
import { InvalidInputException, NoElementException } from './exceptions/exceptions.js';

// Default values
import defaults from './options/defaults.js';

// The protype of the object returned from the JsBarcode() call
const API = function() {};

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers
const JsBarcode = function(element, text, options) {
	var api = new API();

	if (typeof element === 'string') {
		element = document.querySelector(element);
	}

	if (typeof element === 'undefined') {
		throw new NoElementException('No element to render on was provided.');
	}

	// Variables that will be pased through the API calls
	api._encodings = [];
	api._options = { ...defaults, ...(options || {}) };
	api._element = element;

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== 'undefined') {
		options = options || {};

		api._encodings.push(encode(text, api._options));
		api.options(options).render();
	}

	return api;
};

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text, options) {
	// Ensure that text is a string
	text = '' + text;

	const Encoder = options.encoder;
	const encoder = new Encoder(text, options);

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if (!encoder.valid()) {
		throw new InvalidInputException(encoder.constructor.name, text);
	}

	// Make a request for the binary data (and other infromation) that should be rendered
	const encoded = encoder.encode();

	return encoded;
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function(options) {
	this._options = { ...this._options, ...options };
	return this;
};

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function(size) {
	const zeroes = new Array(size + 1).join('0');
	this._encodings.push({ data: zeroes });
	return this;
};

// Will encode another barcode
API.prototype.barcode = function(text, options) {
	this._encodings.push(encode(text, { ...this._options, ...(options || {}) }));
	return this;
};

// The render API call. Calls the real render function.
API.prototype.render = function() {
	render(this._element, this._encodings, this._options);

	return this;
};

API.prototype._defaults = defaults;

// Prepares the encodings and calls the renderer
function render(element, encodings, options) {
	encodings = linearizeEncodings(encodings);

	for (let i = 0; i < encodings.length; i++) {
		encodings[i].options = { ...options, ...encodings[i].options };
		fixOptions(encodings[i].options);
	}

	fixOptions(options);

	options.renderer(element, encodings, options);
}

export default JsBarcode;
