import yargs from "yargs";

const dirs = {
  src: './source',
  dest: './build'
};

module.exports = {
  src: {
    root: dirs.src,
    html: `${dirs.src}/*.html`,
    styles: `${dirs.src}/styles/style.scss`,
    scripts: `${dirs.src}/js/**/*.js`,
    images: {
      all: [
        `${dirs.src}/img/**/*.{jpg,jpeg,png,gif,tiff,svg}`,
        `!${dirs.src}/img/favicons/**/*`,
        `!${dirs.src}/img/sprite/**/*`,
      ],
      content:  `${dirs.src}/img/content/`,
      icons: `${dirs.src}/img/sprite/**/*.svg`,
      webp: [
        `${dirs.src}/img/**/*.{jpg,jpeg,png,tiff}`,
        `!${dirs.src}/img/favicons/**/*`,
        `!${dirs.src}/img/sprite/**/*`,
      ],
      favicons: {
        all: `${dirs.src}/img/favicons/**/*`,
        root: `${dirs.src}/img/favicons/`,
        master:  `${dirs.src}/img/favicons/favicon.png`,
      },
    },
    fonts: `${dirs.src}/fonts/`,
    video: `${dirs.src}/video/*`,
  },
  build: {
    root: dirs.dest,
    styles: `${dirs.dest}/css`,
    scripts: `${dirs.dest}/js`,
    images: `${dirs.dest}/img`,
    favicons: `${dirs.dest}/img/favicons`,
    fonts: `${dirs.dest}/fonts`,
    video: `${dirs.dest}/video`,
  },
  watch: {
    html: `${dirs.src}/*.html`,
    styles: `${dirs.src}/styles/**/*.scss`,
    scripts: `${dirs.src}/js/**/*.js`,
  },
  isDev: !yargs.argv.prod,
  isProd: !!yargs.argv.prod,
  debug: true,

  // isProduction() {
  //   return process.argv[process.argv.length - 1] === 'prod';
  // },
  // isDev: process.env.NODE_ENV === 'production',
};
