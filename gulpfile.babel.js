import del from 'del';
import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import webp from 'gulp-webp';
import rename from 'gulp-rename';
import fileInclude from 'gulp-file-include';

const PRODUCTION = yargs.argv.prod;

export const toCSS = () => {
	return src(['src/**/scss/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace('scss', 'css');
		}))
		.pipe(dest('./src/'))
		.pipe(server.stream());	
}

export const watchChanges = () => {
	watch('src/**/*.scss', series(toCSS, copy));
	watch('src/**images/**/*.{jpg,jpeg,png,svg,gif}', series(images));
	watch(['src/**/*', '!src/{images,js,scss}', '!src/{images,js,scss}/**/*'], series(copy, includeFiles, reload));
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
	return src(
			[
				'src/**/*',
				'!src/{images,js,scss}',
				'!src/{images,js,scss}/**/*',
				'!src/site/template-parts',
				'!src/site/template-parts/**/*'
			]
		)
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

export const includeFiles = () => {
	return src(['src/site/*.html'])
		.pipe(fileInclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(dest('dist/site/'));
};

export const dev = series(clean, parallel(toCSS, images), copy, includeFiles, serve, watchChanges);
export const build = series(clean, parallel(toCSS, images), copy, includeFiles);
export default dev;