export interface Encoder {
	valid: (text: string, options?: Options) => boolean;
	encode: (text: string, options?: Options) => Encoding | Encoding[];
}

export type Renderer = (element: HTMLElement | SVGElement | object, encodings: Encoding[], options: Options) => void;

export interface Encoding {
	data: string;
	text?: string;
	options?: Partial<Options>;
	width?: number;
	height?: number;
	barcodePadding?: number;
}

export interface Options {
	width: number;
	height: number;
	format: string;
	displayValue: boolean;
	fontOptions: string;
	font: string;
	text?: string;
	textAlign: string;
	textPosition: string;
	textMargin: number;
	fontSize: number;
	background: string;
	lineColor: string;
	margin: number;
	marginTop?: number;
	marginBottom?: number;
	marginLeft?: number;
	marginRight?: number;

	encoder?: Encoder;
	renderer?: Renderer;

	mod43?: boolean;
	flat?: boolean;
	ean128?: boolean;
	guardHeight?: number;
	lastChar?: string;

	[key: string]: unknown;
}
