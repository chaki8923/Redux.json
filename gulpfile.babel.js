import gulp from 'gulp';
import webpackConfing from './webpack.config.js';
import webpack from 'webpack-stream';
import minifycss from 'gulp-minify-css';
var sass = require('gulp-sass')(require('sass'));
import browserSync from 'browser-sync';
import notify from  'gulp-notify';
import plumber from 'gulp-plumber';


//gulpタスクの作成
//gulp.task()を使っていく
//第一引数に任意の名前、第二引数に実行した処理を関数で書いていく
//関数の中はpipeで処理を繋げていく

const Build = (done) =>{
  gulp.src('src/app.js')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(webpack(webpackConfing))
  .pipe(gulp.dest('dist/js/'))
};

//css圧縮
const minifyCss = (done) =>{
  gulp.src('src/css/*.css')
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css/'));
  done();
}
exports.minifyCss = minifycss;

const BrowseReload = (done) =>{
  browserSync.init({
    server: {
      baseDir: './', //対象ディレクトリ
      index: 'index.html'
    }
  });
  done();
}
exports.BrowseReload = BrowseReload;

const Reload = (done) =>{
  browserSync.reload();
  done();
}

gulp.task('bs-reload', function () {
})

//sassのコンパイル
const compileSass = (done) => {
  gulp.src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    })
    )
    .on('error', sass.logError)
    .pipe(gulp.dest('src/css/'));
  done();
};
exports.compileSass = compileSass;


var path = {
  srcDir: 'src',
  dstDir: 'dist'
}


//監視ファイル
const watchFile = (done) => {
  gulp.watch('src/css/*.css',minifyCss);
  gulp.watch('src/app.js',Build);
  gulp.watch('./src/scss/*.scss', compileSass);
  gulp.watch('./*.html', Reload);
  gulp.watch('./*.html', BrowseReload);
  gulp.watch('./dist/*.+(js|css)', Reload);
 
  done();
}
exports.watchFile = watchFile;
//デフォルトで動かすタスクを指定
//設定するとターミナルでgulpと入力するだけで実行される
exports.default = gulp.series(
  watchFile,Build
);



