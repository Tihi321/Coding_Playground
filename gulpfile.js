var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename'); 
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

//script paths
var jsFiles = [
				'src/js/first.js', 
				'src/js/globals.js',
				'src/js/helper_classes.js',
				'src/js/layout.js',
				'src/js/codemirror-implementation.js',
				'src/js/updateiframe.js',
				'src/js/header.js',
				'src/js/windows.js',
				'src/js/section.js',
				'src/js/footer.js',
				'src/js/projects.js',
				'src/js/savelocal.js',
				'src/js/media-queries.js',
				'src/js/keypress.js',
				'src/js/last.js'];

var cssDepFiles = [
				'src/deps/css/codemirror/codemirror.css',
				"src/deps/css/codemirror/addons/lint/lint.css",
				'src/deps/css/codemirror/themes/ambiance.css', 
				'src/deps/css/codemirror/addons/hint/show-hint.css',
				'src/deps/css/codemirror/addons/display/fullscreen.css', 
				'src/deps/css/codemirror/addons/scroll/simplescrollbars.css',
				'src/deps/css/codemirror/addons/fold/foldgutter.css',
				'src/deps/css/codemirror/inlet.css',
				'src/deps/css/codemirror/addons/dialog/dialog.css',
				'src/deps/css/codemirror/addons/dialog/matchesonscrollbar.css'];

var jsDepCodemirrorFull = [
				'dist/js/libraries/codemirror/mode/javascript/javascript.js',
				'dist/js/libraries/codemirror/mode/xml/xml.js',
				'dist/js/libraries/codemirror/mode/css/css.js',
				'dist/js/libraries/codemirror/mode/htmlmixed/htmlmixed.js',
				'dist/js/libraries/codemirror/mode/sass/sass.js',
				'dist/js/libraries/codemirror/addon/display/fullscreen.js',
				'dist/js/libraries/codemirror/addon/scroll/simplescrollbars.js',
				'dist/js/libraries/codemirror/addon/scroll/scrollpastend.js',
				'dist/js/libraries/codemirror/addon/edit/closetag.js',
				'dist/js/libraries/codemirror/addon/edit/matchtags.js',
				'dist/js/libraries/codemirror/addon/edit/matchbrackets.js',
				'dist/js/libraries/codemirror/addon/edit/closebrackets.js',
				'dist/js/libraries/codemirror/addon/selection/active-line.js',
				'dist/js/libraries/codemirror/addon/fold/foldcode.js',
				'dist/js/libraries/codemirror/addon/fold/foldgutter.js',
				'dist/js/libraries/codemirror/addon/fold/brace-fold.js',
				'dist/js/libraries/codemirror/addon/fold/xml-fold.js',
				'dist/js/libraries/codemirror/addon/fold/comment-fold.js',
				'dist/js/libraries/codemirror/javascripts/code-completion.js',
				'dist/js/libraries/codemirror/javascripts/css-completion.js'];

var jsDepCodemirrorFull2 = [
				'dist/js/libraries/codemirror/util/formatting.js',
				'dist/js/libraries/codemirror/addon/search/searchcursor.js',
				'dist/js/libraries/codemirror/addon/search/search.js',
				'dist/js/libraries/codemirror/addon/scroll/scrollpastend.js',
				'dist/js/libraries/codemirror/addon/dialog/dialog.js',
				'dist/js/libraries/codemirror/addon/comment/comment.js',
				'dist/js/libraries/codemirror/addon/wrap/hardwrap.js',
				'dist/js/libraries/codemirror/addon/hint/show-hint.js',
				'dist/js/libraries/codemirror/addon/hint/xml-hint.js',
				'dist/js/libraries/codemirror/addon/hint/html-hint.js',
				'dist/js/libraries/codemirror/addon/lint/lint.js',
				'dist/js/libraries/codemirror/addon/lint/javascript-lint.js',
				'dist/js/libraries/codemirror/addon/lint/css-lint.js',
				'dist/js/libraries/codemirror/addon/hint/javascript-hint.js',
				'dist/js/libraries/codemirror/addon/htmlPalette.js',
				'dist/js/libraries/codemirror/addon/cssPalette.js',
				'dist/js/libraries/codemirror/addon/jsPalette.js',
				'dist/js/libraries/codemirror/keymap/sublime.js'];

var jsDest = 'docs/js';
var cssDest = 'docs/css';
var sassSrcPath = 'src/sass/**/*.scss';
var imageSrcPath = 'src/images/*';
var imageDest = 'docs/images';

// convert sass styles into css and create sourcemaps for it
gulp.task('css',function(){
	return gulp.src(sassSrcPath)
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest(cssDest))
	.pipe(browserSync.stream())
});


// create bundle of css dependencies
gulp.task('bundlecss', function () {
  return gulp.src(cssDepFiles)
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest(cssDest));
});



// copy images and minifies it
gulp.task('images', function(){
	return gulp.src(imageSrcPath)
	.pipe(imagemin())
	.pipe(gulp.dest(imageDest))
});

// copies html files on change
gulp.task('copy', function(){
	return gulp.src('src/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.stream())
});

// sets direstory for browsersync
gulp.task('browserSync',function(){
	browserSync.init({
		server: {
			baseDir: 'docs'
		}
	})
});

// concatenates js dependecies and minifies them
gulp.task('dep-scripts-min', function() {  
    return gulp.src(jsDepCodemirrorFull2)
        .pipe(concat('cmbundle2.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/libraries/codemirror'));
});

// concatenates js dependecies and minifies them
gulp.task('dep-scripts', function() {  
    return gulp.src(jsDepCodemirrorFull)
        .pipe(concat('cmbundle.js'))
        .pipe(gulp.dest('dist/js/libraries/codemirror'));
});


// concatenates js files and minifies them
gulp.task('scripts-min', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter())
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(browserSync.stream());
});

gulp.task('jshint', function() {  
    return gulp.src(jsFiles)
    .pipe(concat('hint-js.js'))
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('script-min', function() {  
    return gulp.src('dist/js/libraries/codemirror/inlet.js')
        .pipe(rename('inlet.min2.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/libraries/codemirror'));
});


gulp.task('watch', ['browserSync', 'css'], function(){
	gulp.watch('src/sass/**/*.scss', ['css']);
	gulp.watch('src/*.html', ['copy']);
	gulp.watch('src/js/*.js', ['scripts-min']);
});

