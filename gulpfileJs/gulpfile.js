'use strict';
/**
 * 组件安装
 * npm install gulp gulp-less gulp-sass browser-sync gulp-useref jshint gulp-zip del gulp-changed gulp-concat gulp-htmlmin gulp-if gulp-minify-css gulp-ng-annotate gulp-rev-all gulp-uglify --save-dev
 * gulp
 * gulp-less less编译
 * gulp-sass sass编译
 * browser-sync 浏览器自动刷新
 * del 清理文件
 * gulp-changed 文件变化后执行
 * gulp-concat 合并文件
 * gulp-htmlmin html压缩
 * gulp-if 排除某些文件
 * gulp-minify-css css压缩
 * gulp-rev-all Md5加密
 * gulp-uglify 压缩js
 * gulp-useref 它可以把html里零碎的这些引入合并成一个文件，但是它不负责代码压缩。
 * gulp-zip zip打包
 * jshint 检查js语法
 * gulp-ng-annotate gulp-ng-annotate会帮我们生成带中括号的写法 ，这样子是不是节省了很多重复工作呢？尤其是在注入的服务非常多的时候，可以少写很多代码，并且也不用担心顺序有没有写错。
 *
 * 
 */

var gulp = require('gulp'),
    minifyJS = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create(),
    gzip = require('gulp-zip'),
    deleteFile = require('del'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    ngAnnotate = require('gulp-ng-annotate'),
    zip = require('gulp-zip'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    revall = require('gulp-rev-all');

/*psth*/
var SRC = 'app',
    REQUIREJS = 'app',
    BUILD = 'build',
    DIST = 'dist',
    // StyleLess='less';
    StyleLess='sass';//使用sass切换
    // help帮助
   gulp.task('help',function() {
   console.log('');
   console.log('');
   console.log('------------- 帮助文档 -------------');
   console.log('gulp run            运行');
   console.log('gulp style          压缩css');
   console.log('gulp sass           编译sass');
   console.log('gulp less           编译less');
   console.log('gulp html           js,css压缩');
   console.log('gulp copy           复制静态文件');
   console.log('gulp clean          删除dist文件夹');
   console.log('gulp build          生产打包');
   console.log('gulp zip            生产打包zip');
   console.log('gulp images         复制图片文件（没有压缩文件）');
   console.log('');
   console.log('');
}); 
   
//运行执行
gulp.task('run',[StyleLess],function() {
    browserSync.init({
        server: SRC,
        port:9988
    });
    gulp.watch('./'+REQUIREJS+'/assets/css/less/**/*.less', ['less']); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('./'+REQUIREJS+'/assets/css/scss/**/*.scss', ['sass']); //sass
    gulp.watch(SRC + "/**/*.{js,less,scss,css,html}").on('change', browserSync.reload);
});


gulp.task('script', function() {
    return gulp.src(REQUIREJS + '/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest(BUILD));
});

gulp.task('style', function() {
    return gulp.src(REQUIREJS + '/assets/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./'+REQUIREJS+'/assets/css'));
});

gulp.task('sass', function () {
  gulp.src('./'+REQUIREJS+'/assets/css/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./'+REQUIREJS+'/assets/css'));
});

gulp.task('less', function () {
    gulp.src('./'+REQUIREJS+'/assets/css/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./'+REQUIREJS+'/assets/css'));
});

gulp.task('html', function() {
    return gulp.src('./' + REQUIREJS + '/**/*.html')
        // .pipe(minifyHTML({
        //     removeComments: true,
        //     collapseWhitespace: true
        // }))
        .pipe(useref())// 建议题主好好熟悉一下gulp，这句话有没有不影响gulp执行，但是如果你要用gulp-useref就肯定没效果了。
        .pipe(gulpif('**/*.js', minifyJS()))
        .pipe(gulpif('**/*.css', minifyCSS('assets')))
        .pipe(gulp.dest(BUILD));
});

gulp.task('copy', function() {
    return gulp.src([REQUIREJS + '/**/*',
            '!' + REQUIREJS + '/**/*.{js,css,less,html}',
            '!' + REQUIREJS + '/build.txt'
        ])
        .pipe(gulp.dest(BUILD));
})

gulp.task('clean', function() {
    return deleteFile([BUILD, DIST])
});

gulp.task('images',function(){
    return gulp.src([REQUIREJS + '/assets/images/*',
        ])
        .pipe(gulp.dest(BUILD+'/images/'));
})

//打包生产
gulp.task('build', ['html', 'style', 'script', 'images','copy'], rev);

function rev() {
    return gulp.src(BUILD + '/**')
        .pipe(revall.revision({
        dontRenameFile: [/\.html$/,/lib/],
        dontSearchFile: [/lib/,/^\.\/lib/],
        transformFilename: function(file, hash) {
            return hash + file.path.slice(file.path.lastIndexOf('.'));
        }
    }))
        .pipe(gulp.dest(DIST))
        .on('end', function() {
            deleteFile([BUILD,'dist/assets','dist/common','dist/modules/**/*.js'])
        })


}
//zip打包
gulp.task('zip',['build'],buildZip)
function buildZip(){
    setTimeout(function(){
        return gulp.src(DIST+'/**')
            .pipe(gzip(DIST+'.zip'))
            .pipe(gulp.dest('./'))
    },2000)


}
