declare var jQuery: any;

import coreJsBarcode, { API, defaults, InvalidElementException, NoElementException, Options } from '@jsbarcode/core';
import { CODE128, CODE128A, CODE128B, CODE128C } from '@jsbarcode/code128';
import CODE39 from '@jsbarcode/code39';
import codabar from '@jsbarcode/codabar';
import { EAN13, EAN8, EAN5, EAN2, UPC, UPCE } from '@jsbarcode/ean-upc';
import { ITF, ITF14 } from '@jsbarcode/itf';
import { MSI, MSI10, MSI11, MSI1010, MSI1110 } from '@jsbarcode/msi';
import pharmacode from '@jsbarcode/pharmacode';
import canvasRenderer from '@jsbarcode/renderer-canvas';
import svgRenderer from '@jsbarcode/renderer-svg';

const encoders: Record<string, () => any> = {
	code128: CODE128,
	code128a: CODE128A,
	code128b: CODE128B,
	code128c: CODE128C,
	code39: CODE39,
	codabar: codabar,
	ean13: EAN13,
	ean8: EAN8,
	ean5: EAN5,
	ean2: EAN2,
	upc: UPC,
	upce: UPCE,
	itf: ITF,
	itf14: ITF14,
	msi: MSI,
	msi10: MSI10,
	msi11: MSI11,
	msi1010: MSI1010,
	msi1110: MSI1110,
	pharmacode: pharmacode,
};

// Add chainable barcode methods to API prototype dynamically
const methods: Record<string, () => any> = {
	CODE128,
	CODE128A,
	CODE128B,
	CODE128C,
	CODE39,
	codabar,
	EAN13,
	EAN8,
	EAN5,
	EAN2,
	UPC,
	UPCE,
	ITF,
	ITF14,
	MSI,
	MSI10,
	MSI11,
	MSI1010,
	MSI1110,
	pharmacode,
};

for (const name in methods) {
	if (methods.hasOwnProperty(name)) {
		const encoder = methods[name];
		const lowerName = name.toLowerCase();
		const upperName = name.toUpperCase();

		const barcodeMethod = function(this: API, text: string, options?: Partial<Options>) {
			return this.barcode(text, { encoder: encoder(), ...options });
		};

		(API.prototype as any)[name] = barcodeMethod;
		if (name !== lowerName) {
			(API.prototype as any)[lowerName] = barcodeMethod;
		}
		if (name !== upperName) {
			(API.prototype as any)[upperName] = barcodeMethod;
		}
	}
}

class WrapperAPI {
	constructor(private readonly targets: { element: any, renderer: any, afterRender?: () => void, api: API }[]) {}

	options(options: Partial<Options>): this {
		this.targets.forEach(t => t.api.options(options));
		return this;
	}

	blank(size: number): this {
		this.targets.forEach(t => t.api.blank(size));
		return this;
	}

	barcode(text: string, options: Partial<Options> = {}): this {
		this.targets.forEach(t => {
			const opts = { ...options };
			if (!opts.encoder && opts.format) {
				const format = opts.format.toLowerCase();
				const encoderCreator = encoders[format];
				if (encoderCreator) {
					opts.encoder = encoderCreator();
				}
			}
			t.api.barcode(text, opts);
		});
		return this;
	}

	render(): this {
		this.targets.forEach(t => {
			t.api.render();
			if (t.afterRender) {
				t.afterRender();
			}
		});
		return this;
	}

	init(): void {
		this.targets.forEach(t => {
			const options = getOptionsFromElement(t.element);
			const text = options.value;
			if (!text) return;

			const opts = { ...t.api.existingOptions, ...options };
			JsBarcode(t.element, text, opts);
		});
	}
}

// Dynamically expose barcode methods on WrapperAPI too
for (const name in methods) {
	if (methods.hasOwnProperty(name)) {
		const lowerName = name.toLowerCase();
		const upperName = name.toUpperCase();

		const wrapperMethod = function(this: WrapperAPI, text: string, options?: Partial<Options>) {
			this.barcode(text, { format: name, ...options });
			return this;
		};

		(WrapperAPI.prototype as any)[name] = wrapperMethod;
		if (name !== lowerName) {
			(WrapperAPI.prototype as any)[lowerName] = wrapperMethod;
		}
		if (name !== upperName) {
			(WrapperAPI.prototype as any)[upperName] = wrapperMethod;
		}
	}
}

