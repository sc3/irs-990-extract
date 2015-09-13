var gulp = require('gulp');
var debug = require('gulp-debug');
var babel = require('gulp-babel');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
var eslint = require('gulp-eslint');
var taskListing = require('gulp-task-listing');

/**
 * List tasks with `glup list`.
 */
gulp.task('tasks', taskListing);

/**
 * Lint the project using the `.eslintrc` provided.
 */
gulp.task('lint', ['clean'],  function() {
  var stream = gulp.src([
      "./lib/*.js",
      "./*.js"
    ])
    .pipe(debug())
    .pipe(eslint({
      useEslintrc: true 
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
  return stream;
});

/** 
 *  * Run jasmine specs
 *   */
gulp.task('test', ['compile'], function() {
  var stream = gulp.src("./test/jasmine/specs/**/*Spec.js").pipe(jasmine({
    'verbose': true,
    'includeStackTrace': true,
    'reporter': new reporters.TerminalReporter({
      isVerbose: true,
      includeStackTrace: true,
      showColors: true
    })
  }));
  return stream;
});

/**
 * Transpile to ES5 so we can use ES.next today. 
 */
gulp.task('compile', ['lint'], function() {
  var stream = gulp.src([
    "./lib/*.js",
    "./*.js"
    ])
    .pipe(babel({}))
    .pipe(gulp.dest("./target/babeled"));
  return stream;
});
});
