var gulp = require('gulp');
var header = require('gulp-header');
var clean = require('gulp-clean');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');
var babel = require("gulp-babel");
var runSequence = require('gulp4-run-sequence');
var fs = require('fs');

var settings = require('./settings.json');
var shared = require('./shared.js');

gulp.task("clean", gulp.series(function () {
	return gulp.src(["bin/", "dist/"], { read: false })
		.pipe(clean());
}));


gulp.task("babel", gulp.series(function () {
	return babelFunc();
}));


function babelFunc() {
	return gulp.src("src/**/*")
		.pipe(babel({
			presets: ['es2015', 'stage-3']
		}))
		.pipe(gulp.dest("bin/"));
}


gulp.task("webpack", gulp.series(["babel"], function () {
	return webpackFunc();
}));


function webpackFunc() {
	return gulp.src('bin/JsBarcode.js')
		.pipe(gulpWebpack(
			{
				mode: "none",
				output: {
					filename: 'JsBarcode.all.js'
				}
			}
			, webpack))
		.pipe(gulp.dest("dist/"));
}


gulp.task("webpack-min", gulp.series(["babel"], function () {
	return webpackMin('all');
}));


function webpackMin(name, dest) {
	dest = dest || './';
	return gulp.src('bin/JsBarcode.js')
		.pipe(gulpWebpack(
			{
				mode: "production",
				output: {
					filename: shared.minifiedFilename(name)
				},
			}
			, webpack))
		.pipe(header(settings.banner, require(settings.baseDir + 'package.json')))
		.pipe(gulp.dest("dist/" + dest));
}


gulp.task("webpack-all", gulp.series(function (cb) {
	var barcodes = require('./barcode-building.json');

	// Move the real barcodes/index.js out of the way while compiling the individual barcodes
	fs.renameSync("src/barcodes/index.js", "src/barcodes/index.tmp.js");

	// Take a barcode from the barcodes array, call the functions to compile that
	// format and have a callback when it has finished.
	function loopBarcode(i) {
		if (i < barcodes.length) {
			createBarcodeInclude(barcodes[i], function () {
				loopBarcode(i + 1);
			});
		}
		else {
			fs.renameSync("src/barcodes/index.tmp.js", "src/barcodes/index.js");
			cb(); // Done
		}
	}

	loopBarcode(0);
}));


// Takes information about a barcode formatSize
// Modifies the barcodes/index.js file to only import the specified format
// and then does a recompilation and minifies everything with webpack
function createBarcodeInclude(barcode, callback) {
	var toFile = "";
	toFile += "import {" + barcode.names + "} from '" + barcode.barcodeFile + "'";
	toFile += "\n";
	toFile += "export default {" + barcode.names + "}";

	// Write a new barcodes/index file that only includes the specified barcode
	fs.writeFile("src/barcodes/index.js", toFile, function () {
		// Remove the compiled barcodes/index file (if it exist)
		if (fs.existsSync("bin/barcodes/index.js")) {
			fs.unlinkSync("bin/barcodes/index.js");
		}
		// Re-compile with babel and webpack everything
		babelFunc().on('end', function () {
			webpackMin(barcode.name, 'barcodes/').on('end', callback);
		});
	});
}


gulp.task('compress', gulp.series(function (cb) {
	runSequence(
		"clean",
		"webpack-all",
		"webpack",
		"webpack-min",
		cb
	);
}));

gulp.task('compile', gulp.series(['babel']));

gulp.task('compile-web', gulp.series(['webpack']));
