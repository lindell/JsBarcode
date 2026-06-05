import { InvalidElementException } from '../exceptions/exceptions';
import { Encoding } from '../options/options';

function renderer(object: HTMLElement | SVGElement | object, encodings: Encoding[]) {
        if (typeof object !== 'object' || !object) {
                throw new InvalidElementException();
        }
        (object as { encodings?: Encoding[] }).encodings = encodings;
}

export default renderer;
