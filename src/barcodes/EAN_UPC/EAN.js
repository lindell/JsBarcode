import { SIDE_BIN, MIDDLE_BIN } from './constants';
import Barcode from '../Barcode';

// Base class for EAN8 & EAN13
class EAN extends Barcode {
	constructor(data, options) {
		super(data, options);

		// Make sure the font is not bigger than the space between the guard bars
		this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

		// Make the guard bars go down half the way of the text
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
	}

	encode() {
		return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
	}

	encodeFlat() {
		const data = [SIDE_BIN, this.leftEncode(), MIDDLE_BIN, this.rightEncode(), SIDE_BIN];

		return {
			data: data.join(''),
			text: this.text
		};
	}
}

export default EAN;
