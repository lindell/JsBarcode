import coreJsBarcode, { API, defaults, Encoder, InvalidElementException, NoElementException, Options, Renderer } from '@jsbarcode/core';
import { CODE128, CODE128A, CODE128B, CODE128C } from '@jsbarcode/code128';
import CODE39 from '@jsbarcode/code39';
import codabar from '@jsbarcode/codabar';
import { EAN13, EAN8, EAN5, EAN2, UPC, UPCE } from '@jsbarcode/ean-upc';
import { ITF, ITF14 } from '@jsbarcode/itf';
import { MSI, MSI10, MSI11, MSI1010, MSI1110 } from '@jsbarcode/msi';
import pharmacode from '@jsbarcode/pharmacode';
import genericBarcode from '@jsbarcode/generic-barcode';
import canvasRenderer from '@jsbarcode/renderer-canvas';
import svgRenderer from '@jsbarcode/renderer-svg';

const encoders: Record<string, () => Encoder> = {
	auto: CODE128,
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
	genericbarcode: genericBarcode,
};

// Add chainable barcode methods to API prototype dynamically
const methods: Record<string, () => Encoder> = {
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
	GenericBarcode: genericBarcode,
};

for (const name in methods) {
	if (methods.hasOwnProperty(name)) {
		const encoder = methods[name];
		const lowerName = name.toLowerCase();
		const upperName = name.toUpperCase();

		const barcodeMethod = function(this: API, text: string, options?: Partial<Options>) {
			return this.barcode(text, { encoder: encoder(), ...options });
		};

		((API.prototype as unknown) as Record<string, unknown>)[name] = barcodeMethod;
		if (name !== lowerName) {
			((API.prototype as unknown) as Record<string, unknown>)[lowerName] = barcodeMethod;
		}
		if (name !== upperName) {
			((API.prototype as unknown) as Record<string, unknown>)[upperName] = barcodeMethod;
		}
	}
}

class WrapperAPI {
	constructor(private readonly targets: { element: HTMLElement | SVGElement | object, renderer: Renderer, afterRender?: () => void, api: API }[]) {}

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
			const text = options.value as string | undefined;
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

		((WrapperAPI.prototype as unknown) as Record<string, unknown>)[name] = wrapperMethod;
		if (name !== lowerName) {
			((WrapperAPI.prototype as unknown) as Record<string, unknown>)[lowerName] = wrapperMethod;
		}
		if (name !== upperName) {
			((WrapperAPI.prototype as unknown) as Record<string, unknown>)[upperName] = wrapperMethod;
		}
	}
}

function getOptionsFromElement(element: HTMLElement | SVGElement | object): Record<string, unknown> {
	const options: Record<string, unknown> = {};
	if (!element || !('hasAttribute' in element)) return options;

	const el = element as unknown as HTMLElement;
	for (const property in defaults) {
		if (defaults.hasOwnProperty(property)) {
			// jsbarcode-*
			if (el.hasAttribute('jsbarcode-' + property.toLowerCase())) {
				options[property] = el.getAttribute('jsbarcode-' + property.toLowerCase());
			}
			// data-*
			if (el.hasAttribute('data-' + property.toLowerCase())) {
				options[property] = el.getAttribute('data-' + property.toLowerCase());
			}
		}
	}

	options.value = el.getAttribute('jsbarcode-value') || el.getAttribute('data-value');

	return optionsFromStrings(options);
}

function optionsFromStrings(options: Record<string, unknown>): Record<string, unknown> {
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
			options[intOption] = parseInt(options[intOption] as string, 10);
		}
	}

	if (typeof options['displayValue'] === 'string') {
		options['displayValue'] = options['displayValue'] !== 'false';
	}

	return options;
}

function getTargets(element: unknown): { element: HTMLElement | SVGElement | object, renderer: Renderer, afterRender?: () => void }[] {
	if (typeof element === 'string') {
		if (typeof document === 'undefined') {
			throw new NoElementException();
		}
		const selector = document.querySelectorAll(element);
		if (selector.length === 0) {
			throw new NoElementException();
		}
		const targets: { element: HTMLElement | SVGElement | object, renderer: Renderer, afterRender?: () => void }[] = [];
		for (let i = 0; i < selector.length; i++) {
			targets.push(...getTargets(selector[i]));
		}
		return targets;
	} else if (Array.isArray(element)) {
		const targets: { element: HTMLElement | SVGElement | object, renderer: Renderer, afterRender?: () => void }[] = [];
		for (let i = 0; i < element.length; i++) {
			targets.push(...getTargets(element[i]));
		}
		return targets;
	} else if (element && typeof element === 'object') {
		const el = element as Record<string, unknown>;
		const tagName = typeof el.tagName === 'string' ? el.tagName.toLowerCase() : '';
		if (tagName === 'img') {
			if (typeof document === 'undefined') {
				throw new Error('Image rendering is only supported in browser environments');
			}
			const canvas = document.createElement('canvas');
			return [{
				element: canvas,
				renderer: canvasRenderer,
				afterRender: () => {
					(el as unknown as HTMLImageElement).setAttribute('src', canvas.toDataURL());
				}
			}];
		} else if (tagName === 'svg') {
			return [{
				element: el as unknown as SVGElement,
				renderer: svgRenderer
			}];
		} else if (tagName === 'canvas') {
			return [{
				element: el as unknown as HTMLCanvasElement,
				renderer: canvasRenderer
			}];
		} else if (typeof el.getContext === 'function') {
			return [{
				element: el,
				renderer: canvasRenderer
			}];
		} else {
			return [{
				element: el,
				renderer: canvasRenderer
			}];
		}
	}
	throw new InvalidElementException();
}

function JsBarcode(element: unknown, text?: string, options?: Partial<Options>): WrapperAPI {
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
	((window as unknown) as Record<string, unknown>).JsBarcode = JsBarcode;
}

export default JsBarcode;
export { JsBarcode };
export { WrapperAPI as api };
