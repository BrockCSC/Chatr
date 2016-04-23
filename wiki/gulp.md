# Gulp
## What is Gulp?
Gulp is a task runner. It helps us automate our workflow.

For Chatr specifically it's main usage is to bundle all of our React front-end code from `app/components` into a SINGLE JavaScript file, called `main.js` which we can serve up from some HTML file.

## How does gulp work?
Gulp uses a file called a `gulpfile.js`, you might have noticed it at the root of our project.

You have a gulpfile.js in place, simply run `gulp` in your terminal when you are in the project directory.

Let's inspect this `gulpfile` in detail.

In order to write gulpfiles, you must understand the end goal.

In our case, all we want to do is transpile and bundle all of our react components into a single file called 'main.js'

### gulpfile.js

```js
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var size       = require('gulp-size');

//We have one task, called scripts.
gulp.task('scripts', function () {

  //Lets create a bundler variable. We use a popular plugin called
  //browserify to bundle all of our code.

  //browserify needs an entry point.
  //the entry point specified here is app/main.js, we will inspect why below.


  var bundler = browserify({
    entries: ['app/main.js'],
    debug: true,
  })
  //we then call transform and run the babelify plugin,
  //we have presets for react and es6/es2015
  //which will transpile our JSX and ES6 code into code the browser can understand
  .transform(babelify, { presets: ['react', 'es2015'] });

  //Finally bundle the code
  bundler.bundle()
      //name this file called main.js
      .pipe(source('main.js'))
      .pipe(buffer())
      //put this bundled file in the public folder
      .pipe(gulp.dest('./public/'));
});

//This line makes it so the default task when `gulp` command is called is the scripts task.
gulp.task('default', ['scripts']);
```

That's really all for gulp.

For convenience, I've put the gulp command in the prestart hook (this is discussed further in the Node and NPM basics section) so you will probably never call gulp on your own.
