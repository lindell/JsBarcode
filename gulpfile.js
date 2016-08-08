/*eslint
no-console: 0
*/

var gulp = require('gulp');
var babel = require("gulp-babel");
var bump = require('gulp-bump');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var publishRelease = require('publish-release');
var clean = require('gulp-clean');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');
var gzipSize = require('gzip-size');
var request = require('request');
var eslint = require('gulp-eslint');


var fs = require('fs');

gulp.task("clean", function(){
	return gulp.src(["bin/", "dist/"], {read: false})
		.pipe(clean());
});

gulp.task("lint", function () {
	return gulp.src(['src/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("babel", function () {
	return babelFunc();
});

function babelFunc(){
	return gulp.src("src/**/*")
		.pipe(babel({
			presets: ['es2015'],
			plugins: [["transform-es2015-classes", {loose: true}]]
		}))
		.pipe(gulp.dest("bin/"));
}

gulp.task("webpack", ["babel"], function () {
	return webpackFunc();
});

function webpackFunc(){
	return gulp.src('bin/JsBarcode.js')
		.pipe(gulpWebpack(
			{
				output: {
					filename: 'JsBarcode.all.js'
				}
			}
		, webpack))
		.pipe(gulp.dest("dist/"));
}

gulp.task("webpack-min", ["babel"], function () {
	return webpackMin('JsBarcode.all.min.js');
});

function webpackMin(filename){
	return gulp.src('bin/JsBarcode.js')
		.pipe(gulpWebpack(
			{
				output: {
					filename: filename
				},
				plugins: [new webpack.optimize.UglifyJsPlugin()]
			}
		, webpack))
		.pipe(gulp.dest("dist/"));
}

gulp.task("webpack-all", function (cb) {
	var barcodes = require('./barcode-building.json');

	fs.renameSync("src/barcodes/index.js", "src/barcodes/index.tmp.js");

	function createBarcodeInclude(barcode, callback){
		var toFile = "";
		toFile += "import {" + barcode.names + "} from '" + barcode.barcodeFile + "'";
		toFile += "\n";
		toFile += "export default {" + barcode.names + "}";

		fs.writeFile("src/barcodes/index.js", toFile, function(){
			if(fs.existsSync("bin/barcodes/index.js")){
				fs.unlinkSync("bin/barcodes/index.js");
			}
			babelFunc().on('end', function(){
				webpackMin("barcodes/" + barcode.filename).on('end', callback);
			});
		});
	}

	var i = 0;
	(function loopBarcodes(){
		createBarcodeInclude(barcodes[i], function(){
			i++;
			if(i < barcodes.length){
				loopBarcodes();
			}
			else{
				fs.renameSync("src/barcodes/index.tmp.js", "src/barcodes/index.js");
				cb(); // Done
			}
		});
	})();
});

gulp.task('watch', ['compile'], function() {
	gulp.watch("src/**/*", ['compile']);
});

gulp.task('watch-web', ['webpack'], function() {
	gulp.watch("src/**/*", ['webpack']);
});

gulp.task('compress', function(cb) {
	runSequence(
		"clean",
		"webpack-all",
		"webpack",
		"webpack-min",
		cb
	);
});


gulp.task('git-release', ['compress'], function(cb){
	var pkg = require('./package.json');
	var v = 'v' + pkg.version;
	var message = 'Release ' + v;

	updateReadmeFileSizes();

	gulp.src(['./package.json', './bower.json', './README.md', './bin/', './dist'])
		.pipe(git.add({args: '--all --force'}))
		.pipe(git.commit(message));

	git.push('origin', 'master', function(){
		git.tag(v, message, function(){
			git.push('origin', 'master', {args: '--tags'}, cb);
		});
	});
});

// Bump (increase) the version number
gulp.task('bump-patch', function(){
	return gulp.src(['./package.json', './bower.json'])
		.pipe(bump({type:'patch'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function(){
	return gulp.src(['./package.json', './bower.json'])
		.pipe(bump({type:'minor'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump-major', function(){
	return gulp.src(['./package.json', './bower.json'])
		.pipe(bump({type:'major'}))
		.pipe(gulp.dest('./'));
});

gulp.task('npm', function (done) {
	require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
});

gulp.task('github-release', function(done) {
	var pkg = require('./package.json');
	var v = 'v' + pkg.version;
	var name = "JsBarcode " + v;

	publishRelease({
		token: process.env.GITHUB_TOKEN,
		owner: "lindell",
		repo: "JsBarcode",
		tag: v,
		name: name,
		assets: [__dirname + "/dist/JsBarcode.all.min.js", __dirname + "/dist/JsBarcode.all.js"]
	}, done);
});

gulp.task('jsdelivr', function(callback){
	console.log("Updating sizes...");
	updateReadmeFileSizes();
	console.log("Making request...");
	request({
		url: "https://api.jsdelivr.com/v1/jsdelivr/libraries?name=jsbarcode",
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var readme = fs.readFileSync('README.md', "utf-8");
			var version = body[0].lastversion;

			readme = readme.replace(/https:\/\/cdn\.jsdelivr\.net\/jsbarcode\/[0-9]+\.[0-9]+\.[0-9]+\//g,
				"https://cdn.jsdelivr.net/jsbarcode/" + version + "/");

			fs.writeFileSync('README.md', readme, 'utf8');

			console.log("New version: " + version);
			callback();
		}
		else{
			console.error("Failed to make jsdelivr api request");
			callback();
		}
	});
});

function updateReadmeFileSizes(){
	var files = require('./barcode-building.json');
	var readme = fs.readFileSync('README.md', "utf-8");

	// Update .all files
	var allData = fs.readFileSync('dist/JsBarcode.all.min.js');
	var allFilesize = gzipSize.sync(allData);

	var allRegexp = new RegExp('\\|[^\\|]*\\|([ \\t\\*]*\\[JsBarcode\\.all\\.min\\.js\\])');
	readme = readme.replace(allRegexp, "|  *" + formatSize(allFilesize) + "*  |$1");

	// Update all barcodes files
	for(var i in files){
		var filename = files[i].filename;

		var fileData = fs.readFileSync('dist/barcodes/' + filename);
		var fileFilesize = gzipSize.sync(fileData);

		var fileRegexp = new RegExp('\\|[^\\|]*\\|([ \\t]*\\[' + RegExp.escape(filename) + '\\])');

		readme = readme.replace(fileRegexp, "|  " + formatSize(fileFilesize) + "  |$1");
	}

	fs.writeFileSync('README.md', readme, 'utf8');
}

function formatSize(bytes){
	var kilobytes = Math.round(bytes/1024*10)/10;

	return kilobytes + " kB";
}

// Needed so that github can register the push before new release
gulp.task('wait', function(done) {
	setTimeout(done, 5000);
});

var done = function (error) {
	if (error) {
		console.log(error.message);
	}
	else {
		console.log('Successful!');
	}
};


gulp.task('compile', ['babel']);

gulp.task('compile-web', ['webpack']);

gulp.task('release', ['lint'], function(callback){
	runSequence(
		'git-release',
		'wait',
		'github-release',
		'npm',
		callback
	);
});

gulp.task('patch', function(){
	runSequence(
		'bump-patch',
		'release',
		done
	);
});

gulp.task('minor', function(){
	runSequence(
		'bump-minor',
		'release',
		done
	);
});

gulp.task('major', function(){
	runSequence(
		'bump-major',
		'release',
		done
	);
});

// Util functions

RegExp.escape= function(s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
