import { SET_A, SET_B, SET_C, BARS } from './constants';

export const getEncoding = (code) => BARS[code] || '';
export const normalizeText = (text, data) =>
	text === data ? text.replace(/[^\x20-\x7E]/g, '') : text;

export const needSwap = (index) => {
	switch (index) {
		case 99: return SET_C;
		case 100: return SET_B;
		case 101: return SET_A;
		default: return undefined;
	}
};
