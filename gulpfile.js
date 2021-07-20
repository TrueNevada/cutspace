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

gulp.task('sass', function () {
  return gulp.src('sass/style.scss')
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

gulp.task('serve', function () {
  browserSync.init({
    server: 'build/'
  });
  gulp.watch('sass/**/*.scss', gulp.series('sass'));
  gulp.watch('*.html', gulp.series('html'));
});

/*
Browser Sync - это веб сервер, построенный на базе фреймворка Express
Сервер в самом простом случае работает так: получает запрос и по умолчанию
ищет index.html, если не находит - то возвращает ошибку 404, что и происходило.
Ты запускал сервер, но в папке build не было index.html на тот момент, поэтому
он отработал так, как и должен - отдал ошибку 404.
*/

gulp.task("start", gulp.series("clean","sass", "html", "serve"));
