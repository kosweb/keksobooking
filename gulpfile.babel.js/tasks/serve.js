"use strict";

import { src, dest, task } from "gulp";
import browsersync         from "browser-sync";
import yargs               from "yargs";

function serve(done) {
  browsersync.init({
    server: cfg.build.root,
    notify: true,
    ghostMode: false,
    open: !yargs.argv.noopen,
    port: 6969,
    ui: false,
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn: (snippet, match) => snippet + match,
      }
    },
  });

  done();
};

serve.flags = {
  '--noopen': 'Stop the browser from automatically opening'
};
serve.description = 'Boots up and runs Browser-sync server';
task(serve);
