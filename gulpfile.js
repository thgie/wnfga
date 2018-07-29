var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

gulp.task('default', function() {

});

gulp.task('style', function() {
	gulp.src('./static/scss/+.scss')
		.pipe(sass())
		.pipe(gulp.dest('./static/'));
});

gulp.task('watch', function() {
	var bundler = watchify(browserify('./static/js/+.js', watchify.args));

	bundler.on('update', rebundle);

	function rebundle() {
		return bundler.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(source('+.js'))
			.pipe(gulp.dest('./static/'));
	}

	return rebundle();
});