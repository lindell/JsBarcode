import { A_START_CHAR, B_START_CHAR, C_START_CHAR, A_CHARS, B_CHARS, C_CHARS } from './constants';

// Match Set functions
const matchSetALength = (string: string): number => {
	const match = string.match(new RegExp(`^${A_CHARS}*`));
	return match ? match[0].length : 0;
};

const matchSetBLength = (string: string): number => {
	const match = string.match(new RegExp(`^${B_CHARS}*`));
	return match ? match[0].length : 0;
};

const matchSetC = (string: string): string => {
	const match = string.match(new RegExp(`^${C_CHARS}*`));
	return match ? match[0] : '';
};

// CODE128A or CODE128B
function autoSelectFromAB(string: string, isA: boolean): string {
	const ranges = isA ? A_CHARS : B_CHARS;
	const untilC = string.match(new RegExp(`^(${ranges}+?)(([0-9]{2}){2,})([^0-9]|$)`));

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	const match = string.match(new RegExp(`^${ranges}+`));
	const chars = match ? match[0] : '';

	if (chars.length === string.length) {
		return string;
	}

	return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
}

// CODE128C
function autoSelectFromC(string: string): string {
	const cMatch = matchSetC(string);
	const length = cMatch.length;

	if (length === string.length) {
		return string;
	}

	string = string.substring(length);

	// Select A/B depending on the longest match
	const isA = matchSetALength(string) >= matchSetBLength(string);
	return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
}

// Detect Code Set (A, B or C) and format the string
export default (string: string): string => {
	let newString;
	const cLength = matchSetC(string).length;

	// Select 128C if the string start with enough digits
	if (cLength >= 2) {
		newString = C_START_CHAR + autoSelectFromC(string);
	} else {
		// Select A/B depending on the longest match
		const isA = matchSetALength(string) > matchSetBLength(string);
		newString = (isA ? A_START_CHAR : B_START_CHAR) + autoSelectFromAB(string, isA);
	}

	return newString.replace(
		/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
		(match, char) => String.fromCharCode(203) + char
	);
};
