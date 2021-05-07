import { InvalidElementException } from '../exceptions/exceptions';

function renderer(object, encodings) {
	if (typeof object !== 'object' || !object) {
		throw new InvalidElementException();
	}
	object.encodings = encodings;
}

export default renderer;
