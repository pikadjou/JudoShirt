var gutil = require('gulp-util');
var fs = require('fs');
var cached_cfg;
var env;

function prepare(env)
{
    // Create or update (if it already exist) the user config
    var user_config = require('./user.default.json');
    /*var user_preferences = require('../../g1config.json');
    Object.assign(user_config, user_preferences);
    fs.writeFileSync('g1config.json', JSON.stringify(user_config, null, 4));*/

    // SASS Include list
    var sass_src = [
        env.workspaceDir + 'sass/**/*.scss',
        '!' + env.workspaceDir + 'sass/!(default|' + gutil.env.partner + '|circus)/**/*.scss',
        // '!' + env.workspaceDir + 'sass/{' + sass_exclude.join(',') + '}/**',
        '!' + env.workspaceDir + 'sass/**/_*.scss'
    ];

    // NON-AMD sources
    var nonAmdSources = [
        /*env.appRoot + 'app/core/App.ts',
        env.appRoot + 'app/core/AppConfig.ts',
        env.appRoot + 'app/core/lib.ts',
        env.appRoot + 'app/util/AppCache.ts',
        env.appRoot + 'app/util/AppSignals.ts',
        env.appRoot + 'app/util/Logger.ts'*/
    ];

    // AMD Modules sources
    var allSources = [env.appRoot + '**/*.ts'];

    var nonAmdSourcesExclusions = [];
    /*// Exclude non-amd sources from AMD sources
    for (var i = 0, len = nonAmdSources.length; i < len; i++)
        nonAmdSourcesExclusions.push('!' + nonAmdSources[i]);
*/
    return (cached_cfg && cached_cfg.env === env) ? cached_cfg : (cached_cfg = {
        user: user_config,
        minify_js: env.minify_js,
        minify_html: env.minify_html,
        minify_img: env.minify_img,
        minify_css: env.minify_css,
        bundle: env.bundle,
        path: {
            root: env.workspaceDir,
            assetsRoot: env.assetsRoot,
            app: env.appRoot + 'src/',
            allSources: allSources,
            nonAmdSources: nonAmdSources,
            nonAmdSourcesExclusions: nonAmdSourcesExclusions,
            html: [env.appRoot + '**/*.html'],
            scss_watch: sass_src.slice(0, -1),
            scss: sass_src,
            //scssLib: env.workspaceDir + 'sass/_lib/',
            images: [env.assetsRoot + 'content/pictures/**/*'],
            lib: env.appRoot + 'lib/**/*.js',
            libAssets: [env.appRoot + 'lib/**/*', '!' + env.appRoot + 'lib/**/*.js'],
            sourceRoot: env.appRoot,
            output: env.outputRoot,
            outputDist: env.outputRoot + 'Scripts/',
            outputLib: env.outputRoot + 'Scripts/lib/',
            outputBundle: env.outputRoot + 'Scripts/bundle/',
            outputSrc: env.outputRoot + 'Scripts/src/',
            outputContent: env.outputRoot + 'Content/',

            // release
            releaseCopy: [
                // All content
                env.assetsRoot + 'Content/*/**/*',
                env.assetsRoot + 'TranslationPacks/**/*.tpack',
                // Remove images
                '!' + env.assetsRoot + 'Content/*/*/pictures/**/*',
                // Remove css
                '!' + env.assetsRoot + 'Content/**/*.css'
            ]
        },
        env: env,
        export: {
            scripts: [env.appRoot + '**/*.tpl']
        }
    });
}
module.exports = prepare;