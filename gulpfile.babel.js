import del from 'del';
import {src, dest, watch, series, parallel} from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import webp from 'gulp-webp';
import rename from 'gulp-rename';

const PRODUCTION = yargs.argv.prod;

export const toCSS = () => {
    return src(['src/**/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace('scss', 'css');
        }))
        .pipe(dest('./src/'))
        .pipe(server.stream());
}

export const watchForChanges = () => {
    watch('src/**/*.scss', series(toCSS));
    watch('src/**images/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
    watch(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'], series(copy, reload));
    watch('src/**/js/**/*.js', series(reload));
    watch(["**/*.php", "**/*.html"], reload);
}

export const images = () => {
    return src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
        .pipe(webp({
            quality: 70
        }))  
        .pipe(dest('dist/images'))
        .pipe(src('src/images/**/*.{jpg,jpeg,png,svg,gif}'))
        .pipe(gulpif(PRODUCTION, imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 //0 to 7
        })))
        .pipe(dest('dist/images'));
}

export const copy = () => {
    return src(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'])
        .pipe(dest('dist'));
}

export const clean = () => del(['dist']);

const server = browserSync.create();
export const serve = done => {
  server.init({
    server: "./"
  });
  done();
};

export const reload = done => {
    server.reload();
    done();
};

export const dev = series(clean, parallel(toCSS, images), copy, serve, watchForChanges);
export const build = series(clean, parallel(toCSS, images), copy);
export default dev;