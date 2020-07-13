import { InvalidElementException } from '../exceptions/exceptions';

function renderer(object, encodings) {
	if (typeof object !== 'object' || !object) {
		throw new InvalidElementException('object is not an object');
	}
	object.encodings = encodings;
}


export default renderer;
