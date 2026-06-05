// Help functions
import linearizeEncodings from './help/linearizeEncodings';
import fixOptions from './help/fixOptions';

// Exceptions
import { InvalidInputException, InvalidElementException, NoElementException } from './exceptions/exceptions';

// Options
import { Options, Encoding, Renderer, Encoder } from './options/options';
import defaults from './options/defaults';

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers
function JsBarcode(element: HTMLElement | SVGElement | object | string | null | undefined, text?: string, options?: Partial<Options>): API {
	let el: HTMLElement | SVGElement | object | null | undefined;
	if (typeof element === 'string') {
		if (typeof document !== 'undefined') {
			el = document.querySelector(element) as HTMLElement | SVGElement | null;
		} else {
			el = null;
		}
	} else {
		el = element;
	}

	if (!el) {
		throw new NoElementException();
	}

	const newOptions = { ...defaults, ...(options || {}) };
	const api = new API(el, [], newOptions);

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== 'undefined') {
		options = options || defaults;

		api.appendEncoded(encode(text, api.existingOptions));
		api.options(options).render();
	}

	return api;
}

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text: string, options: Options): Encoding | Encoding[] {
	// Ensure that text is a string
	text = '' + text;

	if (!options.encoder) {
		throw new Error('No encoder defined.');
	}

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
		public readonly element: HTMLElement | SVGElement | object,
		public readonly encodings: (Encoding | Encoding[])[],
		public readonly existingOptions: Options,
	) {}

	// Sets global encoder options
	// Added to the api by the JsBarcode function
	options(options: Partial<Options>): this {
		((this as unknown) as { existingOptions: Options }).existingOptions = { ...this.existingOptions, ...options };
		return this;
	}

	// Will create a blank space (usually in between barcodes)
	blank(size: number): this {
		const zeroes = new Array(size + 1).join('0');
		this.encodings.push({ data: zeroes });
		return this;
	}

	// Will encode another barcode
	barcode(text: string, options?: Partial<Options>): this {
		this.encodings.push(encode(text, { ...this.existingOptions, ...(options || {}) }));
		return this;
	}

	appendEncoded(data: Encoding | Encoding[]): this {
		this.encodings.push(data);
		return this;
	}

	// The render API call. Calls the real render function.
	render(): this {
		render(this.element, this.encodings, this.existingOptions);

		return this;
	}
}

// Prepares the encodings and calls the renderer
function render(element: HTMLElement | SVGElement | object, encodings: (Encoding | Encoding[])[], options: Options) {
	let linearized = linearizeEncodings(encodings);

	for (let i = 0; i < linearized.length; i++) {
		linearized[i].options = { ...options, ...linearized[i].options };
		fixOptions(linearized[i].options!);
	}

	fixOptions(options);

	if (!options.renderer) {
		throw new Error('No renderer defined.');
	}
	options.renderer(element, linearized, options);
}

export { API, Options, Encoding, Renderer, Encoder, defaults, JsBarcode, InvalidInputException, InvalidElementException, NoElementException };
export default JsBarcode;
