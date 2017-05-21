

var gulp = require('gulp');
var debug, gutil, deleteEmpty, cfg, clean, cleanDest, vinylPaths, vp, runSequence;

// deletes all files in the output paths
gulp.task('clean', function (callback)
{
    debug = require('gulp-debug');
    gutil = require('gulp-util');
    deleteEmpty = require('delete-empty');
    cfg = require('../../config/cfg');
    clean = require('gulp-clean');
    vinylPaths = require('vinyl-paths');
    vp = vinylPaths();
    runSequence = require('run-sequence');
    cleanDest = require('gulp-dest-clean');

    return runSequence(
        'clean-files',
        'remove-empty-dir',
        callback
    );
});

gulp.task('clean-files', function ()
{
    return gulp.src([
        cfg().path.outputDist + '**/*.html',
        cfg().path.outputDist + '**/*.js',
        cfg().path.outputDist + '**/*.map',
        '!' + cfg().path.outputDist + 'app/partners/!(default|' + gutil.env.partner + ')/**/',
        cfg().path.outputLib,
        cfg().path.outputBundle,
        cfg().path.outputSrc,
        cfg().path.outputContent + '*/*/css'
    ], { read: false })
        //.pipe(debug({title: 'changed:'}))
        .pipe(clean({ force: true }));
});

gulp.task('remove-empty-dir', function ()
{
    var deleted = deleteEmpty.sync(cfg().path.output, { silent: true });
    // print deleted count
    return deleteEmpty.sync(cfg().path.output, { silent: true });
});
