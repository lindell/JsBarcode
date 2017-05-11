import { A_START_CHAR, B_START_CHAR, C_START_CHAR, A_CHARS, B_CHARS, C_CHARS } from './constants';

const getALength = (string) => string.match(new RegExp(`^${A_CHARS}*`))[0].length;
const getBLength = (string) => string.match(new RegExp(`^${B_CHARS}*`))[0].length;
const matchC = (string) => string.match(new RegExp(`^${C_CHARS}*`))[0];

function fromAB(string, isA){
	const ranges = isA ? A_CHARS : B_CHARS;
	const untilC = string.match(new RegExp(`^(${ranges}+?)(([0-9]{2}){2,})([^0-9]|$)`));

	if (untilC) return (
		untilC[1] +
		String.fromCharCode(204) +
		fromC(string.substring(untilC[1].length))
	);

	const chars = string.match(new RegExp(`^${ranges}+`))[0];
	if (chars.length === string.length) return string;

	return (
		chars +
		String.fromCharCode(isA ? 205 : 206) +
		fromAB(string.substring(chars.length), !isA)
	);
}

function fromC(string) {
	const cMatch = matchC(string);
	const length = cMatch.length;

	if (length === string.length) return string;
	string = string.substring(length);

	const isA = getALength(string) >= getBLength(string);
	return cMatch + String.fromCharCode(isA ? 206 : 205) + fromAB(string, isA);
}

export default (string) => {
	let newString;
	const cLength = matchC(string).length;

	if (cLength >= 2) {
		newString = C_START_CHAR + fromC(string);
	} else {
		const isA = getALength(string) > getBLength(string);
		newString = (isA ? A_START_CHAR : B_START_CHAR) + fromAB(string, isA);
	}

	return newString.replace(
		/[\xCD\xCE]([^])[\xCD\xCE]/,
		(match, char) => String.fromCharCode(203) + char
	);
};
