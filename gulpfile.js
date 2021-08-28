'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemap = require('gulp-sourcemaps');
const del = require('del');

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function (){
  return gulp.src([
    'assets/fonts/**/*.{woff,woff2}',
    'assets/images/**',
    'assets/js/**'
  ], {
    base: 'assets'
  })
  .pipe(gulp.dest('build'));
});


gulp.task('sass', function () {
  return gulp.src('assets/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'sass',
  'html'
));

gulp.task('serve', function () {
  browserSync.init({
    server: 'build/'
  });
  gulp.watch('assets/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('*.html', gulp.series('html'));
});

gulp.task('start', gulp.series('clean', 'copy', 'sass', 'html', 'serve'));
