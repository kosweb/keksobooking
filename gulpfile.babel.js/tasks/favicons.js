"use strict";

import fs                  from "fs";
import { task, src, dest } from "gulp";
import realFavicon         from "gulp-real-favicon";
import gulpif              from "gulp-if";
import debug               from "gulp-debug";

const FAVICON_DATA_FILE = `${cfg.src.images.favicons.root}/faviconData.json`;

function faviconsGenerate(done) {
  realFavicon.generateFavicon({
    masterPicture: cfg.src.images.favicons.master,
    dest: cfg.src.images.favicons.root,
    iconsPath: './img/favicons/',
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {
        design: 'raw'
      },
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 33.59375,
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
}

faviconsGenerate.description = 'Generate the icons';
task('favicons-generate', faviconsGenerate)

function faviconsInjectMarkups() {
  return src(cfg.src.html)
  .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
  .pipe(dest(cfg.src.root));
}
faviconsInjectMarkups.description = 'Inject favicons markups';
task('favicons-inject-markups', faviconsInjectMarkups)

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
function faviconsCheckForUpdate(done) {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
  done();
}

faviconsCheckForUpdate.description = 'Check for updates on RealFaviconGenerator';
task('favicons-check-for-update', faviconsCheckForUpdate)
