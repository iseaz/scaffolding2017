const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const gulpCopy = require('gulp-copy')
const flatten = require('gulp-flatten')
const sourcePublic = ['ecma/bundle.min.js', 'fonts/**/*', 'images/**/*', 'vdo/**/*', 'favicon.png']

gulp.task('copy', () => {
	return gulp.src(sourcePublic)
		.pipe(gulpCopy('./public'))
})
	
gulp.task('copy2', () => {
	return gulp.src('ecma/bundle.css')
		.pipe(flatten())
		.pipe(gulp.dest('public/css'))
})

gulp.task('default', ['copy', 'copy2'], () => {
	return gulp.src(['**/*.html', '!node_modules/**'])
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
		.pipe(gulp.dest('./public'))
})