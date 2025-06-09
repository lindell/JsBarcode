// Help functions
import linearizeEncodings from './help/linearizeEncodings';
import fixOptions from './help/fixOptions';

// Exceptions
import { InvalidInputException, NoElementException } from './exceptions/exceptions';

// Options
import { Options } from './options/options';
import defaults from './options/defaults';

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers
function JsBarcode(element: any, text: string, options?: Partial<Options>) {
	if (typeof element === 'string') {
		element = document.querySelector(element);
	}

	if (typeof element === 'undefined') {
		throw new NoElementException();
	}

	const newOptions = { ...defaults, ...(options || {}) };
	const api = new API(element, [], newOptions);

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== 'undefined') {
		options = options || defaults;

		api.appendEncoded(encode(text, api.existingOptions));
		api.options(options).render();
	}

	return api;
}

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text, options) {
	// Ensure that text is a string
	text = '' + text;

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if (!options.encoder.valid(text, options)) {
		throw new InvalidInputException(text);
	}

	// Make a request for the binary data (and other infromation) that should be rendered
	const encoded = options.encoder.encode(text, options);

	return encoded;
}

class API {
	constructor(
		private readonly element: any,
		private readonly encodings: any[],
		readonly existingOptions: Options,
	) {}

	// Sets global encoder options
	// Added to the api by the JsBarcode function
	options(options) {
		this.options = { ...this.existingOptions, ...options };
		return this;
	}

	// Will create a blank space (usually in between barcodes)
	blank(size) {
		const zeroes = new Array(size + 1).join('0');
		this.encodings.push({ data: zeroes });
		return this;
	}

	// Will encode another barcode
	barcode(text, options) {
		this.encodings.push(encode(text, { ...this.options, ...(options || {}) }));
		return this;
	}

	appendEncoded(data: any) {
		this.encodings.push(data);
		return this;
	}

	// The render API call. Calls the real render function.
	render() {
		render(this.element, this.encodings, this.existingOptions);

		return this;
	}
}

// Prepares the encodings and calls the renderer
function render(element, encodings, options: Options) {
	encodings = linearizeEncodings(encodings);

	for (let i = 0; i < encodings.length; i++) {
		encodings[i].options = { ...options, ...encodings[i].options };
		fixOptions(encodings[i].options);
	}

	fixOptions(options);

	options.renderer(element, encodings, options);
}

export default JsBarcode;
