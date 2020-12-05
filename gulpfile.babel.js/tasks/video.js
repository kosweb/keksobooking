'use strict';

import { task, src, symlink, dest } from "gulp";
import gulpif                       from "gulp-if";
import changed                      from "gulp-changed";
import debug                        from "gulp-debug";

function video() {
  return src(cfg.src.video)
    .pipe(changed(cfg.build.video))
    .pipe(gulpif(cfg.debug,  debug({title: 'video: ', showFiles: false})))
    .pipe(gulpif(cfg.isDev,  symlink(cfg.build.video)))
    .pipe(gulpif(cfg.isProd, dest(cfg.build.video)))
}

video.description = 'Copy video files';
task(video);
