const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass')); 

gulp.task("sass", () => {
    gulp.src("./static/style/*.scss")
    
    .pipe(concat("style.min.scss"))

    .pipe(sass({outputStyle: 'compressed'}))

    .pipe(gulp.dest("static/dist"))



}); 

gulp.task('default', gulp.series('sass')); 