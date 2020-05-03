// VARIABLES & PATHS

let preprocessor = 'scss', // Preprocessor
    fileswatch = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    baseDir = 'app', // Base directory path without «/» at the end
    outputDir = 'dist', // Base directory path without «/» at the end
    online = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

    lib_scripts: {
        src: [
            'node_modules/jquery/dist/jquery.min.js', // jQuery latest
            'node_modules/vanilla-lazyload/dist/lazyload.min.js', // LazyLoad
        ],
        dest: outputDir + '/js',
    },

    lib_styles: {
        src: [
            //'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
        ],
        dest: outputDir + '/css',
    },

    app_scripts: {
        src: [
            baseDir + '/js/app.js' // app.js. Always at the end
        ],
        dest: outputDir + '/js',
    },

    app_styles: {
        src: baseDir + '/' + preprocessor + '/main.*',
        dest: outputDir + '/css',
    },

    images_optimized: {
        src: baseDir + '/images/src/**/*',
        dest: outputDir + '/images/dest',
    },

    html_files: {
        src: baseDir + '/*.html',
        dest: outputDir + '/',
    },

    php_files: {
        src: baseDir + '/**/*.php',
        dest: outputDir + '/',
    },

    fonts: {
        src: baseDir + '/fonts/**/*',
        dest: outputDir + '/fonts',
    },

    deploy: {
        hostname: 'username@yousite.com', // Deploy hostname
        destination: 'yousite/public_html/', // Deploy destination
        include: [/* '*.htaccess' */], // Included files to deploy
        exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files from deploy
    },

    cssLibsOutputName: 'libs.min.css', // libs css output
    jsLibsOutputName: 'libs.min.js', // libs js output
    cssAppOutputName: 'app.min.css', // custom scss output
    jsAppOutputName: 'app.min.js', // custom js output

};

// LOGIC

const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const scss = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const newer = require('gulp-newer');
const rsync = require('gulp-rsync');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: {baseDir: outputDir + '/'},
        notify: false,
        online: online
    })
}

function lib_scripts() {
    return src(paths.lib_scripts.src)
        .pipe(concat(paths.jsLibsOutputName))
        .pipe(uglify())
        .pipe(dest(paths.lib_scripts.dest))
        .pipe(dest(baseDir + '/js'))
        .pipe(browserSync.stream())
}

function lib_styles() {
    return src(paths.lib_styles.src)
        //.pipe(eval(preprocessor)())
        .pipe(concat(paths.cssLibsOutputName))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(dest(paths.lib_styles.dest))
        .pipe(browserSync.stream())
}

function app_scripts() {
    return src(paths.app_scripts.src)
        .pipe(concat(paths.jsAppOutputName))
        .pipe(uglify())
        .pipe(dest(paths.app_scripts.dest))
        .pipe(browserSync.stream())
}

function app_styles() {
    return src(paths.app_styles.src)
        .pipe(eval(preprocessor)())
        .pipe(concat(paths.cssAppOutputName))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(dest(paths.app_styles.dest))
        .pipe(browserSync.stream())
}

function images_optimized() {
    return src(paths.images_optimized.src)
        .pipe(newer(paths.images_optimized.dest))
        .pipe(dest(outputDir+'/images/src'))
        .pipe(imagemin())
        .pipe(dest(paths.images_optimized.dest))
}

function html_files() {
    return src(paths.html_files.src)
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(dest(paths.html_files.dest))
}

function php_files() {
    return src(paths.php_files.src)
        .pipe(dest(paths.php_files.dest))
}

function fonts() {
    return src(paths.fonts.src)
        .pipe(dest(paths.fonts.dest))
}

function cleanimg() {
    return del('' + paths.images_optimized.dest + '/**/*', {force: true})
}

function deploy() {
    return src(outputDir + '/')
        .pipe(rsync({
            root: outputDir + '/',
            hostname: paths.deploy.hostname,
            destination: paths.deploy.destination,
            include: paths.deploy.include,
            exclude: paths.deploy.exclude,
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }))
}

function startwatch() {
    watch(baseDir + '/**/*.html', html_files);
    watch(baseDir + '/**/*.php', php_files);
    watch(baseDir + '/fonts/**/*', fonts);
    watch(baseDir + '/**/' + preprocessor + '/**/*', app_styles);
    watch(baseDir + '/**/*.{' + imageswatch + '}', images_optimized);
    watch(baseDir + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
    watch([baseDir + '/**/*.js', '!' + paths.lib_scripts.dest + '/*.min.js'], app_scripts);
}

exports.browsersync = browsersync;
exports.assets = series(cleanimg, lib_scripts, images_optimized, php_files, html_files, fonts);
//exports.lib_styles = lib_styles;
exports.lib_scripts = lib_scripts;
exports.app_styles = app_styles;
exports.app_scripts = app_scripts;
exports.images_optimized = images_optimized;
exports.html_files = html_files;
exports.php_files = php_files;
exports.fonts = fonts;
exports.cleanimg = cleanimg;
exports.deploy = deploy;
exports.default = parallel(images_optimized, lib_scripts, app_styles, app_scripts, php_files, html_files, fonts, browsersync, startwatch);