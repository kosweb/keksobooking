"use strict";

import { task, src, dest }       from "gulp";
import gulpif                    from "gulp-if";
import changed                   from "gulp-changed";
import imagemin                  from "gulp-imagemin";
import imageminWebp              from "imagemin-webp";
import svgstore                  from "gulp-svgstore";
import rename                    from "gulp-rename";
import debug                     from "gulp-debug";
import browserSync               from "browser-sync";

const pluginsSvgo = [
  { removeViewBox: false },
  { removeTitle: true },
  { cleanupNumericValues: { floatPrecision: 1 } }
];

const pluginsImagemin = [
  imagemin.optipng(), // {optimizationLevel: 5}
  imagemin.svgo({ plugins: pluginsSvgo }),
  imagemin.mozjpeg({
    quality: 90,
  })
];

const pluginsWebp = [
  imageminWebp({ preset: 'picture' }),
  // lossless: false,    //false
  // quality: 90,        // 75
  // alphaQuality: 95,   // 100
];

function favicons() {
  return src(cfg.src.images.favicons.all)
    .pipe(changed(cfg.build.favicons))
    .pipe(imagemin(pluginsImagemin))
    .pipe(dest(cfg.build.favicons))
    .pipe(gulpif(cfg.debug, debug({title: 'favicons:'})))
    // .on("end", browserSync.reload);
}

function images() {
  return src(cfg.src.images.all)
    .pipe(changed(cfg.build.images))
    .pipe(imagemin(pluginsImagemin))
    .pipe(dest(cfg.build.images))
    .pipe(gulpif(cfg.debug, debug({title: 'images:'})))
    // .on("end", browserSync.reload);
}

function webp() {
  return src(cfg.src.images.webp)
    .pipe(changed(cfg.build.images, {extension: '.webp'}))
    .pipe(imagemin(pluginsWebp))
    .pipe(rename({
      extname: '.webp'
    }))
    .pipe(dest(cfg.build.images))
    .pipe(gulpif(cfg.debug, debug({title: 'webp:'})))
    // .on("end", browserSync.reload);
}

function sprites() {
  return src(cfg.src.images.icons)
    .pipe(gulpif(cfg.debug, debug({title: 'svg-sprite:', showFiles: true})))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('svg-sprite.svg'))
    .pipe(dest(cfg.build.images))
    // .on("end", browserSync.reload);
}

favicons.description = 'Copy favicons to build';
task(favicons);

task(images);
images.description  = 'Minify png/jpeg/gif/svg images';

task(webp);
webp.description    = 'Convert images to webp';

task(sprites);
sprites.description = 'Combine svg files into one with <symbol> elements';
