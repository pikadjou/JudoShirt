
var gutil = require('gulp-util');
var config = require('./config');

function cfg()
{

    switch (gutil.env.env)
    {
        case gutil.env.type.RELEASE:
            return config(require('./environment/release'))

        case gutil.env.type.DEV:
        default:
            return config(require('./environment/dev'))
    }
}

module.exports = cfg;