const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
var gpostcss = require('gulp-postcss');
var sortMediaQueries = require('postcss-sort-media-queries');


function styles() {
  let postcssPlugins = [
		sortMediaQueries({
			sort: "desktop-first",
			// tips how group-css-media-queries work
			// Queries order see on https://www.npmjs.com/package/postcss-sort-media-queries
		})
	];
  return gulp.src('./src/assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gpostcss(postcssPlugins))
    .pipe(gulp.dest('./docs/assets/css/'));
};

function copyimg(cb) {
	gulp.src(['./src/assets/img/**/*.*'])
	.pipe(gulp.dest('./docs/assets/img/'));
	cb();
}

function copyjs(cb) {
	gulp.src(['./src/assets/js/**/*.js'])
	.pipe(gulp.dest('./docs/assets/js/'));
	cb();
}

function copyhtml(cb) {
	gulp.src(['./src/*.html'])
	.pipe(gulp.dest('./docs/'));
	cb();
}

exports.default = gulp.series(copyimg, copyjs, copyhtml, styles);