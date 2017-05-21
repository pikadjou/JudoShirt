
var gulp = require('gulp');
 
gulp.task('lint', function() {
  var tslint = require('gulp-tslint');
  var cfg = require('../../config/cfg');
  return gulp.src(cfg().path.source)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});