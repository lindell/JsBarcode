var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bump = require('gulp-bump');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var publishRelease = require('publish-release');
var header = require('gulp-header');

gulp.task('compress', function() {
  var pkg = require('./package.json');

  return gulp.src(['JsBarcode.js','barcodes/*.js', '!barcodes/GenericBarcode.js'])
    .pipe(concat("JsBarcode.all.min.js"))
    .pipe(uglify())
    .pipe(header('/* JsBarcode v<%= pkg.version %> | github.com/lindell/JsBarcode */\n', {pkg: pkg}))
    .pipe(gulp.dest('./'));
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

var done = function (error) {
  if (error) {
    console.log(error.message);
  }
  else {
    console.log('Successful!');
  }
};

gulp.task('patch', function(){
  runSequence(
    'bump-patch',
    'git-release',
    'github-release',
    done
  );
});

gulp.task('minor', function(){
  runSequence(
    'bump-minor',
    'git-release',
    'github-release',
    done
  );
});

gulp.task('major', function(){
  runSequence(
    'bump-major',
    'git-release',
    'github-release',
    done
  );
});
