var gulp = require('gulp');
var plumber;
var debug;
var gulpif;
var runSequence;
var changed;
var cfg;
var bundles;
var rjs;
var fs;
var glob;
var path;
var root;
var util;

// calls the listed sequence of tasks in order
gulp.task('bundle.pipeline', function (callback)
{
    cfg = require('../../config/cfg');

    if (cfg().bundle === false)
    {
        console.log('Skipping bundling, disabled in env.')
        return callback();
    }

    plumber = require('gulp-plumber');
    debug = require('gulp-debug');
    runSequence = require('run-sequence');
    //gulpif = require('gulp-if');
    //changed = require('gulp-changed');
    bundles = require('../../config/bundles.js')();
    rjs = require('requirejs');
    fs = require('fs')
    glob = require('glob');
    path = require('path');
    root = path.resolve(bundles.baseUrl);
    util = require('util');

    return runSequence(
        'bundle-services',
        //'update-requirejs-config',
        callback
    );
});
gulp.task('bundle-services', function (callback)
{
    prepareConfig(bundles);
    //console.log('Bundles modules', bundles.modules);

    bundles.onModuleBundleComplete = onModuleBundleComplete;

    rjs.optimize(bundles, function (buildResponse)
    {
        //console.log('build response', buildResponse);
        callback();
    }, callback);
    //console.log('bundles', bundles);
});

gulp.task('update-requirejs-config', function (callback)
{
    var boot = fs.readFileSync(cfg().path.outputDist + 'app/boot.js', { encoding: 'utf8' });
    var boot_regex = new RegExp(/([\s\S.]*?require\.config\({)([\s\S.]*?)(}\);[\s\S.]*)/gm);

    // Isolate require config
    var boot_require = boot.replace(boot_regex, '$2');

    // Remove previous bundle config (if any)
    boot_require = boot_require.replace(new RegExp(/(bundles:[\s\S]*?{[\s\S.]*?}\s*:\s*null\s*[,]{0,1})/gm), '');
    // Insert new config
    var boot_require_after = boot_require.replace(new RegExp(/([\s.]*?)(paths:[\s\S.]*?})/gm), '\n    bundles: AppConfig.BUNDLE_ENABLED ? ' + getRequireBundles() + ': null,\n    $2');
    var boot_after = boot.replace(boot_regex, '$1' + boot_require_after + '$3');

    fs.writeFileSync(cfg().path.outputDist + 'app/boot.js', boot_after, { encoding: 'utf8' });

    callback();
});

function onModuleBundleComplete(data)
{
    var mod;
    for (var i = 0, len = bundles.modules.length; i < len; i++)
    {
        mod = bundles.modules[i];
        if (data.name === mod.name && mod.inject === false)
        {
            var gpath = bundles.baseUrl + '/' + data.path;
            var matches = glob.sync(path.resolve(gpath));
            if (matches.length > 0)
            {
                fs.writeFileSync(matches[0], fs.readFileSync(matches[0], { encoding: 'utf8' }).replace(new RegExp(/define\([\S]*?,[\s]*?function\(\){}\);/gm), ''), { encoding: 'utf8' });
            }
            break;
        }
    }
};

function getRequireBundles()
{
    var config = {};

    var mod;
    while (bundles.modules.length > 0)
    {
        mod = bundles.modules.shift();

        if (!mod.hasOwnProperty('inject') || mod.inject === true)
            config[mod.name] = mod.include;
    }

    return JSON.stringify(config).replace(new RegExp(/"/gm), "'");
}
function prepareConfig(bundles)
{
    if (!bundles || !bundles.hasOwnProperty('modules') || !Array.isArray(bundles.modules))
        return null;

    var collection = [];
    var item;
    while (bundles.modules.length > 0)
    {
        results = parseModule(bundles.modules.shift());

        if (results)
            collection = collection.concat(results);
    }
    //console.log('bundle config', collection);
    bundles.modules = collection;
}

function parseModule(item)
{
    if (item.hasOwnProperty('enabled') && item.enabled === false)
        return null;

    if (item.hasOwnProperty('skip') && item.skip === true)
    {
        //console.log('skip item', item);
        return item;
    }
    // path {string} (working directory)
    // name? {string}
    // includes {string} or {[string]}
    // excludes? {[string]}
    //console.log('parseModule', item.path);

    if (item.hasOwnProperty('all') && item.all === true)
    {
        moduleConfig = makeModuleConfig(item);
        return moduleConfig.include.length > 0 ? moduleConfig : null;
    }
    // each match is a separate module
    var matches = glob.sync(bundles.baseUrl + '/' + item.path);

    if (!matches || matches.length <= 0)
        return;

    if (matches.length === 1)
    {
        moduleConfig = makeModuleConfig(item);
        return moduleConfig.include.length > 0 ? moduleConfig : null;
    }

    // Multiple directory matches, bundle each individually
    var sub_item;
    var sub_match;
    var sub_results;
    var relative;
    var results = [];
    while (matches.length > 0)
    {
        relative = path.relative(root, path.resolve(matches.shift())).replace(/\\/g, '/').replace(/\.[^/.]+$/, "");
        sub_item = util._extend({}, item);
        sub_item.path = relative;
        sub_results = parseModule(sub_item);
        if (sub_results)
            results = results.concat(sub_results);
    }

    return results.length > 0 ? results : null;
}

function makeModuleConfig(item)
{
    /*
    console.log('---------------------------')
    console.log('makeModuleConfig', item.path);
*/
    if (item.path.charAt(item.path.length - 1) !== '/')
        item.path += '/';

    var dir = item.path.slice(0, item.path.length - 1);


    item.name = item.hasOwnProperty('outputName') ? item.outputName : (item.path + (item.hasOwnProperty('name') ? item.name : dir.split('/').pop() + '.bundle').toString());
    //console.log('name', item.name);
    item.create = true;

    var include = [];

    if (!Array.isArray(item.include))
        item.include = [item.include];

    while (item.include.length > 0)
    {
        var gpath = bundles.baseUrl + '/' + item.path + item.include.shift();
        var matches = glob.sync(path.resolve(gpath));

        /*console.log('includes path', gpath);
        console.log('includes path2', path.resolve(gpath));
        console.log('includes matches', matches);*/

        var match;
        while (matches.length > 0)
        {
            match = matches.shift();
            //console.log('include match', match);
            if (match.indexOf('.bundle') != -1)
                continue;
            /*
                        console.log('path matches', match);
                        console.log('path relative matches', path.relative(root, path.resolve(match)).replace(/\\/g, '/').replace(/\.[^/.]+$/, ""));
            */
            matchInclude = path.relative(root, path.resolve(match)).replace(/\\/g, '/');
            if (!item.hasOwnProperty('all') || item.all === false)
            {
                matchInclude.replace(/\.[^/.]+$/, "");
            }

            include.push(matchInclude);

        }
    }

    if (item.hasOwnProperty('priority') && item.priority && item.priority.length > 0)
    {
        //console.log('path include priority', item.priority);
        //console.log('path include', include);

        for (var i = 0, l = item.priority.length, index = null, temp = null; i < l; i++)
        {
            index = include.indexOf(item.priority[i]);
            console.log('path index', index);

            if (index > -1)
            {
                temp = include[i];
                include[i] = include[index];
                include[index] = temp;

            }
        }
    }

    item.include = include;
    delete item.path;

    console.log('path include', item.include);

    return item;
}