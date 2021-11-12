const gulp       = require( 'gulp' ),
	ts           = require( 'gulp-typescript' ),
	nunjucks     = require( 'gulp-nunjucks' ),
	terser       = require( 'gulp-terser' );
	sass         = require( 'gulp-sass' )( require( 'node-sass' ) ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	postcss      = require( 'postcss' ),
	header       = require( 'gulp-header' ),
	footer       = require( 'gulp-footer' ),
	cssnano      = require( 'cssnano' ),
	rename       = require( 'gulp-rename' ),
	plumber      = require( 'gulp-plumber' ),
	notify       = require( 'gulp-notify' ),
	sourcemaps   = require( 'gulp-sourcemaps' );

const tsconfig = require( './tsconfig.json' );

const SourceTS = [
	'src/typescript/*.ts',
];

const SourceSCSS = [
	'src/scss/*.scss',
];

const SourceNJK = [
	'src/templates/*.njk',
];

let currentDate = new Date();
let copy_text = 'Copyright (C) Carlos Longarela ' + currentDate.getFullYear() + '/' + currentDate.getMonth() + '/' + currentDate.getDay() + ' https://tabernawp.com/ <carlos@longarela.eu>';

/** Nunjucks Tasks */
gulp.task( 'nunjucks', () => {
	const njk_dest = 'html';

	return gulp.src( SourceNJK )
		.pipe( plumber() )
		.pipe( nunjucks.compile() )
		.pipe( rename( { extname: '.html' } ) )
		.pipe( footer( '\n<!-- ' + copy_text + '-->' ) )
		.pipe( gulp.dest( njk_dest ) )
		.pipe( notify( {
			title: 'Gulp NJK Task Result:',
			message: 'Files from [/' + SourceNJK + '/] created in [/' + njk_dest + '/].',
			onLast: true
		} ) );
} );

/** Js Tasks */
gulp.task( 'general-scripts', () => {
	const js_dest = 'js';

	return gulp.src( SourceTS )
		.pipe( plumber() )
		.pipe( ts( tsconfig.compilerOptions ) )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( terser() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( header( '// ' + copy_text + '\n' ) )
		.pipe( gulp.dest( js_dest ) )
		.pipe( notify( {
			title: 'Gulp TS Task Result:',
			message: 'Files from [/' + SourceTS + '/] created in [/' + js_dest + '/].',
			onLast: true
		} ) );
} );

/** SCSS Tasks */
gulp.task( 'general-scss', () => {
	const css_dest = 'css';
	const plugins = [
		autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9' ),
		cssnano()
	];

	return gulp.src( SourceSCSS )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9' ) )
		//.pipe( postcss( plugins ) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( header( '/* ' + copy_text + ' */\n' ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( css_dest ) )
		.pipe( notify( {
			title: 'Gulp SCSS Task Result:',
			message: 'Files from [/' + SourceSCSS + '/] created in [/' + css_dest + '/].',
			onLast: true
		} ) );
} );

gulp.task( 'watch', () => {
	// Inspect changes in njk files.
	gulp.watch( SourceNJK, gulp.series( 'nunjucks' ) );

	// Inspect changes in ts files.
	gulp.watch( SourceTS, gulp.series( 'general-scripts' ) );

	// Inspect changes in scss files.
	gulp.watch( SourceSCSS, gulp.series( 'general-scss' ) );
} );

gulp.task( 'default', gulp.parallel( 'watch' ) );
