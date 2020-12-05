"use strict";

import gulp, { task, parallel, series } from "gulp";
import path                             from "path";
import del                              from "del";
import fs                               from "fs";

function cleaning(file) {
  const config = {
    force: true,
  };

  const fileSrc = path.relative(path.resolve(cfg.src.root), file);
  const fileToDel = `${cfg.build.root}/${fileSrc}`;

  del.sync(fileToDel, config);
  console.log(`🗑️ Deleted ${fileToDel}`);

  const webp = fileToDel.includes('/img/content');
  if (webp) {
    const parsedPath = path.parse(fileToDel);
    const fileToDelWebp = `${path.join(parsedPath.dir, parsedPath.name)}.webp`;

    if (fs.existsSync(fileToDelWebp)) {
      del.sync(fileToDelWebp, config);
      console.log(`🗑️ Deleted ${fileToDelWebp}`);
    }
  }
}

function watch() {
  gulp.watch(cfg.watch.html)
    .on('change', series("html"))
    .on('unlink', (file) => cleaning(file));

  gulp.watch(cfg.watch.styles,      parallel("styles"));
  gulp.watch(cfg.watch.scripts,     parallel("scripts"));

  gulp.watch(cfg.src.images.all)
    .on('add', series("images"))
    .on('unlink', (file) => cleaning(file));

  gulp.watch(cfg.src.images.webp)
    .on('add', series("webp"));

  gulp.watch(cfg.src.images.icons,  parallel("sprites"));

  gulp.watch(cfg.src.fonts)
  .on('add', series("fonts"))
  .on('unlink', (file) => cleaning(file));
};

watch.description = 'Watch for changes, rebuild and reload the server';
task(watch);
