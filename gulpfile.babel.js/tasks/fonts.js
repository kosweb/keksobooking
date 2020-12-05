'use strict';

import { task, src, dest }       from "gulp";
import changed                   from "gulp-changed";
import gulpif                    from "gulp-if";
import fonter                    from "gulp-fonter";
import debug                     from "gulp-debug";

function fonts() {
  return src(`${cfg.src.fonts}**/*.{woff,woff2}`)
    .pipe(changed(cfg.build.fonts))
    .pipe(dest(cfg.build.fonts));
}

fonts.description = 'Copy fonts';
task(fonts);

function fontsConvert() {
  return src(`${cfg.src.fonts}**/*.{ttf,otf,eot}`)
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(gulpif(cfg.debug,  debug({title: 'fonts:'})))
    .pipe(dest(cfg.build.fonts));
}

fontsConvert.description = 'Convert ttf/otf/eot fonts to woff';
task('fonts-convert', fontsConvert);
