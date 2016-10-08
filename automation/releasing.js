/*eslint
no-console: 0
*/

var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
var publishRelease = require('publish-release');
var gzipSize = require('gzip-size');
var runSequence = require('run-sequence');
var fs = require('fs');

var settings = require('./settings.json');
var shared = require('./shared.js');


gulp.task('git-release', ['compress'], function(cb){
	var pkg = require(settings.baseDir + 'package.json');
	var v = 'v' + pkg.version;
	var message = ':package: Release ' + v;

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
	var pkg = require(settings.baseDir + './package.json');
	var v = 'v' + pkg.version;
	var name = "JsBarcode " + v;

	publishRelease({
		token: process.env.GITHUB_TOKEN,
		owner: "lindell",
		repo: "JsBarcode",
		tag: v,
		name: name,
		assets: [__dirname + "/" + settings.baseDir + "/dist/JsBarcode.all.min.js", __dirname + "/" + settings.baseDir + "/dist/JsBarcode.all.js"]
	}, done);
});



gulp.task('release', ['lint'], function(callback){
	runSequence(
		'git-release',
		'github-release',
		'npm',
		callback
	);
});


gulp.task('patch', function(){
	runSequence(
		'bump-patch',
		'release',
		releaseDone
	);
});


gulp.task('minor', function(){
	runSequence(
		'bump-minor',
		'release',
		releaseDone
	);
});


gulp.task('major', function(){
	runSequence(
		'bump-major',
		'release',
		releaseDone
	);
});

function releaseDone (error) {
	if (error) {
		console.log(error.message);
	}
	else {
		console.log('Successful!');
	}
}


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
		var filename = shared.minifiedFilename(files[i].name);

		var fileData = fs.readFileSync('dist/barcodes/' + filename);
		var fileFilesize = gzipSize.sync(fileData);

		var fileRegexp = new RegExp('\\|[^\\|]*\\|([ \\t]*\\[' + RegExp.escape(filename) + '\\])');

		readme = readme.replace(fileRegexp, "|  " + formatSize(fileFilesize) + "  |$1");
	}

	fs.writeFileSync('README.md', readme, 'utf8');
}


// Util functions
RegExp.escape = function(s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function formatSize(bytes){
	var kilobytes = Math.round(bytes / 1024 * 10) / 10;

	return kilobytes + " kB";
}
