// const StartCodeA = 103;
// const StartCodeB = 104;
// const StartCodeC = 105;

export const A_START_CHAR = String.fromCharCode(208); // StartCodeA + 105
export const B_START_CHAR = String.fromCharCode(209); // StartCodeB + 105
export const C_START_CHAR = String.fromCharCode(210); // StartCodeC + 105

// 128A (Code Set A)
// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
export const A_CHARS = "[\x00-\x5F\xC8-\xCF]";

// 128B (Code Set B)
// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
export const B_CHARS = "[\x20-\x7F\xC8-\xCF]";

// 128C (Code Set C)
// 00–99 (encodes two digits with a single code point) and FNC1
export const C_CHARS = "(\xCF*[0-9]{2}\xCF*)";
