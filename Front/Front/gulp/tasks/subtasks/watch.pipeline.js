var gulp = require('gulp');
var runSequence;
var path;
var del;
var cfg;


// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session

gulp.task('watch.pipeline', function (callback)
{
    del = require('del');
    path = require('path');
    cfg = require('../../config/cfg');

    gulp.watch(cfg().path.allSources, { interval: 2000 }, ['watch-system']).on('change', onSourceChanged);
    gulp.watch(cfg().path.html, { interval: 2000 }, ['watch-html']).on('change', onHtmlChanged);
    gulp.watch(cfg().path.scss_watch, { interval: 2000 }, ['watch-scss']).on('change', reportChange);
    callback();
});

gulp.task('watch-system', ['rebuild-system'], reloadBrowser);
gulp.task('watch-html', ['build-html'], reloadBrowser);
gulp.task('watch-scss', ['rebuild-sass'], updateCss);


gulp.task('rebuild-system', function (callback)
{

    runSequence = require('run-sequence');

    return runSequence(
        ['build-system-incremental'],
        ['copy-system'],
        callback
    );
});

gulp.task('rebuild-sass', function (callback)
{

    runSequence = require('run-sequence');

    return runSequence(
        ['build-sass'],
        ['copy-sass-src'],
        callback
    );
});

function onSourceChanged(event)
{
    reportChange(event);

    if (event.type === 'deleted')
    {
        var filePathFromSrc = path.relative(path.resolve(cfg().path.sourceRoot), event.path);
        var destFilePath = path.resolve(cfg().path.outputDist, filePathFromSrc);
        destFilePath = destFilePath.slice(0, destFilePath.length - 2);

        del.sync(destFilePath + 'js', { force: true });
        //console.log('deleted: ' + destFilePath + '(js');
        del.sync(destFilePath + 'js.map', { force: true });
        //console.log('deleted: ' + destFilePath + 'js.map');
    }
}

function onHtmlChanged(event)
{
    reportChange(event);

    if (event.type === 'deleted')
    {
        var filePathFromSrc = path.relative(path.resolve(cfg().path.sourceRoot), event.path);
        var destFilePath = path.resolve(cfg().path.outputDist, filePathFromSrc);

        del.sync(destFilePath, { force: true });
    }
}

// outputs changes to files to the console
function reportChange(event)
{
    console.log(event.type + ': File ' + event.path + ', running tasks...');
}

function reloadBrowser(next)
{
    console.log('task completed');
    //browserSync.reload();
    next();
}

function updateCss(next)
{
    console.log('task completed');
    //browserSync.reload("*.css");
    next();
}