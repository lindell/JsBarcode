import { Encoding } from '../options/options';

// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
// Convert to [1-1, 1-2, 2, 3-1, 3-2]
type NestedArray<T> = T | NestedArray<T>[];

function linearizeEncodings(encodings: NestedArray<Encoding>): Encoding[] {
	var linearEncodings: Encoding[] = [];
	function nextLevel(encoded: NestedArray<Encoding>) {
		if (Array.isArray(encoded)) {
			for (let i = 0; i < encoded.length; i++) {
				nextLevel(encoded[i]);
			}
		} else {
			encoded.text = encoded.text || '';
			encoded.data = encoded.data || '';
			linearEncodings.push(encoded);
		}
	}
	nextLevel(encodings);

	return linearEncodings;
}

export default linearizeEncodings;
