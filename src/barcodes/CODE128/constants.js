// const StartCodeA = 103;
// const StartCodeB = 104;
// const StartCodeC = 105;

export const A_START_CHAR = String.fromCharCode(208); // StartCodeA + 105
export const B_START_CHAR = String.fromCharCode(209); // StartCodeB + 105
export const C_START_CHAR = String.fromCharCode(210); // StartCodeC + 105

export const A_CHARS = "[\x00-\x5F\xC8-\xCF]"; // ASCII ranges 0-95 and 200-207 (FUNCs and SHIFTs)
export const B_CHARS = "[\x20-\x7F\xC8-\xCF]"; // ASCII ranges 32-127 and 200-207 (FUNCs and SHIFTs)
export const C_CHARS = "(\xCF*[0-9]{2}\xCF*)"; // Number pairs or [FNC1]
