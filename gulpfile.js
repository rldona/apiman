var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var taskListing = require('gulp-task-listing');
var $ = require('gulp-load-plugins')({lazy: true});

// -----------------------------------------------
//  Styles: SASS, fonts, images, etc...
// -----------------------------------------------

gulp.task('sass', function() {
  return gulp
    .src('src/client/styles/scss/app.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.if(args.verbose, $.print(function(filepath) {
      return 'built file: ' + filepath;
    })))
    .pipe(gulp.dest('src/client/styles/css/'));
});

// -----------------------------------------------
//  Dependency injection
// -----------------------------------------------

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream,
    options = config.getWiredepDefaultOptions();

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.css)))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

// -----------------------------------------------
//  Optimize
// -----------------------------------------------

gulp.task('build', ['inject'], function() {
  console.log('Otimizing the JS, CSS & HTML');
  var assets = $.useref.assets({searchPath: './'});

  return gulp
      .src(config.index)
      .pipe($.plumber())
      .pipe(assets)
      // .pipe($.gulpif('*.js', $.uglify()))
      // .pipe($.gulpif('*.css', $.minifyCss()))
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe(gulp.dest(config.build));
});

// -----------------------------------------------
//  SCSS Watcher
// -----------------------------------------------

gulp.task('watch', function() {
  gulp.watch([config.scss, config.js], ['sass']);
});

// -----------------------------------------------
//  Gulp Start
// -----------------------------------------------

gulp.task('default', ['sass', 'build', 'watch']);

// -----------------------------------------------
//  Add a task to render the output
// -----------------------------------------------

gulp.task('help', taskListing);
