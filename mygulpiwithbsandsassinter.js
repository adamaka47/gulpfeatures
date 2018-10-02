var gulp = require('gulp');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

// Start server

//src folder

gulp.task('serve', ['sass'], function() {

    bs.init({
        server: "./src"
    });

    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', bs.reload);
});

// Compile SASS in CSS
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(bs.stream());
});

gulp.task('default', ['serve']);



gulp.task( 'deploy', function () {

	var conn = ftp.create( {
		host:     '*',
		user:     '*',
		password: '*',
		log:      gutil.log
	} );

	var globs = [
		'src/**'
	];


	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.newer( '*' ) )
		.pipe( conn.dest( '*' ) );

} );
