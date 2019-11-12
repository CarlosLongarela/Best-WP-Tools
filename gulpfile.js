var AppName = 'cl-woo-dorset-waivers';

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

var AdminTS = [
	'./admin/js/src/' + AppName + '-admin.ts',
];

var PublicTS = [
	'./public/js/src/' + AppName + '-public.ts',
];

var AdminSCSS = [
	'./admin/css/scss/' + AppName + '-admin.scss',
];

var PublicSCSS = [
	'./public/css/scss/' + AppName + '-public.scss',
];

var plugins = [
	autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9' ),
	cssnano()
];

/** Js Tasks */
gulp.task( 'admin-scripts', function() {
	var js_dest      = 'admin/js';
	var js_post_name = '-admin.min.js';

	return gulp.src( AdminTS )
		.pipe( ts( tsconfig.compilerOptions ) )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( AppName + js_post_name ) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( js_dest ) )
		.pipe( notify( {
			title: 'Gulp ADMIN JS Task Result:',
			message: 'Admin [/' + js_dest + '/' + AppName + js_post_name + '] created.',
			onLast: true
		} ) );
} );

gulp.task( 'public-scripts', function() {
	var js_dest      = 'public/js';
	var js_post_name = '-public.min.js';

	return gulp.src( PublicTS )
		.pipe( ts( tsconfig.compilerOptions ) )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( AppName + js_post_name ) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( js_dest ) )
		.pipe( notify( {
			title: 'Gulp PUBLIC JS Task Result:',
			message: 'Public [/' + js_dest + '/' + AppName + js_post_name + '] created.',
			onLast: true
		} ) );
} );

/** SCSS Tasks */
gulp.task( 'admin-scss', function() {
	var css_dest      = 'admin/css';
	var css_post_name = '-admin.min.css';

	return gulp.src( AdminSCSS )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( AppName + css_post_name ) )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( plugins ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( css_dest ) )
		.pipe( notify( {
			title: 'Gulp ADMIN CSS Task Result:',
			message: 'Admin [/' + css_dest + '/' + AppName + css_post_name + '] created.',
			onLast: true
		} ) );
} );

gulp.task( 'public-scss', function() {
	var css_dest      = 'public/css';
	var css_post_name = '-public.min.css';

	return gulp.src( PublicSCSS )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( AppName + css_post_name ) )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( plugins ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( css_dest ) )
		.pipe( notify( {
			title: 'Gulp PUBLIC CSS Task Result:',
			message: 'Public [/' + css_dest + '/' + AppName + css_post_name + '] created.',
			onLast: true
		} ) );
} );

gulp.task( 'watch', function() {
	// Inspect changes in ts files.
	gulp.watch( AdminTS, gulp.series( 'admin-scripts' ) );
	gulp.watch( PublicTS, gulp.series( 'public-scripts' ) );

	// Inspect changes in scss files.
	gulp.watch( AdminSCSS, gulp.series( 'admin-scss' ) );
	gulp.watch( PublicSCSS, gulp.series( 'public-scss' ) );
} );

gulp.task( 'default', gulp.parallel( 'watch' ) );
