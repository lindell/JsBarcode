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
var webpack = require('webpack-stream');

gulp.task("clean", function(){
  return gulp.src("bin/", {read: false})
    .pipe(clean());
});

gulp.task("babel", function () {
  return gulp.src("src/**/*")
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(gulp.dest("bin/node/"));
});

gulp.task("webpack", function () {
  return gulp.src('bin/node/JsBarcode.js')
    .pipe(webpack())
    .pipe(rename("bin/browser/JsBarcode.js"))
    .pipe(gulp.dest("."));
});

gulp.task('compress', function() {
  var pkg = require('./package.json');

  return gulp.src('bin/browser/JsBarcode.js')
    .pipe(uglify())
    .pipe(header('/* JsBarcode v<%= pkg.version %> | github.com/lindell/JsBarcode */\n', {pkg: pkg}))
    .pipe(gulp.dest('bin/browser/JsBarcode.min.js'));
});

gulp.task('git-release', ['compress'], function(cb){
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  gulp.src(['./package.json', './bower.json', 'JsBarcode.all.min.js'])
    .pipe(git.add())
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
    assets: [__dirname + "/JsBarcode.all.min.js"],
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

gulp.task('compile', function(){
  runSequence(
    'clean',
    'babel',
    'webpack',
    done
  );
});

gulp.task('patch', function(){
  runSequence(
    'bump-patch',
    'git-release',
    'wait',
    'github-release',
    'npm',
    done
  );
});

gulp.task('minor', function(){
  runSequence(
    'bump-minor',
    'git-release',
    'wait',
    'github-release',
    'npm',
    done
  );
});

gulp.task('major', function(){
  runSequence(
    'bump-major',
    'git-release',
    'wait',
    'github-release',
    'npm',
    done
  );
});
