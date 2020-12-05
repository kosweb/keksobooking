"use strict";

import { gulp, src, dest, task } from "gulp";
import gulpif                    from "gulp-if";
import sourcemaps                from "gulp-sourcemaps";
import concat                    from "gulp-concat";
import terser                    from "gulp-terser";
import rename                    from "gulp-rename";

import debug                     from "gulp-debug";
import browsersync               from "browser-sync";

// import webpack from "webpack";
// import webpackStream from "webpack-stream";
// const webpackConfig = require("../webpack.config.js");

// webpackConfig.mode = production ? "production" : "development";
// webpackConfig.devtool = production ? false : "source-map";

function scripts() {
  return src(cfg.src.scripts)
    // .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpif(cfg.isDev, sourcemaps.init()))
    .pipe(concat('index.js'))
    .pipe(gulpif(cfg.isProd, terser()))
    .pipe(gulpif(cfg.isDev, sourcemaps.write("./")))
    .pipe(gulpif(cfg.isProd, rename({
      suffix: ".min"
    })))
    .pipe(gulpif(cfg.debug,  debug({title: 'scripts:'})))
    .pipe(dest(cfg.build.scripts))
    .on("end", browsersync.reload);
}

scripts.description = 'Concat JS files';
task(scripts);
