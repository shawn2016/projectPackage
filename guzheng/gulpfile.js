gulp = require('gulp'),
    gzip = require('gulp-zip'),
    minifyJS = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    minifyHTML = require('gulp-htmlmin'),
    imageMin = require('gulp-imagemin'),
    deleteFile = require('del'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'), //解析HTML文件替换未经优化的脚本和样式表。
    browserSync = require('browser-sync').create(),
    replace = require('gulp-replace');
argv = require('yargs').argv;
sass = require('gulp-sass');
Revall = require('gulp-rev-all');

revall = new Revall({
    dontRenameFile: [/^\/index\.html$/g],
    dontSearchFile: [/^\/lib\**\/.*/g],
    transformFilename: function (file, hash) {
        return hash + file.path.slice(file.path.lastIndexOf('.'));
    }
});

gulp.task('clean', function () {
    return deleteFile(['build', 'dist', 'app/lib/jquery/external', 'app/lib/jquery/src']);
});

gulp.task('requirejs', ['clean', 'serverUrl'], requirejs);

gulp.task('cssRef', ['requirejs'], function () { //单独提出这块 是为了不影响图片的压缩
    return gulp.src(['build/**.html'])
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(gulp.dest('build'))

});

gulp.task('sass', function () {
    return gulp.src('./app/assets/css/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/assets/css/scssbuild'));
});
gulp.task('sass_', function () {
    console.log('sass_')
    return gulp.src('./app/assets/css/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/assets/css'));
});
gulp.task('concatcss', ['sass'], function () {
    return gulp.src(['app/assets/css/scssbuild/**.css'])
        // .pipe(concat('webApp.css'))
        .pipe(gulp.dest('app/assets/css'))

});
gulp.task('compress', ['requirejs'], function () {
    return gulp.src(['build/**'])
        .pipe(gulpif('*.js', minifyJS()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(gulpif('*.html', minifyHTML({
            removeComments: true,
            collapseWhitespace: true
        })))
        // .pipe(gulpif('**!/!*.{png,jpg,gif}', imageMin({
        //     optimizationLevel: 5,
        //     progressive: true,
        //     interlaced: true,
        //     multipass: true
        // })))

        .pipe(gulp.dest('build'))
});
var serverAddress = "121.40.68.47:8145"; //默认开发地址 gulp --test/gulp --prod
gulp.task('serverUrl', function () {
    var updateAddress;
    //gulp.env.prod
    if (argv.PROD) {
        updateAddress = "120.26.219.69:8145";
    } else if (argv.TEST58) {
        updateAddress = "123.56.79.58:8145";
    } else if (argv.TEST211) {
        updateAddress = "121.52.221.211:8145";
    } else if (argv.TEST116) {
        updateAddress = "120.26.203.116:8145";
    } else if (argv.TEST59) {
        updateAddress = "121.40.126.59:8145";
    } else if (argv.UAT) {
        updateAddress = "120.26.100.69:8145";
    } else {
        updateAddress = serverAddress;
    }
    return gulp.src(['app/config.js'])
        .pipe(replace(serverAddress, updateAddress))
        .pipe(gulp.dest('app'));
});

gulp.task('copy', ['requirejs']);

gulp.task('default', ['clean', 'sass', 'concatcss', 'cssRef', 'compress', 'copy'], md5);
//gulp.task('default', ['clean', 'sass', 'concatcss', 'cssRef', 'compress', 'copy'], md5);

/*function copy() {
 return gulp.src([
 'build/!**!/!*',
 '!build/!**!/!*.{js,css,html}',
 ])
 .pipe(gulp.dest('build'));
 }*/

gulp.task('buildzip', ['default'], buildZip)

function buildZip() {
    setTimeout(function () {
        return gulp.src('dist/**')
            .pipe(gzip('dist.zip'))
            .pipe(gulp.dest('./'))
    }, 2000)
}

function md5() {
    return gulp.src('build/**')
        .pipe(revall.revision())
        .pipe(gulp.dest('dist'))
}

function requirejs(done) {
    var r = require('requirejs');
    r.optimize({
        appDir: 'app',
        baseUrl: './',
        dir: 'build',
        optimize: 'none',
        optimizeCss: 'none',
        removeCombined: true,
        mainConfigFile: 'app/main.js',
        modules: [{
            name: "main"
        }],
        logLevel: 1
    }, function () {
        done();
    });
}
gulp.task('run', function () {
    gulp.run(['concatcss', 'sass_'])
    browserSync.init({
        server: 'app',
        port: 3032
    });
    gulp.watch('app/assets/css/scss/**/*.scss', ['sass', 'sass_', 'concatcss']);
    gulp.watch("app/**/*.{js,css,html,scss}").on('change', browserSync.reload);
    gulp.watch("app/**/**/*.{js,css,html,scss}").on('change', browserSync.reload);

});