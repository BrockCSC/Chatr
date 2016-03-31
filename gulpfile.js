var gulp       = require('gulp');
var gutil      = require('gulp-util');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

//TODO: Add uglify.
// var uglify     = require('gulp-uglify');
var size       = require('gulp-size');

gulp.task('scripts', function () {

  var bundler = browserify({
    entries: ['app/main.js'],
    debug: true,
  })
  .transform(babelify, { presets: ['react', 'es2015'] });

  bundler.bundle()
      .pipe(source('main.js'))
      .pipe(buffer())

      // .pipe(uglify())
      .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['scripts']);
