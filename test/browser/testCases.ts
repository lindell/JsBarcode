export interface TestCase {
	text: string;
	options?: Record<string, any>;
}

export const testCases: TestCase[] = [
	{ text: "This has a \nnewline", options: { width: 1 } },
	{ text: "\tHi\nHI", options: { width: 1 } },
	{ text: "Hello", options: { width: 1, text: "Hi!" } },
	{ text: "A little test!", options: { format: "CODE128", width: 1 } },
	{ text: "ABCDEFG", options: { format: "CODE39", width: 1, mod43: true } },
	{ text: "A little test", options: { format: "CODE39", width: 1 } },
	{ text: "12345", options: { format: "EAN5", width: 1 } },
	{ text: "52", options: { format: "EAN2", width: 1 } },
	{ text: "423514346455", options: { format: "UPC", width: 2, textMargin: 0 } },
	{ text: "423514346455", options: { format: "UPC", width: 2, textMargin: 0, flat: true } },
	{ text: "01245714", options: { format: "UPCE", width: 2, textMargin: 0 } },
	{ text: "5901234123457", options: { format: "EAN13", fontSize: 40, textMargin: 0, lastChar: ">" } },
	{ text: "5901234123457", options: { format: "EAN13", width: 2, fontSize: 16 } },
	{ text: "5901234123457", options: { format: "EAN13", width: 3 } },
	{ text: "5901234123457", options: { format: "EAN13", flat: true } },
	{ text: "96385074", options: { format: "EAN8", width: 1 } },
	{ text: "96385074", options: { format: "EAN8", width: 1 } },
	{ text: "98765432109213", options: { format: "ITF14", width: 1 } },
	{ text: "12345", options: { format: "pharmacode", width: 1 } },
	{ text: "133742", options: { format: "CODE128C", width: 1 } },
	{ text: "12345674", options: { format: "MSI", width: 1 } },
	{ text: "1234567890", options: { format: "codabar", width: 1 } },
	{ text: "A1234567890A", options: { format: "codabar", width: 1 } },
	{ text: "C1234567890D", options: { format: "codabar", width: 1 } },
	{ text: "12345674", options: { format: "GenericBarcode", width: 1 } },
	{
		text: "Such customize!",
		options: {
			width: 1,
			height: 50,
			format: "CODE128",
			displayValue: true,
			fontOptions: "bold",
			font: "cursive",
			textAlign: "right",
			textMargin: 20,
			fontSize: 28,
			background: "#f00",
			lineColor: "#0ff",
			margin: 10,
			marginTop: 60,
			marginBottom: 5,
			marginLeft: 60,
			marginRight: 30
		}
	}
];
