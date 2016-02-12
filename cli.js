#!/usr/bin/env node

var program = require("commander");
var JsBarcode = require('./JsBarcode.js');
var Canvas = require("canvas");
var fs = require('fs');
var path = require("path");

var content;
program
  .usage('<content> [options]')
  .option('-o, --output <filename>', "Default: barcode.png")
  .option('-s, --stdout', "Output the png data to stdout")
  .option('-f, --format <format>', 'Barcode format')
  .option('-W, --width <width>', 'Width of a line in the barcode', parseInt)
  .option('-H, --height <height>', 'Height of the barcode', parseInt)
  .option('-q, --quite <quite>', 'Empty space left and right of the barcode', parseInt)
  .option('-d, --displayValue', 'Display the value as text under the barcode')
  .option('-F, --font <font>', 'Set the font of the text')
  .option('-a, --textAlign <align>', 'Set where the text will be displayed')
  .option('-p, --textPadding <padding>', 'The padding between the barcode and the text', parseInt)
  .option('-S, --fontSize <fontsize>', 'Set the font size', parseInt)
  .option('-b, --background <color>', 'Set the background color')
  .option('-l, --lineColor <color>', 'Set the line color')
  .action(function (c) {
    content = c;
  });

program.parse(process.argv);

if(!content){
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

try{
  var canvas = new Canvas();
  JsBarcode(canvas, content, options);
  var stream = canvas.pngStream();
  if(program.stdout){
    stream.pipe(process.stdout);
  }
  else{
    stream.pipe(fs.createWriteStream(filename));
  }
}
catch(e){
  console.error(e.message);
}
