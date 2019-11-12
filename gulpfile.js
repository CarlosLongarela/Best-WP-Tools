var gulp         = require( 'gulp' ),
	ts           = require( 'gulp-typescript' ),
	uglify       = require( 'gulp-uglify' ),
	sass         = require( 'gulp-sass' ),
	autoprefixer = require( 'autoprefixer' ),
	postcss      = require( 'gulp-postcss' ),
	cssnano      = require( 'cssnano' ),
	rename       = require( 'gulp-rename' ),
	plumber      = require( 'gulp-plumber' ),
	notify       = require( 'gulp-notify' ),
	sourcemaps   = require( 'gulp-sourcemaps' );

var tsconfig = require( './tsconfig.json' );

var SourceTS = [
	'__src/typescript/*.ts',
];

var SourceSCSS = [
	'__src/scss/*.scss',
];

var plugins = [
	autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9' ),
	cssnano()
];

/** Js Tasks */
gulp.task( 'general-scripts', function() {
	var js_dest = 'js';

	return gulp.src( SourceTS )
		.pipe( ts( tsconfig.compilerOptions ) )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( js_dest ) )
		.pipe( notify( {
			title: 'Gulp TS Task Result:',
			message: 'Files from [/' + SourceTS + '/] created in [/' + js_dest + '/].',
			onLast: true
		} ) );
} );

/** SCSS Tasks */
gulp.task( 'general-scss', function() {
	var css_dest = 'css';

	return gulp.src( SourceSCSS )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( plugins ) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( css_dest ) )
		.pipe( notify( {
			title: 'Gulp SCSS Task Result:',
			message: 'Files from [/' + SourceSCSS + '/] created in [/' + css_dest + '/].',
			onLast: true
		} ) );
} );

gulp.task( 'watch', function() {
	// Inspect changes in ts files.
	gulp.watch( SourceTS, gulp.series( 'general-scripts' ) );

	// Inspect changes in scss files.
	gulp.watch( SourceSCSS, gulp.series( 'general-scss' ) );
} );

gulp.task( 'default', gulp.parallel( 'watch' ) );
