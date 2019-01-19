import { InvalidElementException } from '../exceptions/exceptions';

class ObjectRenderer {
	constructor(object, encodings, options) {
		this.object = object;
		this.encodings = encodings;
		this.options = options;
	}

	render() {
		if (typeof this.object !== 'object' || !this.object) {
			throw new InvalidElementException('object is not an object');
		}
		this.object.encodings = this.encodings;
	}
}

export default ObjectRenderer;
