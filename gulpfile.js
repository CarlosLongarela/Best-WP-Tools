var gulp         = require( 'gulp' ),
	ts           = require( 'gulp-typescript' ),
	uglify       = require( 'gulp-uglify' ),
	sass         = require( 'gulp-sass' ),
	autoprefixer = require( 'autoprefixer' ),
	postcss      = require( 'gulp-postcss' ),
	cssnano      = require( 'cssnano' ),
	plumber      = require( 'gulp-plumber' ),
	concat       = require( 'gulp-concat' ),
	notify       = require( 'gulp-notify' ),
	sourcemaps   = require( 'gulp-sourcemaps' );

var tsconfig = require( './tsconfig.json' );

var GeneralTS = [
	'./__src/typescript/*.ts',
];

var GeneralSCSS = [
	'./__src/scss/style.scss',
];

var plugins = [
	autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9' ),
	cssnano()
];

/** Js Tasks */
gulp.task( 'general-scripts', function() {
	var js_dest      = 'js/';
	var js_post_name = '.min.js';

	return gulp.src( GeneralTS )
		.pipe( ts( tsconfig.compilerOptions ) )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( js_post_name ) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( js_dest ) )
		.pipe( notify( {
			title: 'Gulp ADMIN JS Task Result:',
			message: 'Admin [/' + js_dest + '/' + js_post_name + '] created.',
			onLast: true
		} ) );
} );

/** SCSS Tasks */
gulp.task( 'general-scss', function() {
	var css_dest      = 'css';
	var css_post_name = '.min.css';

	return gulp.src( GeneralSCSS )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( css_post_name ) )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( plugins ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( css_dest ) )
		.pipe( notify( {
			title: 'Gulp ADMIN CSS Task Result:',
			message: 'Admin [/' + css_dest + '/' + css_post_name + '] created.',
			onLast: true
		} ) );
} );

gulp.task( 'watch', function() {
	// Inspect changes in ts files.
	gulp.watch( AdminTS, gulp.series( 'general-scripts' ) );

	// Inspect changes in scss files.
	gulp.watch( AdminSCSS, gulp.series( 'general-scss' ) );
} );

gulp.task( 'default', gulp.parallel( 'watch' ) );
