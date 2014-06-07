'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('compile', function() {

  return gulp.src([
      'CODE128.js',
      'CODE39.js',
      'EAN_UPC.js',
      'ITF.js',
      'ITF14.js',
      'JsBarcode.js'
    ])
    .pipe(uglify())
    .pipe(concat('JsBarcode.all.min.js'))
    .pipe(gulp.dest('build'));


});

gulp.task('default', ['compile']);