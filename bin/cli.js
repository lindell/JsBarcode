#!/usr/bin/env node
"use strict";

/*eslint
no-console: 0
*/

var program = require("commander");
var JsBarcode = require('./JsBarcode.js');
var Canvas = require("canvas");
var fs = require('fs');

function parseIntTen(x) {
	return parseInt(x, 10);
}

var content;

program.usage('<content> [options]').option('-o, --output <filename>', "Default: barcode.png").option('-s, --stdout', "Output the png data to stdout").option('-f, --format <format>', 'Barcode format').option('-W, --width <width>', 'Width of a line in the barcode', parseIntTen).option('-H, --height <height>', 'Height of the barcode', parseIntTen).option('-q, --quite <quite>', 'Empty space left and right of the barcode', parseIntTen).option('-d, --displayValue', 'Display the value as text under the barcode').option('-F, --font <font>', 'Set the font of the text').option('-a, --textAlign <align>', 'Set where the text will be displayed').option('-p, --textPadding <padding>', 'The padding between the barcode and the text', parseIntTen).option('-S, --fontSize <fontsize>', 'Set the font size', parseIntTen).option('-b, --background <color>', 'Set the background color').option('-l, --lineColor <color>', 'Set the line color').action(function (c) {
	content = c;
});

program.parse(process.argv);

if (!content) {
	program.help();
}

var filename = program.output || "barcode.png";

var options = {
	format: program.format,
	width: program.width,
	height: program.height,
	quite: program.quite,
	displayValue: program.displayValue,
	font: program.font,
	textAlign: program.textAlign,
	textPadding: program.textPadding,
	fontSize: program.fontSize,
	backgroundColor: program.background,
	lineColor: program.lineColor
};

try {
	var canvas = new Canvas();
	JsBarcode(canvas, content, options);
	var stream = canvas.pngStream();
	if (program.stdout) {
		stream.pipe(process.stdout);
	} else {
		stream.pipe(fs.createWriteStream(filename));
	}
} catch (e) {
	console.error(e.message);
}