var gulp = require('gulp');
var scss = require('gulp-sass');
var browsersync= require('browser-sync').create();
var reload = browsersync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
//var rjs = require('gulp-requirejs');
//var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
//var rename = require('gulp-rename');
//var clean = require('gulp-clean');
//var rev = require('gulp-rev');
//var revReplace = require('gulp-rev-collector');
var gulp_webpack = require('gulp-webpack');
var webpack= require('webpack');
var webpack_config = require('./webpack.config.js');

gulp.task('start',['sass'],function() {
    browsersync.init({
        server:{baseDir:'./'},
        startPath:'./html/index.html'
    });

    gulp.watch('scss/*.scss',['sass']);
    gulp.watch('html/*.html').on('change',reload);
    gulp.watch('img/*.jpg').on('change',reload);
    gulp.watch('js/*.js').on('change',['_webpack']);
    gulp.watch('component/*.js').on('change',['_webpack']);
});

gulp.task('_webpack',function(){
    gulp.start(webpack);
});


gulp.task('sass',function(){
    gulp.src('src/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss())
        .on('error',function(err){
            console.log(err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream:true}))
});

gulp.task('test',['buildjs'],function(){
    return gulp.src('src/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(gulp.dest('test/css'))
        .pipe(minCss())
        .pipe(gulp.dest('test/min'));
});

gulp.task('minjs',function(){
    return rjs({
        baseUrl:'./src',
        name:'lib/almond',
        include:['main'],
        out:'main.min.js',
        paths:{
            'jquery':'lib/jquery',
            'swiper':'lib/swiper',
            'fastclick':'lib/fastclick',
            'template':'lib/template-native'
        }
    })
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});
gulp.task('mincss',function(){
    return gulp.src('src/css/main.css')
        .pipe(minCss())
        .pipe(rename('main.min.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(''))
});
gulp.task('rev-replace',function(){
    return gulp.src(['rev-manifest.json','src/html/*.html'])
        .pipe(revReplace({
            replaceReved: true,
            dirReplacements: {
                '../../dist/css': '../css/'
            }
        }))
        .pipe(gulp.dest('dist/html'))
});
gulp.task('copyimg',function(){
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});
gulp.task('clean',function(){
    gulp.src('dist/*',{read:false}).pipe(clean())
});
gulp.task('build',['rev-replace','minjs','mincss','copyimg']);