'use strict';

// Load Gulp and tools we will use.
var $          = require('gulp-load-plugins')(),
  del        = require('del'),
  extend     = require('extend'),
  fs         = require("fs"),
  gulp       = require('gulp'),
  importOnce = require('node-sass-import-once'),
  kss        = require('kss'),
  kssOptions = require('./styleguide-config/styleguide-config.json');

var options = {};
var autoReload = true; // Enables livereload

options.gulpWatchOptions = {};

// The root paths are used to construct all the other paths in this
// configuration. The "project" root path is where this gulpfile.js is located.
options.rootPath = {
  project     : __dirname + '/',
  theme       : __dirname + '/'
};

options.theme = {
  root       : options.rootPath.theme,
  scss       : options.rootPath.theme + 'scss/',
  components : options.rootPath.theme + 'components/',
  css        : options.rootPath.theme + 'css/'
};

// Define the node-scss configuration.
options.scss = {
  importer: importOnce,
  outputStyle: 'compressed',
  lintIgnore: ['scss/_settings.scss', 'scss/0-init/_drupal.scss'],
  includePaths: [
    options.rootPath.project + 'node_modules/foundation-sites/scss',
    options.rootPath.project + 'node_modules/motion-ui/src'
  ],
};

// Define which browsers to add vendor prefixes for.
options.autoprefixer = {
  browsers: [
    'last 2 versions',
    'ie >= 9'
  ]
};

// If gulp-config.js exists, load that config and override the options object.
if (fs.existsSync(options.rootPath.project + "/gulp-config.js")) {
  var config = {};
  config = require("./gulp-config");
  extend(true, options, config);
}

var scssFiles = [
  options.theme.scss + '**/*.scss',
  // Do not open scss partials as they will be included as needed.
  '!' + options.theme.scss + '**/_*.scss',
];

var componentScssFiles = [
  options.theme.components + '**/*.scss',
  // Do not open scss partials as they will be included as needed.
  '!' + options.theme.components + '**/_*.scss',
];

// The default task.
gulp.task('default', ['build']);

// Build everything.
gulp.task('build', ['sass', 'components', 'drush:cc', 'lint', 'styleguide', 'styleguide-css']);

// Default watch task.
// @todo needs to add a javascript watch task.
gulp.task('watch', ['watch:css'], function() {
  if (autoReload) {
    $.livereload.listen();
  }
});

// Watch for changes for scss files and rebuild.
gulp.task('watch:css', ['build'], function () {
  return gulp.watch(
    [
      options.theme.scss + '**/*.scss',
      options.theme.components + '**/*.scss'
    ],
    options.gulpWatchOptions,
    ['sass', 'components', 'drush:cc', 'lint', 'styleguide', 'styleguide-css']);
});

// Lint Sass and JavaScript.
// @todo needs to add a javascript lint task.
gulp.task('lint', ['lint:sass']);

// Build primary CSS for the theme.
gulp.task('sass', ['clean:css'], function () {
  return gulp.src(scssFiles)
    .pipe($.sourcemaps.init())
    // Allow the options object to override the defaults for the task.
    .pipe($.sass(extend(true, {
      noCache: true,
      outputStyle: options.scss.outputStyle,
      sourceMap: true
    }, options.scss)).on('error', $.sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.rename({dirname: ''}))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest(options.theme.css));
});

// Build CSS for all components.
gulp.task('components', ['clean:css'], function () {
  return gulp.src(componentScssFiles)
    .pipe($.sourcemaps.init())
    // Allow the options object to override the defaults for the task.
    .pipe($.sass(extend(true, {
      noCache: true,
      outputStyle: options.scss.outputStyle,
      sourceMap: true
    }, options.scss)).on('error', $.sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.rename({dirname: ''}))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(options.theme.css + '/components'));
});

// Clean CSS files.
gulp.task('clean:css', function () {
  return del([
    options.theme.css + '**/*.css',
    options.theme.css + '**/*.map'
  ], {force: true});
});

// Defines a task that triggers a Drush cache clear (css-js), you need to edit
// config.js to be able to use this task.
gulp.task('drush:cc', function () {
  if (!options.drush.enabled) {
    return;
  }

  return gulp.src('', {read: false})
    .pipe($.shell([
      options.drush.alias.css_js
    ]));
});

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(options.theme.scss + '**/*.scss')
    // use gulp-cached to check only modified files.
    .pipe($.sassLint({
      files: {
        include: $.cached('scsslint'),
        ignore: options.scss.lintIgnore
      }
    }))
    .pipe($.sassLint.format());
});

// Delete the styleguide.
gulp.task('clean:styleguide', function() {
  return del([
    kssOptions.destination
  ], {force: true});
})

// Compile the styleguide.
gulp.task('styleguide', ['clean:styleguide'], function() {
  return kss(kssOptions);
})

// Compile the styleguide CSS
gulp.task('styleguide-css', ['sass', 'components', 'styleguide'], function() {
  return gulp.src([options.theme.css + '**/*.css'])
    .pipe($.concat('styleguide-styles.css'))
    .pipe(gulp.dest(kssOptions.destination))
    .pipe($.livereload());
})
