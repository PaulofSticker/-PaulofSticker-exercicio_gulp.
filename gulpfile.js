const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Tarefa para comprimir imagens
function comprimeImagens() {
  return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

// Função para compilar o Sass
function compilaSass() {
  return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'))
    .on('end', () => console.log('Sass compilado e minificado com exito!'));
}

// Função para comprimir JavaScript
function comprimeJavaScript() {
  return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/scripts'))
    .on('end', () => console.log('JavaScript minificado com exito!'));
}

// Watcher para monitorar alterações
function observarArquivos() {
  gulp.watch('./source/styles/*.scss', gulp.series(compilaSass));
  gulp.watch('./source/scripts/*.js', gulp.series(comprimeJavaScript));
  gulp.watch('./source/images/*', gulp.series(comprimeImagens));
}

// Exportações de tarefas
exports.sass = compilaSass;
exports.imagens = comprimeImagens;
exports.scripts = comprimeJavaScript;
exports.watch = observarArquivos;

// Tarefa padrão (executa tudo uma vez)
exports.default = gulp.series(compilaSass, comprimeJavaScript, comprimeImagens, observarArquivos);
