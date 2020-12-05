"use strict";

import { task } from "gulp";
import del      from "del";

function clean() {
  return del(
    cfg.isProd
      ? cfg.build.root
      : [cfg.build.styles, cfg.build.scripts, cfg.build.video]
  );
}

clean.description = 'Removes the destination folder';
task(clean);
