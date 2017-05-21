var gulp = require('gulp');
var debug;
var runSequence;
var plumber;
var changed;
var args;
var cfg;
var gulpif;

// calls the listed sequence of tasks in order
gulp.task('prepare-release', function (callback)
{
    runSequence = require('run-sequence');
    plumber = require('gulp-plumber');
    changed = require('gulp-changed');
    args = require('../../config/args');
    cfg = require('../../config/cfg');
    debug = require('gulp-debug');
    gulpif = require('gulp-if');

    return runSequence(
        'optimize-image',
        'optimize-copy',
        //'bump-version',
        //'changelog',
        callback
    );
});

// utilizes the bump plugin to bump the
// semver for the repo
gulp.task('bump-version', function ()
{
    var bump = require('gulp-bump');
    return gulp.src([cfg().path.workspaceDir + 'package.json'])
        .pipe(bump({
            type: args.bump
        })) //major|minor|patch|prerelease
        .pipe(gulp.dest(cfg().path.output));
});

// generates the CHANGELOG.md file based on commit
// from git commit messages
gulp.task('changelog', function (callback)
{
    var changelog = require('conventional-changelog');
    var fs = require('fs');
    var pkg = JSON.parse(fs.readFileSync(cfg().path.workspaceDir + 'package.json', 'utf-8'));
    return changelog({
        preset: 'angular',
        path: cfg().path.workspaceDir + 'package.json',
        releaseCount: pkg.version
    })
        .pipe(fs.createWriteStream(cfg().path.output + 'CHANGELOG.md'));
});

gulp.task('optimize-image', function ()
{

    var imagemin = require('gulp-imagemin');
    return gulp.src(cfg().path.images)
        .pipe(plumber())
        .pipe(changed(cfg().path.outputContent))
        //.pipe(imagemin())
        .pipe(gulp.dest(cfg().path.outputContent))
});

gulp.task('optimize-copy', function ()
{

    return gulp.src(cfg().path.releaseCopy, {
        base: cfg().path.assetsRoot
    })
        .pipe(plumber())
        .pipe(changed(cfg().path.output))
        //.pipe(debug({ title: 'copy:' }))
        .pipe(gulp.dest(cfg().path.output))
});