"use strict";

import { task, src, dest }       from "gulp";
import gulpif                    from "gulp-if";
import changed                   from "gulp-changed";
import replace                   from "gulp-replace";
import htmlmin                   from "gulp-htmlmin";
import debug                     from "gulp-debug";
import browsersync               from "browser-sync";

const optionsHtmlmin = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  removeComments: true,
};

function html() {
  return src(cfg.src.html)
    .pipe(gulpif(cfg.isDev,  changed(cfg.build.root)))
    .pipe(gulpif(cfg.isProd, replace(".css", ".min.css")))
    .pipe(gulpif(cfg.isProd, replace(".js", ".min.js")))
    .pipe(gulpif(cfg.isProd, htmlmin(optionsHtmlmin)))
    .pipe(gulpif(cfg.debug,  debug({title: 'html:'})))
    .pipe(dest(cfg.build.root))
    .pipe(browsersync.stream());
}

html.description = 'Clears HTML folder in destination, copies all HTML files';
task(html);
