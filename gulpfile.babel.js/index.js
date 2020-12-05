/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. Any files in that directory get
  automatically required below.
*/

"use strict";

import { task, series, parallel } from "gulp";
import requireDir                 from "require-dir";

global.cfg = require("./config.js");

requireDir("./tasks/");

export const dev = series("clean",
  series(["html", "styles", "scripts", "images", "webp", "favicons", "fonts", "video"]),
  parallel(["serve", "watch"])
);
dev.description = 'Build project. Run tasks: serve, watch';
dev.flags = {
  '--prod': 'Builds in production mode (minification, etc).'
};

export const build = series("clean",
  series(["html", "styles", "scripts", "images", "webp", "favicons", "fonts", "video"]));
build.description = 'Clean dest folder. Build project';
build.flags = {
  '--prod': 'Builds in production mode (minification, etc).'
};

export default dev;