function getOptionsFromElement(element: any): any {
	const options: any = {};
	if (!element || !element.hasAttribute) return options;

	for (const property in defaults) {
		if (defaults.hasOwnProperty(property)) {
			// jsbarcode-*
			if (element.hasAttribute('jsbarcode-' + property.toLowerCase())) {
				options[property] = element.getAttribute('jsbarcode-' + property.toLowerCase());
			}
			// data-*
			if (element.hasAttribute('data-' + property.toLowerCase())) {
				options[property] = element.getAttribute('data-' + property.toLowerCase());
			}
		}
	}

	options.value = element.getAttribute('jsbarcode-value') || element.getAttribute('data-value');

	return optionsFromStrings(options);
}

function optionsFromStrings(options: any): any {
	const intOptions = [
		'width',
		'height',
		'textMargin',
		'fontSize',
		'margin',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight'
	];

	for (const intOption of intOptions) {
		if (typeof options[intOption] === 'string') {
			options[intOption] = parseInt(options[intOption], 10);
		}
	}

	if (typeof options['displayValue'] === 'string') {
		options['displayValue'] = options['displayValue'] !== 'false';
	}

	return options;
}

function getTargets(element: any): { element: any, renderer: any, afterRender?: () => void }[] {
	if (typeof element === 'string') {
		if (typeof document === 'undefined') {
			throw new NoElementException();
		}
		const selector = document.querySelectorAll(element);
		if (selector.length === 0) {
			throw new NoElementException();
		}
		const targets: any[] = [];
		for (let i = 0; i < selector.length; i++) {
			targets.push(...getTargets(selector[i]));
		}
		return targets;
	} else if (Array.isArray(element)) {
		const targets: any[] = [];
		for (let i = 0; i < element.length; i++) {
			targets.push(...getTargets(element[i]));
		}
		return targets;
	} else if (typeof jQuery !== 'undefined' && element instanceof jQuery) {
		const targets: any[] = [];
		element.each(function(this: any) {
			targets.push(...getTargets(this));
		});
		return targets;
	} else if (element) {
		const tagName = element.tagName ? element.tagName.toLowerCase() : '';
		if (tagName === 'img') {
			if (typeof document === 'undefined') {
				throw new Error('Image rendering is only supported in browser environments');
			}
			const canvas = document.createElement('canvas');
			return [{
				element: canvas,
				renderer: canvasRenderer,
				afterRender: () => {
					element.setAttribute('src', canvas.toDataURL());
				}
			}];
		} else if (tagName === 'svg') {
			return [{
				element,
				renderer: svgRenderer
			}];
		} else if (tagName === 'canvas') {
			return [{
				element,
				renderer: canvasRenderer
			}];
		} else if (element.getContext) {
			return [{
				element,
				renderer: canvasRenderer
			}];
		} else if (typeof element === 'object') {
			return [{
				element,
				renderer: canvasRenderer
			}];
		}
	}
	throw new InvalidElementException();
}

function JsBarcode(element: any, text?: string, options?: Partial<Options>): WrapperAPI {
	if (typeof element === 'undefined') {
		throw new NoElementException();
	}
	const targets = getTargets(element);

	const wrapper = new WrapperAPI(targets.map(t => {
		const opts = { ...options };
		const isModular = !!opts.encoder || !!opts.renderer;

		if (!isModular) {
			if (!opts.encoder) {
				const format = (opts.format || 'auto').toLowerCase();
				const encoderCreator = encoders[format];
				if (encoderCreator) {
					opts.encoder = encoderCreator();
				}
			}
			if (!opts.renderer) {
				opts.renderer = t.renderer;
			}
		}

		const api = coreJsBarcode(t.element, undefined, opts);
		return {
			element: t.element,
			renderer: t.renderer,
			afterRender: t.afterRender,
			api
		};
	}));

	if (typeof text !== 'undefined') {
		const opts = { ...options };
		const isModular = !!opts.encoder || !!opts.renderer;

		if (!isModular) {
			if (!opts.encoder) {
				const format = (opts.format || 'auto').toLowerCase();
				const encoderCreator = encoders[format];
				if (encoderCreator) {
					opts.encoder = encoderCreator();
				}
			}
		}
		wrapper.barcode(text, opts).render();
	}

	return wrapper;
}

if (typeof window !== 'undefined') {
	(window as any).JsBarcode = JsBarcode;
}

/*global jQuery */
if (typeof jQuery !== 'undefined') {
	(jQuery as any).fn.JsBarcode = function(this: any, content: any, options?: Partial<Options>) {
		const elements: any[] = [];
		this.each(function(this: any) {
			elements.push(this);
		});
		return JsBarcode(elements, content, options);
	};
}

export default JsBarcode;
export { JsBarcode };
export { WrapperAPI as api };
