var defaults = {
	width: {
		type: "number",
		default: 2,
	},
	height: {
		type: "number",
		default: 100,
	},
	format: {
		type: "string",
		default: "auto",
	},
	displayValue: {
		type: "boolean",
		default: true,
	},
	fontOptions: {
		type: "string",
		default: "",
	},
	font: {
		type: "string",
		default: "monospace",
	},
	text: {
		type: "string",
		default: undefined,
	},
	textAlign: {
		type: "string",
		default: "center",
	},
	textPosition: {
		type: "string",
		default: "bottom",
	},
	textMargin: {
		type: "number",
		default: 2,
	},
	fontSize: {
		type: "number",
		default: 20,
	},
	background: {
		type: "string",
		default: "#ffffff",
	},
	lineColor: {
		type: "string",
		default: "#000000",
	},
	margin: {
		type: "number",
		default: 10,
	},
	marginTop: {
		type: "number",
		default: undefined,
	},
	marginBottom: {
		type: "number",
		default: undefined,
	},
	marginLeft: {
		type: "number",
		default: undefined,
	},
	marginRight: {
		type: "number",
		default: undefined,
	},
	valid: {
		type: "function",
		default: function(){},
	},
};

export default defaults;
