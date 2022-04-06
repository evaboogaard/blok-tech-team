const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass')); 

gulp.task("sass", () => {

    // searches for all the scss files
    gulp.src("./static/style/*.scss")
    
    // puts it all in one file
    .pipe(concat("style.min.scss"))

    // compresses all of the code 
    .pipe(sass({outputStyle: 'compressed'}))

    // stores the file in to a directory in static 
    .pipe(gulp.dest("static/dist"))

}); 

gulp.task('default', gulp.series('sass')); 