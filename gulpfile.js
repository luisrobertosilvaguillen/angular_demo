var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream; 

gulp.task('server', function () {
	connect.server({
		root: './app',
		port: 3000,
		livereload: true,
		middleware: function(connect, opt){
			return [historyApiFallback({})];
		}
	});
});

gulp.task('html', function () {
	gulp.src('./app/*.html')
	.pipe(connect.reload());
});

gulp.task('inject', function () {
	var target = gulp.src('./app/index.html');
	var sources = gulp.src(['./app/scripts/**/*.js','./app/styles/**/*.css' ], {read: false});
	return target.pipe(inject(sources,{ ignorePath: '/app'})).pipe(gulp.dest('./app'));
});

gulp.task('wiredep', function () {
	gulp.src("./app/index.html")
    .pipe(wiredep({
		directory: "./app/vendor",
		onError: function (err) {
			console.log(err.code);
		}
	}))
	.pipe(gulp.dest('./app'));

});

gulp.task('watch', function () {
	gulp.watch(['./app/**/*.html'], ['html']);
	// gulp.watch(['./app/scripts/**/*.js'], ['inject']);
	// gulp.watch(['./app/styles/**/*.css'], ['inject']);
	gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('default', ['server',  'wiredep', 'watch']); //'inject',
