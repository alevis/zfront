const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass');//save
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");//save
const cleanCSS = require('gulp-clean-css');//save
const autoprefixer = require("gulp-autoprefixer");//save
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');//save

var sassOptions = {
    errLogToConsole: true,
    outputStyle: "expanded",
    includePaths: "./node_modules"
};

path = {
    scss: "./public/sass",
    css:  "./public/css",
    img:  "./public/images",
    js:   "./public/scripts"
}

watched = { scss: path.scss + '/*.scss' }

// Compile CSS
function css(){    
    return src( watched.scss )  
        .pipe( plumber() )
        .pipe( sass(sassOptions) )
        .pipe( autoprefixer({ cascade: false }) )        
        .pipe( dest(path.css) ) 
        .pipe( rename({ suffix: ".min" }) )
        .pipe( cleanCSS() )
        .pipe( dest(path.css) )
        .pipe( browserSync.reload({ stream: true }) );
}

// BrowserSync
function bsync(done){
    browserSync.init({
        watch: true,        
        files: [ watched.scss, watched.html ],
        proxy: "localhost:3000",
        port: "4000"
    }); done();
  }

// Nodemon
function nmon(cb){
    var started = false;
    return nodemon({
        script: 'bin/www'
    }).on('start', function(){
        if(!started){
            cb();
            started = true;
        }
    });
}

// Watch files
function watchFiles(done){
    watch( watched.scss, css );
    done();
}

// Start serve before broserSync task
exports.default = series( series(css, watchFiles), nmon, bsync );
