/**
 * @TODO Only clean defined partner
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var cfg = require('../config/cfg');
var fs = require('fs');
var notify = require("gulp-notify");

//var browserSync = require('browser-sync').create();
require('../config/env');
require('require-dir')('subtasks');

if (gutil.env.partner === 'all')
    gutil.env.partner = '*';
    

/**
 * Build the solution for a developer environment
 */
gulp.task('build-dev', function (callback)
{
    return runSequence(
        'set-env-dev',
        'clean',
        'build.pipeline',
        'bundle.pipeline',
        'dump-git-info',
        function ()
        {
            console.log('Dev build completed');
            notify('Dev build completed');
            callback()
        }
    );
});

/**
 * Build the solution for a production environment
 */
gulp.task('build-release', function (callback)
{
    return runSequence(
        'set-env-release',
        'clean',
        'build.pipeline',
        'prepare-release',
        'bundle.pipeline',
        'dump-git-info',
        function ()
        {
            console.log('Release build completed');
            notify('Release build completed');
            callback()
        }
    );
});

/**
 * Build the solution for a developer environment
 * Start all available watch tasks
 */
gulp.task('watch', function (callback)
{
    return runSequence(
        'set-env-dev',
        'clean',
        'build.pipeline',
        'bundle.pipeline',
        'dump-git-info',
        'watch.pipeline',
        function ()
        {
            console.log('Watcher ready');
            notify('Watcher ready');
            callback();
        }
    );
});

gulp.task('bundle', function (callback)
{

    return runSequence(
        'set-env-dev',
        'bundle.pipeline',
        callback
    );
});

/**
 * Set the environment as development
 */
gulp.task('set-env-dev', function (callback)
{
    gutil.env.env = gutil.env.type.DEV;

    preprocessBuild(function (success)
    {
        if (success)
            callback();
    });
});

/**
 * Set the environment as production
 */
gulp.task('set-env-release', function (callback)
{
    gutil.env.env = gutil.env.type.RELEASE;

    preprocessBuild(function (success)
    {
        if (success)
            callback();
    });
});

gulp.task('dump-git-info', function (callback)
{

    var dir = cfg().path.output + 'Internal/';

    if (!fs.existsSync(dir))
    {
        fs.mkdirSync(dir);
    }

    if (!fs.existsSync(cfg().path.output + 'DumpGitInfo.bat'))
        fs.writeFileSync(cfg().path.output + 'DumpGitInfo.bat', fs.readFileSync('../Website.Template/DumpGitInfo.bat'));

    if (!fs.existsSync(cfg().path.output + 'GitCfg.bat'))
        fs.writeFileSync(cfg().path.output + 'GitCfg.bat', fs.readFileSync('../Website.Template/GitCfg.bat'));

    var exec = require('child_process').exec;
    //cfg().path.output + 'DumpGitInfo.bat
    exec('cd ' + cfg().path.output + ' & DumpGitInfo.bat ',
        function (err, stdout, stderr)
        {

            console.log(stdout);
            console.log(stderr);
            callback(err);
        });
});

function preprocessBuild(handler)
{

    parseConfig(function (success)
    {
        if (success)
            verifyPartner(handler);
    });
}

function parseConfig(handler)
{

    // Is there a partner config file ?

    if (!fs.existsSync('./g1config.json'))
        fs.writeFileSync('./g1config.json', JSON.stringify({}, null, 4));

    cfg();
    handler(true);
}

function verifyPartner(handler)
{
    var isValid = true;
    if (!gutil.env.partner)
        isValid = false;

    gutil.log(gutil.colors.yellow('validating partner path "' + cfg().path.app + 'partners/' + gutil.env.partner + '/default/shell.ts"'));
    fs.stat(cfg().path.app + 'partners/' + gutil.env.partner + '/default/shell.ts', function (err, stat)
    {
        if (err !== null)
            isValid = false;

        if (gutil.env.partner === '*')
            isValid = true;

        if (isValid)
            gutil.log(gutil.colors.green('Valid partner found'));
        else
        {
            gutil.log(gutil.colors.red('No valid partner defined.'));
            gutil.log(gutil.colors.yellow('provide --partner {partner_name}'));
            gutil.log(gutil.colors.yellow('ie gulp watch --partner circus_be'));
        }

        handler(isValid);
    });
}