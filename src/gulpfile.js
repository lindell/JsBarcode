var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var inlinesource = require('gulp-inline-source');
var runSequence = require('gulp-run-sequence');

var browserSync = require('browser-sync').create();

var paths = {
	html: '*.html',
	js: 'js/*.js'
};

gulp.task('default', ['watch']);

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('clean-dist', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});

gulp.task('clean-out', function(){
  return gulp.src(['../*.html', '../css/', '../js/'], {read:false})
  	.pipe(clean({force: true}));
});

gulp.task('move-to-out', function(){
	return gulp.src('./dist/**/*')
		.pipe(gulp.dest('../'));
});

gulp.task('inject', function(){
  return gulp.src('./dist/*.html')
      .pipe(inlinesource())
      .pipe(gulp.dest('./dist'));
});

gulp.task('move', ['move-html', 'move-js']);

gulp.task('move-html', function(){
  gulp.src([paths.html])
  .pipe(gulp.dest('dist'));
});

gulp.task('move-js', function(){
  gulp.src([paths.js])
  .pipe(gulp.dest('dist/js'));
});

gulp.task('release', function(cb){
	runSequence(
		['clean-dist', 'clean-out'],
		['move', 'sass'],
		'inject',
		'move-to-out',
		cb
	);
});

gulp.task('watch', ['move', 'sass'], function(){
  browserSync.init({
    server: "./dist"
  });

  gulp.watch("sass/*.scss", ['sass']);
  gulp.watch(paths.html, ['bsReload']);
  gulp.watch(paths.js, ['bsReload']);
});

gulp.task('bsReload', ['move'], browserSync.reload);
