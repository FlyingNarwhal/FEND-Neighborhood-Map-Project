var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ghPages = require('gulp-gh-pages');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('compress', function() {
	return gulp.src('app/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/'));
});

gulp.task('deploy', function() {
	return gulp.src('./dist/**/*')
	.pipe(ghPages());
});