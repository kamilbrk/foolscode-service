"user strict";
var gulp    = require('gulp'),
    refresh = require('gulp-livereload'),
    notify  = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    client  = require('tiny-lr')(),
    nodemon = require('gulp-nodemon'),
    lr_port = 35728,
    stylus   = require('gulp-stylus');


var paths = {
  scripts: ['!client/lib/**/*.js', 'client/**/*.js'],
  views: ['!client/lib/*.html', 'client/**/*.html', 'client/index.html'],
  styles: {
    css: ['!client/lib/**/*.css', 'client/styles/css/*.css', 'client/**/*.css'],
    stylus: ['client/styles/stylus/*.styl', 'client/**/*.styl'],
    dest: 'client/styles/css'
  }
};
var build = ['stylus', 'css' ];


var stylus = require('gulp-stylus');
gulp.task('stylus', function () {
  return gulp.src(paths.styles.stylus)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(refresh(client))
    .pipe(notify({message: 'Stylus done'}));
});

gulp.task('html', function () {
  return gulp.src(paths.views)
    .pipe(plumber())
    .pipe(refresh(client))
    .pipe(notify({message: 'Views refreshed'}));
});

gulp.task('css', function () {
  return gulp.src(paths.styles.css)
    .pipe(plumber())
    .pipe(refresh(client))
    .pipe(notify({message: 'CSS refreshed'}));
});

gulp.task('serve', function () {
  nodemon({script: 'server/server.js', ignore: ['node_modules/**/*.js']})
    .on('restart', function () {
      refresh(client);
    });
});

gulp.task('live', function () {
  client.listen(lr_port, function (err) {
    if (err) {
      return console.error(err);
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.styles.stylus, ['stylus']);
  gulp.watch(paths.views, ['html']);
});

gulp.task('build', build);

gulp.task('default', ['build', 'live', 'serve', 'watch']);
