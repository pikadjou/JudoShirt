var gulp = gulp = require('gulp');
var gulpif;
var merge;
var gutil;
var changed;
//var cache;
//var filter;
var debug;
// Plumber ensure the task does not crash 
var plumber;
var sourcemaps;
var runSequence;

var cfg;

var tsc;
var sourcemaps;
var tsProject;
var isolatedTsProject;


/**
 * Entry point for build task, contain the whole build pipeline
 */
gulp.task('build.pipeline', function (callback)
{
    gulpif = require('gulp-if');
    merge = require('merge-stream');
    gutil = require('gulp-util');
    //filter = require('gulp-filter');
    tsc = require("gulp-typescript");
    sourcemaps = require('gulp-sourcemaps');
    tsProject = tsc.createProject('tsconfig.json');
    isolatedTsProject = tsc.createProject('tsconfig.json', {
        isolatedModules: true
    });

    changed = require('gulp-changed');
    //cache = require('gulp-cached');

    debug = require('gulp-debug');
    // Plumber ensure the task does not crash 
    plumber = require('gulp-plumber');
    runSequence = require('run-sequence');

    cfg = require('../../config/cfg');

    return runSequence(
        ['build-system', 'build-html', 'build-sass'], ['copy-system', 'copy-sass-src', 'copy.export', 'copy.lib', 'copy.lib.assets'],
        callback
    );
});

/**
 * Process {typescript}
 */
gulp.task('build-system', function ()
{
    return _processSystem(_preProcessSystem(
        require('../../../tsconfig.json').filesGlob.concat(cfg().path.allSources),
        false
    ));
});

gulp.task('build-system-incremental', function () 
{
    console.log(cfg().path.allSources.concat(cfg().path.nonAmdSourcesExclusions));
    return merge(
        _processSystem(_preProcessSystem(
            cfg().path.allSources.concat(cfg().path.nonAmdSourcesExclusions),
            true, true
        )),
        _processSystem(_preProcessSystem(
            require('../../../tsconfig.json').filesGlob.concat(cfg().path.nonAmdSources),
            false, false
        ))
    );
});


function _preProcessSystem(sources, incremental, isolated) 
{
    return gulp.src(sources, { base: cfg().path.sourceRoot })
        .pipe(plumber())
        //.pipe(gulpif(incremental && !isolated, debug({ title: 'B4 changed ts:' })))
        .pipe(gulpif(incremental, changed(cfg().path.outputSrc, {
            extension: '.ts'
        })))
        //.pipe(gulpif(incremental && !isolated, debug({ title: 'changed ts:' })))
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // This means sourcemaps will be generated 
        .pipe(isolated ? isolatedTsProject() : tsProject())
        ;
}

function _processSystem(results)
{
    var uglify = require('gulp-uglify')().on('error', function (e)
    {

        gutil.log(gutil.colors.red('JS Parse ERROR: ' + e.fileName));
        gutil.log(gutil.colors.yellow(e.message));
        //uglify.end();
    });

    return results.js
        .pipe(plumber())
        //.pipe(debug({ title: 'js:' }))
        .pipe(gulpif(cfg().minify_js === true, uglify))
        // Now the sourcemaps are added to the .js file 
        .pipe(sourcemaps.write('.', {
            sourceMappingURL: function (file)
            {
                return '/Templates/Scripts/' + file.relative + '.map';
            },
            includeContent: false,
            sourceRoot: '/' + cfg().path.sourceRoot
        }))
        // Output results
        .pipe(gulp.dest(cfg().path.outputDist));
}

/**
 *  Process {html}
 */
gulp.task('build-html', function ()
{
    var htmlmin = require('gulp-htmlmin')({
        collapseWhitespace: true
    }).on('error', function (e)
    {

        gutil.log(gutil.colors.red('Html Parse ERROR: ' + e.fileName));
        gutil.log(gutil.colors.yellow(e.message));
        //htmlmin.end();
    });

    return gulp.src(cfg().path.html, {
        base: cfg().path.sourceRoot
    })
        .pipe(plumber())
        // Filter changed files
        .pipe(changed(cfg().path.outputDist, {
            extension: '.html'
        }))
        // HTML min
        .pipe(gulpif(cfg().minify_html === true, htmlmin))
        // Output results
        .pipe(gulp.dest(cfg().path.outputDist));
});

/**
 * Process {scss}
 */
gulp.task('build-sass', function ()
{
    var cleanCSS = require('gulp-clean-css');
    var sass = require('gulp-sass');
    return gulp.src(cfg().path.scss)
        .pipe(plumber())
        //.pipe(debug({title: 'scss:'}))
        // Filter changed files
        //.pipe(changed(cfg().path.outputContent))
        .pipe(gulpif(gutil.env.env === gutil.env.type.DEV, sourcemaps.init()))
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [cfg().path.scssLib]
        }).on('error', sass.logError))
        // Minify css
        .pipe(gulpif(cfg().minify_css === true, cleanCSS({
            compatibility: 'ie8'
        })))
        .pipe(gulpif(gutil.env.env === gutil.env.type.DEV, sourcemaps.write('.', {
            sourceMappingURL: function (file)
            {
                return '/Templates/Content/' + file.relative + '.map';
            },
            includeContent: false,
            sourceRoot: '/' + cfg().path.sourceRoot + 'sass/'
        })))
        // Output results
        .pipe(gulp.dest(cfg().path.outputContent));
});

/**
 *  Copy javascript files to the output directory
 */
gulp.task('copy-system', function ()
{

    return gulp.src(cfg().path.allSources)
        .pipe(plumber())
        // Filter changed files
        .pipe(changed(cfg().path.outputSrc))
        // Output results
        .pipe(gulp.dest(cfg().path.outputSrc));
});

/**
 *  Copy javascript files to the output directory
 */
gulp.task('copy-sass-src', function ()
{

    return gulp.src(cfg().path.scss_watch)
        .pipe(plumber())
        // Filter changed files
        .pipe(changed(cfg().path.outputSrc + 'sass/'))
        // Output results
        .pipe(gulp.dest(cfg().path.outputSrc + 'sass/'));
});

/**
 *  Copy libraries to the output directory
 */
gulp.task('copy.lib', function ()
{

    var uglify = require('gulp-uglify')().on('error', function (e)
    {
        gutil.log(gutil.colors.red('JS Parse ERROR: ' + e.fileName));
        gutil.log(gutil.colors.yellow(e.message));
        //uglify.end();
    });

    return gulp.src(cfg().path.lib)
        .pipe(plumber())
        // Filter changed files
        .pipe(changed(cfg().path.outputLib, {
            extension: '.js'
        }))
        // Minify js
        //.pipe(debug({ title: 'lib:' }))
        .pipe(gulpif(cfg().minify_js === true, uglify))
        // Output results
        .pipe(gulp.dest(cfg().path.outputLib));
});
gulp.task('copy.lib.assets', function ()
{
    return gulp.src(cfg().path.libAssets)
        .pipe(plumber())
        // Filter changed files
        .pipe(changed(cfg().path.outputLib))
        //.pipe(debug({ title: 'libAssets:' }))
        // Output results
        .pipe(gulp.dest(cfg().path.outputLib));
});
gulp.task('copy.export', function ()
{
    return gulp.src(cfg().export.scripts, { base: cfg().path.appRoot })
        .pipe(plumber())
        // Filter changed files
        //.pipe(debug({ title: 'libAssetsb4:' }))
        .pipe(changed(cfg().path.outputDist))
        //.pipe(debug({ title: 'libAssets:' }))
        // Output results
        .pipe(gulp.dest(cfg().path.outputDist));
});