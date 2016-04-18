var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bump = require('gulp-bump');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var publishRelease = require('publish-release');
var header = require('gulp-header');
var clean = require('gulp-clean');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');

gulp.task("clean", function(){
  return gulp.src("bin/", {read: false})
    .pipe(clean());
});

gulp.task("babel", function () {
  return gulp.src("src/**/*")
    .pipe(babel({
      presets: ['es2015'],
      plugins: [["transform-es2015-classes", {loose: true}]]
		}))
    .pipe(gulp.dest("bin/node/"));
});

gulp.task("webpack", function () {
  return gulp.src('bin/node/JsBarcode.js')

    .pipe(gulpWebpack(
      {
        output: {
          filename: 'JsBarcode.js',
        },
        plugins: [new webpack.optimize.UglifyJsPlugin()],
      }
    , webpack))

    .pipe(gulp.dest("bin/browser/"));
});

gulp.task('watch', ['compile'], function() {
  gulp.watch("src/**/*", ['compile']);
});

gulp.task('compress', ["babel", "webpack"], function() {
  var pkg = require('./package.json');
});


gulp.task('git-release', ['compress'], function(cb){
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  gulp.src(['./package.json', './bower.json', './bin/'])
    .pipe(git.add({args: '--all'}))
    .pipe(git.commit(message));

  git.tag(v, message, function(error){
    if(error){
      console.error(error);
    }
    git.push('origin', 'master', function(){
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
    assets: [__dirname + "/bin/browser/JsBarcode.all.min.js"],
  }, done);
});

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

gulp.task('compile', function(done){
  runSequence(
    'babel',
    'webpack',
    done
  );
});

gulp.task('release', function(callback){
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
