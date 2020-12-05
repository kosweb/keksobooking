"use strict";

import { src, dest, task }       from "gulp";

import sass                      from "gulp-sass";
// import sassGlob                  from "gulp-sass-glob";
import sourcemaps                from "gulp-sourcemaps";

import gulpif                    from "gulp-if";
import rename                    from "gulp-rename";

import postcss                   from "gulp-postcss";
import autoprefixer              from "autoprefixer";
import importCss                 from "postcss-import";
import csso                      from "postcss-csso";
import sortMediaQueries          from "postcss-sort-media-queries";

import plumber                   from "gulp-plumber";
import notify                    from "gulp-notify";
import beautyErr                 from "@wulechuan/printer-for-errors-of-gulp-plugins";

import debug                     from "gulp-debug";
import browsersync               from "browser-sync";

const beautyErrCfg = {
  colorTheme: {
    heading: {
      lineColor: "magenta",
    },
  },
};

const pluginsPostcss = [
  importCss(),
  autoprefixer(),
  sortMediaQueries({
    sort: 'mobile-first' // desktop-first
  }),
];
cfg.isProd ? pluginsPostcss.push(csso({ comments: false })) : null;

function styles() {
  return src(cfg.src.styles)
    .pipe(gulpif(cfg.isDev, sourcemaps.init()))
    .pipe(plumber({ errorHandler: (err) => {
      beautyErr(err, beautyErrCfg);
    }}))
    .pipe(gulpif(cfg.debug,  debug({title: 'styles:'})))
    // .pipe(sassGlob())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: ['node_modules'],
    }).on("error", notify.onError("<%= error.message %>")))
    .pipe(postcss(pluginsPostcss))
    .pipe(gulpif(cfg.isProd, rename({
      suffix: ".min"
    })))
    .pipe(plumber.stop())
    .pipe(gulpif(cfg.isDev, sourcemaps.write("./")))
    .pipe(dest(cfg.build.styles))
    .pipe(browsersync.stream());
}

styles.description = 'Compile sass files';
task(styles);
