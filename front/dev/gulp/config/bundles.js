var cfg;
function prepare()
{
    cfg = require('./cfg');

    // Uses require js optimizer: http://requirejs.org/docs/optimization.html
    // Api doc: https://github.com/requirejs/r.js/blob/master/build/example.build.js

    return {
        //By default, all modules are located relative to this path. If baseUrl
        //is not explicitly set, then all modules are loaded relative to
        //the directory that holds the build file. If appDir is set, then
        //baseUrl should be specified as relative to the appDir.
        baseUrl: cfg().path.output + '/Scripts',

        //The directory path to save the output. If not specified, then
        //the path will default to be a directory called "build" as a sibling
        //to the build file. All relative paths are relative to the build file.
        dir: cfg().path.output + '/Scripts',

        //How to optimize all the JS files in the build output directory.
        //Right now only the following  values
        //are supported:
        //- "uglify": (default) uses UglifyJS to minify the code.
        //- "uglify2": in version 2.1.2+. Uses UglifyJS2.
        //- "closure": uses Google's Closure Compiler in simple optimization mode to minify the code.
        // Only available if running the optimizer using Java.
        //- "closure.keepLines": Same as closure option, but keeps line returns in the minified files.
        //- "none": no minification will be done.
        optimize: "none",

        //As of RequireJS 2.0.2, the dir above will be deleted before the
        //build starts again. If you have a big build and are not doing
        //source transforms with onBuildRead/onBuildWrite, then you can
        //set keepBuildDir to true to keep the previous dir. This allows for
        //faster rebuilds, but it could lead to unexpected errors if the
        //built code is transformed in some way.
        keepBuildDir: true,

        //Introduced in 2.1.11. As part of fixing a bug to prevent possible
        //overwrites of source code, https://github.com/jrburke/r.js/issues/444,
        //it prevented some cases where generated source is used for a build, and
        //it was OK to overwrite content in this source area as it was generated
        //from another source area, and not allowing source overwrites meant taking
        //another file copy hit. By setting this to true, it allows this sort of
        //source code overwriting. However, use at your own risk, and be sure you
        //have your configuration set correctly. For example, you may want to
        //set "keepBuildDir" to true.
        allowSourceOverwrites: true,

        //If skipModuleInsertion is false, then files that do not use define()
        //to define modules will get a define() placeholder inserted for them.
        //Also, require.pause/resume calls will be inserted.
        //Set it to true to avoid this. This is useful if you are building code that
        //does not use require() in the built project or in the JS files, but you
        //still want to use the optimization tool from RequireJS to concatenate modules
        //together.
        skipModuleInsertion: false,

        //If set to true, any files that were combined into a build bundle will be
        //removed from the output folder.
        removeCombined: false,

        //Set paths for modules. If relative paths, set relative to baseUrl above.
        //If a special value of "empty:" is used for the path value, then that
        //acts like mapping the path to an empty file. It allows the optimizer to
        //resolve the dependency to path, but then does not include it in the output.
        //Useful to map module names that are to resources on a CDN or other
        //http: URL when running in the browser and during an optimization that
        //file should be skipped because it has no dependencies.
        //e.g. if you wish to include `jquery` and `angularjs` from public CDNs,
        //paths: { "jquery": "empty:", "angular": "empty:" }
        paths: {/*
            'lz-string': '../lib/lz-string',
            'knockout': '../lib/knockout-3.2.0',
            'network/adapter/default': 'network/adapter/integrated',
            'network/connector/default': 'network/connector/SpikeConnector',

            'foundation': '../lib/foundation/foundation',
            'foundation.abide': '../lib/foundation/foundation.abide',
            'foundation.accordion': '../lib/foundation/foundation.accordion',
            'foundation.alert': '../lib/foundation/foundation.alert',
            'foundation.clearing': '../lib/foundation/foundation.clearing',
            'foundation.dropdown': '../lib/foundation/foundation.dropdown',
            'foundation.equalizer': '../lib/foundation/foundation.equalizer',
            'foundation.interchange': '../lib/foundation/foundation.interchange',
            'foundation.joyride': '../lib/foundation/foundation.joyride',
            'foundation.magellan': '../lib/foundation/foundation.magellan',
            'foundation.offcanvas': '../lib/foundation/foundation.offcanvas',
            'foundation.orbit': '../lib/foundation/foundation.orbit',
            'foundation.reveal': '../lib/foundation/foundation.reveal',
            'foundation.slider': '../lib/foundation/foundation.slider',
            'foundation.tab': '../lib/foundation/foundation.tab',
            'foundation.tooltip': '../lib/foundation/foundation.tooltip',
            'foundation.topbar': '../lib/foundation/foundation.topbar',
            'slick': '../lib/slick.min',
            'spike': '../lib/spike-sdk.js.src',
            'durandal': '../lib/durandal',
            'plugins': '../lib/durandal/plugins',
            'text': '../lib/text',
            'jquery': '../lib/jquery-2.1.1.min',
            'jquery.ui': '../lib/jquery-ui-1.9.0.min',
            'jquery.cookiecuttr': '../lib/jquery.cookiecuttr',
            'jquery.cookie': '../lib/foundation/jquery.cookie'*/
        },

        //List the modules that will be optimized. All their immediate and deep
        //dependencies will be included in the module's file when the build is done.
        modules: [
            //Website bundle
            {
                enabled: true,
                inject: false,
                path: 'lib/',
                name: 'lib.bundle',
                outputName: "lib/lib.bundle",
                include: [
                    '/jquery/jquery.js',
                    '/signals/signal.js',
                    '/angular/angular.js',
                    '/angular/angular-route.js',
                    '/angular/angular-sanitize.js',
                    '/iframe/iframeResizer.js',
                    '/angulartics/angulartics.js',
                    '/angulartics/gtm.js'
                ]
            },
            //Bundle all files in each services directory
            {
                enabled: true,
                all: true,
                inject: false,
                path: 'services/**/',
                include: '*.js',
                name: 'services.bundle',
                outputName: "services/services.bundle",
                priority: [
                    'services/Users/UsersRequestHandler.js',

                ]
            },
            {
                enabled: true,
                all: true,
                inject: false,
                path: 'app/**/',
                include: '*.js',
                name: 'app.bundle',
                outputName: "app/app.bundle",
                priority: [
                    'app/shell.js',
                    'app/Lib.js'
                ]
            },
            /*{
                enabled: true,
                all: true,
                path: 'lib/**',
                include: '*.js',
                name: 'lib.bundle',
                outputName: "lib/lib.bundle",
                exclude: []
    },*/
            {
                enabled: true,
                all: true,
                inject: false,
                path: 'tools/**/',
                include: '*.js',
                name: 'tools.bundle',
                outputName: "tools/tools.bundle",
                exclude: []
            }
        ]
    }
}

module.exports = prepare;