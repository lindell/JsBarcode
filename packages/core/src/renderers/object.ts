import { InvalidElementException } from '../exceptions/exceptions';
import { Encoding } from '../options/options';

function renderer(object: any, encodings: Encoding[]) {
        if (typeof object !== 'object' || !object) {
                throw new InvalidElementException();
        }
        object.encodings = encodings;
}

export default renderer;
