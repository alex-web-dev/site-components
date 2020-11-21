import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import del from 'del';
import { src, dest, watch, series, parallel, task } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import rev from 'gulp-rev';
import replace from 'gulp-replace';
import penthouse from 'penthouse';
import inject from 'gulp-inject-string';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import webp from 'gulp-webp';
import svgSprite from 'gulp-svg-sprite';

const PRODUCTION = yargs.argv.prod;

export const html = () => {
    return src(["*.php", "*.html"])
        .pipe(replace(new RegExp('<!-- Critical CSS --><style>.*<\/style>', "g"), '<!-- Critical CSS -->'))
        .pipe(dest('.'))

}

export const toCSS = () => {
    return src(['src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('src/css'))
        .pipe(server.stream());
}

export const watchForChanges = () => {
    watch('src/scss/**/*.scss', series(toCSS));
    watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
    watch(['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'], series(copy, reload));
    watch('src/js/**/*.js', series(copyJS, reload));
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

export const copyJS = () => {
  return src(['src/js/*.js'])
    .pipe(dest('dist/js'))
}

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

export const svg = () => {
    return src(['src/images/icons/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons.svg",
                    example: false
                }
            }
        }))
        .pipe(dest('dist/images/icons'))
}

// export const dev = series(clean, parallel(styles, images, scripts), html, copy, replacePaths, svg, serve, watchForChanges);
// export const build = series(clean, parallel(styles, images, scripts), html, copy, hashFiles, replacePaths, criticalCSS, svg);

export const dev = series(clean, parallel(toCSS, images, copyJS), html, copy, svg, serve, watchForChanges);
export const build = series(clean, parallel(toCSS, images, copyJS), html, copy, svg);
export default dev;