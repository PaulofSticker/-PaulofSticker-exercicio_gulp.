const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Compilar Sass
function compilaSass() {
  return gulp.src('./source/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

// Comprimir JS
function comprimeJavaScript() {
  return gulp.src('./source/scripts/*.js', { allowEmpty: true })
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/scripts'));
}

// Comprimir imagens
function comprimeImagens() {
  return gulp.src('./source/images/*', { allowEmpty: true })
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

// Watcher
function observarArquivos() {
  gulp.watch('./source/styles/*.scss', compilaSass);
  gulp.watch('./source/scripts/*.js', comprimeJavaScript);
  gulp.watch('./source/images/*', comprimeImagens);
}

// Tarefa padrão
exports.default = gulp.series(
  gulp.parallel(compilaSass, comprimeJavaScript, comprimeImagens),
  observarArquivos
);

// Tarefas individuais
exports.sass = compilaSass;
exports.scripts = comprimeJavaScript;
exports.imagens = comprimeImagens;
exports.watch = observarArquivos;
